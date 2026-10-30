import type { ReactNode } from 'react'
import BlogTracker from '@/components/BlogTracker'
import HomeAnimations from '@/components/HomeAnimations'
import { tiro } from '@/components/quotes/fonts'
import ScriptToggle from './ScriptToggle'
import '@/app/home.css'
import '@/app/home-v3.css'
import '@/app/gita-for/gita-for.css'
import '@/app/gita-for/theme-plan.css'
import '@/components/quotes/card.css'
import './mbh.css'

export type Crumb = { label: string; href?: string }

/** The scripture line set large as the visual of a typographic hero. */
export type HeroLine = { deva: string; iast: string; en: string; source: string }

export type HeroSpec = {
  eyebrow: string
  h1: ReactNode
  sub?: ReactNode
  facts?: string[]
  /** The one primary action (an anchor or GitaLink with the house button classes). */
  cta?: ReactNode
  /** Existing art, shown with the theme-plan scrim. */
  art?: { src: string; alt: string; position?: string }
  /** Typographic hero: maroon diya glow and this line in Tiro. */
  line?: HeroLine
  /** No verse-reveal motion in the hero (the page has its own moment, e.g. the tree). */
  calm?: boolean
}

function Crumbs({ crumbs, locale, className }: { crumbs: Crumb[]; locale: 'en' | 'hi'; className: string }) {
  return (
    <nav className={`gf-crumbs ${className}`} aria-label={locale === 'hi' ? 'आप यहाँ हैं' : 'Breadcrumb'}>
      <ol>
        {crumbs.map((c, i) => (
          <li key={i}>{c.href ? <a href={c.href}>{c.label}</a> : <span aria-current="page">{c.label}</span>}</li>
        ))}
      </ol>
    </nav>
  )
}

function Facts({ facts, locale, className = '' }: { facts?: string[]; locale: 'en' | 'hi'; className?: string }) {
  if (!facts?.length) return null
  return (
    <ul className={`tp-facts ${className}`} aria-label={locale === 'hi' ? 'इस पेज पर' : 'On this page'}>
      {facts.map((f) => (
        <li key={f}>{f}</li>
      ))}
    </ul>
  )
}

function ArtHero({ hero, crumbs, locale }: { hero: HeroSpec; crumbs: Crumb[]; locale: 'en' | 'hi' }) {
  const art = hero.art!
  return (
    <header className="tp-hero mb-hero">
      <picture className="tp-hero-art">
        <img src={art.src} alt={art.alt} width={1448} height={1086} decoding="async" fetchPriority="high" style={art.position ? { objectPosition: art.position } : undefined} />
      </picture>
      <div className="tp-hero-shade" aria-hidden="true" />
      <div className="wrap tp-hero-inner">
        <Crumbs crumbs={crumbs} locale={locale} className="tp-crumbs mb-crumbs" />
        <div className="tp-eyebrow">{hero.eyebrow}</div>
        <h1 className="tp-h1">{hero.h1}</h1>
        {hero.sub && <p className="tp-sub">{hero.sub}</p>}
        <Facts facts={hero.facts} locale={locale} />
        <div className="tp-hero-actions">{hero.cta}</div>
      </div>
    </header>
  )
}

function TypeHero({ hero, crumbs, locale }: { hero: HeroSpec; crumbs: Crumb[]; locale: 'en' | 'hi' }) {
  const l = hero.line!
  const deva = l.deva.split('\n')
  const iast = l.iast.split('\n')
  return (
    <header className="mb-thero" data-calm={hero.calm ? '' : undefined}>
      <div className="mb-thero-glow" aria-hidden="true" />
      <div className="wrap mb-thero-grid">
        <Crumbs crumbs={crumbs} locale={locale} className="mb-crumbs mb-thero-crumbs" />
        <div className="tp-eyebrow mb-thero-eyebrow">{hero.eyebrow}</div>
        <h1 className="tp-h1 mb-thero-h1">{hero.h1}</h1>
        {hero.sub && <p className="tp-sub mb-thero-sub">{hero.sub}</p>}
        <figure className="mb-plate">
          <span className="mb-plate-rule" aria-hidden="true" />
          <p className="mb-plate-sa mb-deva" lang="sa">
            {deva.map((r, i) => (
              <span key={i} className="mb-plate-row" style={{ ['--i' as string]: i }}>
                {r}
              </span>
            ))}
          </p>
          <p className="mb-plate-sa mb-plate-iast mb-iast" lang="sa-Latn">
            {iast.map((r, i) => (
              <span key={i} className="mb-plate-row" style={{ ['--i' as string]: i }}>
                {r}
              </span>
            ))}
          </p>
          <figcaption>
            <p className="mb-plate-en">{l.en}</p>
            <p className="mb-plate-src">{l.source}</p>
          </figcaption>
        </figure>
        <Facts facts={hero.facts} locale={locale} className="mb-thero-facts" />
        {hero.cta && <div className="tp-hero-actions mb-thero-cta">{hero.cta}</div>}
      </div>
    </header>
  )
}

/** Page frame for every Mahabharata funnel page: tracker, JSON-LD, house hero, script toggle, house motion. */
export default function Shell({
  page,
  locale = 'en',
  crumbs,
  jsonLd,
  hero,
  children,
}: {
  page: string
  locale?: 'en' | 'hi'
  crumbs: Crumb[]
  jsonLd: object
  hero: HeroSpec
  children: ReactNode
}) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogTracker pageName={page} />
      <main className={`fx-mahabharata ${tiro.variable}`} data-script="deva" lang={locale}>
        {hero.art ? <ArtHero hero={hero} crumbs={crumbs} locale={locale} /> : <TypeHero hero={hero} crumbs={crumbs} locale={locale} />}
        <div className="wrap mb-toolbar">
          <ScriptToggle locale={locale} page={page} />
        </div>
        {children}
      </main>
      <HomeAnimations />
    </>
  )
}

/** One house band: .section (or .section-alt), a left-aligned head, then content. */
export function Band({
  id,
  alt,
  mp,
  h,
  hId,
  lede,
  eyebrow,
  wide,
  lang,
  className,
  children,
}: {
  id?: string
  alt?: boolean
  mp?: string
  h?: ReactNode
  hId?: string
  lede?: ReactNode
  eyebrow?: string
  wide?: boolean
  lang?: string
  className?: string
  children?: ReactNode
}) {
  return (
    <section
      className={`section mb-band${alt ? ' section-alt' : ''}${className ? ` ${className}` : ''}`}
      id={id}
      aria-labelledby={h && hId ? hId : undefined}
      data-mp-section={mp}
      lang={lang}
    >
      <div className={`wrap mb-col${wide ? ' mb-col-wide' : ''}`}>
        {h && (
          <header className="mb-head rv">
            {eyebrow && <div className="eyebrow">{eyebrow}</div>}
            <h2 className="heading" id={hId}>
              {h}
            </h2>
            {lede && <p className="subtext">{lede}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
