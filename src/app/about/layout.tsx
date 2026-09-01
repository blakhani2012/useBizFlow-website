import type { Metadata } from "next";

const title = "About BizFlow — Built by Finscape Innovation";
const description =
  "Why we built an all-in-one business management platform for growing Indian businesses, and the team behind BizFlow.";
const ogImageAlt = "About BizFlow — built by Finscape Innovation, Ahmedabad";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    siteName: "BizFlow",
    locale: "en_IN",
    url: "/about",
    title,
    description,
    images: [
      {
        url: "/og/about.png",
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
    images: [{ url: "/og/about.png", alt: ogImageAlt }],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
