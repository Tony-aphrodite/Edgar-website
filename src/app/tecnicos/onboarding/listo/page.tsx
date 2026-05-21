import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { syncAccountStatus } from "@/lib/stripe-connect";

export const dynamic = "force-dynamic";

export default async function OnboardingReturnPage() {
  const session = await auth();
  if (!session?.user) redirect("/iniciar-sesion");

  const profile = await prisma.tecnicoProfile.findUnique({
    where: { userId: session.user.id },
  });
  if (!profile?.stripeAccountId) redirect("/tecnicos/registrarse");

  let chargesEnabled = profile.stripeChargesEnabled;
  let payoutsEnabled = profile.stripePayoutsEnabled;
  try {
    const account = await syncAccountStatus(profile.stripeAccountId);
    chargesEnabled = account.charges_enabled;
    payoutsEnabled = account.payouts_enabled;
  } catch (err) {
    console.error("[onboarding/listo] sync failed", err);
  }

  const complete = chargesEnabled && payoutsEnabled;

  return (
    <Container className="py-20">
      <div className="mx-auto max-w-md rounded-3xl border border-ink-100 bg-white p-10 text-center shadow-soft">
        <h1 className="text-2xl font-semibold text-ink-900">
          {complete ? "¡Tu cuenta está lista!" : "Casi listo"}
        </h1>
        <p className="mt-3 text-sm text-ink-500">
          {complete
            ? "Stripe verificó tu identidad y habilitó cobros y depósitos. Aprobaremos tu perfil en breve y empezarás a recibir solicitudes."
            : "Stripe todavía está revisando tu información. Te avisaremos por correo cuando esté lista. Si Stripe pidió documentos adicionales, puedes regresar al onboarding desde el enlace abajo."}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 text-left text-xs">
          <Status label="Cobros habilitados" on={chargesEnabled} />
          <Status label="Depósitos habilitados" on={payoutsEnabled} />
        </div>

        <div className="mt-8 flex flex-col gap-2">
          {!complete ? (
            <form action="/api/tecnicos/stripe/refresh-link" method="POST">
              <button
                type="submit"
                className="w-full rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink-900"
              >
                Continuar onboarding en Stripe
              </button>
            </form>
          ) : null}
          <Link
            href="/"
            className="inline-block rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </Container>
  );
}

function Status({ label, on }: { label: string; on: boolean }) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        on ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-amber-200 bg-amber-50 text-amber-900"
      }`}
    >
      <div className="font-semibold">{on ? "Activo" : "Pendiente"}</div>
      <div>{label}</div>
    </div>
  );
}
