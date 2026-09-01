"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AnimatedSection from "@/components/AnimatedSection";
import { ENQUIRY_FORM_SLUG, readAttribution } from "@/lib/attribution";
import {
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Clock,
  MessageSquare,
  CheckCircle2,
  Loader2,
} from "lucide-react";

// Get your free access key at https://web3forms.com
// Enter support@usebizflow.com to receive form submissions via email
const WEB3FORMS_ACCESS_KEY = "e5167ec0-8ffb-4b28-a9bd-6ea09ad337e9";

const SUPPORT_EMAIL = "support@usebizflow.com";

/*
 * TODO: ADD THE REAL BUSINESS WHATSAPP NUMBER.
 *
 * The page used to publish the well-known dummy Indian mobile number as our
 * phone contact. That block is gone, and nothing here invents a replacement.
 *
 * Set this to the real, WhatsApp-enabled business number in full international
 * form — country code first, digits only, no "+" and no spaces, which is the
 * format wa.me requires (an Indian mobile becomes "91" followed by its ten
 * digits). While it is empty the WhatsApp block does not render at all, so
 * visitors are never shown a contact route that does not work — email stays
 * the published channel until the number lands.
 */
const WHATSAPP_NUMBER: string = "";

// Pre-filled first message so the enquiry arrives with context attached.
const WHATSAPP_PREFILL =
  "Hi BizFlow, I'd like to know more about BizFlow for my business.";

const whatsappHref = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_PREFILL)}`
  : null;

// Reused so every focusable contact link gets the same visible focus ring.
const CONTACT_LINK_CLASS =
  "rounded-sm text-sm text-primary underline underline-offset-2 transition-colors hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

/**
 * Creates the CRM lead via the publicEnquiry Cloud Function, reached through
 * the /api/enquiry rewrite in firebase.json.
 *
 * This runs *alongside* the Web3Forms email rather than replacing it: if the
 * CRM write fails the enquiry still reaches a human, so a Firestore outage or
 * a missing enquiry-form slug can never cost us a lead.
 */
async function createCrmLead(formData: FormData): Promise<void> {
  const attribution = readAttribution();
  const name = [formData.get("first_name"), formData.get("last_name")]
    .map((part) => String(part ?? "").trim())
    .filter(Boolean)
    .join(" ");

  // "interest" is an enquiry type (Product Demo, Free Trial, ...), not a
  // product, so it is folded into the note rather than sent as `product`:
  // publicEnquiry puts `product` straight into the lead's productInterest,
  // which is a dimension of the CRM's Product Performance report and would
  // otherwise gain fake products that absorb a share of won revenue.
  const interest = String(formData.get("interest") ?? "").trim();
  const body = String(formData.get("message") ?? "").trim();

  const payload: Record<string, string> = {
    // Identifies our tenant; the channel comes from the UTM tags below.
    slug: ENQUIRY_FORM_SLUG,
    name,
    phone: String(formData.get("phone") ?? ""),
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? ""),
    message: interest ? `Interest: ${interest}\n\n${body}` : body,
    // publicEnquiry's honeypot field, mirroring the form's own bot check so a
    // bot that trips one trips both.
    website: formData.get("botcheck") ? "bot" : "",
  };

  const utm: ReadonlyArray<readonly [string, string | undefined]> = [
    ["utm_source", attribution.utmSource],
    ["utm_medium", attribution.utmMedium],
    ["utm_campaign", attribution.utmCampaign],
    ["utm_content", attribution.utmContent],
    ["utm_term", attribution.utmTerm],
    ["landing_path", attribution.landingPath],
    ["referrer", attribution.referrer],
  ];
  for (const [key, value] of utm) {
    if (value) payload[key] = value;
  }

  await fetch("/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

type FieldName =
  | "first_name"
  | "last_name"
  | "email"
  | "company"
  | "phone"
  | "interest"
  | "message";

type FieldErrors = Partial<Record<FieldName, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Optional leading "+", then 7-15 digits (E.164), once separators are stripped.
const PHONE_PATTERN = /^\+?\d{7,15}$/;

/** Returns the message to show for a field, or "" when the value is fine. */
function validateField(name: FieldName, rawValue: string): string {
  const value = rawValue.trim();

  switch (name) {
    case "first_name":
      return value ? "" : "Please enter your first name.";
    case "last_name":
      return value ? "" : "Please enter your last name.";
    case "email":
      if (!value) return "Please enter your work email.";
      return EMAIL_PATTERN.test(value)
        ? ""
        : "Please enter a valid email address, like you@company.com.";
    case "phone": {
      if (!value) return "Please enter a phone number we can reach you on.";
      return PHONE_PATTERN.test(value.replace(/[\s().-]/g, ""))
        ? ""
        : "Please enter a valid phone number, including the country code.";
    }
    case "interest":
      return value ? "" : "Please choose what you are interested in.";
    case "message":
      return value ? "" : "Please tell us a little about what you need.";
    case "company":
      // Optional field.
      return "";
  }
}

function ContactPageInner() {
  // Prefill from links like /contact?interest=Custom Pricing&modules=CRM,...
  // (set by the pricing page module picker and demo CTAs)
  const searchParams = useSearchParams();
  const modulesParam = searchParams.get("modules");

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [interest, setInterest] = useState(searchParams.get("interest") ?? "");
  const [message, setMessage] = useState(
    modulesParam
      ? `Hi, I'd like a demo of BizFlow. We're interested in these modules: ${modulesParam}.`
      : ""
  );

  const errorRef = useRef<HTMLDivElement>(null);

  // Move focus to the submit error so screen-reader and keyboard users land on
  // the failure instead of being left at the (now unchanged) submit button.
  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  const setFieldError = (name: FieldName, value: string) =>
    setFieldErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));

  // Validate as the visitor leaves each field, not only on submit.
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setFieldError(e.target.name as FieldName, e.target.value);

  // Once a field is flagged, clear the flag as soon as typing fixes it.
  const revalidateIfFlagged = (name: FieldName, value: string) => {
    if (fieldErrors[name]) setFieldError(name, value);
  };

  /** `aria-describedby` for a field: its hint (if any) plus its error (if shown). */
  const describedBy = (name: FieldName, hintId?: string) =>
    [hintId, fieldErrors[name] ? `${name}-error` : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

  const fieldClass = (name: FieldName, extra = "") =>
    [
      "w-full rounded-lg border px-4 py-2.5 text-sm text-foreground placeholder-slate-400 outline-none transition-colors focus-visible:ring-2",
      fieldErrors[name]
        ? "border-red-400 focus-visible:border-red-500 focus-visible:ring-red-200"
        : "border-slate-300 focus-visible:border-primary focus-visible:ring-primary/40",
      extra,
    ]
      .filter(Boolean)
      .join(" ");

  const fieldErrorNode = (name: FieldName) =>
    fieldErrors[name] ? (
      <p id={`${name}-error`} className="mt-1.5 text-xs text-red-600">
        {fieldErrors[name]}
      </p>
    ) : null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New Inquiry from BizFlow Website");
    formData.append("from_name", "BizFlow Website");

    try {
      // Both submissions go out together, but only the email decides what the
      // visitor sees — see createCrmLead.
      const [email] = await Promise.allSettled([
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        }).then((response) => response.json() as Promise<{ success?: boolean }>),
        createCrmLead(formData),
      ]);

      if (email.status === "fulfilled" && email.value?.success) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setError(`Network error. Please try again or email us at ${SUPPORT_EMAIL}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/*
            Deliberately NOT wrapped in AnimatedSection: this h1 is the page's
            LCP element, and AnimatedSection starts at opacity 0, so animating
            it would hide the headline until framer-motion hydrates. Sections
            below the fold keep the animation.
          */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Get in{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                touch
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted">
              Have questions? Want a demo? We&apos;d love to hear from you.
              Our team typically responds within one business day.
            </p>
          </div>
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
                      <a
                        href={`mailto:${SUPPORT_EMAIL}`}
                        className={CONTACT_LINK_CLASS}
                      >
                        {SUPPORT_EMAIL}
                      </a>
                    </div>
                  </div>

                  {/*
                    The phone block published a dummy number and was removed.
                    WhatsApp replaces it — see the WHATSAPP_NUMBER TODO at the
                    top of this file; this block renders only once the real
                    number is set.
                  */}
                  {whatsappHref && (
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <MessageCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">
                          WhatsApp
                        </div>
                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={CONTACT_LINK_CLASS}
                        >
                          Message us on WhatsApp
                        </a>
                      </div>
                    </div>
                  )}

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
                        one business day. Check your email for a confirmation.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Honeypot for spam prevention */}
                      <input type="checkbox" name="botcheck" className="hidden" />

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="contact-first-name"
                            className="block text-sm font-medium text-foreground mb-1.5"
                          >
                            First Name *
                          </label>
                          <input
                            id="contact-first-name"
                            type="text"
                            name="first_name"
                            required
                            autoComplete="given-name"
                            onBlur={handleBlur}
                            onChange={(e) =>
                              revalidateIfFlagged("first_name", e.target.value)
                            }
                            aria-invalid={fieldErrors.first_name ? true : undefined}
                            aria-describedby={describedBy("first_name")}
                            className={fieldClass("first_name")}
                            placeholder="John"
                          />
                          {fieldErrorNode("first_name")}
                        </div>
                        <div>
                          <label
                            htmlFor="contact-last-name"
                            className="block text-sm font-medium text-foreground mb-1.5"
                          >
                            Last Name *
                          </label>
                          <input
                            id="contact-last-name"
                            type="text"
                            name="last_name"
                            required
                            autoComplete="family-name"
                            onBlur={handleBlur}
                            onChange={(e) =>
                              revalidateIfFlagged("last_name", e.target.value)
                            }
                            aria-invalid={fieldErrors.last_name ? true : undefined}
                            aria-describedby={describedBy("last_name")}
                            className={fieldClass("last_name")}
                            placeholder="Doe"
                          />
                          {fieldErrorNode("last_name")}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-sm font-medium text-foreground mb-1.5"
                        >
                          Work Email *
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          required
                          autoComplete="email"
                          onBlur={handleBlur}
                          onChange={(e) => revalidateIfFlagged("email", e.target.value)}
                          aria-invalid={fieldErrors.email ? true : undefined}
                          aria-describedby={describedBy("email")}
                          className={fieldClass("email")}
                          placeholder="john@company.com"
                        />
                        {fieldErrorNode("email")}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-company"
                          className="block text-sm font-medium text-foreground mb-1.5"
                        >
                          Company Name
                        </label>
                        <input
                          id="contact-company"
                          type="text"
                          name="company"
                          autoComplete="organization"
                          className={fieldClass("company")}
                          placeholder="Acme Inc."
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact-phone"
                          className="block text-sm font-medium text-foreground mb-1.5"
                        >
                          Phone Number *
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          name="phone"
                          required
                          autoComplete="tel"
                          onBlur={handleBlur}
                          onChange={(e) => revalidateIfFlagged("phone", e.target.value)}
                          aria-invalid={fieldErrors.phone ? true : undefined}
                          aria-describedby={describedBy("phone", "contact-phone-hint")}
                          className={fieldClass("phone")}
                          placeholder="+91 XXXXX XXXXX"
                        />
                        {fieldErrorNode("phone")}
                        <p id="contact-phone-hint" className="mt-1.5 text-xs text-muted">
                          So we can reach you to schedule the demo.
                        </p>
                      </div>

                      <div>
                        <label
                          htmlFor="contact-interest"
                          className="block text-sm font-medium text-foreground mb-1.5"
                        >
                          What are you interested in? *
                        </label>
                        <select
                          id="contact-interest"
                          name="interest"
                          required
                          value={interest}
                          onChange={(e) => {
                            setInterest(e.target.value);
                            revalidateIfFlagged("interest", e.target.value);
                          }}
                          onBlur={handleBlur}
                          aria-invalid={fieldErrors.interest ? true : undefined}
                          aria-describedby={describedBy("interest")}
                          className={fieldClass("interest")}
                        >
                          <option value="">Select an option</option>
                          <option value="Product Demo">Product Demo</option>
                          <option value="Free Trial">Free Trial</option>
                          <option value="Custom Pricing">Custom Pricing</option>
                          <option value="Technical Support">Technical Support</option>
                          <option value="Partnership">Partnership</option>
                          <option value="Other">Other</option>
                        </select>
                        {fieldErrorNode("interest")}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-message"
                          className="block text-sm font-medium text-foreground mb-1.5"
                        >
                          Message *
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          required
                          rows={4}
                          value={message}
                          onChange={(e) => {
                            setMessage(e.target.value);
                            revalidateIfFlagged("message", e.target.value);
                          }}
                          onBlur={handleBlur}
                          aria-invalid={fieldErrors.message ? true : undefined}
                          aria-describedby={describedBy("message")}
                          className={fieldClass("message", "resize-none")}
                          placeholder="Tell us about your business and what you're looking for..."
                        />
                        {fieldErrorNode("message")}
                      </div>

                      {/*
                        Submit failures are announced (role="alert") and focused
                        (see the effect above). The ring uses focus:, not
                        focus-visible:, because focus arrives programmatically
                        and not every browser counts that as focus-visible.
                      */}
                      {error && (
                        <div
                          ref={errorRef}
                          role="alert"
                          tabIndex={-1}
                          className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 outline-none focus:ring-2 focus:ring-red-300"
                        >
                          {error}
                        </div>
                      )}

                      {/*
                        No `outline-none` on the button: in Tailwind v4 it sets
                        --tw-outline-style: none for the whole element, which
                        would blank out the focus-visible outline.
                      */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary-dark transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60 disabled:cursor-not-allowed"
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
