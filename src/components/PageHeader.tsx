import { Container } from "@/components/ui/Container";
import { SectionEyebrow } from "@/components/ui/Section";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[460px] w-[1100px] -translate-x-1/2 bg-gradient-radial opacity-80" />
        <div className="absolute inset-x-0 top-0 h-[420px] grid-bg opacity-60" />
      </div>
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {eyebrow && <SectionEyebrow>{eyebrow}</SectionEyebrow>}
          <h1 className="mt-5 text-display-xl text-balance text-ink-900">{title}</h1>
          {description && (
            <p className="mt-5 max-w-2xl text-pretty text-lg text-ink-500">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
