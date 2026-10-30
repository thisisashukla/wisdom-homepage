// Builds src/content/funnels/ram-shalaka/ram-shalaka.json and cards.json.
// Inputs: the approved prototype (ROWS grid + CH records), the Manas corpus (full chaupai units),
// and the hand-written extras.json / copy.json beside this script.
// Run from frontend/: node scripts/funnels/ram-shalaka/build-data.mjs
// The corpus Hindi meaning (Gita Press / Poddar) is never read into the output.
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import vm from 'node:vm'
import { fileURLToPath } from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const FE = path.resolve(HERE, '..', '..', '..')
const REPO = path.resolve(FE, '..')
const PROTO = path.join(REPO, 'lp', 'funnels', 'ram-shalaka', 'PROTOTYPE.html')
const CORPUS = process.env.MANAS_CORPUS || path.join(os.homedir(), 'mnt', 'sanscripts', 'wisdom_kb', 'out', 'verses.jsonl')
const OUT_DIR = path.join(FE, 'src', 'content', 'funnels', 'ram-shalaka')

const extras = JSON.parse(fs.readFileSync(path.join(HERE, 'extras.json'), 'utf8'))
const copy = JSON.parse(fs.readFileSync(path.join(HERE, 'copy.json'), 'utf8'))

/* ---------- prototype arrays */
const html = fs.readFileSync(PROTO, 'utf8')
function grab(name) {
  const start = html.indexOf(`var ${name}=[`)
  if (start < 0) throw new Error(`no ${name} in prototype`)
  let i = html.indexOf('[', start)
  let depth = 0
  let inStr = null
  for (let j = i; j < html.length; j++) {
    const c = html[j]
    if (inStr) {
      if (c === '\\') j++
      else if (c === inStr) inStr = null
      continue
    }
    if (c === '"' || c === "'") inStr = c
    else if (c === '[') depth++
    else if (c === ']') {
      depth--
      if (depth === 0) return vm.runInNewContext(`(${html.slice(i, j + 1)})`)
    }
  }
  throw new Error(`unterminated ${name}`)
}
const ROWS = grab('ROWS')
const CH = grab('CH')
const rows = ROWS.map((r) => r.split(' '))
if (rows.length !== 15 || rows.some((r) => r.length !== 15)) throw new Error('grid is not 15 x 15')

/* ---------- corpus units */
const wanted = new Set(CH.map((c) => c.id))
const corpus = new Map()
for (const line of fs.readFileSync(CORPUS, 'utf8').split('\n')) {
  if (!line.includes('"rcm.')) continue
  const m = line.match(/"id": "([^"]+)"/)
  if (!m || !wanted.has(m[1]) || corpus.has(m[1])) continue
  const d = JSON.parse(line)
  corpus.set(d.id, { sanskrit: d.sanskrit, iast: d.iast, ref: d.ref, speaker: d.speaker })
}
for (const id of wanted) if (!corpus.has(id)) throw new Error(`corpus missing ${id}`)

const key = (s) => s.normalize('NFC').replace(/[\s।॥|,.]/g, '')
function cleanIast(s) {
  return s
    .replace(/([aeiouāīū])~/g, '$1̃')
    .replace(/r̤/g, 'ṛ')
    .replace(/[,|]+\s*$/g, '')
    .trim()
    .normalize('NFC')
}
function splitUnit(rec) {
  const deva = rec.sanskrit.split(/[।॥]/).map((s) => s.trim()).filter(Boolean)
  const iast = rec.iast.split(/\|+/).map((s) => s.trim()).filter(Boolean)
  if (deva.length !== 4 || iast.length !== 4) throw new Error(`unit not 4 halves: ${rec.sanskrit}`)
  return { deva: deva.map((d, i) => `${d}${i % 2 ? '॥' : '।'}`), iast: iast.map(cleanIast) }
}

const variants = []
const lines = CH.map((c) => {
  const ex = extras.lines[String(c.k)]
  if (!ex) throw new Error(`no extras for k=${c.k}`)
  const rec = corpus.get(c.id)
  const unit = splitUnit(rec)
  const [kandHi, placeHi] = c.kand.hi.split(' · ')
  const [kandEn, placeEn] = c.kand.en.split(' · ')
  // Which pair of the corpus unit is the answer: match on the first word of each half.
  const first = (s) => key(s.split(' ')[0])
  let pos = -1
  for (const p of [0, 2]) {
    if (first(unit.deva[p]) === first(c.deva[0])) pos = p
  }
  if (pos < 0) throw new Error(`k=${c.k}: answer not found in unit ${c.id}`)
  for (let h = 0; h < 2; h++) {
    if (key(unit.deva[pos + h]) !== key(c.deva[h])) {
      variants.push({ k: c.k, id: c.id, grid: c.deva[h], corpus: unit.deva[pos + h] })
    }
  }
  const pairs = [0, 2].map((p) => {
    const answer = p === pos
    return {
      answer,
      // The answer pair uses the grid-verified reading; the other pair is the corpus text.
      deva: answer ? [...c.deva] : unit.deva.slice(p, p + 2),
      iast: answer ? c.iast.map(cleanIast) : unit.iast.slice(p, p + 2),
      meaning: answer ? { ...c.mean } : null,
    }
  })
  return {
    n: c.k + 1,
    k: c.k,
    slug: ex.slug,
    id: c.id,
    sign: c.sign,
    deva: [...c.deva],
    iast: c.iast.map(cleanIast),
    kand: { hi: kandHi, en: kandEn },
    place: { hi: placeHi, en: placeEn },
    who: { ...c.who },
    meaning: { ...c.mean },
    scene: { ...c.prasang },
    forYou: { ...c.you },
    signText: { ...c.signTxt },
    quick: { hi: ex.quick },
    unit: pairs,
    gita: ex.gita,
    cardMeaning: ex.card ?? { ...c.mean },
    _otherMeaning: ex.other ?? null,
    reviewed: false,
  }
})
// Fill the non-answer pair's meaning: our own wording from extras, or the sibling record that shares the unit.
for (const l of lines) {
  for (const pair of l.unit) {
    if (pair.meaning) continue
    const sib = lines.find((o) => o !== l && o.id === l.id && key(o.deva[0]) === key(pair.deva[0]))
    pair.meaning = sib ? { ...sib.meaning } : l._otherMeaning
    if (!pair.meaning) throw new Error(`k=${l.k}: no meaning for other pair`)
  }
}
for (const l of lines) delete l._otherMeaning

/* ---------- checks that keep the data honest */
const words = (s) => s.trim().split(/\s+/).length
for (const l of lines) {
  for (const lang of ['hi', 'en']) {
    if (words(l.cardMeaning[lang]) > 20) throw new Error(`k=${l.k} card meaning ${lang} > 20 words`)
  }
}
const slugs = new Set(lines.map((l) => l.slug))
if (slugs.size !== 9) throw new Error('slugs not unique')

const data = {
  _source: 'Generated by scripts/funnels/ram-shalaka/build-data.mjs from lp/funnels/ram-shalaka/PROTOTYPE.html, the Manas corpus (unit text only) and extras.json/copy.json. Do not hand-edit; edit the inputs and rerun.',
  updated: '2026-10-30',
  grid: rows,
  lines,
  signs: copy.signs,
  signNotes: copy.signNotes,
  ui: copy.ui,
  page: copy.page,
  line: copy.line,
}

const cards = lines.map((l) => ({
  id: `rs-${l.n}`,
  source: 'ramcharitmanas',
  sourceName: { en: `Ramcharitmanas, ${l.kand.en}`, hi: `श्रीरामचरितमानस, ${l.kand.hi}` },
  speaker: { ...l.who },
  sanskritLine: l.deva.join(' '),
  iast: l.iast.map((s) => s.replace(/,$/, '')).join(', '),
  meaning: { ...l.cardMeaning },
  reviewed: false,
}))

fs.mkdirSync(OUT_DIR, { recursive: true })
fs.writeFileSync(path.join(OUT_DIR, 'ram-shalaka.json'), JSON.stringify(data, null, 1) + '\n')
fs.writeFileSync(path.join(OUT_DIR, 'cards.json'), JSON.stringify(cards, null, 1) + '\n')
fs.writeFileSync(path.join(HERE, 'variants.json'), JSON.stringify(variants, null, 1) + '\n')
console.log(`wrote ${lines.length} lines, ${cards.length} cards; ${variants.length} grid/corpus spelling variants`)
for (const v of variants) console.log(`  k=${v.k} ${v.id}: grid "${v.grid}" corpus "${v.corpus}"`)
