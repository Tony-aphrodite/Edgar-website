import { Container } from "@/components/ui/Container";
import { clients } from "@/lib/data";

export function Logos() {
  return (
    <section className="border-y border-ink-100 bg-white py-14">
      <Container>
        <p className="text-center text-xs font-medium uppercase tracking-[0.22em] text-ink-400">
          Categorías de servicio disponibles
        </p>
        <div className="mt-8 overflow-hidden mask-fade-x">
          <div className="marquee marquee-reverse flex w-max items-center gap-12 whitespace-nowrap [--marquee-duration:50s]">
            {[...clients, ...clients, ...clients].map((c, i) => (
              <div
                key={`${c}-${i}`}
                className="flex shrink-0 items-center gap-8"
              >
                <span className="select-none font-serif text-2xl italic tracking-tight text-ink-400 transition-colors hover:text-ink-800">
                  {c}
                </span>
                <span className="text-ink-200">✦</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
