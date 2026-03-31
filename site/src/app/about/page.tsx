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
      "Built in Belgium, hosted in the EU, purpose-built for European regulatory requirements. Not a US tool with European patterns bolted on.",
  },
];

const stats = [
  { value: "1.2k", label: "Stars" },
  { value: "89", label: "Forks" },
  { value: "12", label: "Contributors" },
  { value: "32", label: "Countries" },
];

export default function AboutPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="bg-primary hero-pattern pt-32 py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="font-black text-5xl text-white tracking-tight">
            Built in Belgium. Built for Europe.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300 leading-relaxed">
            euRedact is created by JNJS BV, a Belgian IT consultancy, to solve
            the PII redaction problem that European developers face every day.
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
            for every project, every country, every new client engagement.
          </p>
          <p className="text-on-surface-variant leading-relaxed">
            euRedact was born from that frustration. What started as an internal
            tool at JNJS BV became a comprehensive SDK covering 32 countries
            with &gt;99% recall. We open-sourced the rule engine because we
            believe every European developer should have access to reliable PII
            detection, regardless of budget.
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

          <div className="rounded-[3rem] bg-primary p-12">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-4xl font-black text-white">{s.value}</div>
                  <div className="mt-2 text-sm font-semibold uppercase tracking-wider text-white/50">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <a
            href="https://github.com/jnjs-bv/euredact"
            className="mt-8 inline-block text-secondary font-black hover:underline"
          >
            View on GitHub &rarr;
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
            <p className="mt-4 text-sm text-slate-400">
              JNJS BV — Antwerp, Belgium
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
