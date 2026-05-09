import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export function ContactStrip() {
  return (
    <section className="relative w-full overflow-hidden bg-foreground text-background">

      {/* Blueprint grid — inverted */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,currentColor,currentColor 1px,transparent 1px,transparent 48px),repeating-linear-gradient(90deg,currentColor,currentColor 1px,transparent 1px,transparent 48px)",
        }}
      />

      {/* Corner tick marks */}
      {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos) => (
        <div key={pos} className={`pointer-events-none absolute ${pos} h-4 w-4`}>
          <div className="absolute left-0 top-0 h-full w-px bg-background/20" />
          <div className="absolute left-0 top-0 h-px w-full bg-background/20" />
        </div>
      ))}

      {/* Ambient orange orb */}
      <div className="pointer-events-none absolute -right-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/30 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 py-14 md:px-10 md:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">

          {/* ── Left: Headline ── */}
          <div className="flex flex-col">
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-background/50">
              // Got a project in mind?
            </span>
            <h2
              className="mt-4 font-display font-black leading-[0.88] tracking-[-0.04em] text-background"
              style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
            >
              Let's build<br />
              <span className="text-primary">together.</span>
            </h2>
          </div>

          {/* ── Middle: Contact Details ── */}
          <div className="flex flex-col gap-6 lg:items-end">
            {[
              { label: "Email us", value: "hello@greedywings.in", href: "mailto:hello@greedywings.in" },
              { label: "Call us", value: "+91 98765 43210", href: "tel:+919876543210" },
            ].map(({ label, value, href }) => (
              <a key={label} href={href} className="group flex flex-col items-start lg:items-end">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-background/40 transition-colors group-hover:text-primary">
                  {label}
                </span>
                <span className="mt-0.5 font-sans text-lg font-semibold text-background/90 underline-offset-4 transition-all group-hover:text-primary group-hover:underline">
                  {value}
                </span>
              </a>
            ))}
          </div>

          {/* ── Right: CTA ── */}
          <div className="flex-shrink-0">
            <Link
              to="/contact"
              className="group relative flex items-center gap-3 overflow-hidden border-2 border-primary bg-primary px-8 py-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:bg-primary/90"
            >
              {/* sliding background sweep on hover */}
              <span className="relative z-10">Book Intro Call</span>
              <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>

            <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-background/30 lg:text-right">
              Free · 30 min · No strings attached
            </p>
          </div>
        </div>

        {/* ── Bottom Divider Strip ── */}
        <div className="mt-12 flex items-center justify-between border-t border-background/10 pt-6">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-background/30">
            India — Serving Globally
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-background/30">
            Response within 24h
          </span>
        </div>
      </div>
    </section>
  );
}
