---
layout: essay
title: Rails Is a Set of Defaults That Ship
dek: "Convention is the product. The generator is a policy document that writes code."
number: 005.435
sort_key: 0005.435
date: 2026-08-13
cover: /assets/images/cover-code.svg
type: pillar
read_time: 9
tags: ['craft']
related_projects: [accessibility-rails-components]
brief:
  system: accessibility-rails-components on Rails ViewComponent and Stimulus
  issue: WCAG treated as an app-by-app retrofit while Rails already ships strong defaults elsewhere
  constraint: drop-in components, not a new framework; stay on Rails conventions
---

Ruby is a language. Rails is a bet that a web app should arrive with answers already filled in. I care about the second thing here: the defaults you get when you type `rails new`, and the ones you still have to bring yourself.

## Thesis

**Rails is a set of defaults that ship.** Convention over configuration is not a slogan for skipping design. It is a claim that most apps should share a shape, and that the framework should write that shape down in generators, guides, and the doctrine.

## Context

I maintain [accessibility-rails-components](https://github.com/jv-darkheartlabs/accessibility-rails-components): WCAG 2.1 AA patterns as ViewComponents and Stimulus controllers. The library exists because Rails will happily generate a form that looks finished and fails a keyboard. Active Record, CSRF tokens, and a folder layout arrive as policy. Focus traps do not.

That gap is why this essay is about Rails, not about Ruby syntax. Ruby will let you write anything. Rails will let you ship a resourceful app on Tuesday if you stay on the golden path. Accessibility was never on that path by default. The component library is me putting a default where the framework left a comment.

I do not work at Basecamp. I read the doctrine and the guides like any other consumer of the golden path. Fedora runs the install. GitHub holds the gem. Cursor edits the views. The ship target is still Rails, because that is where the apps that need the components already live.

## Mechanism

The Rails doctrine states the bet in public: optimize for programmer happiness, convention over configuration, omakase, no one paradigm, progress over stability when the defaults must move.[^1] You can argue with any line. You cannot claim the framework is "just Ruby with folders." It is a curated meal. DHH has been explicit for two decades that the menu is the point.

The getting-started guide is the mechanism in tutorial form: generate an app, generate a resource, migrate, route, render.[^2] Each generator is a default made executable. `rails generate scaffold` is a political document. It decides what a "normal" record looks like: model, migration, controller, views, a test file someone might ignore. Teams inherit that shape even when they delete half of it.

Convention is how Rails scales a small studio. I do not want to invent a persistence layer for a component preview app. I want `has_many`, strong parameters, and a `config/routes.rb` that another Rails person can read in five minutes. The cost is paid when you leave the path: a custom frontend that fights Turbolinks-era assumptions, or a design system that bypasses form helpers and then wonders why labels never associated.

Accessibility-rails-components stays on the path on purpose. ViewComponent is a convention the community already uses. Stimulus is the Rails-shaped way to sprinkle behavior. The defaults I add — name, role, focus return, contrast — are the kind of defaults Rails already believes in for CSRF and SQL. I am not inventing a new web. I am filling a hole in the omakase.

Guides beat tweets. When I need to know how form helpers emit `for` and `id`, I read the helpers guide, not a thread.[^3] The framework's written defaults are the ones that survive a laptop swap. The oral defaults are how bugs reproduce only on my machine.

## Tradeoffs

**Golden path versus the rest of the web.** Stay on convention and you ship. Leave it and you maintain a private Rails. That is fine for a company with a platform team. It is expensive for a library that wants drop-in use. I keep the components boring so host apps do not have to fork the framework to get a dialog that closes.

**Omakase versus a11y.** Rails will choose your test library and your job queue flavor. It will not choose your focus management. Until that changes, "defaults that ship" includes a gap you are responsible for. Treating WCAG as a late gem is how the gap stays.

**Magic versus locate-ability.** `params` and `current_user` feel like language. They are defaults with call stacks. When they break, you debug Rails, not Ruby. Budget for literacy in the framework, not only in the language.

**When Rails is the wrong default.** A static writing site does not need Active Record. mystic-bytes is Jekyll. A Mac terminal does not need Action Cable. NeuroShell is native-adjacent. Use Rails where the app is a web app with records and forms. Do not baptize every repo in `Gemfile` out of loyalty.

## Close

Steal Rails' trick: put the humane answer in the generator. accessibility-rails-components is that trick aimed at the keyboard. The framework already taught us that defaults outrun documentation. Ship the kind ones.

If you maintain a Rails app, audit what `rails new` gave you and what it forgot. The forgotten list is your real backlog.

— JV · Dark Heart Labs.

## References

[^1]: David Heinemeier Hansson and the Rails team, "The Rails Doctrine," <https://rubyonrails.org/doctrine>. Convention over configuration, omakase, and the rest of the public bet — the canonical statement of Rails as a set of defaults.

[^2]: Ruby on Rails Guides, "Getting Started with Rails," <https://guides.rubyonrails.org/getting_started.html>. Generators, MVC layout, and the golden path as executable documentation.

[^3]: Ruby on Rails Guides, "Action View Form Helpers," <https://guides.rubyonrails.org/form_helpers.html>. How Rails emits forms and IDs by default — the layer accessibility-rails-components has to cooperate with rather than replace.
