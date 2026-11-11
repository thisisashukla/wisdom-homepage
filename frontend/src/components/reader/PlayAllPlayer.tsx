'use client'

/**
 * Plays every verse of a chapter in order, following along on the page.
 *
 *   <PlayAllPlayer chapter={2} lang="en" tracks={[{ verse: 1, src: verseAudioUrl(...) }, ...]} />
 *
 * Sits inline until the first play, then docks to the bottom of the screen (its slot keeps
 * its height, so nothing jumps). The current verse's element (id="v{n}") gets the class
 * "is-playing" and is scrolled to the middle of the screen.
 * Each verse that starts playing dispatches VERSE_AUDIO_EVENT ({ chapter, verse }), which
 * ReadModeTracker / ReadingTracker count as a read.
 * <VerseListenButton> (or any window event PLAY_FROM_EVENT with { chapter, verse }) jumps here.
 * Sends Play All Started (first play), Play All Completed (last verse finished) and
 * Player Control Clicked { control, item_id: 'bg-ch-N', position, location } for pause, resume,
 * next, prev, restart and listen_from_here.
 *
 * Every play() gets a token. A rejection from an older call (AbortError when the source changes
 * mid-load, or a load error after the player already moved on) is ignored, so skipping never
 * leaves the player showing Paused while audio plays. Status also follows the element's own
 * play / pause events (lock screen and headphone controls).
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import { VERSE_AUDIO_EVENT, type ReadingLang } from '@/lib/readingProgress'
import { chapterItemId } from '@/lib/gitaUrls'
import './reader.css'

export const PLAY_FROM_EVENT = 'wq:playall-from'

export type PlayAllTrack = { verse: number; src: string }

type Props = {
  chapter: number
  lang: ReadingLang
  tracks: PlayAllTrack[]
  /** Prefix of the verse element ids on the page. Default "v" (id="v12"). */
  anchorPrefix?: string
  /** Analytics location. Default "read_mode". */
  location?: string
}

type Status = 'idle' | 'playing' | 'paused' | 'done'

type Control = 'pause' | 'resume' | 'next' | 'prev' | 'restart' | 'listen_from_here'

const COPY = {
  en: {
    idleTitle: 'Listen to the whole chapter',
    idleSub: (n: number) => `${n} verses recited in Sanskrit. Read along as each one plays.`,
    verse: (ch: number, vs: number) => `Verse ${ch}.${vs}`,
    pos: (i: number, n: number) => `${i} of ${n}`,
    paused: 'Paused',
    doneTitle: 'You heard the whole chapter',
    doneSub: 'Let it settle, or hear it once more.',
    play: 'Play the chapter',
    pause: 'Pause',
    resume: 'Resume',
    again: 'Hear it again',
    prev: 'Previous verse',
    next: 'Next verse',
    region: 'Chapter recitation',
  },
  hi: {
    idleTitle: 'पूरा अध्याय सुनें',
    idleSub: (n: number) => `${n} श्लोकों का संस्कृत पाठ। हर श्लोक के साथ साथ पढ़ते चलें।`,
    verse: (ch: number, vs: number) => `श्लोक ${ch}.${vs}`,
    pos: (i: number, n: number) => `${n} में से ${i}`,
    paused: 'रुका हुआ',
    doneTitle: 'आपने पूरा अध्याय सुन लिया',
    doneSub: 'इसे मन में उतरने दें, या एक बार फिर सुनें।',
    play: 'अध्याय सुनें',
    pause: 'रोकें',
    resume: 'जारी रखें',
    again: 'फिर से सुनें',
    prev: 'पिछला श्लोक',
    next: 'अगला श्लोक',
    region: 'अध्याय का पाठ',
  },
} as const

const reducedMotion = () => {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

const Icon = ({ d }: { d: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d={d} />
  </svg>
)
const PLAY = 'M8 5v14l11-7z'
const PAUSE = 'M6 19h4V5H6v14zm8-14v14h4V5h-4z'
const PREV = 'M6 6h2v12H6zm3.5 6l8.5 6V6z'
const NEXT = 'M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z'

export default function PlayAllPlayer({ chapter, lang, tracks, anchorPrefix = 'v', location = 'read_mode' }: Props) {
  const t = COPY[lang] ?? COPY.en
  const audioRef = useRef<HTMLAudioElement>(null)
  const idxRef = useRef(0)
  const statusRef = useRef<Status>('idle')
  const startedFrom = useRef<number | null>(null)
  const played = useRef<Set<number>>(new Set())
  const advanceTimer = useRef<number>(0)
  /** Consecutive load failures; two in a row means audio is unreachable, so stop instead of racing ahead. */
  const failStreak = useRef(0)
  /** Token of the latest play() call; rejections from older calls are ignored. */
  const playSeq = useRef(0)
  const [idx, setIdx] = useState(0)
  const [status, setStatusState] = useState<Status>('idle')
  const [progress, setProgress] = useState(0)

  const setStatus = (s: Status) => {
    statusRef.current = s
    setStatusState(s)
  }

  const itemId = chapterItemId(chapter)

  const control = useCallback(
    (c: Control, verse?: number) => {
      trackEvent(EVENTS.PlayerControlClicked, { control: c, item_id: itemId, item_type: 'chapter', position: verse, location })
    },
    [itemId, location],
  )

  /** play() with a token: only the latest call may mark the player paused, and never for an AbortError. */
  const safePlay = useCallback((audio: HTMLAudioElement) => {
    const n = ++playSeq.current
    audio.play().catch((e: unknown) => {
      if (n !== playSeq.current) return
      if ((e as DOMException)?.name === 'AbortError') return
      setStatus('paused')
    })
  }, [])

  const highlight = useCallback(
    (i: number | null) => {
      document.querySelectorAll('.is-playing[data-rd-playing]').forEach((el) => {
        el.classList.remove('is-playing')
        el.removeAttribute('data-rd-playing')
      })
      if (i === null || !tracks[i]) return
      const el = document.getElementById(`${anchorPrefix}${tracks[i].verse}`)
      if (!el) return
      el.classList.add('is-playing')
      el.setAttribute('data-rd-playing', '')
      el.scrollIntoView({ block: 'center', behavior: reducedMotion() ? 'auto' : 'smooth' })
    },
    [tracks, anchorPrefix],
  )

  const playAt = useCallback(
    (i: number) => {
      const audio = audioRef.current
      const track = tracks[i]
      if (!audio || !track) return
      window.clearTimeout(advanceTimer.current)
      idxRef.current = i
      setIdx(i)
      setProgress(0)
      audio.src = track.src
      audio.currentTime = 0
      highlight(i)
      if (startedFrom.current === null) {
        startedFrom.current = track.verse
        played.current = new Set()
        trackEvent(EVENTS.PlayAllStarted, {
          item_id: itemId,
          item_type: 'chapter',
          position: track.verse,
          verses: tracks.length,
          location,
        })
      }
      setStatus('playing')
      safePlay(audio)
    },
    [tracks, itemId, location, highlight, safePlay],
  )

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    const s = statusRef.current
    if (s === 'idle') return playAt(0)
    if (s === 'done') {
      control('restart', tracks[0]?.verse)
      startedFrom.current = null
      return playAt(0)
    }
    const verse = tracks[idxRef.current]?.verse
    if (s === 'playing') {
      control('pause', verse)
      window.clearTimeout(advanceTimer.current)
      playSeq.current++
      audio.pause()
      setStatus('paused')
      return
    }
    // paused: resume the current verse (or start it if it never loaded)
    control('resume', verse)
    if (!audio.src) return playAt(idxRef.current)
    if (audio.ended) return idxRef.current < tracks.length - 1 ? playAt(idxRef.current + 1) : playAt(idxRef.current)
    setStatus('playing')
    safePlay(audio)
  }

  const step = useCallback(
    (d: number) => {
      const next = idxRef.current + d
      if (next < 0 || next >= tracks.length) return
      control(d > 0 ? 'next' : 'prev', tracks[next].verse)
      playAt(next)
    },
    [tracks, playAt, control],
  )

  // audio element events
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onPlaying = () => {
      failStreak.current = 0
      const track = tracks[idxRef.current]
      if (!track) return
      played.current.add(track.verse)
      try {
        window.dispatchEvent(new CustomEvent(VERSE_AUDIO_EVENT, { detail: { chapter, verse: track.verse, source: 'play_all' } }))
      } catch {
        /* ignore */
      }
      try {
        if ('mediaSession' in navigator && typeof MediaMetadata !== 'undefined') {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: lang === 'hi' ? `भगवद् गीता ${chapter}.${track.verse}` : `Bhagavad Gita ${chapter}.${track.verse}`,
            artist: 'Wisdom',
          })
        }
      } catch {
        /* ignore */
      }
    }
    const onTime = () => {
      if (audio.duration > 0) setProgress(audio.currentTime / audio.duration)
    }
    // Lock screen, headphones or the OS paused or resumed the element: follow it.
    const onPause = () => {
      const n = playSeq.current
      window.setTimeout(() => {
        if (n === playSeq.current && audio.paused && !audio.ended && statusRef.current === 'playing') setStatus('paused')
      }, 0)
    }
    const onPlay = () => {
      if (statusRef.current === 'paused') setStatus('playing')
    }
    const onEnded = () => {
      const i = idxRef.current
      if (i < tracks.length - 1) {
        advanceTimer.current = window.setTimeout(() => {
          if (statusRef.current === 'playing') playAt(i + 1)
        }, 600)
        return
      }
      setStatus('done')
      setProgress(1)
      highlight(null)
      trackEvent(EVENTS.PlayAllCompleted, {
        item_id: itemId,
        item_type: 'chapter',
        position: startedFrom.current,
        verses_played: played.current.size,
        verses: tracks.length,
        location,
      })
    }
    const onError = () => {
      // One missing file should not stop the chapter: move on to the next verse.
      // Two failures in a row means the audio cannot load at all, so pause where we are.
      if (statusRef.current !== 'playing') return
      failStreak.current += 1
      const i = idxRef.current
      if (failStreak.current < 2 && i < tracks.length - 1) playAt(i + 1)
      else setStatus('paused')
    }
    audio.addEventListener('playing', onPlaying)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('error', onError)
    return () => {
      audio.removeEventListener('playing', onPlaying)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('error', onError)
    }
  }, [tracks, chapter, lang, itemId, location, playAt, highlight])

  // "Listen from here" buttons
  useEffect(() => {
    const onFrom = (e: Event) => {
      const d = (e as CustomEvent<{ chapter?: number; verse?: number }>).detail
      if (!d || (d.chapter !== undefined && d.chapter !== chapter)) return
      const i = tracks.findIndex((tr) => tr.verse === d.verse)
      if (i < 0) return
      control('listen_from_here', tracks[i].verse)
      // Each new start point counts as a new Play All Started.
      startedFrom.current = null
      playAt(i)
    }
    window.addEventListener(PLAY_FROM_EVENT, onFrom)
    return () => window.removeEventListener(PLAY_FROM_EVENT, onFrom)
  }, [tracks, chapter, playAt, control])

  // lock screen / headphone controls
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return
    const ms = navigator.mediaSession
    const set = (a: MediaSessionAction, h: MediaSessionActionHandler | null) => {
      try {
        ms.setActionHandler(a, h)
      } catch {
        /* unsupported action */
      }
    }
    set('nexttrack', () => step(1))
    set('previoustrack', () => step(-1))
    return () => {
      set('nexttrack', null)
      set('previoustrack', null)
    }
  }, [step])

  useEffect(
    () => () => {
      window.clearTimeout(advanceTimer.current)
      highlight(null)
      try {
        if ('mediaSession' in navigator) navigator.mediaSession.metadata = null
      } catch {
        /* ignore */
      }
    },
    [highlight],
  )

  if (!tracks.length) return null

  const current = tracks[idx]
  const docked = status === 'playing' || status === 'paused'
  const title =
    status === 'idle' ? t.idleTitle : status === 'done' ? t.doneTitle : t.verse(chapter, current.verse)
  const sub =
    status === 'idle'
      ? t.idleSub(tracks.length)
      : status === 'done'
        ? t.doneSub
        : `${t.pos(idx + 1, tracks.length)}${status === 'paused' ? ` · ${t.paused}` : ''}`
  const mainLabel = status === 'playing' ? t.pause : status === 'paused' ? t.resume : status === 'done' ? t.again : t.play

  return (
    <div className="rd-player-slot">
      <div className={`rd-player${docked ? ' rd-player--docked' : ''}`} role="region" aria-label={t.region} lang={lang}>
        <audio ref={audioRef} preload="none" />
        <button type="button" className="rd-icon-btn rd-icon-btn--main" onClick={toggle} aria-label={mainLabel} title={mainLabel}>
          <Icon d={status === 'playing' ? PAUSE : PLAY} />
        </button>
        <div className="rd-player-meta" aria-live="polite">
          <p className="rd-player-title">{title}</p>
          <p className="rd-player-sub">{sub}</p>
        </div>
        {docked && (
          <div className="rd-player-controls">
            <button type="button" className="rd-icon-btn" onClick={() => step(-1)} disabled={idx === 0} aria-label={t.prev} title={t.prev}>
              <Icon d={PREV} />
            </button>
            <button
              type="button"
              className="rd-icon-btn"
              onClick={() => step(1)}
              disabled={idx >= tracks.length - 1}
              aria-label={t.next}
              title={t.next}
            >
              <Icon d={NEXT} />
            </button>
          </div>
        )}
        {docked && (
          <div className="rd-player-progress" aria-hidden="true">
            <span style={{ width: `${Math.round(progress * 100)}%` }} />
          </div>
        )}
      </div>
    </div>
  )
}

/** Small "listen from here" button for a verse in read mode. Starts PlayAllPlayer at this verse. */
export function VerseListenButton({ chapter, verse, lang }: { chapter: number; verse: number; lang: ReadingLang }) {
  const label = lang === 'hi' ? 'यहाँ से सुनें' : 'Listen from here'
  return (
    <button
      type="button"
      className="rd-listen-btn"
      lang={lang}
      onClick={() => {
        try {
          window.dispatchEvent(new CustomEvent(PLAY_FROM_EVENT, { detail: { chapter, verse } }))
        } catch {
          /* ignore */
        }
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={PLAY} />
      </svg>
      {label}
    </button>
  )
}
