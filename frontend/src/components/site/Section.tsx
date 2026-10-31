import type { ReactNode } from 'react'
import './site.css'

export type SectionProps = {
  id?: string
  eyebrow?: ReactNode
  title?: ReactNode
  intro?: ReactNode
  /** default: page ground. band: the alternate ground, for every other section. */
  tone?: 'default' | 'band'
  width?: 'wide' | 'narrow'
  align?: 'left' | 'center'
  spacing?: 'default' | 'tight'
  /** data-mp-section name: fires Section Viewed once when it scrolls into view. */
  track?: string
  /** Adds the scroll reveal to the head. */
  rv?: boolean
  headingLevel?: 2 | 3
  lang?: string
  className?: string
  children?: ReactNode
}

/** A page section with the standard head (eyebrow, gold Playfair title, intro). */
export default function Section({
  id,
  eyebrow,
  title,
  intro,
  tone = 'default',
  width = 'wide',
  align = 'left',
  spacing = 'default',
  track,
  rv = true,
  headingLevel = 2,
  lang,
  className = '',
  children,
}: SectionProps) {
  const H = headingLevel === 2 ? 'h2' : 'h3'
  const headId = id && title ? `${id}-h` : undefined
  return (
    <section
      id={id}
      lang={lang}
      className={`sx-section${tone === 'band' ? ' sx-section--band' : ''}${spacing === 'tight' ? ' sx-section--tight' : ''} ${className}`.trim()}
      aria-labelledby={headId}
      data-mp-section={track}
    >
      <div className={`sx-wrap${width === 'narrow' ? ' sx-wrap--narrow' : ''}`}>
        {(eyebrow || title || intro) && (
          <div className={`sx-head${align === 'center' ? ' sx-head--center' : ''}${rv ? ' rv' : ''}`}>
            {eyebrow && <p className="sx-eyebrow">{eyebrow}</p>}
            {title && (
              <H className={headingLevel === 2 ? 'sx-h2' : 'sx-h3'} id={headId}>
                {title}
              </H>
            )}
            {intro && <p className="sx-intro">{intro}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
