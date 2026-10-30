/** FAQ as heading + list. The same items feed the FAQPage JSON-LD on each page. */
export default function Faq({ items, heading, lang }: { items: { q: string; a: string }[]; heading: string; lang?: string }) {
  return (
    <section className="mb-sec mb-faq" aria-labelledby="mb-faq-h" lang={lang} data-mp-section="faq">
      <h2 id="mb-faq-h">{heading}</h2>
      <dl>
        {items.map((f) => (
          <div key={f.q} className="mb-faq-item">
            <dt>{f.q}</dt>
            <dd>{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
