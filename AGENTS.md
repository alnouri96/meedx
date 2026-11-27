# MEEDX WEB agent guide

Website, Downloads Center, and OTA feed for Local Cinema served via Cloudflare Pages at `https://meedx.pages.dev`. Android source and official GitHub Release APKs live in `alnouri96/local-cinema` (branch `main`).

## Start here

1. Run `git status --short --branch` and check published Latest via `gh api repos/alnouri96/local-cinema/releases/latest --jq .tag_name`.
2. Read [docs/RELEASE.md](docs/RELEASE.md) when syncing or publishing a release. Run `npm run verify`, `npm run build`, and `npm run verify -- --live` after deploy.

## Permanent engineering rules

1. **Modular & Isolated Code:** Put new sections, dialogs, or helpers in focused `src/` files and keep the source map below current.
2. **No Duplication / Reuse Existing Components:** Reuse existing cards, modals, data helpers, and CSS tokens. Keep Patch Notes unified (no duplicated TV/Phone changelog blocks).
3. **Targeted Read Policy:** Read only this file and open target files directly.

## Source map

| Path | Purpose |
| --- | --- |
| `src/main.jsx` | Routes, anchors, AR RTL / EN LTR navigation |
| `src/AppsShowcasePage.jsx`, `src/AppDetailPage.jsx` | Apps overview, setup, add-ons, screenshots, unified patch notes |
| `src/DownloadAppCard.jsx`, `src/ReleaseChangelog.jsx` | APK cards, build metadata, checksums, unified bilingual changelog modal |
| `src/AddonsConnectionsSection.jsx`, `src/InteractiveShowcase.jsx`, `src/ZoomViewer.jsx`, `src/panels.jsx`, `src/GoldParticles.jsx` | Showcase, add-ons, lightbox, and visual panels |
| `src/config/siteConfig.js`, `src/data/catalog.json`, `src/data/screenshots.json`, `src/data/screenshot-copy.js` | Site config, v19+ catalog metadata, screenshots, bilingual copy |
| `public/api/v2/version.json`, `public/api/config.json`, `public/api/addons.json` | Main v19+ OTA feed (`npm run sync:release`), public config, curated add-ons |
| `src/data/ota-bridge-v18.json`, `public/api/version.json` | Keep `ota-bridge-v18.json` intact (at least 1+ week) so legacy `/api/version.json` stays isolated from `/downloads` and `/api/v2/version.json` |
| `public/_redirects`, `public/_headers`, `scripts/` | Pages routes, `/tv` & `/phone` shortlinks, headers, verify scripts |

## Publication & safety rules

- Official APK assets live exclusively on `alnouri96/local-cinema` GitHub Releases (`main`). Never commit APKs, ZIPs, signing files, secrets, payment info, QRs, local paths, or device IDs into `MEEDX WEB`.
- One home per action: `/apps/local-cinema` (setup & unified patch notes), `/downloads` (APKs & checksums), `/tv` & `/phone` (current APK redirects), `/api/v2/version.json` (main OTA feed).
- Current Latest: `v1.0.0` (`versionCode = 20`, 2026-11-27), first stable release.
