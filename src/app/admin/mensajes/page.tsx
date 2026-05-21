import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/format";
import { StatusBadge } from "@/components/StatusBadge";

export const dynamic = "force-dynamic";

const AUDIENCE_TONE: Record<string, "info" | "neutral" | "warning"> = {
  CLIENT: "info",
  TECNICO: "warning",
  OTHER: "neutral",
  PRESS: "neutral",
};

export default async function AdminMensajes() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-ink-900">Mensajes de contacto</h1>
      <ul className="space-y-3">
        {messages.length === 0 ? (
          <li className="rounded-2xl border border-ink-100 bg-white p-10 text-center text-sm text-ink-500">Sin mensajes.</li>
        ) : (
          messages.map((m) => (
            <li key={m.id} className="rounded-2xl border border-ink-100 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-ink-900">{m.name}</p>
                  <p className="text-xs text-ink-500">
                    {m.email} · {m.phone ?? "sin teléfono"} · {m.city ?? "—"} · {formatDate(m.createdAt)}
                  </p>
                </div>
                <StatusBadge label={m.audience} tone={AUDIENCE_TONE[m.audience] ?? "neutral"} />
              </div>
              <p className="mt-3 whitespace-pre-line text-sm text-ink-700">{m.message}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
