import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — euRedact",
  description:
    "Technical deep-dives, GDPR guides, and product updates from the euRedact team.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
