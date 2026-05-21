import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { BOOKING_STATUS_LABELS, formatDate, formatMxn } from "@/lib/format";
import { StatusBadge, bookingStatusTone } from "@/components/StatusBadge";

export const dynamic = "force-dynamic";

export default async function TrabajosPage() {
  const session = await auth();
  const profile = await prisma.tecnicoProfile.findUnique({
    where: { userId: session!.user.id },
    select: { id: true },
  });
  if (!profile) {
    return (
      <div className="rounded-2xl border border-ink-100 bg-white p-10 text-center text-sm text-ink-500">
        Necesitas completar tu perfil de técnico.
      </div>
    );
  }

  const bookings = await prisma.booking.findMany({
    where: { tecnicoId: profile.id },
    orderBy: { createdAt: "desc" },
    include: {
      request: { select: { title: true } },
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-ink-900">Mis trabajos</h1>
      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-ink-100 bg-white p-10 text-center text-sm text-ink-500">
          Aún no tienes trabajos asignados.
        </div>
      ) : (
        <ul className="space-y-3">
          {bookings.map((b) => (
            <li key={b.id} className="rounded-2xl border border-ink-100 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Link href={`/cuenta/reservas/${b.id}`} className="font-semibold text-ink-900 hover:underline">
                    {b.request.title}
                  </Link>
                  <p className="mt-1 text-xs text-ink-500">
                    {formatDate(b.createdAt)} · Recibes {formatMxn(b.tecnicoNetCents)}
                  </p>
                </div>
                <StatusBadge label={BOOKING_STATUS_LABELS[b.status] ?? b.status} tone={bookingStatusTone(b.status)} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
