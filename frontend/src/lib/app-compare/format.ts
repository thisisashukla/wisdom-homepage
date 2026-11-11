import { CHECKED_ISO, type AndroidStatus, type CompareApp, type Mark } from './apps'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "Nov 2026" from "2026-11-05". */
export function monthYear(iso: string): string {
  const [y, m] = iso.split('-').map(Number)
  return `${MONTHS[m - 1]} ${y}`
}

export function ratingText(r: { avg: number; count: number }): string {
  if (!r.count) return 'none yet'
  return `${r.avg.toFixed(1)} from ${r.count.toLocaleString('en-US')}`
}

export const MARK_LABEL: Record<Mark, string> = { yes: 'Yes', part: 'Partly', no: 'No', ns: 'Not stated' }

export function androidText(app: CompareApp): string {
  if (app.isWisdom) return 'No, iPhone only'
  const t: Record<AndroidStatus, string> = { yes: 'Yes', new: 'New listing', no: 'Not found' }
  return t[app.android.status]
}

export function updatedText(app: CompareApp): string {
  return app.stale ? `${monthYear(app.updated)} (over a year ago)` : monthYear(app.updated)
}

/** Chips for an entry: price, ratings, last update, Android. */
export function entryFacts(app: CompareApp): string[] {
  return [
    app.priceShort,
    `US: ${ratingText(app.ratingUS)}`,
    `India: ${ratingText(app.ratingIN)}`,
    `Updated ${monthYear(app.updated)}`,
    `Android: ${androidText(app)}`,
  ]
}

export const checkedYear = Number(CHECKED_ISO.slice(0, 4))
