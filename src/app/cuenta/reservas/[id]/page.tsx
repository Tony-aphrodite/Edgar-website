import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { BOOKING_STATUS_LABELS, formatDate, formatMxn } from "@/lib/format";
import { StatusBadge, bookingStatusTone, cfdiStatusTone } from "@/components/StatusBadge";
import { BookingActions } from "@/components/BookingActions";

export const dynamic = "force-dynamic";

export default async function ReservaDetalle({ params }: { params: { id: string } }) {
  const session = await auth();
  const booking = await prisma.booking.findUnique({
    where: { id: params.id },
    include: {
      request: { include: { category: true } },
      quote: true,
      tecnico: { select: { id: true, displayName: true, userId: true, rfc: true } },
      payment: true,
      commissionCfdi: true,
      review: true,
    },
  });
  if (!booking) notFound();
  const userId = session!.user.id;
  const isClient = booking.clientId === userId;
  const isTecnico = booking.tecnico.userId === userId;
  const isAdmin = session!.user.role === "ADMIN";
  if (!isClient && !isTecnico && !isAdmin) notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link href={isTecnico ? "/cuenta/trabajos" : "/cuenta/reservas"} className="text-xs text-ink-500 hover:underline">← Volver</Link>
          <h1 className="mt-2 text-2xl font-semibold text-ink-900">{booking.request.title}</h1>
          <p className="mt-1 text-sm text-ink-500">
            {booking.request.category.name} · {booking.tecnico.displayName}
          </p>
        </div>
        <StatusBadge label={BOOKING_STATUS_LABELS[booking.status] ?? booking.status} tone={bookingStatusTone(booking.status)} />
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <KV label="Total" value={formatMxn(booking.totalAmountCents)} />
        <KV label={isTecnico ? "Comisión (12%)" : "Comisión plataforma"} value={formatMxn(booking.commissionAmountCents)} />
        <KV label={isTecnico ? "Tú recibes" : "Pago al técnico"} value={formatMxn(booking.tecnicoNetCents)} />
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white p-5 text-sm">
        <h2 className="font-semibold text-ink-900">Detalle</h2>
        <p className="mt-2 whitespace-pre-line text-ink-700">{booking.request.description}</p>
        <p className="mt-3 text-ink-700">
          {booking.request.addressLine}, {booking.request.city}, C.P. {booking.request.postalCode}
        </p>
        <p className="mt-3 text-xs text-ink-500">
          Pagado: {booking.paidAt ? formatDate(booking.paidAt) : "—"} · Completado: {booking.completedAt ? formatDate(booking.completedAt) : "—"}
        </p>
      </div>

      {booking.commissionCfdi ? (
        <div className="rounded-2xl border border-ink-100 bg-white p-5 text-sm">
          <h2 className="flex items-center gap-2 font-semibold text-ink-900">
            CFDI de comisión
            <StatusBadge label={booking.commissionCfdi.status} tone={cfdiStatusTone(booking.commissionCfdi.status)} />
          </h2>
          {booking.commissionCfdi.uuid ? (
            <p className="mt-2 font-mono text-xs text-ink-600">UUID {booking.commissionCfdi.uuid}</p>
          ) : null}
          {booking.commissionCfdi.errorMessage ? (
            <p className="mt-2 text-xs text-rose-700">{booking.commissionCfdi.errorMessage}</p>
          ) : null}
        </div>
      ) : null}

      <BookingActions
        bookingId={booking.id}
        status={booking.status}
        isClient={isClient}
        isTecnico={isTecnico}
        hasReview={!!booking.review}
        existingReviewRating={booking.review?.rating}
        existingReviewComment={booking.review?.comment ?? ""}
      />
    </div>
  );
}

function KV({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-4">
      <p className="text-xs uppercase tracking-widest text-ink-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-ink-900">{value}</p>
    </div>
  );
}
