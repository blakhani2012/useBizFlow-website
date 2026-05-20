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
