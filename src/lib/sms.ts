import "server-only";
import { env, integrations } from "@/lib/env";

// Thin SMS sender that uses Twilio's REST API directly. We don't pull in the
// official `twilio` SDK to keep deps small — it's a single POST.
//
// In development, when Twilio creds aren't set, the message is logged to the
// server console. This is useful for testing OTP flows locally.

export async function sendSms(to: string, body: string): Promise<void> {
  if (!integrations.twilioReady()) {
    console.log(`[sms:dev] to=${to} body=${body}`);
    return;
  }

  const auth = Buffer.from(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`).toString("base64");
  const url = `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`;
  const formBody = new URLSearchParams({
    To: to,
    From: env.TWILIO_FROM_NUMBER,
    Body: body,
  });

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formBody.toString(),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`twilio: ${res.status} ${text.slice(0, 500)}`);
  }
}

// Validates and normalizes a phone number to a loose E.164 form.
// Strict per-country validation is left to the SMS provider on send.
export function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/[^\d+]/g, "");
  if (!digits.startsWith("+")) {
    // assume MX if a bare 10-digit number was provided
    if (/^\d{10}$/.test(digits)) return `+52${digits}`;
    return null;
  }
  if (!/^\+\d{7,15}$/.test(digits)) return null;
  return digits;
}
