import "server-only";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";

// Stripe Connect helpers — Express accounts for Mexican técnicos.
// We use Destination Charges: the platform owns the customer, the charge is
// created on the platform account, and `transfer_data.destination` routes
// funds to the connected account net of `application_fee_amount`.

/**
 * Ensure a TecnicoProfile has a Stripe Express account. Returns the
 * stripeAccountId. Idempotent — safe to call multiple times.
 */
export async function ensureExpressAccount(tecnicoProfileId: string): Promise<string> {
  const profile = await prisma.tecnicoProfile.findUniqueOrThrow({
    where: { id: tecnicoProfileId },
    include: { user: { select: { email: true } } },
  });

  if (profile.stripeAccountId) return profile.stripeAccountId;

  const stripe = getStripe();
  const account = await stripe.accounts.create({
    type: "express",
    country: "MX",
    email: profile.user.email,
    default_currency: "mxn",
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
    business_type: "individual",
    business_profile: {
      mcc: "1711", // Heating, plumbing, A/C contractors
      url: env.NEXT_PUBLIC_SITE_URL,
      product_description: "Servicios técnicos a domicilio en México",
    },
    metadata: {
      tecnicoProfileId: profile.id,
      userId: profile.userId,
    },
  });

  await prisma.tecnicoProfile.update({
    where: { id: profile.id },
    data: { stripeAccountId: account.id },
  });

  return account.id;
}

/**
 * Create a one-time onboarding link the user follows to complete KYC on Stripe.
 * Links expire after a few minutes; if expired, call this again.
 */
export async function createOnboardingLink(stripeAccountId: string): Promise<string> {
  const stripe = getStripe();
  const link = await stripe.accountLinks.create({
    account: stripeAccountId,
    type: "account_onboarding",
    refresh_url: `${env.NEXT_PUBLIC_SITE_URL}/tecnicos/onboarding/refrescar`,
    return_url: `${env.NEXT_PUBLIC_SITE_URL}/tecnicos/onboarding/listo`,
  });
  return link.url;
}

/**
 * Fetch the live Stripe account state and sync our local snapshot.
 * Called after onboarding return and on `account.updated` webhook.
 */
export async function syncAccountStatus(stripeAccountId: string) {
  const stripe = getStripe();
  const account = await stripe.accounts.retrieve(stripeAccountId);

  await prisma.tecnicoProfile.update({
    where: { stripeAccountId },
    data: {
      stripeChargesEnabled: account.charges_enabled,
      stripePayoutsEnabled: account.payouts_enabled,
      stripeOnboardingComplete: account.details_submitted && account.charges_enabled,
    },
  });

  return account;
}
