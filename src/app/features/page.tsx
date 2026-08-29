"use client";

import AnimatedSection from "@/components/AnimatedSection";
import {
  Users,
  Package,
  FileText,
  ShoppingCart,
  Factory,
  ClipboardCheck,
  BarChart3,
  Bell,
  FolderOpen,
  ScanBarcode,
  ArrowRight,
  Workflow,
  Mail,
  MessageSquare,
  Calendar,
  Star,
  FileSpreadsheet,
  Truck,
  ShieldCheck,
  UserCog,
  Network,
  FileWarning,
  Waypoints,
  FileCog,
} from "lucide-react";
import Link from "next/link";

const featureSections = [
  {
    id: "crm",
    icon: Users,
    title: "CRM & Lead Management",
    subtitle: "Turn leads into customers with a powerful, visual sales pipeline",
    color: "blue",
    gradient: "from-blue-500 to-blue-600",
    screenshot: "/screenshots/capture-v3/crm.png",
    screenshotAlt: "BizFlow CRM dashboard — pipeline value, win rate, conversion, today's follow-ups, and a live pipeline snapshot",
    features: [
      {
        icon: Users,
        title: "Visual Pipeline",
        desc: "Drag-and-drop Kanban board with stages: New, Qualified, Proposal, Negotiation, Won/Lost.",
      },
      {
        icon: Star,
        title: "Lead Scoring",
        desc: "Dynamic 0-100 scoring based on profile completeness, engagement, deal size, and priority.",
      },
      {
        icon: Workflow,
        title: "Workflow Automation",
        desc: "Auto-assign leads, set priority, send notifications, and create tasks based on custom rules.",
      },
      {
        icon: Mail,
        title: "Email Integration",
        desc: "Send emails with templates, track opens, and manage follow-ups directly from the CRM.",
      },
      {
        icon: MessageSquare,
        title: "WhatsApp Integration",
        desc: "Share quotes, catalogs, and messages via WhatsApp with pre-built templates.",
      },
      {
        icon: Calendar,
        title: "Activity Calendar",
        desc: "Visual calendar for all lead activities, follow-ups, tasks, and deadlines.",
      },
      {
        icon: FileText,
        title: "Quote Management",
        desc: "Create, compare, and version quotes with PDF/DOCX export and email sharing.",
      },
      {
        icon: BarChart3,
        title: "CRM Analytics",
        desc: "Team performance, lead source analysis, conversion rates, and pipeline value reports.",
      },
    ],
  },
  {
    id: "inventory",
    icon: Package,
    title: "Inventory Management",
    subtitle: "Complete control over your products, stock levels, and catalogs",
    color: "emerald",
    gradient: "from-emerald-500 to-emerald-600",
    screenshot: "/screenshots/capture-v3/inventory.png",
    screenshotAlt: "BizFlow inventory — product catalogue with SKUs, categories, live stock levels and low-stock highlighting",
    features: [
      {
        icon: Package,
        title: "Product Master",
        desc: "Comprehensive product data: pricing tiers, HSN codes, dimensions, material grades, and images.",
      },
      {
        icon: BarChart3,
        title: "Stock Tracking",
        desc: "Real-time stock levels with low-stock alerts, reorder points, and safety stock management.",
      },
      {
        icon: ScanBarcode,
        title: "Barcode Scanning",
        desc: "Scan barcodes to quickly identify products and perform inventory operations on mobile.",
      },
      {
        icon: FileSpreadsheet,
        title: "Catalog Generation",
        desc: "Create professional product catalogs as PDFs with images, specs, and pricing for sharing.",
      },
    ],
  },
  {
    id: "sales",
    icon: FileText,
    title: "Sales & Invoicing",
    subtitle: "GST-compliant invoicing with professional document generation",
    color: "violet",
    gradient: "from-violet-500 to-violet-600",
    screenshot: "/screenshots/capture-v3/sales-invoices.png",
    screenshotAlt: "BizFlow invoices — outstanding, overdue, draft and paid KPIs over GST tax invoices with payment tracking",
    features: [
      {
        icon: FileText,
        title: "Tax Invoices",
        desc: "GST-compliant tax invoices with auto-calculation of CGST, SGST, and IGST.",
      },
      {
        icon: FileText,
        title: "Multiple Invoice Types",
        desc: "Tax invoice, proforma invoice, and delivery challan — each with proper formatting.",
      },
      {
        icon: FileSpreadsheet,
        title: "PDF Export",
        desc: "Professional invoices with your logo, signature, terms, and complete tax breakdown.",
      },
      {
        icon: BarChart3,
        title: "Sales Reports",
        desc: "Product-wise, customer-wise, and period-wise sales analytics with CSV export.",
      },
    ],
  },
  {
    id: "purchases",
    icon: ShoppingCart,
    title: "Purchase Management",
    subtitle: "Streamline procurement with approval workflows and supplier tracking",
    color: "orange",
    gradient: "from-orange-500 to-orange-600",
    screenshot: "/screenshots/capture-v3/purchases.png",
    screenshotAlt: "BizFlow purchases — purchase orders with approval workflow, goods-receipt progress and open-value KPIs",
    features: [
      {
        icon: ShoppingCart,
        title: "Purchase Orders",
        desc: "Create POs with full lifecycle: Draft, Submitted, Approved, Rejected, Received.",
      },
      {
        icon: ShieldCheck,
        title: "Multi-level Approvals",
        desc: "Configurable approval chain with comments, history tracking, and rejection handling.",
      },
      {
        icon: Truck,
        title: "Goods Receipt",
        desc: "Record partial/full deliveries with quality check flags and auto stock updates.",
      },
      {
        icon: FileSpreadsheet,
        title: "Supplier Ledger",
        desc: "Track supplier payments, outstanding balances, and complete transaction history.",
      },
    ],
  },
  {
    id: "manufacturing",
    icon: Factory,
    title: "Production Control & Quality",
    subtitle: "End-to-end production and quality — from BOM and work orders to inspections, NCRs and traceability",
    color: "rose",
    gradient: "from-rose-500 to-rose-600",
    screenshot: "/screenshots/capture-v3/work-orders.png",
    screenshotAlt: "BizFlow work orders — finished goods and sub-assemblies with live progress, floor status and drafts to release",
    features: [
      {
        icon: Network,
        title: "Bill of Materials",
        desc: "Multi-level BOMs with materials, operations and revisions — auto-costed and checked against live stock.",
      },
      {
        icon: Factory,
        title: "Work Orders",
        desc: "Release finished goods and sub-assemblies, track live progress and floor status, in a table or board.",
      },
      {
        icon: ShieldCheck,
        title: "Quality Overview",
        desc: "First-pass yield, rejections, quarantine and open NCRs — with pass rates and a supplier scorecard.",
      },
      {
        icon: ClipboardCheck,
        title: "Inspection Worklist",
        desc: "Incoming, in-process and final inspections in one queue, with sample size from the bound template.",
      },
      {
        icon: FileWarning,
        title: "Non-Conformance (NCR)",
        desc: "Track every reject — severity, quantity held out of stock, and rework / scrap / use-as-is disposition.",
      },
      {
        icon: Waypoints,
        title: "Control Points",
        desc: "Gate quality at receipt, first article, in-process, final and pre-dispatch — block, warn or skip-lot.",
      },
      {
        icon: FileCog,
        title: "Quality Templates",
        desc: "Reusable, versioned inspection specs — parameters, sample size and acceptance bound to products.",
      },
      {
        icon: ScanBarcode,
        title: "Lot Traceability",
        desc: "Trace any lot or serial to where it was received, inspected, produced and used — both directions.",
      },
    ],
  },
  {
    id: "more",
    icon: ClipboardCheck,
    title: "And Much More",
    subtitle: "Task management, documents, reports, notifications, and team collaboration",
    color: "cyan",
    gradient: "from-cyan-500 to-cyan-600",
    features: [
      {
        icon: ClipboardCheck,
        title: "Task Management",
        desc: "Full lifecycle tasks with assignment, deadlines, attachments, and CRM integration.",
      },
      {
        icon: FolderOpen,
        title: "Document Management",
        desc: "Google Drive-like file system with folders, upload, search, and multi-format support.",
      },
      {
        icon: Bell,
        title: "Smart Notifications",
        desc: "11 notification types with per-channel control for push and email delivery.",
      },
      {
        icon: UserCog,
        title: "Team & Permissions",
        desc: "6 preset roles with granular module-level permissions and invite-based onboarding.",
      },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                Powerful features for{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  every department
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted leading-relaxed">
                BizFlow brings together CRM, inventory, sales, purchases, production
                control &amp; quality, and task management in one unified platform. Explore
                what each module can do.
              </p>
            </div>
          </AnimatedSection>

          {/* Quick nav */}
          <AnimatedSection delay={0.2}>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {featureSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 text-sm font-medium text-muted hover:text-primary hover:border-primary/30 transition-colors shadow-sm"
                >
                  <section.icon className="h-4 w-4" />
                  {section.title.split(" &")[0].split(" And")[0]}
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Feature Sections */}
      {featureSections.map((section, sectionIndex) => (
        <section
          key={section.id}
          id={section.id}
          className={`py-20 sm:py-24 ${sectionIndex % 2 === 0 ? "bg-white" : "bg-surface"}`}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AnimatedSection>
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${section.gradient}`}
                >
                  <section.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {section.title}
                  </h2>
                  <p className="text-muted">{section.subtitle}</p>
                </div>
              </div>
            </AnimatedSection>

            {section.screenshot && (
              <AnimatedSection delay={0.1}>
                <div className="mt-8 rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/40 border border-slate-200/80 bg-white">
                  <div className="bg-slate-100 px-4 py-2.5 flex items-center gap-2 border-b border-slate-200/60">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                      <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 mx-12">
                      <div className="h-4 bg-slate-200/80 rounded-full max-w-sm mx-auto" />
                    </div>
                  </div>
                  <img
                    src={section.screenshot}
                    alt={section.screenshotAlt}
                    className="w-full"
                  />
                </div>
              </AnimatedSection>
            )}

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {section.features.map((feature, i) => (
                <AnimatedSection key={feature.title} delay={i * 0.05}>
                  <div className="bg-white rounded-xl border border-slate-200 p-5 h-full hover:shadow-md transition-shadow">
                    <feature.icon className="h-5 w-5 text-primary mb-3" />
                    <h3 className="text-sm font-semibold text-foreground mb-1.5">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-blue-700 py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-white">
              Ready to see it in action?
            </h2>
            <p className="mt-4 text-blue-100">
              Take the self-guided product tour or book a personalized demo.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-primary hover:bg-blue-50 transition-colors"
              >
                Take the Product Tour <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-8 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors"
              >
                How Pricing Works
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
