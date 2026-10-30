/** Questions people ask, in the theme-plan FAQ style (native details, no JS needed). Copy is unchanged. */
import type { Faq } from '@/lib/funnels/other-gitas/content'

export default function FxFaq({ items }: { items: Faq[] }) {
  return (
    <div className="tp-faq og-faq" data-stagger="60">
      {items.map((f) => (
        <details key={f.q} className="tp-faq-item rv" data-track="faq" data-q={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  )
}
