"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { pricing } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Pricing({ compact = false }: { compact?: boolean }) {
  return (
    <section id="precios" className={cn("relative", compact ? "py-16" : "py-24 sm:py-32")}>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink-200/80 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-ink-500 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
            Inversión
          </div>
          <h2 className="mt-5 text-balance text-display-lg text-ink-900">
            Planes claros,{" "}
            <span className="font-serif italic font-normal text-ink-500">
              sin letras pequeñas
            </span>
            .
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-ink-500">
            Elige el punto de partida que mejor se ajuste a tu negocio. Después podemos crecer juntos.
          </p>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {pricing.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "relative flex flex-col rounded-3xl p-8 sm:p-10",
                plan.highlighted
                  ? "shine-border bg-ink-900 text-white shadow-glow lg:-my-4 lg:scale-[1.02]"
                  : "border border-ink-100 bg-white text-ink-900 shadow-soft hover:border-ink-200 hover:shadow-card transition-all",
              )}
            >
              {plan.highlighted && (
                <>
                  <div className="aurora opacity-30" />
                  <div className="absolute inset-0 -z-10 grid-bg-dark opacity-40" />
                </>
              )}

              {plan.badge && (
                <div className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gradient-accent px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-soft">
                  <Sparkles className="h-3 w-3" />
                  {plan.badge}
                </div>
              )}

              <div className="relative">
                <h3
                  className={cn(
                    "text-xl font-semibold tracking-tight",
                    plan.highlighted ? "text-white" : "text-ink-900",
                  )}
                >
                  {plan.name}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-sm",
                    plan.highlighted ? "text-white/70" : "text-ink-500",
                  )}
                >
                  {plan.description}
                </p>
              </div>

              <div className="relative mt-8 flex items-baseline gap-2">
                <span
                  className={cn(
                    "text-sm font-medium",
                    plan.highlighted ? "text-white/60" : "text-ink-400",
                  )}
                >
                  desde
                </span>
                <span
                  className={cn(
                    "font-semibold tracking-tight",
                    plan.highlighted
                      ? "bg-gradient-to-br from-white via-white to-white/70 bg-clip-text text-transparent"
                      : "text-ink-900",
                    "text-display-lg",
                  )}
                >
                  ${plan.price}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium",
                    plan.highlighted ? "text-white/60" : "text-ink-400",
                  )}
                >
                  {plan.currency} / {plan.period}
                </span>
              </div>

              <ul className="relative mt-8 space-y-3.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span
                      className={cn(
                        "mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full",
                        plan.highlighted
                          ? "bg-white/10 text-white"
                          : "bg-ink-100 text-ink-900",
                      )}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <span className={plan.highlighted ? "text-white/85" : "text-ink-700"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="relative mt-10">
                <Link
                  href="/contacto"
                  className={cn(
                    "group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full text-[15px] font-medium transition-all",
                    plan.highlighted
                      ? "bg-white text-ink-900 hover:bg-white"
                      : "bg-ink-900 text-white hover:bg-ink-800",
                  )}
                >
                  <span className="relative z-10">{plan.cta}</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  {plan.highlighted && (
                    <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-accent transition-transform duration-500 ease-out group-hover:translate-y-0" />
                  )}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-ink-400">
          Todos los precios en USD. Aceptamos tarjeta vía Stripe, transferencia y PayPal. ¿Necesitas algo a la medida?{" "}
          <Link href="/contacto" className="font-medium text-ink-900 underline-offset-4 hover:underline">
            Hablemos.
          </Link>
        </p>
      </Container>
    </section>
  );
}
