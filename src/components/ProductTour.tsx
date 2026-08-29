"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import {
  LayoutDashboard,
  Factory,
  Network,
  ShieldCheck,
  ClipboardCheck,
  FileWarning,
  Waypoints,
  FileCog,
  Gauge,
  Users,
  CalendarClock,
  BarChart3,
  Contact,
  Megaphone,
  ListChecks,
  KanbanSquare,
  Activity,
  FolderKanban,
  FileText,
  ShoppingBag,
  FileSpreadsheet,
  Truck,
  UserSquare,
  ShoppingCart,
  Wallet,
  Building2,
  Boxes,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  CheckCircle2,
  MousePointerClick,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const AUTOPLAY_MS = 6000;

interface Hotspot {
  left: number; // % of image width
  top: number; // % of image height
  width: number;
  height: number;
  target: string; // stop id
  label: string;
  pulse?: boolean; // glowing dot (content hotspots) vs quiet tab region
}

// The redesigned app groups its sidebar into collapsible sections and expands
// only the current screen's group, so the sidebar is contextual per screen —
// cross-module navigation lives in the tour's left rail, not an overlay.
//
// The two in-screen tab bars ARE consistent per module, so we overlay them.
// Coordinates are % of the 3010×1720 image (= CSS px in the 1505×860 capture
// viewport ÷ 15.05 for x, ÷ 8.60 for y).

// CRM top tab bar (tabbed CRM screens only — not the Quotes/Cards tabs, which
// have no dedicated tour stop).
const CRM_TABS = [
  { target: "crm", label: "Dashboard", left: 16.4, width: 10 },
  { target: "crm-leads", label: "Leads", left: 27.0, width: 10 },
  { target: "crm-followups", label: "Follow-ups", left: 48.1, width: 10 },
  { target: "crm-reports", label: "Reports", left: 58.6, width: 10 },
  { target: "crm-contacts", label: "Contacts", left: 69.2, width: 10 },
  { target: "crm-campaigns", label: "Campaigns", left: 90.3, width: 9.5 },
];

const crmTabsFor = (current: string): Hotspot[] =>
  CRM_TABS.filter((t) => t.target !== current).map((t) => ({
    left: t.left,
    top: 6.2,
    width: t.width,
    height: 5,
    target: t.target,
    label: t.label,
    pulse: false,
  }));

// Tasks view switcher (My Day / List / Board / Deadline / Dashboard) — we tour
// List, Board and the analytics Dashboard.
const TASK_TABS = [
  { target: "tasks", label: "List", left: 66.2, width: 9 },
  { target: "tasks-board", label: "Board", left: 71.3, width: 9 },
  { target: "tasks-dashboard", label: "Analytics", left: 83.2, width: 9.5 },
];

const taskTabsFor = (current: string): Hotspot[] =>
  TASK_TABS.filter((t) => t.target !== current).map((t) => ({
    left: t.left,
    top: 8.2,
    width: t.width,
    height: 5,
    target: t.target,
    label: t.label,
    pulse: false,
  }));

interface Stop {
  id: string;
  icon: LucideIcon;
  label: string;
  module: string;
  title: string;
  description: string;
  highlights: string[];
  image: string;
  url: string;
  hotspots: Hotspot[];
  crmTabs?: boolean; // screen shows the CRM top tab bar
  taskTabs?: boolean; // screen shows the Tasks view switcher
}

const IMG = "/screenshots/capture-v3";

const stops: Stop[] = [
  // ───────────────────────────── Overview
  {
    id: "home",
    icon: LayoutDashboard,
    label: "Business Dashboard",
    module: "Overview",
    title: "Run your whole day from one screen",
    description:
      "The moment you log in: today's sales and outstanding dues, low-stock and overdue-task alerts, your live CRM pipeline, and one-tap actions for invoices, work orders and the catalogue.",
    highlights: [
      "Sales, outstanding, drafts, unpaid & overdue at a glance",
      "Low-stock and overdue-task alerts up top",
      "Quick actions + a live CRM pipeline snapshot",
    ],
    image: `${IMG}/home.png`,
    url: "app.usebizflow.com/#/home",
    hotspots: [
      { left: 16.3, top: 33.5, width: 82, height: 5, target: "inventory", label: "34 products low — open the catalogue" },
      { left: 16.3, top: 71, width: 45, height: 21, target: "crm", label: "Jump into the CRM pipeline" },
    ],
  },
  // ───────────────────────────── Production Control (new)
  {
    id: "work-orders",
    icon: Factory,
    label: "Work Orders",
    module: "Production Control",
    title: "Every job on the floor, from release to finished goods",
    description:
      "Work orders roll finished goods up with their sub-assemblies — live progress, due dates and floor status on each. See what needs attention, what's late, and the drafts still waiting to release.",
    highlights: [
      "Finished-good → sub-assembly hierarchy",
      "Live progress & stage status per order",
      "Table or Board view; release, start, close",
    ],
    image: `${IMG}/work-orders.png`,
    url: "app.usebizflow.com/#/production",
    hotspots: [
      { left: 16.3, top: 28, width: 82, height: 6, target: "bom", label: "The BOM behind this work order" },
      { left: 16.3, top: 14, width: 25, height: 13, target: "inspections", label: "Jobs feed the inspection queue" },
    ],
  },
  {
    id: "bom",
    icon: Network,
    label: "Bill of Materials",
    module: "Production Control",
    title: "Define what every product is made of",
    description:
      "Multi-level BOMs with materials, operations and revisions — costed automatically and checked against live stock, so shortages surface before a job ever hits the floor.",
    highlights: [
      "Materials + operations per product, versioned",
      "Auto-costed with total material value",
      "Stock-shortage flags before production",
    ],
    image: `${IMG}/bom.png`,
    url: "app.usebizflow.com/#/bom",
    hotspots: [
      { left: 16.3, top: 33, width: 82, height: 6, target: "work-orders", label: "Turn this BOM into a work order" },
      { left: 75.5, top: 16, width: 23, height: 13, target: "inventory", label: "22 with stock shortage — check items" },
    ],
  },
  {
    id: "quality-overview",
    icon: ShieldCheck,
    label: "Quality Overview",
    module: "Production Control",
    title: "Quality, measured across the whole plant",
    description:
      "First-pass yield, inspections done, rejected and quarantined quantities and open NCRs — with pass rates by inspection type, top defect codes and a supplier scorecard.",
    highlights: [
      "First-pass yield & rejection at a glance",
      "Pass rate by inspection type",
      "Top defect codes + supplier scorecard",
    ],
    image: `${IMG}/quality-overview.png`,
    url: "app.usebizflow.com/#/production/quality",
    hotspots: [
      { left: 82, top: 16, width: 16, height: 13, target: "ncr", label: "Open the NCRs awaiting action" },
      { left: 16.3, top: 30, width: 30, height: 15, target: "inspections", label: "See the inspections behind this" },
    ],
  },
  {
    id: "inspections",
    icon: ClipboardCheck,
    label: "Inspection Worklist",
    module: "Production Control",
    title: "One queue for every inspection due",
    description:
      "Incoming, in-process and final inspections in a single worklist — sample sizes resolved from the bound template, assignable to inspectors, with pass rate and turnaround tracked.",
    highlights: [
      "Incoming / in-process / final in one list",
      "Sample size from the bound template",
      "Assign, pass, fail or hold each check",
    ],
    image: `${IMG}/inspections.png`,
    url: "app.usebizflow.com/#/production/inspections",
    hotspots: [
      { left: 16.3, top: 32, width: 82, height: 6, target: "ncr", label: "A failed check raises an NCR" },
    ],
  },
  {
    id: "ncr",
    icon: FileWarning,
    label: "Non-conformance",
    module: "Production Control",
    title: "Non-conformances, quarantined and dispositioned",
    description:
      "Every reject becomes a tracked NCR — severity, quantity held out of stock, and the disposition (rework, scrap, use-as-is) recorded against its work order or supplier.",
    highlights: [
      "Open, awaiting-disposition & critical counts",
      "Quantity held out of sellable stock",
      "Disposition: rework, scrap or use-as-is",
    ],
    image: `${IMG}/ncr.png`,
    url: "app.usebizflow.com/#/production/ncr",
    hotspots: [
      { left: 16.3, top: 22, width: 82, height: 8, target: "inspections", label: "Back to the inspection that found it" },
    ],
  },
  {
    id: "control-points",
    icon: Waypoints,
    label: "Control Points",
    module: "Production Control",
    title: "Gate quality at every stage",
    description:
      "Bind a check to each stage — goods receipt, first article, in-process, final and pre-dispatch — with a template, a frequency and what happens on a fail, so nothing moves on unchecked.",
    highlights: [
      "Five stages from receipt to pre-dispatch",
      "Each gate binds a template + frequency",
      "Block, warn or skip-lot on a clean run",
    ],
    image: `${IMG}/control-points.png`,
    url: "app.usebizflow.com/#/production/control-points",
    hotspots: [
      { left: 16.5, top: 33, width: 31, height: 20, target: "inspections", label: "Gates feed the inspection queue" },
    ],
  },
  {
    id: "quality-templates",
    icon: FileCog,
    label: "Quality Templates",
    module: "Production Control",
    title: "Reusable inspection specs, bound to what they check",
    description:
      "Define the parameters, sample size and acceptance once as a versioned template, then bind it to the products and stages it should govern — so every inspector checks the same way.",
    highlights: [
      "Quantitative & qualitative parameters",
      "Sample size + acceptance built in",
      "Versioned and bound to products/stages",
    ],
    image: `${IMG}/quality-templates.png`,
    url: "app.usebizflow.com/#/production/quality-templates",
    hotspots: [
      { left: 16.3, top: 34, width: 82, height: 6, target: "inspections", label: "Templates drive the inspections" },
    ],
  },
  // ───────────────────────────── CRM
  {
    id: "crm",
    icon: Gauge,
    label: "CRM Dashboard",
    module: "CRM",
    title: "A complete sales command center",
    description:
      "Pipeline value, win rate and conversion up top; today's follow-ups with one-tap call and email; and a live pipeline snapshot by stage — with leads, quotes, reports and campaigns a tab away.",
    highlights: [
      "Total, open, pipeline value, won & win rate",
      "Today's follow-ups with one-tap call & email",
      "Live pipeline snapshot by stage",
    ],
    image: `${IMG}/crm.png`,
    url: "app.usebizflow.com/#/crm",
    crmTabs: true,
    hotspots: [
      { left: 16.5, top: 44, width: 39, height: 45, target: "crm-followups", label: "Follow-ups on a calendar" },
      { left: 58, top: 60, width: 40, height: 12, target: "crm-leads", label: "Open the leads behind the pipeline" },
    ],
  },
  {
    id: "crm-leads",
    icon: Users,
    label: "Leads",
    module: "CRM",
    title: "Every lead, scored and filtered",
    description:
      "All your leads with stage chips, lead scores and follow-up dates — list, board or card views, with one-click import, export and assignment.",
    highlights: [
      "Stage chips from New to Won with live counts",
      "Lead scores & overdue follow-ups flagged",
      "One-click import, export & assignment",
    ],
    image: `${IMG}/crm-leads.png`,
    url: "app.usebizflow.com/#/crm › Leads",
    crmTabs: true,
    hotspots: [],
  },
  {
    id: "crm-followups",
    icon: CalendarClock,
    label: "Follow-ups",
    module: "CRM",
    title: "Follow-ups on a calendar, not in your head",
    description:
      "Scheduled calls, emails, visits and WhatsApp follow-ups land on the team calendar — color-coded by type, with overdue ones flagged so nothing slips.",
    highlights: [
      "Calls, emails, visits & WhatsApp, color-coded",
      "Overdue follow-ups flagged in red",
      "Complete or reschedule in one tap",
    ],
    image: `${IMG}/crm-followups.png`,
    url: "app.usebizflow.com/#/crm › Follow-ups",
    crmTabs: true,
    hotspots: [],
  },
  {
    id: "crm-reports",
    icon: BarChart3,
    label: "CRM Reports",
    module: "CRM",
    title: "Know where deals are won and lost",
    description:
      "The conversion funnel with values per stage, average days in stage and stage-to-stage conversion rates — your sales process, measured.",
    highlights: [
      "Conversion funnel with value per stage",
      "Average days in stage spots bottlenecks",
      "Stage conversion rates for coaching",
    ],
    image: `${IMG}/crm-reports.png`,
    url: "app.usebizflow.com/#/crm › Reports",
    crmTabs: true,
    hotspots: [
      { left: 16.5, top: 30, width: 82, height: 34, target: "crm-leads", label: "The leads behind these numbers" },
    ],
  },
  {
    id: "crm-contacts",
    icon: Contact,
    label: "Contacts",
    module: "CRM",
    title: "Your contact book, action-ready",
    description:
      "Every contact with their company, pipeline status, and one-tap call, WhatsApp or email — straight from the row.",
    highlights: [
      "One-tap call / WhatsApp / email per contact",
      "Pipeline status on every contact",
      "Instant search across all contacts",
    ],
    image: `${IMG}/crm-contacts.png`,
    url: "app.usebizflow.com/#/crm › Contacts",
    crmTabs: true,
    hotspots: [],
  },
  {
    id: "crm-campaigns",
    icon: Megaphone,
    label: "Campaigns",
    module: "CRM",
    title: "Email campaigns with live results",
    description:
      "Send product or promo emails to filtered leads and track delivery, opens, generated leads and budget per campaign.",
    highlights: [
      "Sent, open & win tracking per campaign",
      "Statuses from Draft to Completed",
      "Budget roll-up across campaigns",
    ],
    image: `${IMG}/crm-campaigns.png`,
    url: "app.usebizflow.com/#/crm › Campaigns",
    crmTabs: true,
    hotspots: [],
  },
  // ───────────────────────────── Tasks & Projects
  {
    id: "tasks",
    icon: ListChecks,
    label: "Tasks",
    module: "Tasks & Projects",
    title: "Every job assigned and tracked",
    description:
      "Tasks carry owners, priorities, deadlines and statuses — linked to projects and leads, with overdue and unassigned surfaced up top and workflow-created follow-ups mixed in.",
    highlights: [
      "List, Board, Deadline & Analytics views",
      "Open, overdue, due-this-week & unassigned KPIs",
      "Tasks linked to projects and leads",
    ],
    image: `${IMG}/tasks.png`,
    url: "app.usebizflow.com/#/tasks",
    taskTabs: true,
    hotspots: [
      { left: 16.3, top: 40, width: 82, height: 6, target: "projects", label: "Open the project this task belongs to" },
    ],
  },
  {
    id: "tasks-board",
    icon: KanbanSquare,
    label: "Task Board",
    module: "Tasks & Projects",
    title: "Drag work across the board",
    description:
      "The same tasks as a kanban board — Pending through Completed — with live counts and overdue badges per column.",
    highlights: [
      "Kanban columns with live counts",
      "Overdue badges right on the column",
      "Filter the board by team member",
    ],
    image: `${IMG}/tasks-board.png`,
    url: "app.usebizflow.com/#/tasks › Board",
    taskTabs: true,
    hotspots: [],
  },
  {
    id: "tasks-dashboard",
    icon: Activity,
    label: "Task Analytics",
    module: "Tasks & Projects",
    title: "Team productivity, measured",
    description:
      "Status breakdown, deadline compliance, the completion trend and per-assignee workload — accountability without micromanaging.",
    highlights: [
      "Overdue, due-this-week & on-time rate",
      "Workload and % done per assignee",
      "Completion trend over time",
    ],
    image: `${IMG}/tasks-dashboard.png`,
    url: "app.usebizflow.com/#/tasks › Dashboard",
    taskTabs: true,
    hotspots: [],
  },
  {
    id: "projects",
    icon: FolderKanban,
    label: "Projects",
    module: "Tasks & Projects",
    title: "Projects grouped, tracked and timed",
    description:
      "Active projects with progress, tasks, milestones and open issues — grouped by category, with a built-in team timesheet.",
    highlights: [
      "Progress, milestones & issues per project",
      "Grouped by category",
      "My Timesheet for effort logging",
    ],
    image: `${IMG}/projects.png`,
    url: "app.usebizflow.com/#/projects",
    hotspots: [
      { left: 16.3, top: 31, width: 82, height: 6, target: "tasks", label: "The tasks inside this project" },
    ],
  },
  // ───────────────────────────── Sales
  {
    id: "sales-invoices",
    icon: FileText,
    label: "Invoices",
    module: "Sales",
    title: "GST invoices with payment tracking",
    description:
      "Outstanding, overdue, draft and paid KPIs over every Tax Invoice, Proforma and Challan — filtered by unpaid, drafts and paid, with customers pulled straight from CRM.",
    highlights: [
      "Outstanding, overdue, drafts & paid up top",
      "Unpaid / draft / paid filters with totals",
      "Customers pulled straight from CRM",
    ],
    image: `${IMG}/sales-invoices.png`,
    url: "app.usebizflow.com/#/sales/invoices",
    hotspots: [
      { left: 16.3, top: 39, width: 82, height: 6, target: "sales-orders", label: "Raised from a sales order" },
    ],
  },
  {
    id: "sales-orders",
    icon: ShoppingBag,
    label: "Sales Orders",
    module: "Sales",
    title: "Orders tracked from confirmation to invoice",
    description:
      "A status pipeline from Draft to Invoiced, with open-order and backlog KPIs — partial invoicing and deliveries handled along the way.",
    highlights: [
      "Draft → Confirmed → Invoiced pipeline",
      "Open orders & backlog value KPIs",
      "Partial invoicing tracked per order",
    ],
    image: `${IMG}/sales-orders.png`,
    url: "app.usebizflow.com/#/sales/orders",
    hotspots: [
      { left: 16.3, top: 40, width: 82, height: 6, target: "sales-invoices", label: "Its invoices live in Invoices" },
    ],
  },
  {
    id: "sales-quotes",
    icon: FileSpreadsheet,
    label: "Quotes",
    module: "Sales",
    title: "Quotes with win-rate built in",
    description:
      "Every quotation tracked from Draft to Accepted, with GST and HSN on each line — shared by WhatsApp or email and converted to an order in a click.",
    highlights: [
      "Quoted, accepted & win-rate KPIs",
      "GST & HSN on every line item",
      "Convert an accepted quote to an order",
    ],
    image: `${IMG}/sales-quotes.png`,
    url: "app.usebizflow.com/#/sales/quotes",
    hotspots: [
      { left: 16.3, top: 40, width: 82, height: 6, target: "sales-orders", label: "Accepted — becomes a sales order" },
    ],
  },
  {
    id: "sales-deliveries",
    icon: Truck,
    label: "Deliveries",
    module: "Sales",
    title: "Delivery orders and challans, tracked",
    description:
      "Turn confirmed orders into delivery orders and challans — dispatch status and quantities followed from the warehouse to the customer's door.",
    highlights: [
      "Delivery orders raised from sales orders",
      "Dispatch status & quantities tracked",
      "Delivery challans generated in a tap",
    ],
    image: `${IMG}/sales-deliveries.png`,
    url: "app.usebizflow.com/#/sales/deliveries",
    hotspots: [
      { left: 16.3, top: 35, width: 82, height: 6, target: "sales-orders", label: "The order behind this delivery" },
    ],
  },
  {
    id: "sales-customers",
    icon: UserSquare,
    label: "Customers",
    module: "Sales",
    title: "Your customer ledger, GST-ready",
    description:
      "Every customer with city, GSTIN, type and outstanding balance — one directory shared across CRM, quotes and invoices.",
    highlights: [
      "GSTIN & type per customer",
      "Outstanding balance at a glance",
      "Shared with CRM, quotes & invoices",
    ],
    image: `${IMG}/sales-customers.png`,
    url: "app.usebizflow.com/#/sales/customers",
    hotspots: [
      { left: 16.3, top: 24, width: 82, height: 6, target: "crm", label: "Customers begin as CRM leads" },
    ],
  },
  // ───────────────────────────── Purchases
  {
    id: "purchases",
    icon: ShoppingCart,
    label: "Purchase Orders",
    module: "Purchases",
    title: "POs with approvals and goods receipt",
    description:
      "Raise purchase orders and follow them through approval to receipt — with KPIs for open value, overdue POs and receipts still pending, and partial receipt tracked per line.",
    highlights: [
      "Draft → Submitted → Approved → Received",
      "Partial receipt tracking per order",
      "Open value & overdue-PO KPIs",
    ],
    image: `${IMG}/purchases.png`,
    url: "app.usebizflow.com/#/purchases",
    hotspots: [
      { left: 16.3, top: 39, width: 82, height: 6, target: "vendor-bills", label: "The bill raised against this PO" },
    ],
  },
  {
    id: "vendor-bills",
    icon: Wallet,
    label: "Vendor Bills",
    module: "Purchases",
    title: "Supplier bills and payables in one place",
    description:
      "Open, partially paid and paid bills with payable and overdue KPIs — matched to their purchase orders and due dates.",
    highlights: [
      "Open payable & overdue KPIs",
      "Due dates tracked per bill",
      "Matched to purchase orders",
    ],
    image: `${IMG}/vendor-bills.png`,
    url: "app.usebizflow.com/#/purchases/bills",
    hotspots: [
      { left: 16.3, top: 31, width: 82, height: 6, target: "purchases", label: "Raised from a purchase order" },
    ],
  },
  {
    id: "suppliers",
    icon: Building2,
    label: "Suppliers",
    module: "Purchases",
    title: "Your supplier directory, GST-ready",
    description:
      "Suppliers with contacts, GSTIN, payment terms and payable balance — MSME-aware and feeding straight into purchase orders and bills.",
    highlights: [
      "GSTIN & payment terms per supplier",
      "Payable balance & MSME flag",
      "Feeds purchase orders and bills",
    ],
    image: `${IMG}/suppliers.png`,
    url: "app.usebizflow.com/#/purchases/suppliers",
    hotspots: [
      { left: 16.3, top: 30, width: 82, height: 6, target: "vendor-bills", label: "This supplier's bills" },
    ],
  },
  // ───────────────────────────── Inventory
  {
    id: "inventory",
    icon: Boxes,
    label: "Inventory",
    module: "Inventory",
    title: "Your catalogue with live stock",
    description:
      "Products with SKUs, categories, stock levels and reorder points — low stock highlighted, synced with sales, purchases and production.",
    highlights: [
      "Live stock with low-stock highlighting",
      "Categories with product counts",
      "Barcode scan & quick add",
    ],
    image: `${IMG}/inventory.png`,
    url: "app.usebizflow.com/#/catalog",
    hotspots: [
      { left: 16.3, top: 24, width: 82, height: 6, target: "purchases", label: "Low stock? Raise a purchase order" },
    ],
  },
];

export default function ProductTour() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number, manual = true) => {
    setIndex(((i % stops.length) + stops.length) % stops.length);
    if (manual) setPlaying(false);
  }, []);

  const goToId = useCallback(
    (id: string) => {
      const i = stops.findIndex((s) => s.id === id);
      if (i !== -1) goTo(i);
    },
    [goTo]
  );

  useEffect(() => {
    if (!playing) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % stops.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(index + 1);
      if (e.key === "ArrowLeft") goTo(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, goTo]);

  const stop = stops[index];
  const hotspots: Hotspot[] = [
    ...stop.hotspots,
    ...(stop.crmTabs ? crmTabsFor(stop.id) : []),
    ...(stop.taskTabs ? taskTabsFor(stop.id) : []),
  ];

  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-6 lg:gap-8 items-start">
      {/* Stop navigation — grouped by module on desktop, chips on mobile */}
      <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0">
          {stops.map((s, i) => (
            <Fragment key={s.id}>
              {(i === 0 || stops[i - 1].module !== s.module) && (
                <div className="hidden lg:block px-1 pt-3 pb-0.5 text-[11px] font-semibold uppercase tracking-wider text-muted/70 first:pt-0">
                  {s.module}
                </div>
              )}
              <button
                type="button"
                onClick={() => goTo(i)}
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-left shrink-0 lg:shrink lg:w-full transition-all ${
                  i === index
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-white border border-slate-200 text-muted hover:border-primary/40 hover:text-foreground"
                }`}
              >
                <s.icon
                  className={`h-5 w-5 shrink-0 ${
                    i === index ? "text-white" : "text-primary"
                  }`}
                />
                <span className="text-sm font-medium whitespace-nowrap lg:whitespace-normal">
                  {s.label}
                </span>
              </button>
            </Fragment>
          ))}
        </div>
      </div>

      {/* Stage */}
      <div>
        {/* Browser frame */}
        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/50 border border-slate-200/80 bg-white">
          <div className="bg-slate-100 px-4 py-2.5 flex items-center gap-3 border-b border-slate-200/60">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-white rounded-full px-4 py-1 text-xs text-muted border border-slate-200 truncate max-w-xs">
                {stop.url}
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-medium text-primary">
              <MousePointerClick className="h-3.5 w-3.5" />
              Click the dots — or the tabs
            </div>
          </div>
          <div className="relative aspect-[3010/1720] bg-slate-50">
            {/* All screens stay mounted (preloaded CSS crossfade — interrupting
                a transition mid-flight must never leave a blank stage) */}
            {stops.map((s, i) => (
              <img
                key={s.id}
                src={s.image}
                alt={`BizFlow — ${s.title}`}
                className={`pointer-events-none absolute inset-0 w-full h-full object-cover transition-[opacity,transform] duration-500 ease-out ${
                  i === index ? "opacity-100 scale-100" : "opacity-0 scale-[1.02]"
                }`}
              />
            ))}

            {/* In-screenshot hotspots: glowing dots for content, quiet hover
                regions for the in-app tab bars */}
            {hotspots.map((h) => (
              <button
                key={`${stop.id}-${h.target}-${h.left}-${h.top}`}
                type="button"
                onClick={() => goToId(h.target)}
                aria-label={`Go to ${h.label}`}
                title={h.label}
                className="group/hs absolute z-10 rounded-lg border-2 border-transparent hover:border-primary/70 hover:bg-primary/10 transition-colors"
                style={{
                  left: `${h.left}%`,
                  top: `${h.top}%`,
                  width: `${h.width}%`,
                  height: `${h.height}%`,
                }}
              >
                {h.pulse !== false && (
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
                    <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-primary ring-2 ring-white" />
                  </span>
                )}
                {/* Tooltip */}
                <span
                  className={`pointer-events-none absolute whitespace-nowrap rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white opacity-0 group-hover/hs:opacity-100 transition-opacity shadow-lg ${
                    h.pulse === false
                      ? "left-1/2 -translate-x-1/2 top-full mt-2"
                      : "left-1/2 -translate-x-1/2 -top-8"
                  }`}
                >
                  {h.label} →
                </span>
              </button>
            ))}
          </div>
          {/* Autoplay progress */}
          <div className="h-1 bg-slate-100">
            {playing && (
              <div
                key={`${stop.id}-progress`}
                className="h-full bg-primary"
                style={{ animation: `tour-progress ${AUTOPLAY_MS}ms linear both` }}
              />
            )}
          </div>
        </div>

        {/* Caption + controls */}
        <div className="mt-6 grid md:grid-cols-[1fr_auto] gap-6 items-start">
          <div key={stop.id} className="tour-fade-up">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              {stop.module} · Step {index + 1} of {stops.length}
            </div>
            <h3 className="mt-1.5 text-xl sm:text-2xl font-bold text-foreground">
              {stop.title}
            </h3>
            <p className="mt-2 text-muted leading-relaxed max-w-2xl">
              {stop.description}
            </p>
            <ul className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2">
              {stop.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-center gap-2 text-sm text-muted"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-2 md:mt-1">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause tour" : "Play tour"}
              className="h-10 w-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-muted hover:text-primary hover:border-primary/40 transition-colors"
            >
              {playing ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-0.5" />
              )}
            </button>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous screen"
              className="h-10 w-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-muted hover:text-primary hover:border-primary/40 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next screen"
              className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/25 hover:bg-primary-dark transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
