---
title: "You Can't Leak What You Don't Hold"
date: "2026-08-19"
author: "euRedact Team"
description: "This year, two of Europe's most security-conscious institutions were hit by breaches — one through a zero-day no patch existed for. The lesson isn't that anyone failed at security. It's that the size of a leak is decided years before the attacker shows up, by how much data you keep. Data minimisation is attack surface reduction."
tags: ["GDPR", "PII", "security", "data-minimisation"]
---

In March, the European Commission [confirmed a cyber-attack](https://www.infosecurity-magazine.com/news/european-commission-cloud-data/) on the cloud infrastructure hosting the europa.eu platform. The extortion group ShinyHunters claimed more than 350 GB of material, including employee personal data, documents, and contracts. The Commission said internal systems were unaffected and began notifying the Union entities that might be involved.

In June, the Council of Europe — the Strasbourg-based human rights organisation, a separate body from the EU with 46 member states — said it was [investigating claims](https://www.bleepingcomputer.com/news/security/council-of-europe-investigates-shinyhunters-data-breach-claims/) by the same group. The alleged haul: over 409,000 payslips covering more than 10,000 staff, over 14,000 CVs, and over 3,700 personnel files — reportedly including bank details, social security information, and medical data. The claims remain under investigation and unverified.

It would be easy to read these incidents as a story about institutions failing at security. That reading is wrong, and it misses the only lesson worth taking.

## These were not preventable in the way you think

The Council of Europe intrusion is attributed to the [Oracle PeopleSoft zero-day campaign](https://www.securityweek.com/shinyhunters-claims-council-of-europe-hack/) that compromised more than a hundred organisations this year — universities, companies, public bodies. A zero-day means the vulnerability was unknown to the vendor. There was no patch to apply, no advisory to act on. The organisations hit were not negligent; they were running enterprise software that turned out to have a hole nobody knew about.

And European institutions are among the most heavily attacked organisations on the planet. They defend against state actors, organised crime, and hacktivists, continuously, with serious security teams. If a determined attacker with an unknown vulnerability can get into *their* systems, the honest conclusion is not "they should have tried harder." It's this:

> [!RISK]
> Perimeter defence eventually fails. For every organisation. The variable you actually control is not *whether* an attacker ever gets in — it's *what they find when they do*.

## The number that matters is fifteen years

Look past the group names and the gigabyte counts. The detail that decides how bad the Council of Europe claims would be, if confirmed, is this one: the alleged payslip archive spans **2011 to 2026**.

Fifteen years of payroll, reachable from one compromised system. Every additional year of records kept online added to the blast radius — silently, long before any attacker showed up. The breach happened in 2026, but its *size* was determined by retention decisions made over a decade.

This is the frame shift: we talk about attack surface as a network and software problem — open ports, unpatched services, exposed APIs. But **data is attack surface too**. Every record you hold is something that can be taken. Every copy multiplies the exposure: the same logic played out this summer when [Steam customers across Europe](https://www.safestate.com/post/steam-data-breach-hits-european-customers-after-shipping-partner-hack) and [Trezor buyers](https://www.bloomberg.com/news/articles/2026-08-13/crypto-firm-trezor-says-data-breach-exposed-thousands-of-clients) had their names and home addresses stolen not from the companies they bought from, but from shipping partners holding copies of their data.

You can't firewall your way out of holding too much.

## GDPR already told you this — as a security control

Two of the least glamorous principles in the GDPR are [data minimisation](https://gdpr-info.eu/art-5-gdpr/) (Article 5(1)(c): collect and keep only what's necessary) and storage limitation (Article 5(1)(e): don't keep it longer than needed). They're usually filed under compliance paperwork.

They are better understood as security controls — arguably the only ones that keep working *after* the perimeter fails. Encryption can be bypassed with stolen credentials. Access controls don't help when the attacker is inside the HR system itself. But a record that was deleted in 2019, or an archive whose identifiers were stripped out, yields nothing. It isn't there to steal.

> [!CAVEAT]
> "Just delete old records" collides with real retention obligations — payroll and personnel data often must be kept for years under national labour and tax law. But a legal duty to *retain* a record is not a duty to keep it in the production system, online, fully identified, one query away from fifteen years of colleagues' bank details. Retention and exposure are separate decisions.

## What minimising your data surface actually looks like

1. **Map where personal data accumulates.** Not where it's collected — where it *piles up*: HR archives, CRM exports, support tickets, log files, mailboxes, backups, and every third party you ship data to. The accumulation points are the blast radius.
2. **Delete what nothing requires you to keep.** Expired retention periods, duplicate exports, "just in case" copies. Each deletion is permanent attack surface reduction — it costs nothing to maintain and no zero-day can undo it.
3. **Redact or pseudonymise what you must keep.** Archives usually need to prove *what happened*, not *to whom, reachable by name and IBAN*. A ten-year-old personnel file with identifiers stripped still serves audit and statistics; it just no longer harms anyone when it leaks.
4. **Minimise what leaves your infrastructure.** Third parties, analytics pipelines, AI systems: send the minimum, strip identifiers first. A processor can't leak what you never sent them.
5. **Move what remains out of reach.** Records inside a legal retention window that aren't operationally needed belong in segmented cold storage, not in the live system sharing credentials with everything else.

Notice that only the last item is traditional security work. The first four are data hygiene — and they're the ones that would have shrunk this year's incidents from "fifteen years of everything" to a fraction of that, no zero-day foresight required.

## Where euRedact fits

Step 3 is the one organisations skip, because manually stripping identifiers from years of accumulated documents is nobody's idea of a feasible project. It's precisely the job we build for.

The open-source rules engine detects and redacts structured European PII — national IDs, IBANs, tax numbers, VAT numbers across 31 EU/EEA countries — entirely locally, so the minimisation step doesn't itself become another data transfer:

```python
from euredact import redact

# Runs locally. Every identifier removed is attack surface gone.
result = redact(document_text)
```

For contextual PII — names, addresses, the entities that need language understanding — the EU-hosted cloud tier takes over, local-first by design: structured identifiers are already gone before any text reaches the model.

Nobody gets to choose whether they'll ever be breached — this year made that clear at the highest levels of European public life, against institutions with better defences than most of us will ever run. What every organisation *does* get to choose, starting now, is how much fifteen-years-deep data is sitting there when it happens.

Choose smaller.
