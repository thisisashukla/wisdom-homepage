/**
 * Root of every Upanishads funnel page: the "Aranya" palette scope
 * (.fx-upanishads), fonts, page tracking, breadcrumbs and JSON-LD.
 */
import type { ReactNode } from 'react'
import BlogTracker from '@/components/BlogTracker'
import { tiro } from '@/components/quotes/fonts'
import NextStep from '@/components/quotes/NextStep'
import type { Locale } from '@/lib/quotes-shared'
import { breadcrumbLd, gitaHref, type Crumb } from '@/lib/funnels/upanishads'
import { spectral } from './fonts'
import ScriptToggle from './ScriptToggle'
import './aranya.css'

type ShellProps = {
  pageName: string
  locale: Locale
  crumbs: Crumb[]
  jsonLd: object[]
  children: ReactNode
  toggle?: boolean
}

export default function Shell({ pageName, locale, crumbs, jsonLd, children, toggle = true }: ShellProps) {
  const all = [breadcrumbLd(crumbs), ...jsonLd]
  return (
    <div className={`fx-upanishads ${tiro.variable} ${spectral.variable}`} data-script="deva" lang={locale}>
      <BlogTracker pageName={pageName} />
      {all.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
      <div className="fx-wrap">
        <nav className="fx-crumbs" aria-label={locale === 'hi' ? 'पेज का रास्ता' : 'Breadcrumb'}>
          <ol>
            {crumbs.map((c, i) => (
              <li key={c.path}>
                {i < crumbs.length - 1 ? <a href={c.path}>{c.name}</a> : <span aria-current="page">{c.name}</span>}
              </li>
            ))}
          </ol>
        </nav>
        {toggle && (
          <div className="fx-toolbar">
            <ScriptToggle page={pageName} locale={locale} />
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

/** A link back to a Gita verse, marked with the Wisdom gold thread. */
export function GitaBridge({ c, v, note, locale = 'en', lead }: { c: number; v: number; note: string; locale?: Locale; lead?: string }) {
  const label = locale === 'hi' ? `भगवद गीता ${c}.${v}` : `Bhagavad Gita ${c}.${v}`
  return (
    <p className="fx-bridge">
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
    <section className="fx-sec fx-faq" aria-labelledby="faq">
      <h2 id="faq">{heading}</h2>
      <dl>
        {items.map((f) => (
          <div key={f.q}>
            <dt>{f.q}</dt>
            <dd>{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function SourcesNote({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="fx-sec fx-sources" aria-labelledby="sources">
      <h2 id="sources">{heading}</h2>
      {children}
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
    <section className="fx-sec fx-next" aria-labelledby={`next-${placement}`}>
      <h2 id={`next-${placement}`}>{heading}</h2>
      <NextStep funnel="upanishads" locale={locale} pageName={pageName} pageKey={pageKey} placement={placement} copy={NEXT_COPY[locale]} />
    </section>
  )
}
