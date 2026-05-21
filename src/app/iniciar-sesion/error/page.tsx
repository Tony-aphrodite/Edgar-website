import Link from "next/link";
import { Container } from "@/components/ui/Container";

const MESSAGES: Record<string, string> = {
  Configuration: "Hay un problema con la configuración del servidor. Intenta más tarde.",
  AccessDenied: "No tienes acceso a este recurso.",
  Verification: "El enlace expiró o ya fue usado. Solicita uno nuevo.",
  Default: "Ocurrió un error al iniciar sesión. Intenta nuevamente.",
};

export default function SignInErrorPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const key = searchParams.error ?? "Default";
  const message = MESSAGES[key] ?? MESSAGES.Default;

  return (
    <Container className="py-20">
      <div className="mx-auto max-w-md rounded-3xl border border-ink-100 bg-white p-10 text-center shadow-soft">
        <h1 className="text-2xl font-semibold text-ink-900">No pudimos iniciar sesión</h1>
        <p className="mt-3 text-sm text-ink-500">{message}</p>
        <Link
          href="/iniciar-sesion"
          className="mt-6 inline-block rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white"
        >
          Intentar de nuevo
        </Link>
      </div>
    </Container>
  );
}
