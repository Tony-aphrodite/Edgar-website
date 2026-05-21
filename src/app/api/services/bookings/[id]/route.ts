import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireSession();
    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: {
        request: { include: { category: true } },
        quote: true,
        tecnico: {
          select: { id: true, displayName: true, userId: true, user: { select: { email: true } } },
        },
        payment: true,
        commissionCfdi: true,
        review: true,
      },
    });
    if (!booking) throw new ApiError(404, "Booking not found", "not_found");

    const isClient = booking.clientId === session.user.id;
    const isTecnico = booking.tecnico.userId === session.user.id;
    const isAdmin = session.user.role === "ADMIN";
    if (!isClient && !isTecnico && !isAdmin) {
      throw new ApiError(403, "Forbidden", "forbidden");
    }
    return NextResponse.json({ booking });
  } catch (err) {
    return apiError(err);
  }
}
