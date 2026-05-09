import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StudioShowcase } from "@/components/site/StudioShowcase";
import { z } from "zod";

const studioSearchSchema = z.object({
  filter: z.enum(["all", "web", "video", "seo", "software"]).optional().catch("all"),
});

type StudioSearch = z.infer<typeof studioSearchSchema>;

export const Route = createFileRoute("/studio")({
  validateSearch: (search: Record<string, unknown>): StudioSearch => {
    return studioSearchSchema.parse(search);
  },
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
      <main className="pt-20">
        <StudioShowcase />
      </main>
      <Footer />
    </div>
  );
}
