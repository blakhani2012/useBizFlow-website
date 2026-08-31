// First-touch campaign attribution.
//
// Social and ads traffic lands anywhere on the site, then converts at /contact
// — usually several navigations later. We stash the *first* UTM set the tab
// sees and read it back at submit time, so the CRM lead is credited to the
// campaign that actually earned the visit rather than to whatever page the
// form happened to sit on.
//
// sessionStorage keeps this per-tab and self-expiring. Every access is guarded
// because private-browsing modes throw on read as well as write.

const STORAGE_KEY = "bizflow.attribution";

export type Attribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  landingPath?: string;
  referrer?: string;
};

const UTM_PARAMS: ReadonlyArray<readonly [string, keyof Attribution]> = [
  ["utm_source", "utmSource"],
  ["utm_medium", "utmMedium"],
  ["utm_campaign", "utmCampaign"],
  ["utm_content", "utmContent"],
  ["utm_term", "utmTerm"],
];

const MAX_TAG_LENGTH = 120;
// A referrer is a whole URL; 120 chars truncates a LinkedIn post link into
// something unusable. Kept in step with MAX_REFERRER_LENGTH in
// functions/digital_card_enquiry_logic.js, which caps these again server-side.
const MAX_REFERRER_LENGTH = 300;

// These values are stored on the lead and rendered in the CRM, so keep them
// short and free of markup.
function clean(value: string | null, maxLength = MAX_TAG_LENGTH): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim().slice(0, maxLength).replace(/[<>]/g, "");
  return trimmed || undefined;
}

export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  try {
    // First touch wins — a later untagged pageview must not overwrite it.
    if (window.sessionStorage.getItem(STORAGE_KEY)) return;
  } catch {
    return; // Storage unavailable; nothing to capture into.
  }

  const params = new URLSearchParams(window.location.search);
  const captured: Attribution = {};
  for (const [param, key] of UTM_PARAMS) {
    const value = clean(params.get(param));
    if (value) captured[key] = value;
  }

  // An untagged visit is left unattributed rather than credited to "direct".
  if (Object.keys(captured).length === 0) return;

  captured.landingPath = window.location.pathname.slice(0, 120);
  const referrer = clean(document.referrer, MAX_REFERRER_LENGTH);
  if (referrer) captured.referrer = referrer;

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(captured));
  } catch {
    // Attribution is best-effort and must never break the page.
  }
}

export function readAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

/**
 * The slug publicEnquiry resolves our tenant from. BizFlow allows exactly one
 * enquiry form per business (see myEnquiryFormProvider, `.limit(1)`), so this
 * is a single fixed value rather than one slug per channel.
 *
 * MUST match the link shown in the BizFlow app under
 * Settings -> Website enquiry form. If they drift apart the Cloud Function
 * returns 404 and no lead is created — the Web3Forms email still goes out, so
 * the failure is silent. Change it in both places together.
 *
 * Which channel a lead came from is carried on the lead itself, by the UTM
 * tags above, not by the slug.
 */
export const ENQUIRY_FORM_SLUG = "usebizflow";
