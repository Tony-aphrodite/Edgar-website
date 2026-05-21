import "server-only";
import type { NextAuthOptions, Session } from "next-auth";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import type { UserRole } from "@prisma/client";
import { prisma } from "@/lib/db";
import { env, integrations } from "@/lib/env";
import { getResend, RESEND_FROM } from "@/lib/resend";

// Build the provider list conditionally so that absent credentials don't
// prevent the rest of the app from booting. In production all three should
// be configured.
function buildProviders(): NextAuthOptions["providers"] {
  const providers: NextAuthOptions["providers"] = [];

  if (integrations.googleOAuthReady()) {
    providers.push(
      GoogleProvider({
        clientId: env.GOOGLE_CLIENT_ID,
        clientSecret: env.GOOGLE_CLIENT_SECRET,
        // Avoid silent linking when the same email arrives via two providers.
        allowDangerousEmailAccountLinking: false,
      }),
    );
  }

  if (integrations.resendReady()) {
    providers.push(
      EmailProvider({
        from: env.RESEND_FROM_EMAIL,
        // Override the default nodemailer flow to route through Resend.
        async sendVerificationRequest({ identifier: email, url }) {
          const resend = getResend();
          const host = new URL(url).host;
          const result = await resend.emails.send({
            from: RESEND_FROM(),
            to: email,
            subject: `Inicia sesión en ServiTec`,
            text: `Inicia sesión en ${host}\n\n${url}\n\nSi no solicitaste este enlace, ignora este correo.`,
            html: signinEmailHtml({ url, host }),
          });
          if (result.error) {
            throw new Error(`Resend error: ${result.error.message}`);
          }
        },
        // 10 minute magic link.
        maxAge: 10 * 60,
      }),
    );
  }

  return providers;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: { strategy: "database" },
  pages: {
    signIn: "/iniciar-sesion",
    verifyRequest: "/iniciar-sesion/verifica-tu-correo",
    error: "/iniciar-sesion/error",
  },
  providers: buildProviders(),
  callbacks: {
    async session({ session, user }) {
      // Expose id and role on the session so server actions can authorize
      // without an extra DB query.
      if (session.user) {
        session.user.id = user.id;
        // Cast: PrismaAdapter doesn't propagate custom columns to the User
        // type by default; we read it from the adapter user row.
        session.user.role = (user as unknown as { role: UserRole }).role;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      // First-time signups default to CLIENT. Techs upgrade via the
      // onboarding flow which sets role=TECNICO and creates a TecnicoProfile.
      if (!user.email) return;
      await prisma.user.update({
        where: { id: user.id },
        data: { role: "CLIENT" },
      });
    },
  },
};

export function auth(): Promise<Session | null> {
  return getServerSession(authOptions);
}

// ---------- Authorization helpers ----------

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export async function requireSession(): Promise<NonNullable<Session> & { user: NonNullable<Session["user"]> }> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new UnauthorizedError();
  }
  return session as NonNullable<Session> & { user: NonNullable<Session["user"]> };
}

export async function requireRole(...allowed: UserRole[]) {
  const session = await requireSession();
  const role = session.user.role;
  if (!role || !allowed.includes(role)) {
    throw new ForbiddenError(`Requires role: ${allowed.join(" or ")}`);
  }
  return session;
}

// ---------- Email template ----------

function signinEmailHtml({ url, host }: { url: string; host: string }) {
  const safeUrl = url.replace(/&/g, "&amp;");
  return `
  <!doctype html><html lang="es"><body style="margin:0;padding:0;background:#f6f7f9;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
      <tr><td align="center">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;box-shadow:0 10px 30px rgba(15,23,42,0.06);overflow:hidden;">
          <tr><td style="padding:36px 40px 16px 40px;">
            <p style="margin:0;color:#0f172a;font-size:14px;letter-spacing:0.08em;text-transform:uppercase;">ServiTec</p>
            <h1 style="margin:14px 0 8px 0;color:#0f172a;font-size:22px;line-height:1.3;">Inicia sesión en tu cuenta</h1>
            <p style="margin:0;color:#475569;font-size:15px;line-height:1.6;">
              Haz clic en el botón para entrar. El enlace expira en 10 minutos y solo funciona una vez.
            </p>
          </td></tr>
          <tr><td style="padding:8px 40px 8px 40px;">
            <a href="${safeUrl}" style="display:inline-block;margin-top:18px;padding:12px 22px;background:#0f172a;color:#ffffff;border-radius:999px;font-weight:600;text-decoration:none;font-size:15px;">Entrar a ServiTec</a>
          </td></tr>
          <tr><td style="padding:24px 40px 36px 40px;">
            <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.6;">
              Si no solicitaste este correo, ignóralo. Tu cuenta no se modificará. Dominio: ${host}.
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body></html>`;
}
