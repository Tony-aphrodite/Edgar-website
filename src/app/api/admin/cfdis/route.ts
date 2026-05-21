import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { apiError } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await requireRole("ADMIN");
    const status = req.nextUrl.searchParams.get("status");
    const rows = await prisma.commissionCfdi.findMany({
      where: status
        ? { status: status as "PENDING" | "ISSUED" | "FAILED" | "CANCELLED" }
        : undefined,
      orderBy: { updatedAt: "desc" },
      take: 200,
      include: {
        booking: {
          select: {
            id: true,
            totalAmountCents: true,
            commissionAmountCents: true,
            tecnico: {
              select: { id: true, displayName: true, rfc: true, hasCfdiCapability: true },
            },
          },
        },
      },
    });
    return NextResponse.json({ cfdis: rows });
  } catch (err) {
    return apiError(err);
  }
}
