import type { Metadata } from "next";
import { FAQAccordion } from "./faq-accordion";
import { WaitlistButton } from "@/components/waitlist-button";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Pricing — euRedact",
  description:
    "Simple, transparent pricing for euRedact. Start free with our open-source rules engine. Cloud-powered contextual detection is coming soon.",
};

function CheckIcon() {
  return (
    <span className="material-symbols-outlined text-secondary text-xl">
      check_circle
    </span>
  );
}

function FeatureItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <CheckIcon />
      <span>{children}</span>
    </li>
  );
}

function FeatureItemWhite({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="material-symbols-outlined text-secondary text-xl">
        check_circle
      </span>
      <span className="text-white/90">{children}</span>
    </li>
  );
}

export default function PricingPage() {
  return (
    <div>
      {/* Page Header */}
      <PageHero
        eyebrow="Pricing"
        title="Simple, Transparent Pricing"
        subtitle="Start free with our open-source rules engine. Cloud-powered contextual detection is coming soon."
      />

      {/* Pricing Cards */}
      <section className="py-20 bg-primary/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Rules (Free) */}
            <div className="bg-primary rounded-[3rem] border-2 border-outline-variant shadow-xl p-12 flex flex-col">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-on-surface mb-2">Rules</h3>
                <span className="inline-block bg-secondary/10 text-secondary text-sm font-semibold px-4 py-1.5 rounded-full">
                  Open Source
                </span>
              </div>
              <div className="mb-8">
                <span className="text-6xl font-black text-on-surface">&euro;0</span>
                <span className="text-on-surface-variant ml-2">forever</span>
              </div>
              <ul className="space-y-4 text-on-surface-variant text-sm flex-1 mb-10">
                <FeatureItem>Unlimited local processing</FeatureItem>
                <FeatureItem>Structured PII detection</FeatureItem>
                <FeatureItem>
                  98.3% recall on IBANs, phones, IDs, emails (with the{" "}
                  <span className="font-mono">countries</span> parameter set)
                </FeatureItem>
                <FeatureItem>31 country configs</FeatureItem>
                <FeatureItem>Zero dependencies</FeatureItem>
                <FeatureItem>Apache 2.0 license</FeatureItem>
                <FeatureItem>Community support</FeatureItem>
              </ul>
              <a
                href="/docs/quickstart"
                className="block w-full text-center bg-code text-white font-semibold rounded-full py-3.5 px-6 hover:bg-code/90 transition-colors"
              >
                Get Started &rarr;
              </a>
            </div>

            {/* Card 2: Cloud (Coming Soon) */}
            <div className="relative bg-code rounded-[3rem] border-4 border-secondary/40 p-12 flex flex-col overflow-hidden">
              <div className="mb-8">
                <span className="inline-block bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-3">
                  Coming Soon
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Cloud
                </h3>
              </div>
              <div className="mb-8">
                <span className="text-3xl font-black text-white">
                  Multiple plans to fit your needs
                </span>
              </div>
              <ul className="space-y-4 text-sm flex-1 mb-8">
                <FeatureItemWhite>Everything in Rules, plus</FeatureItemWhite>
                <FeatureItemWhite>Contextual PII detection (names, addresses)</FeatureItemWhite>
                <FeatureItemWhite>Fine-tuned European privacy model</FeatureItemWhite>
                <FeatureItemWhite>Structured PII stripped locally before cloud processing</FeatureItemWhite>
                <FeatureItemWhite>Token-based consumption pricing</FeatureItemWhite>
                <FeatureItemWhite>Enterprise and on-premise options</FeatureItemWhite>
              </ul>
              <p className="text-sm text-white/50 mb-6">
                Join the waitlist to be notified when the cloud tier launches.
              </p>
              <WaitlistButton className="block w-full text-center bg-secondary text-primary font-semibold rounded-full py-3.5 px-6 hover:bg-secondary-hover transition-colors cursor-pointer">
                Join Waitlist &rarr;
              </WaitlistButton>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-primary/50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-black text-4xl text-on-surface text-center mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1.5 bg-secondary rounded-full mx-auto mb-12" />
          <FAQAccordion />
        </div>
      </section>
    </div>
  );
}
