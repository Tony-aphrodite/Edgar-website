import { z } from "zod";

// Fails fast at boot if any required server-side env var is missing or
// malformed. Public (NEXT_PUBLIC_*) vars are validated separately because
// they're inlined into the client bundle and must not import anything
// that touches process.env at runtime in the browser.

const serverSchema = z.object({
  // App
  NEXT_PUBLIC_SITE_URL: z.string().url(),

  // Database
  DATABASE_URL: z.string().min(1),

  // NextAuth
  NEXTAUTH_SECRET: z.string().min(16),
  NEXTAUTH_URL: z.string().url(),
  GOOGLE_CLIENT_ID: z.string().optional().default(""),
  GOOGLE_CLIENT_SECRET: z.string().optional().default(""),

  // Resend
  RESEND_API_KEY: z.string().optional().default(""),
  RESEND_FROM_EMAIL: z.string().optional().default("ServiTec <noreply@example.com>"),
  CONTACT_INBOX_EMAIL: z.string().email().optional().default("servitec@serviciosintegralesapp.com"),

  // Stripe
  STRIPE_SECRET_KEY: z.string().optional().default(""),
  STRIPE_WEBHOOK_SECRET: z.string().optional().default(""),
  STRIPE_COMMISSION_PERCENT: z
    .string()
    .default("12")
    .transform((v) => Number.parseInt(v, 10))
    .pipe(z.number().int().min(0).max(100)),

  // Facturapi
  FACTURAPI_API_KEY: z.string().optional().default(""),
  PLATFORM_RFC: z.string().default("GOME900115AA4"),
  PLATFORM_LEGAL_NAME: z.string().default("EDGAR DANIEL GODOY MONTALVO"),
  PLATFORM_TAX_REGIME: z.string().default("626"),
  PLATFORM_POSTAL_CODE: z.string().default("89180"),

  // Object storage
  S3_ENDPOINT: z.string().optional().default(""),
  S3_REGION: z.string().optional().default("auto"),
  S3_ACCESS_KEY_ID: z.string().optional().default(""),
  S3_SECRET_ACCESS_KEY: z.string().optional().default(""),
  S3_BUCKET: z.string().optional().default(""),
  S3_PUBLIC_URL: z.string().optional().default(""),

  // SMS
  TWILIO_ACCOUNT_SID: z.string().optional().default(""),
  TWILIO_AUTH_TOKEN: z.string().optional().default(""),
  TWILIO_FROM_NUMBER: z.string().optional().default(""),

  // Cron
  CRON_SECRET: z.string().optional().default(""),
});

const publicSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional().default(""),
});

function parse<T extends z.ZodTypeAny>(schema: T, source: Record<string, string | undefined>): z.infer<T> {
  const result = schema.safeParse(source);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid environment variables:\n${issues}`);
  }
  return result.data;
}

// Avoid evaluating server-only env in the browser bundle.
const isServer = typeof window === "undefined";

export const env = isServer
  ? parse(serverSchema, process.env as Record<string, string | undefined>)
  : (undefined as never);

export const publicEnv = parse(publicSchema, {
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
});

// Tells routes whether they should soft-fail (return 503) vs. hard-fail.
export const integrations = {
  stripeReady: () => isServer && !!env.STRIPE_SECRET_KEY && !!env.STRIPE_WEBHOOK_SECRET,
  facturapiReady: () => isServer && !!env.FACTURAPI_API_KEY,
  resendReady: () => isServer && !!env.RESEND_API_KEY,
  googleOAuthReady: () => isServer && !!env.GOOGLE_CLIENT_ID && !!env.GOOGLE_CLIENT_SECRET,
  storageReady: () =>
    isServer &&
    !!env.S3_ENDPOINT &&
    !!env.S3_ACCESS_KEY_ID &&
    !!env.S3_SECRET_ACCESS_KEY &&
    !!env.S3_BUCKET,
  twilioReady: () =>
    isServer && !!env.TWILIO_ACCOUNT_SID && !!env.TWILIO_AUTH_TOKEN && !!env.TWILIO_FROM_NUMBER,
  cronReady: () => isServer && !!env.CRON_SECRET,
};
