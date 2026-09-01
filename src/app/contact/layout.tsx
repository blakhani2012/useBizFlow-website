import type { Metadata } from "next";

const title = "Book a Free Demo — Contact BizFlow";
const description =
  "Book a free 30-minute demo, ask about modules and pricing, or get support. We respond within one business day.";
const ogImageAlt = "Book a free 30-minute BizFlow demo";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    siteName: "BizFlow",
    locale: "en_IN",
    url: "/contact",
    title,
    description,
    images: [
      {
        url: "/og/contact.png",
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
    images: [{ url: "/og/contact.png", alt: ogImageAlt }],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
