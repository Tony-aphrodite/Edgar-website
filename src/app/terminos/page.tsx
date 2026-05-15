import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Términos y condiciones de uso de la plataforma ServiTec, incluyendo el modelo marketplace, cobros, comisiones y obligaciones de las partes.",
};

export default function TerminosPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Términos y condiciones de uso"
      updated="15 de mayo de 2026"
    >
      <p>
        Estos Términos y Condiciones (los “Términos”) regulan el acceso y uso del sitio web {site.url}, la aplicación móvil y los demás servicios digitales (en conjunto, la “Plataforma”) operados por {site.legalName} (en adelante, “ServiTec”, “nosotros”, “nuestro”), con domicilio en {site.address.street}, {site.address.city}, {site.address.state}, {site.address.country}, RFC {site.rfc}.
      </p>
      <p>
        Al registrarte, contratar o utilizar la Plataforma, manifiestas que has leído, entendido y aceptado estos Términos. Si no estás de acuerdo, te pedimos no utilizar la Plataforma.
      </p>

      <LegalSection title="1. Naturaleza de la Plataforma (modelo marketplace)">
        <p>
          ServiTec es una plataforma digital de intermediación que conecta a personas que requieren servicios a domicilio (los “Clientes”) con personas físicas o morales que prestan servicios técnicos (los “Técnicos”).
        </p>
        <p>
          ServiTec <span className="font-semibold">no</span> presta directamente los servicios técnicos ofrecidos a través de la Plataforma. Cada servicio es ejecutado por el Técnico bajo su propio nombre, responsabilidad y régimen fiscal. ServiTec actúa exclusivamente como intermediario tecnológico y procesador de pagos en nombre del Técnico, mediante el uso de Stripe y Stripe Connect.
        </p>
      </LegalSection>

      <LegalSection title="2. Registro y verificación">
        <p>
          Para utilizar la Plataforma, Clientes y Técnicos deben crear una cuenta proporcionando información veraz, completa y actualizada. Los Técnicos, adicionalmente, deben completar un proceso de verificación que incluye identificación oficial (INE o equivalente), comprobante de domicilio, RFC y, cuando aplique, constancia de situación fiscal y datos para la cuenta de depósitos en Stripe Connect.
        </p>
        <p>
          ServiTec se reserva el derecho de rechazar, suspender o cancelar cuentas que proporcionen información falsa, incompleta o que infrinjan estos Términos.
        </p>
      </LegalSection>

      <LegalSection title="3. Solicitud y cotización de servicios">
        <p>
          El Cliente publica una solicitud describiendo el servicio requerido. El Técnico revisa la solicitud y envía una cotización que desglosa mano de obra, materiales y piezas. El servicio sólo se ejecuta una vez que el Cliente aprueba expresamente la cotización dentro de la Plataforma.
        </p>
        <p>
          Las cotizaciones, alcances, tiempos y condiciones específicas de cada servicio son acordadas directamente entre el Cliente y el Técnico. ServiTec no es parte del contrato de prestación de servicios celebrado entre ellos.
        </p>
      </LegalSection>

      <LegalSection title="4. Cobros, comisiones y flujo de pago">
        <p>
          Una vez aprobada la cotización, el Cliente paga el monto total dentro de la Plataforma, mediante tarjeta de crédito o débito procesada por <span className="font-semibold">Stripe</span>. Mediante <span className="font-semibold">Stripe Connect</span>, ServiTec actúa como procesador de pagos a favor del Técnico.
        </p>
        <p>
          ServiTec retiene de cada servicio completado una comisión del{" "}
          <span className="font-semibold text-ink-900">
            {site.commission.rate}%
          </span>{" "}
          sobre el monto total cobrado al Cliente. El importe restante se liquida en la cuenta del Técnico configurada en Stripe Connect, conforme a los tiempos de liquidación aplicables.
        </p>
        <p>
          Los Clientes no pagan cuotas adicionales por usar la Plataforma. Los Técnicos no pagan cuotas de alta, mensualidades ni cargos fijos: la comisión es la única contraprestación que cobra ServiTec por el servicio de intermediación y procesamiento.
        </p>
      </LegalSection>

      <LegalSection title="5. Facturación (CFDI)">
        <p>
          Cuando el Técnico se encuentre inscrito en el Registro Federal de Contribuyentes (RFC) y emita comprobantes fiscales, expedirá el Comprobante Fiscal Digital por Internet (CFDI) directamente al Cliente por el monto total del servicio, con su propia razón social/nombre, RFC y régimen fiscal.
        </p>
        <p>
          ServiTec emitirá por separado al Técnico un CFDI por el monto de la comisión cobrada por el uso de la Plataforma.
        </p>
        <p>
          Cuando el Técnico no se encuentre obligado a emitir CFDI o no cuente con los medios para hacerlo, podrán aplicar mecanismos alternativos descritos por el SAT o políticas operativas definidas por ServiTec. En ningún caso ServiTec emite CFDI a nombre del Técnico sin su autorización expresa.
        </p>
      </LegalSection>

      <LegalSection title="6. Responsabilidad del Técnico">
        <p>
          El Técnico es el único responsable de:
        </p>
        <ul className="ml-6 list-disc space-y-1.5">
          <li>Ejecutar el servicio conforme a la cotización aprobada.</li>
          <li>Cumplir con las normas técnicas, de seguridad y sanitarias aplicables.</li>
          <li>Pagar los impuestos y contribuciones correspondientes ante el SAT.</li>
          <li>Mantener vigentes sus permisos, licencias o certificaciones cuando la actividad lo requiera.</li>
          <li>Atender al Cliente con respeto, puntualidad y profesionalismo.</li>
        </ul>
      </LegalSection>

      <LegalSection title="7. Responsabilidad del Cliente">
        <p>
          El Cliente se compromete a:
        </p>
        <ul className="ml-6 list-disc space-y-1.5">
          <li>Proporcionar información veraz sobre el servicio solicitado.</li>
          <li>Permitir el acceso al inmueble y condiciones de seguridad razonables para el Técnico.</li>
          <li>Pagar puntualmente el servicio aprobado a través de la Plataforma.</li>
          <li>Reportar cualquier inconformidad dentro de los plazos descritos en la Política de reembolsos.</li>
        </ul>
      </LegalSection>

      <LegalSection title="8. Cancelaciones y reembolsos">
        <p>
          Las cancelaciones, ajustes y reembolsos se rigen por la{" "}
          <a className="font-medium text-ink-900 underline-offset-4 hover:underline" href="/reembolsos">
            Política de reembolsos
          </a>
          , que forma parte integral de estos Términos.
        </p>
      </LegalSection>

      <LegalSection title="9. Limitación de responsabilidad">
        <p>
          Dado que ServiTec actúa como intermediario tecnológico y procesador de pagos, no es responsable por la calidad, oportunidad, idoneidad o resultados del servicio prestado por el Técnico, ni por daños directos, indirectos o consecuenciales derivados de dicha prestación.
        </p>
        <p>
          La responsabilidad de ServiTec en cualquier caso se limitará al monto efectivamente cobrado como comisión por el servicio específico que dé lugar a la reclamación.
        </p>
        <p>
          Sin perjuicio de lo anterior, ServiTec ofrece mecanismos de soporte y mediación entre las partes, y podrá aplicar reembolsos conforme a la Política de reembolsos cuando ello corresponda.
        </p>
      </LegalSection>

      <LegalSection title="10. Uso aceptable">
        <p>
          Está prohibido utilizar la Plataforma para fines ilícitos, fraudulentos, discriminatorios, violatorios de derechos de terceros o contrarios a la moral. ServiTec podrá suspender o cancelar cuentas que incumplan esta cláusula, sin responsabilidad alguna.
        </p>
      </LegalSection>

      <LegalSection title="11. Propiedad intelectual">
        <p>
          Todos los derechos sobre la Plataforma, su software, marcas, logotipos y contenidos son propiedad de ServiTec o de sus licenciantes. Su uso no autorizado está prohibido.
        </p>
      </LegalSection>

      <LegalSection title="12. Modificaciones">
        <p>
          ServiTec podrá actualizar estos Términos en cualquier momento. La versión vigente será la publicada en {site.url}/terminos, indicando la fecha de última actualización. El uso continuado de la Plataforma después de una modificación implica la aceptación de los Términos actualizados.
        </p>
      </LegalSection>

      <LegalSection title="13. Ley aplicable y jurisdicción">
        <p>
          Estos Términos se rigen por las leyes de los Estados Unidos Mexicanos. Para cualquier controversia, las partes se someten a la competencia de los tribunales del lugar del domicilio de ServiTec, renunciando a cualquier otro fuero que pudiera corresponderles.
        </p>
      </LegalSection>

      <LegalSection title="14. Contacto">
        <p>
          Para cualquier duda sobre estos Términos escríbenos a{" "}
          <a className="font-medium text-ink-900 underline-offset-4 hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
