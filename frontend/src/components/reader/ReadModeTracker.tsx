'use client'

/**
 * Invisible tracker for chapter read mode (/gita/chapter/N/read). Renders nothing.
 *
 *   <ReadModeTracker chapter={2} lang="en" verseCount={72} />
 *
 * - Sends Chapter Read Mode Opened on mount { item_id: 'bg-ch-N', item_type: 'chapter', verses, from }.
 *   `from` is the path of the page that linked here (same site), else 'external' or 'direct'.
 *   Links into read mode carry no ?from=; the link itself sends Link Clicked with its location.
 * - One verse at a time counts toward a read: the one nearest the middle of the screen among
 *   those at least 60% visible (or filling half the viewport). After 8 seconds on it with the
 *   tab visible it counts as read; a verse whose audio plays (VERSE_AUDIO_EVENT from
 *   PlayAllPlayer) counts at once. Each newly read verse becomes the reader's "continue from"
 *   point and sends Verse Read once.
 */

import { useEffect } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import { isRead, markVisited, VERSE_AUDIO_EVENT, type ReadingLang } from '@/lib/readingProgress'
import { chapterItemId } from '@/lib/gitaUrls'
import { recordRead, type ReadTrigger } from './recordRead'

const DWELL_SECONDS = 8

type Props = {
  chapter: number
  lang: ReadingLang
  verseCount: number
  selector?: string
  idPrefix?: string
}

/** Where the reader came from: a same-site path, 'external' or 'direct'. Old ?from= links still count. */
const cameFrom = (): string => {
  try {
    const q = new URLSearchParams(window.location.search).get('from')
    if (q) return q.slice(0, 64)
    if (!document.referrer) return 'direct'
    const ref = new URL(document.referrer)
    return ref.host === window.location.host ? ref.pathname.slice(0, 96) : 'external'
  } catch {
    return 'direct'
  }
}

export default function ReadModeTracker({
  chapter,
  lang,
  verseCount,
  selector = ".rd-verses > [id^='v']",
  idPrefix = 'v',
}: Props) {
  useEffect(() => {
    trackEvent(EVENTS.ChapterReadModeOpened, {
      item_id: chapterItemId(chapter),
      item_type: 'chapter',
      verses: verseCount,
      location: 'read_mode',
      from: cameFrom(),
    })
  }, [chapter, verseCount])

  useEffect(() => {
    const done = new Set<number>()
    const visible = new Set<number>()
    const dwell = new Map<number, number>()

    const verseOf = (el: Element): number => {
      const n = Number(el.id.slice(idPrefix.length))
      return Number.isInteger(n) && n > 0 ? n : 0
    }

    const elements = Array.from(document.querySelectorAll(selector))
    const byVerse = new Map<number, Element>()
    for (const el of elements) {
      const vs = verseOf(el)
      if (!vs) continue
      if (isRead(chapter, vs)) done.add(vs)
      else byVerse.set(vs, el)
    }

    let io: IntersectionObserver | null = null

    const finish = (vs: number, trigger: ReadTrigger) => {
      if (done.has(vs)) return
      done.add(vs)
      visible.delete(vs)
      dwell.delete(vs)
      const el = byVerse.get(vs)
      if (el && io) io.unobserve(el)
      recordRead(chapter, vs, { trigger, location: 'read_mode' })
      markVisited(chapter, vs, lang)
    }

    // "On screen": at least 60% of the verse visible, or it fills half the viewport (long verses on phones).
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            const vs = verseOf(e.target)
            if (!vs || done.has(vs)) continue
            const onScreen =
              e.isIntersecting && (e.intersectionRatio >= 0.6 || e.intersectionRect.height >= window.innerHeight * 0.5)
            if (onScreen) visible.add(vs)
            else {
              visible.delete(vs)
              dwell.delete(vs)
            }
          }
        },
        { threshold: [0, 0.25, 0.5, 0.6, 0.75, 1] },
      )
      byVerse.forEach((el) => io!.observe(el))
    }

    /** The visible verse whose centre is nearest the middle of the screen. */
    const focused = (): number => {
      const mid = window.innerHeight / 2
      let best = 0
      let bestDist = Infinity
      visible.forEach((vs) => {
        const el = byVerse.get(vs)
        if (!el) return
        const r = el.getBoundingClientRect()
        const d = Math.abs(r.top + r.height / 2 - mid)
        if (d < bestDist) {
          bestDist = d
          best = vs
        }
      })
      return best
    }

    let current = 0
    const timer = window.setInterval(() => {
      if (document.visibilityState !== 'visible' || visible.size === 0) return
      const vs = focused()
      if (!vs) return
      // Moving to another verse starts its count from zero.
      if (vs !== current) {
        if (current) dwell.delete(current)
        current = vs
      }
      const s = (dwell.get(vs) ?? 0) + 1
      dwell.set(vs, s)
      if (s >= DWELL_SECONDS) finish(vs, 'dwell')
    }, 1000)

    const onAudio = (e: Event) => {
      const d = (e as CustomEvent<{ chapter?: number; verse?: number }>).detail
      if (!d || d.chapter !== chapter || typeof d.verse !== 'number') return
      markVisited(chapter, d.verse, lang)
      finish(d.verse, 'audio')
    }
    window.addEventListener(VERSE_AUDIO_EVENT, onAudio)

    return () => {
      window.clearInterval(timer)
      window.removeEventListener(VERSE_AUDIO_EVENT, onAudio)
      io?.disconnect()
    }
  }, [chapter, lang, selector, idPrefix])

  return null
}
