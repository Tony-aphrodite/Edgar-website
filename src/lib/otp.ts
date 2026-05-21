import "server-only";
import crypto from "node:crypto";
import { prisma } from "@/lib/db";
import { sendSms, normalizePhone } from "@/lib/sms";

// 6-digit OTP with SHA-256 hashing at rest. The hash defeats casual DB
// inspection; combined with rate limiting and short TTL, it's appropriate
// for phone verification (not a high-value secret).

const TTL_MS = 5 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function hashCode(code: string, phone: string): string {
  // Salt the hash with the phone so two users with the same code don't collide.
  return crypto.createHash("sha256").update(`${phone}:${code}`).digest("hex");
}

function generateCode(): string {
  // 6-digit zero-padded code (always 6 digits).
  return crypto.randomInt(0, 1_000_000).toString().padStart(6, "0");
}

export async function startPhoneVerification({
  rawPhone,
  purpose,
  userId,
  ipAddress,
}: {
  rawPhone: string;
  purpose: "SIGNUP" | "LOGIN" | "PROFILE_UPDATE";
  userId?: string;
  ipAddress?: string;
}): Promise<{ phone: string; expiresAt: Date }> {
  const phone = normalizePhone(rawPhone);
  if (!phone) throw new Error("invalid_phone");

  // Invalidate any prior unexpired codes for this phone — only one active.
  await prisma.phoneVerification.updateMany({
    where: { phone, consumedAt: null, expiresAt: { gt: new Date() } },
    data: { expiresAt: new Date() },
  });

  const code = generateCode();
  const codeHash = hashCode(code, phone);
  const expiresAt = new Date(Date.now() + TTL_MS);

  await prisma.phoneVerification.create({
    data: { phone, codeHash, purpose, userId, ipAddress, expiresAt },
  });

  await sendSms(phone, `Tu código ServiTec: ${code}. Vence en 5 minutos.`);
  return { phone, expiresAt };
}

export async function verifyPhoneCode({
  rawPhone,
  code,
}: {
  rawPhone: string;
  code: string;
}): Promise<{ ok: boolean; reason?: string; userId?: string | null }> {
  const phone = normalizePhone(rawPhone);
  if (!phone) return { ok: false, reason: "invalid_phone" };

  const record = await prisma.phoneVerification.findFirst({
    where: { phone, consumedAt: null, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: "desc" },
  });
  if (!record) return { ok: false, reason: "expired_or_unknown" };

  if (record.attempts >= MAX_ATTEMPTS) {
    return { ok: false, reason: "too_many_attempts" };
  }

  const expected = hashCode(code, phone);
  // Use timingSafeEqual; both buffers are the same length (64 hex chars).
  const match =
    expected.length === record.codeHash.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(record.codeHash));

  if (!match) {
    await prisma.phoneVerification.update({
      where: { id: record.id },
      data: { attempts: { increment: 1 } },
    });
    return { ok: false, reason: "wrong_code" };
  }

  await prisma.phoneVerification.update({
    where: { id: record.id },
    data: { consumedAt: new Date() },
  });
  return { ok: true, userId: record.userId };
}
