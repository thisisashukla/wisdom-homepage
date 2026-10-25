import React from 'react'

interface Props {
  text: string
  /**
   * Index of the currently highlighted word (non-danda tokens only).
   * Maps 1:1 with the audio timestamp array — dandas are skipped in the count.
   */
  activeIdx?: number
  /**
   * Index of the last word reached so far (>= activeIdx, tracks through gaps between
   * word timestamps). Words past this index are dimmed as "not yet recited"; defaults
   * to "no dimming" when omitted so plain (non-karaoke) renders are unaffected.
   */
  revealIdx?: number
  /** CSS class on the outer wrapper element (e.g. "gita-sanskrit" or "verse-audio-words"). */
  className?: string
}

/**
 * Canonical Sanskrit shloka renderer used across the entire app.
 *
 * - Splits text on whitespace into tokens.
 * - Danda (।): rendered as punctuation; a <br /> follows so the next pada starts on a new line.
 * - Double danda (॥): rendered as punctuation at the end of the verse.
 * - All other tokens are content words, each wrapped in a <span class="sa-word">.
 * - activeIdx (when provided) adds the "active" class to the matching word span, and words
 *   past revealIdx get "dim", enabling karaoke-style highlighting with a reveal trail in
 *   VerseAudioPlayer. The index counts only content words, not dandas — matching the audio
 *   timestamp array directly.
 */
export default function SanskritText({ text, activeIdx, revealIdx, className }: Props) {
  const tokens = text.trim().split(/\s+/)
  let wordIdx = 0
  const nodes: React.ReactNode[] = []

  const isDanda = (t: string | undefined) => t === '।' || t === '॥'

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    const prevIsDanda = i > 0 && tokens[i - 1] === '।'

    if (isDanda(token)) {
      // A danda with no word before it (rare): render on its own.
      nodes.push(
        <React.Fragment key={i}>
          <span className="sa-danda">{token}</span>
          {token === '।' && <br />}
        </React.Fragment>,
      )
      continue
    }

    const idx = wordIdx++
    const isActive = activeIdx !== undefined && activeIdx === idx
    const isDim = !isActive && revealIdx !== undefined && idx > revealIdx
    const wordClass = isActive ? 'sa-word active' : isDim ? 'sa-word dim' : 'sa-word'
    const word = <span className={wordClass}>{token}</span>
    const next = tokens[i + 1]

    if (isDanda(next)) {
      // The last word of a pada and its danda share a no-wrap group, so the
      // danda can never drop onto a line by itself. The danda's dim state
      // follows the word it closes.
      const dandaClass = revealIdx !== undefined && idx > revealIdx ? 'sa-danda dim' : 'sa-danda'
      nodes.push(
        <React.Fragment key={i}>
          {i > 0 && !prevIsDanda && ' '}
          <span className="sa-pada-end" style={{ whiteSpace: 'nowrap' }}>
            {word}
            {'\u00A0'}
            <span className={dandaClass}>{next}</span>
          </span>
          {next === '।' && <br />}
        </React.Fragment>,
      )
      i++
      continue
    }

    nodes.push(
      <React.Fragment key={i}>
        {i > 0 && !prevIsDanda && ' '}
        {word}
      </React.Fragment>,
    )
  }

  return (
    <div className={className} lang="sa">
      {nodes}
    </div>
  )
}
