#!/usr/bin/env bash
# Run full shelf book-club batch with parallel workers, then sync manifest.
set -euo pipefail
cd "$(dirname "$0")"
LOG="book-club-batch.log"
PARALLEL="${PARALLEL:-8}"

echo "=== book-club batch start $(date -u +%Y-%m-%dT%H:%M:%SZ) parallel=$PARALLEL ===" | tee -a "$LOG"

node generate-book-club-reviews.mjs --all --resume --parallel "$PARALLEL" --skip-manifest 2>&1 | tee -a "$LOG"

echo "=== syncing manifest $(date -u +%Y-%m-%dT%H:%M:%SZ) ===" | tee -a "$LOG"
node sync-manifest-bodies.mjs 2>&1 | tee -a "$LOG"

echo "=== done $(date -u +%Y-%m-%dT%H:%M:%SZ) ===" | tee -a "$LOG"
node -e "const p=require('./book-club-progress.json'); console.log('completed', p.completed.length, 'failed', p.failed.length)"
