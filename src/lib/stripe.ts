import "server-only";
import Stripe from "stripe";
import { env } from "@/lib/env";

// Lazy singleton — instantiated on first use so that builds without Stripe
// keys don't crash at import time. Routes that need Stripe must call
// `getStripe()` and handle the case where keys are absent.

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!env.STRIPE_SECRET_KEY) {
    throw new StripeNotConfiguredError();
  }
  if (!_stripe) {
    _stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      // Pin the API version to keep types and behavior stable across upgrades.
      // Mirrors the SDK's pinned version — update intentionally.
      apiVersion: "2026-04-22.dahlia",
      typescript: true,
      appInfo: {
        name: "ServiTec",
        version: "1.0.0",
        url: env.NEXT_PUBLIC_SITE_URL,
      },
      maxNetworkRetries: 2,
    });
  }
  return _stripe;
}

export class StripeNotConfiguredError extends Error {
  constructor() {
    super("Stripe is not configured. Set STRIPE_SECRET_KEY.");
    this.name = "StripeNotConfiguredError";
  }
}

// Commission helpers ---------------------------------------------------------

export function commissionAmountCents(totalCents: number): number {
  if (!Number.isInteger(totalCents) || totalCents < 0) {
    throw new Error("totalCents must be a non-negative integer");
  }
  // Half-even rounding to centavo. 12% of 100050 = 12006.
  return Math.round((totalCents * env.STRIPE_COMMISSION_PERCENT) / 100);
}

export function tecnicoNetCents(totalCents: number): number {
  return totalCents - commissionAmountCents(totalCents);
}
