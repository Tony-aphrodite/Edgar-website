import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api";
import { getStripe } from "@/lib/stripe";
import { env } from "@/lib/env";

export const runtime = "nodejs";

// POST /api/services/bookings/[id]/retry-checkout — re-mint a Checkout Session
// for a Booking that's still PENDING_PAYMENT. Same idempotency key as
// the initial accept; Stripe will either return the existing session or
// (if the previous session expired) create a new one bound to the same
// PaymentIntent.
export async function POST(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireSession();

    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: {
        request: { select: { title: true } },
        quote: { select: { id: true } },
        tecnico: {
          select: {
            id: true,
            displayName: true,
            stripeAccountId: true,
            stripeChargesEnabled: true,
            status: true,
          },
        },
        payment: { select: { stripeCheckoutSessionId: true, status: true } },
      },
    });
    if (!booking) throw new ApiError(404, "Booking not found", "not_found");
    if (booking.clientId !== session.user.id) {
      throw new ApiError(403, "Not your booking", "forbidden");
    }
    if (booking.status !== "PENDING_PAYMENT") {
      throw new ApiError(409, `Cannot retry from status ${booking.status}`, "invalid_state");
    }
    if (!booking.tecnico.stripeAccountId || !booking.tecnico.stripeChargesEnabled) {
      throw new ApiError(409, "Tecnico cannot receive payments", "tecnico_not_ready");
    }

    const stripe = getStripe();

    // If there's an existing session that's still open, return its URL.
    if (booking.payment?.stripeCheckoutSessionId) {
      try {
        const existing = await stripe.checkout.sessions.retrieve(
          booking.payment.stripeCheckoutSessionId,
        );
        if (existing.status === "open" && existing.url) {
          return NextResponse.json({ ok: true, checkoutUrl: existing.url, reused: true });
        }
      } catch {
        // Fall through and mint a new one.
      }
    }

    const checkout = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        currency: "mxn",
        client_reference_id: booking.id,
        customer_email: session.user.email ?? undefined,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: "mxn",
              unit_amount: booking.totalAmountCents,
              product_data: {
                name: booking.request.title,
                description: `Servicio con ${booking.tecnico.displayName}`,
              },
            },
          },
        ],
        payment_intent_data: {
          application_fee_amount: booking.commissionAmountCents,
          transfer_data: { destination: booking.tecnico.stripeAccountId },
          metadata: {
            bookingId: booking.id,
            quoteId: booking.quoteId,
            requestId: booking.requestId,
            tecnicoProfileId: booking.tecnicoId,
            clientUserId: session.user.id,
          },
          description: `ServiTec · ${booking.request.title}`,
        },
        metadata: { bookingId: booking.id, quoteId: booking.quoteId },
        success_url: `${env.NEXT_PUBLIC_SITE_URL}/servicios/pago/exito?booking=${booking.id}`,
        cancel_url: `${env.NEXT_PUBLIC_SITE_URL}/servicios/pago/cancelado?booking=${booking.id}`,
      },
      { idempotencyKey: `booking-checkout-${booking.id}` },
    );

    await prisma.payment.update({
      where: { bookingId: booking.id },
      data: {
        stripeCheckoutSessionId: checkout.id,
        stripePaymentIntentId:
          typeof checkout.payment_intent === "string" ? checkout.payment_intent : null,
        status: "PENDING",
      },
    });

    return NextResponse.json({ ok: true, checkoutUrl: checkout.url, reused: false });
  } catch (err) {
    return apiError(err);
  }
}
