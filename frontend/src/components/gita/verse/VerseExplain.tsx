/**
 * The verse explained in question-shaped sections ("What does Bhagavad Gita 2.47 mean?"), so
 * the headings match how people and AI assistants ask. Replaces the old numbered cards, the
 * takeaway box and the FAQ block, which repeated the same answers.
 *
 *   <VerseExplain
 *     blocks={[{ id: 'meaning', q: 'What does Bhagavad Gita 2.47 mean?', text, lang: 'en' }]}
 *     openCount={1}                 // later blocks go inside a closed "Read more" fold
 *     moreLabel="Read the full explanation"
 *     credit={<>Translation by Ankur Shukla ...</>}
 *   />
 *
 * Server component.
 */
import type { ReactNode } from 'react'
import './verse.css'

export type ExplainBlock = { id: string; q: string; text: string; lang: 'en' | 'hi'; kicker?: string }

type Props = {
  blocks: ExplainBlock[]
  /** How many blocks show open; the rest go in a closed fold. Default: all open. */
  openCount?: number
  moreLabel?: string
  credit?: ReactNode
  section: string
  label: string
}

function Block({ b }: { b: ExplainBlock }) {
  return (
    <div className="vp-explain-block" id={`vp-${b.id}`}>
      {b.kicker && <div className="vp-kicker">{b.kicker}</div>}
      <h2 className="vp-explain-q">{b.q}</h2>
      <p className="vp-explain-a" lang={b.lang}>{b.text}</p>
    </div>
  )
}

export default function VerseExplain({ blocks, openCount, moreLabel, credit, section, label }: Props) {
  const list = blocks.filter((b) => b.text && b.text.trim())
  if (!list.length) return null
  const open = openCount === undefined ? list : list.slice(0, openCount)
  const rest = openCount === undefined ? [] : list.slice(openCount)
  return (
    <section className="vp-explain" aria-label={label} data-mp-section={section}>
      {open.map((b) => <Block key={b.id} b={b} />)}
      {rest.length > 0 && (
        <details className="vp-fold vp-more" data-mp-section={`${section}_more`}>
          <summary>
            <span className="vp-fold-title">{moreLabel}</span>
          </summary>
          {rest.map((b) => <Block key={b.id} b={b} />)}
        </details>
      )}
      {credit && <p className="vp-credit">{credit}</p>}
    </section>
  )
}
