---
layout: essay
title: Async Is a Political Position
dek: "The meeting protects the loudest person in the room."
number: 658.45
sort_key: 0658.45
date: 2025-03-02
cover: /assets/images/cover-craft.svg
type: pillar
brief:
  system: Nightbind platform working group
  issue: roadmap decisions made in standing sync; written dissent ignored as "already decided"
  constraint: no reorg; shift default to RFC docs before implementation lock
---

## Thesis

Synchronous communication is not a neutral preference. It is a power structure that rewards real-time fluency, audible confidence, and colocated time zones — and async-first writing is a deliberate redistribution of who gets to shape the outcome.

## Context

On Nightbind a platform working group met every Tuesday for eleven weeks. The same three voices dominated airtime. A senior engineer in a later time zone contributed strong objections in Slack after each call — well-reasoned, documented, ignored as "already decided in the meeting." By sprint six we shipped a caching layer the async objectors had flagged; by sprint eight we rewrote it. The cost was not disagreement. The cost was that disagreement was structurally illegible until it became expensive.

I had been the person in the room. I was also, on other projects, the person three hours behind, drafting the better answer after the call ended. Same skill set, different political outcome — determined by medium, not merit.

## Mechanism

**Meetings optimize for performance, not truth.** Spoken debate rewards speed, volume, and social comfort. The person who needs forty-five quiet minutes to articulate the fatal edge case does not get those minutes in a fifty-minute slot with six attendees and a hard stop. Priya Parker notes that gatherings inherit hidden purposes — often status display masquerading as alignment.[^1] When the hidden purpose is "look engaged," the artifact is attendance, not decision quality.

**Async redistributes the floor.** A RFC in GitHub Discussions gives the slow thinker, the non-native speaker, the introvert, and the caregiver the same surface area as the loudest extrovert: equal column width, equal timestamp, equal permalink. Responses are judged on content, not on who got there first. Jason Fried and DHH built Basecamp's operating model on this premise — writing as the primary coordination layer because speech is ephemeral and political.[^2]

**Default medium is default hierarchy.** Sync-first teams hire for sync competence: timezone overlap, meeting stamina, performative certainty. Async-first teams hire for written clarity and can recruit across continents without filtering for who can stomach six hours of Zoom weekly. The team you assemble is downstream of the communication politics you normalize.

**"Already decided" is a power move.** When leadership treats the meeting as the decision venue and async comment as commentary, they encode a two-tier system: present bodies count, absent bodies annotate. The fix is procedural — no implementation lock until the RFC window closes; dissent logged in the ADR; explicit disagree-and-commit with names attached. Disagreement that survives that process is real alignment. Silence in a room is not.

**Async is not automatically democratic.** Written culture can favor eloquent writers over domain experts, or people with uninterrupted writing time over parents on fragmented schedules. The political shift is necessary but not sufficient — you still need readable templates, review norms, and leaders who respond to written pushback without penalizing it as "not a team player."

**Calendar invites are allocation.** Recurring syncs consume the same budget as headcount — they just do not appear on the spreadsheet. When I audited Nightbind's standing meetings against output, three weekly forums existed mainly so a director could "stay close to the work." Moving status to written updates returned twelve engineer-hours per week to the pool. Nobody missed the room. They missed the guilt of being visibly busy.

## Tradeoffs

**Legitimacy vs velocity.** RFC cycles add days. They also prevent the rewrite sprints that follow faux-consensus. Measure cost in total calendar time to stable ship, not time to first merge.

**Relationship vs transaction.** Some trust builds only in real time — conflict repair, sensitive feedback, celebration. Async-first teams budget sync for that work instead of spending it on status readouts that belong in a doc.

**Crisis override.** Outages and security incidents still get bridges. Politics is about defaults, not absolutes.

**When sync-first is rational.** Small colocated teams with high trust and low turnover can afford oral culture — until they scale or hire remotely. The inflection point is the first hire who cannot attend 9am standup without waking at midnight.

Adopt async on purpose, with explicit decision protocol — or inherit sync's power map by accident. The team you end up with, and the architecture they ship, will reflect whichever default you chose.

— JV · Dark Heart Labs.

## References

[^1]: Priya Parker, *The Art of Gathering: How We Meet and Why It Matters* (Riverhead, 2018). Parker analyzes how meeting design encodes purpose and power — including who is centered and who is excluded by format choices.

[^2]: Jason Fried and David Heinemeier Hansson, *Remote: Office Not Required* and Basecamp's published communication principles (Basecamp / 37signals). Fried is the most cited industry advocate for async-default work — writing over meetings as an intentional organizational stance, not individual preference.

[^3]: Irving L. Janis, *Groupthink* research (Yale, 1970s–1980s). Janis documented how cohesive groups suppress dissent to preserve harmony — the psychological mechanism behind fast meeting consensus that async written dissent surfaces.
