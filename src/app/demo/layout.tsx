import type { Metadata } from "next";

const title = "Product Tour — BizFlow";
const description =
  "Take a self-guided tour of BizFlow: production control & quality, CRM pipeline, work orders, invoicing, purchases, tasks and inventory — see the real product before you book a demo.";
const ogImageAlt = "See BizFlow in action — self-guided product tour";

/**
 * `demo/page.tsx` owns the `title` and `description` (page metadata wins over
 * layout metadata for the same key). This layout adds the share and canonical
 * metadata that the page does not declare, so the two merge rather than
 * conflict — keep the copy above in sync with the page if it changes.
 */
export const metadata: Metadata = {
  alternates: {
    canonical: "/demo",
  },
  openGraph: {
    type: "website",
    siteName: "BizFlow",
    locale: "en_IN",
    url: "/demo",
    title,
    description,
    images: [
      {
        url: "/og/demo.png",
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
    images: [{ url: "/og/demo.png", alt: ogImageAlt }],
  },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
