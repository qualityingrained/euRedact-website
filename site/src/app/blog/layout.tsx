import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical deep-dives, GDPR guides, and development updates from the euRedact team.",
  openGraph: {
    title: "Blog — euRedact",
    description:
      "Technical deep-dives, GDPR guides, and development updates from the euRedact team.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
