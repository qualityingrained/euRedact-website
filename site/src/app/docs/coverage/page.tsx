import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { CoverageExplorer } from "./coverage-explorer";
import { COUNTRIES, TYPES } from "./types";

export const metadata: Metadata = {
  title: "What euRedact detects — euRedact Docs",
  description:
    "Every personal-data type euRedact covers, which of the two layers detects it, and how ambiguity between adjacent types is resolved. 40 types across 31 European jurisdictions.",
};

/*
  This page describes *what is covered*. It carries no recall, precision or F1
  figures by design — /benchmarks is where measured performance lives, with its
  conditions attached. Keeping the two apart is deliberate: a coverage list that
  quotes accuracy stops being a reference and becomes a claim.
*/

function Tick({ on }: { on: boolean }) {
  return on ? (
    <span className="text-secondary font-black" aria-label="yes">
      ✓
    </span>
  ) : (
    <span className="text-on-surface-variant/30" aria-label="no dedicated pattern">
      —
    </span>
  );
}

export default function CoveragePage() {
  const rulesOnly = TYPES.filter((t) => t.layer === "Rules only").length;
  const rulesLed = TYPES.filter((t) => t.layer === "Rules led").length;
  const aiLed = TYPES.filter((t) => t.layer === "AI led").length;
  const aiOnly = TYPES.filter((t) => t.layer === "AI only").length;

  return (
    <>
      <PageHero
        eyebrow="Reference"
        title="What euRedact detects"
        subtitle={
          <>
            {TYPES.length} types of personal data, across 31 European
            jurisdictions, detected by two layers with opposite strengths. This
            page is the boundary map: what each type covers, what it
            deliberately does not, and which layer is responsible.
          </>
        }
      >
        <p className="text-on-surface-variant text-sm max-w-3xl leading-relaxed border-l-2 border-pii-highlight/50 pl-4">
          Coverage, not performance. For measured recall and precision under
          stated conditions, see{" "}
          <Link href="/benchmarks" className="text-secondary hover:underline">
            benchmarks
          </Link>
          . The AI layer is in development; the Rules Engine layer ships today in
          the{" "}
          <Link href="/docs/python" className="text-secondary hover:underline">
            Python
          </Link>{" "}
          and{" "}
          <Link href="/docs/nodejs" className="text-secondary hover:underline">
            Node.js
          </Link>{" "}
          SDKs.
        </p>
      </PageHero>

      {/* ── The two layers ── */}
      <section className="bg-primary/40 py-16 px-6 md:px-8">
        <div className="mx-auto max-w-[1180px]">
          <h2 className="font-black text-3xl text-on-surface mb-3 tracking-tight">
            The two layers
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-10 max-w-3xl">
            euRedact detects personal data with two layers that run in sequence
            over the same document. They are designed around{" "}
            <em>opposite failure modes</em>, which is why both exist.
          </p>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Rules Engine */}
            <div className="rounded-2xl border-2 border-secondary/30 bg-surface p-8">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-3">
                Structure
              </div>
              <h3 className="font-black text-xl text-on-surface mb-4">
                The Rules Engine layer
              </h3>
              <p className="text-sm leading-relaxed text-on-surface-variant mb-4">
                Deterministic pattern matching with format validation. A
                candidate is found by a regular expression, then — where the
                identifier&rsquo;s specification allows it — confirmed by an
                arithmetic check: the mod-97 checksum on an IBAN, the 11-test on
                a Dutch BSN, Luhn on a credit card or IMEI, the ISO 3779 check
                digit on a VIN.
              </p>
              <p className="text-sm leading-relaxed text-on-surface-variant mb-4">
                <span className="font-black text-on-surface">Good at: </span>
                identifiers with a defined, published structure. It runs locally,
                needs no model inference, produces the same answer every time for
                the same input, and can explain any detection by pointing at the
                rule and the validator that fired.
              </p>
              <p className="text-sm leading-relaxed text-on-surface-variant mb-6">
                <span className="font-black text-pii-danger">
                  Fails at:{" "}
                </span>
                anything whose form is not fixed. A name, a job title, a
                diagnosis and a street address have no checksum and no reliable
                shape.
              </p>
              <div className="rounded-xl bg-primary p-5 text-sm leading-relaxed text-on-surface-variant">
                Ships <span className="font-black text-on-surface">301</span>{" "}
                country-specific patterns across 31 European jurisdictions, plus
                a shared tier of{" "}
                <span className="font-black text-on-surface">45</span> patterns
                that apply regardless of country — formats international by
                definition, such as IBAN, e-mail, IPv4/IPv6, MAC, UUID and the
                major cloud-provider API-key formats.
              </div>
            </div>

            {/* AI layer */}
            <div className="rounded-2xl border-2 border-pii-highlight/30 bg-surface p-8">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-pii-highlight mb-3">
                Meaning
              </div>
              <h3 className="font-black text-xl text-on-surface mb-4">
                The AI layer
              </h3>
              <p className="text-sm leading-relaxed text-on-surface-variant mb-4">
                A language model reads the document with the Rules Engine
                results already in hand, and its job is what remains: entities
                with no fixed form, and entities whose form is ambiguous without
                understanding the surrounding sentence.
              </p>
              <p className="text-sm leading-relaxed text-on-surface-variant mb-4">
                <span className="font-black text-on-surface">Good at: </span>
                names, addresses, organisations, job titles, medical
                information, special-category attributes, and the judgement
                calls — whether a number labelled only &ldquo;reference&rdquo; is
                a person-lookup key or a purchase order, whether a date is a
                birth date or an invoice date, whether a URL identifies somebody
                or merely points at a standards document.
              </p>
              <p className="text-sm leading-relaxed text-on-surface-variant mb-6">
                <span className="font-black text-pii-danger">Fails at: </span>
                guaranteeing that a well-formed identifier was caught. A model
                may skip one IBAN in a table of forty. A checksum will not.
              </p>
              <div className="rounded-xl bg-primary p-5 text-sm leading-relaxed text-on-surface-variant">
                Carries every type with no reliable pattern — including the GDPR
                Article 9 special-category types, which are the ones a
                compliance review asks about first.
              </div>
            </div>
          </div>

          {/* How they combine */}
          <div className="mt-6 rounded-2xl border border-outline-variant bg-surface p-8">
            <h3 className="font-black text-lg text-on-surface mb-3">
              How they combine
            </h3>
            <p className="text-sm leading-relaxed text-on-surface-variant mb-4">
              The Rules Engine layer runs first and its detections are passed to
              the model as established findings, so the model spends its
              attention on what is left rather than re-deriving what is already
              settled. Detections carry the layer that produced them, which is
              what makes a redaction report auditable: every masked span traces
              back either to a named rule and validator, or to the model.
            </p>
            <div className="grid gap-3 sm:grid-cols-4">
              {[
                { n: rulesOnly, l: "Rules only" },
                { n: rulesLed, l: "Rules led" },
                { n: aiLed, l: "AI led" },
                { n: aiOnly, l: "AI only" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-xl bg-primary p-4 text-center"
                >
                  <div className="text-2xl font-black text-on-surface tabular-nums">
                    {s.n}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant mt-1">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legends, filterable table, type reference, ambiguity rules */}
      <CoverageExplorer />

      {/* ── Country coverage ── */}
      <section className="bg-surface py-16 px-6 md:px-8">
        <div className="mx-auto max-w-[1180px]">
          <h2 className="font-black text-3xl text-on-surface mb-3 tracking-tight">
            Country coverage — Rules Engine layer
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-6 max-w-3xl">
            31 jurisdictions with dedicated pattern sets. Every country listed
            has national-format patterns for bank accounts, national IDs, phone
            numbers and postal codes at minimum; the columns below show the types
            that vary between them.
          </p>

          <blockquote className="callout callout-note mb-8 max-w-3xl">
            <p>
              A dash means <em>no dedicated pattern for that type in that
              country</em> — not &ldquo;not detected&rdquo;. The shared tier and
              the AI layer still apply. This is the most likely misreading of the
              table below.
            </p>
          </blockquote>

          <div className="overflow-x-auto rounded-2xl border border-outline-variant">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="border-b border-outline-variant bg-primary">
                  <th className="text-left text-xs font-black uppercase tracking-wider text-on-surface-variant px-5 py-3.5">
                    Country
                  </th>
                  <th className="text-center text-xs font-black uppercase tracking-wider text-on-surface-variant px-4 py-3.5">
                    VAT
                  </th>
                  <th className="text-center text-xs font-black uppercase tracking-wider text-on-surface-variant px-4 py-3.5">
                    Plate
                  </th>
                  <th className="text-center text-xs font-black uppercase tracking-wider text-on-surface-variant px-4 py-3.5">
                    Trade register
                  </th>
                  <th className="text-center text-xs font-black uppercase tracking-wider text-on-surface-variant px-4 py-3.5">
                    Tax ID
                  </th>
                  <th className="text-center text-xs font-black uppercase tracking-wider text-on-surface-variant px-4 py-3.5">
                    Passport
                  </th>
                  <th className="text-left text-xs font-black uppercase tracking-wider text-on-surface-variant px-5 py-3.5">
                    Other
                  </th>
                </tr>
              </thead>
              <tbody>
                {COUNTRIES.map((c) => (
                  <tr
                    key={c.code}
                    className="border-b border-outline-variant last:border-0 hover:bg-primary/50 transition-colors"
                  >
                    <td className="px-5 py-3 text-sm font-bold text-on-surface whitespace-nowrap">
                      {c.name}{" "}
                      <span className="font-mono text-xs text-on-surface-variant">
                        {c.code}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Tick on={c.vat} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Tick on={c.plate} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Tick on={c.register} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Tick on={c.taxId} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Tick on={c.passport} />
                    </td>
                    <td className="px-5 py-3 text-xs text-on-surface-variant">
                      {c.other ?? ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-2xl border border-outline-variant bg-primary p-6 max-w-3xl">
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-2">
              The shared tier
            </div>
            <p className="text-sm leading-relaxed text-on-surface-variant">
              Applies to documents from <strong>every</strong> country and
              covers: IBAN, BIC, credit cards, e-mail, international phone
              numbers, IPv4, IPv6, MAC addresses, UUIDs, IMEI, VIN, GPS
              coordinates, social handles, dates of birth and death, and the
              secret formats listed under{" "}
              <a href="#SECRET" className="text-secondary hover:underline">
                SECRET
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* ── Next steps ── */}
      <section className="bg-primary/40 py-16 px-6 md:px-8">
        <div className="mx-auto max-w-[1180px]">
          <div className="rounded-[2rem] bg-code p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-black text-xl text-white mb-2">
                Start with the types that ship today
              </h3>
              <p className="text-on-surface-variant text-sm max-w-xl">
                Everything marked Rules only or Rules led runs locally, right
                now, with no network calls.
              </p>
            </div>
            <Link
              href="/docs/quickstart"
              className="shrink-0 inline-flex items-center gap-2 bg-secondary text-primary px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-secondary-hover transition-all"
            >
              Quickstart
              <span className="material-symbols-outlined text-base">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
