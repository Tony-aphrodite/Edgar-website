import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/home/CTA";
import { services } from "@/lib/data";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Diseño web, branding, marketing digital y consultoría estratégica. Conoce todos los servicios que ofrece Edgar Studio.",
};

const slugs = ["diseno-web", "branding", "marketing", "consultoria"];

export default function ServiciosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Servicios"
        title={
          <>
            Todo lo que necesitas para crecer en{" "}
            <span className="gradient-text">digital</span>
          </>
        }
        description="Construimos cada servicio como una pieza independiente, pero diseñada para integrarse con las demás. Empieza con uno y crece a tu ritmo."
      />

      <section className="pb-24">
        <Container>
          <div className="space-y-6">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <article
                  key={s.title}
                  id={slugs[i]}
                  className="grid scroll-mt-24 gap-8 rounded-3xl border border-ink-100 bg-white p-8 shadow-soft sm:p-12 lg:grid-cols-12 lg:gap-12"
                >
                  <div className="lg:col-span-5">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-white shadow-soft">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <h2 className="mt-6 text-display-md text-balance text-ink-900">
                      {s.title}
                    </h2>
                    <p className="mt-4 text-pretty text-ink-500">{s.description}</p>
                    <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-ink-100 bg-ink-50/60 px-4 py-3 text-sm text-ink-600">
                      <span className="font-mono text-xs uppercase tracking-widest text-ink-400">
                        Desde
                      </span>
                      <span className="font-semibold text-ink-900">
                        {i === 0 ? "$1,200" : i === 1 ? "$900" : i === 2 ? "$1,500/mes" : "$600/sesión"} USD
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="rounded-2xl bg-ink-50/60 p-6 sm:p-8">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-500">
                        Qué incluye
                      </h3>
                      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                        {s.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2.5 text-sm text-ink-700"
                          >
                            <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white text-ink-900 shadow-soft">
                              <Check className="h-3 w-3" strokeWidth={3} />
                            </span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
