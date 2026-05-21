import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api";

export const runtime = "nodejs";

// POST /api/services/bookings/[id]/start — técnico marks IN_PROGRESS.
export async function POST(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireSession();
    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: { tecnico: { select: { userId: true } } },
    });
    if (!booking) throw new ApiError(404, "Booking not found", "not_found");
    if (booking.tecnico.userId !== session.user.id) {
      throw new ApiError(403, "Not your booking", "forbidden");
    }
    if (booking.status !== "PAID") {
      throw new ApiError(409, `Cannot start from status ${booking.status}`, "invalid_state");
    }
    const updated = await prisma.booking.update({
      where: { id: booking.id },
      data: { status: "IN_PROGRESS" },
    });
    return NextResponse.json({ ok: true, booking: updated });
  } catch (err) {
    return apiError(err);
  }
}
