# AGENTS.md — MEEDX WEB (`meedx.pages.dev`)

Companion public website and OTA feed repository for **Local Cinema**, linked back to the core app monorepo at [`G:\Local Cinema\AGENTS.md`](file:///G:/Local%20Cinema/AGENTS.md).

- **Stack:** Vite 7 + React 19 + Tailwind CSS 4 + Swiper + Playwright (`package.json`)
- **Hosting / Remote:** Cloudflare Pages (`https://meedx.pages.dev`) · GitHub `https://github.com/alnouri96/meedx.git` (`main`)

---

## 1. Repository Layout

- **API Feeds & Redirects (`public/`):**
  - `public/api/version.json` — Live OTA feed polled by `shared-updater/` (`UpdateConfig.UPDATE_JSON_URL`), matching `builds[]` and top-level `tv` / `phone` objects.
  - `public/api/config.json` — Remote app config (`traktClientId`, `googleClientId`, `zeroAccountMode`). Keep `traktClientId` synchronized with PKCE `DEFAULT_PUBLIC_CLIENT_ID` (`ysZZKQ4X6LcHghcKf1ReOIsuzELNIcygal7ZUBYSwSE`).
  - `public/api/addons.json` — Curated addon feed.
  - `public/_redirects` — HTTP `302` shortlinks (`/tv`, `/phone`) forwarding directly to GitHub Releases assets, plus SPA route fallback.
- **App Data & UI (`src/`):**
  - `src/data/catalog.json` — App cards, version metadata, SHA-256 digests, byte sizes, and bilingual `Patch Notes`.
  - `src/config/siteConfig.js`, `src/data/screenshots.json`, `src/data/screenshot-copy.js`, `src/AppsShowcasePage.jsx`, `src/AppDetailPage.jsx`, `src/DownloadAppCard.jsx`, `src/InteractiveShowcase.jsx`, `src/AddonsConnectionsSection.jsx`, `src/EquationPanel.jsx`, `src/ZoomViewer.jsx`, `src/GoldParticles.jsx`.
- **Verification & Asset Scripts (`scripts/`):**
  - `scripts/verify-downloads.mjs` (`npm run verify`) — Reads APKs directly from `G:\Local Cinema\releases\v<version>\` (or `LOCAL_CINEMA_RELEASES`), verifies SHA-256 & byte size parity across `catalog.json`, `public/api/version.json`, and GitHub Release URLs.
  - `scripts/sync-assets.py` · `scripts/verify-ui.mjs`.
- **Release History:** `README.md`, `AGENT_HANDOFF.md`, `DESIGN.md`, `PRODUCT.md`.

---

## 2. Release Sync Workflow from `G:\Local Cinema`

1. Stage audited TV and Phone APKs and `checksums.txt` in `G:\Local Cinema\releases\v<version>\` (also reflected in `G:\Local Cinema\version.json` and `G:\Local Cinema\CHANGELOG-CINEMA.md` / `script/sync_changelog.py`).
2. Upload the `.apk` files and `checksums.txt` to GitHub Releases on `alnouri96/meedx`.
3. Update `public/api/version.json`, `src/data/catalog.json`, `public/_redirects`, `README.md`, and `AGENT_HANDOFF.md` with exact sizes, SHA-256 hashes, and bilingual changelogs.
4. Run `npm run verify` (checks `G:\Local Cinema\releases\`) and `npm run build`, deploy `dist/` to Cloudflare Pages, and push `main` to `origin`.

---

## 3. Strict Hygiene Rules

- **ZERO Binary Rule (`.apk` / `.zip`):** Never copy or generate `.apk` or `.zip` files anywhere inside `G:\MEEDX WEB\` (including `public/`, `MEEDX_Assets/`, `dist/`, `backups/`). All downloads and redirects must link to GitHub Releases, while `verify-downloads.mjs` reads source APKs from `G:\Local Cinema\releases\`.
- **Privacy Rule:** Never push private `G:\Local Cinema` app source code, signing keystores, or API secrets into `G:\MEEDX WEB`.
