"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AcceptQuoteButton({ quoteId }: { quoteId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onAccept() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/services/quotes/${quoteId}/accept`, { method: "POST" });
      const data = (await res.json()) as { checkoutUrl?: string; error?: string };
      if (!res.ok || !data.checkoutUrl) throw new Error(data.error ?? `HTTP ${res.status}`);
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos procesar el pago.");
      setLoading(false);
    }
  }

  return (
    <div className="text-right">
      <button
        onClick={onAccept}
        disabled={loading}
        className="mt-2 inline-flex items-center rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-ink-800 disabled:opacity-60"
      >
        {loading ? "Procesando…" : "Aceptar y pagar"}
      </button>
      {error ? <p className="mt-2 text-xs text-rose-700">{error}</p> : null}
    </div>
  );
}

export function CancelRequestButton({ requestId }: { requestId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onCancel() {
    if (!confirm("¿Cancelar esta solicitud?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/services/requests/${requestId}/cancel`, { method: "POST" });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? `HTTP ${res.status}`);
      }
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={onCancel}
      disabled={loading}
      className="text-sm text-rose-600 underline-offset-4 hover:underline disabled:opacity-60"
    >
      {loading ? "Cancelando…" : "Cancelar solicitud"}
    </button>
  );
}
