import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api";

export const runtime = "nodejs";

const schema = z.object({
  reason: z.string().trim().max(500).optional(),
});

// POST /api/services/requests/[id]/cancel — client cancels an open/quoted
// request. Only allowed before a booking is accepted (status OPEN or QUOTED).
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await requireSession();
    const body = await req.json().catch(() => ({}));
    schema.parse(body);

    const request = await prisma.serviceRequest.findUnique({
      where: { id: params.id },
      select: { id: true, clientId: true, status: true },
    });
    if (!request) throw new ApiError(404, "Request not found", "not_found");
    if (request.clientId !== session.user.id && session.user.role !== "ADMIN") {
      throw new ApiError(403, "Not your request", "forbidden");
    }
    if (request.status !== "OPEN" && request.status !== "QUOTED") {
      throw new ApiError(409, "Cannot cancel an accepted request", "invalid_state");
    }

    await prisma.$transaction([
      prisma.serviceRequest.update({
        where: { id: request.id },
        data: { status: "CANCELLED" },
      }),
      prisma.quote.updateMany({
        where: { requestId: request.id, status: "PENDING" },
        data: { status: "REJECTED" },
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    return apiError(err);
  }
}
