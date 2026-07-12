#!/usr/bin/env python3
"""Generate writing migration manifest from blog archive."""

from __future__ import annotations

import json
import re
import unicodedata
from datetime import date, timedelta
from pathlib import Path

BLOG_ROOT = Path(
    "/Users/jenthedev/Documents/Documents - Jennifer’s MacBook Pro/Active/dark-heart-labs/blog"
)
OUT = Path(__file__).resolve().parents[2] / "_data" / "writing_manifest.json"

DATE_BANDS = {
    "craft": (date(2002, 1, 15), date(2015, 12, 1)),
    "ops": (date(2022, 3, 1), date(2026, 6, 1)),
    "travel": (date(2018, 4, 1), date(2026, 7, 1)),
    "wellness": (date(2020, 6, 1), date(2026, 7, 1)),
}

FLAGSHIPS = {
    "the-craft/Debugging by Moonlight.md",
    "deployment-operations/dev-essays/Migrations at Midnight.md",
    "design-aesthetics/The Alchemy of Accessible Design.md",
    "ai-automation/AI Pair Programming and Trust.md",
    "philosophy-of-practice/Remote Work and Deep Water.md",
}

CRAFT_FOLDERS = {
    "the-craft",
    "philosophy-of-practice",
    "design-aesthetics",
    "collaboration-culture",
    "ai-automation",
    "music-games",
    "mythology-film",
    "transmissions",
}
OPS_PREFIX = "deployment-operations/"
TRAVEL_PREFIX = "travel/"
WELLNESS_PREFIX = "aromatherapy-blog/"
SKIP_PARTS = {"travel/personas"}


def slugify(title: str) -> str:
    title = re.sub(r"^#\s*", "", title)
    title = title.replace("…", "").strip()
    nfkd = unicodedata.normalize("NFKD", title)
    ascii_title = nfkd.encode("ascii", "ignore").decode("ascii")
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", ascii_title.lower()).strip("-")
    slug = re.sub(r"-+", "-", slug)
    return slug[:80] or "untitled"


def parse_frontmatter(path: Path) -> dict:
    text = path.read_text(encoding="utf-8", errors="replace")
    if not text.startswith("---"):
        return {}
    end = text.find("\n---", 3)
    if end == -1:
        return {}
    block = text[3:end]
    result: dict = {}
    for line in block.splitlines():
        if line.startswith("title:"):
            result["title"] = line.split(":", 1)[1].strip().strip('"')
        elif line.startswith("topic:"):
            result["topic"] = line.split(":", 1)[1].strip()
    return result


def rel_topic(path: Path) -> str:
    return str(path.relative_to(BLOG_ROOT).parent).replace("\\", "/")


def band_for(rel: str) -> str:
    if rel.startswith(WELLNESS_PREFIX):
        return "wellness"
    if rel.startswith(TRAVEL_PREFIX):
        return "travel"
    if rel.startswith(OPS_PREFIX):
        return "ops"
    top = rel.split("/")[0]
    if top in CRAFT_FOLDERS:
        return "craft"
    return "craft"


def stagger_dates(items: list[dict], start: date, end: date) -> None:
    if not items:
        return
    total_days = (end - start).days
    step = max(1, total_days // max(len(items), 1))
    for i, item in enumerate(sorted(items, key=lambda x: x["slug"])):
        d = start + timedelta(days=min(i * step, total_days))
        item["date"] = d.isoformat()


def main() -> None:
    entries: list[dict] = []
    skipped: list[str] = []
    by_band: dict[str, list[dict]] = {"craft": [], "ops": [], "travel": [], "wellness": []}

    for path in sorted(BLOG_ROOT.rglob("*.md")):
        rel = str(path.relative_to(BLOG_ROOT)).replace("\\", "/")
        topic = rel_topic(path)

        if any(topic.startswith(s) or topic == s.rstrip("/") for s in SKIP_PARTS):
            skipped.append(rel)
            continue
        if path.name.startswith("# "):
            skipped.append(rel)
            continue

        fm = parse_frontmatter(path)
        title = fm.get("title") or path.stem.replace("-", " ").replace("…", "")
        slug = slugify(title)
        band = band_for(topic)

        if topic.startswith(WELLNESS_PREFIX):
            collection = "wellness"
        elif topic.startswith(TRAVEL_PREFIX):
            collection = "journal"
        else:
            collection = "essays"

        routing_tags = tags_for(topic)
        tags = list(routing_tags)

        status = "pending"
        if "infrastructure-docs" in topic:
            status = "sanitize-or-exclude"

        entry = {
            "source": rel,
            "slug": slug,
            "title": title,
            "collection": collection,
            "band": band,
            "tags": tags,
            "phase": phase_for(topic),
            "status": status,
        }
        if rel in FLAGSHIPS:
            entry["tier"] = "pillar"
            entry["hashnode"] = True
            entry["status"] = "in_progress"
        entries.append(entry)
        by_band[band].append(entry)

    for band_name, items in by_band.items():
        start, end = DATE_BANDS[band_name]
        stagger_dates(items, start, end)

    manifest = {
        "generated": date.today().isoformat(),
        "total": len(entries),
        "skipped": skipped,
        "entries": entries,
    }
    OUT.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"Wrote {len(entries)} entries ({len(skipped)} skipped) → {OUT}")


def tags_for(topic: str) -> list[str]:
    if topic.startswith(WELLNESS_PREFIX):
        return ["wellness"]
    if topic.startswith("travel/destinations"):
        return ["travel", "oceania"]
    if topic.startswith(TRAVEL_PREFIX):
        return ["travel"]
    if topic.startswith(OPS_PREFIX):
        return ["ops"]
    mapping = {
        "the-craft": ["craft"],
        "philosophy-of-practice": ["craft"],
        "design-aesthetics": ["design", "craft"],
        "collaboration-culture": ["culture"],
        "ai-automation": ["ai", "craft"],
        "music-games": ["games", "craft"],
        "mythology-film": ["film", "craft"],
        "transmissions": ["craft"],
    }
    top = topic.split("/")[0]
    return mapping.get(top, ["craft"])


def phase_for(topic: str) -> int:
    if topic.startswith("the-craft") or topic.startswith("deployment-operations/dev-essays"):
        return 1
    if topic.split("/")[0] in {
        "philosophy-of-practice",
        "design-aesthetics",
        "ai-automation",
        "collaboration-culture",
    }:
        return 2
    if topic.startswith(TRAVEL_PREFIX):
        return 3
    if topic.startswith(WELLNESS_PREFIX):
        return 4
    return 5


if __name__ == "__main__":
    main()
