import type { ReactNode } from 'react'
import VerseCard, { type VerseCardProps } from './VerseCard'
import './site.css'

export type PairLine = {
  /** The line, already in the words of its (public-domain) translation. */
  text: ReactNode
  /** "Epictetus" */
  who: string
  /** "Enchiridion 1" */
  work: ReactNode
  /** "tr. George Long, 1877" */
  translator?: string
  href?: string
  location?: string
}

/**
 * A Gita verse beside a line from another tradition, with where they meet and where they part.
 * Phone: stacked (verse first). Desktop: two columns.
 */
export default function VersePair({
  id,
  title,
  verse,
  other,
  meet,
  part,
  meetLabel = 'Where they meet',
  partLabel = 'Where they part',
  className = '',
}: {
  id?: string
  title?: ReactNode
  verse: Omit<VerseCardProps, 'size' | 'as'>
  other: PairLine
  meet?: ReactNode
  part?: ReactNode
  meetLabel?: string
  partLabel?: string
  className?: string
}) {
  return (
    <article id={id} className={`sx-pair rv ${className}`.trim()}>
      {title && <h3 className="sx-h3 sx-pair-title">{title}</h3>}
      <div className="sx-pair-grid">
        <VerseCard {...verse} size="compact" as="div" toggle={verse.toggle ?? Boolean(verse.iast)} />
        <figure className="sx-pair-other">
          <blockquote className="sx-pair-quote">{other.text}</blockquote>
          <figcaption className="sx-pair-cite">
            <span className="sx-pair-who">{other.who}</span>
            {other.href ? (
              <a href={other.href} target="_blank" rel="noopener noreferrer" data-mp-location={other.location}>
                {other.work}
              </a>
            ) : (
              <span>{other.work}</span>
            )}
            {other.translator && <span className="sx-pair-tr">{other.translator}</span>}
          </figcaption>
        </figure>
      </div>
      {(meet || part) && (
        <div className="sx-pair-notes">
          {meet && (
            <div className="sx-pair-note">
              <p className="sx-pair-k">{meetLabel}</p>
              <div className="sx-pair-body">{meet}</div>
            </div>
          )}
          {part && (
            <div className="sx-pair-note">
              <p className="sx-pair-k">{partLabel}</p>
              <div className="sx-pair-body">{part}</div>
            </div>
          )}
        </div>
      )}
    </article>
  )
}
