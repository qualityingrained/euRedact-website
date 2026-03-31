import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quickstart — euRedact Docs",
  description:
    "Get started with euRedact in 30 seconds. Install the Python or Node.js SDK and redact European PII in one function call.",
};

function CodeBlock({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10">
      {title && (
        <div className="bg-[#0F172A] px-5 py-3 border-b border-white/10">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
            {title}
          </span>
        </div>
      )}
      <pre className="bg-[#1E293B] p-6 overflow-x-auto">
        <code className="text-sm font-mono leading-relaxed">{children}</code>
      </pre>
    </div>
  );
}

export default function QuickstartPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary hero-pattern py-20">
        <div className="mx-auto max-w-4xl px-8">
          <div className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-4">
            Getting Started
          </div>
          <h1 className="font-black text-5xl text-white tracking-tight">
            Quickstart
          </h1>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed max-w-2xl">
            Redact European PII in one function call. Choose your language and
            get running in 30 seconds.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 px-8">
        <div className="mx-auto max-w-4xl">
          {/* Python */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
                <span className="material-symbols-outlined text-secondary">
                  code
                </span>
              </div>
              <h2 className="font-black text-3xl text-primary tracking-tight">
                Python
              </h2>
            </div>

            <h3 className="font-black text-lg text-primary mb-3">
              1. Install
            </h3>
            <CodeBlock title="Terminal">
              <span className="text-secondary">$</span>
              <span className="text-white"> pip install euredact</span>
            </CodeBlock>

            <h3 className="font-black text-lg text-primary mb-3 mt-8">
              2. Redact
            </h3>
            <CodeBlock title="main.py">
              <span className="text-purple-400">from</span>
              <span className="text-white"> euredact </span>
              <span className="text-purple-400">import</span>
              <span className="text-white"> redact{"\n\n"}</span>
              <span className="text-white">result = </span>
              <span className="text-secondary">redact</span>
              <span className="text-white">(</span>
              <span className="text-amber-300">
                &quot;Mijn BSN is 111222333 en IBAN NL91ABNA0417164300.&quot;
              </span>
              <span className="text-white">){"\n\n"}</span>
              <span className="text-secondary">print</span>
              <span className="text-white">(result.redacted_text){"\n"}</span>
              <span className="text-slate-500">
                # &quot;Mijn BSN is [NATIONAL_ID] en IBAN [IBAN].&quot;
              </span>
              <span className="text-white">{"\n\n"}</span>
              <span className="text-secondary">print</span>
              <span className="text-white">(result.detections)</span>
            </CodeBlock>

            <div className="mt-4">
              <Link
                href="/docs/python"
                className="text-secondary font-black text-sm hover:underline inline-flex items-center gap-1"
              >
                Full Python SDK reference
                <span className="material-symbols-outlined text-base">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>

          {/* Node.js */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
                <span className="material-symbols-outlined text-secondary">
                  javascript
                </span>
              </div>
              <h2 className="font-black text-3xl text-primary tracking-tight">
                Node.js
              </h2>
            </div>

            <h3 className="font-black text-lg text-primary mb-3">
              1. Install
            </h3>
            <CodeBlock title="Terminal">
              <span className="text-secondary">$</span>
              <span className="text-white"> npm install euredact</span>
            </CodeBlock>

            <h3 className="font-black text-lg text-primary mb-3 mt-8">
              2. Redact
            </h3>
            <CodeBlock title="index.ts">
              <span className="text-purple-400">import</span>
              <span className="text-white"> {"{ "}</span>
              <span className="text-white">redact</span>
              <span className="text-white">{" }"} </span>
              <span className="text-purple-400">from</span>
              <span className="text-amber-300"> &quot;euredact&quot;</span>
              <span className="text-white">;{"\n\n"}</span>
              <span className="text-purple-400">const</span>
              <span className="text-white"> result = </span>
              <span className="text-secondary">redact</span>
              <span className="text-white">(</span>
              <span className="text-amber-300">
                &quot;Mijn BSN is 111222333 en IBAN NL91ABNA0417164300.&quot;
              </span>
              <span className="text-white">, {"{\n"}</span>
              <span className="text-white">  countries: [</span>
              <span className="text-amber-300">&quot;NL&quot;</span>
              <span className="text-white">],{"\n"}</span>
              <span className="text-white">{"}"});</span>
              <span className="text-white">{"\n\n"}</span>
              <span className="text-white">console.</span>
              <span className="text-secondary">log</span>
              <span className="text-white">(result.redactedText);{"\n"}</span>
              <span className="text-slate-500">
                // &quot;Mijn BSN is [NATIONAL_ID] en IBAN [IBAN].&quot;
              </span>
              <span className="text-white">{"\n\n"}</span>
              <span className="text-white">console.</span>
              <span className="text-secondary">log</span>
              <span className="text-white">(result.detections);</span>
            </CodeBlock>

            <div className="mt-4">
              <Link
                href="/docs/nodejs"
                className="text-secondary font-black text-sm hover:underline inline-flex items-center gap-1"
              >
                Full Node.js SDK reference
                <span className="material-symbols-outlined text-base">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Supported entities */}
      <section className="bg-slate-50 py-16 px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-black text-3xl text-primary mb-6 tracking-tight">
            What Gets Detected
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-8">
            euRedact detects 20+ PII entity types across 32 European countries
            with &gt;99% recall.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "NATIONAL_ID",
              "IBAN",
              "PHONE",
              "EMAIL",
              "TAX_ID",
              "CREDIT_CARD",
              "LICENSE_PLATE",
              "PASSPORT",
              "VAT",
              "BIC",
              "VIN",
              "IP_ADDRESS",
              "MAC_ADDRESS",
              "UUID",
              "IMEI",
              "GPS_COORDINATES",
              "SOCIAL_HANDLE",
              "DOB",
              "POSTAL_CODE",
              "HEALTHCARE_PROVIDER",
              "HEALTH_INSURANCE",
            ].map((entity) => (
              <span
                key={entity}
                className="inline-block rounded-lg bg-[#1E293B] px-3 py-1.5 text-xs font-mono font-bold text-secondary"
              >
                [{entity}]
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
