import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api";
import { issueCommissionCfdi } from "@/lib/cfdi";

export const runtime = "nodejs";

export async function POST(_req: Request, { params }: { params: { bookingId: string } }) {
  try {
    const session = await requireRole("ADMIN");
    const row = await prisma.commissionCfdi.findUnique({
      where: { bookingId: params.bookingId },
      select: { status: true, retryCount: true },
    });
    if (!row) throw new ApiError(404, "CFDI record not found", "not_found");
    if (row.status === "ISSUED") {
      return NextResponse.json({ ok: true, alreadyIssued: true });
    }
    await prisma.commissionCfdi.update({
      where: { bookingId: params.bookingId },
      data: { status: "PENDING" },
    });
    await issueCommissionCfdi(params.bookingId);

    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        action: "cfdi.retry",
        entity: "CommissionCfdi",
        entityId: params.bookingId,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return apiError(err);
  }
}
