---
layout: essay
title: The Tyranny of the Default
dek: "Most users will never change the setting. Design accordingly."
number: 005.1
sort_key: 0005.01
date: 2026-05-03
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: dark-heart-themes newsletter signup component
  issue: telemetry default flipped on; 94% of installs never open preferences
  constraint: blast radius inside this module; no breaking API for embed consumers
---

## Thesis

The default is the product — not the advanced panel, not the preferences link, not the settings most users will never open.

## Context

When we shipped the dark-heart-themes newsletter embed, analytics defaulted to on. The toggle existed — buried three clicks deep, label written for engineers. Post-release review: fewer than six percent of embed consumers had changed it. Ninety-four percent were running whatever we shipped on day one. That was not user preference. That was our policy, scaled without consent.[^1]

Engineering teams talk about defaults as small — a checkbox, a dropdown, a quiet config line. For most of the userbase, the default is the **only** setting they will ever experience. The advanced panel is a room they will not enter. The toggle exists for your conscience, not for them.

## Mechanism

**Defaults are policy in disguise.** Default font size decides who can read without help. Default privacy decides who is safe. Default notification cadence decides whose evening you may interrupt. Default consent decides what the company knows next quarter and what a regulator finds twelve months later. Inaction is also a default — the feature you never built is a choice to exclude.

**Users ration attention correctly.** Refusal to change a setting is not apathy. Users did not buy the software to configure it. They bought the promised outcome. Every minute in preferences is stolen from the job. Engineers do the same with dependencies: trust maintainer defaults until something breaks. Your users treat your product the same way. Defaults are the API.

**Power concentrates at default-setting.** The PM who flips telemetry from opt-in to opt-out conducts surveillance at install-base scale without friction. The same logic applies to defaults for visibility, model routing, currency display, form fields accepted. If a feature is too sensitive for a default, it is too sensitive for a quiet toggle. Either earn default-on with obvious value and small risk, or stop pretending the choice belongs to the user.

**Inherited defaults are still yours.** Codebases arrive with values someone chose years ago for reasons no one remembers. They remain policy. They remain your liability when metrics turn or auditors call.

I audit inherited defaults the same way I audit dependencies with CVEs: list them, name the owner, ask what happens if they are wrong. The dark-heart-themes embed had inherited a third-party snippet default from an earlier theme fork — analytics on, attribution off. Nobody chose it for this product; nobody unset it either. Inherited policy is still policy.

## Tradeoffs

**Opt-in vs opt-out.** Opt-out maximizes short-term data and long-term trust debt. Opt-in minimizes collection and may blind product to usage patterns. There is no neutral — only which direction you chose and whether you can defend it in a press-release sentence. dark-heart-themes chose opt-in for analytics and saw embed adoption hold steady — evidence that honest defaults rarely kill growth; they kill surprises in postmortems.

**Sensible defaults vs power-user defaults.** Defaults should optimize the median user, not the author. dark-heart-themes corrected by defaulting analytics off and surfacing a one-line embed attribute for explicit enable — friction where the sensitive action lives.

**Configuration surface vs opinionated product.** More toggles feel flexible; they export decisions to users who will not make them. Fewer toggles feel paternal; they require conviction. The test: *if we had to publish one sentence explaining this default, would we squirm?*

**When hidden defaults are acceptable.** Internal admin tools, developer-only flags, and settings with reversible low-stakes effects can stay buried. Threshold for public defaults: **affects privacy, safety, money, or attention without explicit user intent.** When in doubt, default to the choice you would defend in front of a customer on a recorded call.

Before each release, run the press-release test on every new default. Name the default, the alternative, who is affected, and how you will know if the choice was wrong. Write the decision with date and author. Six months later, when the metric moves or the regulator asks, you answer *why it is set this way* without convening a seance. Defaults scale without consent. Design them with the seriousness that scale deserves — and audit the ones you inherited as if you chose them yesterday.

— JV · Dark Heart Labs.

## References

[^1]: Richard H. Thaler and Cass R. Sunstein, *Nudge: Improving Decisions About Health, Wealth, and Happiness* (Yale University Press, 2008). Thaler and Sunstein formalized default effects in behavioral economics — the academic foundation for treating preset options as policy with outsized influence on outcomes.

[^2]: Jared M. Spool, "Do Users Change Their Settings?" (UIE research, 2011 onward). Spool's longitudinal UX research documented that the overwhelming majority of users never alter default settings — the empirical basis for "the default is the design."

[^3]: GDPR and comparable privacy frameworks' treatment of consent defaults (EU Regulation 2016/679, Art. 4(11) and Recital 32). Regulators explicitly reject pre-ticked boxes as valid consent — legal reinforcement that opt-out-by-default for personal data is policy, not user choice.
