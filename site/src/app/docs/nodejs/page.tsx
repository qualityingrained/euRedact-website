import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Node.js SDK — euRedact Docs",
  description:
    "Complete API reference for the euRedact Node.js SDK. Zero dependencies, 86KB, 0.02ms per redaction.",
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

function ParamTable({
  params,
}: {
  params: { name: string; type: string; default?: string; description: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border-2 border-slate-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-50">
            <th className="text-left px-5 py-3 font-black text-primary text-xs uppercase tracking-widest">
              Parameter
            </th>
            <th className="text-left px-5 py-3 font-black text-primary text-xs uppercase tracking-widest">
              Type
            </th>
            <th className="text-left px-5 py-3 font-black text-primary text-xs uppercase tracking-widest">
              Default
            </th>
            <th className="text-left px-5 py-3 font-black text-primary text-xs uppercase tracking-widest">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {params.map((p) => (
            <tr key={p.name} className="border-t border-slate-100">
              <td className="px-5 py-3">
                <code className="text-secondary font-mono font-bold text-xs bg-secondary/10 px-2 py-0.5 rounded">
                  {p.name}
                </code>
              </td>
              <td className="px-5 py-3">
                <code className="text-slate-600 font-mono text-xs">
                  {p.type}
                </code>
              </td>
              <td className="px-5 py-3">
                <code className="text-slate-500 font-mono text-xs">
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
  "NAME", "ADDRESS", "IBAN", "BIC", "CREDIT_CARD", "PHONE", "EMAIL",
  "DOB", "DATE_OF_DEATH", "NATIONAL_ID", "SSN", "TAX_ID", "PASSPORT",
  "DRIVERS_LICENSE", "RESIDENCE_PERMIT", "LICENSE_PLATE", "VIN", "VAT",
  "POSTAL_CODE", "IP_ADDRESS", "IPV6_ADDRESS", "MAC_ADDRESS",
  "HEALTH_INSURANCE", "HEALTHCARE_PROVIDER", "CHAMBER_OF_COMMERCE",
  "IMEI", "GPS_COORDINATES", "UUID", "SOCIAL_HANDLE", "SECRET", "OTHER",
];

export default function NodejsSDKPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary hero-pattern py-20">
        <div className="mx-auto max-w-4xl px-8">
          <div className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-4">
            SDK Reference
          </div>
          <h1 className="font-black text-5xl text-white tracking-tight">
            Node.js SDK
          </h1>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed max-w-2xl">
            Zero-dependency PII redaction for Node.js. 86KB package, 0.02ms per
            redaction.
          </p>
          <div className="mt-6 flex gap-4">
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
        </div>
      </section>

      <section className="bg-white py-16 px-8">
        <div className="mx-auto max-w-4xl space-y-16">
          {/* Installation */}
          <div>
            <h2 className="font-black text-3xl text-primary mb-6 tracking-tight">
              Installation
            </h2>
            <CodeBlock title="Terminal">
              <span className="text-secondary">$</span>
              <span className="text-white"> npm install euredact</span>
            </CodeBlock>
          </div>

          {/* redact() */}
          <div>
            <h2 className="font-black text-3xl text-primary mb-2 tracking-tight">
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
                      "Country codes (e.g. [\"NL\", \"BE\"]). Recommended for best precision. Omit to detect all supported countries.",
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

            <h3 className="font-black text-xl text-primary mt-8 mb-3">
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
                    'The text with PII replaced by labels like [NATIONAL_ID], [IBAN], etc.',
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

            <h3 className="font-black text-xl text-primary mt-8 mb-3">
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

            <h3 className="font-black text-xl text-primary mt-8 mb-3">
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
              <span className="text-slate-500">
                // &quot;Mijn BSN is [NATIONAL_ID] en IBAN [IBAN].&quot;
              </span>
              {"\n\n"}
              <span className="text-white">console.</span>
              <span className="text-secondary">log</span>
              <span className="text-white">(result.detections);</span>
            </CodeBlock>
          </div>

          {/* redactBatch() */}
          <div>
            <h2 className="font-black text-3xl text-primary mb-2 tracking-tight">
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

            <h3 className="font-black text-xl text-primary mt-8 mb-3">
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
            <h2 className="font-black text-3xl text-primary mb-2 tracking-tight">
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

            <h3 className="font-black text-xl text-primary mt-8 mb-3">
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
              <span className="text-slate-500">
                // &quot;Contact [EMPLOYEE_ID] for details&quot;
              </span>
            </CodeBlock>
          </div>

          {/* availableCountries() */}
          <div>
            <h2 className="font-black text-3xl text-primary mb-2 tracking-tight">
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
              <span className="text-slate-500">
                // [&quot;AT&quot;, &quot;BE&quot;, &quot;BG&quot;, ...]
              </span>
            </CodeBlock>
          </div>

          {/* Secret Detection */}
          <div>
            <h2 className="font-black text-3xl text-primary mb-2 tracking-tight">
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
              <span className="text-slate-500">
                // &quot;My API key is [SECRET]&quot;
              </span>
            </CodeBlock>
          </div>

          {/* Performance */}
          <div>
            <h2 className="font-black text-3xl text-primary mb-6 tracking-tight">
              Performance
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="rounded-2xl bg-slate-50 border-2 border-slate-200 p-8">
                <div className="text-4xl font-black text-primary mb-2">
                  ~0.02ms
                </div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                  Per page (~500 words)
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 border-2 border-slate-200 p-8">
                <div className="text-4xl font-black text-primary mb-2">
                  ~50,000
                </div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                  Records per second
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 border-2 border-slate-200 p-8">
                <div className="text-4xl font-black text-primary mb-2">
                  ~50KB
                </div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                  Memory per country
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 mt-6">
              <div className="rounded-2xl bg-slate-50 border-2 border-slate-200 p-8">
                <div className="text-4xl font-black text-primary mb-2">
                  86KB
                </div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                  Package size
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 border-2 border-slate-200 p-8">
                <div className="text-4xl font-black text-primary mb-2">0</div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                  Dependencies
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported countries */}
      <section className="bg-slate-50 py-16 px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-black text-3xl text-primary mb-6 tracking-tight">
            Supported Countries
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            31 European and EEA countries with country-specific PII patterns.
          </p>
          <div className="flex flex-wrap gap-2 mb-12">
            {countries.map((code) => (
              <span
                key={code}
                className="inline-block rounded-lg bg-primary px-3 py-1.5 text-xs font-mono font-bold text-white"
              >
                {code}
              </span>
            ))}
          </div>

          <h2 className="font-black text-3xl text-primary mb-6 tracking-tight">
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
      <section className="bg-white py-16 px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[2rem] bg-primary p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-black text-xl text-white mb-2">
                View source on GitHub
              </h3>
              <p className="text-slate-400 text-sm">
                Browse the code, report issues, or contribute.
              </p>
            </div>
            <a
              href="https://github.com/euRedact/euRedact/tree/main/euredact-ts"
              className="shrink-0 inline-flex items-center gap-2 bg-secondary text-primary px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-emerald-400 transition-all"
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
