import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — euRedact",
};

const values = [
  {
    icon: "shield",
    title: "Privacy by Architecture",
    description:
      "Structured PII is detected and removed locally. When our cloud tier launches, contextual detection will handle names and addresses \u2014 with the same privacy-first architecture.",
  },
  {
    icon: "visibility",
    title: "Transparency by Default",
    description:
      "Our detection rules are open source and auditable. Every regex pattern, every validation rule, every country configuration is visible on GitHub.",
  },
  {
    icon: "public",
    title: "European by Design",
    description:
      "Built in Europe, hosted in the EU, purpose-built for European regulatory requirements. Not a US tool with European patterns bolted on.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="bg-primary hero-pattern pt-32 py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="font-black text-5xl text-white tracking-tight">
            Built by Engineers. For Engineers.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300 leading-relaxed">
            euRedact is built by developers who got tired of writing the same
            PII regex for every European country, every project, every client.
            So we built the tool we wished existed.
          </p>
        </div>
      </section>

      {/* ===== STORY ===== */}
      <section className="bg-white px-8 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-black text-4xl text-primary mb-8 tracking-tight">
            Why euRedact Exists
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            European developers building AI applications face a unique
            challenge: the continent&apos;s diverse PII formats — from Dutch
            BSNs to German Steuer-IDs to Belgian National Numbers — aren&apos;t
            supported by US-built redaction tools. We kept writing custom regex
            for every project, every country, every new engagement.
          </p>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            euRedact was born from that frustration. What started as an internal
            tool became a comprehensive SDK covering 31 countries with &gt;99%
            recall on structured PII. We open-sourced the rule engine because we
            believe every European developer should have access to reliable PII
            detection, regardless of budget.
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            Today, euRedact is available for both Python and Node.js — zero
            dependencies, sub-millisecond latency, and checksum validation that
            eliminates false positives at the pattern level. Built by a
            developer in Belgium who understands what it takes to ship compliant
            software in Europe.
          </p>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section className="bg-white px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 sm:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-[3rem] bg-slate-50 border-2 border-slate-200 p-12 shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10">
                  <span className="material-symbols-outlined text-2xl text-secondary">
                    {v.icon}
                  </span>
                </div>
                <h3 className="text-xl font-black text-primary mb-3">
                  {v.title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OPEN SOURCE ===== */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="font-black text-4xl text-primary mb-6 tracking-tight">
            Open Source at the Core
          </h2>
          <p className="mx-auto max-w-2xl text-on-surface-variant leading-relaxed mb-12">
            The euRedact rule engine is released under the Apache 2.0 license.
            Every detection pattern is open, auditable, and community-driven —
            because trust in PII tooling starts with transparency.
          </p>

          <a
            href="https://github.com/euRedact/euRedact"
            className="inline-flex items-center gap-2 bg-primary text-white font-black uppercase tracking-wider text-sm px-8 py-4 rounded-2xl hover:bg-primary/90 transition-colors"
          >
            View on GitHub
            <span className="material-symbols-outlined text-secondary text-lg">arrow_forward</span>
          </a>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-[3rem] bg-slate-50 p-12 text-center">
            <h2 className="font-black text-2xl text-primary mb-4">
              Get in Touch
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              For enterprise inquiries, partnerships, or questions about
              euRedact.
            </p>
            <a
              href="mailto:contact@euredact.eu"
              className="text-secondary font-black hover:underline"
            >
              contact@euredact.eu
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
