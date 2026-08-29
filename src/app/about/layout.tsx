import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About BizFlow — Built by Finscape Innovation",
  description:
    "Why we built an all-in-one business management platform for growing Indian businesses, and the team behind BizFlow.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
