"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = { id: string; slug: string; name: string };
type TaxRegime = "RESICO" | "ACTIVIDAD_EMPRESARIAL" | "ASIMILADOS" | "HONORARIOS" | "NONE";

type Initial = {
  displayName?: string;
  bio?: string;
  yearsExperience?: number;
  coverageRadiusKm?: number;
  hasCfdiCapability?: boolean;
  rfc?: string;
  taxRegime?: TaxRegime;
  cfdiPostalCode?: string;
  legalName?: string;
  categoryIds?: string[];
};

const input =
  "block w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 shadow-soft transition placeholder:text-ink-400 focus:border-ink-900 focus:outline-none focus:ring-2 focus:ring-accent/30";

export function TecnicoOnboardingForm({
  categories,
  initial,
}: {
  categories: Category[];
  initial?: Initial;
}) {
  const [selected, setSelected] = useState<Set<string>>(
    new Set(initial?.categoryIds ?? []),
  );
  const [hasCfdi, setHasCfdi] = useState<boolean>(initial?.hasCfdiCapability ?? false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleCategory(id: string) {
    setSelected((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      displayName: String(fd.get("displayName") ?? "").trim(),
      bio: String(fd.get("bio") ?? "").trim() || undefined,
      yearsExperience: fd.get("yearsExperience")
        ? Number(fd.get("yearsExperience"))
        : undefined,
      categoryIds: Array.from(selected),
      coverageRadiusKm: Number(fd.get("coverageRadiusKm") ?? 15),
      hasCfdiCapability: hasCfdi,
      ...(hasCfdi
        ? {
            rfc: String(fd.get("rfc") ?? "").trim().toUpperCase(),
            taxRegime: String(fd.get("taxRegime") ?? "RESICO") as TaxRegime,
            cfdiPostalCode: String(fd.get("cfdiPostalCode") ?? "").trim(),
            legalName: String(fd.get("legalName") ?? "").trim() || undefined,
          }
        : { taxRegime: "NONE" as TaxRegime }),
    };

    if (payload.categoryIds.length === 0) {
      setError("Selecciona al menos una categoría de servicio.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/tecnicos/onboarding", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { onboardingUrl?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      if (data.onboardingUrl) {
        window.location.href = data.onboardingUrl;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos guardar tu perfil.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 rounded-3xl border border-ink-100 bg-white p-6 shadow-soft sm:p-10">
      <Field label="Nombre comercial" required>
        <input name="displayName" required defaultValue={initial?.displayName} className={input} placeholder="Juan Eléctrico" />
      </Field>

      <Field label="Acerca de ti">
        <textarea name="bio" rows={3} defaultValue={initial?.bio} className={cn(input, "resize-y")} placeholder="Experiencia, certificaciones, especialidades..." />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Años de experiencia">
          <input type="number" name="yearsExperience" min={0} max={80} defaultValue={initial?.yearsExperience} className={input} />
        </Field>
        <Field label="Radio de cobertura (km)" required>
          <input type="number" name="coverageRadiusKm" min={1} max={100} defaultValue={initial?.coverageRadiusKm ?? 15} required className={input} />
        </Field>
      </div>

      <Field label="Categorías que ofreces" required>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const isOn = selected.has(c.id);
            return (
              <button
                type="button"
                key={c.id}
                onClick={() => toggleCategory(c.id)}
                className={cn(
                  "inline-flex items-center rounded-full border px-4 py-2 text-sm transition",
                  isOn
                    ? "border-ink-900 bg-ink-900 text-white"
                    : "border-ink-200 bg-white text-ink-600 hover:border-ink-400",
                )}
              >
                {c.name}
              </button>
            );
          })}
        </div>
      </Field>

      <div className="rounded-2xl border border-ink-100 bg-ink-50/40 p-5">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={hasCfdi}
            onChange={(e) => setHasCfdi(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-ink-300 text-ink-900 focus:ring-accent"
          />
          <span className="text-sm text-ink-700">
            <span className="font-semibold text-ink-900">Puedo emitir CFDI a clientes</span>
            <span className="block text-ink-500">
              Si lo activas, tu RFC y régimen aparecerán en las facturas que emitas
              al cliente. La comisión de la plataforma se factura por separado.
            </span>
          </span>
        </label>

        {hasCfdi ? (
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="RFC" required>
              <input name="rfc" required defaultValue={initial?.rfc} className={input} placeholder="GOME900115AA4" />
            </Field>
            <Field label="Régimen fiscal" required>
              <select name="taxRegime" defaultValue={initial?.taxRegime ?? "RESICO"} className={input}>
                <option value="RESICO">RESICO Persona Física</option>
                <option value="ACTIVIDAD_EMPRESARIAL">Actividad Empresarial</option>
                <option value="HONORARIOS">Honorarios</option>
                <option value="ASIMILADOS">Asimilados a Salarios</option>
              </select>
            </Field>
            <Field label="Código postal fiscal" required>
              <input name="cfdiPostalCode" required pattern="\d{5}" defaultValue={initial?.cfdiPostalCode} className={input} placeholder="89180" />
            </Field>
            <Field label="Razón social (opcional)">
              <input name="legalName" defaultValue={initial?.legalName} className={input} />
            </Field>
          </div>
        ) : null}
      </div>

      {error ? (
        <div className="flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center rounded-full bg-ink-900 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-ink-800 disabled:opacity-60"
      >
        {loading ? "Guardando…" : "Guardar y continuar con Stripe"}
      </button>

      <p className="text-center text-xs text-ink-400">
        Al continuar serás dirigido a Stripe para verificar tu identidad y
        configurar tus depósitos. Es requisito para recibir pagos.
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-ink-800">
        {label}
        {required && <span className="ml-0.5 text-accent">*</span>}
      </label>
      {children}
    </div>
  );
}
