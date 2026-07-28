---
title: "The PII Leak You're Probably Not Watching: Your Log Files"
date: "2026-05-11"
author: "euRedact Team"
description: "Log files are one of the most persistent and underappreciated sources of PII leakage in production systems. Here's what ends up in them, how it gets there, and what you can do about it."
tags: ["GDPR", "PII", "logging", "security", "engineering"]
---

When people talk about PII breaches, they think of the spectacular failures — a misconfigured S3 bucket, a stolen credential, a ransomware payload dropped into a hospital network. These make headlines. They have identifiable victims, and identifiable costs.

Log files don't make headlines. But they're one of the most persistent, widespread, and quietly exploitable sources of PII leakage in production systems — and most engineering teams either don't know what's in them, or know and have quietly decided not to deal with it.

> [!RISK]
> That's a problem. And under GDPR, it's a liability.

## How PII gets into logs in the first place

It's almost never deliberate. Logs accumulate PII through mundane, well-intentioned decisions that compound over time.

**Debugging under pressure.** When something breaks in production at 2am, the fastest fix is to log everything — request bodies, response payloads, user context — so you can reproduce the issue. The diagnostic code gets committed. The incident gets resolved. The logging stays.

**Framework defaults.** Many web frameworks log full HTTP request and response bodies by default, or log exception stack traces that include the data that triggered the error. A validation failure on a form submission? Your log now contains whatever the user typed into that form — including, potentially, their national ID number, date of birth, or bank account details.

**Free-form input fields.** This is the one that catches even careful teams. You might have a perfectly clean logging policy for structured fields. But if a user types their BSN into a "notes" or "reference" field — because your form didn't stop them — and you log that field, you've logged their BSN. You didn't intend to. The user didn't intend to. It happened anyway.

**Third-party libraries.** SDKs for payment processors, analytics platforms, and identity providers sometimes log more than you expect. The logging happens inside code you don't control, to destinations you may not be monitoring.

The result is that log files in most production systems are an informal, unstructured, semi-random archive of PII that accumulates faster than anyone cleans it up.

## What actually ends up in there

The range is wider than most teams assume. Based on the patterns we see when scanning European document and application data — and consistent with what the broader industry reports — common log file contents include:

- **Authentication data**: Usernames, email addresses, session tokens, and — more often than you'd hope — plaintext or lightly-encoded passwords from failed login attempts. According to the [2025 Verizon Data Breach Investigations Report](https://www.verizon.com/business/resources/reports/dbir/), stolen credentials were the most common initial access vector, used in 22% of breaches — many of those credentials originating from exactly this kind of log exposure.
- **Structured national identifiers**: Dutch BSNs, French NIRs, German Steuer-IDs, Belgian rijksregisternummers — especially if your application processes any kind of government form, insurance document, or HR record.
- **Financial identifiers**: IBANs, partial card numbers, transaction references.
- **Contact data**: Email addresses and phone numbers from form submissions or API calls. The [2025 IBM Cost of a Data Breach Report](https://www.ibm.com/reports/data-breach) found that customer PII was the most frequently compromised data type, involved in 53% of all breaches.
- **IP addresses and device fingerprints**: Technically PII under GDPR when they can be linked to an individual, and almost always present in access logs.
- **Health information**: Diagnosis codes, prescription references, appointment details — from healthcare or insurance applications where these flow through request parameters or response bodies.
- **Free-text PII**: Names, addresses, and dates of birth buried in note fields, search queries, or error messages.

The last category is the hardest to control. You can write a policy that says "don't log national ID fields." You cannot easily write a policy that catches every way a user might type their national ID into a field that wasn't designed for it.

## Why this matters more than a theoretical risk

It would be convenient to treat log file PII as a theoretical concern — something to note in your risk register and revisit later. There are at least three reasons that's the wrong call.

**Logs are targeted by attackers.** Because logs aggregate data from across an entire system, they're a high-value target. A single log file from a busy application server might contain authentication credentials, personal details for thousands of users, and session tokens that are still valid. The stakes are real: [IBM's 2024 report](https://newsroom.ibm.com/2024-07-30-ibm-report-escalating-data-breach-disruption-pushes-costs-to-new-highs) put the global average cost of a data breach at $4.88 million, with credential-based breaches taking an average of 292 days to identify and contain — the longest of any attack vector studied. A real-world illustration: in 2019, researchers at vpnMentor discovered [an unsecured server exposing 85.4 gigabytes of security audit logs](https://latesthackingnews.com/2019/06/02/pyramid-hotel-group-exposed-85gb-of-hotel-security-logs/) belonging to the Pyramid Hotel Group, which manages multiple Marriott-branded properties. The exposed logs, generated by the Wazuh intrusion detection system, contained employee names, usernames, IP addresses, login attempts, firewall configurations, and application errors — all sitting open on the internet, no credentials required.

**Log access is often too broad.** In most organisations, application logs are accessible to a much wider set of people than the underlying database. Developers need them for debugging. Operations teams need them for monitoring. Third-party monitoring tools ingest them. Every integration point is a potential exposure path. The [2025 Verizon DBIR](https://www.verizon.com/business/resources/reports/dbir/) found that 60% of breaches involved the human element — errors, misuse, and social engineering — meaning that broad internal access to sensitive log data creates insider risk as well as external attack surface.

**GDPR doesn't distinguish between "intentional" and "accidental" data storage.** If your logs contain a user's BSN, that BSN is personal data under GDPR, regardless of how it got there. You need a lawful basis to hold it, a retention policy that's actually enforced, and the ability to fulfil subject access and deletion requests against it. Most teams cannot do any of these things for their log data, because they don't know what's in it. Regulators are increasingly aware of this gap: according to the [CMS GDPR Enforcement Tracker Report 2024/2025](https://cms.law/en/int/publication/gdpr-enforcement-tracker-report/numbers-and-figures), a total of 2,245 fines have been recorded since 2018, amounting to over €5.65 billion — and enforcement is intensifying, not slowing down.

The underlying vulnerability class is long-established. [CWE-532](https://cwe.mitre.org/data/definitions/532.html) — "Insertion of Sensitive Information into Log File" — was formally catalogued by MITRE in 2006. Nearly twenty years on, it remains one of the most widespread and underaddressed weaknesses in production software, with new CVEs filed against it regularly across major frameworks and platforms.

## The European dimension

For teams processing European data, the log file problem has an additional layer of complexity: the PII that ends up in logs is often the structured, high-value kind.

National identifiers — BSNs, NIRs, Steuer-IDs, PESEL numbers — are precisely the type of data that flows through insurance platforms, HR systems, healthcare applications, and government-facing services. These are the applications that tend to have the most logging, because they're complex, high-stakes, and heavily regulated in ways that create audit requirements.

The irony is real: the compliance requirement to maintain audit logs can, if implemented carelessly, result in those same logs containing the most sensitive personal data in your system.

And as we've written about before, [84% of Europeans distrust US tech companies with their personal data](/blog/european-data-trust-gap) — a finding from a POLITICO European Pulse survey covering six EU countries. When logs are shipped to a US-based SIEM, or ingested by a US-hosted observability platform, that distrust is warranted. The data is leaving European jurisdiction. The CLOUD Act applies. Your users' national ID numbers, if they're in those logs, are accessible in ways your users did not consent to.

## What you can actually do about it

There's no single fix. The log file PII problem is an accumulation of small decisions made across an entire engineering organisation over time. Solving it requires working at multiple levels.

**At the application layer: log less.**

The most reliable way to keep PII out of logs is not to put it there. Audit your logging calls. Replace raw user-submitted values with internal identifiers wherever possible — if you need to trace a request, a session ID or transaction reference is usually sufficient. Never log authentication credentials, even on failure. If you're logging exception details, ensure your exception handling sanitises the data before it reaches the logger.

The principle is simple: log what you need to operate the system, not what you happened to have available.

**At the ingestion layer: detect and redact before logs are stored.**

For structured PII — national IDs, IBANs, tax numbers — deterministic detection is possible and fast. A Dutch BSN can be identified by its format and validated with the elfproef checksum in a fraction of a millisecond. A French NIR can be detected by its 13+2 digit structure. These detections don't require an LLM. They don't require a network call. They run locally, in your logging pipeline, before data is written to disk or shipped to your observability platform.

This is exactly what [euRedact's open-source rules engine](https://github.com/euRedact/euRedact) does. Install it, pipe your log lines through it, and structured PII is redacted before it ever reaches storage:

```python
from euredact import redact

# In your logging pipeline, before writing to disk or shipping to your SIEM:
sanitised_line = redact(raw_log_line).text
logger.write(sanitised_line)
```

For contextual PII — names, addresses, free-text fields — the problem is harder, and that's where our forthcoming cloud tier (EU-hosted, local-first by design) adds the second detection pass. But even the rules engine alone eliminates the highest-risk structured identifiers.

**At the retention layer: enforce what you say you enforce.**

Most organisations have log retention policies. Far fewer have log retention policies that are actually enforced automatically. Logs accumulate. Storage is cheap. The audit requirement says "keep for six years" and nobody questions whether the logs from seven years ago have actually been deleted.

If you're subject to GDPR, log retention is a data retention question. The same rules apply. Implement automated deletion. Verify it runs. Treat logs like you treat your database when it comes to subject access requests — because under GDPR, you have to.

**At the access layer: treat logs like sensitive data.**

Logs that contain PII are sensitive data. They should have access controls that reflect this. Not every developer needs access to production logs. Log aggregation platforms should be evaluated for their data residency and access control posture, the same way you'd evaluate a database provider.

## The honest version of the problem

The root cause of most log file PII leakage isn't malice or ignorance. It's the reasonable, human tendency to optimise for operational visibility in the short term without accounting for the privacy implications in the long term.

That's understandable. It's also fixable — if you treat it as an engineering problem rather than a compliance footnote.

Start with what's in your logs. You may not know. Running your existing log data through a structured PII detector is a useful first step, and often a sobering one. What you find will tell you where to focus.

The open-source euRedact rules engine is available now on [PyPI](https://pypi.org/project/euredact/) and [npm](https://www.npmjs.com/package/euredact). It detects and redacts structured PII across 31 EU/EEA countries, runs entirely locally, and adds sub-millisecond latency per document. If you're processing European data, it's a reasonable place to start.

Your logs know more about your users than you think. That's worth taking seriously.

---

*Sources: [Verizon 2025 DBIR](https://www.verizon.com/business/resources/reports/dbir/) · [IBM Cost of a Data Breach Report 2025](https://www.ibm.com/reports/data-breach) · [IBM Cost of a Data Breach Report 2024 press release](https://newsroom.ibm.com/2024-07-30-ibm-report-escalating-data-breach-disruption-pushes-costs-to-new-highs) · [MITRE CWE-532](https://cwe.mitre.org/data/definitions/532.html) · [CMS GDPR Enforcement Tracker Report 2024/2025](https://cms.law/en/int/publication/gdpr-enforcement-tracker-report/numbers-and-figures) · [Pyramid Hotel Group log exposure, Latest Hacking News (2019)](https://latesthackingnews.com/2019/06/02/pyramid-hotel-group-exposed-85gb-of-hotel-security-logs/) · [POLITICO European Pulse survey on data trust](/blog/european-data-trust-gap)*
