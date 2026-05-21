"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Image as ImageIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = { id: string; slug: string; name: string };

type UploadedPhoto = { key: string; publicUrl: string; name: string };

const input =
  "block w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 shadow-soft transition placeholder:text-ink-400 focus:border-ink-900 focus:outline-none focus:ring-2 focus:ring-accent/30";

export function NewServiceRequestForm({
  categories,
  uploadsEnabled,
}: {
  categories: Category[];
  uploadsEnabled: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);

  async function uploadFile(file: File): Promise<UploadedPhoto | null> {
    setUploading(true);
    try {
      const signRes = await fetch("/api/uploads/sign", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          kind: "service-photo",
          contentType: file.type,
          contentLength: file.size,
        }),
      });
      const signData = (await signRes.json()) as { uploadUrl?: string; publicUrl?: string; key?: string; error?: string };
      if (!signRes.ok || !signData.uploadUrl) {
        throw new Error(signData.error ?? "No pudimos preparar la carga");
      }
      const putRes = await fetch(signData.uploadUrl, {
        method: "PUT",
        headers: { "content-type": file.type },
        body: file,
      });
      if (!putRes.ok) throw new Error(`Carga fallida: ${putRes.status}`);
      return { key: signData.key!, publicUrl: signData.publicUrl!, name: file.name };
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error subiendo foto");
      return null;
    } finally {
      setUploading(false);
    }
  }

  async function onFiles(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    for (const file of files) {
      if (photos.length >= 6) break;
      const uploaded = await uploadFile(file);
      if (uploaded) setPhotos((p) => [...p, uploaded]);
    }
  }

  function removePhoto(key: string) {
    setPhotos((p) => p.filter((x) => x.key !== key));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      categoryId: String(fd.get("categoryId") ?? ""),
      title: String(fd.get("title") ?? "").trim(),
      description: String(fd.get("description") ?? "").trim(),
      addressLine: String(fd.get("addressLine") ?? "").trim(),
      postalCode: String(fd.get("postalCode") ?? "").trim(),
      city: String(fd.get("city") ?? "").trim(),
      state: String(fd.get("state") ?? "").trim(),
      photos: photos.map((p) => p.publicUrl),
      preferredDate: fd.get("preferredDate") ? String(fd.get("preferredDate")) : undefined,
    };

    try {
      const res = await fetch("/api/services/requests", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { request?: { id: string }; error?: string };
      if (!res.ok || !data.request) throw new Error(data.error ?? `HTTP ${res.status}`);
      router.push(`/cuenta/solicitudes/${data.request.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos crear tu solicitud.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-ink-100 bg-white p-6 shadow-soft sm:p-10">
      <Field label="Categoría" required>
        <select name="categoryId" required defaultValue="" className={input}>
          <option value="" disabled>Selecciona una categoría</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </Field>

      <Field label="Título corto" required>
        <input name="title" required minLength={4} maxLength={140} className={input} placeholder="Fuga en la regadera" />
      </Field>

      <Field label="Descripción" required>
        <textarea name="description" required rows={4} maxLength={4000} className={cn(input, "resize-y")} placeholder="Cuéntanos qué pasa, cuándo empezó, si hay fotos disponibles..." />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Calle y número" required>
          <input name="addressLine" required maxLength={240} className={input} placeholder="Av. Insurgentes Sur 1234" />
        </Field>
        <Field label="Colonia, alcaldía" required>
          <input name="city" required maxLength={120} className={input} placeholder="Roma Norte, Cuauhtémoc" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="C.P." required>
          <input name="postalCode" required pattern="\d{5}" maxLength={5} className={input} placeholder="06700" />
        </Field>
        <Field label="Estado" required>
          <input name="state" required defaultValue="Ciudad de México" className={input} />
        </Field>
        <Field label="Fecha preferida (opcional)">
          <input type="datetime-local" name="preferredDate" className={input} />
        </Field>
      </div>

      <Field label="Fotos (opcional, hasta 6)">
        {uploadsEnabled ? (
          <div className="space-y-3">
            {photos.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {photos.map((p) => (
                  <div key={p.key} className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.publicUrl} alt={p.name} className="h-20 w-20 rounded-xl border border-ink-200 object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(p.key)}
                      className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 shadow-sm hover:text-ink-900"
                      aria-label="Quitar foto"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-dashed border-ink-200 bg-white px-4 py-2.5 text-sm text-ink-600 hover:border-ink-400">
              <ImageIcon className="h-4 w-4" />
              {uploading ? "Subiendo…" : "Agregar fotos"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic"
                multiple
                className="hidden"
                onChange={onFiles}
                disabled={uploading || photos.length >= 6}
              />
            </label>
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-ink-200 bg-ink-50/50 p-3 text-xs text-ink-500">
            La carga de fotos no está configurada en este entorno. Continúa sin fotos por ahora.
          </p>
        )}
      </Field>

      {error ? (
        <div className="flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={loading || uploading}
        className="inline-flex w-full items-center justify-center rounded-full bg-ink-900 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-ink-800 disabled:opacity-60"
      >
        {loading ? "Enviando…" : "Publicar solicitud"}
      </button>
    </form>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
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
