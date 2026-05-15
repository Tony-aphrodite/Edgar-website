"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Smartphone,
  Briefcase,
  ShieldCheck,
  CreditCard,
  ClipboardList,
  BadgeCheck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";

const clientBenefits = [
  { icon: ShieldCheck, label: "Técnicos verificados" },
  { icon: ClipboardList, label: "Cotización antes de aprobar" },
  { icon: CreditCard, label: "Pago seguro con Stripe" },
];

const technicianBenefits = [
  { icon: BadgeCheck, label: "Registro sin costo" },
  { icon: Briefcase, label: "Solicitudes de tu zona" },
  { icon: CreditCard, label: "Cobro automático" },
];

export function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink-200/80 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-ink-500 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
            Dos caras de la misma plataforma
          </div>
          <h2 className="mt-5 text-balance text-display-lg text-ink-900">
            ServiTec es para{" "}
            <span className="font-serif italic font-normal text-ink-500">
              quien resuelve
            </span>{" "}
            y para quien necesita resolver.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {/* Cliente */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white p-8 shadow-soft sm:p-10"
          >
            <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-indigo-100/60 via-violet-100/40 to-rose-100/60 opacity-60" />

            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-white shadow-soft">
              <Smartphone className="h-5 w-5" strokeWidth={1.75} />
            </div>

            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
              Para ti, en casa
            </h3>
            <p className="mt-3 text-pretty text-ink-500">
              Descarga la app, describe lo que necesitas y recibe cotizaciones de técnicos verificados de tu zona. Aprueba la que más te convenza y paga seguro desde el celular.
            </p>

            <ul className="mt-6 space-y-2.5">
              {clientBenefits.map((b) => {
                const Icon = b.icon;
                return (
                  <li key={b.label} className="flex items-center gap-3 text-sm text-ink-700">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 text-white">
                      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                    {b.label}
                  </li>
                );
              })}
            </ul>

            <Link
              href="#descargar"
              className="group mt-8 inline-flex h-11 items-center gap-2 self-start rounded-full bg-ink-900 px-5 text-sm font-medium text-white transition hover:bg-ink-800"
            >
              Descargar la app
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.article>

          {/* Técnico */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col overflow-hidden rounded-3xl bg-ink-900 p-8 text-white shadow-card sm:p-10"
          >
            <div className="aurora opacity-40" />
            <div className="absolute inset-0 -z-10 grid-bg-dark opacity-40" />

            <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
              <Briefcase className="h-5 w-5" strokeWidth={1.75} />
            </div>

            <h3 className="relative mt-6 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Para ti, técnico
            </h3>
            <p className="relative mt-3 text-pretty text-white/70">
              Registrarte y publicar tu perfil no tiene costo. Recibe solicitudes de tu zona, envía cotizaciones y cobra de forma automática. ServiTec solo cobra una comisión cuando completas un servicio.
            </p>

            <ul className="relative mt-6 space-y-2.5">
              {technicianBenefits.map((b) => {
                const Icon = b.icon;
                return (
                  <li key={b.label} className="flex items-center gap-3 text-sm text-white/85">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white">
                      <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                    {b.label}
                  </li>
                );
              })}
            </ul>

            <Link
              href="/tecnicos"
              className="group relative mt-8 inline-flex h-11 items-center gap-2 self-start rounded-full bg-white px-5 text-sm font-medium text-ink-900 transition hover:bg-white/90"
            >
              Quiero trabajar como técnico
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.article>
        </div>
      </Container>
    </section>
  );
}
