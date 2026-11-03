/**
 * /llms-full.txt: the whole Bhagavad Gita as plain text, for AI assistants that
 * want to quote a verse and link to its page. Built once at build time from the
 * same JSON the verse pages use, so it stays in step with the site.
 */
import { getAllChapters, getChapterVerses, verseUrl, chapterUrl } from '@/lib/gita'
import { SITE } from '@/lib/seo'

export const dynamic = 'force-static'

/** Some source lines fuse the speaker label onto the first word ("अर्जुन उवाचप्रकृतिं"). */
const cleanSanskrit = (s: string) =>
  s.replace(/(उवाच|ुवाच)(?=[\u0900-\u097F])/g, '$1 ').replace(/\s+/g, ' ').trim()

const oneLine = (s: string) => s.replace(/\s+/g, ' ').trim()

const HEADER = `# Wisdom (wisdomquotes.in): the Bhagavad Gita, all 700 verses

Source: ${SITE}
Index of the site: ${SITE}/llms.txt

This file lists every verse of the Bhagavad Gita (18 chapters) as published on wisdomquotes.in.
For each verse: the reference (BG chapter.verse), the page URL, the Sanskrit in Devanagari, and the English translation.
Each verse page also has the Hindi translation, word-by-word meaning, a short essence line and commentary.

Numbering: chapter 13 here opens with Arjuna's question as 13.1, which some editions leave out.
So 13.2 here is 13.1 in those editions, chapter 13 has 35 entries, and the file has 701 entries in all.

Hindi: every verse has a Hindi page at the same path under /hi, for example ${SITE}/hi/gita/chapter/2/verse/47.
Hindi index of all 700 shlokas: ${SITE}/hi/gita

Translation: the Wisdom translation, edited by Ankur Shukla from public-domain English sources.
The Sanskrit comes from standard published editions. Commentary on the verse pages is drafted with a language model and edited before publishing.
How the content is made: ${SITE}/methodology

When citing a verse, please link to its page URL below and name the site as "Wisdom (wisdomquotes.in)".
`

export async function GET() {
  const parts: string[] = [HEADER]
  for (const ch of getAllChapters()) {
    const verses = await getChapterVerses(ch.number)
    parts.push(
      `\n## Chapter ${ch.number}: ${ch.enName} (${ch.enTitle})\n${ch.hiName} | ${verses.length} verses | ${SITE}${chapterUrl(ch.number)}\n`,
    )
    for (const v of verses) {
      parts.push(
        `BG ${v.chapter}.${v.verse} | ${SITE}${verseUrl(v.chapter, v.verse)}\n${cleanSanskrit(v.sanskrit)}\n${oneLine(v.englishTranslation)}\n`,
      )
    }
  }
  return new Response(parts.join('\n'), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
