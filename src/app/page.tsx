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
    title: "Manufacturing",
    description:
      "Bill of Materials, multi-stage work orders, material requirement planning, and production tracking.",
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
            <AnimatedSection>
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
                CRM, Inventory, Sales, Purchases, Manufacturing, and Task Management —
                everything your growing business needs, beautifully integrated in one platform.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="https://app.usebizflow.com"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary-dark transition-all hover:shadow-xl hover:shadow-primary/30"
                >
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/features"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-8 py-3.5 text-base font-semibold text-foreground hover:bg-surface transition-colors"
                >
                  Explore Features
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-muted">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Free tier available
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  No credit card required
                </span>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="relative">
                {/* Placeholder illustration - dashboard mockup */}
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
                  <div className="p-6 space-y-4">
                    {/* Mini dashboard mockup */}
                    <div className="grid grid-cols-3 gap-3">
                      {["Revenue", "Leads", "Orders"].map((label, i) => (
                        <div key={label} className="bg-slate-50 rounded-xl p-3">
                          <div className="text-xs text-muted mb-1">{label}</div>
                          <div className="text-lg font-bold text-foreground">
                            {["$48.2K", "142", "89"][i]}
                          </div>
                          <div className="mt-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                ["bg-blue-500", "bg-emerald-500", "bg-violet-500"][i]
                              }`}
                              style={{ width: `${[72, 58, 85][i]}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Chart placeholder */}
                    <div className="bg-slate-50 rounded-xl p-4 h-36 flex items-end gap-1.5">
                      {[40, 55, 35, 70, 60, 80, 65, 90, 75, 95, 85, 70].map(
                        (h, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-primary to-primary-light rounded-t-sm opacity-80"
                            style={{ height: `${h}%` }}
                          />
                        )
                      )}
                    </div>
                    {/* Table rows placeholder */}
                    <div className="space-y-2">
                      {[1, 2, 3].map((row) => (
                        <div
                          key={row}
                          className="flex items-center gap-3 bg-slate-50 rounded-lg p-2.5"
                        >
                          <div className="h-8 w-8 rounded-full bg-slate-200" />
                          <div className="flex-1 space-y-1.5">
                            <div className="h-3 bg-slate-200 rounded-full w-3/4" />
                            <div className="h-2 bg-slate-100 rounded-full w-1/2" />
                          </div>
                          <div className="h-6 w-16 bg-emerald-100 rounded-full" />
                        </div>
                      ))}
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
              </div>
            </AnimatedSection>
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
                Trusted by growing businesses
              </h2>
              <p className="mt-4 text-lg text-muted">
                See what business owners are saying about BizFlow.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "BizFlow replaced 4 different tools we were using. Everything from CRM to invoicing is now in one place.",
                name: "Rajesh Patel",
                role: "Director, Manufacturing Co.",
              },
              {
                quote:
                  "The GST compliance features saved us hours every month. The invoice generation is professional and fast.",
                name: "Priya Sharma",
                role: "CFO, Trading Business",
              },
              {
                quote:
                  "Our sales team loves the CRM pipeline view. Lead scoring and automation have improved our conversion rate.",
                name: "Amit Kumar",
                role: "Sales Head, Services Firm",
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
              Join hundreds of businesses that use BizFlow to manage their operations.
              Start with our free tier — no credit card required.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.usebizflow.com"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-primary shadow-lg hover:bg-blue-50 transition-colors"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Book a Demo
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
