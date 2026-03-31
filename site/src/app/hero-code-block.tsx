"use client";

import { useState, useEffect } from "react";

type Lang = "python" | "node";

interface CountryExample {
  code: string;
  /** Plain-text segments. PII values are wrapped in { pii: "..." } */
  textParts: (string | { pii: string })[];
  /** The redacted output line shown below the code */
  outputParts: (string | { tag: string })[];
}

const EXAMPLES: Record<string, CountryExample> = {
  NL: {
    code: "NL",
    textParts: [
      "Mijn BSN is ",
      { pii: "111222333" },
      " en mijn IBAN is ",
      { pii: "NL91ABNA0417164300" },
      ".",
    ],
    outputParts: [
      "Mijn ",
      { tag: "NATIONAL_ID" },
      " en mijn ",
      { tag: "IBAN" },
      ".",
    ],
  },
  DE: {
    code: "DE",
    textParts: [
      "Meine Steuer-ID ist ",
      { pii: "26954371827" },
      " und meine IBAN ist ",
      { pii: "DE89370400440532013000" },
      ".",
    ],
    outputParts: [
      "Meine ",
      { tag: "TAX_ID" },
      " und meine ",
      { tag: "IBAN" },
      ".",
    ],
  },
  FR: {
    code: "FR",
    textParts: [
      "Mon NIR est ",
      { pii: "1850575123456" },
      " et mon IBAN est ",
      { pii: "FR7630006000011234567890189" },
      ".",
    ],
    outputParts: [
      "Mon ",
      { tag: "NATIONAL_ID" },
      " et mon ",
      { tag: "IBAN" },
      ".",
    ],
  },
  BE: {
    code: "BE",
    textParts: [
      "Mijn rijksregisternummer is ",
      { pii: "85.07.30-033.28" },
      " en mijn IBAN is ",
      { pii: "BE68539007547034" },
      ".",
    ],
    outputParts: [
      "Mijn ",
      { tag: "NATIONAL_ID" },
      " en mijn ",
      { tag: "IBAN" },
      ".",
    ],
  },
  ES: {
    code: "ES",
    textParts: [
      "Mi DNI es ",
      { pii: "12345678Z" },
      " y mi IBAN es ",
      { pii: "ES9121000418450200051332" },
      ".",
    ],
    outputParts: [
      "Mi ",
      { tag: "NATIONAL_ID" },
      " y mi ",
      { tag: "IBAN" },
      ".",
    ],
  },
  IT: {
    code: "IT",
    textParts: [
      "Il mio codice fiscale \u00e8 ",
      { pii: "RSSMRA85M01H501Z" },
      " e il mio IBAN \u00e8 ",
      { pii: "IT60X0542811101000000123456" },
      ".",
    ],
    outputParts: [
      "Il mio ",
      { tag: "TAX_ID" },
      " e il mio ",
      { tag: "IBAN" },
      ".",
    ],
  },
  SE: {
    code: "SE",
    textParts: [
      "Mitt personnummer \u00e4r ",
      { pii: "198507301234" },
      " och mitt IBAN \u00e4r ",
      { pii: "SE4550000000058398257466" },
      ".",
    ],
    outputParts: [
      "Mitt ",
      { tag: "NATIONAL_ID" },
      " och mitt ",
      { tag: "IBAN" },
      ".",
    ],
  },
  UK: {
    code: "UK",
    textParts: [
      "My NINO is ",
      { pii: "QQ123456C" },
      " and my IBAN is ",
      { pii: "GB29NWBK60161331926819" },
      ".",
    ],
    outputParts: [
      "My ",
      { tag: "NATIONAL_ID" },
      " and my ",
      { tag: "IBAN" },
      ".",
    ],
  },
  PL: {
    code: "PL",
    textParts: [
      "M\u00f3j PESEL to ",
      { pii: "85073012345" },
      " a m\u00f3j IBAN to ",
      { pii: "PL61109010140000071219812874" },
      ".",
    ],
    outputParts: [
      "M\u00f3j ",
      { tag: "NATIONAL_ID" },
      " a m\u00f3j ",
      { tag: "IBAN" },
      ".",
    ],
  },
  AT: {
    code: "AT",
    textParts: [
      "Meine Sozialversicherungsnummer ist ",
      { pii: "1234567890" },
      " und meine IBAN ist ",
      { pii: "AT611904300234573201" },
      ".",
    ],
    outputParts: [
      "Meine ",
      { tag: "NATIONAL_ID" },
      " und meine ",
      { tag: "IBAN" },
      ".",
    ],
  },
};

/* ISO alpha-2 → our country code mapping for geolocation results */
const ISO_TO_CODE: Record<string, string> = {
  NL: "NL", DE: "DE", FR: "FR", BE: "BE", ES: "ES", IT: "IT",
  SE: "SE", GB: "UK", PL: "PL", AT: "AT",
};

const DEFAULT_COUNTRY = "NL";

function useDetectedCountry(): string {
  const [country, setCountry] = useState(DEFAULT_COUNTRY);

  useEffect(() => {
    fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) })
      .then((r) => r.json())
      .then((data) => {
        const code = ISO_TO_CODE[data?.country_code];
        if (code && code in EXAMPLES) setCountry(code);
      })
      .catch(() => {});
  }, []);

  return country;
}

/* ------------------------------------------------------------------ */
/*  Shared rendering helpers                                           */
/* ------------------------------------------------------------------ */

function TextLine({ parts }: { parts: (string | { pii: string })[] }) {
  return (
    <span className="text-slate-400 pl-8">
      &quot;
      {parts.map((p, i) =>
        typeof p === "string" ? (
          <span key={i}>{p}</span>
        ) : (
          <span key={i} className="text-pii">{p.pii}</span>
        )
      )}
      &quot;,
    </span>
  );
}

function OutputLine({ parts, comment }: { parts: (string | { tag: string })[]; comment: string }) {
  return (
    <div className="flex gap-6 mt-8 pt-8 border-t border-white/5">
      <span className="text-white/20 select-none w-4">{comment}</span>
      <span className="text-slate-300 font-medium">
        <span className="text-secondary mr-2">&#x2713;</span> Output:{" "}
        {parts.map((p, i) =>
          typeof p === "string" ? (
            <span key={i}>{p}</span>
          ) : (
            <span
              key={i}
              className="text-secondary bg-secondary/10 px-2 py-0.5 rounded border border-secondary/20"
            >
              [{p.tag}]
            </span>
          )
        )}
      </span>
    </div>
  );
}

function CodeHeader({ filename, runtime }: { filename: string; runtime: string }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/5">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-amber-500" />
        <div className="w-3 h-3 rounded-full bg-secondary" />
        <span className="text-xs text-slate-400 ml-4 font-mono font-bold tracking-tight">
          {filename}
        </span>
      </div>
      <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest font-bold">
        {runtime}
      </div>
    </div>
  );
}

function Line({ n, children }: { n: number; children?: React.ReactNode }) {
  return (
    <div className="flex gap-6">
      <span className="text-white/20 select-none w-4">{n}</span>
      {children ?? <span />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Python code block                                                  */
/* ------------------------------------------------------------------ */

function PythonCode({ ex }: { ex: CountryExample }) {
  return (
    <>
      <CodeHeader filename={`examples/redact_${ex.code.toLowerCase()}.py`} runtime="Python 3.10+" />
      <div className="p-10 font-mono text-base leading-relaxed overflow-x-auto">
        <Line n={1}>
          <span>
            <span className="text-secondary font-bold">from</span>{" "}
            <span className="text-white">euRedact</span>{" "}
            <span className="text-secondary font-bold">import</span>{" "}
            <span className="text-white">redact</span>
          </span>
        </Line>
        <Line n={2} />
        <Line n={3}>
          <span className="text-white">
            result = <span className="text-secondary font-bold">redact</span>(
          </span>
        </Line>
        <Line n={4}>
          <TextLine parts={ex.textParts} />
        </Line>
        <Line n={5}>
          <span className="text-white pl-8">
            countries=[<span className="text-secondary">&quot;{ex.code}&quot;</span>]
          </span>
        </Line>
        <Line n={6}>
          <span className="text-white">)</span>
        </Line>
        <Line n={7}>
          <span>
            <span className="text-secondary font-bold">print</span>
            <span className="text-white">(result.redacted_text)</span>
          </span>
        </Line>
        <OutputLine parts={ex.outputParts} comment="#" />
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Node.js code block                                                 */
/* ------------------------------------------------------------------ */

function NodeCode({ ex }: { ex: CountryExample }) {
  return (
    <>
      <CodeHeader filename={`examples/redact_${ex.code.toLowerCase()}.ts`} runtime="Node.js 16+" />
      <div className="p-10 font-mono text-base leading-relaxed overflow-x-auto">
        <Line n={1}>
          <span>
            <span className="text-secondary font-bold">import</span>{" "}
            <span className="text-white">{"{ redact }"}</span>{" "}
            <span className="text-secondary font-bold">from</span>{" "}
            <span className="text-secondary">&quot;euredact&quot;</span>
          </span>
        </Line>
        <Line n={2} />
        <Line n={3}>
          <span>
            <span className="text-secondary font-bold">const</span>{" "}
            <span className="text-white">result</span>{" "}
            <span className="text-white">=</span>{" "}
            <span className="text-secondary font-bold">redact</span>
            <span className="text-white">(</span>
          </span>
        </Line>
        <Line n={4}>
          <TextLine parts={ex.textParts} />
        </Line>
        <Line n={5}>
          <span className="text-white pl-8">
            {"{ "}countries: [<span className="text-secondary">&quot;{ex.code}&quot;</span>]{" }"}
          </span>
        </Line>
        <Line n={6}>
          <span className="text-white">)</span>
        </Line>
        <Line n={7}>
          <span>
            <span className="text-white">console.</span>
            <span className="text-secondary font-bold">log</span>
            <span className="text-white">(result.redactedText)</span>
          </span>
        </Line>
        <OutputLine parts={ex.outputParts} comment="//" />
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export function HeroCodeBlock() {
  const [lang, setLang] = useState<Lang>("python");
  const detectedCountry = useDetectedCountry();
  const ex = EXAMPLES[detectedCountry] ?? EXAMPLES[DEFAULT_COUNTRY];

  return (
    <>
      {/* Code block */}
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute inset-0 bg-secondary/20 blur-[120px] rounded-full scale-75 -z-10" />

        {/* Language tabs */}
        <div className="flex gap-1 mb-3 justify-center">
          <button
            onClick={() => setLang("python")}
            className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200 ${
              lang === "python"
                ? "bg-secondary text-primary"
                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            Python
          </button>
          <button
            onClick={() => setLang("node")}
            className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-200 ${
              lang === "node"
                ? "bg-secondary text-primary"
                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            Node.js
          </button>
        </div>

        <div className="bg-black/80 rounded-2xl overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)] text-left border border-white/10">
          {lang === "python" ? <PythonCode ex={ex} /> : <NodeCode ex={ex} />}
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-24">
        <a
          href="/demo"
          className="group flex items-center gap-3 bg-secondary hover:bg-emerald-400 text-primary px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 hover:-translate-y-0.5 electric-glow"
        >
          <span className="material-symbols-outlined text-lg">play_circle</span>
          Try Live Demo
          <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">arrow_forward</span>
        </a>
        <button className="group flex items-center gap-4 bg-slate-950 text-secondary border-2 border-secondary/50 px-8 py-4 rounded-xl font-mono text-sm hover:border-secondary transition-all hover:scale-105 electric-glow">
          <span>{lang === "python" ? "pip install euredact" : "npm install euredact"}</span>
          <span className="material-symbols-outlined text-sm opacity-50 group-hover:opacity-100">
            content_copy
          </span>
        </button>
        <a
          href="/docs"
          className="flex items-center gap-2 text-white font-bold hover:gap-4 transition-all tracking-tight underline decoration-secondary decoration-4 underline-offset-8 uppercase text-sm"
        >
          View Documentation{" "}
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </a>
      </div>
    </>
  );
}
