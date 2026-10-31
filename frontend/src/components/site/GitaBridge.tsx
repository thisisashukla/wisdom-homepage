'use client'

import type { ReactNode } from 'react'
import { EVENTS, trackEventBeacon } from '@/lib/mixpanel'
import type { Locale } from '@/lib/locale'
import './site.css'

/**
 * A link from any scripture back to the Bhagavad Gita. Card (default) or inline.
 * Tracks Gita Bridge Clicked { href, location, from } and is skipped by the link catch-all.
 */
export default function GitaBridge({
  href,
  label,
  why,
  location,
  from,
  variant = 'card',
  locale = 'en',
  className = '',
}: {
  href: string
  label: ReactNode
  /** One sentence on why this verse connects. */
  why?: ReactNode
  location: string
  /** id of the line this bridge starts from */
  from?: string
  variant?: 'card' | 'inline'
  locale?: Locale
  className?: string
}) {
  const onClick = () => trackEventBeacon(EVENTS.GitaBridgeClicked, { href, location, from: from ?? null })
  if (variant === 'inline')
    return (
      <a href={href} className={`sx-bridge sx-bridge--inline ${className}`.trim()} data-mp-tracked="" onClick={onClick}>
        {label}
      </a>
    )
  return (
    <a href={href} className={`sx-bridge ${className}`.trim()} data-mp-tracked="" onClick={onClick}>
      <span className="sx-bridge-kicker">{locale === 'hi' ? 'गीता में' : 'In the Bhagavad Gita'}</span>
      <span className="sx-bridge-label">{label}</span>
      {why && <span className="sx-bridge-why">{why}</span>}
    </a>
  )
}
