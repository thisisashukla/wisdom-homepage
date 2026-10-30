/**
 * Ram Shalaka: client-safe types and pure helpers (no data imports, no Node APIs).
 * The ninth-square rule here is the one scripts/funnels/ram-shalaka/check.mjs asserts.
 */

export type RsLocale = 'hi' | 'en'
export type RsL10n = { hi: string; en: string }
export type RsSign = 'shubh' | 'sanshay' | 'ashubh'

export type RsPair = { answer: boolean; deva: string[]; iast: string[]; meaning: RsL10n }

export type RsLine = {
  n: number
  k: number
  slug: string
  id: string
  sign: RsSign
  deva: string[]
  iast: string[]
  kand: RsL10n
  place: RsL10n
  who: RsL10n
  meaning: RsL10n
  scene: RsL10n
  forYou: RsL10n
  signText: RsL10n
  quick: { hi: string }
  unit: RsPair[]
  gita: { chapter: number; verse: number; note: RsL10n }
  cardMeaning: RsL10n
  reviewed: boolean
}

/** One line as the ritual needs it: a single locale, so the client payload stays small. */
export type RsRitualLine = {
  n: number
  k: number
  slug: string
  sign: RsSign
  signWord: string
  deva: string[]
  iast: string[]
  source: string
  meaning: string
  scene: string
  forYou: string
  signText: string
}

export type RsNextCopy = Record<'app' | 'whatsapp' | 'email', { line: string; cta: string }>

export const RS_FUNNEL = 'ram-shalaka'
export const RS_STORAGE_KEY = 'wq_shalaka_v1'
export const RS_DAILY = 3
export const RS_RESET_HOUR = 4

/**
 * The count from start cell p (0..224): class k = p mod 9, start position m = (p - k) / 9,
 * then positions m..24 and 0..m-1 of that class. Returns 25 cell indices, p first.
 */
export function sequence(p: number): number[] {
  const k = p % 9
  const m = (p - k) / 9
  const out: number[] = []
  for (let i = 0; i < 25; i++) out.push(k + 9 * ((m + i) % 25))
  return out
}

/** Local day that turns over at 4 AM (Brahma muhurta). */
export function dayKey(now: Date = new Date()): string {
  const d = new Date(now.getTime() - RS_RESET_HOUR * 3600 * 1000)
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

/** Minutes until the next 4 AM local. */
export function minutesToReset(now: Date = new Date()): number {
  const next = new Date(now)
  next.setHours(RS_RESET_HOUR, 0, 0, 0)
  if (next <= now) next.setDate(next.getDate() + 1)
  return Math.max(1, Math.round((next.getTime() - now.getTime()) / 60000))
}

/** Question text normalised for the repeat check. Never leaves the device. */
export function normQuestion(s: string): string {
  return (s || '')
    .toLowerCase()
    .normalize('NFC')
    .replace(/[\s?.,।॥!'"]+/g, ' ')
    .trim()
}

/** FNV-1a, so only a hash of the question is stored, never the words. */
export function hashQuestion(s: string): string {
  let h = 0x811c9dc5
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return (h >>> 0).toString(36)
}

/** Health, legal and money words (Hindi, Hinglish, English) that add the expert-advice note. */
const EXPERT_RE =
  /(डॉक्टर|डाक्टर|बीमार|इलाज|दवा|ऑपरेशन|सर्जरी|अस्पताल|स्वास्थ्य|सेहत|गर्भ|मुकदम|मुक़दम|अदालत|कोर्ट|वकील|पुलिस|तलाक|केस|लोन|कर्ज|क़र्ज़|कर्ज़|उधार|पैसा|पैसे|निवेश|शेयर|ज़मीन|जमीन|प्रॉपर्टी|\bdoctor|\bsurgery|\boperation\b|\bhospital|\bdisease|\billness|\bcancer|\bmedicine|\bpregnan|\bhealth|\bcourt\b|\bcase\b|\blawyer|\bvakil|\bpolice|\bdivorce|\blegal|\bloan|\bdebt|\bemi\b|\bmoney|\bpaisa|\binvest|\bstock|\bshare market|\bproperty|\bkarz)/i

export function needsExpertNote(question: string): boolean {
  return !!question && EXPERT_RE.test(question)
}

export const lineHref = (slug: string): string => `/hi/ram-shalaka/${slug}`
export const toolHref = (locale: RsLocale): string => (locale === 'hi' ? '/hi/ram-shalaka' : '/ram-shalaka')
export const planHref = (n: number): string => `/start?ref=rs-${n}`
