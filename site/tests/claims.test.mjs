/* Claims published on euredact.dev, checked against the engine that backs them.
 *
 * Scope: everything here is verified against the installed `euredact` npm
 * package (the TypeScript SDK). The site also publishes Python-specific
 * figures — "~3 ms per page", "345 pattern definitions", "44 checksum
 * validators" — which this suite CANNOT check, because the Python engine is
 * not a dependency of this repo. Those remain manually verified.
 */

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import * as euredact from "euredact";

import {
  SITE_ROOT,
  allPatterns,
  claimBearingFiles,
  emittedEntityTypes,
  findNumericClaims,
  formatHits,
  readSiteFile,
} from "./helpers.mjs";

const enginePackage = JSON.parse(
  readFileSync(join(SITE_ROOT, "node_modules/euredact/package.json"), "utf8"),
);

/** Pull a `const <name> = [...]` string array out of a .tsx source file. */
function extractStringArray(source, name) {
  const start = source.indexOf(`const ${name} = [`);
  assert.notEqual(start, -1, `expected a "const ${name} = [" array in the page`);
  const end = source.indexOf("];", start);
  const body = source.slice(start, end);
  // Digits matter here: IPV6_ADDRESS is a real entity type.
  return [...body.matchAll(/"([A-Z][A-Z0-9_]*)"/g)].map((m) => m[1]);
}

describe("country coverage", () => {
  test("the engine supports exactly the 31 countries the site advertises", () => {
    assert.equal(euredact.availableCountries().length, 31);
  });

  test('every "N countries" claim on the site says 31', () => {
    const hits = findNumericClaims(
      /(\d+)\+?\s+(?:European\s+)?countr(?:y|ies)/gi,
    );
    assert.ok(hits.length > 0, "expected the site to claim country coverage");
    const wrong = hits.filter((h) => h.value !== 31);
    assert.deepEqual(
      wrong,
      [],
      `these claims disagree with availableCountries() === 31:\n${formatHits(wrong)}`,
    );
  });

  test("the SDK docs list the same country codes the engine loads", () => {
    const engine = [...euredact.availableCountries()].sort();
    for (const page of ["docs/python", "docs/nodejs"]) {
      const source = readSiteFile(`src/app/${page}/page.tsx`);
      const listed = extractStringArray(source, "countries").sort();
      assert.deepEqual(
        listed,
        engine,
        `${page} lists country codes the engine does not load (or omits some)`,
      );
    }
  });
});

describe("entity types", () => {
  test("the rules engine emits exactly 27 entity types", () => {
    assert.equal(emittedEntityTypes(euredact).size, 27);
  });

  test("the enum carries types no pattern can produce", () => {
    // Documents *why* the count is 27 and not 31: if a future release starts
    // emitting one of these, this test fails and the site number needs a look.
    const emitted = emittedEntityTypes(euredact);
    const declared = new Set(Object.values(euredact.EntityType));
    const neverEmitted = [...declared].filter((t) => !emitted.has(t)).sort();
    assert.deepEqual(neverEmitted, [
      "ADDRESS",
      "NAME",
      "OTHER",
      "RESIDENCE_PERMIT",
    ]);
  });

  test('every "N entity types" claim on the site says 27', () => {
    const hits = findNumericClaims(
      /(\d+)\+?\s+(?:structured\s+)?(?:PII\s+)?entity types/gi,
    );
    assert.ok(hits.length > 0, "expected the site to claim an entity count");
    const wrong = hits.filter((h) => h.value !== 27);
    assert.deepEqual(
      wrong,
      [],
      `these claims disagree with the engine's 27 emitted types:\n${formatHits(wrong)}`,
    );
  });

  test("the Node.js docs list exactly the types the engine emits", () => {
    // This is the tripwire for the IBAN -> BANK_ACCOUNT rename: the moment the
    // TS engine adopts the Python naming, this fails and the page needs it too.
    const source = readSiteFile("src/app/docs/nodejs/page.tsx");
    const listed = extractStringArray(source, "entities").sort();
    const emitted = [...emittedEntityTypes(euredact)].sort();
    assert.deepEqual(listed, emitted);
  });
});

describe("redaction placeholders", () => {
  const SAMPLE = "Mijn BSN is 111222333 en IBAN NL91ABNA0417164300.";

  test("the quickstart's Node.js output matches what the engine produces", () => {
    const { redactedText } = euredact.redact(SAMPLE, { countries: ["NL"] });
    const quickstart = readSiteFile("src/app/docs/quickstart/page.tsx");
    // The page renders the sample output as escaped JSX text.
    const shown = redactedText.replace(/"/g, "&quot;");
    assert.ok(
      quickstart.includes(shown),
      `the quickstart advertises a different Node.js output than the engine emits.\n` +
        `  engine: ${redactedText}`,
    );
  });

  test("every advertised placeholder token is a type the engine emits", () => {
    const emitted = emittedEntityTypes(euredact);
    const quickstart = readSiteFile("src/app/docs/quickstart/page.tsx");
    const tokens = new Set(
      [...quickstart.matchAll(/\[([A-Z][A-Z_]{3,})\]/g)].map((m) => m[1]),
    );
    assert.ok(tokens.size > 0, "expected placeholder tokens in the quickstart");
    // BANK_ACCOUNT is the Python SDK's name for the same type; the page says so
    // explicitly, so accept it until the TS engine is renamed to match.
    const unknown = [...tokens].filter(
      (t) => !emitted.has(t) && t !== "BANK_ACCOUNT",
    );
    assert.deepEqual(
      unknown,
      [],
      "the quickstart shows placeholders the engine never writes",
    );
  });
});

describe("checksum validation", () => {
  // The site names these four specifically. Each must be detected when the
  // checksum is valid and left alone when it is not — otherwise "checksum
  // validation" is just pattern matching.
  const CASES = [
    { label: "BSN", country: "NL", valid: "111222333", invalid: "111222334" },
    {
      label: "IBAN",
      country: "NL",
      valid: "NL91ABNA0417164300",
      invalid: "NL91ABNA0417164301",
    },
    {
      label: "NIR",
      country: "FR",
      valid: "180127511600128",
      invalid: "180127511600129",
    },
    {
      label: "Steuer-ID",
      country: "DE",
      valid: "86095742719",
      invalid: "86095742718",
    },
  ];

  for (const { label, country, valid, invalid } of CASES) {
    test(`${label}: a valid identifier is redacted`, () => {
      const text = `${label} ${valid}`;
      const { redactedText } = euredact.redact(text, { countries: [country] });
      assert.notEqual(
        redactedText,
        text,
        `a valid ${label} was not detected at all`,
      );
      assert.ok(!redactedText.includes(valid), `the ${label} survived redaction`);
    });

    test(`${label}: a checksum-invalid identifier is left alone`, () => {
      const text = `${label} ${invalid}`;
      const { redactedText } = euredact.redact(text, { countries: [country] });
      assert.equal(
        redactedText,
        text,
        `a checksum-invalid ${label} was redacted — the validator is not running`,
      );
    });
  }
});

describe("packaging claims", () => {
  test('"zero dependencies" holds for the published package', () => {
    const deps = Object.keys(enginePackage.dependencies ?? {});
    assert.deepEqual(deps, []);
  });

  test('the site\'s advertised version matches the installed engine', () => {
    assert.ok(
      enginePackage.version.startsWith("0.2"),
      `installed euredact is ${enginePackage.version}`,
    );
    const layout = readSiteFile("src/app/layout.tsx");
    const [, advertised] = layout.match(/softwareVersion:\s*"([^"]+)"/) ?? [];
    assert.ok(advertised, "layout.tsx no longer declares a softwareVersion");
    assert.ok(
      enginePackage.version.startsWith(advertised),
      `site advertises v${advertised}, installed engine is ${enginePackage.version}`,
    );
  });

  test('"100% local execution" — the engine bundles no network calls', () => {
    const dist = readFileSync(
      join(SITE_ROOT, "node_modules/euredact/dist/esm/index.js"),
      "utf8",
    );
    const network =
      /\b(?:fetch|XMLHttpRequest|WebSocket)\s*\(|from\s+["'](?:node:)?(?:https?|net|dns|tls|dgram)["']/;
    assert.ok(!network.test(dist), "found a network API in the engine bundle");
  });

  test("the pattern and validator counts clear the advertised floors", () => {
    // The site says "300+ pattern definitions and 40+ checksum validators" —
    // a floor rather than an exact figure, because the Python and TypeScript
    // engines carry slightly different counts.
    const patterns = allPatterns(euredact);
    const validators = new Set(
      patterns.filter((p) => p.validator).map((p) => String(p.validator)),
    );
    assert.ok(
      patterns.length >= 300,
      `only ${patterns.length} pattern definitions`,
    );
    assert.ok(validators.size >= 40, `only ${validators.size} validators`);
  });
});

describe("accuracy figures stay consistent across the site", () => {
  // Measured 2026-07-27 on a generated evaluation set of 152,300 records.
  // These cannot be derived from the installed package — the evaluation set
  // lives with the engine — so they are pinned here and checked for drift
  // between pages, which is how ">99%" and "99.1%" coexisted for months.
  const HEADLINE = { recall: "98.3", precision: "98.9", falsePositives: "1.1" };

  test("every recall claim quotes the same figure", () => {
    const hits = findNumericClaims(/([\d.]+)%\s*recall/gi);
    assert.ok(hits.length > 0, "expected the site to claim a recall figure");
    const wrong = hits.filter((h) => String(h.value) !== HEADLINE.recall);
    assert.deepEqual(
      wrong,
      [],
      `these disagree with the ${HEADLINE.recall}% headline recall:\n${formatHits(wrong)}`,
    );
  });

  test("the evaluation set size is quoted consistently", () => {
    const hits = findNumericClaims(/([\d,]{6,})\s*(?:records|documents)/gi);
    assert.ok(hits.length > 0, "expected the site to cite the corpus size");
    const wrong = hits.filter((h) => h.text.replace(/\D/g, "") !== "152300");
    assert.deepEqual(
      wrong,
      [],
      `the evaluation set holds 152,300 records:\n${formatHits(wrong)}`,
    );
  });

  test("the footer carries the measurement footnote", () => {
    // The footnote is rendered site-wide from the shared footer, so every page
    // quoting a headline figure carries its conditions. Each element below is
    // load-bearing: drop one and the remaining numbers read better than they
    // are.
    const footer = readSiteFile("src/components/footer.tsx");
    const required = [
      ['the "*" anchor the stats link to', /id="accuracy-note"/],
      ["the evaluation set size", /152,300 records/],
      ["that the data is generated", /generated evaluation set/i],
      ["the countries condition", /countries.{0,80}parameter is\s+supplied/is],
      ["recall without countries", /94\.4%/],
      ["false positives without countries", /4\.8%/],
      ["the excluded DOB figure", /40\.6%/],
    ];
    const missing = required
      .filter(([, pattern]) => !pattern.test(footer))
      .map(([what]) => what);
    assert.deepEqual(missing, [], `the footnote no longer states: ${missing.join(", ")}`);
  });

  test("headline stats point readers at the footnote", () => {
    const home = readSiteFile("src/app/page.tsx");
    assert.ok(
      home.includes("#accuracy-note"),
      "the homepage quotes headline figures without linking them to the footnote",
    );
  });
});

describe("retired claims", () => {
  test("the cache-hit latency figure is gone from the site", () => {
    const hits = findNumericClaims(/(0\.02)\s*ms/gi);
    assert.deepEqual(
      hits,
      [],
      `0.02ms is the cache-hit path — it measures a dictionary lookup, not redaction:\n${formatHits(hits)}`,
    );
  });

  test('no page pairs "sub-millisecond" with a per-page claim', () => {
    // Sub-millisecond is defensible per record (~0.4 ms/doc on the reference
    // corpus). Per *page* it is not — a 1,200-char page takes ~3 ms in Python.
    const offenders = [];
    for (const { path, text } of claimBearingFiles()) {
      text.split("\n").forEach((line, i) => {
        if (/sub-?millisecond/i.test(line) && /per[- ]page/i.test(line)) {
          offenders.push({ file: path, line: i + 1, text: line.trim() });
        }
      });
    }
    assert.deepEqual(offenders, [], formatHits(offenders));
  });
});
