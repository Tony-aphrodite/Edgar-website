import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { env, integrations } from "@/lib/env";
import { issueCommissionCfdi } from "@/lib/cfdi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/cron/retry-cfdis — re-attempt CommissionCfdi rows stuck in FAILED
// with retryCount < MAX. Guarded by CRON_SECRET; intended to be invoked by
// Vercel Cron, cron-job.org, or a Github Action on a schedule.
//
// Returns counts of attempted / succeeded / failed.
const MAX_BATCH = 25;

export async function POST(req: NextRequest) {
  if (!integrations.cronReady()) {
    return new NextResponse("CRON_SECRET not configured", { status: 503 });
  }
  const authHeader = req.headers.get("authorization") ?? "";
  if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const candidates = await prisma.commissionCfdi.findMany({
    where: { status: "FAILED", retryCount: { lt: 3 } },
    orderBy: { updatedAt: "asc" },
    take: MAX_BATCH,
    select: { bookingId: true },
  });

  let succeeded = 0;
  let failed = 0;
  for (const c of candidates) {
    try {
      // Reset to PENDING so issueCommissionCfdi enters the success path.
      await prisma.commissionCfdi.update({
        where: { bookingId: c.bookingId },
        data: { status: "PENDING" },
      });
      await issueCommissionCfdi(c.bookingId);
      succeeded += 1;
    } catch (err) {
      console.error(`[cron] cfdi retry ${c.bookingId} failed:`, err);
      failed += 1;
    }
  }

  return NextResponse.json({ ok: true, attempted: candidates.length, succeeded, failed });
}

// GET handler so Vercel Cron's default GET request can hit it too.
export async function GET(req: NextRequest) {
  return POST(req);
}
