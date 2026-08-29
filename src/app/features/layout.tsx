import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features — CRM, Sales, Inventory, Projects & More | BizFlow",
  description:
    "Explore BizFlow's modules: CRM with lead scoring, GST invoicing, purchase approvals, live inventory, projects, tasks, and a built-in document drive.",
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
