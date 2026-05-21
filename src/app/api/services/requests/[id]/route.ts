import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireSession } from "@/lib/auth";
import { apiError, ApiError } from "@/lib/api";

export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await requireSession();
    const request = await prisma.serviceRequest.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        client: { select: { id: true, name: true, email: true } },
        quotes: {
          orderBy: { createdAt: "desc" },
          include: {
            tecnico: {
              select: {
                id: true,
                displayName: true,
                yearsExperience: true,
                userId: true,
              },
            },
          },
        },
        booking: true,
      },
    });
    if (!request) throw new ApiError(404, "Not found", "not_found");

    // Only the owner client, a técnico that has quoted on it, or an admin can read.
    const isOwner = request.clientId === session.user.id;
    const isAdmin = session.user.role === "ADMIN";
    const isQuotingTecnico =
      session.user.role === "TECNICO" &&
      request.quotes.some((q) => q.tecnico.userId === session.user.id);

    if (!isOwner && !isAdmin && !isQuotingTecnico && request.status !== "OPEN") {
      throw new ApiError(403, "Forbidden", "forbidden");
    }

    return NextResponse.json({ request });
  } catch (err) {
    return apiError(err);
  }
}
