import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
assert.ok(args.every((arg) => ['--sync', '--published', '--live'].includes(arg)), 'Supported options: --sync, --published, --live');
const sync = args.includes('--sync');
const checkLive = args.includes('--live');
const checkPublished = checkLive || args.includes('--published');
const root = new URL('../', import.meta.url);
const appRoot = process.env.LOCAL_CINEMA_ROOT || fileURLToPath(new URL('../../Local%20Cinema/', import.meta.url));
const releasesRoot = process.env.LOCAL_CINEMA_RELEASES || resolve(appRoot, 'releases');
const repository = 'alnouri96/meedx';
const catalogFile = new URL('src/data/catalog.json', root);
const feedFile = new URL('public/api/version.json', root);
const redirectsFile = new URL('public/_redirects', root);

async function readJson(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}

const appVersion = await readJson(join(appRoot, 'version.json'));
const catalog = await readJson(catalogFile);
const redirects = (await readFile(redirectsFile, 'utf8')).trimEnd().split(/\r?\n/);
const tag = 'v' + appVersion.tv.versionName;
assert.match(tag, /^v\d+\.\d+\.\d+(?:-[\w.-]+)?$/);
assert.equal(appVersion.tv.versionName, appVersion.phone.versionName, 'TV and Phone tags differ');
assert.equal(appVersion.tv.versionCode, appVersion.phone.versionCode, 'TV and Phone version codes differ');
assert.ok(Number.isInteger(appVersion.tv.versionCode) && appVersion.tv.versionCode > 0, 'Invalid versionCode');
const releaseDir = join(releasesRoot, tag);
const checksumsFile = join(releaseDir, 'checksums.txt');
const checksums = (await readFile(checksumsFile, 'utf8')).trim().split(/\r?\n/);
const targets = [
  { id: 'tv', packageId: 'com.meedx.localcinema.tv', prefix: 'LocalCinema-TV-' },
  { id: 'phone', packageId: 'com.meedx.localcinema.manager', prefix: 'LocalCinema-Manager-Phone-' },
];
assert.deepEqual(catalog.map(({ id }) => id), targets.map(({ id }) => id), 'Expected exactly TV and Phone catalog entries');
assert.equal(checksums.length, targets.length, 'Expected exactly two entries in checksums.txt');

const expectedFeed = {};
const builds = [];
const expectedAssets = new Map();
for (const { id, packageId, prefix } of targets) {
  const release = appVersion[id];
  const build = catalog.find((entry) => entry.id === id);
  const fileName = prefix + tag + '.apk';
  const url = 'https://github.com/' + repository + '/releases/download/' + tag + '/' + fileName;
  assert.equal(release.fileName, fileName, id + ' filename');
  assert.equal(release.apkUrl, url, id + ' public URL');
  assert.equal(release.latestVersionName, release.versionName, id + ' latestVersionName');
  assert.equal(release.latestVersionCode, release.versionCode, id + ' latestVersionCode');
  assert.match(release.releaseDate, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(build.packageId, packageId, id + ' package ID');
  assert.equal(build.variant, 'standard', id + ' variant');
  assert.equal(build.available, true, id + ' availability');

  const currentNotes = build.updateNotes.filter((entry) => entry.latest);
  assert.equal(currentNotes.length, 1, id + ' must mark a single current release in updateNotes');
  assert.equal(build.updateNotes[0], currentNotes[0], id + ' current release must be first');
  assert.equal(currentNotes[0].version, release.versionName, id + ' patch notes version');
  assert.equal(currentNotes[0].versionCode, release.versionCode, id + ' patch notes versionCode');
  assert.equal(currentNotes[0].date, release.releaseDate, id + ' patch notes date');
  assert.ok(build.changelog.ar.trim(), id + ' Arabic changelog is required');

  const file = join(releaseDir, fileName);
  assert.equal((await stat(file)).size, release.sizeBytes, id + ' file size');
  const hash = createHash('sha256');
  for await (const chunk of createReadStream(file)) hash.update(chunk);
  const digest = hash.digest('hex');
  assert.equal(digest, release.sha256, id + ' SHA-256');
  assert.ok(checksums.includes(digest + '  ' + fileName), id + ' checksums.txt entry');
  expectedAssets.set(fileName, { size: release.sizeBytes, digest: 'sha256:' + digest });

  builds.push({
    ...build,
    version: release.versionName,
    versionCode: release.versionCode,
    releaseDate: release.releaseDate,
    url,
    sizeBytes: release.sizeBytes,
    sha256: digest,
    specs: { ...build.specs, sizeLabel: (release.sizeBytes / 1048576).toFixed(2) + ' MiB' },
    changelog: { ...build.changelog, en: release.changelog },
  });
  const { fileName: _fileName, releaseDate: _releaseDate, ...ota } = release;
  expectedFeed[id] = { ...ota, changelog: { en: release.changelog, ar: build.changelog.ar } };
  console.log('Verified local APK', fileName, release.sizeBytes, digest);
}
expectedFeed.builds = builds;

const expectedRedirects = [...redirects];
for (const { id, url } of builds) {
  const indexes = redirects.flatMap((line, index) => line.split(/\s+/)[0] === '/' + id ? [index] : []);
  assert.equal(indexes.length, 1, 'Expected one redirect for /' + id);
  expectedRedirects[indexes[0]] = '/' + id + ' ' + url + ' 302';
}

const publicFiles = await readdir(new URL('public/', root), { recursive: true });
assert.ok(!publicFiles.some((path) => /\.(apk|zip|jks|keystore|p12)$/i.test(path)), 'Public assets contain a prohibited binary');
assert.ok(!publicFiles.some((path) => /(^|[\\/])(?:qicard-qr|zaincash-qr|wallet_numbers)\.[^\\/]+$/i.test(path)), 'Review public payment assets before shipping');

if (checkPublished) {
  const release = JSON.parse(execFileSync('gh', ['api', 'repos/' + repository + '/releases/latest'], { encoding: 'utf8' }));
  assert.equal(release.tag_name, tag, 'GitHub Latest differs from the app manifest. Check the approved tag and its release classification.');
  const checksumBytes = await readFile(checksumsFile);
  expectedAssets.set('checksums.txt', {
    size: checksumBytes.length,
    digest: 'sha256:' + createHash('sha256').update(checksumBytes).digest('hex'),
  });
  assert.equal(release.assets.length, expectedAssets.size, 'Unexpected public release assets');
  for (const asset of release.assets) {
    assert.deepEqual({ size: asset.size, digest: asset.digest }, expectedAssets.get(asset.name), 'GitHub asset ' + asset.name);
  }
  console.log('Verified GitHub Latest and release assets', tag);
}

if (checkLive) {
  const site = 'https://meedx.pages.dev';
  const feedResponse = await fetch(site + '/api/version.json', { signal: AbortSignal.timeout(15000) });
  assert.ok(feedResponse.ok, 'Live OTA feed returned HTTP ' + feedResponse.status);
  const feed = await feedResponse.json();
  for (const { id, url, version, versionCode, sizeBytes, sha256 } of builds) {
    const { changelog: _changelog, ...distribution } = expectedFeed[id];
    for (const [key, value] of Object.entries(distribution)) {
      assert.equal(feed[id]?.[key], value, 'Live OTA ' + id + '.' + key);
    }
    assert.deepEqual(feed[id]?.changelog, expectedFeed[id].changelog, 'Live OTA notes ' + id);
    const liveBuild = feed.builds?.find((build) => build.id === id);
    assert.deepEqual(
      [liveBuild?.url, liveBuild?.version, liveBuild?.versionCode, liveBuild?.sizeBytes, liveBuild?.sha256],
      [url, version, versionCode, sizeBytes, sha256],
      'Live catalog ' + id,
    );
    const download = await fetch(site + '/' + id, {
      method: 'HEAD',
      redirect: 'manual',
      signal: AbortSignal.timeout(15000),
    });
    assert.equal(download.status, 302, 'Live /' + id + ' redirect status');
    assert.equal(download.headers.get('location'), url, 'Live /' + id + ' APK URL');
  }
  console.log('Verified live OTA and APK redirects', tag);
}

if (sync) {
  await writeFile(catalogFile, JSON.stringify(builds, null, 2) + '\n');
  await writeFile(feedFile, JSON.stringify(expectedFeed, null, 2) + '\n');
  await writeFile(redirectsFile, expectedRedirects.join('\n') + '\n');
  console.log('Updated local catalog, OTA feed, and APK redirects for', tag);
} else {
  assert.deepEqual(catalog, builds, 'Catalog drift. Review release notes and run npm run sync:release.');
  assert.deepEqual(await readJson(feedFile), expectedFeed, 'OTA drift. Run npm run sync:release.');
  assert.deepEqual(redirects, expectedRedirects, 'APK redirect drift. Run npm run sync:release.');
}
