import React from 'react'
import { splitSpeaker } from '@/lib/devanagari'

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
 * - A speaker label at the start ("धृतराष्ट्र उवाच", often glued to the first word in the
 *   corpus) goes on its own line in <span class="sa-speaker">. A glued token stays one word
 *   for the audio index: both halves share its index and highlight together.
 * - activeIdx (when provided) adds the "active" class to the matching word span, and words
 *   past revealIdx get "dim", enabling karaoke-style highlighting with a reveal trail in
 *   VerseAudioPlayer. The index counts only content words, not dandas — matching the audio
 *   timestamp array directly.
 */
type Item = { text: string; idx: number | null }

const isDanda = (t: string | undefined) => t === '।' || t === '॥'

/** Tokens with their audio word index (null for dandas), split into speaker line and verse. */
function tokenize(text: string): { speaker: Item[]; body: Item[] } {
  const tokens = text.trim().split(/\s+/)
  const items: Item[] = []
  let wordIdx = 0
  for (const t of tokens) items.push({ text: t, idx: isDanda(t) ? null : wordIdx++ })

  const { speaker } = splitSpeaker(text)
  const spk = speaker ? speaker.split(' ') : []
  const last = spk.length - 1
  const fits =
    spk.length > 0 &&
    items.length > spk.length &&
    spk.every((w, i) => (i < last ? items[i].text === w : items[i].text.startsWith(w)))
  if (!fits) return { speaker: [], body: items }

  const head = items.slice(0, last)
  const glued = items[last]
  const rest = glued.text.slice(spk[last].length)
  return {
    speaker: [...head, { text: spk[last], idx: glued.idx }],
    body: rest ? [{ text: rest, idx: glued.idx }, ...items.slice(spk.length)] : items.slice(spk.length),
  }
}

export default function SanskritText({ text, activeIdx, revealIdx, className }: Props) {
  const { speaker, body } = tokenize(text)
  const nodes: React.ReactNode[] = []

  const wordClass = (idx: number) => {
    const isActive = activeIdx !== undefined && activeIdx === idx
    const isDim = !isActive && revealIdx !== undefined && idx > revealIdx
    return isActive ? 'sa-word active' : isDim ? 'sa-word dim' : 'sa-word'
  }

  if (speaker.length > 0) {
    nodes.push(
      <React.Fragment key="spk">
        <span className="sa-speaker">
          {speaker.map((w, i) => (
            <React.Fragment key={i}>
              {i > 0 && ' '}
              <span className={wordClass(w.idx ?? 0)}>{w.text}</span>
            </React.Fragment>
          ))}
        </span>
        <br />
      </React.Fragment>,
    )
  }

  for (let i = 0; i < body.length; i++) {
    const token = body[i].text
    const prevIsDanda = i > 0 && body[i - 1].text === '।'

    if (body[i].idx === null) {
      // A danda with no word before it (rare): render on its own.
      nodes.push(
        <React.Fragment key={i}>
          <span className="sa-danda">{token}</span>
          {token === '।' && <br />}
        </React.Fragment>,
      )
      continue
    }

    const idx = body[i].idx as number
    const word = <span className={wordClass(idx)}>{token}</span>
    const next = body[i + 1]?.text

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
