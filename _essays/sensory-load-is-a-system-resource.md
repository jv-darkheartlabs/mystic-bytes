---
layout: essay
title: Sensory Load Is a System Resource
dek: "Treat the nervous system like the constrained machine it is."
number: 152.4
sort_key: 0152.04
date: 2026-05-10
cover: /assets/images/cover-mind.svg
type: pillar
brief:
  system: the on-call rotation
  issue: "the contract no longer matches the caller's expectations"
  constraint: no downtime. no schema break. ship before EOW.
---

The nervous system is a constrained machine. It has bandwidth, latency, a thermal budget. Light, sound, fabric, social context — all consume capacity, and they consume it whether or not you notice them consuming it.

## Context

On-call rotation assumes a body that can wake at 3am, parse an alert, hold the incident context in working memory, and communicate clearly to callers who expect the contract — uptime, response time, accurate status — to hold. The contract matches implementation only if the operator's nervous system still has headroom when the page fires. When sensory load has already spent the budget on fluorescent hum, Slack density, and the meeting that ran through lunch, the on-call human is not flaky. The resource graph is exhausted.

I write this from the same desk where, three years ago, I spent an afternoon unable to produce one useful sentence. The streetlight outside had developed a faint flicker at the edge of conscious vision. I changed nothing about discipline. I closed the blind. The afternoon returned. The machine had not failed. The room had.

## Mechanism

**Sensory load behaves like memory pressure.** Below threshold, nothing is wrong. Above threshold, everything slows — irritability, decision fatigue, the sudden inability to compose a sentence in a meeting. Organizations pathologize the surface and ignore the resource graph. The person did not become incompetent at 3pm. The system started swapping.

AuDHD bodies make the budgeting visible because they cannot always hide the deficit. The fluorescent hum a colleague filters automatically may be a background process eating thirty percent of cognition for the day. The cost is not the noise. The cost is suppression — the daemon you did not consent to run, draining a battery the company hired you to use for engineering judgment.[^1]

John Sweller's cognitive load theory distinguishes intrinsic load (the task itself), extraneous load (how the task is presented), and germane load (schema building).[^2] Sensory hostile environments inflate extraneous load before work begins. On-call then asks for peak intrinsic load on an already oversubscribed CPU. The math does not work. Calling it a performance problem misidentifies the bottleneck.

**Designing the room is engineering work.** When I build a workspace, I treat it like production: baseline draw, spike profile, recovery cost after spikes. The lamp replacing overhead lights is a config change. Noise-cancelling headphones are a firewall. A Pomodoro timer is a scheduler with explicit yield points — cooperative runtimes need handoff points.

Teams that take sensory load seriously make affordances defaults, not accommodations:

- Dimmer-capable meeting rooms
- Slack channels allowed to be quiet for hours
- Agendas twenty-four hours ahead so meetings are not cold-start problems
- Async written decisions so on-call handoffs do not depend on recall from noisy standups

None of this is expensive. All of it compounds into fewer pages answered from a depleted stack.

**On-call and the contract mismatch.** Callers expect the engineer on rotation to meet a service-level promise. If the rotation schedule ignores sensory recovery — back-to-back weeks, no quiet days after heavy incidents, meetings stacked before pager duty — the contract between org and operator drifts the same way a stale API drifts from its spec. No downtime for the business does not mean no downtime for the nervous system. It means you borrow against the next incident's judgment.

Christina Maslach's occupational burnout research is adjacent here: exhaustion is not only hours worked but how those hours feel in the body and environment.[^3] Sensory load is an upstream input to the exhaustion curve teams pretend they cannot model.

## Tradeoffs

**Accommodation vs redesign.** Individual headphones help one operator. Default quiet channels help everyone, including the person who did not disclose. Redesign beats heroic compensation.

**Visibility vs disclosure.** Not everyone wants to name neurodivergence at work. Building sensory-friendly defaults reduces the need to self-advocate for baseline function.

**Throughput vs humane pacing.** Short-term, quiet async culture can feel slower than meeting theater. Long-term, it retains the engineers who do careful work and answer pages without snapping at stakeholders.

**When "push through" is rationalized extraction.** Real incidents require temporary overload. Permanent overload with pager duty is an architecture bug, not a mindset problem.

## Close

Give the machine fewer things to compensate for and you get more of what you actually hired it for: presence, judgment, sustained attention, the pattern-matching that the loudest room reliably destroys. The engineer who looked checked out in standup may, given thirty minutes of quiet and a written brief, return the analysis that unblocks the quarter.

Treat the room as code. Treat the body as infrastructure. Model it in the on-call roster the way you model connection pools — because brownouts on schedule are a systems signal, not a character flaw.

— JV · Dark Heart Labs.

## References

[^1]: Temple Grandin, *The Autistic Brain: Thinking Across the Spectrum* (Houghton Mifflin Harcourt, 2013). Grandin is a primary public authority on sensory processing differences and their impact on cognitive performance in environments designed for neurotypical norms.

[^2]: John Sweller, "Cognitive Load Theory," in *Psychology of Learning and Motivation*, vol. 55 (Elsevier, 2011). Sweller originated cognitive load theory — the standard framework for how extraneous environmental and presentation factors consume working memory needed for the primary task.

[^3]: Christina Maslach and Michael P. Leiter, *The Truth About Burnout* (Jossey-Bass, 1997). Maslach's burnout model includes environmental and organizational drivers of exhaustion — complementary to treating sensory load as a measurable system input rather than individual weakness.
