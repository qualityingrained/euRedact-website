"use client";

import { useState } from "react";

const FAQ_ITEMS = [
  {
    question: "What counts as a token?",
    answer:
      "A token is roughly one word or sub-word unit in the text you send for redaction. For most European languages, 1,000 tokens is approximately 750 words. Only the text you send through the cloud API is metered -- local rule-based processing is always free and unlimited.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you get immediate access to the higher token limit and the difference is prorated. Downgrades take effect at the start of your next billing cycle.",
  },
  {
    question: "What happens if I exceed my token limit?",
    answer:
      "Your service continues uninterrupted. Any tokens beyond your plan's monthly allocation are billed at the overage rate listed on your plan (e.g., \u20AC0.10/1K for Starter, \u20AC0.08/1K for Professional). You can set spending alerts in your dashboard to avoid surprises.",
  },
  {
    question: "Is the free tier really unlimited?",
    answer:
      "Absolutely. The Rules tier runs entirely on your own machine using our open-source Python package. There are no API calls, no metering, and no limits. You get structured PII detection with >99% recall on common European PII types, forever, for free. Our cloud-powered tiers for contextual detection are coming soon -- join the waitlist to be the first to know when they launch.",
  },
  {
    question: "Do you offer annual billing?",
    answer:
      "Yes. Annual billing gives you two months free (pay for 10 months, get 12). Contact our sales team or toggle to annual pricing in your account dashboard to switch.",
  },
  {
    question: "When will the cloud tiers launch?",
    answer:
      "Our cloud-powered contextual detection tiers (Starter, Professional, and Enterprise) are currently in development. We are finalizing our fine-tuned models and infrastructure to ensure the highest quality PII detection before opening access. Join the waitlist on this page to be notified as soon as they are available.",
  },
  {
    question: "What\u2019s in the DPA?",
    answer:
      "Our Data Processing Agreement covers GDPR Article 28 requirements including purpose limitation, data minimization, sub-processor lists, breach notification timelines, and audit rights. Enterprise customers receive a pre-signed DPA; other plans can request one through support.",
  },
];

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group cursor-pointer"
      >
        <span className="font-semibold text-primary text-lg pr-4 group-hover:text-secondary transition-colors">
          {question}
        </span>
        <span
          className={`material-symbols-outlined text-on-surface-variant shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-on-surface-variant leading-relaxed pb-6">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-white rounded-[2rem] border-2 border-slate-200 shadow-xl p-8 md:p-12">
      {FAQ_ITEMS.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() =>
            setOpenIndex(openIndex === index ? null : index)
          }
        />
      ))}
    </div>
  );
}
