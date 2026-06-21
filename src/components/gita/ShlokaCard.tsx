import React from 'react'

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
 * Split Sanskrit text at each single danda (।), placing each pada on its own line.
 * Double danda (॥) stays attached to the last pada.
 */
function formatSanskrit(text: string): React.ReactNode {
  // Split at single-danda followed by whitespace, keeping the danda with the preceding pada
  const parts = text.split(/(?<=।)\s+/)
  if (parts.length <= 1) return text
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {i > 0 && <br />}
      {part}
    </React.Fragment>
  ))
}

/**
 * Same treatment for IAST: split at | (single pipe) followed by whitespace.
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
  return (
    <div className="shloka-card">
      <div className="shloka-header">
        <span className="shloka-ref">{verseRef}</span>
        {speaker && <span className="shloka-speaker">Speaker: {speaker}</span>}
      </div>

      <div className="shloka-sanskrit" lang="sa">
        {formatSanskrit(sanskrit)}
      </div>

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
