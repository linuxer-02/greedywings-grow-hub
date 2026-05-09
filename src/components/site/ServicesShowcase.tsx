import { useState } from "react";
import { Globe, Video, Database, ArrowRight, Check } from "lucide-react";

const services = [
  {
    id: "01",
    shortName: "WEB & SEO",
    title: "WEBSITE & SEO",
    subtitle: "Your Digital Headquarters & Growth Engine.",
    icon: Globe,
    description: "We architect stunning, conversion-focused websites that don't just look exceptional — they perform at the highest level. From landing pages to full e-commerce ecosystems, every pixel is intentional.",
    features: [
      "UI/UX Design",
      "React & Next.js Development",
      "Search Engine Optimization",
      "Performance Tuning",
      "Conversion Rate Optimization",
      "CMS Integration",
    ],
  },
  {
    id: "02",
    shortName: "VIDEO",
    title: "VIDEO EDITING",
    subtitle: "Cinematic Stories. Measurable Results.",
    icon: Video,
    description: "We create scroll-stopping video content that captures attention and drives action. Whether it's short-form for social or cinematic commercial production, we bring your vision to life.",
    features: [
      "Short-form Content",
      "YouTube Video Editing",
      "Commercial Production",
      "Motion Graphics",
      "Color Grading",
      "Audio Mixing",
    ],
  },
  {
    id: "03",
    shortName: "SOFTWARE",
    title: "SOFTWARE & CRM",
    subtitle: "Automate & Scale Your Business.",
    icon: Database,
    description: "We build custom software and CRM solutions tailored to your unique operational needs. Streamline workflows, eliminate bottlenecks, and unlock the true potential of your data.",
    features: [
      "Custom CRM Development",
      "SaaS Architecture",
      "API Integrations",
      "Workflow Automation",
      "Dashboard Design",
      "Cloud Infrastructure",
    ],
  },
];

export function ServicesShowcase() {
  const [activeService, setActiveService] = useState(services[0]);

  return (
    <section id="services" className="mx-auto flex w-full max-w-[1500px] flex-col items-start justify-start px-5 py-24 md:px-10 md:py-32">

      {/* Header Section */}
      <div className="flex w-full flex-col gap-8 md:flex-row md:items-end md:justify-between lg:gap-16">
        <div className="max-w-4xl">
          <h2
            className="font-display font-black leading-[0.85] tracking-[-0.04em] text-foreground"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            <span className="text-foreground">Services stack </span>
            <span className="text-primary">we offer</span>
          </h2>
        </div>
        <div className="max-w-md pb-4">
          <p className="font-mono text-sm leading-relaxed text-muted-foreground/80">
            We combine strategy, design, content, and technology, giving you a single partner for every stage of your brand's growth.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-12 flex w-full flex-col gap-8 lg:mt-20 lg:flex-row lg:gap-16">

        {/* Left Column: Service List */}
        <div className="grid w-full grid-cols-3 gap-3 sm:gap-4 lg:flex lg:w-5/12 lg:flex-col">
          {services.map((service) => {
            const isActive = activeService.id === service.id;
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => setActiveService(service)}
                className={`group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-xl border p-4 text-center transition-all duration-500 hover:border-primary/80 sm:p-6 lg:items-start lg:p-6 lg:text-left xl:p-8 ${isActive
                  ? "border-primary bg-card/60 shadow-[0_0_30px_-5px_var(--color-primary)] shadow-primary/30"
                  : "border-border/80 bg-transparent opacity-70 hover:bg-card/20 hover:opacity-100"
                  }`}
              >
                {/* Subtle inner glow for active state */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                )}

                {/* Mobile View (Icon + Short Title) */}
                <div className="relative z-10 flex flex-col items-center gap-3 lg:hidden">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg transition-colors duration-500 ${isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className={`font-mono text-[10px] font-bold tracking-widest uppercase transition-colors duration-500 sm:text-xs ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary/80"}`}>
                    {service.shortName}
                  </span>
                </div>

                {/* Desktop View (Full Details) */}
                <div className="relative z-10 hidden w-full lg:block">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-500 ${isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className={`font-mono text-xs font-semibold tracking-widest ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary/80"}`}>
                        // {service.id}
                      </span>
                    </div>
                    <ArrowRight className={`h-5 w-5 transition-all duration-500 ${isActive ? "text-primary translate-x-0 opacity-100" : "-translate-x-4 text-muted-foreground opacity-0 group-hover:-translate-x-2 group-hover:opacity-60"}`} />
                  </div>

                  <div className="mt-6">
                    <h3 className={`font-display text-xl font-bold tracking-tight xl:text-2xl transition-colors duration-500 ${isActive ? "text-foreground" : "text-foreground/80"}`}>
                      {service.title}
                    </h3>
                    <p className={`mt-2 font-mono text-xs tracking-[0.1em] transition-colors duration-500 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                      {service.subtitle}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Service Details */}
        <div className="relative w-full lg:w-7/12">
          <div className="sticky top-32 flex min-h-[500px] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card/40 p-8 backdrop-blur-md transition-all duration-500 md:p-12 lg:p-16 hover:border-primary/30">

            {/* Background gradient effect */}
            <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary/15 blur-[100px] pointer-events-none transition-all duration-1000" />

            <div className="relative z-10 flex flex-col items-start gap-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                  <activeService.icon className="h-6 w-6" />
                </div>
                <span className="font-mono text-sm font-semibold tracking-widest text-primary">
                  // {activeService.id}
                </span>
              </div>

              <div>
                <h3 className="font-display text-3xl font-black tracking-tight text-foreground md:text-5xl lg:text-6xl transition-all duration-300">
                  {activeService.title}
                </h3>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                  {activeService.description}
                </p>
              </div>

              <div className="grid w-full grid-cols-1 gap-x-8 gap-y-4 pt-4 sm:grid-cols-2">
                {activeService.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </div>
                    <span className="font-mono text-xs font-medium tracking-wide text-foreground/90">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-16 flex items-center pt-8 border-t border-border">
              <a
                href="/contact"
                className="group inline-flex items-center gap-4 bg-primary px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:bg-primary/90 hover:pr-6 hover:pl-10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              >
                BOOK A CALL
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
