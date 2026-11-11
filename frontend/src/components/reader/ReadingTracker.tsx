'use client'

/**
 * Invisible tracker for a single verse page. Renders nothing.
 *
 *   <ReadingTracker chapter={2} verse={47} lang="en" />
 *
 * On mount: remembers this verse as the reader's last place (ResumeCard links back here).
 * Marks the verse read, once, as soon as any of these happens:
 *   1. 15 seconds on the page with the tab visible (hidden time does not count);
 *   2. any <audio> element on the page starts playing (VerseAudioPlayer included), or a
 *      reader player dispatches VERSE_AUDIO_EVENT for this verse;
 *   3. the reader scrolls and the bottom of the element with id="verse-translation" is
 *      on screen or above it. The page must render that id on the translation block.
 * The first time a verse is marked read, Verse Read is sent (item_id "bg-2-47").
 */

import { useEffect, useRef } from 'react'
import { markVisited, VERSE_AUDIO_EVENT, type ReadingLang } from '@/lib/readingProgress'
import { recordRead, type ReadTrigger } from './recordRead'
import { VERSE_TRANSLATION_ID } from './ids'

const DWELL_SECONDS = 15

type Props = { chapter: number; verse: number; lang: ReadingLang }

export default function ReadingTracker({ chapter, verse, lang }: Props) {
  const done = useRef(false)

  useEffect(() => {
    done.current = false
    markVisited(chapter, verse, lang)

    const cleanups: Array<() => void> = []
    const finish = (trigger: ReadTrigger) => {
      if (done.current) return
      done.current = true
      recordRead(chapter, verse, { trigger, location: 'verse_page' })
      cleanups.forEach((fn) => fn())
    }

    // 1. visible dwell
    let seconds = 0
    const timer = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return
      seconds += 1
      if (seconds >= DWELL_SECONDS) finish('dwell')
    }, 1000)
    cleanups.push(() => window.clearInterval(timer))

    // 2. audio: 'play' does not bubble, so listen in the capture phase
    const onPlay = (e: Event) => {
      if (e.target instanceof HTMLMediaElement) finish('audio')
    }
    const onReaderAudio = (e: Event) => {
      const d = (e as CustomEvent<{ chapter?: number; verse?: number }>).detail
      if (!d || (d.chapter === chapter && d.verse === verse)) finish('audio')
    }
    document.addEventListener('play', onPlay, true)
    window.addEventListener(VERSE_AUDIO_EVENT, onReaderAudio)
    cleanups.push(() => {
      document.removeEventListener('play', onPlay, true)
      window.removeEventListener(VERSE_AUDIO_EVENT, onReaderAudio)
    })

    // 3. scrolled past the translation
    let raf = 0
    const check = () => {
      raf = 0
      const el = document.getElementById(VERSE_TRANSLATION_ID)
      if (!el || window.scrollY < 40) return
      if (el.getBoundingClientRect().bottom <= window.innerHeight) finish('scroll')
    }
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(check)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    cleanups.push(() => {
      window.removeEventListener('scroll', onScroll)
      if (raf) window.cancelAnimationFrame(raf)
    })

    return () => cleanups.forEach((fn) => fn())
  }, [chapter, verse, lang])

  return null
}
