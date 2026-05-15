"use client";

import { motion } from "framer-motion";
import { ShieldCheck, LockKeyhole, BadgeCheck, Headphones } from "lucide-react";
import { Container } from "@/components/ui/Container";

const items = [
  {
    icon: BadgeCheck,
    title: "100% verificados",
    description: "Identidad, domicilio y RFC validados antes de activar a un técnico.",
  },
  {
    icon: LockKeyhole,
    title: "Pago seguro",
    description: "Procesado por Stripe y liberado solo cuando completas el servicio.",
  },
  {
    icon: ShieldCheck,
    title: "Sin mensualidades",
    description: "Clientes y técnicos no pagan cuotas fijas. Solo al cerrar un servicio.",
  },
  {
    icon: Headphones,
    title: "Soporte humano",
    description: "Equipo de soporte de lunes a sábado para resolver imprevistos.",
  },
];

export function Stats() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-8 py-14 text-white sm:px-12 sm:py-20">
          <div className="aurora opacity-60" />
          <div className="absolute inset-0 -z-10 grid-bg-dark opacity-50" />

          <div className="relative grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-white/70 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]" />
                Lo que garantizamos
              </div>
              <h2 className="mt-5 text-balance text-display-lg text-white">
                Confianza, transparencia{" "}
                <span className="font-serif italic font-normal text-white/80">
                  y soporte real
                </span>
                .
              </h2>
              <p className="mt-5 max-w-md text-pretty text-white/65">
                ServiTec opera como marketplace: el cliente paga al técnico a través de la app y la plataforma cobra una comisión transparente.
              </p>
            </div>

            <div className="grid gap-y-10 lg:col-span-7 sm:grid-cols-2 sm:gap-x-8">
              {items.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="flex gap-4"
                  >
                    <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <div className="text-base font-semibold text-white">
                        {s.title}
                      </div>
                      <div className="mt-1 text-sm text-white/60">
                        {s.description}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
