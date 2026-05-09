import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { ServicesShowcase } from "@/components/site/ServicesShowcase";
import { PortfolioShowcase } from "@/components/site/PortfolioShowcase";
import { FaqShowcase } from "@/components/site/FaqShowcase";
import { ContactStrip } from "@/components/site/ContactStrip";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <ServicesShowcase />
        <PortfolioShowcase />
        <FaqShowcase />
        <ContactStrip />
      </main>
      <Footer />
    </div>
  );
}
