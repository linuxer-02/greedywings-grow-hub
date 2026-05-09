import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ContactForm } from "@/components/site/ContactForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a Call — GreedyWings" },
      { name: "description", content: "Book an intro call with GreedyWings. Tell us your name, email, phone, and service type and we'll get back to you within 24 hours." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <section className="relative w-full overflow-hidden px-5 pt-36 pb-24 md:px-10 md:pt-44 md:pb-32">
          {/* Blueprint grid overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,currentColor,currentColor 1px,transparent 1px,transparent 64px),repeating-linear-gradient(90deg,currentColor,currentColor 1px,transparent 1px,transparent 64px)",
            }}
          />

          {/* Ambient glows */}
          <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[140px]" />
          <div className="pointer-events-none absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />

          <div className="relative z-10 mx-auto max-w-[1500px]">
            {/* ── Header ── */}
            <div className="mb-16 md:mb-20">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                // Book a call
              </span>
              <h1 className="mt-5 font-display font-black leading-[0.92] tracking-[-0.03em] text-foreground"
                style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)" }}
              >
                Let's build<br />
                something<br />
                <span className="text-primary">great.</span>
              </h1>
              <div className="mt-6 h-[1px] w-16 bg-primary/50" />
              <p className="mt-6 max-w-md font-mono text-xs uppercase leading-loose tracking-[0.15em] text-foreground/60">
                Fill in your details and we'll reach out within 24 hours to schedule your free intro call.
              </p>
            </div>

            {/* ── Two‑column layout ── */}
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24 xl:gap-32">

              {/* ── Left: Info Panel ── */}
              <div className="flex flex-col gap-10">
                <div className="border-2 border-foreground/30 p-8">
                  <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/70 mb-6">
                    Contact Info
                  </h2>
                  <ul className="flex flex-col gap-6">
                    {[
                      { icon: Mail, label: "Email", value: "hello@greedywings.in" },
                      { icon: Phone, label: "Phone", value: "+91 98765 43210" },
                      { icon: MapPin, label: "Location", value: "India — serving globally" },
                      { icon: Clock, label: "Response Time", value: "Within 24 hours" },
                    ].map(({ icon: Icon, label, value }) => (
                      <li key={label} className="flex items-start gap-4">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center border-2 border-foreground/30 bg-card/50">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/60">{label}</span>
                          <span className="block font-sans text-sm font-medium text-foreground">{value}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What happens next */}
                <div>
                  <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/70 mb-6">
                    What happens next
                  </h2>
                  <ol className="flex flex-col gap-5">
                    {[
                      { n: "01", text: "You submit the form below." },
                      { n: "02", text: "We review your project brief and reach out within 24h." },
                      { n: "03", text: "We schedule a free 30‑min intro call." },
                      { n: "04", text: "We scope, quote, and kick off." },
                    ].map(({ n, text }) => (
                      <li key={n} className="flex items-start gap-4">
                        <span className="font-mono text-xs font-bold text-primary shrink-0">{n}</span>
                        <p className="font-sans text-sm font-medium text-foreground/80">{text}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* ── Right: Form ── */}
              <div className="border-2 border-foreground/30 bg-card/20 p-8 md:p-10 lg:p-12">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
