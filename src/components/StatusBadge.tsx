import { cn } from "@/lib/utils";

type Tone = "neutral" | "info" | "success" | "warning" | "danger";

const TONES: Record<Tone, string> = {
  neutral: "border-ink-200 bg-ink-50 text-ink-700",
  info: "border-sky-200 bg-sky-50 text-sky-800",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  danger: "border-rose-200 bg-rose-50 text-rose-800",
};

export function StatusBadge({ label, tone = "neutral" }: { label: string; tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        TONES[tone],
      )}
    >
      {label}
    </span>
  );
}

export function bookingStatusTone(status: string): Tone {
  switch (status) {
    case "COMPLETED":
    case "PAID":
      return "success";
    case "IN_PROGRESS":
    case "PENDING_PAYMENT":
      return "info";
    case "DISPUTED":
      return "warning";
    case "CANCELLED":
    case "REFUNDED":
      return "danger";
    default:
      return "neutral";
  }
}

export function requestStatusTone(status: string): Tone {
  switch (status) {
    case "OPEN":
    case "QUOTED":
      return "info";
    case "ACCEPTED":
      return "success";
    case "CANCELLED":
    case "EXPIRED":
      return "danger";
    default:
      return "neutral";
  }
}

export function tecnicoStatusTone(status: string): Tone {
  switch (status) {
    case "APPROVED":
      return "success";
    case "PENDING":
      return "warning";
    case "SUSPENDED":
    case "REJECTED":
      return "danger";
    default:
      return "neutral";
  }
}

export function cfdiStatusTone(status: string): Tone {
  switch (status) {
    case "ISSUED":
      return "success";
    case "PENDING":
      return "info";
    case "FAILED":
      return "danger";
    case "CANCELLED":
      return "neutral";
    default:
      return "neutral";
  }
}
