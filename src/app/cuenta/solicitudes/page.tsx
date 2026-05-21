import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatDate, formatMxn, REQUEST_STATUS_LABELS } from "@/lib/format";
import { StatusBadge, requestStatusTone } from "@/components/StatusBadge";

export const dynamic = "force-dynamic";

export default async function MisSolicitudesPage() {
  const session = await auth();
  const requests = await prisma.serviceRequest.findMany({
    where: { clientId: session!.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      category: { select: { name: true } },
      quotes: { select: { id: true, status: true, totalAmountCents: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-ink-900">Mis solicitudes</h1>
        <Link
          href="/servicios/solicitar"
          className="rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Nueva solicitud
        </Link>
      </div>

      {requests.length === 0 ? (
        <div className="rounded-2xl border border-ink-100 bg-white p-10 text-center text-sm text-ink-500">
          Aún no creas ninguna solicitud.
        </div>
      ) : (
        <ul className="space-y-3">
          {requests.map((r) => {
            const lowest = r.quotes.reduce<number | null>((min, q) => {
              if (q.status !== "PENDING") return min;
              return min === null ? q.totalAmountCents : Math.min(min, q.totalAmountCents);
            }, null);
            return (
              <li key={r.id} className="rounded-2xl border border-ink-100 bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <Link href={`/cuenta/solicitudes/${r.id}`} className="text-base font-semibold text-ink-900 hover:underline">
                      {r.title}
                    </Link>
                    <p className="mt-1 text-xs text-ink-500">
                      {r.category.name} · {formatDate(r.createdAt)} · {r.quotes.length} cotizaciones
                    </p>
                  </div>
                  <div className="text-right text-sm">
                    <StatusBadge label={REQUEST_STATUS_LABELS[r.status] ?? r.status} tone={requestStatusTone(r.status)} />
                    {lowest !== null ? (
                      <p className="mt-1 text-xs text-ink-500">Desde {formatMxn(lowest)}</p>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
