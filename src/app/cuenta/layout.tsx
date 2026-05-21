import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Container } from "@/components/ui/Container";
import { SignOutButton } from "@/components/SignOutButton";

export const dynamic = "force-dynamic";

export default async function CuentaLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/iniciar-sesion?callbackUrl=/cuenta");
  }

  const role = session.user.role ?? "CLIENT";
  const isTecnico = role === "TECNICO";
  const isAdmin = role === "ADMIN";

  return (
    <Container className="py-10">
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside>
          <p className="text-xs uppercase tracking-widest text-ink-400">Mi cuenta</p>
          <p className="mt-1 text-sm font-medium text-ink-900 truncate">{session.user.email}</p>
          <p className="mt-1 text-xs text-ink-500">{labelForRole(role)}</p>

          <nav className="mt-8 flex flex-col gap-1 text-sm">
            <NavLink href="/cuenta">Resumen</NavLink>
            {!isTecnico ? (
              <>
                <NavLink href="/cuenta/solicitudes">Mis solicitudes</NavLink>
                <NavLink href="/cuenta/reservas">Mis reservas</NavLink>
                <NavLink href="/servicios/solicitar">+ Nueva solicitud</NavLink>
              </>
            ) : null}
            {isTecnico ? (
              <>
                <NavLink href="/cuenta/oportunidades">Oportunidades</NavLink>
                <NavLink href="/cuenta/trabajos">Mis trabajos</NavLink>
                <NavLink href="/tecnicos/registrarse">Editar perfil</NavLink>
              </>
            ) : null}
            {isAdmin ? <NavLink href="/admin">Panel de administración</NavLink> : null}
            <div className="mt-4 border-t border-ink-100 pt-4">
              <SignOutButton />
            </div>
          </nav>
        </aside>

        <main>{children}</main>
      </div>
    </Container>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="rounded-lg px-2.5 py-2 text-ink-700 transition hover:bg-ink-50 hover:text-ink-900"
    >
      {children}
    </Link>
  );
}

function labelForRole(role: string) {
  return role === "TECNICO" ? "Técnico" : role === "ADMIN" ? "Administrador" : "Cliente";
}
