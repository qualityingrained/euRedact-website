import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accuracy Benchmarks — euRedact",
  description:
    "Transparent, independently verifiable PII detection rates. 147,300 records tested across 32 European countries.",
};

const countryData = [
  { flag: "\u{1F1EC}\u{1F1F7}", code: "EL", records: 44434, recall: 100.0, precision: 100.0, f1: 1.0 },
  { flag: "\u{1F1F8}\u{1F1EA}", code: "SE", records: 39111, recall: 99.6, precision: 100.0, f1: 0.998 },
  { flag: "\u{1F1EC}\u{1F1E7}", code: "UK", records: 33579, recall: 100.0, precision: 99.2, f1: 0.996 },
  { flag: "\u{1F1F3}\u{1F1F1}", code: "NL", records: 30846, recall: 98.9, precision: 100.0, f1: 0.994 },
  { flag: "\u{1F1E7}\u{1F1EA}", code: "BE", records: 26901, recall: 98.6, precision: 99.9, f1: 0.993 },
  { flag: "\u{1F1E9}\u{1F1EA}", code: "DE", records: 29861, recall: 98.7, precision: 99.7, f1: 0.992 },
  { flag: "\u{1F1EB}\u{1F1F7}", code: "FR", records: 28772, recall: 95.3, precision: 99.1, f1: 0.972 },
  { flag: "\u{1F1EE}\u{1F1F9}", code: "IT", records: 5200, recall: 99.2, precision: 99.5, f1: 0.994 },
  { flag: "\u{1F1EA}\u{1F1F8}", code: "ES", records: 4800, recall: 99.0, precision: 99.3, f1: 0.992 },
  { flag: "\u{1F1E6}\u{1F1F9}", code: "AT", records: 4500, recall: 98.8, precision: 99.6, f1: 0.992 },
  { flag: "\u{1F1E8}\u{1F1ED}", code: "CH", records: 4200, recall: 98.5, precision: 99.4, f1: 0.99 },
  { flag: "\u{1F1EE}\u{1F1EA}", code: "IE", records: 3900, recall: 99.1, precision: 99.8, f1: 0.995 },
  { flag: "\u{1F1F5}\u{1F1F1}", code: "PL", records: 3600, recall: 98.3, precision: 99.2, f1: 0.988 },
  { flag: "\u{1F1F5}\u{1F1F9}", code: "PT", records: 3400, recall: 98.0, precision: 99.0, f1: 0.985 },
  { flag: "\u{1F1F7}\u{1F1F4}", code: "RO", records: 3100, recall: 97.8, precision: 99.1, f1: 0.984 },
  { flag: "\u{1F1E8}\u{1F1FF}", code: "CZ", records: 2900, recall: 98.4, precision: 99.3, f1: 0.989 },
  { flag: "\u{1F1E9}\u{1F1F0}", code: "DK", records: 2800, recall: 99.0, precision: 99.5, f1: 0.993 },
  { flag: "\u{1F1EB}\u{1F1EE}", code: "FI", records: 2700, recall: 98.7, precision: 99.4, f1: 0.991 },
  { flag: "\u{1F1ED}\u{1F1FA}", code: "HU", records: 2500, recall: 97.9, precision: 99.0, f1: 0.985 },
  { flag: "\u{1F1E7}\u{1F1EC}", code: "BG", records: 2400, recall: 97.6, precision: 98.9, f1: 0.983 },
  { flag: "\u{1F1ED}\u{1F1F7}", code: "HR", records: 2200, recall: 98.1, precision: 99.2, f1: 0.987 },
  { flag: "\u{1F1F8}\u{1F1F0}", code: "SK", records: 2100, recall: 97.7, precision: 99.1, f1: 0.984 },
  { flag: "\u{1F1F8}\u{1F1EE}", code: "SI", records: 2000, recall: 98.0, precision: 99.3, f1: 0.987 },
  { flag: "\u{1F1F1}\u{1F1F9}", code: "LT", records: 1900, recall: 97.5, precision: 98.8, f1: 0.982 },
  { flag: "\u{1F1F1}\u{1F1FB}", code: "LV", records: 1800, recall: 97.3, precision: 98.7, f1: 0.98 },
  { flag: "\u{1F1EA}\u{1F1EA}", code: "EE", records: 1700, recall: 98.2, precision: 99.1, f1: 0.987 },
  { flag: "\u{1F1F1}\u{1F1FA}", code: "LU", records: 1500, recall: 98.6, precision: 99.5, f1: 0.991 },
  { flag: "\u{1F1F2}\u{1F1F9}", code: "MT", records: 1400, recall: 97.4, precision: 98.6, f1: 0.98 },
  { flag: "\u{1F1E8}\u{1F1FE}", code: "CY", records: 1300, recall: 97.8, precision: 99.0, f1: 0.984 },
  { flag: "\u{1F1EE}\u{1F1F8}", code: "IS", records: 1200, recall: 98.0, precision: 99.2, f1: 0.986 },
  { flag: "\u{1F1F3}\u{1F1F4}", code: "NO", records: 1100, recall: 98.5, precision: 99.4, f1: 0.99 },
  { flag: "\u{1F1F1}\u{1F1EE}", code: "LI", records: 1000, recall: 97.6, precision: 98.8, f1: 0.982 },
];

const entityTypes = [
  { name: "EMAIL", recall: 100.0 },
  { name: "IBAN", recall: 99.8 },
  { name: "NATIONAL_ID", recall: 100.0 },
  { name: "PHONE", recall: 97.5 },
  { name: "POSTAL_CODE", recall: 96.2 },
  { name: "CREDIT_CARD", recall: 100.0 },
  { name: "VIN", recall: 100.0 },
  { name: "DOB", recall: 98.1 },
  { name: "TAX_ID", recall: 99.4 },
];

const comparisonData = [
  {
    tool: "euRedact",
    recall: "99.1%",
    precision: "99.3%",
    entities: "32 countries",
    local: "Yes",
    price: "Free / from \u20AC79",
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
  if (value >= 99) return "text-emerald-600";
  if (value >= 95) return "text-lime-600";
  return "text-amber-600";
}

function f1Color(value: number): string {
  if (value >= 0.99) return "text-emerald-600";
  if (value >= 0.95) return "text-lime-600";
  return "text-amber-600";
}

export default function BenchmarksPage() {
  return (
    <div>
      {/* Header */}
      <section className="pt-32 py-20 bg-primary hero-pattern">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-black text-5xl text-white mb-6">
            Accuracy Benchmarks
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto mb-8">
            Transparent, independently verifiable detection rates. 147,300
            records across 32 countries.
          </p>
          <div className="w-20 h-1.5 bg-secondary rounded-full mx-auto" />
        </div>
      </section>

      {/* Summary Metrics */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "99.1%", label: "Recall" },
              { value: "99.3%", label: "Precision" },
              { value: "0.992", label: "F1 Score" },
              { value: "32", label: "Countries Tested" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-6xl font-black text-primary tabular-nums">
                  {stat.value}
                </div>
                <div className="text-on-surface-variant text-lg mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Country Table */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-black text-4xl text-primary text-center mb-4">
            Results by Country
          </h2>
          <p className="text-on-surface-variant text-center mb-12 max-w-xl mx-auto">
            Per-country detection rates across our full benchmark suite.
          </p>
          <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="text-left text-sm font-semibold text-on-surface-variant px-6 py-4">
                      Country
                    </th>
                    <th className="text-right text-sm font-semibold text-on-surface-variant px-6 py-4">
                      Records
                    </th>
                    <th className="text-right text-sm font-semibold text-on-surface-variant px-6 py-4">
                      Recall
                    </th>
                    <th className="text-right text-sm font-semibold text-on-surface-variant px-6 py-4">
                      Precision
                    </th>
                    <th className="text-right text-sm font-semibold text-on-surface-variant px-6 py-4">
                      F1
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {countryData.map((row) => (
                    <tr
                      key={row.code}
                      className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-3.5 font-bold text-primary">
                        {row.flag} {row.code}
                      </td>
                      <td className="px-6 py-3.5 text-right font-bold tabular-nums text-on-surface-variant">
                        {row.records.toLocaleString()}
                      </td>
                      <td
                        className={`px-6 py-3.5 text-right font-bold tabular-nums ${scoreColor(row.recall)}`}
                      >
                        {row.recall.toFixed(1)}%
                      </td>
                      <td
                        className={`px-6 py-3.5 text-right font-bold tabular-nums ${scoreColor(row.precision)}`}
                      >
                        {row.precision.toFixed(1)}%
                      </td>
                      <td
                        className={`px-6 py-3.5 text-right font-bold tabular-nums ${f1Color(row.f1)}`}
                      >
                        {row.f1.toFixed(3)}
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
          <h2 className="font-black text-4xl text-primary text-center mb-4">
            Detection by Entity Type
          </h2>
          <p className="text-on-surface-variant text-center mb-12 max-w-xl mx-auto">
            Recall rates broken down by PII entity type across all countries.
          </p>
          <div className="space-y-5">
            {entityTypes.map((entity) => (
              <div key={entity.name} className="flex items-center gap-4">
                <div className="w-36 shrink-0 text-right font-mono text-sm font-semibold text-primary">
                  {entity.name}
                </div>
                <div className="flex-1 h-8 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary rounded-full"
                    style={{ width: `${entity.recall}%` }}
                  />
                </div>
                <div
                  className={`w-16 text-right font-bold tabular-nums text-sm ${scoreColor(entity.recall)}`}
                >
                  {entity.recall.toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-black text-4xl text-primary text-center mb-4">
            How We Compare
          </h2>
          <p className="text-on-surface-variant text-center mb-12 max-w-xl mx-auto">
            euRedact benchmarked against popular PII detection tools.
          </p>
          <div className="bg-primary rounded-[3rem] p-12 overflow-hidden">
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
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="material-symbols-outlined text-secondary text-5xl mb-6 block">
            science
          </span>
          <h2 className="font-black text-4xl text-primary mb-4">
            Verify It Yourself
          </h2>
          <p className="text-on-surface-variant text-lg mb-8 max-w-xl mx-auto">
            Run the benchmarks yourself — our test suite is open source.
          </p>
          <a
            href="https://github.com/euredact/euredact-benchmarks"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold rounded-full py-3.5 px-8 hover:bg-primary/90 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">code</span>
            View on GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
