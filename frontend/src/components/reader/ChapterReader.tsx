/**
 * Server component: one chapter on one scrolling page (chapter read mode).
 * Used by app/gita/chapter/[chapter]/read and app/hi/gita/chapter/[chapter]/read.
 * Server only (reads verse JSON and the audio manifest through lib/gita).
 */

import { notFound } from 'next/navigation'
import BlogTracker from '@/components/BlogTracker'
import VerseCard, { VerseList } from '@/components/site/VerseCard'
import { chapterLede, chapterUrl, getChapter, getChapterVerses, getVerseAudio, hasHindiTranslation, sanskritPadas, verseUrl, type Verse } from '@/lib/gita'
import type { Locale } from '@/lib/locale'
import ChapterProgress, { ReadTick } from './ChapterProgress'
import PlayAllPlayer, { VerseListenButton, type PlayAllTrack } from './PlayAllPlayer'
import ReadModeTracker from './ReadModeTracker'
import { readModeUrl, verseAudioUrl } from '@/lib/gitaUrls'
import './reader.css'

/**
 * Split a shloka into padas at the dandas, for VerseCard rows. The corpus glues the speaker
 * line to the first word ("धृतराष्ट्र उवाचधर्मक्षेत्रे"), so "... उवाच" gets its own row.
 * Shared with SanskritText through lib/gita (lib/devanagari.ts).
 */
const padas = sanskritPadas

const hindiOk = (v: Verse) => hasHindiTranslation(v)

const COPY = {
  en: {
    gita: 'Bhagavad Gita',
    chapter: (n: number) => `Chapter ${n}`,
    crumb: 'The whole chapter',
    intro: (n: number) =>
      `All ${n} verses of this chapter on one page. Read straight through, or press play and follow each verse as it is recited.`,
    overview: 'Chapter overview',
    other: 'हिन्दी में पढ़ें',
    verse: (c: number, v: number) => `Verse ${c}.${v}`,
    deeper: 'Go deeper into this verse',
    prev: 'Previous chapter',
    next: 'Next chapter',
  },
  hi: {
    gita: 'भगवद् गीता',
    chapter: (n: number) => `अध्याय ${n}`,
    crumb: 'पूरा अध्याय',
    intro: (n: number) =>
      `इस अध्याय के सभी ${n} श्लोक एक ही पृष्ठ पर। शुरू से अंत तक पढ़ें, या पाठ चलाएँ और हर श्लोक के साथ साथ चलें।`,
    overview: 'अध्याय का परिचय',
    other: 'अंग्रेज़ी में पढ़ें',
    verse: (c: number, v: number) => `श्लोक ${c}.${v}`,
    deeper: 'इस श्लोक को गहराई से समझें',
    prev: 'पिछला अध्याय',
    next: 'अगला अध्याय',
  },
} as const

export default async function ChapterReader({ chapter, lang }: { chapter: number; lang: Locale }) {
  const ch = getChapter(chapter)
  if (!ch) notFound()
  const t = COPY[lang]
  const verses = await getChapterVerses(chapter)

  const tracks: PlayAllTrack[] = []
  const hasAudio = new Set<number>()
  for (const v of verses) {
    const a = getVerseAudio(chapter, v.verse)
    if (!a) continue
    tracks.push({ verse: v.verse, src: verseAudioUrl(a.audio) })
    hasAudio.add(v.verse)
  }

  const other: Locale = lang === 'hi' ? 'en' : 'hi'
  const prevCh = chapter > 1 ? getChapter(chapter - 1) : undefined
  const nextCh = chapter < 18 ? getChapter(chapter + 1) : undefined
  const name = (c: { enName: string; hiName: string }) => (lang === 'hi' ? c.hiName : c.enName)

  return (
    <main className="gita-main">
      <BlogTracker pageName={lang === 'hi' ? 'Gita Chapter Read Mode HI' : 'Gita Chapter Read Mode'} />
      <ReadModeTracker chapter={chapter} lang={lang} verseCount={verses.length} />

      <nav className="gita-crumb" aria-label={lang === 'hi' ? 'ब्रेडक्रम्ब' : 'Breadcrumb'}>
        <a href={lang === 'hi' ? '/hi/gita' : '/gita'} data-mp-location="read_mode_crumb_gita">{t.gita}</a>
        <span className="sep">›</span>
        <a href={chapterUrl(chapter, lang)} data-mp-location="read_mode_crumb_chapter">{t.chapter(chapter)}</a>
        <span className="sep">›</span>
        <span>{t.crumb}</span>
      </nav>

      <div className="gita-eyebrow">
        {t.chapter(chapter)} · {lang === 'hi' ? ch.hiTitle : ch.enTitle}
      </div>
      <h1 className="gita-h1">{name(ch)}</h1>
      <p className="gita-lede">{chapterLede(chapter, lang) ?? (lang === 'hi' ? ch.hiTitle : ch.enTitle)}</p>
      <p className="rd-intro">{t.intro(verses.length)}</p>
      <div className="rd-backlinks">
        <a href={chapterUrl(chapter, lang)} data-mp-location="read_mode_overview">{t.overview}</a>
        <a href={readModeUrl(chapter, other)} hrefLang={other} lang="hi" data-mp-location="read_mode_lang_switch">
          {t.other}
        </a>
      </div>

      <ChapterProgress chapter={chapter} total={ch.totalVerses} lang={lang} />
      <PlayAllPlayer chapter={chapter} lang={lang} tracks={tracks} />

      <VerseList className="rd-verses">
        {verses.map((v) => {
          const useHindi = lang === 'hi' && hindiOk(v)
          const meaning = lang === 'hi' ? (useHindi ? v.hindiTranslation : v.englishTranslation) : v.englishTranslation
          return (
            <VerseCard
              key={v.verse}
              as="li"
              id={`v${v.verse}`}
              size="compact"
              lang="sa"
              locale={lang === 'hi' && !useHindi ? 'en' : lang}
              original={padas(v.sanskrit)}
              meaning={meaning}
              label={
                <span className="rd-verse-label">
                  <a className="rd-verse-num" href={verseUrl(chapter, v.verse, lang)} data-mp-location={`read_mode_verse_num_${v.verse}`}>
                    {t.verse(chapter, v.verse)}
                  </a>
                  <ReadTick chapter={chapter} verse={v.verse} lang={lang} />
                </span>
              }
              actions={
                <div className="rd-verse-actions">
                  <a className="rd-deeper" href={verseUrl(chapter, v.verse, lang)} data-mp-location={`read_mode_verse_deeper_${v.verse}`}>
                    {t.deeper} <span aria-hidden="true">→</span>
                  </a>
                  {hasAudio.has(v.verse) && <VerseListenButton chapter={chapter} verse={v.verse} lang={lang} />}
                </div>
              }
            />
          )
        })}
      </VerseList>

      <div className="gita-pn">
        <a
          className={`gita-pn-link ${prevCh ? '' : 'disabled'}`}
          href={prevCh ? readModeUrl(prevCh.number, lang) : '#'}
          data-mp-location="read_mode_prev_chapter"
        >
          <div className="gita-pn-label">← {t.prev}</div>
          {prevCh && <div className="gita-pn-target">{prevCh.number}. {name(prevCh)}</div>}
        </a>
        <a
          className={`gita-pn-link right ${nextCh ? '' : 'disabled'}`}
          href={nextCh ? readModeUrl(nextCh.number, lang) : '#'}
          data-mp-location="read_mode_next_chapter"
        >
          <div className="gita-pn-label">{t.next} →</div>
          {nextCh && <div className="gita-pn-target">{nextCh.number}. {name(nextCh)}</div>}
        </a>
      </div>
    </main>
  )
}
