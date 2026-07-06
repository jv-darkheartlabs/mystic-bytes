#!/usr/bin/env bash
# Vision-read BookCovers and rename files to detected title slugs.
set -euo pipefail
cd "$(dirname "$0")"
PARALLEL="${PARALLEL:-6}"
LOG="vision-rename-run.log"

echo "=== vision rename start $(date -u +%Y-%m-%dT%H:%M:%SZ) parallel=$PARALLEL ===" | tee "$LOG"

node vision-rename-book-covers.mjs --resume --parallel "$PARALLEL" 2>&1 | tee -a "$LOG"

echo "=== done $(date -u +%Y-%m-%dT%H:%M:%SZ) ===" | tee -a "$LOG"
node -e "const r=require('./vision-rename-report.json'); console.log('stats', r.stats)"
