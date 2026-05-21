import "server-only";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { UnauthorizedError, ForbiddenError } from "@/lib/auth";
import { StripeNotConfiguredError } from "@/lib/stripe";
import { FacturapiNotConfiguredError } from "@/lib/facturapi";
import { ResendNotConfiguredError } from "@/lib/resend";

// Centralized API error → NextResponse formatter. Routes use it like:
//
//   try { ... } catch (err) { return apiError(err); }
//
// This guarantees consistent status codes and never leaks stack traces.

export class ApiError extends Error {
  constructor(public statusCode: number, message: string, public code?: string) {
    super(message);
    this.name = "ApiError";
  }
}

export function apiError(err: unknown): NextResponse {
  // Log on the server, sanitize for the client.
  console.error("[api error]", err);

  if (err instanceof ApiError) {
    return NextResponse.json(
      { error: err.message, code: err.code ?? "api_error" },
      { status: err.statusCode },
    );
  }

  if (err instanceof ZodError) {
    return NextResponse.json(
      {
        error: "Validation failed",
        code: "validation_error",
        issues: err.issues.map((i) => ({ path: i.path, message: i.message })),
      },
      { status: 400 },
    );
  }

  if (err instanceof UnauthorizedError) {
    return NextResponse.json({ error: err.message, code: "unauthorized" }, { status: 401 });
  }

  if (err instanceof ForbiddenError) {
    return NextResponse.json({ error: err.message, code: "forbidden" }, { status: 403 });
  }

  if (
    err instanceof StripeNotConfiguredError ||
    err instanceof FacturapiNotConfiguredError ||
    err instanceof ResendNotConfiguredError
  ) {
    return NextResponse.json(
      { error: "Integration not configured", code: "integration_unavailable" },
      { status: 503 },
    );
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "Resource already exists", code: "duplicate" },
        { status: 409 },
      );
    }
    if (err.code === "P2025") {
      return NextResponse.json(
        { error: "Resource not found", code: "not_found" },
        { status: 404 },
      );
    }
  }

  return NextResponse.json({ error: "Internal server error", code: "internal" }, { status: 500 });
}

export function readJson<T>(req: Request): Promise<T> {
  return req.json() as Promise<T>;
}
