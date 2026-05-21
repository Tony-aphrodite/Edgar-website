import "server-only";
import { Resend } from "resend";
import { env } from "@/lib/env";

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (!env.RESEND_API_KEY) {
    throw new ResendNotConfiguredError();
  }
  if (!_resend) {
    _resend = new Resend(env.RESEND_API_KEY);
  }
  return _resend;
}

export class ResendNotConfiguredError extends Error {
  constructor() {
    super("Resend is not configured. Set RESEND_API_KEY.");
    this.name = "ResendNotConfiguredError";
  }
}

export const RESEND_FROM = () => env.RESEND_FROM_EMAIL;
export const CONTACT_INBOX = () => env.CONTACT_INBOX_EMAIL;
