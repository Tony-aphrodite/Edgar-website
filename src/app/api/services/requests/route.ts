import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api";

export const runtime = "nodejs";

// POST /api/services/requests — a CLIENT creates a service request.
const createSchema = z.object({
  categoryId: z.string().min(1),
  title: z.string().trim().min(4).max(140),
  description: z.string().trim().min(10).max(4000),
  addressLine: z.string().trim().min(4).max(240),
  postalCode: z.string().regex(/^\d{5}$/),
  city: z.string().trim().min(2).max(120),
  state: z.string().trim().min(2).max(120),
  locationLat: z.number().min(-90).max(90).optional(),
  locationLng: z.number().min(-180).max(180).optional(),
  photos: z.array(z.string().url()).max(10).optional(),
  preferredDate: z.coerce.date().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await requireSession();
    const body = await req.json().catch(() => {
      throw new ApiError(400, "Invalid JSON body", "invalid_body");
    });
    const data = createSchema.parse(body);

    const category = await prisma.serviceCategory.findUnique({
      where: { id: data.categoryId },
      select: { id: true, isActive: true },
    });
    if (!category?.isActive) {
      throw new ApiError(400, "Category not found or inactive", "invalid_category");
    }

    const request = await prisma.serviceRequest.create({
      data: {
        clientId: session.user.id,
        categoryId: data.categoryId,
        title: data.title,
        description: data.description,
        addressLine: data.addressLine,
        postalCode: data.postalCode,
        city: data.city,
        state: data.state,
        locationLat: data.locationLat,
        locationLng: data.locationLng,
        photos: data.photos ?? [],
        preferredDate: data.preferredDate,
      },
    });

    return NextResponse.json({ ok: true, request }, { status: 201 });
  } catch (err) {
    return apiError(err);
  }
}

// GET /api/services/requests — list the caller's requests (or, if TECNICO,
// list OPEN requests in their categories).
export async function GET() {
  try {
    const session = await requireSession();

    if (session.user.role === "TECNICO") {
      const profile = await prisma.tecnicoProfile.findUnique({
        where: { userId: session.user.id },
        include: { categories: { select: { categoryId: true } } },
      });
      if (!profile) throw new ApiError(404, "Tecnico profile not found", "no_profile");

      const requests = await prisma.serviceRequest.findMany({
        where: {
          status: "OPEN",
          categoryId: { in: profile.categories.map((c) => c.categoryId) },
        },
        orderBy: { createdAt: "desc" },
        take: 50,
        include: {
          category: { select: { name: true, slug: true } },
          _count: { select: { quotes: true } },
        },
      });
      return NextResponse.json({ requests });
    }

    const requests = await prisma.serviceRequest.findMany({
      where: { clientId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        category: { select: { name: true, slug: true } },
        quotes: { select: { id: true, status: true, totalAmountCents: true, tecnicoId: true } },
        booking: { select: { id: true, status: true } },
      },
    });
    return NextResponse.json({ requests });
  } catch (err) {
    return apiError(err);
  }
}
