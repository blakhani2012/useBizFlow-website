"use client";

import Link from "next/link";
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
  Shield,
  Zap,
  Globe,
  Smartphone,
  ArrowRight,
  CheckCircle2,
  Star,
  PlayCircle,
} from "lucide-react";

const modules = [
  {
    icon: Users,
    title: "CRM & Lead Management",
    description:
      "Visual Kanban pipeline, lead scoring, automated workflows, email & WhatsApp integration, and quote management.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Package,
    title: "Inventory Management",
    description:
      "Product master with variants, stock tracking, barcode scanning, low-stock alerts, and catalog generation.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: FileText,
    title: "Sales & Invoicing",
    description:
      "GST-compliant tax invoices, proforma invoices, delivery challans, and professional PDF generation.",
    color: "from-violet-500 to-violet-600",
  },
  {
    icon: ShoppingCart,
    title: "Purchase Management",
    description:
      "Purchase orders with multi-level approval, goods receipt notes, supplier ledger, and payment tracking.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Factory,
    title: "Production Control & Quality",
    description:
      "Bill of Materials, work orders, inspections, non-conformance (NCR), control points, and lot traceability.",
    color: "from-rose-500 to-rose-600",
  },
  {
    icon: ClipboardCheck,
    title: "Task Management",
    description:
      "Full task lifecycle, team assignment, deadlines, attachments, and integration with CRM activities.",
    color: "from-cyan-500 to-cyan-600",
  },
];

const stats = [
  { value: "6+", label: "Core Modules" },
  { value: "170+", label: "Features" },
  { value: "GST", label: "Compliant" },
  { value: "3", label: "Platforms" },
];

const highlights = [
  "Role-based team permissions with 6 preset roles",
  "Workflow automation engine with custom rules",
  "Real-time push & email notifications",
  "Professional PDF & DOCX document generation",
  "Comprehensive analytics and reports",
  "Google Drive-like document management",
  "Barcode scanning for inventory operations",
  "Multi-tenant architecture for data isolation",
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 animate-float" />
          <div className="absolute top-60 -left-20 h-60 w-60 rounded-full bg-accent/5 animate-float-delayed" />
          <div className="absolute bottom-20 right-1/4 h-40 w-40 rounded-full bg-violet-500/5 animate-float-slow" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Above the fold — deliberately NOT wrapped in AnimatedSection so
                the LCP <h1> is painted from the server HTML, not after
                hydration. */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                <Zap className="h-4 w-4" />
                All-in-one business platform
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
                Run your entire
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {" "}business{" "}
                </span>
                from one place
              </h1>
              <p className="mt-6 text-lg text-muted max-w-xl leading-relaxed">
                CRM, Inventory, Sales, Purchases, Production Control, and Task Management —
                everything your growing business needs, beautifully integrated in one platform.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact?interest=Product Demo"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary-dark transition-all hover:shadow-xl hover:shadow-primary/30"
                >
                  Book a Free Demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/demo"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-8 py-3.5 text-base font-semibold text-foreground hover:bg-surface transition-colors"
                >
                  <PlayCircle className="h-5 w-5 text-primary" />
                  Tour 27 Real Product Screens
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-muted">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Modular — pay only for what you use
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Free 30-min demo
                </span>
              </div>
            </div>

            {/* Also above the fold on desktop (right-hand grid column) — static
                for the same reason. */}
            <div>
              <Link href="/demo" className="relative block group">
                <div className="rounded-2xl bg-white shadow-2xl shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
                  <div className="bg-slate-100 px-4 py-3 flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-400" />
                      <div className="h-3 w-3 rounded-full bg-yellow-400" />
                      <div className="h-3 w-3 rounded-full bg-green-400" />
                    </div>
                    <div className="flex-1 mx-8">
                      <div className="h-5 bg-slate-200 rounded-full max-w-xs mx-auto" />
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src="/screenshots/capture-v3/crm.png"
                      alt="BizFlow CRM dashboard — pipeline value, win rate, conversion, today's follow-ups, and a live pipeline snapshot"
                      className="w-full"
                    />
                    {/* Hover overlay → product tour */}
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-colors flex items-center justify-center">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                        <PlayCircle className="h-5 w-5" />
                        Take the Product Tour
                      </span>
                    </div>
                  </div>
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg border border-slate-200 p-3 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs text-muted">This month</div>
                    <div className="text-sm font-bold text-foreground">+24% Growth</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-muted">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Everything you need to run your business
              </h2>
              <p className="mt-4 text-lg text-muted">
                Six powerful modules, one unified platform. No more juggling between tools.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod, i) => (
              <AnimatedSection key={mod.title} delay={i * 0.1}>
                <div className="group relative bg-white rounded-2xl border border-slate-200 p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${mod.color} mb-4`}
                  >
                    <mod.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {mod.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {mod.description}
                  </p>
                  <Link
                    href="/features"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Learn more <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Built for real businesses, not just demos
              </h2>
              <p className="mt-4 text-lg text-slate-400 leading-relaxed">
                BizFlow comes packed with enterprise-grade features that your team
                will actually use. From day one.
              </p>
              <div className="mt-10 grid sm:grid-cols-2 gap-4">
                {highlights.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Globe, label: "Web, iOS & Android", desc: "One codebase, all platforms" },
                  { icon: Shield, label: "Enterprise Security", desc: "Role-based access control" },
                  { icon: Bell, label: "Smart Notifications", desc: "Push, email & in-app alerts" },
                  { icon: Smartphone, label: "Mobile-First", desc: "Optimized for on-the-go" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-5"
                  >
                    <item.icon className="h-8 w-8 text-primary-light mb-3" />
                    <div className="text-sm font-semibold text-white">{item.label}</div>
                    <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonial placeholder */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Built with our pilot businesses
              </h2>
              <p className="mt-4 text-lg text-muted">
                Early-access feedback from the businesses BizFlow was shaped
                around — named case studies coming soon.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "BizFlow replaced 4 different tools we were using. Everything from CRM to invoicing is now in one place.",
                name: "Manufacturing pilot",
                role: "Director, early-access customer",
              },
              {
                quote:
                  "The GST compliance features saved us hours every month. The invoice generation is professional and fast.",
                name: "Trading pilot",
                role: "Finance head, early-access customer",
              },
              {
                quote:
                  "Our sales team loves the CRM pipeline view. Lead scoring and automation have improved our conversion rate.",
                name: "Services pilot",
                role: "Sales head, early-access customer",
              },
            ].map((testimonial, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-surface rounded-2xl p-6 border border-slate-100">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="h-4 w-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {testimonial.name[0]}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-muted">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-blue-700 py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Ready to streamline your business?
            </h2>
            <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
              Run CRM, sales, purchases, inventory, and projects in one place.
              Book a free demo — we&apos;ll tailor it to the modules you need.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?interest=Product Demo"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-primary shadow-lg hover:bg-blue-50 transition-colors"
              >
                Book a Free Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <PlayCircle className="h-5 w-5" />
                Take the Product Tour
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
