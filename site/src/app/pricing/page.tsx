import type { Metadata } from "next";
import { TokenCalculator } from "./token-calculator";
import { FAQAccordion } from "./faq-accordion";
import { WaitlistButton } from "@/components/waitlist-button";

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
      <section className="pt-32 py-20 hero-pattern">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-black text-5xl text-primary mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-on-surface-variant text-xl max-w-2xl mx-auto mb-8">
            Start free with our open-source rules engine. Cloud-powered
            contextual detection is coming soon.
          </p>
          <div className="w-20 h-1.5 bg-secondary rounded-full mx-auto" />
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1: Rules (Free) */}
            <div className="bg-slate-50 rounded-[3rem] border-2 border-slate-200 shadow-xl p-12 flex flex-col">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-primary mb-2">Rules</h3>
                <span className="inline-block bg-secondary/10 text-secondary text-sm font-semibold px-4 py-1.5 rounded-full">
                  Open Source
                </span>
              </div>
              <div className="mb-8">
                <span className="text-6xl font-black text-primary">&euro;0</span>
                <span className="text-on-surface-variant ml-2">forever</span>
              </div>
              <ul className="space-y-4 text-on-surface-variant text-sm flex-1 mb-10">
                <FeatureItem>Unlimited local processing</FeatureItem>
                <FeatureItem>Structured PII detection</FeatureItem>
                <FeatureItem>
                  &gt;99% recall on IBANs, phones, IDs, emails
                </FeatureItem>
                <FeatureItem>32 country configs</FeatureItem>
                <FeatureItem>Zero dependencies</FeatureItem>
                <FeatureItem>Apache 2.0 license</FeatureItem>
                <FeatureItem>Community support</FeatureItem>
              </ul>
              <a
                href="/docs/quickstart"
                className="block w-full text-center bg-primary text-white font-semibold rounded-full py-3.5 px-6 hover:bg-primary/90 transition-colors"
              >
                Get Started &rarr;
              </a>
            </div>

            {/* Card 2: Starter */}
            <div className="bg-slate-50 rounded-[3rem] border-2 border-slate-200 shadow-xl p-12 flex flex-col opacity-80">
              <div className="mb-8">
                <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-3">
                  Coming Soon
                </span>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Starter
                </h3>
              </div>
              <div className="mb-8">
                <span className="text-6xl font-black text-primary">
                  &euro;79
                </span>
                <span className="text-on-surface-variant ml-2">/month</span>
              </div>
              <ul className="space-y-4 text-on-surface-variant text-sm flex-1 mb-4">
                <FeatureItem>Everything in Rules, plus</FeatureItem>
                <FeatureItem>1M cloud tokens/month</FeatureItem>
                <FeatureItem>Contextual PII detection</FeatureItem>
                <FeatureItem>Fine-tuned privacy model</FeatureItem>
                <FeatureItem>98&ndash;99% blended recall</FeatureItem>
                <FeatureItem>Basic pseudonymization</FeatureItem>
                <FeatureItem>Email support</FeatureItem>
              </ul>
              <p className="text-xs text-on-surface-variant mb-6">
                Overage: &euro;0.10 / 1K extra tokens
              </p>
              <WaitlistButton className="block w-full text-center bg-secondary text-white font-semibold rounded-full py-3.5 px-6 hover:bg-secondary/90 transition-colors cursor-pointer">
                Join Waitlist &rarr;
              </WaitlistButton>
            </div>

            {/* Card 3: Professional (Highlighted) */}
            <div className="relative bg-primary rounded-[3rem] border-4 border-secondary p-12 flex flex-col overflow-hidden opacity-80">
              {/* Coming Soon ribbon */}
              <div className="absolute top-8 -right-10 bg-amber-500 text-white text-xs font-bold uppercase tracking-wider py-1.5 px-12 rotate-45">
                Coming Soon
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Professional
                </h3>
              </div>
              <div className="mb-8">
                <span className="text-6xl font-black text-white">
                  &euro;149
                </span>
                <span className="text-white/60 ml-2">/month</span>
              </div>
              <ul className="space-y-4 text-sm flex-1 mb-4">
                <FeatureItemWhite>
                  Everything in Starter, plus
                </FeatureItemWhite>
                <FeatureItemWhite>2.5M cloud tokens/month</FeatureItemWhite>
                <FeatureItemWhite>Deep referential integrity</FeatureItemWhite>
                <FeatureItemWhite>Local coreference model</FeatureItemWhite>
                <FeatureItemWhite>Priority support</FeatureItemWhite>
              </ul>
              <p className="text-xs text-white/50 mb-6">
                Overage: &euro;0.08 / 1K extra tokens
              </p>
              <WaitlistButton className="block w-full text-center bg-secondary text-white font-semibold rounded-full py-3.5 px-6 hover:bg-secondary/90 transition-colors cursor-pointer">
                Join Waitlist &rarr;
              </WaitlistButton>
            </div>

            {/* Card 4: Enterprise */}
            <div className="bg-slate-50 rounded-[3rem] border-2 border-slate-200 shadow-xl p-12 flex flex-col opacity-80">
              <div className="mb-8">
                <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-3">
                  Coming Soon
                </span>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Enterprise
                </h3>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-black text-primary">Custom</span>
              </div>
              <ul className="space-y-4 text-on-surface-variant text-sm flex-1 mb-10">
                <FeatureItem>Everything in Professional, plus</FeatureItem>
                <FeatureItem>Volume token pricing</FeatureItem>
                <FeatureItem>On-premise deployment</FeatureItem>
                <FeatureItem>Custom SLA</FeatureItem>
                <FeatureItem>Dedicated support</FeatureItem>
                <FeatureItem>SSO / SAML</FeatureItem>
                <FeatureItem>DPA included</FeatureItem>
              </ul>
              <WaitlistButton className="block w-full text-center border-2 border-accent-indigo text-accent-indigo font-semibold rounded-full py-3.5 px-6 hover:bg-accent-indigo hover:text-white transition-colors cursor-pointer">
                Contact Sales (Coming Soon) &rarr;
              </WaitlistButton>
            </div>
          </div>
        </div>
      </section>

      {/* Token Calculator */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-black text-4xl text-primary text-center mb-4">
            Estimate Your Usage
          </h2>
          <p className="text-on-surface-variant text-center mb-12 max-w-xl mx-auto">
            Drag the sliders to see how many tokens you would need and which
            plan fits best.
          </p>
          <TokenCalculator />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-black text-4xl text-primary text-center mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1.5 bg-secondary rounded-full mx-auto mb-12" />
          <FAQAccordion />
        </div>
      </section>
    </div>
  );
}
