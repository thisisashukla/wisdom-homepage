/**
 * Merging two copies of a reader's Gita progress (the wq_reading store, lib/readingProgress.ts), so it can
 * follow a signed-in reader across devices. Pure: no window, no storage. The browser (lib/readingSync.ts)
 * and the server (app/api/me/reading) both use it, so two devices syncing at once still end up the same.
 *
 *   read   verses read: a bitset, merged by OR (nothing un-reads a verse)
 *   last   the verse page opened last: the newer one wins
 *   st     per saved verse, when it was last saved (+ms) or unsaved (-ms): the newer change wins, so an
 *          unsave on one device is not undone by the other device's older save
 *   saved  derived from st: the refs whose newest change is a save, oldest first
 *
 * A ref in `saved` with no entry in st (saved before syncing existed) counts as saved at time 1.
 */

import { BG_COUNTS } from '@/lib/search/refs'

export type SyncedLast = { ch: number; vs: number; lang: 'en' | 'hi'; t: number }
export type SyncedReading = {
  v: 1
  last: SyncedLast | null
  read: string
  saved: string[]
  st: Record<string, number>
}

const TOTAL = BG_COUNTS.reduce((a, b) => a + b, 0)
const BYTES = Math.ceil(TOTAL / 8)
const REF_RE = /^(\d+)\.(\d+)$/

export const validRef = (ref: string): boolean => {
  const m = REF_RE.exec(ref)
  if (!m) return false
  const ch = Number(m[1])
  const vs = Number(m[2])
  return ch >= 1 && ch <= BG_COUNTS.length && vs >= 1 && vs <= BG_COUNTS[ch - 1]
}

const toBytes = (b64: string): Uint8Array => {
  const out = new Uint8Array(BYTES)
  if (!b64) return out
  try {
    const bin = atob(b64)
    for (let i = 0; i < Math.min(bin.length, BYTES); i++) out[i] = bin.charCodeAt(i)
  } catch {
    /* corrupt: empty */
  }
  return out
}

const toB64 = (bytes: Uint8Array): string => {
  let bin = ''
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i])
  return btoa(bin)
}

/** Any value (another device's JSON, a stored row) as a clean store. */
export function cleanReading(x: unknown): SyncedReading {
  const out: SyncedReading = { v: 1, last: null, read: '', saved: [], st: {} }
  if (!x || typeof x !== 'object') return out
  const o = x as Record<string, unknown>
  const l = o.last as Record<string, unknown> | null | undefined
  if (l && typeof l === 'object' && validRef(`${Number(l.ch)}.${Number(l.vs)}`)) {
    out.last = { ch: Number(l.ch), vs: Number(l.vs), lang: l.lang === 'hi' ? 'hi' : 'en', t: Number(l.t) || 0 }
  }
  if (typeof o.read === 'string' && o.read.length <= 400) out.read = toB64(toBytes(o.read))
  if (o.st && typeof o.st === 'object') {
    for (const [ref, t] of Object.entries(o.st as Record<string, unknown>)) {
      if (validRef(ref) && typeof t === 'number' && Number.isFinite(t) && t !== 0) out.st[ref] = t
    }
  }
  if (Array.isArray(o.saved)) {
    for (const r of o.saved) if (typeof r === 'string' && validRef(r) && !(r in out.st)) out.st[r] = 1
  }
  out.saved = savedFrom(out.st)
  return out
}

/** Saved refs from the change log: newest change is a save, oldest save first, at most 200. */
export function savedFrom(st: Record<string, number>): string[] {
  return Object.entries(st)
    .filter(([, t]) => t > 0)
    .sort((a, b) => a[1] - b[1])
    .map(([r]) => r)
    .slice(-200)
}

export function mergeReading(a: unknown, b: unknown): SyncedReading {
  const x = cleanReading(a)
  const y = cleanReading(b)
  const bx = toBytes(x.read)
  const by = toBytes(y.read)
  const bits = new Uint8Array(BYTES)
  for (let i = 0; i < BYTES; i++) bits[i] = bx[i] | by[i]
  const st: Record<string, number> = { ...x.st }
  for (const [ref, t] of Object.entries(y.st)) if (!(ref in st) || Math.abs(t) > Math.abs(st[ref])) st[ref] = t
  const last = !x.last ? y.last : !y.last ? x.last : y.last.t > x.last.t ? y.last : x.last
  return { v: 1, last, read: toB64(bits), saved: savedFrom(st), st }
}

/** Same progress? (st compared as a set, so key order does not matter.) */
export function sameReading(a: SyncedReading, b: SyncedReading): boolean {
  const stKey = (s: Record<string, number>) => JSON.stringify(Object.entries(s).sort(([p], [q]) => (p < q ? -1 : 1)))
  return a.read === b.read && JSON.stringify(a.last) === JSON.stringify(b.last) && stKey(a.st) === stKey(b.st)
}

/** The verse after "ch.vs" in the Gita (after 18.78, back to 1.1). */
export function nextRef(ch: number, vs: number): { chapter: number; verse: number } {
  if (vs < (BG_COUNTS[ch - 1] ?? 0)) return { chapter: ch, verse: vs + 1 }
  return ch < BG_COUNTS.length ? { chapter: ch + 1, verse: 1 } : { chapter: 1, verse: 1 }
}
