import { getAllVerseRefs } from '@/lib/gita'

/**
 * The Gita verse of the day: the backend's curated pick (GET /api/v1/verse-of-day, Supabase cache), or a
 * deterministic verse when the backend is unavailable. Used by /gita/today and the morning verse email.
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export type VerseOfDayContext = {
  chapter: number
  verse: number
  day_of_week: string
  deity: string
  day_name_hi: string
  date_context: string
  why_chosen: string
  story: string
  themes: string[]
}

// ── Fallback: deterministic verse when backend is unavailable ─────────────────

export const deterministicVerseRef = () => {
  const refs = getAllVerseRefs()
  if (refs.length === 0) return null
  const utc = new Date()
  const dayOfYear = Math.floor(
    (Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()) -
      Date.UTC(utc.getUTCFullYear(), 0, 0)) /
      86400000,
  )
  const yearKey = utc.getUTCFullYear() * 1000
  return refs[(yearKey + dayOfYear) % refs.length]
}

// ── Fetch from backend API ────────────────────────────────────────────────────

export async function fetchVerseOfDay(): Promise<VerseOfDayContext | null> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL
  if (!backendUrl) return null

  try {
    const res = await fetch(`${backendUrl}/api/v1/verse-of-day`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) {
      console.warn(`[today] verse-of-day API returned ${res.status}`)
      return null
    }
    return await res.json() as VerseOfDayContext
  } catch (err) {
    console.warn('[today] verse-of-day API unreachable:', err)
    return null
  }
}

/** Today's verse: the curated one, else the deterministic one. */
export async function verseOfDayRef(): Promise<{ chapter: number; verse: number } | null> {
  const c = await fetchVerseOfDay()
  if (c) return { chapter: c.chapter, verse: c.verse }
  const r = deterministicVerseRef()
  return r ? { chapter: r.chapter, verse: r.verse } : null
}
