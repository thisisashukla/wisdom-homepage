#!/usr/bin/env node
/**
 * Build the downloadable Hindi Bhagavad Gita PDF (all verses, Sanskrit + Hindi meaning).
 *
 * Reads:   src/content/gita/chapters.json, src/content/gita/verses/{ch}-{vs}.json
 * Writes:  public/downloads/bhagavad-gita-700-shlok-hindi.pdf
 *
 * Needs (not in package.json on purpose, install without saving):
 *   npm i --no-save playwright pdf-lib && npx playwright install chromium
 *
 * Usage:
 *   node scripts/pdf/build-gita-pdf.mjs [--out <file.pdf>] [--html <debug.html>]
 *
 * Rendering: HTML -> Chromium (Playwright) -> PDF. Fonts are the OFL woff2 files in
 * scripts/pdf/fonts (Tiro Devanagari Sanskrit for the shlokas, as on the site; Noto Serif
 * Devanagari for Hindi; Cormorant Garamond for Latin). Two passes: the first finds the
 * page of each chapter through the PDF outline, the second prints the contents page with
 * those page numbers. pdf-lib then writes the document metadata.
 *
 * Data clean-up (the source Hindi is the Gita Press style text from sanscripts, with its
 * punctuation stripped). See cleanHindi(), cleanSanskrit() and the OVERRIDES below.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', '..')
const CONTENT = path.join(ROOT, 'src', 'content', 'gita')
const FONTS = path.join(__dirname, 'fonts')

const args = process.argv.slice(2)
const argVal = (name) => {
  const i = args.indexOf(name)
  return i >= 0 ? args[i + 1] : undefined
}
const OUT = path.resolve(argVal('--out') ?? path.join(ROOT, 'public', 'downloads', 'bhagavad-gita-700-shlok-hindi.pdf'))
const HTML_OUT = argVal('--html')

const SITE = 'https://wisdomquotes.in'
const META = {
  title: 'श्रीमद्भगवद्गीता: 700 श्लोक हिंदी अर्थ सहित',
  author: 'Wisdom (wisdomquotes.in)',
  subject: 'श्रीमद्भगवद्गीता के सभी 18 अध्याय और 700 श्लोक, संस्कृत मूल और हिंदी अर्थ के साथ',
  keywords: [
    'श्रीमद्भगवद्गीता',
    'भगवद गीता',
    'भगवद गीता हिंदी',
    'गीता के 700 श्लोक',
    'गीता श्लोक अर्थ सहित',
    'भगवद गीता PDF',
    'Bhagavad Gita Hindi PDF',
    'Bhagavad Gita 700 shlok',
    'wisdomquotes.in',
  ],
  language: 'hi',
}

// ── Hand-checked fixes for source data problems ────────────────────────────────
// 13.1 is the Arjuna question that many editions leave out (so they count 34 verses in
// chapter 13). The source has no Hindi for it: its slot repeats the meaning of 13.2.
// This is a plain literal rendering of the shloka, written for this PDF.
const HINDI_OVERRIDES = {
  '13-1': 'अर्जुन बोले: हे केशव! मैं प्रकृति और पुरुष, क्षेत्र और क्षेत्रज्ञ, ज्ञान और ज्ञेय, इन सबको जानना चाहता हूँ ॥',
}
const VERSE_NOTES = {
  '13-1': 'कई संस्करणों में यह श्लोक नहीं गिना जाता, इसलिए वहाँ इस अध्याय में एक श्लोक कम है।',
}
// Typos in the source Hindi (stray letters after vocatives).
const HINDI_TYPOS = [
  ['हे पाण्डवन ', 'हे पाण्डव '],
  ['श्रेष्ठ अर्जुनव ', 'श्रेष्ठ अर्जुन '],
  ['हे विश्वेश्वरव ', 'हे विश्वेश्वर '],
]
// Verses where the speaker line sits in the middle of the shloka, not before it.
const MID_SPEAKER = new Set(['1-21', '1-28'])

// ── Text helpers ───────────────────────────────────────────────────────────────

const DEVA_LETTERS = /[अ-हक़-ॡॲ-ॿ]/g
const devaCount = (s) => (String(s).match(DEVA_LETTERS) || []).length
const isGarbage = (s) => devaCount(s) < 20

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Sorensen-Dice on character bigrams, spaces removed. Used to spot verses that share one
// joint meaning in the source (Gita Press gives some meanings for 2 or 3 verses together).
function similarity(a, b) {
  const A = a.replace(/\s+/g, '')
  const B = b.replace(/\s+/g, '')
  if (A === B) return 1
  if (A.length < 2 || B.length < 2) return 0
  const grams = new Map()
  for (let i = 0; i < A.length - 1; i++) {
    const g = A.slice(i, i + 2)
    grams.set(g, (grams.get(g) || 0) + 1)
  }
  let hit = 0
  for (let i = 0; i < B.length - 1; i++) {
    const g = B.slice(i, i + 2)
    const n = grams.get(g)
    if (n) {
      hit++
      grams.set(g, n - 1)
    }
  }
  return (2 * hit) / (A.length - 1 + B.length - 1)
}

const CONS = '[\\u0915-\\u0939\\u0958-\\u095F\\u0978-\\u097F]'
// "क्ित" style mistakes: an i-matra typed after the virama instead of after the cluster.
// Move ि to the end of the following consonant cluster: क्ित -> क्ति, त्ित्र -> त्त्रि.
const MISPLACED_I = new RegExp(`\\u094D\\u093F(${CONS}\\u093C?(?:\\u094D${CONS}\\u093C?)*)`, 'g')

function fixDevanagari(s) {
  return s
    .replace(MISPLACED_I, '्$1ि')
    .replace(/([ा-ौ])\1+/g, '$1') // doubled matra: मेरेे, हुुई
}

function syllableNuclei(s) {
  const out = []
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i)
    const vowel = (c >= 0x0904 && c <= 0x0914) || c === 0x0960 || c === 0x0961
    const cons = (c >= 0x0915 && c <= 0x0939) || (c >= 0x0958 && c <= 0x095f)
    if (vowel || (cons && s[i + 1] !== '\u094D' && !(s[i + 1] === '\u093C' && s[i + 2] === '\u094D'))) out.push(i)
  }
  return out
}

function splitLongPada(line) {
  const end = line.match(/\s*[।॥]\s*$/)?.[0] ?? ''
  const body = line.slice(0, line.length - end.length)
  const nuc = syllableNuclei(body)
  if (nuc.length !== 22 && nuc.length !== 24) return [line]
  let j = nuc[nuc.length / 2 - 1] + 1
  while (j < body.length && /[\u0900-\u0903\u093A-\u094C]/.test(body[j])) j++
  // A pada-final म्/न् glued to the next word belongs to the first pada (वक्त्रम्स्व, महात्मन्गरीयसे).
  const lead = body.slice(j).match(/^([मन])\u094D([\u0915-\u0939])/)
  if (lead && lead[2] !== lead[1] && !'यरव'.includes(lead[2])) j += 2
  const a = body.slice(0, j).trim()
  const b = body.slice(j).trim()
  return a && b ? [a, b + end] : [line]
}

const SPEAKER_RE = /^\s*(श्री\s?भगवानुवाच|(?:धृतराष्ट्र|सञ्जय|संजय|अर्जुन)\s+उवाच)\s*/

function cleanSanskrit(raw, key) {
  let s = fixDevanagari(String(raw).trim())
  let speaker = ''
  const m = s.match(SPEAKER_RE)
  if (m) {
    speaker = m[1].replace(/श्री\s+भगवान/, 'श्रीभगवान').replace(/\s+/g, ' ')
    s = s.slice(m[0].length)
  }
  // One line per half-verse: break after every danda. Trishtubh/Jagati halves (22 or 24
  // syllables, chapter 11 and others) are glued in the source ("यदुक्तंहे"), so they get
  // one line per pada, as in printed editions.
  const lines = s
    .split(/(?<=।)/)
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .flatMap(splitLongPada)
    .map((l) => l.replace(/ ([।॥])/g, '\u00A0$1'))
  return { speaker, lines, mid: MID_SPEAKER.has(key) && speaker && lines.length > 1 }
}

const VOC_STOP = new Set('मैं यह तू आप तुम वह जो को का की के में से है हैं ये वे इस उस और तथा'.split(' '))
const MATRA_START = /^[ऀ-ःऺ-ॏ॑-ॗॢॣ]/

function cleanHindi(raw) {
  let s = fixDevanagari(String(raw))
  for (const [a, b] of HINDI_TYPOS) s = s.split(a).join(b)
  // "अर्जुन बोले  हे ..." / "श्रीभगवान् बोलेहे ..." -> "अर्जुन बोले: हे ..."
  s = s.replace(/^\s*(श्रीभगवान्|अर्जुन|संजय|सञ्जय|धृतराष्ट्र)\s+बोले\s*:?\s*/, '$1 बोले: ')
  // The source lost the "!" after vocatives and left a double space. Put it back when the
  // phrase after हे is a short form of address (1 to 3 words, no pronoun or verb).
  s = s.replace(/(^|\s)हे ((?:[^\s।॥,!:]+ ){0,2}[^\s।॥,!:]+) {2,}/g, (all, pre, phrase) => {
    if (phrase.split(' ').some((w) => VOC_STOP.has(w))) return all
    return `${pre}हे ${phrase}! `
  })
  // Hyphens lost in reduplicated words: बड़ेबड़े -> बड़े-बड़े, जहाँजहाँ -> जहाँ-जहाँ.
  s = s.replace(/[ऀ-ॿ]+/g, (w) => {
    const m = w.match(/^([ऀ-ॿ]{2,})\1$/)
    if (!m || MATRA_START.test(m[1]) || devaCount(m[1]) < 1) return w
    return `${m[1]}-${m[1]}`
  })
  s = s
    .replace(/\s+/g, ' ')
    .replace(/\s*।\s*/g, '\u00A0। ')
    .replace(/\s*॥\s*$/, '\u00A0॥')
    .trim()
  if (!/[॥]$/.test(s)) s += '\u00A0॥'
  return s
}

// ── Data ───────────────────────────────────────────────────────────────────────

async function loadData() {
  const chapters = JSON.parse(await fs.readFile(path.join(CONTENT, 'chapters.json'), 'utf8'))
  const report = { garbage: [], fixed: [], groups: [], overrides: [], invalid: [] }
  for (const ch of chapters) {
    const verses = []
    for (const n of ch.verses) {
      const v = JSON.parse(await fs.readFile(path.join(CONTENT, 'verses', `${ch.number}-${n}.json`), 'utf8'))
      verses.push(v)
    }
    ch.items = verses.map((v) => ({
      key: `${v.chapter}-${v.verse}`,
      chapter: v.chapter,
      verse: v.verse,
      sa: cleanSanskrit(v.sanskrit, `${v.chapter}-${v.verse}`),
      rawHi: String(v.hindiTranslation ?? ''),
      hi: null,
      groupLabel: '',
      showMeaning: true,
      note: VERSE_NOTES[`${v.chapter}-${v.verse}`] || '',
    }))

    const it = ch.items
    // 1) Garbage Hindi whose meaning was merged into the next verse ("॥" at 18.2, with
    //    18.3 holding "श्रीभगवान् बोले ... ।  <18.3 meaning> ॥"): split it back at the danda.
    for (let i = 0; i < it.length; i++) {
      const cur = it[i]
      if (!isGarbage(cur.rawHi) || HINDI_OVERRIDES[cur.key]) continue
      report.garbage.push({ key: cur.key, raw: cur.rawHi })
      const next = it[i + 1]
      if (cur.sa.speaker && next && /^\s*श्रीभगवान्\s+बोले/.test(next.rawHi) && next.rawHi.includes('।')) {
        const cut = next.rawHi.indexOf('।')
        cur.rawHi = next.rawHi.slice(0, cut) + ' ॥'
        next.rawHi = next.rawHi.slice(cut + 1)
        report.fixed.push(`${cur.key}: Hindi was "${report.garbage.at(-1).raw.trim()}"; the source had merged its meaning into ${next.key}. Split ${next.key} at the first danda: first sentence -> ${cur.key}, rest -> ${next.key}.`)
      }
    }
    // 2) Hand overrides.
    for (const x of it) {
      if (HINDI_OVERRIDES[x.key]) {
        report.overrides.push({ key: x.key, raw: x.rawHi.slice(0, 80) })
        x.rawHi = HINDI_OVERRIDES[x.key]
      }
    }
    // 3) Joint meanings: consecutive verses with (near) identical Hindi print once.
    let i = 0
    while (i < it.length) {
      let j = i
      while (
        j + 1 < it.length &&
        !HINDI_OVERRIDES[it[j + 1].key] &&
        !HINDI_OVERRIDES[it[i].key] &&
        similarity(it[i].rawHi, it[j + 1].rawHi) > 0.75
      ) j++
      if (j > i) {
        const nums = it.slice(i, j + 1).map((x) => x.verse)
        const label = nums.length === 2 ? `श्लोक ${nums[0]} और ${nums[1]} का अर्थ` : `श्लोक ${nums[0]} से ${nums.at(-1)} का अर्थ`
        for (let k = i; k < j; k++) it[k].showMeaning = false
        it[j].groupLabel = label
        it[j].rawHi = it[i].rawHi // first copy is the original; later copies carry stray edits
        report.groups.push(`${ch.number}.${nums.join('/')}`)
      }
      i = j + 1
    }
    // 4) Clean, and refuse to print anything empty.
    for (const x of it) {
      if (!x.showMeaning) continue
      if (isGarbage(x.rawHi)) throw new Error(`Verse ${x.key}: Hindi meaning is empty or broken (${JSON.stringify(x.rawHi)}). Add a HINDI_OVERRIDES entry.`)
      x.hi = cleanHindi(x.rawHi)
    }
    // 5) Anything that would still shape badly (dotted circles): virama or matra followed by a matra.
    const BAD = /[\u093E-\u094D][\u093E-\u094C]/
    for (const x of it) {
      for (const t of [x.hi ?? '', ...x.sa.lines]) if (BAD.test(t)) report.invalid.push(`${x.key}: ${t.match(/.{0,6}[\u093E-\u094D][\u093E-\u094C].{0,4}/)[0]}`)
    }
  }
  return { chapters, report }
}

// ── HTML ───────────────────────────────────────────────────────────────────────

function fontFaces() {
  const f = (file) => pathToFileURL(path.join(FONTS, file)).href
  const LATIN = 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
  const DEVA = 'U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0, U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09'
  return `
@font-face{font-family:'Tiro Devanagari Sanskrit';font-weight:400;src:url('${f('tiro-devanagari-sanskrit-devanagari-400-normal.woff2')}') format('woff2');unicode-range:${DEVA}}
@font-face{font-family:'Tiro Devanagari Sanskrit';font-weight:400;src:url('${f('tiro-devanagari-sanskrit-latin-400-normal.woff2')}') format('woff2');unicode-range:${LATIN}}
@font-face{font-family:'Noto Serif Devanagari';font-weight:400;src:url('${f('noto-serif-devanagari-devanagari-400-normal.woff2')}') format('woff2');unicode-range:${DEVA}}
@font-face{font-family:'Noto Serif Devanagari';font-weight:600;src:url('${f('noto-serif-devanagari-devanagari-600-normal.woff2')}') format('woff2');unicode-range:${DEVA}}
@font-face{font-family:'Noto Serif Devanagari';font-weight:400;src:url('${f('noto-serif-devanagari-latin-400-normal.woff2')}') format('woff2');unicode-range:${LATIN}}
@font-face{font-family:'Noto Serif Devanagari';font-weight:600;src:url('${f('noto-serif-devanagari-latin-600-normal.woff2')}') format('woff2');unicode-range:${LATIN}}
@font-face{font-family:'Cormorant Garamond';font-weight:500;src:url('${f('cormorant-garamond-latin-500-normal.woff2')}') format('woff2')}
@font-face{font-family:'Cormorant Garamond';font-weight:600;src:url('${f('cormorant-garamond-latin-600-normal.woff2')}') format('woff2')}
@font-face{font-family:'Cormorant Garamond';font-weight:500;font-style:italic;src:url('${f('cormorant-garamond-latin-500-italic.woff2')}') format('woff2')}
`
}

// Site palette (src/styles/tokens.css): maroon night #120505, cream #f5e8cc, gold #c8881e,
// gold-light #f5c96a, gold-pale #fdf3dc. Inside pages are printed light for reading.
const CSS = `
@page{size:A5;margin:15mm 14mm 17mm 14mm;background:#fffaf0;
  @bottom-left{content:"wisdomquotes.in/hi/gita";font-family:'Cormorant Garamond',serif;font-size:9pt;color:#8a6a4a;vertical-align:top;padding-top:4mm;font-variant-numeric:lining-nums}
  @bottom-right{content:counter(page);font-family:'Noto Serif Devanagari',serif;font-size:8.5pt;color:#8a6a4a;vertical-align:top;padding-top:4mm;font-variant-numeric:lining-nums}}
@page cover{margin:0;@bottom-left{content:none}@bottom-right{content:none}}
*{box-sizing:border-box;margin:0;padding:0}
html{background:#fffaf0}
.cover,.toc .n,.toc .p,.end .url{font-variant-numeric:lining-nums}
body{font-family:'Noto Serif Devanagari',serif;color:#2a1210;font-size:11pt;line-height:1.6;-webkit-print-color-adjust:exact;print-color-adjust:exact}
a{color:inherit;text-decoration:none}
.cover{page:cover;width:148mm;height:210mm;background:#120505;color:#f5e8cc;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:20mm 16mm;position:relative}
.cover .om{font-family:'Tiro Devanagari Sanskrit',serif;color:#c8881e;font-size:26pt;line-height:1;margin-bottom:12mm}
.cover h1{font-family:'Tiro Devanagari Sanskrit',serif;font-weight:400;color:#f5c96a;font-size:34pt;line-height:1.35}
.cover .rule{width:28mm;height:0;border-top:0.6pt solid #c8881e;margin:9mm auto}
.cover .sub{font-size:14pt;line-height:1.6;color:#f5e8cc}
.cover .sub2{font-size:11pt;color:rgba(245,232,204,.65);margin-top:3mm}
.cover .brand{position:absolute;bottom:16mm;left:0;right:0;font-family:'Cormorant Garamond',serif;font-size:13pt;letter-spacing:.06em;color:rgba(245,232,204,.8)}
.cover .brand b{font-weight:600;color:#f5c96a}
.toc{break-before:page}
.toc h2,.end h2{font-weight:600;font-size:17pt;color:#2a1210;margin-bottom:2mm}
.toc .lead{font-size:10pt;color:#6b4a35;margin-bottom:4mm}
.toc .lead a{color:#9a6614}
.toc ol{list-style:none}
.toc li{display:flex;align-items:baseline;gap:2.5mm;padding:0.9mm 0;line-height:1.45;border-bottom:0.4pt solid #ead9b8;font-size:10.5pt}
.toc .n{width:7mm;color:#c8881e;font-weight:600;font-size:10pt}
.toc .t{flex:1}
.toc .c{font-size:8.5pt;color:#8a6a4a}
.toc .p{width:9mm;text-align:right;font-size:10pt;color:#6b4a35}
.chap{break-before:page}
.chap-head{text-align:center;margin:2mm 0 7mm;break-after:avoid}
.chap-head .k{font-size:10pt;letter-spacing:.08em;color:#c8881e;font-weight:600}
.chap-head h2{font-weight:600;font-size:20pt;line-height:1.35;margin-top:1mm}
.chap-head .ht{font-size:11pt;color:#6b4a35}
.chap-head .rule{width:18mm;border-top:0.6pt solid #c8881e;margin:4mm auto}
.chap-head .online{font-size:9pt;color:#6b4a35}
.chap-head .online a{color:#9a6614;border-bottom:0.4pt solid #e8c97a}
.v{break-inside:avoid;margin-bottom:6.5mm}
.v .lbl{font-size:8.5pt;font-weight:600;letter-spacing:.03em;color:#9a6614;margin-bottom:1mm}
.v .spk{font-family:'Tiro Devanagari Sanskrit',serif;font-size:10.5pt;color:#8a6a4a;margin:0.5mm 0}
.v .sa{font-family:'Tiro Devanagari Sanskrit',serif;font-size:13pt;line-height:1.65;color:#120505}
.v .sa span{display:block}
.v .grp{font-size:8.5pt;color:#8a6a4a;margin-top:2mm}
.v .hi{font-size:11pt;line-height:1.65;color:#2a1210;margin-top:2mm;padding-left:3mm;border-left:0.8pt solid #e8c97a}
.v .note{font-size:8.5pt;color:#8a6a4a;margin-top:1.5mm}
.v.nomean{margin-bottom:3.5mm}
.end{break-before:page;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;height:170mm}
.end .om{font-family:'Tiro Devanagari Sanskrit',serif;color:#c8881e;font-size:20pt;margin-bottom:8mm}
.end p{font-size:13pt;line-height:1.7;max-width:100mm}
.end .url{margin-top:6mm;font-family:'Cormorant Garamond',serif;font-size:15pt;font-weight:600;color:#9a6614}
`

function verseHtml(x) {
  const { speaker, lines, mid } = x.sa
  let sa = ''
  if (mid) {
    sa = `<p class="sa"><span>${esc(lines[0])}</span></p><p class="spk">${esc(speaker)}</p><p class="sa">${lines.slice(1).map((l) => `<span>${esc(l)}</span>`).join('')}</p>`
  } else {
    sa = `${speaker ? `<p class="spk">${esc(speaker)}</p>` : ''}<p class="sa">${lines.map((l) => `<span>${esc(l)}</span>`).join('')}</p>`
  }
  const url = `${SITE}/hi/gita/chapter/${x.chapter}/verse/${x.verse}`
  const mean = x.showMeaning
    ? `${x.groupLabel ? `<p class="grp">${esc(x.groupLabel)}</p>` : ''}<p class="hi">${esc(x.hi)}</p>`
    : ''
  const note = x.note ? `<p class="note">${esc(x.note)}</p>` : ''
  return `<section class="v${x.showMeaning ? '' : ' nomean'}" id="v-${x.key}"><p class="lbl"><a href="${url}">अध्याय ${x.chapter}, श्लोक ${x.verse}</a></p>${sa}${mean}${note}</section>`
}

function buildHtml(chapters, pages = {}) {
  const toc = chapters
    .map(
      (c) =>
        `<li><span class="n">${c.number}</span><span class="t"><a href="#ch-${c.number}">${esc(c.hiName)}</a> <span class="c">${c.items.length} श्लोक</span></span><span class="p">${pages[c.number] ?? ''}</span></li>`,
    )
    .join('')
  const body = chapters
    .map((c) => {
      const url = `${SITE}/hi/gita/chapter/${c.number}`
      return `<div class="chap"><header class="chap-head" id="ch-${c.number}"><p class="k">अध्याय ${c.number}</p><h2>${esc(c.hiName)}</h2><p class="ht">${esc(c.hiTitle)}</p><div class="rule"></div><p class="online">यह अध्याय ऑनलाइन पढ़ें: <a href="${url}">wisdomquotes.in/hi/gita/chapter/${c.number}</a></p></header>${c.items.map(verseHtml).join('')}</div>`
    })
    .join('')
  return `<!DOCTYPE html><html lang="hi"><head><meta charset="utf-8"><title>${esc(META.title)}</title><style>${fontFaces()}${CSS}</style></head><body>
<section class="cover"><div class="om">ॐ</div><h1>श्रीमद्भगवद्गीता</h1><div class="rule"></div><p class="sub">700 श्लोक, संस्कृत और हिंदी अर्थ सहित</p><p class="sub2">18 अध्याय</p><p class="brand"><b>Wisdom</b> · wisdomquotes.in</p></section>
<section class="toc"><h2>विषय सूची</h2><p class="lead">हर अध्याय ऑनलाइन भी पढ़ें: <a href="${SITE}/hi/gita">wisdomquotes.in/hi/gita</a></p><ol>${toc}</ol></section>
${body}
<section class="end"><div class="om">॥ ॐ तत्सत् ॥</div><p>हर दिन गीता का एक श्लोक, हिंदी अर्थ के साथ, wisdomquotes.in पर पढ़ें।</p><p class="url"><a href="${SITE}/hi/gita/today">wisdomquotes.in/hi/gita/today</a></p></section>
</body></html>`
}

// ── PDF ────────────────────────────────────────────────────────────────────────

async function chapterPagesFromOutline(pdfBytes, PDFLib) {
  const { PDFDocument, PDFName, PDFArray, PDFDict, PDFString, PDFHexString } = PDFLib
  const doc = await PDFDocument.load(pdfBytes)
  const pageIndex = new Map(doc.getPages().map((p, i) => [p.ref.toString(), i]))
  const ctx = doc.context
  const lookup = (o) => (o ? ctx.lookup(o) : undefined)
  const named = new Map()
  const names = lookup(doc.catalog.get(PDFName.of('Names')))
  const walkNameTree = (node) => {
    if (!node) return
    const kids = lookup(node.get(PDFName.of('Kids')))
    if (kids) for (let i = 0; i < kids.size(); i++) walkNameTree(lookup(kids.get(i)))
    const arr = lookup(node.get(PDFName.of('Names')))
    if (arr) for (let i = 0; i + 1 < arr.size(); i += 2) named.set(lookup(arr.get(i)).decodeText(), lookup(arr.get(i + 1)))
  }
  if (names) walkNameTree(lookup(names.get(PDFName.of('Dests'))))
  const destPage = (d) => {
    d = lookup(d)
    if (d instanceof PDFString || d instanceof PDFHexString) d = named.get(d.decodeText())
    if (d instanceof PDFName) d = named.get(d.decodeText?.() ?? d.asString().slice(1))
    if (d instanceof PDFDict) d = lookup(d.get(PDFName.of('D')))
    if (d instanceof PDFArray) return pageIndex.get(d.get(0).toString())
    return undefined
  }
  const found = []
  const walk = (item) => {
    while (item) {
      const title = lookup(item.get(PDFName.of('Title')))?.decodeText?.() ?? ''
      let dest = item.get(PDFName.of('Dest'))
      if (!dest) {
        const a = lookup(item.get(PDFName.of('A')))
        if (a) dest = a.get(PDFName.of('D'))
      }
      found.push({ title, page: destPage(dest) })
      walk(lookup(item.get(PDFName.of('First'))))
      item = lookup(item.get(PDFName.of('Next')))
    }
  }
  const outlines = lookup(doc.catalog.get(PDFName.of('Outlines')))
  if (outlines) walk(lookup(outlines.get(PDFName.of('First'))))
  return found
}

async function main() {
  const { chromium } = await import('playwright')
  const PDFLib = await import('pdf-lib')
  const { chapters, report } = await loadData()

  const browser = await chromium.launch()
  const page = await browser.newPage()
  const render = async (html) => {
    const tmp = path.join(__dirname, '.cache', 'gita-pdf.html')
    await fs.mkdir(path.dirname(tmp), { recursive: true })
    await fs.writeFile(tmp, html)
    await page.goto(pathToFileURL(tmp).href, { waitUntil: 'load' })
    await page.evaluate(() => document.fonts.ready)
    return page.pdf({ format: 'A5', printBackground: true, preferCSSPageSize: true, outline: true, tagged: true })
  }

  // Pass 1: find chapter start pages through the outline (chapter <h2> headings).
  const first = await render(buildHtml(chapters))
  const outline = await chapterPagesFromOutline(first, PDFLib)
  const pages = {}
  for (const c of chapters) {
    const hit = outline.find((o) => o.title.trim() === c.hiName.trim() && o.page !== undefined)
    if (!hit) throw new Error(`No outline entry for chapter ${c.number} (${c.hiName})`)
    pages[c.number] = hit.page + 1
  }
  // Pass 2: same layout, contents page now carries the numbers.
  const html = buildHtml(chapters, pages)
  if (HTML_OUT) await fs.writeFile(HTML_OUT, html)
  const pdfBytes = await render(html)
  await browser.close()

  const doc = await PDFLib.PDFDocument.load(pdfBytes)
  doc.setTitle(META.title, { showInWindowTitleBar: true })
  doc.setAuthor(META.author)
  doc.setSubject(META.subject)
  doc.setKeywords(META.keywords)
  doc.setCreator('wisdomquotes.in')
  doc.setProducer('wisdomquotes.in scripts/pdf/build-gita-pdf.mjs (Chromium, pdf-lib)')
  doc.setLanguage(META.language)
  doc.setCreationDate(new Date())
  doc.setModificationDate(new Date())
  const out = await doc.save()
  await fs.mkdir(path.dirname(OUT), { recursive: true })
  await fs.writeFile(OUT, out)

  console.log(`Wrote ${path.relative(ROOT, OUT)}: ${doc.getPageCount()} pages, ${(out.length / 1024 / 1024).toFixed(2)} MB`)
  console.log('Chapter pages:', JSON.stringify(pages))
  console.log('Garbage Hindi found:', report.garbage.map((g) => `${g.key}=${JSON.stringify(g.raw.trim())}`).join(', ') || 'none')
  for (const f of report.fixed) console.log('Fixed:', f)
  console.log('Hand-written overrides:', report.overrides.map((o) => o.key).join(', ') || 'none')
  console.log('Shaping problems left:', report.invalid.join(' | ') || 'none')
  console.log(`Joint meanings (${report.groups.length}):`, report.groups.join(', '))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
