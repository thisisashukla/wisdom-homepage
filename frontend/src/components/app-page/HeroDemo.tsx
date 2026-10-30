'use client'

import React, { useEffect, useRef, useState } from 'react'

type Moment = { tag: string; said: string; dev: [string, string]; en: string; ref: string }

/** Three real moments, each answered by the verse the app would bring back. */
const MOMENTS: Moment[] = [
  {
    tag: 'Fear of failing',
    said: 'I’m so scared I’ll fail.',
    dev: ['कर्मण्येवाधिकारस्ते', 'मा फलेषु कदाचन'],
    en: 'The work is yours. The result never was.',
    ref: 'Bhagavad Gita 2.47',
  },
  {
    tag: 'A racing mind',
    said: 'My mind won’t switch off at night.',
    dev: ['यतो यतो निश्चरति', 'मनश्चञ्चलमस्थिरम्'],
    en: 'Wherever the restless mind wanders, bring it back.',
    ref: 'Bhagavad Gita 6.26',
  },
  {
    tag: 'Comparison',
    said: 'Everyone my age seems so far ahead.',
    dev: ['श्रेयान्स्वधर्मो विगुणः', 'परधर्मात्स्वनुष्ठितात्'],
    en: 'Better your own path walked imperfectly than another’s walked well.',
    ref: 'Bhagavad Gita 3.35',
  },
]

type Phase = 'type' | 'arrow' | 'verse' | 'out'

export default function HeroDemo() {
  const [i, setI] = useState(0)
  const [phase, setPhase] = useState<Phase>('verse')
  const [typed, setTyped] = useState(MOMENTS[0].said.length)
  const [still, setStill] = useState(true)
  const rootRef = useRef<HTMLDivElement>(null)
  const visible = useRef(true)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    setStill(false)
    setTyped(0)
    setPhase('type')

    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0.05 })
    if (rootRef.current) io.observe(rootRef.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (still) return
    const m = MOMENTS[i]
    const timers: number[] = []
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms))

    if (phase === 'type') {
      let n = 0
      const tick = window.setInterval(() => {
        n += 1
        setTyped(n)
        if (n >= m.said.length) {
          window.clearInterval(tick)
          later(() => setPhase('arrow'), 380)
        }
      }, 42)
      return () => {
        window.clearInterval(tick)
        timers.forEach(clearTimeout)
      }
    }
    if (phase === 'arrow') later(() => setPhase('verse'), 720)
    if (phase === 'verse') {
      const hold = () => {
        if (visible.current && !document.hidden) setPhase('out')
        else later(hold, 1200)
      }
      later(hold, 6200)
    }
    if (phase === 'out')
      later(() => {
        setI((x) => (x + 1) % MOMENTS.length)
        setTyped(0)
        setPhase('type')
      }, 650)
    return () => timers.forEach(clearTimeout)
  }, [phase, i, still])

  const m = MOMENTS[i]
  const showArrow = phase === 'arrow' || phase === 'verse'
  const showVerse = phase === 'verse'

  return (
    <div className="ap-stage" ref={rootRef} data-phase={phase} data-still={still ? '' : undefined}>
      <p className="ap-sr">
        For example, you say “I’m so scared I’ll fail” and Wisdom answers with Bhagavad Gita 2.47: the work is yours, the
        result never was.
      </p>

      <svg className="ap-ring" viewBox="0 0 400 400" aria-hidden="true">
        <circle cx="200" cy="200" r="196" />
        <circle cx="200" cy="200" r="150" />
        {Array.from({ length: 24 }).map((_, k) => (
          <line key={k} x1="200" y1="54" x2="200" y2="8" transform={`rotate(${k * 15} 200 200)`} />
        ))}
      </svg>

      <div className="ap-arch" aria-hidden="true">
        <img src="/assets/app-page/battlefield_dusk.webp" alt="" width={900} height={1350} loading="eager" />
        <span className="ap-arch-shade" />
      </div>

      <div className={`ap-bubble${phase === 'out' ? ' is-out' : ''}`} key={`b${i}`} aria-hidden="true">
        <small>You</small>
        <span className="ap-bubble-q">
          “{m.said.slice(0, typed)}
          {typed >= m.said.length ? '”' : <span className="ap-caret" />}
        </span>
      </div>

      <svg className={`ap-arrow${showArrow ? ' is-on' : ''}`} key={`a${i}`} viewBox="0 0 220 180" aria-hidden="true">
        <path className="ap-arrow-line" d="M20 12 C 150 10, 214 70, 160 150" />
        <path className="ap-arrow-head" d="M146 132 L160 152 L178 136" />
      </svg>

      <div className="ap-float ap-float-a">
        <article className={`ap-verse${showVerse ? ' is-on' : ''}${phase === 'out' ? ' is-out' : ''}`} key={`v${i}`} aria-hidden="true">
          <p className="ap-verse-tag">
            <svg viewBox="0 0 24 24" width="13" height="13"><path d="M12 3c2 3 2 6 0 9-2-3-2-6 0-9zm0 9c3-2 6-2 9 0-3 2-6 2-9 0zm0 0c-3-2-6-2-9 0 3 2 6 2 9 0zm0 0c2 3 2 6 0 9-2-3-2-6 0-9z" fill="currentColor" /></svg>
            For you · {m.tag}
          </p>
          <p className="ap-verse-dev" lang="sa">
            <span style={{ '--l': 0 } as React.CSSProperties}>{m.dev[0]}</span>
            <span style={{ '--l': 1 } as React.CSSProperties}>{m.dev[1]}</span>
          </p>
          <p className="ap-verse-en">
            {m.en.split(' ').map((w, k) => (
              <span key={k} style={{ '--w': k } as React.CSSProperties}>
                {w}{' '}
              </span>
            ))}
          </p>
          <p className="ap-verse-ref">{m.ref}</p>
        </article>
      </div>

      <div className="ap-float ap-float-b" aria-hidden="true">
        <div className={`ap-hlisten${showVerse ? ' is-on' : ''}`}>
          <span className="ap-listen-play">
            <svg viewBox="0 0 24 24" width="12" height="12"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" /></svg>
          </span>
          <span className="ap-bars ap-bars-sm">
            {Array.from({ length: 14 }).map((_, k) => (
              <i key={k} style={{ '--i': k } as React.CSSProperties} />
            ))}
          </span>
          <span className="ap-hlisten-t">Day 1 · 2 min</span>
        </div>
      </div>
    </div>
  )
}
