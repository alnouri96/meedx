import {chromium,devices,expect} from '@playwright/test';
import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome'});
const base=process.env.MEEDX_TEST_URL||'http://127.0.0.1:4173';
await mkdir('verification',{recursive:true});
const errors=[];
async function shot(page,name){await page.screenshot({path:'verification/'+name+'.png',animations:'disabled'})}
async function checkWidth(page){assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'horizontal overflow');}
async function open(page,name){await page.getByRole('button',{name,exact:true}).click();await expect(page.getByRole('dialog')).toBeVisible()}
try{
 for(const width of [360,390,430,768,1024,1440]){
  const context=await browser.newContext({...((width<768)?devices['Pixel 7']:{}),viewport:{width,height:width<768?844:900},deviceScaleFactor:1,permissions:['clipboard-read','clipboard-write'],reducedMotion:'reduce'});
  const page=await context.newPage();
  page.on('pageerror',err=>errors.push(String(err)));
  page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
  await page.goto(base);await page.evaluate(()=>document.fonts.ready);
  await expect(page.getByRole('heading',{level:1})).toBeVisible();
  await checkWidth(page);
  const screenshots=[390,1440].includes(width),prefix=width<768?'mobile':'desktop';
  if(screenshots) await shot(page,prefix+'-home');
  if(width<768){
   await page.getByRole('button',{name:'القائمة',exact:true}).click();
   await expect(page.getByRole('navigation',{name:'قائمة الهاتف'})).toBeVisible();
   if(screenshots)await shot(page,prefix+'-menu');
   await page.getByRole('navigation',{name:'قائمة الهاتف'}).getByRole('link',{name:'التطبيقات'}).click();
  }else await page.locator('#apps').scrollIntoViewIfNeeded();
  await page.locator('.gallery').evaluate(el=>el.scrollIntoView({block:'center'}));
  await page.locator('#apps .swiper-button-next').click();
  await expect(page.locator('.gallery-info h3')).toHaveText('نشر مكتبة الهاتف على التلفاز');
  const pair=page.locator('.swiper-slide-active');
  await expect(pair.locator('img')).toHaveCount(2);
  await expect.poll(()=>pair.locator('img').evaluateAll(images=>images.every(img=>img.complete&&img.naturalWidth>0))).toBe(true);
  if(screenshots) await shot(page,prefix+'-gallery');
  await pair.getByRole('button',{name:'تكبير لقطة التلفاز',exact:true}).click();
  const zoom=page.getByRole('dialog');
  const stage=zoom.locator('.zoom-stage');
  await expect(stage.locator('img')).toHaveAttribute('src',/tv_.*15-19-11/);
  await zoom.getByRole('button',{name:'تكبير',exact:true}).click();
  await expect(zoom.locator('output')).toHaveText('125%');
  const rangeControl=zoom.getByRole('slider');
  await rangeControl.press('End');
  await expect(zoom.locator('output')).toHaveText('300%');
  assert.equal(await zoom.getByRole('button',{name:'تكبير',exact:true}).isDisabled(),true);
  const box=await stage.boundingBox();
  await page.mouse.move(box.x+box.width/2,box.y+box.height/2);
  await page.mouse.down();
  await page.mouse.move(box.x+box.width/2+65,box.y+box.height/2+20,{steps:4});
  await page.mouse.up();
  await expect(stage.locator('img')).not.toHaveAttribute('style',/translate\(0px, 0px\) scale\(3\)/);
  if(screenshots) await shot(page,prefix+'-zoom');
  await page.mouse.wheel(0,450);
  await expect(zoom.locator('output')).not.toHaveText('300%');
  await zoom.getByRole('button',{name:'الهاتف',exact:true}).click();
  await expect(stage.locator('img')).toHaveAttribute('src',/phone_.*15-19-11/);
  await expect(zoom.locator('output')).toHaveText('100%');
  if(width===390){
   const cdp=await context.newCDPSession(page);
   const {x,y,width:w,height:h}=await stage.boundingBox();
   const cx=x+w/2,cy=y+h/2;
   const fingers=spread=>[{x:cx-spread,y:cy,id:1},{x:cx+spread,y:cy,id:2}];
   await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:fingers(24)});
   for(const distance of [34,48,68])
    await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:fingers(distance)});
   await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
   await expect(zoom.locator('output')).not.toHaveText('100%');
  }
  await zoom.getByRole('button',{name:'الشريحة السابقة'}).click();
  await expect(zoom.getByRole('heading')).toHaveText('اقتران الهاتف بالتلفاز');
  await expect(stage.locator('img')).toHaveAttribute('src',/phone_.*15-18-45/);
  await page.keyboard.press('Escape');
  await open(page,'ادعم MEEDX • زين كاش / Qi');
  const payments=page.getByRole('dialog').locator('.payments article');
  for(const card of await payments.all()){
   await card.getByRole('button',{name:'نسخ الرقم',exact:true}).click();
   assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),await card.locator('code').textContent(),'account clipboard');
  }
  assert.equal(await page.getByRole('dialog').locator('img').count(),2);
  if(screenshots)await shot(page,prefix+'-support');
  await page.getByRole('button',{name:'إغلاق',exact:true}).click();
  await open(page,'نموذج تلجرام');
  await page.locator('#type').selectOption('bug');
  await page.locator('#message').fill('اختبار المعاينة');
  await expect(page.getByRole('button',{name:'افتح المسودة في تلجرام'})).toBeEnabled();
  await page.evaluate(()=>{window.open=(url)=>{window.__draft=url;return null}});
  await page.getByRole('button',{name:'افتح المسودة في تلجرام'}).click();
  const draft=new URL(await page.evaluate(()=>window.__draft));
  assert.equal(draft.origin,'https://t.me');
  assert.match(draft.searchParams.get('text'),/اختبار المعاينة/);
  if(screenshots) await shot(page,prefix+'-telegram');
  await page.keyboard.press('Escape');
  await page.locator('summary').first().click();
  await page.getByRole('button',{name:'نسخ بصمة Local Cinema TV',exact:true}).click();
  await expect(page.getByRole('status')).toHaveText('تم النسخ');
  assert.match(await page.evaluate(()=>navigator.clipboard.readText()),/^[0-9a-f]{64}$/);
  await checkWidth(page);
  await page.getByRole('button',{name:'تنزيل APK',exact:true}).first().click();
  const d=page.getByRole('dialog');
  await expect(d.getByRole('link')).toHaveCount(0);
  await d.getByRole('checkbox').check();
  const downloadUrl=await d.getByRole('link').getAttribute('href');
  const range=await page.request.get(new URL(downloadUrl,base).href,{headers:{Range:'bytes=0-15'}});
  assert.equal(range.status(),206); assert.equal((await range.body()).subarray(0,2).toString(),'PK');
  await page.keyboard.press('Escape');
  await page.getByRole('button',{name:'Switch to English'}).click();
  await expect(page.locator('html')).toHaveAttribute('dir','ltr');
  await expect(page.getByRole('heading',{level:1})).toContainText('in your hands.');
  await checkWidth(page);
  if(screenshots){await page.evaluate(()=>scrollTo(0,0));await shot(page,prefix+'-english')}
  await context.close();console.log('Passed viewport',width);
 }
 assert.deepEqual(errors,[]);
}finally{await browser.close()}
