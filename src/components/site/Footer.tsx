import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-background">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          © 2026 GreedyWings — All rights reserved
        </p>
        <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/70">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-primary">Instagram</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-primary">Twitter</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-primary">LinkedIn</a>
          <Link to="/contact" className="hover:text-primary">Contact →</Link>
        </div>
      </div>
    </footer>
  );
}