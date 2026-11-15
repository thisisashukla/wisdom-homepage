'use client'

/**
 * "From your list" bar on a verse page. Shown only when the reader opened this verse from a
 * list page (quote hub, blog, topic, feeling page) that lists it; see lib/trail.ts.
 *
 *   <TrailBar chapter={2} verse={47} lang="en" next={{ chapter: 2, verse: 48 }} />
 *
 * Gives the list reader the next verse of their list, so leaving the list to read a verse in full
 * no longer ends their walk through it. On the last verse of the list it hands them on to the
 * next verse of the Gita. Renders null on the server and for readers with no trail.
 *
 * Events: Trail Bar Viewed { trail_from, trail_index, trail_total, item_id }; the links send
 * Link Clicked with location trail_next / trail_prev / trail_back / trail_continue.
 */

import { useEffect, useRef, useState } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import { verseItemId, verseUrl, type GitaLang } from '@/lib/gitaUrls'
import { placeInTrail, readTrail, trailVerseUrl, type Trail } from '@/lib/trail'
import './reader.css'

type Props = {
  chapter: number
  verse: number
  lang: GitaLang
  /** Next verse of the Gita, offered when this is the last verse of the list. */
  next?: { chapter: number; verse: number } | null
}

const COPY = {
  en: {
    eyebrow: 'Walking through',
    of: (i: number, n: number) => `${i} of ${n}`,
    next: 'Next on the list',
    prev: 'Previous',
    back: 'Back to the list',
    done: 'That was the last verse on the list.',
    cont: 'Keep reading the Gita from here',
    aria: 'Your list of verses',
  },
  hi: {
    eyebrow: 'आप इस सूची से पढ़ रहे हैं',
    of: (i: number, n: number) => `${n} में से ${i}`,
    next: 'सूची का अगला श्लोक',
    prev: 'पिछला',
    back: 'सूची पर लौटें',
    done: 'सूची का आख़िरी श्लोक यही था।',
    cont: 'यहाँ से गीता आगे पढ़ें',
    aria: 'आपकी श्लोक सूची',
  },
} as const

export default function TrailBar({ chapter, verse, lang, next }: Props) {
  const [trail, setTrail] = useState<Trail | null>(null)
  const viewed = useRef(false)

  useEffect(() => {
    setTrail(readTrail())
  }, [chapter, verse])

  const place = trail ? placeInTrail(trail, { ch: chapter, vs: verse }) : null

  useEffect(() => {
    if (!trail || !place || viewed.current) return
    viewed.current = true
    trackEvent(EVENTS.TrailBarViewed, {
      trail_from: trail.from,
      trail_index: place.index + 1,
      trail_total: trail.refs.length,
      item_id: verseItemId(chapter, verse),
      item_type: 'verse',
    })
  }, [trail, place, chapter, verse])

  if (!trail || !place) return null
  const t = COPY[lang]
  const total = trail.refs.length

  return (
    <aside className="rd-trail" aria-label={t.aria} lang={lang}>
      <div className="rd-trail-head">
        <p className="sx-eyebrow">{t.eyebrow}</p>
        <a className="rd-trail-label" href={trail.from} data-mp-location="trail_back" data-trail-ignore>
          {trail.label}
        </a>
        <span className="rd-trail-count">{t.of(place.index + 1, total)}</span>
      </div>
      <div className="rd-trail-steps" aria-hidden="true">
        {trail.refs.map((r, i) => (
          <span key={`${r.ch}.${r.vs}`} className={i < place.index ? 'is-done' : i === place.index ? 'is-here' : ''} />
        ))}
      </div>
      <div className="rd-trail-actions">
        {place.prev && (
          <a className="rd-trail-prev" href={trailVerseUrl(place.prev, lang)} data-mp-location="trail_prev" data-trail-ignore>
            <span aria-hidden="true">←</span> <span className="rd-ref">{place.prev.ch}.{place.prev.vs}</span>
          </a>
        )}
        {place.next ? (
          <a className="sx-btn sx-btn--primary rd-trail-next" href={trailVerseUrl(place.next, lang)} data-mp-location="trail_next" data-trail-ignore>
            {t.next} · {place.next.ch}.{place.next.vs} <span aria-hidden="true">→</span>
          </a>
        ) : (
          <>
            <span className="rd-trail-done">{t.done}</span>
            {next ? (
              <a className="sx-btn sx-btn--primary rd-trail-next" href={verseUrl(next.chapter, next.verse, lang)} data-mp-location="trail_continue" data-trail-ignore>
                {t.cont} <span aria-hidden="true">→</span>
              </a>
            ) : (
              <a className="rd-trail-prev" href={trail.from} data-mp-location="trail_back" data-trail-ignore>
                {t.back}
              </a>
            )}
          </>
        )}
      </div>
    </aside>
  )
}
