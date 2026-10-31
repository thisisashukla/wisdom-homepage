import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { Faq, JsonLd, LinkCards, NextStep, PageHero, Section } from '@/components/site'
import SceneLedger from '@/components/funnels/ramayana/SceneLedger'
import LampLegend from '@/components/funnels/ramayana/LampLegend'
import KeepCards from '@/components/funnels/ramayana/KeepCards'
import { Speaker } from '@/components/funnels/ramayana/LineVerse'
import { MethodHi } from '@/components/funnels/ramayana/Method'
import { NEXT_COPY } from '@/components/funnels/ramayana/copy'
import { SCENES, getLine, lineView } from '@/lib/funnels/ramayana/data'
import { HUB_COUNTS, HUB_FAQ, HUB_QUICK } from '@/lib/funnels/ramayana/hubCopy'
import { PATHS } from '@/lib/funnels/ramayana/paths'
import { articleLd, itemListLd, ramayanaMeta } from '@/lib/funnels/ramayana/seo'
import { lineOriginal } from '@/lib/funnels/ramayana/verse'

const DESC = 'लक्ष्मण रेखा, अहल्या, केवट, शबरी के बेर: रामायण फ़िल्म के कौन से दृश्य वाल्मीकि में हैं और कौन से तुलसीदास के, मूल पंक्तियों और हिंदी अर्थ के साथ।'

export const metadata: Metadata = ramayanaMeta({
  title: 'लक्ष्मण रेखा, अहल्या, शबरी: मूल रामायण में क्या है',
  description: DESC,
  path: PATHS.hiOriginal,
  locale: 'hi',
  twin: { en: PATHS.original, hi: PATHS.hiOriginal },
  card: 'ram-anirveda',
})

export default function HiInTheOriginalPage() {
  const hero = lineView(getLine('rcm-6-36-1'), 'hi')
  return (
    <main>
      <PageTracker pageName="Ramayana In The Original HI" />
      <JsonLd
        data={[
          articleLd({ headline: 'रामायण, मूल ग्रंथ में', description: DESC, path: PATHS.hiOriginal, locale: 'hi', about: ['रामायण', 'रामचरितमानस'] }),
          itemListLd(
            'रामायण फ़िल्म के दृश्य, वाल्मीकि और तुलसीदास से मिलाकर',
            SCENES.map((s) => ({ name: s.question.hi, path: `${PATHS.hiOriginal}#${s.slug}` })),
          ),
        ]}
      />
      <PageHero
        locale="hi"
        lang="hi"
        crumbs={[
          { label: 'रामायण', href: PATHS.hub },
          { label: 'मूल ग्रंथ में', href: PATHS.hiOriginal },
        ]}
        eyebrow="फ़िल्म और मूल ग्रंथ"
        title="रामायण, मूल ग्रंथ में"
        sub="फ़िल्म या ट्रेलर का कोई दृश्य चुनिए और पढ़िए कि वाल्मीकि और तुलसीदास ने असल में क्या लिखा।"
        facts={[`${HUB_COUNTS.total} दृश्य`, `${HUB_COUNTS.both} दोनों ग्रंथों में`, `${HUB_COUNTS.tulsidasOnly} सिर्फ़ तुलसीदास के यहाँ`]}
        actions={[{ href: '#scenes', label: 'दृश्य देखें', location: 'hero_scenes' }]}
        verse={{ ...lineOriginal(hero), label: <Speaker line={hero} locale="hi" />, source: hero.ref }}
      />

      <Section spacing="tight" rv={false} lang="hi">
        <p className="sx-prose rv" id="quick-answer">
          {HUB_QUICK.hi}
        </p>
      </Section>

      <Section
        id="lamps"
        tone="band"
        lang="hi"
        title="हर दृश्य के तीन दीये"
        intro="फ़िल्म के कुछ प्रसंग वाल्मीकि में हैं, और कुछ सिर्फ़ तुलसीदास या बाद की कथाओं में। जलता दीया बताता है कि प्रसंग किस ग्रंथ में है।"
      >
        <div className="rv">
          <LampLegend locale="hi" />
        </div>
      </Section>

      <Section id="scenes" title="दृश्य, कथा के क्रम में" lang="hi">
        <SceneLedger scenes={SCENES} locale="hi" showQuick />
      </Section>

      <Section id="keep" tone="band" title="सहेजने लायक पंक्तियाँ" intro="एक पंक्ति इस हफ़्ते के लिए रख लें, या उस दोस्त को भेजें जो फ़िल्म देखने जा रहा है।" lang="hi">
        <KeepCards ids={['ram-anirveda', 'ram-trouble-passes', 'ram-good-sense', 'ram-hundred-years']} locale="hi" pageKey="ramayana-original-hi" path={PATHS.hiOriginal} />
      </Section>

      <Section>
        <NextStep locale="hi" pageKey="ramayana-original-hi" placement="end" copy={NEXT_COPY.hi} />
      </Section>

      <Section id="more" tone="band" title="और पढ़ें" lang="hi">
        <LinkCards
          items={[
            { href: PATHS.hiDiwali, title: 'राम की घर वापसी, वाल्मीकि और तुलसीदास के शब्दों में', body: 'दिवाली के पीछे की कथा, पंक्ति दर पंक्ति।', location: 'links_diwali' },
            { href: PATHS.original, title: <span lang="en">Read in English</span>, body: 'यही दृश्य, अंग्रेज़ी में, हर दृश्य के अलग पन्ने के साथ।', hrefLang: 'en', location: 'links_english' },
          ]}
        />
      </Section>

      <Section id="faq" title="लोग पूछते हैं" lang="hi">
        <Faq items={HUB_FAQ.hi} locale="hi" />
      </Section>
      <MethodHi />
    </main>
  )
}
