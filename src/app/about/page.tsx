"use client";

import AnimatedSection from "@/components/AnimatedSection";
import {
  Target,
  Heart,
  Lightbulb,
  ArrowRight,
  Users,
  Globe,
  Zap,
} from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: Target,
    title: "Simplicity First",
    description:
      "We believe business software should be intuitive, not intimidating. Every feature is designed to reduce complexity, not add it.",
  },
  {
    icon: Heart,
    title: "Built for India",
    description:
      "GST compliance, Indian accounting standards, and local business workflows baked in from day one. Global ready, locally rooted.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Innovation",
    description:
      "We ship improvements every week. Our roadmap is driven by real feedback from real businesses using BizFlow daily.",
  },
  {
    icon: Users,
    title: "Customer Success",
    description:
      "Your success is our success. We provide hands-on onboarding, responsive support, and proactive guidance to help you grow.",
  },
];

const milestones = [
  {
    year: "2023",
    title: "The Beginning",
    description:
      "Started as an internal tool at Finscape Innovation to manage our own business operations more efficiently.",
  },
  {
    year: "2024",
    title: "Product Evolution",
    description:
      "Expanded from a simple invoicing tool to a full ERP platform with CRM, inventory, and manufacturing modules.",
  },
  {
    year: "2025",
    title: "SaaS Launch",
    description:
      "Transformed into a multi-tenant SaaS platform, opening BizFlow to businesses of all sizes across India.",
  },
  {
    year: "2026",
    title: "Scaling Up",
    description:
      "Continuing to add AI-powered features, deeper integrations, and expanding to new markets.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                We&apos;re building the{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  future of business management
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted leading-relaxed">
                BizFlow was born from a simple idea: growing businesses in India
                deserve enterprise-grade tools without the enterprise-grade complexity
                or cost.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  BizFlow started as an internal tool at Finscape Innovation. We were
                  tired of juggling between a CRM, an invoicing tool, a separate
                  inventory system, and spreadsheets for everything else.
                </p>
                <p>
                  We realized that thousands of small and mid-sized businesses in India
                  face the same challenge. They need powerful software but can&apos;t afford
                  or don&apos;t need the complexity of SAP or Oracle.
                </p>
                <p>
                  So we built BizFlow — an all-in-one platform that brings CRM,
                  inventory, sales, purchases, manufacturing, and task management
                  together in one beautiful, affordable package.
                </p>
                <p>
                  Today, BizFlow is a multi-tenant SaaS platform serving businesses
                  across manufacturing, trading, and services industries. And we&apos;re
                  just getting started.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              {/* Placeholder illustration */}
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-slate-100">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Globe, label: "3 Platforms", sub: "Web, iOS, Android" },
                    { icon: Zap, label: "6+ Modules", sub: "All integrated" },
                    { icon: Users, label: "Growing", sub: "Customer base" },
                    { icon: Heart, label: "Made in", sub: "India" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl p-5 shadow-sm border border-slate-100"
                    >
                      <item.icon className="h-8 w-8 text-primary mb-2" />
                      <div className="text-lg font-bold text-foreground">
                        {item.label}
                      </div>
                      <div className="text-xs text-muted">{item.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground">Our Journey</h2>
              <p className="mt-3 text-muted">
                From internal tool to a full-featured SaaS platform.
              </p>
            </div>
          </AnimatedSection>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />
            <div className="space-y-10">
              {milestones.map((milestone, i) => (
                <AnimatedSection key={milestone.year} delay={i * 0.1}>
                  <div className="relative pl-12">
                    <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {milestone.year.slice(2)}
                      </span>
                    </div>
                    <div className="bg-white rounded-xl border border-slate-200 p-5">
                      <div className="text-xs font-semibold text-primary mb-1">
                        {milestone.year}
                      </div>
                      <h3 className="text-base font-semibold text-foreground mb-1">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-muted">{milestone.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-foreground">What we believe</h2>
              <p className="mt-3 text-muted">
                The principles that guide everything we build.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <div className="bg-surface rounded-xl p-6 border border-slate-100 h-full">
                  <value.icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {value.description}
                  </p>
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
              Ready to join us?
            </h2>
            <p className="mt-3 text-blue-100">
              Start using BizFlow today and see the difference.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-primary hover:bg-blue-50 transition-colors"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-8 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
