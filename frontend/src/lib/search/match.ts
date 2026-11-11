/**
 * Verse search: query parsing and ranking over public/data/verse-search.json.
 * Pure functions, no React, so they run in the browser and in node checks alike.
 *
 * Order of results: an exact verse number first, then lines that start with what was typed,
 * then lines that contain it, then verses that share words with it (Roman, Devanagari,
 * English or Hindi). Ties go to the more searched verse, then to the Gita, then to text order.
 */

import { devaKey, hasDevanagari, searchKey, skeleton } from './translit'
import { parseRef, type ParsedRef } from './parseRef'
import type { RefSource } from './refs'

// ── Index types ──────────────────────────────────────────────────────────────

export type SourceKey = 'bg' | 'ag' | 'hc' | 'kb' | 'rs' | 'up'

export type SearchItem = {
  id: string
  k: SourceKey
  /** English page (or the only page). */
  u: string
  /** Hindi page, when there is one. */
  hu?: string
  c?: number
  v?: number
  /** Reference, English and Hindi. */
  r: string
  rh: string
  /** First line, Devanagari. */
  s: string
  /** Plain Roman of the whole verse. */
  p: string
  /** Short English and Hindi meaning. */
  e?: string
  h?: string
  /** Tags, space separated. */
  t?: string
  /** Spellings people search with, " | " separated (most searched verses). */
  a?: string
  /** Popularity, 1 to 42 (most searched verses). */
  f?: number
}

export type SearchIndex = {
  v: number
  built: string
  counts: Record<RefSource, number[]>
  items: SearchItem[]
}

type Prepared = {
  item: SearchItem
  key: string
  skel: string
  tokSkel: string[]
  aliasSkel: string[]
  words: string[]
  deva: string
  hi: string
  order: number
}

export type PreparedIndex = { items: Prepared[]; byId: Map<string, SearchItem> }

export type SearchHit = { item: SearchItem; score: number; how: 'number' | 'start' | 'contains' | 'words' | 'close' }

const SOURCE_RANK: Record<SourceKey, number> = { bg: 0, up: 1, hc: 2, rs: 3, kb: 4, ag: 5 }

const wordsOf = (s: string): string[] =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 1)

export function prepareIndex(index: SearchIndex): PreparedIndex {
  const items = index.items.map((item, order): Prepared => {
    const key = searchKey(item.p)
    const aliases = item.a ? item.a.split('|').map((x) => x.trim()).filter(Boolean) : []
    return {
      item,
      key,
      skel: skeleton(key),
      tokSkel: key.split(' ').map(skeleton).filter(Boolean),
      aliasSkel: aliases.map((x) => skeleton(searchKey(x))).filter((x) => x.length >= 3),
      words: [...new Set([...wordsOf(item.e ?? ''), ...wordsOf((item.t ?? '').replace(/-/g, ' ')), ...wordsOf(item.a ?? '')])],
      deva: devaKey(item.s),
      hi: devaKey(item.h ?? ''),
      order,
    }
  })
  return { items, byId: new Map(index.items.map((it) => [it.id, it])) }
}

// ── Verse numbers: lib/search/parseRef.ts (small, so the verse-jump box needs no index) ──

export { parseRef, type ParsedRef } from './parseRef'

// ── Text matching ────────────────────────────────────────────────────────────

const STOP = new Set([
  'the', 'and', 'for', 'are', 'was', 'you', 'your', 'with', 'that', 'this', 'from', 'what', 'who', 'how', 'why', 'when',
  'does', 'about', 'into', 'his', 'her', 'its', 'not', 'all', 'one', 'say', 'says', 'said', 'verse', 'verses', 'shloka',
  'gita', 'bhagavad', 'geeta', 'meaning', 'quote', 'quotes', 'line', 'lines', 'hindi', 'english', 'sanskrit',
])
const HI_STOP = new Set(['का', 'की', 'के', 'है', 'हैं', 'में', 'से', 'को', 'और', 'पर', 'यह', 'वह', 'जो', 'तो', 'भी', 'ही', 'न', 'अर्थ', 'श्लोक'])

/** Smallest edit distance between needle and any substring of hay (Sellers). */
function closeness(needle: string, hay: string, max: number): number {
  const m = needle.length
  let prev = new Array<number>(m + 1)
  let cur = new Array<number>(m + 1)
  for (let i = 0; i <= m; i++) prev[i] = i
  let best = prev[m]
  for (let j = 1; j <= hay.length; j++) {
    cur[0] = 0
    const hc = hay.charCodeAt(j - 1)
    for (let i = 1; i <= m; i++) {
      const cost = needle.charCodeAt(i - 1) === hc ? 0 : 1
      cur[i] = Math.min(prev[i] + 1, cur[i - 1] + 1, prev[i - 1] + cost)
    }
    if (cur[m] < best) {
      best = cur[m]
      if (best === 0) return 0
    }
    const t = prev
    prev = cur
    cur = t
  }
  return best <= max ? best : Infinity
}

type Query = {
  raw: string
  deva: boolean
  devaKey: string
  devaTokens: string[]
  keys: string[]
  skels: string[]
  tokSkels: string[][]
  words: string[]
}

function readQuery(raw: string): Query {
  const deva = hasDevanagari(raw)
  const keys = deva ? [...new Set([searchKey(raw, 'sa'), searchKey(raw, 'hi')])] : [searchKey(raw)]
  const dk = deva ? devaKey(raw) : ''
  return {
    raw,
    deva,
    devaKey: dk,
    devaTokens: dk.split(' ').filter((w) => w.length > 1 && !HI_STOP.has(w)),
    keys,
    skels: keys.map(skeleton),
    tokSkels: keys.map((k) => k.split(' ').map(skeleton).filter((x) => x.length >= 1)),
    words: deva ? [] : wordsOf(raw).filter((w) => w.length >= 3 && !STOP.has(w)),
  }
}

function romanScore(p: Prepared, q: Query): { score: number; how: SearchHit['how'] } {
  let best = 0
  let how: SearchHit['how'] = 'words'
  for (let n = 0; n < q.keys.length; n++) {
    const qs = q.skels[n]
    if (qs.length >= 3) {
      const starts = p.skel.startsWith(qs) || p.aliasSkel.some((a) => a.startsWith(qs))
      if (starts) {
        const exact = p.key.startsWith(q.keys[n]) ? 40 : 0
        const s = 800 + Math.min(qs.length, 40) + exact
        if (s > best) {
          best = s
          how = 'start'
        }
        continue
      }
      if (qs.length >= 4) {
        // Long enough to match inside a compound (tattvamasi). Shorter ones must start a word,
        // so "anger" does not match "jayenge raja".
        const at = qs.length >= 6 ? p.skel.indexOf(qs) : p.tokSkel.some((w) => w.startsWith(qs)) ? 0 : -1
        const inAlias = at < 0 && qs.length >= 6 && p.aliasSkel.some((a) => a.includes(qs))
        if (at >= 0 || inAlias) {
          const s = 500 + Math.min(qs.length, 40) - Math.min(Math.floor(Math.max(at, 0) / 8), 30)
          if (s > best) {
            best = s
            how = 'contains'
          }
          continue
        }
      }
    }
    // shared words
    const toks = q.tokSkels[n]
    if (toks.length) {
      let hit = 0
      for (const t of toks) {
        if (p.tokSkel.some((w) => w.startsWith(t)) || (t.length >= 4 && p.skel.includes(t))) hit++
      }
      const frac = hit / toks.length
      if (hit && (toks.length === 1 || frac >= 0.5)) {
        const s = 150 + 150 * frac
        if (s > best) {
          best = s
          how = 'words'
        }
      }
    }
    // a near miss on a longer phrase (one or two letters off)
    if (best < 300 && qs.length >= 6) {
      const max = qs.length >= 10 ? 2 : 1
      const d = Math.min(closeness(qs, p.skel, max), ...p.aliasSkel.map((a) => closeness(qs, a, max)))
      if (d !== Infinity) {
        const s = 380 - d * 60
        if (s > best) {
          best = s
          how = 'close'
        }
      }
    }
  }
  return { score: best, how }
}

function wordScore(p: Prepared, q: Query): number {
  if (!q.words.length) return 0
  let hit = 0
  for (const w of q.words) {
    if (p.words.includes(w) || (w.length >= 4 && p.words.some((x) => x.startsWith(w)))) hit++
  }
  const frac = hit / q.words.length
  return hit && (q.words.length === 1 || frac >= 0.5) ? 120 + 200 * frac : 0
}

function devaScore(p: Prepared, q: Query): { score: number; how: SearchHit['how'] } {
  if (!q.deva || !q.devaKey) return { score: 0, how: 'words' }
  if (p.deva.startsWith(q.devaKey)) return { score: 900 + Math.min(q.devaKey.length, 40), how: 'start' }
  if (p.deva.includes(q.devaKey)) return { score: 650 + Math.min(q.devaKey.length, 40), how: 'contains' }
  if (q.devaKey.length >= 3 && p.hi.includes(q.devaKey)) return { score: 420, how: 'contains' }
  if (q.devaTokens.length) {
    const hay = `${p.deva} ${p.hi}`
    let hit = 0
    for (const t of q.devaTokens) if (hay.includes(t)) hit++
    const frac = hit / q.devaTokens.length
    if (hit && (q.devaTokens.length === 1 || frac >= 0.5)) return { score: 120 + 200 * frac, how: 'words' }
  }
  return { score: 0, how: 'words' }
}

/** Ranked results for a query. A verse number puts that verse first. */
export function search(index: PreparedIndex, raw: string, limit = 30): { ref: ParsedRef | null; hits: SearchHit[] } {
  const query = raw.trim().slice(0, 120)
  if (!query) return { ref: null, hits: [] }

  const ref = parseRef(query)
  if (ref) {
    const hits: SearchHit[] = []
    if (ref.valid && ref.verse !== undefined) {
      const item = index.byId.get(ref.id)
      if (item) hits.push({ item, score: 10000, how: 'number' })
    } else if (ref.valid) {
      // a chapter: its verses in order
      for (const p of index.items) {
        if (p.item.k === ref.src && p.item.c === ref.chapter && hits.length < limit) hits.push({ item: p.item, score: 9000, how: 'number' })
      }
    }
    return { ref, hits }
  }

  const q = readQuery(query)
  const scored: Array<SearchHit & { order: number; rank: number }> = []
  for (const p of index.items) {
    const r = romanScore(p, q)
    const d = devaScore(p, q)
    const w = wordScore(p, q)
    const parts = [r.score, d.score, w]
    const top = Math.max(...parts)
    if (top < 150) continue
    const rest = parts.reduce((a, b) => a + b, 0) - top
    const how = top === d.score ? d.how : top === r.score ? r.how : 'words'
    scored.push({
      item: p.item,
      score: top + rest * 0.15 + (p.item.f ?? 0),
      how,
      order: p.order,
      rank: SOURCE_RANK[p.item.k],
    })
  }
  scored.sort((a, b) => b.score - a.score || a.rank - b.rank || a.order - b.order)
  return {
    ref: null,
    hits: scored.slice(0, limit).map(({ item, score, how }) => ({ item, score: Math.round(score), how })),
  }
}

/** "deva" | "roman" | "mixed" | "number", for analytics. */
export function queryScript(raw: string): 'deva' | 'roman' | 'mixed' | 'number' {
  if (parseRef(raw)) return 'number'
  const d = hasDevanagari(raw)
  const l = /[a-z]/i.test(raw)
  return d && l ? 'mixed' : d ? 'deva' : 'roman'
}

/** Page to open for a result in the reader's language. */
export const itemHref = (item: SearchItem, lang: 'en' | 'hi'): string => (lang === 'hi' && item.hu ? item.hu : item.u)

export const INDEX_URL = '/data/verse-search.json'
