---
layout: essay
title: GPUs Are Computers Now
dek: "They still draw frames. The queues are for matrix math."
number: 004.90
sort_key: 0004.90
date: 2026-07-28
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: [craft]
brief:
  system: GPU-backed models as a user of APIs and occasional local runs
  issue: GPUs still described as graphics cards while training and inference are the computer
  constraint: public GPU/CUDA history; no NVIDIA employment
---

GPUs are computers now. They still draw frames. The money and the queues are for training and inference: thousands of cores running the same math, memory bandwidth as the scarce resource, CUDA as a dialect that escaped graphics.

I do not work at NVIDIA. I use GPU-backed models the way I use any other computer I do not own: an API, a cloud instance, sometimes a local run on Fedora. The mental model that fails is "graphics card." A datacenter GPU is a poor fit for a display and a good dense computer. The driver stack, the HBM, the interconnect: those are OS concerns. Gamers noticed when a GeForce became an inference appliance. Writers noticed when "the model" meant a rack, not a paragraph.

If you are capacity planning, ask which computer you are buying. The one that paints pixels, or the one that multiplies matrices. They share an ancestor. They do not share a job. Budget the job. A laptop GPU that can preview a theme is not the same class of machine as the accelerator your vendor is rationing. Calling both "a GPU" is how you under-spec the work and over-spec the game.

The graphics heritage is real. It is no longer the product. Treat the card as a computer with a weird instruction mix, then pick the one whose memory and interconnect match the model, not the one whose RGB matches the case.

— JV · Dark Heart Labs.

[^1]: NVIDIA CUDA documentation (as a public programming model for GPU computing beyond rasterization). The computer, not the display pipeline.
