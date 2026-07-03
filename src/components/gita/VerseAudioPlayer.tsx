'use client'

import React, { useRef, useState, useCallback, useEffect } from 'react'
import type { AudioTimestamp } from '@/lib/gita'
import { trackEvent } from '@/lib/mixpanel'
import SanskritText from './SanskritText'

interface Props {
  audioSrc: string
  timestamps: AudioTimestamp[]
  /** Full Sanskrit shloka text (with dandas) for rendering with karaoke highlight. */
  text: string
  chapter?: number
  verse?: number
}

export default function VerseAudioPlayer({ audioSrc, timestamps, text, chapter, verse }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const rafRef = useRef<number>(0)
  const hasTracked = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
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

  const tick = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    const t = audio.currentTime
    setCurrentTime(t)
    setActiveIdx(findActiveIdx(t))
    if (!audio.paused) rafRef.current = requestAnimationFrame(tick)
  }, [findActiveIdx])

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
      rafRef.current = requestAnimationFrame(tick)
      if (!hasTracked.current) {
        hasTracked.current = true
        trackEvent('Shloka Played', {
          chapter,
          verse,
          shloka: chapter && verse ? `${chapter}.${verse}` : undefined,
          page: window.location.pathname,
        })
      }
    }
    const onPause = () => { setPlaying(false); cancelAnimationFrame(rafRef.current) }
    const onEnded = () => {
      setPlaying(false)
      setActiveIdx(-1)
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

  const fmt = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60).toString().padStart(2, '0')
    return `${m}:${sec}`
  }

  return (
    <div className="verse-audio-player">
      <audio
        ref={audioRef}
        src={`https://pheysuesndqmmsogtdbt.supabase.co/storage/v1/object/public/wisdom-homepage/audio/bhagavad_gita/${audioSrc.replace('gita/', '')}`}
        preload="metadata"
      />

      <SanskritText text={text} activeIdx={activeIdx} className="verse-audio-words" />

      <div className="verse-audio-controls">
        <button
          className="verse-audio-btn"
          onClick={toggle}
          aria-label={playing ? 'Pause recitation' : 'Play Sanskrit recitation'}
          disabled={loadError}
          title={loadError ? 'Audio unavailable' : undefined}
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
          <span className="verse-audio-label">Sanskrit recitation</span>
          <span className="verse-audio-time">
            {fmt(currentTime)}{duration ? ` / ${fmt(duration)}` : ''}
          </span>
        </div>
      </div>
    </div>
  )
}
