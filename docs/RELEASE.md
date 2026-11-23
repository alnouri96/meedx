# MEEDX website release procedure

The public distribution repository is `alnouri96/meedx`. Cloudflare Pages serves production at [meedx.pages.dev](https://meedx.pages.dev). The Android workspace owns the signed release artifacts and bilingual release notes.

## Local verification

Use Node.js, npm, Chrome, and Wrangler. Install the project dependencies with `npm ci`. The scripts find the sibling Local Cinema workspace by default. When it is elsewhere, set `LOCAL_CINEMA_ROOT`. Use `LOCAL_CINEMA_RELEASES` if the release archives are elsewhere.

~~~powershell
npm run verify
npm run build
npx wrangler pages dev dist --ip 127.0.0.1 --port 4173
~~~

With the preview running, run `npm run verify:ui` in a second terminal. It checks six viewport widths, Arabic and English, download links, section anchors, screenshots, and the 404 page. It prepares a Telegram draft in the browser test without opening Telegram. The Pages preview applies the same redirect file as the production build.

## Prepare an Android release

1. Follow `docs/RELEASE.md` in the Android checkout. Use the audited pair in `releases/<tag>/` and the corresponding `version.json`.
2. Add the Arabic and English patch notes for each app in `src/data/catalog.json`. Put the new entry first and mark only it as current. Update the Arabic release summary and check platform and device requirements.
3. Run `npm run sync:release`. It checks the APKs against the app's manifest, then populates catalog metadata, OTA JSON, and the two APK redirects.
4. Run the local checks above. Verify the app source commit and the site commit that will be part of the release.

## Publish after approval

1. Confirm the user authorized this version. Push the reviewed Android source and its source tag to the public Android source repository. Keep its APK distribution in the public repository.
2. Push the tag for the reviewed website commit. Publish the TV APK, Phone APK, and `checksums.txt` together with the approved notes. Set `--latest` and leave GitHub's Pre-release option off for the approved distribution build. A beta can retain its existing tag and product label.
3. Run `npm run verify -- --published`. It checks GitHub Latest and compares the three asset names, byte sizes, and digests with the local originals. Keep the existing public files for historical tags.
4. Push the verified site source to `main`. For the direct-upload Pages project, deploy the matching `dist` with `npx wrangler pages deploy dist --project-name=meedx --branch=main`. If the project uses Git integration, let the configured production build deploy that commit.
5. Run `npm run verify -- --live`. It also checks the production OTA metadata and the `/tv` and `/phone` redirects. Check `/apps/local-cinema#patch-notes`, `/apps/local-cinema#setup-guide`, and a 404 route. Confirm no unused assets remain in `public/` and verify via `gh api` that `main` (`alnouri96/meedx`) and `upgrade-6.6.4` (`alnouri96/local-cinema`) are the sole clean default branches matching `Latest`. Record the deployed commit and URL in the Android handoff.

Use the approved tag, the audited APK paths, and the approved notes file in these commands:

~~~powershell
gh release create $tag $tvApk $phoneApk $checksums --repo alnouri96/meedx --title "Local Cinema $tag" --notes-file $notes --verify-tag --latest --prerelease=false
~~~

If the same approved release is already published as a pre-release, update its classification in place:

~~~powershell
gh release edit $tag --repo alnouri96/meedx --prerelease=false --latest
~~~

For website-only changes, use the current published pair for verification. Run the same local and live site checks. Keep the existing release metadata unless the task changes it.

## Keep downloads recoverable

Use `/downloads` in profile and README links. GitHub's `/releases/latest` excludes pre-releases. Keep the shortlinks pointed to versioned APK URLs in the public repository. Verify any published Downloader code independently. A code can open the Downloads hub while `/tv` links directly to the APK.

If deployment serves broken distribution metadata, restore the last verified Pages deployment and correct the source on `main`. Keep the older APK URLs live. Avoid changing version codes or overwriting published files during recovery.
