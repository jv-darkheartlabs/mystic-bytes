---
layout: essay
title: IPv6 Is Not Optional Forever
dek: "Four billion addresses was a rounding error we are still paying interest on."
number: 004.74
sort_key: 0004.74
date: 2026-08-03
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
brief:
  system: darkheartlabs.technology DNS and remote access from odd networks
  issue: IPv4-only site; an IPv6-only visitor path hung instead of failing clearly
  constraint: dual stack on the host I control; cannot fix every café NAT
---

IPv4 exhaustion is not a conference slide. It is carrier-grade NAT, address sharing, and workarounds that make "the IP" a worse identifier every year. IPv6 is the space we already needed. Dual stack is the tax for having waited.

I publish names and I travel on other people's networks. I do not allocate RIRs. darkheartlabs.technology spent a stretch as IPv4-only because the host defaulted that way and AAAA records looked like extra work I could defer. Then a reader on an IPv6-only mobile path got a hang, not a useful error. Dual stack is painful: two records, two failure modes, Happy Eyeballs races, and debugging that starts with "which family did we even try?" That pain is real. It is still cheaper than pretending 32 bits will suffice if we NAT harder.

Turn IPv6 on for the names you publish. Test from a v6 path, not only from home IPv4. Watch both A and AAAA when a name "does not resolve." Treat an A-only zone as a compatibility mode with an expiry, not a philosophy. Exhaustion already happened. The remaining question is whether your readers hit the workaround or the address.

— JV · Dark Heart Labs.
