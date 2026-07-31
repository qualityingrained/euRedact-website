import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

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

export default function PythonSDKPage() {
  return (
    <>
      <PageHero
        eyebrow="SDK reference"
        title="Python SDK"
        subtitle="PII redaction for Python. Sync and async support, country inference, ~9.5 ms per page — or ~4.8 ms with the optional RE2 prefilter."
      >
          <div className="flex gap-4">
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
              <span className="text-white"> pip install euredact</span>
            </CodeBlock>
            <p className="text-on-surface-variant leading-relaxed mt-4">
              The core install has no dependencies. The optional{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                euredact[fast]
              </code>{" "}
              extra adds an RE2 scan prefilter: one DFA pass per 1&nbsp;KB window
              reports which patterns can match there, so the rest are skipped.
              Measured at ~2.0x on a 2,000-character page. Output is unchanged by
              construction — the prefilter only decides which patterns are worth
              running, and each survivor is then run over the whole text.
            </p>
            <blockquote className="callout callout-risk mt-5">
              <p>
                If you installed <span className="font-mono">euredact[fast]</span>{" "}
                at 0.3.1, upgrade. In that release the windowed scan could miss
                SECRET patterns wider than the window — a PEM private key passed
                through unmasked. The pure-Python default and the Node.js package
                were never affected. Fixed in 0.3.2.
              </p>
            </blockquote>
          </div>

          {/* redact() */}
          <div>
            <h2 className="font-black text-3xl text-on-surface mb-2 tracking-tight">
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
              <span className="text-pii-highlight">None</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">    mode: </span>
              <span className="text-blue-300">str</span>
              <span className="text-white"> = </span>
              <span className="text-pii-highlight">&quot;rules&quot;</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">    referential_integrity: </span>
              <span className="text-blue-300">bool</span>
              <span className="text-white"> = </span>
              <span className="text-pii-highlight">False</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">    detect_dates: </span>
              <span className="text-blue-300">bool</span>
              <span className="text-white"> = </span>
              <span className="text-pii-highlight">False</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">    cache: </span>
              <span className="text-blue-300">bool</span>
              <span className="text-white"> = </span>
              <span className="text-pii-highlight">True</span>
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
                      "ISO country codes the document is declared to belong to. Since 0.3.2 this scores detection rather than gating it: every pattern runs whatever you declare, and a match attributed outside the set is flagged out_of_scope rather than dropped. Declaring it is still worth 99.72% recall against 99.50% blind.",
                  },
                  {
                    name: "country_hint",
                    type: "list[str] | None",
                    default: "None",
                    description:
                      "A prior that resolves ambiguity without narrowing scope or flagging anything out of scope — use it when you know the likely origin but do not want out_of_scope semantics.",
                  },
                  {
                    name: "context",
                    type: "DocumentContext | None",
                    default: "None",
                    description:
                      "Shares country evidence across the chunks of one document, so a chunk carrying no country signal is still scored with what the rest of the document established. Pair with chunk_offset. Caching is disabled while a context is in use, since the result no longer depends on the text alone.",
                  },
                  {
                    name: "chunk_offset",
                    type: "int",
                    default: "0",
                    description:
                      "Character offset of this chunk within the whole document, so evidence spans recorded on a context point into the full text.",
                  },
                  {
                    name: "mode",
                    type: "str",
                    default: '"rules"',
                    description:
                      'Detection mode (currently only "rules").',
                  },
                  {
                    name: "referential_integrity",
                    type: "bool",
                    default: "False",
                    description:
                      "Replace PII with consistent labels (NAME_1, BANK_ACCOUNT_1) instead of generic [TYPE] labels.",
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

            <h3 className="font-black text-xl text-on-surface mt-8 mb-3">
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
              <span className="text-pii-highlight">
                &quot;Mijn BSN is 111222333 en IBAN NL91ABNA0417164300.&quot;
              </span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">    countries=[</span>
              <span className="text-pii-highlight">&quot;NL&quot;</span>
              <span className="text-white">],</span>
              {"\n"}
              <span className="text-white">){"\n\n"}</span>
              <span className="text-secondary">print</span>
              <span className="text-white">(result.redacted_text){"\n"}</span>
              <span className="text-on-surface-variant">
                # &quot;Mijn BSN is [NATIONAL_ID] en IBAN [BANK_ACCOUNT].&quot;
              </span>
              {"\n\n"}
              <span className="text-secondary">print</span>
              <span className="text-white">(result.detections)</span>
            </CodeBlock>
            <blockquote className="callout callout-breaking mt-5">
              <p>
                <span className="font-mono">countries</span> takes a{" "}
                <em>list</em>. Since 0.3.3 a bare string raises{" "}
                <span className="font-mono">TypeError</span>, on every entry
                point, in both SDKs. Before that,{" "}
                <span className="font-mono">countries=&quot;NL&quot;</span> was
                iterated character by character into the codes{" "}
                <span className="font-mono">&quot;N&quot;</span> and{" "}
                <span className="font-mono">&quot;L&quot;</span>; neither
                resolves, so the call declared nothing and every detection came
                back flagged <span className="font-mono">out_of_scope</span>{" "}
                while the redacted text still looked correct. A pipeline
                filtering on that field — which these docs tell you to do —
                kept none of them. A wrong country <em>code</em> still only
                warns; a wrong <em>type</em> has no correct reading to fall
                back on.
              </p>
            </blockquote>
          </div>

          {/* redact_batch() */}
          <div>
            <h2 className="font-black text-3xl text-on-surface mb-2 tracking-tight">
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
                      "Same keyword arguments as redact() (countries, mode, referential_integrity, detect_dates, cache).",
                  },
                ]}
              />
            </div>

            <h3 className="font-black text-xl text-on-surface mt-8 mb-3">
              Example
            </h3>
            <CodeBlock title="batch_example.py">
              <span className="text-purple-400">import</span>
              <span className="text-white"> euredact{"\n\n"}</span>
              <span className="text-white">texts = [</span>
              {"\n"}
              <span className="text-white">    </span>
              <span className="text-pii-highlight">&quot;BSN 111222333&quot;</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">    </span>
              <span className="text-pii-highlight">&quot;IBAN NL91ABNA0417164300&quot;</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">]{"\n\n"}</span>
              <span className="text-white">results = euredact.</span>
              <span className="text-secondary">redact_batch</span>
              <span className="text-white">(texts, countries=[</span>
              <span className="text-pii-highlight">&quot;NL&quot;</span>
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
            <h2 className="font-black text-3xl text-on-surface mb-2 tracking-tight">
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

            <h3 className="font-black text-xl text-on-surface mt-8 mb-3">
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
              <span className="text-pii-highlight">&quot;BSN 111222333&quot;</span>
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
            <h2 className="font-black text-3xl text-on-surface mb-2 tracking-tight">
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
              <span className="text-pii-highlight">4</span>
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
            <h2 className="font-black text-3xl text-on-surface mb-2 tracking-tight">
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

            <h3 className="font-black text-xl text-on-surface mt-8 mb-3">
              Example
            </h3>
            <CodeBlock title="iter_example.py">
              <span className="text-purple-400">import</span>
              <span className="text-white"> euredact{"\n\n"}</span>
              <span className="text-white">texts = [</span>
              <span className="text-pii-highlight">&quot;BSN 111222333&quot;</span>
              <span className="text-white">, </span>
              <span className="text-pii-highlight">&quot;IBAN DE89370400440532013000&quot;</span>
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
            <h2 className="font-black text-3xl text-on-surface mb-2 tracking-tight">
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
            <h2 className="font-black text-3xl text-on-surface mb-2 tracking-tight">
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
              <span className="text-on-surface-variant">
                # [&quot;AT&quot;, &quot;BE&quot;, &quot;BG&quot;, ...]
              </span>
            </CodeBlock>
          </div>

          {/* EuRedact class */}
          <div>
            <h2 className="font-black text-3xl text-on-surface mb-2 tracking-tight">
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
              <span className="text-pii-highlight">&quot;CASE_REF&quot;</span>
              <span className="text-white">, </span>
              <span className="text-pii-highlight">r&quot;CASE-\d{"{8}"}&quot;</span>
              <span className="text-white">){"\n\n"}</span>
              <span className="text-white">result = instance.</span>
              <span className="text-secondary">redact</span>
              <span className="text-white">(</span>
              {"\n"}
              <span className="text-white">    </span>
              <span className="text-pii-highlight">&quot;See CASE-20260401&quot;</span>
              <span className="text-white">,</span>
              {"\n"}
              <span className="text-white">    countries=[</span>
              <span className="text-pii-highlight">&quot;NL&quot;</span>
              <span className="text-white">, </span>
              <span className="text-pii-highlight">&quot;BE&quot;</span>
              <span className="text-white">],</span>
              {"\n"}
              <span className="text-white">){"\n\n"}</span>
              <span className="text-secondary">print</span>
              <span className="text-white">(result.redacted_text){"\n"}</span>
              <span className="text-on-surface-variant">
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
            <h2 className="font-black text-3xl text-on-surface mb-6 tracking-tight">
              Return Types
            </h2>

            <h3 className="font-black text-xl text-on-surface mb-3">
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
                    "The text with PII replaced by labels like [NATIONAL_ID], [BANK_ACCOUNT], etc.",
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
                {
                  name: "inferred_countries",
                  type: "tuple[tuple[str, float], ...]",
                  description:
                    "New in 0.3.2. The countries the engine concluded the document belongs to, each with a score in 0-1, most likely first. Populated whether or not you passed countries.",
                },
                {
                  name: "evidence",
                  type: "tuple[CountryEvidence, ...]",
                  description:
                    "New in 0.3.2. The individual signals behind inferred_countries, so an attribution can be audited rather than taken on faith.",
                },
                {
                  name: "detection_mode",
                  type: "str",
                  default: '"inferred"',
                  description:
                    'New in 0.3.2. "declared" when you passed countries, "inferred" otherwise (including when you passed only country_hint).',
                },
              ]}
            />

            <h3 className="font-black text-xl text-on-surface mt-8 mb-3">
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
                  description: "The type of PII detected (e.g., NATIONAL_ID, BANK_ACCOUNT).",
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
                {
                  name: "country_confidence",
                  type: "float",
                  default: "0.0",
                  description:
                    "New in 0.3.2. How strongly the document supports the country on this detection, 0-1. Separate from confidence, which is about the match itself: a pattern can fire unambiguously while its country attribution stays a guess.",
                },
                {
                  name: "out_of_scope",
                  type: "bool",
                  default: "False",
                  description:
                    "New in 0.3.2. True when the detection was attributed to a country outside the countries you declared. It is still redacted and still returned — filter on this field if you only want in-scope entities.",
                },
              ]}
            />

            <h3 className="font-black text-xl text-on-surface mt-8 mb-3">
              CountryEvidence
            </h3>
            <p className="text-on-surface-variant leading-relaxed mb-4">
              One signal supporting a country attribution. New in 0.3.2.
            </p>
            <ParamTable
              params={[
                {
                  name: "country",
                  type: "str",
                  description: "The ISO country code this signal points at.",
                },
                {
                  name: "source",
                  type: "str",
                  description:
                    'What produced the signal, e.g. "iban_prefix", "phone_prefix", "tld".',
                },
                {
                  name: "log_odds",
                  type: "float",
                  description:
                    "How much this signal moves the score. Signals accumulate, so several weak ones can outweigh a single strong one.",
                },
                {
                  name: "span",
                  type: "tuple[int, int]",
                  description:
                    "Where in the text the signal was found. Offsets are absolute when chunk_offset is passed.",
                },
              ]}
            />

            <h3 className="font-black text-xl text-on-surface mt-8 mb-3">
              DocumentContext
            </h3>
            <p className="text-on-surface-variant leading-relaxed mb-4">
              New in 0.3.2. Country inference reads signals out of the text, so a
              document processed in chunks loses accuracy at exactly the chunks
              that carry no signal of their own — a page of bare reference numbers
              between two pages full of Dutch addresses. A{" "}
              <code className="text-secondary font-mono font-bold text-sm bg-secondary/10 px-2 py-0.5 rounded">
                DocumentContext
              </code>{" "}
              carries the evidence across chunks so the whole document is scored
              as one.
            </p>
            <CodeBlock title="Chunked document">{`from euredact import DocumentContext, redact

ctx = DocumentContext()
offset = 0
for chunk in chunks:
    result = redact(chunk, context=ctx, chunk_offset=offset)
    offset += len(chunk)
    print(result.redacted_text)

# Every signal the document produced, spans pointing into the full text.
print(ctx.evidence())`}</CodeBlock>
            <blockquote className="callout callout-note mt-5">
              <p>
                Pass <span className="font-mono">chunk_offset</span> or the
                evidence spans will all point into the start of the text.
                Caching is disabled while a context is in use, since the result
                depends on the document rather than on the chunk alone.
              </p>
            </blockquote>
            <p className="text-on-surface-variant leading-relaxed mt-4">
              Reuse a context only across chunks of the <em>same</em> document.
              A context shared between unrelated documents mixes their countries,
              which cannot cause a miss — a context influences scoring only,
              never which spans are found — but can attribute a value to the
              wrong national scheme.
            </p>
          </div>

          {/* Custom Patterns */}
          <div>
            <h2 className="font-black text-3xl text-on-surface mb-2 tracking-tight">
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
              <span className="text-pii-highlight">&quot;EMPLOYEE_ID&quot;</span>
              <span className="text-white">, </span>
              <span className="text-pii-highlight">r&quot;EMP-\d{"{6}"}&quot;</span>
              <span className="text-white">){"\n\n"}</span>
              <span className="text-white">result = euredact.</span>
              <span className="text-secondary">redact</span>
              <span className="text-white">(</span>
              <span className="text-pii-highlight">&quot;Contact EMP-123456 for details&quot;</span>
              <span className="text-white">){"\n"}</span>
              <span className="text-secondary">print</span>
              <span className="text-white">(result.redacted_text){"\n"}</span>
              <span className="text-on-surface-variant">
                # &quot;Contact [EMPLOYEE_ID] for details&quot;
              </span>
            </CodeBlock>
            <div className="mt-6 space-y-2">
              <p className="text-on-surface-variant leading-relaxed">
                <strong className="text-on-surface">Priority order:</strong> validated patterns &gt; custom patterns &gt; regex-only patterns.
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
            <h2 className="font-black text-3xl text-on-surface mb-2 tracking-tight">
              Secret Detection
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              euRedact automatically detects secrets and API keys using two strategies.
            </p>

            <h3 className="font-black text-xl text-on-surface mb-3">
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
                  className="rounded-xl bg-primary border-2 border-outline-variant px-4 py-2"
                >
                  <div className="text-xs font-black text-on-surface uppercase tracking-wider">
                    {item.label}
                  </div>
                  <div className="text-xs font-mono text-on-surface-variant mt-0.5">
                    {item.prefix}
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-black text-xl text-on-surface mb-3">
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
            <h2 className="font-black text-3xl text-on-surface mb-6 tracking-tight">
              Performance
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-2xl bg-primary border-2 border-outline-variant p-8">
                <div className="text-4xl font-black text-on-surface mb-2">
                  ~9.5 ms
                </div>
                <div className="text-xs font-black text-on-surface-variant uppercase tracking-[0.2em]">
                  Per page (2,000 chars)
                </div>
                <div className="text-[11px] text-on-surface-variant mt-2">
                  ~4.8 ms with the{" "}
                  <span className="font-mono">[fast]</span> extra
                </div>
              </div>
              <div className="rounded-2xl bg-primary border-2 border-outline-variant p-8">
                <div className="text-4xl font-black text-on-surface mb-2">
                  ~665
                </div>
                <div className="text-xs font-black text-on-surface-variant uppercase tracking-[0.2em]">
                  Records per second
                </div>
                <div className="text-[11px] text-on-surface-variant mt-2">
                  300-character record
                </div>
              </div>
              <div className="rounded-2xl bg-primary border-2 border-outline-variant p-8">
                <div className="text-4xl font-black text-on-surface mb-2">
                  ~50 KB
                </div>
                <div className="text-xs font-black text-on-surface-variant uppercase tracking-[0.2em]">
                  Memory per country
                </div>
              </div>
              <div className="rounded-2xl bg-primary border-2 border-outline-variant p-8">
                <div className="text-4xl font-black text-on-surface mb-2">
                  pyahocorasick
                </div>
                <div className="text-xs font-black text-on-surface-variant uppercase tracking-[0.2em]">
                  Optional accelerator
                </div>
              </div>
            </div>
            <blockquote className="callout callout-caveat mt-8">
              <p>
                0.3.6 is about 13% slower than 0.3.2 per page, and about 14%
                slower per record. The extra work is rule and vocabulary growth
                from 0.3.5 and 0.3.6 &mdash; support-desk terms in nine
                languages, wider currency lists, more month spellings. The
                record figure moves more than the page figure because 0.3.5
                began treating a value that fills an entire field of a
                delimited row as context, and a 300-character record is exactly
                that shape.
              </p>
              <p className="mt-3">
                If you are coming from 0.3.3, you will find this{" "}
                <em>faster</em>. 0.3.3 fixed a real defect &mdash; Python&rsquo;s{" "}
                <span className="font-mono">\b</span> is Unicode-aware where
                JavaScript&rsquo;s is ASCII-only, so a national ID written
                against a non-ASCII letter (
                <span className="font-mono">ЕГН7523169263</span>,{" "}
                <span className="font-mono">PESELŁ44051401359</span>) was
                redacted by the Node SDK and silently missed by Python &mdash;
                but it paid for the fix by rewriting every{" "}
                <span className="font-mono">\b</span> in all 303 patterns into a
                three-branch union, which cost roughly 4&times;. 0.3.4 chose the
                boundary per occurrence instead and gave the time back without
                giving back the recall.
              </p>
              <p className="mt-3">
                For throughput, install{" "}
                <span className="font-mono">euredact[fast]</span>: the RE2
                prefilter roughly halves per-page latency. Node is unaffected by
                any of this at ~1.6 ms per page &mdash; its{" "}
                <span className="font-mono">\b</span> always behaved this way.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Supported countries & Entity types */}
      <section className="bg-primary py-16 px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-black text-3xl text-on-surface mb-6 tracking-tight">
            Supported Countries
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            31 European countries supported out of the box.
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
          <p className="text-on-surface-variant leading-relaxed mb-6">
            These are the 27 types this package emits, across all supported
            countries, backed by 346 pattern definitions and 44 checksum
            validators.{" "}
            <span className="font-mono">IBAN</span> is still accepted as a
            legacy alias on input, but detections are emitted as{" "}
            <span className="font-mono">BANK_ACCOUNT</span>.
          </p>
          <blockquote className="callout callout-note mb-6">
            <p>
              27 is the Rules Engine layer. The forthcoming AI layer adds 13
              more — names, addresses, medical information and the other
              categories that have no fixed format for a pattern to match, plus
              the GDPR Article 9 special-category types.{" "}
              <a
                href="/docs/coverage"
                className="text-secondary hover:underline"
              >
                What euRedact detects
              </a>{" "}
              lists all 40 with the layer responsible for each, so a count of 40
              elsewhere on this site is not a different number from this one.
            </p>
          </blockquote>
          <div className="flex flex-wrap gap-2">
            {entities.map((entity) => (
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
              href="https://github.com/euRedact/euRedact/tree/main/euredact-python"
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
