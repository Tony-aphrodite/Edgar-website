import { prisma } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const [pendingTec, failedCfdi, paidBookings, newMessages] = await Promise.all([
    prisma.tecnicoProfile.count({ where: { status: "PENDING" } }),
    prisma.commissionCfdi.count({ where: { status: "FAILED" } }),
    prisma.booking.count({ where: { status: { in: ["PAID", "IN_PROGRESS"] } } }),
    prisma.contactMessage.count({ where: { status: "NEW" } }),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-ink-900">Panel de administración</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Tile title="Técnicos pendientes" value={pendingTec} href="/admin/tecnicos?status=PENDING" tone={pendingTec > 0 ? "warning" : "neutral"} />
        <Tile title="CFDI fallidos" value={failedCfdi} href="/admin/cfdis?status=FAILED" tone={failedCfdi > 0 ? "danger" : "neutral"} />
        <Tile title="Trabajos activos" value={paidBookings} href="/admin/bookings?status=PAID" tone="info" />
        <Tile title="Mensajes nuevos" value={newMessages} href="/admin/mensajes" tone={newMessages > 0 ? "info" : "neutral"} />
      </div>
    </div>
  );
}

const TILE_TONES = {
  neutral: "border-ink-100 bg-white",
  info: "border-sky-200 bg-sky-50",
  warning: "border-amber-200 bg-amber-50",
  danger: "border-rose-200 bg-rose-50",
};

function Tile({ title, value, href, tone }: { title: string; value: number; href: string; tone: keyof typeof TILE_TONES }) {
  return (
    <Link href={href} className={`block rounded-2xl border p-5 transition hover:border-ink-300 ${TILE_TONES[tone]}`}>
      <p className="text-xs uppercase tracking-widest text-ink-500">{title}</p>
      <p className="mt-2 text-3xl font-semibold text-ink-900">{value}</p>
    </Link>
  );
}
