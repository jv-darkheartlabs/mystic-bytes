---
layout: essay
title: How to Write Error Messages That Help Users Recover
dek: "Anyone can handle the happy path. Great code tells the truth when things break — and tells the user what to do next."
number: 006.18
sort_key: 0006.18
date: 2003-12-26
cover: /assets/images/cover-craft.svg
read_time: 7
tags: ['design', 'craft']
hashnode: true
---

Error handling is where competent code becomes trustworthy code. Demos live on the happy path — paved, lit, predictable. Production is the forest where users paste unexpected input, networks fail in creative ways, and sessions expire mid-form. Your error layer is the map you leave when the easy trail disappears.

## Defensive by default

Validate at the boundary. Return structured errors instead of throwing opaque exceptions across every layer. Separate *what went wrong* from *what the caller should do* so UI can translate without parsing stack traces.

```typescript
async function fetchRecord(id: string) {
  if (!id) return { error: "Record ID is required." };

  try {
    const response = await api.get(`/records/${id}`);
    if (!response.ok) {
      return { error: `Could not load record (${response.status}). Try again in a moment.` };
    }
    return { data: response.data };
  } catch {
    return { error: "Network unavailable. Check your connection and retry." };
  }
}
```

The pattern is boring on purpose. Boring errors are maintainable errors. Map internal codes to user copy in one place so you are not hunting strings across twelve files during an incident.

## User-facing language is design

Users do not care about your internal service names. They care about whether their work survived the failure. *Something went wrong* is a confession, not guidance. *Your session expired — sign in again to continue* is a path forward. *Payment could not be processed — no charge was made* reduces panic.

Good error copy names the state, preserves trust, and offers one clear action when action exists. If no action exists, say that too: *We are already investigating this. You do not need to resubmit.*

Read error messages aloud. If you would not say it to a person standing in front of you, rewrite it.

## Log richly; display sparingly

Engineers need correlation IDs, stack traces, and upstream latency in logs. Users need human sentences and buttons that work. Both can be true in the same request if you treat the boundary as a translation layer — not a dump of internal panic.

Errors are moments when trust is tested. Respect the user by telling the truth at the depth they can use. That is not discouraging. It is the same courtesy you want when you are on call reading an alert that actually explains the blast radius.


## Test the unhappy path on purpose

Schedule time to break your own flows: kill the network, expire the session, submit malformed data. Error UX is always the last thing demoed and the first thing users hit in production. Give it the same rehearsal you give the launch screenshot.

Include support contact or status page links when outages are systemic. A user who knows where to look for updates is a user who does not rage-refresh forever.
 Pair with support once a quarter. The phrases users repeat in tickets are the phrases your UI should have used first.
 Recovery is the metric. If the user cannot act, the message failed regardless of grammar.

— JV · Dark Heart Labs.
