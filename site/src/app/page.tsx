import { EuropeMap } from "./europe-map";
import { InstallTabs } from "./install-tabs";
import { Playground } from "./playground";
import { WaitlistButton } from "@/components/waitlist-button";

/* Every figure below is the measured one. The asterisks lead to the
   measurement note in the footer (#accuracy-note), which carries the
   conditions: generated evaluation set, `countries` supplied, DOB excluded. */
const STATS = [
  { value: "98.3%", label: "Recall rate", note: "152,300-record set", ref: true },
  { value: "31", label: "Countries", note: "Maintained rulesets", ref: false },
  { value: "0.3ms", label: "Per page", note: "Node, 2,000 chars", ref: true },
  { value: "1.1%", label: "False positives", note: "With countries set", ref: true },
];

const PROBLEMS = [
  {
    n: "01",
    title: "Cloud API Risks",
    body: "Sending documents to a third-party redaction API means personal data leaves your infrastructure — creating a new processor relationship and transfer surface under the GDPR.",
  },
  {
    n: "02",
    title: "Localization Gaps",
    body: "US-centric tools miss European identifiers: BSN, codice fiscale, NHS number, and the national ID and IBAN formats used across 31 countries.",
  },
  {
    n: "03",
    title: "Slow Development",
    body: "Building and maintaining per-country detection rules in-house is slow and hard to verify. Most teams ship late, or ship incomplete coverage.",
  },
];

const CORE_FEATURES = [
  "Deterministic rules engine — same input, same output",
  "31 European country rulesets, 27 entity types",
  "345 pattern definitions, 44 checksum validators",
  "Python and Node.js SDKs, zero dependencies",
  "Local-only — makes no network calls",
];

const CLOUD_FEATURES = [
  "Neural detection for unstructured and contextual PII",
  "Managed, EU-hosted API",
  "Structured PII stripped locally before anything is sent",
  "Availability and pricing to be announced",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-brand text-white text-[13px] font-bold uppercase tracking-[0.12em] px-3.5 py-1.5">
      {children}
    </span>
  );
}

function StepNumber({ n }: { n: string }) {
  return (
    <span className="w-6 h-6 border border-secondary rounded-full flex items-center justify-center font-mono text-[10.5px] text-secondary shrink-0">
      {n}
    </span>
  );
}

export default function Page() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative grid-pattern overflow-hidden pt-32 pb-14 px-8">
        <div className="relative max-w-[1180px] mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-black tracking-widest uppercase mb-10 border border-secondary/30">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            v0.3 — Now supporting 31 European countries
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-5">
            European PII Redaction.
            <span className="text-secondary font-normal ml-3">/</span>
          </h1>
          <p className="text-lg leading-relaxed text-on-surface-variant max-w-2xl">
            Open-source SDK that detects and redacts structured PII across 31
            European countries. Available for Python and Node.js. Local-only and
            deterministic — the SDK makes no network calls.
          </p>

          <Playground />
        </div>
      </section>

      {/* ── GET STARTED + KEY METRICS ── */}
      <section className="bg-surface border-t border-outline-variant">
        <div className="max-w-[1180px] mx-auto px-8 pt-20">
          <div className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-on-surface-variant mb-5">
            <span className="text-secondary mr-2">/</span>Get started
          </div>
          <h2 className="text-4xl font-bold tracking-tight mb-7">
            Redaction in 30 Seconds.
            <span className="text-secondary font-normal ml-3">/</span>
          </h2>
          <div className="flex flex-wrap items-center gap-3.5">
            <InstallTabs />
            <a
              href="/demo"
              className="bg-brand text-white font-mono text-xs font-medium uppercase tracking-[0.12em] px-5 py-4 rounded-xl hover:bg-brand-hover transition-colors"
            >
              Try Live Demo →
            </a>
            <a
              href="/docs"
              className="text-secondary font-mono text-xs font-medium uppercase tracking-[0.12em] px-5 py-4 border border-secondary rounded-xl hover:bg-secondary/10 transition-colors"
            >
              View Documentation →
            </a>
          </div>
        </div>

        <div className="max-w-[1180px] mx-auto px-8 pb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 mt-16 border border-outline-variant rounded-xl overflow-hidden">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="p-6 border-l border-outline-variant flex flex-col gap-5"
              >
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-on-surface-variant">
                    {s.label}
                  </span>
                  <span className="flex-1 h-px bg-outline-variant" />
                </div>
                <div className="text-[40px] font-bold tracking-tight leading-none">
                  {s.value}
                  {s.ref && (
                    <a
                      href="#accuracy-note"
                      aria-label="See measurement note"
                      className="text-lg align-super text-on-surface-variant hover:text-secondary transition-colors"
                    >
                      *
                    </a>
                  )}
                </div>
                <div className="font-mono text-[10.5px] font-medium uppercase tracking-[0.1em] text-on-surface-variant">
                  {s.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="max-w-[1180px] mx-auto px-8 py-20">
        <SectionLabel>The European PII Problem</SectionLabel>
        <div className="grid md:grid-cols-3 gap-5 mt-6">
          {PROBLEMS.map((p) => (
            <div
              key={p.n}
              className="bg-surface border border-outline-variant rounded-xl p-7"
            >
              <div className="w-9 h-9 border border-outline-variant rounded-lg flex items-center justify-center font-mono text-xs text-secondary mb-5">
                {p.n}
              </div>
              <h3 className="text-[19px] font-bold mb-3">{p.title}</h3>
              <p className="text-[15px] leading-relaxed text-on-surface-variant">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ARCHITECTURE ── */}
      <section className="bg-surface border-y border-outline-variant">
        <div className="max-w-[1180px] mx-auto px-8 py-20">
          <SectionLabel>Processing Architecture</SectionLabel>
          <p className="text-base text-on-surface-variant max-w-2xl mt-3 mb-9">
            Every stage runs on your infrastructure. The engine is
            deterministic; the same input always produces the same redaction.
          </p>
          <div className="flex flex-wrap items-stretch gap-3.5">
            {/* 1 — input */}
            <div className="flex-1 min-w-[220px] bg-primary border border-outline-variant rounded-xl p-5">
              <div className="flex items-center gap-2.5 mb-3.5">
                <StepNumber n="1" />
                <span className="text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">
                  Input
                </span>
              </div>
              <div className="font-mono text-[13px] leading-loose">
                Betaling aan Jan de Vries, BSN{" "}
                <span className="bg-pii-danger text-white font-bold px-1.5 rounded">
                  111222333
                </span>
                , vanaf{" "}
                <span className="bg-pii-danger text-white font-bold px-1.5 rounded">
                  NL91ABNA0417164300
                </span>
              </div>
            </div>
            <div className="self-center text-secondary text-xl font-bold">→</div>

            {/* 2 — rules */}
            <div className="flex-1 min-w-[180px] bg-primary border border-outline-variant rounded-xl p-5">
              <div className="flex items-center gap-2.5 mb-3.5">
                <StepNumber n="2" />
                <span className="text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">
                  Local Engine
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-3">
                Deterministic rules resolve structured identifiers per country,
                confirmed by checksum.
              </p>
              <code className="font-mono text-xs text-secondary">
                31 country rulesets
              </code>
            </div>
            <div className="self-center text-secondary text-xl font-bold">→</div>

            {/* 3 — cloud */}
            <div className="flex-1 min-w-[180px] bg-primary border border-dashed border-outline-variant rounded-xl p-5">
              <div className="flex items-center gap-2.5 mb-3.5">
                <StepNumber n="3" />
                <span className="text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">
                  AI Model
                </span>
              </div>
              <span className="inline-block bg-secondary/10 text-secondary text-[11px] font-bold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full mb-3">
                Coming Soon
              </span>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Contextual detection for names, addresses and other unstructured
                PII the rules engine does not emit.
              </p>
            </div>
            <div className="self-center text-secondary text-xl font-bold">→</div>

            {/* 4 — output */}
            <div className="flex-1 min-w-[220px] bg-primary border border-outline-variant rounded-xl p-5">
              <div className="flex items-center gap-2.5 mb-3.5">
                <StepNumber n="4" />
                <span className="text-xs font-bold uppercase tracking-[0.1em] text-on-surface-variant">
                  Redacted Output
                </span>
              </div>
              <div className="font-mono text-[13px] leading-loose">
                Betaling aan Jan de Vries, BSN{" "}
                <span className="bg-brand text-white text-xs px-1.5 py-0.5 rounded">
                  [NATIONAL_ID]
                </span>
                , vanaf{" "}
                <span className="bg-brand text-white text-xs px-1.5 py-0.5 rounded">
                  [BANK_ACCOUNT]
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-3">
                The name is left in place — it needs the cloud tier at step 3.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEPLOYMENT ── */}
      <section className="max-w-[1180px] mx-auto px-8 py-20">
        <SectionLabel>Deployment Options</SectionLabel>
        <div className="grid md:grid-cols-2 gap-5 mt-6">
          <div className="bg-surface border border-outline-variant rounded-xl p-8 flex flex-col">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-[22px] font-bold">Rules Core</h3>
              <span className="font-mono text-xs text-on-surface-variant">
                Apache 2.0
              </span>
            </div>
            <p className="text-[15px] text-on-surface-variant mt-2 mb-5">
              The open-source SDK. Local, deterministic, benchmarked.
            </p>
            <div className="flex flex-col gap-3 flex-1">
              {CORE_FEATURES.map((f) => (
                <div key={f} className="flex gap-2.5 text-[15px] leading-snug">
                  <span className="text-secondary font-bold">—</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <a
              href="/docs/quickstart"
              className="mt-6 bg-brand text-white font-mono text-xs font-medium uppercase tracking-[0.12em] px-5 py-4 rounded-xl hover:bg-brand-hover transition-colors text-center"
            >
              Get Started — Free →
            </a>
          </div>

          <div className="bg-surface border border-outline-variant rounded-xl p-8 flex flex-col">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-[22px] font-bold">Cloud Neural</h3>
              <span className="inline-block bg-secondary/10 text-secondary text-[11px] font-bold uppercase tracking-[0.08em] px-2.5 py-1 rounded-full">
                Coming Soon
              </span>
            </div>
            <p className="text-[15px] text-on-surface-variant mt-2 mb-5">
              Managed, EU-hosted neural layer for contextual and unstructured
              PII.
            </p>
            <div className="flex flex-col gap-3 flex-1">
              {CLOUD_FEATURES.map((f) => (
                <div
                  key={f}
                  className="flex gap-2.5 text-[15px] leading-snug text-on-surface-variant"
                >
                  <span className="text-secondary font-bold">—</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <WaitlistButton className="mt-6 text-secondary font-mono text-xs font-medium uppercase tracking-[0.12em] px-5 py-4 border border-secondary rounded-xl hover:bg-secondary/10 transition-colors cursor-pointer text-center">
              Join the Waitlist →
            </WaitlistButton>
          </div>
        </div>
      </section>

      {/* ── BUILT FOR EUROPE ── */}
      <section className="bg-surface border-y border-outline-variant">
        <div className="max-w-[1180px] mx-auto px-8 py-20">
          <SectionLabel>Built for Europe</SectionLabel>
          <p className="text-base text-on-surface-variant max-w-xl mt-4 mb-8">
            31 countries with maintained detection rules for national
            identifiers, tax numbers, and local formats.
          </p>
          <EuropeMap />
        </div>
      </section>
    </>
  );
}
