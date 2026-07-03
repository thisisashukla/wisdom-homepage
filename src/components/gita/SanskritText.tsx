import React from 'react'

interface Props {
  text: string
  /**
   * Index of the currently highlighted word (non-danda tokens only).
   * Maps 1:1 with the audio timestamp array — dandas are skipped in the count.
   */
  activeIdx?: number
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
 * - activeIdx (when provided) adds the "active" class to the matching word span,
 *   enabling karaoke-style highlighting in VerseAudioPlayer. The index counts only
 *   content words, not dandas — matching the audio timestamp array directly.
 */
export default function SanskritText({ text, activeIdx, className }: Props) {
  const tokens = text.trim().split(/\s+/)
  let wordIdx = 0
  const nodes: React.ReactNode[] = []

  tokens.forEach((token, i) => {
    const prevIsDanda = i > 0 && tokens[i - 1] === '।'

    if (token === '।') {
      nodes.push(<React.Fragment key={i}> ।<br /></React.Fragment>)
    } else if (token === '॥') {
      nodes.push(<React.Fragment key={i}> ॥</React.Fragment>)
    } else {
      const idx = wordIdx++
      const isActive = activeIdx !== undefined && activeIdx === idx
      nodes.push(
        <React.Fragment key={i}>
          {i > 0 && !prevIsDanda && ' '}
          <span className={isActive ? 'sa-word active' : 'sa-word'}>{token}</span>
        </React.Fragment>,
      )
    }
  })

  return (
    <div className={className} lang="sa">
      {nodes}
    </div>
  )
}
