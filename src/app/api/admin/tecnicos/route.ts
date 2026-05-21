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
    const tecnicos = await prisma.tecnicoProfile.findMany({
      where: status ? { status: status as "PENDING" | "APPROVED" | "SUSPENDED" | "REJECTED" } : undefined,
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { email: true, name: true, phone: true, createdAt: true } },
        categories: { include: { category: { select: { name: true, slug: true } } } },
        _count: { select: { bookings: true, quotes: true } },
      },
      take: 200,
    });
    return NextResponse.json({ tecnicos });
  } catch (err) {
    return apiError(err);
  }
}
