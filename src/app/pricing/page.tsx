"use client";

import { useState } from "react";
import AnimatedSection from "@/components/AnimatedSection";
import {
  Users,
  Package,
  FileText,
  ShoppingCart,
  Factory,
  ClipboardCheck,
  ArrowRight,
  HelpCircle,
  CalendarCheck,
  Puzzle,
  Receipt,
  Check,
  Smartphone,
  ShieldCheck,
  Bell,
  BarChart3,
  LifeBuoy,
  RefreshCw,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const modules = [
  {
    icon: Users,
    name: "CRM & Lead Management",
    description: "Visual pipeline, lead scoring, email & WhatsApp, quotes",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    icon: Package,
    name: "Inventory Management",
    description: "Product master, stock tracking, barcodes, catalogs",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    icon: FileText,
    name: "Sales & Invoicing",
    description: "GST invoices, proforma, delivery challans, PDF export",
    gradient: "from-violet-500 to-violet-600",
  },
  {
    icon: ShoppingCart,
    name: "Purchase Management",
    description: "POs, multi-level approvals, goods receipt, supplier ledger",
    gradient: "from-orange-500 to-orange-600",
  },
  {
    icon: Factory,
    name: "Production Control & Quality",
    description: "BOM, work orders, inspections, NCR, control points, lot traceability",
    gradient: "from-rose-500 to-rose-600",
  },
  {
    icon: ClipboardCheck,
    name: "Task Management",
    description: "Team tasks, deadlines, attachments, CRM integration",
    gradient: "from-cyan-500 to-cyan-600",
  },
];

const steps = [
  {
    icon: CalendarCheck,
    title: "Book a free demo",
    description:
      "A 30-minute walkthrough of BizFlow on your use cases — no commitment, no credit card, no sales pressure.",
  },
  {
    icon: Puzzle,
    title: "Pick your modules",
    description:
      "Choose only the modules your business needs today. Start small and switch on more as you grow.",
  },
  {
    icon: Receipt,
    title: "Get your tailored quote",
    description:
      "We price based on the modules you use and your team size — so you never pay for features you don't need.",
  },
];

const included = [
  { icon: Smartphone, label: "Web, iOS & Android apps" },
  { icon: ShieldCheck, label: "Role-based access control" },
  { icon: Bell, label: "Push & email notifications" },
  { icon: BarChart3, label: "Analytics & reports" },
  { icon: LifeBuoy, label: "Onboarding & support" },
  { icon: RefreshCw, label: "Regular product updates" },
];

const faqs = [
  {
    q: "Why don't you list prices on this page?",
    a: "Because no two businesses use BizFlow the same way. A trading business that needs Sales & Inventory shouldn't pay the same as a manufacturer using every module. After a short demo, we quote you only for the modules and seats you actually need.",
  },
  {
    q: "What decides my price?",
    a: "Two things: which modules you switch on, and how many team members will use BizFlow. That's it — no per-feature surprises, no hidden fees.",
  },
  {
    q: "Is the demo really free? Is there any commitment?",
    a: "Yes, completely free and commitment-free. It's a 30-minute session where we walk through BizFlow on scenarios from your business, answer your questions, and only then talk pricing.",
  },
  {
    q: "Can I add or remove modules later?",
    a: "Absolutely. BizFlow is modular by design — you can switch on Manufacturing or Purchases later as your business grows, and your price adjusts accordingly.",
  },
  {
    q: "Do you offer annual billing discounts?",
    a: "Yes, annual plans come at a discount over monthly billing. We'll include both options in your quote so you can compare.",
  },
  {
    q: "What about enterprise or custom requirements?",
    a: "For larger teams we offer custom onboarding, data migration assistance, dedicated support, and tailored agreements. Mention it when you book your demo and we'll bring the right people to the call.",
  },
];

export default function PricingPage() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleModule = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((m) => m !== name) : [...prev, name]
    );
  };

  const demoHref =
    selected.length > 0
      ? `/contact?interest=Custom Pricing&modules=${encodeURIComponent(
          selected.join(", ")
        )}`
      : "/contact?interest=Product Demo";

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20 sm:py-28">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-primary/5 animate-float" />
          <div className="absolute top-40 -left-24 h-56 w-56 rounded-full bg-accent/5 animate-float-delayed" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                <Sparkles className="h-4 w-4" />
                Modular pricing — pay only for what you use
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
                Pricing that fits{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  your business
                </span>
                , not a plan
              </h1>
              <p className="mt-6 text-lg text-muted leading-relaxed">
                Every business is different — so we don&apos;t do one-size-fits-all
                plans. Pick the modules you need, see BizFlow in a free demo, and
                get a quote tailored to your team.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-foreground">
                How your price is decided
              </h2>
              <p className="mt-3 text-muted">
                Three simple steps — from first look to a quote built around you.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {steps.map((step, i) => (
              <AnimatedSection key={step.title} delay={i * 0.1}>
                <div className="relative bg-white rounded-2xl border border-slate-200 p-8 h-full hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                  <div className="absolute -top-4 left-8 h-8 w-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center shadow-lg shadow-primary/30">
                    {i + 1}
                  </div>
                  <step.icon className="h-8 w-8 text-primary mb-4 mt-2" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Module picker */}
      <section className="bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-foreground">
                Which modules does your business need?
              </h2>
              <p className="mt-3 text-muted">
                Select the modules you&apos;re interested in — we&apos;ll shape
                your demo and quote around them.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((mod, i) => {
              const isSelected = selected.includes(mod.name);
              return (
                <AnimatedSection key={mod.name} delay={i * 0.05}>
                  <button
                    type="button"
                    onClick={() => toggleModule(mod.name)}
                    aria-pressed={isSelected}
                    className={`group relative w-full text-left rounded-2xl p-6 h-full transition-all duration-200 ${
                      isSelected
                        ? "bg-white ring-2 ring-primary shadow-lg shadow-primary/10"
                        : "bg-white border border-slate-200 hover:border-primary/40 hover:shadow-md"
                    }`}
                  >
                    <div
                      className={`absolute top-4 right-4 h-6 w-6 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-primary text-white"
                          : "border-2 border-slate-300 text-transparent group-hover:border-primary/50"
                      }`}
                    >
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </div>
                    <div
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${mod.gradient} mb-4`}
                    >
                      <mod.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-1 pr-8">
                      {mod.name}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {mod.description}
                    </p>
                  </button>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Sticky-feeling summary bar */}
          <AnimatedSection delay={0.15}>
            <div className="mt-10 rounded-2xl bg-slate-900 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="text-center sm:text-left">
                <div className="text-white font-semibold text-lg">
                  {selected.length === 0
                    ? "Not sure yet? No problem."
                    : `${selected.length} module${
                        selected.length > 1 ? "s" : ""
                      } selected`}
                </div>
                <p className="text-slate-400 text-sm mt-1">
                  {selected.length === 0
                    ? "Book a demo and we'll help you figure out the right mix."
                    : "We'll tailor your demo and quote to these modules."}
                </p>
              </div>
              <Link
                href={demoHref}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary-dark transition-all"
              >
                Book a Free Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Always included */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl font-bold text-foreground">
                Always included, whatever you choose
              </h2>
              <p className="mt-3 text-muted">
                Every BizFlow setup ships with the essentials — at no extra cost.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {included.map((item, i) => (
              <AnimatedSection key={item.label} delay={i * 0.05}>
                <div className="bg-surface rounded-xl border border-slate-100 p-5 text-center h-full">
                  <item.icon className="h-6 w-6 text-primary mx-auto mb-3" />
                  <div className="text-sm font-medium text-foreground">
                    {item.label}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">
                Frequently asked questions
              </h2>
              <p className="mt-3 text-muted">
                Can&apos;t find what you&apos;re looking for?{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  Contact us
                </Link>
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {faq.q}
                      </h3>
                      <p className="mt-2 text-sm text-muted leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-blue-700 py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-white">
              See BizFlow in action first
            </h2>
            <p className="mt-3 text-blue-100">
              Take the self-guided product tour, or book a live demo with our team.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?interest=Product Demo"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-primary hover:bg-blue-50 transition-colors"
              >
                Book a Free Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-8 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors"
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
