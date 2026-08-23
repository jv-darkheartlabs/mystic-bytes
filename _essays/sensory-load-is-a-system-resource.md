---
layout: essay
title: Sensory Load Is a System Resource
dek: "Treat the nervous system like the constrained machine it is."
number: 152.4
sort_key: 0152.04
date: 2026-06-22
cover: /assets/images/cover-mind.svg
type: pillar
brief:
  system: the on-call rotation
  issue: "the contract no longer matches the caller's expectations"
  constraint: no downtime. no schema break. ship before EOW.
---

## Thesis

**The nervous system is a constrained machine. It has bandwidth, latency, a thermal budget.** Light, sound, fabric, and social context consume capacity whether or not you noticed them consuming it. Treat that draw like a system resource, or the on-call contract will fail in a body you still insist is a mindset problem.

## Context

On-call rotation assumes a body that can wake at 3am, parse an alert, hold incident context in working memory, and talk clearly to callers who expect uptime and accurate status. The contract matches implementation only if the operator still has headroom when the page fires.

When sensory load has already spent the budget on fluorescent hum, Slack density, and the meeting that ate lunch, the on-call human is not flaky. The resource graph is exhausted. No downtime for the business does not mean no downtime for the nervous system. It means you are borrowing against the next incident's judgment.

I write this from the same desk where, years ago, I spent an afternoon unable to produce one useful sentence. The streetlight outside had a faint flicker at the edge of vision. I changed nothing about discipline. I closed the blind. The afternoon returned. The machine had not failed. The room had.

That story is small on purpose. The on-call version is the same story with a pager and a stakeholder on the line.

## Mechanism

**Sensory load behaves like memory pressure.** Below threshold, nothing looks wrong. Above threshold, everything slows: irritability, decision fatigue, the sudden inability to compose a sentence in a meeting. Organizations pathologize the surface and ignore the graph. The person did not become incompetent at 3pm. The system started swapping.

AuDHD bodies make the budgeting visible because they cannot always hide the deficit. The fluorescent hum a colleague filters automatically may be a background process eating a third of cognition for the day. The cost is not the noise. The cost is suppression: a daemon you did not consent to run, draining the battery hired for judgment.[^1] I do not need everyone to share the diagnosis for the resource model to be useful. I need rooms that do not require a secret process to stay upright.

John Sweller's cognitive load theory distinguishes intrinsic load (the task), extraneous load (how the task and the room present), and germane load (schema building).[^2] A hostile sensory environment inflates extraneous load before work begins. On-call then asks for peak intrinsic load on an already oversubscribed CPU. The math does not work. Calling it a performance problem misidentifies the bottleneck. You would not page a database that is already swapping and then write up the query planner.

**Designing the room is engineering work.** When I build a workspace I treat it like production: baseline draw, spike profile, recovery cost after spikes. The lamp that replaces overhead lights is a config change. Headphones are a firewall. A timer with an explicit stop is a scheduler with yield points. Cooperative runtimes need handoff. Humans are cooperative runtimes that get talked into running without a yield.

Teams that take this seriously make affordances defaults, not special requests. Dimmer-capable meeting rooms. Slack channels allowed to be quiet for hours. Agendas a day ahead so meetings are not cold-start problems. Async written decisions so on-call handoffs do not depend on recall from a noisy standup. None of that is expensive. All of it compounds into fewer pages answered from a depleted stack.

**The on-call contract drifts the way a stale API drifts.** Callers expect the engineer on rotation to meet a service-level promise. If the roster ignores sensory recovery — back-to-back weeks, no quiet day after a heavy incident, meetings stacked until the pager window — the contract between org and operator is already broken. You will notice at 3am, when the implementation cannot satisfy the spec.

Christina Maslach's burnout work sits next to this. Exhaustion is not only hours worked. It is how those hours feel in the body and the room.[^3] Sensory load is an upstream input to the curve teams pretend they cannot model. You can model it the way you model connection pools: concurrent load, recovery time, brownout behavior. A brownout on a schedule is a signal. It is not a moral failing.

**"Push through" has a place and a duration.** Real incidents require temporary overload. I have done it. You have done it. Permanent overload with pager duty is an architecture bug. The constraint in the brief — no downtime, no schema break, ship before end of week — is exactly when people skip the room and skip the yield. That is how you ship the week and bounce the next on-call.

## Tradeoffs

**Accommodation vs redesign.** Individual headphones help one operator. Default quiet channels help everyone, including the person who will never disclose. Redesign beats heroic compensation. Compensation that only works if you self-advocate will miss the people who need it most.

**Visibility vs disclosure.** Not everyone wants to name neurodivergence at work. Sensory-friendly defaults reduce the need to bid for baseline function in a ticket. That is the point of treating load as infrastructure.

**Throughput vs humane pacing.** Quiet async culture can feel slower than meeting theater in the first week. Over a quarter it keeps the people who do careful work and answer pages without snapping at the caller.

**When overload is honest.** A Sev-1 is allowed to spend the budget. A standing meeting that spends it every Tuesday is not a Sev-1. Name which is which on the roster.

## Close

Give the machine fewer things to compensate for and you get more of what you hired it for: presence, judgment, sustained attention, the pattern-matching a loud room reliably destroys. The engineer who looked checked out in standup may, given thirty minutes of quiet and a written brief, return the analysis that unblocks the week.

Treat the room as code. Treat the body as infrastructure. Model it in the on-call roster the way you model pools. Brownouts on a schedule are a systems signal.

— JV · Dark Heart Labs.

## References

[^1]: Temple Grandin, *The Autistic Brain* (Houghton Mifflin Harcourt, 2013). Sensory processing in rooms designed around other people's filters.

[^2]: John Sweller, "Cognitive Load Theory," *Psychology of Learning and Motivation*, vol. 55 (Elsevier, 2011). Intrinsic, extraneous, and germane load: why the room can spend the working memory the pager is about to need.

[^3]: Christina Maslach and Michael P. Leiter, *The Truth About Burnout* (Jossey-Bass, 1997). Environmental drivers of exhaustion: why sensory load belongs on the roster.
