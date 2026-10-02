/* Run against npm run start on port 3100. PLAYWRIGHT_MODULE can point to an existing installation. */
const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3100';
const devices = {
  iPhone: ['Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1',375,true],
  Android: ['Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 Chrome/128.0.0.0 Mobile Safari/537.36',375,true],
  Windows: ['Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/128.0.0.0 Safari/537.36',1280,false],
  iPad: ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 Version/18.0 Mobile/15E148 Safari/604.1',1024,true],
  Mac: ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) AppleWebKit/605.1.15 Version/18.0 Safari/605.1.15',1280,false],
};
const paths = ['/', '/gita/chapter/1/verse/1','/hi/gita','/blogs/best-bhagavad-gita-translation','/blogs/karma-quotes-bhagavad-gita','/gita/topic/karma','/app'];
(async () => {
 const browser = await chromium.launch({headless:true, ...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {})});
 let checks=0; const errors=[];
 try {
  for (const [device,[userAgent,width,touch]] of Object.entries(devices)) {
   const context=await browser.newContext({userAgent,viewport:{width,height:812},isMobile:touch,hasTouch:touch});
   if(device==='iPad') await context.addInitScript(()=>Object.defineProperty(navigator,'maxTouchPoints',{get:()=>5}));
   // Never send smoke-test traffic to the production analytics project.
   await context.route(/mixpanel\.com/, route=>route.fulfill({status:200,body:'1'}));
   const page=await context.newPage();page.on('pageerror',e=>errors.push(`${device}: ${e.message}`));
   for (const path of paths) {
    console.log('Checking',device,path);
    assert.equal((await page.goto(base+path)).status(),200, `${device} ${path}`);
    const app=device!=='Android'; const ios=device==='iPhone'||device==='iPad';
    await page.locator(`[data-offer="${ios?'app_store':app?'desktop_app':'web_reading'}"]`).first().waitFor();
    const store=page.locator('a[href*="apps.apple.com"][href*="6747684125"]');
    assert.equal(await store.count(), app ? (path==='/app'||path==='/')?2:1 : 0, `wrong offer ${device} ${path}`);
    assert.equal(await page.locator('input[type="email"]').count(),0);
    assert.equal(await page.locator('[data-reader-cta]').count(),(path==='/app'||path==='/')?2:1);
    if(app) {
     assert.equal(await page.locator('[data-reader-cta] img[src="/assets/app-store-badge.svg"]').count(), (path==='/'||path==='/app')?2:1);
     if(path==='/') assert.equal(await page.locator('.home-hero [data-reader-cta]').count(),1);
     for(const href of await store.evaluateAll(els=>els.map(el=>el.href))) assert.ok(new URL(href).searchParams.get('ct'));
    }
    if(path==='/gita/chapter/1/verse/1') {
     const cta=await page.locator('[data-reader-cta]').boundingBox();
     const audio=await page.locator('audio').evaluate(el=>el.closest('article').getBoundingClientRect().bottom);
     assert.ok(cta.y>audio,'CTA must follow verse and audio');
     assert.equal(await page.locator('meta[name="apple-itunes-app"]').getAttribute('content'),'app-id=6747684125, app-argument=https://wisdomquotes.in/gita/chapter/1/verse/1');
     assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    }
    checks++;
   }
   await context.close();
  }
  const context=await browser.newContext();const page=await context.newPage();
  await context.route(/mixpanel\.com/,route=>route.fulfill({status:200,body:'1'}));
  await page.goto(base+'/hi/gita/chapter/1/verse/9');
  await page.waitForFunction(()=>JSON.parse(localStorage.getItem('wisdom:last-verse:v1')||'null')?.verse===9);
  for(const path of ['/','/gita','/hi/gita']) {
   await page.goto(base+path);
   await page.locator('.continue-reading').waitFor();
   assert.equal(await page.locator('.continue-reading').getAttribute('href'),'/hi/gita/chapter/1/verse/9');
   checks++;
  }
  await page.goto(base+'/gita/chapter/2/verse/47');
  await page.waitForFunction(()=>JSON.parse(localStorage.getItem('wisdom:last-verse:v1')||'null')?.chapter===2);
  await page.goto(base+'/hi/gita');await page.locator('.continue-reading').waitFor();
  assert.equal(await page.locator('.continue-reading').getAttribute('href'),'/gita/chapter/2/verse/47');checks++;
  for(const path of ['/gita/chapter/2/verse/47','/hi/gita/chapter/3/verse/1','/gita/chapter/18/verse/78']) {
   await page.goto(base+path);
   assert.equal(await page.locator('meta[name="apple-itunes-app"]').getAttribute('content'),`app-id=6747684125, app-argument=https://wisdomquotes.in${path}`);
   assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),`https://wisdomquotes.in${path}`);
   checks++;
  }
  const aasa=await context.request.get(base+'/.well-known/apple-app-site-association');
  assert.equal(aasa.status(),200);assert.ok(aasa.headers()['content-type'].includes('application/json'));
  assert.equal((await aasa.json()).applinks.details[0].components[0].exclude,true);checks++;
  for(const headers of [{},{host:'www.wisdomquotes.in'}]) {
   const response=await context.request.get(base+'/gita/chapter/2/verse/47/?web=1',{headers,maxRedirects:0});
   assert.equal(response.status(),301);
   const destination=new URL(response.headers().location);
   assert.equal(destination.pathname+destination.search,'/gita/chapter/2/verse/47?web=1');
   if(headers.host) assert.equal(destination.origin,'https://www.wisdomquotes.in');
   else assert.ok(['127.0.0.1','localhost'].includes(destination.hostname));
   checks++;
  }
  assert.deepEqual(errors,[]);
  console.log(JSON.stringify({checks,devicePages:35,errors,status:'passed'}));
 } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
