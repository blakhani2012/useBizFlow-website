import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Pay Only for the Modules You Use | BizFlow",
  description:
    "No fixed plans. Pick the modules your business needs, book a free demo, and get a quote tailored to your team size and workflow.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
