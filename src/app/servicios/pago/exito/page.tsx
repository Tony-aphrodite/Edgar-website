import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default function PagoExitoPage({ searchParams }: { searchParams: { booking?: string } }) {
  return (
    <Container className="py-20">
      <div className="mx-auto max-w-md rounded-3xl border border-ink-100 bg-white p-10 text-center shadow-soft">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h1 className="mt-4 text-2xl font-semibold text-ink-900">¡Pago confirmado!</h1>
        <p className="mt-3 text-sm text-ink-500">
          Recibimos tu pago. El técnico será notificado y confirmará la cita
          contigo en breve. Te enviaremos un correo con los detalles.
        </p>
        {searchParams.booking ? (
          <p className="mt-4 font-mono text-xs text-ink-400">
            Reserva: {searchParams.booking}
          </p>
        ) : null}
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-ink-900 px-6 py-2.5 text-sm font-semibold text-white"
        >
          Volver al inicio
        </Link>
      </div>
    </Container>
  );
}
