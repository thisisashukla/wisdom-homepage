'use client'

/**
 * "Listen with meaning" on a verse page: the narrated intro, the recitation and the narrated
 * meaning of this one verse, with the sentence being spoken marked. When it ends it offers the
 * session this verse sits in, from this verse on (Listen mode).
 *
 *   <VerseListen chapter={2} verse={47} lang="en" session={{ id: '2-5', n: 5, title: '…' }} />
 *
 * The session JSON is fetched when the browser is idle, so a tap plays at once (iOS only allows
 * audio to start inside the tap).
 * Events: Listen Started / Listen Verse Completed with scope 'single'; the follow-on link sends
 * Link Clicked (location verse_listen_session).
 */

import { useEffect, useRef, useState } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import { verseItemId } from '@/lib/gitaUrls'
import { fetchSession, minutesLabel, sessionUrl, type ListenLang, type ListenVerse } from '@/lib/listen'
import { useListenEngine } from './useListenEngine'
import './listen.css'

const T = {
  en: { btn: 'Listen with meaning', pause: 'Pause', resume: 'Resume', parts: { intro: 'Before the verse', recitation: 'The verse', body: 'What it says' },
        more: (title: string, m: string) => `Keep listening: ${title}, ${m}`, again: 'Listen again' },
  hi: { btn: 'अर्थ सहित सुनें', pause: 'रोकें', resume: 'फिर चलाएँ', parts: { intro: 'श्लोक से पहले', recitation: 'श्लोक', body: 'इसका अर्थ' },
        more: (title: string, m: string) => `आगे सुनते रहें: ${title}, ${m}`, again: 'फिर से सुनें' },
} as const

export default function VerseListen({ chapter, verse, lang, session }: {
  chapter: number; verse: number; lang: ListenLang
  session: { id: string; n: number; title: string; minutes: number } | null
}) {
  const t = T[lang]
  const [v, setV] = useState<ListenVerse | null>(null)
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState(false)
  const pendingPlay = useRef(false)
  const tracked = useRef(false)

  const verses = v ? [v] : []
  const eng = useListenEngine({
    verses, mode: 'meaning', lang, label: lang === 'hi' ? 'भगवद् गीता' : 'Bhagavad Gita',
    onVerseDone: () => {
      setDone(true)
      trackEvent(EVENTS.ListenVerseCompleted, { session_id: session?.id ?? null, item_id: verseItemId(chapter, verse), item_type: 'verse', index: 1, mode: 'meaning', scope: 'single' })
    },
  })

  useEffect(() => {
    if (!session) return
    const load = () =>
      fetchSession(session.id, lang)
        .then((d) => {
          const hit = d.verses.find((x) => x.c === chapter && x.v === verse) ?? null
          setV(hit)
        })
        .catch(() => {})
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number }
    if (w.requestIdleCallback) w.requestIdleCallback(load)
    else setTimeout(load, 1200)
  }, [session, lang, chapter, verse])

  useEffect(() => {
    if (v && pendingPlay.current) {
      pendingPlay.current = false
      eng.goto(0, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [v])

  if (!session) return null
  const seg = eng.segments[eng.state.seg]
  const caption = open && seg && seg.kind !== 'recitation' ? split(seg.text, eng.state.t, eng.state.d || seg.dur) : null

  const onClick = () => {
    if (!tracked.current) {
      tracked.current = true
      trackEvent(EVENTS.ListenStarted, { session_id: session.id, mode: 'meaning', scope: 'single', source: 'verse_page', item_id: verseItemId(chapter, verse), lang })
    }
    setOpen(true)
    if (done) {
      setDone(false)
      eng.goto(0, true)
      return
    }
    if (!v) {
      pendingPlay.current = true
      return
    }
    if (!eng.state.playing && eng.state.t === 0 && eng.state.seg === 0) eng.goto(0, true)
    else eng.toggle()
  }

  const label = done ? t.again : eng.state.playing ? t.pause : open ? t.resume : t.btn

  return (
    <div className="lv" lang={lang}>
      <audio ref={eng.audioRef} preload="none" />
      <button type="button" className="lv-btn" onClick={onClick} aria-expanded={open}>
        {eng.state.playing ? (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
        )}
        {label}
      </button>
      {open && (
        <div className="lv-panel" aria-live="off">
          {seg && <p className="lv-part">{t.parts[seg.kind]}</p>}
          {caption ? (
            <p className="lv-cap">
              {caption.parts.map((p, j) => (
                <span key={j} className={j === caption.at ? 'is-now' : j < caption.at ? 'is-past' : ''}>{p} </span>
              ))}
            </p>
          ) : v && seg?.kind === 'recitation' ? (
            <p className="lv-cap">{v.tr}</p>
          ) : null}
          {done && (
            <a className="lv-more" href={`${sessionUrl(chapter, session.n, lang)}?from=${verse}&play=1`} data-mp-location="verse_listen_session">
              {t.more(session.title, minutesLabel(session.minutes * 60, lang))}
            </a>
          )}
        </div>
      )}
    </div>
  )
}

function split(text: string, t: number, d: number) {
  const parts = text.split(/(?<=[.!?।])\s+/).filter(Boolean)
  if (!d || parts.length < 2) return { parts, at: 0 }
  const total = parts.reduce((s, p) => s + p.length, 0)
  const target = (t / d) * total
  let acc = 0
  for (let i = 0; i < parts.length; i++) {
    acc += parts[i].length
    if (acc >= target) return { parts, at: i }
  }
  return { parts, at: parts.length - 1 }
}
