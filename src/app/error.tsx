"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-24">
      <div className="mx-auto max-w-md text-center">
        <p className="text-xs uppercase tracking-widest text-ink-400">Algo falló</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
          No pudimos cargar esta página
        </h1>
        <p className="mt-3 text-sm text-ink-500">
          Intenta de nuevo. Si el problema persiste, escríbenos.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="rounded-full border border-ink-200 bg-white px-6 py-3 text-sm font-semibold text-ink-900"
          >
            Ir al inicio
          </Link>
        </div>
        {error.digest ? (
          <p className="mt-6 font-mono text-xs text-ink-400">ref: {error.digest}</p>
        ) : null}
      </div>
    </Container>
  );
}
