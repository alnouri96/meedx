# MEEDX WEB agent guide

Public repo for the MEEDX website, OTA feed, and Local Cinema downloads (`alnouri96/meedx`, `main`). Android source lives in sibling `Local Cinema` (`alnouri96/local-cinema`, `upgrade-6.6.4`).

## Start here

1. Run `git status --short --branch` and check published Latest (`v1.0.0-beta.16` until approved release) via `gh api repos/alnouri96/meedx/releases/latest --jq .tag_name`.
2. Read [docs/RELEASE.md](docs/RELEASE.md) only when staging/publishing a release. Work locally unless publication is requested; run `npm run verify`, `npm run build`, and [Pages preview checks](docs/RELEASE.md#local-verification) before deploy.

## Permanent engineering rules

1. **Modular & Isolated Code:** Put new sections, dialogs, or helpers in focused `src/` files and add them to the source map below immediately.
2. **No Duplication / Reuse Existing Components:** Reuse existing cards, modals, data helpers, and CSS tokens instead of building duplicate variants.
3. **Targeted Read Policy:** Read only this file and open target files via `rg`; skip Android repos and unrelated docs. Read [DESIGN.md](DESIGN.md) or `ui-ux-pro-max` only for UI/UX tasks.

## Source map

| Path | Purpose |
| --- | --- |
| `src/main.jsx` | Routes, anchors, AR RTL / EN LTR navigation |
| `src/AppsShowcasePage.jsx`, `src/AppDetailPage.jsx` | Apps overview, setup, add-ons, screenshots, patch notes |
| `src/DownloadAppCard.jsx`, `src/ReleaseChangelog.jsx` | APK cards, build metadata, checksums, bilingual changelog modal |
| `src/AddonsConnectionsSection.jsx`, `src/InteractiveShowcase.jsx`, `src/ZoomViewer.jsx`, `src/panels.jsx`, `src/GoldParticles.jsx` | Showcase, add-ons, lightbox, and visual panels |
| `src/config/siteConfig.js`, `src/data/catalog.json`, `src/data/screenshots.json`, `src/data/screenshot-copy.js` | Site config, version metadata, screenshots, bilingual copy |
| `public/api/version.json`, `public/api/config.json`, `public/api/addons.json` | OTA feed (`npm run sync:release`), public config, curated add-ons |
| `public/_redirects`, `public/_headers`, `scripts/` | Pages routes, `/tv` & `/phone` shortlinks, headers, verify scripts |

## Publication & safety rules

- Publish audited APKs only to `alnouri96/meedx` GitHub Releases (never commit APKs, ZIPs, signing files, secrets, payment info, QRs, local paths, device IDs, or personal screenshots).
- One home per action: `/apps/local-cinema` (setup/notes), `/downloads` (APKs/checksums), `/tv` & `/phone` (current APK links).
- Preserve OTA schema, keep `v1.0.0-beta.16` as `Latest` until explicit release approval, publish regular Releases with `--latest`, and run `npm run verify -- --live` after deploy.
- **Single-Branch & Asset Hygiene:** `main` is the sole default branch of `alnouri96/meedx` (delete temporary cleanup branches locally and remotely after merge), and `upgrade-6.6.4` is the sole default branch of `alnouri96/local-cinema`. Before every release, check `public/` for unused assets and verify clean branches plus matching `Latest` via `gh api`.
- Apply `ste80-humanizer` to `README.md`, release notes, and public copy; keep AR RTL/EN LTR verified; never bloat `AGENTS.md` with changelogs or SHA-256 hashes.
