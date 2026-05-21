import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api";

export const runtime = "nodejs";

// POST /api/services/bookings/[id]/complete — TECNICO marks the service done.
// Funds were already transferred at capture (Destination Charge), so this is
// purely a status transition that unlocks the review prompt.
export async function POST(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireSession();

    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: { tecnico: { select: { userId: true } } },
    });
    if (!booking) throw new ApiError(404, "Booking not found", "not_found");
    if (booking.tecnico.userId !== session.user.id) {
      throw new ApiError(403, "Only the assigned tecnico can complete this", "forbidden");
    }
    if (booking.status !== "PAID" && booking.status !== "IN_PROGRESS") {
      throw new ApiError(409, `Cannot complete from status ${booking.status}`, "invalid_state");
    }

    const updated = await prisma.booking.update({
      where: { id: booking.id },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
      },
    });

    return NextResponse.json({ ok: true, booking: updated });
  } catch (err) {
    return apiError(err);
  }
}
