---
layout: essay
title: Intel Sold the Assumption of Progress
dek: "Tick-tock was a planning calendar. When it slipped, the whole industry inherited the weather."
number: 338.766
sort_key: 0338.766
date: 2026-08-01
cover: /assets/images/cover-code.svg
type: micro
tags: [craft]
brief:
  system: workstation and CI hardware planning for mystic-bytes and NeuroShell
  issue: performance-per-generation stopped being a date you could put on a roadmap
  constraint: public process history; user of machines, not an Intel insider
---

For a decade Intel sold more than chips. It sold a calendar: a tick (new process), a tock (new architecture), about every other year. Teams bought laptops and server refreshes as if that calendar were a law.

I plan hardware from Auckland the same way every remote builder does: what will this machine still be in three years. I do not work for Intel. I lived in the weather. In 2016 they retired tick-tock for a three-step process-architecture-optimization model after 10 nm slipped and 14 nm had to be stretched.[^1] Kaby Lake was the missed beat that made the 10-K filing obvious. TSMC kept a slower, more predictable foundry cadence. AMD and later Apple silicon showed up in that gap. Process delay is not a punchline about one company. It is industry climate: compiler assumptions, cloud instance families, "wait for the next node" as a false project plan.

The lesson I keep is boring. Do not schedule product work on a vendor's lithography promise. Buy the machine that runs the job now. Treat the next node as a gift if it arrives.

Progress was a product they used to ship on a clock. Clocks stop.

— JV · Dark Heart Labs.

[^1]: Intel Form 10-K (2016) retiring tick-tock; Peter Bright, "Intel retires 'tick-tock' development model," *Ars Technica*, March 2016. Public record of the cadence breaking — the planning assumption this essay is about.
