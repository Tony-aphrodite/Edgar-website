"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Smartphone,
  ShieldCheck,
  LockKeyhole,
  MapPin,
  Zap,
  Wrench,
  SprayCan,
  Paintbrush,
  Hammer,
  Key,
} from "lucide-react";
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
              Disponible en Ciudad de México y zona metropolitana
            </div>

            <h1 className="mt-7 text-balance text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-white">
              Técnicos de confianza
              <br className="hidden sm:block" />{" "}
              <span className="font-serif italic font-normal text-white/95">
                para tu hogar,
              </span>{" "}
              <span className="relative inline-block">
                <span className="relative z-10 gradient-text-warm">
                  a un toque.
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
              ServiTec conecta a clientes con{" "}
              <span className="font-serif italic text-white/90">técnicos verificados</span>{" "}
              de electricidad, plomería, limpieza y más. Solicita, recibe{" "}
              <span className="font-serif italic text-white/90">cotización</span> y paga{" "}
              <span className="font-serif italic text-white/90">seguro</span> desde la app.
            </p>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <Link
                href="#descargar"
                className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-white px-6 text-[15px] font-medium text-ink-900 shadow-[0_8px_30px_rgba(255,255,255,0.16)] transition-all hover:-translate-y-px"
              >
                <Smartphone className="relative z-10 h-4 w-4" />
                <span className="relative z-10">Descargar la app</span>
                <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-accent transition-transform duration-500 ease-out group-hover:translate-y-0" />
              </Link>
              <Link
                href="/tecnicos"
                className="group inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 text-[15px] font-medium text-white backdrop-blur transition-all hover:border-white/40 hover:bg-white/10"
              >
                Quiero trabajar como técnico
                <ArrowUpRight className="h-4 w-4 text-white/70 transition group-hover:text-white" />
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/65">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                <span>Técnicos verificados</span>
              </div>
              <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
              <div className="flex items-center gap-2">
                <LockKeyhole className="h-4 w-4 text-sky-300" />
                <span>Pago seguro en la app</span>
              </div>
              <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:block" />
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent-violet" />
                <span>Cobertura local</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto mt-20 max-w-6xl"
          >
            <AppPreview />
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

const heroCategories = [
  { icon: Zap, label: "Electricidad", color: "from-amber-400 to-orange-500" },
  { icon: Wrench, label: "Plomería", color: "from-sky-400 to-indigo-500" },
  { icon: SprayCan, label: "Limpieza", color: "from-emerald-400 to-teal-500" },
  { icon: Paintbrush, label: "Pintura", color: "from-rose-400 to-pink-500" },
  { icon: Hammer, label: "Carpintería", color: "from-amber-500 to-rose-500" },
  { icon: Key, label: "Cerrajería", color: "from-violet-400 to-fuchsia-500" },
];

function AppPreview() {
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
              app.servitec.mx · solicitar servicio
            </div>
          </div>

          {/* Body */}
          <div className="grid gap-6 p-6 sm:grid-cols-12 sm:gap-8 sm:p-10">
            <div className="sm:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-ink-100 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-ink-600">
                Paso 1 · Elige una categoría
              </div>
              <h3 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-ink-900 sm:text-[2rem] sm:leading-tight">
                ¿Qué necesitas hoy{" "}
                <span className="font-serif italic font-normal text-ink-500">
                  en casa?
                </span>
              </h3>
              <p className="mt-3 text-sm text-ink-500 sm:text-base">
                Selecciona el tipo de servicio. En minutos recibirás cotizaciones de técnicos verificados de tu zona.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {heroCategories.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div
                      key={c.label}
                      className="flex flex-col items-center gap-2 rounded-2xl border border-ink-100 bg-white p-3 text-center transition hover:-translate-y-0.5 hover:shadow-soft"
                    >
                      <span
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} text-white`}
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.8} />
                      </span>
                      <span className="text-[11px] font-medium text-ink-700">
                        {c.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="sm:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-100 via-violet-100 to-rose-100">
                <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_120%,rgba(255,255,255,0.6),transparent)]" />

                {/* Tarjeta de cotización ejemplo */}
                <div className="absolute inset-4 flex flex-col gap-3 rounded-2xl bg-white/95 p-4 shadow-card backdrop-blur">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Verificado
                    </div>
                    <span className="text-[10px] text-ink-400">Plomería</span>
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-ink-400">
                      Cotización
                    </div>
                    <div className="font-serif text-lg italic text-ink-900">
                      Fuga en cocina
                    </div>
                  </div>
                  <div className="space-y-1.5 border-t border-ink-100 pt-3 text-[12px] text-ink-600">
                    <div className="flex justify-between">
                      <span>Mano de obra</span>
                      <span className="font-medium text-ink-900">$450</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Materiales</span>
                      <span className="font-medium text-ink-900">$210</span>
                    </div>
                    <div className="flex justify-between border-t border-ink-100 pt-1.5">
                      <span className="font-semibold text-ink-900">Total</span>
                      <span className="font-semibold text-ink-900">$660 MXN</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-auto inline-flex h-9 items-center justify-center rounded-full bg-ink-900 text-[12px] font-medium text-white"
                  >
                    Aprobar y agendar
                  </button>
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
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-ink-400">Identidad</div>
            <div className="text-base font-semibold text-ink-900">Validada</div>
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
        <div className="text-xs uppercase tracking-widest text-ink-400">Pago seguro</div>
        <div className="mt-1 font-serif text-lg italic text-ink-900">Stripe</div>
      </motion.div>
    </div>
  );
}
