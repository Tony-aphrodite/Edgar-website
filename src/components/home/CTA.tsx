import Link from "next/link";
import { ArrowUpRight, Smartphone, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function CTA() {
  return (
    <section id="descargar" className="py-16 sm:py-24">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink-900 px-8 py-20 text-center sm:px-12 sm:py-28">
          <div className="aurora opacity-80" />
          <div className="absolute inset-0 -z-10 grid-bg-dark opacity-60" />

          <div className="relative mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-accent-violet" />
              <span>Descarga gratis · sin mensualidades</span>
            </div>

            <h2 className="mt-7 text-balance text-[clamp(2.25rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
              Pide un técnico,{" "}
              <span className="font-serif italic font-normal text-white/85">
                paga seguro
              </span>{" "}
              y olvídate.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-white/65">
              Descarga ServiTec, describe lo que necesitas y recibe cotizaciones de técnicos verificados en minutos. Si eres técnico, regístrate gratis y crece con la plataforma.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#"
                className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-white px-7 text-[15px] font-medium text-ink-900 shadow-[0_8px_30px_rgba(255,255,255,0.16)] transition-all hover:-translate-y-px"
              >
                <Smartphone className="relative z-10 h-4 w-4" />
                <span className="relative z-10">Descargar la app</span>
                <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="absolute inset-0 -z-0 translate-y-full bg-gradient-accent transition-transform duration-500 ease-out group-hover:translate-y-0" />
              </Link>
              <Link
                href="/tecnicos"
                className="inline-flex h-12 items-center rounded-full border border-white/20 px-7 text-[15px] font-medium text-white transition hover:border-white/60 hover:bg-white/5"
              >
                Soy técnico
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/50">
              <span>✓ Sin cuotas mensuales</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>✓ Cotización gratuita</span>
              <span className="h-1 w-1 rounded-full bg-white/30" />
              <span>✓ Pago seguro con Stripe</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
