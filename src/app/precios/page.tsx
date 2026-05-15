import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Pricing } from "@/components/home/Pricing";
import { FAQ } from "@/components/home/FAQ";
import { CTA } from "@/components/home/CTA";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Precios y comisiones",
  description: `Solicitar servicios en ServiTec es gratis: solo pagas el monto cotizado por el técnico. ServiTec retiene una comisión del ${site.commission.rate}% al técnico por cada servicio completado.`,
};

export default function PreciosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Precios y comisiones"
        title={
          <>
            Cobramos solo{" "}
            <span className="gradient-text">cuando hay servicio</span>
          </>
        }
        description={`Para clientes, descargar y solicitar es gratis. Para técnicos, ServiTec retiene una comisión del ${site.commission.rate}% sobre cada servicio completado. Sin mensualidades, sin letra chica.`}
      />
      <Pricing compact />
      <FAQ />
      <CTA />
    </>
  );
}
