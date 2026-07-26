import React from 'react'
import SanskritText from './SanskritText'
import VerseAudioPlayer from './VerseAudioPlayer'
import { getVerseAudio } from '@/lib/gita'

export interface ShlokaCardProps {
  /** Verse reference, e.g. "Bhagavad Gita 7.3" */
  verseRef: string
  /** Speaker of the verse, e.g. "Krishna" */
  speaker?: string
  /** Sanskrit text — automatically split into two lines at ।  */
  sanskrit: string
  /** IAST transliteration — automatically split at | */
  iast?: string
  /** Translation / meaning text */
  meaning?: string
  /** Label for the meaning column (default: "Meaning") */
  meaningLabel?: string
  /** Commentary / insight text */
  insight?: string
  /** Label for the insight column */
  insightLabel?: string
  /** One-line quoted essence of the verse */
  essence?: string
}

/**
 * Split IAST transliteration at | (single pipe) followed by whitespace.
 */
function formatIast(text: string): React.ReactNode {
  const parts = text.split(/(?<=\|)\s+/)
  if (parts.length <= 1) return text
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {i > 0 && <br />}
      {part}
    </React.Fragment>
  ))
}

export default function ShlokaCard({
  verseRef,
  speaker,
  sanskrit,
  iast,
  meaning,
  meaningLabel = 'Meaning',
  insight,
  insightLabel = 'What this verse is doing',
  essence,
}: ShlokaCardProps) {
  // Parse "Bhagavad Gita X.Y" → chapter, verse for audio lookup
  const refMatch = verseRef.match(/(\d+)\.(\d+)/)
  const ch = refMatch ? Number(refMatch[1]) : undefined
  const vs = refMatch ? Number(refMatch[2]) : undefined
  const audio = ch && vs ? getVerseAudio(ch, vs) : null

  return (
    <div className="shloka-card">
      <div className="shloka-header">
        <span className="shloka-ref">{verseRef}</span>
        {speaker && <span className="shloka-speaker">Speaker: {speaker}</span>}
      </div>

      {audio ? (
        <VerseAudioPlayer audioSrc={audio.audio} timestamps={audio.timestamps} text={sanskrit} chapter={ch} verse={vs} />
      ) : (
        <SanskritText text={sanskrit} className="shloka-sanskrit" />
      )}

      {iast && (
        <div className="shloka-iast">
          {formatIast(iast)}
        </div>
      )}

      {(meaning || insight) && (
        <div className="shloka-body">
          {meaning && (
            <div>
              <div className="shloka-col-label">{meaningLabel}</div>
              <div className="shloka-meaning">{meaning}</div>
            </div>
          )}
          {insight && (
            <div>
              <div className="shloka-col-label">{insightLabel}</div>
              <div className="shloka-insight">{insight}</div>
            </div>
          )}
        </div>
      )}

      {essence && (
        <div className="shloka-essence">&ldquo;{essence}&rdquo;</div>
      )}
    </div>
  )
}
