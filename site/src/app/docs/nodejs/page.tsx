import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Node.js SDK — euRedact Docs",
  description:
    "Complete API reference for the euRedact Node.js SDK. Zero dependencies, 86KB, 0.3ms per page.",
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
          <span className="text-xs font-black text-on-surface-variant uppercase tracking-widest">
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

function ParamTable({
  params,
}: {
  params: { name: string; type: string; default?: string; description: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border-2 border-outline-variant">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-primary">
            <th className="text-left px-5 py-3 font-black text-on-surface text-xs uppercase tracking-widest">
              Parameter
            </th>
            <th className="text-left px-5 py-3 font-black text-on-surface text-xs uppercase tracking-widest">
              Type
            </th>
            <th className="text-left px-5 py-3 font-black text-on-surface text-xs uppercase tracking-widest">
              Default
            </th>
            <th className="text-left px-5 py-3 font-black text-on-surface text-xs uppercase tracking-widest">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {params.map((p) => (
            <tr key={p.name} className="border-t border-outline-variant">
              <td className="px-5 py-3">
                <code className="text-secondary font-mono font-bold text-xs bg-secondary/10 px-2 py-0.5 rounded">
                  {p.name}
                </code>
              </td>
              <td className="px-5 py-3">
                <code className="text-on-surface-variant font-mono text-xs">
                  {p.type}
                </code>
              </td>
              <td className="px-5 py-3">
                <code className="text-on-surface-variant font-mono text-xs">
                  {p.default || "—"}
                </code>
              </td>
              <td className="px-5 py-3 text-on-surface-variant">
                {p.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const countries = [
  "AT", "BE", "BG", "CH", "CY", "CZ", "DE", "DK", "EE", "EL",
  "ES", "FI", "FR", "HR", "HU", "IE", "IS", "IT", "LT", "LU",
  "LV", "MT", "NL", "NO", "PL", "PT", "RO", "SE", "SI", "SK", "UK",
];

const entities = [
  "BANK_ACCOUNT", "BIC", "CREDIT_CARD", "PHONE", "EMAIL",
  "DOB", "DATE_OF_DEATH", "NATIONAL_ID", "SSN", "TAX_ID", "PASSPORT",
  "DRIVERS_LICENSE", "LICENSE_PLATE", "VIN", "VAT",
  "POSTAL_CODE", "IP_ADDRESS", "IPV6_ADDRESS", "MAC_ADDRESS",
  "HEALTH_INSURANCE", "HEALTHCARE_PROVIDER", "CHAMBER_OF_COMMERCE",
  "IMEI", "GPS_COORDINATES", "UUID", "SOCIAL_HANDLE", "SECRET",
];

export default function NodejsSDKPage() {
  return (
    <>
      <PageHero
        eyebrow="SDK reference"
        title="Node.js SDK"
        subtitle="Zero-dependency PII redaction for Node.js. 86KB package, 0.3ms per page."
      >
          <div className="flex gap-4">
            <a
              href="https://www.npmjs.com/package/euredact"
              className="inline-flex items-center gap-2 text-secondary font-black text-sm hover:underline"
            >
              <span className="material-symbols-outlined text-base">
                package_2
              </span>
              npm
            </a>
            <a
              href="https://github.com/euRedact/euRedact/tree/main/euredact-ts"
              className="inline-flex items-center gap-2 text-secondary font-black text-sm hover:underline"
            >
              <span className="material-symbols-outlined text-base">code</span>
              GitHub
            </a>
          </div>
      </PageHero>

      <section className="bg-surface py-16 px-8">
        <div className="mx-auto max-w-4xl space-y-16">
          {/* Installation */}
          <div>
            <h2 className="font-black text-3xl text-on-surface mb-6 tracking-tight">
              Installation
            </h2>
            <CodeBlock title="Terminal">
              <span className="text-secondary">$</span>
              <span className="text-white"> npm install euredact</span>
            </CodeBlock>
          </div>

          {/* redact() */}
          <div>
            <h2 className="font-black text-3xl text-on-surface mb-2 tracking-tight">
              redact()
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Main entry point. Redact PII from a text string. Returns a{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                RedactResult
              </code>{" "}
              with the cleaned text and a list of detections.
            </p>

            <CodeBlock title="Signature">
              <span className="text-purple-400">function</span>
              <span className="text-secondary"> redact</span>
              <span className="text-white">(</span>
              {"\n"}
              <span className="text-white">  text: </span>
              <span className="text-blue-300">string</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">  options?: </span>
              <span className="text-blue-300">RedactOptions</span>
              {"\n"}
              <span className="text-white">): </span>
              <span className="text-blue-300">RedactResult</span>
            </CodeBlock>

            <div className="mt-6">
              <ParamTable
                params={[
                  {
                    name: "text",
                    type: "string",
                    description: "The input text to redact.",
                  },
                  {
                    name: "countries",
                    type: "string[]",
                    default: "undefined",
                    description:
                      "Country codes (e.g. [\"NL\", \"BE\"]). Optional, but strongly recommended: passing it lifts recall from 94.4% to 98.3% and precision from 95.2% to 98.9%, and runs 3.5x faster. Omit to detect all supported countries.",
                  },
                  {
                    name: "referentialIntegrity",
                    type: "boolean",
                    default: "false",
                    description:
                      "Replace PII with consistent labels (ENTITY_1, ENTITY_2, ...) instead of generic type labels.",
                  },
                  {
                    name: "detectDates",
                    type: "boolean",
                    default: "false",
                    description:
                      "Include DOB and date-of-death detections. Off by default.",
                  },
                  {
                    name: "cache",
                    type: "boolean",
                    default: "true",
                    description:
                      "Enable result caching for faster subsequent calls.",
                  },
                ]}
              />
            </div>

            <h3 className="font-black text-xl text-on-surface mt-8 mb-3">
              Return value
            </h3>
            <p className="text-on-surface-variant leading-relaxed mb-4">
              A{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                RedactResult
              </code>{" "}
              object with:
            </p>
            <ParamTable
              params={[
                {
                  name: "redactedText",
                  type: "string",
                  description:
                    'The text with PII replaced by labels like [NATIONAL_ID], [BANK_ACCOUNT], etc.',
                },
                {
                  name: "detections",
                  type: "Detection[]",
                  description:
                    "Array of detected PII entities with type, value, position, and country.",
                },
                {
                  name: "source",
                  type: "string",
                  description:
                    "Source identifier for the redaction engine.",
                },
                {
                  name: "degraded",
                  type: "boolean",
                  description:
                    "Whether the result was produced in a degraded mode.",
                },
              ]}
            />

            <h3 className="font-black text-xl text-on-surface mt-8 mb-3">
              Detection
            </h3>
            <p className="text-on-surface-variant leading-relaxed mb-4">
              Each detection in the array contains:
            </p>
            <ParamTable
              params={[
                {
                  name: "entityType",
                  type: "EntityType",
                  description: "The type of PII detected (enum value).",
                },
                {
                  name: "start",
                  type: "number",
                  description: "Start character index in the original text.",
                },
                {
                  name: "end",
                  type: "number",
                  description: "End character index in the original text.",
                },
                {
                  name: "text",
                  type: "string",
                  description: "The original PII text that was detected.",
                },
                {
                  name: "source",
                  type: "DetectionSource",
                  description: "The detection engine that found this entity.",
                },
                {
                  name: "country",
                  type: "string | null",
                  description:
                    "The country code associated with this detection, or null.",
                },
                {
                  name: "confidence",
                  type: "string",
                  description: "Confidence level of the detection.",
                },
              ]}
            />

            <h3 className="font-black text-xl text-on-surface mt-8 mb-3">
              Example
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
              {"\n"}
              <span className="text-white">  </span>
              <span className="text-amber-300">
                &quot;Mijn BSN is 111222333 en IBAN NL91ABNA0417164300.&quot;
              </span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">  {"{ "}countries: [</span>
              <span className="text-amber-300">&quot;NL&quot;</span>
              <span className="text-white">] {"}"}</span>
              {"\n"}
              <span className="text-white">);{"\n\n"}</span>
              <span className="text-white">console.</span>
              <span className="text-secondary">log</span>
              <span className="text-white">(result.redactedText);{"\n"}</span>
              <span className="text-on-surface-variant">
                // &quot;Mijn BSN is [NATIONAL_ID] en IBAN [BANK_ACCOUNT].&quot;
              </span>
              {"\n\n"}
              <span className="text-white">console.</span>
              <span className="text-secondary">log</span>
              <span className="text-white">(result.detections);</span>
            </CodeBlock>
          </div>

          {/* redactBatch() */}
          <div>
            <h2 className="font-black text-3xl text-on-surface mb-2 tracking-tight">
              redactBatch()
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Process multiple texts efficiently. Loads country configs once.
              Same options as{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                redact()
              </code>
              , returns an array of{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                RedactResult
              </code>
              .
            </p>

            <CodeBlock title="Signature">
              <span className="text-purple-400">function</span>
              <span className="text-secondary"> redactBatch</span>
              <span className="text-white">(</span>
              {"\n"}
              <span className="text-white">  texts: </span>
              <span className="text-blue-300">string[]</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">  options?: </span>
              <span className="text-blue-300">RedactOptions</span>
              {"\n"}
              <span className="text-white">): </span>
              <span className="text-blue-300">RedactResult[]</span>
            </CodeBlock>

            <h3 className="font-black text-xl text-on-surface mt-8 mb-3">
              Example
            </h3>
            <CodeBlock title="batch.ts">
              <span className="text-purple-400">import</span>
              <span className="text-white"> {"{ "}</span>
              <span className="text-white">redactBatch</span>
              <span className="text-white">{" }"} </span>
              <span className="text-purple-400">from</span>
              <span className="text-amber-300"> &quot;euredact&quot;</span>
              <span className="text-white">;{"\n\n"}</span>
              <span className="text-purple-400">const</span>
              <span className="text-white"> results = </span>
              <span className="text-secondary">redactBatch</span>
              <span className="text-white">([{"\n"}</span>
              <span className="text-white">  </span>
              <span className="text-amber-300">
                &quot;BSN 111222333&quot;
              </span>
              <span className="text-white">,{"\n"}</span>
              <span className="text-white">  </span>
              <span className="text-amber-300">
                &quot;IBAN DE89370400440532013000&quot;
              </span>
              <span className="text-white">,{"\n"}</span>
              <span className="text-white">]);{"\n\n"}</span>
              <span className="text-white">results.</span>
              <span className="text-secondary">forEach</span>
              <span className="text-white">((r) =&gt; {"{\n"}</span>
              <span className="text-white">  console.</span>
              <span className="text-secondary">log</span>
              <span className="text-white">(r.redactedText);{"\n"}</span>
              <span className="text-white">{"}"});</span>
            </CodeBlock>
          </div>

          {/* addCustomPattern() */}
          <div>
            <h2 className="font-black text-3xl text-on-surface mb-2 tracking-tight">
              addCustomPattern()
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Register a custom regex pattern at runtime. Detected matches will
              be labeled with the given entity type.
            </p>

            <CodeBlock title="Signature">
              <span className="text-purple-400">function</span>
              <span className="text-secondary"> addCustomPattern</span>
              <span className="text-white">(</span>
              {"\n"}
              <span className="text-white">  entityType: </span>
              <span className="text-blue-300">string</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">  pattern: </span>
              <span className="text-blue-300">string</span>
              {"\n"}
              <span className="text-white">): </span>
              <span className="text-blue-300">void</span>
            </CodeBlock>

            <div className="mt-6">
              <ParamTable
                params={[
                  {
                    name: "entityType",
                    type: "string",
                    description:
                      "The label to use for matches (e.g. \"EMPLOYEE_ID\").",
                  },
                  {
                    name: "pattern",
                    type: "string",
                    description:
                      "A regex pattern string to match against input text.",
                  },
                ]}
              />
            </div>

            <h3 className="font-black text-xl text-on-surface mt-8 mb-3">
              Example
            </h3>
            <CodeBlock title="custom.ts">
              <span className="text-purple-400">import</span>
              <span className="text-white"> {"{ "}</span>
              <span className="text-white">addCustomPattern, redact</span>
              <span className="text-white">{" }"} </span>
              <span className="text-purple-400">from</span>
              <span className="text-amber-300"> &quot;euredact&quot;</span>
              <span className="text-white">;{"\n\n"}</span>
              <span className="text-secondary">addCustomPattern</span>
              <span className="text-white">(</span>
              <span className="text-amber-300">&quot;EMPLOYEE_ID&quot;</span>
              <span className="text-white">, </span>
              <span className="text-amber-300">&quot;EMP-\\d{"{6}"}&quot;</span>
              <span className="text-white">);{"\n\n"}</span>
              <span className="text-purple-400">const</span>
              <span className="text-white"> result = </span>
              <span className="text-secondary">redact</span>
              <span className="text-white">(</span>
              <span className="text-amber-300">
                &quot;Contact EMP-123456 for details&quot;
              </span>
              <span className="text-white">);{"\n\n"}</span>
              <span className="text-white">console.</span>
              <span className="text-secondary">log</span>
              <span className="text-white">(result.redactedText);{"\n"}</span>
              <span className="text-on-surface-variant">
                // &quot;Contact [EMPLOYEE_ID] for details&quot;
              </span>
            </CodeBlock>
          </div>

          {/* availableCountries() */}
          <div>
            <h2 className="font-black text-3xl text-on-surface mb-2 tracking-tight">
              availableCountries()
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Returns an array of supported ISO country codes.
            </p>
            <CodeBlock title="example.ts">
              <span className="text-purple-400">import</span>
              <span className="text-white"> {"{ "}</span>
              <span className="text-white">availableCountries</span>
              <span className="text-white">{" }"} </span>
              <span className="text-purple-400">from</span>
              <span className="text-amber-300"> &quot;euredact&quot;</span>
              <span className="text-white">;{"\n\n"}</span>
              <span className="text-white">console.</span>
              <span className="text-secondary">log</span>
              <span className="text-white">(</span>
              <span className="text-secondary">availableCountries</span>
              <span className="text-white">());  </span>
              <span className="text-on-surface-variant">
                // [&quot;AT&quot;, &quot;BE&quot;, &quot;BG&quot;, ...]
              </span>
            </CodeBlock>
          </div>

          {/* Secret Detection */}
          <div>
            <h2 className="font-black text-3xl text-on-surface mb-2 tracking-tight">
              Secret Detection
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              euRedact automatically detects secrets and API keys using two
              strategies: known-prefix patterns for popular services (AWS,
              GitHub, Stripe, OpenAI, Slack, JWT, SendGrid) and an
              entropy-based fallback that catches generic secrets near context
              keywords like{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                api_key
              </code>
              ,{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                token
              </code>
              , and{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                secret
              </code>
              . Detected secrets are labeled as{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                [SECRET]
              </code>
              .
            </p>
            <CodeBlock title="secrets.ts">
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
              {"\n"}
              <span className="text-white">  </span>
              <span className="text-amber-300">
                &quot;My API key is sk-proj-abc123def456ghi789&quot;
              </span>
              {"\n"}
              <span className="text-white">);{"\n\n"}</span>
              <span className="text-white">console.</span>
              <span className="text-secondary">log</span>
              <span className="text-white">(result.redactedText);{"\n"}</span>
              <span className="text-on-surface-variant">
                // &quot;My API key is [SECRET]&quot;
              </span>
            </CodeBlock>
          </div>

          {/* Performance */}
          <div>
            <h2 className="font-black text-3xl text-on-surface mb-6 tracking-tight">
              Performance
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="rounded-2xl bg-primary border-2 border-outline-variant p-8">
                <div className="text-4xl font-black text-on-surface mb-2">
                  0.3ms
                </div>
                <div className="text-xs font-black text-on-surface-variant uppercase tracking-[0.2em]">
                  Per page (2,000 chars)
                </div>
              </div>
              <div className="rounded-2xl bg-primary border-2 border-outline-variant p-8">
                <div className="text-4xl font-black text-on-surface mb-2">
                  ~25,000
                </div>
                <div className="text-xs font-black text-on-surface-variant uppercase tracking-[0.2em]">
                  Records per second
                </div>
              </div>
              <div className="rounded-2xl bg-primary border-2 border-outline-variant p-8">
                <div className="text-4xl font-black text-on-surface mb-2">
                  ~50KB
                </div>
                <div className="text-xs font-black text-on-surface-variant uppercase tracking-[0.2em]">
                  Memory per country
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 mt-6">
              <div className="rounded-2xl bg-primary border-2 border-outline-variant p-8">
                <div className="text-4xl font-black text-on-surface mb-2">
                  86KB
                </div>
                <div className="text-xs font-black text-on-surface-variant uppercase tracking-[0.2em]">
                  Package size
                </div>
              </div>
              <div className="rounded-2xl bg-primary border-2 border-outline-variant p-8">
                <div className="text-4xl font-black text-on-surface mb-2">0</div>
                <div className="text-xs font-black text-on-surface-variant uppercase tracking-[0.2em]">
                  Dependencies
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported countries */}
      <section className="bg-primary py-16 px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-black text-3xl text-on-surface mb-6 tracking-tight">
            Supported Countries
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            31 European and EEA countries with country-specific PII patterns.
          </p>
          <div className="flex flex-wrap gap-2 mb-12">
            {countries.map((code) => (
              <span
                key={code}
                className="inline-block rounded-lg bg-code px-3 py-1.5 text-xs font-mono font-bold text-white"
              >
                {code}
              </span>
            ))}
          </div>

          <h2 className="font-black text-3xl text-on-surface mb-6 tracking-tight">
            Entity Types
          </h2>
          <div className="flex flex-wrap gap-2">
            {entities.map((entity) => (
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

      {/* Links */}
      <section className="bg-surface py-16 px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[2rem] bg-code p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-black text-xl text-white mb-2">
                View source on GitHub
              </h3>
              <p className="text-on-surface-variant text-sm">
                Browse the code, report issues, or contribute.
              </p>
            </div>
            <a
              href="https://github.com/euRedact/euRedact/tree/main/euredact-ts"
              className="shrink-0 inline-flex items-center gap-2 bg-secondary text-primary px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-secondary-hover transition-all"
            >
              GitHub
              <span className="material-symbols-outlined text-base">
                arrow_outward
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
