import type { Locale } from '@/lib/locale'
import { breadcrumbLd } from '@/lib/seo'
import JsonLd from './JsonLd'
import './site.css'

/** A breadcrumb step. The last item is the current page (rendered as text, aria-current). */
export type Crumb = { label: string; href: string }

export const HOME_CRUMB: Record<Locale, Crumb> = {
  en: { label: 'Home', href: '/' },
  hi: { label: 'होम', href: '/' },
}

/**
 * Breadcrumbs for every page: Home is added first, items follow, the last item is the current page.
 * Renders the matching BreadcrumbList JSON-LD unless ld={false} (when the page already emits one).
 */
export default function Breadcrumbs({ items, locale = 'en', ld = true, className = '' }: { items: Crumb[]; locale?: Locale; ld?: boolean; className?: string }) {
  const all = [HOME_CRUMB[locale], ...items]
  return (
    <>
      <nav className={`sx-crumbs ${className}`.trim()} aria-label={locale === 'hi' ? 'आप यहाँ हैं' : 'Breadcrumb'}>
        <ol>
          {all.map((c, i) =>
            i === all.length - 1 ? (
              <li key={c.href + i}>
                <span aria-current="page">{c.label}</span>
              </li>
            ) : (
              <li key={c.href + i}>
                <a href={c.href}>{c.label}</a>
              </li>
            )
          )}
        </ol>
      </nav>
      {ld && <JsonLd data={breadcrumbLd(all.map((c) => ({ name: c.label, path: c.href })))} />}
    </>
  )
}
