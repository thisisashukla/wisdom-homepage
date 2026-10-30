import type { LineView } from '@/lib/funnels/ramayana/types'
import Diya from './Diya'

type Crumb = { name: string; href?: string }

type Props = {
  locale: 'en' | 'hi'
  crumbs: Crumb[]
  crumbLabel: string
  eyebrow?: string
  h1: string
  sub?: string
  /** Verdict chip on scene pages. */
  chip?: string
  facts?: string[]
  cta?: { href: string; label: string; loc: string }
  /** The scripture line(s) set large as the hero visual. Devanagari only. */
  lines: LineView[]
  /** Small labels over each line when there are two (e.g. Valmiki / Tulsidas). */
  lineLabels?: string[]
  /** Diwali: warmer glow and a row of lamps that light once on load. */
  warm?: boolean
  h1Class?: string
}

const padas = (sa: string) => (sa.match(/[^।॥]+[।॥]*/gu) ?? [sa]).map((p) => p.trim()).filter(Boolean)

/**
 * Typographic hero in the house style: maroon ground, a diya glow, the line set large in Tiro
 * as the visual, and the plan-page text column (crumbs, eyebrow, Playfair H1, chips, gold button).
 */
export default function Hero({ locale, crumbs, crumbLabel, eyebrow, h1, sub, chip, facts, cta, lines, lineLabels, warm, h1Class }: Props) {
  return (
    <header className={`rl-hero${warm ? ' rl-hero-warm' : ''}`}>
      <div className="rl-hero-glow" aria-hidden="true" />
      <div className="wrap rl-hero-inner">
        <figure className={`rl-hero-line${lines.length > 1 ? ' rl-hero-pair' : ''}`}>
          {!warm && <Diya lamp="plain" state="lit" size={40} />}
          {lines.map((l, i) => (
            <div key={l.key} className={`rl-hero-verse rl-text-${l.text}`}>
              {lineLabels?.[i] && <p className="rl-hero-label">{lineLabels[i]}</p>}
              <blockquote className={`rl-hero-sa rl-hero-sa-${l.lang}${l.sa.length < 44 ? ' rl-hero-sa-short' : ''}`} lang={l.lang === 'awa' ? 'awa' : 'sa'}>
                {padas(l.sa).map((p, k) => (
                  <span key={k} className="rl-pada">
                    {p}
                  </span>
                ))}
              </blockquote>
              <figcaption className="rl-hero-cite">
                <span>{l.speaker}</span>
                <span className="rl-hero-ref">{l.ref}</span>
              </figcaption>
            </div>
          ))}
          {warm && (
            <div className="rl-hero-row" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((k) => (
                <span key={k} style={{ ['--k' as string]: k }}>
                  <Diya lamp="plain" state="lit" size={k === 2 ? 44 : 34} />
                </span>
              ))}
            </div>
          )}
        </figure>

        <div className="rl-hero-copy">
          <nav className="rl-crumbs" aria-label={crumbLabel}>
            <ol>
              {crumbs.map((it, i) => (
                <li key={i}>{it.href ? <a href={it.href}>{it.name}</a> : <span aria-current="page">{it.name}</span>}</li>
              ))}
            </ol>
          </nav>
          {eyebrow && <p className="rl-eyebrow">{eyebrow}</p>}
          <h1 className={`rl-h1${h1Class ? ` ${h1Class}` : ''}`}>{h1}</h1>
          {sub && <p className="rl-sub">{sub}</p>}
          {(chip || (facts && facts.length > 0)) && (
            <ul className="rl-facts" aria-label={locale === 'hi' ? 'एक नज़र में' : 'At a glance'}>
              {chip && <li className="rl-facts-verdict">{chip}</li>}
              {facts?.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          )}
          {cta && (
            <div className="rl-hero-actions">
              <a href={cta.href} className="btn-read-gita btn-read-gita-primary rl-hero-btn" data-mp-location={cta.loc}>
                {cta.label}
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
