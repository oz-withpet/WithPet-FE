#!/bin/sh

set -e

ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUTPUT_DIR="$ROOT_DIR/output"

echo "[build.sh] preparing clean output directory"
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

echo "[build.sh] copying project files (excluding node_modules/.next/output/.git)"
rsync -av --delete \
  --exclude '.git' \
  --exclude '.next' \
  --exclude 'node_modules' \
  --exclude 'output' \
  "$ROOT_DIR/" "$OUTPUT_DIR/"

echo "[build.sh] output prepared at $OUTPUT_DIR"
