import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NewServiceRequestForm } from "@/components/NewServiceRequestForm";
import { integrations } from "@/lib/env";

export const dynamic = "force-dynamic";

export default async function NewServiceRequestPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/iniciar-sesion?callbackUrl=/servicios/solicitar");
  }

  const categories = await prisma.serviceCategory.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    select: { id: true, name: true, slug: true },
  });

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
          Solicita un servicio
        </h1>
        <p className="mt-3 text-sm text-ink-500">
          Cuéntanos qué necesitas y recibirás cotizaciones de técnicos verificados de tu zona.
        </p>

        <div className="mt-10">
          <NewServiceRequestForm
            categories={categories}
            uploadsEnabled={integrations.storageReady()}
          />
        </div>
      </div>
    </Container>
  );
}
