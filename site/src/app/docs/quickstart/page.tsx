import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";

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
        <div className="bg-primary px-5 py-3 border-b border-white/10">
          <span className="text-xs font-black text-on-surface-variant uppercase tracking-widest">
            {title}
          </span>
        </div>
      )}
      <pre className="bg-code p-6 overflow-x-auto">
        <code className="text-sm font-mono leading-relaxed">{children}</code>
      </pre>
    </div>
  );
}

export default function QuickstartPage() {
  return (
    <>
      <PageHero
        eyebrow="Getting started"
        title="Quickstart"
        subtitle="Redact European PII in one function call. Choose your language and get running in 30 seconds."
      />

      <section className="bg-surface py-16 px-8">
        <div className="mx-auto max-w-4xl">
          {/* Python */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
                <span className="material-symbols-outlined text-secondary">
                  code
                </span>
              </div>
              <h2 className="font-black text-3xl text-on-surface tracking-tight">
                Python
              </h2>
            </div>

            <h3 className="font-black text-lg text-on-surface mb-3">
              1. Install
            </h3>
            <CodeBlock title="Terminal">
              <span className="text-secondary">$</span>
              <span className="text-white"> pip install euredact</span>
            </CodeBlock>

            <h3 className="font-black text-lg text-on-surface mb-3 mt-8">
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
              <span className="text-pii-highlight">
                &quot;Mijn BSN is 111222333 en IBAN NL91ABNA0417164300.&quot;
              </span>
              <span className="text-white">){"\n\n"}</span>
              <span className="text-secondary">print</span>
              <span className="text-white">(result.redacted_text){"\n"}</span>
              <span className="text-on-surface-variant">
                # &quot;Mijn BSN is [NATIONAL_ID] en IBAN [BANK_ACCOUNT].&quot;
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
              <h2 className="font-black text-3xl text-on-surface tracking-tight">
                Node.js
              </h2>
            </div>

            <h3 className="font-black text-lg text-on-surface mb-3">
              1. Install
            </h3>
            <CodeBlock title="Terminal">
              <span className="text-secondary">$</span>
              <span className="text-white"> npm install euredact</span>
            </CodeBlock>

            <h3 className="font-black text-lg text-on-surface mb-3 mt-8">
              2. Redact
            </h3>
            <CodeBlock title="index.ts">
              <span className="text-purple-400">import</span>
              <span className="text-white"> {"{ "}</span>
              <span className="text-white">redact</span>
              <span className="text-white">{" }"} </span>
              <span className="text-purple-400">from</span>
              <span className="text-pii-highlight"> &quot;euredact&quot;</span>
              <span className="text-white">;{"\n\n"}</span>
              <span className="text-purple-400">const</span>
              <span className="text-white"> result = </span>
              <span className="text-secondary">redact</span>
              <span className="text-white">(</span>
              <span className="text-pii-highlight">
                &quot;Mijn BSN is 111222333 en IBAN NL91ABNA0417164300.&quot;
              </span>
              <span className="text-white">, {"{\n"}</span>
              <span className="text-white">  countries: [</span>
              <span className="text-pii-highlight">&quot;NL&quot;</span>
              <span className="text-white">],{"\n"}</span>
              <span className="text-white">{"}"});</span>
              <span className="text-white">{"\n\n"}</span>
              <span className="text-white">console.</span>
              <span className="text-secondary">log</span>
              <span className="text-white">(result.redactedText);{"\n"}</span>
              <span className="text-on-surface-variant">
                // &quot;Mijn BSN is [NATIONAL_ID] en IBAN [BANK_ACCOUNT].&quot;
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
      <section className="bg-primary py-16 px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-black text-3xl text-on-surface mb-6 tracking-tight">
            What Gets Detected
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-4">
            The SDKs detect 27 PII entity types across 31 European countries
            with 99.72% recall and 99.82% precision, backed by 346 pattern
            definitions and 44 checksum validators. Those figures come from a
            generated evaluation set of 152,300 records with the optional{" "}
            <span className="font-mono">countries</span> parameter supplied.
            Since 0.3.2 that parameter scores a detection rather than gating it:
            every pattern runs either way, and blind detection — no country
            declared — scores 99.50% recall and 99.59% precision. Date-of-birth
            detection is excluded and sits at 62.76% recall by design; bare
            dates are deferred to the AI layer.
          </p>
          <p className="text-on-surface-variant leading-relaxed mb-8">
            Those 27 are the Rules Engine layer — everything with a format
            regular enough to match and, often, a checksum to confirm. The
            forthcoming AI layer adds 13 more for the categories that have no
            fixed shape: names, addresses, job titles, and the special-category
            data covered by GDPR Article 9.{" "}
            <Link
              href="/docs/coverage"
              className="text-secondary hover:underline"
            >
              What euRedact detects
            </Link>{" "}
            lists all 40, what each one covers and deliberately does not, and
            which layer is responsible.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "NATIONAL_ID",
              "BANK_ACCOUNT",
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
                className="inline-block rounded-lg bg-pii-danger/15 border border-pii-danger/30 px-3 py-1.5 text-xs font-mono font-bold text-pii-danger"
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
