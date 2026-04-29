"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/lib/data";

const gradients = [
  "from-amber-200 to-rose-300",
  "from-violet-300 to-fuchsia-300",
  "from-sky-300 to-emerald-300",
  "from-rose-300 to-orange-300",
];

export function Testimonials() {
  const all = testimonials;
  const featured = all[0];
  const rest = all.slice(1);

  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink-200/80 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-ink-500 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
            Lo que dicen
          </div>
          <h2 className="mt-5 text-balance text-display-lg text-ink-900">
            Historias reales,{" "}
            <span className="font-serif italic font-normal text-ink-500">
              resultados reales
            </span>
            .
          </h2>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-12 lg:auto-rows-[minmax(220px,1fr)]">
          {/* Featured testimonial */}
          <motion.figure
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-ink-900 p-8 text-white shadow-card sm:p-10 lg:col-span-7 lg:row-span-2"
          >
            <div className="aurora opacity-50" />
            <div className="absolute inset-0 -z-10 grid-bg-dark opacity-50" />

            <div className="relative flex items-center gap-1 text-amber-300">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} />
              ))}
            </div>

            <blockquote className="relative mt-8 text-balance text-2xl leading-snug text-white sm:text-3xl">
              <span className="font-serif italic text-white/90">“</span>
              {featured.quote}
              <span className="font-serif italic text-white/90">”</span>
            </blockquote>

            <figcaption className="relative mt-10 flex items-center gap-3">
              <span
                className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${gradients[0]} text-base font-semibold text-ink-900 ring-2 ring-white/10`}
              >
                {featured.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <div>
                <div className="text-sm font-semibold text-white">{featured.name}</div>
                <div className="text-xs text-white/60">
                  {featured.role} · {featured.company}
                </div>
              </div>
            </figcaption>
          </motion.figure>

          {/* Smaller testimonials */}
          {rest.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: 0.05 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col justify-between gap-5 rounded-3xl border border-ink-100 bg-white p-7 shadow-soft transition-all hover:-translate-y-1 hover:shadow-card sm:p-8 lg:col-span-5 ${
                i === 0 ? "" : "lg:col-span-5"
              }`}
            >
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="text-pretty text-base leading-relaxed text-ink-800">
                “{t.quote}”
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${gradients[(i + 1) % gradients.length]} text-sm font-semibold text-ink-900`}
                >
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <div>
                  <div className="text-sm font-semibold text-ink-900">{t.name}</div>
                  <div className="text-xs text-ink-500">
                    {t.role} · {t.company}
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Marquee strip with shorter quotes */}
        <div className="mt-12 overflow-hidden mask-fade-x">
          <div className="marquee flex w-max items-center gap-3 whitespace-nowrap [--marquee-duration:60s]">
            {[...all, ...all, ...all].map((t, i) => (
              <span
                key={`${t.name}-${i}`}
                className="inline-flex items-center gap-3 rounded-full border border-ink-100 bg-white px-5 py-2.5 text-sm text-ink-600 shadow-soft"
              >
                <span className="text-amber-400">★</span>
                <span className="font-serif italic">“{t.quote.slice(0, 70)}…”</span>
                <span className="text-ink-300">·</span>
                <span className="text-ink-900">{t.name}</span>
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
