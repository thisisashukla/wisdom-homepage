import type { ReactNode } from 'react'
import type { EventName } from '@/lib/analytics/events'
import './site.css'

export type LinkCard = {
  href: string
  title: ReactNode
  body?: ReactNode
  kicker?: ReactNode
  /** A line of the original, set in Tiro. */
  orig?: string
  hrefLang?: string
  location?: string
  /** Links to a file: sets the download attribute (a string names the saved file). */
  download?: boolean | string
  /** A registry event sent with Link Clicked (needs `location`; BlogTracker reads data-mp-event). */
  event?: EventName
  eventProps?: Record<string, unknown>
}

/** A grid of cards linking to other pages (related, up next, hub listings). */
export default function LinkCards({ items, columns = 2, className = '' }: { items: LinkCard[]; columns?: 2 | 3; className?: string }) {
  return (
    <ul className={`sx-cards${columns === 3 ? ' sx-cards--3' : ''} ${className}`.trim()} data-stagger="60">
      {items.map((c) => (
        <li key={c.href} className="rv">
          <a
            className="sx-card"
            href={c.href}
            hrefLang={c.hrefLang}
            download={c.download}
            data-mp-location={c.location}
            data-mp-event={c.event}
            data-mp-props={c.eventProps ? JSON.stringify(c.eventProps) : undefined}
          >
            {c.kicker && <span className="sx-card-kicker">{c.kicker}</span>}
            <span className="sx-card-title">{c.title}</span>
            {c.orig && (
              <span className="sx-card-orig" lang="sa">
                {c.orig}
              </span>
            )}
            {c.body && <span className="sx-card-body">{c.body}</span>}
          </a>
        </li>
      ))}
    </ul>
  )
}
