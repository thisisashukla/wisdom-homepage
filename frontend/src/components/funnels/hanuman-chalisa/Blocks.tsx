/**
 * Server blocks shared by the Chalisa pages: the full text with meaning on
 * tap, the FAQ, the next step, the sources note.
 */

import NextStep from '@/components/quotes/NextStep'
import { anchorId, NEXT_COPY, START_SITUATION, type HcLocale, type HcUnit } from '@/lib/funnels/hanuman-chalisa'
import LineText from './LineText'

const T = {
  en: { meaning: 'Meaning', words: 'Word by word and where it happens' },
  hi: { meaning: 'अर्थ', words: 'शब्दार्थ (अंग्रेज़ी में)' },
} as const

export function FullText({ units, locale, withLinks = true }: { units: HcUnit[]; locale: HcLocale; withLinks?: boolean }) {
  const t = T[locale]
  return (
    <ol className="hc-text">
      {units.map((u) => (
        <li key={u.id} id={anchorId(u.id)} data-unit={u.id} data-kind={u.kind} className="hc-unit">
          <span className="hc-num" aria-hidden="true">
            {u.kind === 'chaupai' ? u.n : ''}
          </span>
          <div>
            <p className="hc-unit-label" lang={locale}>
              {u.label[locale]}
            </p>
            <LineText awadhi={u.awadhi} iast={u.iast} />
            <details className="hc-mean" data-hc-line={u.id}>
              <summary lang={locale}>{t.meaning}</summary>
              <p className="hc-mean-body" lang={locale}>
                {u.meaning[locale]}
              </p>
              {withLinks && (
                <p className="hc-mean-more">
                  <a href={`/hanuman-chalisa/${u.slug}`} data-mp-location="hub_line_link" lang={locale}>
                    {t.words}
                  </a>
                </p>
              )}
            </details>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function Faq({ items, locale, heading }: { items: { q: string; a: string }[]; locale: HcLocale; heading: string }) {
  return (
    <section className="hc-section" aria-labelledby="hc-faq-h">
      <h2 className="hc-h2" id="hc-faq-h" lang={locale}>
        {heading}
      </h2>
      <dl className="hc-faq" lang={locale}>
        {items.map((f) => (
          <div key={f.q}>
            <dt>{f.q}</dt>
            <dd>{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function HcNextStep({ locale, pageName, pageKey, placement }: { locale: HcLocale; pageName: string; pageKey: string; placement: string }) {
  return (
    <div className="hc-next-step">
      <NextStep funnel="hanuman-chalisa"
        locale={locale}
        pageName={pageName}
        pageKey={pageKey}
        placement={placement}
        startSituation={START_SITUATION}
        copy={NEXT_COPY[locale]}
      />
    </div>
  )
}

export function Sources({ locale }: { locale: HcLocale }) {
  if (locale === 'hi') {
    return (
      <section className="hc-section" aria-labelledby="hc-src-h">
        <h2 className="hc-h2" id="hc-src-h" lang="hi">
          स्रोत और तरीका
        </h2>
        <div className="hc-prose" lang="hi">
          <p>
            मूल पाठ गोस्वामी तुलसीदास की अवधी रचना है, गीता प्रेस, गोरखपुर के प्रचलित पाठ के अनुसार। हमने इसे गीता प्रेस की तीन
            प्रतियों, जगद्गुरु रामभद्राचार्य की महावीरी व्याख्या के मूल पाठ और कविता कोश से मिलाया है। जहाँ पाठ अलग है, वहाँ
            पंक्ति के पेज पर लिखा है।
          </p>
          <p>हिंदी और अंग्रेज़ी अर्थ Wisdom के अपने शब्दों में हैं, पारंपरिक अर्थ के अनुसार, और अंकुर शुक्ला ने संपादित किए हैं।</p>
        </div>
      </section>
    )
  }
  return (
    <section className="hc-section" aria-labelledby="hc-src-h">
      <h2 className="hc-h2" id="hc-src-h">
        Sources and method
      </h2>
      <div className="hc-prose">
        <p>
          The Awadhi text is Goswami Tulsidas&apos;s, in the popular Gita Press, Gorakhpur reading. We checked every line against three
          Gita Press printings, the mool text of Jagadguru Rambhadracharya&apos;s Mahaviri commentary, and Kavita Kosh. Where editions
          differ, the line&apos;s own page says so.
        </p>
        <p>
          The English and Hindi meanings are Wisdom&apos;s own, written to follow the traditional reading, and edited by Ankur Shukla.
          Ramayana references are to the Ramcharitmanas and the Valmiki Ramayana as numbered in our texts; printed editions can differ
          by a doha or a verse.
        </p>
      </div>
    </section>
  )
}
