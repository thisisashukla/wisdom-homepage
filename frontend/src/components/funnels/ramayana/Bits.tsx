import type { ReactNode } from 'react'

/** JSON-LD script tag. */
export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}

export function Crumbs({ items, label }: { items: { name: string; href?: string }[]; label: string }) {
  return (
    <nav className="rl-crumbs" aria-label={label}>
      <ol>
        {items.map((it, i) => (
          <li key={i}>{it.href ? <a href={it.href}>{it.name}</a> : <span aria-current="page">{it.name}</span>}</li>
        ))}
      </ol>
    </nav>
  )
}

export function Faq({ heading, qas, id = 'faq' }: { heading: string; qas: { q: string; a: string }[]; id?: string }) {
  return (
    <section className="rl-section" aria-labelledby={id}>
      <h2 className="rl-h2" id={id}>
        {heading}
      </h2>
      <dl className="rl-faq">
        {qas.map((x) => (
          <div key={x.q}>
            <dt>{x.q}</dt>
            <dd>{x.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function Sources({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="rl-sources" aria-label={heading}>
      <h2>{heading}</h2>
      {children}
    </section>
  )
}

/** Short "Sources and method" note shared by the English pages. */
export function MethodEn({ film = true }: { film?: boolean }) {
  return (
    <Sources heading="Sources and method">
      <p>
        Valmiki lines are from the Sanskrit Valmiki Ramayana; references give the kanda and sarga, which match the Gita Press
        edition. Shloka numbers differ between printed editions, so each line also carries its Wisdom line id. Tulsidas lines are
        from the Ramcharitmanas in Awadhi; where a doha number is given it follows the Gita Press, Gorakhpur edition, and where we
        could not yet confirm the number we give only the kand.
      </p>
      <p>
        The English is Wisdom&apos;s own. For Valmiki we checked our wording against M. N. Dutt&apos;s public-domain translation
        (1891 to 1894). Readings follow traditional commentary. Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted,
        human-reviewed.
      </p>
      {film && (
        <p>
          What we say about the film comes only from its published trailers and press reports, linked where we use them. We have
          not seen the film.
        </p>
      )}
    </Sources>
  )
}

export function MethodHi({ film = true }: { film?: boolean }) {
  return (
    <Sources heading="स्रोत और तरीका">
      <p>
        वाल्मीकि की पंक्तियाँ संस्कृत वाल्मीकि रामायण से हैं। संदर्भ में काण्ड और सर्ग दिए हैं, जो गीता प्रेस संस्करण से मेल खाते हैं।
        अलग-अलग संस्करणों में श्लोक संख्या बदलती है, इसलिए हर पंक्ति के साथ Wisdom की पंक्ति आईडी भी है। तुलसीदास की पंक्तियाँ अवधी
        रामचरितमानस से हैं। जहाँ दोहा संख्या दी है, वह गीता प्रेस, गोरखपुर संस्करण के हिसाब से है। जहाँ संख्या अभी पक्की नहीं कर पाए,
        वहाँ सिर्फ़ काण्ड का नाम है।
      </p>
      <p>
        हिंदी और अंग्रेज़ी अर्थ Wisdom ने खुद लिखे हैं। अनुवाद Wisdom का, संपादन अंकुर शुक्ला। टिप्पणी AI से तैयार, इंसान द्वारा जाँची गई।
      </p>
      {film && <p>फ़िल्म के बारे में जो भी लिखा है, वह सिर्फ़ उसके ट्रेलर और छपी खबरों पर आधारित है। हमने फ़िल्म नहीं देखी है।</p>}
    </Sources>
  )
}
