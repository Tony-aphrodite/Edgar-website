"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Layers, Sparkles, TrendingUp, Compass, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  gradient: string;
  span: string;
  visual: React.ReactNode;
};

const services: Service[] = [
  {
    icon: Layers,
    title: "Diseño Web",
    description:
      "Sitios modernos, rápidos y optimizados, construidos a la medida de tu marca y tus métricas.",
    features: ["UX/UI a medida", "Next.js · WordPress", "SEO técnico", "LCP < 1.5s"],
    gradient: "from-indigo-500/30 via-violet-500/20 to-fuchsia-500/30",
    span: "lg:col-span-3 lg:row-span-2",
    visual: <DesignVisual />,
  },
  {
    icon: Sparkles,
    title: "Branding",
    description: "Identidad visual coherente que conecta con tu audiencia.",
    features: ["Logotipo", "Sistema visual", "Manual de marca"],
    gradient: "from-amber-300/30 via-rose-400/20 to-pink-500/30",
    span: "lg:col-span-2",
    visual: <BrandingVisual />,
  },
  {
    icon: TrendingUp,
    title: "Marketing",
    description: "Crecimiento medible: SEO, redes y publicidad pagada.",
    features: ["Meta Ads", "Google Ads", "SEO de contenido"],
    gradient: "from-emerald-300/30 via-teal-400/20 to-sky-500/30",
    span: "lg:col-span-2",
    visual: <MarketingVisual />,
  },
  {
    icon: Compass,
    title: "Consultoría",
    description:
      "Te acompañamos a definir tu estrategia digital y a priorizar las inversiones que importan.",
    features: ["Auditoría", "Roadmap", "CRO", "Mentoría"],
    gradient: "from-sky-400/30 via-cyan-300/20 to-emerald-400/30",
    span: "lg:col-span-3",
    visual: <ConsultingVisual />,
  },
];

export function Services() {
  return (
    <section id="servicios" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-50" />
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-ink-200/80 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-ink-500 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
              Servicios
            </div>
            <h2 className="mt-5 max-w-2xl text-balance text-display-lg text-ink-900">
              Una agencia,{" "}
              <span className="font-serif italic font-normal text-ink-500">
                cuatro disciplinas
              </span>{" "}
              que se potencian.
            </h2>
          </div>
          <Link
            href="/servicios"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink-600 hover:text-ink-900"
          >
            Ver todos los servicios
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-5 lg:auto-rows-[minmax(220px,auto)]">
          {services.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-ink-200 hover:shadow-card sm:p-8 ${service.span}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 -z-0 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-ink-900 text-white shadow-soft transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[-4deg]">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-400 transition-all duration-300 group-hover:border-ink-900 group-hover:bg-ink-900 group-hover:text-white">
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>

      <h3 className="relative mt-7 text-xl font-semibold tracking-tight text-ink-900 sm:text-2xl">
        {service.title}
      </h3>
      <p className="relative mt-2.5 max-w-md text-sm text-ink-500 sm:text-[15px]">
        {service.description}
      </p>

      <ul className="relative mt-5 flex flex-wrap gap-1.5">
        {service.features.map((f) => (
          <li
            key={f}
            className="inline-flex items-center rounded-full border border-ink-200/80 bg-white/70 px-2.5 py-1 text-[11px] font-medium text-ink-600 backdrop-blur"
          >
            {f}
          </li>
        ))}
      </ul>

      <div className="relative mt-auto pt-6">{service.visual}</div>
    </motion.article>
  );
}

function DesignVisual() {
  return (
    <div className="relative h-44 overflow-hidden rounded-2xl border border-ink-100 bg-gradient-to-br from-ink-900 to-ink-800 p-4 sm:h-56">
      <div className="absolute inset-x-4 top-4 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-rose-400" />
        <span className="h-2 w-2 rounded-full bg-amber-400" />
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
      </div>
      <div className="absolute inset-x-4 top-10 flex flex-col gap-2">
        <div className="h-2 w-1/2 rounded-full bg-white/30" />
        <div className="h-2 w-3/4 rounded-full bg-white/15" />
        <div className="mt-3 grid grid-cols-3 gap-2">
          <div className="h-10 rounded-md bg-gradient-to-br from-indigo-400 to-violet-500" />
          <div className="h-10 rounded-md bg-gradient-to-br from-fuchsia-400 to-pink-500" />
          <div className="h-10 rounded-md bg-gradient-to-br from-amber-300 to-orange-500" />
        </div>
        <div className="mt-2 h-1.5 w-2/3 rounded-full bg-white/15" />
        <div className="h-1.5 w-1/2 rounded-full bg-white/15" />
      </div>
      <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-gradient-accent blur-2xl opacity-70" />
    </div>
  );
}

function BrandingVisual() {
  return (
    <div className="relative h-32 overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100 via-rose-100 to-pink-100">
      <div className="absolute inset-0 grid grid-cols-3 gap-1.5 p-3">
        {["#0a0a0f", "#f59e0b", "#ec4899"].map((c) => (
          <div key={c} className="rounded-lg" style={{ background: c }} />
        ))}
      </div>
      <div className="absolute bottom-2 right-3 font-serif text-3xl italic text-ink-900">
        Aa
      </div>
    </div>
  );
}

function MarketingVisual() {
  return (
    <div className="relative h-32 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-50 to-sky-50 p-3">
      <svg viewBox="0 0 200 100" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
        <path
          d="M0 80 L 30 60 L 60 70 L 90 40 L 120 50 L 150 25 L 200 10"
          stroke="url(#line-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M0 80 L 30 60 L 60 70 L 90 40 L 120 50 L 150 25 L 200 10 L 200 100 L 0 100 Z"
          fill="url(#line-grad)"
          opacity="0.15"
        />
        {[
          [30, 60],
          [90, 40],
          [150, 25],
        ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#10b981" />
        ))}
      </svg>
      <div className="absolute right-3 top-3 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
        +218%
      </div>
    </div>
  );
}

function ConsultingVisual() {
  return (
    <div className="relative h-44 overflow-hidden rounded-2xl border border-ink-100 bg-white sm:h-56">
      <div className="absolute inset-0 grid grid-cols-2 gap-2 p-3">
        {[
          { label: "Audiencia", v: "85%" },
          { label: "Mercado", v: "Top 5" },
          { label: "Conversión", v: "3.4%" },
          { label: "Retención", v: "92%" },
        ].map((m, i) => (
          <div
            key={m.label}
            className="flex flex-col justify-between rounded-xl border border-ink-100 p-2.5"
            style={{
              background: ["#fafafa", "#f5f3ff", "#ecfdf5", "#fff7ed"][i],
            }}
          >
            <div className="text-[10px] uppercase tracking-widest text-ink-400">
              {m.label}
            </div>
            <div className="text-base font-semibold text-ink-900">{m.v}</div>
          </div>
        ))}
      </div>
      <div className="absolute right-3 top-3 rounded-full bg-ink-900 px-2 py-0.5 text-[10px] font-medium text-white">
        Q2 2026
      </div>
    </div>
  );
}
