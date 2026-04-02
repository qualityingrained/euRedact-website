import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { WaitlistProvider } from "@/components/waitlist-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "euRedact — European PII Redaction SDK",
    template: "%s — euRedact",
  },
  description:
    "Open-source PII detection and redaction SDK for Python and Node.js. 31 European countries, 30+ entity types, checksum validation, sub-millisecond latency, zero dependencies. Apache 2.0.",
  keywords: [
    "PII redaction",
    "PII detection",
    "European PII",
    "GDPR",
    "GDPR compliance",
    "data anonymization",
    "data redaction",
    "personally identifiable information",
    "BSN",
    "IBAN redaction",
    "national ID",
    "Steuer-ID",
    "NIR",
    "Python PII",
    "Node.js PII",
    "TypeScript PII",
    "open source",
    "privacy SDK",
    "LLM preprocessing",
    "data privacy",
    "European data protection",
    "referential integrity",
    "API key detection",
    "secret detection",
    "euredact",
  ],
  metadataBase: new URL("https://euredact.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://euredact.dev",
    siteName: "euRedact",
    title: "euRedact — European PII Redaction SDK",
    description:
      "Open-source PII detection and redaction for Python and Node.js. 31 European countries, 30+ entity types, checksum validation, ~0.02ms per page. Apache 2.0.",
  },
  twitter: {
    card: "summary_large_image",
    title: "euRedact — European PII Redaction SDK",
    description:
      "Open-source PII detection and redaction for Python and Node.js. 31 European countries, 30+ entity types, ~0.02ms per page.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "euRedact",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Cross-platform",
  description:
    "Open-source PII detection and redaction SDK for Python and Node.js. Covers 31 European countries with 30+ entity types, checksum validation, and sub-millisecond latency.",
  url: "https://euredact.dev",
  downloadUrl: "https://pypi.org/project/euredact/",
  softwareVersion: "0.2",
  license: "https://opensource.org/licenses/Apache-2.0",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
    description: "Free and open source under Apache 2.0",
  },
  featureList: [
    "PII detection across 31 European countries",
    "30+ structured PII entity types",
    "Checksum validation (IBAN mod-97, Luhn, country-specific)",
    "Secret and API key detection",
    "Custom pattern registration",
    "Referential integrity mode",
    "Sub-millisecond latency (~0.02ms per page)",
    "Zero required dependencies",
    "Python and Node.js/TypeScript support",
    "Context-aware false-positive suppression",
    "Apache 2.0 license",
  ],
  programmingLanguage: ["Python", "TypeScript", "JavaScript"],
  codeRepository: "https://github.com/euRedact/euRedact",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-surface text-on-surface antialiased">
        <WaitlistProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </WaitlistProvider>
      </body>
    </html>
  );
}
