import "server-only";
import {
  getFacturapi,
  PLATFORM_FISCAL,
  COMMISSION_SAT_PRODUCT_KEY,
  COMMISSION_SAT_UNIT_KEY,
} from "@/lib/facturapi";
import { prisma } from "@/lib/db";

// Issues the CFDI Edgar (platform) emits to the técnico for the 12% commission
// taken on a completed booking. Called from the Stripe webhook on
// payment_intent.succeeded. Idempotent — re-running on the same booking is a
// no-op once the CFDI is ISSUED.
//
// SAT product key 80131502 = "Servicios de comisión". Update if the SAT
// catalogue requires a different code in the future.

const MAX_RETRIES = 3;

export async function issueCommissionCfdi(bookingId: string): Promise<void> {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      tecnico: {
        select: {
          displayName: true,
          legalName: true,
          rfc: true,
          taxRegime: true,
          cfdiPostalCode: true,
          hasCfdiCapability: true,
          user: { select: { email: true } },
        },
      },
    },
  });
  if (!booking) throw new Error(`Booking ${bookingId} not found`);

  // If the técnico opted out of CFDI capability, skip emission. We still
  // record an explicit row so finance can see the omission.
  if (!booking.tecnico.hasCfdiCapability || !booking.tecnico.rfc) {
    await prisma.commissionCfdi.upsert({
      where: { bookingId },
      create: {
        bookingId,
        totalCents: booking.commissionAmountCents,
        status: "CANCELLED",
        errorMessage: "Técnico without CFDI capability — commission CFDI skipped.",
        retryCount: 0,
      },
      update: {},
    });
    return;
  }

  // Lock-or-create a CommissionCfdi row in PENDING state, but bail if already
  // issued or actively being retried by another worker.
  const lockRow = await prisma.commissionCfdi.upsert({
    where: { bookingId },
    create: {
      bookingId,
      totalCents: booking.commissionAmountCents,
      status: "PENDING",
    },
    update: {},
  });

  if (lockRow.status === "ISSUED") return;
  if (lockRow.retryCount >= MAX_RETRIES) {
    console.error(`[cfdi] booking ${bookingId} exceeded max retries`);
    return;
  }

  const facturapi = getFacturapi();
  const commissionMxn = booking.commissionAmountCents / 100;

  try {
    // CFDI 4.0 — type "I" (ingreso). The platform is the issuer; the técnico
    // is the customer of this invoice. The amount equals the 12% commission.
    const invoice = await facturapi.invoices.create({
      // Facturapi infers the issuer (Edgar) from the API key + organization.
      // Pass tax regime as fallback in case the org profile is unset.
      customer: {
        legal_name: booking.tecnico.legalName ?? booking.tecnico.displayName,
        tax_id: booking.tecnico.rfc,
        tax_system: mapTaxRegimeToSatCode(booking.tecnico.taxRegime),
        address: {
          zip: booking.tecnico.cfdiPostalCode ?? PLATFORM_FISCAL.postalCode(),
        },
        email: booking.tecnico.user.email,
      },
      items: [
        {
          quantity: 1,
          product: {
            description: `Comisión ServiTec — reserva ${booking.id}`,
            product_key: COMMISSION_SAT_PRODUCT_KEY,
            unit_key: COMMISSION_SAT_UNIT_KEY,
            price: commissionMxn,
            tax_included: true,
            taxes: [{ type: "IVA", rate: 0.16 }],
          },
        },
      ],
      use: "G03",          // Gastos en general
      payment_form: "03",  // Transferencia electrónica de fondos
      payment_method: "PUE",
      // Idempotency on Facturapi side via external_id (booking id).
      external_id: `booking-${booking.id}-commission`,
    });

    await prisma.commissionCfdi.update({
      where: { bookingId },
      data: {
        facturapiInvoiceId: invoice.id,
        facturapiInvoiceNumber: invoice.folio_number?.toString() ?? null,
        uuid: invoice.uuid ?? null,
        status: "ISSUED",
        issuedAt: new Date(),
        errorMessage: null,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[cfdi] booking ${bookingId} failed:`, message);
    await prisma.commissionCfdi.update({
      where: { bookingId },
      data: {
        status: "FAILED",
        errorMessage: message.slice(0, 1000),
        retryCount: { increment: 1 },
      },
    });
    throw err;
  }
}

// Map our internal régimen enum to SAT régimen codes (catalogo c_RegimenFiscal).
function mapTaxRegimeToSatCode(regime: string): string {
  switch (regime) {
    case "RESICO":
      return "626"; // Régimen Simplificado de Confianza (PF)
    case "ACTIVIDAD_EMPRESARIAL":
      return "612"; // Personas Físicas con Actividades Empresariales y Profesionales
    case "HONORARIOS":
      return "612";
    case "ASIMILADOS":
      return "605"; // Sueldos y Salarios e Ingresos Asimilados a Salarios
    default:
      return "616"; // Sin obligaciones fiscales
  }
}
