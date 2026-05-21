import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function OportunidadesPage() {
  const session = await auth();
  const profile = await prisma.tecnicoProfile.findUnique({
    where: { userId: session!.user.id },
    include: { categories: { select: { categoryId: true } } },
  });

  if (!profile) {
    return (
      <div className="rounded-2xl border border-ink-100 bg-white p-10 text-center text-sm text-ink-500">
        Necesitas completar tu perfil de técnico.{" "}
        <Link href="/tecnicos/registrarse" className="underline-offset-4 hover:underline">Continuar</Link>.
      </div>
    );
  }

  if (profile.status !== "APPROVED" || !profile.stripeChargesEnabled) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
        Tu perfil aún no está activo. Te avisaremos cuando puedas empezar a cotizar.
      </div>
    );
  }

  const requests = await prisma.serviceRequest.findMany({
    where: {
      status: "OPEN",
      categoryId: { in: profile.categories.map((c) => c.categoryId) },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      category: { select: { name: true } },
      _count: { select: { quotes: true } },
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-ink-900">Oportunidades abiertas</h1>
      {requests.length === 0 ? (
        <div className="rounded-2xl border border-ink-100 bg-white p-10 text-center text-sm text-ink-500">
          No hay solicitudes abiertas que coincidan con tus categorías.
        </div>
      ) : (
        <ul className="space-y-3">
          {requests.map((r) => (
            <li key={r.id} className="rounded-2xl border border-ink-100 bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link href={`/cuenta/oportunidades/${r.id}`} className="font-semibold text-ink-900 hover:underline">
                    {r.title}
                  </Link>
                  <p className="mt-1 text-xs text-ink-500">
                    {r.category.name} · {r.city}, C.P. {r.postalCode} · {formatDate(r.createdAt)} · {r._count.quotes} cotizaciones
                  </p>
                </div>
                <Link href={`/cuenta/oportunidades/${r.id}`} className="text-sm font-semibold text-ink-900 underline-offset-4 hover:underline">
                  Cotizar →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
