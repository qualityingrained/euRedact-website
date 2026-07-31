/* Claims published on euredact.dev, checked against the engine that backs them.
 *
 * Scope: everything here is verified against the installed `euredact` npm
 * package (the TypeScript SDK). The site also publishes Python-specific
 * figures — "~9.5 ms per page", "346 pattern definitions", "44 checksum
 * validators" — which this suite CANNOT check, because the Python engine is
 * not a dependency of this repo. Those remain manually verified.
 */

import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
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

  test("the homepage map highlights exactly the countries the engine loads", () => {
    // The map shipped with 32 entries against a legend reading "31 Supported
    // Countries" — a country the engine does not carry, painted as supported.
    const source = readSiteFile("src/app/europe-map.tsx");
    const painted = [...source.matchAll(/code:\s*"([A-Z]{2})"/g)]
      .map((m) => m[1])
      .sort();
    const engine = [...euredact.availableCountries()].sort();
    assert.deepEqual(painted, engine);
  });

  test("the benchmarks page publishes no per-country accuracy table", () => {
    /*
      It used to, and the numbers were invented: 32 rows under a heading saying
      31, Liechtenstein among them despite no such ruleset, per-country record
      counts summing to 297,704 against a 152,300-record corpus, and a tail that
      descended in a suspiciously smooth ladder.

      The corpus is generated in country *groups*, so per-country ground truth
      does not exist to publish. The page reports per dataset instead. If a
      countryData array comes back, it is invented again.
    */
    const source = readSiteFile("src/app/benchmarks/page.tsx");
    assert.equal(
      source.includes("const countryData"),
      false,
      "the per-country accuracy table is back — the corpus cannot support one",
    );
  });

  test("the coverage page's per-type country counts match the engine", () => {
    /*
      The coverage catalogue says things like "4 countries with patterns" for
      PASSPORT and "15 countries" for LICENSE_PLATE. Those are the numbers a
      reader uses to decide whether the Rules Engine layer covers their
      jurisdiction for a given type, so they are worth pinning — the site-wide
      "N countries" guard deliberately skips this file, and this replaces it.

      Counted as: how many non-shared country configs carry at least one
      pattern emitting that type.
    */
    const perType = {};
    for (const [code, config] of Object.entries(euredact.COUNTRY_CONFIGS)) {
      if (code === "SHARED") continue;
      for (const type of new Set(config.patterns.map((p) => p.entityType))) {
        perType[type] = (perType[type] ?? 0) + 1;
      }
    }

    // Only the types whose scope string names a count. BANK_ACCOUNT, PHONE and
    // POSTAL_CODE say "31 countries", which the site-wide guard already covers.
    const claimed = {
      PASSPORT: 4,
      TAX_ID: 5,
      SSN: 1,
      DRIVERS_LICENSE: 1,
      HEALTH_INSURANCE: 2,
      HEALTHCARE_PROVIDER: 1,
      VAT: 30,
      LICENSE_PLATE: 15,
      CHAMBER_OF_COMMERCE: 10,
      NATIONAL_ID: 31,
      PHONE: 31,
      POSTAL_CODE: 31,
    };

    const wrong = [];
    for (const [type, count] of Object.entries(claimed)) {
      if (perType[type] !== count) {
        wrong.push(`${type}: page says ${count}, engine has ${perType[type]}`);
      }
    }
    assert.deepEqual(wrong, [], `\n${wrong.join("\n")}\n`);

    // The catalogue must still carry every type this test pins, or a type
    // could be dropped from the page and the assertion above would pass on a
    // list that no longer describes anything.
    const source = readSiteFile("src/app/docs/coverage/types.ts");
    const missing = Object.keys(claimed).filter(
      (type) => !source.includes(`name: "${type}"`),
    );
    assert.deepEqual(
      missing,
      [],
      `the coverage catalogue no longer lists: ${missing.join(", ")}`,
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

  test("the coverage page's 40 types reconcile with the engine's 27", () => {
    /*
      The site quotes two type counts: 27 on the SDK pages and the homepage, 40
      on /docs/coverage. They are not in conflict — 27 is what the Rules Engine
      layer emits, 40 is both layers — but they read as a contradiction unless
      they actually reconcile, so this asserts the arithmetic rather than
      trusting the prose.

      A coverage type is rules-detectable when its layer is not "AI only" AND
      the engine really has a pattern for it. CREDENTIAL and INTERNAL_ID are
      AI-led with no patterns today, which is exactly the gap that makes the
      naive count 29 rather than 27.
    */
    const source = readSiteFile("src/app/docs/coverage/types.ts");
    const entries = [
      ...source.matchAll(
        /name: "([A-Z0-9_]+)",\s*\n\s*tier: "\w+",\s*\n\s*layer: "([^"]+)"/g,
      ),
    ].map(([, name, layer]) => ({ name, layer }));

    assert.equal(entries.length, 40, "expected 40 types in the coverage catalogue");

    const emitted = emittedEntityTypes(euredact);
    const claimsRules = entries.filter((e) => e.layer !== "AI only");
    const backedByPatterns = claimsRules.filter((e) => emitted.has(e.name));

    assert.deepEqual(
      [...emitted].filter((t) => !entries.some((e) => e.name === t)).sort(),
      [],
      "the engine emits a type the coverage page never lists",
    );
    assert.equal(
      backedByPatterns.length,
      emitted.size,
      `${backedByPatterns.length} coverage types map to engine patterns but the ` +
        `engine emits ${emitted.size}`,
    );

    // The remainder must be AI-led-with-no-patterns, never "Rules only" or
    // "Rules led" — claiming rules coverage the engine does not have.
    const unbacked = claimsRules.filter((e) => !emitted.has(e.name));
    assert.deepEqual(
      unbacked.filter((e) => e.layer !== "AI led").map((e) => e.name),
      [],
      "a type is marked as rules-detected but no pattern emits it",
    );
    assert.deepEqual(unbacked.map((e) => e.name).sort(), ["CREDENTIAL", "INTERNAL_ID"]);
  });

  test("the benchmarks table maps corpus labels to real engine types", () => {
    // Rows are keyed on the corpus's label categories, which are finer-grained
    // than the engine's types. Where they differ the page prints "-> TYPE"; if
    // that target is not a type the engine emits, the arrow points nowhere.
    const source = readSiteFile("src/app/benchmarks/page.tsx");
    const emitted = emittedEntityTypes(euredact);
    const targets = [...source.matchAll(/emits:\s*"([A-Z0-9_]+)"/g)].map((m) => m[1]);
    assert.ok(targets.length > 0, "expected the benchmarks table to map some labels");
    const unknown = [...new Set(targets)].filter((t) => !emitted.has(t)).sort();
    assert.deepEqual(
      unknown,
      [],
      `the benchmarks table maps a corpus label onto a type the engine never emits: ${unknown.join(", ")}`,
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

    test(`${label}: a checksum-invalid identifier is never claimed with confidence`, () => {
      /*
        Until 0.3.2 this asserted the value was left untouched. That is no
        longer the guarantee, and the weaker-looking assertion below is the
        accurate one.

        `countries=` now scores detection instead of gating it, so every
        country's patterns run on every document. A value that fails one
        country's checksum can still validate under another — 111222334 fails
        the Dutch elfproef but is a well-formed Czech rodné číslo — so it is
        detected, attributed to the country that accepts it, and flagged
        out_of_scope with countryConfidence 0, the engine's signal that an
        attribution rests on a checksum alone.

        What must still hold: a failed checksum can never produce a confident
        in-scope detection for the declared country. That is the claim the site
        makes, and it is what this checks.
      */
      const text = `${label} ${invalid}`;
      const { redactedText, detections } = euredact.redact(text, {
        countries: [country],
      });

      const claimedInScope = detections.filter(
        (d) => !d.outOfScope && (d.countryConfidence ?? 0) > 0
      );
      assert.deepEqual(
        claimedInScope.map((d) => `${d.entityType}/${d.country}`),
        [],
        `a checksum-invalid ${label} was claimed as a confident ${country} detection — the validator is not running`,
      );

      if (redactedText !== text) {
        const [d] = detections;
        assert.ok(
          d.outOfScope || d.countryConfidence === 0,
          `${label} was redacted without being flagged out of scope or zero-confidence`,
        );
      }
    });
  }
});

describe("packaging claims", () => {
  test('"zero dependencies" holds for the published package', () => {
    const deps = Object.keys(enginePackage.dependencies ?? {});
    assert.deepEqual(deps, []);
  });

  test("the site's advertised version matches the installed engine", () => {
    // Deliberately not pinned to a literal version: this must track whatever
    // is installed, or it becomes a snapshot that fails on every release.
    const layout = readSiteFile("src/app/layout.tsx");
    const [, advertised] = layout.match(/softwareVersion:\s*"([^"]+)"/) ?? [];
    assert.ok(advertised, "layout.tsx no longer declares a softwareVersion");
    assert.ok(
      enginePackage.version.startsWith(advertised),
      `site advertises v${advertised}, installed engine is ${enginePackage.version}`,
    );

    // The badge lives in the nav, so it is on every page rather than only the
    // homepage. Matched as its own token so a stray "v0.3" elsewhere in the
    // file cannot satisfy it.
    const nav = readSiteFile("src/components/nav.tsx");
    const badge = nav.match(/>\s*v(\d+\.\d+)\s*</);
    assert.ok(badge, "nav.tsx no longer renders a version badge");
    assert.equal(
      badge[1],
      advertised,
      `the nav version badge disagrees with softwareVersion "${advertised}"`,
    );
  });

  test("the declared dependency range can actually resolve the engine", () => {
    // npm's caret is patch-only below 1.0, so a "^0.2.0" range silently keeps
    // 0.3.0 out: `npm update` reports nothing to do and the site drifts ahead
    // of the package it documents.
    const declared = JSON.parse(
      readFileSync(join(SITE_ROOT, "package.json"), "utf8"),
    ).dependencies.euredact;
    const [, range] = declared.match(/^\^?(\d+\.\d+)\./) ?? [];
    const [installedMinor] = enginePackage.version.match(/^\d+\.\d+/) ?? [];
    assert.equal(
      range,
      installedMinor,
      `package.json declares "${declared}" but ${enginePackage.version} is installed`,
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

describe("analytics stays consent-free", () => {
  /*
    The privacy policy tells visitors there is no cookie banner because nothing
    is stored on their device and the events are enumerated. That claim is only
    true while the code matches it, and it is the kind of claim that silently
    stops being true — someone adds an event, or a tracker attribute, and the
    policy still says four.
  */
  const EVENTS = [
    "waitlist-opened",
    "waitlist-submitted",
    "blog-subscribed",
    "demo-redacted",
    "playground-engaged",
    "playground-redacted",
    "coverage-filtered",
  ];

  test("the event set, the policy and ANALYTICS.md agree", () => {
    const lib = readSiteFile("src/lib/analytics.ts");
    const declared = [...lib.matchAll(/^\s*\|\s*"([a-z-]+)"/gm)].map((m) => m[1]);
    assert.deepEqual(
      declared.sort(),
      [...EVENTS].sort(),
      "AnalyticsEvent no longer matches the events this test knows about",
    );

    const doc = readSiteFile("ANALYTICS.md");
    const undocumented = EVENTS.filter((e) => !doc.includes(`\`${e}\``));
    assert.deepEqual(undocumented, [], "events missing from ANALYTICS.md");

    // The policy states a count in words, which is what a reader actually sees.
    const policy = readSiteFile("src/app/legal/privacy/page.tsx");
    const WORDS = ["zero", "one", "two", "three", "four", "five", "six",
                   "seven", "eight", "nine", "ten"];
    assert.ok(
      policy.includes(`count ${WORDS[EVENTS.length]} actions`),
      `the privacy policy does not say "count ${WORDS[EVENTS.length]} actions" — ` +
        `it enumerates the events, so adding one means rewriting it`,
    );
  });

  test("no event payload can carry what a visitor typed", () => {
    /*
      The playground and demo run the real engine on text a visitor is invited
      to paste, which is the one place real personal data plausibly enters this
      site. An analytics call leaves the browser; their text must not be in it.

      A *count* derived from that text is allowed and is disclosed in the policy
      — `demo-redacted` sends detections.length — so the rule is that these
      identifiers may only appear as `.length`, never as the value itself.
    */
    const SENSITIVE = /\b(input|text|value|redacted|redactedText|email|detections)\b(\.length)?/g;
    const offenders = [];
    for (const { path, text } of claimBearingFiles()) {
      text.split("\n").forEach((line, i) => {
        // Only the payload. The event *name* legitimately contains words like
        // "redacted" — "demo-redacted" is not a leak.
        const call = line.match(/trackEvent\(\s*"[a-z-]+"\s*,([^)]*)\)/);
        if (!call) return;
        for (const m of call[1].matchAll(SENSITIVE)) {
          if (m[2]) continue; // `.length` is a count, not the content
          offenders.push({ file: path, line: i + 1, text: line.trim() });
        }
      });
    }
    assert.deepEqual(
      offenders,
      [],
      `an event payload references visitor-supplied content rather than a count:\n${formatHits(offenders)}`,
    );
  });

  test("the tracker sets no cookie and excludes hashes", () => {
    const script = readSiteFile("src/components/analytics-script.tsx");
    for (const [what, attr] of [
      ["honour Do Not Track", 'data-do-not-track="true"'],
      ["keep anchors out of recorded URLs", 'data-exclude-hash="true"'],
    ]) {
      assert.ok(script.includes(attr), `the tracker no longer sets ${attr} (${what})`);
    }
    // A cookie anywhere in the tracker path would need the banner the policy
    // says is unnecessary.
    assert.equal(
      /document\.cookie/.test(script + readSiteFile("src/lib/analytics.ts")),
      false,
      "analytics code touches document.cookie",
    );
  });

  test("the automation hook labels without ever dropping a beacon", async () => {
    /*
      The hook exists so crawler traffic can be *seen* separately, not removed.
      The tracker drops any beacon for which the hook returns a falsy value, so
      an early return or a missing `return p` would silently delete traffic —
      and it would look like the bots had simply gone away.
    */
    /*
      The hook ships as a string literal, so the test evaluates that exact
      string rather than a reimplementation — node --test cannot import the .ts
      module, and a copy of the logic here would pass while the shipped code
      broke.
    */
    const lib = readSiteFile("src/lib/analytics.ts");
    const AUTOMATION_HOOK = lib.match(/AUTOMATION_HOOK = "([^"]+)"/)?.[1];
    const AUTOMATION_TAG = lib.match(/AUTOMATION_TAG = "([^"]+)"/)?.[1];
    assert.ok(AUTOMATION_HOOK && AUTOMATION_TAG, "hook or tag constant missing");

    const literal = lib.match(/return `([\s\S]*?)`;\n}/)?.[1];
    assert.ok(literal, "could not find the hook source literal");
    const automationHookSource = () =>
      literal
        .replaceAll("${AUTOMATION_HOOK}", AUTOMATION_HOOK)
        .replaceAll("${JSON.stringify(AUTOMATION_TAG)}", JSON.stringify(AUTOMATION_TAG));

    const cases = [
      { name: "plain browser", nav: { userAgent: "Mozilla/5.0 (Macintosh)", languages: ["en"] }, tagged: false },
      { name: "webdriver", nav: { userAgent: "Mozilla/5.0 (Macintosh)", languages: ["en"], webdriver: true }, tagged: true },
      { name: "self-identifying bot", nav: { userAgent: "Googlebot/2.1", languages: ["en"] }, tagged: true },
      { name: "headless", nav: { userAgent: "HeadlessChrome/120", languages: ["en"] }, tagged: true },
      { name: "no languages", nav: { userAgent: "Mozilla/5.0", languages: [] }, tagged: true },
      // The hook must survive a hostile environment rather than throw and take
      // the beacon with it.
      { name: "navigator missing bits", nav: {}, tagged: true },
    ];

    for (const { name, nav, tagged } of cases) {
      const sandbox = { navigator: nav };
      new Function("window", "navigator", `with(window){${automationHookSource()}}`)(
        sandbox,
        nav,
      );
      const payload = { url: "/", website: "x" };
      const out = sandbox[AUTOMATION_HOOK]("pageview", payload);

      assert.ok(out, `${name}: hook returned falsy — the beacon would be dropped`);
      assert.equal(out.url, "/", `${name}: hook mangled the payload`);
      assert.equal(
        out.tag,
        tagged ? AUTOMATION_TAG : undefined,
        `${name}: expected tag ${tagged ? AUTOMATION_TAG : "none"}`,
      );
    }
  });
});

describe("self-hosted icon font", () => {
  /*
    The icon font is subset to the icons in use, so adding an icon without
    regenerating leaves the ligature unresolved and the browser paints the
    literal word — "CHECKLIST" at heading size, overlapping its own label.

    Regenerating is only half the fix. Next fingerprints the CSS but not
    public/, so at a stable URL every returning visitor keeps the old font out
    of cache and still sees the broken word. The filename therefore carries the
    font's content hash, and these two tests make both halves un-forgettable:
    one pins the URL to the file's actual bytes, the other pins the file's
    coverage to the icons the source asks for.
  */
  const FONT_DIR = join(SITE_ROOT, "public/fonts");

  function fontFile() {
    const files = readdirSync(FONT_DIR).filter((f) => f.endsWith(".woff2"));
    assert.equal(
      files.length,
      1,
      `expected exactly one icon font in public/fonts, found: ${files.join(", ")}`,
    );
    return files[0];
  }

  test("the @font-face URL carries the font's real content hash", () => {
    const file = fontFile();
    const [, hash] = file.match(/^material-symbols-outlined\.([0-9a-f]{8})\.woff2$/) ?? [];
    assert.ok(
      hash,
      `${file} is not named material-symbols-outlined.<8-hex>.woff2 — a stable ` +
        `filename means returning visitors keep the stale font`,
    );

    const actual = createHash("sha256")
      .update(readFileSync(join(FONT_DIR, file)))
      .digest("hex")
      .slice(0, 8);
    assert.equal(
      hash,
      actual,
      `the font was regenerated without renaming it: filename says ${hash}, ` +
        `contents hash to ${actual}`,
    );

    const css = readSiteFile("src/app/globals.css");
    assert.ok(
      css.includes(`/fonts/${file}`),
      `globals.css does not reference ${file}`,
    );
  });

  test("the subset was generated from the icons the source actually uses", () => {
    /*
      Compares the source against public/fonts/icons.txt, the manifest of what
      the subset was built from, rather than against the font binary — woff2 is
      brotli-compressed, so the glyph names are not readable without a font
      parser, and a test that silently matched nothing would be worse than none.

      The collection heuristic mirrors SELF-HOSTED-ASSETS.md, including the two
      cases that are easy to miss: an `icon:` field in a data array, and a
      string literal inside a JSX expression such as {open ? "close" : "menu"}.
    */
    const used = new Set();
    for (const { path, text } of claimBearingFiles()) {
      if (!path.endsWith(".tsx")) continue;
      for (const m of text.matchAll(/material-symbols-outlined/g)) {
        const rest = text.slice(m.index + m[0].length);
        const gt = rest.indexOf(">");
        const lt = rest.indexOf("<", gt);
        if (gt === -1 || lt === -1) continue;
        const content = rest.slice(gt + 1, lt).trim();
        if (/^[a-z0-9_]+$/.test(content)) used.add(content);
        else if (content.startsWith("{")) {
          for (const s of content.matchAll(/"([a-z0-9_]+)"/g)) used.add(s[1]);
        }
      }
      for (const m of text.matchAll(/\bicon:\s*"([a-z0-9_]+)"/g)) used.add(m[1]);
    }
    assert.ok(used.size > 0, "expected the site to use icons");

    const manifest = new Set(
      readFileSync(join(FONT_DIR, "icons.txt"), "utf8")
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith("#")),
    );

    const missing = [...used].filter((i) => !manifest.has(i)).sort();
    assert.deepEqual(
      missing,
      [],
      `used in src/ but absent from the font subset, so each renders as its ` +
        `literal ligature word:\n  ${missing.join("\n  ")}\n` +
        `Regenerate per SELF-HOSTED-ASSETS.md, rename with the new hash, and ` +
        `add them to public/fonts/icons.txt.`,
    );

    // Not a failure — the subset is simply carrying weight nobody asks for.
    const stale = [...manifest].filter((i) => !used.has(i)).sort();
    if (stale.length) {
      console.log(`  note: ${stale.length} icons in the subset are unused: ${stale.join(", ")}`);
    }
  });
});

describe("accuracy figures stay consistent across the site", () => {
  /*
    Measured 2026-07-31 at tag v0.3.6 over all 152,300 corpus documents and
    667,129 non-DOB labels, both engines, both modes. These cannot be derived
    from the installed package — the evaluation corpus lives with the engine —
    so they are pinned here and checked for drift between pages, which is how
    ">99%" and "99.1%" coexisted for months.

    There is no single headline number. `countries` scores rather than gates
    detection, so each engine has two honest operating points: hinted (you
    declared the countries) and blind (you did not). Both engines are measured
    with the same scorer, so a difference between them says something about the
    engines rather than about the measurement — and both belong on the site,
    because the site documents both SDKs. The guard accepts these four points
    and nothing else; a fifth figure anywhere is the drift this test catches.
  */
  const HEADLINE = {
    python: {
      hinted: { recall: "99.72", precision: "99.82" },
      blind: { recall: "99.50", precision: "99.59" },
    },
    typescript: {
      hinted: { recall: "99.72", precision: "99.80" },
      blind: { recall: "99.43", precision: "99.51" },
    },
  };

  // DOB is excluded from every headline above: the rules engine emits one only
  // with a keyword or an unambiguous format, and bare dates go to the cloud
  // tier. Identical in both engines, so it is pinned once.
  const DOB = { recall: "62.76", precision: "99.53" };

  // Prose rounds to one decimal ("99.7% recall") where a stat tile does not.
  // Derived from the pinned figures rather than listed, so a rounded claim can
  // never drift away from the exact one it rounds.
  const accepted = (pick) =>
    new Set(
      [
        ...Object.values(HEADLINE).flatMap((e) => [e.hinted[pick], e.blind[pick]]),
        DOB[pick],
      ].flatMap((v) => [v, String(Math.round(Number(v) * 10) / 10)]),
    );

  const describePoints = (pick) =>
    `${pick} is Python ${HEADLINE.python.hinted[pick]}% hinted / ` +
    `${HEADLINE.python.blind[pick]}% blind, Node ${HEADLINE.typescript.hinted[pick]}% / ` +
    `${HEADLINE.typescript.blind[pick]}%, DOB ${DOB[pick]}%`;

  test("every recall claim quotes a published operating point", () => {
    const hits = findNumericClaims(/([\d.]+)%\s*recall/gi);
    assert.ok(hits.length > 0, "expected the site to claim a recall figure");
    const ok = accepted("recall");
    const wrong = hits.filter((h) => !ok.has(String(h.value)));
    assert.deepEqual(
      wrong,
      [],
      `${describePoints("recall")}; these match none:\n${formatHits(wrong)}`,
    );
  });

  test("every precision claim quotes a published operating point", () => {
    const hits = findNumericClaims(/([\d.]+)%\s*precision/gi);
    assert.ok(hits.length > 0, "expected the site to claim a precision figure");
    const ok = accepted("precision");
    const wrong = hits.filter((h) => !ok.has(String(h.value)));
    assert.deepEqual(
      wrong,
      [],
      `${describePoints("precision")}; these match none:\n${formatHits(wrong)}`,
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
      ["the countries condition", /countries.{0,120}supplied/is],
      ["recall with countries", /99\.72%/],
      ["precision with countries", /99\.82%/],
      ["recall without countries", /99\.50%/],
      ["precision without countries", /99\.59%/],
      // Both engines are published, because the site documents both SDKs and
      // they do not measure identically once country inference is doing the
      // work. Naming only the stronger one would be a choice, not a rounding.
      ["which engine the headline figures are", /Python engine/i],
      ["the Node engine's blind figures", /99\.43%.{0,40}99\.51%/s],
      // Since 0.3.2 the difference is attribution, not coverage. Without this
      // sentence the two operating points read as a recall cliff, which would
      // overstate what `countries` buys you.
      ["that countries scores rather than gates", /scores a\s+detection rather than gating it/is],
      ["the excluded DOB figure", /62\.76%/],
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
