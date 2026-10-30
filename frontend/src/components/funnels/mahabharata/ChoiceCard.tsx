'use client'

import { useRef, type ReactNode } from 'react'
import { mbTrack } from './track'

/** "Their choice": the moment is visible; opening shows the verse and what it meant. */
export default function ChoiceCard({
  person,
  moment,
  page,
  children,
}: {
  person: string
  moment: string
  page: string
  children: ReactNode
}) {
  const sent = useRef(false)
  return (
    <details
      className="mb-choice"
      onToggle={(e) => {
        if ((e.currentTarget as HTMLDetailsElement).open && !sent.current) {
          sent.current = true
          mbTrack('Character Choice Opened', page, 'en', { person })
        }
      }}
    >
      <summary>
        <span className="mb-choice-k">Their choice</span>
        <span className="mb-choice-moment">{moment}</span>
        <span className="mb-choice-cue" aria-hidden="true">
          Read what they did
        </span>
      </summary>
      <div className="mb-choice-body">{children}</div>
    </details>
  )
}
