import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Accuracy Benchmarks — euRedact",
  description:
    "Transparent, independently verifiable PII detection rates. 152,300 records tested across 31 European countries.",
};

/*
  Measured at tag v0.3.6 over the whole corpus, both engines, both modes.
  Rows are keyed on the *ground-truth label category*, which is what the corpus
  annotates — so `IBAN` and `VAT_NUMBER` appear here under the corpus's names
  rather than the engine's `BANK_ACCOUNT` and `VAT`.

  There is deliberately no per-country table. The corpus is generated in
  country *groups*, not per country, so a per-country breakdown would have to be
  invented — which is exactly what the previous version of this page did.
*/
const datasetData = [
  { name: "allcountries_20k", labels: 94330, hinted: 99.44, blind: 99.35 },
  { name: "dach_south_20k", labels: 90696, hinted: 99.93, blind: 99.85 },
  { name: "eastern_20k", labels: 89898, hinted: 99.6, blind: 99.31 },
  { name: "el_cy_mt_20k", labels: 88981, hinted: 99.99, blind: 99.69 },
  { name: "ie_baltics_uk_20k", labels: 89214, hinted: 100.0, blind: 99.73 },
  { name: "nordic_20k", labels: 93655, hinted: 99.98, blind: 99.65 },
  { name: "training_core2", labels: 47592, hinted: 99.96, blind: 99.71 },
  { name: "international_10k", labels: 42633, hinted: 99.61, blind: 99.61 },
  { name: "training_core", labels: 23759, hinted: 99.81, blind: 99.18 },
  { name: "secrets_5k", labels: 6371, hinted: 95.15, blind: 95.15 },
];

/* Hinted, Python engine. DOB is listed last and flagged: it is excluded from
   every headline figure because the Rules Engine layer emits one only with a
   keyword or an unambiguous format, and bare dates go to the AI layer. */
const entityTypes = [
  { name: "EMAIL", support: 152938, recall: 100.0, precision: 99.91 },
  { name: "IBAN", support: 126428, recall: 100.0, precision: 100.0 },
  { name: "PHONE", support: 123151, recall: 99.65, precision: 100.0 },
  { name: "NATIONAL_ID", support: 118040, recall: 100.0, precision: 99.64 },
  { name: "POSTAL_CODE", support: 53914, recall: 98.0, precision: 99.84 },
  { name: "VAT_NUMBER", support: 20136, recall: 99.99, precision: 100.0 },
  { name: "IP_ADDRESS", support: 10038, recall: 99.34, precision: 99.61 },
  { name: "VIN", support: 9701, recall: 99.99, precision: 100.0 },
  { name: "CHAMBER_OF_COMMERCE", support: 8497, recall: 99.99, precision: 100.0 },
  { name: "LICENSE_PLATE", support: 6445, recall: 99.86, precision: 100.0 },
  { name: "CREDIT_CARD", support: 6415, recall: 100.0, precision: 100.0 },
  { name: "SECRET", support: 5659, recall: 95.69, precision: 95.03 },
  { name: "UUID", support: 4890, recall: 100.0, precision: 98.59 },
  { name: "MAC_ADDRESS", support: 3546, recall: 100.0, precision: 100.0 },
  { name: "TAX_ID_PERSONAL", support: 2837, recall: 100.0, precision: 100.0 },
  { name: "SWIFT_BIC", support: 2830, recall: 100.0, precision: 93.55 },
  { name: "IMEI", support: 2443, recall: 100.0, precision: 100.0 },
  { name: "SOCIAL_HANDLE", support: 2267, recall: 100.0, precision: 100.0 },
  { name: "SOCIAL_SECURITY", support: 1288, recall: 100.0, precision: 100.0 },
  { name: "PASSPORT", support: 1072, recall: 99.91, precision: 100.0 },
  { name: "GPS_COORDINATES", support: 950, recall: 100.0, precision: 100.0 },
  { name: "HEALTH_INSURANCE", support: 933, recall: 100.0, precision: 100.0 },
  { name: "TAX_ID", support: 892, recall: 99.55, precision: 100.0 },
  { name: "IP_ADDRESS_V6", support: 636, recall: 100.0, precision: 100.0 },
  { name: "NATIONAL_ID_CARD", support: 542, recall: 100.0, precision: 100.0 },
  { name: "TAX_ID_BUSINESS", support: 389, recall: 100.0, precision: 100.0 },
  { name: "HEALTH_ID", support: 252, recall: 100.0, precision: 100.0 },
  { name: "DOB", support: 0, recall: 62.76, precision: 99.53 },
];

const comparisonData = [
  {
    tool: "euRedact",
    recall: "99.7%",
    precision: "99.8%",
    entities: "31 countries",
    local: "Yes",
    price: "Free / Cloud waitlist",
    highlighted: true,
  },
  {
    tool: "Presidio",
    recall: "~92%",
    precision: "~95%",
    entities: "Limited",
    local: "Yes",
    price: "Free",
    highlighted: false,
  },
  {
    tool: "AWS Comprehend",
    recall: "~88%",
    precision: "~94%",
    entities: "6 langs",
    local: "No",
    price: "Pay-per-use",
    highlighted: false,
  },
  {
    tool: "Azure AI Language",
    recall: "~90%",
    precision: "~93%",
    entities: "8 langs",
    local: "No",
    price: "Pay-per-use",
    highlighted: false,
  },
];

function scoreColor(value: number): string {
  if (value >= 99) return "text-emerald-400";
  if (value >= 95) return "text-lime-400";
  return "text-amber-400";
}


export default function BenchmarksPage() {
  return (
    <div>
      {/* Header */}
      <PageHero
        eyebrow="Benchmarks"
        title="Accuracy Benchmarks"
        subtitle="Transparent, independently verifiable detection rates. 152,300 records across 31 countries."
      >
          <p className="text-on-surface-variant text-sm max-w-3xl leading-relaxed border-l-2 border-pii-highlight/50 pl-4">
            These figures measure structured-PII recall and precision on a
            generated evaluation set of 152,300 records (667,129 non-DOB PII
            labels), measured 31 July 2026 at tag v0.3.6. Generated data
            measures pattern coverage, not real-world messiness such as OCR
            noise or broken layouts — these are not production documents, and
            they are not a guarantee of real-world accuracy on your data.
            Headline figures are the Python engine with the optional{" "}
            <span className="font-mono">countries</span> parameter supplied:
            99.72% recall, 99.82% precision. Without it the engine still runs
            every pattern and infers the country from the text, scoring 99.50%
            recall and 99.59% precision. Date-of-birth detection is excluded
            from the headline numbers and sits at 62.76% recall by design —
            bare dates carry too little structure to separate from ordinary
            dates, so they are deferred to the AI layer.
          </p>
      </PageHero>

      {/* Summary Metrics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "99.72%", label: "Recall" },
              { value: "99.82%", label: "Precision" },
              { value: "99.77%", label: "F1 Score" },
              { value: "31", label: "Countries Tested" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-6xl font-black text-on-surface tabular-nums">
                  {stat.value}
                </div>
                <div className="text-on-surface-variant text-lg mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <p className="text-on-surface-variant text-center text-sm max-w-2xl mx-auto mt-12 leading-relaxed">
            Since 0.3.2 the optional <span className="font-mono">countries</span>{" "}
            parameter scores detection rather than gating it: every pattern runs
            whatever you declare, and a match attributed outside the declared
            set is flagged <span className="font-mono">out_of_scope</span> rather
            than dropped. Declaring the country is still worth it — 99.72% recall
            against 99.50% blind — but omitting it can no longer hide an entity,
            which it previously could.
          </p>
          <div className="max-w-3xl mx-auto mt-10 rounded-2xl border border-outline-variant bg-surface p-8">
            <h3 className="font-black text-lg text-on-surface mb-3">
              Both engines, same corpus, same scorer
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              The Node engine is measured by dumping its detections and scoring
              them with the <em>same</em> scorer as the Python engine, so a
              difference between the two says something about the engines rather
              than about the measurement. With{" "}
              <span className="font-mono">countries</span> supplied they are
              effectively identical — 99.72% recall either way, 99.82% precision
              in Python against 99.80% in Node, and 25 of 27 entity types match
              to the digit.
            </p>
            <p className="text-on-surface-variant text-sm leading-relaxed mt-4">
              Blind, they diverge: Node scores 99.43% recall and 99.51%
              precision against Python&rsquo;s 99.50% and 99.59%. The gap is
              country <em>inference</em>, not detection, and it is not spread
              evenly — it concentrates almost entirely in one dataset, the Greek,
              Cypriot and Maltese documents, where Node reports 719 false
              positives against Python&rsquo;s 277. Every other dataset is within
              0.05 points and six are identical. This predates 0.3.6.
            </p>
          </div>
        </div>
      </section>

      {/* Country Table */}
      <section className="py-20 bg-primary/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-black text-4xl text-on-surface text-center mb-4">
            Results by Dataset
          </h2>
          <p className="text-on-surface-variant text-center mb-12 max-w-2xl mx-auto">
            F1 per corpus file, Python engine, both operating points. The corpus
            is generated in country <em>groups</em> rather than one file per
            country, so this is the finest split the ground truth actually
            supports — a per-country table would have to be invented.
          </p>
          <div className="bg-surface rounded-[2rem] shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-outline-variant bg-primary">
                    <th className="text-left text-sm font-semibold text-on-surface-variant px-6 py-4">
                      Dataset
                    </th>
                    <th className="text-right text-sm font-semibold text-on-surface-variant px-6 py-4">
                      Labels
                    </th>
                    <th className="text-right text-sm font-semibold text-on-surface-variant px-6 py-4">
                      F1, hinted
                    </th>
                    <th className="text-right text-sm font-semibold text-on-surface-variant px-6 py-4">
                      F1, blind
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datasetData.map((row) => (
                    <tr
                      key={row.name}
                      className="border-b border-outline-variant hover:bg-primary/50 transition-colors"
                    >
                      <td className="px-6 py-3.5 font-mono text-sm font-bold text-on-surface">
                        {row.name}
                      </td>
                      <td className="px-6 py-3.5 text-right font-bold tabular-nums text-on-surface-variant">
                        {row.labels.toLocaleString()}
                      </td>
                      <td
                        className={`px-6 py-3.5 text-right font-bold tabular-nums ${scoreColor(row.hinted)}`}
                      >
                        {row.hinted.toFixed(2)}%
                      </td>
                      <td
                        className={`px-6 py-3.5 text-right font-bold tabular-nums ${scoreColor(row.blind)}`}
                      >
                        {row.blind.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Entity Type Breakdown */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-black text-4xl text-on-surface text-center mb-4">
            Detection by Entity Type
          </h2>
          <p className="text-on-surface-variant text-center mb-4 max-w-2xl mx-auto">
            Every entity type in the corpus, ordered by how often it appears.
            Recall with <span className="font-mono">countries</span> supplied,
            Python engine; precision and label count alongside. Rows are keyed on
            the corpus&rsquo;s label names, so{" "}
            <span className="font-mono">IBAN</span> here is the type the engine
            emits as <span className="font-mono">BANK_ACCOUNT</span>.
          </p>
          <p className="text-on-surface-variant text-center mb-12 max-w-2xl mx-auto text-sm">
            The <span className="text-pii-highlight font-bold">DOB</span> row is
            marked as a caveat: bare dates are excluded from the headline figures
            by design and deferred to the AI layer, so its rate is not a
            shortfall. <span className="font-mono">SWIFT_BIC</span> and{" "}
            <span className="font-mono">SECRET</span> are the two genuine weak
            points — a BIC needs a registry rather than a rule, and{" "}
            <span className="font-mono">SECRET</span> is the one type where both
            engines still sit below 96%.
          </p>
          {/* The support and precision columns are detail, not the point — they
              drop below `sm` so the bar keeps a usable width. */}
          <div className="space-y-3">
            {entityTypes.map((entity) => (
              <div key={entity.name} className="flex items-center gap-3 sm:gap-4">
                <div className="w-28 sm:w-44 shrink-0 text-right font-mono text-[10px] sm:text-xs font-semibold text-pii-danger break-words">
                  {entity.name}
                </div>
                <div className="hidden sm:block w-16 shrink-0 text-right tabular-nums text-[11px] text-on-surface-variant">
                  {entity.support ? entity.support.toLocaleString() : "—"}
                </div>
                <div className="flex-1 min-w-0 h-7 bg-primary rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      entity.name === "DOB" ? "bg-pii-highlight" : "bg-secondary"
                    }`}
                    style={{ width: `${entity.recall}%` }}
                  />
                </div>
                <div
                  className={`w-14 sm:w-16 shrink-0 text-right font-bold tabular-nums text-xs sm:text-sm ${scoreColor(entity.recall)}`}
                >
                  {entity.recall.toFixed(2)}%
                </div>
                <div className="hidden sm:block w-20 shrink-0 text-right tabular-nums text-[11px] text-on-surface-variant">
                  P {entity.precision.toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-primary/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-black text-4xl text-on-surface text-center mb-4">
            How We Compare
          </h2>
          <p className="text-on-surface-variant text-center mb-12 max-w-xl mx-auto">
            euRedact benchmarked against popular PII detection tools.
          </p>
          <div className="bg-code rounded-[3rem] p-12 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-sm font-semibold text-white/60 px-4 py-4">
                      Tool
                    </th>
                    <th className="text-right text-sm font-semibold text-white/60 px-4 py-4">
                      EU Recall
                    </th>
                    <th className="text-right text-sm font-semibold text-white/60 px-4 py-4">
                      Precision
                    </th>
                    <th className="text-right text-sm font-semibold text-white/60 px-4 py-4">
                      EU Entities
                    </th>
                    <th className="text-center text-sm font-semibold text-white/60 px-4 py-4">
                      Local
                    </th>
                    <th className="text-right text-sm font-semibold text-white/60 px-4 py-4">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row) => (
                    <tr
                      key={row.tool}
                      className={
                        row.highlighted
                          ? "border-2 border-secondary rounded-xl"
                          : "border-b border-white/5"
                      }
                    >
                      <td className="px-4 py-4 font-bold text-white">
                        {row.tool}
                        {row.highlighted && (
                          <span className="ml-2 inline-block bg-secondary/20 text-secondary text-xs font-semibold px-2.5 py-0.5 rounded-full">
                            ours
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-right font-bold tabular-nums text-white">
                        {row.recall}
                      </td>
                      <td className="px-4 py-4 text-right font-bold tabular-nums text-white">
                        {row.precision}
                      </td>
                      <td className="px-4 py-4 text-right text-white/80">
                        {row.entities}
                      </td>
                      <td className="px-4 py-4 text-center text-white/80">
                        {row.local}
                      </td>
                      <td className="px-4 py-4 text-right text-white/80">
                        {row.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-on-surface-variant text-sm max-w-3xl mx-auto mt-8 leading-relaxed">
            Competitor capabilities assessed July 2026 from each vendor&apos;s
            public documentation:{" "}
            <a
              href="https://microsoft.github.io/presidio/supported_entities/"
              className="text-on-surface font-semibold hover:underline"
            >
              Presidio supported entities
            </a>
            ,{" "}
            <a
              href="https://docs.aws.amazon.com/comprehend/latest/dg/how-pii.html"
              className="text-on-surface font-semibold hover:underline"
            >
              AWS Comprehend PII
            </a>
            , and{" "}
            <a
              href="https://learn.microsoft.com/en-us/azure/ai-services/language-service/personally-identifiable-information/language-support"
              className="text-on-surface font-semibold hover:underline"
            >
              Azure AI Language PII
            </a>
            . Recall and precision figures for other tools are approximate and
            indicative only; vendors may score differently under other
            configurations. These products change frequently — check their
            current documentation before relying on this table.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="material-symbols-outlined text-secondary text-5xl mb-6 block">
            science
          </span>
          <h2 className="font-black text-4xl text-on-surface mb-4">
            Verify It Yourself
          </h2>
          <p className="text-on-surface-variant text-lg mb-8 max-w-xl mx-auto">
            Run the benchmarks yourself — our test suite is open source.
          </p>
          <a
            href="https://github.com/euredact/euredact-benchmarks"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-code text-white font-semibold rounded-full py-3.5 px-8 hover:bg-code/90 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">code</span>
            View on GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
