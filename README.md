# MEEDX Studio

Arabic RTL by default, with an English LTR toggle. The gallery contains ten bilingual slides made from the supplied synchronized TV and phone captures. Open either device image to zoom from 100% to 300%, pan, or switch devices. The browser supports the mouse wheel, touch pinch and keyboard controls.

```powershell
npm install
npm run verify
npm run build
npm run preview -- --host 127.0.0.1
node scripts/verify-ui.mjs
.\backup-site.bat
```

## Supplied assets

Run `python scripts/sync-assets.py` to import assets from `MEEDX_Assets`. The script requires Python 3.11+, Pillow for privacy redactions, and Android SDK Build Tools 36.0.0. It prioritizes identical timestamps before accepting differences below 30 seconds. Bilingual descriptions live in `src/data/screenshot-copy.js`.

The pairing QR and TV network address are covered in the served TV capture, and unrelated private thumbnails are covered in the served phone capture. The source images are retained in the local input folder and backup. `src/config/siteConfig.js` contains payment and Telegram settings, and uses the download catalog as its source for file metadata. The Telegram form opens a draft for the visitor to send.

## APK updates

`src/data/catalog.json` lists eight APKs with package IDs, versions, exact sizes, and SHA-256 hashes. The website serves the APKs locally. The optional Arabic, LTR, and legacy builds are separate download choices. `public/api/version.json` keeps the app-compatible `tv` and `phone` entries for the standard beta and lists all variants under `builds`. The release URLs use the project’s existing GitHub release path. Verify public HTTPS availability and publish the feed at the URL compiled into the apps before relying on remote automatic updates.

The site remains a local preview. The download confirmation is a UI step. Any future bot protection requires verification on the server.
