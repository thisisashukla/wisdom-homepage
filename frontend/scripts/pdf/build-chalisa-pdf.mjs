#!/usr/bin/env node
/**
 * Build the printable Hanuman Chalisa PDFs (public/downloads), one per reader:
 *
 *   english     English letters (IAST, as sung) + English meaning
 *   devanagari  Devanagari + Hindi and English meaning
 *   kids        11-day learning sheet: 4 lines a day in large English letters, with a tick box
 *   telugu      Telugu letters + English meaning
 *   gujarati    Gujarati letters + English meaning
 *   kannada     Kannada letters + English meaning
 *
 * Reads:  src/content/funnels/hanuman-chalisa/chalisa.json  (Gita Press reading, verified)
 *         src/content/funnels/hanuman-chalisa/scripts.json  (scripts/funnels/hanuman-chalisa/build_scripts.py)
 * Writes: public/downloads/hanuman-chalisa-*.pdf  (paths match PDF_FILES in lib/funnels/hanuman-chalisa/shared.ts)
 *
 * Needs (not in package.json on purpose, install without saving):
 *   npm i --no-save playwright pdf-lib && npx playwright install chromium
 *
 * Usage:
 *   node scripts/pdf/build-chalisa-pdf.mjs [--only english,kids] [--html <dir>]
 *
 * Rendering: HTML -> Chromium (Playwright) -> PDF, US Letter (it also prints on A4 at "fit").
 * Fonts are the OFL woff2 files in scripts/pdf/fonts: Tiro Devanagari Hindi for the Awadhi
 * and its English letters (as on the site), Noto Serif Telugu / Gujarati / Kannada for the
 * other scripts, Noto Serif for meanings, Inter for labels. pdf-lib writes the metadata.
 */

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..', '..')
const CONTENT = path.join(ROOT, 'src', 'content', 'funnels', 'hanuman-chalisa')
const FONTS = path.join(__dirname, 'fonts')
const OUT_DIR = path.join(ROOT, 'public', 'downloads')
const SITE = 'wisdomquotes.in/hanuman-chalisa'

const args = process.argv.slice(2)
const argVal = (name) => {
  const i = args.indexOf(name)
  return i >= 0 ? args[i + 1] : undefined
}
const ONLY = argVal('--only')?.split(',')
const HTML_DIR = argVal('--html')

const doc = JSON.parse(await fs.readFile(path.join(CONTENT, 'chalisa.json'), 'utf8'))
const scripts = JSON.parse(await fs.readFile(path.join(CONTENT, 'scripts.json'), 'utf8')).scripts
if (doc.units.length !== 43) throw new Error('chalisa.json must hold 43 units')

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
/** Keep the danda with its last word. */
const nb = (t) => t.replace(/ ([।॥|]+)/g, ' $1')

// ── Editions ───────────────────────────────────────────────────────────────

const COMMON_KEYWORDS = ['Hanuman Chalisa', 'Hanuman Chalisa PDF', 'Tulsidas', 'Hanuman Chalisa with meaning', 'wisdomquotes.in']

const EDITIONS = {
  english: {
    file: 'hanuman-chalisa-english-with-meaning.pdf',
    title: 'Hanuman Chalisa in English, with meaning',
    sub: 'All 43 lines in English letters, the way they are sung, with the meaning of each line.',
    lang: 'en',
    keywords: ['Hanuman Chalisa in English', 'Hanuman Chalisa lyrics in English', 'Hanuman Chalisa English PDF'],
    line: (u) => ({ text: u.iast, cls: 'latn' }),
    meanings: (u) => [{ text: u.meaning.en, lang: 'en' }],
    note: 'How to read the English letters: ā as in father, ī as in machine, ū as in rule, ṁ and ṅ hum through the nose, ñ as in canyon, ṭ and ḍ with the tongue curled back. The short a at the end of a word is dropped, as when the Chalisa is sung: जय reads jay, not jaya.',
  },
  devanagari: {
    file: 'hanuman-chalisa-hindi-devanagari-with-meaning.pdf',
    title: 'श्री हनुमान चालीसा',
    sub: 'Devanagari text with the meaning of every line in Hindi and English.',
    lang: 'hi',
    keywords: ['हनुमान चालीसा', 'हनुमान चालीसा PDF', 'Hanuman Chalisa Hindi PDF'],
    line: (u) => ({ text: u.awadhi, cls: 'deva' }),
    meanings: (u) => [
      { text: u.meaning.hi, lang: 'hi' },
      { text: u.meaning.en, lang: 'en' },
    ],
  },
  telugu: {
    file: 'hanuman-chalisa-telugu-with-english-meaning.pdf',
    title: 'హనుమాన్ చాలీసా · Hanuman Chalisa in Telugu',
    sub: "Tulsidas's Awadhi words in Telugu letters, with the English meaning of every line.",
    lang: 'te',
    keywords: ['Hanuman Chalisa in Telugu', 'Hanuman Chalisa Telugu PDF', 'హనుమాన్ చాలీసా'],
    line: (u) => ({ text: scripts.te[u.id], cls: 'te' }),
    meanings: (u) => [{ text: u.meaning.en, lang: 'en' }],
    note: 'The words are the Awadhi of the Gita Press edition, written in Telugu letters. Some Telugu printings use Sanskrit spellings for a few words (చరణ for చరన); the sound and the sense are the same.',
  },
  gujarati: {
    file: 'hanuman-chalisa-gujarati-with-english-meaning.pdf',
    title: 'હનુમાન ચાલીસા · Hanuman Chalisa in Gujarati',
    sub: "Tulsidas's Awadhi words in Gujarati letters, with the English meaning of every line.",
    lang: 'gu',
    keywords: ['Hanuman Chalisa in Gujarati', 'Hanuman Chalisa Gujarati PDF', 'હનુમાન ચાલીસા'],
    line: (u) => ({ text: scripts.gu[u.id], cls: 'gu' }),
    meanings: (u) => [{ text: u.meaning.en, lang: 'en' }],
    note: 'The words are the Awadhi of the Gita Press edition, written in Gujarati letters, so they sound exactly as the Chalisa is sung.',
  },
  kannada: {
    file: 'hanuman-chalisa-kannada-with-english-meaning.pdf',
    title: 'ಹನುಮಾನ್ ಚಾಲೀಸಾ · Hanuman Chalisa in Kannada',
    sub: "Tulsidas's Awadhi words in Kannada letters, with the English meaning of every line.",
    lang: 'kn',
    keywords: ['Hanuman Chalisa in Kannada', 'Hanuman Chalisa Kannada PDF', 'ಹನುಮಾನ್ ಚಾಲೀಸಾ'],
    line: (u) => ({ text: scripts.kn[u.id], cls: 'kn' }),
    meanings: (u) => [{ text: u.meaning.en, lang: 'en' }],
    note: 'The words are the Awadhi of the Gita Press edition, written in Kannada letters, so they sound exactly as the Chalisa is sung.',
  },
}

// ── HTML ───────────────────────────────────────────────────────────────────

const f = (name) => pathToFileURL(path.join(FONTS, name)).href
const LATIN = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'
const LATIN_EXT = 'U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF'

const FONT_CSS = `
@font-face{font-family:'Tiro Hindi';src:url('${f('tiro-devanagari-hindi-devanagari-400-normal.woff2')}') format('woff2');unicode-range:U+0900-097F,U+1CD0-1CF9,U+200C-200D,U+20A8,U+20B9,U+25CC,U+A830-A839,U+A8E0-A8FF}
@font-face{font-family:'Tiro Hindi';src:url('${f('tiro-devanagari-hindi-latin-400-normal.woff2')}') format('woff2');unicode-range:${LATIN}}
@font-face{font-family:'Tiro Hindi';src:url('${f('tiro-devanagari-hindi-latin-ext-400-normal.woff2')}') format('woff2');unicode-range:${LATIN_EXT}}
@font-face{font-family:'Tiro Hindi';font-style:italic;src:url('${f('tiro-devanagari-hindi-latin-400-italic.woff2')}') format('woff2');unicode-range:${LATIN}}
@font-face{font-family:'Tiro Hindi';font-style:italic;src:url('${f('tiro-devanagari-hindi-latin-ext-400-italic.woff2')}') format('woff2');unicode-range:${LATIN_EXT}}
@font-face{font-family:'Noto Serif Telugu';src:url('${f('noto-serif-telugu-telugu-400-normal.woff2')}') format('woff2')}
@font-face{font-family:'Noto Serif Gujarati';src:url('${f('noto-serif-gujarati-gujarati-400-normal.woff2')}') format('woff2')}
@font-face{font-family:'Noto Serif Kannada';src:url('${f('noto-serif-kannada-kannada-400-normal.woff2')}') format('woff2')}
@font-face{font-family:'Noto Serif';font-weight:400;src:url('${f('noto-serif-latin-400-normal.woff2')}') format('woff2');unicode-range:${LATIN}}
@font-face{font-family:'Noto Serif';font-weight:400;src:url('${f('noto-serif-latin-ext-400-normal.woff2')}') format('woff2');unicode-range:${LATIN_EXT}}
@font-face{font-family:'Noto Serif';font-weight:400;font-style:italic;src:url('${f('noto-serif-latin-400-italic.woff2')}') format('woff2');unicode-range:${LATIN}}
@font-face{font-family:'Noto Serif';font-weight:400;font-style:italic;src:url('${f('noto-serif-latin-ext-400-italic.woff2')}') format('woff2');unicode-range:${LATIN_EXT}}
@font-face{font-family:'Noto Serif';font-weight:600;src:url('${f('noto-serif-latin-600-normal.woff2')}') format('woff2');unicode-range:${LATIN}}
@font-face{font-family:'Inter';font-weight:500;src:url('${f('inter-latin-500-normal.woff2')}') format('woff2');unicode-range:${LATIN}}
@font-face{font-family:'Inter';font-weight:600;src:url('${f('inter-latin-600-normal.woff2')}') format('woff2');unicode-range:${LATIN}}
`

const BASE_CSS = `
${FONT_CSS}
@page{size:Letter;margin:0.7in 0.75in 0.75in 0.75in;
  @bottom-left{content:'${SITE}';font:500 8pt Inter;color:#9a7b5a}
  @bottom-right{content:counter(page) ' / ' counter(pages);font:500 8pt Inter;color:#9a7b5a}}
*{box-sizing:border-box}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;color:#2a140c;font-family:'Noto Serif','Tiro Hindi','Noto Serif Telugu','Noto Serif Gujarati','Noto Serif Kannada',serif;font-size:10.5pt;line-height:1.5}
header{border-bottom:1.2pt solid #b8862b;padding-bottom:12pt;margin-bottom:14pt}
.kicker{font:600 8pt Inter;letter-spacing:.14em;text-transform:uppercase;color:#9a6b1f;margin:0 0 6pt}
h1{font-family:'Tiro Hindi','Noto Serif Telugu','Noto Serif Gujarati','Noto Serif Kannada','Noto Serif',serif;font-weight:400;font-size:24pt;line-height:1.25;margin:0 0 6pt;color:#2a140c}
.sub{margin:0;color:#5b4232;font-size:10.5pt}
.note{margin:10pt 0 0;font-size:8.8pt;line-height:1.5;color:#6b5240}
.unit{break-inside:avoid;padding:9pt 0 10pt;border-top:0.5pt solid #e7d7bd}
.unit:first-of-type{border-top:0}
.label{font:600 7.5pt Inter;letter-spacing:.12em;text-transform:uppercase;color:#9a6b1f;margin:0 0 3pt}
.orig{margin:0;color:#2a140c}
.orig span{display:block}
.orig.latn{font-family:'Tiro Hindi',serif;font-size:14pt;line-height:1.45}
.orig.deva{font-family:'Tiro Hindi',serif;font-size:16.5pt;line-height:1.6}
.orig.te{font-family:'Noto Serif Telugu',serif;font-size:14.5pt;line-height:1.75}
.orig.gu{font-family:'Noto Serif Gujarati',serif;font-size:14.5pt;line-height:1.7}
.orig.kn{font-family:'Noto Serif Kannada',serif;font-size:14.5pt;line-height:1.75}
.mean{margin:4pt 0 0;font-size:9.8pt;line-height:1.5;color:#4a3426}
.mean[lang=en]{font-style:italic}
.mean[lang=hi]{font-family:'Tiro Hindi',serif;font-size:11pt;line-height:1.6}
.doha .orig{color:#7a2e12}
footer{margin-top:16pt;padding-top:10pt;border-top:1.2pt solid #b8862b;font-size:8.6pt;line-height:1.5;color:#6b5240}
footer p{margin:0 0 4pt}
`

const labelFor = (u, lang) => (lang === 'hi' ? u.label.hi : u.label.en)

function textHtml(key) {
  const ed = EDITIONS[key]
  const body = doc.units
    .map((u) => {
      const line = ed.line(u)
      const means = ed.meanings(u)
        .map((m) => `<p class="mean" lang="${m.lang}">${esc(m.text)}</p>`)
        .join('')
      const rows = line.text.map((t) => `<span>${esc(nb(t))}</span>`).join('')
      const langAttr = line.cls === 'latn' ? 'awa-Latn' : line.cls === 'deva' ? 'awa' : `awa-${{ te: 'Telu', gu: 'Gujr', kn: 'Knda' }[line.cls]}`
      return `<section class="unit ${u.kind}"><p class="label">${esc(labelFor(u, ed.lang))}</p><p class="orig ${line.cls}" lang="${langAttr}">${rows}</p>${means}</section>`
    })
    .join('\n')
  return `<!doctype html><html lang="${ed.lang === 'hi' ? 'hi' : 'en'}"><head><meta charset="utf-8"><title>${esc(ed.title)}</title><style>${BASE_CSS}</style></head><body>
<header><p class="kicker">Goswami Tulsidas · Gita Press reading</p><h1>${esc(ed.title)}</h1><p class="sub">${esc(ed.sub)}</p>${ed.note ? `<p class="note">${esc(ed.note)}</p>` : ''}</header>
<main>${body}</main>
<footer><p>Awadhi text: Goswami Tulsidas, in the Gita Press, Gorakhpur reading, checked against three Gita Press printings and Jagadguru Rambhadracharya's Mahaviri. Meanings: Wisdom's own words, following the traditional reading.</p><p>Word-by-word meaning of every line, a learn-by-heart mode and a recitation counter: ${SITE}</p></footer>
</body></html>`
}

function kidsHtml() {
  const days = new Map()
  for (const u of doc.units) {
    if (!days.has(u.learnDay)) days.set(u.learnDay, [])
    days.get(u.learnDay).push(u)
  }
  const blocks = [...days.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([day, units]) => {
      const lines = units
        .map(
          (u) =>
            `<div class="k-unit"><p class="label">${esc(u.label.en)}</p><p class="orig latn k-big" lang="awa-Latn">${u.iast
              .map((t) => `<span>${esc(t)}</span>`)
              .join('')}</p><p class="mean" lang="en">${esc(u.meaning.en)}</p></div>`,
        )
        .join('')
      return `<section class="k-day"><div class="k-head"><h2>Day ${day}</h2><p class="k-tick"><span class="box"></span> We said these together</p></div>${lines}</section>`
    })
    .join('\n')
  const css = `${BASE_CSS}
.k-day{break-inside:avoid;border:1pt solid #e2cfae;border-radius:8pt;padding:10pt 14pt 6pt;margin:0 0 12pt;background:#fffaf0}
.k-head{display:flex;align-items:center;justify-content:space-between;border-bottom:0.6pt solid #e7d7bd;padding-bottom:5pt;margin-bottom:4pt}
.k-head h2{font:600 13pt Inter;margin:0;color:#7a2e12}
.k-tick{margin:0;font:500 9pt Inter;color:#5b4232;display:flex;align-items:center;gap:6pt}
.box{display:inline-block;width:12pt;height:12pt;border:1.2pt solid #9a6b1f;border-radius:3pt}
.k-unit{padding:5pt 0 6pt}
.k-big{font-size:16pt!important;line-height:1.45}
`
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Hanuman Chalisa: 11-day learning sheet</title><style>${css}</style></head><body>
<header><p class="kicker">For families · 11 days</p><h1>Learn the Hanuman Chalisa, four lines a day</h1><p class="sub">Read the day's lines aloud together, slowly, twice. Then say them again before bed. Tick the box when everyone can say them without looking. By day 11 you will know all 43.</p><p class="note">${esc(EDITIONS.english.note)}</p></header>
<main>${blocks}</main>
<footer><p>Text: Goswami Tulsidas, Gita Press reading. Meanings: Wisdom's own words. The learn-by-heart mode on ${SITE}/learn keeps your place on your phone.</p></footer>
</body></html>`
}

const BUILDS = {
  english: () => ({ ...EDITIONS.english, html: textHtml('english') }),
  devanagari: () => ({ ...EDITIONS.devanagari, html: textHtml('devanagari') }),
  telugu: () => ({ ...EDITIONS.telugu, html: textHtml('telugu') }),
  gujarati: () => ({ ...EDITIONS.gujarati, html: textHtml('gujarati') }),
  kannada: () => ({ ...EDITIONS.kannada, html: textHtml('kannada') }),
  kids: () => ({
    file: 'hanuman-chalisa-kids-11-day-learning-sheet.pdf',
    title: 'Hanuman Chalisa for kids: an 11-day learning sheet',
    sub: 'Four lines a day in large English letters, with meanings and a box to tick.',
    lang: 'en',
    keywords: ['Hanuman Chalisa for kids', 'learn Hanuman Chalisa', 'Hanuman Chalisa printable'],
    html: kidsHtml(),
  }),
}

// ── Render ─────────────────────────────────────────────────────────────────

const { chromium } = await import('playwright')
const PDFLib = await import('pdf-lib')
await fs.mkdir(OUT_DIR, { recursive: true })
if (HTML_DIR) await fs.mkdir(HTML_DIR, { recursive: true })

const browser = await chromium.launch()
try {
  for (const [key, build] of Object.entries(BUILDS)) {
    if (ONLY && !ONLY.includes(key)) continue
    const ed = build()
    const tmp = path.join(OUT_DIR, `.${key}.html`)
    await fs.writeFile(tmp, ed.html)
    if (HTML_DIR) await fs.writeFile(path.join(HTML_DIR, `${key}.html`), ed.html)
    const page = await browser.newPage()
    await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    const pdf = await page.pdf({ format: 'Letter', printBackground: true, preferCSSPageSize: true, tagged: true })
    await page.close()
    await fs.rm(tmp)

    const out = await PDFLib.PDFDocument.load(pdf)
    out.setTitle(ed.title, { showInWindowTitleBar: true })
    out.setAuthor('Wisdom (wisdomquotes.in)')
    out.setSubject(ed.sub)
    out.setKeywords([...ed.keywords, ...COMMON_KEYWORDS])
    out.setCreator('wisdomquotes.in')
    out.setProducer('wisdomquotes.in')
    out.setLanguage(ed.lang === 'hi' ? 'hi' : 'en')
    const bytes = await out.save()
    await fs.writeFile(path.join(OUT_DIR, ed.file), bytes)
    console.log(`${ed.file}: ${out.getPageCount()} pages, ${(bytes.length / 1024).toFixed(0)} KB`)
  }
} finally {
  await browser.close()
}
