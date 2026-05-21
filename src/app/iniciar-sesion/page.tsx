"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import Link from "next/link";

function SignInForm() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onEmailSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("email", { email, callbackUrl, redirect: false });
    setLoading(false);
    if (res?.ok) setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-ink-100 bg-white p-10 text-center shadow-soft">
        <h2 className="text-xl font-semibold text-ink-900">Revisa tu correo</h2>
        <p className="mt-3 text-sm text-ink-500">
          Te enviamos un enlace para iniciar sesión. Expira en 10 minutos.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-ink-100 bg-white p-10 shadow-soft">
      <h1 className="text-2xl font-semibold text-ink-900">Inicia sesión</h1>
      <p className="mt-2 text-sm text-ink-500">
        Te enviaremos un enlace mágico al correo. No necesitas contraseña.
      </p>

      <form onSubmit={onEmailSignIn} className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-ink-700">Correo electrónico</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            className="mt-1.5 block w-full rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-sm shadow-sm focus:border-ink-900 focus:outline-none focus:ring-2 focus:ring-ink-900/10"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-ink-900 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-ink-800 disabled:opacity-60"
        >
          {loading ? "Enviando…" : "Enviar enlace mágico"}
        </button>
      </form>

      <div className="mt-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-ink-100" />
        <span className="text-xs uppercase tracking-widest text-ink-400">o</span>
        <div className="h-px flex-1 bg-ink-100" />
      </div>

      <button
        onClick={() => signIn("google", { callbackUrl })}
        className="mt-6 w-full rounded-full border border-ink-200 bg-white px-5 py-3 text-sm font-semibold text-ink-900 shadow-sm transition hover:border-ink-900"
      >
        Continuar con Google
      </button>

      <p className="mt-8 text-center text-xs text-ink-400">
        Al continuar aceptas nuestros{" "}
        <Link href="/terminos" className="underline-offset-4 hover:underline">Términos</Link>{" "}
        y el{" "}
        <Link href="/privacidad" className="underline-offset-4 hover:underline">Aviso de privacidad</Link>.
      </p>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Container className="py-20">
      <div className="mx-auto max-w-md">
        <Suspense fallback={null}>
          <SignInForm />
        </Suspense>
      </div>
    </Container>
  );
}
