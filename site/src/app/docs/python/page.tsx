import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Python SDK — euRedact Docs",
  description:
    "Complete API reference for the euRedact Python SDK. Redact European PII with sync and async support across 32 countries.",
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
  "NATIONAL_ID", "IBAN", "PHONE", "EMAIL", "TAX_ID", "CREDIT_CARD",
  "LICENSE_PLATE", "PASSPORT", "VAT", "BIC", "VIN", "IP_ADDRESS",
  "MAC_ADDRESS", "UUID", "IMEI", "GPS_COORDINATES", "SOCIAL_HANDLE",
  "DOB", "POSTAL_CODE", "HEALTHCARE_PROVIDER", "HEALTH_INSURANCE",
];

export default function PythonSDKPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary hero-pattern py-20">
        <div className="mx-auto max-w-4xl px-8">
          <div className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-4">
            SDK Reference
          </div>
          <h1 className="font-black text-5xl text-white tracking-tight">
            Python SDK
          </h1>
          <p className="mt-4 text-lg text-slate-300 leading-relaxed max-w-2xl">
            High-performance PII redaction for Python. Sync and async support,
            ~0.02ms per page.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href="https://pypi.org/project/euredact/"
              className="inline-flex items-center gap-2 text-secondary font-black text-sm hover:underline"
            >
              <span className="material-symbols-outlined text-base">
                package_2
              </span>
              PyPI
            </a>
            <a
              href="https://github.com/euRedact/euRedact/tree/main/euredact-python"
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
              <span className="text-white"> pip install euredact</span>
            </CodeBlock>
          </div>

          {/* redact() */}
          <div>
            <h2 className="font-black text-3xl text-primary mb-2 tracking-tight">
              redact()
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Synchronously redact PII from a text string. Returns a{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                RedactResult
              </code>{" "}
              with the cleaned text and a list of detections.
            </p>

            <CodeBlock title="Signature">
              <span className="text-purple-400">def</span>
              <span className="text-secondary"> redact</span>
              <span className="text-white">(</span>
              {"\n"}
              <span className="text-white">    text: </span>
              <span className="text-blue-300">str</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">    countries: </span>
              <span className="text-blue-300">list[str]</span>
              <span className="text-white"> | </span>
              <span className="text-blue-300">None</span>
              <span className="text-white"> = </span>
              <span className="text-amber-300">None</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">    pseudonymize: </span>
              <span className="text-blue-300">bool</span>
              <span className="text-white"> = </span>
              <span className="text-amber-300">False</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">    detect_dates: </span>
              <span className="text-blue-300">bool</span>
              <span className="text-white"> = </span>
              <span className="text-amber-300">True</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">    cache: </span>
              <span className="text-blue-300">bool</span>
              <span className="text-white"> = </span>
              <span className="text-amber-300">True</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">) -&gt; </span>
              <span className="text-blue-300">RedactResult</span>
            </CodeBlock>

            <div className="mt-6">
              <ParamTable
                params={[
                  {
                    name: "text",
                    type: "str",
                    description: "The input text to redact.",
                  },
                  {
                    name: "countries",
                    type: "list[str] | None",
                    default: "None",
                    description:
                      "ISO country codes to detect. None = all supported countries.",
                  },
                  {
                    name: "pseudonymize",
                    type: "bool",
                    default: "False",
                    description:
                      "Replace PII with consistent fake values instead of type labels.",
                  },
                  {
                    name: "detect_dates",
                    type: "bool",
                    default: "True",
                    description: "Whether to detect and redact date-of-birth patterns.",
                  },
                  {
                    name: "cache",
                    type: "bool",
                    default: "True",
                    description:
                      "Cache compiled patterns for faster subsequent calls.",
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
                  name: "redacted_text",
                  type: "str",
                  description:
                    'The text with PII replaced by labels like [NATIONAL_ID], [IBAN], etc.',
                },
                {
                  name: "detections",
                  type: "list[Detection]",
                  description:
                    "List of detected PII entities with type, value, position, and country.",
                },
              ]}
            />

            <h3 className="font-black text-xl text-primary mt-8 mb-3">
              Example
            </h3>
            <CodeBlock title="example.py">
              <span className="text-purple-400">from</span>
              <span className="text-white"> euredact </span>
              <span className="text-purple-400">import</span>
              <span className="text-white"> redact{"\n\n"}</span>
              <span className="text-white">result = </span>
              <span className="text-secondary">redact</span>
              <span className="text-white">(</span>
              {"\n"}
              <span className="text-white">    </span>
              <span className="text-amber-300">
                &quot;Mijn BSN is 111222333 en IBAN NL91ABNA0417164300.&quot;
              </span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">    countries=[</span>
              <span className="text-amber-300">&quot;NL&quot;</span>
              <span className="text-white">],</span>
              {"\n"}
              <span className="text-white">){"\n\n"}</span>
              <span className="text-secondary">print</span>
              <span className="text-white">(result.redacted_text){"\n"}</span>
              <span className="text-slate-500">
                # &quot;Mijn BSN is [NATIONAL_ID] en IBAN [IBAN].&quot;
              </span>
              {"\n\n"}
              <span className="text-secondary">print</span>
              <span className="text-white">(result.detections)</span>
            </CodeBlock>
          </div>

          {/* aredact() */}
          <div>
            <h2 className="font-black text-3xl text-primary mb-2 tracking-tight">
              aredact()
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Async version of{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                redact()
              </code>
              . Same parameters and return type, designed for use with{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                asyncio
              </code>
              .
            </p>
            <CodeBlock title="async_example.py">
              <span className="text-purple-400">import</span>
              <span className="text-white"> asyncio{"\n"}</span>
              <span className="text-purple-400">from</span>
              <span className="text-white"> euredact </span>
              <span className="text-purple-400">import</span>
              <span className="text-white"> aredact{"\n\n"}</span>
              <span className="text-purple-400">async def</span>
              <span className="text-secondary"> main</span>
              <span className="text-white">():{"\n"}</span>
              <span className="text-white">    result = </span>
              <span className="text-purple-400">await</span>
              <span className="text-white"> </span>
              <span className="text-secondary">aredact</span>
              <span className="text-white">(</span>
              <span className="text-amber-300">&quot;BSN 111222333&quot;</span>
              <span className="text-white">){"\n"}</span>
              <span className="text-white">    </span>
              <span className="text-secondary">print</span>
              <span className="text-white">(result.redacted_text){"\n\n"}</span>
              <span className="text-white">asyncio.</span>
              <span className="text-secondary">run</span>
              <span className="text-white">(main())</span>
            </CodeBlock>
          </div>

          {/* available_countries() */}
          <div>
            <h2 className="font-black text-3xl text-primary mb-2 tracking-tight">
              available_countries()
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Returns a list of supported ISO country codes.
            </p>
            <CodeBlock title="example.py">
              <span className="text-purple-400">from</span>
              <span className="text-white"> euredact </span>
              <span className="text-purple-400">import</span>
              <span className="text-white"> available_countries{"\n\n"}</span>
              <span className="text-secondary">print</span>
              <span className="text-white">(</span>
              <span className="text-secondary">available_countries</span>
              <span className="text-white">())  </span>
              <span className="text-slate-500">
                # [&quot;AT&quot;, &quot;BE&quot;, &quot;BG&quot;, ...]
              </span>
            </CodeBlock>
          </div>

          {/* Performance */}
          <div>
            <h2 className="font-black text-3xl text-primary mb-6 tracking-tight">
              Performance
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
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
                  ~2,000
                </div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                  Records per second
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
              href="https://github.com/euRedact/euRedact/tree/main/euredact-python"
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
