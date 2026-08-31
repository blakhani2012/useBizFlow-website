"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/**
 * Records the tab's first-touch UTM set. Mounted once in the root layout so it
 * fires wherever a campaign link lands, not only on /contact.
 *
 * Reads window.location directly rather than useSearchParams: this is a static
 * export, and useSearchParams would push the tree up to the nearest Suspense
 * boundary into client-side rendering for something the browser already has.
 */
export default function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
  }, []);

  return null;
}
