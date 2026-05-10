import heroImg from "@/assets/hero-greedywings.jpg";

export function Hero() {
  return (
    <section className="relative isolate min-h-screen w-full overflow-hidden bg-background">
      {/* Background image with depth */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={1080}
          className="h-full w-full object-cover object-center opacity-90"
        />
        {/* atmospheric layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/10 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/30" />
      </div>
      <div className="grain absolute inset-0 -z-10" />

      {/* Left mono ruler */}
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-foreground/10 md:block" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-5 pt-28 pb-16 md:px-10 md:pt-36 md:pb-20">
        {/* Top row: meta + stat */}
        <div className="flex items-start justify-between">
          <MetaLabel index="00.01" />
          <div className="text-right">
            <div className="font-display text-3xl font-bold leading-none text-primary md:text-5xl">
              12+
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:text-xs">
              Brands
              <br />
              Scaled
            </div>
          </div>
        </div>

        {/* Headline block */}
        <div className="mt-12 flex-1 md:mt-20">
          <div className="flex items-start gap-4 md:gap-8">
            <MetaLabel index="00.02" hideOnMobile />
            <h1
              className="font-display font-black leading-[0.85] tracking-[-0.04em] text-foreground"
              style={{ fontSize: "clamp(3.5rem, 14vw, 13rem)" }}
            >
              <span className="text-primary">Greedy</span>
              <span className="text-foreground">Wings</span>
            </h1>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="mt-12 flex items-end justify-between gap-6 md:mt-16">
          <div className="flex items-start gap-4 md:gap-8">
            <MetaLabel index="00.03" hideOnMobile />
            <div className="max-w-md">
              <p className="font-mono text-[11px] font-medium uppercase leading-relaxed tracking-[0.18em] text-foreground/85 md:text-sm">
                A digital marketing agency built for
                <br />
                brands with appetite.
              </p>
              <p className="mt-3 font-mono text-[11px] font-medium uppercase leading-relaxed tracking-[0.18em] text-primary md:text-sm">
                We turn attention into revenue.
              </p>
              <div className="mt-4 h-px w-12 bg-foreground/40" />
            </div>
          </div>

          <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:flex">
            <span>scroll</span>
            <span aria-hidden>↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetaLabel({ index, hideOnMobile }: { index: string; hideOnMobile?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${hideOnMobile ? "hidden md:flex" : "flex"}`}>
      <span className="block h-px w-6 bg-foreground/40" />
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:text-xs">
        // {index}°
      </span>
    </div>
  );
}
