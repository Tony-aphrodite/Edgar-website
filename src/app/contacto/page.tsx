import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbenos para reportar un servicio, sumar tu negocio o resolver dudas sobre la plataforma ServiTec. Respondemos en menos de 24 horas hábiles.",
};

const channels = [
  {
    icon: Mail,
    label: "Soporte general",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: Mail,
    label: "Soporte a clientes",
    value: site.supportEmail,
    href: `mailto:${site.supportEmail}`,
  },
  {
    icon: Phone,
    label: "Teléfono / WhatsApp",
    value: site.phone,
    href: `tel:${site.phone.replace(/\s+/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Oficina",
    value: `${site.address.street}, ${site.address.city}, ${site.address.state}`,
    href: undefined,
  },
  {
    icon: Clock,
    label: "Horario de atención",
    value: site.hours,
    href: undefined,
  },
];

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contacto"
        title={
          <>
            Hablemos sobre tu <span className="gradient-text">servicio</span>
          </>
        }
        description="¿Necesitas reportar un servicio, sumar tu negocio como técnico o resolver una duda sobre cobros y facturas? Escríbenos y respondemos en menos de 24 horas hábiles."
      />

      <section className="pb-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <h2 className="text-display-md text-balance text-ink-900">
                Canales de contacto
              </h2>
              <p className="mt-4 text-pretty text-ink-500">
                El soporte está disponible por correo, teléfono o WhatsApp. Si estás dentro de la app y tienes un servicio en curso, abre el chat de soporte desde el detalle del servicio.
              </p>

              <ul className="mt-8 space-y-5">
                {channels.map((c) => {
                  const Icon = c.icon;
                  const content = (
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-ink-900 text-white">
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      <div>
                        <div className="text-xs font-medium uppercase tracking-widest text-ink-400">
                          {c.label}
                        </div>
                        <div className="mt-1 text-sm text-ink-800">{c.value}</div>
                      </div>
                    </div>
                  );
                  return (
                    <li key={c.label}>
                      {c.href ? (
                        <a href={c.href} className="block transition hover:opacity-80">
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-10 rounded-2xl border border-ink-100 bg-ink-50/60 p-5 text-sm text-ink-600">
                <p className="font-medium text-ink-900">¿Eres técnico?</p>
                <p className="mt-1.5">
                  Si quieres registrarte como técnico verificado en la plataforma, escríbenos a{" "}
                  <a
                    href={`mailto:${site.techniciansEmail}`}
                    className="font-medium text-ink-900 underline-offset-4 hover:underline"
                  >
                    {site.techniciansEmail}
                  </a>{" "}
                  o visita{" "}
                  <a
                    href="/tecnicos"
                    className="font-medium text-ink-900 underline-offset-4 hover:underline"
                  >
                    /tecnicos
                  </a>
                  .
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
