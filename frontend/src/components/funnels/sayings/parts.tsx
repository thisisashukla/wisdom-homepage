/** Server pieces shared by the sayings pages: breadcrumbs, FAQ, sources note, related links, JSON-LD. */

import type { ReactNode } from 'react'
import { jsonLdHtml } from '@/lib/funnels/sayings/seo'
import type { Locale } from '@/lib/funnels/sayings/shared'

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(data)} />
}

export function Crumbs({ items, locale }: { items: { label: string; href?: string }[]; locale: Locale }) {
  return (
    <nav className="fx-crumbs" aria-label={locale === 'hi' ? 'पेज का रास्ता' : 'Breadcrumb'}>
      <ol>
        {items.map((c, i) => (
          <li key={i}>{c.href ? <a href={c.href}>{c.label}</a> : <span aria-current="page">{c.label}</span>}</li>
        ))}
      </ol>
    </nav>
  )
}

export function Faq({ items, heading, id = 'faq' }: { items: { q: string; a: string }[]; heading: string; id?: string }) {
  return (
    <section className="fx-sec fx-faq" aria-labelledby={id}>
      <h2 id={id} className="fx-h2">
        {heading}
      </h2>
      {items.map((f, i) => (
        <details key={i} open={i === 0}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </section>
  )
}

export function Method({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="fx-method" aria-label={heading}>
      <h2>{heading}</h2>
      {children}
    </section>
  )
}

export function Related({ heading, links }: { heading: string; links: { href: string; label: string; gita?: boolean }[] }) {
  return (
    <section className="fx-sec fx-related" aria-label={heading}>
      <h2 className="fx-h2">{heading}</h2>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className={l.gita ? 'fx-gita' : undefined} data-mp-location="related">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
