# MEEDX WEB agent guide

This public checkout serves the website, update feed, and download links for Local Cinema. Its production repository is `alnouri96/meedx` on `main`. The Android source lives in the sibling Local Cinema checkout.

## Start here

1. Use `git status --short --branch` to identify the checkout and any pending work.
2. Read the Android handoff in `docs/CONTINUATION.md` in the sibling checkout. Verify the current tag with `gh api repos/alnouri96/meedx/releases/latest --jq .tag_name` before reporting release status. Follow [the website release procedure](docs/RELEASE.md) for publishing.
3. Work locally unless the user requested publication. Before any site deployment, run `npm run verify`, `npm run build`, and the [Pages preview checks](docs/RELEASE.md#local-verification).

## Source map

| Path | Purpose |
| --- | --- |
| `src/main.jsx` | Routes, section links, Arabic and English navigation |
| `src/AppDetailPage.jsx` | Setup, add-ons, screenshots, and both apps' patch notes |
| `src/DownloadAppCard.jsx` | APK downloads, build details, and checksums |
| `src/data/catalog.json` | Website metadata and bilingual patch notes |
| `public/api/version.json` | OTA feed. Generate with `npm run sync:release` |
| `public/api/config.json` and `public/api/addons.json` | Public app configuration and curated add-ons |
| `public/_redirects` and `public/_headers` | Pages routes, APK shortlinks, and response headers |

## Publication rules

- Publish APKs to GitHub Releases in `alnouri96/meedx`. Use the Android checkout's audited archives as input. Keep APKs, ZIP archives, signing files, private source, and secrets out of this checkout.
- Keep one site home for each action. `/apps/local-cinema` owns setup and patch notes. `/downloads` owns APKs and checksums. `/tv` and `/phone` are shortlinks to the current public APKs.
- Use the catalog for version labels and preserve the OTA schema. Keep README and profile download links pointed to `/downloads`. Publish each approved public app build as a regular GitHub release with `--latest`. Keep the beta suffix where applicable and run `npm run verify -- --live` after deployment.
- Keep personal payment details, QR images, local paths, device identifiers, private notes, and raw screenshots out of the public working tree. Review images for pairing codes and personal content before adding them.
- Use Local Cinema names in product copy. Preserve third-party notices where required. Apply `ste80-humanizer` to README, release notes, and site copy. Keep Arabic RTL and English LTR in UI checks.
