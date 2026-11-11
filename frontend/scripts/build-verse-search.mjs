#!/usr/bin/env node
/**
 * Build the verse search index: public/data/verse-search.json
 *
 * Reads:
 *   src/content/gita/chapters.json, verses/{ch}-{vs}.json, hi-commentary/{ch}-{vs}.json (saar, when present)
 *   src/content/funnels/other-gitas/ashtavakra.json          (Ashtavakra Gita, 298 verses)
 *   src/content/funnels/hanuman-chalisa/chalisa.json         (43 lines)
 *   src/content/funnels/sayings/kabir.json                   (50 dohe)
 *   src/content/funnels/ram-shalaka/ram-shalaka.json         (9 chaupai)
 *   src/content/funnels/upanishads/lines.ts                  (famous Upanishad lines)
 *   public/data/gita-verse-search-2026.csv                   (most searched verses: rank and common spellings)
 *
 * Each item: id, k (source), u (url), hu (Hindi url, when a Hindi page exists), c, v,
 *   r / rh (reference in English / Hindi), s (first line, Devanagari),
 *   p (plain Roman of the whole verse), e / h (short English / Hindi meaning), t (tags),
 *   a (spellings people search with, most searched verses only), f (popularity, 1 to 42).
 *
 * Transliteration comes from src/lib/search/translit.ts (the same code the browser runs),
 * transpiled on the fly with the TypeScript compiler so this works on any Node version.
 * Gita verses go through the same clean-up as the verse pages first (src/lib/devanagari.ts:
 * normaliseDevanagari fixes conjuncts typed as "्ि", splitSpeaker drops "X उवाच"), so search
 * shows and matches the text the reader sees on the page.
 * Before writing, it checks the transliterator against six famous lines and stops on a mismatch.
 *
 * Run with: node scripts/build-verse-search.mjs
 */

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import zlib from 'node:zlib'
import crypto from 'node:crypto'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const SRC = path.join(ROOT, 'src')
const OUT = path.join(ROOT, 'public', 'data', 'verse-search.json')

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'))

/**
 * Transpile a .ts file (and the .ts files it imports through '@/...' or './...') to temp
 * .mjs files, and return the file URL to import.
 */
async function tsModuleUrl(file, done = new Map()) {
  if (done.has(file)) return done.get(file)
  const ts = (await import('typescript')).default
  let js = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
    fileName: file,
  }).outputText
  const specs = new Set([...js.matchAll(/from\s+['"]((?:@\/|\.\.?\/)[^'"]+)['"]/g)].map((m) => m[1]))
  for (const spec of specs) {
    const base = spec.startsWith('@/') ? path.join(SRC, spec.slice(2)) : path.resolve(path.dirname(file), spec)
    const target = [`${base}.ts`, path.join(base, 'index.ts')].find((f) => fs.existsSync(f))
    if (!target) throw new Error(`verse-search: cannot resolve ${spec} from ${path.relative(ROOT, file)}`)
    const url = await tsModuleUrl(target, done)
    js = js.split(`'${spec}'`).join(`'${url}'`).split(`"${spec}"`).join(`"${url}"`)
  }
  const hash = crypto.createHash('sha1').update(js).digest('hex').slice(0, 10)
  const tmp = path.join(os.tmpdir(), `wisdom-vs-${path.basename(file, '.ts')}-${hash}.mjs`)
  fs.writeFileSync(tmp, js)
  const url = pathToFileURL(tmp).href
  done.set(file, url)
  return url
}

const importTs = async (file) => import(await tsModuleUrl(file))

const { transliterate } = await importTs(path.join(SRC, 'lib', 'search', 'translit.ts'))
const { normaliseDevanagari, splitSpeaker } = await importTs(path.join(SRC, 'lib', 'devanagari.ts'))

// ── Transliterator checks ────────────────────────────────────────────────────

const CHECKS = [
  { deva: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन', mode: 'sa', plain: 'karmanyevadhikaraste ma phaleshu kadachana', iast: 'karmaṇyevādhikāraste mā phaleṣu kadācana' },
  { deva: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत', mode: 'sa', plain: 'yada yada hi dharmasya glanirbhavati bharata' },
  { deva: 'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः', mode: 'sa', plain: 'dharmakshetre kurukshetre samaveta yuyutsavah' },
  { deva: 'असतो मा सद्गमय । तमसो मा ज्योतिर्गमय', mode: 'sa', plain: 'asato ma sadgamaya tamaso ma jyotirgamaya' },
  { deva: 'प्रबिसि नगर कीजे सब काजा।', mode: 'hi', plain: 'prabisi nagar kije sab kaja' },
  { deva: 'पोथी पढ़ि पढ़ि जग मुआ, पंडित भया न कोय।', mode: 'hi', plain: 'pothi padhi padhi jag mua pandit bhaya na koy' },
]

let failed = 0
console.log('verse-search: transliterator checks')
for (const c of CHECKS) {
  const out = transliterate(c.deva, c.mode)
  const okPlain = out.plain === c.plain
  const okIast = !c.iast || out.iast === c.iast
  if (!okPlain || !okIast) failed++
  console.log(`  ${okPlain && okIast ? 'PASS' : 'FAIL'}  ${c.deva}`)
  console.log(`        plain: ${out.plain}${okPlain ? '' : `   (expected: ${c.plain})`}`)
  if (c.iast) console.log(`        iast:  ${out.iast}${okIast ? '' : `   (expected: ${c.iast})`}`)
}
if (failed) {
  console.error(`verse-search: ${failed} transliterator check(s) failed; index not written`)
  process.exit(1)
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Cut at a word boundary, adding ... when cut. */
function clip(s, max) {
  const t = String(s ?? '').replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  return `${t.slice(0, max).replace(/[\s,;:.।]+\S*$/, '')}...`
}

/** The verse as the page shows it: conjuncts fixed, the "X उवाच" speaker line dropped. */
const verseText = (sa) => splitSpeaker(normaliseDevanagari(sa || '')).text

const firstLine = (sa) => sa.split(/[।॥|]/)[0].replace(/[,\s]+$/, '').trim()

const plainOf = (deva, mode) => transliterate(deva, mode).plain

const items = []

// ── Bhagavad Gita ────────────────────────────────────────────────────────────

const chapters = readJson(path.join(SRC, 'content', 'gita', 'chapters.json'))
const gitaCounts = []
for (const ch of chapters) {
  gitaCounts.push(ch.verses.length ? Math.max(...ch.verses) : 0)
  for (const vs of ch.verses) {
    const v = readJson(path.join(SRC, 'content', 'gita', 'verses', `${ch.number}-${vs}.json`))
    const hiFile = path.join(SRC, 'content', 'gita', 'hi-commentary', `${ch.number}-${vs}.json`)
    const saar = fs.existsSync(hiFile) ? readJson(hiFile).saar : ''
    const sa = verseText(v.sanskrit)
    items.push({
      id: `bg-${ch.number}-${vs}`,
      k: 'bg',
      u: `/gita/chapter/${ch.number}/verse/${vs}`,
      hu: `/hi/gita/chapter/${ch.number}/verse/${vs}`,
      c: ch.number,
      v: vs,
      r: `Bhagavad Gita ${ch.number}.${vs}`,
      rh: `भगवद गीता ${ch.number}.${vs}`,
      s: firstLine(sa),
      p: plainOf(sa, 'sa'),
      e: clip(v.englishTranslation || v.simpleMeaning, 150),
      h: clip(saar || normaliseDevanagari(v.hindiTranslation || ''), 90),
      t: (v.tags || []).join(' '),
    })
  }
}

// Most searched verses (Google Trends study, Oct 2026): popularity and the spellings people use.
const CSV = path.join(ROOT, 'public', 'data', 'gita-verse-search-2026.csv')
if (fs.existsSync(CSV)) {
  const rows = fs.readFileSync(CSV, 'utf8').replace(/^\uFEFF/, '').trim().split(/\r?\n/).slice(1)
  const byId = new Map(items.map((it) => [it.id, it]))
  for (const row of rows) {
    const cells = [...row.matchAll(/("([^"]*(?:""[^"]*)*)"|[^,]*)(,|$)/g)].map((m) => (m[2] ?? m[1]).replace(/""/g, '"'))
    const [rank, , ch, vs, line, , , terms] = cells
    const it = byId.get(`bg-${Number(ch)}-${Number(vs)}`)
    if (!it) continue
    it.f = Math.max(1, 43 - Number(rank))
    const latin = [line, ...String(terms).split('+')]
      .flatMap((x) => String(x).split('/'))
      .map((x) => x.replace(/[’']/g, '').trim().toLowerCase())
      .filter((x) => x && !/[\u0900-\u097F]/.test(x))
    it.a = [...new Set(latin)].join(' | ')
  }
}

// ── Ashtavakra Gita ──────────────────────────────────────────────────────────

const ag = readJson(path.join(SRC, 'content', 'funnels', 'other-gitas', 'ashtavakra.json'))
const agCounts = ag.chapters.map((c) => c.count)
for (const x of ag.verses) {
  items.push({
    id: `ag-${x.c}-${x.v}`,
    k: 'ag',
    u: `/ashtavakra-gita/chapter/${x.c}/verse/${x.v}`,
    c: x.c,
    v: x.v,
    r: `Ashtavakra Gita ${x.c}.${x.v}`,
    rh: `अष्टावक्र गीता ${x.c}.${x.v}`,
    s: firstLine(x.sa),
    p: plainOf(x.sa, 'sa'),
    e: clip(x.en, 150),
    t: 'ashtavakra-gita',
  })
}

// ── Hanuman Chalisa ──────────────────────────────────────────────────────────

const hc = readJson(path.join(SRC, 'content', 'funnels', 'hanuman-chalisa', 'chalisa.json'))
for (const u of hc.units) {
  const deva = u.awadhi.join(' ')
  items.push({
    id: u.id.replace('.', '-'),
    k: 'hc',
    u: `/hanuman-chalisa/${u.slug}`,
    hu: `/hi/hanuman-chalisa#${u.id.replace('.', '-')}`,
    c: u.n,
    r: `Hanuman Chalisa, ${u.label.en}`,
    rh: `हनुमान चालीसा, ${u.label.hi}`,
    s: firstLine(u.awadhi[0]),
    p: plainOf(deva, 'hi'),
    e: clip(u.meaning?.en, 150),
    h: clip(u.meaning?.hi, 90),
    t: `hanuman-chalisa ${u.kind}`,
  })
}

// ── Kabir ────────────────────────────────────────────────────────────────────

const kabir = readJson(path.join(SRC, 'content', 'funnels', 'sayings', 'kabir.json'))
for (const d of kabir.dohe) {
  const url = `/hi/kabir-ke-dohe/${d.slug}`
  items.push({
    id: d.id,
    k: 'kb',
    u: url,
    hu: url,
    r: 'Kabir, doha',
    rh: 'कबीर का दोहा',
    s: firstLine(d.lines[0]),
    p: plainOf(d.lines.join(' '), 'hi'),
    e: clip(d.meaning?.en, 150),
    h: clip(d.meaning?.hi, 90),
    t: `kabir ${d.theme}`,
  })
}

// ── Shri Ram Shalaka (Ramcharitmanas chaupai) ────────────────────────────────

const rs = readJson(path.join(SRC, 'content', 'funnels', 'ram-shalaka', 'ram-shalaka.json'))
for (const l of rs.lines) {
  const url = `/hi/ram-shalaka/${l.slug}`
  items.push({
    id: `rs-${l.slug}`,
    k: 'rs',
    u: url,
    hu: url,
    r: `Ramcharitmanas, ${l.kand.en}`,
    rh: `रामचरितमानस, ${l.kand.hi}`,
    s: firstLine(l.deva[0]),
    p: plainOf(l.deva.join(' '), 'hi'),
    e: clip(l.meaning?.en, 150),
    h: clip(l.meaning?.hi, 90),
    t: 'ramcharitmanas chaupai ram-shalaka',
  })
}

// ── Upanishads (famous lines) ────────────────────────────────────────────────

const up = await importTs(path.join(SRC, 'content', 'funnels', 'upanishads', 'lines.ts'))
for (const l of up.LINES) {
  items.push({
    id: `up-${l.slug}`,
    k: 'up',
    u: `/upanishads/${l.slug}`,
    ...(l.hi ? { hu: `/hi/upanishads/${l.slug}` } : {}),
    r: l.ref,
    rh: l.ref,
    s: firstLine(l.sa),
    p: plainOf(l.sa, 'sa'),
    e: clip(l.meaning, 150),
    ...(l.hi?.meaning ? { h: clip(l.hi.meaning, 90) } : {}),
    t: 'upanishads',
  })
}

// ── Write ────────────────────────────────────────────────────────────────────

// Drop empty fields to keep the file small.
for (const it of items) for (const key of Object.keys(it)) if (it[key] === '' || it[key] == null) delete it[key]

const doc = {
  v: 1,
  built: new Date().toISOString().slice(0, 10),
  counts: { bg: gitaCounts, ag: agCounts },
  items,
}

// The browser checks typed verse numbers against src/lib/search/refs.ts; keep it in step.
const refsSrc = fs.readFileSync(path.join(SRC, 'lib', 'search', 'refs.ts'), 'utf8')
for (const [name, counts] of [['BG_COUNTS', gitaCounts], ['AG_COUNTS', agCounts]]) {
  const m = refsSrc.match(new RegExp(`${name} = \\[([^\\]]*)\\]`))
  const listed = m ? m[1].split(',').map((x) => Number(x.trim())) : []
  if (listed.join(',') !== counts.join(',')) {
    console.warn(`verse-search: ${name} in src/lib/search/refs.ts is out of date; content has [${counts.join(', ')}]`)
  }
}

const json = JSON.stringify(doc)
fs.mkdirSync(path.dirname(OUT), { recursive: true })
fs.writeFileSync(OUT, json)

const gz = zlib.gzipSync(json, { level: 9 }).length
const bySource = items.reduce((m, it) => ((m[it.k] = (m[it.k] || 0) + 1), m), {})
console.log(
  `verse-search: ${items.length} items (${Object.entries(bySource).map(([k, n]) => `${k} ${n}`).join(', ')})`,
)
console.log(`verse-search: wrote ${path.relative(ROOT, OUT)}  ${(Buffer.byteLength(json) / 1024).toFixed(0)} KB raw, ${(gz / 1024).toFixed(0)} KB gzip`)
if (gz > 300 * 1024) console.warn('verse-search: gzip size is over 300 KB; trim snippet lengths')
