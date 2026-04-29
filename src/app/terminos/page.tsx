import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Términos y condiciones de uso de los servicios de Edgar Studio.",
};

export default function TerminosPage() {
  return (
    <LegalLayout eyebrow="Legal" title="Términos y condiciones" updated="29 de abril de 2026">
      <p>
        Bienvenido a {site.name}. Estos Términos y Condiciones (los “Términos”) regulan el uso del sitio web {site.url} y la contratación de los servicios profesionales que ofrece {site.legalName}, con domicilio en {site.address.street}, {site.address.city}, {site.address.state}, {site.address.country}, RFC {site.rfc} (en adelante, “Edgar Studio”, “nosotros”, “nuestro”).
      </p>
      <p>
        Al acceder a nuestro sitio o contratar nuestros servicios, aceptas estos Términos en su totalidad. Si no estás de acuerdo, te pedimos no utilizar el sitio ni contratar los servicios.
      </p>

      <LegalSection title="1. Servicios">
        <p>
          Edgar Studio ofrece servicios de diseño web, branding, marketing digital y consultoría estratégica. Los entregables, tiempos y precios específicos se definen en una propuesta comercial firmada por ambas partes antes del inicio del proyecto.
        </p>
      </LegalSection>

      <LegalSection title="2. Contratación y pagos">
        <p>
          Los proyectos requieren un anticipo del 50% al inicio y el saldo restante al lanzamiento, salvo acuerdo diferente por escrito. Los pagos se realizan vía transferencia bancaria, tarjeta de crédito o débito a través de Stripe, o PayPal. Todos los precios están expresados en dólares estadounidenses (USD) y no incluyen impuestos aplicables.
        </p>
        <p>
          La falta de pago oportuno autoriza a Edgar Studio a suspender los trabajos hasta regularizar el adeudo, sin que esto se considere incumplimiento por nuestra parte.
        </p>
      </LegalSection>

      <LegalSection title="3. Alcance y revisiones">
        <p>
          Cada proyecto incluye un número definido de revisiones por fase, indicado en la propuesta. Las revisiones adicionales o cambios fuera del alcance acordado podrán implicar costos adicionales que se cotizarán por separado.
        </p>
      </LegalSection>

      <LegalSection title="4. Propiedad intelectual">
        <p>
          Una vez liquidado el pago total del proyecto, transferimos al cliente los derechos patrimoniales sobre los entregables finales aprobados, salvo elementos de terceros licenciados (tipografías, imágenes, plugins) cuyos términos prevalecen.
        </p>
        <p>
          Edgar Studio se reserva el derecho de incluir el proyecto en su portafolio y comunicarlo en redes sociales, salvo que se acuerde un acuerdo de confidencialidad por escrito.
        </p>
      </LegalSection>

      <LegalSection title="5. Responsabilidades del cliente">
        <p>
          El cliente se compromete a entregar de forma oportuna la información, contenidos y accesos necesarios para el desarrollo del proyecto, así como a designar a una persona responsable de aprobar entregables.
        </p>
      </LegalSection>

      <LegalSection title="6. Limitación de responsabilidad">
        <p>
          La responsabilidad total de Edgar Studio frente al cliente, derivada o relacionada con los servicios prestados, no excederá del monto efectivamente pagado por el proyecto correspondiente.
        </p>
      </LegalSection>

      <LegalSection title="7. Modificaciones">
        <p>
          Podemos actualizar estos Términos en cualquier momento. La versión vigente será la publicada en {site.url}/terminos. Te recomendamos consultarla periódicamente.
        </p>
      </LegalSection>

      <LegalSection title="8. Ley aplicable y jurisdicción">
        <p>
          Estos Términos se rigen por las leyes de los Estados Unidos Mexicanos. Para cualquier controversia, las partes se someten a los tribunales competentes de Ciudad de México, renunciando a cualquier otro fuero que pudiera corresponderles.
        </p>
      </LegalSection>

      <LegalSection title="9. Contacto">
        <p>
          Si tienes preguntas sobre estos Términos, escríbenos a{" "}
          <a className="font-medium text-ink-900 underline-offset-4 hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
