"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-sm text-ink-500 transition hover:text-ink-900"
    >
      Cerrar sesión
    </button>
  );
}
