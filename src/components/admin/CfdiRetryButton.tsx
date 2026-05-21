"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function CfdiRetryButton({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function retry() {
    setLoading(true);
    await fetch(`/api/admin/cfdis/${bookingId}/retry`, { method: "POST" });
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      onClick={retry}
      disabled={loading}
      className="rounded-full bg-ink-900 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-60"
    >
      {loading ? "..." : "Reintentar"}
    </button>
  );
}
