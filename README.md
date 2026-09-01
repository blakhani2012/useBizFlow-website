# BizFlow Marketing Website

Marketing website for **BizFlow** — the all-in-one business management platform.

## Tech Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4**
- **Framer Motion** — scroll-triggered animations
- **Lucide React** — icons
- Deployed on **Vercel** (planned)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, modules showcase, highlights, testimonials, CTA |
| `/features` | Detailed breakdown of all 6 modules (CRM, Inventory, Sales, Purchases, Manufacturing, More) |
| `/pricing` | Free / Pro / Business tiers with FAQ |
| `/contact` | Contact form + company info |
| `/about` | Company story, timeline, core values |

## Domain Architecture

```
usebizflow.com              → Marketing website (this repo, Vercel)
app.usebizflow.com          → BizFlow Flutter app (Firebase Hosting)
*.usebizflow.com (email)    → Google Workspace
```

### DNS Records (BigRock)

| Type | Host | Value | Purpose |
|------|------|-------|---------|
| CNAME | `app` | `bizflow-9983e.web.app` | Flutter app on Firebase Hosting |
| CNAME | `www` | `cname.vercel-dns.com` | Marketing site (add when deploying to Vercel) |
| A | `@` | `76.76.21.21` | Marketing site root (add when deploying to Vercel) |
| MX | `@` | *(Google Workspace)* | Email — configured by BigRock |
| CNAME | `fudxogqab75i` | `gv-odxxwna46yiqg4.dv.googlehosted.com` | Google Workspace domain verification |

> **Note:** Vercel DNS records (A and www CNAME) should only be added after deploying to Vercel.

### Firebase Hosting Setup

- **Project:** `bizflow-9983e`
- **Custom domain:** `app.usebizflow.com` (pending SSL provisioning)
- **Default URL:** `bizflow-9983e.web.app` (still works)
- **Status:** CNAME record added, waiting for Firebase to verify and provision SSL certificate (can take up to 24 hours)

### Google Workspace

- **Registrar:** BigRock
- **Domain:** `usebizflow.com`
- **Email:** `hello@usebizflow.com`, `bhavesh@usebizflow.com`

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

`postbuild` runs `scripts/fix-export-segment-paths.js`, which repairs the
per-segment prefetch filenames in `out/`. Next 16.2.6's exporter builds those
names from a `path.relative()` result but only rewrites forward slashes, so on
**Windows** the `__PAGE__` segment of every route is written to
`out/<route>/__next.<route>/__PAGE__.txt` while the client router requests
`out/<route>/__next.<route>.__PAGE__.txt` — a 404 on every navigation. The
script flattens them back. It is a no-op on macOS/Linux (and therefore in CI),
where the exporter already gets the name right.

## Screenshots & the image pipeline

Product screenshots live in `public/screenshots/capture-v3/` and are captured
by `scripts/capture-app-screens.js` at 3010x1720 (a 1505x860 viewport at DPR 2).

Nothing on the site paints anything close to that size — the homepage hero box
is ~600 CSS px (~155 px on a phone) and the `/features` and product-tour stages
top out around 1216 CSS px. Because this is a static export, `output: "export"`
forces `images.unoptimized`, so `next/image` cannot resize or re-encode
anything at request time: **whatever is committed is exactly what ships**.

So the resizing happens at authoring time:

```bash
npm run optimize:images            # only what is missing or stale
npm run optimize:images -- --force # rebuild every derivative
```

For each `<name>.png` this writes, into the same directory:

| File | Purpose |
|------|---------|
| `<name>-1600.avif` / `.webp` | desktop stage (a ~800 CSS px slot at DPR 2) |
| `<name>-800.avif` / `.webp` | phone + homepage hero |
| `<name>.png` | the master, **downscaled in place** to 1600 px wide and palette-quantised — the `<picture>` fallback |

The PNG is rewritten in place deliberately: a 3010 px master sitting inside
`public/` would be deployed. Masters are reproducible at any time by re-running
`scripts/capture-app-screens.js`, and git history still has them.

The script is idempotent — re-running it is a no-op — and the derivatives are
committed, so **`optimize:images` is not part of `build`**. Wiring it into the
build would mean every deploy environment needs `sharp` (a large,
platform-specific binary) and that a build mutates tracked files. Run it after
re-capturing screens instead.

Render them with `src/components/Screenshot.tsx`, which emits a `<picture>`
with AVIF → WebP → PNG sources and requires `width`/`height` so a screenshot
can never cause layout shift:

```tsx
<Screenshot
  src="/screenshots/capture-v3/crm.png"
  alt="BizFlow CRM dashboard — pipeline value, win rate, conversion…"
  width={1600}
  height={914}
  sizes="(min-width: 1024px) 600px, 100vw"
  loading="eager"
  fetchPriority="high"
  className="w-full"
/>
```

> **Not yet adopted.** The pages still use plain `<img src="…/<name>.png">`.
> They get the downscaled PNG for free, but not AVIF/WebP or the responsive
> widths. Switching `src/app/page.tsx`, `src/app/features/page.tsx` and
> `src/components/ProductTour.tsx` over to `<Screenshot>` is tracked
> separately.

## Hosting cache policy

`firebase.json` sets `Cache-Control` by asset class, because only part of the
export is content-hashed:

| Match | Policy | Why |
|-------|--------|-----|
| `/_next/**` | `max-age=31536000, immutable` | Next content-hashes everything here — the URL changes when the bytes do |
| images & fonts | `max-age=86400, stale-while-revalidate=604800` | These come from `public/`, which Next does **not** hash. `immutable` would be wrong — replacing a screenshot at the same path could never be picked up. One day fresh, then instant-but-revalidating for a week |
| `*.html`, `*.txt` | `max-age=0, must-revalidate` | HTML and the `.txt` RSC payloads must stay in lockstep with each other and with the current deploy |

## Deployment (Vercel)

1. Import this repo on [vercel.com](https://vercel.com)
2. Vercel auto-detects Next.js and deploys
3. Add custom domain `usebizflow.com` in Vercel dashboard
4. Add A record (`@` → `76.76.21.21`) and CNAME (`www` → `cname.vercel-dns.com`) in BigRock DNS
5. Vercel provisions SSL automatically

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Navbar + Footer
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles + Tailwind theme
│   ├── features/page.tsx   # Features page
│   ├── pricing/page.tsx    # Pricing page
│   ├── contact/page.tsx    # Contact page
│   └── about/page.tsx      # About page
└── components/
    ├── Navbar.tsx           # Responsive navbar with mobile menu
    ├── Footer.tsx           # Footer with links
    └── AnimatedSection.tsx  # Framer Motion scroll animation wrapper
```

## Related Repositories

- **BizFlow App** (Flutter + Firebase): Main SaaS application deployed at `app.usebizflow.com`
