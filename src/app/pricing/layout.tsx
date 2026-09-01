import type { Metadata } from "next";

const title = "Pricing — Pay Only for the Modules You Use | BizFlow";
const description =
  "No fixed plans. Pick the modules your business needs, book a free demo, and get a quote tailored to your team size and workflow.";
const ogImageAlt = "BizFlow pricing — pay only for the modules you use";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    type: "website",
    siteName: "BizFlow",
    locale: "en_IN",
    url: "/pricing",
    title,
    description,
    images: [
      {
        url: "/og/pricing.png",
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
    images: [{ url: "/og/pricing.png", alt: ogImageAlt }],
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
