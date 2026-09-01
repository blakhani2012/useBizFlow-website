/**
 * Analytics — Plausible.
 *
 * Plausible is cookieless and does not collect personal data, which is why this
 * site can run it without a consent banner. Everything here is defensive: the
 * script is frequently blocked by privacy browsers and extensions, so no code
 * path may ever throw or assume `window.plausible` exists.
 *
 * Pageviews are tracked automatically by the Plausible script, including
 * client-side App Router navigations (it hooks the History API). Do **not**
 * fire a manual pageview on route change as well — that double counts.
 */

/** Custom events we report. Keep this union in sync with the Plausible goals. */
export type AnalyticsEvent =
  | "tour_started"
  | "tour_stop_viewed"
  | "modules_selected"
  | "form_started"
  | "demo_booked";

/**
 * Properties allowed per event. Plausible custom properties must be scalars.
 * These are declared up front so wiring the events into components is a
 * one-liner with no further type work.
 */
export interface AnalyticsEventProps {
  /** Product tour started (autoplay or a first manual interaction). */
  tour_started: { source?: "autoplay" | "click" | "keyboard" };
  /** A single tour screen became the active stop. */
  tour_stop_viewed: { stop: string; index?: number };
  /** Modules picked on the pricing / contact module selector. */
  modules_selected: { modules: string; count: number };
  /** User began filling a form (first field interaction). */
  form_started: { form: "contact" | "demo" };
  /** Demo / contact form submitted successfully. */
  demo_booked: { form: "contact" | "demo"; modules?: string; count?: number };
}

type PlausibleOptions = {
  props?: Record<string, string | number | boolean>;
  callback?: () => void;
};

type PlausibleFn = {
  (event: string, options?: PlausibleOptions): void;
  /** Queue drained by the real script once it loads. */
  q?: unknown[];
};

declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

export const PLAUSIBLE_SRC = "https://plausible.io/js/script.js";

export const PLAUSIBLE_DOMAIN =
  process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "usebizflow.com";

/**
 * Analytics is off in development unless explicitly enabled, and on in
 * production builds unless explicitly disabled. `NEXT_PUBLIC_*` values are
 * inlined at build time, which is what a static export needs.
 */
export const analyticsEnabled: boolean =
  process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true" ||
  (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== "false" &&
    process.env.NODE_ENV === "production");

/** Stop an unbounded queue building up when the script is blocked outright. */
const MAX_QUEUED_EVENTS = 50;

function getPlausible(): PlausibleFn | undefined {
  if (typeof window === "undefined") return undefined;
  if (typeof window.plausible === "function") return window.plausible;
  if (!analyticsEnabled) return undefined;

  // Script has not finished loading yet — install the standard Plausible queue
  // stub so events fired early are replayed once it does.
  const stub: PlausibleFn = function queued(...args: unknown[]) {
    const queue = (stub.q = stub.q ?? []);
    if (queue.length < MAX_QUEUED_EVENTS) queue.push(args);
  } as PlausibleFn;
  window.plausible = stub;
  return stub;
}

/**
 * Report a custom event. Safe to call anywhere (including during SSR/prerender,
 * where it is a no-op) and never throws.
 */
export function track<E extends AnalyticsEvent>(
  event: E,
  props?: AnalyticsEventProps[E],
): void {
  try {
    const plausible = getPlausible();
    if (!plausible) return;
    const hasProps = props != null && Object.keys(props).length > 0;
    plausible(
      event,
      hasProps
        ? { props: props as Record<string, string | number | boolean> }
        : undefined,
    );
  } catch {
    // Analytics must never break the page.
  }
}

/**
 * Manual pageview. Not used today — the standard Plausible script already
 * tracks App Router navigations. Kept for the case where the site moves to
 * `script.manual.js`.
 */
export function trackPageview(url?: string): void {
  try {
    const plausible = getPlausible();
    if (!plausible) return;
    plausible("pageview", url ? { props: { url } } : undefined);
  } catch {
    // Ignore.
  }
}
