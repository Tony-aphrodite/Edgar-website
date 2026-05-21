import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api";
import { ensureExpressAccount, createOnboardingLink } from "@/lib/stripe-connect";

export const runtime = "nodejs";

const schema = z.object({
  displayName: z.string().trim().min(2).max(120),
  bio: z.string().trim().max(2000).optional(),
  yearsExperience: z.number().int().min(0).max(80).optional(),
  categoryIds: z.array(z.string().min(1)).min(1).max(10),
  baseLat: z.number().min(-90).max(90).optional(),
  baseLng: z.number().min(-180).max(180).optional(),
  coverageRadiusKm: z.number().int().min(1).max(100).default(15),
  hasCfdiCapability: z.boolean().default(false),
  rfc: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/, "RFC inválido")
    .optional(),
  taxRegime: z
    .enum(["RESICO", "ACTIVIDAD_EMPRESARIAL", "ASIMILADOS", "HONORARIOS", "NONE"])
    .default("NONE"),
  cfdiPostalCode: z.string().regex(/^\d{5}$/).optional(),
  legalName: z.string().trim().max(200).optional(),
}).refine(
  (v) => !v.hasCfdiCapability || (v.rfc && v.taxRegime !== "NONE" && v.cfdiPostalCode),
  { message: "Si declaras emitir CFDI, RFC, régimen y código postal fiscal son obligatorios." },
);

export async function POST(req: NextRequest) {
  try {
    const session = await requireSession();
    const body = await req.json().catch(() => {
      throw new ApiError(400, "Invalid JSON body", "invalid_body");
    });
    const data = schema.parse(body);

    // Verify all category IDs exist and are active.
    const categories = await prisma.serviceCategory.findMany({
      where: { id: { in: data.categoryIds }, isActive: true },
      select: { id: true },
    });
    if (categories.length !== data.categoryIds.length) {
      throw new ApiError(400, "One or more categories are invalid", "invalid_categories");
    }

    // Upsert profile and replace category links atomically.
    const profile = await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: session.user.id },
        data: { role: "TECNICO" },
      });

      const upserted = await tx.tecnicoProfile.upsert({
        where: { userId: session.user.id },
        create: {
          userId: session.user.id,
          displayName: data.displayName,
          bio: data.bio,
          yearsExperience: data.yearsExperience,
          hasCfdiCapability: data.hasCfdiCapability,
          rfc: data.rfc,
          taxRegime: data.taxRegime,
          cfdiPostalCode: data.cfdiPostalCode,
          legalName: data.legalName,
          baseLat: data.baseLat,
          baseLng: data.baseLng,
          coverageRadiusKm: data.coverageRadiusKm,
          status: "PENDING",
        },
        update: {
          displayName: data.displayName,
          bio: data.bio,
          yearsExperience: data.yearsExperience,
          hasCfdiCapability: data.hasCfdiCapability,
          rfc: data.rfc,
          taxRegime: data.taxRegime,
          cfdiPostalCode: data.cfdiPostalCode,
          legalName: data.legalName,
          baseLat: data.baseLat,
          baseLng: data.baseLng,
          coverageRadiusKm: data.coverageRadiusKm,
        },
      });

      await tx.tecnicoCategory.deleteMany({ where: { tecnicoId: upserted.id } });
      await tx.tecnicoCategory.createMany({
        data: categories.map((c) => ({ tecnicoId: upserted.id, categoryId: c.id })),
      });

      return upserted;
    });

    // Create or reuse the Stripe Express account, then mint a fresh
    // Account Link the user can follow to finish KYC.
    const stripeAccountId = await ensureExpressAccount(profile.id);
    const onboardingUrl = await createOnboardingLink(stripeAccountId);

    return NextResponse.json({
      ok: true,
      profileId: profile.id,
      stripeAccountId,
      onboardingUrl,
    });
  } catch (err) {
    return apiError(err);
  }
}
