import { createReadStream, existsSync } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { basename } from 'node:path';
import assert from 'node:assert/strict';

const root = new URL('../', import.meta.url);
const catalog = JSON.parse(await readFile(new URL('src/data/catalog.json', root), 'utf8'));
const feed = JSON.parse(await readFile(new URL('public/api/version.json', root), 'utf8'));

for (const p of catalog.filter(p => p.available)) {
  const filename = basename(p.url);
  const candidates = [
    new URL('MEEDX_Assets/04_Apps_APK/' + filename, root),
    new URL('public/downloads/' + filename, root),
  ];
  const file = candidates.find(candidate => existsSync(candidate));
  assert.ok(file, `Local APK file missing for verification: ${filename}`);

  const h = createHash('sha256');
  for await (const chunk of createReadStream(file)) h.update(chunk);
  assert.equal((await stat(file)).size, p.sizeBytes, p.name);
  assert.equal(h.digest('hex'), p.sha256, p.name);

  assert.match(p.url, /^https:\/\/github\.com\/alnouri96\/meedx\/releases\/download\/v1\.0\.0-beta\.2\//);

  const record = feed.builds.find(build => build.id === p.id);
  assert.deepEqual(record, p);
  if (p.variant !== 'standard') continue;
  assert.equal(feed[p.id].sizeBytes, p.sizeBytes);
  assert.equal(feed[p.id].sha256, p.sha256);
  assert.equal(feed[p.id].latestVersionCode, p.versionCode);
  assert.equal(feed[p.id].latestVersionName, p.version);
  assert.equal(feed[p.id].apkUrl, p.url);
  console.log('Verified', p.name, p.sizeBytes, p.sha256);
}
