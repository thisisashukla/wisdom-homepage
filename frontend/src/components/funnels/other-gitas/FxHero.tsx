/**
 * Typographic hero on the house pattern (ThemePlanPage): crumbs, eyebrow, Playfair H1, meta chips and one gold
 * primary button, set on the maroon diya glow. The art column carries scripture set large in Tiro.
 * Desktop: text left, verse right. Phone: H1, then the verse, then chips and the button.
 */
import type { ReactNode } from 'react'

type Crumb = { label: string; href?: string }
type Action = { href: string; label: string; location: string }

export default function FxHero({
  crumbs,
  eyebrow,
  title,
  sub,
  facts,
  cta,
  alt,
  art,
}: {
  crumbs: Crumb[]
  eyebrow: string
  title: ReactNode
  sub?: ReactNode
  facts: string[]
  cta: Action
  alt?: Action
  art: ReactNode
}) {
  return (
    <header className="og-hero" data-fx-fade="">
      <div className="og-hero-glow" aria-hidden="true" />
      <div className="wrap og-hero-grid">
        <div className="og-hero-text">
          <nav className="gf-crumbs tp-crumbs" aria-label="Breadcrumb">
            {crumbs.map((c, i) => (
              <span key={c.label}>
                {i > 0 && ' / '}
                {c.href ? <a href={c.href}>{c.label}</a> : <span>{c.label}</span>}
              </span>
            ))}
          </nav>
          <div className="tp-eyebrow">{eyebrow}</div>
          <h1 className="tp-h1">{title}</h1>
          {sub && <p className="tp-sub">{sub}</p>}
        </div>
        <div className="og-hero-art">{art}</div>
        <div className="og-hero-act">
          <ul className="tp-facts" aria-label="At a glance">
            {facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <div className="og-hero-actions">
            <a href={cta.href} className="btn-read-gita btn-read-gita-primary" data-mp-location={cta.location}>
              {cta.label}
            </a>
            {alt && (
              <a href={alt.href} className="og-hero-alt" data-mp-location={alt.location}>
                {alt.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
