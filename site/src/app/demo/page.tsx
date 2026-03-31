"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { redact, availableCountries, type Detection } from "euredact";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function buildSegments(
  text: string,
  detections: Detection[],
  pseudonymize: boolean
): { text: string; detection?: Detection }[] {
  if (pseudonymize) {
    // When pseudonymize is on, the redactedText already has replacements,
    // so we just show that as plain text — no highlights needed.
    return [];
  }

  const segments: { text: string; detection?: Detection }[] = [];
  let cursor = 0;

  const sorted = [...detections].sort((a, b) => a.start - b.start);

  for (const d of sorted) {
    if (d.start > cursor) {
      segments.push({ text: text.slice(cursor, d.start) });
    }
    segments.push({ text: `[${d.entityType}]`, detection: d });
    cursor = d.end;
  }

  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor) });
  }

  return segments;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SAMPLE_TEXT =
  "Beste Jan Van den Berg, uw BSN is 111222333 en uw IBAN is NL91ABNA0417164300. U kunt ons bereiken op +31 6 12345678 of via jan.vandenberg@example.com. Uw geboortedatum is 15-03-1985.";

const SUPPORTED_COUNTRIES = availableCountries();

const FEATURED_COUNTRIES = ["NL", "BE", "DE", "FR", "LU", "SE", "UK"];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function PillBadge({ type }: { type: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold whitespace-nowrap bg-pii-highlight text-on-surface">
      {type}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function DemoPage() {
  const [inputText, setInputText] = useState(SAMPLE_TEXT);
  const [activeCountries, setActiveCountries] = useState<string[]>([]);
  const [pseudonymize, setPseudonymize] = useState(false);
  const [detectDates, setDetectDates] = useState(true);

  // Run initial redaction
  const initialResult = redact(SAMPLE_TEXT, {
    pseudonymize: false,
    detectDates: true,
  });
  const [detections, setDetections] = useState<Detection[]>(
    initialResult.detections  );
  const [redactedText, setRedactedText] = useState(
    initialResult.redactedText
  );
  const [segments, setSegments] = useState(
    buildSegments(
      SAMPLE_TEXT,
      initialResult.detections as unknown as Detection[],
      false
    )
  );
  const [hasResults, setHasResults] = useState(true);

  const handleRedact = useCallback(() => {
    const result = redact(inputText, {
      countries: activeCountries.length > 0 ? activeCountries : undefined,
      pseudonymize,
      detectDates,
    });
    setDetections(result.detections as unknown as Detection[]);
    setRedactedText(result.redactedText);
    setSegments(
      buildSegments(inputText, result.detections as unknown as Detection[], pseudonymize)
    );
    setHasResults(true);
  }, [inputText, activeCountries, pseudonymize, detectDates]);

  const toggleCountry = (code: string) => {
    setActiveCountries((prev) =>
      prev.includes(code)
        ? prev.filter((c) => c !== code)
        : [...prev, code]
    );
  };

  return (
    <>
      {/* ---- Hero header ---- */}
      <section className="pt-32 pb-16 bg-primary hero-pattern">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
          <h1 className="text-5xl font-black text-white mb-4">
            Try euRedact
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
            Paste text below and see PII detection in real-time. Powered by the{" "}
            <a
              href="https://www.npmjs.com/package/euredact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-emerald-300 underline decoration-secondary/40 underline-offset-4 transition-colors"
            >
              euredact
            </a>{" "}
            npm package&nbsp;&mdash; everything runs in your browser.
          </p>
        </div>
      </section>

      {/* ---- Split panel ---- */}
      <section className="bg-white py-12">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-8">
            {/* LEFT — Input */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-lg">
                  edit_note
                </span>
                Input
              </h2>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={8}
                className="w-full min-h-[12rem] bg-[#1E293B] text-white font-mono text-sm leading-relaxed p-5 rounded-2xl border border-white/10 focus:outline-none focus:ring-2 focus:ring-secondary/50 resize-y placeholder:text-slate-500"
                placeholder="Paste or type text containing European PII..."
              />

              {/* Controls */}
              <div className="mt-4 flex flex-col gap-4">
                {/* Country pills */}
                <div className="flex flex-wrap gap-2">
                  {FEATURED_COUNTRIES.map((code) => (
                    <button
                      key={code}
                      onClick={() => toggleCountry(code)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-150 ${
                        activeCountries.includes(code)
                          ? "bg-secondary text-primary"
                          : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                  <span className="text-xs text-slate-400 self-center ml-1">
                    + {SUPPORTED_COUNTRIES.length - FEATURED_COUNTRIES.length} more
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Pseudonymize toggle */}
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <span
                      role="switch"
                      aria-checked={pseudonymize}
                      tabIndex={0}
                      onClick={() => setPseudonymize(!pseudonymize)}
                      onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter")
                          setPseudonymize(!pseudonymize);
                      }}
                      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ${
                        pseudonymize ? "bg-secondary" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                          pseudonymize ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </span>
                    <span className="text-sm font-medium text-on-surface-variant">
                      Pseudonymize
                    </span>
                  </label>

                  {/* Detect dates toggle */}
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <span
                      role="switch"
                      aria-checked={detectDates}
                      tabIndex={0}
                      onClick={() => setDetectDates(!detectDates)}
                      onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter")
                          setDetectDates(!detectDates);
                      }}
                      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ${
                        detectDates ? "bg-secondary" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                          detectDates ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </span>
                    <span className="text-sm font-medium text-on-surface-variant">
                      Detect dates
                    </span>
                  </label>

                  {/* Redact button */}
                  <button
                    onClick={handleRedact}
                    className="bg-secondary hover:bg-emerald-400 text-primary text-sm font-black px-8 py-2.5 rounded-lg transition-all hover:-translate-y-0.5 active:scale-95 duration-150 electric-glow uppercase tracking-wider ml-auto"
                  >
                    Redact
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT — Output */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-lg">
                  output
                </span>
                Output
              </h2>

              <div className="bg-[#1E293B] rounded-2xl border border-white/10 p-5 min-h-[12rem] font-mono text-sm leading-relaxed">
                {hasResults ? (
                  pseudonymize ? (
                    <p className="text-slate-300 whitespace-pre-wrap">
                      {redactedText}
                    </p>
                  ) : (
                    <p className="text-slate-300 whitespace-pre-wrap">
                      {segments.map((seg, i) =>
                        seg.detection ? (
                          <span
                            key={i}
                            className="inline-flex items-center bg-pii-highlight text-on-surface px-2 py-0.5 rounded-full text-xs font-bold mx-0.5"
                          >
                            {seg.text}
                          </span>
                        ) : (
                          <span key={i}>{seg.text}</span>
                        )
                      )}
                    </p>
                  )
                ) : (
                  <p className="text-slate-500 italic">
                    Click &quot;Redact&quot; to process your text.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Detection table ---- */}
      {hasResults && detections.length > 0 && (
        <section className="bg-white pb-12">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
            <div className="bg-primary rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-lg">
                  table_rows
                </span>
                <h3 className="text-white text-sm font-bold uppercase tracking-[0.2em]">
                  Detections
                </h3>
                <span className="ml-2 bg-secondary/20 text-secondary text-xs font-bold px-2 py-0.5 rounded-full">
                  {detections.length}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-slate-400 text-xs uppercase tracking-[0.15em] border-b border-white/5">
                      <th className="text-left px-6 py-3 font-bold">
                        Entity Type
                      </th>
                      <th className="text-left px-6 py-3 font-bold">
                        Detected Value
                      </th>
                      <th className="text-left px-6 py-3 font-bold">
                        Position
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {detections.map((d, i) => (
                      <tr
                        key={i}
                        className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="px-6 py-3">
                          <PillBadge type={d.entityType} />
                        </td>
                        <td className="px-6 py-3 font-mono text-white">
                          {d.text}
                        </td>
                        <td className="px-6 py-3 text-slate-400">
                          {d.start}&ndash;{d.end}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ---- Install banner ---- */}
      <section className="bg-white pb-20">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-8">
          <div className="bg-accent-indigo rounded-[3rem] px-10 py-12 md:px-16 md:py-14 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-2xl md:text-3xl font-black mb-2">
                Use euRedact in your own project
              </h3>
              <p className="text-indigo-300 text-base leading-relaxed max-w-lg">
                Available as both a Python and Node.js package. Zero
                dependencies, local-only processing, Apache 2.0 licensed.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a
                href="https://pypi.org/project/euredact/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 text-white font-mono text-sm px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
              >
                pip install euredact
              </a>
              <a
                href="https://www.npmjs.com/package/euredact"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 text-white font-mono text-sm px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
              >
                npm install euredact
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
