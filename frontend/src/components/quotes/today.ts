/** Today's line: a deterministic daily pick per hub, by the date in India (Asia/Kolkata). */

import { readJSON, writeJSON } from '@/lib/storage'

const IST_OFFSET_MS = 330 * 60 * 1000 // IST is UTC+5:30 all year (no daylight saving)
const DAY_MS = 86_400_000
const SEEN_KEY = 'wq_today_seen'

/** Days since 1970-01-01 in IST. Changes at midnight in India. */
export function istDayNumber(now: number = Date.now()): number {
  return Math.floor((now + IST_OFFSET_MS) / DAY_MS)
}

/** "2026-11-11" for the IST day. */
export function istDayKey(now: number = Date.now()): string {
  return new Date(istDayNumber(now) * DAY_MS).toISOString().slice(0, 10)
}

function hash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/**
 * Index of today's line among n lines on a hub. Walks the hub's list one line per day from a
 * hub-specific start, so tomorrow always differs from today (when n > 1) and every line comes
 * round before any repeats.
 */
export function todayIndex(hub: string, n: number, day: number = istDayNumber()): number {
  if (n <= 0) return -1
  return (day + (hash(hub) % n)) % n
}

/** True the first time it is called for this hub on this IST day (localStorage, then memory). */
const seenInMemory = new Set<string>()
export function claimTodayView(hub: string, now: number = Date.now()): boolean {
  const day = istDayKey(now)
  const memKey = `${hub}|${day}`
  if (seenInMemory.has(memKey)) return false
  seenInMemory.add(memKey)
  // Storage blocked: once per page load (the memory set above).
  const parsed = readJSON<unknown>(SEEN_KEY, {})
  const map: Record<string, string> = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? (parsed as Record<string, string>) : {}
  if (map[hub] === day) return false
  // Drop days other than today so the map stays small.
  const next: Record<string, string> = {}
  for (const [k, v] of Object.entries(map)) if (v === day) next[k] = v
  next[hub] = day
  writeJSON(SEEN_KEY, next)
  return true
}
