import { test } from 'node:test'
import assert from 'node:assert/strict'
import { deviceOS, isAutomatedReader, appOffer } from '../src/lib/device.ts'
import { appStoreUrl, pageContext, smartBanner } from '../src/lib/funnel.ts'
import { validPlace, readPlace, readingUrl, nextPlace } from '../src/lib/reading-progress.ts'

const iphone = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1'
const android = 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 Chrome/128.0.0.0 Mobile Safari/537.36'
test('device offers distinguish iPad desktop mode, Android, Mac, Windows, and Linux', () => {
  assert.equal(deviceOS(iphone), 'iOS')
  assert.equal(deviceOS('Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X)'), 'iOS')
  assert.equal(deviceOS('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)', 5), 'iOS')
  assert.equal(deviceOS('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)', 0), 'macOS')
  assert.equal(deviceOS(android), 'Android')
  assert.equal(deviceOS('Mozilla/5.0 (Windows NT 10.0)'), 'Windows')
  assert.equal(deviceOS('Mozilla/5.0 (X11; Linux x86_64)'), 'Linux')
})
test('automation is excluded without excluding real Linux/Android readers', () => {
  assert.equal(isAutomatedReader(iphone, true), true)
  assert.equal(isAutomatedReader('Chrome HeadlessChrome/130'), true)
  assert.equal(isAutomatedReader('Googlebot/2.1'), true)
  assert.equal(isAutomatedReader('Mozilla/5.0 (X11; Linux x86_64) Chrome/130'), false)
  assert.equal(isAutomatedReader(android), false)
})
test('campaigns identify source page and never invent the provider ID', () => {
  const url = new URL(appStoreUrl('/blogs/best-bhagavad-gita-translation'))
  assert.equal(url.searchParams.get('ct'), 'blog-best-bhagavad-gita-translation')
  assert.equal(url.searchParams.get('mt'), '8')
  assert.equal(url.searchParams.has('pt'), false)
  assert.equal(new URL(appStoreUrl('/gita/chapter/2/verse/47', '123')).searchParams.get('pt'), '123')
  assert.equal(pageContext('/hi/gita/chapter/2/verse/47/?utm_source=test').ct, 'verse-2-47-hi')
  assert.equal(pageContext('/gita/topic/karma').page_type, 'topic')
  assert.equal(pageContext('/app').ct, 'app-app')
  assert.equal(smartBanner('/hi/gita/chapter/2/verse/47').appArgument, 'https://wisdomquotes.in/hi/gita/chapter/2/verse/47')
})
test('reading continuity validates saved values and crosses chapter boundaries', () => {
  assert.equal(validPlace({chapter:1,verse:48,locale:'en'}), false)
  assert.equal(validPlace({chapter:'1',verse:1,locale:'en'}), false)
  assert.equal(validPlace({chapter:1,verse:1,locale:'fr'}), false)
  assert.equal(readingUrl({chapter:1,verse:9,locale:'hi'}), '/hi/gita/chapter/1/verse/9')
  assert.deepEqual(nextPlace({chapter:1,verse:47,locale:'hi'}), {chapter:2,verse:1,locale:'hi'})
  assert.equal(nextPlace({chapter:18,verse:78,locale:'en'}), null)
})
test('blocked and corrupted storage never break reading', () => {
  const prior = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  try {
    Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem(){throw new Error('denied')}}})
    assert.equal(readPlace(),null)
    Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem(){return '{broken'}}})
    assert.equal(readPlace(),null)
    Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem(){return JSON.stringify({chapter:2,verse:47,locale:'hi'})}}})
    assert.deepEqual(readPlace(),{chapter:2,verse:47,locale:'hi'})
  } finally {
    if(prior) Object.defineProperty(globalThis,'localStorage',prior)
    else delete globalThis.localStorage
  }
})

test('offer policy keeps desktop app discovery and a usable Android reading action', () => {
  assert.equal(appOffer('iOS'), 'app_store')
  assert.equal(appOffer('Android'), 'web_reading')
  for (const device of ['Windows','macOS','Linux','Other']) assert.equal(appOffer(device), 'desktop_app')
  assert.equal(appOffer(null), 'app_store') // SSR retains a working link without JavaScript.
})
test('chapter smart banners target supported first-verse routes in both languages', () => {
  assert.equal(smartBanner('/gita/chapter/2').appArgument, 'https://wisdomquotes.in/gita/chapter/2/verse/1')
  assert.equal(smartBanner('/hi/gita/chapter/18').appArgument, 'https://wisdomquotes.in/hi/gita/chapter/18/verse/1')
})
