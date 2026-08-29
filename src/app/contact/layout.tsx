import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Demo — Contact BizFlow",
  description:
    "Book a free 30-minute demo, ask about modules and pricing, or get support. We respond within one business day.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
