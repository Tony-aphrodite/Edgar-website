import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api";

export const runtime = "nodejs";

// POST /api/services/bookings/[id]/review — client submits a 1-5 review after
// the técnico marked the booking COMPLETED. One review per booking (enforced
// by the unique constraint on Review.bookingId).
const schema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().max(2000).optional(),
});

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await requireSession();
    const body = await req.json().catch(() => {
      throw new ApiError(400, "Invalid JSON body", "invalid_body");
    });
    const data = schema.parse(body);

    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      select: { id: true, clientId: true, status: true },
    });
    if (!booking) throw new ApiError(404, "Booking not found", "not_found");
    if (booking.clientId !== session.user.id) {
      throw new ApiError(403, "Only the client can review", "forbidden");
    }
    if (booking.status !== "COMPLETED") {
      throw new ApiError(409, "Booking must be completed before reviewing", "invalid_state");
    }

    const review = await prisma.review.upsert({
      where: { bookingId: booking.id },
      create: {
        bookingId: booking.id,
        authorId: session.user.id,
        rating: data.rating,
        comment: data.comment,
      },
      update: {
        rating: data.rating,
        comment: data.comment,
      },
    });

    return NextResponse.json({ ok: true, review });
  } catch (err) {
    return apiError(err);
  }
}
