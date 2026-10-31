import type { Locale } from '@/lib/locale'
import { faqLd, type FaqItem } from '@/lib/seo'
import JsonLd from './JsonLd'
import './site.css'

/**
 * FAQ as native <details>. Opens are tracked site-wide as FAQ Opened (PageTracker).
 * Emits FAQPage JSON-LD unless ld={false}.
 */
export default function Faq({ items, locale = 'en', ld = true, className = '' }: { items: FaqItem[]; locale?: Locale; ld?: boolean; className?: string }) {
  if (!items.length) return null
  return (
    <>
      <div className={`sx-faq ${className}`.trim()} lang={locale}>
        {items.map((f) => (
          <details key={f.q} className="sx-faq-item" data-track="faq" data-q={f.q}>
            <summary>{f.q}</summary>
            <div className="sx-faq-a">{f.a}</div>
          </details>
        ))}
      </div>
      {ld && <JsonLd data={faqLd(items)} />}
    </>
  )
}
