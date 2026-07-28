---
title: "Our Second-Generation Model More Than Halved Its Misses. Here's the Data — and Why We're Not Publishing Recall Percentages Yet."
date: "2026-07-22"
author: "euRedact Team"
description: "The second-generation euRedact redaction model is through its first full evaluation run. Raw potential misses per document dropped 54% versus the first generation, with the biggest gains on exactly the entity types that matter most under GDPR. Here's what the numbers show, what changed under the hood, and why the headline benchmark is still a few weeks out."
tags: ["NLP", "product-update", "PII", "evaluation"]
---

In April we [wrote about our first custom PII detection model](/blog/first-model-milestone) and promised benchmark numbers once we were further along. Two weeks ago we said those numbers were coming, [broken down per entity type and language](/blog/ai-act-delay-gdpr-didnt-move).

We've now completed the first full evaluation run of the second-generation model. The short version: **it's a substantial improvement, the raw data below shows where, and we're deliberately holding the per-entity recall and precision tables for a few more weeks** — for a reason we think you'll agree with once we explain it.

## What changed between the first and second generation

Both generations share the same fundamentals: a model fine-tuned to do one thing well — find contextual PII in European documents — trained on full documents and running inference on full documents, exactly as it does in production. What changed is the data it learns from, and how deliberately we scoped it.

**We narrowed the language focus from broad multilingual coverage to four languages: English, French, German, and Dutch.** The first generation spread its training data across many languages; the second generation concentrates everything on the four languages of our launch markets — the Benelux, Germany, France, and the international-business English that flows through all of them. Depth beat breadth, and the numbers below reflect it. Additional languages will follow the same playbook once these four meet the bar, rather than all of them advancing at half speed together.

One important clarification: this narrowing applies to the *contextual model only*. The open-source rules engine still detects structured identifiers — national IDs, IBANs, tax numbers, VAT numbers — across all 31 EU/EEA countries, because checksum validation doesn't care what language the surrounding sentence is in.

**We rebuilt the training data.** Insurance correspondence, HR files, government forms, banking letters, security questionnaires, software bug reports — with a cleaned-up entity taxonomy and a systematic pass to fix the labelling issues the first generation exposed. As we wrote in April: a good chunk of the first model's "failures" turned out to be problems with the labels, not the model. The second generation trains on data that has been through that reckoning.

## The evaluation run

The second-generation model was evaluated against a substantially larger held-out test set than the first generation, with every disagreement between the model's output and the reference labels logged individually: every entity the model potentially missed, and every entity it flagged that the labels didn't contain.

Here's the raw, unfiltered comparison of potential misses per document:

| Entity type | 1st gen (Apr 2026) | 2nd gen (Jul 2026) | Change |
|---|---|---|---|
| **All entity types** | **5.2 / doc** | **2.4 / doc** | **−54%** |
| Person names | 1.12 | 0.36 | −68% |
| Street addresses | 0.92 | 0.12 | −87% |
| Organisation names | 0.60 | 0.55 | −9% |
| Financial amounts | 0.58 | 0.14 | −75% |
| Job titles | 0.40 | 0.45 | +13% |
| Internal reference IDs | 0.36 | 0.22 | −40% |
| Dates of birth | 0.24 | 0.03 | −89% |
| National IDs | 0.23 | 0.03 | −89% |
| IBANs | 0.13 | 0.00 | zero flagged misses |
| Phone numbers | 0.12 | 0.07 | −44% |
| Medical conditions | 0.09 | 0.15 | +59% |
| Postal codes | 0.07 | 0.07 | ≈ flat |
| Tax IDs | 0.06 | 0.00 | −95% |

Two things stand out to us in this table.

First, the improvement is largest on the entities with the sharpest GDPR consequences. National IDs, dates of birth, IBANs, and tax identifiers — the identifiers that turn a document into a liability — are approaching the point where a flagged miss is a rare event rather than a routine one. (Remember that in production these types are also caught by the deterministic rules engine *before* the model ever runs; the model is the second net, and the second net just got much tighter.)

Second, the remaining misses are concentrated in what we internally call *soft* entity types: organisation names roughly flat, job titles and medical condition references up on raw counts. We're publishing those rows anyway, because they tell the true story of where the problem now lives. These are entities where even human annotators disagree about boundaries — is "the DPO" a job title requiring redaction in this context? Is a regulator's name an organisation that identifies a person? They're also where the second generation's stricter entity taxonomy generates the most label disagreements, which is exactly why raw counts on soft types deserve the least trust before adjudication. This is the frontier, and it's where our next iteration is focused.

> [!CAVEAT]
> The medical conditions row deserves its own caveat, in the opposite direction of what you might assume. Medical condition references were largely absent from the first generation's training data — and, crucially, from its evaluation set too. When an entity type barely appears in the test data, a handful of lucky detections is enough to produce a flattering number; the first generation's medical-conditions figure was good by default, not by merit. For the second generation we deliberately changed that: medical conditions are now systematically represented in the training data, and the evaluation set contains far more of them. The raw count went up because we finally started measuring the problem properly — the first honest baseline for this entity type, not a regression from a real one.

## Why we're not publishing recall percentages today

Here's the honest part, and it's the same lesson from April, applied more rigorously.

When we adjudicated the first generation's evaluation results — having a separate review process examine every disagreement between model and labels — we found that **roughly 40% of the model's flagged "misses" were actually annotation errors**, and about a third of its "false positives" were real PII that the reference labels had failed to mark. The model was, in a meaningful number of cases, *right* and the labels were wrong.

That means raw disagreement counts — including the table above — systematically overstate model errors. The table is a valid *directional* comparison because the same overstatement applies to both generations. But converting it into a headline recall percentage before adjudication would produce a number we'd have to walk back later. The PII detection space already has too many unfalsifiable accuracy claims; we're not adding one.

So the second-generation evaluation is now entering adjudication: every logged disagreement gets reviewed, ambiguous cases are escalated to human review, and a sample of the *agreements* gets audited too — because a benchmark is only as trustworthy as its labels, and we're measuring the labels as rigorously as the model.

When that process completes, we'll publish the full table: recall and precision per entity type, per language — English, French, German, and Dutch — with the methodology documented so the numbers mean something.

## What this means if you're waiting for the cloud tier

The trajectory is what we hoped for when we designed the two-layer architecture. The [open-source rules engine](https://github.com/euRedact/euRedact) already handles structured identifiers deterministically, locally, with checksum validation across 31 EU/EEA countries — that layer has been available on [PyPI](https://pypi.org/project/euredact/) and [npm](https://www.npmjs.com/package/euredact) since spring. The contextual layer — the model — is now demonstrably closing the gap on the entities that need language understanding, in the four languages where our first customers live.

We're building this in the open because the alternative — a black box with a suspiciously round accuracy number on the landing page — is exactly what the market doesn't need. The full benchmark is coming. It will be adjudicated, per-entity, per-language, and reproducible in methodology.

If you want it in your inbox when it lands, [join the waitlist](/pricing).
