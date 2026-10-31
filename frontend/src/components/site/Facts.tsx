import type { Locale } from '@/lib/locale'
import './site.css'

/** Small chips under a hero or heading. Keep them about the reader, not about features. */
export default function Facts({ items, locale = 'en', label, className = '' }: { items?: string[]; locale?: Locale; label?: string; className?: string }) {
  if (!items?.length) return null
  return (
    <ul className={`sx-facts ${className}`.trim()} aria-label={label ?? (locale === 'hi' ? 'इस पेज पर' : 'At a glance')}>
      {items.map((f) => (
        <li key={f}>{f}</li>
      ))}
    </ul>
  )
}
