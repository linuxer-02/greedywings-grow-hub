## GreedyWings — Home Page (Phase 1)

Build only the **landing page** now. Other pages (Services, Studio, FAQ, Contact) will get their own routes in later phases — for now the nav links will exist but point to placeholder routes added in upcoming phases.

### Brand & palette

Pulled from the abstract artwork (img 1):

- `--background`: warm cream (oklch ~0.96 0.02 80)
- `--foreground`: deep charcoal (oklch ~0.20 0.01 60)
- `--primary`: vivid terracotta orange (oklch ~0.66 0.20 38) — the accent color
- `--muted`: soft sand (oklch ~0.90 0.02 80)
- `--accent`: warm beige (oklch ~0.85 0.04 75)
- Subtle paper-grain texture overlay for depth

A matching dark mode (charcoal bg, cream fg, same orange accent) will be defined for parity.

### Layout (inspired by Create Studio reference)

```text
┌──────────────────────────────────────────────────────────────┐
│  GreedyWings®     SERVICES  STUDIO  FAQ          CONTACT →  │
├──────────────────────────────────────────────────────────────┤
│ // 00.01°                                          12+      │
│                                                    Brands    │
│                                                              │
│ // 00.02°    GreedyWings                       [client logo] │
│              ─────────────                                   │
│              (huge display type, layered over hero bg img)   │
│                                                              │
│ // 00.03°    A DIGITAL MARKETING AGENCY BUILT FOR            │
│              BRANDS WITH APPETITE.                           │
│              WE TURN ATTENTION INTO REVENUE.                 │
│              ───                                             │
└──────────────────────────────────────────────────────────────┘
                                              ↓ scroll
```

### Hero treatment (typography + bg image with depth)

- Full-viewport hero section.
- AI-generated background image: cinematic, moody, on-brand — abstract wings / feather / soaring motion in the cream + terracotta + charcoal palette, with strong depth (foreground blur, midground subject, atmospheric haze). Saved to `src/assets/hero-greedywings.jpg`.
- Overlay: subtle vignette + gradient from `--background` (bottom) fading up, so type stays legible.
- Headline "GreedyWings" rendered huge (clamp ~6rem → 14rem), terracotta orange, bold display sans. Slight parallax / depth: the word sits *between* foreground and background image layers (image split into two stacked layers with the type between), echoing the CreateStudio reference where type is part of the composition.
- Mono meta labels down the left edge (`// 00.01°`, `// 00.02°`, `// 00.03°`) in small uppercase monospace, muted color.
- Top-right: "12+ Brands" stat in terracotta + a small client logo placeholder slot.
- Bottom-left tagline block in uppercase mono, tight tracking.

### Typography

- Display: **Inter Tight** (or **Space Grotesk**) — bold, tight tracking — for "GreedyWings" + nav.
- Mono: **JetBrains Mono** — for `// 00.0x°` labels and tagline.
- Loaded via Google Fonts in `__root.tsx` head links.

### Nav (sticky top)

- Left: `GreedyWings` wordmark in terracotta.
- Center: `SERVICES`, `STUDIO`, `FAQ` (uppercase mono, small).
- Right: `CONTACT →` button.
- Tiny superscript number badges next to nav items (like the reference's `WORK⁵`) — for now decorative, hardcoded.

### Sections on the home route

1. **Hero** (described above) — fills viewport.
2. (Future phases will add: featured work strip, services snapshot, CTA band, footer.)
  For phase 1 we'll add a minimal **footer** with `© 2026 GreedyWings` + socials so the page feels complete.

### Responsive

- Mobile: nav collapses to a hamburger sheet, headline scales down, mono labels move under the hero, stats stack.
- The viewport is currently very narrow — mobile-first sizing will be tuned.

### SEO (`head()` on `/`)

- title: `GreedyWings — Digital Marketing Agency`
- description: `A digital marketing agency built for brands with appetite. We turn attention into revenue.`
- og:title / og:description match; og:image uses the hero image.

---

### Technical notes

- **Stack**: TanStack Start + Tailwind v4. Update `src/styles.css` tokens (oklch) for the new palette, light + dark.
- **Files to create / change**:
  - `src/styles.css` — new color tokens, paper-grain noise utility, font imports.
  - `src/routes/__root.tsx` — Google Font `<link>` tags, updated default meta, body font-family.
  - `src/routes/index.tsx` — replace placeholder with `<Hero />` composition.
  - `src/components/site/Header.tsx` — sticky nav.
  - `src/components/site/Hero.tsx` — layered hero with bg image + display type + mono meta.
  - `src/components/site/Footer.tsx` — minimal footer.
  - `src/assets/hero-greedywings.jpg` — generated via `imagegen` (premium tier for crisp depth).
- **Nav links**: `Link to="/services" | "/studio" | "/faq" | "/contact"`. To avoid TanStack type errors before those routes exist, phase 1 will also create **stub route files** for each (`<h1>Coming soon</h1>` + proper `head()`), to be filled in subsequent phases.
- No backend / Cloud needed yet.

---

After you approve, I'll implement phase 1. Phase 2 onward we'll tackle one page at a time as you requested.