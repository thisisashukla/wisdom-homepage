import type { ReactNode } from 'react'
import type { EventName } from '@/lib/analytics/events'
import './site.css'

export type Action = {
  href: string
  label: ReactNode
  /** data-mp-location: where the control sits, for Link Clicked / App Store Button Clicked. */
  location: string
  variant?: 'primary' | 'secondary' | 'link'
  hrefLang?: string
  /** Opens in a new tab (external). */
  external?: boolean
  /** Links to a file: sets the download attribute (a string names the saved file). */
  download?: boolean | string
  /** A registry event sent with Link Clicked (as on LinkCards: data-mp-event + data-mp-props). */
  event?: EventName
  eventProps?: Record<string, unknown>
}

/** The one button/link style: primary (gold), secondary (outline), link (underlined gold). */
export function Button({ href, label, location, variant = 'secondary', hrefLang, external, download, event, eventProps, className = '' }: Action & { className?: string }) {
  return (
    <a
      href={href}
      hrefLang={hrefLang}
      download={download}
      className={`sx-btn sx-btn--${variant} ${className}`.trim()}
      data-mp-location={location}
      data-mp-event={event}
      data-mp-props={eventProps ? JSON.stringify(eventProps) : undefined}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {label}
    </a>
  )
}

/** A row of actions; the first defaults to primary, the rest to link. */
export function Actions({ items, className = '' }: { items: Action[]; className?: string }) {
  if (!items.length) return null
  return (
    <div className={`sx-actions ${className}`.trim()}>
      {items.map((a, i) => (
        <Button key={a.href + i} {...a} variant={a.variant ?? (i === 0 ? 'primary' : 'link')} />
      ))}
    </div>
  )
}

export default Button
