"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { redact, type Detection } from "euredact";
import { SUPPORTED_COUNTRIES } from "./europe-map";
import { trackEvent } from "@/lib/analytics";

/*
  Homepage playground. Runs the real `euredact` package in the browser, the same
  way /demo does, rather than a hand-written regex mock.

  That choice is what keeps the section honest: the tokens it prints are
  whatever the installed engine emits, so it says [BANK_ACCOUNT] because the
  engine does, and it can never invent a NAME detection — NAME is a cloud-tier
  type the rules engine never produces.

  Only the JavaScript package can run in a browser, so this shows ONE live
  output with a Python/Node toggle over the *code*. Rendering a separate "Python"
  pane would be theatre, and claiming the two runtimes return identical bytes is
  wrong on non-ASCII text: JavaScript's \b and \w are ASCII-only, so the Node
  package misses email addresses and social handles with accented local parts.
*/

type Sample = { country: string; text: string };

const SAMPLES: Sample[] = [
  {
    country: "NL",
    text: "Betaling aan Jan de Vries, BSN 111222333, vanaf IBAN NL91ABNA0417164300.",
  },
  {
    country: "FR",
    text: "Virement vers IBAN FR7630006000011234567890189, contact marie@example.fr",
  },
  {
    country: "DE",
    text: "Rechnung an Klaus Berger, USt-IdNr. DE811907980, IBAN DE89370400440532013000.",
  },
  {
    country: "ES",
    text: "Transferencia, IBAN ES9121000418450200051332, clave sk-ant-9f2Ka83LmQ0ZxRt7.",
  },
];

type Segment = { text: string; token: boolean };

/** Split the input into plain runs and redaction tokens, in document order. */
function buildSegments(text: string, detections: Detection[]): Segment[] {
  const ordered = [...detections].sort((a, b) => a.start - b.start);
  const out: Segment[] = [];
  let cursor = 0;
  for (const d of ordered) {
    if (d.start > cursor) {
      out.push({ text: text.slice(cursor, d.start), token: false });
    }
    out.push({ text: `[${d.entityType}]`, token: true });
    cursor = d.end;
  }
  if (cursor < text.length) {
    out.push({ text: text.slice(cursor), token: false });
  }
  return out;
}

const TYPING_MS = 22;
const PAUSE_BEFORE_RUN = 520;
const PAUSE_AFTER_RUN = 3600;

export function Playground() {
  const [sampleIndex, setSampleIndex] = useState(0);
  const [input, setInput] = useState("");
  const [lang, setLang] = useState<"python" | "node">("python");
  const [detections, setDetections] = useState<Detection[] | null>(null);
  const [auto, setAuto] = useState(true);
  const [pressed, setPressed] = useState(false);
  /* null = scan every ruleset. Set to a code, the engine only loads that
     country, which is the configuration the published figures assume. */
  const [country, setCountry] = useState<string | null>(null);

  /* Timers are collected so a user taking over cancels every pending step —
     otherwise a queued keystroke overwrites what they just typed. */
  const textarea = useRef<HTMLTextAreaElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const later = (ms: number, fn: () => void) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const sample = SAMPLES[sampleIndex];
  const activeCountry = auto ? sample.country : country;

  /*
    The scripted samples are each written for one country, so they run with that
    country set — the accurate configuration, and the one the published figures
    assume. Text the visitor types could be from anywhere, so it runs across all
    31 rulesets instead. Pinning their input to whichever sample happened to be
    on screen scored Belgian text against Dutch rules.
  */
  const run = useCallback((text: string, country: string | null) => {
    if (!text.trim()) {
      setDetections([]);
      return;
    }
    const result = country
      ? redact(text, { countries: [country] })
      : redact(text);
    setDetections(result.detections as unknown as Detection[]);
  }, []);

  /* Flash the button so a simulated press is visible as a press, and swap the
     runtime on every run — the point of the section is that both SDKs make the
     same call, which only lands if the reader sees both. One path for the
     scripted press and a real click, so they cannot drift apart. */
  const flashAndRun = useCallback(
    (text: string, country: string | null) => {
      setPressed(true);
      later(180, () => {
        setPressed(false);
        run(text, country);
        setLang((l) => (l === "python" ? "node" : "python"));
      });
    },
    [run]
  );

  /*
    Fires once per page load, the first time the visitor takes the playground
    off its scripted demo — typing, focusing, picking a country or a sample.

    Deliberately not tied to a redaction: the auto demo redacts on a loop, so a
    per-run event would count the animation rather than a person. Taking over is
    the only interaction here that a bounce-rate figure cannot see, since the
    whole session is one pageview however long someone plays with it.

    No payload. The visitor's text never leaves the browser, and the count of
    what was detected in it is still a fact about their text.
  */
  const engaged = useRef(false);
  const takeOver = useCallback(() => {
    if (!engaged.current) {
      engaged.current = true;
      trackEvent("playground-engaged");
    }
    setAuto((wasAuto) => {
      if (wasAuto) clearTimers();
      return false;
    });
  }, []);

  /* Auto demo: type the sample out, run it, pause, move to the next one. */
  useEffect(() => {
    if (!auto) return;
    clearTimers();

    const { text, country } = SAMPLES[sampleIndex];
    let typed = 0;
    const type = () => {
      typed += 1;
      setInput(text.slice(0, typed));
      if (typed < text.length) {
        later(TYPING_MS, type);
      } else {
        later(PAUSE_BEFORE_RUN, () => {
          flashAndRun(text, country);
          later(PAUSE_AFTER_RUN, () =>
            setSampleIndex((i) => (i + 1) % SAMPLES.length)
          );
        });
      }
    };
    /* Cleared on a timer rather than in the effect body: a synchronous setState
       here triggers a cascading render on every sample change. */
    later(120, () => {
      setInput("");
      setDetections(null);
    });
    later(360, type);
    return clearTimers;
  }, [auto, sampleIndex, flashAndRun]);

  /* Grow to fit the content instead of scrolling inside two rows, capped so a
     pasted document cannot push the rest of the page off screen. */
  useEffect(() => {
    const el = textarea.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 320)}px`;
  }, [input]);

  useEffect(() => clearTimers, []);

  const segments =
    detections === null ? null : buildSegments(input, detections);

  const installLine =
    lang === "python"
      ? "import euredact"
      : 'import { redact } from "euredact";';

  return (
    <div className="mt-14 rounded-2xl border border-outline-variant bg-surface overflow-hidden shadow-2xl">
      {/* ── what this is ──
          Stated up front rather than left to be inferred: the cloud tier is
          announced all over this page, so a live demo could easily be taken for
          it. This runs the open-source rules engine in the browser and nothing
          else. */}
      <div className="px-6 py-3 border-b border-outline-variant bg-code flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="inline-flex items-center gap-1.5 bg-brand text-white font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded">
          {/* Inline size, not a text-* class: globals.css pins
              .material-symbols-outlined to 24px and wins the cascade, so the
              utility is silently ignored. */}
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "14px" }}
          >
            lock
          </span>
          Rules engine only
        </span>
        <span className="text-[12.5px] text-on-surface-variant">
          Runs entirely in this browser tab — no cloud tier, no network call, no
          text leaves your device. Names and addresses are{" "}
          <span className="text-on-surface">not</span> detected here: those need
          the cloud tier, which has not launched.
        </span>
      </div>

      {/* ── input ── */}
      <div className="p-6 border-b border-outline-variant grid md:grid-cols-[1fr_auto] gap-5 items-end">
        <div>
          <div className="text-xs font-black uppercase tracking-[0.12em] text-on-surface-variant mb-2.5">
            <span className="text-secondary mr-2">/</span>Input —{" "}
            <span className="text-secondary">
              {auto ? "auto demo running · type to take over" : "your text"}
            </span>
          </div>
          <textarea
            value={input}
            onChange={(e) => {
              takeOver();
              setInput(e.target.value);
              setDetections(null);
            }}
            onFocus={takeOver}
            spellCheck={false}
            ref={textarea}
            rows={2}
            aria-label="Text to redact"
            className="w-full resize-none overflow-y-auto bg-code border border-outline-variant rounded-xl text-on-surface font-mono text-[13.5px] leading-relaxed p-3.5 outline-none focus:border-secondary"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="sr-only" htmlFor="playground-country">
            Country ruleset
          </label>
          <select
            id="playground-country"
            value={activeCountry ?? ""}
            onChange={(e) => {
              takeOver();
              setCountry(e.target.value || null);
              setDetections(null);
            }}
            className="bg-code border border-outline-variant rounded-xl text-on-surface font-mono text-[12.5px] px-3 py-2.5 outline-none focus:border-secondary cursor-pointer"
          >
            <option value="">All countries</option>
            {SUPPORTED_COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} · {c.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              takeOver();
              /* `country`, not activeCountry: takeOver() only flips the auto
                 flag on the next render, so activeCountry would still hold the
                 sample's country on the first manual run. */
              flashAndRun(input, country);
            }}
            className={`text-white font-bold text-sm px-5 py-3 rounded-xl cursor-pointer whitespace-nowrap transition-all duration-150 motion-safe:will-change-transform ${
              pressed
                ? "bg-brand-hover ring-4 ring-secondary/30 motion-safe:scale-95"
                : "bg-brand hover:bg-brand-hover"
            }`}
          >
            Run redact()
          </button>
          <button
            onClick={() => {
              takeOver();
              setInput(SAMPLES[0].text);
              setCountry(SAMPLES[0].country);
              setDetections(null);
            }}
            className="text-secondary font-medium text-[13px] px-5 py-2.5 border border-outline-variant rounded-xl cursor-pointer hover:border-secondary transition-colors whitespace-nowrap"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Why the selector is worth touching, in the terms the footnote uses. */}
      <div className="px-6 pb-5 -mt-1 text-[12.5px] text-on-surface-variant">
        {activeCountry ? (
          <>
            Declared{" "}
            <span className="text-on-surface font-medium">
              {SUPPORTED_COUNTRIES.find((c) => c.code === activeCountry)?.name ??
                activeCountry}
            </span>
            . Every country&rsquo;s patterns still run — since 0.3.2 the setting
            decides how a match is labelled, never whether it is found — and
            anything attributed elsewhere comes back flagged out of scope.
          </>
        ) : (
          <>
            No country declared. The engine runs every pattern either way and
            infers the country from the text, which costs about half a point of
            recall against declaring one —{" "}
            <a
              href="#accuracy-note"
              className="text-secondary hover:text-secondary-hover underline decoration-secondary/40 underline-offset-4"
            >
              see the measurement note
            </a>
            .
          </>
        )}
      </div>

      {/* ── detections ── */}
      <div className="px-6 py-5 border-b border-outline-variant flex flex-wrap items-center gap-4">
        <div className="text-xs font-black uppercase tracking-[0.12em] text-on-surface-variant">
          <span className="text-secondary mr-2">/</span>Detected
        </div>
        <div className="flex flex-wrap gap-2 flex-1 min-h-[30px] items-center">
          {detections === null && (
            <span className="text-[13px] text-on-surface-variant">
              Awaiting run…
            </span>
          )}
          {detections?.length === 0 && (
            <span className="text-[13px] text-on-surface-variant">
              No structured PII in this text.
            </span>
          )}
          {detections?.map((d, i) => (
            <span
              key={`${d.start}-${i}`}
              className="bg-pii-danger text-white text-[12.5px] font-black tracking-[0.06em] px-2.5 py-1 rounded"
            >
              {d.entityType}
            </span>
          ))}
        </div>
        <div className="text-[11.5px] text-on-surface-variant flex items-center gap-2 whitespace-nowrap">
          <span className="w-3 h-3 rounded-sm bg-pii-danger inline-block" />
          Detected PII — auto-redacted
        </div>
      </div>

      {/* ── code + live output ── */}
      <div>
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-outline-variant">
          <div className="flex rounded-lg overflow-hidden border border-outline-variant">
            {(["python", "node"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3.5 py-1.5 text-[13px] font-bold cursor-pointer transition-colors ${
                  lang === l
                    ? "bg-brand text-white"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {l === "python" ? "Python" : "Node.js"}
              </button>
            ))}
          </div>
          <code className="font-mono text-[11.5px] text-on-surface-variant">
            euredact · {lang === "python" ? "PyPI" : "npm"}
          </code>
          <span className="ml-auto font-mono text-[11.5px] font-medium text-secondary">
            {detections === null
              ? "ready"
              : `${detections.length} span${detections.length === 1 ? "" : "s"} redacted`}
          </span>
        </div>

        <div className="bg-code p-6 font-mono text-[13px] leading-relaxed overflow-x-auto">
          <div className="text-on-surface-variant">
            {lang === "python" ? "#" : "//"} Local, deterministic — no network
            calls
          </div>
          <div className="text-on-surface">{installLine}</div>
          <div>&nbsp;</div>
          <div className="text-on-surface">
            {lang === "python"
              ? activeCountry
                ? `result = euredact.redact(text, countries=["${activeCountry}"])`
                : "result = euredact.redact(text)"
              : activeCountry
                ? `const result = redact(text, { countries: ["${activeCountry}"] });`
                : "const result = redact(text);"}
          </div>
          <div className="text-on-surface">
            {lang === "python"
              ? "print(result.redacted_text)"
              : "console.log(result.redactedText);"}
          </div>
          <div className="text-on-surface-variant mt-2.5">
            {lang === "python" ? "#" : "//"} stdout →
          </div>
          {/* Plain inline flow, not flex: flex makes every segment its own box,
              which swallows the newlines inside plain-text runs and knocks the
              lines after a token out of alignment. */}
          <div className="mt-1 whitespace-pre-wrap break-words">
            {segments === null ? (
              <span className="text-on-surface-variant">awaiting run …</span>
            ) : (
              segments.map((s, i) =>
                s.token ? (
                  <span
                    key={i}
                    className="bg-brand text-white text-[12px] px-2 rounded mx-0.5 inline-block align-baseline"
                  >
                    {s.text}
                  </span>
                ) : (
                  <span key={i} className="text-on-surface">
                    {s.text}
                  </span>
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
