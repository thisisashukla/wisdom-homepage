'use client'

/**
 * Kabir's signature: the glossed words of a doha as underlined buttons; tap one for its meaning.
 * Sits inside the kit VerseCard (children), under the doha. KIT_REQUEST: VerseCard `renderRow`
 * so the words can be tapped inside the line itself, as they were before the kit.
 */

import { useState } from 'react'
import { Icon } from '@/components/quotes/Icons'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import type { Locale } from '@/lib/funnels/sayings/shared'

export type Gloss = { w: string; hi: string; en: string }

const T = {
  en: { close: 'Close meaning', label: 'Word meanings' },
  hi: { close: 'अर्थ बंद करें', label: 'शब्दार्थ' },
}

export default function WordGloss({ id, gloss, locale }: { id: string; gloss: Gloss[]; locale: Locale }) {
  const [word, setWord] = useState<Gloss | null>(null)
  if (!gloss.length) return null
  const t = T[locale]
  const panel = `${id}-gloss`
  const tap = (g: Gloss) => {
    if (word?.w === g.w) {
      setWord(null)
      return
    }
    setWord(g)
    trackEvent(EVENTS.WordMeaningClicked, { item_id: id, item_type: 'doha', word: g.w })
  }
  return (
    <div className="fx-gloss-wrap">
      <p className="fx-words-row" role="group" aria-label={t.label}>
        {gloss.map((g) => (
          <button key={g.w} type="button" className="fx-word" lang="hi" aria-expanded={word?.w === g.w} aria-controls={panel} onClick={() => tap(g)}>
            {g.w}
          </button>
        ))}
      </p>
      <div id={panel} className="fx-gloss" aria-live="polite">
        {word && (
          <p className="fx-gloss-pop">
            <strong lang="hi">{word.w}</strong>
            <span lang={locale}>{locale === 'hi' ? word.hi : word.en}</span>
            {locale === 'hi' && (
              <span lang="en" className="fx-gloss-en">
                {word.en}
              </span>
            )}
            <button type="button" className="fx-gloss-x" aria-label={t.close} onClick={() => setWord(null)}>
              <Icon name="close" />
            </button>
          </p>
        )}
      </div>
    </div>
  )
}
