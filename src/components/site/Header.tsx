import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { to: "/services" as const, label: "SERVICES", badge: "4" },
  { to: "/studio" as const, label: "STUDIO", badge: "" },
  { to: "/faq" as const, label: "FAQ", badge: "8" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex w-full items-center justify-between px-5 py-4 md:px-10 md:py-6">
        <Link
          to="/"
          className="font-display text-xl font-black tracking-tight text-primary md:text-2xl"
        >
          greedy<span className="text-foreground">wings</span>
          <sup className="ml-0.5 text-[0.5em] text-muted-foreground">®</sup>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group relative font-mono text-xs font-medium uppercase tracking-[0.18em] text-foreground/80 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {item.label}
              {item.badge && (
                <sup className="ml-1 inline-block rounded-full bg-foreground/10 px-1.5 py-0.5 text-[0.55em] font-semibold text-foreground/70">
                  {item.badge}
                </sup>
              )}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:text-primary md:inline-flex"
        >
          CONTACT <span aria-hidden>→</span>
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-1.5 text-foreground md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border/60 bg-background/95 px-5 py-6 backdrop-blur md:hidden">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="font-mono text-sm uppercase tracking-[0.18em] text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="font-mono text-sm uppercase tracking-[0.18em] text-primary"
            >
              CONTACT →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}