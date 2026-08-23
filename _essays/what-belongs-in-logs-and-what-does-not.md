---
layout: essay
title: What Belongs in Logs and What Does Not
dek: "Logs are letters to future-you — write them to be searched, not admired."
number: 007.95
sort_key: 000795
date: 2026-05-04
cover: /assets/images/cover-code.svg
read_time: 2
tags: ['ops']
type: micro
brief:
  system: Nightbind Twitch overlay auth
  issue: debug logs printed bearer tokens next to room IDs during a reconnect storm
  constraint: keep correlation across handshake, retry, and WS drop; never persist secrets
---

If a log line would get you fired when it leaked, it does not belong in the log. Events belong. Secrets, tokens, and raw request bodies do not.

I found this the ugly way in Nightbind overlay auth. During a reconnect storm, debug logging printed bearer tokens next to room IDs. The stream recovered. The log file became a credential dump. I had wanted a story I could grep: which handshake, which retry, which WebSocket drop. I got that story, plus a secret that should never have hit disk. The fix was not "log less." It was an allowlist: correlation id, duration, outcome, status class, and a safe room identifier. Token prefixes stayed in memory. Bodies stayed out.[^1]

Log at boundaries: request in and out, vendor calls, queue publish and consume, auth allow or deny. Default production to info. Sample traces when volume explodes. Debug noise in the default level trains people to ignore the file. When something pages, the lines should answer what failed, for whom, since when, and with what error class.

If you would not paste the line into a ticket, do not write it.

— JV · Dark Heart Labs.

[^1]: OWASP Logging Cheat Sheet — never log passwords, session ids, or tokens; prefer structured events with explicit allowlists over string dumps.
