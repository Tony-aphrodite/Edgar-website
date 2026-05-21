import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatMxn } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function CuentaHomePage() {
  const session = await auth();
  const userId = session!.user.id;
  const role = session!.user.role ?? "CLIENT";

  if (role === "TECNICO") {
    const profile = await prisma.tecnicoProfile.findUnique({
      where: { userId },
      include: { _count: { select: { bookings: true } } },
    });
    const openCount = profile
      ? await prisma.serviceRequest.count({
          where: {
            status: "OPEN",
            categoryId: {
              in: await prisma.tecnicoCategory
                .findMany({ where: { tecnicoId: profile.id }, select: { categoryId: true } })
                .then((r) => r.map((x) => x.categoryId)),
            },
          },
        })
      : 0;
    const activeJobs = profile
      ? await prisma.booking.count({
          where: {
            tecnicoId: profile.id,
            status: { in: ["PAID", "IN_PROGRESS"] },
          },
        })
      : 0;

    return (
      <div className="space-y-6">
        <Heading title="Resumen de técnico" subtitle={profile?.displayName ?? ""} />
        {!profile ? (
          <Card>
            <p className="text-sm text-ink-700">Aún no completas tu perfil de técnico.</p>
            <Link href="/tecnicos/registrarse" className="mt-3 inline-block rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white">
              Completar perfil
            </Link>
          </Card>
        ) : profile.status !== "APPROVED" ? (
          <Card>
            <p className="text-sm text-ink-700">
              Tu perfil está en revisión. Te avisaremos por correo cuando puedas
              empezar a cotizar.
            </p>
            <p className="mt-2 text-xs text-ink-500">Estado actual: {profile.status}</p>
          </Card>
        ) : !profile.stripeChargesEnabled ? (
          <Card>
            <p className="text-sm text-ink-700">
              Termina tu configuración en Stripe para recibir pagos.
            </p>
            <Link href="/tecnicos/onboarding/refrescar" className="mt-3 inline-block rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white">
              Continuar onboarding
            </Link>
          </Card>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-3">
          <Stat title="Oportunidades abiertas" value={openCount.toString()} href="/cuenta/oportunidades" />
          <Stat title="Trabajos activos" value={activeJobs.toString()} href="/cuenta/trabajos" />
          <Stat title="Total completados" value={profile?._count.bookings.toString() ?? "0"} href="/cuenta/trabajos" />
        </div>
      </div>
    );
  }

  const [requests, bookings] = await Promise.all([
    prisma.serviceRequest.count({ where: { clientId: userId } }),
    prisma.booking.findMany({
      where: { clientId: userId },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        status: true,
        totalAmountCents: true,
        createdAt: true,
        request: { select: { title: true } },
      },
    }),
  ]);

  return (
    <div className="space-y-6">
      <Heading title="Hola" subtitle={session!.user.email ?? ""} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Stat title="Mis solicitudes" value={requests.toString()} href="/cuenta/solicitudes" />
        <Stat title="Reservas activas" value={bookings.length.toString()} href="/cuenta/reservas" />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-ink-900">Actividad reciente</h3>
        <ul className="mt-3 divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white">
          {bookings.length === 0 ? (
            <li className="p-5 text-sm text-ink-500">
              Aún no tienes reservas. {" "}
              <Link href="/servicios/solicitar" className="underline-offset-4 hover:underline">
                Crea tu primera solicitud
              </Link>
              .
            </li>
          ) : (
            bookings.map((b) => (
              <li key={b.id} className="flex items-center justify-between gap-4 p-5">
                <div>
                  <p className="font-medium text-ink-900">{b.request.title}</p>
                  <p className="text-xs text-ink-500">{b.status}</p>
                </div>
                <div className="text-right text-sm">
                  <div>{formatMxn(b.totalAmountCents)}</div>
                  <Link href={`/cuenta/reservas/${b.id}`} className="text-xs underline-offset-4 hover:underline">
                    Ver
                  </Link>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

function Heading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight text-ink-900">{title}</h1>
      {subtitle ? <p className="mt-1 text-sm text-ink-500">{subtitle}</p> : null}
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">{children}</div>;
}

function Stat({ title, value, href }: { title: string; value: string; href: string }) {
  return (
    <Link href={href} className="rounded-2xl border border-ink-100 bg-white p-5 transition hover:border-ink-300">
      <p className="text-xs uppercase tracking-widest text-ink-400">{title}</p>
      <p className="mt-2 text-3xl font-semibold text-ink-900">{value}</p>
    </Link>
  );
}
