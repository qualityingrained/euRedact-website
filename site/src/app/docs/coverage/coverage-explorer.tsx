"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import {
  AMBIGUITY_RULES,
  LAYER_MEANING,
  TIER_MEANING,
  TYPES,
  type Layer,
  type PiiType,
  type Tier,
} from "./types";

const LAYERS: Layer[] = ["Rules only", "Rules led", "AI led", "AI only"];
const TIERS: Tier[] = ["Critical", "High", "Medium", "Low"];

/* Colour carries the same meaning it does elsewhere on the site: teal for what
   the local engine settles deterministically, mustard for what needs the model.
   The gradient between them is the whole point of the page. */
function layerStyle(layer: Layer): string {
  switch (layer) {
    case "Rules only":
      return "bg-secondary/15 text-secondary border-secondary/30";
    case "Rules led":
      return "bg-secondary/10 text-secondary/90 border-secondary/20";
    case "AI led":
      return "bg-pii-highlight/10 text-pii-highlight/90 border-pii-highlight/20";
    case "AI only":
      return "bg-pii-highlight/15 text-pii-highlight border-pii-highlight/30";
  }
}

function tierStyle(tier: Tier): string {
  switch (tier) {
    case "Critical":
      return "bg-pii-danger/15 text-pii-danger border-pii-danger/30";
    case "High":
      return "bg-pii-danger/10 text-pii-danger/80 border-pii-danger/20";
    case "Medium":
      return "bg-white/5 text-on-surface-variant border-white/10";
    case "Low":
      return "bg-white/[0.03] text-on-surface-variant/70 border-white/5";
  }
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition-all ${
        active
          ? "border-secondary bg-secondary/15 text-secondary"
          : "border-outline-variant text-on-surface-variant hover:text-white hover:border-white/30"
      }`}
    >
      {children}
    </button>
  );
}

/** Renders a description, styling any BARE_TYPE_NAME it contains as code. */
function WithTypeRefs({ text }: { text: string }) {
  const parts = text.split(/\b([A-Z][A-Z0-9_]{3,})\b/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-mono text-[0.92em] text-on-surface">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

function TypeCard({ type }: { type: PiiType }) {
  return (
    <div
      id={type.name}
      className={`scroll-mt-28 rounded-2xl border p-7 ${
        type.article9
          ? "border-pii-danger/40 bg-pii-danger/[0.04]"
          : "border-outline-variant bg-surface"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2.5 mb-4">
        <h3 className="font-mono text-base font-black text-on-surface">
          {type.name}
        </h3>
        <span
          className={`rounded-md border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${tierStyle(type.tier)}`}
        >
          {type.tier}
        </span>
        <span
          className={`rounded-md border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${layerStyle(type.layer)}`}
        >
          {type.layer}
        </span>
        {type.checksum && (
          <span className="rounded-md border border-secondary/25 bg-secondary/10 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-secondary">
            Checksum
          </span>
        )}
        {type.article9 && (
          <span className="rounded-md border border-pii-danger/40 bg-pii-danger/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-pii-danger">
            Article 9
          </span>
        )}
        {type.scope && (
          <span className="text-[11px] text-on-surface-variant">
            {type.scope}
          </span>
        )}
      </div>

      <p className="text-sm leading-relaxed text-on-surface-variant">
        <WithTypeRefs text={type.covers} />
      </p>

      {type.notCovered && (
        <p className="mt-4 text-sm leading-relaxed text-on-surface-variant">
          <span className="font-black text-on-surface">Does not cover: </span>
          <WithTypeRefs text={type.notCovered} />
        </p>
      )}

      {type.note && (
        <p className="mt-4 border-l-2 border-outline-variant pl-4 text-sm leading-relaxed text-on-surface-variant">
          <WithTypeRefs text={type.note} />
        </p>
      )}
    </div>
  );
}

export function CoverageExplorer() {
  const [layer, setLayer] = useState<Layer | null>(null);
  const [tier, setTier] = useState<Tier | null>(null);

  /*
    Which cut of the catalogue people actually want. This page is one pageview
    however long it is used, so filtering is invisible to pageview metrics —
    and the answer changes what belongs above the fold: a reader filtering to
    "AI only" is asking what is not shipped yet, which is a different visit from
    one filtering to "Critical".

    The payload is a value from the closed Layer/Tier unions rendered on this
    page, never anything the visitor supplied. Clearing a filter is not
    recorded; only choosing one.
  */
  const chooseLayer = (value: Layer) => {
    const next = layer === value ? null : value;
    setLayer(next);
    if (next) trackEvent("coverage-filtered", { layer: next });
  };

  const chooseTier = (value: Tier) => {
    const next = tier === value ? null : value;
    setTier(next);
    if (next) trackEvent("coverage-filtered", { tier: next });
  };

  const shown = TYPES.filter(
    (t) => (!layer || t.layer === layer) && (!tier || t.tier === tier),
  );

  // Group headings only make sense on the unfiltered reference; when a filter
  // is on, the list is short and the headings become noise.
  const grouped = shown.reduce<Record<string, PiiType[]>>((acc, t) => {
    (acc[t.group] ??= []).push(t);
    return acc;
  }, {});

  return (
    <>
      {/* ── Legends ── */}
      <section className="bg-surface py-16 px-6 md:px-8">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-black text-2xl text-on-surface mb-2 tracking-tight">
                Detection responsibility
              </h2>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                Which layer carries the work. This is the line between what is
                settled deterministically on your own machine and what needs a
                model to read the sentence around it.
              </p>
              <dl className="space-y-3">
                {LAYERS.map((l) => (
                  <div
                    key={l}
                    className="rounded-xl border border-outline-variant bg-primary p-4"
                  >
                    <dt
                      className={`mb-1.5 inline-block rounded-md border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${layerStyle(l)}`}
                    >
                      {l}
                    </dt>
                    <dd className="text-sm leading-relaxed text-on-surface-variant">
                      {LAYER_MEANING[l]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h2 className="font-black text-2xl text-on-surface mb-2 tracking-tight">
                Sensitivity tier
              </h2>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                Independent of who detects a type, each one carries a tier that
                drives default redaction policy.
              </p>
              <dl className="space-y-3">
                {TIERS.map((t) => (
                  <div
                    key={t}
                    className="rounded-xl border border-outline-variant bg-primary p-4"
                  >
                    <dt
                      className={`mb-1.5 inline-block rounded-md border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${tierStyle(t)}`}
                    >
                      {t}
                    </dt>
                    <dd className="text-sm leading-relaxed text-on-surface-variant">
                      {TIER_MEANING[t]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ── Coverage table ── */}
      <section id="coverage" className="bg-primary/40 py-16 px-6 md:px-8 scroll-mt-24">
        <div className="mx-auto max-w-[1180px]">
          <h2 className="font-black text-3xl text-on-surface mb-2 tracking-tight">
            Coverage at a glance
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-8 max-w-3xl">
            All {TYPES.length} types. Filter by layer to see where determinism
            ends and inference begins, or by tier to see what your redaction
            policy has to cover.
          </p>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mr-1">
              Layer
            </span>
            {LAYERS.map((l) => (
              <Chip key={l} active={layer === l} onClick={() => chooseLayer(l)}>
                {l}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mr-1">
              Tier
            </span>
            {TIERS.map((t) => (
              <Chip key={t} active={tier === t} onClick={() => chooseTier(t)}>
                {t}
              </Chip>
            ))}
            {(layer || tier) && (
              <button
                type="button"
                onClick={() => {
                  setLayer(null);
                  setTier(null);
                }}
                className="ml-2 text-xs font-bold text-secondary hover:underline"
              >
                Clear
              </button>
            )}
          </div>

          <p className="text-on-surface-variant text-sm mb-4" aria-live="polite">
            Showing {shown.length} of {TYPES.length} types.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-outline-variant bg-surface">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-outline-variant bg-primary">
                  <th className="text-left text-xs font-black uppercase tracking-wider text-on-surface-variant px-5 py-3.5">
                    Type
                  </th>
                  <th className="text-left text-xs font-black uppercase tracking-wider text-on-surface-variant px-5 py-3.5">
                    Tier
                  </th>
                  <th className="text-left text-xs font-black uppercase tracking-wider text-on-surface-variant px-5 py-3.5">
                    Layer
                  </th>
                  <th className="text-center text-xs font-black uppercase tracking-wider text-on-surface-variant px-5 py-3.5">
                    Country-specific
                  </th>
                  <th className="text-center text-xs font-black uppercase tracking-wider text-on-surface-variant px-5 py-3.5">
                    Checksum
                  </th>
                </tr>
              </thead>
              <tbody>
                {shown.map((t) => (
                  <tr
                    key={t.name}
                    className="border-b border-outline-variant last:border-0 hover:bg-primary/50 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <a
                        href={`#${t.name}`}
                        className="font-mono text-sm font-bold text-on-surface hover:text-secondary transition-colors"
                      >
                        {t.name}
                      </a>
                      {t.article9 && (
                        <span className="ml-2 text-[10px] font-black uppercase tracking-wider text-pii-danger">
                          Art. 9
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-md border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${tierStyle(t.tier)}`}
                      >
                        {t.tier}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`rounded-md border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${layerStyle(t.layer)}`}
                      >
                        {t.layer}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-center text-on-surface-variant">
                      {t.countrySpecific ? "Yes" : "—"}
                    </td>
                    <td className="px-5 py-3 text-center text-on-surface-variant">
                      {t.checksum ? "Yes" : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {shown.length === 0 && (
            <p className="text-on-surface-variant text-sm mt-6">
              No type carries that combination.
            </p>
          )}
        </div>
      </section>

      {/* ── Type reference ── */}
      <section className="bg-surface py-16 px-6 md:px-8">
        <div className="mx-auto max-w-[1180px]">
          <h2 className="font-black text-3xl text-on-surface mb-2 tracking-tight">
            Type reference
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-10 max-w-3xl">
            What each type covers, and — where it matters more — what it
            deliberately does not. Most integration confusion is about the
            boundary between two adjacent types rather than about either type on
            its own. The filter above applies here too.
          </p>

          <div className="space-y-12">
            {Object.entries(grouped).map(([group, types]) => (
              <div key={group}>
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-5 pb-3 border-b border-outline-variant">
                  {group}
                </h3>
                <div className="grid gap-5 lg:grid-cols-2">
                  {types.map((t) => (
                    <TypeCard key={t.name} type={t} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ambiguity rules ── */}
      <section className="bg-primary/40 py-16 px-6 md:px-8">
        <div className="mx-auto max-w-[1180px]">
          <h2 className="font-black text-3xl text-on-surface mb-2 tracking-tight">
            How ambiguity is resolved
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-8 max-w-3xl">
            Applied consistently across every type. These answer most &ldquo;why
            was this redacted&rdquo; and &ldquo;why wasn&rsquo;t this
            redacted&rdquo; questions.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AMBIGUITY_RULES.map((rule) => (
              <div
                key={rule.title}
                className="rounded-xl border border-outline-variant bg-surface p-5"
              >
                <div className="font-black text-sm text-on-surface mb-2">
                  {rule.title}
                </div>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  <WithTypeRefs text={rule.body} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
