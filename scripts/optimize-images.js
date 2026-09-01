/**
 * Builds responsive, modern-format derivatives of the product screenshots.
 *
 * scripts/capture-app-screens.js saves raw captures at 3010x1720 (a 1505x860
 * viewport at DPR 2). Those masters are far larger than anything the site
 * actually paints: the homepage hero renders into a ~600 CSS px box (~155 px
 * on a phone), the /features stage tops out around 1216 CSS px, and the
 * product tour stage is similar. Because the site is a static export
 * (`output: "export"` forces `images.unoptimized`), next/image cannot resize
 * anything at request time — whatever is committed is what ships. So we do the
 * resizing here, at authoring time, and commit the results.
 *
 * For every `<name>.png` in public/screenshots/capture-v3/ this emits:
 *
 *   <name>-1600.avif / -1600.webp   desktop stage (covers a ~800 CSS px slot
 *                                   at DPR 2, or a 1600 px one at DPR 1)
 *   <name>-800.avif  / -800.webp    phone + homepage hero
 *   <name>.png                      the master, downscaled in place to 1600 px
 *                                   and palette-quantised, so it is a sane
 *                                   <picture> fallback (and so the plain
 *                                   <img src="…/<name>.png"> tags that still
 *                                   exist get the win without any code change)
 *
 * The PNG is rewritten in place on purpose: keeping a 3010 px master *inside*
 * public/ would mean deploying it. The masters are reproducible at any time
 * with `node scripts/capture-app-screens.js`, and git history still has them.
 *
 * Idempotent. A second run is a no-op: the PNG is already <= 1600 px so it is
 * left alone, and the derivatives are newer than their source so they are
 * skipped. Pass --force to rebuild everything regardless.
 *
 * Usage:
 *   node scripts/optimize-images.js            # only what is missing/stale
 *   node scripts/optimize-images.js --force    # rebuild every derivative
 *   node scripts/optimize-images.js crm home   # a subset, by file name
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC_DIR = path.join(
  __dirname,
  "..",
  "public",
  "screenshots",
  "capture-v3",
);

/** Widths we emit AVIF + WebP at, largest first. */
const WIDTHS = [1600, 800];

/** The <picture> fallback PNG is capped at this width. */
const FALLBACK_WIDTH = 1600;

/**
 * Screenshots are dense UI: small text, thin 1 px rules, flat fills.
 * 4:4:4 chroma is non-negotiable — chroma subsampling smears coloured text
 * and status pills. Effort is maxed because this runs at authoring time.
 */
const AVIF = { quality: 50, effort: 6, chromaSubsampling: "4:4:4" };
const WEBP = { quality: 80, effort: 6, smartSubsample: true };
/** Palette quantisation is the big win on UI screenshots — flat fills. */
const PNG = { compressionLevel: 9, palette: true, quality: 90, effort: 10 };

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));

const fmtKB = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

/** True when `out` is missing, or older than `src`. */
function isStale(src, out) {
  if (force) return true;
  if (!fs.existsSync(out)) return true;
  return fs.statSync(src).mtimeMs > fs.statSync(out).mtimeMs;
}

/**
 * Cap the master PNG at FALLBACK_WIDTH, in place.
 * Returns the width the file is at afterwards.
 */
async function capFallbackPng(file) {
  const { width, height } = await sharp(file).metadata();
  if (width <= FALLBACK_WIDTH) return width;

  // sharp cannot read and write the same path in one pipeline.
  const tmp = `${file}.tmp`;
  await sharp(file)
    .resize({ width: FALLBACK_WIDTH, fit: "inside", withoutEnlargement: true })
    .png(PNG)
    .toFile(tmp);
  fs.renameSync(tmp, file);

  const scaled = Math.round((height * FALLBACK_WIDTH) / width);
  console.log(
    `  png  ${FALLBACK_WIDTH}x${scaled}  (was ${width}x${height})  ${fmtKB(fs.statSync(file).size)}`,
  );
  return FALLBACK_WIDTH;
}

async function processOne(name) {
  const src = path.join(SRC_DIR, `${name}.png`);
  console.log(`${name}.png`);

  // Step 1 first, always: it rewrites the source, so doing it before the
  // derivatives keeps the source older than them and the mtime check honest.
  const srcWidth = await capFallbackPng(src);

  let written = 0;
  for (const width of WIDTHS) {
    // Never upscale. If the source is already narrower, emit at its width.
    const target = Math.min(width, srcWidth);

    for (const [ext, opts] of [
      ["avif", AVIF],
      ["webp", WEBP],
    ]) {
      const out = path.join(SRC_DIR, `${name}-${width}.${ext}`);
      if (!isStale(src, out)) continue;

      await sharp(src)
        .resize({ width: target, fit: "inside", withoutEnlargement: true })
        [ext](opts)
        .toFile(out);
      written += 1;
      console.log(`  ${ext.padEnd(4)} ${width}  ${fmtKB(fs.statSync(out).size)}`);
    }
  }
  if (written === 0) console.log("  up to date");
}

async function main() {
  if (!fs.existsSync(SRC_DIR)) {
    throw new Error(`Screenshot directory not found: ${SRC_DIR}`);
  }

  const names = fs
    .readdirSync(SRC_DIR)
    .filter((f) => f.endsWith(".png"))
    .map((f) => path.basename(f, ".png"))
    .filter((n) => only.length === 0 || only.includes(n))
    .sort();

  if (names.length === 0) {
    throw new Error(
      only.length > 0
        ? `No screenshots matched: ${only.join(", ")}`
        : `No PNGs found in ${SRC_DIR}`,
    );
  }

  for (const name of names) {
    await processOne(name);
  }

  const total = fs
    .readdirSync(SRC_DIR)
    .reduce((sum, f) => sum + fs.statSync(path.join(SRC_DIR, f)).size, 0);
  console.log(
    `\n${names.length} screenshot(s). capture-v3 now ${(total / 1024 / 1024).toFixed(2)} MB total.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
