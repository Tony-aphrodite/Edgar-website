import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/PageHeader";

export function LegalLayout({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} />
      <section className="pb-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="mb-10 text-sm text-ink-400">Última actualización: {updated}</p>
            <div className="legal-prose space-y-6 text-pretty text-ink-600">
              {children}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold tracking-tight text-ink-900">{title}</h2>
      <div className="space-y-3 text-[15px] leading-relaxed">{children}</div>
    </section>
  );
}
