---
layout: essay
title: DNS Is a Distributed Database You Pretend Is Instant
dek: "The answer you got is whoever last agreed to remember it."
number: 004.72
sort_key: 0004.72
date: 2026-08-02
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
brief:
  system: darkheartlabs.technology custom domain
  issue: A-record cutover; remote resolvers still served the old IP for hours
  constraint: cannot flush other people's caches; TTL already published
---

DNS is a globally replicated database with eventual consistency and a culture of pretending it is a lookup table.

I use this database. I do not run it. When I moved darkheartlabs.technology off an old A record, `dig` on my laptop showed the new address immediately. A friend on another continent still hit the previous host. Nothing was misconfigured in the zone I control. Recursive resolvers were honoring a TTL I had published weeks earlier and then forgotten to lower before the cutover. The convenient story is: type a hostname, get an address, assume the world agrees. The world does not agree. It caches. Some ISPs cache harder than the spec. Browsers cache on top of that. Negative answers cache too — NXDOMAIN has its own lifetime, and it will keep a name dead after you resurrected it.

TTL is not a hint to the network. It is permission you already granted for how long strangers may lie on your behalf. Lower it before you move. Wait out the old value. Then move. Flushing DNS on your own machine is theatre. You do not own the other million copies.

Treat DNS like a distributed store with a published lag budget. If you needed instant, you should not have advertised a long memory.

— JV · Dark Heart Labs.

[^1]: P. Mockapetris, RFC 1035, "Domain Names — Implementation and Specification" (IETF, 1987) — TTLs as cache lifetime, not a freshness guarantee the whole internet will honor on demand.
