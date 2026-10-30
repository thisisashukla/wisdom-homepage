/**
 * Server pieces shared by the sayings pages, all on the house quote-page system
 * (src/components/quotes/quotes.css): the page shell, the head, sections,
 * FAQ, sources note, related links and JSON-LD.
 */

import type { ReactNode } from 'react'
import HomeAnimations from '@/components/HomeAnimations'
import { jsonLdHtml } from '@/lib/funnels/sayings/seo'
import type { Hub, Locale } from '@/lib/funnels/sayings/shared'
import '@/app/home.css'
import '@/app/home-v3.css'
import '@/components/quotes/card.css'
import '@/components/quotes/quotes.css'
import './sayings.css'

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdHtml(data)} />
}

/** Page root: the house quote page ground, column and type. */
export function Shell({ hub, locale, fonts, script, children }: { hub: Hub; locale: Locale; fonts?: string; script?: boolean; children: ReactNode }) {
  return (
    <div className={`qp fx-sayings${fonts ? ` ${fonts}` : ''}`} data-hub={hub} data-script={script ? 'deva' : undefined} lang={locale}>
      {children}
      <HomeAnimations />
    </div>
  )
}

export function Crumbs({ items, locale }: { items: { label: string; href?: string }[]; locale: Locale }) {
  return (
    <nav className="qp-crumbs" aria-label={locale === 'hi' ? 'पेज का रास्ता' : 'Breadcrumb'}>
      <ol>
        {items.map((c, i) => (
          <li key={i}>{c.href ? <a href={c.href}>{c.label}</a> : <span aria-current="page">{c.label}</span>}</li>
        ))}
      </ol>
    </nav>
  )
}

/** The house quote-page head: crumbs, eyebrow, H1, promise, quick answer, jump chips. */
export function Head({
  crumbs,
  locale,
  eyebrow,
  h1,
  promise,
  quick,
  chips,
  chipsLabel,
  children,
}: {
  crumbs: { label: string; href?: string }[]
  locale: Locale
  eyebrow?: string
  h1: string
  promise?: string
  quick?: ReactNode
  chips?: { href: string; label: string }[]
  chipsLabel?: string
  children?: ReactNode
}) {
  return (
    <header className="qp-head" data-stagger="60">
      <Crumbs items={crumbs} locale={locale} />
      {eyebrow && <p className="qp-eyebrow rv">{eyebrow}</p>}
      <h1 className="qp-h1 rv">{h1}</h1>
      {promise && <p className="qp-promise rv">{promise}</p>}
      {quick && (
        <p id="quick-answer" className="fx-quick rv">
          {quick}
        </p>
      )}
      {chips && chips.length > 0 && (
        <nav className="qchips rv" aria-label={chipsLabel ?? (locale === 'hi' ? 'इस पेज पर' : 'On this page')}>
          <div className="qchips-row">
            {chips.map((c) => (
              <a key={c.href} className="qchip" href={c.href}>
                {c.label}
              </a>
            ))}
          </div>
        </nav>
      )}
      {children}
    </header>
  )
}

/** A house section: left-aligned head (H2 and intro), then content. */
export function Sec({
  id,
  hid,
  heading,
  intro,
  className,
  children,
}: {
  id?: string
  hid: string
  heading: ReactNode
  intro?: ReactNode
  className?: string
  children: ReactNode
}) {
  return (
    <section id={id} className={`qp-section${className ? ` ${className}` : ''}`} aria-labelledby={hid}>
      <div className="qp-section-head rv">
        <h2 id={hid} className="qp-h2">
          {heading}
        </h2>
        {intro && <p className="qp-intro">{intro}</p>}
      </div>
      {children}
    </section>
  )
}

export function Faq({ items, heading, id = 'faq' }: { items: { q: string; a: string }[]; heading: string; id?: string }) {
  return (
    <section className="qp-faq" aria-labelledby={id}>
      <h2 id={id} className="qp-h2 rv">
        {heading}
      </h2>
      <div className="qp-faq-list">
        {items.map((f, i) => (
          <details key={i} className="qp-faq-item">
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
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
    <nav className="qp-related" aria-labelledby="related-h">
      <h2 id="related-h" className="qp-h2 rv">
        {heading}
      </h2>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className={l.gita ? 'fx-gita' : undefined} data-mp-location="related">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

/** End-of-page next step: the house daily-line band (gold rule, H2, next step). */
export function DailyBand({ heading, label, children }: { heading: string; label?: string; children: ReactNode }) {
  return (
    <section className="qp-daily" aria-label={label ?? heading}>
      <h2 className="qp-h2 rv">{heading}</h2>
      {children}
    </section>
  )
}

/** Mid-page next step: the house line-picker panel. */
export function NextPanel({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div className="qlf fx-next-panel rv">
      <h2 className="qlf-q">{heading}</h2>
      {children}
    </div>
  )
}
