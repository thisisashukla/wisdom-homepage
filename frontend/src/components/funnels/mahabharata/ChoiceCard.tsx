'use client'

import { useRef, type ReactNode } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'

/** "Their choice": the moment is visible; opening shows the verse (a kit VerseCard) and what it meant. */
export default function ChoiceCard({
  person,
  moment,
  children,
}: {
  person: string
  moment: string
  children: ReactNode
}) {
  const sent = useRef(false)
  return (
    <details
      className="mb-choice rv"
      id="choice"
      onToggle={(e) => {
        if ((e.currentTarget as HTMLDetailsElement).open && !sent.current) {
          sent.current = true
          trackEvent(EVENTS.CharacterChoiceOpened, { item_id: person, item_type: 'character' })
        }
      }}
    >
      <summary>
        <span className="mb-choice-k">Their choice</span>
        <span className="mb-choice-moment">{moment}</span>
        <span className="mb-choice-cue">
          <span>Read what they did</span>
          <i aria-hidden="true">+</i>
        </span>
      </summary>
      <div className="mb-choice-body">{children}</div>
    </details>
  )
}
