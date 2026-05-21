import { prisma } from "@/lib/db";
import { BOOKING_STATUS_LABELS, formatDate, formatMxn } from "@/lib/format";
import { StatusBadge, bookingStatusTone } from "@/components/StatusBadge";
import { RefundButton } from "@/components/admin/RefundButton";

export const dynamic = "force-dynamic";

const FILTERS = ["", "PENDING_PAYMENT", "PAID", "IN_PROGRESS", "COMPLETED", "DISPUTED", "CANCELLED", "REFUNDED"];

export default async function AdminBookings({ searchParams }: { searchParams: { status?: string } }) {
  const status = searchParams.status;
  const bookings = await prisma.booking.findMany({
    where: status
      ? {
          status: status as
            | "PENDING_PAYMENT"
            | "PAID"
            | "IN_PROGRESS"
            | "COMPLETED"
            | "DISPUTED"
            | "CANCELLED"
            | "REFUNDED",
        }
      : undefined,
    orderBy: { createdAt: "desc" },
    take: 100,
    include: {
      request: { select: { title: true } },
      tecnico: { select: { displayName: true, rfc: true } },
      payment: { select: { status: true, refundedAmountCents: true } },
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-ink-900">Reservas</h1>
      <div className="flex flex-wrap gap-2 text-xs">
        {FILTERS.map((s) => (
          <a key={s || "all"} href={s ? `?status=${s}` : "?"} className={`rounded-full border px-3 py-1.5 ${status === s || (!status && !s) ? "border-ink-900 bg-ink-900 text-white" : "border-ink-200 text-ink-700"}`}>
            {s ? BOOKING_STATUS_LABELS[s] ?? s : "Todos"}
          </a>
        ))}
      </div>
      <ul className="space-y-3">
        {bookings.length === 0 ? (
          <li className="rounded-2xl border border-ink-100 bg-white p-10 text-center text-sm text-ink-500">Sin resultados.</li>
        ) : (
          bookings.map((b) => (
            <li key={b.id} className="rounded-2xl border border-ink-100 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-ink-900">{b.request.title}</p>
                  <p className="text-xs text-ink-500">
                    {b.tecnico.displayName} · {formatDate(b.createdAt)} · Total {formatMxn(b.totalAmountCents)} · Reembolsado {formatMxn(b.payment?.refundedAmountCents ?? 0)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge label={BOOKING_STATUS_LABELS[b.status] ?? b.status} tone={bookingStatusTone(b.status)} />
                  {b.status === "PAID" || b.status === "IN_PROGRESS" || b.status === "COMPLETED" || b.status === "DISPUTED" ? (
                    <RefundButton bookingId={b.id} maxRefund={b.totalAmountCents - (b.payment?.refundedAmountCents ?? 0)} />
                  ) : null}
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
