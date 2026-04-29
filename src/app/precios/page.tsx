import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Pricing } from "@/components/home/Pricing";
import { FAQ } from "@/components/home/FAQ";
import { CTA } from "@/components/home/CTA";

export const metadata: Metadata = {
  title: "Precios",
  description:
    "Planes claros y transparentes para diseño web, branding y marketing digital. Desde $599 USD.",
};

export default function PreciosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Inversión"
        title={
          <>
            Precios <span className="gradient-text">transparentes</span>, sin sorpresas
          </>
        }
        description="Tres planes pensados para distintos momentos del negocio. ¿Necesitas algo personalizado? Hablemos."
      />
      <Pricing compact />
      <FAQ />
      <CTA />
    </>
  );
}
