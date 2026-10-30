import type { ReactNode } from 'react'

/** JSON-LD script tag. */
export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}

/** A house band: .section (or .section-alt / .section-warm) with a left-aligned head and an inner column. */
export function Band({
  id,
  tone,
  eyebrow,
  title,
  lede,
  wide,
  className,
  children,
}: {
  id?: string
  tone?: 'alt' | 'warm'
  eyebrow?: string
  title?: ReactNode
  lede?: ReactNode
  wide?: boolean
  className?: string
  children?: ReactNode
}) {
  return (
    <section
      className={`section rl-band${tone ? ` section-${tone}` : ''}${className ? ` ${className}` : ''}`}
      aria-labelledby={title && id ? id : undefined}
    >
      <div className={`wrap${wide ? '' : ' rl-col'}`} data-stagger="60">
        {(eyebrow || title || lede) && (
          <div className="rl-head rv">
            {eyebrow && <p className="rl-eyebrow">{eyebrow}</p>}
            {title && (
              <h2 className="rl-h2" id={id}>
                {title}
              </h2>
            )}
            {lede && <p className="rl-lede">{lede}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

/** FAQ as the plan-page accordion (native details, readable without JS). */
export function Faq({ heading, qas, id = 'faq', tone }: { heading: string; qas: { q: string; a: string }[]; id?: string; tone?: 'alt' | 'warm' }) {
  return (
    <Band id={id} title={heading} tone={tone}>
      <div className="rl-faq rv">
        {qas.map((x) => (
          <details key={x.q} className="rl-faq-item">
            <summary>{x.q}</summary>
            <p>{x.a}</p>
          </details>
        ))}
      </div>
    </Band>
  )
}

export function Sources({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section className="rl-sources" aria-label={heading}>
      <div className="wrap rl-col">
        <h2>{heading}</h2>
        {children}
      </div>
    </section>
  )
}

/** Tiles for related pages, in the house .gita-for-tile pattern. */
export function Tiles({ items, loc }: { items: { href: string; t: string; s: string; lang?: 'en' | 'hi' }[]; loc: (href: string) => string }) {
  return (
    <ul className="rl-tiles">
      {items.map((x) => (
        <li key={x.href} className="rv">
          <a href={x.href} className="gita-for-tile rl-tile" data-mp-location={loc(x.href)} hrefLang={x.lang}>
            <span className="gita-for-label rl-tile-label" lang={x.lang}>
              {x.t}
            </span>
            <span className="rl-tile-sub">{x.s}</span>
          </a>
        </li>
      ))}
    </ul>
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
