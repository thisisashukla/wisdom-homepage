/**
 * Bhagavad Gita URLs and analytics ids. Pure functions with no imports, so the server
 * content layer (lib/gita.ts re-exports these), client components and the search code
 * all build links the same way.
 */

export type GitaLang = 'en' | 'hi'

export const verseUrl = (chapter: number, verse: number, lang: GitaLang = 'en'): string =>
  lang === 'hi' ? `/hi/gita/chapter/${chapter}/verse/${verse}` : `/gita/chapter/${chapter}/verse/${verse}`

export const chapterUrl = (chapter: number, lang: GitaLang = 'en'): string =>
  lang === 'hi' ? `/hi/gita/chapter/${chapter}` : `/gita/chapter/${chapter}`

export const topicUrl = (slug: string, lang: GitaLang = 'en'): string =>
  lang === 'hi' ? `/hi/gita/topic/${slug}` : `/gita/topic/${slug}`

/**
 * The whole chapter on one page (noindex). Always the clean path: where a link came from
 * goes in its data-mp-location, never in the URL.
 */
export const readModeUrl = (chapter: number, lang: GitaLang = 'en'): string => `${chapterUrl(chapter, lang)}/read`

/** The one place the recitation files live (Supabase storage). */
export const GITA_AUDIO_BASE =
  'https://pheysuesndqmmsogtdbt.supabase.co/storage/v1/object/public/wisdom-homepage/audio/bhagavad_gita/'

/** Full URL of a verse recitation from its manifest path ("gita/bg_02_047.mp3"). */
export const verseAudioUrl = (manifestPath: string): string =>
  /^https?:\/\//.test(manifestPath) ? manifestPath : GITA_AUDIO_BASE + manifestPath.replace(/^\/?gita\//, '')

/** Analytics item_id for a verse: "bg-2-47". */
export const verseItemId = (chapter: number, verse: number): string => `bg-${chapter}-${verse}`

/** Analytics item_id for a chapter: "bg-ch-2" (never "bg-2", which reads like a verse). */
export const chapterItemId = (chapter: number): string => `bg-ch-${chapter}`
