import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api";
import { commissionAmountCents, tecnicoNetCents, getStripe } from "@/lib/stripe";
import { env } from "@/lib/env";

export const runtime = "nodejs";

// POST /api/services/quotes/[id]/accept — CLIENT accepts a quote.
// Atomically creates the Booking and a Stripe Checkout session.
// The booking is created in PENDING_PAYMENT state; the webhook flips it to
// PAID after Stripe confirms the payment_intent.
export async function POST(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireSession();

    const quote = await prisma.quote.findUnique({
      where: { id: params.id },
      include: {
        request: true,
        tecnico: {
          select: {
            id: true,
            stripeAccountId: true,
            stripeChargesEnabled: true,
            status: true,
            displayName: true,
          },
        },
      },
    });
    if (!quote) throw new ApiError(404, "Quote not found", "not_found");
    if (quote.request.clientId !== session.user.id) {
      throw new ApiError(403, "Not your request", "forbidden");
    }
    if (quote.status !== "PENDING") {
      throw new ApiError(409, "Quote no longer acceptable", "quote_not_pending");
    }
    if (quote.validUntil < new Date()) {
      throw new ApiError(409, "Quote expired", "quote_expired");
    }
    if (quote.request.status !== "OPEN" && quote.request.status !== "QUOTED") {
      throw new ApiError(409, "Request already taken", "request_closed");
    }
    if (!quote.tecnico.stripeAccountId || !quote.tecnico.stripeChargesEnabled) {
      throw new ApiError(409, "Tecnico cannot receive payments", "tecnico_not_ready");
    }
    if (quote.tecnico.status !== "APPROVED") {
      throw new ApiError(409, "Tecnico not approved", "tecnico_not_approved");
    }

    const total = quote.totalAmountCents;
    const commission = commissionAmountCents(total);
    const tecnicoNet = tecnicoNetCents(total);

    // Reserve the booking row first so that two concurrent accepts can't both
    // create a Stripe session against the same request/quote.
    const booking = await prisma.$transaction(async (tx) => {
      await tx.quote.update({
        where: { id: quote.id },
        data: { status: "ACCEPTED" },
      });
      await tx.quote.updateMany({
        where: {
          requestId: quote.requestId,
          id: { not: quote.id },
          status: "PENDING",
        },
        data: { status: "REJECTED" },
      });
      await tx.serviceRequest.update({
        where: { id: quote.requestId },
        data: { status: "ACCEPTED" },
      });
      return tx.booking.create({
        data: {
          quoteId: quote.id,
          requestId: quote.requestId,
          clientId: session.user.id,
          tecnicoId: quote.tecnicoId,
          totalAmountCents: total,
          commissionAmountCents: commission,
          tecnicoNetCents: tecnicoNet,
        },
      });
    });

    // Create the Checkout Session as a Destination Charge.
    const stripe = getStripe();
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
              unit_amount: total,
              product_data: {
                name: quote.request.title,
                description: `Servicio con ${quote.tecnico.displayName}`,
              },
            },
          },
        ],
        payment_intent_data: {
          application_fee_amount: commission,
          transfer_data: { destination: quote.tecnico.stripeAccountId },
          metadata: {
            bookingId: booking.id,
            quoteId: quote.id,
            requestId: quote.requestId,
            tecnicoProfileId: quote.tecnicoId,
            clientUserId: session.user.id,
          },
          description: `ServiTec · ${quote.request.title}`,
        },
        metadata: {
          bookingId: booking.id,
          quoteId: quote.id,
        },
        success_url: `${env.NEXT_PUBLIC_SITE_URL}/servicios/pago/exito?booking=${booking.id}`,
        cancel_url: `${env.NEXT_PUBLIC_SITE_URL}/servicios/pago/cancelado?booking=${booking.id}`,
      },
      // Idempotency key prevents duplicate sessions if the request retries.
      { idempotencyKey: `booking-checkout-${booking.id}` },
    );

    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        stripeCheckoutSessionId: checkout.id,
        stripePaymentIntentId:
          typeof checkout.payment_intent === "string" ? checkout.payment_intent : null,
        amountCents: total,
        currency: "mxn",
        status: "PENDING",
      },
    });

    return NextResponse.json({ ok: true, checkoutUrl: checkout.url, bookingId: booking.id });
  } catch (err) {
    return apiError(err);
  }
}
