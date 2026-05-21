"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

const input =
  "block w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 shadow-soft focus:border-ink-900 focus:outline-none focus:ring-2 focus:ring-accent/30";

type Existing = {
  laborAmountCents: number;
  materialsAmountCents: number;
  notes: string | null;
} | null;

export function SubmitQuoteForm({ requestId, existing }: { requestId: string; existing: Existing }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      laborAmountCents: Math.round(Number(fd.get("labor") ?? 0) * 100),
      materialsAmountCents: Math.round(Number(fd.get("materials") ?? 0) * 100),
      notes: String(fd.get("notes") ?? "").trim() || undefined,
      validForHours: Number(fd.get("validForHours") ?? 72),
    };
    try {
      const res = await fetch(`/api/services/requests/${requestId}/quotes`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? `HTTP ${res.status}`);
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos enviar tu cotización.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-ink-100 bg-white p-6">
      <h2 className="text-sm font-semibold text-ink-900">
        {existing ? "Editar cotización" : "Enviar cotización"}
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Mano de obra (MXN)" required>
          <input
            type="number"
            min={1}
            step="0.01"
            name="labor"
            required
            defaultValue={existing ? (existing.laborAmountCents / 100).toString() : ""}
            className={input}
          />
        </Field>
        <Field label="Materiales (MXN)">
          <input
            type="number"
            min={0}
            step="0.01"
            name="materials"
            defaultValue={existing ? (existing.materialsAmountCents / 100).toString() : "0"}
            className={input}
          />
        </Field>
        <Field label="Vigencia (horas)">
          <input type="number" min={1} max={720} name="validForHours" defaultValue={72} className={input} />
        </Field>
      </div>
      <Field label="Notas (opcional)">
        <textarea
          name="notes"
          rows={3}
          maxLength={2000}
          defaultValue={existing?.notes ?? ""}
          className={input}
          placeholder="Incluye qué cubre, tiempos estimados, garantía, etc."
        />
      </Field>
      {error ? (
        <div className="flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
      >
        {loading ? "Enviando…" : existing ? "Actualizar cotización" : "Enviar cotización"}
      </button>
    </form>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-ink-800">
        {label}
        {required ? <span className="ml-0.5 text-accent">*</span> : null}
      </label>
      {children}
    </div>
  );
}
