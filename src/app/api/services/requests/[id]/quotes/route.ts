import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api";

export const runtime = "nodejs";

// POST /api/services/requests/[id]/quotes — TECNICO submits a quote.
const schema = z.object({
  laborAmountCents: z.number().int().min(1).max(2_000_000_000),
  materialsAmountCents: z.number().int().min(0).max(2_000_000_000).default(0),
  notes: z.string().trim().max(2000).optional(),
  validForHours: z.number().int().min(1).max(720).default(72),
});

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await requireRole("TECNICO");
    const body = await req.json().catch(() => {
      throw new ApiError(400, "Invalid JSON body", "invalid_body");
    });
    const data = schema.parse(body);

    const [request, profile] = await Promise.all([
      prisma.serviceRequest.findUnique({
        where: { id: params.id },
        select: { id: true, status: true, categoryId: true },
      }),
      prisma.tecnicoProfile.findUnique({
        where: { userId: session.user.id },
        include: { categories: { select: { categoryId: true } } },
      }),
    ]);

    if (!request) throw new ApiError(404, "Request not found", "not_found");
    if (request.status !== "OPEN" && request.status !== "QUOTED") {
      throw new ApiError(409, "Request not accepting quotes", "request_closed");
    }
    if (!profile) throw new ApiError(404, "Tecnico profile not found", "no_profile");
    if (profile.status !== "APPROVED") {
      throw new ApiError(403, "Tecnico not approved", "tecnico_not_approved");
    }
    if (!profile.stripeChargesEnabled) {
      throw new ApiError(403, "Complete Stripe onboarding before quoting", "stripe_not_ready");
    }
    const inCategory = profile.categories.some((c) => c.categoryId === request.categoryId);
    if (!inCategory) {
      throw new ApiError(403, "Category not in your service list", "wrong_category");
    }

    const totalAmountCents = data.laborAmountCents + data.materialsAmountCents;
    const validUntil = new Date(Date.now() + data.validForHours * 60 * 60 * 1000);

    const quote = await prisma.$transaction(async (tx) => {
      const q = await tx.quote.upsert({
        where: {
          requestId_tecnicoId: { requestId: request.id, tecnicoId: profile.id },
        },
        create: {
          requestId: request.id,
          tecnicoId: profile.id,
          laborAmountCents: data.laborAmountCents,
          materialsAmountCents: data.materialsAmountCents,
          totalAmountCents,
          notes: data.notes,
          validUntil,
          status: "PENDING",
        },
        update: {
          laborAmountCents: data.laborAmountCents,
          materialsAmountCents: data.materialsAmountCents,
          totalAmountCents,
          notes: data.notes,
          validUntil,
          status: "PENDING",
        },
      });
      if (request.status === "OPEN") {
        await tx.serviceRequest.update({
          where: { id: request.id },
          data: { status: "QUOTED" },
        });
      }
      return q;
    });

    return NextResponse.json({ ok: true, quote }, { status: 201 });
  } catch (err) {
    return apiError(err);
  }
}
