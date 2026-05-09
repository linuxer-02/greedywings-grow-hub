import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio — GreedyWings" },
      { name: "description", content: "Studio page for GreedyWings digital marketing agency." },
    ],
  }),
  component: StudioPage,
});

function StudioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto flex min-h-screen max-w-[1500px] flex-col items-start justify-center px-5 pt-32 md:px-10">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">// soon°</span>
        <h1 className="mt-4 font-display text-5xl font-black tracking-tight md:text-7xl">
          <span className="text-primary">Studio</span> — coming soon
        </h1>
        <p className="mt-6 max-w-md font-mono text-xs uppercase tracking-[0.18em] text-foreground/70">
          We're crafting this page with the same care as the rest. Check back shortly.
        </p>
      </main>
      <Footer />
    </div>
  );
}
