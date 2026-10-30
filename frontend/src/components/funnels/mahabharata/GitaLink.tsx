'use client'

import type { ReactNode } from 'react'
import { mbBeacon, type MbLocale } from './track'

/** Every link back to the Gita: Wisdom gold, and a "Gita Bridge Tapped" event. */
export default function GitaLink({
  href,
  from,
  toRef,
  page,
  locale,
  className,
  children,
}: {
  href: string
  from: string
  toRef: string
  page: string
  locale: MbLocale
  className?: string
  children: ReactNode
}) {
  return (
    <a
      href={href}
      className={`mb-gita${className ? ` ${className}` : ''}`}
      data-mp-location={`gita_bridge_${from}`}
      onClick={() => mbBeacon('Gita Bridge Tapped', page, locale, { from, to_ref: toRef })}
    >
      {children}
    </a>
  )
}
