import { Hero } from "@/components/home/Hero";
import { Logos } from "@/components/home/Logos";
import { Services } from "@/components/home/Services";
import { Showcase } from "@/components/home/Showcase";
import { Process } from "@/components/home/Process";
import { Stats } from "@/components/home/Stats";
import { Pricing } from "@/components/home/Pricing";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { CTA } from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Logos />
      <Services />
      <Showcase />
      <Process />
      <Stats />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
