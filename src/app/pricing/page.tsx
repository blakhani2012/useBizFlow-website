"use client";

import AnimatedSection from "@/components/AnimatedSection";
import { CheckCircle2, ArrowRight, HelpCircle } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    description: "Perfect for solopreneurs getting started",
    highlight: false,
    features: [
      "1 user",
      "CRM with up to 100 leads",
      "Basic inventory (50 products)",
      "10 invoices/month",
      "Email templates",
      "Basic reports",
      "Mobile & web access",
      "Community support",
    ],
    cta: "Get Started Free",
  },
  {
    name: "Pro",
    price: "999",
    period: "/month",
    description: "For growing teams that need more power",
    highlight: true,
    features: [
      "Up to 5 users",
      "Unlimited leads & contacts",
      "Unlimited products",
      "Unlimited invoices",
      "Workflow automation",
      "Email & WhatsApp integration",
      "Advanced CRM analytics",
      "Document management",
      "Purchase management",
      "Barcode scanning",
      "Priority email support",
    ],
    cta: "Start 14-Day Trial",
  },
  {
    name: "Business",
    price: "2,499",
    period: "/month",
    description: "For established businesses needing everything",
    highlight: false,
    features: [
      "Unlimited users",
      "Everything in Pro, plus:",
      "Manufacturing & BOM",
      "Multi-level PO approvals",
      "Custom fields",
      "Advanced workflow rules",
      "GST reports & compliance",
      "API access",
      "Custom branding",
      "Dedicated account manager",
      "Phone & chat support",
    ],
    cta: "Start 14-Day Trial",
  },
];

const faqs = [
  {
    q: "Can I switch plans later?",
    a: "Yes, you can upgrade or downgrade at any time. When upgrading, you get immediate access to new features. When downgrading, the change takes effect at your next billing cycle.",
  },
  {
    q: "Is there a free trial for paid plans?",
    a: "Yes! Both Pro and Business plans come with a 14-day free trial. No credit card required to start.",
  },
  {
    q: "What happens to my data if I downgrade?",
    a: "Your data is never deleted. If you exceed the free plan limits after downgrading, your existing data remains accessible but you won't be able to add new entries until you're within limits.",
  },
  {
    q: "Do you offer discounts for annual billing?",
    a: "Yes, annual plans come with a 20% discount. Contact us for custom enterprise pricing for larger teams.",
  },
  {
    q: "Is GST included in the pricing?",
    a: "The prices shown are exclusive of GST. 18% GST will be added at checkout for Indian customers.",
  },
  {
    q: "Can I get a custom plan for my enterprise?",
    a: "Absolutely. Contact our sales team for custom pricing, dedicated infrastructure, and tailored features for your organization.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                Simple, transparent{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  pricing
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted">
                Start free, scale as you grow. No hidden fees, no surprises.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-white py-4 -mt-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 -mt-8">
            {plans.map((plan, i) => (
              <AnimatedSection key={plan.name} delay={i * 0.1}>
                <div
                  className={`relative rounded-2xl p-8 h-full flex flex-col ${
                    plan.highlight
                      ? "bg-primary text-white shadow-xl shadow-primary/20 ring-2 ring-primary scale-105"
                      : "bg-white border border-slate-200 shadow-sm"
                  }`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <div>
                    <h3
                      className={`text-lg font-semibold ${
                        plan.highlight ? "text-white" : "text-foreground"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`mt-1 text-sm ${
                        plan.highlight ? "text-blue-100" : "text-muted"
                      }`}
                    >
                      {plan.description}
                    </p>
                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="text-xs">&#8377;</span>
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span
                        className={`text-sm ${
                          plan.highlight ? "text-blue-200" : "text-muted"
                        }`}
                      >
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-8 space-y-3 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className={`h-4 w-4 mt-0.5 shrink-0 ${
                            plan.highlight ? "text-blue-200" : "text-emerald-500"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            plan.highlight ? "text-blue-50" : "text-muted"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://app.usebizflow.com"
                    className={`mt-8 block w-full rounded-full py-3 text-center text-sm font-semibold transition-colors ${
                      plan.highlight
                        ? "bg-white text-primary hover:bg-blue-50"
                        : "bg-primary text-white hover:bg-primary-dark"
                    }`}
                  >
                    {plan.cta}
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-20 sm:py-28 mt-12">
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
              Start your free trial today
            </h2>
            <p className="mt-3 text-blue-100">
              No credit card required. Get started in under 2 minutes.
            </p>
            <a
              href="https://app.usebizflow.com"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-primary hover:bg-blue-50 transition-colors"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
