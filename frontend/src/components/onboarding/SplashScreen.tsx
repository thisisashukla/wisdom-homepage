'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { D, EASE, haptic, reducedMotion } from './motion'
import { LOGO_SPLASH } from '@/lib/onboarding/profile'

/**
 * Welcome (wisdom/app/screens/onboarding/Ob01_SplashScreen.tsx). The logo on
 * its own yellow field with three slow ripples, then it rises to its place as
 * the field clears and the words are lit in its wake. A deck of three paper
 * cards: on each, a worry in the ICP's words; a lotus draws a line through it,
 * and the shloka that answers it arrives, then its English, then the source.
 * The card drops behind the deck and the next is pushed forward.
 */
const PAIRS = [
  { when: 'Morning', worry: 'If I drop one thing, it all falls apart.', lines: ['Let it all go.', 'Take refuge in me alone.'], sanskrit: ['सर्वधर्मान्परित्यज्य', 'मामेकं शरणं व्रज'], ref: 'Bhagavad Gita 18.66' },
  { when: 'Afternoon', worry: "I'm too worried that I'll fail.", lines: ['The work is yours.', 'The result never was.'], sanskrit: ['कर्मण्येवाधिकारस्ते', 'मा फलेषु कदाचन'], ref: 'Bhagavad Gita 2.47' },
  { when: 'Tonight', worry: "I can't get over my addictions.", lines: ['Raise yourself by yourself.', 'Do not let yourself sink.'], sanskrit: ['उद्धरेदात्मनात्मानं', 'नात्मानमवसादयेत्'], ref: 'Bhagavad Gita 6.5' },
] as const

const B = D.breath
const later = (bag: ReturnType<typeof setTimeout>[], fn: () => void, ms: number) => bag.push(setTimeout(fn, ms))

export default function SplashScreen({
  logoTarget,
  onLanded,
  onBegin,
  onHaveAccount,
}: {
  logoTarget: () => DOMRect | null
  onLanded: () => void
  onBegin: () => void
  onHaveAccount: () => void
}) {
  const [phase, setPhase] = useState<'field' | 'flight' | 'lit'>('field')
  const [front, setFront] = useState(0)
  const [slots, setSlots] = useState([0, 1, 2])
  const [dropping, setDropping] = useState<number | null>(null)
  const [beat, setBeat] = useState([0, 0, 0]) // 0 none · 1 struck · 2 shloka · 3 line 1 · 4 line 2 · 5 source
  const [deckIn, setDeckIn] = useState(false)
  const [floor, setFloor] = useState(false)
  const [cardH, setCardH] = useState(0)
  const splashLogo = useRef<HTMLImageElement>(null)
  const field = useRef<HTMLDivElement>(null)
  const cards = useRef<(HTMLDivElement | null)[]>([])
  const worries = useRef<(HTMLSpanElement | null)[]>([])
  const lotus = useRef<(HTMLSpanElement | null)[]>([])
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const alive = useRef(true)

  // Every card takes the tallest card's height, so the deck never jumps.
  useLayoutEffect(() => {
    const h = Math.max(...cards.current.map((c) => c?.scrollHeight ?? 0))
    if (h) setCardH(h)
  }, [])

  const setCardBeat = (c: number, b: number) => setBeat((p) => p.map((x, i) => (i === c ? b : x)))

  // The lotus rides along the strike, line by line, in reading order.
  const drawStrike = (c: number) => {
    const span = worries.current[c]
    const l = lotus.current[c]
    if (!span || !l) return
    const host = span.parentElement!.getBoundingClientRect()
    const rects = Array.from(span.getClientRects())
    const total = rects.reduce((n, r) => n + r.width, 0) || 1
    const frames: Keyframe[] = []
    let acc = 0
    rects.forEach((r, k) => {
      const y = r.top - host.top + r.height * 0.5 - 8
      frames.push({ offset: acc / total + (k ? 0.0001 : 0), transform: `translate(${r.left - host.left - 8}px, ${y}px)`, opacity: 1 })
      acc += r.width
      frames.push({ offset: Math.min(1, acc / total), transform: `translate(${r.right - host.left - 8}px, ${y}px)`, opacity: 1 })
    })
    if (frames.length) {
      frames[0].opacity = 0
      frames[frames.length - 1].opacity = 0
      l.animate(frames, { duration: D.deliberate, easing: EASE.premium, fill: 'forwards' })
    }
  }

  const playCard = (c: number, first: boolean) => {
    if (!alive.current) return
    const t = timers.current
    let at = D.normal
    later(t, () => { setCardBeat(c, 1); drawStrike(c) }, at)
    later(t, () => haptic(6), at + D.deliberate)
    at += D.deliberate
    later(t, () => setCardBeat(c, 2), at)
    at += D.normal
    later(t, () => setCardBeat(c, 3), at)
    later(t, () => setCardBeat(c, 4), at + 120)
    at += 120 + D.normal
    later(t, () => setCardBeat(c, 5), at)
    if (first) later(t, () => setFloor(true), D.normal + D.deliberate + D.normal * 2)
    at += D.fast + B * 2
    later(t, () => turnDeck(c), at)
  }

  const turnDeck = (f: number) => {
    if (!alive.current) return
    const next = (f + 1) % 3
    const back = (f + 2) % 3
    setDropping(f)
    later(timers.current, () => {
      setSlots((s) => s.map((x, i) => (i === next ? 0 : i === back ? 1 : x)))
    }, D.fast)
    later(timers.current, () => {
      setCardBeat(f, 0)
      setSlots((s) => s.map((x, i) => (i === f ? 2 : x)))
      setDropping(null)
      setFront(next)
      playCard(next, false)
    }, D.deliberate)
  }

  useEffect(() => {
    alive.current = true
    const t = timers.current
    if (reducedMotion()) {
      setPhase('lit')
      onLanded()
      setDeckIn(true)
      setBeat([5, 0, 0])
      setFloor(true)
      return () => { alive.current = false; t.forEach(clearTimeout) }
    }
    later(t, () => {
      const target = logoTarget()
      const me = splashLogo.current
      if (!target || !me) return
      const from = me.getBoundingClientRect()
      const dx = target.left + target.width / 2 - (from.left + from.width / 2)
      const dy = target.top + target.height / 2 - (from.top + from.height / 2)
      setPhase('flight')
      me.animate(
        [{ transform: 'translate(0,0) scale(2.25)' }, { transform: `translate(${dx}px, ${dy}px) scale(1)` }],
        { duration: B * 1.3, easing: EASE.premium, fill: 'forwards' },
      )
      field.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: B, delay: D.slow, easing: EASE.calm, fill: 'forwards' })
      later(t, () => {
        onLanded()
        setPhase('lit')
        setDeckIn(true)
        later(t, () => playCard(0, true), D.normal)
      }, B * 1.3)
    }, B * 1.6)
    return () => { alive.current = false; t.forEach(clearTimeout) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className={`ob-hero ob-splash-hero is-${phase}`}>
        <div className="ob-logo-slot" aria-hidden="true" />
        <h1 className="ob-title">
          <span className="ob-lit" style={{ '--d': `${B}ms`, '--t': `${B * 1.4 * 0.45}ms` } as React.CSSProperties}>One Gita verse a day,</span>
          <em className="ob-lit" style={{ '--d': `${B + B * 1.4 * 0.2}ms`, '--t': `${B * 1.4 * 0.5}ms` } as React.CSSProperties}>tuned to your life.</em>
        </h1>
        <p className="ob-sub ob-lit" style={{ '--d': `${B + B * 1.4 * 0.5}ms`, '--t': `${B * 1.4 * 0.5}ms` } as React.CSSProperties}>
          Chosen for what&apos;s on your mind.
        </p>
      </div>

      <div className="ob-deck-zone">
        <div
          className={`ob-deck${deckIn ? ' is-in' : ''}`}
          style={{ height: cardH ? cardH + 28 : undefined }}
          aria-label={`${PAIRS[front].when}. ${PAIRS[front].worry} ${PAIRS[front].sanskrit.join(' ')} ${PAIRS[front].lines.join(' ')} ${PAIRS[front].ref}`}
          role="img"
        >
          {PAIRS.map((card, i) => (
            <div
              key={i}
              ref={(el) => { cards.current[i] = el }}
              className={`ob-deck-card slot-${slots[i]}${dropping === i ? ' is-dropping' : ''}`}
              style={{ minHeight: cardH || undefined, zIndex: dropping === i ? 0 : 10 - slots[i] }}
              aria-hidden="true"
            >
              <p className="ob-card-when">{card.when}</p>
              <p className="ob-worry-row">
                <span ref={(el) => { worries.current[i] = el }} className={`ob-worry${beat[i] >= 1 ? ' is-struck' : ''}`}>“{card.worry}”</span>
                <span className="ob-lotus" ref={(el) => { lotus.current[i] = el }}><Icon name="lotus" weight="duotone" size={16} /></span>
              </p>
              <div className="ob-answer">
                <div className={`ob-shloka${beat[i] >= 2 ? ' is-in' : ''}`}>
                  {card.sanskrit.map((s) => <span key={s} lang="sa">{s}</span>)}
                </div>
                <div className="ob-gloss">
                  {card.lines.map((l, k) => <span key={l} className={beat[i] >= 3 + k ? 'is-in' : ''}>{l}</span>)}
                </div>
                <p className={`ob-answer-source${beat[i] >= 5 ? ' is-in' : ''}`}>— {card.ref}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`ob-foot ob-splash-floor${floor ? ' is-in' : ''}`}>
        <button type="button" className="ob-cta" onClick={() => { haptic(12); onBegin() }}>
          <span className="ob-cta-live" aria-hidden="true" />
          <span className="ob-cta-label">Get started</span>
        </button>
        <button type="button" className="ob-text-link" onClick={onHaveAccount}>I already have an account</button>
      </div>

      {phase !== 'lit' && (
        <div className="ob-splash" aria-hidden="true">
          <div className="ob-splash-field" ref={field} />
          <div className={`ob-splash-centre${phase === 'flight' ? ' is-flying' : ''}`}>
            <span className="ob-ripple" />
            <span className="ob-ripple is-2" />
            <span className="ob-ripple is-3" />
            <img ref={splashLogo} src={LOGO_SPLASH} alt="" width={48} height={48} className="ob-splash-logo" />
          </div>
        </div>
      )}
    </>
  )
}
