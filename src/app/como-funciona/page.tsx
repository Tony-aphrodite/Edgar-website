import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Smartphone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/home/CTA";
import { clientProcess, technicianProcess, aboutValues } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cómo funciona",
  description:
    "Así funciona ServiTec: el cliente solicita un servicio, recibe cotización, aprueba y paga seguro en la app. El técnico recibe el cobro automáticamente vía Stripe Connect.",
};

export default function ComoFuncionaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cómo funciona"
        title={
          <>
            Una plataforma,{" "}
            <span className="gradient-text">dos flujos claros</span>
          </>
        }
        description="ServiTec es una marketplace de servicios a domicilio. Estos son los pasos que sigue un cliente y los que sigue un técnico, sin sorpresas."
      />

      {/* Flujo cliente */}
      <section className="py-12">
        <Container>
          <div className="rounded-3xl border border-ink-100 bg-white p-8 shadow-soft sm:p-12">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-ink-200/80 bg-white/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-ink-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
                  Para clientes
                </div>
                <h2 className="mt-4 text-display-md text-balance text-ink-900">
                  Pedir un servicio en{" "}
                  <span className="font-serif italic font-normal text-ink-500">
                    cuatro pasos
                  </span>
                </h2>
              </div>
              <Link
                href="#descargar"
                className="group inline-flex h-11 items-center gap-2 self-start rounded-full bg-ink-900 px-5 text-sm font-medium text-white transition hover:bg-ink-800"
              >
                <Smartphone className="h-4 w-4" />
                Descargar la app
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {clientProcess.map((p) => {
                const Icon = p.icon;
                return (
                  <li
                    key={p.title}
                    className="relative rounded-2xl border border-ink-100 bg-ink-50/40 p-5"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-ink-900 text-white">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <div className="mt-4 font-mono text-xs uppercase tracking-widest text-ink-400">
                      Paso {p.step}
                    </div>
                    <h3 className="mt-1 text-base font-semibold text-ink-900">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink-500">{p.description}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </Container>
      </section>

      {/* Flujo técnico */}
      <section className="py-12">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-ink-900 p-8 text-white shadow-card sm:p-12">
            <div className="aurora opacity-40" />
            <div className="absolute inset-0 -z-10 grid-bg-dark opacity-40" />

            <div className="relative flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.6)]" />
                  Para técnicos
                </div>
                <h2 className="mt-4 text-display-md text-balance text-white">
                  Empezar a vender tus{" "}
                  <span className="font-serif italic font-normal text-white/80">
                    servicios
                  </span>
                </h2>
              </div>
              <Link
                href="/tecnicos"
                className="group inline-flex h-11 items-center gap-2 self-start rounded-full bg-white px-5 text-sm font-medium text-ink-900 transition hover:bg-white/90"
              >
                Registrarme como técnico
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <ol className="relative mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {technicianProcess.map((p) => {
                const Icon = p.icon;
                return (
                  <li
                    key={p.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <div className="mt-4 font-mono text-xs uppercase tracking-widest text-white/40">
                      Paso {p.step}
                    </div>
                    <h3 className="mt-1 text-base font-semibold text-white">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/65">{p.description}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </Container>
      </section>

      {/* Cobros, comisión y CFDI */}
      <section className="py-12">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-ink-100 bg-white p-8 shadow-soft">
              <h3 className="text-xl font-semibold text-ink-900">
                Cobros y comisión
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                El cliente paga el monto total del servicio dentro de la app, procesado por <span className="font-semibold">Stripe</span>. A través de <span className="font-semibold">Stripe Connect</span>, el importe se libera al técnico al confirmar la finalización del servicio. ServiTec retiene automáticamente una comisión del{" "}
                <span className="font-semibold text-ink-900">
                  {site.commission.rate}%
                </span>{" "}
                sobre el monto cobrado.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                Para el cliente no hay cargo adicional por usar la plataforma: paga lo cotizado, ni más, ni menos.
              </p>
            </div>

            <div className="rounded-3xl border border-ink-100 bg-white p-8 shadow-soft">
              <h3 className="text-xl font-semibold text-ink-900">
                Facturación CFDI
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                Cuando el técnico es contribuyente activo en el SAT, emite el CFDI directamente al cliente por el monto total del servicio, con su RFC y régimen fiscal.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                ServiTec emite por separado un CFDI al técnico por la comisión cobrada. De esta forma el cliente recibe una sola factura por el servicio recibido y los flujos fiscales quedan limpios.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Valores / misión */}
      <section className="py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-display-md text-balance text-ink-900">
                Por qué existimos
              </h2>
              <p className="mt-5 text-pretty text-ink-500">
                Pedir un técnico para tu casa no debería depender de un volante en el poste de la esquina ni del primo de un amigo. Existen miles de técnicos buenos y honestos, pero no siempre es fácil encontrarlos.
              </p>
              <p className="mt-4 text-pretty text-ink-500">
                ServiTec une dos lados de un mercado real: clientes que necesitan resolver y técnicos que quieren trabajar de forma estable, con pagos seguros y respaldo.
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

      <CTA />
    </>
  );
}
