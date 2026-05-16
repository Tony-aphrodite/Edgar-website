import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";
import { site } from "@/lib/site";
import { Mail, Phone, MapPin } from "lucide-react";

const columns = [
  {
    title: "Servicios",
    links: [
      { label: "Electricidad", href: "/servicios#electricidad" },
      { label: "Plomería", href: "/servicios#plomeria" },
      { label: "Limpieza", href: "/servicios#limpieza" },
      { label: "Pintura", href: "/servicios#pintura" },
      { label: "Carpintería", href: "/servicios#carpinteria" },
      { label: "Ver todos", href: "/servicios" },
    ],
  },
  {
    title: "Plataforma",
    links: [
      { label: "Cómo funciona", href: "/como-funciona" },
      { label: "Para técnicos", href: "/tecnicos" },
      { label: "Precios y comisiones", href: "/precios" },
      { label: "Contacto", href: "/contacto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Términos y condiciones", href: "/terminos" },
      { label: "Aviso de privacidad", href: "/privacidad" },
      { label: "Política de reembolsos", href: "/reembolsos" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-ink-100 bg-ink-50/40">
      <div className="absolute inset-x-0 -top-px mx-auto h-px max-w-container bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-500">
              {site.description}
            </p>

            <ul className="mt-8 space-y-3 text-sm text-ink-600">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-ink-400" />
                <a href={`mailto:${site.email}`} className="hover:text-ink-900">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-ink-400" />
                <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="hover:text-ink-900">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-ink-400" />
                <span>
                  {site.address.street}, {site.address.city}, {site.address.state} {site.address.zip}, {site.address.country}
                </span>
              </li>
            </ul>

          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-7">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-ink-900">{col.title}</h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-ink-500 transition hover:text-ink-900"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-ink-100 py-6 text-xs text-ink-400 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Todos los derechos reservados.
          </p>
          <p className="font-mono">RFC {site.rfc}</p>
        </div>
      </Container>
    </footer>
  );
}
