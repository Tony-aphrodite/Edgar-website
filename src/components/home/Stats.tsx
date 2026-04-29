"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";

type Stat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
};

const stats: Stat[] = [
  { value: 150, suffix: "+", label: "Proyectos entregados" },
  { value: 60, suffix: "+", label: "Clientes satisfechos" },
  { value: 8, suffix: " años", label: "De experiencia" },
  { value: 4.9, decimals: 1, label: "Calificación promedio" },
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
                En números
              </div>
              <h2 className="mt-5 text-balance text-display-lg text-white">
                Resultados que se{" "}
                <span className="font-serif italic font-normal text-white/80">
                  cuentan en años
                </span>{" "}
                y se sienten en el negocio.
              </h2>
            </div>

            <div className="grid gap-y-10 lg:col-span-7 lg:grid-cols-2">
              {stats.map((s, i) => (
                <StatItem key={s.label} stat={s} delay={i * 0.06} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function StatItem({ stat, delay }: { stat: Stat; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1500;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(stat.value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, stat.value]);

  const formatted =
    stat.decimals !== undefined ? n.toFixed(stat.decimals) : Math.round(n).toString();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="border-l border-white/10 pl-6 first:border-l-0 first:pl-0 sm:pl-8 lg:border-l lg:first:border-l"
    >
      <div className="bg-gradient-to-r from-white via-white/95 to-white/70 bg-clip-text text-display-xl font-semibold tracking-tight text-transparent">
        {stat.prefix}
        {formatted}
        {stat.suffix}
      </div>
      <div className="mt-2 text-sm text-white/60">{stat.label}</div>
    </motion.div>
  );
}
