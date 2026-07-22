# Self-hosted assets

Every asset this site loads is served from our own origin. Nothing is fetched
from a third-party CDN at runtime, and the site makes no third-party requests of
any kind — no fonts, no map data, no geolocation.

This is a deliberate constraint, not an optimisation. euRedact's claim is that
personal data stays in your jurisdiction; a marketing site that quietly hands
each visitor's IP address to a US CDN undercuts that, and EU case law has already
penalised exactly this pattern for Google Fonts. **Before adding any asset or
API call to this site, check it is same-origin.** If a library defaults to a CDN
URL, vendor the file into `public/` and point at it.

Currently self-hosted for this reason:

| Asset | Served from | Was |
| --- | --- | --- |
| Material Symbols icons | `public/fonts/material-symbols-outlined.woff2` | `fonts.googleapis.com` |
| Inter, JetBrains Mono | `next/font/google` (build-time download) | — |
| Europe map topology | `public/countries-50m.json` | `cdn.jsdelivr.net` |

The hero code block picks its example country from `navigator.languages`, not an
IP geolocation service, for the same reason. See `src/app/hero-code-block.tsx`.

The map topology is a copy of `world-atlas@2` (ISC licence). Refresh it by
downloading `countries-50m.json` from that package over `public/countries-50m.json`;
`src/app/europe-map.tsx` keys off the numeric ISO 3166-1 `id` fields, so any
replacement must keep them.

## Icons

`material-symbols-outlined.woff2` is a subset of Google's Material Symbols
Outlined variable font (Apache 2.0), containing only the icon names used on this
site. It is self-hosted rather than loaded from `fonts.googleapis.com` so that
visiting a page transmits no visitor data (IP address, user agent) to Google.

Keep it that way: do not reintroduce a `<link>` to the Google Fonts CDN.

Inter and JetBrains Mono are handled by `next/font/google`, which downloads and
self-hosts them at build time — no runtime request to Google.

## Regenerating after adding an icon

Adding a new `material-symbols-outlined` icon to the site requires rebuilding
the subset, or the icon renders as its literal ligature text.

1. Collect the icon names in use. Note the three ways an icon reaches the DOM —
   a bare ligature, an `icon:` field in a data array, and a string literal inside
   a JSX expression such as `{open ? "close" : "menu"}`. Missing that third case
   is what shipped a broken mobile menu button once already:

   ```sh
   python3 - <<'EOF'
   import re, pathlib
   icons = set()
   for p in pathlib.Path("src").rglob("*.tsx"):
       s = p.read_text()
       for m in re.finditer(r'material-symbols-outlined', s):
           rest = s[m.end():]
           gt = rest.find('>')
           lt = rest.find('<', gt)
           if gt == -1 or lt == -1:
               continue
           content = rest[gt + 1:lt].strip()
           if re.fullmatch(r'[a-z0-9_]+', content):
               icons.add(content)              # <span ...>lock</span>
           elif content.startswith('{'):
               icons.update(re.findall(r'"([a-z0-9_]+)"', content))  # ternaries etc.
       for m in re.finditer(r'\bicon:\s*"([a-z0-9_]+)"', s):
           icons.add(m.group(1))               # { icon: "bolt", ... }
   print(",".join(sorted(icons)))
   EOF
   ```

   This is a heuristic over source text, not a real parser. After regenerating,
   confirm nothing renders as its literal word — load the site and run:

   ```js
   [...document.querySelectorAll('.material-symbols-outlined')]
     .filter(s => s.getBoundingClientRect().width > 40)
     .map(s => s.textContent.trim())   // must be []
   ```

   Check a narrow viewport too, or you will miss the mobile-only icons.

2. Request the subsetted CSS, passing that list as `icon_names` (a browser user
   agent is required, or the API returns the unsubsetted TTF stylesheet):

   ```sh
   curl -s -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36" \
     "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&icon_names=<ICONS>&display=swap"
   ```

3. Download the `src:` URL from that response over this file, keeping the same
   browser user agent.

The `@font-face` rule lives in `src/app/globals.css`.
