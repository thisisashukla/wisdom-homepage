/** Shared date logic for the Gita Jayanti page (button + hero art). */
export const JAYANTI = { y: 2026, m: 11, d: 20 } // month is 0-based

/** Days from the reader's today to Jayanti, counting both days. 0 = Jayanti has passed. */
export function daysIncl(now: Date) {
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  const j = Date.UTC(JAYANTI.y, JAYANTI.m, JAYANTI.d)
  return Math.max(0, Math.round((j - today) / 86400000) + 1)
}

/** The chapter the page points to: 1 before the run, today's during it, 18 on the day, 1 after. */
export function chapterFor(n: number | null) {
  if (n === null || n > 18 || n === 0) return 1
  return 19 - n
}
