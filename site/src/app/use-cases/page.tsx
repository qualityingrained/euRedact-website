import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Use Cases — euRedact",
  description:
    "Discover how European developers use euRedact for GDPR-compliant PII redaction — from LLM preprocessing to log sanitization and document anonymization.",
};

const useCases = [
  {
    icon: "auto_awesome",
    title: "LLM Pre-Processing",
    subtitle: "Strip PII before it reaches your AI models.",
    description:
      "Sending customer data to LLMs creates GDPR compliance risk. euRedact runs locally, removing structured PII from prompts before they leave your infrastructure — so your AI pipeline stays compliant without sacrificing functionality.",
    benefits: [
      "Redact names, IDs, and IBANs before calling OpenAI, Anthropic, or local models",
      "Zero-latency inline processing — no extra API round-trip",
      "Works with RAG pipelines, chat systems, and batch processing",
    ],
    code: `from euredact import redact

# Sanitize before sending to your LLM
clean = redact(user_message, country="NL")
response = llm.chat(clean.redacted_text)`,
    audiences: ["AI Engineers", "ML Teams", "Data Scientists"],
  },
  {
    icon: "description",
    title: "Document Anonymization",
    subtitle: "Anonymize contracts, reports, and case files at scale.",
    description:
      "Legal teams, insurance companies, and government agencies process thousands of documents containing personal data. euRedact detects and replaces PII across 32 European country formats — from Dutch BSNs to German Steuer-IDs — in a single function call.",
    benefits: [
      "Checksum-validated detection eliminates false positives on national IDs",
      "Referential integrity preserves document readability (NAME_1, IBAN_1)",
      "Process PDFs, Word documents, and plain text with consistent results",
    ],
    code: `from euredact import redact

result = redact(contract_text, country="DE")
# "Herr Max Mustermann, Steuer-ID 12345678901"
# → "Herr [NAME_1], [STEUER_ID_1]"`,
    audiences: ["Legal Teams", "Compliance Officers", "DPOs"],
  },
  {
    icon: "terminal",
    title: "Log Sanitization",
    subtitle: "Clean PII from logs before they reach your SIEM.",
    description:
      "Application logs routinely capture email addresses, phone numbers, and national IDs. euRedact integrates into your logging pipeline to strip structured PII in real-time — keeping your observability stack GDPR-compliant without manual review.",
    benefits: [
      "Sub-millisecond processing handles high-throughput log streams",
      "Detect emails, phone numbers, IBANs, and 25+ PII entity types",
      "Drop-in integration with Python logging, Node.js streams, or batch jobs",
    ],
    code: `import logging
from euredact import redact

class PIIFilter(logging.Filter):
    def filter(self, record):
        result = redact(record.getMessage())
        record.msg = result.redacted_text
        return True`,
    audiences: ["DevOps Engineers", "SREs", "Platform Teams"],
  },
  {
    icon: "database",
    title: "Database Field Redaction",
    subtitle: "Mask PII columns before exporting or sharing data.",
    description:
      "When sharing datasets with third parties, analytics teams, or across departments, PII must be removed. euRedact processes database exports field-by-field, detecting country-specific identifiers that generic tools miss entirely.",
    benefits: [
      "Batch-process CSV, JSON, or database rows efficiently",
      "Country-aware detection catches formats US tools ignore",
      "Deterministic output — same input always produces the same result",
    ],
    code: `import pandas as pd
from euredact import redact

df = pd.read_csv("customers.csv")
df["notes"] = df["notes"].apply(
    lambda x: redact(x, country="BE").redacted_text
)`,
    audiences: ["Data Engineers", "Analytics Teams", "DBAs"],
  },
  {
    icon: "science",
    title: "Research & Training Data",
    subtitle: "De-identify datasets for ML training and academic research.",
    description:
      "Machine learning teams and researchers need real-world data without real-world PII. euRedact's referential integrity mode preserves data structure and relationships while replacing all identifiable information — enabling compliant model training on European datasets.",
    benefits: [
      "Consistent labels across documents (NAME_1 stays NAME_1)",
      "Preserves statistical properties of the underlying data",
      "Supports GDPR Article 89 research exemption workflows",
    ],
    code: `from euredact import redact

for doc in research_corpus:
    result = redact(doc, country="FR",
                    referential_integrity=True)
    clean_corpus.append(result.redacted_text)`,
    audiences: ["Researchers", "ML Engineers", "Universities"],
  },
  {
    icon: "support_agent",
    title: "Customer Support Pipelines",
    subtitle: "Redact tickets and chat logs for analytics and QA.",
    description:
      "Support teams accumulate vast amounts of personal data in tickets, chat transcripts, and email threads. euRedact cleans these before they reach analytics dashboards, QA tools, or third-party integrations — protecting customer privacy at every step.",
    benefits: [
      "Process Zendesk exports, Intercom logs, or custom ticket systems",
      "Detect PII across multiple European languages in a single pass",
      "Enable safe sharing of support data with product and engineering teams",
    ],
    code: `from euredact import redact

for ticket in zendesk_export:
    clean = redact(ticket["body"],
                   country="NL")
    ticket["body"] = clean.redacted_text`,
    audiences: ["Support Leads", "Product Managers", "QA Teams"],
  },
];

const industries = [
  {
    icon: "balance",
    name: "Legal & Compliance",
    description:
      "Law firms anonymizing case files, contracts, and court documents for sharing or archival.",
  },
  {
    icon: "local_hospital",
    name: "Healthcare",
    description:
      "Hospitals and health-tech de-identifying patient records for research and inter-departmental sharing.",
  },
  {
    icon: "account_balance",
    name: "Financial Services",
    description:
      "Banks and fintechs redacting transaction data, KYC documents, and customer communications.",
  },
  {
    icon: "apartment",
    name: "Government & Public Sector",
    description:
      "Agencies processing citizen data for FOI requests, inter-department transfers, and open data.",
  },
  {
    icon: "school",
    name: "Education & Research",
    description:
      "Universities de-identifying student records, survey data, and research corpora for GDPR compliance.",
  },
  {
    icon: "shield",
    name: "Insurance",
    description:
      "Insurers anonymizing claims data, medical reports, and policy documents for actuarial analysis.",
  },
];

export default function UseCasesPage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="bg-primary hero-pattern pt-48 pb-20 px-6 md:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-black tracking-widest uppercase mb-12 border border-secondary/30">
            <span className="material-symbols-outlined text-sm">cases</span>
            Use Cases
          </div>
          <h1 className="font-black text-4xl md:text-8xl text-white tracking-tighter leading-[0.85] mb-8">
            PII Redaction for{" "}
            <span className="text-secondary">Every Pipeline.</span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg md:text-xl text-slate-300 leading-relaxed font-medium">
            From LLM pre-processing to log sanitization — see how European
            developers use euRedact to build GDPR-compliant applications.
          </p>
        </div>
      </section>

      {/* ===== USE CASE CARDS ===== */}
      {useCases.map((uc, i) => {
        const isOdd = i % 2 === 1;
        const bgOptions = ["bg-white", "bg-slate-50", "bg-white", "bg-slate-50", "bg-white", "bg-slate-50"];
        const darkBg = i % 3 === 1;

        return (
          <section
            key={uc.title}
            className={`px-6 md:px-8 py-16 md:py-28 overflow-hidden ${
              darkBg
                ? "bg-primary hero-pattern text-white"
                : bgOptions[i]
            }`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
                {/* Text side */}
                <div className={isOdd ? "lg:order-2" : ""}>
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    {uc.audiences.map((a) => (
                      <span
                        key={a}
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          darkBg
                            ? "bg-white/10 text-slate-300"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {a}
                      </span>
                    ))}
                  </div>

                  <h2
                    className={`font-black text-3xl md:text-4xl tracking-tight mb-3 ${
                      darkBg ? "text-white" : "text-primary"
                    }`}
                  >
                    {uc.title}
                  </h2>
                  <p className="text-base md:text-lg text-secondary font-bold mb-6">
                    {uc.subtitle}
                  </p>
                  <p
                    className={`text-sm md:text-base leading-relaxed mb-8 ${
                      darkBg ? "text-slate-300" : "text-on-surface-variant"
                    }`}
                  >
                    {uc.description}
                  </p>

                  <ul className="space-y-4">
                    {uc.benefits.map((b) => (
                      <li
                        key={b}
                        className={`flex items-start gap-3 text-sm md:text-base font-medium ${
                          darkBg ? "text-slate-200" : "text-slate-700"
                        }`}
                      >
                        <span className="material-symbols-outlined text-secondary text-lg mt-0.5 shrink-0">
                          check_circle
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code side */}
                <div className={isOdd ? "lg:order-1" : ""}>
                  <div
                    className={`rounded-2xl md:rounded-[2rem] p-5 md:p-8 shadow-2xl overflow-hidden ${
                      darkBg
                        ? "bg-black/40 border border-white/10"
                        : "bg-slate-950 border border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-4 md:mb-6">
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-400/60" />
                      <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/60" />
                    </div>
                    <pre className="text-xs md:text-sm text-slate-300 font-mono leading-relaxed overflow-x-auto">
                      <code>{uc.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ===== INDUSTRIES ===== */}
      <section className="py-20 md:py-32 px-6 md:px-8 bg-accent-indigo text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full hero-pattern opacity-5" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-14 md:mb-20">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6">
              Built for European Industries
            </h2>
            <div className="w-24 h-2 bg-secondary rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {industries.map((ind) => (
              <div
                key={ind.name}
                className="group p-8 md:p-10 bg-white/5 rounded-[2rem] md:rounded-[2.5rem] hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-secondary/50"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-secondary rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-lg electric-glow">
                  <span className="material-symbols-outlined text-primary text-xl md:text-2xl">
                    {ind.icon}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-3 md:mb-4">
                  {ind.name}
                </h3>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed font-medium">
                  {ind.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 md:py-32 px-6 md:px-8">
        <div className="max-w-5xl mx-auto bg-primary rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-28 text-center relative overflow-hidden shadow-2xl electric-glow">
          <div className="absolute inset-0 hero-pattern opacity-10" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-none">
              Your Use Case.{" "}
              <span className="text-secondary">Our SDK.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-300 leading-relaxed mb-10 md:mb-14 font-medium">
              euRedact handles structured PII redaction for any European
              data pipeline. Get started in under a minute.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
              <Link
                href="/docs/quickstart"
                className="w-full md:w-auto bg-secondary text-primary px-10 md:px-12 py-4 md:py-5 rounded-2xl font-black uppercase tracking-widest text-sm md:text-base hover:bg-emerald-400 hover:scale-105 transition-all shadow-2xl text-center flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined text-xl">
                  rocket_launch
                </span>
                Get Started
              </Link>
              <Link
                href="/demo"
                className="text-white hover:text-secondary font-black tracking-widest text-sm uppercase transition-all flex items-center gap-2"
              >
                Try Live Demo
                <span className="material-symbols-outlined">
                  arrow_outward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
