import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { formatDate, formatMxn } from "@/lib/format";
import { SubmitQuoteForm } from "@/components/SubmitQuoteForm";

export const dynamic = "force-dynamic";

export default async function OportunidadDetalle({ params }: { params: { id: string } }) {
  const session = await auth();
  const profile = await prisma.tecnicoProfile.findUnique({
    where: { userId: session!.user.id },
    include: { categories: { select: { categoryId: true } } },
  });
  if (!profile) notFound();

  const request = await prisma.serviceRequest.findUnique({
    where: { id: params.id },
    include: {
      category: true,
      quotes: { where: { tecnicoId: profile.id }, take: 1 },
    },
  });
  if (!request) notFound();

  const inMyCategories = profile.categories.some((c) => c.categoryId === request.categoryId);
  const canQuote =
    profile.status === "APPROVED" &&
    profile.stripeChargesEnabled &&
    (request.status === "OPEN" || request.status === "QUOTED") &&
    inMyCategories;

  const existing = request.quotes[0];

  return (
    <div className="space-y-6">
      <Link href="/cuenta/oportunidades" className="text-xs text-ink-500 hover:underline">← Volver</Link>
      <h1 className="text-2xl font-semibold text-ink-900">{request.title}</h1>
      <p className="text-sm text-ink-500">
        {request.category.name} · publicada {formatDate(request.createdAt)}
      </p>

      <div className="rounded-2xl border border-ink-100 bg-white p-5 text-sm">
        <h2 className="font-semibold text-ink-900">Descripción</h2>
        <p className="mt-2 whitespace-pre-line text-ink-700">{request.description}</p>
        <h2 className="mt-5 font-semibold text-ink-900">Ubicación</h2>
        <p className="mt-2 text-ink-700">
          {request.addressLine}, {request.city}, C.P. {request.postalCode}
        </p>
        {Array.isArray(request.photos) && request.photos.length > 0 ? (
          <>
            <h2 className="mt-5 font-semibold text-ink-900">Fotos</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {(request.photos as string[]).map((u) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={u} src={u} alt="" className="h-20 w-20 rounded-xl border border-ink-200 object-cover" />
              ))}
            </div>
          </>
        ) : null}
      </div>

      {existing ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900">
          Ya enviaste una cotización por {formatMxn(existing.totalAmountCents)} (estado: {existing.status}).
          Puedes editarla mientras la solicitud siga abierta.
        </div>
      ) : null}

      {canQuote ? <SubmitQuoteForm requestId={request.id} existing={existing ?? null} /> : (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          {!inMyCategories
            ? "Esta solicitud no está en tus categorías."
            : profile.status !== "APPROVED"
            ? "Tu perfil aún no está aprobado."
            : !profile.stripeChargesEnabled
            ? "Completa tu onboarding de Stripe antes de cotizar."
            : "Esta solicitud ya no acepta cotizaciones."}
        </div>
      )}
    </div>
  );
}
