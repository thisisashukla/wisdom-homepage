'use client'

/**
 * "Continue the dialogue", pinned over the bottom of the screen: a compact Back pill and a
 * gold-edged Next pill with the next verse's one-line teaser and a round arrow button. Always on
 * screen, because moving to the next verse is what most readers do on these pages (about 9 in 10
 * clicks on verse pages are next or prev). On touch screens a horizontal swipe does the same:
 * swipe left for the next verse, right for the previous one.
 *
 *   <VerseStickyNav lang="en" current={{ chapter: 2, verse: 47 }}
 *     prev={{ chapter: 2, verse: 46, teaser: '...' }} next={{ chapter: 2, verse: 48, teaser: '...' }} />
 *
 * Swipes are ignored when they start near the screen edge (the browser's own back gesture),
 * inside form fields, audio controls, sideways-scrolling rows or [data-no-swipe], or while text
 * is selected. A one-line hint shows on the first two verse pages a touch reader opens.
 *
 * Events: Verse Nav Clicked { control: 'bar' | 'swipe', direction, from, to, lang } (beacon),
 * plus Link Clicked from BlogTracker for bar taps (location verse_<c>_<v>_bar_next / _bar_prev).
 */

import { useEffect, useRef, useState } from 'react'
import { verseUrl, type GitaLang } from '@/lib/gitaUrls'
import { EVENTS, trackEventBeacon } from '@/lib/mixpanel'
import './verse.css'

type Ref = { chapter: number; verse: number; teaser?: string }

type Props = {
  lang: GitaLang
  current: Ref
  prev: Ref | null
  next: Ref | null
}

const COPY = {
  en: {
    nav: 'Verse navigation',
    prev: (r: string) => `Previous verse ${r}`,
    back: 'Back',
    next: 'Next verse',
    hint: 'Swipe left or right to move between verses',
    end: 'The last verse of the Gita',
  },
  hi: {
    nav: 'श्लोक नेविगेशन',
    prev: (r: string) => `पिछला श्लोक ${r}`,
    back: 'पिछला',
    next: 'अगला श्लोक',
    hint: 'अगले या पिछले श्लोक के लिए दाएँ-बाएँ स्वाइप करें',
    end: 'गीता का अंतिम श्लोक',
  },
} as const

const HINT_KEY = 'wq_swipe_hint_views'
/** Count each page view once, even when effects run twice (React strict mode in dev). */
let hintCountedFor = ''
const EDGE = 24
const MIN_DX = 70

const ref = (r: Ref) => `${r.chapter}.${r.verse}`

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      {dir === 'left' ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
    </svg>
  )
}

/** True when the touch began somewhere a sideways drag means something else. */
function blocked(target: EventTarget | null): boolean {
  let el = target instanceof Element ? target : null
  while (el && el !== document.body) {
    if (el.matches('input, textarea, select, [contenteditable="true"], audio, video, [data-no-swipe], .vp-stickynav')) return true
    const style = getComputedStyle(el)
    if ((style.overflowX === 'auto' || style.overflowX === 'scroll') && el.scrollWidth > el.clientWidth + 2) return true
    el = el.parentElement
  }
  return false
}

export default function VerseStickyNav({ lang, current, prev, next }: Props) {
  const t = COPY[lang]
  const [hint, setHint] = useState(false)
  const [leaving, setLeaving] = useState<'left' | 'right' | null>(null)
  const start = useRef<{ x: number; y: number; t: number } | null>(null)

  const go = (to: Ref, direction: 'next' | 'prev', control: 'bar' | 'swipe') => {
    trackEventBeacon(EVENTS.VerseNavClicked, {
      control,
      direction,
      from: ref(current),
      to: ref(to),
      lang,
    })
    if (control === 'swipe') {
      setLeaving(direction === 'next' ? 'left' : 'right')
      window.setTimeout(() => {
        window.location.href = verseUrl(to.chapter, to.verse, lang)
      }, 140)
    }
  }

  useEffect(() => {
    const touch = window.matchMedia('(pointer: coarse)').matches
    if (!touch) return
    try {
      const here = window.location.pathname
      const seen = Number(localStorage.getItem(HINT_KEY) || '0')
      if (hintCountedFor === here) {
        setHint(seen <= 2)
      } else if (seen < 2) {
        hintCountedFor = here
        setHint(true)
        localStorage.setItem(HINT_KEY, String(seen + 1))
      }
    } catch {
      // storage blocked: no hint
    }

    const onStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) { start.current = null; return }
      const p = e.touches[0]
      if (p.clientX < EDGE || p.clientX > window.innerWidth - EDGE || blocked(e.target)) {
        start.current = null
        return
      }
      start.current = { x: p.clientX, y: p.clientY, t: Date.now() }
    }
    const onEnd = (e: TouchEvent) => {
      const s = start.current
      start.current = null
      if (!s) return
      const p = e.changedTouches[0]
      const dx = p.clientX - s.x
      const dy = p.clientY - s.y
      if (Date.now() - s.t > 700) return
      if (Math.abs(dx) < MIN_DX || Math.abs(dx) < Math.abs(dy) * 2) return
      if (window.getSelection()?.toString()) return
      if (dx < 0 && next) go(next, 'next', 'swipe')
      if (dx > 0 && prev) go(prev, 'prev', 'swipe')
    }
    document.addEventListener('touchstart', onStart, { passive: true })
    document.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      document.removeEventListener('touchstart', onStart)
      document.removeEventListener('touchend', onEnd)
    }
    // current/prev/next are fixed for the life of a verse page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!leaving) return
    document.body.setAttribute('data-vp-leaving', leaving)
    // Coming back with the browser's back button restores the page from cache: clear the slide.
    const reset = () => {
      document.body.removeAttribute('data-vp-leaving')
      setLeaving(null)
    }
    window.addEventListener('pageshow', reset)
    return () => window.removeEventListener('pageshow', reset)
  }, [leaving])

  const loc = `verse_${lang === 'hi' ? 'hi_' : ''}${current.chapter}_${current.verse}`
  const navProps = (to: Ref, direction: 'next' | 'prev') => ({
    href: verseUrl(to.chapter, to.verse, lang),
    'data-mp-location': `${loc}_bar_${direction}`,
    onClick: () => go(to, direction, 'bar'),
  })

  return (
    <>
      {next && <link rel="prefetch" href={verseUrl(next.chapter, next.verse, lang)} />}
      <nav className="vp-stickynav" aria-label={t.nav} lang={lang}>
        {hint && <p className="vp-stickynav-hint" aria-hidden="true">{t.hint}</p>}
        <div className="vp-stickynav-row">
          {prev ? (
            <a className="vp-navbtn vp-navbtn--prev" aria-label={t.prev(ref(prev))} {...navProps(prev, 'prev')}>
              <span className="vp-navbtn-icon" aria-hidden="true"><Chevron dir="left" /></span>
              <span className="vp-navbtn-text">
                <span className="vp-navbtn-kicker">{t.back}</span>
                <span className="vp-navbtn-ref">{ref(prev)}</span>
              </span>
            </a>
          ) : (
            <span className="vp-navbtn vp-navbtn--prev is-off" aria-hidden="true">
              <span className="vp-navbtn-icon"><Chevron dir="left" /></span>
            </span>
          )}
          {next ? (
            <a className="vp-navbtn vp-navbtn--next" {...navProps(next, 'next')}>
              <span className="vp-navbtn-text">
                <span className="vp-navbtn-kicker">{t.next} · <b>{ref(next)}</b></span>
                {next.teaser && <span className="vp-navbtn-teaser">{next.teaser}</span>}
              </span>
              <span className="vp-navbtn-go" aria-hidden="true"><Chevron dir="right" /></span>
            </a>
          ) : (
            <span className="vp-navbtn vp-navbtn--next is-off">
              <span className="vp-navbtn-text"><span className="vp-navbtn-kicker">{t.end}</span></span>
            </span>
          )}
        </div>
      </nav>
    </>
  )
}
