#!/usr/bin/env node
// Automated checks for scripts/seo/RUBRIC.md (sections A–F, except visual E2–E4 and copy score D5).
// Usage: node scripts/seo/check.mjs --base http://localhost:3000 --mode local|prod
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const args = Object.fromEntries(process.argv.slice(2).reduce((a, x, i, arr) => (x.startsWith('--') ? [...a, [x.slice(2), arr[i + 1]]] : a), []))
const BASE = (args.base || 'http://localhost:3000').replace(/\/$/, '')
const MODE = args.mode || 'local'
const APEX = 'https://wisdomquotes.in'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const CONTENT = path.join(ROOT, 'src', 'content', 'gita')

const topics = JSON.parse(fs.readFileSync(path.join(CONTENT, 'topics.json'), 'utf8'))
const topicSet = new Set(topics.map((t) => t.slug))
const index = JSON.parse(fs.readFileSync(path.join(CONTENT, 'index.json'), 'utf8'))

const results = []
const record = (id, pass, detail = '') => { results.push({ id, pass, detail }); console.log(`${pass ? 'PASS' : 'FAIL'}  ${id}  ${detail}`) }

const get = async (url, opts = {}) => {
  for (let i = 0; i < 3; i++) {
    try { return await fetch(url, { redirect: 'manual', ...opts }) } catch (e) { if (i === 2) throw e; await new Promise((r) => setTimeout(r, 500)) }
  }
}
const html = async (p) => { const r = await get(BASE + p); return { status: r.status, body: r.status === 200 ? await r.text() : '' } }
const pool = async (items, n, fn) => { const out = []; let i = 0; await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) { const k = i++; out[k] = await fn(items[k]) } })); return out }
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
const titleOf = (b) => decode((b.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1] || '')
const descOf = (b) => decode((b.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '')
const canonOf = (b) => (b.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || ''
const toLocal = (u) => u.replace(APEX, '').replace('https://www.wisdomquotes.in', '') || '/'
const devaShare = (s) => { const letters = s.match(/[\p{L}\p{M}]/gu) || []; const deva = s.match(/[ऀ-ॿ]/gu) || []; return letters.length ? deva.length / letters.length : 0 }

// ── A. Host ──────────────────────────────────────────────────────────────────
const KEY = ['/', '/hi/gita', '/gita/chapter/2/verse/47', '/sitemap.xml', '/robots.txt']
if (MODE === 'prod') {
  for (const p of KEY) {
    const r = await get(APEX + p)
    record(`A1 apex ${p}`, r.status === 200, `status ${r.status} ${r.headers.get('location') || ''}`)
    const w = await get('https://www.wisdomquotes.in' + p)
    const loc = w.headers.get('location') || ''
    record(`A2 www ${p}`, [301, 308].includes(w.status) && loc.replace(/\/$/, '') === (APEX + p).replace(/\/$/, ''), `status ${w.status} → ${loc}`)
  }
} else console.log('SKIP  A1/A2 (local mode)')

// ── B. Canonicals + sitemap ──────────────────────────────────────────────────
const sm = await html('/sitemap.xml')
const locs = [...sm.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
record('B2 sitemap apex-only, ≥1400 URLs', locs.length >= 1400 && locs.every((u) => u.startsWith(APEX)) && !locs.some((u) => u.includes('www.')), `${locs.length} URLs`)
const rb = await html('/robots.txt')
record('B4 robots Sitemap on apex', /Sitemap:\s*https:\/\/wisdomquotes\.in\/sitemap\.xml/.test(rb.body))
const sample = [...new Set([...KEY.slice(0, 3).map((p) => APEX + (p === '/' ? '' : p)), ...locs.filter((_, i) => i % Math.max(1, Math.floor(locs.length / 40)) === 0).slice(0, 40)])]
const sampled = await pool(sample, 6, async (u) => { const p = toLocal(u); const r = await html(p); return { u, p, ...r } })
const badStatus = sampled.filter((x) => x.status !== 200)
record('B3 sampled sitemap URLs 200 without redirect', badStatus.length === 0, badStatus.slice(0, 5).map((x) => `${x.p}:${x.status}`).join(' '))
const badCanon = sampled.filter((x) => x.status === 200 && canonOf(x.body).replace(/\/$/, '') !== (APEX + (x.p === '/' ? '' : x.p)).replace(/\/$/, ''))
record('B1 self-referential apex canonical', badCanon.length === 0, badCanon.slice(0, 5).map((x) => `${x.p} → ${canonOf(x.body)}`).join(' | '))

// ── C. Broken links + retired URLs ───────────────────────────────────────────
const verseRefs = index.map((e) => [e.chapter, e.verse])
const versePages = [...verseRefs.map(([c, v]) => `/gita/chapter/${c}/verse/${v}`), ...verseRefs.map(([c, v]) => `/hi/gita/chapter/${c}/verse/${v}`), '/gita/today', '/hi/gita/today']
const verseFetched = await pool(versePages, 8, async (p) => ({ p, ...(await html(p)) }))
let broken = 0; const brokenEx = []
for (const x of verseFetched) {
  for (const m of x.body.matchAll(/href="(?:https:\/\/wisdomquotes\.in)?\/(?:hi\/)?gita\/topic\/([^"?#]+)"/g)) {
    if (!topicSet.has(decodeURIComponent(m[1]))) { broken++; if (brokenEx.length < 5) brokenEx.push(`${x.p} → ${m[1]}`) }
  }
}
const verseNon200 = verseFetched.filter((x) => x.status !== 200)
record('C1 no links to missing topic hubs (all verse + today pages)', broken === 0 && verseNon200.length === 0, `${broken} broken links; ${verseNon200.length} non-200 pages ${brokenEx.join(' | ')}`)

const retired = [...new Set(index.flatMap((e) => e.tags || []).filter((t) => !topicSet.has(t)))]
const redirectChecks = retired.flatMap((s) => [['en', s], ['hi', s]])
const redir = await pool(redirectChecks, 8, async ([loc, s]) => {
  const p = `${loc === 'hi' ? '/hi' : ''}/gita/topic/${encodeURIComponent(s)}`
  const r = await get(BASE + p)
  const to = r.headers.get('location') || ''
  let final = 0
  if (to) final = (await get(new URL(to, BASE).href)).status
  return { loc, s, status: r.status, to: toLocal(to.replace(BASE, '')), final }
})
const badRedir = redir.filter((x) => ![301, 308].includes(x.status) || x.final !== 200 || (x.loc === 'hi') !== x.to.startsWith('/hi/'))
record('C2 retired topic slugs: one permanent hop to a 200, same locale', badRedir.length === 0, `${redir.length} checked; bad: ${badRedir.slice(0, 5).map((x) => `${x.loc}/${x.s}:${x.status}→${x.to}(${x.final})`).join(' ')}`)
// Second request for the same URLs must still carry a Location header (Next replays cached page-level redirects without one).
const again = await pool(redirectChecks.slice(0, 40), 8, async ([loc, s]) => {
  const r = await get(BASE + `${loc === 'hi' ? '/hi' : ''}/gita/topic/${encodeURIComponent(s)}`)
  return { s, status: r.status, to: r.headers.get('location') }
})
const noLoc = again.filter((x) => !x.to)
record('C2b repeat requests keep the Location header', noLoc.length === 0, `${noLoc.length}/40 missing: ${noLoc.slice(0, 5).map((x) => x.s).join(', ')}`)
const coOccurring = new Set(retired.filter((s) => index.some((e) => e.tags?.includes(s) && e.tags.some((t) => topicSet.has(t)))))
const generic = redir.filter((x) => coOccurring.has(x.s) && !/\/gita\/topic\//.test(x.to))
record('C3 relevant redirect targets (topic hub, not generic hub)', generic.length === 0, `${coOccurring.size} slugs with a related hub; generic: ${generic.slice(0, 5).map((x) => x.s).join(', ')}`)

const legacy = ['/hi', '/support', '/support.html', '/blog/hare-krishna-mahamantra', '/blogs/index.html', '/gita/topic', '/hi/gita/topic/greed', '/gita/topic/mind-control']
for (const p of legacy) {
  const r = await get(BASE + p)
  let ok = r.status === 200
  let to = r.headers.get('location') || ''
  if ([301, 308].includes(r.status)) ok = (await get(new URL(to, BASE).href)).status === 200
  record(`C4 legacy ${p}`, ok, `${r.status} ${toLocal(to.replace(BASE, ''))}`)
}

// ── D. Snippets ──────────────────────────────────────────────────────────────
const vEN = verseFetched.filter((x) => x.p.startsWith('/gita/chapter'))
const vHI = verseFetched.filter((x) => x.p.startsWith('/hi/gita/chapter'))
const lenBad = verseFetched.filter((x) => x.p.includes('/chapter/')).filter((x) => { const t = titleOf(x.body); const d = descOf(x.body); return t.length > 70 || d.length < 70 || d.length > (x.p.startsWith('/hi/') ? 145 : 160) || /…$/.test(d) })
record('D1 verse titles ≤70, descriptions 70–160 (HI ≤145), no mid-text cut', lenBad.length === 0, `${lenBad.length} bad: ${lenBad.slice(0, 3).map((x) => `${x.p} t${titleOf(x.body).length} d${descOf(x.body).length}`).join(' ')}`)
const enBad = vEN.filter((x) => { const [, c, v] = x.p.match(/chapter\/(\d+)\/verse\/(\d+)/); const t = titleOf(x.body); return !t.includes(`Bhagavad Gita ${c}.${v}`) || !t.includes(`BG ${c}.${v}`) || /hindi/i.test(t) })
record('D2 EN verse titles: both ref forms, no "Hindi"', enBad.length === 0, `${enBad.length} bad: ${enBad.slice(0, 3).map((x) => titleOf(x.body)).join(' | ')}`)
const hiBad = vHI.filter((x) => devaShare(titleOf(x.body).replace(/\bBG\b/g, '').replace(/\| Wisdom$/, '')) < 0.6 || devaShare(descOf(x.body)) < 0.6)
record('D3 HI verse title + description ≥60% Devanagari', hiBad.length === 0, `${hiBad.length} bad: ${hiBad.slice(0, 3).map((x) => x.p + ' ' + descOf(x.body).slice(0, 60)).join(' | ')}`)
const dupT = (arr) => arr.length - new Set(arr.map((x) => titleOf(x.body))).size
record('D1b verse titles unique per locale', dupT(vEN) === 0 && dupT(vHI) === 0, `dupes en=${dupT(vEN)} hi=${dupT(vHI)}`)

const TARGETS = {
  '/blogs/best-bhagavad-gita-translation': 'bhagavad gita translation',
  '/blogs/krishna-quotes': 'krishna quotes',
  '/blogs/bhagavad-gita-complete-structure-all-chapters': '18 chapters',
  '/blogs/krishna-three-paths-bhagavad-gita': 'three paths',
  '/blogs/bhagwat-geeta-chapter-18': 'chapter 18',
  '/blogs/bhagwat-geeta-chapter-11': 'chapter 11',
  '/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste': 'karmanye vadhikaraste meaning',
  '/blogs/karma-quotes-bhagavad-gita': 'karma quotes',
}
for (const [p, term] of Object.entries(TARGETS)) {
  const x = await html(p); const t = titleOf(x.body); const d = descOf(x.body)
  record(`D4 ${p}`, x.status === 200 && t.toLowerCase().includes(term) && t.length <= 70 && d.length >= 120 && d.length <= 160, `t${t.length} "${t}" d${d.length}`)
}

// ── E1. Nav app link ─────────────────────────────────────────────────────────
const navPages = ['/', '/gita', '/hi/gita', '/blogs/krishna-quotes', '/gita/chapter/2/verse/47', '/gita-for', '/about']
for (const p of navPages) {
  const x = await html(p)
  const links = [...x.body.matchAll(/<a[^>]*data-nav-app[^>]*>/g)].map((m) => m[0])
  const ok = links.length === 2 && links.every((a) => /href="\/app"/.test(a) && /data-mp-location="nav_app_(desktop|mobile)"/.test(a))
  record(`E1 nav app link ${p}`, ok, `${links.length} found`)
}

// ── F. Health ────────────────────────────────────────────────────────────────
for (const p of ['/', '/gita', '/hi/gita', '/app', '/blogs', '/gita/topic/karma', '/hi/gita/topic/karma']) {
  const r = await get(BASE + p); record(`F2 ${p}`, r.status === 200, `${r.status}`)
}
let ldBad = 0
for (const x of sampled.filter((s) => s.status === 200)) for (const m of x.body.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) { try { JSON.parse(m[1]) } catch { ldBad++ } }
record('F3 JSON-LD parses on sampled pages', ldBad === 0, `${ldBad} invalid blocks`)

const failed = results.filter((r) => !r.pass)
console.log(`\n${results.length - failed.length}/${results.length} checks passed (${MODE}).`)
process.exit(failed.length ? 1 : 0)
