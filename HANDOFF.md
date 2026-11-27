# MEEDX WEB handoff

Start with [AGENTS.md](AGENTS.md) and [docs/RELEASE.md](docs/RELEASE.md).

- **Official Android Repo & Releases:** `alnouri96/local-cinema` (`main`)
- **Published Latest:** [`v1.0.0`](https://github.com/alnouri96/local-cinema/releases/tag/v1.0.0) (`versionCode = 20`, 2026-11-27), first stable release.
- **Official OTA Feed (`v19+`):** `https://meedx.pages.dev/api/v2/version.json`
- **Downloads Center:** `https://meedx.pages.dev/downloads` (Downloader code `3213660`)
- **Silent Legacy Bridge:** Keep `src/data/ota-bridge-v18.json` (`public/api/version.json`) untouched for at least 1+ week (until 2026-12-08+) so legacy installs finish migrating to `/downloads`.
