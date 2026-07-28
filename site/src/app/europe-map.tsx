"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

/* Self-hosted copy of world-atlas@2 countries-50m.json (ISC). Served from our
   own origin rather than a CDN so that rendering the map sends no visitor data
   to a third party. See SELF-HOSTED-ASSETS.md. */
const GEO_URL = "/countries-50m.json";

/*
  Cloud-tier coverage is derived from the languages the model handles — de, en,
  fr, nl — checked against each country's administrative languages, meaning the
  ones government and business documents are actually written in. Minority
  co-official languages (Romansh in Switzerland) are out of scope by that
  definition; Irish, Luxembourgish and Maltese are not, which is why those
  countries read as partial.

  The cloud tier has not launched. Every cloud state below is a statement about
  planned coverage, and the legend and tooltips label it as such.
*/
type Cloud = { tier: "full" | "partial"; missing?: string };

type Country = { code: string; name: string; cloud?: Cloud };

/* world-atlas uses numeric ISO 3166-1 codes as the `id` field. */
const SUPPORTED: Record<string, Country> = {
  "040": { code: "AT", name: "Austria", cloud: { tier: "full" } },
  "056": { code: "BE", name: "Belgium", cloud: { tier: "full" } },
  "100": { code: "BG", name: "Bulgaria" },
  "191": { code: "HR", name: "Croatia" },
  "196": { code: "CY", name: "Cyprus" },
  "203": { code: "CZ", name: "Czechia" },
  "208": { code: "DK", name: "Denmark" },
  "233": { code: "EE", name: "Estonia" },
  "246": { code: "FI", name: "Finland" },
  "250": { code: "FR", name: "France", cloud: { tier: "full" } },
  "276": { code: "DE", name: "Germany", cloud: { tier: "full" } },
  "300": { code: "EL", name: "Greece" },
  "348": { code: "HU", name: "Hungary" },
  "352": { code: "IS", name: "Iceland" },
  "372": {
    code: "IE",
    name: "Ireland",
    cloud: { tier: "partial", missing: "Irish" },
  },
  "380": { code: "IT", name: "Italy" },
  "428": { code: "LV", name: "Latvia" },
  "440": { code: "LT", name: "Lithuania" },
  "442": {
    code: "LU",
    name: "Luxembourg",
    cloud: { tier: "partial", missing: "Luxembourgish" },
  },
  "470": {
    code: "MT",
    name: "Malta",
    cloud: { tier: "partial", missing: "Maltese" },
  },
  "528": { code: "NL", name: "Netherlands", cloud: { tier: "full" } },
  "578": { code: "NO", name: "Norway" },
  "616": { code: "PL", name: "Poland" },
  "620": { code: "PT", name: "Portugal" },
  "642": { code: "RO", name: "Romania" },
  "703": { code: "SK", name: "Slovakia" },
  "705": { code: "SI", name: "Slovenia" },
  "724": { code: "ES", name: "Spain" },
  "752": { code: "SE", name: "Sweden" },
  "756": {
    code: "CH",
    name: "Switzerland",
    cloud: { tier: "partial", missing: "Italian" },
  },
  "826": { code: "UK", name: "United Kingdom", cloud: { tier: "full" } },
};

/* One hue, three steps: brighter teal means deeper coverage. On a dark ground
   the ramp runs the other way round from a light one — rules-only sits dimmest,
   cloud with every administrative language lands on the brand accent. */
const RULES = "#2F6B78";
const CLOUD_PARTIAL = "#5C97A3";
const CLOUD_FULL = "#8FB4BC";
const UNSUPPORTED = "#0B2229";
const BORDER = "#061F25";

/* Counted from the data rather than written by hand: the previous legend read
   "31 Supported Countries" while the map painted 32. */
const countries = Object.values(SUPPORTED);

/* The same list the map paints, for anything that needs to offer a choice of
   country. Exported from here so there is one place naming the countries, and
   the claim test that pins this file to availableCountries() covers it too. */
export const SUPPORTED_COUNTRIES: { code: string; name: string }[] = countries
  .map(({ code, name }) => ({ code, name }))
  .sort((a, b) => a.name.localeCompare(b.name));
const COUNTS = {
  rules: countries.length,
  full: countries.filter((c) => c.cloud?.tier === "full").length,
  partial: countries.filter((c) => c.cloud?.tier === "partial").length,
  /* Legend rows must be mutually exclusive, or the counts appear to sum to
     more than the countries on the map. */
  get rulesOnly() {
    return this.rules - this.full - this.partial;
  },
};

function fillFor(country: Country | undefined) {
  if (!country) return UNSUPPORTED;
  if (country.cloud?.tier === "full") return CLOUD_FULL;
  if (country.cloud?.tier === "partial") return CLOUD_PARTIAL;
  return RULES;
}

function LegendHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="col-span-3 text-[10px] font-black uppercase tracking-[0.25em] text-on-surface-variant first:mt-0 mt-4">
      {children}
    </div>
  );
}

function LegendRow({
  fill,
  count,
  muted,
  children,
}: {
  fill: string;
  count?: number;
  muted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <span
        className="w-4 h-4 rounded shrink-0"
        style={{ backgroundColor: fill }}
        aria-hidden="true"
      />
      <span
        className={`text-sm font-bold ${muted ? "text-on-surface-variant" : "text-on-surface"}`}
      >
        {children}
      </span>
      <span className="text-sm font-black tabular-nums text-on-surface text-right">
        {count ?? ""}
      </span>
    </>
  );
}

export function EuropeMap() {
  const [tooltip, setTooltip] = useState<
    (Country & { x: number; y: number }) | null
  >(null);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Wide viewports put the legend beside the map; below it once there is
          no longer room for both. */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-12">
        <div className="flex-1 min-w-0">
          <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [-10, -52, 0],
          scale: 1000,
        }}
        width={800}
        height={600}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup center={[10, 52]} zoom={1} minZoom={1} maxZoom={1}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const match = SUPPORTED[geo.id];
                const fill = fillFor(match);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={(e) => {
                      if (match) {
                        setTooltip({ ...match, x: e.clientX, y: e.clientY });
                      }
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    style={{
                      default: {
                        fill,
                        stroke: BORDER,
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: match ? fill : "#14424C",
                        opacity: match ? 0.8 : 1,
                        stroke: BORDER,
                        strokeWidth: 0.5,
                        outline: "none",
                        cursor: match ? "pointer" : "default",
                      },
                      pressed: { fill, outline: "none" },
                    }}
                  />
                );
              })
            }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </div>

        {/* Legend. Grouped by availability so "coming soon" is said once rather
            than repeated per row, and ordered along the colour ramp: dimmest
            (least coverage) at the top. */}
        <div className="shrink-0 mx-auto lg:mx-0 w-fit text-left">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-2.5">
            <LegendHeading>Available now</LegendHeading>
            <LegendRow fill={RULES} count={COUNTS.rulesOnly}>
              Rules engine only
            </LegendRow>

            <LegendHeading>Cloud tier — coming soon</LegendHeading>
            <LegendRow fill={CLOUD_PARTIAL} count={COUNTS.partial}>
              Some administrative languages
            </LegendRow>
            <LegendRow fill={CLOUD_FULL} count={COUNTS.full}>
              All administrative languages
            </LegendRow>

            <LegendHeading>Outside coverage</LegendHeading>
            <LegendRow fill={UNSUPPORTED} muted>
              Not yet supported
            </LegendRow>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none bg-code border border-secondary/40 text-white text-sm font-bold px-4 py-3 rounded-xl shadow-xl max-w-xs"
          style={{ left: tooltip.x + 12, top: tooltip.y - 10 }}
        >
          <div>
            <span className="text-secondary">{tooltip.code}</span> {tooltip.name}
          </div>
          <div className="mt-2 text-[10px] font-black uppercase tracking-widest text-secondary">
            Rules engine — available now
          </div>
          {tooltip.cloud && (
            <div className="mt-1 text-[10px] font-black uppercase tracking-widest text-indigo-300">
              {tooltip.cloud.tier === "full"
                ? "Cloud — all administrative languages"
                : `Cloud — partial, no ${tooltip.cloud.missing}`}
              <span className="block text-on-surface-variant normal-case tracking-normal font-bold mt-0.5">
                Coming soon
              </span>
            </div>
          )}
        </div>
      )}

      <p className="text-xs text-on-surface-variant leading-relaxed text-center max-w-2xl mx-auto mt-8">
        The rules engine ships today across all {COUNTS.rules} countries. Cloud
        coverage describes the contextual model still in development, which
        handles Dutch, English, French and German; a country counts as fully
        covered when every language its government and business documents are
        written in is among those. Minority co-official languages are out of
        scope.
      </p>
    </div>
  );
}
