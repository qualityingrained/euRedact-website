---
title: "Why European PII Redaction Is Harder Than You Think"
date: "2026-04-11"
author: "euRedact Team"
description: "US-built PII tools miss most European identifiers. Here's why redacting PII across 31 EU countries requires a fundamentally different approach — and what we're building to solve it."
tags: ["GDPR", "PII", "open-source", "NLP"]
---

If you've ever tried to redact personally identifiable information from European documents using tools like AWS Comprehend or Microsoft Presidio, you've probably noticed something uncomfortable: they miss a lot.

Not edge cases. Core identifiers. The Dutch BSN (*Burgerservicenummer*), the German Steuer-ID, the French NIR (*Numéro d'Inscription au Répertoire*), the Belgian rijksregisternummer — these are the social security numbers and tax IDs that millions of Europeans carry, and the most widely deployed PII tools in the world have no idea they exist.

This isn't a criticism of those tools. They were built for US data: SSNs, US phone formats, US address patterns. They're excellent at what they do. But if you're processing European documents under GDPR, "excellent at US data" isn't the bar you need to clear.

## The scale of the problem

Europe doesn't have one national ID format. It has 31.

Each EU/EEA country has its own structured identifiers — often multiple per country. The Netherlands has the BSN (9 digits, specific checksum). Germany has both the Steuer-ID (11 digits, check digit algorithm) and the Sozialversicherungsnummer (letter + 11 characters). France has the NIR (13 digits + 2-digit key, encoding gender, birth year, department, and commune). Belgium's rijksregisternummer encodes birth date and gender with a modulo-97 check.

And those are just the "simple" ones. Here's a taste of the variety:

| Country | Identifier | Format | Validation |
|---------|-----------|--------|------------|
| Netherlands | BSN | 9 digits | Elfproef (11-check) |
| Germany | Steuer-ID | 11 digits | Check digit algorithm |
| France | NIR | 13 + 2 digits | Modulo 97 with Corsica handling |
| Belgium | Rijksregisternummer | 11 digits | Modulo 97 (pre/post-2000) |
| Italy | Codice Fiscale | 16 alphanumeric | Complex encoding of name, birth, municipality |
| Spain | DNI/NIE | 8 digits + letter | Modulo 23 check letter |
| Poland | PESEL | 11 digits | Weighted checksum |
| Portugal | NIF | 9 digits | Modulo 11 check |
| Sweden | Personnummer | 10/12 digits | Luhn algorithm |
| Austria | Sozialversicherungsnummer | 10 digits | Weighted check digit |

That's 10 countries. We support 31. Each format has its own regex pattern, its own checksum algorithm, and its own edge cases (like France's special handling for people born in Corsica, or Belgium's different modulo calculation for people born before and after 2000).

Now multiply that by the other structured PII types that appear in European documents: IBANs (country-specific lengths and formats), VAT numbers (different prefixes and validation per country), driving licence numbers, passport numbers, health insurance identifiers. We're tracking over 30 entity types across those 31 countries.

## Why regex alone isn't enough (but you still need it)

Here's the core technical challenge. European PII falls into two distinct categories, and they require fundamentally different detection approaches.

### Structured PII: the regex + validation layer

Structured identifiers — national IDs, tax numbers, IBANs — follow predictable formats. A Dutch BSN is always 9 digits. A German Steuer-ID is always 11 digits. You can write regex patterns to find candidates and then validate them with checksum algorithms.

This is where euRedact's open-source rules engine lives. For every supported entity type, we have:

1. **A regex pattern** that finds candidates in text
2. **A checksum validator** that confirms whether a candidate is structurally valid
3. **Context-aware false-positive suppression** that reduces noise from random number sequences that happen to pass checksum validation

For example, detecting a Dutch BSN:

```python
from euredact import redact

text = "Mijn BSN is 123456782 en ik woon in Amsterdam."
result = redact(text)
print(result.text)
# "Mijn BSN is [BSN-1] en ik woon in Amsterdam."
```

The number `123456782` passes the [elfproef](https://nl.wikipedia.org/wiki/Elfproef) (eleven-test) checksum — it's a structurally valid BSN. But `123456789` would not pass and wouldn't be flagged as a BSN.

This approach gives us **99%+ recall on structured entities** with very low false-positive rates. The checksum validation is the key: it's what separates "this 9-digit number could be anything" from "this 9-digit number is mathematically consistent with the BSN format."

### Contextual PII: the NLP layer

But then there's the other half of the problem. European documents are full of PII that has no fixed format:

- **Person names**: "Müller", "van der Berg", "Papadopoulos", "Johansson"
- **Street addresses**: "Keizersgracht 123, 1015 CJ Amsterdam"
- **Job titles and roles**: "Directeur Financier", "Geschäftsführer"
- **Organizations**: "Gemeentebelastingen Rotterdam"

You can't write a regex for every Dutch surname. You can't enumerate every German street name. These entities require understanding *context* — the words around them, the structure of the sentence, the language being used.

This is fundamentally an NLP problem, and it's where traditional regex-based PII tools hit a wall. Presidio has basic NER support through spaCy, but its models weren't trained on European multilingual data. AWS Comprehend supports a handful of European languages but doesn't understand country-specific entity types.

## The two-layer architecture

This is why we're building euRedact as a two-layer system:

**Layer 1: Rules engine (open-source, runs locally)**
- Regex patterns + checksum validation for structured PII
- Sub-millisecond latency (~0.02ms per page)
- Zero network calls, zero dependencies
- 99%+ recall on structured entities
- Available now on [PyPI](https://pypi.org/project/euredact/) and [npm](https://www.npmjs.com/package/euredact)

**Layer 2: Fine-tuned LLM (cloud tier, coming soon)**
- Contextual detection for names, addresses, job titles
- Multilingual understanding across European languages
- Trained on annotated European PII datasets
- Runs as a second pass after the rules engine

The architecture is deliberately ordered. The rules engine runs first and strips all structured PII *before* any text reaches the LLM. This means:

1. The LLM never sees actual national IDs, tax numbers, or IBANs
2. The data sent to the cloud tier has already been partially redacted
3. If you're processing particularly sensitive documents, you can use Layer 1 alone — fully local, no network calls

This local-first design isn't just a privacy feature. It's a practical requirement for many GDPR compliance scenarios where data residency matters.

## Early results

We recently completed a multilingual evaluation of the two-layer system on a held-out test set of European documents spanning 12 languages. Here's where we are:

**Overall: 90.1% F1 score**

Breaking that down by entity category:

| Entity type | Precision | Recall | F1 |
|------------|-----------|--------|----|
| Structured IDs (BSN, Steuer-ID, etc.) | 100 | 100 | 100 |
| IBAN | 100 | 100 | 100 |
| PERSON_NAME | 93 | 97 | 95 |
| STREET_ADDRESS | 100 | 100 | 100 |
| EMAIL | 100 | 100 | 100 |
| PHONE_NUMBER | 98 | 95 | 96 |
| DATE_OF_BIRTH | 88 | 85 | 86 |

The structured entities are at perfect scores — this is the rules engine doing what it does best with deterministic checksum validation. The contextual entities (names, addresses) show strong performance from the fine-tuned LLM second pass, with person names at F1 95 and street addresses at F1 100.

The weak spot is date-of-birth detection (F1 86), where the challenge is distinguishing birth dates from other dates that appear in documents (document dates, event dates, deadline dates). This is an area we're actively improving.

We're being transparent about these numbers because we think the PII detection space has too much hand-waving. If a tool claims "99% accuracy" without specifying what entity types, what languages, and what test methodology — that number is meaningless.

## What's next

We're building toward a cloud tier that will be available in the coming months:

- **EU-hosted inference**: The LLM runs on EU infrastructure. No data leaves the EU.
- **Local-first architecture**: Structured PII is stripped by the open-source rules engine before anything reaches the cloud. The LLM only sees partially-redacted text.
- **Pay-per-document pricing**: No seat licenses, no minimums. You pay for what you process.
- **Self-hosted option**: For organizations that need everything on-premises, we'll offer the fine-tuned model for local deployment.

The open-source rules engine is available today. If you're processing European documents and need reliable detection of structured identifiers — national IDs, tax numbers, IBANs, VAT numbers — it works out of the box:

```bash
pip install euredact
```

```python
from euredact import redact

text = """
Patient: Jan de Vries
BSN: 123456782
IBAN: NL91ABNA0417164300
Adres: Keizersgracht 123, 1015 CJ Amsterdam
"""

result = redact(text)
print(result.text)
```

If you're interested in the cloud tier with LLM-powered contextual detection, [join the waitlist](/pricing) or check out the [GitHub repo](https://github.com/euRedact/euRedact).

Building PII redaction for Europe is hard. We think being honest about what's hard — and showing real numbers — is the right way to build trust with the developers who need these tools.
