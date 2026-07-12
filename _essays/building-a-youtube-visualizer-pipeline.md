---
layout: essay
title: Building a YouTube Visualizer Pipeline
dek: "Audio-reactive video is a batch job — treat it like any other media pipeline."
number: 008.21
sort_key: 0008.21
date: 2022-05-17
cover: /assets/images/cover-code.svg
read_time: 6
tags: ['ops']
---

A visualizer pipeline ingests audio, renders frames or shader output, encodes video, uploads to platform. Steps:

1. **Asset in** — lossless audio master, cover art at correct aspect ratio
2. **Render** — headless or GPU batch; log frame timing
3. **Encode** — consistent codec settings for platform limits
4. **Publish** — metadata template (title, description, tags) from file, not hand-typed each time
5. **Verify** — thumbnail and first-frame check automated where possible

**Failure modes:** drift between audio length and video length; copyright flags on stock loops; quota limits on upload API — backoff and retry with idempotency keys.

— JV · Dark Heart Labs.
