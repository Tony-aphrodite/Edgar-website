import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api";
import { verifyPhoneCode } from "@/lib/otp";
import { prisma } from "@/lib/db";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const schema = z.object({
  phone: z.string().min(7).max(40),
  code: z.string().regex(/^\d{6}$/),
});

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    const ip = getClientIp(req);
    const rl = rateLimit({ key: `otp-verify:${ip}`, max: 10, windowMs: 10 * 60 * 1000 });
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

    const result = await verifyPhoneCode({ rawPhone: data.phone, code: data.code });
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: "Invalid or expired code", code: result.reason },
        { status: 400 },
      );
    }

    // If verifying for the signed-in user, write phone onto User.
    if (session?.user?.id) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { phone: data.phone.startsWith("+") ? data.phone : `+52${data.phone}` },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return apiError(err);
  }
}
