import type { ReactNode } from 'react'
import BlogTracker from '@/components/BlogTracker'
import { tiro } from '@/components/quotes/fonts'
import { cormorant } from './fonts'
import ScriptToggle from './ScriptToggle'
import './mbh.css'

export type Crumb = { label: string; href?: string }

/** Page frame for every Mahabharata funnel page: tracker, JSON-LD, root palette class, crumbs and the script toggle. */
export default function Shell({
  page,
  locale = 'en',
  crumbs,
  jsonLd,
  children,
}: {
  page: string
  locale?: 'en' | 'hi'
  crumbs: Crumb[]
  jsonLd: object
  children: ReactNode
}) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogTracker pageName={page} />
      <main className={`fx-mahabharata ${cormorant.variable} ${tiro.variable}`} data-script="deva" lang={locale}>
        <div className="mb-top">
          <nav className="mb-crumbs" aria-label={locale === 'hi' ? 'आप यहाँ हैं' : 'Breadcrumb'}>
            <ol>
              {crumbs.map((c, i) => (
                <li key={i}>{c.href ? <a href={c.href}>{c.label}</a> : <span aria-current="page">{c.label}</span>}</li>
              ))}
            </ol>
          </nav>
          <ScriptToggle locale={locale} />
        </div>
        {children}
      </main>
    </>
  )
}
