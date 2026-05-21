import { Container } from "@/components/ui/Container";

export default function VerifyRequestPage() {
  return (
    <Container className="py-20">
      <div className="mx-auto max-w-md rounded-3xl border border-ink-100 bg-white p-10 text-center shadow-soft">
        <h1 className="text-2xl font-semibold text-ink-900">Revisa tu correo</h1>
        <p className="mt-3 text-sm text-ink-500">
          Te enviamos un enlace para iniciar sesión. Revisa también la carpeta de
          spam. El enlace expira en 10 minutos.
        </p>
      </div>
    </Container>
  );
}
