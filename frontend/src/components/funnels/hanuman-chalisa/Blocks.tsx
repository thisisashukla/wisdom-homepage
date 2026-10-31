/**
 * Server blocks shared by the Chalisa pages: the full text with meaning on
 * tap (VerseCards in a VerseList) and the sources note.
 */

import { VerseCard, VerseList } from '@/components/site'
import type { Locale } from '@/lib/locale'
import { anchorId, unitVerse, type HcUnit } from '@/lib/funnels/hanuman-chalisa'

const T = {
  en: { meaning: 'Meaning', words: 'Word by word and where it happens' },
  hi: { meaning: 'अर्थ', words: 'शब्दार्थ (अंग्रेज़ी में)' },
} as const

/** All 43 units in order. Each meaning opens on tap (Line Opened, via MeaningTracker); the mala follows the line in view. */
export function FullText({ units, locale, withLinks = true }: { units: HcUnit[]; locale: Locale; withLinks?: boolean }) {
  const t = T[locale]
  return (
    <VerseList className="hc-text">
      {units.map((u) => (
        <VerseCard
          key={u.id}
          as="li"
          id={anchorId(u.id)}
          className={`hc-unit hc-unit--${u.kind}`}
          size="compact"
          align="left"
          locale={locale}
          label={<span lang={locale}>{u.label[locale]}</span>}
          {...unitVerse(u)}
        >
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
        </VerseCard>
      ))}
    </VerseList>
  )
}

export function Sources({ locale }: { locale: Locale }) {
  if (locale === 'hi') {
    return (
      <section className="hc-sources" aria-labelledby="hc-src-h">
        <h2 className="sx-h3" id="hc-src-h" lang="hi">
          स्रोत और तरीका
        </h2>
        <div className="sx-prose hc-small" lang="hi">
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
    <section className="hc-sources" aria-labelledby="hc-src-h">
      <h2 className="sx-h3" id="hc-src-h">
        Sources and method
      </h2>
      <div className="sx-prose hc-small">
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
