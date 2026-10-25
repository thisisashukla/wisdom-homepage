'use client'

import React, { useEffect, useState } from 'react'
import { Cta } from './parts'
import { haptic, reducedMotion } from './motion'
import { EMOTIONS, FEELING_ART, emotionById, emotionForNeed, type Emotion, type NeedId } from '@/lib/onboarding/profile'

/**
 * Screen 2 · "How are you feeling today?" (wisdom/app/screens/onboarding/Ob02_GoalScreen.tsx).
 * One large portrait, the words under it: heavy first (Anxious, Hurt, Lost…),
 * then light (Hopeful, Grateful, Peaceful…) on a warm tint. Choosing a word
 * brings its portrait forward with a soft pop, the word in gold italic and the
 * line it sounds like in their head. Two portraits rest faded either side.
 * Until a word is chosen the portrait drifts slowly through the faces.
 * Every word routes to one of the six needs; the word itself is kept too.
 */
const NEED_ORDER: NeedId[] = ['quiet', 'nerve', 'replay', 'faith', 'stick', 'gita']
const IDLE_STEP = 1900
const WELCOME = "Whatever it is, it's welcome here."

export default function FeelingScreen({
  initialEmotion,
  initialNeed,
  onDone,
}: {
  initialEmotion?: string
  initialNeed?: NeedId
  onDone: (e: Emotion) => void
}) {
  const [picked, setPicked] = useState<string | undefined>(() => (emotionById(initialEmotion) ?? emotionForNeed(initialNeed))?.id)
  const [idle, setIdle] = useState(0)
  const [pop, setPop] = useState(0)
  const chosen = emotionById(picked)

  useEffect(() => {
    if (picked || reducedMotion()) return
    const t = setInterval(() => { setIdle((i) => i + 1); setPop((p) => p + 1) }, IDLE_STEP)
    return () => clearInterval(t)
  }, [picked])

  const at = chosen ? Math.max(0, NEED_ORDER.indexOf(chosen.art)) : idle % NEED_ORDER.length
  const n = NEED_ORDER.length
  const front = FEELING_ART[NEED_ORDER[at]]
  const left = FEELING_ART[NEED_ORDER[(at + n - 1) % n]]
  const right = FEELING_ART[NEED_ORDER[(at + 1) % n]]

  const choose = (e: Emotion) => {
    haptic()
    setPicked(e.id)
    setPop((p) => p + 1)
  }

  return (
    <>
      <div className="ob-scroll ob-feel">
        <div className="ob-hero">
          <div className="ob-logo-slot" aria-hidden="true" />
          <h1 className="ob-title ob-rise" style={{ '--d': '0ms' } as React.CSSProperties}>
            How are you<br /><em>feeling today?</em>
          </h1>
          <p className="ob-sub ob-rise" style={{ '--d': '180ms' } as React.CSSProperties}>Name what&apos;s in your heart right now.</p>
        </div>
        <div className="ob-feel-hero ob-pop" style={{ '--d': '320ms' } as React.CSSProperties} aria-hidden="true">
          <img className="ob-feel-ghost is-left" src={left} alt="" width={64} height={64} />
          <img className="ob-feel-ghost is-right" src={right} alt="" width={64} height={64} />
          <span className="ob-feel-halo" />
          <span key={pop} className={`ob-feel-front${chosen ? ' is-chosen' : ''}`}>
            <img src={front} alt="" width={156} height={156} />
          </span>
        </div>
        <div className="ob-feel-words" aria-live="polite">
          {chosen && <p className="ob-feel-name">{chosen.label}</p>}
          <p className="ob-feel-line">{chosen ? `“${chosen.line}”` : WELCOME}</p>
        </div>
        <div className="ob-pills" role="radiogroup" aria-label="How are you feeling today?">
          {EMOTIONS.map((e, i) => {
            const on = e.id === picked
            return (
              <button
                key={e.id}
                type="button"
                role="radio"
                aria-checked={on}
                aria-label={`${e.label}. ${e.line}`}
                className={`ob-pill ob-rise${e.tone === 'light' ? ' is-light' : ''}${on ? ' is-on' : ''}`}
                style={{ '--d': `${660 + i * 35}ms`, '--dy': '12px' } as React.CSSProperties}
                onClick={() => choose(e)}
              >
                {e.label}
              </button>
            )
          })}
        </div>
      </div>
      <Cta
        disabled={!chosen}
        delay={960}
        onClick={() => {
          if (!chosen) return
          haptic(12)
          onDone(chosen)
        }}
      >
        Continue
      </Cta>
    </>
  )
}
