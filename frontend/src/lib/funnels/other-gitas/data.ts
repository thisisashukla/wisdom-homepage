/**
 * Ashtavakra Gita data for the other-gitas funnel (server only: imports the full JSON).
 * Built by scripts/funnels/other-gitas/build.py. English is Wisdom's own; reviewed: false until checked.
 */
import raw from '@/content/funnels/other-gitas/ashtavakra.json'

export type Speaker = 'ashtavakra' | 'janaka'
export type AgWord = { w: string; m: string }
export type AgBridge = { c: number; v: number; kind: 'same' | 'contrast'; note: string }
export type AgVerse = {
  c: number
  v: number
  id: string
  speaker: Speaker
  sa: string
  iast: string
  en: string
  quick: string
  reviewed: boolean
  notice?: string
  words?: AgWord[]
  commentary?: string
  bridge?: AgBridge
}
export type AgChapter = { n: number; title: string; gist: string; count: number; speaker: Speaker }

const DATA = raw as unknown as { chapters: AgChapter[]; verses: AgVerse[] }

export const SITE = 'https://wisdomquotes.in'
export const FUNNEL = 'other-gitas'
export const UPDATED = '2026-10-30'
export const TOTAL_VERSES = DATA.verses.length

export const HUB_PATH = '/ashtavakra-gita'
export const agChapterPath = (n: number) => `/ashtavakra-gita/chapter/${n}`
export const agVersePath = (c: number, v: number) => `/ashtavakra-gita/chapter/${c}/verse/${v}`
export const gitaVersePath = (c: number, v: number) => `/gita/chapter/${c}/verse/${v}`
export const abs = (p: string) => (p.startsWith('http') ? p : `${SITE}${p}`)

export const getChapters = (): AgChapter[] => DATA.chapters
export const getChapter = (n: number): AgChapter | undefined => DATA.chapters.find((c) => c.n === n)
export const getVerses = (): AgVerse[] => DATA.verses
export const chapterVerses = (n: number): AgVerse[] => DATA.verses.filter((x) => x.c === n)
export const getVerse = (c: number, v: number): AgVerse | undefined => DATA.verses.find((x) => x.c === c && x.v === v)
export const getVerseByKey = (key: string): AgVerse | undefined => {
  const [c, v] = key.split('.').map(Number)
  return getVerse(c, v)
}

/** A verse page is indexed only when it carries its own word meanings, note and commentary. */
export const isIndexable = (x: AgVerse): boolean =>
  Boolean(x.notice && x.commentary && x.words && x.words.length >= 4)

export function neighbours(c: number, v: number): { prev: AgVerse | null; next: AgVerse | null } {
  const i = DATA.verses.findIndex((x) => x.c === c && x.v === v)
  return { prev: i > 0 ? DATA.verses[i - 1] : null, next: i >= 0 && i < DATA.verses.length - 1 ? DATA.verses[i + 1] : null }
}

export const speakerLabel = (s: Speaker) => (s === 'janaka' ? 'King Janaka' : 'Ashtavakra')
export const listenerLabel = (s: Speaker) => (s === 'janaka' ? 'to Ashtavakra' : 'to Janaka')

/** The verse split into its half-lines at the dandas, for display. */
export const padas = (line: string): string[] =>
  line
    .split(/(?<=[।॥|])\s+/u)
    .map((s) => s.trim())
    .filter(Boolean)

/** First words of the IAST for titles: "muktābhimānī mukto hi". */
export function firstWords(x: AgVerse, max = 3): string {
  return x.iast.replace(/[|]/g, ' ').split(/\s+/).filter(Boolean).slice(0, max).join(' ')
}

/** "Ashtavakra Gita 1.11: muktābhimānī mukto meaning" kept within 60 characters. */
export function verseTitle(x: AgVerse): string {
  for (let n = 3; n >= 1; n--) {
    const t = `Ashtavakra Gita ${x.c}.${x.v}: ${firstWords(x, n)} meaning`
    if (t.length <= 60) return t
  }
  return `Ashtavakra Gita ${x.c}.${x.v} meaning`
}

export function clip(s: string, n: number): string {
  if (s.length <= n) return s
  const cut = s.slice(0, n - 1)
  return `${cut.slice(0, cut.lastIndexOf(' '))}...`
}
