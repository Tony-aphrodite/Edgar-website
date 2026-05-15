import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description:
    "Aviso de privacidad de ServiTec conforme a la LFPDPPP de México: qué datos recabamos, para qué los usamos y cómo ejercer los derechos ARCO.",
};

export default function PrivacidadPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Aviso de privacidad integral"
      updated="15 de mayo de 2026"
    >
      <p>
        {site.legalName} (“ServiTec”), con domicilio en {site.address.street}, {site.address.city}, {site.address.state}, {site.address.country}, es el responsable del tratamiento de tus datos personales, en cumplimiento de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), su Reglamento y los Lineamientos del Aviso de Privacidad.
      </p>

      <LegalSection title="1. Datos personales que recabamos">
        <p>De los <span className="font-semibold">Clientes</span> recabamos:</p>
        <ul className="ml-6 list-disc space-y-1.5">
          <li>Datos de identificación: nombre, correo electrónico, teléfono.</li>
          <li>Datos de ubicación: dirección de los inmuebles donde se solicita el servicio.</li>
          <li>Datos de pago: tokenizados por Stripe; ServiTec no almacena el número de tarjeta.</li>
          <li>Datos fiscales (cuando solicitas factura CFDI): RFC, razón social, régimen fiscal, código postal y uso del CFDI.</li>
        </ul>
        <p>De los <span className="font-semibold">Técnicos</span> recabamos, adicionalmente:</p>
        <ul className="ml-6 list-disc space-y-1.5">
          <li>Identificación oficial (INE / pasaporte) y comprobante de domicilio.</li>
          <li>RFC y, en su caso, constancia de situación fiscal.</li>
          <li>Datos bancarios y de identidad requeridos por Stripe Connect para realizar depósitos.</li>
          <li>Categorías de servicio, experiencia y zonas de cobertura.</li>
        </ul>
      </LegalSection>

      <LegalSection title="2. Finalidades del tratamiento">
        <p>Tratamos tus datos personales con las siguientes finalidades primarias:</p>
        <ul className="ml-6 list-disc space-y-1.5">
          <li>Crear, mantener y operar tu cuenta en la Plataforma.</li>
          <li>Verificar la identidad y antecedentes de los Técnicos.</li>
          <li>Procesar solicitudes, cotizaciones y servicios.</li>
          <li>Procesar pagos, comisiones y, en su caso, reembolsos a través de Stripe / Stripe Connect.</li>
          <li>Emitir comprobantes fiscales (CFDI) por las comisiones cobradas por ServiTec y, a través del Técnico, los CFDI por el servicio prestado.</li>
          <li>Prevenir fraude y cumplir obligaciones legales y fiscales.</li>
          <li>Brindar soporte y atención.</li>
        </ul>
        <p>Y como finalidades secundarias, sujetas a tu consentimiento:</p>
        <ul className="ml-6 list-disc space-y-1.5">
          <li>Enviar comunicaciones promocionales o informativas.</li>
          <li>Realizar encuestas y mediciones de calidad.</li>
          <li>Análisis estadístico agregado para mejorar la Plataforma.</li>
        </ul>
        <p>Puedes manifestar tu negativa al tratamiento para fines secundarios desde la configuración de tu cuenta o escribiendo a {site.privacyEmail}.</p>
      </LegalSection>

      <LegalSection title="3. Transferencias de datos">
        <p>
          ServiTec puede transferir o compartir datos personales con los siguientes terceros, en los términos del artículo 37 de la LFPDPPP:
        </p>
        <ul className="ml-6 list-disc space-y-1.5">
          <li>Procesadores de pago: <span className="font-semibold">Stripe, Inc.</span> y entidades del grupo Stripe, para procesar cobros, depósitos a Técnicos y prevención de fraude.</li>
          <li>Proveedor de facturación electrónica: <span className="font-semibold">Facturapi</span> u otro PAC autorizado, para la emisión de CFDI.</li>
          <li>Autoridades fiscales o judiciales cuando exista un requerimiento legal.</li>
          <li>Proveedores tecnológicos de alojamiento, mensajería y soporte que actúan como encargados, bajo cláusulas contractuales que protegen tus datos.</li>
        </ul>
        <p>
          Para el resto de las transferencias se requerirá tu consentimiento, salvo en los supuestos previstos en la LFPDPPP.
        </p>
      </LegalSection>

      <LegalSection title="4. Derechos ARCO y revocación del consentimiento">
        <p>
          Tienes derecho a acceder, rectificar, cancelar u oponerte (derechos ARCO) al tratamiento de tus datos personales, así como a revocar el consentimiento que hayas otorgado. Para ejercer estos derechos, envía una solicitud a{" "}
          <a className="font-medium text-ink-900 underline-offset-4 hover:underline" href={`mailto:${site.privacyEmail}`}>
            {site.privacyEmail}
          </a>{" "}
          con tu identificación oficial y la descripción del derecho que deseas ejercer. Responderemos en un máximo de 20 días hábiles, conforme al artículo 32 de la LFPDPPP.
        </p>
      </LegalSection>

      <LegalSection title="5. Cookies y tecnologías similares">
        <p>
          La Plataforma utiliza cookies estrictamente necesarias para autenticarte, mantener tu sesión y procesar pagos de forma segura, así como cookies analíticas opcionales para entender el uso del sitio. Puedes deshabilitar las cookies opcionales desde la configuración de tu navegador.
        </p>
      </LegalSection>

      <LegalSection title="6. Medidas de seguridad">
        <p>
          Implementamos medidas técnicas, físicas y administrativas razonables para proteger tus datos personales, incluyendo cifrado en tránsito, almacenamiento controlado, controles de acceso, registros de auditoría y políticas internas de confidencialidad.
        </p>
        <p>
          Los datos de tarjeta nunca son almacenados por ServiTec: son procesados directamente por Stripe, certificado bajo PCI DSS nivel 1.
        </p>
      </LegalSection>

      <LegalSection title="7. Conservación">
        <p>
          Conservamos tus datos por el tiempo necesario para cumplir con las finalidades descritas y con las obligaciones legales, fiscales y contables aplicables.
        </p>
      </LegalSection>

      <LegalSection title="8. Cambios al aviso">
        <p>
          ServiTec podrá actualizar este Aviso. La versión vigente se publica en {site.url}/privacidad indicando la fecha de última actualización. Si los cambios son sustanciales, te lo notificaremos a través de la Plataforma o por correo electrónico.
        </p>
      </LegalSection>

      <LegalSection title="9. Contacto">
        <p>
          Para preguntas o ejercicio de derechos ARCO:{" "}
          <a className="font-medium text-ink-900 underline-offset-4 hover:underline" href={`mailto:${site.privacyEmail}`}>
            {site.privacyEmail}
          </a>{" "}
          · teléfono {site.phone} · {site.address.street}, {site.address.city}, {site.address.state}.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
