'use client'

/**
 * Learn by heart: four lines a day over 11 days. Each line can fade word by
 * word (three steps); "I can say it" marks it learned and fills its bead
 * with gold. Progress is saved on this device (localStorage, try/catch).
 * The server renders day 1 with every word visible, so it works without JS.
 */

import { useEffect, useMemo, useState } from 'react'
import { trackEvent } from '@/lib/mixpanel'
import {
  baseProps,
  LEARN_DAYS,
  LEARN_EMPTY,
  LEARN_KEY,
  readStore,
  writeStore,
  type BeadInfo,
  type HcLocale,
  type LearnState,
} from '@/lib/funnels/hanuman-chalisa/shared'
import Mala from './Mala'

export type LearnLine = {
  id: string
  pos: number
  label: string
  awadhi: [string, string]
  iast: [string, string]
  meaning: string
  day: number
  href: string
}

const T = {
  en: {
    day: (d: number) => `Day ${d}`,
    of: (d: number) => `Day ${d} of ${LEARN_DAYS}`,
    days: 'Days',
    progress: (n: number) => `${n} of 43 lines learned`,
    fade: 'Hide more words',
    show: 'Show all words',
    say: 'I can say it',
    said: 'Learned',
    undo: 'Undo',
    done: (d: number) => `Day ${d} is done. Say the four lines once more tonight, then come back tomorrow for the next four.`,
    finished: 'You have learned all 43 lines. Say the whole Chalisa once from memory, slowly, and check it against the text.',
    nextDay: (d: number) => `Go to day ${d}`,
    reset: 'Start again',
    resetAsk: 'Clear your learning progress on this device?',
    mala: 'Mala: learned lines fill with gold. Tap a bead to open its day.',
    meaning: 'Meaning',
  },
  hi: {
    day: (d: number) => `दिन ${d}`,
    of: (d: number) => `दिन ${d} / ${LEARN_DAYS}`,
    days: 'दिन',
    progress: (n: number) => `43 में से ${n} पंक्तियाँ याद`,
    fade: 'और शब्द छिपाएं',
    show: 'सब शब्द दिखाएं',
    say: 'मुझे याद है',
    said: 'याद हो गई',
    undo: 'वापस लें',
    done: (d: number) => `दिन ${d} पूरा हुआ। रात को चारों पंक्तियाँ एक बार फिर बोलें, कल अगली चार।`,
    finished: 'आपको पूरी चालीसा याद हो गई। एक बार बिना देखे धीरे-धीरे पढ़ें और पाठ से मिलाएं।',
    nextDay: (d: number) => `दिन ${d} पर जाएं`,
    reset: 'फिर से शुरू करें',
    resetAsk: 'इस डिवाइस से आपकी प्रगति मिटा दें?',
    mala: 'माला: याद हुई पंक्तियों के मनके सुनहरे हो जाते हैं।',
    meaning: 'अर्थ',
  },
} as const

/** Which words are hidden at a fade level: 1 hides every third, 2 all but every third, 3 all but the first of each half. */
function faded(level: number, i: number, firstOfHalf: boolean): boolean {
  if (level <= 0) return false
  if (level === 1) return i % 3 === 2
  if (level === 2) return i % 3 !== 0
  return !firstOfHalf
}

function Words({ text, level, offset }: { text: string; level: number; offset: number }) {
  const words = text.replace(/\s*[।॥]\s*$/, '').split(/\s+/)
  const end = text.match(/\s*([।॥])\s*$/)?.[1]
  return (
    <span className="hc-half">
      {words.map((w, i) => (
        <span key={i}>
          <span className="hc-w" data-faded={faded(level, i + offset, i === 0) ? '' : undefined}>
            {w}
          </span>{' '}
        </span>
      ))}
      {end ?? null}
    </span>
  )
}

export default function LearnMode({ lines, beads, locale, page }: { lines: LearnLine[]; beads: BeadInfo[]; locale: HcLocale; page: string }) {
  const t = T[locale]
  const [state, setState] = useState<LearnState>(LEARN_EMPTY)
  const [day, setDay] = useState(1)
  const [levels, setLevels] = useState<Record<string, number>>({})

  useEffect(() => {
    const s = readStore<LearnState>(LEARN_KEY, LEARN_EMPTY)
    setState(s)
    setDay(Math.min(Math.max(1, s.day || 1), LEARN_DAYS))
  }, [])

  const save = (s: LearnState) => {
    setState(s)
    writeStore(LEARN_KEY, s)
  }

  const today = useMemo(() => lines.filter((l) => l.day === day), [lines, day])
  const learnedIds = Object.keys(state.learned)
  const dayDone = today.length > 0 && today.every((l) => state.learned[l.id])
  const allDone = learnedIds.length >= lines.length
  const current = today.find((l) => !state.learned[l.id])?.id ?? today[0]?.id ?? null

  const pickDay = (d: number) => {
    setDay(d)
    save({ ...state, day: d })
  }

  const mark = (l: LearnLine) => {
    const learned = { ...state.learned, [l.id]: day }
    let completedDays = state.completedDays
    trackEvent('Learn Line Marked', { ...baseProps(page, locale), line: l.id, day })
    const nowDone = today.every((x) => learned[x.id])
    if (nowDone && !completedDays.includes(day)) {
      completedDays = [...completedDays, day]
      trackEvent('Learn Day Completed', { ...baseProps(page, locale), day, learned: Object.keys(learned).length })
    }
    save({ ...state, learned, completedDays })
  }

  const unmark = (l: LearnLine) => {
    const learned = { ...state.learned }
    delete learned[l.id]
    save({ ...state, learned, completedDays: state.completedDays.filter((d) => d !== day) })
  }

  const setLevel = (id: string, v: number) => setLevels((x) => ({ ...x, [id]: Math.max(0, Math.min(3, v)) }))

  const onBead = (id: string) => {
    const l = lines.find((x) => x.id === id)
    if (!l) return
    if (l.day !== day) pickDay(l.day)
    requestAnimationFrame(() => document.getElementById(`learn-${id.replace('.', '-')}`)?.scrollIntoView({ block: 'center' }))
  }

  return (
    <div className="hc-learn">
      <aside className="hc-learn-aside" aria-label={t.mala}>
        <Mala beads={beads} locale={locale} page={page} mode="button" currentId={current} learned={learnedIds} onSelect={onBead} label={t.mala} caption={t.mala}>
          <span className="hc-mala-big">{learnedIds.length}</span>
          <span className="hc-mala-sub" lang={locale}>
            {locale === 'hi' ? '43 में से' : 'of 43 learned'}
          </span>
        </Mala>
      </aside>

      <div>
        <p className="hc-progress" aria-live="polite" lang={locale}>
          {t.progress(learnedIds.length)}
        </p>
        <ul className="hc-days" aria-label={t.days}>
          {Array.from({ length: LEARN_DAYS }, (_, i) => i + 1).map((d) => (
            <li key={d}>
              <button
                type="button"
                className="hc-day"
                aria-pressed={d === day}
                aria-label={`${t.day(d)}${state.completedDays.includes(d) ? `, ${t.said}` : ''}`}
                data-done={state.completedDays.includes(d) ? '' : undefined}
                onClick={() => pickDay(d)}
              >
                {d}
              </button>
            </li>
          ))}
        </ul>

        <h2 className="hc-h2 hc-learn-h" lang={locale}>
          {t.of(day)}
        </h2>
        <div className="hc-learn-list">
        {today.map((l) => {
          const lv = levels[l.id] ?? 0
          const isL = !!state.learned[l.id]
          return (
            <div key={l.id} id={`learn-${l.id.replace('.', '-')}`} className="hc-learn-line" data-learned={isL ? '' : undefined}>
              <p className="hc-learn-label" lang={locale}>
                <a href={l.href}>{l.label}</a>
              </p>
              <p className="hc-line">
                <span className="hc-deva" lang="hi">
                  <Words text={l.awadhi[0]} level={lv} offset={0} />
                  <Words text={l.awadhi[1]} level={lv} offset={1} />
                </span>
                <span className="hc-iast" lang="hi-Latn">
                  <Words text={l.iast[0]} level={lv} offset={0} />
                  <Words text={l.iast[1]} level={lv} offset={1} />
                </span>
              </p>
              {lv === 0 && (
                <p className="hc-learn-mean" lang={locale}>
                  {l.meaning}
                </p>
              )}
              <div className="hc-learn-acts">
                {lv < 3 ? (
                  <button type="button" className="hc-btn" onClick={() => setLevel(l.id, lv + 1)} lang={locale}>
                    {t.fade}
                  </button>
                ) : null}
                {lv > 0 && (
                  <button type="button" className="hc-btn" onClick={() => setLevel(l.id, 0)} lang={locale}>
                    {t.show}
                  </button>
                )}
                {isL ? (
                  <button type="button" className="hc-btn" onClick={() => unmark(l)} lang={locale} aria-label={`${t.undo}: ${l.label}`}>
                    {t.undo}
                  </button>
                ) : (
                  <button type="button" className="hc-btn hc-btn-primary" onClick={() => mark(l)} lang={locale}>
                    {t.say}
                  </button>
                )}
              </div>
            </div>
          )
        })}
        </div>

        {(dayDone || allDone) && (
          <div className="hc-done" role="status" lang={locale}>
            <p style={{ margin: 0 }}>{allDone ? t.finished : t.done(day)}</p>
            {!allDone && day < LEARN_DAYS && (
              <p style={{ margin: '12px 0 0' }}>
                <button type="button" className="hc-btn" onClick={() => pickDay(day + 1)}>
                  {t.nextDay(day + 1)}
                </button>
              </p>
            )}
          </div>
        )}

        <p className="hc-reset">
          <button
            type="button"
            className="hc-btn"
            onClick={() => {
              if (window.confirm(t.resetAsk)) {
                save(LEARN_EMPTY)
                setDay(1)
                setLevels({})
              }
            }}
            lang={locale}
          >
            {t.reset}
          </button>
        </p>
      </div>
    </div>
  )
}
