---
layout: essay
title: Webhooks Are the Handshake With a Stranger
dek: "A webhook is a public mailbox. Treat it like one."
number: 004.6781
sort_key: 0004.6781
date: 2025-09-21
cover: /assets/images/cover-code.svg
type: micro
brief:
  system: Nightbind Stripe webhook receiver
  issue: duplicate delivery replayed a fulfilled order
  constraint: no shared session state; verify at the door
---

A webhook endpoint is a door left unlocked on the internet. The stranger walking through is supposed to be a known partner. The door does not know that — verification is your job.

Nightbind learned this when Stripe retried a `checkout.session.completed` during a deploy blip and our handler fulfilled the order twice. The payload was legitimate. The signature was valid. The failure was ours: no idempotency key persisted before side effects, no replay window treated as hostile by default. The partner behaved correctly. We had built a mailbox anyone could write to and assumed kindness.

The mechanism is asymmetric trust. Inbound HTTP from the public internet carries no memory of prior conversations. Sign payloads. Check signatures before parsing body. Reject stale timestamps. Make handlers idempotent and alert on duplicate keys — webhooks fail quietly when they fail, usually at 2am on a holiday.

Build the verification and the alerting before you need them. The handshake is with a stranger every time.

— JV · Dark Heart Labs.
