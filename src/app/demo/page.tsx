import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import ProductTour from "@/components/ProductTour";
import { ArrowRight, MousePointerClick } from "lucide-react";

export const metadata: Metadata = {
  title: "Product Tour — BizFlow",
  description:
    "Take a self-guided tour of BizFlow: production control & quality, CRM pipeline, work orders, invoicing, purchases, tasks and inventory — see the real product before you book a demo.",
};

export default function DemoPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 sm:py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-primary/5 animate-float" />
          <div className="absolute top-40 -left-24 h-56 w-56 rounded-full bg-accent/5 animate-float-delayed" />
        </div>
        {/* The hero is this page's LCP element, so it renders statically rather
            than inside AnimatedSection — that starts at opacity 0 and keeps the
            headline invisible until hydration. Below-the-fold sections keep
            their entrance animation. */}
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <MousePointerClick className="h-4 w-4" />
              Self-guided tour · Real product screens
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              See BizFlow{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                in action
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted leading-relaxed">
              Walk through the actual product — from production control and
              quality to the CRM pipeline, invoicing, purchases and inventory.
              Click any screen on the left, or sit back and let it play.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive tour */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <ProductTour />
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-blue-700 py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-white">
              Want to see it on your business?
            </h2>
            <p className="mt-3 text-blue-100 max-w-2xl mx-auto">
              Book a free 30-minute live demo — we&apos;ll walk through your
              workflows, answer questions, and tailor a quote to the modules you
              need.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact?interest=Product Demo"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-primary hover:bg-blue-50 transition-colors"
              >
                Book a Free Demo <ArrowRight className="h-4 w-4" />
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
