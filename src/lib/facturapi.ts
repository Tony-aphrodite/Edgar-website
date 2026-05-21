import "server-only";
import Facturapi from "facturapi";
import { env } from "@/lib/env";

// Single Facturapi client. The SDK is a thin REST wrapper, so re-creating it
// is cheap, but we keep a singleton so we control logging/network policy in
// one place.

let _client: Facturapi | null = null;

export function getFacturapi(): Facturapi {
  if (!env.FACTURAPI_API_KEY) {
    throw new FacturapiNotConfiguredError();
  }
  if (!_client) {
    _client = new Facturapi(env.FACTURAPI_API_KEY);
  }
  return _client;
}

export class FacturapiNotConfiguredError extends Error {
  constructor() {
    super("Facturapi is not configured. Set FACTURAPI_API_KEY.");
    this.name = "FacturapiNotConfiguredError";
  }
}

// Platform-side fiscal identity (Edgar, persona física, RESICO).
export const PLATFORM_FISCAL = {
  rfc: () => env.PLATFORM_RFC,
  legalName: () => env.PLATFORM_LEGAL_NAME,
  taxRegime: () => env.PLATFORM_TAX_REGIME, // SAT régimen code, e.g. "626" RESICO PF
  postalCode: () => env.PLATFORM_POSTAL_CODE,
};

// SAT product/service codes used for commission CFDI line items.
// 80131502 = Servicios de comisión / Commission services.
export const COMMISSION_SAT_PRODUCT_KEY = "80131502";
// E48 = Unidad de servicio (per SAT unit catalog).
export const COMMISSION_SAT_UNIT_KEY = "E48";
