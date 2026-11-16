'use client'

/**
 * Listen mode session page: one 10 to 15 minute sitting of the Gita, heard verse by verse while the
 * text follows. The verse being heard lights up word by word during the recitation, and the
 * sentence being narrated is marked. At the end it rolls into the next session on the same page
 * (no reload, so the audio keeps going), unless the listener asked to stop.
 *
 * URL params: ?from=<verse> starts at that verse, ?play=1 tries to start at once (a tap on the
 * page that sent them here). Browsers that block that get one "Start" tap.
 *
 * Events: Listen Started, Listen Verse Completed, Listen Session Completed, Listen Next Session
 * Started, Listen Control Clicked (see lib/analytics/events.ts). Each verse heard to the end also
 * counts as read (recordRead, trigger 'audio').
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import SanskritText from '@/components/gita/SanskritText'
import { recordRead } from '@/components/reader/recordRead'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import { verseItemId, verseUrl } from '@/lib/gitaUrls'
import {
  fetchSession, listenHubUrl, minutesLabel, readMode, readResume, saveMode, saveResume, sessionUrl, verseSeconds,
  type ListenLang, type ListenMode, type ListenSessionData, type ListenVerse,
} from '@/lib/listen'
import { useListenEngine } from './useListenEngine'
import './listen.css'

const T = {
  en: {
    meaning: 'With meaning', paath: 'Recitation only',
    start: 'Start listening', resume: (r: string) => `Continue from ${r}`, fromTop: 'Start from the beginning',
    play: 'Play', pause: 'Pause', prev: 'Previous verse', next: 'Next verse',
    of: (i: number, n: number) => `${i} of ${n}`, left: (m: string) => `${m} left`,
    speed: 'Speed', stopAfter: 'Stop after this verse', stopping: 'Stops after this verse',
    upNext: 'Up next', nextIn: (s: number) => `Starting in ${s}`, keepGoing: 'Keep listening', stay: 'Stay here',
    done: 'You have heard this session.', allDone: 'You have heard the whole Gita.', readVerse: 'Open this verse',
    hub: 'All sessions', ch: (c: number) => `Chapter ${c}`, verses: (a: number, b: number) => `Verses ${a} to ${b}`,
    tapHint: 'Tap any verse to hear it.',
  },
  hi: {
    meaning: 'अर्थ सहित', paath: 'केवल पाठ',
    start: 'सुनना शुरू करें', resume: (r: string) => `${r} से आगे सुनें`, fromTop: 'शुरू से सुनें',
    play: 'चलाएँ', pause: 'रोकें', prev: 'पिछला श्लोक', next: 'अगला श्लोक',
    of: (i: number, n: number) => `${n} में से ${i}`, left: (m: string) => `${m} बाकी`,
    speed: 'गति', stopAfter: 'इस श्लोक के बाद रुकें', stopping: 'इस श्लोक के बाद रुकेगा',
    upNext: 'आगे', nextIn: (s: number) => `${s} में शुरू`, keepGoing: 'सुनते रहें', stay: 'यहीं रुकें',
    done: 'आपने यह सत्र सुन लिया।', allDone: 'आपने पूरी गीता सुन ली।', readVerse: 'यह श्लोक खोलें',
    hub: 'सभी सत्र', ch: (c: number) => `अध्याय ${c}`, verses: (a: number, b: number) => `श्लोक ${a} से ${b}`,
    tapHint: 'किसी भी श्लोक को छूकर सुनें।',
  },
} as const

const COUNTDOWN = 8

/** Sentence being narrated, by share of characters spoken so far. */
function sentenceAt(text: string, t: number, d: number): { parts: string[]; at: number } {
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

function karaoke(ts: [number, number][], t: number): { active: number; reveal: number } {
  let active = -1, reveal = -1
  for (let i = 0; i < ts.length; i++) {
    if (t >= ts[i][0]) reveal = i
    if (t >= ts[i][0] && t < ts[i][1]) active = i
  }
  return { active, reveal }
}

export default function ListenSession({ initial, lang }: { initial: ListenSessionData; lang: ListenLang }) {
  const t = T[lang]
  const [session, setSession] = useState(initial)
  const [mode, setMode] = useState<ListenMode>('meaning')
  const [started, setStarted] = useState(false)
  const [resumeAt, setResumeAt] = useState<number | null>(null)
  const [stopAfterVerse, setStopAfterVerse] = useState(false)
  const [ending, setEnding] = useState<{ left: number } | null>(null)
  const [finished, setFinished] = useState(false)
  const heard = useRef(0)
  const startedTracked = useRef(false)
  const userScrolledAt = useRef(0)
  const listRef = useRef<HTMLOListElement>(null)
  const stopRef = useRef(false)
  stopRef.current = stopAfterVerse

  const verses = session.verses

  const onVerseDone = useCallback(
    (i: number) => {
      const v = verses[i]
      if (!v) return
      heard.current += 1
      recordRead(v.c, v.v, { trigger: 'audio', location: 'listen' })
      trackEvent(EVENTS.ListenVerseCompleted, { session_id: session.id, item_id: verseItemId(v.c, v.v), item_type: 'verse', index: i + 1, mode, scope: 'session' })
      const nxt = verses[i + 1]
      if (nxt) saveResume({ id: session.id, chapter: session.chapter, n: session.n, lang, mode, c: nxt.c, v: nxt.v, idx: i + 1, t: Date.now() })
    },
    [verses, session, mode, lang],
  )

  const onEnd = useCallback(() => {
    trackEvent(EVENTS.ListenSessionCompleted, { session_id: session.id, verses_heard: heard.current, mode })
    if (stopRef.current) return
    if (session.next) setEnding({ left: COUNTDOWN })
    else setFinished(true)
  }, [session, mode])

  const shouldContinue = useCallback(() => {
    if (!stopRef.current) return true
    setStopAfterVerse(false)
    return false
  }, [])

  const eng = useListenEngine({ verses, mode, onVerseDone, onEnd, shouldContinue, label: session.title, lang })
  const { state } = eng
  const cur = verses[state.idx]
  const seg = eng.segments[state.seg]

  // Mode from last time; ?from / ?play; resume within this session.
  useEffect(() => {
    setMode(readMode())
    const q = new URLSearchParams(window.location.search)
    const from = Number(q.get('from'))
    let idx = from ? verses.findIndex((v) => v.v === from) : -1
    if (idx < 0) {
      const r = readResume()
      if (r && r.id === session.id && r.lang === lang && r.idx > 0 && r.idx < verses.length) setResumeAt(r.idx)
    }
    if (idx < 0) idx = 0
    eng.goto(idx, false)
    if (q.get('play') === '1') {
      startedTracked.current = false
      begin(idx, 'link')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const begin = (idx: number, source: string) => {
    setStarted(true)
    setResumeAt(null)
    eng.goto(idx, true)
    if (!startedTracked.current) {
      startedTracked.current = true
      const v = verses[idx]
      trackEvent(EVENTS.ListenStarted, { session_id: session.id, mode, scope: 'session', source, item_id: v ? verseItemId(v.c, v.v) : null, lang })
    }
  }

  useEffect(() => {
    if (state.playing) setStarted(true)
  }, [state.playing])

  // Follow the verse being heard, unless the listener is scrolling on their own.
  useEffect(() => {
    const onUser = () => (userScrolledAt.current = Date.now())
    window.addEventListener('wheel', onUser, { passive: true })
    window.addEventListener('touchmove', onUser, { passive: true })
    return () => {
      window.removeEventListener('wheel', onUser)
      window.removeEventListener('touchmove', onUser)
    }
  }, [])
  useEffect(() => {
    if (!started) return
    if (Date.now() - userScrolledAt.current < 5000) return
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${state.idx}"]`)
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' })
  }, [state.idx, state.seg, started])

  // Keep the address on the verse being heard (shareable, survives a reload).
  useEffect(() => {
    if (!started || !cur) return
    const url = `${sessionUrl(session.chapter, session.n, lang)}?from=${cur.v}`
    if (window.location.pathname + window.location.search !== url) history.replaceState(null, '', url)
  }, [started, cur, session, lang])

  // Roll into the next session.
  const goNext = useCallback(
    async (auto: boolean) => {
      const nx = session.next
      setEnding(null)
      if (!nx) return
      try {
        const data = await fetchSession(nx.id, lang)
        trackEvent(EVENTS.ListenNextSessionStarted, { from: session.id, to: nx.id, auto, mode })
        heard.current = 0
        setSession(data)
        history.replaceState(null, '', sessionUrl(data.chapter, data.n, lang))
        document.title = `${data.title} | Wisdom`
      } catch {
        window.location.href = sessionUrl(nx.chapter, nx.n, lang) + '?play=1'
      }
    },
    [session, lang, mode],
  )
  // After a session swap, start its first verse.
  const shownId = useRef(initial.id)
  useEffect(() => {
    if (shownId.current === session.id) return
    shownId.current = session.id
    eng.goto(0, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.id])
  useEffect(() => {
    if (!ending) return
    if (ending.left <= 0) {
      goNext(true)
      return
    }
    const h = setTimeout(() => setEnding((e) => (e ? { left: e.left - 1 } : e)), 1000)
    return () => clearTimeout(h)
  }, [ending, goNext])
  useEffect(() => {
    if (session.next) fetchSession(session.next.id, lang).catch(() => {})
  }, [session, lang])

  const control = (control: string, extra: Record<string, unknown> = {}) =>
    trackEvent(EVENTS.ListenControlClicked, { control, session_id: session.id, item_id: cur ? verseItemId(cur.c, cur.v) : null, ...extra })

  const switchMode = (m: ListenMode) => {
    if (m === mode) return
    setMode(m)
    saveMode(m)
    control('mode', { to: m })
    if (started) setTimeout(() => eng.goto(state.idx, state.playing), 0)
  }

  const remaining = useMemo(() => {
    let s = 0
    for (let i = state.idx; i < verses.length; i++) s += verseSeconds(verses[i], mode)
    const curSeg = eng.segments.slice(0, state.seg).reduce((a, x) => a + x.dur, 0) + Math.min(state.t, seg?.dur ?? 0)
    return Math.max(0, s - curSeg)
  }, [state.idx, state.seg, state.t, verses, mode, eng.segments, seg])

  const caption = cur && seg && seg.kind !== 'recitation' ? sentenceAt(seg.text, state.t, state.d || seg.dur) : null
  const kar = cur?.rec && seg?.kind === 'recitation' ? karaoke(cur.rec.ts, state.t) : null

  return (
    <div className={`ls ${started ? 'is-started' : ''}`} lang={lang}>
      <audio ref={eng.audioRef} preload="auto" />

      <header className="ls-head">
        <p className="ls-crumb">
          <a href={listenHubUrl(lang)} data-mp-location="listen_crumb_hub">{t.hub}</a>
          <span aria-hidden="true"> / </span>
          <span>{t.ch(session.chapter)}{session.chapterName ? `, ${session.chapterName}` : ''}</span>
        </p>
        <h1 className="ls-title">{session.title}</h1>
        <p className="ls-meta">
          {t.verses(session.from, session.to)}, {minutesLabel(session.dur[mode], lang)}
        </p>
        <div className="ls-mode" role="radiogroup" aria-label={lang === 'hi' ? 'सुनने का तरीका' : 'How to listen'}>
          {(['meaning', 'paath'] as ListenMode[]).map((m) => (
            <button key={m} type="button" role="radio" aria-checked={mode === m} className={mode === m ? 'is-on' : ''} onClick={() => switchMode(m)}>
              {t[m]}
            </button>
          ))}
        </div>
      </header>

      {!started && (
        <div className="ls-start">
          {resumeAt !== null && verses[resumeAt] ? (
            <>
              <button type="button" className="ls-start-btn" onClick={() => begin(resumeAt, 'resume')}>
                <PlayIcon /> {t.resume(`${verses[resumeAt].c}.${verses[resumeAt].v}`)}
              </button>
              <button type="button" className="ls-start-alt" onClick={() => begin(0, 'start')}>{t.fromTop}</button>
            </>
          ) : (
            <button type="button" className="ls-start-btn" onClick={() => begin(state.idx, state.blocked ? 'blocked_tap' : 'start')}>
              <PlayIcon /> {t.start}
            </button>
          )}
          <p className="ls-hint">{t.tapHint}</p>
        </div>
      )}

      <ol className="ls-verses" ref={listRef}>
        {verses.map((v, i) => (
          <VerseRow
            key={`${session.id}-${v.c}-${v.v}`}
            v={v}
            i={i}
            lang={lang}
            active={i === state.idx && started}
            heard={started && i < state.idx}
            kar={i === state.idx ? kar : null}
            caption={i === state.idx ? caption : null}
            onPick={() => {
              control('verse', { to: verseItemId(v.c, v.v) })
              if (!started) begin(i, 'verse_tap')
              else eng.goto(i, true)
            }}
            openLabel={t.readVerse}
          />
        ))}
      </ol>

      {(ending || finished) && (
        <section className="ls-end" aria-live="polite">
          <p className="ls-end-done">{session.next ? t.done : t.allDone}</p>
          {session.next && (
            <>
              <p className="ls-end-next">{t.upNext}: <strong>{session.next.title}</strong>, {minutesLabel(session.next.min * 60, lang)}</p>
              <div className="ls-end-actions">
                <button type="button" className="ls-start-btn" onClick={() => { control('next_session'); goNext(false) }}>
                  <PlayIcon /> {t.keepGoing}{ending ? ` · ${t.nextIn(ending.left)}` : ''}
                </button>
                {ending && <button type="button" className="ls-start-alt" onClick={() => { control('stay'); setEnding(null) }}>{t.stay}</button>}
              </div>
            </>
          )}
        </section>
      )}

      <div className="ls-dock" role="region" aria-label={lang === 'hi' ? 'प्लेयर' : 'Player'}>
        <div className="ls-dock-bar" aria-hidden="true">
          <span style={{ width: `${session.dur[mode] ? Math.min(100, ((session.dur[mode] - remaining) / session.dur[mode]) * 100) : 0}%` }} />
        </div>
        <div className="ls-dock-row">
          <div className="ls-dock-now">
            <span className="ls-dock-ref">
              {cur ? `${cur.c}.${cur.v}` : ''} <span className="ls-dock-of">{t.of(state.idx + 1, verses.length)}</span>
            </span>
            <span className="ls-dock-sub">{stopAfterVerse ? t.stopping : t.left(minutesLabel(remaining, lang))}</span>
          </div>
          <div className="ls-dock-ctrl">
            <button type="button" className="ls-ic" aria-label={t.prev} onClick={() => { control('prev'); eng.prev() }} disabled={state.idx === 0 && state.seg === 0}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6h2v12H6zM9.5 12 18 6v12z" /></svg>
            </button>
            <button
              type="button"
              className="ls-play"
              aria-label={state.playing ? t.pause : t.play}
              onClick={() => {
                control(state.playing ? 'pause' : 'play')
                if (!started) begin(state.idx, 'dock')
                else eng.toggle()
              }}
            >
              {state.playing ? (
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>
              ) : (
                <PlayIcon />
              )}
            </button>
            <button type="button" className="ls-ic" aria-label={t.next} onClick={() => { control('next'); eng.next() }} disabled={state.idx >= verses.length - 1}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 6h2v12h-2zM6 6l8.5 6L6 18z" /></svg>
            </button>
          </div>
          <div className="ls-dock-opts">
            <button type="button" className="ls-chip" aria-label={`${t.speed} ${state.rate}x`} onClick={() => control('speed', { to: eng.cycleRate() })}>
              {state.rate}x
            </button>
            <button type="button" className={`ls-chip ${stopAfterVerse ? 'is-on' : ''}`} aria-pressed={stopAfterVerse} title={t.stopAfter} aria-label={t.stopAfter}
              onClick={() => { control('stop_after_verse', { to: !stopAfterVerse }); setStopAfterVerse((x) => !x) }}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7zm-1 4v6l5 3 1-1.6-4-2.4V7z" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function PlayIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="ls-play-ic"><path d="M8 5v14l11-7z" /></svg>
}

function VerseRow({ v, i, lang, active, heard, kar, caption, onPick, openLabel }: {
  v: ListenVerse; i: number; lang: ListenLang; active: boolean; heard: boolean
  kar: { active: number; reveal: number } | null
  caption: { parts: string[]; at: number } | null
  onPick: () => void; openLabel: string
}) {
  const tokens = v.sa.split(/\s+/).filter(Boolean).length
  return (
    <li className={`ls-v ${active ? 'is-active' : ''} ${heard ? 'is-heard' : ''}`} data-idx={i}>
      <button type="button" className="ls-v-hit" onClick={onPick} aria-label={`${v.c}.${v.v}`}>
        <span className="ls-v-ref">{v.c}.{v.v}</span>
        {v.angle && <span className="ls-v-angle">{v.angle}</span>}
      </button>
      <div className="ls-v-sa" lang="sa">
        <SanskritText text={v.sa} activeIdx={kar ? kar.active : -1} revealIdx={kar ? kar.reveal : tokens} className="ls-sanskrit" />
      </div>
      {active && caption && caption.parts.length > 0 ? (
        <p className="ls-v-cap" aria-live="off">
          {caption.parts.map((p, j) => (
            <span key={j} className={j === caption.at ? 'is-now' : j < caption.at ? 'is-past' : ''}>{p} </span>
          ))}
        </p>
      ) : (
        <p className="ls-v-tr">{v.tr}</p>
      )}
      {active && (
        <a className="ls-v-open" href={verseUrl(v.c, v.v, lang)} data-mp-location="listen_open_verse" hrefLang={lang}>{openLabel}</a>
      )}
    </li>
  )
}
