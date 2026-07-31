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
   control, e.g. `analytics.euredact.dev`. Keeping it on your own domain is the
   entire point — do not use Umami Cloud without revisiting the privacy policy,
   since that reintroduces a third-party processor.

2. **Add the website in Umami** (Settings → Websites) and copy its website ID.

3. **Set two repository variables** in GitHub: Settings → Secrets and variables →
   Actions → **Variables** (not Secrets — both values are public in the page
   source anyway):

   | Variable | Example |
   | --- | --- |
   | `NEXT_PUBLIC_UMAMI_SRC` | `https://analytics.euredact.dev/script.js` |
   | `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | the UUID from step 2 |

4. **Re-run the deploy workflow.** The values are inlined at build time, so
   analytics only appears in builds made after the variables are set — changing
   them requires a rebuild, not just a redeploy.

For local development, copy `.env.example` to `.env.local`.

## Server runbook (Scaleway)

Step 1 above in detail. Sizing: **DEV1-S** (2 vCPU, 2 GB RAM) in `fr-par` or
`nl-ams`. Umami needs ~300–500 MB and Postgres another ~200–400 MB, so 1 GB
instances only fit with swap and a tuned `shared_buffers` — not worth the €6.
Pageview data is tiny; 20 GB lasts years at this traffic.

### 1. Instance and DNS

Create the Instance with Ubuntu 24.04 LTS, your SSH key, and a public IPv4
(billed separately). Then add a DNS record at your registrar:

    A    analytics.euredact.dev    <instance IP>

This is a subdomain and does not touch the apex records pointing `euredact.dev`
at GitHub Pages.

### 2. Harden before exposing anything

```bash
adduser deploy && usermod -aG sudo deploy
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy   # copy the key up
sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin no/;s/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl restart ssh

ufw default deny incoming && ufw allow OpenSSH && ufw allow 80 && ufw allow 443 && ufw enable
apt update && apt full-upgrade -y
apt install -y unattended-upgrades && dpkg-reconfigure -plow unattended-upgrades
```

Unattended upgrades are not optional here. This box is attack surface on a
subdomain of the site whose whole argument is data protection.

Check the Scaleway **security group** allows 80/443 as well — it is a second
firewall in front of `ufw`.

### 3. Umami and Postgres

`/opt/umami/docker-compose.yml`:

```yaml
services:
  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    restart: unless-stopped
    ports: ["127.0.0.1:3000:3000"]   # localhost only; Caddy fronts it
    environment:
      DATABASE_URL: postgresql://umami:${DB_PASSWORD}@db:5432/umami
      DATABASE_TYPE: postgresql
      APP_SECRET: ${APP_SECRET}
    depends_on:
      db: { condition: service_healthy }
  db:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_DB: umami
      POSTGRES_USER: umami
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes: ["umami-db:/var/lib/postgresql/data"]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U umami"]
      interval: 10s
      retries: 5
volumes:
  umami-db:
```

`/opt/umami/.env` — generate both, never reuse:

```bash
printf 'DB_PASSWORD=%s\nAPP_SECRET=%s\n' "$(openssl rand -base64 24)" "$(openssl rand -base64 32)" > .env
chmod 600 .env
```

Binding to `127.0.0.1:3000` matters: without it Docker punches through `ufw`
and publishes Umami unencrypted on the public interface.

### 4. TLS

Caddy gets certificates automatically. `/etc/caddy/Caddyfile`:

```
analytics.euredact.dev {
    reverse_proxy 127.0.0.1:3000
}
```

### 5. First run

Log in with `admin` / `umami` and **change the password immediately** — the
default is public knowledge and the box is now internet-facing. Then add the
website and copy its ID for `NEXT_PUBLIC_UMAMI_WEBSITE_ID`.

### 6. Retention — required, not optional

Self-hosted Umami has **no built-in retention**: it keeps data forever unless
you delete it. The privacy policy promises 24 months, so without this the
published policy is untrue. A monthly cron:

```cron
0 4 1 * * docker exec umami-db-1 psql -U umami -d umami -c \
  "DELETE FROM event_data     WHERE created_at < now() - interval '24 months'; \
   DELETE FROM website_event  WHERE created_at < now() - interval '24 months'; \
   DELETE FROM session_data   WHERE created_at < now() - interval '24 months';"
```

Verify the table names against your version first (`\dt` in psql) — the schema
has changed between Umami releases, and a delete against a renamed table fails
silently from cron. Check it actually ran after the first month.

### 7. Backups

Umami data is small enough that a nightly `pg_dump` to Scaleway Object Storage,
or a scheduled volume snapshot, is plenty. Losing it costs you history, not
anything a visitor cares about.

## What is measured

Pageviews, referrer, country, and browser/device type — all aggregate — plus
six conversion events, defined as a closed set in `src/lib/analytics.ts`:

| Event | Payload | Fires when |
| --- | --- | --- |
| `waitlist-opened` | — | the waitlist modal is opened |
| `waitlist-submitted` | — | a waitlist signup succeeds |
| `blog-subscribed` | — | a blog subscription succeeds |
| `demo-redacted` | `detectionCount` | the demo runs a redaction |
| `playground-engaged` | — | the visitor first takes the homepage playground off its scripted demo |
| `coverage-filtered` | `layer` or `tier` | a filter button on /docs/coverage is chosen |

`waitlist-opened` paired with `waitlist-submitted` gives the modal's conversion
rate.

The last two exist because the pages they sit on are each a single pageview
however long someone spends there, so engagement is invisible to pageview
metrics and indistinguishable from a bounce. `playground-engaged` fires once per
page load and is tied to *taking over*, not to a redaction: the playground
auto-runs a scripted demo on a loop, so a per-redaction event would count the
animation rather than a person.

**Never put personal data in an event payload.** `demo-redacted` sends a
detection *count* and nothing else — the demo's promise is that the text never
leaves the browser, and an analytics call is still leaving the browser. Do not
add the input text, the redacted output, detected values, or email addresses.

The same rule is why `playground-engaged` has no payload at all. A count of what
was detected in someone's pasted text is still a fact about that text, and the
playground is the one surface where a visitor is actively invited to paste real
personal data. `coverage-filtered` carries a value from the closed `Layer`/`Tier`
unions rendered as buttons on the page — never anything a visitor supplied.

Changing what is measured means changing the privacy policy in the same commit:
`src/app/legal/privacy/page.tsx` enumerates these events explicitly.

## Privacy posture

- No cookies, no cross-site or cross-visit identifiers, no consent banner.
- Umami hashes IP + user agent into a rotating anonymous ID and discards the IP.
- `data-do-not-track="true"` is set, so visitors sending DNT are not recorded.
- Legal basis: legitimate interest (Art. 6(1)(f) GDPR).
- Stated retention: 24 months — Umami does **not** enforce this itself, so the
  cron job in the runbook above is what makes the claim true. Without it, data
  is kept forever and the published policy is wrong.
