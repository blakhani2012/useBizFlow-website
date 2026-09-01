import type { Metadata } from "next";
import Link from "next/link";

const title = "Privacy Policy | BizFlow";
const description =
  "How BizFlow collects, uses, and protects your information — covering the website, demo requests, and the BizFlow application.";
const ogImageAlt = "BizFlow privacy policy";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    type: "website",
    siteName: "BizFlow",
    locale: "en_IN",
    url: "/privacy",
    title,
    description,
    images: [
      {
        url: "/og/privacy.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: "/og/privacy.png", alt: ogImageAlt }],
  },
};

const sections = [
  {
    heading: "Who we are",
    body: [
      "BizFlow is a business management platform operated by Finscape Innovation (“we”, “us”). This policy explains what information we collect through usebizflow.com and how we handle it. You can reach us anytime at support@usebizflow.com.",
    ],
  },
  {
    heading: "What we collect",
    body: [
      "Demo and contact requests: when you submit our contact form we collect the details you provide — your name, work email, company name, phone number, the modules you're interested in, and your message.",
      "Technical data: like most websites, our hosting provider records basic server logs (IP address, browser type, pages requested) for security and performance. We do not run advertising trackers on this site.",
      "Cookies: the website uses only essential cookies needed for it to function. We do not use third-party advertising or cross-site tracking cookies.",
    ],
  },
  {
    heading: "How we use your information",
    body: [
      "To respond to your enquiry, schedule your demo, and prepare a pricing quote for the modules you selected.",
      "To operate, secure, and improve the website.",
      "We do not sell your personal information, and we do not share it with third parties for their marketing.",
    ],
  },
  {
    heading: "Who we share it with",
    body: [
      "Service providers that help us run the website and respond to you — such as our hosting provider (Google Firebase Hosting) and email services. They process data on our instructions only.",
      "Authorities, if required by applicable law.",
    ],
  },
  {
    heading: "Data in the BizFlow application",
    body: [
      "Business data you store inside the BizFlow application (your leads, invoices, inventory, documents, and so on) belongs to you. We process it only to provide the service to you, under the terms of your service agreement. This website policy covers the marketing site and demo requests; your service agreement governs application data in detail.",
    ],
  },
  {
    heading: "Retention",
    body: [
      "We keep demo and contact enquiries for as long as needed to follow up and maintain our business records, after which they are deleted. Server logs are retained for a short period for security purposes.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You can ask us to access, correct, or delete the personal information we hold about you, or to stop contacting you, by emailing support@usebizflow.com. We respond within a reasonable time and in line with applicable Indian data protection law.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "If we make material changes we will update this page and revise the date below. Continued use of the site after changes means you accept the updated policy.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
          <p className="mt-3 text-muted">Last updated: 12 June 2026</p>
        </div>
      </section>
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 space-y-10">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-xl font-bold text-foreground">{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 40)} className="mt-3 text-muted leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          ))}
          <div className="rounded-2xl bg-surface border border-slate-100 p-6 text-sm text-muted">
            Questions about this policy or your data? Email{" "}
            <a href="mailto:support@usebizflow.com" className="text-primary font-medium">
              support@usebizflow.com
            </a>{" "}
            or see our <Link href="/terms" className="text-primary font-medium">Terms of Service</Link>.
          </div>
        </div>
      </section>
    </>
  );
}
