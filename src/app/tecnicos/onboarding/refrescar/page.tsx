import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createOnboardingLink, ensureExpressAccount } from "@/lib/stripe-connect";

export const dynamic = "force-dynamic";

// Stripe Account Links expire. When that happens, Stripe redirects the user
// here so we can mint a fresh link and bounce them straight back into the
// onboarding flow.
export default async function RefreshOnboardingPage() {
  const session = await auth();
  if (!session?.user) redirect("/iniciar-sesion");

  const profile = await prisma.tecnicoProfile.findUnique({
    where: { userId: session.user.id },
  });
  if (!profile) redirect("/tecnicos/registrarse");

  const stripeAccountId = profile.stripeAccountId ?? (await ensureExpressAccount(profile.id));
  const url = await createOnboardingLink(stripeAccountId);
  redirect(url);
}
