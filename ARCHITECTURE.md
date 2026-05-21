# ServiTec — Backend Architecture

This document describes how the marketplace backend is wired and how to bring
it online. The frontend is the existing Next.js App Router site; the backend
is a set of API routes + a Prisma data layer that share the same process.

## Stack

| Concern         | Choice                                              |
| --------------- | --------------------------------------------------- |
| Runtime         | Next.js 14 App Router · Node.js                     |
| Database        | PostgreSQL (any provider — Neon, Supabase, Railway) |
| ORM             | Prisma 6                                            |
| Auth            | NextAuth v4 + Prisma adapter (DB session strategy)  |
| Auth providers  | Email magic link (via Resend) + Google OAuth        |
| Email           | Resend                                              |
| Payments        | Stripe Connect — Express accounts, Destination Charges |
| Invoicing       | Facturapi (CFDI 4.0)                                |
| Validation      | Zod on every API boundary                           |
| Logging         | `console.error` (plug Sentry later via `SENTRY_DSN`)|

All money is stored as `Int` centavos MXN. Stripe and Facturapi receive amounts
in the same unit.

## Data model

`prisma/schema.prisma` is the single source of truth. Notable invariants:

- `Booking.totalAmountCents = commissionAmountCents + tecnicoNetCents` (always).
- `commissionAmountCents = round(totalAmountCents × STRIPE_COMMISSION_PERCENT / 100)`.
- Every booking has exactly one `Payment` and at most one `CommissionCfdi`.
- `WebhookEvent.id = stripe_event.id` — primary key, used for idempotency.
- `Quote (requestId, tecnicoId)` is unique — a técnico has at most one active quote per request.

## Money flow (Destination Charges)

1. Client accepts a quote → `POST /api/services/quotes/[id]/accept`.
2. A `Booking` row is created in `PENDING_PAYMENT`, paired with a `Payment` row.
3. A Stripe Checkout Session is created with:
   - `payment_intent_data.application_fee_amount` = commission cents (12%).
   - `payment_intent_data.transfer_data.destination` = técnico's connected account.
   - `client_reference_id` = booking id.
4. Client pays on Stripe Checkout.
5. `checkout.session.completed` → we capture the `payment_intent` id on the `Payment` row.
6. `payment_intent.succeeded` → flip `Booking` to `PAID`, save charge/transfer/fee ids, then call `issueCommissionCfdi(bookingId)`.
7. `account.updated` → mirror `charges_enabled`/`payouts_enabled` on `TecnicoProfile`.
8. `charge.refunded` → mark payment/booking refunded (full or partial).

Stripe handles the platform → técnico transfer automatically. The platform
receives the application fee net of Stripe processing fees.

## CFDI flow (commission only)

The técnico invoices the client directly. The platform (Edgar) invoices the
12% commission to the técnico. `src/lib/cfdi.ts`:

- Skips emission if the técnico opted out (`hasCfdiCapability=false`) — the
  `CommissionCfdi` row is created in `CANCELLED` state with a reason.
- Otherwise creates a Facturapi invoice (CFDI tipo I, ingreso) with:
  - Issuer: platform org configured on the Facturapi account (Edgar's RFC).
  - Customer: técnico's legal name, RFC, régimen, CP.
  - One line item: "Comisión ServiTec — reserva {id}", SAT product key 80131502.
  - 16% IVA included.
- Stores `facturapiInvoiceId`, `uuid` (SAT folio), and the issue timestamp.
- Failures bump `retryCount` and store `errorMessage`. The CFDI worker is
  invoked from the webhook handler today; for production, move to a queue
  with a retry strategy if Facturapi outages become an issue.

## Auth model

- DB-backed sessions (`session: { strategy: "database" }`) — sessions live in
  Postgres so we can revoke them and so the session row is the source of truth.
- Email magic links: 10-minute TTL, sent via Resend with a branded template.
- Google OAuth: standard NextAuth provider, redirect to
  `{NEXTAUTH_URL}/api/auth/callback/google`.
- `User.role` defaults to `CLIENT`. The técnico onboarding API promotes the
  caller to `TECNICO` and creates a `TecnicoProfile`.
- Helpers in `src/lib/auth.ts`:
  - `auth()` — server-component-friendly `getServerSession`.
  - `requireSession()` — throws 401 if unauthenticated.
  - `requireRole(...roles)` — throws 403 if role mismatch.

## API surface

| Method | Path                                          | Auth        | Purpose                                  |
| ------ | --------------------------------------------- | ----------- | ---------------------------------------- |
| `GET`  | `/api/categories`                             | public      | List active service categories           |
| `POST` | `/api/contact`                                | public      | Persist contact submission + email notice|
| `POST` | `/api/tecnicos/onboarding`                    | session     | Create/update tecnico profile + Stripe link |
| `POST` | `/api/tecnicos/stripe/refresh-link`           | session     | New Stripe Account Link if previous expired |
| `POST` | `/api/tecnicos/stripe/return`                 | session     | Sync Stripe account status post-redirect |
| `POST` | `/api/services/requests`                      | session     | Client creates service request           |
| `GET`  | `/api/services/requests`                      | session     | List requests (own as client, matching as tecnico) |
| `GET`  | `/api/services/requests/[id]`                 | session     | Request detail                           |
| `POST` | `/api/services/requests/[id]/quotes`          | TECNICO     | Submit/update a quote                    |
| `POST` | `/api/services/quotes/[id]/accept`            | session     | Accept quote → Booking + Checkout session|
| `GET`  | `/api/services/bookings/[id]`                 | session     | Booking detail                           |
| `POST` | `/api/services/bookings/[id]/complete`        | TECNICO     | Tech marks completed                     |
| `POST` | `/api/webhooks/stripe`                        | Stripe sig  | Stripe webhook ingest                    |
| `*`    | `/api/auth/[...nextauth]`                     | NextAuth    | Sign-in, callbacks, sessions             |
| `POST` | `/api/auth/phone/start`                       | optional    | Start phone verification (sends OTP)     |
| `POST` | `/api/auth/phone/verify`                      | optional    | Verify OTP, attaches phone to user       |
| `POST` | `/api/uploads/sign`                           | session     | Presign S3 PUT URL for service photos    |
| `POST` | `/api/services/requests/[id]/cancel`          | session     | Client cancels OPEN/QUOTED request       |
| `POST` | `/api/services/bookings/[id]/start`           | TECNICO     | PAID → IN_PROGRESS                       |
| `POST` | `/api/services/bookings/[id]/cancel`          | session     | Cancel before payment                    |
| `POST` | `/api/services/bookings/[id]/retry-checkout`  | session     | Re-mint Checkout for stranded booking    |
| `POST` | `/api/services/bookings/[id]/review`          | client      | 1–5 review (only when COMPLETED)         |
| `GET`  | `/api/admin/tecnicos`                         | ADMIN       | List técnicos by status                  |
| `POST` | `/api/admin/tecnicos/[id]/status`             | ADMIN       | PENDING / APPROVED / SUSPENDED / REJECTED |
| `GET`  | `/api/admin/bookings`                         | ADMIN       | List bookings by status                  |
| `POST` | `/api/admin/bookings/[id]/refund`             | ADMIN       | Partial/full Stripe refund + fee reversal|
| `GET`  | `/api/admin/cfdis`                            | ADMIN       | List CommissionCfdi by status            |
| `POST` | `/api/admin/cfdis/[bookingId]/retry`          | ADMIN       | Retry failed CFDI                        |
| `GET/POST` | `/api/cron/retry-cfdis`                   | CRON_SECRET | Batch retry FAILED CFDIs (Bearer auth)   |

All routes return JSON `{ ok: true, ... }` on success and
`{ error: string, code: string }` with HTTP 4xx/5xx on failure.
`src/lib/api.ts::apiError(err)` centralizes the response mapping.

## Idempotency

- **Stripe webhooks** — `WebhookEvent.id = event.id`. Duplicate inserts
  produce a `P2002` which we swallow, returning 200 immediately. On handler
  failure we delete the row so Stripe retries.
- **Checkout sessions** — created with `idempotencyKey: booking-checkout-{bookingId}`.
- **Facturapi invoices** — `external_id: booking-{bookingId}-commission`.
- **`CommissionCfdi`** — `bookingId` unique. The lock-or-create pattern in
  `issueCommissionCfdi` is safe to retry.

## Environment variables

See [`.env.example`](./.env.example). Required to boot:

- `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `NEXT_PUBLIC_SITE_URL`.

Required for full functionality (each module fails 503 if absent):

- Stripe: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
- Facturapi: `FACTURAPI_API_KEY` (+ org configured with Edgar's RFC).
- Resend: `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (domain must be verified).
- Google OAuth (optional): `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.
- Object storage (S3-compatible): `S3_ENDPOINT`, `S3_REGION`, `S3_ACCESS_KEY_ID`,
  `S3_SECRET_ACCESS_KEY`, `S3_BUCKET`, `S3_PUBLIC_URL`. Required for photo upload;
  without it the upload UI shows a "not configured" notice and forms still submit.
- SMS (optional): `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`.
  Without these, OTP codes are logged server-side instead of sent.
- Cron: `CRON_SECRET` for `/api/cron/*`. Vercel Cron sends it as
  `Authorization: Bearer <secret>`.

The platform fiscal identity (`PLATFORM_RFC`, `PLATFORM_TAX_REGIME`, ...) is
also in env. Today it points at Edgar's persona física under RESICO. When the
business migrates to a moral entity, only these env values change — no code.

## Deployment

1. Provision a Postgres database; copy the connection string into
   `DATABASE_URL`. If your provider has separate pooled/direct URLs, use the
   pooled URL for the app and the direct URL for migrations only.
2. `npm run db:migrate:deploy` — applies migrations in production.
3. `npm run db:seed` — upserts the service catalog.
4. Set the env vars in your host (Vercel project settings, Railway, etc.).
5. Configure the Stripe webhook endpoint in the Stripe Dashboard:
   - URL: `https://{your-domain}/api/webhooks/stripe`
   - Events to send:
     - `checkout.session.completed`
     - `checkout.session.async_payment_succeeded`
     - `checkout.session.async_payment_failed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `charge.refunded`
     - `account.updated`
   - Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.
6. Configure the Facturapi organization with Edgar's fiscal data and verify
   the API key has CFDI emission enabled.
7. Verify the Resend sending domain matches `RESEND_FROM_EMAIL`.

## Local development

```bash
# 1. Install
npm install                # also runs `prisma generate`

# 2. Start a local Postgres (Docker, Postgres.app, Neon branch, etc.)
#    and update DATABASE_URL in .env.

# 3. Apply migrations + seed
npm run db:migrate        # creates the initial migration
npm run db:seed

# 4. Stripe webhooks (separate terminal)
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# Copy the printed `whsec_...` into STRIPE_WEBHOOK_SECRET.

# 5. Run dev
npm run dev
```

## What's been added since the initial backend pass

The original "intentionally not in this iteration" list has been built out.
Here's what is now implemented:

- **Marketplace web UI**: clients can create service requests, browse received
  quotes, accept and pay; técnicos see opportunities in their categories,
  submit/edit quotes, mark bookings in-progress and complete. Pages live
  under `/cuenta` with role-aware navigation. Public service request creation
  at `/servicios/solicitar`.
- **Reviews**: `POST /api/services/bookings/[id]/review` (one review per
  booking, only after COMPLETED). Client UI under booking detail.
- **Refund flow**: `POST /api/admin/bookings/[id]/refund` issues a partial or
  full Stripe refund with `refund_application_fee=true` and `reverse_transfer=true`
  so the commission is reversed and funds pulled back from the connected account.
- **Booking lifecycle**: `start` (PAID → IN_PROGRESS), `cancel` (before
  payment), `retry-checkout` (re-mint Stripe session for stranded bookings),
  `cancel` on the request (before any booking exists).
- **CFDI retry**:
  - `POST /api/admin/cfdis/[bookingId]/retry` — manual retry from the admin UI.
  - `POST /api/cron/retry-cfdis` — bearer-token-guarded cron endpoint that
    sweeps up to 25 FAILED rows with `retryCount < 3` per invocation. Schedule
    via Vercel Cron, cron-job.org, or a GitHub Action.
- **Admin UI** at `/admin` (gated to `role=ADMIN`):
  - `/admin/tecnicos` — approve / suspend / reject técnicos.
  - `/admin/bookings` — refund any captured booking.
  - `/admin/cfdis` — list + retry failed commission CFDIs.
  - `/admin/mensajes` — contact form inbox.
- **Photo upload** (S3-compatible): `POST /api/uploads/sign` returns a
  presigned PUT URL; the browser uploads bytes directly to the bucket and
  submits the public URL on form submit. Allowed MIME: JPEG, PNG, WebP, HEIC,
  PDF. 8 MB max per object. Pluggable across AWS S3, Cloudflare R2, Backblaze
  B2, MinIO.
- **Phone OTP**: `POST /api/auth/phone/start` + `POST /api/auth/phone/verify`,
  6-digit hashed codes with 5-minute TTL and 5-attempt cap. Uses Twilio REST
  when configured, falls back to `console.log` in dev. Bound to the signed-in
  user for `PROFILE_UPDATE` flow; the foundation is in place for adding a
  phone-credentials NextAuth provider later.
- **Rate limiting**: `src/lib/rate-limit.ts` — in-memory sliding window. Applied
  to `/api/contact`, `/api/auth/phone/start`, `/api/auth/phone/verify`, and
  `/api/uploads/sign`. Swap for Upstash Redis behind the same interface for
  horizontal scale.
- **Audit log + notifications models**: `AuditLog` captures admin actions
  (tecnico status changes, refunds, CFDI retries). `Notification` is a
  pending-send queue for future email/SMS dispatching.
- **Session-aware Navbar**: Shows "Iniciar sesión" or "Mi cuenta" based on
  session state; primary CTA goes to `/servicios/solicitar`.

## What is STILL not implemented

- **Real-time updates / chat / push notifications.** The data model can grow
  to support these but the infrastructure (SSE/WebSocket, FCM/APNs) and the
  in-app chat UX are mobile-app-first features.
- **Email notifications on lifecycle events.** Resend is wired for sign-in
  and contact form; emit notifications on quote received, quote accepted,
  service completed, refund issued. The `Notification` model is in place — add
  a dispatcher.
- **Native mobile app**. Out of scope of the web codebase.
- **Background email/SMS dispatch worker**. `Notification` rows are not yet
  picked up by any consumer.
- **Fine-grained admin search/filter and pagination.** Lists cap at 100–200
  rows; add `?cursor=` based pagination when volumes require it.
- **Dispute (chargeback) workflow**. `BookingStatus.DISPUTED` exists; wire it
  to Stripe's `charge.dispute.created` webhook with an admin queue.

## File layout

```
prisma/
  schema.prisma           # data model
  seed.ts                 # category seed
src/
  lib/
    auth.ts               # NextAuth options + role guards
    api.ts                # apiError() centralizer
    db.ts                 # Prisma singleton
    env.ts                # Zod-validated env
    stripe.ts             # Stripe client + commission math
    stripe-connect.ts     # Express account + onboarding link helpers
    cfdi.ts               # Facturapi commission CFDI service
    facturapi.ts          # Facturapi client + platform fiscal constants
    resend.ts             # Resend client
  app/
    api/
      auth/[...nextauth]/route.ts
      categories/route.ts
      contact/route.ts
      tecnicos/onboarding/route.ts
      tecnicos/stripe/refresh-link/route.ts
      tecnicos/stripe/return/route.ts
      services/requests/route.ts
      services/requests/[id]/route.ts
      services/requests/[id]/quotes/route.ts
      services/quotes/[id]/accept/route.ts
      services/bookings/[id]/route.ts
      services/bookings/[id]/complete/route.ts
      webhooks/stripe/route.ts
    iniciar-sesion/                # sign-in UI
    tecnicos/registrarse/          # tecnico onboarding UI
    tecnicos/onboarding/listo/     # post-Stripe return
    tecnicos/onboarding/refrescar/ # account-link refresh redirect
    servicios/pago/exito/          # checkout success
    servicios/pago/cancelado/      # checkout cancel
    error.tsx · not-found.tsx
    robots.ts · sitemap.ts
  components/
    Providers.tsx                  # NextAuth SessionProvider
    TecnicoOnboardingForm.tsx
    (existing marketing components)
  types/
    next-auth.d.ts                 # Session.user.id + role typing
```
