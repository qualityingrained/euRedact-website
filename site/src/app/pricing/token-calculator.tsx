"use client";

import { useState } from "react";

const DOC_LENGTHS = [
  { label: "Short (~500 words)", tokens: 750 },
  { label: "Medium (~2,000 words)", tokens: 3_000 },
  { label: "Long (~5,000 words)", tokens: 7_500 },
];

/*
  Logarithmic slider: the raw slider value (0–1000) maps to
  100–100,000 documents on a log scale. This gives equal visual
  weight to each order of magnitude.
*/
const SLIDER_MIN = Math.log(100);
const SLIDER_MAX = Math.log(100_000);
const SLIDER_STEPS = 1000;

function sliderToDocs(val: number): number {
  const log = SLIDER_MIN + (val / SLIDER_STEPS) * (SLIDER_MAX - SLIDER_MIN);
  // Round to a nice number
  const raw = Math.exp(log);
  if (raw < 500) return Math.round(raw / 10) * 10;
  if (raw < 5_000) return Math.round(raw / 50) * 50;
  if (raw < 50_000) return Math.round(raw / 500) * 500;
  return Math.round(raw / 1_000) * 1_000;
}

function docsToSlider(docs: number): number {
  const log = Math.log(Math.max(docs, 100));
  return Math.round(((log - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * SLIDER_STEPS);
}

function recommendPlan(tokens: number): { name: string; color: string } {
  if (tokens <= 0) return { name: "Rules (Free)", color: "text-secondary" };
  if (tokens <= 1_000_000) return { name: "Starter", color: "text-secondary" };
  if (tokens <= 2_500_000)
    return { name: "Professional", color: "text-secondary" };
  return { name: "Enterprise", color: "text-accent-indigo" };
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

export function TokenCalculator() {
  const [sliderVal, setSliderVal] = useState(docsToSlider(1_000));
  const [lengthIndex, setLengthIndex] = useState(1);

  const docsPerMonth = sliderToDocs(sliderVal);
  const tokensPerDoc = DOC_LENGTHS[lengthIndex].tokens;
  const totalTokens = docsPerMonth * tokensPerDoc;
  const plan = recommendPlan(totalTokens);

  return (
    <div className="bg-slate-50 rounded-[2rem] border-2 border-slate-200 shadow-xl p-10">
      {/* Documents per month */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <label className="font-semibold text-primary">
            Documents per month
          </label>
          <span className="text-secondary font-mono font-bold text-lg">
            {docsPerMonth.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={SLIDER_STEPS}
          step={1}
          value={sliderVal}
          onChange={(e) => setSliderVal(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-secondary"
        />
        <div className="flex justify-between text-xs text-on-surface-variant mt-1">
          <span>100</span>
          <span>1,000</span>
          <span>10,000</span>
          <span>100,000</span>
        </div>
      </div>

      {/* Average document length */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-3">
          <label className="font-semibold text-primary">
            Average document length
          </label>
          <span className="text-secondary font-mono font-bold text-lg">
            {DOC_LENGTHS[lengthIndex].label}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={2}
          step={1}
          value={lengthIndex}
          onChange={(e) => setLengthIndex(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-secondary"
        />
        <div className="flex justify-between text-xs text-on-surface-variant mt-1">
          <span>Short</span>
          <span>Medium</span>
          <span>Long</span>
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
        <p className="text-on-surface-variant text-sm mb-2">
          Estimated monthly tokens
        </p>
        <p className="text-4xl font-black text-primary mb-4">
          {formatNumber(totalTokens)}
        </p>
        <div className="flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-secondary">
            recommend
          </span>
          <p className="text-lg">
            Recommended plan:{" "}
            <span className={`font-bold ${plan.color}`}>{plan.name}</span>
          </p>
        </div>
        <p className="text-sm text-on-surface-variant mt-4">
          Cloud tiers are coming soon. Join the waitlist to be notified.
        </p>
      </div>
    </div>
  );
}
