import "server-only";

// In-memory sliding-window rate limiter. Per-instance only — good enough for
// abuse mitigation on a single host. For horizontally-scaled deployments,
// swap the `store` for Upstash Redis behind the same interface.
//
// Usage:
//   const result = rateLimit({ key: `contact:${ip}`, max: 5, windowMs: 60_000 });
//   if (!result.ok) return new NextResponse("Too many requests", { status: 429 });

type Bucket = { count: number; resetAt: number };

const store = new Map<string, Bucket>();
const MAX_KEYS = 10_000; // soft cap to prevent unbounded growth

function gc(now: number) {
  if (store.size < MAX_KEYS) return;
  // Lazy GC — drop expired entries when we approach the cap.
  const toDelete: string[] = [];
  store.forEach((b, key) => {
    if (b.resetAt <= now) toDelete.push(key);
  });
  for (const k of toDelete) {
    store.delete(k);
    if (store.size < MAX_KEYS / 2) break;
  }
}

export type RateLimitOptions = {
  key: string;
  max: number;
  windowMs: number;
};

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  resetAt: number;
  retryAfterSec?: number;
};

export function rateLimit({ key, max, windowMs }: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  gc(now);

  const bucket = store.get(key);
  if (!bucket || bucket.resetAt <= now) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { ok: true, remaining: max - 1, resetAt };
  }

  if (bucket.count >= max) {
    return {
      ok: false,
      remaining: 0,
      resetAt: bucket.resetAt,
      retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count += 1;
  return { ok: true, remaining: max - bucket.count, resetAt: bucket.resetAt };
}

/** Get the best-effort caller IP from a request. */
export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}
