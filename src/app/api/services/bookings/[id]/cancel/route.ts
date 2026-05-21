import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api";

export const runtime = "nodejs";

// POST /api/services/bookings/[id]/cancel — cancel BEFORE payment is captured.
// After PAID, use the admin refund flow which reverses the Stripe charge.
const schema = z.object({
  reason: z.string().trim().max(500).optional(),
});

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await requireSession();
    const body = await req.json().catch(() => ({}));
    const data = schema.parse(body);

    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: { tecnico: { select: { userId: true } } },
    });
    if (!booking) throw new ApiError(404, "Booking not found", "not_found");

    const isClient = booking.clientId === session.user.id;
    const isTecnico = booking.tecnico.userId === session.user.id;
    if (!isClient && !isTecnico && session.user.role !== "ADMIN") {
      throw new ApiError(403, "Forbidden", "forbidden");
    }
    if (booking.status !== "PENDING_PAYMENT") {
      throw new ApiError(409, "Booking already paid — use refund flow", "invalid_state");
    }

    await prisma.$transaction([
      prisma.booking.update({
        where: { id: booking.id },
        data: {
          status: "CANCELLED",
          cancelledAt: new Date(),
          cancellationReason: data.reason ?? "user_cancelled",
        },
      }),
      prisma.payment.updateMany({
        where: { bookingId: booking.id, status: "PENDING" },
        data: { status: "FAILED", failureCode: "cancelled" },
      }),
      // Re-open the quote (allow another técnico to win) and revert request status.
      prisma.quote.update({
        where: { id: booking.quoteId },
        data: { status: "WITHDRAWN" },
      }),
      prisma.serviceRequest.update({
        where: { id: booking.requestId },
        data: { status: "QUOTED" },
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    return apiError(err);
  }
}
