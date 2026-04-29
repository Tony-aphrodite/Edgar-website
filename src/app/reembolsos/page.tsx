import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de reembolsos",
  description: "Política de reembolsos y cancelaciones de Edgar Studio.",
};

export default function ReembolsosPage() {
  return (
    <LegalLayout eyebrow="Legal" title="Política de reembolsos" updated="29 de abril de 2026">
      <p>
        En {site.name} queremos que cada proyecto sea un éxito. Esta política explica cómo manejamos las cancelaciones, reembolsos y disputas.
      </p>

      <LegalSection title="1. Periodo de garantía">
        <p>
          Durante los primeros 14 días naturales del proyecto, si consideras que el trabajo entregado no cumple con lo acordado en la propuesta inicial y no logramos resolverlo mediante revisiones, puedes solicitar un reembolso parcial proporcional al trabajo no entregado.
        </p>
      </LegalSection>

      <LegalSection title="2. Trabajo realizado">
        <p>
          El anticipo del 50% cubre la fase de descubrimiento, estrategia y diseño inicial. Una vez iniciado el trabajo, este monto no es reembolsable, salvo en los casos descritos en la sección anterior.
        </p>
      </LegalSection>

      <LegalSection title="3. Cancelación por parte del cliente">
        <p>
          Si decides cancelar el proyecto después de iniciado, te entregaremos todo el trabajo realizado hasta la fecha y emitiremos un cargo proporcional por las horas invertidas, descontando el anticipo correspondiente.
        </p>
      </LegalSection>

      <LegalSection title="4. Cancelación por nuestra parte">
        <p>
          Nos reservamos el derecho de cancelar un proyecto si detectamos prácticas contrarias a la ética profesional, contenidos ilegales o falta de colaboración del cliente. En estos casos, reembolsaremos el monto correspondiente al trabajo no realizado.
        </p>
      </LegalSection>

      <LegalSection title="5. Servicios mensuales (retainers)">
        <p>
          Los servicios contratados bajo modalidad mensual pueden cancelarse con 30 días de aviso previo por escrito. No emitimos reembolsos por meses ya iniciados.
        </p>
      </LegalSection>

      <LegalSection title="6. Procesamiento de reembolsos">
        <p>
          Los reembolsos aprobados se procesan en un plazo de 10 a 15 días hábiles a través del mismo medio de pago utilizado originalmente. Para pagos con tarjeta vía Stripe, los tiempos pueden depender del banco emisor.
        </p>
      </LegalSection>

      <LegalSection title="7. Cómo solicitar un reembolso">
        <p>
          Envía un correo a{" "}
          <a className="font-medium text-ink-900 underline-offset-4 hover:underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          con el asunto “Solicitud de reembolso”, incluyendo el nombre del proyecto, número de factura y motivo. Responderemos en un máximo de 5 días hábiles.
        </p>
      </LegalSection>

      <LegalSection title="8. Disputas">
        <p>
          Antes de iniciar cualquier disputa con tu banco o proveedor de pagos, te pedimos contactarnos directamente. Estamos comprometidos a encontrar una solución justa para ambas partes.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
