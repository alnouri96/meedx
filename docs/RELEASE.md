# MEEDX website release procedure

Cloudflare Pages serves production at [meedx.pages.dev](https://meedx.pages.dev). Official Android source code and signed GitHub Release APKs live exclusively in `alnouri96/local-cinema` (`main`).

## Official endpoints & channels

- **GitHub Releases (`Latest`):** `https://github.com/alnouri96/local-cinema/releases`
- **Main OTA Feed (`v19+`):** `https://meedx.pages.dev/api/v2/version.json`
- **Downloads Center & Shortlinks:** `https://meedx.pages.dev/downloads`, `/tv`, `/phone` (Downloader code `3213660`)
- **Silent Legacy Bridge Note:** Keep `src/data/ota-bridge-v18.json` untouched for at least 1+ week so `/api/version.json` stays isolated while `/downloads` and `/api/v2/version.json` serve `v1.0.0-beta.19` and upcoming stable `v1.0.0`.
- **Versioning Roadmap:** `versionCode 19` (`v1.0.0-beta.19`) is the final beta release; the next release (`versionCode 20`) will be the official stable **`v1.0.0`** (`versionName = "1.0.0"`).

## Sync, verify, build, and deploy

1. Ensure the approved GitHub Release (`--latest`, `--prerelease=false`) with `LocalCinema-TV-<tag>.apk`, `LocalCinema-Manager-Phone-<tag>.apk`, and `checksums.txt` is published on `alnouri96/local-cinema` (`main`) and `Local Cinema/version.json` is updated.
2. Keep the current bilingual TV, Phone, and Shared sections in the Android repository version manifest. The sync step imports the sections into `src/data/catalog.json` and the v2 OTA feed.
3. Run sync, published check, and production build:

~~~powershell
npm run sync:release
npm run verify -- --published
npm run build
~~~

4. Commit and push `main`, deploy to Cloudflare Pages, and verify live production:

~~~powershell
npx wrangler pages deploy dist --project-name=meedx --branch=main
npm run verify -- --live
~~~

`npm run verify -- --live` verifies GitHub Latest assets on `alnouri96/local-cinema`, `/api/v2/version.json`, `/downloads` (`200`), `/tv` and `/phone` (`302` to `alnouri96/local-cinema`), and the isolated `/api/version.json` bridge.
