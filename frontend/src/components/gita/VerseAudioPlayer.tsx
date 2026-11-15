'use client'

import React, { useRef, useState, useCallback, useEffect } from 'react'
import type { AudioTimestamp } from '@/lib/gita'
import { verseAudioUrl, verseUrl } from '@/lib/gitaUrls'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import SanskritText from './SanskritText'

interface Props {
  audioSrc: string
  timestamps: AudioTimestamp[]
  /** Full Sanskrit shloka text (with dandas) for rendering with karaoke highlight. */
  text: string
  chapter?: number
  verse?: number
  /** UI language for the caption and button labels. */
  locale?: 'en' | 'hi'
  /**
   * Next verse of the Gita. When the recitation ends, a "listen to the next verse" link appears;
   * it opens the next verse page with #listen, which starts its recitation (or, where the browser
   * blocks autoplay, pulses the play button so one tap carries on).
   */
  next?: { chapter: number; verse: number } | null
}

const LISTEN_HASH = '#listen'

export default function VerseAudioPlayer({ audioSrc, timestamps, text, chapter, verse, locale = 'en', next = null }: Props) {
  const hi = locale === 'hi'
  const [ended, setEnded] = useState(false)
  const [nudge, setNudge] = useState(false)
  const chained = useRef(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const rafRef = useRef<number>(0)
  const hasTracked = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  // Last word reached so far, tracked separately from activeIdx so brief gaps between
  // word timestamps don't flash the whole verse back to its dimmed "upcoming" state.
  const [revealIdx, setRevealIdx] = useState(timestamps.length)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [loadError, setLoadError] = useState(false)

  const findActiveIdx = useCallback(
    (t: number) => {
      for (let i = 0; i < timestamps.length; i++) {
        if (t >= timestamps[i].start && t < timestamps[i].end) return i
      }
      return -1
    },
    [timestamps],
  )

  const findRevealIdx = useCallback(
    (t: number) => {
      let idx = -1
      for (let i = 0; i < timestamps.length; i++) {
        if (t >= timestamps[i].start) idx = i
        else break
      }
      return idx
    },
    [timestamps],
  )

  const tick = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    const t = audio.currentTime
    setCurrentTime(t)
    setActiveIdx(findActiveIdx(t))
    setRevealIdx(findRevealIdx(t))
    if (!audio.paused) rafRef.current = requestAnimationFrame(tick)
  }, [findActiveIdx, findRevealIdx])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio || loadError) return
    if (audio.paused) audio.play().catch(() => setLoadError(true))
    else audio.pause()
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onPlay = () => {
      setPlaying(true)
      setNudge(false)
      setEnded(false)
      rafRef.current = requestAnimationFrame(tick)
      if (!hasTracked.current) {
        hasTracked.current = true
        trackEvent(EVENTS.ShlokaPlayed, {
          chapter,
          verse,
          shloka: chapter && verse ? `${chapter}.${verse}` : undefined,
          page: window.location.pathname,
          trigger: chained.current ? 'chain' : 'tap',
        })
      }
    }
    const onPause = () => { setPlaying(false); cancelAnimationFrame(rafRef.current) }
    const onEnded = () => {
      setEnded(true)
      setPlaying(false)
      setActiveIdx(-1)
      setRevealIdx(timestamps.length)
      setCurrentTime(0)
      cancelAnimationFrame(rafRef.current)
    }
    const onMeta = () => setDuration(audio.duration)
    const onError = () => setLoadError(true)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('error', onError)
    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('error', onError)
      cancelAnimationFrame(rafRef.current)
    }
  }, [tick])

  // Arrived from the previous verse's "listen next": carry the recitation on.
  useEffect(() => {
    if (typeof window === 'undefined' || window.location.hash !== LISTEN_HASH) return
    const audio = audioRef.current
    if (!audio) return
    chained.current = true
    history.replaceState(null, '', window.location.pathname + window.location.search)
    audio.play().catch(() => setNudge(true))
  }, [])

  const fmt = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  return (
    <div className="verse-audio-player">
      <audio
        ref={audioRef}
        src={verseAudioUrl(audioSrc)}
        preload="metadata"
      />

      <SanskritText text={text} activeIdx={activeIdx} revealIdx={revealIdx} className="verse-audio-words" />

      <div className="verse-audio-controls">
        <button
          className={`verse-audio-btn${nudge ? ' is-nudge' : ''}`}
          onClick={toggle}
          aria-label={hi ? (playing ? 'पाठ रोकें' : 'संस्कृत पाठ सुनें') : (playing ? 'Pause recitation' : 'Play Sanskrit recitation')}
          disabled={loadError}
          title={loadError ? (hi ? 'ऑडियो उपलब्ध नहीं' : 'Audio unavailable') : undefined}
        >
          {playing ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <div className="verse-audio-caption">
          <a href="/tts" className="verse-audio-label" data-mp-location="verse_audio_credit">
            {hi ? 'संस्कृत पाठ' : 'Sanskrit recitation'}
          </a>
          <span className="verse-audio-time">
            {nudge ? (hi ? 'सुनना जारी रखने के लिए दबाएँ' : 'Tap to keep listening') : <>{fmt(currentTime)}{duration ? ` / ${fmt(duration)}` : ''}</>}
          </span>
        </div>
      </div>
      {ended && next && (
        <a
          className="verse-audio-next"
          href={verseUrl(next.chapter, next.verse, locale) + LISTEN_HASH}
          data-mp-location={`verse_${chapter}_${verse}_audio_next`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          {hi ? `अगला श्लोक सुनें · ${next.chapter}.${next.verse}` : `Listen to ${next.chapter}.${next.verse} next`}
        </a>
      )}
    </div>
  )
}
