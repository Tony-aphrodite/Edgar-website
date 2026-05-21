import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  Smartphone,
  ShieldCheck,
  CreditCard,
  FileText,
  BadgeCheck,
  Calendar,
  Wallet,
  Bell,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/PageHeader";
import { CTA } from "@/components/home/CTA";
import { technicianProcess } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Para técnicos",
  description:
    "Regístrate gratis en ServiTec y empieza a recibir solicitudes de servicio en tu zona. Sin mensualidades. Comisión del 12% solo cuando completas un servicio.",
};

const benefits = [
  {
    icon: BadgeCheck,
    title: "Registro sin costo",
    description:
      "Crear tu perfil, publicar tus categorías y zonas de servicio no tiene costo. Sin cuota de alta ni mensualidades.",
  },
  {
    icon: Bell,
    title: "Solicitudes de tu zona",
    description:
      "Recibe notificaciones de servicios que coinciden con tus categorías y tu radio de cobertura.",
  },
  {
    icon: Calendar,
    title: "Tú controlas tu agenda",
    description:
      "Aceptas las solicitudes que te interesan, cotizas a tu ritmo y agendas el día y la hora que mejor te convenga.",
  },
  {
    icon: CreditCard,
    title: "Cobro automático",
    description:
      "Cuando el cliente aprueba la cotización y se completa el servicio, el pago se libera en tu cuenta mediante Stripe Connect.",
  },
  {
    icon: Wallet,
    title: "Comisión transparente",
    description:
      "ServiTec retiene una comisión del 12% sobre cada servicio completado. Nada más, nada menos.",
  },
  {
    icon: FileText,
    title: "Apoyo con tu RFC",
    description:
      "Te acompañamos para que des de alta tus datos fiscales y puedas emitir CFDI a tus clientes desde la plataforma.",
  },
];

const requirements = [
  "Ser mayor de edad y vivir en México.",
  "Identificación oficial vigente (INE o pasaporte).",
  "Comprobante de domicilio reciente.",
  "RFC y constancia de situación fiscal (cuando aplique).",
  "Cuenta bancaria a tu nombre para depósitos por Stripe Connect.",
  "Disponibilidad para realizar servicios en al menos una de las categorías ServiTec.",
];

export default function TecnicosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Para técnicos"
        title={
          <>
            Trabaja con respaldo,{" "}
            <span className="gradient-text">cobra con seguridad</span>
          </>
        }
        description="Conecta con clientes verificados de tu zona, cobra de forma automática en la app y crece sin pagar mensualidades."
      />

      {/* Hero CTA */}
      <section className="pb-8">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-ink-900 p-8 text-white shadow-card sm:p-12">
            <div className="aurora opacity-50" />
            <div className="absolute inset-0 -z-10 grid-bg-dark opacity-50" />

            <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <h2 className="text-balance text-display-md text-white sm:text-display-lg">
                  Regístrate gratis y empieza a recibir solicitudes
                </h2>
                <p className="mt-5 max-w-xl text-pretty text-white/70">
                  Sin cuota de alta, sin mensualidades. ServiTec gana solo cuando tú ganas: <span className="font-semibold text-white">{site.commission.rate}% de comisión</span> sobre cada servicio completado.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/tecnicos/registrarse"
                    className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-medium text-ink-900 transition hover:bg-white/90"
                  >
                    <Smartphone className="h-4 w-4" />
                    Registrarme como técnico
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <Link
                    href="#requisitos"
                    className="inline-flex h-12 items-center rounded-full border border-white/20 px-6 text-[15px] font-medium text-white transition hover:border-white/60 hover:bg-white/5"
                  >
                    Ver requisitos
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <div className="text-xs font-medium uppercase tracking-widest text-white/60">
                    Ejemplo de cobro
                  </div>
                  <div className="mt-2 space-y-1.5 border-b border-white/10 pb-3 text-sm text-white/85">
                    <div className="flex justify-between">
                      <span>Servicio cotizado al cliente</span>
                      <span className="font-medium text-white">$1,000.00</span>
                    </div>
                    <div className="flex justify-between text-white/55">
                      <span>Comisión ServiTec ({site.commission.rate}%)</span>
                      <span>− $120.00</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-white/70">Recibes en tu cuenta</span>
                    <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-2xl font-semibold text-transparent">
                      $880.00
                    </span>
                  </div>
                  <p className="mt-3 text-[11px] text-white/45">
                    Monto orientativo. No incluye retenciones fiscales que el técnico deba declarar ante el SAT.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Beneficios */}
      <section className="py-16">
        <Container>
          <h2 className="text-display-md text-balance text-ink-900">
            ¿Por qué un técnico debería trabajar con ServiTec?
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-ink-500">
            Construimos la plataforma pensando en quienes la usan todos los días para sostener su negocio.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.title}
                  className="rounded-3xl border border-ink-100 bg-white p-7 shadow-soft"
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-ink-900 text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-ink-900">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-500">{b.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Proceso */}
      <section className="py-16">
        <Container>
          <h2 className="text-display-md text-balance text-ink-900">
            Cómo empezar
          </h2>
          <p className="mt-4 max-w-2xl text-pretty text-ink-500">
            Cuatro pasos para activar tu perfil y empezar a recibir solicitudes.
          </p>

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {technicianProcess.map((p) => {
              const Icon = p.icon;
              return (
                <li
                  key={p.title}
                  className="rounded-3xl border border-ink-100 bg-white p-6 shadow-soft"
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
        </Container>
      </section>

      {/* Requisitos */}
      <section id="requisitos" className="scroll-mt-24 py-16">
        <Container>
          <div className="grid gap-10 rounded-3xl border border-ink-100 bg-white p-8 shadow-soft sm:p-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-white">
                <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h2 className="mt-5 text-display-md text-balance text-ink-900">
                Requisitos para registrarte
              </h2>
              <p className="mt-4 text-pretty text-ink-500">
                Verificamos cada técnico antes de activar su perfil. Esta es la documentación que necesitarás.
              </p>
            </div>
            <ul className="space-y-3 lg:col-span-7">
              {requirements.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-ink-50/50 p-4 text-sm text-ink-700"
                >
                  <span className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-ink-900 text-white">
                    <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* CFDI nota */}
      <section className="pb-16">
        <Container>
          <div className="mx-auto max-w-3xl rounded-3xl border border-ink-100 bg-ink-50/40 p-6 text-sm leading-relaxed text-ink-600 sm:p-8">
            <p>
              <span className="font-semibold text-ink-900">Sobre la facturación.</span>{" "}
              Si emites CFDI, podrás facturar directamente al cliente desde la plataforma cuando completemos la integración con tu RFC, régimen fiscal y, en su caso, tus sellos digitales (CSD). ServiTec emite por separado un CFDI por el monto de la comisión cobrada. Si todavía no estás inscrito en el RFC o no emites comprobantes fiscales, podemos orientarte sobre las opciones disponibles. Escríbenos a{" "}
              <a
                href={`mailto:${site.techniciansEmail}`}
                className="font-medium text-ink-900 underline-offset-4 hover:underline"
              >
                {site.techniciansEmail}
              </a>
              .
            </p>
          </div>
        </Container>
      </section>

      <CTA />
    </>
  );
}
