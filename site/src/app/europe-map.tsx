"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

/*
  world-atlas uses numeric ISO 3166-1 codes as the `id` field.
  Map from numeric id → { code, name } for our 32 supported countries.
*/
const SUPPORTED: Record<string, { code: string; name: string }> = {
  "040": { code: "AT", name: "Austria" },
  "056": { code: "BE", name: "Belgium" },
  "100": { code: "BG", name: "Bulgaria" },
  "191": { code: "HR", name: "Croatia" },
  "196": { code: "CY", name: "Cyprus" },
  "203": { code: "CZ", name: "Czechia" },
  "208": { code: "DK", name: "Denmark" },
  "233": { code: "EE", name: "Estonia" },
  "246": { code: "FI", name: "Finland" },
  "250": { code: "FR", name: "France" },
  "276": { code: "DE", name: "Germany" },
  "300": { code: "EL", name: "Greece" },
  "348": { code: "HU", name: "Hungary" },
  "352": { code: "IS", name: "Iceland" },
  "372": { code: "IE", name: "Ireland" },
  "380": { code: "IT", name: "Italy" },
  "428": { code: "LV", name: "Latvia" },
  "438": { code: "LI", name: "Liechtenstein" },
  "440": { code: "LT", name: "Lithuania" },
  "442": { code: "LU", name: "Luxembourg" },
  "470": { code: "MT", name: "Malta" },
  "528": { code: "NL", name: "Netherlands" },
  "578": { code: "NO", name: "Norway" },
  "616": { code: "PL", name: "Poland" },
  "620": { code: "PT", name: "Portugal" },
  "642": { code: "RO", name: "Romania" },
  "703": { code: "SK", name: "Slovakia" },
  "705": { code: "SI", name: "Slovenia" },
  "724": { code: "ES", name: "Spain" },
  "752": { code: "SE", name: "Sweden" },
  "756": { code: "CH", name: "Switzerland" },
  "826": { code: "UK", name: "United Kingdom" },
};

export function EuropeMap() {
  const [tooltip, setTooltip] = useState<{ name: string; code: string; x: number; y: number } | null>(null);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
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
                const numericId = geo.id;
                const match = SUPPORTED[numericId];
                const isSupported = !!match;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={(e) => {
                      if (match) {
                        setTooltip({
                          name: match.name,
                          code: match.code,
                          x: e.clientX,
                          y: e.clientY,
                        });
                      }
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    style={{
                      default: {
                        fill: isSupported ? "#10B981" : "#1e293b",
                        stroke: "#0f172a",
                        strokeWidth: 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: isSupported ? "#34d399" : "#334155",
                        stroke: "#0f172a",
                        strokeWidth: 0.5,
                        outline: "none",
                        cursor: isSupported ? "pointer" : "default",
                      },
                      pressed: {
                        fill: isSupported ? "#10b981" : "#1e293b",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 pointer-events-none bg-primary border border-secondary/40 text-white text-sm font-bold px-4 py-2 rounded-xl shadow-xl"
          style={{ left: tooltip.x + 12, top: tooltip.y - 10 }}
        >
          <span className="text-secondary">{tooltip.code}</span>{" "}
          {tooltip.name}
          <span className="ml-2 text-[10px] text-secondary font-black uppercase tracking-widest">
            Supported
          </span>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-center gap-8 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#10B981]" />
          <span className="text-sm font-bold text-slate-600">32 Supported Countries</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#1e293b]" />
          <span className="text-sm font-bold text-slate-400">Not yet supported</span>
        </div>
      </div>
    </div>
  );
}
