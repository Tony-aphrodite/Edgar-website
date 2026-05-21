import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireSession } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api";
import { signUpload } from "@/lib/storage";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const schema = z.object({
  kind: z.enum(["service-photo", "tecnico-kyc"]),
  contentType: z.string().min(1).max(200),
  contentLength: z.number().int().min(1).max(8 * 1024 * 1024),
});

export async function POST(req: NextRequest) {
  try {
    const session = await requireSession();
    const ip = getClientIp(req);
    const rl = rateLimit({ key: `upload-sign:${session.user.id}:${ip}`, max: 30, windowMs: 60_000 });
    if (!rl.ok) {
      return new NextResponse("Too many requests", {
        status: 429,
        headers: { "Retry-After": String(rl.retryAfterSec ?? 60) },
      });
    }

    const body = await req.json().catch(() => {
      throw new ApiError(400, "Invalid JSON body", "invalid_body");
    });
    const data = schema.parse(body);

    const signed = await signUpload({
      kind: data.kind,
      contentType: data.contentType,
      ownerId: session.user.id,
      contentLength: data.contentLength,
    });

    return NextResponse.json({ ok: true, ...signed });
  } catch (err) {
    return apiError(err);
  }
}
