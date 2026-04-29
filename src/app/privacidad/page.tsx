import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description: "Aviso de privacidad de Edgar Studio conforme a la LFPDPPP de México.",
};

export default function PrivacidadPage() {
  return (
    <LegalLayout eyebrow="Legal" title="Aviso de privacidad" updated="29 de abril de 2026">
      <p>
        {site.legalName} (“Edgar Studio”), con domicilio en {site.address.street}, {site.address.city}, {site.address.state}, {site.address.country}, es responsable del tratamiento de tus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y su reglamento.
      </p>

      <LegalSection title="1. Datos que recabamos">
        <p>
          Para brindar nuestros servicios podemos recabar: nombre, correo electrónico, teléfono, empresa, datos fiscales (RFC, razón social, domicilio fiscal) y cualquier información que el titular comparta voluntariamente al contactarnos o contratar nuestros servicios.
        </p>
      </LegalSection>

      <LegalSection title="2. Finalidades">
        <p>Tratamos tus datos personales con las siguientes finalidades primarias:</p>
        <ul className="ml-6 list-disc space-y-1.5">
          <li>Atender solicitudes de información, cotización y contacto.</li>
          <li>Ejecutar la prestación de los servicios contratados.</li>
          <li>Emitir facturas y cumplir obligaciones fiscales.</li>
          <li>Brindar soporte y atención post-venta.</li>
        </ul>
        <p>Y como finalidades secundarias, sujetas a tu consentimiento:</p>
        <ul className="ml-6 list-disc space-y-1.5">
          <li>Enviar comunicaciones comerciales sobre nuevos servicios.</li>
          <li>Realizar encuestas de satisfacción.</li>
          <li>Mostrar el proyecto en nuestro portafolio o redes sociales.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Transferencias">
        <p>
          No transferimos tus datos personales a terceros sin tu consentimiento, salvo a proveedores de tecnología que actúan como encargados (alojamiento, pagos vía Stripe, herramientas de email) bajo cláusulas contractuales que garantizan su protección.
        </p>
      </LegalSection>

      <LegalSection title="4. Derechos ARCO">
        <p>
          En cualquier momento puedes acceder, rectificar, cancelar u oponerte (derechos ARCO) al tratamiento de tus datos enviando una solicitud al correo{" "}
          <a className="font-medium text-ink-900 underline-offset-4 hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          con copia de tu identificación oficial. Responderemos en un máximo de 20 días hábiles.
        </p>
      </LegalSection>

      <LegalSection title="5. Cookies y tecnologías similares">
        <p>
          Nuestro sitio utiliza cookies estrictamente necesarias para su funcionamiento y, opcionalmente, cookies analíticas (Google Analytics) para entender cómo se utiliza el sitio. Puedes deshabilitarlas desde la configuración de tu navegador.
        </p>
      </LegalSection>

      <LegalSection title="6. Seguridad">
        <p>
          Implementamos medidas técnicas y administrativas razonables para proteger tus datos contra acceso, divulgación o uso no autorizado, incluyendo cifrado en tránsito y controles de acceso a la información.
        </p>
      </LegalSection>

      <LegalSection title="7. Cambios al aviso">
        <p>
          Cualquier cambio sustancial al presente aviso será notificado a través de {site.url} o por correo electrónico, según corresponda.
        </p>
      </LegalSection>

      <LegalSection title="8. Contacto">
        <p>
          Para preguntas o ejercicio de derechos ARCO, contáctanos en{" "}
          <a className="font-medium text-ink-900 underline-offset-4 hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          o al teléfono {site.phone}.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
