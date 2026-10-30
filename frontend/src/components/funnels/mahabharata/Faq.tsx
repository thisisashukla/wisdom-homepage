import { Band } from './Shell'

/** FAQ as house accordions (.tp-faq). The same items feed the FAQPage JSON-LD on each page; answers stay in the HTML. */
export default function Faq({ items, heading, lang, alt }: { items: { q: string; a: string }[]; heading: string; lang?: string; alt?: boolean }) {
  return (
    <Band alt={alt} mp="faq" h={heading} hId="mb-faq-h" lang={lang} className="mb-faq">
      <div className="tp-faq rv">
        {items.map((f) => (
          <details key={f.q} className="tp-faq-item" data-track="faq" data-q={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </Band>
  )
}
