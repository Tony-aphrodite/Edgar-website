import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatDate, formatMxn, REQUEST_STATUS_LABELS } from "@/lib/format";
import { StatusBadge, requestStatusTone } from "@/components/StatusBadge";
import { AcceptQuoteButton, CancelRequestButton } from "@/components/RequestActions";

export const dynamic = "force-dynamic";

export default async function SolicitudDetalle({ params }: { params: { id: string } }) {
  const session = await auth();
  const request = await prisma.serviceRequest.findUnique({
    where: { id: params.id },
    include: {
      category: true,
      quotes: {
        orderBy: { totalAmountCents: "asc" },
        include: {
          tecnico: { select: { id: true, displayName: true, yearsExperience: true } },
        },
      },
      booking: true,
    },
  });
  if (!request || request.clientId !== session!.user.id) notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Link href="/cuenta/solicitudes" className="text-xs text-ink-500 hover:underline">← Volver</Link>
          <h1 className="mt-2 text-2xl font-semibold text-ink-900">{request.title}</h1>
          <p className="mt-1 text-sm text-ink-500">
            {request.category.name} · creada {formatDate(request.createdAt)}
          </p>
        </div>
        <StatusBadge label={REQUEST_STATUS_LABELS[request.status] ?? request.status} tone={requestStatusTone(request.status)} />
      </div>

      <div className="rounded-2xl border border-ink-100 bg-white p-5 text-sm text-ink-700">
        <h2 className="text-sm font-semibold text-ink-900">Descripción</h2>
        <p className="mt-2 whitespace-pre-line">{request.description}</p>
        <h2 className="mt-5 text-sm font-semibold text-ink-900">Dirección</h2>
        <p className="mt-2 text-ink-700">
          {request.addressLine}, {request.city}, {request.state}, C.P. {request.postalCode}
        </p>
        {Array.isArray(request.photos) && request.photos.length > 0 ? (
          <>
            <h2 className="mt-5 text-sm font-semibold text-ink-900">Fotos</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {(request.photos as string[]).map((url) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={url} src={url} alt="" className="h-20 w-20 rounded-xl border border-ink-200 object-cover" />
              ))}
            </div>
          </>
        ) : null}
      </div>

      <div>
        <h2 className="text-sm font-semibold text-ink-900">Cotizaciones</h2>
        {request.quotes.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-ink-200 bg-white p-5 text-sm text-ink-500">
            Aún no llegan cotizaciones. Te avisaremos por correo.
          </p>
        ) : (
          <ul className="mt-3 space-y-3">
            {request.quotes.map((q) => (
              <li key={q.id} className="rounded-2xl border border-ink-100 bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink-900">{q.tecnico.displayName}</p>
                    {q.tecnico.yearsExperience ? (
                      <p className="text-xs text-ink-500">{q.tecnico.yearsExperience} años de experiencia</p>
                    ) : null}
                    {q.notes ? <p className="mt-2 text-sm text-ink-700">{q.notes}</p> : null}
                    <p className="mt-2 text-xs text-ink-500">
                      Mano de obra: {formatMxn(q.laborAmountCents)} · Materiales: {formatMxn(q.materialsAmountCents)} · Válida hasta {formatDate(q.validUntil)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold text-ink-900">{formatMxn(q.totalAmountCents)}</p>
                    {q.status === "PENDING" && request.status !== "ACCEPTED" ? (
                      <AcceptQuoteButton quoteId={q.id} />
                    ) : (
                      <p className="mt-2 text-xs text-ink-500">{q.status}</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {request.status === "OPEN" || request.status === "QUOTED" ? (
        <CancelRequestButton requestId={request.id} />
      ) : null}
    </div>
  );
}
