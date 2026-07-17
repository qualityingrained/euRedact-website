# Self-hosted fonts

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

1. Collect the icon names in use:

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
               icons.add(content)
       for m in re.finditer(r'\bicon:\s*"([a-z0-9_]+)"', s):
           icons.add(m.group(1))
   print(",".join(sorted(icons)))
   EOF
   ```

2. Request the subsetted CSS, passing that list as `icon_names` (a browser user
   agent is required, or the API returns the unsubsetted TTF stylesheet):

   ```sh
   curl -s -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36" \
     "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&icon_names=<ICONS>&display=swap"
   ```

3. Download the `src:` URL from that response over this file, keeping the same
   browser user agent.

The `@font-face` rule lives in `src/app/globals.css`.
