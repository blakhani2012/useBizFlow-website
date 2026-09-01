/**
 * Generates 1200x630 Open Graph images into public/og/.
 * Run from the repo root:  node <this file>
 *
 * Design: flat BizFlow navy (#0B1733) with soft brand glows, the use.Bizflow
 * logo keyed out of public/logo-dark.png, a route eyebrow, headline, subline
 * and a footer rule.
 */
const path = require("path");
const fs = require("fs");
const sharp = require(require.resolve("sharp", { paths: [process.cwd()] }));

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public", "og");
const W = 1200;
const H = 630;
const BG = [11, 23, 51]; // #0B1733 — the flat background baked into logo-dark.png

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * The logo asset is white/blue artwork on a flat navy rectangle. Key that
 * rectangle out so the mark can sit on top of the gradient background:
 * for light-on-dark artwork alpha = max((p - bg) / (255 - bg)) per channel,
 * and the unpremultiplied colour is bg + (p - bg) / alpha.
 */
async function transparentLogo() {
  const src = path.join(ROOT, "public", "logo-dark.png");
  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;

  const out = Buffer.alloc(w * h * 4);
  let minx = w;
  let miny = h;
  let maxx = 0;
  let maxy = 0;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * c;
      const o = (y * w + x) * 4;
      let a = 0;
      for (let ch = 0; ch < 3; ch++) {
        const d = (data[i + ch] - BG[ch]) / (255 - BG[ch]);
        if (d > a) a = d;
      }
      if (a <= 0.01) {
        out[o] = out[o + 1] = out[o + 2] = out[o + 3] = 0;
        continue;
      }
      if (a > 1) a = 1;
      for (let ch = 0; ch < 3; ch++) {
        let v = BG[ch] + (data[i + ch] - BG[ch]) / a;
        out[o + ch] = Math.max(0, Math.min(255, Math.round(v)));
      }
      out[o + 3] = Math.round(a * 255);
      if (x < minx) minx = x;
      if (x > maxx) maxx = x;
      if (y < miny) miny = y;
      if (y > maxy) maxy = y;
    }
  }

  const logoW = 372;
  return sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .extract({
      left: minx,
      top: miny,
      width: maxx - minx + 1,
      height: maxy - miny + 1,
    })
    .resize({ width: logoW })
    .png()
    .toBuffer();
}

function backgroundSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <radialGradient id="glowA" cx="0.82" cy="0.16" r="0.75">
      <stop offset="0%" stop-color="#2563eb" stop-opacity="0.55"/>
      <stop offset="55%" stop-color="#1d4ed8" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#0B1733" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="0.06" cy="0.95" r="0.7">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#0B1733" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#2563eb"/>
      <stop offset="55%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#0B1733"/>
  <rect width="${W}" height="${H}" fill="url(#glowA)"/>
  <rect width="${W}" height="${H}" fill="url(#glowB)"/>
  <circle cx="1010" cy="118" r="230" fill="none" stroke="#3b82f6" stroke-opacity="0.16" stroke-width="2"/>
  <circle cx="1010" cy="118" r="330" fill="none" stroke="#3b82f6" stroke-opacity="0.10" stroke-width="2"/>
  <rect x="0" y="0" width="${W}" height="8" fill="url(#bar)"/>
</svg>`;
}

function textSvg({ eyebrow, headline, subline }) {
  const FAMILY = "Segoe UI, Selawik, Arial, Helvetica, sans-serif";
  const headSize = headline.some((l) => l.length > 26) ? 60 : 68;
  const headTop = 300;
  const headLead = headSize + 16;
  const subTop = headTop + headLead * (headline.length - 1) + 74;

  const head = headline
    .map(
      (line, i) =>
        `<text x="80" y="${headTop + i * headLead}" font-family="${FAMILY}" font-size="${headSize}" font-weight="700" fill="#ffffff" letter-spacing="-1.2">${esc(line)}</text>`,
    )
    .join("\n  ");

  const sub = subline
    .map(
      (line, i) =>
        `<text x="80" y="${subTop + i * 40}" font-family="${FAMILY}" font-size="27" font-weight="400" fill="#a8bad4">${esc(line)}</text>`,
    )
    .join("\n  ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <text x="80" y="222" font-family="${FAMILY}" font-size="21" font-weight="600" fill="#7dd3fc" letter-spacing="3.4">${esc(eyebrow)}</text>
  ${head}
  ${sub}
  <rect x="80" y="520" width="1040" height="1" fill="#ffffff" fill-opacity="0.12"/>
  <text x="80" y="572" font-family="${FAMILY}" font-size="26" font-weight="600" fill="#60a5fa">usebizflow.com</text>
  <text x="1120" y="572" text-anchor="end" font-family="${FAMILY}" font-size="22" font-weight="400" fill="#7c8db0">Finscape Innovation · Ahmedabad, India</text>
</svg>`;
}

const ROUTES = [
  {
    file: "home.png",
    eyebrow: "BUSINESS MANAGEMENT PLATFORM",
    headline: ["All-in-one software for", "how your business runs"],
    subline: [
      "CRM · Sales · Purchases · Inventory · Production",
      "Control & Quality · Projects · Tasks · Documents",
    ],
  },
  {
    file: "features.png",
    eyebrow: "FEATURES",
    headline: ["Every module your", "business runs on"],
    subline: [
      "Lead scoring, GST invoicing, purchase approvals, live",
      "inventory, projects, tasks and a built-in document drive.",
    ],
  },
  {
    file: "pricing.png",
    eyebrow: "PRICING",
    headline: ["Pay only for the", "modules you use"],
    subline: [
      "No fixed plans. Pick the modules your business needs",
      "and get a quote built around your team.",
    ],
  },
  {
    file: "about.png",
    eyebrow: "ABOUT US",
    headline: ["Built by Finscape", "Innovation"],
    subline: [
      "Why we built an all-in-one business platform for",
      "growing Indian manufacturers and traders.",
    ],
  },
  {
    file: "contact.png",
    eyebrow: "CONTACT",
    headline: ["Book a free", "30-minute demo"],
    subline: [
      "Ask about modules, pricing or support.",
      "We respond within one business day.",
    ],
  },
  {
    file: "demo.png",
    eyebrow: "PRODUCT TOUR",
    headline: ["See BizFlow", "in action"],
    subline: [
      "A self-guided walkthrough of the real product —",
      "production, quality, CRM, invoicing and inventory.",
    ],
  },
  {
    file: "privacy.png",
    eyebrow: "LEGAL",
    headline: ["Privacy Policy"],
    subline: [
      "How BizFlow collects, uses and protects your",
      "information across the website and the app.",
    ],
  },
  {
    file: "terms.png",
    eyebrow: "LEGAL",
    headline: ["Terms of Service"],
    subline: [
      "The terms that govern your use of the BizFlow",
      "website and the BizFlow platform.",
    ],
  },
];

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const logo = await transparentLogo();
  const logoMeta = await sharp(logo).metadata();

  for (const route of ROUTES) {
    const buf = await sharp(Buffer.from(backgroundSvg()))
      .composite([
        { input: logo, top: 78, left: 80 },
        { input: Buffer.from(textSvg(route)), top: 0, left: 0 },
      ])
      .png({ compressionLevel: 9, palette: false })
      .toBuffer();
    const dest = path.join(OUT_DIR, route.file);
    fs.writeFileSync(dest, buf);
    const { size } = fs.statSync(dest);
    console.log(
      `${route.file.padEnd(14)} ${(size / 1024).toFixed(0)} KB  logo ${logoMeta.width}x${logoMeta.height}`,
    );
  }
})();
