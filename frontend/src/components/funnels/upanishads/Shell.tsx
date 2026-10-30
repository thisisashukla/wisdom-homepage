/**
 * Root of every Upanishads funnel page, in the house world (home.css tokens,
 * Playfair / Inter / Tiro). Renders tracking, JSON-LD, the typographic hero
 * (crumbs, the Sanskrit line as the visual, H1, chips, one gold CTA) and the
 * shared section helpers. Motion: house .rv (HomeAnimations), one hero line
 * reveal; the signature interactions live in SitCloser and NetiNeti.
 */
import type { ReactNode } from 'react'
import BlogTracker from '@/components/BlogTracker'
import HomeAnimations from '@/components/HomeAnimations'
import { tiro } from '@/components/quotes/fonts'
import NextStep from '@/components/quotes/NextStep'
import type { Locale } from '@/lib/quotes-shared'
import { breadcrumbLd, gitaHref, type Crumb } from '@/lib/funnels/upanishads'
import ScriptToggle from './ScriptToggle'
import Sanskrit from './Sanskrit'
import '@/app/home.css'
import '@/app/home-v3.css'
import '@/app/gita-for/gita-for.css'
import '@/app/gita-for/theme-plan.css'
import './house.css'

export type HeroAction = { href: string; label: string; loc: string; lang?: string }

export type HeroProps = {
  eyebrow?: string
  title: ReactNode
  sub?: ReactNode
  facts?: string[]
  cta?: HeroAction
  second?: HeroAction
  /** The visual: usually <HeroLine />. */
  visual: ReactNode
}

type ShellProps = {
  pageName: string
  locale: Locale
  crumbs: Crumb[]
  jsonLd: object[]
  hero: HeroProps
  children: ReactNode
  toggle?: boolean
}

export default function Shell({ pageName, locale, crumbs, jsonLd, hero, children, toggle = true }: ShellProps) {
  const all = [breadcrumbLd(crumbs), ...jsonLd]
  return (
    <div className={`fx-upanishads ${tiro.variable}`} data-script="deva" lang={locale}>
      <BlogTracker pageName={pageName} />
      <HomeAnimations />
      {all.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <header className="fx-hero">
        <div className="fx-hero-glow" aria-hidden="true" />
        <div className="wrap fx-hero-inner">
          <div className="fx-hero-top">
            <nav className="gf-crumbs fx-crumbs" aria-label={locale === 'hi' ? 'पेज का रास्ता' : 'Breadcrumb'}>
              <ol>
                {crumbs.map((c, i) => (
                  <li key={c.path}>
                    {i < crumbs.length - 1 ? <a href={c.path}>{c.name}</a> : <span aria-current="page">{c.name}</span>}
                  </li>
                ))}
              </ol>
            </nav>
            {toggle && <ScriptToggle page={pageName} locale={locale} />}
          </div>
          <div className="fx-hero-grid">
            <div className="fx-hero-text">
              {hero.eyebrow && <p className="tp-eyebrow">{hero.eyebrow}</p>}
              <h1 className="tp-h1">{hero.title}</h1>
              {hero.sub && <p className="tp-sub">{hero.sub}</p>}
              {hero.facts && hero.facts.length > 0 && (
                <ul className="tp-facts" aria-label={locale === 'hi' ? 'इस पेज पर' : 'On this page'}>
                  {hero.facts.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              )}
              {(hero.cta || hero.second) && (
                <div className="tp-hero-actions">
                  {hero.cta && (
                    <a href={hero.cta.href} hrefLang={hero.cta.lang} className="btn-read-gita btn-read-gita-primary" data-mp-location={hero.cta.loc}>
                      {hero.cta.label}
                    </a>
                  )}
                  {hero.second && (
                    <a href={hero.second.href} hrefLang={hero.second.lang} className="fx-hero-second" data-mp-location={hero.second.loc}>
                      {hero.second.label}
                    </a>
                  )}
                </div>
              )}
            </div>
            <div className="fx-hero-visual">{hero.visual}</div>
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}

/**
 * The hero visual: one Sanskrit line set large in Tiro, a gold rule that draws
 * in, the plain meaning in Playfair italic, and the source.
 */
export function HeroLine({ sa, iast, meaning, cite, lang = 'en', big, still, section }: { sa: string; iast: string; meaning?: string; cite?: string; lang?: Locale; big?: string; still?: boolean; section?: string }) {
  const longest = Math.max(...sa.split(/\n|(?<=[।|])\s+/u).map((l) => l.length))
  const len = longest > 46 ? 'long' : longest > 30 ? 'mid' : 'short'
  return (
    <figure className={`fx-hline${still ? ' fx-hline-still' : ''}`} data-len={len} data-mp-section={section}>
      {big && (
        <p className="fx-hline-big" lang="sa" aria-hidden="true">
          {big}
        </p>
      )}
      <Sanskrit sa={sa} iast={iast} size="hero" />
      <span className="fx-hline-rule" aria-hidden="true" />
      {meaning && (
        <p className="fx-hline-en" lang={lang}>
          {meaning}
        </p>
      )}
      {cite && <figcaption className="fx-hline-cite">{cite}</figcaption>}
    </figure>
  )
}

/** A full-width band: alternates .section / .section-alt like the house pages. */
export function Band({ id, alt, warm, wide, labelledBy, label, className = '', children }: { id?: string; alt?: boolean; warm?: boolean; wide?: boolean; labelledBy?: string; label?: string; className?: string; children: ReactNode }) {
  const tone = alt ? ' section-alt' : warm ? ' section-warm' : ''
  return (
    <section id={id} className={`section fx-band${tone} ${className}`} aria-labelledby={labelledBy} aria-label={label}>
      <div className={`wrap${wide ? '' : ' fx-col'}`}>{children}</div>
    </section>
  )
}

/** Left-aligned section head: optional eyebrow, heading, subtext. */
export function Head({ id, eyebrow, children, sub }: { id: string; eyebrow?: string; children: ReactNode; sub?: ReactNode }) {
  return (
    <div className="fx-head rv">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="heading">
        {children}
      </h2>
      {sub && <p className="subtext">{sub}</p>}
    </div>
  )
}

/** A link back to a Gita verse, as a house row card with the gold thread. */
export function GitaBridge({ c, v, note, locale = 'en', lead }: { c: number; v: number; note: string; locale?: Locale; lead?: string }) {
  const label = locale === 'hi' ? `भगवद गीता ${c}.${v}` : `Bhagavad Gita ${c}.${v}`
  return (
    <p className="fx-bridge rv">
      {lead && <span className="fx-bridge-lead">{lead} </span>}
      <a href={gitaHref(c, v, locale)} data-mp-location={`gita_bridge_${c}_${v}`}>
        {label}
      </a>
      {note && <span>: {note}</span>}
    </p>
  )
}

export function Faq({ items, heading }: { items: { q: string; a: string }[]; heading: string }) {
  return (
    <Band labelledBy="faq">
      <div className="fx-faq">
        <h2 id="faq" className="tp-h2 rv">
          {heading}
        </h2>
        <div className="tp-faq" data-stagger="60">
          {items.map((f) => (
            <details key={f.q} className="tp-faq-item rv">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Band>
  )
}

export function SourcesNote({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="fx-sources" aria-labelledby="sources">
      <div className="wrap fx-col">
        <h2 id="sources">{heading}</h2>
        {children}
      </div>
    </section>
  )
}

const NEXT_COPY = {
  en: {
    app: { line: 'Keep one line on your Lock Screen. A new one each morning.', cta: 'Get one line each morning' },
    whatsapp: { line: 'One Upanishad or Gita line each morning, on WhatsApp.', cta: 'Join' },
    email: { line: 'A week of lines for what you are going through, one each morning by email. The first week is free.', cta: 'Send my week' },
  },
  hi: {
    app: { line: 'लॉक स्क्रीन पर रोज़ सुबह एक नया श्लोक।', cta: 'हर सुबह एक श्लोक पाएं' },
    whatsapp: { line: 'हर सुबह उपनिषद या गीता का एक श्लोक, WhatsApp पर।', cta: 'जुड़ें' },
    email: { line: 'हर सुबह एक श्लोक, ईमेल पर। पहला हफ़्ता मुफ़्त।', cta: 'शुरू करें' },
  },
} as const

/** Device-aware next step with Upanishad copy (never promises content the app lacks). */
export function UpNext({ locale, pageName, pageKey, placement, heading }: { locale: Locale; pageName: string; pageKey: string; placement: string; heading: string }) {
  return (
    <Band alt className="fx-next-band" labelledBy={`next-${placement}`}>
      <div className="fx-next rv">
        <h2 id={`next-${placement}`} className="heading">
          {heading}
        </h2>
        <NextStep funnel="upanishads" locale={locale} pageName={pageName} pageKey={pageKey} placement={placement} copy={NEXT_COPY[locale]} />
      </div>
    </Band>
  )
}

export type Tile = { href: string; title: ReactNode; sub?: ReactNode; sa?: string; loc?: string; lang?: string }

/** Related links as house tiles (.gita-for-tile), optionally led by a Sanskrit line. */
export function Tiles({ items, cols }: { items: Tile[]; cols?: 2 | 3 }) {
  return (
    <ul className={`fx-tiles${cols ? ` fx-tiles-${cols}` : ''}`} data-stagger="60">
      {items.map((t) => (
        <li key={t.href} className="rv">
          <a href={t.href} hrefLang={t.lang} className="gita-for-tile fx-tile" data-mp-location={t.loc}>
            {t.sa && (
              <span className="fx-tile-sa" lang="sa">
                {t.sa}
              </span>
            )}
            <span className="gita-for-label">{t.title}</span>
            {t.sub && <span className="fx-tile-sub">{t.sub}</span>}
          </a>
        </li>
      ))}
    </ul>
  )
}
