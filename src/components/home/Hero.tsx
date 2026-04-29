"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, PlayCircle, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { clients } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-900 text-white">
      <div className="aurora" />
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg-dark opacity-80" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <Container>
        <div className="relative pb-24 pt-16 sm:pb-32 sm:pt-24 lg:pb-40 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto flex max-w-5xl flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Reservas abiertas — segundo trimestre 2026
            </div>

            <h1 className="mt-7 text-balance text-[clamp(2.75rem,7.5vw,6.75rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">
              Diseñamos marcas
              <br className="hidden sm:block" />{" "}
              <span className="font-serif italic font-normal text-white/95">
                que la gente
              </span>{" "}
              <span className="relative inline-block">
                <span className="relative z-10 gradient-text-warm">
                  no olvida.
                </span>
                <svg
                  aria-hidden
                  className="absolute -bottom-3 left-0 h-3 w-full text-accent-violet/70 sm:-bottom-4 sm:h-4"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9 Q 50 2, 100 7 T 198 5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-white/65 sm:text-xl">
              Somos un estudio digital que mezcla{" "}
              <span className="font-serif italic text-white/90">diseño</span>,{" "}
              <span className="font-serif italic text-white/90">código</span> y{" "}
              <span className="font-serif italic text-white/90">estrategia</span>{" "}
              para construir marcas y experiencias que crecen con tu negocio.
            </p>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <Link
                href="/contacto"
                className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-white px-6 text-[15px] font-medium text-ink-900 shadow-[0_8px_30px_rgba(255,255,255,0.16)] transition-all hover:-translate-y-px"
              >
                <span className="relative z-10">Empezar mi proyecto</span>
                <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-accent transition-transform duration-500 ease-out group-hover:translate-y-0" />
              </Link>
              <Link
                href="/servicios"
                className="group inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 text-[15px] font-medium text-white backdrop-blur transition-all hover:border-white/40 hover:bg-white/10"
              >
                <PlayCircle className="h-4 w-4 text-white/70 transition group-hover:text-white" />
                Ver servicios
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/55">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[
                    "from-pink-400 to-rose-500",
                    "from-amber-300 to-orange-500",
                    "from-emerald-300 to-teal-500",
                    "from-sky-400 to-indigo-500",
                  ].map((g, i) => (
                    <span
                      key={i}
                      className={`h-7 w-7 rounded-full bg-gradient-to-br ${g} ring-2 ring-ink-900`}
                    />
                  ))}
                </div>
                <span className="text-white/75">+60 clientes felices</span>
              </div>
              <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
              <div className="flex items-center gap-1.5">
                <span className="text-amber-300">★★★★★</span>
                <span>4.9 / 5 promedio</span>
              </div>
              <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-accent-violet" />
                <span>8 años de experiencia</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto mt-20 max-w-6xl"
          >
            <FloatingDashboard />
          </motion.div>
        </div>
      </Container>

      {/* Marquee strip at bottom of hero */}
      <div className="relative border-t border-white/10 bg-ink-900/80 backdrop-blur">
        <div className="overflow-hidden py-6 mask-fade-x">
          <div className="marquee flex w-max items-center gap-14 whitespace-nowrap [--marquee-duration:55s]">
            {[...clients, ...clients, ...clients].map((c, i) => (
              <span
                key={`${c}-${i}`}
                className="font-serif text-2xl italic text-white/40"
              >
                {c}
                <span className="mx-7 text-white/15">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingDashboard() {
  return (
    <div className="relative">
      <div className="absolute -inset-x-6 -top-10 -bottom-6 -z-10 rounded-[2.5rem] bg-gradient-to-b from-white/5 to-transparent blur-2xl" />

      <div className="ring-gradient ring-gradient-strong relative rounded-3xl bg-white shadow-[0_40px_120px_-20px_rgba(99,102,241,0.5)]">
        <div className="overflow-hidden rounded-3xl">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-ink-100 bg-ink-50/70 px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
            <div className="ml-3 flex h-7 flex-1 items-center justify-center rounded-full bg-white px-3 text-xs text-ink-400 shadow-soft">
              edgarstudio.mx/clientes/marysol
            </div>
          </div>

          {/* Body */}
          <div className="grid gap-6 p-6 sm:grid-cols-12 sm:gap-8 sm:p-10">
            <div className="sm:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-ink-100 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-ink-600">
                Caso de estudio · 2026
              </div>
              <h3 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-ink-900 sm:text-[2rem] sm:leading-tight">
                Mar y Sol triplicó sus reservas{" "}
                <span className="font-serif italic font-normal text-ink-500">
                  en tres meses
                </span>
              </h3>
              <p className="mt-3 text-sm text-ink-500 sm:text-base">
                Rediseñamos la marca, el sitio y lanzamos una campaña local que convirtió a desconocidos en comensales recurrentes.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { value: "+218%", label: "Reservas" },
                  { value: "1.1s", label: "LCP" },
                  { value: "94", label: "Lighthouse" },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl border border-ink-100 bg-white p-3 text-left"
                  >
                    <div className="bg-gradient-accent bg-clip-text text-lg font-semibold text-transparent sm:text-xl">
                      {m.value}
                    </div>
                    <div className="text-[11px] text-ink-400">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="sm:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-orange-100 via-rose-100 to-violet-100">
                <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_120%,rgba(255,255,255,0.6),transparent)]" />
                <svg viewBox="0 0 200 250" className="absolute inset-0 h-full w-full" aria-hidden>
                  <defs>
                    <linearGradient id="wave" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>
                  <path d="M0 150 Q 50 120 100 150 T 200 150 V 250 H 0 Z" fill="url(#wave)" />
                  <circle cx="155" cy="60" r="32" fill="#fde68a" />
                  <path
                    d="M0 180 Q 50 155 100 180 T 200 180 V 250 H 0 Z"
                    fill="rgba(244, 114, 182, 0.5)"
                  />
                </svg>
                <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/85 p-3 backdrop-blur">
                  <div className="text-[10px] font-medium uppercase tracking-widest text-ink-500">
                    Restaurante
                  </div>
                  <div className="text-sm font-semibold text-ink-900">
                    Mar y Sol · Polanco
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating stat card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute -left-4 top-32 hidden rounded-2xl border border-ink-100 bg-white p-4 shadow-card sm:block lg:-left-12"
      >
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-accent text-white">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-ink-400">Conversiones</div>
            <div className="text-base font-semibold text-ink-900">+218% MoM</div>
          </div>
        </div>
      </motion.div>

      {/* Floating tag card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute -right-4 bottom-20 hidden rounded-2xl border border-ink-100 bg-white p-4 shadow-card sm:block lg:-right-10"
      >
        <div className="text-xs uppercase tracking-widest text-ink-400">Cliente desde</div>
        <div className="mt-1 font-serif text-2xl italic text-ink-900">2024</div>
      </motion.div>
    </div>
  );
}
