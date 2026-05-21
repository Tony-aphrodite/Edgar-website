import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { AlertCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default function PagoCanceladoPage({ searchParams }: { searchParams: { booking?: string } }) {
  return (
    <Container className="py-20">
      <div className="mx-auto max-w-md rounded-3xl border border-ink-100 bg-white p-10 text-center shadow-soft">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-600">
          <AlertCircle className="h-7 w-7" />
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-ink-900">Pago cancelado</h1>
        <p className="mt-3 text-sm text-ink-500">
          No se realizó ningún cargo. Puedes retomar el pago desde tu cuenta
          cuando quieras.
        </p>
        {searchParams.booking ? (
          <p className="mt-4 font-mono text-xs text-ink-400">
            Reserva: {searchParams.booking}
          </p>
        ) : null}
        <Link
          href="/"
          className="mt-8 inline-block rounded-full border border-ink-200 bg-white px-6 py-2.5 text-sm font-semibold text-ink-900"
        >
          Volver al inicio
        </Link>
      </div>
    </Container>
  );
}
