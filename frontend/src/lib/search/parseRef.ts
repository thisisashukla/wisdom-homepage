/**
 * Read a verse or chapter number from what someone typed: "2.47", "bg 2:47", "chapter 12",
 * "अध्याय 2 श्लोक 47", "ashtavakra 1.1". No index needed, so the verse-jump box can go
 * straight to a verse before (or without) loading public/data/verse-search.json.
 */

import { asciiDigits } from '@/lib/devanagari'
import { COUNTS, refId, refUrl, verseCount, type RefSource } from './refs'

export type ParsedRef = {
  src: RefSource
  chapter: number
  verse?: number
  /** False when the chapter or verse does not exist; message says why. */
  valid: boolean
  id: string
  url: string
  hiUrl: string
  message?: { en: string; hi: string }
}

/** Words that may surround a verse number: "bg 2.47", "gita 2 47", "chapter 2 verse 47", "अध्याय 2 श्लोक 47". */
const GITA_WORDS = new Set([
  'bg', 'gita', 'geeta', 'geetha', 'gitaa', 'bhagavad', 'bhagwad', 'bhagvad', 'bhagavat', 'bhagwat', 'bhagavadgita', 'bhagwadgita',
  'srimad', 'shrimad', 'shrimadbhagavadgita', 'bhagavadgeeta', 'bhagwadgeeta', 'the',
  'गीता', 'भगवद', 'भगवद्', 'भगवत', 'भगवद्गीता', 'श्रीमद्भगवद्गीता', 'श्रीमद', 'श्रीमद्', 'श्रीमद्भगवद',
])
const AG_WORDS = new Set(['ag', 'ashtavakra', 'astavakra', 'ashtavakr', 'अष्टावक्र'])
const CHAPTER_WORDS = new Set(['chapter', 'ch', 'chap', 'c', 'adhyay', 'adhyaya', 'adhyaay', 'अध्याय', 'अध्यायः'])
const VERSE_WORDS = new Set(['verse', 'v', 'vs', 'shlok', 'shloka', 'sloka', 'slok', 'श्लोक', 'श्लोकः', 'text', 'no', 'number', 'संख्या'])
const FILLER = new Set(['meaning', 'in', 'hindi', 'english', 'sanskrit', 'arth', 'artha', 'अर्थ', 'हिंदी', 'हिन्दी', 'of', 'st', 'nd', 'rd', 'th'])

/** Read a verse or chapter number, or null when the query is words. */
export function parseRef(query: string): ParsedRef | null {
  const q = asciiDigits(query.normalize('NFC'))
    .toLowerCase()
    .replace(/([a-zऀ-ॿ])(\d)/g, '$1 $2')
    .replace(/(\d)([a-zऀ-ॿ])/g, '$1 $2')
  const tokens = q.split(/[\s.:/,\-–—_|()#]+/).filter(Boolean)
  if (!tokens.length) return null

  let src: RefSource = 'bg'
  let saidChapter = false
  let saidVerse = false
  const nums: number[] = []
  for (const tok of tokens) {
    if (/^\d+$/.test(tok)) nums.push(Number(tok))
    else if (AG_WORDS.has(tok)) src = 'ag'
    else if (CHAPTER_WORDS.has(tok)) saidChapter = true
    else if (VERSE_WORDS.has(tok)) saidVerse = true
    else if (!GITA_WORDS.has(tok) && !FILLER.has(tok)) return null
  }
  if (nums.length === 0 || nums.length > 2) return null
  if (nums.length === 1 && saidVerse && !saidChapter) return null
  // A lone number that is no chapter ("108", "gita 700") is more likely words: search for it.
  if (nums.length === 1 && !saidChapter && (nums[0] < 1 || nums[0] > COUNTS[src].length)) return null

  const chapter = nums[0]
  const verse = nums.length === 2 ? nums[1] : undefined
  const counts = COUNTS[src]
  const name = src === 'ag' ? { en: 'The Ashtavakra Gita', hi: 'अष्टावक्र गीता' } : { en: 'The Gita', hi: 'गीता' }
  let valid = true
  let message: ParsedRef['message']
  if (chapter < 1 || chapter > counts.length) {
    valid = false
    message = {
      en: `${name.en} has ${counts.length} chapters.`,
      hi: `${name.hi} में ${counts.length} अध्याय हैं।`,
    }
  } else if (verse !== undefined && (verse < 1 || verse > verseCount(src, chapter))) {
    valid = false
    message = {
      en: `Chapter ${chapter} has ${verseCount(src, chapter)} verses.`,
      hi: `अध्याय ${chapter} में ${verseCount(src, chapter)} श्लोक हैं।`,
    }
  }
  return {
    src,
    chapter,
    verse,
    valid,
    id: refId(src, chapter, verse),
    url: refUrl(src, chapter, verse, 'en'),
    hiUrl: refUrl(src, chapter, verse, 'hi'),
    message,
  }
}
