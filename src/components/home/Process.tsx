"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { process } from "@/lib/data";

export function Process() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-soft" />
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-40" />

      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink-200/80 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-ink-500 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
            Cómo trabajamos
          </div>
          <h2 className="mt-5 text-balance text-display-lg text-ink-900">
            Un proceso{" "}
            <span className="font-serif italic font-normal text-ink-500">
              claro y sin sorpresas
            </span>
            .
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-ink-500">
            Cada proyecto sigue cuatro fases bien definidas. Sabes en qué momento estamos, qué entregamos y qué esperamos de ti.
          </p>
        </div>

        <div className="relative mt-20">
          {/* Connecting line */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-12 hidden h-24 w-full lg:block"
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="line-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
                <stop offset="20%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="80%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 50 Q 300 0, 600 50 T 1200 50"
              stroke="url(#line-grad)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6 6"
            />
          </svg>

          <div className="grid gap-8 lg:grid-cols-4">
            {process.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative">
                    <div className="absolute inset-0 -z-10 rounded-full bg-gradient-accent opacity-40 blur-xl" />
                    <span className="relative inline-flex h-24 w-24 items-center justify-center rounded-full border border-ink-100 bg-white shadow-card">
                      <Icon className="h-8 w-8 text-ink-900" strokeWidth={1.5} />
                      <span className="absolute -right-1 -top-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink-900 font-mono text-xs font-medium text-white">
                        {p.step}
                      </span>
                    </span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink-900">
                    {p.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-pretty text-sm text-ink-500">
                    {p.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
