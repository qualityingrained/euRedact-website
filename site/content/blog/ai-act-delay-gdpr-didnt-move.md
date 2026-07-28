---
title: "The EU Just Delayed the AI Act. Your Data Obligations Didn't Move."
date: "2026-07-17"
author: "euRedact Team"
description: "Two weeks before the AI Act's biggest compliance deadline, Brussels pushed high-risk obligations back by 16 months. Here's what actually changed, what didn't — and why reading this as 'compliance can wait' is the most expensive mistake you could make with it."
tags: ["EU AI Act", "GDPR", "PII", "compliance"]
---

For the past year, 2 August 2026 has been circled in red on every European compliance calendar. That's the date the EU AI Act's most consequential obligations — the high-risk system requirements, conformity assessments, CE marking — were due to apply.

Two weeks before the deadline, Brussels blinked.

On 29 June, the [Council of the EU gave its final green light](https://knowledge.dlapiper.com/dlapiperknowledge/globalemploymentlatestdevelopments/2026/The-Digital-AI-Omnibus-Proposed-deferral-of-high-risk-AI-obligations-under-the-AI-Act) to the Digital Omnibus on AI, following the European Parliament's formal endorsement on 16 June. Publication in the Official Journal is expected in July, just ahead of the original deadline. The headline change: **obligations for high-risk AI systems under Annex III are deferred by 16 months, from 2 August 2026 to 2 December 2027**. AI embedded in regulated products under Annex I gets until [2 August 2028](https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/).

If your product touches hiring, credit scoring, insurance, education, or essential services — the Annex III categories — you just got a year and a half of breathing room.

> [!NOTE]
> Before you exhale: it's worth being precise about what got delayed. Because the most important thing about this delay is what it _doesn't_ cover.

## What actually changed

The Omnibus is a package, not a single postponement. The pieces worth knowing:

- **Annex III high-risk systems** (use-based: employment, credit, insurance, education, essential services): 2 August 2026 → **2 December 2027**.
- **Annex I high-risk systems** (AI as a safety component of regulated products — medical devices, machinery, lifts): 2 August 2027 → **2 August 2028**. The definition of "safety component" is also [narrowed](https://www.traverssmith.com/knowledge/knowledge-container/eu-agrees-to-delay-key-ai-act-compliance-deadlines/): AI that merely assists users or optimises performance without creating health or safety risks falls out of scope.
- **Article 50 transparency** (machine-readable marking of AI-generated content): deferred by only [four months, to 2 December 2026](https://www.insideglobaltech.com/2026/05/28/eu-ai-act-update-timeline-relief-targeted-simplification-and-new-prohibitions/) — and only for systems already on the market before 2 August 2026. **Systems placed on the market after 2 August 2026 must comply from day one.**
- **New prohibitions**: the package adds AI-generated non-consensual intimate imagery and CSAM to the Article 5 banned list. Prohibitions were already in force and remain so.

Notice the shape of this. The heavyweight system obligations moved by 16 months. The transparency obligations barely moved, and for new systems they didn't move at all.

## Why the delay happened

This wasn't generosity. The [harmonised standards](https://responsibleailabs.ai/knowledge-hub/articles/eu-ai-act-august-2026-compliance) that companies need in order to demonstrate compliance — being drafted by over a thousand experts across CEN/CENELEC working groups — are badly behind schedule. The first of them may not be published until late 2026, months _after_ the original compliance date. Regulators were about to enforce obligations against standards that didn't exist.

The demand side was no better prepared: as of April, [78% of organisations had not taken meaningful steps](https://responsibleailabs.ai/knowledge-hub/articles/eu-ai-act-august-2026-compliance) toward high-risk compliance.

In other words: the runway got longer because the runway hadn't been built. The destination didn't change. Every obligation that was coming on 2 August 2026 is still coming — with a penalty ceiling of 7% of global turnover, which the EU deliberately set _above_ GDPR's 4%.

## What didn't change: everything about your data

Here's the part that matters if you process personal data — which, if you're building with AI, you almost certainly do.

The Omnibus delayed AI _system_ obligations. It did not touch data protection. GDPR applies today, exactly as it did last month, and the enforcement trend is going one direction. Cumulative fines have [passed €7.1 billion](https://globallawexperts.com/gdpr-enforcement-2026-record-fines-mean/) across more than 2,200 decisions, with a large share of that concentrated in the last two years. The biggest fine of 2025 — [€530 million against TikTok](https://www.uniconsent.com/blog/gdpr-enforcement-fines-2026) — was about unlawful data transfers. The first half of 2026 has been among the most active periods for GDPR litigation and enforcement since the regulation took effect.

So the honest summary of this summer's regulatory news is: **the AI layer got a delay; the data layer never did.**

That distinction is easy to blur inside an organisation. "The EU pushed the AI deadlines back" travels through a company as "the EU compliance stuff is postponed." It isn't. If your AI pipeline ingests documents containing names, national ID numbers, health details, or bank accounts, the rules governing that data have no December 2027 on them. They have _now_ on them.

## The quiet trap in the fine print

Two details in the Omnibus deserve more attention than they're getting.

First, the Article 50 day-one rule. If you ship an AI system that generates or manipulates content _after_ 2 August 2026, the transparency obligations apply immediately — no grace period. The deferral rewards systems already on the market, not systems launching this autumn.

Second, the standards linkage. The delay is explicitly tied to the availability of harmonised standards. When those standards land — the first are expected [toward the end of this year](https://responsibleailabs.ai/knowledge-hub/articles/eu-ai-act-august-2026-compliance) — the clock that feels comfortably long today will start feeling short. Sixteen months is generous for organisations that use the time. For the 78% that hadn't started, it's an invitation to not start for another year, and then relive this spring's panic in mid-2027.

## What this means if you're building with AI in Europe

The practical reading, in order of urgency:

1. **Your GDPR posture is the compliance work with no deferred deadline.** What personal data enters your AI pipeline? What's your lawful basis? Can you minimise what the model ever sees? These questions were due before the Omnibus, and they're due after it.
2. **Data minimisation is the cheapest insurance across both regimes.** The less personal data flows into your AI systems, the smaller your exposure under GDPR today _and_ the simpler your AI Act documentation burden in 2027. It's the rare control that pays out twice.
3. **Use the 16 months, don't bank them.** If you're in Annex III territory, the delay is time to build risk management and documentation properly — against real standards, once they exist — instead of retrofitting under deadline pressure.

## How we think about this at euRedact

euRedact is a data processing utility, not a high-risk AI system — redaction removes identifiers rather than using them to make decisions about people. Nothing in the Omnibus changes our obligations, and nothing in it changes yours regarding the personal data in your documents.

Which is precisely the point. The layer of the stack we work on — stripping personal data out of text before it goes anywhere — is governed by the law that never got a delay.

The open-source rules engine detects and redacts structured European PII (national IDs, IBANs, tax numbers, VAT numbers across 31 EU/EEA countries) entirely locally, before anything leaves your infrastructure:

```python
from euredact import redact

# Runs locally. The data-minimisation step with no deferred deadline.
result = redact(document_text)
```

The cloud tier for contextual PII — names, addresses, the entities that need language understanding — is where the second layer comes in, EU-hosted and local-first by design: structured identifiers are already gone before any text reaches the model. We're currently testing the **second generation of our proprietary redaction model**, and the improvements we're observing over the first generation are significant — across detection quality, training methodology, and evaluation rigour. We'll publish benchmark numbers in the coming weeks, broken down per entity type and language.

Brussels gave Europe's AI builders more time this summer. It gave your users' data none. Build accordingly.
