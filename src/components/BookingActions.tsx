"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

type Props = {
  bookingId: string;
  status: string;
  isClient: boolean;
  isTecnico: boolean;
  hasReview: boolean;
  existingReviewRating?: number;
  existingReviewComment?: string;
};

export function BookingActions(props: Props) {
  return (
    <div className="space-y-4">
      {props.status === "PENDING_PAYMENT" && props.isClient ? <RetryCheckout id={props.bookingId} /> : null}
      {props.status === "PENDING_PAYMENT" ? <CancelBooking id={props.bookingId} /> : null}
      {props.status === "PAID" && props.isTecnico ? <StartButton id={props.bookingId} /> : null}
      {(props.status === "PAID" || props.status === "IN_PROGRESS") && props.isTecnico ? (
        <CompleteButton id={props.bookingId} />
      ) : null}
      {props.status === "COMPLETED" && props.isClient ? (
        <ReviewForm
          id={props.bookingId}
          existingRating={props.existingReviewRating}
          existingComment={props.existingReviewComment}
          hasReview={props.hasReview}
        />
      ) : null}
    </div>
  );
}

function RetryCheckout({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  async function go() {
    setLoading(true);
    const res = await fetch(`/api/services/bookings/${id}/retry-checkout`, { method: "POST" });
    const data = (await res.json()) as { checkoutUrl?: string };
    if (data.checkoutUrl) window.location.href = data.checkoutUrl;
    else setLoading(false);
  }
  return (
    <button
      onClick={go}
      disabled={loading}
      className="rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
    >
      {loading ? "Procesando…" : "Continuar al pago"}
    </button>
  );
}

function StartButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function go() {
    setLoading(true);
    const res = await fetch(`/api/services/bookings/${id}/start`, { method: "POST" });
    if (res.ok) router.refresh();
    setLoading(false);
  }
  return (
    <button
      onClick={go}
      disabled={loading}
      className="rounded-full bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
    >
      {loading ? "..." : "Marcar como iniciado"}
    </button>
  );
}

function CompleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function go() {
    if (!confirm("¿Marcar este servicio como completado?")) return;
    setLoading(true);
    const res = await fetch(`/api/services/bookings/${id}/complete`, { method: "POST" });
    if (res.ok) router.refresh();
    setLoading(false);
  }
  return (
    <button
      onClick={go}
      disabled={loading}
      className="rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
    >
      {loading ? "..." : "Marcar como completado"}
    </button>
  );
}

function CancelBooking({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function go() {
    if (!confirm("¿Cancelar esta reserva?")) return;
    setLoading(true);
    const res = await fetch(`/api/services/bookings/${id}/cancel`, { method: "POST" });
    if (res.ok) router.refresh();
    setLoading(false);
  }
  return (
    <button
      onClick={go}
      disabled={loading}
      className="text-sm text-rose-600 underline-offset-4 hover:underline disabled:opacity-60"
    >
      {loading ? "..." : "Cancelar reserva"}
    </button>
  );
}

function ReviewForm({
  id,
  existingRating,
  existingComment,
  hasReview,
}: {
  id: string;
  existingRating?: number;
  existingComment?: string;
  hasReview: boolean;
}) {
  const router = useRouter();
  const [rating, setRating] = useState(existingRating ?? 0);
  const [comment, setComment] = useState(existingComment ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(hasReview);

  async function submit() {
    if (rating < 1) {
      setError("Selecciona una calificación.");
      return;
    }
    setLoading(true);
    setError(null);
    const res = await fetch(`/api/services/bookings/${id}/review`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ rating, comment }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "No pudimos enviar tu reseña.");
      return;
    }
    setDone(true);
    router.refresh();
  }

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5">
      <h3 className="text-sm font-semibold text-ink-900">
        {done ? "Gracias por tu reseña" : "Califica al técnico"}
      </h3>
      <div className="mt-3 flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            type="button"
            key={n}
            disabled={done}
            onClick={() => setRating(n)}
            className="p-1"
            aria-label={`${n} estrellas`}
          >
            <Star
              className={
                n <= rating
                  ? "h-6 w-6 fill-amber-400 text-amber-400"
                  : "h-6 w-6 text-ink-300"
              }
            />
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        disabled={done}
        maxLength={2000}
        placeholder="¿Cómo estuvo el servicio? (opcional)"
        className="mt-3 block w-full rounded-xl border border-ink-200 bg-white px-3 py-2 text-sm"
      />
      {error ? <p className="mt-2 text-xs text-rose-700">{error}</p> : null}
      {!done ? (
        <button
          onClick={submit}
          disabled={loading}
          className="mt-3 rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Enviando…" : "Enviar reseña"}
        </button>
      ) : null}
    </div>
  );
}
