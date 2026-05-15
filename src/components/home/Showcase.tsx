"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { valueProps } from "@/lib/data";

const bgs = [
  "bg-gradient-to-br from-emerald-100 via-sky-100 to-indigo-100",
  "bg-gradient-to-br from-sky-100 via-violet-100 to-pink-100",
  "bg-gradient-to-br from-amber-100 via-rose-100 to-fuchsia-100",
  "bg-gradient-to-br from-rose-100 via-orange-100 to-amber-100",
  "bg-gradient-to-br from-cyan-100 via-emerald-100 to-teal-100",
  "bg-gradient-to-br from-violet-100 via-fuchsia-100 to-pink-100",
];

export function Showcase() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink-200/80 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-ink-500 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
            Por qué ServiTec
          </div>
          <h2 className="mt-5 text-balance text-display-lg text-ink-900">
            Pedir un técnico,{" "}
            <span className="font-serif italic font-normal text-ink-500">
              sin sorpresas ni riesgos
            </span>
            .
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-ink-500">
            Construimos cada parte de la plataforma para que dejes de buscar referencias y volantes en el poste de la esquina.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {valueProps.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.article
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card sm:p-8"
              >
                <div className={`absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${bgs[i % bgs.length]}`} />

                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-white shadow-soft">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>

                <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink-900 sm:text-xl">
                  {v.title}
                </h3>
                <p className="mt-2 text-pretty text-sm text-ink-500">
                  {v.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
