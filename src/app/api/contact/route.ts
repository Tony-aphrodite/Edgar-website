import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getResend, RESEND_FROM, CONTACT_INBOX, ResendNotConfiguredError } from "@/lib/resend";
import { apiError, ApiError } from "@/lib/api";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const audienceMap: Record<string, "CLIENT" | "TECNICO" | "PRESS" | "OTHER"> = {
  "Soy cliente — necesito un servicio": "CLIENT",
  "Soy técnico — quiero registrarme": "TECNICO",
  "Soy empresa / administradora": "OTHER",
  "Tengo una duda sobre cobro o factura": "OTHER",
  Otro: "OTHER",
};

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().min(7).max(40),
  city: z.string().trim().max(120).optional().default(""),
  audience: z.string().trim().min(1).max(120),
  category: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().min(10).max(4000),
  // Honeypot: bots typically fill all fields. The form leaves this empty.
  website: z.string().max(0).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rl = rateLimit({ key: `contact:${ip}`, max: 5, windowMs: 10 * 60 * 1000 });
    if (!rl.ok) {
      return new NextResponse("Too many requests", {
        status: 429,
        headers: { "Retry-After": String(rl.retryAfterSec ?? 600) },
      });
    }

    const body = await req.json().catch(() => {
      throw new ApiError(400, "Invalid JSON body", "invalid_body");
    });

    const parsed = schema.parse(body);

    // Honeypot tripped — silently accept to avoid signalling bots.
    if (parsed.website && parsed.website.length > 0) {
      return NextResponse.json({ ok: true });
    }

    const audience = audienceMap[parsed.audience] ?? "OTHER";
    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
    const userAgent = req.headers.get("user-agent") ?? null;

    const record = await prisma.contactMessage.create({
      data: {
        name: parsed.name,
        email: parsed.email.toLowerCase(),
        phone: parsed.phone,
        audience,
        city: parsed.city || null,
        serviceCategory: parsed.category || null,
        message: parsed.message,
        userAgent: userAgent?.slice(0, 500) ?? null,
        ipAddress,
      },
      select: { id: true, createdAt: true },
    });

    // Fire-and-forget email notification. Resend errors are logged but do
    // not fail the request — the message is already persisted in the DB.
    try {
      const resend = getResend();
      await resend.emails.send({
        from: RESEND_FROM(),
        to: CONTACT_INBOX(),
        replyTo: parsed.email,
        subject: `[ServiTec] ${parsed.audience} — ${parsed.name}`,
        text: [
          `Nombre: ${parsed.name}`,
          `Correo: ${parsed.email}`,
          `Teléfono: ${parsed.phone}`,
          `Ciudad: ${parsed.city || "—"}`,
          `Audiencia: ${parsed.audience}`,
          `Categoría: ${parsed.category || "—"}`,
          ``,
          `Mensaje:`,
          parsed.message,
          ``,
          `ID: ${record.id}`,
          `Recibido: ${record.createdAt.toISOString()}`,
        ].join("\n"),
      });
    } catch (err) {
      if (!(err instanceof ResendNotConfiguredError)) {
        console.error("[contact] resend send failed:", err);
      }
    }

    return NextResponse.json({ ok: true, id: record.id });
  } catch (err) {
    return apiError(err);
  }
}
