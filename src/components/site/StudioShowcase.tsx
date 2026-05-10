import { useState, useEffect } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Link, useSearch, useNavigate } from "@tanstack/react-router";

/* ─── Types ──────────────────────────────────────────────── */

type Category = "all" | "web" | "video" | "seo" | "software";

interface Stat {
  value: string;
  label: string;
}

interface Project {
  id: string;
  category: Category;
  categoryLabel: string;
  categoryColor: string;
  image: string;
  isVideo: boolean;
  clientLogo: string;
  clientName: string;
  title: string;
  description: string;
  stats: Stat[];
  href: string;
}

/* ─── Mock Data ──────────────────────────────────────────── */

const projects: Project[] = [
  {
    id: "p1",
    category: "web",
    categoryLabel: "WEB DEV",
    categoryColor: "bg-primary",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
    isVideo: false,
    clientLogo: "T",
    clientName: "TechFlow Inc.",
    title: "E-commerce Platform Redesign",
    description: "Complete UX overhaul for B2B SaaS platform serving 10k+ users daily.",
    stats: [
      { value: "+187%", label: "CONVERSION" },
      { value: "-42%", label: "BOUNCE RATE" },
      { value: "3.2s", label: "LOAD TIME" },
    ],
    href: "/studio",
  },
  {
    id: "p2",
    category: "video",
    categoryLabel: "VIDEO",
    categoryColor: "bg-violet-500",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    isVideo: true,
    clientLogo: "M",
    clientName: "Momentum Studios",
    title: "Brand Storytelling Series",
    description: "12-part documentary series showcasing startup journey and culture.",
    stats: [
      { value: "2.4M", label: "VIEWS" },
      { value: "+320%", label: "ENGAGEMENT" },
      { value: "12", label: "EPISODES" },
    ],
    href: "/studio",
  },
  {
    id: "p3",
    category: "seo",
    categoryLabel: "SEO",
    categoryColor: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&q=80",
    isVideo: false,
    clientLogo: "G",
    clientName: "GrowthLab",
    title: "Organic Traffic Domination",
    description: "SEO strategy overhaul for fintech startup targeting enterprise clients.",
    stats: [
      { value: "+412%", label: "TRAFFIC" },
      { value: "#1", label: "RANKINGS" },
      { value: "87", label: "KEYWORDS" },
    ],
    href: "/studio",
  },
  {
    id: "p4",
    category: "software",
    categoryLabel: "SOFTWARE",
    categoryColor: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    isVideo: false,
    clientLogo: "N",
    clientName: "NovaCRM",
    title: "Custom CRM & Sales Pipeline",
    description: "End-to-end CRM built for a 50-person sales team with automated follow-ups.",
    stats: [
      { value: "3x", label: "DEALS CLOSED" },
      { value: "-60%", label: "ADMIN TIME" },
      { value: "50+", label: "USERS" },
    ],
    href: "/studio",
  },
  {
    id: "p5",
    category: "web",
    categoryLabel: "WEB DEV",
    categoryColor: "bg-primary",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    isVideo: false,
    clientLogo: "P",
    clientName: "PulseMedia",
    title: "Media Agency Landing Page",
    description: "High-converting landing page with animated hero and interactive pricing table.",
    stats: [
      { value: "+230%", label: "LEADS" },
      { value: "98", label: "PERF SCORE" },
      { value: "4.8s", label: "TIME ON SITE" },
    ],
    href: "/studio",
  },
  {
    id: "p6",
    category: "video",
    categoryLabel: "VIDEO",
    categoryColor: "bg-violet-500",
    image: "https://images.unsplash.com/photo-1574717024453-354056aafa98?w=800&q=80",
    isVideo: true,
    clientLogo: "V",
    clientName: "VisionX",
    title: "Product Launch Reel",
    description: "60-second hero reel for a hardware product launch across YouTube & Instagram.",
    stats: [
      { value: "5.1M", label: "REACH" },
      { value: "+540%", label: "SALES WEEK 1" },
      { value: "4.9★", label: "CLIENT SCORE" },
    ],
    href: "/studio",
  },
];

/* ─── Filter Tabs ─────────────────────────────────────────── */

const filters: { key: Category; label: string }[] = [
  { key: "all", label: "ALL WORK" },
  { key: "web", label: "WEB DEVELOPMENT" },
  { key: "video", label: "VIDEO EDITING" },
  { key: "seo", label: "SEO" },
  { key: "software", label: "SOFTWARE" },
];

/* ─── Project Card ────────────────────────────────────────── */

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={project.href as "/"}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm transition-all duration-500 hover:border-primary/60 hover:bg-card/50 hover:shadow-[0_0_40px_-10px_var(--color-primary)]"
    >
      {/* Cover Image */}
      <div className="relative h-52 w-full overflow-hidden sm:h-60">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

        {/* Category badge */}
        <div className={`absolute right-3 top-3 rounded-full px-3 py-1 ${project.categoryColor}`}>
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">
            {project.categoryLabel}
          </span>
        </div>

        {/* Play button overlay for videos */}
        {project.isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/80 bg-black/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
              <Play className="h-5 w-5 fill-white text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Client */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted font-display text-sm font-black text-foreground">
            {project.clientLogo}
          </div>
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {project.clientName}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-4 font-display text-lg font-black leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-xl">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-2 font-mono text-xs leading-relaxed text-muted-foreground/80">
          {project.description}
        </p>

        {/* Divider */}
        <div className="my-5 h-px w-full bg-border/40" />

        {/* Stats */}
        <div className="mt-auto flex items-end justify-between gap-2">
          {project.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="font-display text-xl font-black text-primary sm:text-2xl">
                {stat.value}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}

/* ─── Main Section ────────────────────────────────────────── */

export function StudioShowcase() {
  type SearchParams = { filter?: Category };
  const search = useSearch({ strict: false }) as SearchParams;
  const navigate = useNavigate();
  const [active, setActive] = useState<Category>("all");

  // Sync local state when URL search param changes (e.g. from PortfolioShowcase links)
  useEffect(() => {
    setActive((search?.filter as Category) ?? "all");
  }, [search?.filter]);

  function handleFilter(key: Category) {
    setActive(key);
    navigate({ to: "/studio", search: { filter: key } });
  }

  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="relative w-full overflow-hidden py-24 md:py-32">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1500px] px-5 md:px-10">
        {/* ── Header ── */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
              OUR WORK
            </span>
            <h2
              className="mt-4 font-display font-black leading-[0.9] tracking-[-0.04em] text-foreground"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
            >
              <span className="text-foreground">The </span>
              <span className="text-primary">Studio.</span>
            </h2>
          </div>
          <p className="max-w-xs pb-2 font-mono text-sm leading-relaxed text-muted-foreground/70">
            Real results from real projects — websites, videos, and software that move the needle.
          </p>
        </div>

        {/* ── Filter Bar ── */}
        <div className="mt-12 flex flex-wrap items-center gap-2 border-b border-border/40 pb-6">
          <span className="mr-4 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 md:inline">
            FILTER BY SERVICE —
          </span>
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => handleFilter(f.key)}
              className={`rounded-none px-5 py-2 font-mono text-xs font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
                active === f.key
                  ? "bg-primary text-primary-foreground"
                  : "border border-border/60 text-muted-foreground hover:border-primary/60 hover:text-primary"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ── Project Grid ── */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* ── View All CTA ── */}
        <div className="mt-14 flex items-center justify-center">
          <Link
            to="/studio"
            className="group inline-flex items-center gap-4 border border-border/60 px-10 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground transition-all duration-300 hover:border-primary hover:text-primary"
          >
            VIEW ALL PROJECTS
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
