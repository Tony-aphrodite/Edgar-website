import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de reembolsos",
  description:
    "Política de cancelaciones y reembolsos de ServiTec: cuándo procede, cómo solicitarlo y plazos de respuesta.",
};

export default function ReembolsosPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Política de cancelaciones y reembolsos"
      updated="15 de mayo de 2026"
    >
      <p>
        Esta Política describe cuándo procede la cancelación, ajuste o reembolso de un servicio solicitado a través de la Plataforma ServiTec, así como los plazos y mecanismos aplicables. Forma parte integral de los{" "}
        <a className="font-medium text-ink-900 underline-offset-4 hover:underline" href="/terminos">
          Términos y condiciones
        </a>
        .
      </p>

      <LegalSection title="1. Antes de aprobar la cotización">
        <p>
          El Cliente puede cancelar la solicitud o rechazar la cotización en cualquier momento antes de aprobarla, sin costo. Solicitar una cotización es gratuito.
        </p>
      </LegalSection>

      <LegalSection title="2. Cancelación con cotización aprobada">
        <p>
          Una vez aprobada la cotización, aplican los siguientes supuestos:
        </p>
        <ul className="ml-6 list-disc space-y-1.5">
          <li>
            <span className="font-semibold">Más de 24 horas antes de la cita:</span>{" "}
            cancelación sin costo y reembolso del 100% del monto cobrado.
          </li>
          <li>
            <span className="font-semibold">Entre 24 y 2 horas antes de la cita:</span>{" "}
            cancelación con cargo del 15% sobre el monto del servicio, para compensar el traslado o materiales reservados por el Técnico.
          </li>
          <li>
            <span className="font-semibold">Menos de 2 horas antes o ya en sitio:</span>{" "}
            cancelación con cargo de hasta 50% del monto del servicio, salvo causa de fuerza mayor debidamente acreditada.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Garantía de servicio (24 horas)">
        <p>
          Una vez completado el servicio, el Cliente tiene <span className="font-semibold">24 horas</span> para reportar inconformidades desde la app. Nuestro equipo de soporte revisa el caso, contacta al Técnico y, según el resultado de la revisión, puede:
        </p>
        <ul className="ml-6 list-disc space-y-1.5">
          <li>Coordinar una visita correctiva sin costo.</li>
          <li>Aplicar un ajuste parcial al cobro.</li>
          <li>Procesar el reembolso total cuando el servicio no se prestó o presenta defectos graves no subsanables.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Cancelación por parte del Técnico">
        <p>
          Si el Técnico cancela una cita confirmada, ServiTec reasigna la solicitud a otro Técnico verificado o, si el Cliente lo prefiere, reembolsa el 100% del monto cobrado. Las cancelaciones reiteradas por parte de un Técnico pueden derivar en la suspensión de su cuenta.
        </p>
      </LegalSection>

      <LegalSection title="5. Casos no cubiertos por el reembolso">
        <p>
          No procede reembolso, total ni parcial, en los siguientes supuestos:
        </p>
        <ul className="ml-6 list-disc space-y-1.5">
          <li>El Cliente no permitió el acceso al inmueble en el horario acordado.</li>
          <li>La información proporcionada en la solicitud fue significativamente inexacta y obligó a re-cotizar al llegar.</li>
          <li>Daños o desperfectos previos al servicio, no derivados del trabajo del Técnico.</li>
          <li>Servicios completados a satisfacción y aprobados por el Cliente en la app sin reporte dentro del plazo de 24 horas.</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Procesamiento de reembolsos">
        <p>
          Los reembolsos aprobados se procesan a través del mismo medio de pago utilizado, vía Stripe. Los tiempos de acreditación dependen del banco emisor del Cliente, y generalmente toman entre 5 y 15 días hábiles.
        </p>
        <p>
          Cuando el reembolso aplica sobre un servicio que ya fue cobrado al Técnico, ServiTec ajustará el saldo del Técnico en su cuenta de Stripe Connect, conforme a los términos de Stripe.
        </p>
      </LegalSection>

      <LegalSection title="7. Reembolsos y CFDI">
        <p>
          Cuando se haya emitido un CFDI por el servicio, el Técnico deberá emitir el CFDI de egreso (nota de crédito) correspondiente por el monto del reembolso. ServiTec ajustará, en lo conducente, el CFDI por la comisión cobrada.
        </p>
      </LegalSection>

      <LegalSection title="8. Cómo solicitar un reembolso">
        <p>
          Para solicitar un reembolso:
        </p>
        <ul className="ml-6 list-disc space-y-1.5">
          <li>Abre el detalle del servicio en la app y selecciona “Reportar problema”.</li>
          <li>O escribe a{" "}
            <a className="font-medium text-ink-900 underline-offset-4 hover:underline" href={`mailto:${site.supportEmail}`}>
              {site.supportEmail}
            </a>{" "}
            con el ID del servicio, una descripción y, si es posible, fotos.
          </li>
        </ul>
        <p>
          Respondemos en un máximo de 5 días hábiles con el resultado de la revisión.
        </p>
      </LegalSection>

      <LegalSection title="9. Disputas con el banco emisor">
        <p>
          Antes de iniciar un contracargo con tu banco o emisor de la tarjeta, te pedimos contactarnos directamente. Estamos comprometidos a llegar a una solución justa para ambas partes. Los contracargos resueltos en contra de ServiTec pueden derivar en la suspensión temporal del servicio mientras se aclara la situación.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
