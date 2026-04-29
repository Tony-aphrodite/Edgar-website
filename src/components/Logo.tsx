import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  href = "/",
  invert = false,
}: {
  className?: string;
  href?: string;
  invert?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 font-semibold tracking-tight",
        className,
      )}
      aria-label="Edgar Studio — Inicio"
    >
      <span
        className={cn(
          "relative inline-flex h-9 w-9 items-center justify-center rounded-xl shadow-soft",
          invert ? "bg-white text-ink-900" : "bg-ink-900 text-white",
        )}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient id="logo-grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={invert ? "#6366f1" : "#a5b4fc"} />
              <stop offset="50%" stopColor={invert ? "#a855f7" : "#c4b5fd"} />
              <stop offset="100%" stopColor={invert ? "#ec4899" : "#f0abfc"} />
            </linearGradient>
          </defs>
          <path
            d="M5 4h14M5 12h10M5 20h14"
            stroke="url(#logo-grad)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute -inset-px rounded-xl ring-1 ring-white/10" />
      </span>
      <span
        className={cn(
          "text-[17px]",
          invert ? "text-white" : "text-ink-900",
        )}
      >
        Edgar
        <span className={cn(invert ? "text-white/50" : "text-ink-400")}>
          {" Studio"}
        </span>
      </span>
    </Link>
  );
}
