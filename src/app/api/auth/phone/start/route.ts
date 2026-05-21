import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api";
import { startPhoneVerification } from "@/lib/otp";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const schema = z.object({
  phone: z.string().min(7).max(40),
  purpose: z.enum(["SIGNUP", "LOGIN", "PROFILE_UPDATE"]).default("PROFILE_UPDATE"),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const ip = getClientIp(req);
    const rl = rateLimit({ key: `otp-start:${ip}`, max: 5, windowMs: 10 * 60 * 1000 });
    if (!rl.ok) {
      return new NextResponse("Too many requests", {
        status: 429,
        headers: { "Retry-After": String(rl.retryAfterSec ?? 600) },
      });
    }

    const body = await req.json().catch(() => {
      throw new ApiError(400, "Invalid JSON body", "invalid_body");
    });
    const data = schema.parse(body);

    // PROFILE_UPDATE requires a session; SIGNUP/LOGIN do not.
    if (data.purpose === "PROFILE_UPDATE" && !session?.user?.id) {
      throw new ApiError(401, "Sign in to update profile", "unauthorized");
    }

    const { phone, expiresAt } = await startPhoneVerification({
      rawPhone: data.phone,
      purpose: data.purpose,
      userId: session?.user?.id ?? undefined,
      ipAddress: ip,
    });

    return NextResponse.json({ ok: true, phone, expiresAt });
  } catch (err) {
    if (err instanceof Error && err.message === "invalid_phone") {
      return NextResponse.json({ error: "Invalid phone number", code: "invalid_phone" }, { status: 400 });
    }
    return apiError(err);
  }
}
