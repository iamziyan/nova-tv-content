#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"

[ -f icon.png ] || python3 make_icons.py
read -r APP_ID VERSION < <(python3 bump.py)
echo "Building ${APP_ID} v${VERSION}..."

rm -rf build dist && mkdir -p build dist images
cp index.html app.js screens.js screens.css appinfo.json icon.png largeIcon.png build/
cp -R images build/

ares-package build -o dist
ares-install --device tv "dist/${APP_ID}_${VERSION}_all.ipk"
ares-launch --device tv "${APP_ID}"
echo "Nova TV v${VERSION} is live on your LG C6."
