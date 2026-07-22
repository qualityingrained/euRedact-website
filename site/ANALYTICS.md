# Analytics

The site uses **self-hosted [Umami](https://umami.is/)** — an open-source,
cookieless analytics tool that you run on your own server.

**It is currently switched off.** The code is in place, but until the two
environment variables below are set at build time, the site loads no tracker,
makes no analytics request, and the privacy policy renders with no analytics
section. This is deliberate: the policy should never describe something that
isn't running.

## Why self-hosted

euRedact's pitch is that personal data stays in your jurisdiction. A marketing
site that ships visitor data to a US analytics vendor undercuts that, and it is
the first thing a sceptical prospect will check. Self-hosting means the only
outbound request is to infrastructure you operate, so the site keeps its "sends
no data to third parties" claim and needs no cookie banner.

The same reasoning applies to fonts, icons, and map data — see
`SELF-HOSTED-ASSETS.md`.

## Turning it on

1. **Run Umami somewhere in the EU.** It needs Postgres (or MySQL) and is a
   single container; a small VPS is plenty for a marketing site. Follow the
   [Umami install docs](https://umami.is/docs/install). Put it on a subdomain you
   control, e.g. `analytics.euredact.eu`. Keeping it on your own domain is the
   entire point — do not use Umami Cloud without revisiting the privacy policy,
   since that reintroduces a third-party processor.

2. **Add the website in Umami** (Settings → Websites) and copy its website ID.

3. **Set two repository variables** in GitHub: Settings → Secrets and variables →
   Actions → **Variables** (not Secrets — both values are public in the page
   source anyway):

   | Variable | Example |
   | --- | --- |
   | `NEXT_PUBLIC_UMAMI_SRC` | `https://analytics.euredact.eu/script.js` |
   | `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | the UUID from step 2 |

4. **Re-run the deploy workflow.** The values are inlined at build time, so
   analytics only appears in builds made after the variables are set — changing
   them requires a rebuild, not just a redeploy.

For local development, copy `.env.example` to `.env.local`.

## What is measured

Pageviews, referrer, country, and browser/device type — all aggregate — plus
four conversion events, defined as a closed set in `src/lib/analytics.ts`:

| Event | Fires when |
| --- | --- |
| `waitlist-opened` | the waitlist modal is opened |
| `waitlist-submitted` | a waitlist signup succeeds |
| `blog-subscribed` | a blog subscription succeeds |
| `demo-redacted` | the demo runs a redaction |

`waitlist-opened` paired with `waitlist-submitted` gives the modal's conversion
rate.

**Never put personal data in an event payload.** `demo-redacted` sends a
detection *count* and nothing else — the demo's promise is that the text never
leaves the browser, and an analytics call is still leaving the browser. Do not
add the input text, the redacted output, detected values, or email addresses.

Changing what is measured means changing the privacy policy in the same commit:
`src/app/legal/privacy/page.tsx` enumerates these events explicitly.

## Privacy posture

- No cookies, no cross-site or cross-visit identifiers, no consent banner.
- Umami hashes IP + user agent into a rotating anonymous ID and discards the IP.
- `data-do-not-track="true"` is set, so visitors sending DNT are not recorded.
- Legal basis: legitimate interest (Art. 6(1)(f) GDPR).
- Stated retention: 24 months — **configure your Umami instance to match**, or
  the policy becomes untrue.
