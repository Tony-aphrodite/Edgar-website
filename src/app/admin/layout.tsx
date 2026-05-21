import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Container } from "@/components/ui/Container";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/iniciar-sesion?callbackUrl=/admin");
  if (session.user.role !== "ADMIN") redirect("/cuenta");

  return (
    <Container className="py-10">
      <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
        <aside>
          <p className="text-xs uppercase tracking-widest text-ink-400">Administración</p>
          <nav className="mt-6 flex flex-col gap-1 text-sm">
            <NavLink href="/admin">Resumen</NavLink>
            <NavLink href="/admin/tecnicos">Técnicos</NavLink>
            <NavLink href="/admin/bookings">Reservas</NavLink>
            <NavLink href="/admin/cfdis">CFDI</NavLink>
            <NavLink href="/admin/mensajes">Mensajes</NavLink>
            <div className="mt-4 border-t border-ink-100 pt-4">
              <Link href="/cuenta" className="text-sm text-ink-500 hover:text-ink-900">
                ← Volver a mi cuenta
              </Link>
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
