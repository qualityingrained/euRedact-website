import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Python SDK — euRedact Docs",
  description:
    "Complete API reference for the euRedact Python SDK. Redact European PII with sync and async support across 31 countries.",
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
            {"<"} 1 ms per page, ~2,000 records/second.
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
              Main entry point. Detects and redacts PII from a text string. Returns a{" "}
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
              <span className="text-white">    *,</span>
              {"\n"}
              <span className="text-white">    countries: </span>
              <span className="text-blue-300">list[str]</span>
              <span className="text-white"> | </span>
              <span className="text-blue-300">None</span>
              <span className="text-white"> = </span>
              <span className="text-amber-300">None</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">    mode: </span>
              <span className="text-blue-300">str</span>
              <span className="text-white"> = </span>
              <span className="text-amber-300">&quot;rules&quot;</span>
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
              <span className="text-amber-300">False</span>
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
                    description: "Input text to scan.",
                  },
                  {
                    name: "countries",
                    type: "list[str] | None",
                    default: "None",
                    description:
                      "ISO country codes to restrict detection. None = all 31 supported countries.",
                  },
                  {
                    name: "mode",
                    type: "str",
                    default: '"rules"',
                    description:
                      'Detection mode (currently only "rules").',
                  },
                  {
                    name: "pseudonymize",
                    type: "bool",
                    default: "False",
                    description:
                      "Replace PII with consistent pseudonyms instead of [TYPE] labels.",
                  },
                  {
                    name: "detect_dates",
                    type: "bool",
                    default: "False",
                    description:
                      "Include DOB/date-of-death detection. Off by default because it requires context.",
                  },
                  {
                    name: "cache",
                    type: "bool",
                    default: "True",
                    description:
                      "Cache results for identical inputs.",
                  },
                ]}
              />
            </div>

            <h3 className="font-black text-xl text-primary mt-8 mb-3">
              Example
            </h3>
            <CodeBlock title="example.py">
              <span className="text-purple-400">import</span>
              <span className="text-white"> euredact{"\n\n"}</span>
              <span className="text-white">result = euredact.</span>
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

          {/* redact_batch() */}
          <div>
            <h2 className="font-black text-3xl text-primary mb-2 tracking-tight">
              redact_batch()
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Batch redaction. More efficient than calling{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                redact()
              </code>{" "}
              in a loop because it loads configs once.
            </p>

            <CodeBlock title="Signature">
              <span className="text-purple-400">def</span>
              <span className="text-secondary"> redact_batch</span>
              <span className="text-white">(</span>
              {"\n"}
              <span className="text-white">    texts: </span>
              <span className="text-blue-300">list[str]</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">    **kwargs,</span>
              {"\n"}
              <span className="text-white">) -&gt; </span>
              <span className="text-blue-300">list[RedactResult]</span>
            </CodeBlock>

            <div className="mt-6">
              <ParamTable
                params={[
                  {
                    name: "texts",
                    type: "list[str]",
                    description: "List of input texts to redact.",
                  },
                  {
                    name: "**kwargs",
                    type: "",
                    description:
                      "Same keyword arguments as redact() (countries, mode, pseudonymize, detect_dates, cache).",
                  },
                ]}
              />
            </div>

            <h3 className="font-black text-xl text-primary mt-8 mb-3">
              Example
            </h3>
            <CodeBlock title="batch_example.py">
              <span className="text-purple-400">import</span>
              <span className="text-white"> euredact{"\n\n"}</span>
              <span className="text-white">texts = [</span>
              {"\n"}
              <span className="text-white">    </span>
              <span className="text-amber-300">&quot;BSN 111222333&quot;</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">    </span>
              <span className="text-amber-300">&quot;IBAN NL91ABNA0417164300&quot;</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">]{"\n\n"}</span>
              <span className="text-white">results = euredact.</span>
              <span className="text-secondary">redact_batch</span>
              <span className="text-white">(texts, countries=[</span>
              <span className="text-amber-300">&quot;NL&quot;</span>
              <span className="text-white">]){"\n"}</span>
              <span className="text-purple-400">for</span>
              <span className="text-white"> r </span>
              <span className="text-purple-400">in</span>
              <span className="text-white"> results:{"\n"}</span>
              <span className="text-white">    </span>
              <span className="text-secondary">print</span>
              <span className="text-white">(r.redacted_text)</span>
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
              . Offloads CPU work to a thread pool. Same keyword arguments and return type.
            </p>
            <CodeBlock title="Signature">
              <span className="text-purple-400">async def</span>
              <span className="text-secondary"> aredact</span>
              <span className="text-white">(</span>
              {"\n"}
              <span className="text-white">    text: </span>
              <span className="text-blue-300">str</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">    **kwargs,</span>
              {"\n"}
              <span className="text-white">) -&gt; </span>
              <span className="text-blue-300">RedactResult</span>
            </CodeBlock>

            <h3 className="font-black text-xl text-primary mt-8 mb-3">
              Example
            </h3>
            <CodeBlock title="async_example.py">
              <span className="text-purple-400">import</span>
              <span className="text-white"> asyncio{"\n"}</span>
              <span className="text-purple-400">import</span>
              <span className="text-white"> euredact{"\n\n"}</span>
              <span className="text-purple-400">async def</span>
              <span className="text-secondary"> main</span>
              <span className="text-white">():{"\n"}</span>
              <span className="text-white">    result = </span>
              <span className="text-purple-400">await</span>
              <span className="text-white"> euredact.</span>
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

          {/* aredact_batch() */}
          <div>
            <h2 className="font-black text-3xl text-primary mb-2 tracking-tight">
              aredact_batch()
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Async batch redaction with controlled concurrency.
            </p>
            <CodeBlock title="Signature">
              <span className="text-purple-400">async def</span>
              <span className="text-secondary"> aredact_batch</span>
              <span className="text-white">(</span>
              {"\n"}
              <span className="text-white">    texts: </span>
              <span className="text-blue-300">list[str]</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">    *,</span>
              {"\n"}
              <span className="text-white">    max_concurrency: </span>
              <span className="text-blue-300">int</span>
              <span className="text-white"> = </span>
              <span className="text-amber-300">4</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">    **kwargs,</span>
              {"\n"}
              <span className="text-white">) -&gt; </span>
              <span className="text-blue-300">list[RedactResult]</span>
            </CodeBlock>

            <div className="mt-6">
              <ParamTable
                params={[
                  {
                    name: "texts",
                    type: "list[str]",
                    description: "List of input texts to redact.",
                  },
                  {
                    name: "max_concurrency",
                    type: "int",
                    default: "4",
                    description: "Maximum number of concurrent tasks.",
                  },
                  {
                    name: "**kwargs",
                    type: "",
                    description:
                      "Same keyword arguments as redact().",
                  },
                ]}
              />
            </div>
          </div>

          {/* redact_iter() */}
          <div>
            <h2 className="font-black text-3xl text-primary mb-2 tracking-tight">
              redact_iter()
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Lazy iterator for large datasets. Yields results one at a time without loading everything into memory.
            </p>
            <CodeBlock title="Signature">
              <span className="text-purple-400">def</span>
              <span className="text-secondary"> redact_iter</span>
              <span className="text-white">(</span>
              {"\n"}
              <span className="text-white">    texts: </span>
              <span className="text-blue-300">Iterable[str]</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">    **kwargs,</span>
              {"\n"}
              <span className="text-white">) -&gt; </span>
              <span className="text-blue-300">Iterator[RedactResult]</span>
            </CodeBlock>

            <h3 className="font-black text-xl text-primary mt-8 mb-3">
              Example
            </h3>
            <CodeBlock title="iter_example.py">
              <span className="text-purple-400">import</span>
              <span className="text-white"> euredact{"\n\n"}</span>
              <span className="text-white">texts = [</span>
              <span className="text-amber-300">&quot;BSN 111222333&quot;</span>
              <span className="text-white">, </span>
              <span className="text-amber-300">&quot;IBAN DE89370400440532013000&quot;</span>
              <span className="text-white">]{"\n\n"}</span>
              <span className="text-purple-400">for</span>
              <span className="text-white"> result </span>
              <span className="text-purple-400">in</span>
              <span className="text-white"> euredact.</span>
              <span className="text-secondary">redact_iter</span>
              <span className="text-white">(texts):{"\n"}</span>
              <span className="text-white">    </span>
              <span className="text-secondary">print</span>
              <span className="text-white">(result.redacted_text)</span>
            </CodeBlock>
          </div>

          {/* add_custom_pattern() */}
          <div>
            <h2 className="font-black text-3xl text-primary mb-2 tracking-tight">
              add_custom_pattern()
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Register a custom regex pattern. Matches are reported with the given name as the entity type.
            </p>
            <CodeBlock title="Signature">
              <span className="text-purple-400">def</span>
              <span className="text-secondary"> add_custom_pattern</span>
              <span className="text-white">(</span>
              {"\n"}
              <span className="text-white">    name: </span>
              <span className="text-blue-300">str</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">    pattern: </span>
              <span className="text-blue-300">str</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">) -&gt; </span>
              <span className="text-blue-300">None</span>
            </CodeBlock>

            <div className="mt-6">
              <ParamTable
                params={[
                  {
                    name: "name",
                    type: "str",
                    description: "Entity type name for matches (e.g., \"EMPLOYEE_ID\").",
                  },
                  {
                    name: "pattern",
                    type: "str",
                    description: "Regular expression pattern to match.",
                  },
                ]}
              />
            </div>
          </div>

          {/* available_countries() */}
          <div>
            <h2 className="font-black text-3xl text-primary mb-2 tracking-tight">
              available_countries()
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Returns a sorted list of supported ISO country codes.
            </p>
            <CodeBlock title="example.py">
              <span className="text-purple-400">import</span>
              <span className="text-white"> euredact{"\n\n"}</span>
              <span className="text-secondary">print</span>
              <span className="text-white">(euredact.</span>
              <span className="text-secondary">available_countries</span>
              <span className="text-white">())  </span>
              <span className="text-slate-500">
                # [&quot;AT&quot;, &quot;BE&quot;, &quot;BG&quot;, ...]
              </span>
            </CodeBlock>
          </div>

          {/* EuRedact class */}
          <div>
            <h2 className="font-black text-3xl text-primary mb-2 tracking-tight">
              EuRedact class
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              For isolated instances with separate caches and custom patterns. Useful when
              different parts of your application need different configurations.
            </p>
            <CodeBlock title="instance_example.py">
              <span className="text-purple-400">from</span>
              <span className="text-white"> euredact </span>
              <span className="text-purple-400">import</span>
              <span className="text-white"> EuRedact{"\n\n"}</span>
              <span className="text-white">instance = </span>
              <span className="text-secondary">EuRedact</span>
              <span className="text-white">(){"\n"}</span>
              <span className="text-white">instance.</span>
              <span className="text-secondary">add_custom_pattern</span>
              <span className="text-white">(</span>
              <span className="text-amber-300">&quot;CASE_REF&quot;</span>
              <span className="text-white">, </span>
              <span className="text-amber-300">r&quot;CASE-\d{"{8}"}&quot;</span>
              <span className="text-white">){"\n\n"}</span>
              <span className="text-white">result = instance.</span>
              <span className="text-secondary">redact</span>
              <span className="text-white">(</span>
              {"\n"}
              <span className="text-white">    </span>
              <span className="text-amber-300">&quot;See CASE-20260401&quot;</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">    countries=[</span>
              <span className="text-amber-300">&quot;NL&quot;</span>
              <span className="text-white">, </span>
              <span className="text-amber-300">&quot;BE&quot;</span>
              <span className="text-white">],</span>
              {"\n"}
              <span className="text-white">){"\n\n"}</span>
              <span className="text-secondary">print</span>
              <span className="text-white">(result.redacted_text){"\n"}</span>
              <span className="text-slate-500">
                # &quot;See [CASE_REF]&quot;
              </span>
            </CodeBlock>
            <p className="text-on-surface-variant leading-relaxed mt-4">
              The{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                EuRedact
              </code>{" "}
              instance exposes the same methods:{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                redact()
              </code>
              ,{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                redact_batch()
              </code>
              ,{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                aredact()
              </code>
              ,{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                aredact_batch()
              </code>
              ,{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                redact_iter()
              </code>
              , and{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                add_custom_pattern()
              </code>
              .
            </p>
          </div>

          {/* Return Types */}
          <div>
            <h2 className="font-black text-3xl text-primary mb-6 tracking-tight">
              Return Types
            </h2>

            <h3 className="font-black text-xl text-primary mb-3">
              RedactResult
            </h3>
            <p className="text-on-surface-variant leading-relaxed mb-4">
              A dataclass returned by all redaction functions.
            </p>
            <ParamTable
              params={[
                {
                  name: "redacted_text",
                  type: "str",
                  description:
                    "The text with PII replaced by labels like [NATIONAL_ID], [IBAN], etc.",
                },
                {
                  name: "detections",
                  type: "list[Detection]",
                  description:
                    "List of detected PII spans.",
                },
                {
                  name: "source",
                  type: "str",
                  default: '"rules"',
                  description:
                    "Detection source used.",
                },
                {
                  name: "degraded",
                  type: "bool",
                  default: "False",
                  description:
                    "Whether results may be incomplete due to an internal issue.",
                },
              ]}
            />

            <h3 className="font-black text-xl text-primary mt-8 mb-3">
              Detection
            </h3>
            <p className="text-on-surface-variant leading-relaxed mb-4">
              A frozen dataclass (immutable and hashable) representing a single PII detection.
            </p>
            <ParamTable
              params={[
                {
                  name: "entity_type",
                  type: "EntityType | str",
                  description: "The type of PII detected (e.g., NATIONAL_ID, IBAN).",
                },
                {
                  name: "start",
                  type: "int",
                  description: "Start character offset in the original text.",
                },
                {
                  name: "end",
                  type: "int",
                  description: "End character offset in the original text.",
                },
                {
                  name: "text",
                  type: "str",
                  description: "The matched PII text.",
                },
                {
                  name: "source",
                  type: "DetectionSource",
                  description: 'Detection source ("rules" or "cloud").',
                },
                {
                  name: "country",
                  type: "str | None",
                  description: "ISO country code the detection is associated with.",
                },
                {
                  name: "confidence",
                  type: "str",
                  default: '"high"',
                  description: "Confidence level of the detection.",
                },
              ]}
            />
          </div>

          {/* Custom Patterns */}
          <div>
            <h2 className="font-black text-3xl text-primary mb-2 tracking-tight">
              Custom Patterns
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Register custom regex patterns to detect domain-specific identifiers.
              Custom patterns are always active regardless of the{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                countries
              </code>{" "}
              parameter.
            </p>
            <CodeBlock title="custom_patterns.py">
              <span className="text-purple-400">import</span>
              <span className="text-white"> euredact{"\n\n"}</span>
              <span className="text-white">euredact.</span>
              <span className="text-secondary">add_custom_pattern</span>
              <span className="text-white">(</span>
              <span className="text-amber-300">&quot;EMPLOYEE_ID&quot;</span>
              <span className="text-white">, </span>
              <span className="text-amber-300">r&quot;EMP-\d{"{6}"}&quot;</span>
              <span className="text-white">){"\n\n"}</span>
              <span className="text-white">result = euredact.</span>
              <span className="text-secondary">redact</span>
              <span className="text-white">(</span>
              <span className="text-amber-300">&quot;Contact EMP-123456 for details&quot;</span>
              <span className="text-white">){"\n"}</span>
              <span className="text-secondary">print</span>
              <span className="text-white">(result.redacted_text){"\n"}</span>
              <span className="text-slate-500">
                # &quot;Contact [EMPLOYEE_ID] for details&quot;
              </span>
            </CodeBlock>
            <div className="mt-6 space-y-2">
              <p className="text-on-surface-variant leading-relaxed">
                <strong className="text-primary">Priority order:</strong> validated patterns &gt; custom patterns &gt; regex-only patterns.
              </p>
              <p className="text-on-surface-variant leading-relaxed">
                For isolated pattern registrations, use separate{" "}
                <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                  EuRedact
                </code>{" "}
                instances.
              </p>
            </div>
          </div>

          {/* Secret Detection */}
          <div>
            <h2 className="font-black text-3xl text-primary mb-2 tracking-tight">
              Secret Detection
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              euRedact automatically detects secrets and API keys using two strategies.
            </p>

            <h3 className="font-black text-xl text-primary mb-3">
              Known-prefix detection
            </h3>
            <p className="text-on-surface-variant leading-relaxed mb-4">
              Matches tokens with recognized prefixes from common services:
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { label: "AWS", prefix: "AKIA..." },
                { label: "GitHub", prefix: "ghp_, gho_, ghs_, github_pat_" },
                { label: "Stripe", prefix: "sk_live_, pk_live_" },
                { label: "OpenAI / Anthropic", prefix: "sk-, sk-ant-" },
                { label: "Slack", prefix: "xoxb-, xoxp-" },
                { label: "JWT", prefix: "eyJ..." },
                { label: "SendGrid", prefix: "SG." },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl bg-slate-50 border-2 border-slate-200 px-4 py-2"
                >
                  <div className="text-xs font-black text-primary uppercase tracking-wider">
                    {item.label}
                  </div>
                  <div className="text-xs font-mono text-slate-500 mt-0.5">
                    {item.prefix}
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-black text-xl text-primary mb-3">
              Entropy-based detection
            </h3>
            <p className="text-on-surface-variant leading-relaxed">
              Flags 32+ character high-entropy strings found near context keywords such as{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                key
              </code>
              ,{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                token
              </code>
              ,{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                secret
              </code>
              ,{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                password
              </code>
              , and their translations in 12 EU languages.
            </p>
          </div>

          {/* Performance */}
          <div>
            <h2 className="font-black text-3xl text-primary mb-6 tracking-tight">
              Performance
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-2xl bg-slate-50 border-2 border-slate-200 p-8">
                <div className="text-4xl font-black text-primary mb-2">
                  {"<"} 1 ms
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
              <div className="rounded-2xl bg-slate-50 border-2 border-slate-200 p-8">
                <div className="text-4xl font-black text-primary mb-2">
                  ~50 KB
                </div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                  Memory per country
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 border-2 border-slate-200 p-8">
                <div className="text-4xl font-black text-primary mb-2">
                  pyahocorasick
                </div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                  Optional accelerator
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported countries & Entity types */}
      <section className="bg-slate-50 py-16 px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-black text-3xl text-primary mb-6 tracking-tight">
            Supported Countries
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            31 European countries supported out of the box.
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
          <p className="text-on-surface-variant leading-relaxed mb-6">
            31 entity types detected across all supported countries.
          </p>
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
