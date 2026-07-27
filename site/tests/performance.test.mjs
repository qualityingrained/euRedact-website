/* The latency figure published on the Node.js SDK page, checked by measurement.
 *
 * Kept out of the default `npm test` run: these assertions time real work, so
 * they are machine-dependent in a way the claim tests are not. They are a
 * tripwire for order-of-magnitude drift, NOT a benchmark — the bands are wide
 * on purpose. The published number came out 150x optimistic once already,
 * because it was measured on the cache-hit path.
 *
 * Run with: npm run test:perf
 */

import { test, describe } from "node:test";
import assert from "node:assert/strict";

import * as euredact from "euredact";

import { readSiteFile } from "./helpers.mjs";

/** Synthetic page matching the 2,000-char basis of the published figure. */
function makePage(size) {
  const base =
    "Naam: Jan de Vries, BSN 111222333, email jan@test.nl, " +
    "IBAN NL91ABNA0417164300. Telefoon +31 6 12345678. " +
    "Adres: Kerkstraat 42, 1234 AB Amsterdam. BTW: NL123456789B01. ";
  return base.repeat(Math.floor(size / base.length) + 1).slice(0, size);
}

const PAGE = makePage(2000);
const WARMUP = 200;
const ITERATIONS = 2000;

/** Median ms per call, to blunt the effect of a stray GC pause. */
function timePerCall({ cache }) {
  const options = { countries: ["NL"], cache };
  for (let i = 0; i < WARMUP; i++) euredact.redact(PAGE, options);

  const samples = [];
  for (let batch = 0; batch < 5; batch++) {
    const start = process.hrtime.bigint();
    for (let i = 0; i < ITERATIONS / 5; i++) euredact.redact(PAGE, options);
    const elapsed = Number(process.hrtime.bigint() - start) / 1e6;
    samples.push(elapsed / (ITERATIONS / 5));
  }
  return samples.sort((a, b) => a - b)[Math.floor(samples.length / 2)];
}

/** The per-page latency the Node.js SDK page advertises, in ms. */
function publishedPerPageMs() {
  const source = readSiteFile("src/app/docs/nodejs/page.tsx");
  const match = source.match(/~?([\d.]+)ms\s*<\/div>/);
  assert.ok(match, "could not find the per-page latency stat on the Node.js page");
  return Number(match[1]);
}

describe("published latency", () => {
  test("caching is what makes the fast path fast", () => {
    // If this fails, the two paths are no longer distinguishable and the
    // reasoning behind the published number needs revisiting.
    const cached = timePerCall({ cache: true });
    const uncached = timePerCall({ cache: false });
    assert.ok(
      uncached > cached * 3,
      `expected the uncached path to be materially slower; ` +
        `cached ${cached.toFixed(4)}ms vs uncached ${uncached.toFixed(4)}ms`,
    );
  });

  test("the published figure describes real redaction, not a cache hit", () => {
    const cached = timePerCall({ cache: true });
    const uncached = timePerCall({ cache: false });
    const published = publishedPerPageMs();

    // On a log scale, the published number must sit nearer the uncached cost
    // than the cache-hit cost. This is the exact error that shipped before.
    const toUncached = Math.abs(Math.log(published / uncached));
    const toCached = Math.abs(Math.log(published / cached));
    assert.ok(
      toUncached < toCached,
      `the published ${published}ms is closer to the cache-hit path ` +
        `(${cached.toFixed(4)}ms) than to real redaction (${uncached.toFixed(4)}ms)`,
    );
  });

  test("the published figure is the right order of magnitude", () => {
    const uncached = timePerCall({ cache: false });
    const published = publishedPerPageMs();
    const ratio = published / uncached;
    // Deliberately wide: a slow CI box may be several times slower than the
    // machine the figure was measured on. Anything outside this is drift, not
    // noise.
    assert.ok(
      ratio > 0.2 && ratio < 5,
      `published ${published}ms vs measured ${uncached.toFixed(3)}ms/page ` +
        `(${ratio.toFixed(2)}x) — re-measure and update the page`,
    );
  });
});
