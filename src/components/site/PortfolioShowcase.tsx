import { ArrowRight, Settings } from "lucide-react";
import { Link } from "@tanstack/react-router";

/* ─── SVG Illustrations ───────────────────────────────────── */

function BrowserIllustration() {
  return (
    <div className="relative h-full w-full">
      {/* Decorative shapes specific to Websites */}
      <div className="absolute -right-8 -top-12 h-32 w-32 rounded-full bg-[#E8CDA5] opacity-50 blur-[2px]" />
      <div className="absolute -right-2 top-10 h-8 w-8 rounded-full bg-primary" />
      <div
        className="absolute -bottom-8 right-12 h-16 w-16"
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          backgroundColor: "#C2C2C2",
          opacity: 0.5,
        }}
      />

      <svg viewBox="0 0 280 175" className="relative z-10 h-full w-full" fill="none">
        {/* shadow behind browser */}
        <rect x="12" y="12" width="262" height="163" rx="3" fill="#2B2B2B" opacity="0.25" />
        {/* browser frame */}
        <rect
          x="4"
          y="4"
          width="262"
          height="163"
          rx="3"
          fill="#e8dfd0"
          stroke="#2B2B2B"
          strokeWidth="1.5"
        />
        {/* toolbar */}
        <rect x="4" y="4" width="262" height="26" rx="3" fill="#d5ccbc" />
        <rect x="4" y="20" width="262" height="10" fill="#d5ccbc" />
        <circle cx="18" cy="17" r="4.5" fill="#2B2B2B" />
        <circle cx="32" cy="17" r="4.5" fill="#2B2B2B" />
        <circle cx="46" cy="17" r="4.5" fill="#2B2B2B" />
        <rect x="58" y="10" width="140" height="14" rx="2" fill="#ede5d5" />
        {/* hero image block */}
        <rect x="14" y="40" width="243" height="80" fill="#1a1a1a" />
        {/* text placeholders */}
        <rect x="14" y="130" width="100" height="6" rx="1" fill="#9B8F80" />
        <rect x="14" y="142" width="70" height="6" rx="1" fill="#9B8F80" />
        {/* CTA */}
        <rect x="14" y="154" width="56" height="10" rx="1" fill="#E84A13" />
      </svg>
    </div>
  );
}

function VideoIllustration() {
  return (
    <div className="relative h-full w-full">
      {/* Decorative shapes specific to Videos */}
      <div className="absolute -left-16 bottom-0 h-10 w-10 rounded-full bg-foreground" />
      <div className="absolute -left-16 bottom-16 h-4 w-4 rounded-full bg-primary" />
      <div
        className="absolute -bottom-24 left-10 h-32 w-48 bg-primary opacity-90"
        style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 0)" }}
      />

      <svg viewBox="0 0 260 170" className="relative z-10 h-full w-full" fill="none">
        {/* film strip shadow */}
        <rect x="14" y="24" width="232" height="130" rx="3" fill="#2B2B2B" opacity="0.3" />
        {/* film strip body */}
        <rect x="8" y="18" width="232" height="130" rx="3" fill="#1a1a1a" />
        {/* sprocket holes left */}
        {[28, 58, 88, 118].map((y) => (
          <rect key={y} x="13" y={y} width="16" height="10" rx="2" fill="#ede5d5" />
        ))}
        {/* sprocket holes right */}
        {[28, 58, 88, 118].map((y) => (
          <rect key={y} x="219" y={y} width="16" height="10" rx="2" fill="#ede5d5" />
        ))}
        {/* orange play circle */}
        <circle cx="124" cy="83" r="42" fill="#E84A13" />
        {/* play triangle */}
        <polygon points="113,65 113,101 146,83" fill="white" />
      </svg>
    </div>
  );
}

function CRMIllustration() {
  return (
    <div className="relative h-full w-full">
      {/* Decorative shapes specific to CRM */}
      <div className="absolute -right-6 -bottom-6 h-16 w-16 rounded-full bg-foreground" />
      <div className="absolute -left-6 -bottom-4 h-6 w-6 rounded-full bg-primary" />
      <div className="absolute -top-12 right-12 text-foreground">
        <Settings className="h-16 w-16" strokeWidth={2.5} />
      </div>

      <svg viewBox="0 0 280 180" className="relative z-10 h-full w-full" fill="none">
        {/* shadow */}
        <rect x="10" y="10" width="266" height="170" rx="3" fill="#2B2B2B" opacity="0.3" />
        {/* main window */}
        <rect
          x="2"
          y="2"
          width="266"
          height="170"
          rx="3"
          fill="#1a1a1a"
          stroke="#333"
          strokeWidth="1"
        />
        {/* sidebar */}
        <rect x="2" y="2" width="54" height="170" fill="#0f0f0f" />
        {[14, 36, 58, 80, 102].map((y) => (
          <rect key={y} x="10" y={y} width="36" height="8" rx="2" fill="#2a2a2a" />
        ))}
        {/* title bar */}
        <rect x="58" y="8" width="202" height="18" rx="2" fill="#222" />
        <circle cx="68" cy="17" r="4" fill="#E84A13" />
        {/* pie chart */}
        <circle cx="142" cy="80" r="42" fill="#333" />
        <path d="M142 80 L142 38 A42 42 0 0 1 178 104 Z" fill="#E84A13" />
        <path d="M142 80 L178 104 A42 42 0 0 1 110 116 Z" fill="#555" />
        <circle cx="142" cy="80" r="18" fill="#1a1a1a" />
        {/* data lines */}
        <rect x="68" y="40" width="30" height="4" fill="#555" />
        <rect x="68" y="50" width="20" height="4" fill="#555" />
        <rect x="68" y="60" width="25" height="4" fill="#555" />

        <rect x="200" y="40" width="30" height="4" fill="#555" />
        <rect x="200" y="50" width="20" height="4" fill="#555" />
        <rect x="200" y="60" width="40" height="4" fill="#555" />
        {/* bar chart */}
        <rect x="200" y="100" width="12" height="60" rx="1" fill="#E84A13" />
        <rect x="216" y="118" width="12" height="42" rx="1" fill="#555" />
        <rect x="232" y="108" width="12" height="52" rx="1" fill="#E84A13" />
      </svg>
    </div>
  );
}

/* ─── Polygon Card ────────────────────────────────────────── */

type StudioFilter = "all" | "web" | "video" | "seo" | "software";

interface CardData {
  number: string;
  badgeColor: string;
  title: string;
  description: string;
  clipPath: string;
  shadowClip: string;
  illustration: React.ReactNode;
  href: "/studio";
  filter?: StudioFilter;
}

function PolygonCard({ card }: { card: CardData }) {
  return (
    <Link
      to={card.href}
      search={{ filter: card.filter ?? "all" }}
      className="group relative block h-full w-full outline-none"
    >
      {/* dark polygon shadow behind */}
      <div
        className="absolute inset-0 translate-x-2 translate-y-2 bg-foreground/20 transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3"
        style={{ clipPath: card.shadowClip }}
      />

      {/* polygon border wrapper */}
      <div
        className="relative h-full w-full bg-foreground p-[1.5px] transition-all duration-500"
        style={{ clipPath: card.clipPath }}
      >
        {/* card fill */}
        <div
          className="relative h-full w-full overflow-hidden bg-background"
          style={{ clipPath: card.clipPath }}
        >
          {/* grain overlay */}
          <div className="grain pointer-events-none absolute inset-0 z-10" />

          {/* number badge — trapezoid */}
          <div className="absolute left-0 top-0 z-20">
            <div
              className={`px-6 py-2 pr-10 ${card.badgeColor}`}
              style={{ clipPath: "polygon(0% 0%, 100% 0%, 75% 100%, 0% 100%)" }}
            >
              <span className="font-display text-2xl font-black text-white">{card.number}</span>
            </div>
          </div>

          {/* card content */}
          <div className="flex h-full flex-col justify-between p-6 pt-16 sm:flex-row sm:items-end sm:p-8 sm:pt-16">
            {/* text block */}
            <div className="max-w-[220px] flex-shrink-0">
              <h3 className="font-display text-xl font-black tracking-tight text-foreground sm:text-2xl">
                {card.title}
              </h3>
              <p className="mt-4 font-mono text-[11px] uppercase leading-relaxed tracking-wider text-foreground/60">
                {card.description}
              </p>
              {/* hex arrow CTA decoration */}
              <div className="group/btn mt-6 inline-flex items-center justify-center p-2.5 transition-all duration-300">
                <div
                  className="absolute h-10 w-10 border-2 border-foreground/30 transition-colors group-hover/btn:border-foreground group-hover:border-primary"
                  style={{
                    clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  }}
                />
                <ArrowRight className="relative z-10 h-4 w-4 text-foreground transition-transform group-hover/btn:translate-x-0.5 group-hover:text-primary" />
              </div>
            </div>

            {/* illustration */}
            <div className="relative z-0 mt-6 flex-1 sm:ml-6 sm:mt-0 sm:max-w-[55%]">
              {card.illustration}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Main Section ────────────────────────────────────────── */

const cards: CardData[] = [
  {
    number: "01",
    badgeColor: "bg-primary",
    title: "WEBSITES",
    description: "Modern, responsive and user-focused websites that communicate and convert.",
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 12% 100%, 0% 86%)",
    shadowClip: "polygon(0% 0%, 100% 0%, 100% 100%, 12% 100%, 0% 86%)",
    illustration: <BrowserIllustration />,
    href: "/studio",
    filter: "web",
  },
  {
    number: "02",
    badgeColor: "bg-primary",
    title: "VIDEOS",
    description: "Engaging videos that tell stories, build brands and drive impact.",
    clipPath: "polygon(6% 0%, 100% 0%, 100% 78%, 54% 100%, 0% 78%)",
    shadowClip: "polygon(6% 0%, 100% 0%, 100% 78%, 54% 100%, 0% 78%)",
    illustration: <VideoIllustration />,
    href: "/studio",
    filter: "video",
  },
  {
    number: "03",
    badgeColor: "bg-foreground",
    title: "SOFTWARES\n& CRMs",
    description: "Custom software and CRM solutions to streamline processes and scale growth.",
    clipPath: "polygon(10% 0%, 100% 0%, 100% 88%, 90% 100%, 0% 100%, 0% 12%)",
    shadowClip: "polygon(10% 0%, 100% 0%, 100% 88%, 90% 100%, 0% 100%, 0% 12%)",
    illustration: <CRMIllustration />,
    href: "/studio",
    filter: "software",
  },
];

export function PortfolioShowcase() {
  return (
    <section className="relative w-full overflow-hidden py-24 md:py-32">
      {/* Blueprint grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,currentColor,currentColor 1px,transparent 1px,transparent 64px),repeating-linear-gradient(90deg,currentColor,currentColor 1px,transparent 1px,transparent 64px)",
        }}
      />

      {/* Crosshair markers on grid intersections */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-3 w-3 border border-foreground/30 rounded-full flex items-center justify-center">
        <div className="h-0.5 w-0.5 bg-foreground/50 rounded-full" />
      </div>
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-3 w-3 border border-foreground/30 rounded-full flex items-center justify-center">
        <div className="h-0.5 w-0.5 bg-foreground/50 rounded-full" />
      </div>

      {/* Grain */}
      <div className="grain pointer-events-none absolute inset-0" />

      {/* Background large floating geometry */}
      <div className="pointer-events-none absolute right-[10%] top-[10%] h-[400px] w-[400px] rounded-full bg-[#E8CDA5] opacity-10 blur-3xl" />

      {/* Technical corner markers */}
      {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos) => (
        <div key={pos} className={`pointer-events-none absolute ${pos} h-4 w-4`}>
          <div className="absolute left-0 top-0 h-full w-px bg-foreground/20" />
          <div className="absolute left-0 top-0 h-px w-full bg-foreground/20" />
        </div>
      ))}

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 md:px-10">
        {/* Desktop layout: 12-col asymmetric grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:grid-rows-[auto_auto]">
          {/* ── Intro Block ── */}
          <div className="flex flex-col justify-center py-6 lg:col-span-4 lg:row-span-1 lg:py-0 lg:pr-8">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">
                PORTFOLIO
              </span>
              <span className="text-primary text-[10px]">■</span>
            </div>
            <h2
              className="mt-6 font-display font-black leading-[0.9] tracking-[-0.03em] text-foreground"
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}
            >
              Explore
              <br />
              My Work<span className="text-primary">■</span>
            </h2>
            <div className="mt-8 h-0.5 w-12 bg-primary/40" />
            <p className="mt-6 max-w-[260px] font-mono text-[11px] leading-loose text-foreground/70 uppercase">
              A collection of websites, videos, and software solutions crafted with purpose and
              precision.
            </p>
          </div>

          {/* ── Card 01 Websites ── */}
          <div className="h-72 lg:col-span-8 lg:row-span-1 lg:h-[340px]">
            <PolygonCard card={cards[0]} />
          </div>

          {/* ── Card 02 Videos ── */}
          <div className="h-72 lg:col-span-6 lg:row-span-1 lg:h-[340px] lg:-ml-8 lg:mt-8">
            <PolygonCard card={cards[1]} />
          </div>

          {/* ── Card 03 Software ── */}
          <div className="h-72 lg:col-span-6 lg:row-span-1 lg:h-[340px] lg:mt-4">
            <PolygonCard card={cards[2]} />
          </div>
        </div>
      </div>
    </section>
  );
}
