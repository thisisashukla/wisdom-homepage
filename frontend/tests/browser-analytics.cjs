const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const testPath=process.env.ANALYTICS_TEST_PATH || '/app';
const base=process.env.TEST_BASE_URL || 'http://127.0.0.1:3100';
const ua='Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1';
const wait=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
 try {
  const context=await browser.newContext({userAgent:ua,viewport:{width:375,height:812},isMobile:true,hasTouch:true});
  // Simulate a real browser only inside the test. All analytics and App Store requests are intercepted.
  await context.addInitScript(()=>Object.defineProperty(navigator,'webdriver',{get:()=>false}));
  const events=[];
  await context.route(/mixpanel\.com/,route=>{
   const request=route.request();const body=request.postData()||new URL(request.url()).search.slice(1);
   try {let data=new URLSearchParams(body).get('data')||body;try {data=JSON.parse(data)}catch{data=JSON.parse(Buffer.from(data,'base64').toString())}events.push(...(Array.isArray(data)?data:[data]).filter(x=>x.event));}catch{}
   return route.fulfill({status:200,body:'1'});
  });
  await context.route(/apps\.apple\.com/,route=>route.fulfill({status:200,body:'Test: external navigation intercepted'}));
  const page=await context.newPage();await page.goto(base+testPath);
  const offers=page.locator('[data-reader-cta]');await offers.first().scrollIntoViewIfNeeded();
  await page.locator('[data-offer="app_store"]').first().waitFor();await wait(500);
  await offers.last().scrollIntoViewIfNeeded();await wait(500);
  await offers.last().locator('a').click();
  for(let i=0;i<50 && !events.some(e=>e.event==='dev_App Store Button Clicked');i++)await wait(200);
  for(const name of ['Page Viewed','CTA Shown','App Store Button Clicked']) {
   const matches=events.filter(e=>e.event==='dev_'+name);assert.equal(matches.length,1,`${name} must fire once: ${JSON.stringify(events.map(x=>x.event))}`);
   assert.equal(matches[0].properties.os,'iOS');assert.equal(matches[0].properties.page_type,testPath==='/'?'home':'app');assert.equal(matches[0].properties.ct,testPath==='/'?'home-home':'app-app');
  }
  const placementEvents=events.filter(e=>e.event==='dev_CTA Placement Shown');
  assert.deepEqual(placementEvents.map(e=>e.properties.placement).sort(), ['footer','hero']);
  assert.equal(events.find(e=>e.event==='dev_App Store Button Clicked').properties.placement,'footer');
  await context.close();
  const bot=await browser.newContext({userAgent:ua});let calls=0;
  await bot.route(/mixpanel\.com/,route=>{calls++;return route.fulfill({status:200,body:'1'})});
  const botPage=await bot.newPage();await botPage.goto(base+testPath);await botPage.locator('[data-reader-cta]').first().scrollIntoViewIfNeeded();await wait(1200);assert.equal(calls,0);
  console.log(JSON.stringify({status:'passed',eventCounts:{pageViewed:1,ctaShown:1,appStoreClicked:1},botRequests:calls}));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
