import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — GreedyWings" },
      { name: "description", content: "Digital marketing services from GreedyWings." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto flex min-h-screen max-w-[1500px] flex-col items-start justify-center px-5 pt-32 md:px-10">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">// 00.04°</span>
        <h1 className="mt-4 font-display text-5xl font-black tracking-tight md:text-7xl">
          <span className="text-primary">Services</span> — coming soon
        </h1>
        <p className="mt-6 max-w-md font-mono text-xs uppercase tracking-[0.18em] text-foreground/70">
          We're crafting this page with the same care as the rest. Check back shortly.
        </p>
      </main>
      <Footer />
    </div>
  );
}