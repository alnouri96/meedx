# AGENTS.md: MEEDX WEB (`meedx.pages.dev`)

Companion public website and OTA feed repository for **Local Cinema**, linked back to the core app monorepo at [`G:\Local Cinema\AGENTS.md`](file:///G:/Local%20Cinema/AGENTS.md).

- **Stack:** Vite 7 + React 19 + Tailwind CSS 4 + Swiper + Playwright (`package.json`)
- **Hosting / Remote:** Cloudflare Pages (`https://meedx.pages.dev`) · GitHub `https://github.com/alnouri96/meedx.git` (`main`)

---

## 1. Current State

- **Active Release:** `v1.0.0-beta.12` (`versionCode = 12`, released `2026-11-19`).
- **Repository State:** Clean directory layout on `main` (post-cleanup commit `1a72fcd`), synced with `v1.0.0-beta.12` metadata and deployed live on Cloudflare Pages (`https://meedx.pages.dev`).
- **Production URLs:**
  - Live site: `https://meedx.pages.dev`
  - OTA feed: `https://meedx.pages.dev/api/version.json`
  - Public GitHub repo: `https://github.com/alnouri96/meedx`
  - GitHub Releases: `https://github.com/alnouri96/meedx/releases/tag/v1.0.0-beta.12`
  - Studio profile: `https://github.com/alnouri96`
- **Cloudflare Pages Deploy Command:** `npx wrangler pages deploy dist --project-name=meedx --branch=main`

### Published APKs (`v1.0.0-beta.12`, source: `G:\Local Cinema\releases\v1.0.0-beta.12\`)

| App | Package ID | Size (Bytes) | `SHA-256` | Direct Download URL |
| --- | --- | ---: | --- | --- |
| `Local Cinema TV` | `com.meedx.localcinema.tv` | `39285929` | `71e5af2f7e1a0435741ede68ba1f32f51f3262c61df9f98a2c771bc54351fb86` | `https://github.com/alnouri96/meedx/releases/download/v1.0.0-beta.12/LocalCinema-TV-v1.0.0-beta.12.apk` |
| `Local Cinema Manager` | `com.meedx.localcinema.manager` | `119292370` | `4ec70f236058ee275571153726e8636815a633d5f38fd46c7e42f4768f101778` | `https://github.com/alnouri96/meedx/releases/download/v1.0.0-beta.12/LocalCinema-Manager-Phone-v1.0.0-beta.12.apk` |

### Live UI State Summary

- RTL and Bidi isolation via `<bdi dir="ltr">` and `unicode-bidi: isolate` across `MEEDX` / `MEEDX Studio` copy.
- 14-slide (28-image) synchronized TV, Phone, and Windows PC (`SMB` · `.gallery-pc`) screenshot gallery.
- Three-zone Grid Zoom Lightbox supporting 100% to 300% zoom, pan, pinch, and mouse-wheel navigation.
- Zoomable ZainCash and QiCard QR codes on a white background inside the support lightbox.
- Seven-in-one `EquationPanel`, plus `#setup-guide` and `#addons` scoped exclusively to `/apps/local-cinema`.
- Downloader code `3213660` (`meedx.pages.dev/tv`) scoped to the Android TV card only.

---

## 2. Repository Layout

- **API Feeds, Redirects & Public Assets (`public/`):**
  - `public/api/version.json`: Live OTA feed polled by `shared-updater/` (`UpdateConfig.UPDATE_JSON_URL`), matching `builds[]` and top-level `tv` / `phone` objects.
  - `public/api/config.json`: Remote app config (`traktClientId`, `googleClientId`, `zeroAccountMode`). Keep `traktClientId` synchronized with PKCE `DEFAULT_PUBLIC_CLIENT_ID` (`ysZZKQ4X6LcHghcKf1ReOIsuzELNIcygal7ZUBYSwSE`).
  - `public/api/addons.json`: Curated addon feed.
  - `public/_redirects`: HTTP `302` shortlinks (`/tv`, `/phone`) forwarding directly to GitHub Releases assets, plus SPA route fallback.
  - `public/_headers`: Security headers and `Cache-Control: no-cache` on `/api/version.json`.
  - `public/assets/`: `meedx.svg`, `github/`, `icons/`, `qr/`, `screenshots/`.
- **App Data & UI (`src/`):**
  - `src/main.jsx`, `src/config/siteConfig.js`, `src/data/catalog.json`, `src/data/screenshots.json`, `src/data/screenshot-copy.js`, `src/AppsShowcasePage.jsx`, `src/AppDetailPage.jsx`, `src/DownloadAppCard.jsx`, `src/InteractiveShowcase.jsx`, `src/AddonsConnectionsSection.jsx`, `src/EquationPanel.jsx`, `src/ZoomViewer.jsx`, `src/GoldParticles.jsx`, `src/panels.jsx`, `src/style.css`, `src/gallery.css`, `src/showcase.css`.
- **Verification, Asset & Utility Scripts (`scripts/`):**
  - `scripts/verify-downloads.mjs` (`npm run verify`): Reads APKs directly from `G:\Local Cinema\releases\v<version>\` (or `LOCAL_CINEMA_RELEASES`) and verifies SHA-256 and byte size parity across `src/data/catalog.json`, `public/api/version.json`, and GitHub Release URLs.
  - `scripts/sync-assets.py`: Imports source screenshots and QR data from `MEEDX_Assets/` and refreshes manifests.
  - `scripts/verify-ui.mjs`: Playwright responsive viewport and interactive UI suite.
  - `scripts/setup_meedx_assets.py`: Creates the local `MEEDX_Assets/` folder hierarchy without copying any APK binaries.
  - `scripts/backup-site.bat` · `scripts/backup-site.ps1`: Guard stubs reminding agents that ZIP backups are disabled.
- **Documentation & Archives (`docs/` and root):**
  - `AGENTS.md`: Single authoritative agent guide for `G:\MEEDX WEB`.
  - `docs/HANDOFF_ARCHIVE.md`: Archived historical session logs formerly stored in `AGENT_HANDOFF.md`.
  - `README.md`, `DESIGN.md`, `PRODUCT.md`, `index.html`, `package.json`, `vite.config.js`, `.gitignore`.
- **Local Gitignored Folders:**
  - `MEEDX_Assets/` (raw local screenshots, QR data, raw branding images), `backups/`, `verification/`, `dist/`, `.wrangler/`, `.agents/`.

---

## 3. Release Sync Workflow from `G:\Local Cinema`

1. Stage audited TV and Phone APKs and `checksums.txt` in `G:\Local Cinema\releases\v<version>\` (also reflected in `G:\Local Cinema\version.json` and `G:\Local Cinema\CHANGELOG-CINEMA.md` / `script/sync_changelog.py`).
2. Upload the `.apk` files and `checksums.txt` to GitHub Releases on `alnouri96/meedx`.
3. Update `public/api/version.json`, `src/data/catalog.json`, `public/_redirects`, `README.md`, and `AGENTS.md` (appending historical rows to `docs/HANDOFF_ARCHIVE.md` when needed) with exact sizes, SHA-256 hashes, and bilingual changelogs.
4. Run `npm run verify` (checks `G:\Local Cinema\releases\`) and `npm run build`, deploy `dist/` to Cloudflare Pages, and push `main` to `origin`.

---

## 4. Strict Hygiene Rules

- **ZERO Binary Rule (`.apk` / `.zip`):** Never copy or generate `.apk` or `.zip` files anywhere inside `G:\MEEDX WEB\` (including `public/`, `MEEDX_Assets/`, `dist/`, `backups/`). All downloads and redirects must link to GitHub Releases, while `verify-downloads.mjs` reads source APKs from `G:\Local Cinema\releases\`.
- **Privacy Rule:** Never push private `G:\Local Cinema` app source code, signing keystores, or API secrets into `G:\MEEDX WEB`.
- **Dual-Sync Rule:** Always pass `npm run verify` and `npm run build`, deploy `dist/` to Cloudflare Pages (`npx wrangler pages deploy dist --project-name=meedx --branch=main`), and push `main` to `origin`.
- **Mandatory `ste80-humanizer` Copy Rule:** Apply the `ste80-humanizer` skill (Pass 1 `§1–§26` and Pass 2 `S1–S15`) to all visible website copy, `catalog.json` / `version.json` patch notes, `README.md`, and GitHub Releases notes. Keep sentences short, active, and factual without marketing fluff or em-dashes (`—`). Wrap Arabic GitHub Release sections in `<div dir="rtl" align="right">...</div>` and begin every Arabic bullet with an Arabic word.
