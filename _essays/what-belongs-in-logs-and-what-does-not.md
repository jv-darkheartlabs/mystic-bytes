---
layout: essay
title: What Belongs in Logs and What Does Not
dek: "Logs are letters to future-you — write them to be searched, not admired."
number: 007.95
sort_key: 000795
date: 2024-04-09
cover: /assets/images/cover-code.svg
read_time: 7
tags: ['ops']
---
Log events, not paragraphs. Include correlation ids, duration, outcome, and safe context — never secrets.

Log at boundaries: request in/out, external API calls, queue publish/consume, auth decisions.

Avoid debug noise in production default levels. Sample verbose traces when volume explodes.

When paging, logs should answer: *what failed, for whom, since when, with what error class.*

Letters unread are useless. Structure is respect for the reader at 3 AM.


— JV · Dark Heart Labs.
