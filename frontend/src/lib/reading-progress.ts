export type ReadingPlace = { chapter: number; verse: number; locale: 'en' | 'hi' }
export const READING_KEY = 'wisdom:last-verse:v1'
const VERSES = [47,72,43,42,29,47,30,28,34,42,55,20,35,27,20,24,28,78]
export function validPlace(value: unknown): value is ReadingPlace {
  if (!value || typeof value !== 'object') return false
  const p = value as ReadingPlace
  return Number.isInteger(p.chapter) && p.chapter >= 1 && p.chapter <= 18
    && Number.isInteger(p.verse) && p.verse >= 1 && p.verse <= VERSES[p.chapter - 1]
    && (p.locale === 'en' || p.locale === 'hi')
}
export function readPlace(): ReadingPlace | null {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(READING_KEY) || 'null')
    return validPlace(saved) ? saved : null
  } catch { return null }
}
export function readingUrl(place: ReadingPlace) {
  return `${place.locale === 'hi' ? '/hi' : ''}/gita/chapter/${place.chapter}/verse/${place.verse}`
}
export function nextPlace(place: ReadingPlace): ReadingPlace | null {
  if (!validPlace(place)) return null
  if (place.verse < VERSES[place.chapter - 1]) return { ...place, verse: place.verse + 1 }
  return place.chapter < 18 ? { ...place, chapter: place.chapter + 1, verse: 1 } : null
}
