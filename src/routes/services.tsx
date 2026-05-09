import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ServicesShowcase } from "@/components/site/ServicesShowcase";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — GreedyWings" },
      { name: "description", content: "Digital marketing and development services from GreedyWings." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Header />
      <main className="pt-20">
        <ServicesShowcase />
      </main>
      <Footer />
    </div>
  );
}