/**
 * Captures BizFlow app screens for the website product tour.
 *
 * The app is a Flutter-web SPA (canvas rendering — no DOM text), so
 * navigation uses URL hash routes instead of clicks, and in-page tabs are
 * driven by viewport-coordinate clicks. A persistent Chrome profile keeps the
 * login: sign in once in the automation window and the session is reused.
 *
 * Saves viewport screenshots (1505x860 @2x = 3010x1720, matching
 * public/screenshots/) into public/screenshots/capture-v3/ by default.
 *
 * Usage:
 *   node scripts/capture-app-screens.js                # all routes
 *   node scripts/capture-app-screens.js home bom       # a subset by file name
 *
 * ── 2026 redesign notes ────────────────────────────────────────────────────
 * The app was rebuilt with a grouped, collapsible sidebar (Dashboard · Sales ·
 * Purchases · Production Control · Workspace) and a new Production Control
 * module. Routes changed (e.g. Invoices → #/sales/invoices). Navigating to a
 * screen's hash auto-expands that screen's sidebar group, so the sidebar is
 * contextual per screen — no extra clicks needed for it.
 *
 * In-page tab bars (measured in the 1505-wide viewport):
 *   CRM tabs   (y=74): Dashboard 322, Leads 481, Quotes 640, Follow-ups 799,
 *                      Reports 957, Contacts 1117, Cards 1276, Campaigns 1435
 *   Tasks views(y=92): My Day 1000, List 1064, Board 1141, Deadline 1224,
 *                      Dashboard 1320
 */
const { chromium } = require("playwright-core");
const fs = require("fs");
const path = require("path");

const OUT_DIR =
  process.env.CAPTURE_OUT ||
  path.join(__dirname, "..", "public", "screenshots", "capture-v3");
const PROFILE_DIR = "/tmp/bizflow-capture-profile";
const APP_URL = "https://app.usebizflow.com";
const SETTLE_MS = 5500; // Flutter screens need a moment to paint + load data
const CLICK_SETTLE_MS = 2800;

// Each route: navigate to hash, settle, run any tab clicks, screenshot.
// `settle` overrides SETTLE_MS for data-heavy screens.
const ROUTES = [
  // ── Overview
  { file: "home", hash: "#/home", settle: 6500 },

  // ── Production Control (new module)
  { file: "bom", hash: "#/bom" },
  { file: "work-orders", hash: "#/production", settle: 7000 },
  { file: "quality-overview", hash: "#/production/quality" },
  { file: "inspections", hash: "#/production/inspections" },
  { file: "quality-templates", hash: "#/production/quality-templates" },
  { file: "ncr", hash: "#/production/ncr" },
  { file: "control-points", hash: "#/production/control-points" },

  // ── CRM (tabbed)
  { file: "crm", hash: "#/crm", settle: 6500 },
  { file: "crm-leads", hash: "#/crm", clicks: [[481, 74]] },
  { file: "crm-followups", hash: "#/crm", clicks: [[799, 74]] },
  { file: "crm-reports", hash: "#/crm", clicks: [[957, 74]] },
  { file: "crm-contacts", hash: "#/crm", clicks: [[1117, 74]] },
  { file: "crm-campaigns", hash: "#/crm", clicks: [[1435, 74]] },

  // ── Tasks (view switcher) & Projects
  { file: "tasks", hash: "#/tasks", settle: 6500 },
  { file: "tasks-board", hash: "#/tasks", clicks: [[1141, 92]] },
  { file: "tasks-dashboard", hash: "#/tasks", clicks: [[1320, 92]] },
  { file: "projects", hash: "#/projects" },

  // ── Sales
  { file: "sales-invoices", hash: "#/sales/invoices", settle: 6500 },
  { file: "sales-orders", hash: "#/sales/orders" },
  { file: "sales-quotes", hash: "#/sales/quotes" },
  { file: "sales-deliveries", hash: "#/sales/deliveries" },
  { file: "sales-customers", hash: "#/sales/customers" },

  // ── Purchases
  { file: "purchases", hash: "#/purchases", settle: 6500 },
  { file: "vendor-bills", hash: "#/purchases/bills" },
  { file: "suppliers", hash: "#/purchases/suppliers" },

  // ── Workspace: Inventory
  { file: "inventory", hash: "#/catalog", settle: 6500 },
  // Dropped from the public tour:
  //  · #/documents        — contains a real personal insurance PDF
  //  · #/sales/credit-notes — empty state, no demo data
  //  · #/reports          — headline KPIs are ₹0 unless the period is set to
  //    "This year", and the period pill won't take a scripted Flutter tap
  //    (CRM/Tasks tab clicks work; this segmented control does not).
];

// "Install BizFlow" PWA banner ✕ (canvas-rendered — click by coordinates).
// In the 2026 redesign a single dismiss holds for the session; we dismiss once
// after login. The ✕ sits at the far bottom-right of the full-width banner.
const BANNER_CLOSE = [1470, 822];

const log = (m) => console.log(`[capture] ${m}`);

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const context = await chromium.launchPersistentContext(PROFILE_DIR, {
    channel: "chrome",
    headless: false,
    viewport: { width: 1505, height: 860 },
    deviceScaleFactor: 2,
  });
  // Suppress the "Install BizFlow" PWA banner at the source: swallow the
  // browser's beforeinstallprompt before the Flutter app's own listener sees
  // it, so the banner never renders (more reliable than clicking its ✕).
  await context.addInitScript(() => {
    window.addEventListener(
      "beforeinstallprompt",
      (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
      },
      true
    );
  });

  const page = context.pages()[0] ?? (await context.newPage());
  await page.goto(APP_URL, { waitUntil: "domcontentloaded" });
  await page.bringToFront();

  // Logged in == the SPA routes us somewhere other than sign-in
  log("checking login state…");
  const deadline = Date.now() + 10 * 60 * 1000;
  let announced = false;
  for (;;) {
    if (Date.now() > deadline) {
      log("ERROR: login not detected within 10 minutes — exiting.");
      await context.close();
      process.exit(1);
    }
    const url = page.url();
    if (/#\//.test(url) && !/sign-in|login/.test(url)) break;
    if (!announced) {
      log("WAITING FOR LOGIN — sign in inside the automation Chrome window.");
      announced = true;
    }
    await page.waitForTimeout(2000);
  }

  // Diagnostics: confirm rendering architecture once
  const diag = await page.evaluate(() => ({
    flutter: !!document.querySelector("flt-glass-pane, flutter-view"),
    iframes: document.querySelectorAll("iframe").length,
  }));
  log(`diagnostics: ${JSON.stringify(diag)}`);

  log("login detected — dismissing install banner, then capturing routes");
  await page.waitForTimeout(3000);
  await page.mouse.click(BANNER_CLOSE[0], BANNER_CLOSE[1]);
  await page.waitForTimeout(1500);

  const only = process.argv.slice(2);
  const routes = only.length
    ? ROUTES.filter((r) => only.includes(r.file))
    : ROUTES;

  for (const route of routes) {
    await page.goto(`${APP_URL}/${route.hash}`, {
      waitUntil: "domcontentloaded",
    });
    await page.waitForTimeout(route.settle ?? SETTLE_MS);
    for (const [x, y] of route.clicks ?? []) {
      // Explicit hover before the tap — Flutter's canvas hit-testing is more
      // reliable when the pointer settles on the target first.
      await page.mouse.move(x, y);
      await page.waitForTimeout(300);
      await page.mouse.click(x, y);
      await page.waitForTimeout(CLICK_SETTLE_MS);
    }
    // Park the cursor on a neutral spot so no hover tooltip is baked into the
    // shot (e.g. the "Supplier Ledger" tooltip over the top-right icon row).
    await page.mouse.move(700, 780);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(OUT_DIR, `${route.file}.png`) });
    log(`saved ${route.file}.png (url: ${page.url()})`);
  }

  log(`DONE — ${routes.length} captures in ${OUT_DIR}`);
  await context.close();
})().catch((e) => {
  console.error(`[capture] FATAL: ${e.message}`);
  process.exit(1);
});
