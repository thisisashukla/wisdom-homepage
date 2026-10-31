import type { ReactNode } from 'react'
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
}

/** The one button/link style: primary (gold), secondary (outline), link (underlined gold). */
export function Button({ href, label, location, variant = 'secondary', hrefLang, external, className = '' }: Action & { className?: string }) {
  return (
    <a
      href={href}
      hrefLang={hrefLang}
      className={`sx-btn sx-btn--${variant} ${className}`.trim()}
      data-mp-location={location}
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
