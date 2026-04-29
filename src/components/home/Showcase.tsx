"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

type CaseStudy = {
  client: string;
  title: string;
  category: string;
  metric: { value: string; label: string };
  visual: React.ReactNode;
  bgClass: string;
};

const cases: CaseStudy[] = [
  {
    client: "Mar y Sol",
    title: "Una marca que sabe a verano todo el año",
    category: "Restaurante · Branding + Web",
    metric: { value: "+218%", label: "Reservas online" },
    bgClass: "bg-gradient-to-br from-amber-200 via-rose-300 to-pink-400",
    visual: <MarSolVisual />,
  },
  {
    client: "Sonrisas",
    title: "De clínica local a marca de confianza",
    category: "Clínica dental · Marketing + Web",
    metric: { value: "2.1×", label: "Pacientes / mes" },
    bgClass: "bg-gradient-to-br from-sky-200 via-cyan-300 to-emerald-300",
    visual: <SonrisasVisual />,
  },
  {
    client: "Florencia",
    title: "El alma de una boutique en cada pixel",
    category: "Boutique · E-commerce + Branding",
    metric: { value: "$1.2M", label: "Ventas anuales" },
    bgClass: "bg-gradient-to-br from-violet-300 via-fuchsia-300 to-rose-300",
    visual: <FlorenciaVisual />,
  },
];

export function Showcase() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-ink-200/80 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-ink-500 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
              Casos de estudio
            </div>
            <h2 className="mt-5 text-balance text-display-lg text-ink-900">
              Algunos proyectos de los que{" "}
              <span className="font-serif italic font-normal text-ink-500">
                estamos orgullosos
              </span>
              .
            </h2>
          </div>
          <Link
            href="/contacto"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink-600 hover:text-ink-900"
          >
            ¿Tu marca podría ser la siguiente?
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {cases.map((c, i) => (
            <motion.article
              key={c.client}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card"
            >
              <div className={`relative aspect-[4/3] overflow-hidden ${c.bgClass}`}>
                <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_120%,rgba(255,255,255,0.5),transparent)]" />
                {c.visual}

                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-ink-700 backdrop-blur">
                  {c.category}
                </div>

                <div className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/0 text-white/0 transition-all duration-300 group-hover:bg-white group-hover:text-ink-900">
                  <ArrowUpRight className="h-4 w-4" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="rounded-xl bg-white/90 px-3 py-2 backdrop-blur">
                    <div className="text-[10px] uppercase tracking-widest text-ink-500">
                      Cliente
                    </div>
                    <div className="font-serif text-lg italic text-ink-900">
                      {c.client}
                    </div>
                  </div>
                  <div className="rounded-xl bg-ink-900/95 px-3 py-2 text-right text-white backdrop-blur">
                    <div className="text-base font-semibold sm:text-lg">
                      {c.metric.value}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-white/60">
                      {c.metric.label}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <h3 className="text-balance text-lg font-semibold text-ink-900 sm:text-xl">
                  {c.title}
                </h3>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function MarSolVisual() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="ms-wave" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fb7185" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <circle cx="320" cy="80" r="55" fill="#fde68a" />
      <circle cx="320" cy="80" r="80" fill="#fcd34d" opacity="0.3" />
      <path d="M0 180 Q 100 145 200 180 T 400 180 V 300 H 0 Z" fill="url(#ms-wave)" />
      <path d="M0 220 Q 100 185 200 220 T 400 220 V 300 H 0 Z" fill="rgba(244, 63, 94, 0.45)" />
      <text
        x="40"
        y="115"
        fontFamily="var(--font-serif), Georgia, serif"
        fontStyle="italic"
        fontSize="58"
        fill="#0a0a0f"
      >
        Mar y Sol
      </text>
    </svg>
  );
}

function SonrisasVisual() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="son-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="120" r="120" fill="url(#son-glow)" />
      <path
        d="M120 150 Q 200 230 280 150"
        stroke="#0a0a0f"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="155" cy="120" r="10" fill="#0a0a0f" />
      <circle cx="245" cy="120" r="10" fill="#0a0a0f" />
      <text
        x="200"
        y="270"
        textAnchor="middle"
        fontFamily="var(--font-geist-sans), sans-serif"
        fontWeight="600"
        letterSpacing="6"
        fontSize="20"
        fill="#0a0a0f"
      >
        SONRISAS
      </text>
    </svg>
  );
}

function FlorenciaVisual() {
  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="fl-petal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#fce7f3" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {[0, 60, 120, 180, 240, 300].map((rot) => (
        <ellipse
          key={rot}
          cx="200"
          cy="130"
          rx="22"
          ry="62"
          fill="url(#fl-petal)"
          stroke="#fff"
          strokeWidth="1"
          transform={`rotate(${rot} 200 130)`}
        />
      ))}
      <circle cx="200" cy="130" r="18" fill="#fef3c7" />
      <text
        x="200"
        y="240"
        textAnchor="middle"
        fontFamily="var(--font-serif), Georgia, serif"
        fontStyle="italic"
        fontSize="44"
        fill="#0a0a0f"
      >
        Florencia
      </text>
    </svg>
  );
}
