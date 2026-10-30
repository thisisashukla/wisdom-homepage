/**
 * Share-image renderer for quote cards (/api/quote-card/[id]).
 *
 * Why not next/og: the satori bundled inside Next 14 (0.10.x) has no OpenType
 * shaping for Devanagari, so conjuncts and reph (र्म, ण्ये, ष्ठ) come out as
 * broken halant forms. satori >= 0.6x shapes text with HarfBuzz (wasm, inlined
 * in the package), which renders Sanskrit correctly. We use that satori for
 * layout and glyph outlines, then rasterise its SVG (paths only, no text) with
 * @resvg/resvg-wasm. Both are pure JS/wasm: no native binary, so the same code
 * runs on macOS dev machines and Vercel's Linux functions.
 *
 * Line breaking and font sizing are computed here, from widths measured with
 * the same shaper (satori's onNodeDetected), and lines are rendered nowrap.
 * Breaks only happen at spaces; a danda always stays with the word before it.
 */
import fs from 'node:fs'
import path from 'node:path'
import satori from 'satori'
import { Resvg, initWasm } from '@resvg/resvg-wasm'

export type CardFormat = 'post' | 'status' | 'square'
export type CardLang = 'en' | 'hi'
export type CardTheme = 'paper' | 'night'
type L10n = { en: string; hi: string }

export type CardQuote = {
  id: string
  source: string
  sourceName: L10n
  chapter?: number
  verse?: number
  speaker?: L10n
  sanskritLine: string
  iast: string
  meaning: L10n
}

const ROOT = process.cwd()
const QUOTES_DIR = path.join(ROOT, 'src', 'content', 'quotes')
const GITA_DIR = path.join(ROOT, 'src', 'content', 'gita', 'verses')
const FUNNELS_DIR = path.join(ROOT, 'src', 'content', 'funnels')
const FONT_DIR = path.join(ROOT, 'src', 'app', 'api', 'quote-card', 'fonts')
const WASM_CANDIDATES = [
  path.join(ROOT, 'node_modules', '@resvg', 'resvg-wasm', 'index_bg.wasm'),
  path.join(ROOT, '..', 'node_modules', '@resvg', 'resvg-wasm', 'index_bg.wasm'),
]
const IS_PROD = process.env.NODE_ENV === 'production'

/* ------------------------------------------------------------------ data */

const SPEAKERS: Record<string, L10n> = {
  Krishna: { en: 'Krishna to Arjuna', hi: 'श्रीकृष्ण, अर्जुन से' },
  Arjuna: { en: 'Arjuna to Krishna', hi: 'अर्जुन, श्रीकृष्ण से' },
  Sanjaya: { en: 'Sanjaya to Dhritarashtra', hi: 'संजय, धृतराष्ट्र से' },
  Dhritarashtra: { en: 'Dhritarashtra to Sanjaya', hi: 'धृतराष्ट्र, संजय से' },
  Duryodhana: { en: 'Duryodhana to Drona', hi: 'दुर्योधन, द्रोणाचार्य से' },
}

function str(v: unknown): string {
  return typeof v === 'string' ? v : ''
}
function l10n(v: unknown): L10n | undefined {
  if (!v || typeof v !== 'object') return undefined
  const o = v as Record<string, unknown>
  const en = str(o.en).trim()
  const hi = str(o.hi).trim()
  if (!en && !hi) return undefined
  return { en: en || hi, hi: hi || en }
}

function normaliseQuote(raw: unknown): CardQuote | null {
  if (!raw || typeof raw !== 'object') return null
  const q = raw as Record<string, unknown>
  const id = str(q.id)
  const sanskritLine = str(q.sanskritLine).trim() || str(q.sanskritFull).trim()
  const meaning = l10n(q.meaning)
  if (!id || !sanskritLine || !meaning) return null
  const chapter = typeof q.chapter === 'number' ? q.chapter : undefined
  const verse = typeof q.verse === 'number' ? q.verse : undefined
  const source = str(q.source) || 'other'
  const sourceName =
    l10n(q.sourceName) ??
    (source === 'gita' && chapter && verse
      ? { en: `Bhagavad Gita ${chapter}.${verse}`, hi: `भगवद गीता ${chapter}.${verse}` }
      : { en: 'Sanskrit shlok', hi: 'संस्कृत श्लोक' })
  return {
    id,
    source,
    sourceName,
    chapter,
    verse,
    speaker: l10n(q.speaker),
    sanskritLine,
    iast: str(q.iast).trim() || toIast(sanskritLine),
    meaning,
  }
}

let quoteCache: Map<string, CardQuote> | null = null
function loadQuotes(): Map<string, CardQuote> {
  if (quoteCache && IS_PROD) return quoteCache
  const map = new Map<string, CardQuote>()
  // Funnel share cards: src/content/funnels/<funnel>/cards.json (same shape as sayings.json items).
  const files = ['verses.json', 'sayings.json'].map((f) => path.join(QUOTES_DIR, f))
  try {
    for (const d of fs.readdirSync(FUNNELS_DIR, { withFileTypes: true })) {
      if (d.isDirectory()) files.push(path.join(FUNNELS_DIR, d.name, 'cards.json'))
    }
  } catch {
    // no funnels dir yet
  }
  for (const file of files) {
    try {
      const arr = JSON.parse(fs.readFileSync(file, 'utf8'))
      if (!Array.isArray(arr)) continue
      for (const raw of arr) {
        const q = normaliseQuote(raw)
        if (q && !map.has(q.id)) map.set(q.id, q)
      }
    } catch {
      // file missing or mid-write: fall through to the Gita fallback
    }
  }
  quoteCache = map
  return map
}

function firstSentenceEn(text: string): string {
  const s = text.replace(/\s+/g, ' ').trim()
  const parts = s.match(/[^.!?;]+[.!?;]+(\s|$)|[^.!?;]+$/g) ?? [s]
  let out = parts[0].trim()
  if (out.length < 40 && parts[1]) out = `${out} ${parts[1].trim()}`
  return out.replace(/;$/, '.')
}

function firstSentenceHi(text: string): string {
  const s = text.replace(/\s+/g, ' ').trim()
  const first = s.split(/[।॥]/)[0]?.trim() ?? s
  return first ? `${first}।` : s
}

/** House style for generated text: no dashes, no exclamation marks. */
function tidy(t: string): string {
  return t
    .replace(/\s*[\u2013\u2014]\s*/g, ', ')
    .replace(/\s*!\s*(?=\S)/g, ', ')
    .replace(/\s*!\s*$/g, '.')
    .replace(/\s+([,.।])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function gitaFallback(chapter: number, verse: number, id: string): CardQuote | null {
  const file = path.join(GITA_DIR, `${chapter}-${verse}.json`)
  let d: Record<string, unknown>
  try {
    d = JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return null
  }
  // Source files prefix some verses with the speaker tag ("अर्जुन उवाच", "श्री भगवानुवाच").
  const sanskrit = str(d.sanskrit)
    .trim()
    .replace(/^[^।॥]{0,24}?(उवाच|ानुवाच)\s*/, '')
    .trim()
  if (!sanskrit) return null
  const halves = sanskrit
    .split(/[।॥|]/)
    .map((x) => x.trim())
    .filter((x) => x && !/^[०-९0-9\s.]+$/.test(x))
  const line = halves[0] || sanskrit
  const en = tidy(firstSentenceEn(str(d.englishTranslation).replace(/^[A-Z][A-Za-z ]{1,30}? said:\s*/, '') || str(d.essence)))
  const hi = tidy(firstSentenceHi(str(d.hindiTranslation).replace(/^[^।]{0,30}?बोले\s*/, ''))) || en
  return {
    id,
    source: 'gita',
    sourceName: { en: `Bhagavad Gita ${chapter}.${verse}`, hi: `भगवद गीता ${chapter}.${verse}` },
    chapter,
    verse,
    speaker: SPEAKERS[str(d.speaker)],
    sanskritLine: line,
    iast: toIast(line),
    meaning: { en, hi },
  }
}

/** Look up a quote by id. Returns null for unknown ids. */
export function resolveQuote(rawId: string): CardQuote | null {
  const id = decodeURIComponent(rawId).replace(/\.png$/i, '').trim()
  const hit = loadQuotes().get(id)
  if (hit) return hit
  const m = id.match(/^bg-(\d{1,2})-(\d{1,2})$/)
  if (m) return gitaFallback(Number(m[1]), Number(m[2]), id)
  return null
}

export function cardFilename(q: CardQuote): string {
  if (q.source === 'gita' && q.chapter && q.verse) {
    const who = /krishna/i.test(q.speaker?.en ?? '') ? 'krishna-quote-' : ''
    return `${who}bhagavad-gita-${q.chapter}-${q.verse}.png`
  }
  const slug = q.id.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return `sanskrit-shlok-${slug}.png`
}

/* ------------------------------------------------------- transliteration */

const CONS: Record<string, string> = {
  क: 'k', ख: 'kh', ग: 'g', घ: 'gh', ङ: 'ṅ', च: 'c', छ: 'ch', ज: 'j', झ: 'jh', ञ: 'ñ',
  ट: 'ṭ', ठ: 'ṭh', ड: 'ḍ', ढ: 'ḍh', ण: 'ṇ', त: 't', थ: 'th', द: 'd', ध: 'dh', न: 'n',
  प: 'p', फ: 'ph', ब: 'b', भ: 'bh', म: 'm', य: 'y', र: 'r', ल: 'l', ळ: 'ḷ', व: 'v',
  श: 'ś', ष: 'ṣ', स: 's', ह: 'h',
}
const VOWELS: Record<string, string> = {
  अ: 'a', आ: 'ā', इ: 'i', ई: 'ī', उ: 'u', ऊ: 'ū', ऋ: 'ṛ', ॠ: 'ṝ', ऌ: 'ḷ', ॡ: 'ḹ',
  ए: 'e', ऐ: 'ai', ओ: 'o', औ: 'au', ऍ: 'e', ऑ: 'o',
}
const MATRAS: Record<string, string> = {
  'ा': 'ā', 'ि': 'i', 'ी': 'ī', 'ु': 'u', 'ू': 'ū', 'ृ': 'ṛ', 'ॄ': 'ṝ', 'ॢ': 'ḷ', 'ॣ': 'ḹ',
  'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ॅ': 'e', 'ॉ': 'o',
}
const MISC: Record<string, string> = {
  'ं': 'ṃ', 'ः': 'ḥ', 'ँ': 'm̐', 'ऽ': '’', 'ॐ': 'oṃ', '।': ' ', '॥': ' ',
}
const VIRAMA = '्'
const NUKTA = '़'

/** Devanagari to IAST (used only when a quote has no hand-written IAST). */
export function toIast(text: string): string {
  const cs = Array.from(text.normalize('NFC'))
  let out = ''
  for (let i = 0; i < cs.length; ) {
    const c = cs[i]
    if (CONS[c]) {
      out += CONS[c]
      let j = i + 1
      if (cs[j] === NUKTA) j++
      const next = cs[j]
      if (next && MATRAS[next]) {
        out += MATRAS[next]
        i = j + 1
      } else if (next === VIRAMA) {
        i = j + 1
      } else {
        out += 'a'
        i = j
      }
      continue
    }
    if (VOWELS[c]) out += VOWELS[c]
    else if (MISC[c] !== undefined) out += MISC[c]
    else if (c >= '०' && c <= '९') out += String(c.charCodeAt(0) - 0x966)
    else if (c !== NUKTA && c !== VIRAMA) out += c
    i++
  }
  return out.replace(/[0-9]+/g, '').replace(/\s+/g, ' ').trim()
}

/* ----------------------------------------------------------------- fonts */

type FontEntry = { name: string; data: Buffer; weight: 400 | 500 | 600; style: 'normal' | 'italic' }
let fontCache: FontEntry[] | null = null
function loadFonts(): FontEntry[] {
  if (fontCache) return fontCache
  const f = (file: string) => fs.readFileSync(path.join(FONT_DIR, file))
  fontCache = [
    { name: 'Sanskrit', data: f('TiroDevanagariSanskrit-Regular.ttf'), weight: 400, style: 'normal' },
    { name: 'Hindi', data: f('TiroDevanagariHindi-Regular.ttf'), weight: 400, style: 'normal' },
    { name: 'Serif', data: f('CormorantGaramond-Medium.ttf'), weight: 500, style: 'normal' },
    { name: 'Serif', data: f('CormorantGaramond-SemiBold.ttf'), weight: 600, style: 'normal' },
    { name: 'Serif', data: f('CormorantGaramond-MediumItalic.ttf'), weight: 500, style: 'italic' },
    { name: 'DevaFallback', data: f('NotoSerifDevanagari-Regular.ttf'), weight: 400, style: 'normal' },
  ]
  return fontCache
}

let wasmReady: Promise<void> | null = null
function ensureWasm(): Promise<void> {
  if (!wasmReady) {
    const file = WASM_CANDIDATES.find((p) => fs.existsSync(p))
    if (!file) throw new Error('resvg wasm not found')
    wasmReady = initWasm(fs.readFileSync(file)).catch((e: unknown) => {
      if (String(e).includes('Already initialized')) return
      wasmReady = null
      throw e
    })
  }
  return wasmReady
}

/* --------------------------------------------------------------- element */

type El = { type: string; key: string | null; props: Record<string, unknown> }
type Style = Record<string, string | number>
function h(type: string, props: (Record<string, unknown> & { key?: string }) | null, ...children: unknown[]): El {
  const { key, ...rest } = props ?? {}
  const kids = children.flat().filter((c) => c !== null && c !== undefined && c !== false)
  return {
    type,
    key: key ?? null,
    props: { ...rest, children: kids.length === 0 ? undefined : kids.length === 1 ? kids[0] : kids },
  }
}

type SatoriEl = Parameters<typeof satori>[0]

/* ----------------------------------------------------------- measurement */

type FontSpec = { family: string; weight: 400 | 500 | 600; style: 'normal' | 'italic'; tracking?: number }
const MEASURE_SIZE = 100
const widthCache = new Map<string, number>()
const specKey = (s: FontSpec) => `${s.family}|${s.weight}|${s.style}|${s.tracking ?? 0}`

/** Widths (at MEASURE_SIZE px) of each text, shaped by HarfBuzz via satori. */
async function measure(spec: FontSpec, texts: string[]): Promise<Map<string, number>> {
  const sk = specKey(spec)
  const missing = Array.from(new Set(texts)).filter((t) => !widthCache.has(`${sk}|${t}`))
  if (missing.length) {
    const found = new Map<string, number>()
    const rows = missing.map((t, i) =>
      h(
        'div',
        {
          key: `m${i}`,
          style: {
            display: 'flex',
            fontFamily: `${spec.family}, DevaFallback`,
            fontWeight: spec.weight,
            fontStyle: spec.style,
            fontSize: MEASURE_SIZE,
            letterSpacing: (spec.tracking ?? 0) * MEASURE_SIZE,
            whiteSpace: 'pre',
            lineHeight: 1.2,
          },
        },
        t,
      ),
    )
    await satori(
      h('div', { style: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 6000 } }, rows) as unknown as SatoriEl,
      {
        width: 6000,
        height: missing.length * 130 + 20,
        fonts: loadFonts(),
        onNodeDetected: (node) => {
          const k = node.key
          if (typeof k === 'string' && /^m\d+$/.test(k)) found.set(k, node.width)
        },
      },
    )
    missing.forEach((t, i) => widthCache.set(`${sk}|${t}`, found.get(`m${i}`) ?? t.length * MEASURE_SIZE * 0.6))
  }
  const out = new Map<string, number>()
  for (const t of texts) out.set(t, widthCache.get(`${sk}|${t}`) ?? 0)
  return out
}

/** Split into break units: words, with dandas and verse numbers glued to the word before. */
function tokens(text: string): string[] {
  const raw = text.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean)
  const out: string[] = []
  for (const t of raw) {
    if (out.length && /^[।॥|.,;:!?’'"”)\]०-९0-9]+$/.test(t)) out[out.length - 1] += `\u00a0${t}`
    else out.push(t)
  }
  return out
}

type Measured = { words: string[]; widths: number[]; space: number; breakAfter: RegExp }
const DANDA_END = /[।॥|]$/
async function measureText(spec: FontSpec, text: string, breakAfter = DANDA_END): Promise<Measured> {
  const words = tokens(text)
  const m = await measure(spec, [...words, '\u00a0'])
  return { words, widths: words.map((w) => m.get(w) ?? 0), space: m.get('\u00a0') ?? MEASURE_SIZE * 0.25, breakAfter }
}

/**
 * Best split of words into exactly k lines: minimise the widest line, then
 * prefer evenly filled lines (centred verse reads best when lines are close
 * in length, with the longer line first).
 */
type Fit = { lines: string[]; max: number; cuts: number[]; inner?: number }
function balance(m: Measured, k: number, scale: number, maxWidth = Infinity): Fit | null {
  const n = m.words.length
  if (k > n || k < 1) return null
  const lw = (a: number, b: number) => {
    let s = 0
    for (let i = a; i < b; i++) s += m.widths[i]
    return (s + (b - a - 1) * m.space) * scale
  }
  // A verse reads best when its lines end at dandas (half-verse breaks), so a
  // danda left inside a line costs more than any amount of unevenness.
  const isDanda = m.words.map((w) => m.breakAfter.test(w))
  let best: { cuts: number[]; max: number; score: number; inner: number } | null = null
  const walk = (start: number, left: number, cuts: number[]) => {
    if (left === 1) {
      const all = [...cuts, n]
      let prev = 0
      const ws: number[] = []
      for (const c of all) {
        ws.push(lw(prev, c))
        prev = c
      }
      const max = Math.max(...ws)
      const mean = ws.reduce((a, b) => a + b, 0) / ws.length
      let score = ws.reduce((a, w) => a + (w - mean) ** 2, 0)
      const ends = new Set(all.map((c) => c - 1))
      const inner = isDanda.filter((d, i) => d && !ends.has(i)).length
      if (max <= maxWidth) score += inner * 1e9
      else score += 1e12
      // light preference for a shorter last line rather than a shorter first line
      if (ws.length > 1 && ws[ws.length - 1] > ws[0]) score += (ws[ws.length - 1] - ws[0]) ** 2 * 0.25
      const fits = max <= maxWidth
      const bestFits = best ? best.max <= maxWidth : false
      const better = !best
        ? true
        : fits && bestFits && maxWidth !== Infinity
          ? score < best.score
          : max < best.max - 0.5 || (Math.abs(max - best.max) <= 0.5 && score < best.score)
      if (better) {
        best = { cuts: all, max, score, inner }
      }
      return
    }
    for (let c = start + 1; c <= n - left + 1; c++) walk(c, left - 1, [...cuts, c])
  }
  walk(0, k, [])
  if (!best) return null
  const b = best as { cuts: number[]; max: number; inner: number }
  const lines: string[] = []
  let prev = 0
  for (const c of b.cuts) {
    lines.push(m.words.slice(prev, c).join(' '))
    prev = c
  }
  return { lines, max: b.max, cuts: b.cuts, inner: b.inner }
}

/** Use given cut points (e.g. the Sanskrit line breaks for its IAST) if every line fits. */
function withCuts(m: Measured, cuts: number[], size: number, maxWidth: number): Fit | null {
  if (cuts[cuts.length - 1] !== m.words.length) return null
  const scale = size / MEASURE_SIZE
  const lines: string[] = []
  let prev = 0
  let max = 0
  for (const c of cuts) {
    if (c <= prev) return null
    let w = 0
    for (let i = prev; i < c; i++) w += m.widths[i]
    w = (w + (c - prev - 1) * m.space) * scale
    max = Math.max(max, w)
    lines.push(m.words.slice(prev, c).join(' '))
    prev = c
  }
  return max <= maxWidth ? { lines, max, cuts } : null
}

/** Fewest lines (at least minLines, at most maxLines) that fit maxWidth at this size. */
function fit(
  m: Measured,
  size: number,
  maxWidth: number,
  minLines: number,
  maxLines: number,
  strictBreaks = false,
): Fit | null {
  const scale = size / MEASURE_SIZE
  const lo = Math.min(Math.max(1, minLines), m.words.length)
  // Verse text with an inner danda: break each half-verse (danda-delimited segment)
  // on its own into the same number of lines, so the verse keeps its shape: two
  // halves on two lines, or each half over two lines, never a danda mid-line.
  if (strictBreaks && m.words.slice(0, -1).some((w) => m.breakAfter.test(w))) {
    const segs: [number, number][] = []
    let start = 0
    m.words.forEach((w, i) => {
      if (m.breakAfter.test(w) || i === m.words.length - 1) {
        segs.push([start, i + 1])
        start = i + 1
      }
    })
    for (let r = 1; r * segs.length <= maxLines + segs.length; r++) {
      const lines: string[] = []
      const cuts: number[] = []
      let max = 0
      let ok = true
      for (const [a, b] of segs) {
        const sub: Measured = { ...m, words: m.words.slice(a, b), widths: m.widths.slice(a, b) }
        const part = balance(sub, Math.min(r, b - a), scale, maxWidth)
        if (!part || part.max > maxWidth) {
          ok = false
          break
        }
        lines.push(...part.lines)
        cuts.push(...part.cuts.map((c) => c + a))
        max = Math.max(max, part.max)
      }
      if (ok && lines.length >= lo && lines.length <= maxLines) return { lines, max, cuts, inner: 0 }
      if (ok && lines.length > maxLines) break
    }
  }
  for (let k = lo; k <= Math.min(maxLines, m.words.length); k++) {
    const r = balance(m, k, scale, maxWidth)
    if (r && r.max <= maxWidth) return r
  }
  return null
}

/* ---------------------------------------------------------------- layout */

type FormatSpec = {
  w: number
  h: number
  top: number // first text baseline zone starts here
  bottom: number // last text must end above h - bottom
  x: number
  skMax: number
  skMin: number
  iast: number
  meaning: { en: number; hi: number }
  head: number
  mark: number
}

const FORMATS: Record<CardFormat, FormatSpec> = {
  post: { w: 1080, h: 1350, top: 112, bottom: 100, x: 112, skMax: 104, skMin: 52, iast: 32, meaning: { en: 44, hi: 38 }, head: 22, mark: 24 },
  square: { w: 1080, h: 1080, top: 86, bottom: 76, x: 108, skMax: 92, skMin: 46, iast: 28, meaning: { en: 39, hi: 34 }, head: 20, mark: 22 },
  // WhatsApp / Instagram status: top ~250 px and bottom ~300 px stay clear of text.
  status: { w: 1080, h: 1920, top: 262, bottom: 312, x: 108, skMax: 112, skMin: 56, iast: 34, meaning: { en: 48, hi: 42 }, head: 24, mark: 26 },
}

type Palette = {
  bg: string
  ink: string // Sanskrit
  body: string // meaning
  quiet: string // IAST, watermark
  gold: string // the one accent: source line, fleuron, speaker
  ornament: string
}
const PALETTES: Record<CardTheme, Palette> = {
  paper: {
    bg: '#f5e8cc',
    ink: '#1a0606',
    body: '#2e0f0a',
    quiet: 'rgba(46,15,10,0.58)',
    gold: '#8a560c',
    ornament: '#b87a1a',
  },
  night: {
    bg: '#1a0606',
    ink: '#f5e8cc',
    body: 'rgba(245,232,204,0.9)',
    quiet: 'rgba(245,232,204,0.56)',
    gold: '#c8881e',
    ornament: '#c8881e',
  },
}

const SK_LH = 1.66
const IAST_LH = 1.4
const MEAN_LH = { en: 1.36, hi: 1.62 }

function lotusSvg(color: string, w: number): string {
  // Thin-line lotus fleuron with two hairlines, drawn on a 240 x 60 grid.
  const hgt = Math.round((w * 60) / 240)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${hgt}" viewBox="0 0 240 60" fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
<path d="M120 6 C129 18 129 36 120 48 C111 36 111 18 120 6 Z"/>
<path d="M120 48 C130 42 140 30 143 18 C133 22 124 32 120 48 Z"/>
<path d="M120 48 C110 42 100 30 97 18 C107 22 116 32 120 48 Z"/>
<path d="M120 48 C134 49 150 43 160 32 C147 32 131 38 120 48 Z"/>
<path d="M120 48 C106 49 90 43 80 32 C93 32 109 38 120 48 Z"/>
<path d="M104 53 Q120 57 136 53"/>
<path d="M14 40 H66" stroke-width="1.1"/>
<path d="M174 40 H226" stroke-width="1.1"/>
</svg>`
}

function bgSvg(theme: CardTheme, w: number, hgt: number): string {
  if (theme === 'night') {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${hgt}" viewBox="0 0 ${w} ${hgt}">
<defs>
<linearGradient id="b" x1="0" y1="0" x2="0.35" y2="1"><stop offset="0" stop-color="#1c0707"/><stop offset="0.6" stop-color="#140505"/><stop offset="1" stop-color="#0f0404"/></linearGradient>
<radialGradient id="g" cx="0.5" cy="0.08" r="0.75"><stop offset="0" stop-color="#c8881e" stop-opacity="0.09"/><stop offset="1" stop-color="#c8881e" stop-opacity="0"/></radialGradient>
</defs>
<rect width="${w}" height="${hgt}" fill="url(#b)"/><rect width="${w}" height="${hgt}" fill="url(#g)"/>
</svg>`
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${hgt}" viewBox="0 0 ${w} ${hgt}">
<defs>
<radialGradient id="p" cx="0.5" cy="0.42" r="0.78"><stop offset="0" stop-color="#f8eed8"/><stop offset="0.7" stop-color="#f4e6c8"/><stop offset="1" stop-color="#eddcb9"/></radialGradient>
</defs>
<rect width="${w}" height="${hgt}" fill="url(#p)"/>
</svg>`
}

const dataUri = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`

export type RenderOptions = { format: CardFormat; lang: CardLang; theme: CardTheme }

export function parseOptions(sp: URLSearchParams): RenderOptions {
  const f = sp.get('format')
  const l = sp.get('lang')
  const t = sp.get('theme')
  return {
    format: f === 'status' || f === 'square' ? f : 'post',
    lang: l === 'hi' ? 'hi' : 'en',
    theme: t === 'night' ? 'night' : 'paper',
  }
}

export async function renderQuoteCard(q: CardQuote, opts: RenderOptions): Promise<Uint8Array> {
  const F = FORMATS[opts.format]
  const P = PALETTES[opts.theme]
  const lang = opts.lang
  const contentW = F.w - 2 * F.x

  const skSpec: FontSpec = { family: 'Sanskrit', weight: 400, style: 'normal' }
  const iastSpec: FontSpec = { family: 'Serif', weight: 500, style: 'italic' }
  const meanSpec: FontSpec = lang === 'hi' ? { family: 'Hindi', weight: 400, style: 'normal' } : { family: 'Serif', weight: 500, style: 'normal' }

  const meaningText = (lang === 'hi' ? q.meaning.hi : q.meaning.en).replace(/\s*[\u2013\u2014]\s*/g, ', ')
  const speakerText = q.speaker ? (lang === 'hi' ? q.speaker.hi : q.speaker.en) : ''
  const headText = lang === 'hi' ? q.sourceName.hi : q.sourceName.en.toUpperCase()

  const [skM, iastM, meanM] = await Promise.all([
    measureText(skSpec, q.sanskritLine),
    measureText(iastSpec, q.iast),
    measureText(meanSpec, meaningText, /[।॥.;:?]$/),
  ])

  // Fixed bands: running head, watermark, and the minimum air around the text block.
  const headH = lang === 'hi' ? F.head * 1.45 * 1.6 : F.head * 1.6
  const markH = F.mark * 1.5
  const minAir = opts.format === 'square' ? 40 : 56
  const avail = F.h - F.top - F.bottom - headH - markH - 2 * minAir

  const fleuronW = opts.format === 'square' ? 150 : 176
  const fleuronH = (fleuronW * 60) / 240

  let meanSize = F.meaning[lang]
  let iastSize = F.iast
  let chosen: {
    sk: { lines: string[]; size: number }
    iast: { lines: string[]; size: number }
    mean: { lines: string[]; size: number }
    gaps: { skToIast: number; iastToOrn: number; ornToMean: number; meanToSpk: number }
  } | null = null

  for (let attempt = 0; attempt < 4 && !chosen; attempt++) {
    const meanMeasure = Math.min(contentW, Math.round(meanSize * (lang === 'hi' ? 20 : 19)))
    const minMean = meanM.words.length >= 7 ? 2 : 1
    const minSk = skM.words.length >= 2 ? 2 : 1
    for (let s = F.skMax; s >= F.skMin; s -= 2) {
      const sk = fit(skM, s, contentW, minSk, 4, true)
      if (!sk) continue
      // The IAST and the meaning sit inside the width of the Sanskrit block, so the
      // verse stays the widest, heaviest shape on the page.
      const iastW = Math.min(contentW * 0.94, Math.max(sk.max * 0.92, contentW * 0.55))
      let iast = fit(iastM, iastSize, iastW, 1, 1)
      if (!iast && iastM.words.length === skM.words.length) iast = withCuts(iastM, sk.cuts, iastSize, contentW * 0.94)
      if (!iast) iast = fit(iastM, iastSize, iastW, 2, 4, true) ?? fit(iastM, iastSize, contentW, 1, 5)
      if (!iast) iast = { lines: [q.iast], max: contentW, cuts: [] }
      const meanW = Math.min(meanMeasure, Math.max(sk.max, contentW * 0.62))
      let mean = fit(meanM, meanSize, meanW, minMean, 5) ?? fit(meanM, meanSize, contentW, 1, 7)
      if (!mean) mean = { lines: [meaningText], max: contentW, cuts: [] }

      const gaps = {
        skToIast: Math.round(s * 0.34),
        iastToOrn: Math.round(meanSize * 1.0),
        ornToMean: Math.round(meanSize * 0.8),
        meanToSpk: Math.round(meanSize * 0.6),
      }
      const total =
        sk.lines.length * s * SK_LH +
        gaps.skToIast +
        iast.lines.length * iastSize * IAST_LH +
        gaps.iastToOrn +
        fleuronH +
        gaps.ornToMean +
        mean.lines.length * meanSize * MEAN_LH[lang] +
        (speakerText ? gaps.meanToSpk + iastSize * 1.4 : 0)
      if (total <= avail) {
        chosen = {
          sk: { lines: sk.lines, size: s },
          iast: { lines: iast.lines, size: iastSize },
          mean: { lines: mean.lines, size: meanSize },
          gaps,
        }
        break
      }
    }
    meanSize = Math.round(meanSize * 0.9)
    iastSize = Math.max(24, Math.round(iastSize * 0.92))
  }
  if (!chosen) {
    // Extremely long text: smallest sizes, let lines run to the 4-line cap and beyond.
    const s = F.skMin
    const sk = fit(skM, s, contentW, 1, 8) ?? { lines: [q.sanskritLine] }
    const mean = fit(meanM, meanSize, contentW, 1, 8) ?? { lines: [meaningText] }
    const iast = fit(iastM, iastSize, contentW, 1, 6) ?? { lines: [q.iast] }
    chosen = {
      sk: { lines: sk.lines, size: s },
      iast: { lines: iast.lines, size: iastSize },
      mean: { lines: mean.lines, size: meanSize },
      gaps: { skToIast: 18, iastToOrn: 28, ornToMean: 22, meanToSpk: 16 },
    }
  }

  const { sk, iast, mean, gaps } = chosen
  const line = (text: string, style: Style, key: string) =>
    h('div', { key, style: { display: 'flex', whiteSpace: 'pre', justifyContent: 'center', ...style } }, text)

  const head =
    lang === 'hi'
      ? h('div', { style: { display: 'flex', fontFamily: 'Hindi, DevaFallback', fontSize: Math.round(F.head * 1.45), lineHeight: 1.6, color: P.gold } }, headText)
      : h(
          'div',
          {
            style: {
              display: 'flex',
              fontFamily: 'Serif',
              fontWeight: 600,
              fontSize: F.head,
              letterSpacing: F.head * 0.26,
              lineHeight: 1.6,
              color: P.gold,
              paddingLeft: F.head * 0.26, // optical centring: tracking adds space after the last letter
            },
          },
          headText,
        )

  const middle = h(
    'div',
    { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, justifyContent: 'center', width: '100%' } },
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', alignItems: 'center' } },
      sk.lines.map((t, i) =>
        line(t, { fontFamily: 'Sanskrit, DevaFallback', fontSize: sk.size, lineHeight: SK_LH, color: P.ink }, `s${i}`),
      ),
    ),
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: gaps.skToIast } },
      iast.lines.map((t, i) =>
        line(
          t,
          { fontFamily: 'Serif', fontStyle: 'italic', fontWeight: 500, fontSize: iast.size, lineHeight: IAST_LH, color: P.quiet },
          `i${i}`,
        ),
      ),
    ),
    h('img', {
      src: dataUri(lotusSvg(P.ornament, fleuronW)),
      width: fleuronW,
      height: fleuronH,
      style: { marginTop: gaps.iastToOrn, opacity: opts.theme === 'night' ? 0.8 : 0.9 },
    }),
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: gaps.ornToMean } },
      mean.lines.map((t, i) =>
        line(
          t,
          lang === 'hi'
            ? { fontFamily: 'Hindi, DevaFallback', fontSize: mean.size, lineHeight: MEAN_LH.hi, color: P.body }
            : { fontFamily: 'Serif', fontWeight: 500, fontSize: mean.size, lineHeight: MEAN_LH.en, color: P.body },
          `m${i}`,
        ),
      ),
    ),
    speakerText
      ? h(
          'div',
          {
            style: {
              display: 'flex',
              marginTop: gaps.meanToSpk,
              fontFamily: lang === 'hi' ? 'Hindi, DevaFallback' : 'Serif',
              fontWeight: lang === 'hi' ? 400 : 500,
              fontStyle: lang === 'hi' ? 'normal' : 'italic',
              fontSize: lang === 'hi' ? Math.round(iast.size * 0.95) : iast.size,
              lineHeight: 1.4,
              color: P.gold,
            },
          },
          speakerText,
        )
      : null,
  )

  const mark = h(
    'div',
    {
      style: {
        display: 'flex',
        fontFamily: 'Serif',
        fontWeight: 600,
        fontSize: F.mark,
        letterSpacing: F.mark * 0.05,
        paddingLeft: F.mark * 0.05,
        lineHeight: 1.5,
        color: P.quiet,
      },
    },
    'wisdomquotes.in',
  )

  const root = h(
    'div',
    {
      style: {
        width: F.w,
        height: F.h,
        display: 'flex',
        position: 'relative',
        backgroundColor: P.bg,
      },
    },
    h('img', { src: dataUri(bgSvg(opts.theme, F.w, F.h)), width: F.w, height: F.h, style: { position: 'absolute', left: 0, top: 0 } }),
    h(
      'div',
      {
        style: {
          position: 'absolute',
          left: 0,
          top: 0,
          // satori sizes boxes content-box: width/height here exclude the padding below
          width: F.w - 2 * F.x,
          height: F.h - F.top - F.bottom,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: F.top,
          paddingBottom: F.bottom,
          paddingLeft: F.x,
          paddingRight: F.x,
        },
      },
      head,
      h('div', { style: { display: 'flex', flexDirection: 'column', flexGrow: 1, width: contentW, marginTop: minAir, marginBottom: minAir } }, middle),
      mark,
    ),
  )

  const svg = await satori(root as unknown as SatoriEl, { width: F.w, height: F.h, fonts: loadFonts() })
  await ensureWasm()
  const resvg = new Resvg(svg, { fitTo: { mode: 'original' }, font: { loadSystemFonts: false } })
  const png = resvg.render().asPng()
  resvg.free()
  return png
}
