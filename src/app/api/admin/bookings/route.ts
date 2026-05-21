import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { apiError } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await requireRole("ADMIN");
    const status = req.nextUrl.searchParams.get("status");
    const bookings = await prisma.booking.findMany({
      where: status
        ? {
            status: status as
              | "PENDING_PAYMENT"
              | "PAID"
              | "IN_PROGRESS"
              | "COMPLETED"
              | "DISPUTED"
              | "CANCELLED"
              | "REFUNDED",
          }
        : undefined,
      orderBy: { createdAt: "desc" },
      take: 100,
      include: {
        request: { select: { title: true, category: { select: { name: true } } } },
        tecnico: { select: { displayName: true, rfc: true } },
        payment: { select: { status: true, refundedAmountCents: true } },
        commissionCfdi: { select: { status: true, uuid: true } },
      },
    });
    return NextResponse.json({ bookings });
  } catch (err) {
    return apiError(err);
  }
}
