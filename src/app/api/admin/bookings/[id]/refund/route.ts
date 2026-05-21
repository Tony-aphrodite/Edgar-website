import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

// POST /api/admin/bookings/[id]/refund — admin issues a (partial) refund.
// For Destination Charges we ALSO reverse the platform application fee
// proportionally (`refund_application_fee`) and pull funds back from the
// connected account (`reverse_transfer`). The Stripe charge.refunded webhook
// then updates payment + booking status, so this route returns the Refund
// object only — no manual status flip.
const schema = z.object({
  amountCents: z.number().int().min(1).optional(), // omit = full refund
  reason: z.enum(["duplicate", "fraudulent", "requested_by_customer"]).default("requested_by_customer"),
  note: z.string().trim().max(500).optional(),
});

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await requireRole("ADMIN");
    const body = await req.json().catch(() => ({}));
    const data = schema.parse(body);

    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: { payment: true },
    });
    if (!booking) throw new ApiError(404, "Booking not found", "not_found");
    if (!booking.payment?.stripeChargeId) {
      throw new ApiError(409, "No captured charge to refund", "no_charge");
    }
    if (booking.status === "REFUNDED") {
      throw new ApiError(409, "Already refunded", "already_refunded");
    }

    const refundAmount = data.amountCents ?? booking.payment.amountCents - booking.payment.refundedAmountCents;
    if (refundAmount <= 0) {
      throw new ApiError(400, "Nothing left to refund", "nothing_to_refund");
    }

    const stripe = getStripe();
    const refund = await stripe.refunds.create(
      {
        charge: booking.payment.stripeChargeId,
        amount: refundAmount,
        reason: data.reason,
        refund_application_fee: true,
        reverse_transfer: true,
        metadata: {
          bookingId: booking.id,
          adminUserId: session.user.id,
          note: data.note ?? "",
        },
      },
      { idempotencyKey: `refund-${booking.id}-${refundAmount}` },
    );

    await prisma.auditLog.create({
      data: {
        actorId: session.user.id,
        action: "booking.refund",
        entity: "Booking",
        entityId: booking.id,
        payload: { amountCents: refundAmount, reason: data.reason, note: data.note, refundId: refund.id },
      },
    });

    return NextResponse.json({ ok: true, refundId: refund.id, status: refund.status });
  } catch (err) {
    return apiError(err);
  }
}
