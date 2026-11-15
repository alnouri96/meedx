"""Import the supplied site assets and build the download manifests."""
from pathlib import Path
import hashlib
import json
import os
import re
import shutil
import subprocess
from datetime import datetime

root = Path(__file__).resolve().parents[1]
assets = root / 'MEEDX_Assets'
public = root / 'public'

def write_json(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

def settings(path):
    return dict(re.findall(r'^\s*(\w+)\s*[:=]\s*([^\r\n]+)', path.read_text(encoding='utf-8-sig'), re.M))

screens = public / 'assets/screenshots'
pattern = re.compile(r'(Smart_TV_Pro|SM-S938B)_(\d{4}-\d\d-\d\d_\d\d-\d\d-\d\d)\.png')
devices = {'tv': [], 'phone': []}
for file in sorted((assets / '01_Screenshots').glob('*.png')):
    prefix, stamp = pattern.fullmatch(file.name).groups()
    device = 'tv' if prefix == 'Smart_TV_Pro' else 'phone'
    mark = datetime.strptime(stamp, '%Y-%m-%d_%H-%M-%S')
    name = f'{device}_{stamp}.png'
    if name == 'tv_2026-11-15_15-18-45.png' or name == 'phone_2026-11-15_15-58-19.png':
        # Sanitize the captured pairing secret/address and unrelated phone photos before serving.
        from PIL import Image, ImageDraw
        with Image.open(file) as original:
            im = original.convert('RGB')
        draw = ImageDraw.Draw(im)
        ratios = [(0.183,0.151,0.363,0.467),(0.15,0.488,0.403,0.526)] if device == 'tv' else [(0.57,0.91,1,0.988)]
        for bounds in ratios:
            draw.rectangle(tuple(round(v * im.size[i % 2]) for i, v in enumerate(bounds)), fill='#262626')
        im.save(screens / name)
    else:
        shutil.copyfile(file, screens / name)
    devices[device].append((mark, {'device': device, 'file': name}))
pairs = sorted((abs((a[0]-b[0]).total_seconds()), i, j)
               for i,a in enumerate(devices['tv']) for j,b in enumerate(devices['phone'])
               if abs((a[0]-b[0]).total_seconds()) < 30)
tv_used, phone_used, groups = set(), set(), []
for _, i, j in pairs:
    if i not in tv_used and j not in phone_used:
        a,b = devices['tv'][i], devices['phone'][j]
        groups.append((a[0], [a[1], b[1]]))
        tv_used.add(i)
        phone_used.add(j)
groups += [(stamp,[photo]) for device, used in [('tv',tv_used),('phone',phone_used)]
           for i,(stamp,photo) in enumerate(devices[device]) if i not in used]
write_json(root/'src/data/screenshots.json',
           [{'id': stamp.strftime('%H-%M-%S'), 'images': photos} for stamp,photos in sorted(groups, key=lambda x:x[0])])

donations = assets / '02_Donations_QR'
wallets = settings(donations / 'wallet_numbers.txt')
telegram = settings(assets/'03_Telegram/telegram_info.txt')
payments = {}
for key, number_key in [('zaincash','ZainCash_Number'), ('qicard','QiCard_Number')]:
    matches = [f for f in donations.glob(f'{key}-qr.*') if f.suffix.lower() in {'.png','.jpg','.jpeg','.webp'}]
    if len(matches) != 1 or not wallets[number_key].strip():
        raise ValueError(f'Missing or ambiguous payment data for {key}')
    qr, = matches
    shutil.copyfile(qr, public/'assets/qr'/qr.name)
    payments[key] = {'number': wallets[number_key].strip(), 'qr': f'/assets/qr/{qr.name}', 'configured': True}

aapt = Path(os.environ['LOCALAPPDATA'])/'Android/Sdk/build-tools/36.0.0/aapt.exe'
feed, catalog = {}, []
for file in sorted((assets/'04_Apps_APK').glob('*.apk')):
    raw = subprocess.check_output([str(aapt), 'dump', 'badging', str(file)], stderr=subprocess.DEVNULL)
    package, code, version = re.search(rb"^package: name='([^']+)' versionCode='([^']+)' versionName='([^']+)'", raw, re.M).groups()
    package, code, version = package.decode(), int(code), version.decode()
    device = 'phone' if 'Phone' in file.name else 'tv'
    variant = 'legacy' if file.name.startswith('Local-Cinema') else 'arabic' if '-Arabic' in file.stem else 'ltr' if '-LTR' in file.stem else 'standard'
    suffix = {'standard':'', 'legacy':' (legacy)', 'arabic':' (Arabic)', 'ltr':' (LTR)'}[variant]
    name = ('Local Cinema TV' if device == 'tv' else 'Local Cinema Manager') + suffix
    dest = public/'downloads'/file.name
    shutil.copyfile(file, dest)
    with dest.open('rb') as apk:
        sha = hashlib.file_digest(apk, 'sha256').hexdigest()
    entry = dict(id=device if variant == 'standard' else f'{device}-{variant}', device=device,
                 variant=variant, packageId=package, name=name, available=True, version=version,
                 versionCode=code, url=f'/downloads/{file.name}', sizeBytes=dest.stat().st_size, sha256=sha,
                 changelog={'en': 'APK supplied in the MEEDX asset bundle.',
                            'ar': 'ملف APK من حزمة MEEDX.'})
    catalog.append(entry)
    if variant == 'standard':
        feed[device] = dict(latestVersionCode=code, latestVersionName=version, versionCode=code,
                            versionName=version, sizeBytes=entry['sizeBytes'], sha256=sha,
                            changelog=entry['changelog']['en'],
                            apkUrl=f'https://github.com/alnouri96/meedx/releases/download/v{version}/{file.name}')
catalog.sort(key=lambda e: ('standard','arabic','ltr','legacy').index(e['variant']) * 2 + (e['device'] == 'phone'))
feed['builds'] = catalog
write_json(root/'src/data/catalog.json', catalog)
write_json(public/'api/version.json', feed)
config = dict(brand='MEEDX', developer={'ar':'استوديو MEEDX','en':'MEEDX Studio'},
              telegramUsername=telegram['Telegram_Username'].strip(), telegramLink=telegram['Telegram_Link'].strip(),
              payments=payments, githubReleases='https://github.com/alnouri96/meedx/releases',
              turnstileSiteKey='', downloadsMode='github-releases')
(root/'src/config/siteConfig.js').write_text(
    "import catalog from '../data/catalog.json';\n\nexport const siteConfig = {\n  ..."
    + json.dumps(config, ensure_ascii=False, indent=2) + ",\n  downloads: catalog,\n};\n", encoding='utf-8')
print(f'Imported {len(groups)} slides, {len(catalog)} verified APK records, and payment and contact assets.')
