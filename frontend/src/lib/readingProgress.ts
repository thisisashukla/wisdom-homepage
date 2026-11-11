/**
 * Reading progress for the Bhagavad Gita, kept on this device (localStorage).
 *
 * Key "wq_reading", shape:
 *   { v: 1,
 *     last: { ch, vs, lang: 'en' | 'hi', t } | null,   last verse page the reader opened
 *     read: string,                                    base64 bitset over every verse
 *     saved: string[] }                                "ch.vs" refs saved on this device
 *
 * Bit index of a verse = (verses in all earlier chapters) + (verse - 1), which equals
 * `order - 1` in content/gita/index.json. Counts come from BG_COUNTS in lib/search/refs.ts
 * (scripts/build-verse-search.mjs checks them against content/gita/chapters.json), so the
 * client bundle does not carry chapters.json.
 *
 * Safe to import anywhere: nothing touches window at import time, every storage call is
 * wrapped in try/catch, and every reader returns an empty value on the server.
 *
 * Writes dispatch READING_CHANGED_EVENT on window so mounted components (ResumeCard,
 * ChapterProgress, ReadTick) refresh without a reload. Other tabs refresh via 'storage'.
 */

import { BG_COUNTS } from '@/lib/search/refs'
import type { Locale } from '@/lib/locale'
import { emit, readJSON, readRaw, storage, subscribeKeys, writeJSON, writeRaw } from '@/lib/storage'
import { verseItemId } from '@/lib/gitaUrls'

export type ReadingLang = Locale
export type LastVisit = { ch: number; vs: number; lang: ReadingLang; t: number }
export type ReadingStore = { v: 1; last: LastVisit | null; read: string; saved: string[] }
export type SavedVerse = { chapter: number; verse: number; addedAt: number }

export const READING_KEY = 'wq_reading'
/** The older bookmark list written by components/gita/VerseBookmark.tsx. Read, never dropped. */
export const LEGACY_BOOKMARKS_KEY = 'wisdom.bookmarks'
/** Fired on window after any write to READING_KEY in this tab. */
export const READING_CHANGED_EVENT = 'wq:reading-changed'
/**
 * Fired on window when a verse's audio starts in a reader player. detail: { chapter, verse }.
 * ReadingTracker and ReadModeTracker count it as a read.
 */
export const VERSE_AUDIO_EVENT = 'wq:verse-audio-play'

const CHAPTERS = BG_COUNTS.map((total, i) => ({ number: i + 1, total }))

const OFFSETS: Record<number, number> = {}
const COUNTS: Record<number, number> = {}
let running = 0
for (const c of CHAPTERS) {
  OFFSETS[c.number] = running
  COUNTS[c.number] = c.total
  running += c.total
}

/** Verses in the bitset (701: the corpus includes 13.1, which some editions omit). */
export const TOTAL_VERSES = running
/** The count the site shows everywhere ("700 verses"). Use for copy, not for indexing. */
export const DISPLAY_TOTAL_VERSES = 700

const BYTES = Math.ceil(TOTAL_VERSES / 8)

/** Verses in a chapter, 0 for an unknown chapter. */
export const chapterVerseCount = (ch: number): number => COUNTS[ch] ?? 0

/** Analytics item_id for a verse: "bg-2-47" (defined in lib/gitaUrls). */
export { verseItemId }

const bitIndex = (ch: number, vs: number): number => {
  const off = OFFSETS[ch]
  const n = COUNTS[ch]
  if (off === undefined || !n || !Number.isInteger(vs) || vs < 1 || vs > n) return -1
  return off + vs - 1
}

// ── bitset encoding ─────────────────────────────────────────────────────────

const decodeBits = (b64: string): Uint8Array => {
  const out = new Uint8Array(BYTES)
  if (!b64) return out
  try {
    const bin = atob(b64)
    for (let i = 0; i < Math.min(bin.length, BYTES); i++) out[i] = bin.charCodeAt(i)
  } catch {
    /* corrupt value: start empty */
  }
  return out
}

const encodeBits = (bytes: Uint8Array): string => {
  let bin = ''
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i])
  try {
    return btoa(bin)
  } catch {
    return ''
  }
}

const getBit = (bytes: Uint8Array, i: number) => i >= 0 && (bytes[i >> 3] & (1 << (i & 7))) !== 0

const popcount = (bytes: Uint8Array, from = 0, to = TOTAL_VERSES): number => {
  let n = 0
  for (let i = from; i < to; i++) if (getBit(bytes, i)) n++
  return n
}

// ── storage ─────────────────────────────────────────────────────────────────

const emptyStore = (): ReadingStore => ({ v: 1, last: null, read: '', saved: [] })

// Parse once per distinct raw string; ReadTick may call this dozens of times per render.
let cacheRaw: string | null = null
let cacheStore: ReadingStore = emptyStore()
let cacheBits: Uint8Array = new Uint8Array(BYTES)

const isLang = (x: unknown): x is ReadingLang => x === 'en' || x === 'hi'

const sanitize = (x: unknown): ReadingStore => {
  const s = emptyStore()
  if (!x || typeof x !== 'object') return s
  const o = x as Record<string, unknown>
  const l = o.last as Record<string, unknown> | null | undefined
  if (l && typeof l === 'object' && bitIndex(Number(l.ch), Number(l.vs)) >= 0) {
    s.last = { ch: Number(l.ch), vs: Number(l.vs), lang: isLang(l.lang) ? l.lang : 'en', t: Number(l.t) || 0 }
  }
  if (typeof o.read === 'string') s.read = o.read
  if (Array.isArray(o.saved)) s.saved = o.saved.filter((r): r is string => typeof r === 'string').slice(-200)
  return s
}

const load = (): { store: ReadingStore; bits: Uint8Array } => {
  if (!storage()) return { store: emptyStore(), bits: new Uint8Array(BYTES) }
  const raw = readRaw(READING_KEY)
  if (raw === cacheRaw) return { store: cacheStore, bits: cacheBits }
  let store = emptyStore()
  if (raw) {
    try {
      store = sanitize(JSON.parse(raw))
    } catch {
      store = emptyStore()
    }
  }
  cacheRaw = raw
  cacheStore = store
  cacheBits = decodeBits(store.read)
  return { store, bits: cacheBits }
}

/** Returns false when the write failed (quota or private mode: progress just isn't kept). */
const save = (store: ReadingStore): boolean => {
  const raw = JSON.stringify(store)
  const ok = writeRaw(READING_KEY, raw)
  if (ok) {
    cacheRaw = raw
    cacheStore = store
    cacheBits = decodeBits(store.read)
  }
  emit(READING_CHANGED_EVENT)
  return ok
}

// ── public API ──────────────────────────────────────────────────────────────

/** Remember the verse page the reader just opened (drives "continue from"). */
export function markVisited(ch: number, vs: number, lang: ReadingLang): void {
  if (bitIndex(ch, vs) < 0) return
  const { store } = load()
  save({ ...store, last: { ch, vs, lang: isLang(lang) ? lang : 'en', t: Date.now() } })
}

/**
 * Mark a verse as read. Returns true only when it was newly stored; false when it was
 * already read, the ref is unknown, or the write failed. recordRead() adds an in-memory
 * guard so analytics fire once per verse per page view either way.
 */
export function markRead(ch: number, vs: number): boolean {
  const i = bitIndex(ch, vs)
  if (i < 0 || !storage()) return false
  const { store, bits } = load()
  if (getBit(bits, i)) return false
  const next = new Uint8Array(bits)
  next[i >> 3] |= 1 << (i & 7)
  return save({ ...store, read: encodeBits(next) })
}

export function isRead(ch: number, vs: number): boolean {
  return getBit(load().bits, bitIndex(ch, vs))
}

/** Verses read across the whole Gita. */
export function readCount(): number {
  return popcount(load().bits)
}

/** Verses read in one chapter. */
export function chapterReadCount(ch: number): number {
  const off = OFFSETS[ch]
  if (off === undefined) return 0
  return popcount(load().bits, off, off + (COUNTS[ch] ?? 0))
}

export function getLast(): LastVisit | null {
  return load().store.last
}

const parseRef = (r: string): { chapter: number; verse: number } | null => {
  const m = /^(\d+)[.:-](\d+)$/.exec(r.trim())
  if (!m) return null
  const chapter = Number(m[1])
  const verse = Number(m[2])
  return bitIndex(chapter, verse) >= 0 ? { chapter, verse } : null
}

/** Sort key for wq_reading.saved entries: above any real timestamp in the legacy list. */
const SAVED_RANK_BASE = 9e12

const readLegacy = (): SavedVerse[] => {
  const list = readJSON<unknown>(LEGACY_BOOKMARKS_KEY, [])
  if (!Array.isArray(list)) return []
  return list
    .map((b) => ({ chapter: Number(b?.chapter), verse: Number(b?.verse), addedAt: Number(b?.addedAt) || 0 }))
    .filter((b) => bitIndex(b.chapter, b.verse) >= 0)
}

/**
 * Every saved verse on this device, newest first: wq_reading.saved plus the older
 * 'wisdom.bookmarks' list (VerseBookmark), de-duplicated.
 */
export function getSaved(): SavedVerse[] {
  const out = new Map<string, SavedVerse>()
  for (const b of readLegacy()) out.set(`${b.chapter}.${b.verse}`, b)
  const saved = load().store.saved
  saved.forEach((r, i) => {
    const p = parseRef(r)
    if (!p) return
    const key = `${p.chapter}.${p.verse}`
    // wq_reading.saved has no timestamps but is newer than every legacy save (nothing writes
    // 'wisdom.bookmarks' any more), so rank it above them, keeping its own order (oldest first).
    if (!out.has(key)) out.set(key, { ...p, addedAt: SAVED_RANK_BASE + i })
  })
  return Array.from(out.values()).sort((a, b) => b.addedAt - a.addedAt)
}

export function isSaved(ch: number, vs: number): boolean {
  return getSaved().some((s) => s.chapter === ch && s.verse === vs)
}

/**
 * Save or unsave a verse in wq_reading.saved (VerseBookmark and ResumeCard use this).
 * Unsaving also removes it from the older 'wisdom.bookmarks' list, which stays readable.
 */
export function setSaved(ch: number, vs: number, on: boolean): boolean {
  if (bitIndex(ch, vs) < 0) return false
  const key = `${ch}.${vs}`
  const { store } = load()
  const rest = store.saved.filter((r) => {
    const p = parseRef(r)
    return !(p && p.chapter === ch && p.verse === vs)
  })
  if (!on) {
    const legacy = readLegacy()
    const kept = legacy.filter((b) => !(b.chapter === ch && b.verse === vs))
    if (kept.length !== legacy.length) writeJSON(LEGACY_BOOKMARKS_KEY, kept)
  }
  return save({ ...store, saved: on ? [...rest, key].slice(-200) : rest })
}

/**
 * Call `cb` whenever progress changes in this tab or another one. Returns an unsubscribe.
 * Client components only (call inside useEffect).
 */
export function subscribeReading(cb: () => void): () => void {
  return subscribeKeys([READING_KEY, LEGACY_BOOKMARKS_KEY], READING_CHANGED_EVENT, cb)
}
