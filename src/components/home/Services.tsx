"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { services } from "@/lib/data";

const accents = [
  "from-amber-300/40 via-orange-400/30 to-rose-400/30",
  "from-sky-400/40 via-indigo-400/30 to-violet-400/30",
  "from-emerald-300/40 via-teal-400/30 to-cyan-400/30",
  "from-rose-300/40 via-pink-400/30 to-fuchsia-400/30",
  "from-amber-400/40 via-rose-400/30 to-orange-400/30",
  "from-violet-400/40 via-fuchsia-400/30 to-pink-400/30",
  "from-cyan-300/40 via-sky-400/30 to-blue-400/30",
  "from-orange-300/40 via-amber-400/30 to-yellow-400/30",
  "from-emerald-300/40 via-lime-400/30 to-green-400/30",
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
              Categorías de servicio
            </div>
            <h2 className="mt-5 max-w-2xl text-balance text-display-lg text-ink-900">
              Una sola app,{" "}
              <span className="font-serif italic font-normal text-ink-500">
                nueve oficios
              </span>{" "}
              para tu hogar.
            </h2>
          </div>
          <Link
            href="/servicios"
            className="group inline-flex items-center gap-2 text-sm font-medium text-ink-600 hover:text-ink-900"
          >
            Ver todas las categorías
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-ink-200 hover:shadow-card"
              >
                <div
                  className={`pointer-events-none absolute inset-0 -z-0 bg-gradient-to-br ${accents[i % accents.length]} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
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

                <h3 className="relative mt-6 text-xl font-semibold tracking-tight text-ink-900">
                  {s.title}
                </h3>
                <p className="relative mt-2 max-w-md text-sm text-ink-500">
                  {s.short}
                </p>

                <ul className="relative mt-5 flex flex-wrap gap-1.5">
                  {s.examples.slice(0, 3).map((f) => (
                    <li
                      key={f}
                      className="inline-flex items-center rounded-full border border-ink-200/80 bg-white/70 px-2.5 py-1 text-[11px] font-medium text-ink-600 backdrop-blur"
                    >
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/servicios#${s.slug}`}
                  className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-ink-900"
                >
                  Ver detalle
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
