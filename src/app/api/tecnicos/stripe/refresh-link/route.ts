import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api";
import { createOnboardingLink, ensureExpressAccount } from "@/lib/stripe-connect";

export const runtime = "nodejs";

export async function POST() {
  try {
    const session = await requireSession();
    const profile = await prisma.tecnicoProfile.findUnique({
      where: { userId: session.user.id },
    });
    if (!profile) {
      throw new ApiError(404, "Tecnico profile not found", "no_profile");
    }
    const stripeAccountId = profile.stripeAccountId ?? (await ensureExpressAccount(profile.id));
    const onboardingUrl = await createOnboardingLink(stripeAccountId);
    return NextResponse.json({ ok: true, onboardingUrl });
  } catch (err) {
    return apiError(err);
  }
}
