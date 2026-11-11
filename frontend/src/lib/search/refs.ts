/**
 * Verse counts per chapter, so a typed verse number can be checked without loading the index.
 * scripts/build-verse-search.mjs compares these with the content and warns if they drift.
 */

import { chapterItemId, chapterUrl, verseItemId, verseUrl } from '@/lib/gitaUrls'

export type RefSource = 'bg' | 'ag'

/** Bhagavad Gita, chapters 1 to 18 (701 verses, 13.1 to 13.35). */
export const BG_COUNTS = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78]

/** Ashtavakra Gita, chapters 1 to 20 (298 verses). */
export const AG_COUNTS = [20, 25, 14, 6, 4, 4, 5, 4, 8, 8, 8, 8, 7, 4, 20, 11, 20, 100, 8, 14]

export const COUNTS: Record<RefSource, number[]> = { bg: BG_COUNTS, ag: AG_COUNTS }

export const verseCount = (src: RefSource, chapter: number): number => COUNTS[src][chapter - 1] ?? 0

export function refUrl(src: RefSource, chapter: number, verse: number | undefined, lang: 'en' | 'hi'): string {
  if (src === 'ag') {
    return verse ? `/ashtavakra-gita/chapter/${chapter}/verse/${verse}` : `/ashtavakra-gita/chapter/${chapter}`
  }
  return verse ? verseUrl(chapter, verse, lang) : chapterUrl(chapter, lang)
}

/** Analytics id: "bg-2-47" for a verse, "bg-ch-2" for a chapter (lib/gitaUrls for the Gita). */
export const refId = (src: RefSource, chapter: number, verse?: number): string =>
  src === 'bg' ? (verse ? verseItemId(chapter, verse) : chapterItemId(chapter)) : verse ? `${src}-${chapter}-${verse}` : `${src}-ch-${chapter}`
