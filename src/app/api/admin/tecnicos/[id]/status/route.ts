import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api";

export const runtime = "nodejs";

const schema = z.object({
  status: z.enum(["PENDING", "APPROVED", "SUSPENDED", "REJECTED"]),
  reason: z.string().trim().max(500).optional(),
});

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await requireRole("ADMIN");
    const body = await req.json().catch(() => {
      throw new ApiError(400, "Invalid JSON body", "invalid_body");
    });
    const data = schema.parse(body);

    const updated = await prisma.tecnicoProfile.update({
      where: { id: params.id },
      data: {
        status: data.status,
        approvedAt: data.status === "APPROVED" ? new Date() : null,
      },
    });

    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        action: `tecnico.${data.status.toLowerCase()}`,
        entity: "TecnicoProfile",
        entityId: params.id,
        payload: { reason: data.reason ?? null },
      },
    });

    return NextResponse.json({ ok: true, tecnico: updated });
  } catch (err) {
    return apiError(err);
  }
}
