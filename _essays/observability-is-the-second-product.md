---
layout: essay
title: Observability Is the Second Product
dek: "Every running system is two products: the one users see and the one operators do."
number: 006.51
sort_key: 0006.51
date: 2024-10-06
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: mystic-bytes cover preprocess and CDN pipeline
  issue: stale thumbnails persist after manifest fix; no metric distinguishes cache layer vs origin truth
  constraint: preserve public URLs; add observability without new vendor contracts
---

Every system in production is actually two products. The first is what the user sees. The second is what the operator sees — metrics, traces, logs, alerts. The second product determines whether the first survives its second year.

## Thesis

**Observability is a product with users: operators, on-call engineers, and future-you.** Shipping features without shipping the ability to ask novel questions of the running system is shipping half a product.

## Context

The mystic-bytes cover pipeline served stale thumbnails after a manifest correction. Users saw old art; the database had new paths; the CDN had an older cache generation. Debugging meant SSH, curl, Redis CLI, and guesswork about which layer was authoritative. We had logs — unstructured, unaggregated, and silent on success paths. We had no metric that said *manifest version N served while edge cache at M.*

The fix for staleness was a contract rewrite. The fix for recurrence was observability: manifest version stamped on preprocess output, cache key logged on hit/miss, one dashboard panel asking *are these numbers equal right now?*

## Mechanism

Charity Majors distinguishes **monitoring** — someone else's dashboards for known failures — from **observability** — the ability to interrogate production with arbitrary questions when the unknown unknown arrives.[^1] The Google SRE book codified the earlier layer: metrics, logs, traces as the minimum viable operator surface.[^2] Both matter; the second product fails when teams stop at uptime graphs.

**The second product has features:**

1. **High-cardinality context** — request id, slug, manifest version, cache tier — not only `error_rate`.
2. **Traceable paths** — follow one thumbnail from import through preprocess to edge.
3. **Actionable alerts** — page when user-visible truth diverges from origin, not when CPU hiccups.
4. **Runbook links** — every alert knows which doc teaches the curriculum.

**Reverse-engineering under fire is the failure mode.** Teams that build only the user-facing product discover, at 2am, that they cannot tell whether latency is auth, database, or an N+1 introduced last Tuesday. They add logging in the incident channel — the worst IDE, the highest stakes.

On darkheartlabs stream infra I treat dropped chat events like cover staleness: instrument the relay queue depth and the OBS plugin heartbeat in the same place I instrument viewer count. Viewers are the first product; the operator overlay is the second. When alerts only exist for "stream offline," you learn about backpressure from angry chat, not from graphs.

**Observability shapes architecture.** If you cannot trace it, you do not understand it. Forcing every merge job to emit a span with `slug`, `batch_id`, and `cover_hash` caught duplicate slug imports before they hit the manifest — not because we predicted that bug, but because the question became askable.

**Logs are not free telemetry.** Unstructured printf debugging in hot paths becomes expensive noise. Structured logs with stable field names — `manifest_version`, `cache_tier`, `slug` — let you pivot from metric to evidence without re-deploying printf. The second product needs schema discipline the same way the API does.

## Tradeoffs

**Build vs buy.** Hosted APM is fast; cost and cardinality limits bite at scale. OpenTelemetry plus one backend is engineering tax upfront, cheaper questions later.

**Cardinality vs cost.** High-cardinality labels are how you debug; they are also how you bankrupt the metrics bill. Sample intelligently; never sample errors.

**Noise vs silence.** Alert fatigue kills the second product faster than missing alerts. One actionable page beats ten charts nobody checks.

**When minimal obs is enough.** Early prototypes and internal tools with one operator who holds the whole graph in head — ship the feature, add one health check, defer the product. The stance changes the day someone else pagers you.

Ship the second product in the same epic as the first. Ask: what question will we need at 2am that we cannot answer today? Add the metric, the log field, or the trace span that makes it askable — then ship the feature.

If your on-call runbook says "check the dashboard" and the dashboard only charts user traffic, you have built half a product.

— JV · Dark Heart Labs.

## References

[^1]: Charity Majors, George Miranda, and Liz Fong-Jones, *Observability Engineering* (O'Reilly, 2022). Majors is the primary industry authority distinguishing observability from traditional monitoring — the reference for high-cardinality, exploratory debugging in production.

[^2]: Betsy Beyer, Chris Jones, Jennifer Petoff, and Niall Richard Murphy, *Site Reliability Engineering* (O'Reilly, 2016). The Google SRE book is the canonical foundation for metrics, logs, traces, and SLO-driven operations as first-class product concerns.
