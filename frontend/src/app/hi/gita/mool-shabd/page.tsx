import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { JsonLd, NextStep, PageHero, Section } from '@/components/site'
import '@/components/learn/learn.css'
import KeyIdeasList from '@/components/learn/KeyIdeasList'
import { getVerse } from '@/lib/gita'
import { gitaLine, verseProps } from '@/lib/gitaLines'
import { LEARNING_PATH, PATH_HUB, PATH_LENGTH, stepUrl } from '@/lib/learningPath'
import { verseUrl } from '@/lib/gitaUrls'
import { abs, pageMeta } from '@/lib/seo'

const PATH = PATH_HUB.hi
const TITLE = `गीता के ${PATH_LENGTH} मूल शब्द: धर्म से मोक्ष तक, क्रम से | Wisdom`
const DESCRIPTION =
  'धर्म, कर्म, कर्मयोग, त्रिगुण, मन, बुद्धि, आत्मा, भक्ति और मोक्ष: भगवद् गीता के बारह मूल शब्द, ऐसे क्रम में कि हर शब्द अगले को समझना आसान करे, हर एक अपने श्लोकों के साथ।'

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  locale: 'hi',
  twin: { en: PATH_HUB.en, hi: PATH_HUB.hi },
})

export default async function MoolShabdPage() {
  const v = await gitaLine(2, 7)
  const hiMeaning = (await getVerse(2, 7))?.hindiTranslation?.replace(/\s+/g, ' ').trim()
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `गीता के ${PATH_LENGTH} मूल शब्द`,
    description: DESCRIPTION,
    url: abs(PATH),
    inLanguage: 'hi',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: PATH_LENGTH,
    itemListElement: LEARNING_PATH.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.title.hi,
      url: abs(stepUrl(s, 'hi')),
    })),
  }

  return (
    <>
      <JsonLd data={ld} />
      <PageTracker pageName="Gita Key Ideas HI" />
      <main lang="hi">
        <PageHero
          locale="hi"
          lang="hi"
          crumbs={[
            { label: 'भगवद् गीता', href: '/hi/gita' },
            { label: `${PATH_LENGTH} मूल शब्द`, href: PATH },
          ]}
          eyebrow="गीता में एक मार्ग"
          title={`गीता के ${PATH_LENGTH} मूल शब्द`}
          sub="गीता का अधिकांश उपदेश बारह शब्दों में समाया है। इस क्रम में पढ़ने पर हर शब्द अगले को समझना आसान कर देता है: कर्तव्य और कर्म से, मन और आत्मा होते हुए, भक्ति और मुक्ति तक।"
          facts={['धर्म से मोक्ष तक', 'हर शब्द अगले की ओर ले जाता है']}
          actions={[
            { href: '#path', label: 'धर्म से शुरू करें', location: 'mool_shabd_hero_start' },
            { href: PATH_HUB.en, label: 'अंग्रेज़ी में पढ़ें', location: 'mool_shabd_hero_en', hrefLang: 'en' },
          ]}
          verse={{
            ...verseProps(v, hiMeaning),
            source: 'भगवद् गीता 2.7',
            sourceHref: verseUrl(2, 7, 'hi'),
            label: 'अर्जुन, शिक्षा माँगते हुए',
          }}
        />

        <Section
          id="path"
          track="mool_shabd_path"
          title="मार्ग, क्रम से"
          intro="हर शब्द अपने पेज पर खुलता है, जहाँ उस पर गीता के सभी श्लोक हैं। हर शब्द के नीचे की पंक्ति बताती है कि वह इस स्थान पर क्यों है।"
          width="narrow"
          lang="hi"
        >
          <KeyIdeasList lang="hi" from="mool_shabd" />
        </Section>

        <Section tone="band" track="mool_shabd_how" title="ये परिचय कैसे लिखे गए" width="narrow" lang="hi">
          <div className="sx-prose rv">
            <p>
              परिचय पारंपरिक संस्कृत भाष्यकारों, शंकराचार्य और रामानुजाचार्य, और गीता प्रेस के हिन्दी अनुवाद के अनुसार हैं। जहाँ वे किसी शब्द को
              अलग ढंग से पढ़ते हैं, वहाँ हमने यह बताया है। श्लोक संख्या इस साइट के श्लोक पेजों के अनुसार है।
            </p>
            <p>यह क्रम पढ़ने का एक क्रम है, भीतर जाने का एक रास्ता। गीता स्वयं अपने अठारह अध्यायों में इन शब्दों के बीच आती जाती रहती है।</p>
          </div>
        </Section>

        <Section track="next_step" width="narrow">
          <div className="rv">
            <NextStep locale="hi" pageKey="mool-shabd" placement="end" />
          </div>
        </Section>
      </main>
    </>
  )
}
