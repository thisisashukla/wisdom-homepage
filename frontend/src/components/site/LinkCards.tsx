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
  /** A picture on top of the card (16:9 crop, lazy-loaded), like the reading-plan cards. */
  img?: { src: string; alt: string; position?: string; width?: number; height?: number }
}

/**
 * A grid of cards linking to other pages (related, up next, hub listings).
 * `layout="rail"` scrolls sideways on phones (cards snap, the next one peeks in) and is a grid from 700px.
 */
export default function LinkCards({
  items,
  columns = 2,
  layout = 'grid',
  className = '',
}: {
  items: LinkCard[]
  columns?: 2 | 3
  layout?: 'grid' | 'rail'
  className?: string
}) {
  const cls = ['sx-cards', columns === 3 && 'sx-cards--3', layout === 'rail' && 'sx-cards--rail', className].filter(Boolean).join(' ')
  return (
    <ul className={cls} data-stagger="60">
      {items.map((c) => (
        <li key={c.href} className="rv">
          <a
            className={c.img ? 'sx-card sx-card--img' : 'sx-card'}
            href={c.href}
            hrefLang={c.hrefLang}
            download={c.download}
            data-mp-location={c.location}
            data-mp-event={c.event}
            data-mp-props={c.eventProps ? JSON.stringify(c.eventProps) : undefined}
          >
            {c.img && (
              <span className="sx-card-thumb">
                <img
                  src={c.img.src}
                  alt={c.img.alt}
                  width={c.img.width ?? 800}
                  height={c.img.height ?? 600}
                  loading="lazy"
                  decoding="async"
                  style={c.img.position ? { objectPosition: c.img.position } : undefined}
                />
              </span>
            )}
            <span className="sx-card-text">
              {c.kicker && <span className="sx-card-kicker">{c.kicker}</span>}
              <span className="sx-card-title">{c.title}</span>
              {c.orig && (
                <span className="sx-card-orig" lang="sa">
                  {c.orig}
                </span>
              )}
              {c.body && <span className="sx-card-body">{c.body}</span>}
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
