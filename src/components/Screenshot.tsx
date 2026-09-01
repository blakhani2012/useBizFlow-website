/**
 * Renders a product screenshot as <picture> with AVIF -> WebP -> PNG sources.
 *
 * The site is a static export, so `images.unoptimized` is forced on and
 * next/image cannot resize or re-encode anything at request time. Instead,
 * `npm run optimize:images` pre-builds the derivatives at authoring time and
 * this component points the browser at them.
 *
 * `src` is the PNG fallback path exactly as it appears today, e.g.
 * "/screenshots/capture-v3/crm.png". The AVIF/WebP variants are derived from
 * it by convention (`-800` / `-1600` suffixes), matching what
 * scripts/optimize-images.js emits.
 *
 * `width` and `height` are the intrinsic pixel dimensions of the fallback PNG
 * (1600x914 for the current capture set). They are required so the browser can
 * reserve the right box before the image arrives — without them a screenshot
 * this large is a guaranteed layout shift.
 */

/** Widths that scripts/optimize-images.js emits AVIF + WebP at. */
const WIDTHS = [800, 1600] as const;

export interface ScreenshotProps {
  /** Path to the PNG fallback, e.g. "/screenshots/capture-v3/crm.png". */
  src: string;
  /** Required — these screenshots carry real product information. */
  alt: string;
  /** Intrinsic width of the fallback PNG, in pixels. */
  width: number;
  /** Intrinsic height of the fallback PNG, in pixels. */
  height: number;
  /**
   * How wide the image is painted, so the browser can pick a candidate before
   * layout. Defaults to "(min-width: 768px) 800px, 100vw", which suits a
   * screenshot sitting in a half-width or contained stage.
   */
  sizes?: string;
  className?: string;
  /** "eager" for anything in the initial viewport, "lazy" (default) below it. */
  loading?: "eager" | "lazy";
  /** Set "high" on the LCP screenshot; leave unset elsewhere. */
  fetchPriority?: "high" | "low" | "auto";
  decoding?: "async" | "sync" | "auto";
}

function srcSetFor(base: string, ext: "avif" | "webp"): string {
  return WIDTHS.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");
}

export default function Screenshot({
  src,
  alt,
  width,
  height,
  sizes = "(min-width: 768px) 800px, 100vw",
  className,
  loading = "lazy",
  fetchPriority,
  decoding = "async",
}: ScreenshotProps) {
  const base = src.replace(/\.png$/, "");

  return (
    <picture>
      <source type="image/avif" srcSet={srcSetFor(base, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSetFor(base, "webp")} sizes={sizes} />
      {/* A plain <img> on purpose: under `output: "export"` next/image cannot
          optimize anything, and it is <picture> that does the format
          negotiation here. */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
      />
    </picture>
  );
}
