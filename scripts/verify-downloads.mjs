import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { createReadStream, existsSync } from 'node:fs';
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
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
const repository = 'alnouri96/local-cinema';
const bridgeRepository = 'alnouri96/meedx';
const catalogFile = new URL('src/data/catalog.json', root);
const bridgeFile = new URL('src/data/ota-bridge-v18.json', root);
const legacyFeedFile = new URL('public/api/version.json', root);
const v2FeedFile = new URL('public/api/v2/version.json', root);
const redirectsFile = new URL('public/_redirects', root);

async function readJson(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}

async function hashFile(file) {
  const hash = createHash('sha256');
  for await (const chunk of createReadStream(file)) hash.update(chunk);
  return hash.digest('hex');
}

const appVersion = await readJson(join(appRoot, 'version.json'));
const catalog = await readJson(catalogFile);
const bridgeConfig = existsSync(fileURLToPath(bridgeFile)) ? await readJson(bridgeFile) : null;
const bridgeActive = Boolean(bridgeConfig?.bridge?.active);
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

const expectedV2Feed = {};
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
  const digest = await hashFile(file);
  assert.equal(digest, release.sha256, id + ' SHA-256');
  assert.ok(checksums.includes(digest + '  ' + fileName), id + ' checksums.txt entry');
  expectedAssets.set(fileName, { size: release.sizeBytes, digest: 'sha256:' + digest });

  const changelog = { en: release.changelog, ar: release.changelogAr ?? build.changelog.ar };
  const updateNotes = release.noteSections
    ? build.updateNotes.map((entry) => entry.latest ? {
        version: entry.version,
        versionCode: entry.versionCode,
        date: entry.date,
        latest: true,
        sections: release.noteSections,
      } : entry)
    : build.updateNotes;

  builds.push({
    ...build,
    updateNotes,
    version: release.versionName,
    versionCode: release.versionCode,
    releaseDate: release.releaseDate,
    url,
    sizeBytes: release.sizeBytes,
    sha256: digest,
    specs: { ...build.specs, sizeLabel: (release.sizeBytes / 1048576).toFixed(2) + ' MiB' },
    changelog,
  });
  const { fileName: _fileName, releaseDate: _releaseDate, ...ota } = release;
  expectedV2Feed[id] = { ...ota, changelog };
  console.log('Verified local catalog APK', fileName, release.sizeBytes, digest);
}
expectedV2Feed.builds = builds;

// Build legacy /api/version.json: when bridge is active, pin tv/phone to the v18 transition bridge
// so legacy v17 devices update to v18 without conflicting with /downloads or /api/v2/version.json (v19+).
let expectedLegacyFeed;
const expectedBridgeAssets = new Map();
let bridgeTag = null;
if (bridgeActive) {
  bridgeTag = 'v' + bridgeConfig.tv.versionName;
  const bridgeDir = join(releasesRoot, bridgeTag);
  expectedLegacyFeed = { bridge: bridgeConfig.bridge };
  for (const { id, prefix } of targets) {
    const entry = bridgeConfig[id];
    const fileName = prefix + bridgeTag + '.apk';
    assert.equal(entry.fileName, fileName, 'bridge ' + id + ' filename');
    assert.equal(entry.latestVersionCode, entry.versionCode, 'bridge ' + id + ' versionCode');
    assert.equal(entry.latestVersionName, entry.versionName, 'bridge ' + id + ' versionName');
    const localFile = join(bridgeDir, fileName);
    if (existsSync(localFile)) {
      assert.equal((await stat(localFile)).size, entry.sizeBytes, 'bridge ' + id + ' file size');
      assert.equal(await hashFile(localFile), entry.sha256, 'bridge ' + id + ' SHA-256');
    }
    expectedBridgeAssets.set(fileName, { size: entry.sizeBytes, digest: 'sha256:' + entry.sha256 });
    const { fileName: _fn, releaseDate: _rd, ...ota } = entry;
    expectedLegacyFeed[id] = ota;
    console.log('Verified OTA bridge APK', fileName, entry.sizeBytes, entry.sha256);
  }
  expectedLegacyFeed.builds = builds;
} else {
  expectedLegacyFeed = expectedV2Feed;
}

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

  if (bridgeActive && bridgeTag) {
    const bridgeRel = JSON.parse(execFileSync('gh', ['api', 'repos/' + bridgeRepository + '/releases/tags/' + bridgeTag], { encoding: 'utf8' }));
    for (const [name, meta] of expectedBridgeAssets.entries()) {
      const found = bridgeRel.assets.find((a) => a.name === name);
      assert.ok(found, 'Missing bridge GitHub asset ' + name);
      assert.deepEqual({ size: found.size, digest: found.digest }, meta, 'Bridge GitHub asset ' + name);
    }
    console.log('Verified GitHub OTA bridge release assets', bridgeTag);
  }
}

if (checkLive) {
  const site = 'https://meedx.pages.dev';
  const legacyResponse = await fetch(site + '/api/version.json', { signal: AbortSignal.timeout(15000) });
  assert.ok(legacyResponse.ok, 'Live legacy OTA feed returned HTTP ' + legacyResponse.status);
  const legacyFeed = await legacyResponse.json();
  for (const { id } of targets) {
    const { changelog: _changelog, ...distribution } = expectedLegacyFeed[id];
    for (const [key, value] of Object.entries(distribution)) {
      assert.equal(legacyFeed[id]?.[key], value, 'Live legacy OTA ' + id + '.' + key);
    }
    assert.deepEqual(legacyFeed[id]?.changelog, expectedLegacyFeed[id].changelog, 'Live legacy OTA notes ' + id);
  }

  const v2Response = await fetch(site + '/api/v2/version.json', { signal: AbortSignal.timeout(15000) });
  assert.ok(v2Response.ok, 'Live v2 OTA feed returned HTTP ' + v2Response.status);
  const v2Feed = await v2Response.json();
  for (const { id, url, version, versionCode, sizeBytes, sha256 } of builds) {
    const { changelog: _changelog, ...distribution } = expectedV2Feed[id];
    for (const [key, value] of Object.entries(distribution)) {
      assert.equal(v2Feed[id]?.[key], value, 'Live v2 OTA ' + id + '.' + key);
    }
    const liveBuild = v2Feed.builds?.find((build) => build.id === id);
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
  const dlPage = await fetch(site + '/downloads', { signal: AbortSignal.timeout(15000) });
  assert.equal(dlPage.status, 200, 'Live /downloads page status');
  console.log('Verified live legacy OTA bridge, v2 OTA feed, /downloads, and APK redirects');
}

if (sync) {
  await mkdir(new URL('public/api/v2/', root), { recursive: true });
  await writeFile(catalogFile, JSON.stringify(builds, null, 2) + '\n');
  if (!bridgeActive) {
    await writeFile(legacyFeedFile, JSON.stringify(expectedLegacyFeed, null, 2) + '\n');
  }
  await writeFile(v2FeedFile, JSON.stringify(expectedV2Feed, null, 2) + '\n');
  await writeFile(redirectsFile, expectedRedirects.join('\n') + '\n');
  console.log('Updated local catalog, v2 OTA feed, and APK redirects (legacy v18 bridge frozen)');
} else {
  assert.deepEqual(catalog, builds, 'Catalog drift. Review release notes and run npm run sync:release.');
  const actualLegacy = await readJson(legacyFeedFile);
  if (bridgeActive) {
    assert.deepEqual(actualLegacy.bridge, expectedLegacyFeed.bridge, 'Legacy OTA bridge metadata drift.');
    for (const { id } of targets) {
      assert.deepEqual(actualLegacy[id], expectedLegacyFeed[id], 'Legacy OTA bridge ' + id + ' drift.');
    }
  } else {
    assert.deepEqual(actualLegacy, expectedLegacyFeed, 'Legacy OTA drift. Run npm run sync:release.');
  }
  assert.deepEqual(await readJson(v2FeedFile), expectedV2Feed, 'v2 OTA drift. Run npm run sync:release.');
  assert.deepEqual(redirects, expectedRedirects, 'APK redirect drift. Run npm run sync:release.');
}
