// Small UI formatting helpers shared by dashboards.

export function formatMxn(cents: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

export function formatDate(d: Date | string | null | undefined): string {
  if (!d) return "—";
  const date = typeof d === "string" ? new Date(d) : d;
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export const BOOKING_STATUS_LABELS: Record<string, string> = {
  PENDING_PAYMENT: "Esperando pago",
  PAID: "Pagado",
  IN_PROGRESS: "En curso",
  COMPLETED: "Completado",
  DISPUTED: "En disputa",
  CANCELLED: "Cancelado",
  REFUNDED: "Reembolsado",
};

export const REQUEST_STATUS_LABELS: Record<string, string> = {
  OPEN: "Recibiendo cotizaciones",
  QUOTED: "Cotizado",
  ACCEPTED: "Aceptado",
  CANCELLED: "Cancelado",
  EXPIRED: "Vencido",
};

export const QUOTE_STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendiente",
  ACCEPTED: "Aceptada",
  REJECTED: "Rechazada",
  EXPIRED: "Vencida",
  WITHDRAWN: "Retirada",
};

export const TECNICO_STATUS_LABELS: Record<string, string> = {
  PENDING: "Pendiente",
  APPROVED: "Aprobado",
  SUSPENDED: "Suspendido",
  REJECTED: "Rechazado",
};
