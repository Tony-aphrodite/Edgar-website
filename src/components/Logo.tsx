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
      aria-label="ServiTec — Inicio"
    >
      <span
        className={cn(
          "relative inline-flex h-9 w-9 items-center justify-center rounded-xl shadow-soft",
          invert ? "bg-white text-ink-900" : "bg-ink-900 text-white",
        )}
      >
        <svg
          width="20"
          height="20"
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
          {/* Llave + casa estilizadas: símbolo de servicios a domicilio */}
          <path
            d="M3 11 L12 4 L21 11 V20 H14 V14 H10 V20 H3 Z"
            stroke="url(#logo-grad)"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
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
        Servi
        <span className={cn(invert ? "text-white/60" : "text-ink-400")}>
          Tec
        </span>
      </span>
    </Link>
  );
}
