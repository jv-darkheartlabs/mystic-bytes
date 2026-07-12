---
layout: essay
title: What CI Build Logs Tell You Before Users Do
dek: "The build pipeline is early warning infrastructure — if you read it."
number: 007.70
sort_key: 000770
date: 2002-06-06
cover: /assets/images/cover-craft.svg
read_time: 7
tags: ['craft']
---
CI is not a gate you click through. It is telemetry about whether your changes still fit the system you think you are building.

When a build fails in main, the user impact is still zero — that is the cheapest place to learn. Treat red builds as messages, not interruptions. Read the first error, not the last cascade. Fix the root compiler or test failure before chasing warnings that accumulated for months.

Good pipelines fail fast on the checks that catch category errors: type errors, lint on changed files, unit tests for touched modules. Slow checks — integration, visual, end-to-end — belong on a schedule that does not block every push, but must block release.

Log retention matters. A build log from last Tuesday is evidence when production breaks on Friday. Tag artifacts with commit SHA. Link CI runs to deploys so you can answer: *what exactly shipped?*

The glow in the log is not decoration. It is the system telling you where the next incident would have started — if you had ignored the build.


— JV · Dark Heart Labs.
