import type { Faq } from '../_lib/faqs'

export default function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="dh-faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <div>
            {f.a.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  )
}
