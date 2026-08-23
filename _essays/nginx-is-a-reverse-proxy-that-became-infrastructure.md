---
layout: essay
title: nginx Is a Reverse Proxy That Became Infrastructure
dek: "TLS, static files, proxy_pass. The config outlived the app behind it."
number: 005.455
sort_key: 0005.455
date: 2026-08-09
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: ['craft']
brief:
  system: nginx as HTTP reverse proxy, static server, and TLS terminator
  issue: treating a Pages site as incomplete because there is no nginx.conf in the repo
  constraint: mystic-bytes publishes on GitHub Pages; JV edits nginx as a user, not as an nginx developer
---

nginx started as a reverse proxy and a fast static file server. Then it became the thing you put in front of everything else: TLS, gzip, `proxy_pass`, the config file that outlived the app framework behind it. I have edited that file as a user. I have not been an nginx developer. mystic-bytes does not run it. GitHub Pages already terminates the public web. Fedora can install the package. That is not the same as operating the internet's default front door.

The mechanism is simple. Listen on 443. Hand static bytes from disk. Forward the rest to an upstream.[^1] Rate-limit, cache, rewrite. Teams copied the same `server` block until "the nginx config" meant infrastructure: ingress, the box in front of Rails, the snippet in every Compose stack. Corporate ownership changed. The grammar did not. `location` blocks still read like a tiny programming language for HTTP.

Use nginx when you need a boring HTTP boundary you can grep. Do not treat a Jekyll site on Pages as unfinished because there is no `nginx.conf` in the repo. Reverse proxies became infrastructure because apps were bad at being the public edge. The essays are files. The edge is already rented.

— JV · Dark Heart Labs.

## References

[^1]: nginx Docs, "Module ngx_http_proxy_module," <https://nginx.org/en/docs/http/ngx_http_proxy_module.html>. `proxy_pass` and upstream forwarding — the reverse-proxy job that became a default edge.
