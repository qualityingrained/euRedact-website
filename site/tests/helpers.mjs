/* Shared helpers for the claim tests.
 *
 * These tests exist because euredact.dev publishes concrete numbers — country
 * count, entity-type count, latency, checksum coverage — and those numbers
 * silently went stale as the engine changed. Every claim the site makes that
 * can be checked against the installed `euredact` package is checked here.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

export const SITE_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

/** Recursively collect files under `dir` whose name matches `pattern`. */
function walk(dir, pattern, found = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry.startsWith(".")) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, pattern, found);
    else if (pattern.test(entry)) found.push(full);
  }
  return found;
}

/**
 * Every source file that can carry a user-visible claim: the pages themselves
 * plus the Markdown blog posts.
 */
export function claimBearingFiles() {
  return [
    ...walk(join(SITE_ROOT, "src"), /\.tsx?$/),
    ...walk(join(SITE_ROOT, "content"), /\.mdx?$/),
  ].map((path) => ({
    path: relative(SITE_ROOT, path),
    text: readFileSync(path, "utf8"),
  }));
}

export function readSiteFile(relPath) {
  return readFileSync(join(SITE_ROOT, relPath), "utf8");
}

/**
 * Matches that look like a claim but aren't one. Each entry needs a reason —
 * if you add one, say why the text is not a claim about the product.
 */
const EXEMPT = [
  {
    file: "src/app/europe-map.tsx",
    line: /world-atlas@2 countries-50m/,
    why: "vendored asset filename, not a coverage claim",
  },
  {
    file: "content/blog/eu-pii-redaction-challenge.md",
    line: /That's 10 countries\. We support 31\./,
    why: "prose contrasting 10 worked examples against the 31 supported",
  },
  {
    file: "src/app/pricing/token-calculator.tsx",
    line: /100,000/,
    why: "an illustrative billing volume, not the evaluation corpus size",
  },
  {
    file: "src/app/docs/coverage/types.ts",
    line: /\d+\s+countr(?:y|ies)\s+with\s+patterns|\d+\s+countries"|ISO-3166 country code/,
    why:
      "per-type pattern coverage ('4 countries with patterns'), not a claim " +
      "about how many countries the engine supports. Pinned to the engine by " +
      "the 'per-type country coverage' test instead, which is stronger than " +
      "exempting it — see claims.test.mjs.",
  },
];

function isExempt(file, line) {
  return EXEMPT.some((e) => e.file === file && e.line.test(line));
}

/**
 * Find every occurrence of a claim pattern across the site and return the
 * numbers it asserts, with enough location detail to make a failure actionable.
 * `pattern` must have a single capture group holding the number.
 */
export function findNumericClaims(pattern) {
  const hits = [];
  for (const { path, text } of claimBearingFiles()) {
    const lines = text.split("\n");
    lines.forEach((line, i) => {
      for (const m of line.matchAll(pattern)) {
        if (isExempt(path, line)) continue;
        hits.push({
          file: path,
          line: i + 1,
          value: Number(m[1]),
          text: m[0].trim(),
        });
      }
    });
  }
  return hits;
}

/** Render claim hits as a readable list for assertion messages. */
export function formatHits(hits) {
  return hits.map((h) => `  ${h.file}:${h.line}  "${h.text}"`).join("\n");
}

/**
 * The entity types the rules engine can actually emit, derived from the
 * pattern definitions rather than from the EntityType enum. The enum also
 * carries cloud-tier types (NAME, ADDRESS), a fallback (OTHER) and at least
 * one type no pattern produces (RESIDENCE_PERMIT) — counting those is how the
 * site ended up advertising "30+".
 */
export function emittedEntityTypes(euredact) {
  const types = new Set();
  for (const config of Object.values(euredact.COUNTRY_CONFIGS)) {
    for (const pattern of config.patterns) types.add(pattern.entityType);
  }
  return types;
}

/** Every pattern definition in the engine, across shared and per-country sets. */
export function allPatterns(euredact) {
  return Object.values(euredact.COUNTRY_CONFIGS).flatMap((c) => c.patterns);
}
