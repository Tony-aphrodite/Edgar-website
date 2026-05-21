import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { getStripe } from "@/lib/stripe";
import { syncAccountStatus } from "@/lib/stripe-connect";
import { issueCommissionCfdi } from "@/lib/cfdi";
import { env } from "@/lib/env";

export const runtime = "nodejs";
// Webhooks must read the raw body before any framework parsing.
export const dynamic = "force-dynamic";

const HANDLED_EVENTS = new Set([
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
  "checkout.session.async_payment_failed",
  "payment_intent.succeeded",
  "payment_intent.payment_failed",
  "charge.refunded",
  "account.updated",
]);

export async function POST(req: NextRequest) {
  if (!env.STRIPE_WEBHOOK_SECRET) {
    return new NextResponse("Webhook not configured", { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return new NextResponse("Missing signature", { status: 400 });
  }

  const rawBody = await req.text();
  const stripe = getStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("[stripe-webhook] signature verification failed:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  // Idempotency — try to insert the event id; if it already exists we know
  // we've processed (or at least started processing) this event already.
  try {
    await prisma.webhookEvent.create({
      data: {
        id: event.id,
        type: event.type,
        payload: event as unknown as Prisma.InputJsonValue,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      // Already seen — Stripe will retry until 2xx. Return 200 to stop retries.
      return NextResponse.json({ received: true, deduplicated: true });
    }
    console.error("[stripe-webhook] persistence error:", err);
    return new NextResponse("Persistence error", { status: 500 });
  }

  if (!HANDLED_EVENTS.has(event.type)) {
    return NextResponse.json({ received: true, ignored: true });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await onCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case "checkout.session.async_payment_failed":
        await onCheckoutAsyncFailed(event.data.object as Stripe.Checkout.Session);
        break;

      case "payment_intent.succeeded":
        await onPaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case "payment_intent.payment_failed":
        await onPaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      case "charge.refunded":
        await onChargeRefunded(event.data.object as Stripe.Charge);
        break;

      case "account.updated":
        await onAccountUpdated(event.data.object as Stripe.Account);
        break;
    }
  } catch (err) {
    // If a handler fails, delete the dedupe record so Stripe will retry.
    await prisma.webhookEvent.delete({ where: { id: event.id } }).catch(() => {});
    console.error(`[stripe-webhook] handler ${event.type} failed:`, err);
    return new NextResponse("Handler error", { status: 500 });
  }

  return NextResponse.json({ received: true });
}

// ---------- Handlers ----------

async function onCheckoutCompleted(session: Stripe.Checkout.Session) {
  const bookingId = session.client_reference_id ?? session.metadata?.bookingId;
  if (!bookingId) return;

  const paymentIntentId =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id;

  // Update payment + booking. Don't mark PAID here — wait for
  // payment_intent.succeeded which gives us the charge id and confirms
  // capture (esp. for async payment methods like OXXO).
  await prisma.payment.update({
    where: { bookingId },
    data: {
      stripePaymentIntentId: paymentIntentId ?? undefined,
    },
  });
}

async function onCheckoutAsyncFailed(session: Stripe.Checkout.Session) {
  const bookingId = session.client_reference_id ?? session.metadata?.bookingId;
  if (!bookingId) return;
  await prisma.payment.update({
    where: { bookingId },
    data: { status: "FAILED", failureCode: "async_payment_failed" },
  });
  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CANCELLED", cancelledAt: new Date(), cancellationReason: "payment_failed" },
  });
}

async function onPaymentIntentSucceeded(pi: Stripe.PaymentIntent) {
  // Resolve booking via metadata or via payment row lookup.
  const bookingId = pi.metadata?.bookingId;
  if (!bookingId) {
    const p = await prisma.payment.findFirst({
      where: { stripePaymentIntentId: pi.id },
      select: { bookingId: true },
    });
    if (!p) return;
    return finalizePaidBooking(p.bookingId, pi);
  }
  return finalizePaidBooking(bookingId, pi);
}

async function finalizePaidBooking(bookingId: string, pi: Stripe.PaymentIntent) {
  const charge = await resolveLatestCharge(pi);
  const transferId = typeof charge?.transfer === "string" ? charge.transfer : charge?.transfer?.id;
  // For Destination Charges, the application fee lives on the Charge.
  const applicationFeeId = charge
    ? typeof charge.application_fee === "string"
      ? charge.application_fee
      : charge.application_fee?.id
    : undefined;

  await prisma.$transaction([
    prisma.payment.update({
      where: { bookingId },
      data: {
        status: "SUCCEEDED",
        paidAt: new Date(pi.created * 1000),
        stripeChargeId: charge?.id,
        stripeTransferId: transferId,
        stripeApplicationFeeId: applicationFeeId,
      },
    }),
    prisma.booking.update({
      where: { id: bookingId },
      data: { status: "PAID", paidAt: new Date() },
    }),
  ]);

  // Trigger the commission CFDI. Errors here MUST NOT fail the webhook —
  // the payment is already captured and Stripe must receive a 200. The
  // CFDI row tracks retry state independently.
  try {
    await issueCommissionCfdi(bookingId);
  } catch (err) {
    console.error("[stripe-webhook] CFDI issuance failed (will retry):", err);
  }
}

async function resolveLatestCharge(pi: Stripe.PaymentIntent): Promise<Stripe.Charge | null> {
  if (pi.latest_charge) {
    if (typeof pi.latest_charge === "string") {
      const stripe = getStripe();
      return stripe.charges.retrieve(pi.latest_charge);
    }
    return pi.latest_charge;
  }
  return null;
}

async function onPaymentIntentFailed(pi: Stripe.PaymentIntent) {
  const bookingId = pi.metadata?.bookingId;
  if (!bookingId) return;
  await prisma.payment.update({
    where: { bookingId },
    data: {
      status: "FAILED",
      failureCode: pi.last_payment_error?.code ?? null,
      failureMessage: pi.last_payment_error?.message ?? null,
    },
  });
}

async function onChargeRefunded(charge: Stripe.Charge) {
  const payment = await prisma.payment.findFirst({
    where: { stripeChargeId: charge.id },
    select: { bookingId: true, amountCents: true },
  });
  if (!payment) return;
  const refunded = charge.amount_refunded ?? 0;
  const fullyRefunded = refunded >= payment.amountCents;

  await prisma.$transaction([
    prisma.payment.update({
      where: { bookingId: payment.bookingId },
      data: {
        refundedAmountCents: refunded,
        refundedAt: new Date(),
        status: fullyRefunded ? "REFUNDED" : "PARTIALLY_REFUNDED",
      },
    }),
    prisma.booking.update({
      where: { id: payment.bookingId },
      data: fullyRefunded ? { status: "REFUNDED" } : {},
    }),
  ]);
}

async function onAccountUpdated(account: Stripe.Account) {
  try {
    await syncAccountStatus(account.id);
  } catch (err) {
    // The account may not belong to a TecnicoProfile in our DB (e.g. test
    // accounts) — log and continue.
    console.warn(`[stripe-webhook] account.updated for ${account.id} no profile:`, err);
  }
}
