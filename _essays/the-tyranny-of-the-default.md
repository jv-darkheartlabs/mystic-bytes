---
layout: essay
title: The Tyranny of the Default
dek: "Most users will never change the setting. Design accordingly."
number: 005.1
sort_key: 0005.01
date: 2026-01-10
cover: /assets/images/cover-code.svg
type: pillar
brief:
  system: "accessibility-rails-components and mystic-bytes theme defaults"
  issue: 'inherited "outline: none" and telemetry-on snippets ship as policy'
  constraint: "blast radius inside the component or layout; no breaking API for embed consumers"
---

## Thesis

**The default is the product.** Not the advanced panel. Not the preferences link. Not the setting most people will never open.

## Context

I keep finding this in my own files. A theme snippet inherited `outline: none` on focusable controls because someone, years ago, thought the ring looked messy. The toggle to restore it existed if you knew the class name. Almost nobody knew the class name. I include myself. On mystic-bytes I had shipped the inherited rule until a keyboard pass made the policy visible: we had decided, by inaction, that focus was optional.

[accessibility-rails-components](https://github.com/jv-darkheartlabs/accessibility-rails-components) exists partly so the default is a real `<button>` with a visible focus style, not a `div` and a comment that says "consumers can opt in." Consumers will not opt in. They will copy the component and ship your conscience as their UI.

Cursor has defaults too. It will complete telemetry-friendly snippets and `outline: none` with equal confidence. Fedora's installer has defaults. Jekyll has defaults. I live inside other people's presets all day from a desk in Auckland. That does not make my presets optional for the next person.

Thaler and Sunstein formalized what operators already knew: the preset option is policy with outsized influence.[^1] Jared Spool's UX research kept finding the same empirical fact. People do not change settings.[^2] Refusal is not apathy. They did not buy the software to configure it.

## Mechanism

Defaults are policy in disguise. Default font size decides who can read without help. Default privacy decides who is exposed. Default notification cadence decides whose evening you may interrupt. Default consent decides what a company knows next quarter and what a regulator finds later. Inaction is also a default. The feature you never built is a choice to exclude.

Users ration attention correctly. Every minute in preferences is stolen from the job they came to do. Engineers do the same with dependencies: trust maintainer defaults until something breaks. Your users treat your product the same way. Defaults are the API.

Power concentrates at default-setting. Flipping telemetry from opt-in to opt-out conducts collection at install-base scale without friction. The same logic applies to visibility, model routing, currency, accepted form fields. If a feature is too sensitive for a default-on, it is too sensitive for a quiet toggle three clicks down. Either earn default-on with obvious value and small risk, or stop pretending the choice belongs to the user.

GDPR and comparable frameworks already rejected pre-ticked boxes as consent.[^3] That is not a European curiosity. It is a written admission that opt-out-by-default for personal data is policy, not preference.

Inherited defaults are still yours. Codebases arrive with values someone chose for reasons no one remembers. They remain policy. They remain your liability when a metric turns or an auditor calls. I audit inherited defaults the way I audit dependencies with CVEs: list them, name an owner, ask what happens if they are wrong. The mystic-bytes focus ring was not a new decision. It was an old one I had failed to unset.

Nightbind checkout had a similar inheritance: a provider snippet that assumed analytics on and attribution off. Nobody chose it for that product. Nobody unset it either. Inherited policy is still policy. The press-release test is the cheapest review I know. If we had to publish one sentence explaining this default, would we squirm?

Sensible defaults optimize the median user, not the author. I write on Fedora with a high-contrast habit. That does not entitle me to ship a dark theme that fails WCAG because I can read it. Power-user defaults belong in a documented escape hatch, not in the first paint.

## Tradeoffs

**Opt-in vs opt-out.** Opt-out maximizes short-term data and long-term trust debt. Opt-in minimizes collection and may blind you to usage patterns. There is no neutral. There is only which direction you chose and whether you can defend it in a sentence a customer could hear on a recorded call.

**Sensible defaults vs power-user defaults.** Defaults should serve the person who will never open the panel. Advanced flags are for the people who will. Do not invert that to flatter the author.

**Configuration surface vs opinionated product.** More toggles feel flexible. They export decisions to people who will not make them. Fewer toggles feel paternal. They require conviction. I would rather be accused of an opinion than of a hidden policy.

**When hidden defaults are acceptable.** Internal admin tools, developer-only flags, and settings with reversible low-stakes effects can stay buried. The threshold for a public default is whether it affects privacy, safety, money, or attention without explicit intent. When in doubt, default to the choice you would defend.

## Close

Before each release, run the press-release test on every new default. Name the default, the alternative, who is affected, and how you will know if the choice was wrong. Write the decision with a date. Six months later, when a metric moves or a regulator asks, you answer why it is set this way without convening a seance.

Defaults scale without consent. Design them with the seriousness that scale deserves, and audit the ones you inherited as if you chose them yesterday. Then Tab through the page. The ring will tell you what you actually shipped.

— JV · Dark Heart Labs.

## References

[^1]: Richard H. Thaler and Cass R. Sunstein, *Nudge: Improving Decisions About Health, Wealth, and Happiness* (Yale University Press, 2008). Default effects as policy with outsized influence.

[^2]: Jared M. Spool, "Do Users Change Their Settings?" (UIE research, 2011 onward). Empirical basis for treating the default as the design.

[^3]: Regulation (EU) 2016/679 (GDPR), Art. 4(11) and Recital 32. Pre-ticked boxes are not valid consent — legal reinforcement that opt-out-by-default for personal data is policy.
