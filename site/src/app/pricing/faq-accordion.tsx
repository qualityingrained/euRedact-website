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
      "That's the plan for the cloud tiers when they launch: upgrade or downgrade at any time, with immediate access to the higher token limit and the difference prorated on upgrade, and downgrades taking effect at the start of the next billing cycle. There are no paid plans to switch between yet.",
  },
  {
    question: "What happens if I exceed my token limit?",
    answer:
      "The cloud tiers are not open yet, so nothing is billed today. The pricing we are planning: service continues uninterrupted, and tokens beyond your plan's monthly allocation are billed at the overage rate listed on your plan (e.g., \u20AC0.10/1K for Starter, \u20AC0.08/1K for Professional). Final terms will be confirmed at launch.",
  },
  {
    question: "Is the free tier really unlimited?",
    answer:
      "Absolutely. The Rules tier runs entirely on your own machine using our open-source Python package. There are no API calls, no metering, and no limits. It detects structured PII with 98.3% recall on our published benchmark corpus (with the optional countries parameter supplied), forever, for free. Our cloud-powered tiers for contextual detection are coming soon -- join the waitlist to be the first to know when they launch.",
  },
  {
    question: "Do you offer annual billing?",
    answer:
      "We plan to offer annual billing at two months free (pay for 10 months, get 12) when the cloud tiers launch. Billing is not live yet — join the waitlist and we will confirm the final terms before you are asked to pay for anything.",
  },
  {
    question: "When will the cloud tiers launch?",
    answer:
      "Our cloud-powered contextual detection tiers (Starter, Professional, and Enterprise) are currently in development. We are finalizing our fine-tuned models and infrastructure to ensure the highest quality PII detection before opening access. Join the waitlist on this page to be notified as soon as they are available.",
  },
  {
    question: "Will there be a DPA?",
    answer:
      "Yes. A Data Processing Agreement meeting GDPR Article 28 requirements will be in place before the cloud tiers launch \u2014 the tiers process no customer data today, so no DPA applies yet. The euRedact Rules SDK runs entirely on your own machine and does not make us a processor of your data at all.",
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
    <div className="border-b border-outline-variant">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group cursor-pointer"
      >
        <span className="font-semibold text-on-surface text-lg pr-4 group-hover:text-secondary transition-colors">
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
    <div className="bg-surface rounded-[2rem] border-2 border-outline-variant shadow-xl p-8 md:p-12">
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
