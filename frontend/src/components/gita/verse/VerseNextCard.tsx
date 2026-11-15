/**
 * End of the verse: the next verse with its one-line teaser, and a way to read the whole
 * chapter in one scroll. Replaces the "Continue the dialogue" prev/next pair and the chapter
 * image card (prev lives in the sticky bar).
 *
 *   <VerseNextCard chapter={2} verse={47} next={{ chapter: 2, verse: 48, teaser: '...' }} lang="en" chapterName="Sankhya Yoga" />
 *
 * Server component. Links: verse_<c>_<v>_next_card, verse_<c>_<v>_read_chapter (hi: verse_hi_...).
 */
import { verseUrl, readModeUrl, type GitaLang } from '@/lib/gitaUrls'
import './verse.css'

type Props = {
  chapter: number
  verse: number
  lang: GitaLang
  next: { chapter: number; verse: number; teaser?: string } | null
  chapterName?: string
}

const COPY = {
  en: {
    next: (r: string) => `Next verse · ${r}`,
    chapter: (c: number) => `Read all of chapter ${c} in one scroll`,
    end: 'You have reached the last verse of the Gita.',
    back: 'Back to all 18 chapters',
  },
  hi: {
    next: (r: string) => `अगला श्लोक · ${r}`,
    chapter: (c: number) => `अध्याय ${c} एक साथ पढ़ें`,
    end: 'यह गीता का अंतिम श्लोक है।',
    back: 'सभी 18 अध्याय',
  },
} as const

export default function VerseNextCard({ chapter, verse, lang, next, chapterName }: Props) {
  const t = COPY[lang]
  const loc = `verse_${lang === 'hi' ? 'hi_' : ''}${chapter}_${verse}`
  return (
    <section className="vp-next" aria-label={lang === 'hi' ? 'आगे पढ़ें' : 'Keep reading'}>
      {next ? (
        <a className="vp-next-card" href={verseUrl(next.chapter, next.verse, lang)} data-mp-location={`${loc}_next_card`}>
          <span className="vp-next-body">
            <span className="vp-kicker">{t.next(`${next.chapter}.${next.verse}`)}</span>
            {next.teaser && <span className="vp-next-teaser">{next.teaser}</span>}
          </span>
          <span className="vp-next-arrow" aria-hidden="true">→</span>
        </a>
      ) : (
        <p className="vp-next-end">
          {t.end} <a href={lang === 'hi' ? '/hi/gita' : '/gita'}>{t.back}</a>
        </p>
      )}
      <a className="vp-next-chapter" href={readModeUrl(chapter, lang)} data-mp-location={`${loc}_read_chapter`}>
        {t.chapter(chapter)}
        {chapterName ? <span className="vp-next-chname"> · {chapterName}</span> : null}
      </a>
    </section>
  )
}
