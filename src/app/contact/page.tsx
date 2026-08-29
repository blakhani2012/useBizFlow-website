"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageSquare,
  CheckCircle2,
  Loader2,
} from "lucide-react";

// Get your free access key at https://web3forms.com
// Enter support@usebizflow.com to receive form submissions via email
const WEB3FORMS_ACCESS_KEY = "e5167ec0-8ffb-4b28-a9bd-6ea09ad337e9";

function ContactPageInner() {
  // Prefill from links like /contact?interest=Custom Pricing&modules=CRM,...
  // (set by the pricing page module picker and demo CTAs)
  const searchParams = useSearchParams();
  const modulesParam = searchParams.get("modules");

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [interest, setInterest] = useState(searchParams.get("interest") ?? "");
  const [message, setMessage] = useState(
    modulesParam
      ? `Hi, I'd like a demo of BizFlow. We're interested in these modules: ${modulesParam}.`
      : ""
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New Inquiry from BizFlow Website");
    formData.append("from_name", "BizFlow Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setError("Network error. Please try again or email us at support@usebizflow.com");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                Get in{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  touch
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted">
                Have questions? Want a demo? We&apos;d love to hear from you.
                Our team typically responds within 24 hours.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Content */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Let&apos;s talk about your business
                </h2>
                <p className="text-muted mb-8">
                  Whether you&apos;re exploring BizFlow for the first time or ready to
                  get started, we&apos;re here to help you find the right solution.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        Email
                      </div>
                      <div className="text-sm text-muted">
                        support@usebizflow.com
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        Phone
                      </div>
                      <div className="text-sm text-muted">
                        +91 98765 43210
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        Office
                      </div>
                      <div className="text-sm text-muted">
                        Finscape Innovation
                        <br />
                        Ahmedabad, Gujarat, India
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        Business Hours
                      </div>
                      <div className="text-sm text-muted">
                        Mon - Sat, 10:00 AM - 7:00 PM IST
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick options */}
                <div className="mt-10 p-5 bg-surface rounded-xl border border-slate-100">
                  <h3 className="text-sm font-semibold text-foreground mb-3">
                    Quick options
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      Book a 30-min product demo
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      Get a custom pricing quote
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <MessageSquare className="h-4 w-4 text-primary" />
                      Talk to our implementation team
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <AnimatedSection delay={0.1}>
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        Thank you for reaching out!
                      </h3>
                      <p className="text-muted">
                        We&apos;ve received your message and will get back to you within
                        24 hours. Check your email for a confirmation.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Honeypot for spam prevention */}
                      <input type="checkbox" name="botcheck" className="hidden" />

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">
                            First Name *
                          </label>
                          <input
                            type="text"
                            name="first_name"
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-foreground placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">
                            Last Name *
                          </label>
                          <input
                            type="text"
                            name="last_name"
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-foreground placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-foreground placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                          placeholder="john@company.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="company"
                          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-foreground placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                          placeholder="Acme Inc."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-foreground placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          What are you interested in? *
                        </label>
                        <select
                          name="interest"
                          required
                          value={interest}
                          onChange={(e) => setInterest(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                        >
                          <option value="">Select an option</option>
                          <option value="Product Demo">Product Demo</option>
                          <option value="Free Trial">Free Trial</option>
                          <option value="Custom Pricing">Custom Pricing</option>
                          <option value="Technical Support">Technical Support</option>
                          <option value="Partnership">Partnership</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          required
                          rows={4}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-foreground placeholder-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                          placeholder="Tell us about your business and what you're looking for..."
                        />
                      </div>

                      {error && (
                        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary-dark transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </button>

                      <p className="text-xs text-center text-muted">
                        By submitting this form, you agree to our{" "}
                        <Link href="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>{" "}
                        and{" "}
                        <Link href="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>
                        .
                      </p>
                    </form>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={null}>
      <ContactPageInner />
    </Suspense>
  );
}
