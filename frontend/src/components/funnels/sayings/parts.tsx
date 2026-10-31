/**
 * Server pieces shared by the sayings pages, built from the site kit: jump chips under the hero,
 * the next step (mid-page panel and end band), the sources note and the related links.
 */

import type { ReactNode } from 'react'
import { GitaBridge, LinkCards, Section } from '@/components/site'
import type { Hub, Locale } from '@/lib/funnels/sayings/shared'
import SayingsNextStep from './NextStep'
import './sayings.css'

/** Jump links to the page's sections, under the hero text. */
export function JumpChips({ items, locale, label }: { items: { href: string; label: string }[]; locale: Locale; label?: string }) {
  return (
    <nav className="fx-jumps" aria-label={label ?? (locale === 'hi' ? 'इस पेज पर' : 'On this page')}>
      {items.map((c) => (
        <a key={c.href} className="sx-chip" href={c.href}>
          {c.label}
        </a>
      ))}
    </nav>
  )
}

/** Mid-page next step, inside a section after its cards. */
export function NextPanel({ heading, hub, locale, pageKey }: { heading: string; hub: Hub; locale: Locale; pageKey: string }) {
  return (
    <div className="fx-next-panel rv">
      <h2 className="sx-h3">{heading}</h2>
      <SayingsNextStep hub={hub} locale={locale} pageKey={pageKey} placement="mid" />
    </div>
  )
}

/** End-of-page next step band. */
export function NextBand({ heading, hub, locale, pageKey }: { heading: string; hub: Hub; locale: Locale; pageKey: string }) {
  return (
    <Section id="next-end" tone="band" width="narrow" title={heading} track="next_end">
      <SayingsNextStep hub={hub} locale={locale} pageKey={pageKey} placement="end" />
    </Section>
  )
}

/** Sources and method: a quiet closing section. */
export function Method({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <Section id="method" title={heading} headingLevel={3} spacing="tight" width="narrow">
      <div className="fx-method">{children}</div>
    </Section>
  )
}

/** Read next: page links as link cards; a link back to the Gita as the Gita bridge. */
export function Related({ heading, links, locale }: { heading: string; links: { href: string; label: string; gita?: boolean }[]; locale: Locale }) {
  const pages = links.filter((l) => !l.gita)
  const gita = links.filter((l) => l.gita)
  return (
    <Section id="related" title={heading}>
      <LinkCards columns={3} items={pages.map((l) => ({ href: l.href, title: l.label, location: 'related' }))} />
      {gita.map((l) => (
        <div key={l.href} className="fx-related-gita rv">
          <GitaBridge href={l.href} label={l.label} location="related" locale={locale} />
        </div>
      ))}
    </Section>
  )
}
