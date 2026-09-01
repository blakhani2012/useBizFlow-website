import type { Metadata } from "next";

const title = "Features — CRM, Sales, Inventory, Projects & More | BizFlow";
const description =
  "Explore BizFlow's modules: CRM with lead scoring, GST invoicing, purchase approvals, live inventory, projects, tasks, and a built-in document drive.";
const ogImageAlt = "BizFlow features — every module your business runs on";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/features",
  },
  openGraph: {
    type: "website",
    siteName: "BizFlow",
    locale: "en_IN",
    url: "/features",
    title,
    description,
    images: [
      {
        url: "/og/features.png",
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
    images: [{ url: "/og/features.png", alt: ogImageAlt }],
  },
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
