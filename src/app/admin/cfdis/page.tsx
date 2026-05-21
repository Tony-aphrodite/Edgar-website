import { prisma } from "@/lib/db";
import { formatDate, formatMxn } from "@/lib/format";
import { StatusBadge, cfdiStatusTone } from "@/components/StatusBadge";
import { CfdiRetryButton } from "@/components/admin/CfdiRetryButton";

export const dynamic = "force-dynamic";

export default async function AdminCfdis({ searchParams }: { searchParams: { status?: string } }) {
  const status = searchParams.status;
  const rows = await prisma.commissionCfdi.findMany({
    where: status
      ? { status: status as "PENDING" | "ISSUED" | "FAILED" | "CANCELLED" }
      : undefined,
    orderBy: { updatedAt: "desc" },
    take: 200,
    include: {
      booking: {
        select: {
          id: true,
          commissionAmountCents: true,
          tecnico: { select: { displayName: true, rfc: true, hasCfdiCapability: true } },
        },
      },
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-ink-900">CFDI de comisiones</h1>
      <div className="flex flex-wrap gap-2 text-xs">
        {["", "PENDING", "ISSUED", "FAILED", "CANCELLED"].map((s) => (
          <a key={s || "all"} href={s ? `?status=${s}` : "?"} className={`rounded-full border px-3 py-1.5 ${status === s || (!status && !s) ? "border-ink-900 bg-ink-900 text-white" : "border-ink-200 text-ink-700"}`}>
            {s || "Todos"}
          </a>
        ))}
      </div>
      <ul className="space-y-3">
        {rows.length === 0 ? (
          <li className="rounded-2xl border border-ink-100 bg-white p-10 text-center text-sm text-ink-500">Sin resultados.</li>
        ) : (
          rows.map((r) => (
            <li key={r.bookingId} className="rounded-2xl border border-ink-100 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-ink-900">{r.booking.tecnico.displayName}</p>
                  <p className="text-xs text-ink-500">
                    {r.booking.tecnico.rfc ?? "sin RFC"} · comisión {formatMxn(r.booking.commissionAmountCents)} · {formatDate(r.updatedAt)}
                  </p>
                  {r.uuid ? <p className="font-mono text-xs text-ink-500">UUID {r.uuid}</p> : null}
                  {r.errorMessage ? <p className="mt-1 text-xs text-rose-700">{r.errorMessage}</p> : null}
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge label={r.status} tone={cfdiStatusTone(r.status)} />
                  {r.status === "FAILED" ? <CfdiRetryButton bookingId={r.bookingId} /> : null}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
