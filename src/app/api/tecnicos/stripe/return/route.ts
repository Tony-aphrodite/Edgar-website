import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api";
import { syncAccountStatus } from "@/lib/stripe-connect";

export const runtime = "nodejs";

// Called by the /tecnicos/onboarding/listo page after the user returns from
// Stripe. We sync the live account status so the UI reflects it immediately,
// even before the `account.updated` webhook lands.
export async function POST() {
  try {
    const session = await requireSession();
    const profile = await prisma.tecnicoProfile.findUnique({
      where: { userId: session.user.id },
    });
    if (!profile?.stripeAccountId) {
      throw new ApiError(404, "No Stripe account linked", "no_stripe_account");
    }
    const account = await syncAccountStatus(profile.stripeAccountId);
    return NextResponse.json({
      ok: true,
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
      detailsSubmitted: account.details_submitted,
    });
  } catch (err) {
    return apiError(err);
  }
}
