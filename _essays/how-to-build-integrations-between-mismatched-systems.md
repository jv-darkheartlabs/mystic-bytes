---
layout: essay
title: How to Build Integrations Between Mismatched Systems
dek: "Every integration is diplomacy between two APIs that disagree about what a customer is."
number: 006.25
sort_key: 0006.25
date: 2011-03-06
cover: /assets/images/cover-code.svg
read_time: 7
tags: [culture, ops]
---

Every integration is a bridge between systems that were never designed to work together. Stripe thinks about money in ledger events. Your database thinks in rows with foreign keys. Salesforce's idea of a contact is not yours. Building that bridge — translating, validating, recovering — is among the most undervalued skills in software engineering, because the work is invisible until it fails on a holiday weekend.

## Integration work is boundary negotiation

The integration layer is where two vocabularies meet. Every field mapping is a decision. Every null check is a treaty clause. Every default value is policy someone should have written down.

A minimal transform might look like this:

```typescript
function translateBetweenWorlds(
  external: ExternalPayload
): InternalModel {
  return {
    id: external.ref_id,
    name: external.display_name ?? "Unknown Entity",
    status: mapExternalStatus(external.state),
    lastSeen: new Date(external.updated_at_unix * 1000),
  };
}
```

The code is short. The arguments behind it are not: what happens when `ref_id` collides, when `state` introduces a value you have never seen, when the vendor sends seconds instead of milliseconds twice a year. Good integrators document those arguments in the adapter, not in tribal memory.

## Design for change, not for demo

APIs change. Vendors deprecate endpoints. Webhooks stop firing because someone's SSL cert expired quietly. The integration is never done — it is a living boundary that needs monitors, replay tools, and a human who knows which side lies when the counts disagree.

**Idempotency at the boundary.** Assume duplicates. Assume out-of-order delivery. Assume the same event arrives twice because someone retried without a key.

**Schema versioning in your own house.** External types will drift. Internal models should not shatter every time they do. Isolate vendor shapes behind an adapter; keep your domain stable.

**Observability on both sides.** Log correlation IDs that span inbound webhook, transform, and downstream write. When reconciliation fails, you need one thread to pull, not three dashboards to guess.

**Reconciliation as a first-class job.** Nightly or hourly compare counts between systems. Discrepancies should page before a customer notices. Adapters that only handle the happy path are prototypes, not production boundaries.

## Document like the next maintainer is on call

The next person to touch this code will not speak both APIs fluently on day one. Leave a field map, a failure-mode table, and the vendor contact or status page link. Gratitude is not the goal. Continuity is.

Build the bridge deliberately. Test the unhappy paths. Treat the integration layer as product infrastructure, not glue code you hide in a folder named `utils`.

When two systems disagree, the integration engineer decides which side's truth wins for each field — and documents the casualties. That is the job. Do it in the open.

— JV · Dark Heart Labs.
