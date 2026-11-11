'use client'

/**
 * "Continue from chapter 3, verse 33" card for returning readers.
 *
 *   <ResumeCard lang="en" location="gita_index" />
 *
 * Renders null for anyone who has not opened a verse page yet, and null on the server, so
 * new visitors never see an empty box. Pages load it with next/dynamic (ssr: false), so its
 * code is not in the page's first load. lang="auto" uses the language the reader last read in.
 * The main link goes to the last verse in the language the reader last read it in.
 * Sends Resume Card Viewed once when shown and Resume Card Clicked on any link
 * ({ item_id, item_type, read_count, location, target, position }).
 */

import { useEffect, useRef } from 'react'
import chaptersJson from '@/content/gita/chapters.json'
import { EVENTS, trackEvent, trackEventBeacon } from '@/lib/mixpanel'
import { DISPLAY_TOTAL_VERSES, getLast, getSaved, readCount, type ReadingLang } from '@/lib/readingProgress'
import { verseItemId, verseUrl } from '@/lib/gitaUrls'
import { useReadingTick } from './useReading'
import '@/components/site/site.css'
import './reader.css'

type Props = {
  /** UI language of the card copy; 'auto' follows the language the reader last read in. */
  lang: ReadingLang | 'auto'
  /** Analytics location, e.g. "home", "gita_index", "hi_gita_index". Default "resume_card". */
  location?: string
  /** List up to `savedLimit` saved verses under the main link. Default true. */
  showSaved?: boolean
  savedLimit?: number
  className?: string
}

const CHAPTER_NAMES = new Map(
  (chaptersJson as { number: number; enName: string; hiName: string }[]).map((c) => [c.number, c]),
)


const COPY = {
  en: {
    eyebrow: 'Pick up where you left off',
    title: (ch: number, vs: number) => `Continue from chapter ${ch}, verse ${vs}`,
    progress: (n: number, total: number) => `${n} of ${total} verses read`,
    cta: 'Keep reading',
    saved: 'Verses you saved',
    aria: 'Continue reading the Bhagavad Gita',
  },
  hi: {
    eyebrow: 'जहाँ रुके थे, वहीं से',
    title: (ch: number, vs: number) => `अध्याय ${ch}, श्लोक ${vs} से आगे पढ़ें`,
    progress: (n: number, total: number) => `${total} में से ${n} श्लोक पढ़े`,
    cta: 'पढ़ना जारी रखें',
    saved: 'आपके सहेजे हुए श्लोक',
    aria: 'भगवद् गीता आगे पढ़ें',
  },
} as const

export default function ResumeCard({ lang: langProp, location = 'resume_card', showSaved = true, savedLimit = 3, className = '' }: Props) {
  const tick = useReadingTick()
  const viewed = useRef(false)

  const last = tick === false ? null : getLast()
  const lang: ReadingLang = langProp === 'auto' ? last?.lang ?? 'en' : langProp
  const t = COPY[lang] ?? COPY.en
  const count = tick === false ? 0 : Math.min(readCount(), DISPLAY_TOTAL_VERSES)
  const saved =
    tick === false || !showSaved
      ? []
      : getSaved()
          .filter((s) => !(last && s.chapter === last.ch && s.verse === last.vs))
          .slice(0, Math.max(0, savedLimit))

  useEffect(() => {
    if (!last || viewed.current) return
    viewed.current = true
    trackEvent(EVENTS.ResumeCardViewed, {
      read_count: count,
      saved_count: saved.length,
      location,
      item_id: verseItemId(last.ch, last.vs),
      item_type: 'verse',
    })
  }, [last, count, saved.length, location])

  if (!last) return null

  const pct = Math.max(2, Math.round((count / DISPLAY_TOTAL_VERSES) * 100))
  const onClick = (ch: number, vs: number, target: 'resume' | 'saved', position?: number) =>
    trackEventBeacon(EVENTS.ResumeCardClicked, {
      read_count: count,
      location,
      target,
      position,
      item_id: verseItemId(ch, vs),
      item_type: 'verse',
    })

  return (
    <section className={`rd-resume ${className}`.trim()} aria-label={t.aria} lang={lang}>
      <div className="rd-resume-main">
        <div className="rd-resume-text">
          <p className="sx-eyebrow">{t.eyebrow}</p>
          <p className="rd-resume-title">{t.title(last.ch, last.vs)}</p>
          {count > 0 && (
            <div className="rd-progress">
              <div className="rd-progress-bar" aria-hidden="true">
                <span style={{ width: `${pct}%` }} />
              </div>
              <span className="rd-progress-label">{t.progress(count, DISPLAY_TOTAL_VERSES)}</span>
            </div>
          )}
        </div>
        <a
          className="sx-btn sx-btn--primary"
          href={verseUrl(last.ch, last.vs, last.lang)}
          hrefLang={last.lang}
          data-mp-tracked
          onClick={() => onClick(last.ch, last.vs, 'resume')}
        >
          {t.cta} <span aria-hidden="true">→</span>
        </a>
      </div>

      {saved.length > 0 && (
        <div className="rd-resume-saved">
          <p className="rd-resume-saved-head">{t.saved}</p>
          <ul>
            {saved.map((s, i) => {
              const name = CHAPTER_NAMES.get(s.chapter)
              return (
                <li key={`${s.chapter}.${s.verse}`}>
                  <a
                    href={verseUrl(s.chapter, s.verse, lang)}
                    data-mp-tracked
                    onClick={() => onClick(s.chapter, s.verse, 'saved', i + 1)}
                  >
                    <span className="rd-ref">{s.chapter}.{s.verse}</span>
                    {name && <span className="rd-resume-saved-name">{lang === 'hi' ? name.hiName : name.enName}</span>}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </section>
  )
}
