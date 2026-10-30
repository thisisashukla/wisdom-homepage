'use client'

/**
 * Sankalp counter: pick 7, 11, 21 or 108 recitations, or a 40-day vow (one a
 * day). Each full recitation adds a bead to the outer ring of 108 around the
 * mala. Saved on this device only (localStorage, try/catch).
 */

import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/mixpanel'
import {
  baseProps,
  COUNTER_EMPTY,
  COUNTER_KEY,
  goalTarget,
  readStore,
  writeStore,
  type BeadInfo,
  type CounterGoal,
  type CounterState,
  type HcLocale,
} from '@/lib/funnels/hanuman-chalisa/shared'
import Mala from './Mala'

const GOALS: { goal: CounterGoal; title: string; sub: string }[] = [
  { goal: 7, title: '7', sub: 'A short sitting' },
  { goal: 11, title: '11', sub: 'With family, on a Tuesday or Saturday' },
  { goal: 21, title: '21', sub: 'A longer sitting' },
  { goal: 108, title: '108', sub: 'One full round of the mala' },
  { goal: 'vow40', title: '40 days', sub: 'Once a day for 40 days' },
]

const localDate = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default function Counter({ beads, page }: { beads: BeadInfo[]; page: string }) {
  const locale: HcLocale = 'en'
  const [s, setS] = useState<CounterState>(COUNTER_EMPTY)
  const [ready, setReady] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    setS(readStore<CounterState>(COUNTER_KEY, COUNTER_EMPTY))
    setReady(true)
  }, [])

  const save = (n: CounterState) => {
    setS(n)
    writeStore(COUNTER_KEY, n)
  }

  const setGoal = (goal: CounterGoal) => {
    save({ goal, count: 0, days: [], startedAt: localDate(), reached: false })
    setMsg('')
    trackEvent('Counter Goal Set', { ...baseProps(page, locale), goal: String(goal) })
  }

  const target = s.goal ? goalTarget(s.goal) : 0
  const isVow = s.goal === 'vow40'
  const today = localDate()
  const doneToday = isVow && s.days.includes(today)

  const count = () => {
    if (!s.goal) return
    let n: CounterState
    if (isVow) {
      if (doneToday) return
      const days = [...s.days, today]
      n = { ...s, days, count: days.length }
    } else {
      n = { ...s, count: s.count + 1 }
    }
    const reachedNow = !s.reached && n.count >= target
    if (reachedNow) n.reached = true
    save(n)
    trackEvent('Recitation Counted', { ...baseProps(page, locale), count: n.count, goal: String(s.goal) })
    if (reachedNow) {
      trackEvent('Counter Goal Reached', { ...baseProps(page, locale), goal: String(s.goal) })
      setMsg(isVow ? 'Forty days kept. Jai Hanuman.' : `${target} recitations complete. Jai Hanuman.`)
    } else {
      setMsg(isVow ? `Day ${n.count} of 40 counted.` : `${n.count} of ${target}.`)
    }
  }

  const undo = () => {
    if (!s.goal || s.count === 0) return
    if (isVow) {
      const days = s.days.slice(0, -1)
      save({ ...s, days, count: days.length, reached: days.length >= target })
    } else {
      save({ ...s, count: s.count - 1, reached: s.count - 1 >= target })
    }
    setMsg('One taken off.')
  }

  const reset = () => {
    if (window.confirm('Clear this sankalp and choose a new one?')) {
      save(COUNTER_EMPTY)
      setMsg('')
    }
  }

  const picking = !ready || !s.goal
  const shown = Math.min(s.count, 108)

  return (
    <div className="hc-counter">
      <div className="hc-counter-mala">
        <Mala
          beads={beads}
          locale={locale}
          page={page}
          mode="anchor"
          currentId={null}
          outer={picking ? 0 : shown}
          outerGoal={!picking && target <= 108 ? target : null}
          label="Mala of 43 beads, one for each line of the text below"
          caption="The outer ring gains a bead for each full recitation. The inner beads jump to a line of the text below."
        >
          <span className="hc-mala-big" aria-hidden="true">
            {picking ? 108 : s.count}
          </span>
          <span className="hc-mala-sub" aria-hidden="true">
            {picking ? 'beads on the outer ring' : isVow ? 'of 40 days' : `of ${target}`}
          </span>
        </Mala>
      </div>

      {picking ? (
        <div className="hc-counter-panel">
          <h2 className="hc-h2">Choose your sankalp</h2>
          <ul className="hc-goals">
            {GOALS.map((g) => (
              <li key={String(g.goal)}>
                <button type="button" className="hc-goal" onClick={() => setGoal(g.goal)} disabled={!ready}>
                  <strong>{g.title}</strong>
                  <span>{g.sub}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="hc-note">Your count stays on this device. Nothing is sent anywhere.</p>
        </div>
      ) : (
        <div className="hc-counter-panel">
          <p className="hc-status" role="status" aria-live="polite">
            {msg || (isVow ? `${s.count} of 40 days kept.` : `${s.count} of ${target} recitations.`)}
          </p>
          <div className="hc-counter-acts">
            <button type="button" className="hc-btn hc-btn-primary" onClick={count} disabled={doneToday || (s.reached && isVow)}>
              {isVow ? (doneToday ? 'Done for today' : 'I recited it today') : 'I finished one recitation'}
            </button>
            <button type="button" className="hc-btn" onClick={undo} disabled={s.count === 0}>
              Undo
            </button>
            <button type="button" className="hc-btn" onClick={reset}>
              New sankalp
            </button>
          </div>
          <p className="hc-note">Your count stays on this device. Nothing is sent anywhere.</p>
        </div>
      )}
    </div>
  )
}
