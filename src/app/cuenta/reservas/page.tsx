import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { BOOKING_STATUS_LABELS, formatDate, formatMxn } from "@/lib/format";
import { StatusBadge, bookingStatusTone } from "@/components/StatusBadge";

export const dynamic = "force-dynamic";

export default async function MisReservasPage() {
  const session = await auth();
  const bookings = await prisma.booking.findMany({
    where: { clientId: session!.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      request: { select: { title: true } },
      tecnico: { select: { displayName: true } },
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-ink-900">Mis reservas</h1>
      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-ink-100 bg-white p-10 text-center text-sm text-ink-500">
          Aún no tienes reservas. <Link href="/servicios/solicitar" className="underline-offset-4 hover:underline">Crea una solicitud</Link>.
        </div>
      ) : (
        <ul className="space-y-3">
          {bookings.map((b) => (
            <li key={b.id} className="rounded-2xl border border-ink-100 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Link href={`/cuenta/reservas/${b.id}`} className="text-base font-semibold text-ink-900 hover:underline">
                    {b.request.title}
                  </Link>
                  <p className="mt-1 text-xs text-ink-500">
                    {b.tecnico.displayName} · {formatDate(b.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <StatusBadge label={BOOKING_STATUS_LABELS[b.status] ?? b.status} tone={bookingStatusTone(b.status)} />
                  <p className="mt-1 text-sm">{formatMxn(b.totalAmountCents)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
