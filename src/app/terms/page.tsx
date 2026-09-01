import type { Metadata } from "next";
import Link from "next/link";

const title = "Terms of Service | BizFlow";
const description =
  "The terms that govern your use of the BizFlow website and the BizFlow business management platform.";
const ogImageAlt = "BizFlow terms of service";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    type: "website",
    siteName: "BizFlow",
    locale: "en_IN",
    url: "/terms",
    title,
    description,
    images: [
      {
        url: "/og/terms.png",
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
    images: [{ url: "/og/terms.png", alt: ogImageAlt }],
  },
};

const sections = [
  {
    heading: "1. Agreement",
    body: [
      "These terms govern your use of usebizflow.com and the BizFlow application (together, the “service”), operated by Finscape Innovation. By using the service you agree to these terms. Where you have a signed service agreement or order form with us, that document prevails over these terms if they conflict.",
    ],
  },
  {
    heading: "2. The service",
    body: [
      "BizFlow is a modular business management platform — CRM, sales and invoicing, purchases, inventory, projects, tasks, and documents. Modules and features evolve over time; we may improve, add, or modify functionality without materially reducing what you have paid for.",
    ],
  },
  {
    heading: "3. Accounts and access",
    body: [
      "You are responsible for keeping your login credentials confidential and for all activity under your account. Tell us immediately at support@usebizflow.com if you suspect unauthorised access. Access is provisioned for your business and your invited team members.",
    ],
  },
  {
    heading: "4. Fees",
    body: [
      "BizFlow is priced per engagement: after a demo, we quote based on the modules you choose and your team size. Fees, billing cycle, and any trial period are set out in your quote or order form. Quoted fees are exclusive of applicable taxes (such as GST) unless stated otherwise.",
    ],
  },
  {
    heading: "5. Your data",
    body: [
      "Business data you enter into BizFlow belongs to you. We process it only to provide the service, in line with our Privacy Policy. You are responsible for the accuracy and lawfulness of the data you store, including ensuring you have the right to store your customers' details.",
      "On termination, you may export your data within a reasonable period before it is deleted from active systems.",
    ],
  },
  {
    heading: "6. Acceptable use",
    body: [
      "Don't use the service to break the law, infringe others' rights, send spam, distribute malware, or attempt to disrupt or gain unauthorised access to the service or other customers' data.",
    ],
  },
  {
    heading: "7. Intellectual property",
    body: [
      "We own the BizFlow software, branding, and website content. You receive a limited, non-exclusive, non-transferable right to use the service for your business while your subscription is active.",
    ],
  },
  {
    heading: "8. Availability and support",
    body: [
      "We work to keep the service available and respond promptly to support requests at support@usebizflow.com. Unless a service level is agreed in writing, the service is provided “as is” and we do not guarantee uninterrupted availability.",
    ],
  },
  {
    heading: "9. Limitation of liability",
    body: [
      "To the maximum extent permitted by law, our total liability arising out of the service is limited to the fees you paid in the twelve months before the claim, and we are not liable for indirect or consequential losses such as lost profits or lost data (beyond restoring from our standard backups).",
    ],
  },
  {
    heading: "10. Termination",
    body: [
      "You can stop using the service at the end of your billing period. We may suspend or terminate access for material breach of these terms that remains uncured after notice.",
    ],
  },
  {
    heading: "11. Governing law",
    body: [
      "These terms are governed by the laws of India, and the courts of Gujarat, India have jurisdiction over any dispute.",
    ],
  },
  {
    heading: "12. Changes",
    body: [
      "We may update these terms from time to time; material changes will be reflected on this page with a new date. Continued use after changes means you accept them.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
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
            Questions about these terms? Email{" "}
            <a href="mailto:support@usebizflow.com" className="text-primary font-medium">
              support@usebizflow.com
            </a>{" "}
            or read our <Link href="/privacy" className="text-primary font-medium">Privacy Policy</Link>.
          </div>
        </div>
      </section>
    </>
  );
}
