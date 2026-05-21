"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function RefundButton({ bookingId, maxRefund }: { bookingId: string; maxRefund: number }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState((maxRefund / 100).toString());
  const [reason, setReason] = useState("requested_by_customer");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setLoading(true);
    setError(null);
    const res = await fetch(`/api/admin/bookings/${bookingId}/refund`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        amountCents: Math.round(Number(amount) * 100),
        reason,
        note: note || undefined,
      }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "No pudimos procesar el reembolso.");
      return;
    }
    setOpen(false);
    router.refresh();
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">
        Reembolsar
      </button>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm">
      <p className="font-semibold text-rose-900">Procesar reembolso</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        <label className="text-xs">
          Monto (MXN)
          <input
            type="number"
            min={1}
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-rose-200 bg-white px-3 py-1.5"
          />
        </label>
        <label className="text-xs">
          Motivo
          <select value={reason} onChange={(e) => setReason(e.target.value)} className="mt-1 block w-full rounded-lg border border-rose-200 bg-white px-3 py-1.5">
            <option value="requested_by_customer">Solicitado por cliente</option>
            <option value="duplicate">Duplicado</option>
            <option value="fraudulent">Fraudulento</option>
          </select>
        </label>
        <label className="text-xs">
          Nota interna
          <input value={note} onChange={(e) => setNote(e.target.value)} className="mt-1 block w-full rounded-lg border border-rose-200 bg-white px-3 py-1.5" />
        </label>
      </div>
      {error ? <p className="mt-2 text-xs text-rose-700">{error}</p> : null}
      <div className="mt-3 flex gap-2">
        <button onClick={submit} disabled={loading} className="rounded-full bg-rose-700 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60">
          {loading ? "..." : "Confirmar"}
        </button>
        <button onClick={() => setOpen(false)} disabled={loading} className="rounded-full border border-rose-200 px-3 py-1.5 text-xs">
          Cancelar
        </button>
      </div>
    </div>
  );
}
