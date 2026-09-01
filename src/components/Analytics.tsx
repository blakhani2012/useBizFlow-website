import Script from "next/script";

import {
  PLAUSIBLE_DOMAIN,
  PLAUSIBLE_SRC,
  analyticsEnabled,
} from "@/lib/analytics";

/**
 * Mounts the Plausible tracker.
 *
 * Plausible is cookieless and stores no personal data, so it needs no consent
 * banner — which matters because this site has no consent UI.
 *
 * The script tracks pageviews on load *and* on client-side App Router
 * navigations (it hooks the History API), so mounting this component is all the
 * pageview wiring the site needs. Custom events go through `track()` in
 * `@/lib/analytics`.
 *
 * Rendering is gated on `NEXT_PUBLIC_ANALYTICS_ENABLED` (see `analyticsEnabled`)
 * so `next dev` stays inert and no dev traffic pollutes the numbers. The value
 * is inlined at build time, which is what `output: "export"` requires.
 */
export default function Analytics() {
  if (!analyticsEnabled) return null;

  return (
    <Script
      id="plausible"
      src={PLAUSIBLE_SRC}
      data-domain={PLAUSIBLE_DOMAIN}
      strategy="afterInteractive"
    />
  );
}
