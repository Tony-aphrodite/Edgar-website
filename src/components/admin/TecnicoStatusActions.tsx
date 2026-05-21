"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Status = "PENDING" | "APPROVED" | "SUSPENDED" | "REJECTED";

export function TecnicoStatusActions({ id, status }: { id: string; status: Status }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function set(next: Status) {
    setLoading(true);
    await fetch(`/api/admin/tecnicos/${id}/status`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setLoading(false);
    router.refresh();
  }

  return (
    <div className="flex flex-wrap gap-2">
      {status !== "APPROVED" ? (
        <button onClick={() => set("APPROVED")} disabled={loading} className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60">
          Aprobar
        </button>
      ) : null}
      {status !== "SUSPENDED" ? (
        <button onClick={() => set("SUSPENDED")} disabled={loading} className="rounded-full bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60">
          Suspender
        </button>
      ) : null}
      {status !== "REJECTED" ? (
        <button onClick={() => set("REJECTED")} disabled={loading} className="rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60">
          Rechazar
        </button>
      ) : null}
    </div>
  );
}
