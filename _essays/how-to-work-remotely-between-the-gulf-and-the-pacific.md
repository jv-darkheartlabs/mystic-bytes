---
layout: essay
title: How to Work Remotely Between the Gulf and the Pacific
dek: "Async is not silence. It is a protocol for doing deep work across two coasts that keep pretending they share one clock."
number: 006.5
sort_key: 0006.05
date: 2026-11-22
cover: /assets/images/cover-code.svg
type: pillar
read_time: 10
tags: [craft, travel]
hashnode: true
brief:
  system: engineering work spanning the US Gulf Coast and the Pacific Northwest; relocation in progress
  issue: meeting sprawl erases focus blocks; async updates mistaken for disengagement
  constraint: build culture that survives a two-hour offset without always-on drift
---

## Thesis

**Remote culture between the Gulf Coast and the Pacific Northwest is built in written artifacts and a small, deliberate overlap, not in everyone pretending to share one office clock.** Protect the morning. Spend the overlap on ambiguity. Treat the offset as the medium, not as an inconvenience.

## Context

I work Louisiana hours while my commitments increasingly breathe on Pacific Northwest time. New Orleans to the Washington coast is not a vibe. It is two hours — small enough to wave off, large enough to bend every calendar it touches. Time zone math is easy. Trust math is hard.

A standup that is humane on the Washington coast lands at 10am in New Orleans, mid-morning, right where the deep work lives. A standup that is humane in New Orleans is 6am on the coast, before the day has properly started. Nobody is setting a 4am alarm. That is exactly the problem: the cost is small enough to pay without noticing, every day, until the mornings are gone. I have sat on both sides of that trade. The meeting almost never needed to exist.

The overlap is not narrow. That is the trap. Two hours of offset means almost any hour can be justified as shared, so every hour gets claimed. The window that actually works is the one you draw on purpose — late morning in New Orleans, early morning on the coast, both brains awake, nobody performing availability. Spend it on the conversation that will spawn three follow-ups. Do not spend it on "yesterday I worked on the ticket." That sentence can live in a comment.

This is a two-clock problem, not a rounding error. I am Washington-bound with collaborators already on Pacific time. The work has to survive the offset without anyone becoming the person who is always available.

## Mechanism

**Async by default is the protocol, not the personality.** Write decisions where they can be found: ticket, doc, PR description. Not only spoken in a call the other coast joined from the edge of their morning. GitLab's remote playbook is blunt about this because the company ran on it at scale: if it is not written, it did not happen for the people who were not in the room.[^1] Expect lag without treating it as neglect. A reply that arrives at the start of the other person's day is on time. A reply that arrives because someone answered at 10pm to look responsive is a loan against the next morning's judgment.

I keep a written handoff at the end of my Louisiana day: what moved, what is blocked, what I need from Pacific hours, what I will pick up tomorrow. It takes twelve minutes. It saves a meeting that would have cost someone their morning. The handoff is the product. The overlap is for the leftover questions.

**Overlap hours are cheap at two hours' distance. Spend them like production access anyway.** Book the shared window for ambiguity, relationship repair, and conflict. Status belongs in text. If you can paste the update into chat without anyone asking a question, you did not need cameras. Save the live hour for the thing that forks: a schema fight, a hiring call, a postmortem where tone matters.

When I have ninety minutes with a Pacific collaborator, I do not "catch up." I bring a written agenda and a decision I am willing to own by the end of the call. If we cannot decide in the overlap, we write the options and pick asynchronously. Neither coast gets the hour back.

**Silence reads as withdrawal unless you publish a rhythm.** A two-hour offset means I am absent in slices nobody notices — my first working hours happen before their alarms; my sign-off lands in the middle of their afternoon. Absence in slices still reads as withdrawal if there is no pattern laid over it. So: short written check-ins, a status that names the next overlap, an honest "I will not be on this thread until 9am Pacific." Signal, not performance. Remote isolation is a systems failure when nobody names the clock.

**Protect the morning like a deploy freeze — both mornings.** Four uninterrupted hours on either coast beat eight fragments timed to the other coast's standups. Cal Newport's case for deep work is structural here: the scarce resource is not presence, it is consecutive attention.[^2] Block the morning on the calendar. Measure output and decision quality, not green dots. Managers who optimize for "caught them online" will harvest the early hours from the other coast and call it culture.

**The calendar has two coasts in it.** Gulf-centric sprint planning ignores the Pacific side's hours and assumes everyone is awake by eight. Coast-centric planning ignores Mardi Gras, Thanksgiving, and the Friday after a US holiday when half the Slack org is a ghost town. Daylight saving flips on the same weekends, so the offset never moves — which is its own trap, because nobody ever re-checks it. Somebody's "quick sync at 8" is always 6am somewhere. Put both holiday calendars in the same view, with the zone written on every shared hour. This is operations, not thoughtfulness theater.

**Hero hours are a bug you can schedule away.** Someone will volunteer to take the 7am call "just this once," or answer the thread at 10pm because they happened to see it. Then the once becomes the default because it worked. Write the default down: no recurring meeting that requires anyone to be online outside 8am–5pm in their local civil time, and no reply expected outside it either. Exceptions are incidents and launches, named as such, ended on a date.

## Tradeoffs

**Always-on chat vs bounded response windows.** A documented window in each zone ("Louisiana 8am–4pm Central, coast 8am–noon Pacific") prevents the fantasy that someone is failing to care. Boundaries are how the protocol stays humane.

**Full remote vs occasional same-room days.** Some teams need a quarterly reset in one city. Cost it explicitly: flights, a lost travel day, whose coast hosts. Do not pretend a Zoom standup substitutes for that, and do not pretend you need it every month.

**Overlap vs deep work.** Every hour you add to the shared window is an hour you subtract from a Louisiana morning or a Pacific afternoon where the actual building happens. Cap overlap. Expand writing.

**When a live call is correct.** Ambiguity, conflict, and care. Not status. If you are scheduling a recurring standup across this offset, you are asking someone to be a worse engineer on purpose.

## Close

The deepest work this offset enables is real. So is the isolation if you copy an office calendar onto two coasts. Build rituals that do not depend on everyone sharing one noon.

Pick one norm and enforce it once: decisions in writing, overlap capped at two hours, or no-meeting mornings. Then keep it. The tide on the Washington coast will not move for your sprint.

— JV · Dark Heart Labs.

## References

[^1]: GitLab, *The Remote Playbook*. Async-first operating rhythms, written decisions, and the refusal to treat timezone delay as disengagement.

[^2]: Cal Newport, *Deep Work* (Grand Central, 2016). Structural defense of consecutive focus in knowledge work — the resource a two-coast overlap will eat if you spend it on status.
