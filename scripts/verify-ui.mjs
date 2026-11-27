import { chromium, devices, expect } from '@playwright/test';
import assert from 'node:assert/strict';

const base = process.env.MEEDX_TEST_URL || 'http://127.0.0.1:4173';
const widths = [360, 390, 430, 768, 1024, 1440];
const browser = await chromium.launch({ channel: 'chrome' });

async function pageFits(page) {
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'Horizontal overflow');
}

async function openAppFromHome(page) {
  const menu = page.getByRole('button', { name: 'القائمة', exact: true });
  if (await menu.isVisible()) {
    await menu.click();
    await page.getByRole('navigation', { name: 'قائمة الهاتف' }).getByRole('link', { name: 'التطبيقات', exact: true }).click();
  } else {
    await page.getByRole('navigation', { name: 'التنقل الرئيسي' }).getByRole('link', { name: 'التطبيقات', exact: true }).click();
  }
  await page.getByRole('link', { name: 'عرض Local Cinema' }).click();
  await expect(page.getByRole('heading', { name: 'Local Cinema', level: 1 })).toBeVisible();
  await expect(page.getByRole('link', { name: 'الكود المصدري', exact: true })).toHaveAttribute('href', 'https://github.com/alnouri96/local-cinema');
}

async function checkGallery(page, context, width) {
  await page.locator('.swiper-button-next').click();
  await expect(page.locator('.gallery-info h3')).toHaveText('بوسترات Local Cinema');
  const pair = page.locator('.swiper-slide-active');
  await expect(pair.locator('img')).toHaveCount(2);
  await expect.poll(() => pair.locator('img').evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0))).toBe(true);
  await pair.getByRole('button', { name: 'تكبير لقطة التلفاز', exact: true }).click();
  const dialog = page.getByRole('dialog');
  const stage = dialog.locator('.zoom-stage');
  await expect(stage.locator('img')).toHaveAttribute('src', /local-cinema-poster[.]webp/);
  await dialog.getByRole('button', { name: 'تكبير', exact: true }).click();
  await expect(dialog.locator('output')).toHaveText('125%');
  await dialog.getByRole('slider').press('End');
  await expect(dialog.locator('output')).toHaveText('300%');
  await expect(dialog.getByRole('button', { name: 'تكبير', exact: true })).toBeDisabled();

  const box = await stage.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 65, box.y + box.height / 2 + 20, { steps: 4 });
  await page.mouse.up();
  await expect(stage.locator('img')).not.toHaveAttribute('style', /translate\(0px, 0px\) scale\(3\)/);
  await page.mouse.wheel(0, 450);
  await expect(dialog.locator('output')).not.toHaveText('300%');

  await dialog.getByRole('button', { name: 'الهاتف', exact: true }).click();
  await expect(stage.locator('img')).toHaveAttribute('src', /local-cinema-manager[.]webp/);
  await expect(dialog.locator('output')).toHaveText('100%');

  if (width === 390) {
    const cdp = await context.newCDPSession(page);
    const { x, y, width: w, height: h } = await stage.boundingBox();
    const fingers = (spread) => [{ x: x + w / 2 - spread, y: y + h / 2, id: 1 }, { x: x + w / 2 + spread, y: y + h / 2, id: 2 }];
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: fingers(24) });
    for (const distance of [34, 48, 68]) {
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: fingers(distance) });
    }
    await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await expect(dialog.locator('output')).not.toHaveText('100%');
  }

  await dialog.getByRole('button', { name: 'الشريحة السابقة' }).click();
  await expect(stage.locator('img')).toHaveAttribute('src', /tv_.*15-49-53/);
  await page.keyboard.press('Escape');
}

try {
  for (const width of widths) {
    const context = await browser.newContext({
      ...(width < 768 ? devices['Pixel 7'] : {}),
      viewport: { width, height: 900 },
      deviceScaleFactor: 1,
      permissions: ['clipboard-read', 'clipboard-write'],
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('response', (response) => {
      if (response.status() >= 400 && !response.url().endsWith('/audit-missing')) errors.push(response.status() + ' ' + response.url());
    });

    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    await pageFits(page);
    const homeTitle = page.locator('#cinema-home-title bdi');
    assert.equal(await homeTitle.evaluate((title) => {
      const range = document.createRange();
      range.selectNodeContents(title);
      return range.getClientRects().length;
    }), 1, 'The product name must fit on one line');
    const hero = page.locator('.cinema-hero');
    const poster = hero.getByRole('link', { name: 'بوستر تطبيق Local Cinema' });
    await expect(poster).toHaveAttribute('href', '/apps/local-cinema');
    await expect.poll(() => poster.locator('img').evaluate((img) => img.naturalWidth / img.naturalHeight)).toBeGreaterThan(1.76);
    await expect(hero.getByRole('link', { name: 'تنزيل التطبيقين' })).toHaveAttribute('href', '/downloads');
    await expect(hero.getByRole('link', { name: 'عرض التطبيق' })).toHaveAttribute('href', '/apps/local-cinema');
    await expect(page.locator('.home-section > h2')).toHaveText(['التطبيقات', 'البرامج والأدوات', 'قادم قريباً']);
    await expect(page.locator('.upcoming-card h3')).toHaveText(['سمارت', 'فايبر / البيبر']);
    await poster.click();
    await expect(page).toHaveURL(/\/apps\/local-cinema$/);
    await page.goto(base);
    await openAppFromHome(page);
    await expect(page.getByRole('button', { name: /تنزيل.*APK/ })).toHaveCount(0);
    await checkGallery(page, context, width);

    await page.goto(base + '/apps/local-cinema#setup-guide');
    await expect(page.locator('#setup-guide h3')).toBeInViewport();
    await page.goto(base + '/addons');
    await expect(page).toHaveURL(/\/apps\/local-cinema#addons$/);
    await page.locator('#addons').getByRole('tab', { name: 'نظام التوصيلات وحماية TCL' }).click();
    await page.locator('#addons').getByRole('tab', { name: 'دليل مواقع مفاتيح API الاختيارية' }).click();

    await page.goto(base + '/#support');
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('link')).toHaveAttribute('href', 'https://t.me/MEEDXAPP');
    await expect(dialog.locator('img')).toHaveCount(0);
    await page.keyboard.press('Escape');

    await page.goto(base + (width === 360 ? '/#downloads' : '/downloads'));
    await expect(page).toHaveURL(/\/downloads$/);
    const feed = await (await page.request.get(base + '/api/version.json')).json();
    const group = page.getByRole('region', { name: 'Local Cinema', exact: true });
    await expect(group.locator('.dl-card')).toHaveCount(2);
    await expect(page.locator('#downloads .head-tools').getByText('سجل التحديثات')).toHaveCount(0);
    await expect(page.locator('.downloader-code-box')).toHaveCount(1);
    await page.getByRole('button', { name: 'نسخ بصمة Local Cinema TV' }).click();
    assert.equal(await page.evaluate(() => navigator.clipboard.readText()), feed.tv.sha256);

    for (const [device, label] of [['tv', 'تنزيل التلفاز مباشرةً'], ['phone', 'تنزيل الهاتف مباشرةً']]) {
      const shortLink = await page.request.get(base + '/' + device, { maxRedirects: 0 });
      assert.equal(shortLink.status(), 302);
      assert.equal(shortLink.headers().location, feed[device].apkUrl);
      const card = page.locator('.cinema-download-' + device);
      await expect(card.getByRole('link', { name: label, exact: true })).toHaveAttribute('href', '/' + device);
      const changelog = card.getByRole('button', { name: 'سجل التغييرات', exact: true });
      await changelog.click();
      await expect(dialog.getByRole('heading', { name: 'سجل التغييرات', exact: true })).toBeVisible();
      await expect(dialog.locator('code')).toHaveText('v' + feed[device].versionName);
      const notes = dialog.locator('.changelog-notes');
      await expect(notes.locator('h3')).toHaveText(['تطبيق التلفاز', 'تطبيق الهاتف', 'التحديثات المشتركة بين التلفاز والهاتف']);
      await expect(notes).toHaveAttribute('dir', 'rtl');
      await expect(notes.locator('[data-release-section="shared"] h4').first()).toHaveText('قسم الترجمة الموحدة الذكية');
      await dialog.getByRole('button', { name: 'English', exact: true }).click();
      await expect(notes).toHaveAttribute('dir', 'ltr');
      await expect(notes.locator('h3')).toHaveText(['Local Cinema TV', 'Local Cinema Manager', 'Shared Across TV & Phone']);
      await expect(notes.locator('[data-release-section="tv"] li')).toHaveCount(4);
      await expect(notes.locator('[data-release-section="phone"] li')).toHaveCount(2);
      await expect(notes.locator('[data-release-section="shared"] li')).toHaveCount(2);
      await expect(notes.locator('[data-release-section="shared"] h4').first()).toHaveText('Unified Subtitles Hub');
      await page.keyboard.press('Escape');
      await expect(changelog).toBeFocused();
    }
    await pageFits(page);
    await page.goto(base + '/apps/local-cinema#patch-notes');
    await expect(page.locator('#patch-notes-title')).toBeInViewport();
    const patchNotes = page.locator('#patch-notes');
    await expect(patchNotes.locator('.dl-release-head').first()).toContainText(feed.tv.versionName);
    await expect(patchNotes.locator('[data-release-section] h3')).toHaveText(['تطبيق التلفاز', 'تطبيق الهاتف', 'التحديثات المشتركة بين التلفاز والهاتف']);
    await patchNotes.getByRole('button', { name: 'سجل التغييرات', exact: true }).click();
    await expect(dialog.locator('.changelog-notes [data-release-section="shared"] h4').first()).toHaveText('قسم الترجمة الموحدة الذكية');
    await page.keyboard.press('Escape');

    await page.goto(base + '/services');
    await page.getByRole('button', { name: 'اطلب عبر تلجرام' }).first().click();
    await dialog.locator('#message').fill('اختبار المعاينة');
    await page.evaluate(() => { window.open = (url) => { window.__draft = url; }; });
    await dialog.getByRole('button', { name: 'افتح المسودة في تلجرام' }).click();
    const draft = new URL(await page.evaluate(() => window.__draft));
    assert.equal(draft.origin + draft.pathname, 'https://t.me/MEEDXAPP');
    assert.match(draft.searchParams.get('text'), /اختبار المعاينة/);
    await page.keyboard.press('Escape');

    await page.goto(base);
    await page.locator('#home-programs + .home-card-grid').getByRole('link', { name: /برامج الحاسوب/ }).click();
    await expect(page).toHaveURL(/\/software#pc-tools$/);
    await expect(page.locator('#pc-tools')).toBeInViewport();
    await page.getByRole('button', { name: 'Switch to English' }).click();
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
    await expect(page.getByRole('heading', { name: 'Software & Gaming', level: 1 })).toBeVisible();
    await pageFits(page);
    await page.locator('header .wordmark').click();
    await expect(page.locator('#cinema-home-title bdi')).toHaveText('Local Cinema');
    await expect(page.locator('.home-section > h2')).toHaveText(['Apps', 'Programs & Software', 'Coming Soon']);
    await expect(page.locator('.cinema-hero').getByRole('link', { name: 'View Local Cinema' })).toBeVisible();

    assert.equal((await page.goto(base + '/audit-missing')).status(), 404);
    await expect(page.getByRole('heading', { name: 'الصفحة غير موجودة', level: 1 })).toBeVisible();
    assert.deepEqual(errors, []);
    await context.close();
    console.log('Passed viewport', width);
  }
} finally {
  await browser.close();
}
