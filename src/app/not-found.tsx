import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-24">
      <div className="mx-auto max-w-md text-center">
        <p className="text-xs uppercase tracking-widest text-ink-400">Error 404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
          Página no encontrada
        </h1>
        <p className="mt-3 text-sm text-ink-500">
          La página que buscas no existe o fue movida. Intenta desde el inicio.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white"
        >
          Ir al inicio
        </Link>
      </div>
    </Container>
  );
}
