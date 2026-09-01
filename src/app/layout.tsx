import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Analytics from "@/components/Analytics";
import AttributionTracker from "@/components/AttributionTracker";
import JsonLd, { siteStructuredData } from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "BizFlow — All-in-One Business Management Platform";
const description =
  "CRM, Inventory, Sales, Purchases, Production Control & Quality, and more — all in one powerful platform. Built for growing businesses in India and beyond.";
const ogImageAlt =
  "BizFlow — all-in-one software for how your business runs";

export const metadata: Metadata = {
  // Every relative URL below (canonicals, OG images) resolves against this.
  metadataBase: new URL("https://usebizflow.com"),
  title,
  description,
  applicationName: "BizFlow",
  keywords: [
    "ERP",
    "CRM",
    "inventory management",
    "sales management",
    "GST invoice",
    "business management",
    "SaaS",
    "India",
  ],
  authors: [{ name: "Finscape Innovation", url: "https://usebizflow.com" }],
  creator: "Finscape Innovation",
  publisher: "Finscape Innovation",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "BizFlow",
    locale: "en_IN",
    url: "/",
    title,
    description,
    images: [
      {
        url: "/og/home.png",
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
    images: [{ url: "/og/home.png", alt: ogImageAlt }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/*
          First focusable element on every page so keyboard and screen-reader
          users can jump past the nav. Hidden until it receives focus.
        */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white"
        >
          Skip to main content
        </a>
        <JsonLd id="site-structured-data" data={siteStructuredData} />
        <Analytics />
        <AttributionTracker />
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
