import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { TecnicoOnboardingForm } from "@/components/TecnicoOnboardingForm";

export const dynamic = "force-dynamic";

export default async function RegistrarseTecnicoPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/iniciar-sesion?callbackUrl=/tecnicos/registrarse");
  }

  const [categories, existingProfile] = await Promise.all([
    prisma.serviceCategory.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
      select: { id: true, slug: true, name: true },
    }),
    prisma.tecnicoProfile.findUnique({
      where: { userId: session.user.id },
      include: { categories: { select: { categoryId: true } } },
    }),
  ]);

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
          Regístrate como técnico
        </h1>
        <p className="mt-3 text-sm text-ink-500">
          Completa tu perfil y conecta tu cuenta de Stripe para empezar a recibir
          solicitudes en tu zona. Toma menos de 10 minutos.
        </p>

        <div className="mt-10">
          <TecnicoOnboardingForm
            categories={categories}
            initial={
              existingProfile
                ? {
                    displayName: existingProfile.displayName,
                    bio: existingProfile.bio ?? "",
                    yearsExperience: existingProfile.yearsExperience ?? undefined,
                    coverageRadiusKm: existingProfile.coverageRadiusKm,
                    hasCfdiCapability: existingProfile.hasCfdiCapability,
                    rfc: existingProfile.rfc ?? "",
                    taxRegime: existingProfile.taxRegime,
                    cfdiPostalCode: existingProfile.cfdiPostalCode ?? "",
                    legalName: existingProfile.legalName ?? "",
                    categoryIds: existingProfile.categories.map((c) => c.categoryId),
                  }
                : undefined
            }
          />
        </div>
      </div>
    </Container>
  );
}
