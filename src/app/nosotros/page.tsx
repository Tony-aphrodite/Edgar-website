import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/home/CTA";
import { aboutValues, team, stats } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conoce al equipo de Edgar Studio: diseñadores, estrategas y desarrolladores que construyen marcas y sitios que crecen.",
};

export default function NosotrosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nosotros"
        title={
          <>
            Un estudio donde se cruzan{" "}
            <span className="gradient-text">diseño, código y estrategia</span>
          </>
        }
        description={`Desde ${site.founded} ayudamos a marcas en Latinoamérica a construir presencia digital con propósito. Somos un equipo pequeño y obsesionado con los detalles.`}
      />

      <section className="py-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-display-md text-balance text-ink-900">
                Nuestra filosofía
              </h2>
              <p className="mt-5 text-pretty text-ink-500">
                Creemos que un buen sitio web no se mide en lo bonito que se ve, sino en lo que produce: leads, ventas, reservas y confianza.
              </p>
              <p className="mt-4 text-pretty text-ink-500">
                Por eso cada proyecto empieza con preguntas, no con bocetos. Y termina con métricas, no sólo con archivos entregados.
              </p>
            </div>
            <div className="space-y-5 lg:col-span-7">
              {aboutValues.map((v) => {
                const Icon = v.icon;
                return (
                  <div
                    key={v.title}
                    className="flex gap-5 rounded-2xl border border-ink-100 bg-white p-6 shadow-soft"
                  >
                    <div className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-ink-900 text-white">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-ink-900">
                        {v.title}
                      </h3>
                      <p className="mt-1.5 text-sm text-ink-500">{v.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <div className="text-display-md font-semibold tracking-tight text-ink-900">
                  {s.value}
                </div>
                <div className="mt-1.5 text-sm text-ink-500">{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <h2 className="text-display-md text-balance text-ink-900">El equipo</h2>
          <p className="mt-3 max-w-2xl text-pretty text-ink-500">
            Diseñadores, ingenieros y estrategas que se complementan. Trabajamos cerca de ti, no detrás de un account manager.
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <article
                key={m.name}
                className="overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-soft"
              >
                <div
                  className="aspect-[4/5] w-full"
                  style={{
                    background: [
                      "linear-gradient(135deg, #fde68a 0%, #fb923c 60%, #f43f5e 100%)",
                      "linear-gradient(135deg, #c7d2fe 0%, #a78bfa 60%, #f0abfc 100%)",
                      "linear-gradient(135deg, #bae6fd 0%, #38bdf8 60%, #6366f1 100%)",
                      "linear-gradient(135deg, #bbf7d0 0%, #34d399 60%, #14b8a6 100%)",
                    ][i % 4],
                  }}
                  aria-hidden
                />
                <div className="p-5">
                  <h3 className="text-base font-semibold text-ink-900">{m.name}</h3>
                  <p className="text-xs text-ink-400">{m.role}</p>
                  <p className="mt-3 text-sm text-ink-500">{m.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
