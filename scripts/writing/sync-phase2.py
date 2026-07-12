#!/usr/bin/env python3
"""Write Phase 2 rewrites to Documents archive and mystic-bytes _essays."""

from __future__ import annotations

import json
import re
from pathlib import Path

BLOG = Path(
    "/Users/jenthedev/Documents/Documents - Jennifer’s MacBook Pro/Active/dark-heart-labs/blog"
)
ESSAYS = Path("/Users/jenthedev/Projects/mystic-bytes/_essays")
MANIFEST = Path("/Users/jenthedev/Projects/mystic-bytes/_data/writing_manifest.json")

# source relative path -> (site_slug, title, dek, body, tags, cover, cross_link, related_projects, hashnode)
POSTS: dict[str, tuple] = {}

def slugify(s: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    return re.sub(r"-+", "-", s)


def write_pair(source: str, site_slug: str, title: str, dek: str, date: str,
               tags: list[str], read_time: int, body: str, topic: str,
               number: str, sort_key: str, cover: str = "/assets/images/cover-craft.svg",
               cross_link: str | None = None, hashnode: bool = False):
    fm_doc = [
        "---",
        f'title: "{title}"',
        f"dek: {dek}",
        f"date: {date}",
        f"tags: {tags}",
        f"read_time: {read_time}",
        f"topic: {topic}",
        "status: published",
        f"site_slug: {site_slug}",
    ]
    if cross_link:
        fm_doc.append(f"cross_link: {cross_link}")
    if hashnode:
        fm_doc.append("hashnode: true")
    fm_doc.append("---")
    fm_doc.append("")
    doc_content = "\n".join(fm_doc) + body + "\n\n— JV · Dark Heart Labs.\n"

    src_path = BLOG / source
    src_path.parent.mkdir(parents=True, exist_ok=True)
    src_path.write_text(doc_content, encoding="utf-8")

    fm_site = [
        "---",
        "layout: essay",
        f"title: {title}",
        f"dek: {dek}",
        f"number: {number}",
        f"sort_key: {sort_key}",
        f"date: {date}",
        f"cover: {cover}",
        f"read_time: {read_time}",
        f"tags: {tags}",
    ]
    if cross_link:
        fm_site.append(f"cross_link: {cross_link}")
    if hashnode:
        fm_site.append("hashnode: true")
    fm_site.append("---")
    fm_site.append("")
    site_content = "\n".join(fm_site) + body + "\n\n— JV · Dark Heart Labs.\n"
    (ESSAYS / f"{site_slug}.md").write_text(site_content, encoding="utf-8")


if __name__ == "__main__":
    print("Run via import; content defined in phase2_content module.")
