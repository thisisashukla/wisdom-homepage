'use client'

/**
 * The listening engine: one <audio> element that walks a list of verses, part by part
 * (intro narration, recitation, body narration; recitation only in paath mode), without a page load.
 *
 *   const eng = useListenEngine({ verses, mode, onVerseDone, onEnd, label })
 *   <audio ref={eng.audioRef} />
 *
 * - Every play() carries a token; a rejection from an older call is ignored.
 * - A blocked first play (autoplay rules) sets `blocked`, so the page can ask for one tap.
 * - A part that fails to load is skipped after a short pause, so one bad file never stops a session.
 * - The next part's file is warmed with a detached Audio(preload) to keep the gaps short.
 * - Media Session: title and position on the lock screen; play, pause, next and previous verse
 *   from the lock screen and headphones.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import { verseSegments, type ListenMode, type ListenVerse, type Segment } from '@/lib/listen'

export type EngineState = {
  idx: number
  seg: number
  playing: boolean
  blocked: boolean
  t: number
  d: number
  rate: number
}

type Opts = {
  verses: ListenVerse[]
  mode: ListenMode
  startIdx?: number
  /** Called when a verse's last part finishes. */
  onVerseDone?: (idx: number) => void
  /** Called after the last verse. Return true to keep the engine "playing" (the caller loads more). */
  onEnd?: () => void
  /** Checked when a verse ends: return false to stop there (sleep / stop after this verse). */
  shouldContinue?: () => boolean
  /** Lock-screen album line, e.g. the session title. */
  label?: string
  lang?: 'en' | 'hi'
}

const RATE_KEY = 'wq_listen_rate'
export const RATES = [1, 1.15, 1.3, 0.85] as const

function readRate(): number {
  try {
    const r = Number(localStorage.getItem(RATE_KEY))
    return (RATES as readonly number[]).includes(r) ? r : 1
  } catch {
    return 1
  }
}

export function useListenEngine({ verses, mode, startIdx = 0, onVerseDone, onEnd, shouldContinue, label = 'Bhagavad Gita', lang = 'en' }: Opts) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [st, setSt] = useState<EngineState>({ idx: startIdx, seg: 0, playing: false, blocked: false, t: 0, d: 0, rate: 1 })
  const pos = useRef({ idx: startIdx, seg: 0 })
  const token = useRef(0)
  const wantPlay = useRef(false)
  const raf = useRef(0)
  const warm = useRef<HTMLAudioElement | null>(null)
  const cb = useRef({ onVerseDone, onEnd, shouldContinue })
  cb.current = { onVerseDone, onEnd, shouldContinue }
  const data = useRef({ verses, mode })
  data.current = { verses, mode }

  const segsOf = (i: number): Segment[] => {
    const v = data.current.verses[i]
    return v ? verseSegments(v, data.current.mode) : []
  }

  useEffect(() => {
    setSt((s) => ({ ...s, rate: readRate() }))
  }, [])

  const metadata = useCallback(
    (i: number) => {
      if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return
      const v = data.current.verses[i]
      if (!v) return
      try {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: lang === 'hi' ? `भगवद् गीता ${v.c}.${v.v}` : `Bhagavad Gita ${v.c}.${v.v}`,
          artist: 'Wisdom',
          album: label,
          artwork: [{ src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' }],
        })
      } catch {
        // MediaMetadata unsupported
      }
    },
    [label, lang],
  )

  const warmNext = (i: number, s: number) => {
    let ni = i, ns = s + 1
    if (ns >= segsOf(ni).length) { ni = i + 1; ns = 0 }
    const next = segsOf(ni)[ns]
    if (!next) return
    try {
      if (!warm.current) warm.current = new Audio()
      warm.current.preload = 'auto'
      warm.current.src = next.src
    } catch {
      // ignore
    }
  }

  const load = useCallback((i: number, s: number, play: boolean) => {
    const a = audioRef.current
    const seg = segsOf(i)[s]
    if (!a || !seg) return
    pos.current = { idx: i, seg: s }
    wantPlay.current = play
    const my = ++token.current
    setSt((p) => ({ ...p, idx: i, seg: s, t: 0, d: seg.dur || 0 }))
    if (a.src !== seg.src) a.src = seg.src
    else a.currentTime = 0
    a.playbackRate = readRate()
    metadata(i)
    if (play) {
      a.play()
        .then(() => {
          if (my === token.current) setSt((p) => ({ ...p, blocked: false }))
        })
        .catch((e: Error) => {
          if (my !== token.current) return
          if (e && e.name === 'NotAllowedError') setSt((p) => ({ ...p, blocked: true, playing: false }))
        })
    }
    warmNext(i, s)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metadata])

  const advance = useCallback(() => {
    const { idx, seg } = pos.current
    if (seg + 1 < segsOf(idx).length) return load(idx, seg + 1, true)
    cb.current.onVerseDone?.(idx)
    const go = cb.current.shouldContinue ? cb.current.shouldContinue() : true
    if (idx + 1 < data.current.verses.length) return load(idx + 1, 0, go)
    wantPlay.current = false
    setSt((p) => ({ ...p, playing: false }))
    cb.current.onEnd?.()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load])

  // element events
  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    let last = 0
    const tick = (now: number) => {
      if (now - last > 90) {
        last = now
        setSt((p) => ({ ...p, t: a.currentTime, d: a.duration && isFinite(a.duration) ? a.duration : p.d }))
      }
      if (!a.paused) raf.current = requestAnimationFrame(tick)
    }
    const onPlay = () => {
      setSt((p) => ({ ...p, playing: true, blocked: false }))
      cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(tick)
    }
    const onPause = () => {
      cancelAnimationFrame(raf.current)
      if (!a.ended) setSt((p) => ({ ...p, playing: false }))
    }
    const onEnded = () => advance()
    const onError = () => {
      if (!wantPlay.current) return
      const my = token.current
      setTimeout(() => {
        if (my === token.current) advance()
      }, 800)
    }
    a.addEventListener('play', onPlay)
    a.addEventListener('pause', onPause)
    a.addEventListener('ended', onEnded)
    a.addEventListener('error', onError)
    return () => {
      cancelAnimationFrame(raf.current)
      a.removeEventListener('play', onPlay)
      a.removeEventListener('pause', onPause)
      a.removeEventListener('ended', onEnded)
      a.removeEventListener('error', onError)
    }
  }, [advance])

  const play = useCallback(() => {
    const a = audioRef.current
    if (!a) return
    if (!a.src) return load(pos.current.idx, pos.current.seg, true)
    wantPlay.current = true
    a.play().catch(() => setSt((p) => ({ ...p, blocked: true })))
  }, [load])
  const pause = useCallback(() => {
    wantPlay.current = false
    audioRef.current?.pause()
  }, [])
  const toggle = useCallback(() => (audioRef.current && !audioRef.current.paused ? pause() : play()), [pause, play])
  const goto = useCallback((i: number, autoplay = true) => {
    if (i < 0 || i >= data.current.verses.length) return
    load(i, 0, autoplay)
  }, [load])
  const next = useCallback(() => goto(pos.current.idx + 1, true), [goto])
  const prev = useCallback(() => {
    const a = audioRef.current
    // Restart the verse if we are a few seconds in; otherwise go back one.
    if (a && (pos.current.seg > 0 || a.currentTime > 4)) return goto(pos.current.idx, true)
    goto(pos.current.idx - 1, true)
  }, [goto])
  const cycleRate = useCallback(() => {
    const cur = readRate()
    const nextRate = RATES[(RATES.indexOf(cur as (typeof RATES)[number]) + 1) % RATES.length]
    try {
      localStorage.setItem(RATE_KEY, String(nextRate))
    } catch {
      // ignore
    }
    if (audioRef.current) audioRef.current.playbackRate = nextRate
    setSt((p) => ({ ...p, rate: nextRate }))
    return nextRate
  }, [])

  // One voice at a time: another player starting pauses this one, and this one pauses the rest.
  useEffect(() => {
    const onAnyPlay = (e: Event) => {
      const a = audioRef.current
      const target = e.target as HTMLMediaElement | null
      if (!a || !target || !(target instanceof HTMLMediaElement)) return
      if (target === a) {
        document.querySelectorAll('audio, video').forEach((m) => {
          if (m !== a && !(m as HTMLMediaElement).paused) (m as HTMLMediaElement).pause()
        })
      } else if (!a.paused) {
        wantPlay.current = false
        a.pause()
      }
    }
    document.addEventListener('play', onAnyPlay, true)
    return () => document.removeEventListener('play', onAnyPlay, true)
  }, [])

  // Media Session controls
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return
    const ms = navigator.mediaSession
    const set = (a: MediaSessionAction, h: MediaSessionActionHandler | null) => {
      try {
        ms.setActionHandler(a, h)
      } catch {
        // unsupported action
      }
    }
    set('play', () => play())
    set('pause', () => pause())
    set('nexttrack', () => next())
    set('previoustrack', () => prev())
    return () => {
      for (const a of ['play', 'pause', 'nexttrack', 'previoustrack'] as MediaSessionAction[]) set(a, null)
    }
  }, [play, pause, next, prev])

  return { audioRef, state: st, play, pause, toggle, goto, next, prev, cycleRate, segments: segsOf(st.idx) }
}
