"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/Logo";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const overDark = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-ink-100/80 bg-white/80 backdrop-blur-xl"
          : isHome
          ? "border-b border-transparent bg-transparent"
          : "border-b border-transparent bg-white/0",
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between sm:h-20">
          <Logo invert={overDark} />

          <div className="hidden items-center gap-1 md:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    overDark
                      ? "text-white/75 hover:bg-white/10 hover:text-white"
                      : "text-ink-600 hover:bg-ink-100 hover:text-ink-900",
                    active && (overDark ? "text-white" : "text-ink-900"),
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex">
            <Link
              href="/contacto"
              className={cn(
                "group inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium shadow-soft transition-all",
                overDark
                  ? "bg-white text-ink-900 hover:bg-ink-50"
                  : "bg-ink-900 text-white hover:bg-ink-800 hover:shadow-glow",
              )}
            >
              Empezar proyecto
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <button
            type="button"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full border md:hidden",
              overDark
                ? "border-white/20 bg-white/5 text-white"
                : "border-ink-200 bg-white text-ink-900",
            )}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </Container>

      {open && (
        <div className="md:hidden">
          <div className="border-t border-ink-100 bg-white">
            <Container>
              <div className="flex flex-col gap-1 py-4">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/contacto"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink-900 px-5 text-sm font-medium text-white"
                >
                  Empezar proyecto
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </Container>
          </div>
        </div>
      )}
    </header>
  );
}
