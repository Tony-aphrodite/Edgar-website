import { prisma } from "@/lib/db";
import { TECNICO_STATUS_LABELS, formatDate } from "@/lib/format";
import { StatusBadge, tecnicoStatusTone } from "@/components/StatusBadge";
import { TecnicoStatusActions } from "@/components/admin/TecnicoStatusActions";

export const dynamic = "force-dynamic";

export default async function AdminTecnicos({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const status = searchParams.status;
  const tecnicos = await prisma.tecnicoProfile.findMany({
    where: status ? { status: status as "PENDING" | "APPROVED" | "SUSPENDED" | "REJECTED" } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { email: true, name: true, phone: true } },
      categories: { include: { category: { select: { name: true } } } },
      _count: { select: { bookings: true } },
    },
    take: 200,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-ink-900">Técnicos</h1>
      <div className="flex flex-wrap gap-2 text-xs">
        {(["", "PENDING", "APPROVED", "SUSPENDED", "REJECTED"] as const).map((s) => (
          <a
            key={s || "all"}
            href={s ? `?status=${s}` : "?"}
            className={`rounded-full border px-3 py-1.5 ${status === s || (!status && !s) ? "border-ink-900 bg-ink-900 text-white" : "border-ink-200 text-ink-700"}`}
          >
            {s ? TECNICO_STATUS_LABELS[s] : "Todos"}
          </a>
        ))}
      </div>
      <ul className="space-y-3">
        {tecnicos.length === 0 ? (
          <li className="rounded-2xl border border-ink-100 bg-white p-10 text-center text-sm text-ink-500">Sin resultados.</li>
        ) : (
          tecnicos.map((t) => (
            <li key={t.id} className="rounded-2xl border border-ink-100 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold text-ink-900">{t.displayName}</p>
                  <p className="text-xs text-ink-500">{t.user.email} · {t.user.phone ?? "sin teléfono"}</p>
                  <p className="mt-1 text-xs text-ink-500">
                    {t.categories.map((c) => c.category.name).join(", ") || "sin categorías"}
                  </p>
                  <p className="mt-1 text-xs text-ink-500">
                    {t.hasCfdiCapability ? `CFDI: ${t.rfc}` : "Sin CFDI"} · Stripe: {t.stripeChargesEnabled ? "OK" : "pendiente"} · Reservas: {t._count.bookings} · Alta {formatDate(t.createdAt)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <StatusBadge label={TECNICO_STATUS_LABELS[t.status] ?? t.status} tone={tecnicoStatusTone(t.status)} />
                  <TecnicoStatusActions id={t.id} status={t.status} />
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
