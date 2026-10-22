'use client'

import React, { useState } from 'react'
import { Cta } from './parts'
import SandReveal from './SandReveal'
import { devaLayout } from '@/lib/onboarding/devaLines'
import { verseHeadline, type NeedId, type StageId } from '@/lib/onboarding/profile'

/**
 * The payoff (wisdom/app/screens/onboarding/Ob06_VersesScreen.tsx). A two-line
 * headline from their stage and feeling; the verse chosen for them lies under
 * sand. Brushed away, the card comes forward: the Sanskrit in bold, the line
 * in italics, the reference. Then "What's really going on" rises in.
 */
export type HookVerse = { id: string; ref: string | null; sanskrit: string | null; line: string; why: string | null }

export default function VerseScreen({
  hook,
  insight,
  stages,
  need,
  usedNote,
  onDone,
}: {
  hook: HookVerse | null
  insight: string | null
  stages: StageId[]
  need?: NeedId
  usedNote: boolean
  onDone: () => void
}) {
  const [revealed, setRevealed] = useState(!hook)
  const copy = verseHeadline(stages, need, usedNote)
  const deep = (insight || hook?.why || '').trim() || null
  return (
    <>
      <div className="ob-scroll">
        <div className="ob-hero">
          <div className="ob-logo-slot" aria-hidden="true" />
          <h1 className="ob-title ob-rise ob-fit" style={{ '--d': '0ms' } as React.CSSProperties}>
            {hook ? (
              <>
                <span>{copy.title}</span>
                <em>{copy.accent}</em>
              </>
            ) : (
              <span>Your verse</span>
            )}
          </h1>
          <p className="ob-sub ob-rise" style={{ '--d': '180ms' } as React.CSSProperties}>
            {hook ? copy.sub : "We couldn't bring it in just now. Please try again in a moment."}
          </p>
        </div>
        {hook && (
          <div className="ob-verse-wrap ob-rise" style={{ '--d': '500ms', '--dy': '32px' } as React.CSSProperties}>
            <SandReveal onRevealed={() => setRevealed(true)}>
              <VerseFace verse={hook} />
            </SandReveal>
          </div>
        )}
        {hook && revealed && deep && (
          <div className="ob-thread">
            <div className="ob-beat ob-rise" style={{ '--d': '900ms', '--dy': '12px' } as React.CSSProperties}>
              <span className="ob-node" aria-hidden="true" />
              <span className="ob-eyebrow">What&apos;s really going on</span>
              <p className="ob-insight">{deep}</p>
            </div>
          </div>
        )}
      </div>
      <Cta disabled={!revealed} delay={480} onClick={() => revealed && onDone()}>
        Show me my plan
      </Cta>
    </>
  )
}

export function VerseFace({ verse }: { verse: { sanskrit: string | null; line: string | null; ref: string | null } }) {
  const deva = devaLayout(verse.sanskrit)
  return (
    <div className="ob-face">
      {deva ? (
        <>
          <div className="ob-deva" lang="sa" style={{ fontSize: deva.size, lineHeight: `${deva.lineHeight}px` }}>
            {deva.lines.map((l, i) => <span key={i}>{l}</span>)}
          </div>
          <p className="ob-meaning">{verse.line}</p>
        </>
      ) : (
        <p className="ob-verse-bold">{verse.line}</p>
      )}
      <div className="ob-rule" aria-hidden="true"><span /><i /><span /></div>
      {verse.ref && <p className="ob-ref">{verse.ref}</p>}
    </div>
  )
}
