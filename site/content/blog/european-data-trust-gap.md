---
title: "84% of Europeans Don't Trust US Tech With Their Data. Now What?"
date: "2026-04-14"
author: "euRedact Team"
description: "A new POLITICO survey shows overwhelming European distrust of US and Chinese tech companies handling personal data. For companies building data-intensive products in Europe, this isn't just a PR problem — it's an architecture problem."
tags: ["GDPR", "PII", "trust"]
---

A [POLITICO European Pulse survey](https://www.politico.eu/article/8-in-10-europeans-dont-trust-us-chinese-firms-with-data/) published last week put hard numbers on something most of us already suspected: Europeans do not trust foreign tech companies with their personal data.

The numbers are stark. Across six EU countries (Germany, France, Spain, Italy, Poland, Belgium), **84% of respondents said they distrust US tech companies** to handle their personal data responsibly. For Chinese firms, that number climbs to **93%**.

Even European tech companies only manage 51% trust. Your own national government? 45%.

## The country breakdown tells the story

Germany is the most sceptical. 91% distrust US companies with their data, and 98% distrust Chinese firms. That leaves essentially zero room for ambiguity about where German users stand.

At the other end, Poland shows the highest relative trust in US firms at 38% -- unsurprising given the transatlantic security alliance -- but even there, a clear majority doesn't trust American tech with their personal data.

Belgium leads on trust in European companies at 59%. But even in the most trusting market for homegrown tech, four out of ten Europeans still aren't confident their data is being handled responsibly.

The message from nearly 7,000 respondents across the EU's largest markets is consistent: **people care deeply about where their data goes and who processes it**.

## This isn't about regulation. It's about customers.

It's tempting to frame this purely as a regulatory story. GDPR, the Digital Markets Act, the Digital Services Act -- Brussels has been building the legal framework for years. TikTok's EUR 600 million GDPR fine, Google's EUR 4.3 billion penalty -- the enforcement is real.

But the survey reveals something more fundamental. This isn't regulators imposing rules on reluctant companies. This is customers telling you what they expect. 84% distrust isn't a policy position. It's a market signal.

If you're building a product that processes European personal data -- whether that's an HR platform, an insurance claims system, a healthcare application, or an AI pipeline -- your architecture choices are now customer-facing decisions. Where data is processed, what leaves your infrastructure, what third parties can access it -- these aren't just compliance checkboxes. They're trust signals that your users are actively evaluating.

## What this means for PII handling

For companies that process documents containing personal data, the trust gap creates a concrete engineering challenge: **how do you redact or anonymise PII without sending it somewhere your customers don't trust?**

The common approaches all have a trust problem:

- **US-hosted cloud NLP services** (AWS Comprehend, Google Cloud DLP): Your European customers' personal data is processed on US infrastructure, subject to the CLOUD Act. 84% of your users don't trust this.
- **General-purpose LLMs via API**: Even with EU-region hosting, you're sending raw personal data to a third-party model provider. The data leaves your control.
- **On-premise enterprise solutions**: High trust, but often prohibitively expensive and slow to deploy.

The gap in the market is clear: companies need PII detection that is effective, affordable, and keeps data under their control.

## How we think about this at euRedact

We didn't build euRedact because of this survey -- we started long before it. But the numbers validate the architecture decisions we made from day one.

**The open-source rules engine runs entirely locally.** When you install `euredact` from PyPI or npm, PII detection for structured entities (national IDs, tax numbers, IBANs, VAT numbers across 31 EU countries) happens in your process, on your infrastructure. No network calls. No data leaves your environment. Zero trust required in any third party, because no third party is involved.

```python
from euredact import redact

# This runs locally. Nothing leaves your machine.
result = redact(document_text)
```

**The cloud tier we're building is EU-hosted, and local-first by design.** The open-source rules engine strips all structured PII *before* anything reaches the cloud model. The LLM only ever sees partially-redacted text. National IDs, IBANs, tax numbers -- already gone before the document leaves your infrastructure.

This isn't a privacy feature bolted on after the fact. It's the core architecture: minimise what leaves your environment, and make sure what does leave it stays within the EU.

## Building for the trust your customers expect

The POLITICO survey confirms what the market has been signalling for years. European users want to know:

1. **Where is my data processed?** Not "which region did you select in your cloud console" -- where does it actually go?
2. **Who can access it?** Which third parties, which jurisdictions, which legal frameworks apply?
3. **What's the minimum necessary?** Are you sending my full document to an API, or only what's strictly needed?

These are reasonable questions. If your PII processing pipeline can't answer them clearly, you're asking 84% of your European users to trust you despite their instincts.

The tools to build trustworthy data processing in Europe exist today. The open-source euRedact SDK handles structured PII locally with sub-millisecond latency. The cloud tier for contextual PII (names, addresses, job titles) is coming soon, designed from the ground up around data minimisation and EU residency.

Your customers are telling you what they expect. The architecture should follow.
