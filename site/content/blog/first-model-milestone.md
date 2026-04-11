---
title: "Our First Custom Model Is in Testing"
date: "2026-04-10"
author: "euRedact Team"
description: "We've trained our first dedicated PII detection model for European documents. It's faster and cheaper than general-purpose LLMs, and the early evaluation results are promising."
tags: ["NLP", "product-update"]
---

Quick update: we've trained our first euRedact PII detection model and it's now going through evaluation. Wanted to share where things stand.

## The Problem We Kept Running Into

If you've tried detecting PII in European documents, you've probably hit the same wall we did. Pattern-based tools catch the obvious stuff -- email addresses, phone numbers, IBANs -- but miss the rest. Names, addresses, dates of birth, internal reference numbers... the things that actually matter for GDPR compliance tend to slip through.

The alternative is sending everything to a large general-purpose LLM. That works, but it's slow, expensive, and frankly overkill when all you need is "find the personal data in this insurance letter."

So we trained our own model. One that does one thing well: find PII in European documents.

## Early Results

We're running the model against thousands of annotated documents right now -- things like insurance correspondence, government forms, HR files, banking letters. Multiple languages, multiple countries.

It's good. It picks up compound Dutch surnames that our rules engine misses. It knows that "Boulevard Anspach 47" is a street address but "RPM Bruxelles RPR Brussel" is a legal jurisdiction reference, not PII. It catches employee IDs and dates of birth buried in the middle of dense paragraphs.

The cost difference compared to using a general-purpose model is stark. We're talking orders of magnitude cheaper per document. That's not a rounding error -- it's the difference between "viable at scale" and "nice demo."

Inference speed is also fast enough for interactive use. You paste a document, you get results in seconds. No batching required.

## What We Learned From Evaluation

The interesting part has been the evaluation process itself. We built tooling that computes precision and recall per entity type, so we can see exactly where the model is strong and where it struggles.

One thing we didn't expect: a good chunk of the "failures" turned out to be problems with our training labels, not the model. The model was finding real PII that the original annotations had missed. We're now using those insights to clean up the training data for the next iteration.

We also built an automated review pipeline where a separate AI reviews each disagreement and flags the ambiguous cases for human review. It's a surprisingly effective way to improve data quality without manually reviewing thousands of records.

## What's Next

This is the first model, not the last. We're using what we've learned to:

- Clean up training data where the model exposed labelling issues
- Improve coverage on the entity types where recall is lowest
- Add more languages and document types
- Work towards the reliability bar we need for production

We'll share benchmark numbers when we're further along.
