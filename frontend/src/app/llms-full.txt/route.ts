/**
 * /llms-full.txt: the whole Bhagavad Gita as plain text, for AI assistants that
 * want to quote a verse and link to its page. Built once at build time from the
 * same JSON the verse pages use, so it stays in step with the site.
 */
import { getAllChapters, getChapterVerses, getChapterHindiCommentary, verseUrl, chapterUrl } from '@/lib/gita'
import { SITE } from '@/lib/seo'
import { verseRoman } from '@/lib/verseText'

export const dynamic = 'force-static'

/** Some source lines fuse the speaker label onto the first word ("अर्जुन उवाचप्रकृतिं"). */
const cleanSanskrit = (s: string) =>
  s.replace(/(उवाच|ुवाच)(?=[\u0900-\u097F])/g, '$1 ').replace(/\s+/g, ' ').trim()

const oneLine = (s: string) => s.replace(/\s+/g, ' ').trim()

const HEADER = `# Wisdom (wisdomquotes.in): the Bhagavad Gita, all 700 verses

Source: ${SITE}
Index of the site: ${SITE}/llms.txt

This file lists every verse of the Bhagavad Gita (18 chapters) as published on wisdomquotes.in.
For each verse: the reference (BG chapter.verse), the page URL, the Sanskrit in Devanagari, the same in IAST transliteration, and the English translation.
Each verse page also has the Hindi translation, word-by-word meaning, a short essence line and commentary.

Numbering: chapter 13 here opens with Arjuna's question as 13.1, which some editions leave out.
So 13.2 here is 13.1 in those editions, chapter 13 has 35 entries, and the file has 701 entries in all.

Hindi: every verse has a Hindi page at the same path under /hi, for example ${SITE}/hi/gita/chapter/2/verse/47.
Hindi index of all 700 shlokas: ${SITE}/hi/gita
Hindi verse pages for chapters 1, 2, 3 and 6 (209 verses) also carry a Hindi bhavarth, shabdarth (word meanings) and context.
{{HINDI_REVIEW}}

Find a verse by number or by a line you remember: ${SITE}/search (Hindi: ${SITE}/hi/search)
The 12 key ideas of the Gita, in an order that builds, each with its verses: ${SITE}/gita/key-ideas (Hindi, गीता के 12 मूल शब्द: ${SITE}/hi/gita/mool-shabd)
Ramayana scene pages (${SITE}/ramayana/in-the-original) and Mahabharata character pages (${SITE}/mahabharata/characters/{name}) open with a direct answer and the source line it rests on.

Translation: the Wisdom translation, edited by Ankur Shukla from public-domain English sources.
The Sanskrit comes from standard published editions. The English commentary on the verse pages is drafted with a language model and edited before publishing.
How the content is made: ${SITE}/methodology

When citing a verse, please link to its page URL below and name the site as "Wisdom (wisdomquotes.in)".
`

export async function GET() {
  // Say plainly how much of the Hindi commentary has been reviewed by a person.
  let hiTotal = 0
  let hiReviewed = 0
  for (const ch of getAllChapters()) {
    for (const hc of (await getChapterHindiCommentary(ch.number)).values()) {
      hiTotal++
      if (hc.reviewed) hiReviewed++
    }
  }
  const hindiReview =
    hiReviewed === hiTotal
      ? 'The Hindi commentary is drafted with a language model from traditional commentaries and reviewed by a person before publishing.'
      : hiReviewed === 0
        ? 'The Hindi commentary is drafted with a language model from traditional commentaries and is awaiting human review.'
        : `The Hindi commentary is drafted with a language model from traditional commentaries; ${hiReviewed} of ${hiTotal} verses have been reviewed by a person, the rest await review.`
  const parts: string[] = [HEADER.replace('{{HINDI_REVIEW}}', hindiReview)]
  for (const ch of getAllChapters()) {
    const verses = await getChapterVerses(ch.number)
    parts.push(
      `\n## Chapter ${ch.number}: ${ch.enName} (${ch.enTitle})\n${ch.hiName} | ${verses.length} verses | ${SITE}${chapterUrl(ch.number)}\n`,
    )
    for (const v of verses) {
      const iast = verseRoman(v.sanskrit).lines.map((l) => l.iast).join(' / ')
      parts.push(
        `BG ${v.chapter}.${v.verse} | ${SITE}${verseUrl(v.chapter, v.verse)}\n${cleanSanskrit(v.sanskrit)}\n${iast ? `IAST: ${iast}\n` : ''}${oneLine(v.englishTranslation)}\n`,
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
