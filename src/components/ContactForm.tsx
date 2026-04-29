"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const inputClasses =
  "block w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 shadow-soft transition placeholder:text-ink-400 focus:border-ink-900 focus:outline-none focus:ring-2 focus:ring-accent/30";

const services = [
  "Diseño Web",
  "Branding",
  "Marketing Digital",
  "Consultoría",
  "Otro",
];

const budgets = [
  "Menos de $1,000 USD",
  "$1,000 – $3,000 USD",
  "$3,000 – $7,000 USD",
  "Más de $7,000 USD",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-ink-100 bg-white p-10 text-center shadow-soft">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-ink-900">
          ¡Mensaje recibido!
        </h3>
        <p className="mt-2 max-w-md text-pretty text-sm text-ink-500 mx-auto">
          Gracias por escribirnos. Te respondemos en menos de 24 horas hábiles desde hola@edgarstudio.mx.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-3xl border border-ink-100 bg-white p-6 shadow-soft sm:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre completo" required>
          <input
            type="text"
            name="name"
            required
            placeholder="María Pérez"
            className={inputClasses}
          />
        </Field>
        <Field label="Correo electrónico" required>
          <input
            type="email"
            name="email"
            required
            placeholder="maria@empresa.com"
            className={inputClasses}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Empresa">
          <input
            type="text"
            name="company"
            placeholder="Empresa o proyecto"
            className={inputClasses}
          />
        </Field>
        <Field label="Teléfono / WhatsApp">
          <input
            type="tel"
            name="phone"
            placeholder="+52 55 1234 5678"
            className={inputClasses}
          />
        </Field>
      </div>

      <Field label="¿En qué podemos ayudarte?" required>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <label
              key={s}
              className="cursor-pointer"
            >
              <input
                type="radio"
                name="service"
                value={s}
                required
                className="peer sr-only"
              />
              <span className="inline-flex items-center rounded-full border border-ink-200 bg-white px-4 py-2 text-sm text-ink-600 transition hover:border-ink-400 peer-checked:border-ink-900 peer-checked:bg-ink-900 peer-checked:text-white">
                {s}
              </span>
            </label>
          ))}
        </div>
      </Field>

      <Field label="Presupuesto estimado">
        <div className="flex flex-wrap gap-2">
          {budgets.map((b) => (
            <label key={b} className="cursor-pointer">
              <input
                type="radio"
                name="budget"
                value={b}
                className="peer sr-only"
              />
              <span className="inline-flex items-center rounded-full border border-ink-200 bg-white px-4 py-2 text-sm text-ink-600 transition hover:border-ink-400 peer-checked:border-ink-900 peer-checked:bg-ink-900 peer-checked:text-white">
                {b}
              </span>
            </label>
          ))}
        </div>
      </Field>

      <Field label="Cuéntanos más" required>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Describe brevemente el proyecto, tus tiempos y cualquier referencia que sea útil..."
          className={cn(inputClasses, "resize-y")}
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-ink-500">
        <input
          type="checkbox"
          required
          className="mt-1 h-4 w-4 rounded border-ink-300 text-ink-900 focus:ring-accent"
        />
        <span>
          Acepto el{" "}
          <a href="/privacidad" className="font-medium text-ink-900 underline-offset-4 hover:underline">
            aviso de privacidad
          </a>{" "}
          y autorizo el contacto sobre mi solicitud.
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink-900 px-6 text-[15px] font-medium text-white shadow-soft transition-all hover:bg-ink-800 hover:shadow-glow disabled:opacity-60"
      >
        {loading ? "Enviando..." : "Enviar mensaje"}
        {!loading && <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
      </button>
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
