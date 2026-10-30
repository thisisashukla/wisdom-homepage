import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import NextStep from '@/components/quotes/NextStep'
import Shell from '@/components/funnels/ramayana/Shell'
import SceneLedger from '@/components/funnels/ramayana/SceneLedger'
import LampLegend from '@/components/funnels/ramayana/LampLegend'
import KeepCards from '@/components/funnels/ramayana/KeepCards'
import Hero from '@/components/funnels/ramayana/Hero'
import { Band, Faq, JsonLd, MethodHi, Tiles } from '@/components/funnels/ramayana/Bits'
import { NEXT_COPY } from '@/components/funnels/ramayana/copy'
import { SCENES, getLine, lineView } from '@/lib/funnels/ramayana/data'
import { HUB_COUNTS, HUB_FAQ, HUB_QUICK } from '@/lib/funnels/ramayana/hubCopy'
import { PATHS } from '@/lib/funnels/ramayana/paths'
import { articleLd, breadcrumbLd, faqLd, itemListLd, pageMeta } from '@/lib/funnels/ramayana/seo'

const PAGE = 'ramayana-in-the-original-hi'
const DESC = 'लक्ष्मण रेखा, अहल्या, केवट, शबरी के बेर: रामायण फ़िल्म के कौन से दृश्य वाल्मीकि में हैं और कौन से तुलसीदास के, मूल पंक्तियों और हिंदी अर्थ के साथ।'

export const metadata: Metadata = pageMeta({
  title: 'लक्ष्मण रेखा, अहल्या, शबरी: मूल रामायण में क्या है',
  description: DESC,
  path: PATHS.hiOriginal,
  locale: 'hi',
  twin: { en: PATHS.original, hi: PATHS.hiOriginal },
  card: 'ram-anirveda',
})

export default function HiInTheOriginalPage() {
  return (
    <Shell locale="hi">
      <BlogTracker pageName={PAGE} />
      <JsonLd
        data={[
          breadcrumbLd([
            { name: 'Wisdom', path: '/' },
            { name: 'रामायण', path: PATHS.hub },
            { name: 'मूल ग्रंथ में', path: PATHS.hiOriginal },
          ]),
          articleLd({ headline: 'रामायण, मूल ग्रंथ में', description: DESC, path: PATHS.hiOriginal, locale: 'hi', about: ['रामायण', 'रामचरितमानस'] }),
          itemListLd(
            'रामायण फ़िल्म के दृश्य, वाल्मीकि और तुलसीदास से मिलाकर',
            SCENES.map((s) => ({ name: s.question.hi, path: `${PATHS.hiOriginal}#${s.slug}` })),
          ),
          faqLd(HUB_FAQ.hi),
        ]}
      />
      <Hero
        locale="hi"
        crumbLabel="पथ"
        crumbs={[{ name: 'Wisdom', href: '/' }, { name: 'रामायण', href: PATHS.hub }, { name: 'मूल ग्रंथ में' }]}
        eyebrow="फ़िल्म, वाल्मीकि, तुलसीदास"
        h1="रामायण, मूल ग्रंथ में"
        sub="बड़े पर्दे पर देखा, अब वह पंक्ति पढ़िए जहाँ से वह दृश्य आया।"
        facts={[`${HUB_COUNTS.total} दृश्य`, `${HUB_COUNTS.both} दोनों ग्रंथों में`, `${HUB_COUNTS.tulsidasOnly} सिर्फ़ तुलसीदास के यहाँ`]}
        cta={{ href: '#scenes', label: 'दृश्य देखें', loc: 'hero_scenes' }}
        lines={[lineView(getLine('rcm-6-36-1'), 'hi')]}
      />

      <Band className="rl-introsec">
        <p className="rl-intro rv" id="quick-answer">
          {HUB_QUICK.hi}
        </p>
      </Band>

      <Band
        id="lamps"
        title="हर दृश्य के तीन दीये"
        tone="alt"
        lede="हर दृश्य के साथ तीन दीये हैं: फ़िल्म, वाल्मीकि और तुलसीदास। जलता दीया मतलब वह प्रसंग उस रूप में है। किसी दीये पर टैप करें और उस ग्रंथ की मूल पंक्ति सरल हिंदी अर्थ के साथ पढ़ें।"
      >
        <div className="rv">
          <LampLegend locale="hi" />
        </div>
      </Band>

      <Band id="scenes" title="दृश्य, कथा के क्रम में">
        <SceneLedger scenes={SCENES} locale="hi" page={PAGE} showQuick />
      </Band>

      <Band id="keep" title="सहेजने लायक पंक्तियाँ" lede="कॉपी करें, WhatsApp पर भेजें, या इमेज सेव करें।" tone="alt" wide>
        <div className="rv">
          <KeepCards ids={['ram-anirveda', 'ram-trouble-passes', 'ram-good-sense', 'ram-hundred-years']} locale="hi" page={PAGE} pageKey="ramayana-original-hi" path={PATHS.hiOriginal} />
        </div>
      </Band>

      <Band>
        <div className="rl-final rv">
          <NextStep funnel="ramayana" locale="hi" pageName={PAGE} pageKey="ramayana-original-hi" placement="end" copy={NEXT_COPY.hi} />
        </div>
      </Band>

      <Band id="more" title="और पढ़ें" tone="alt" wide>
        <Tiles
          items={[
            { href: PATHS.hiDiwali, t: 'राम की घर वापसी, वाल्मीकि और तुलसीदास के शब्दों में', s: 'दिवाली के पीछे की कथा, पंक्ति दर पंक्ति।' },
            { href: PATHS.original, t: 'Read in English', s: 'यही दृश्य, अंग्रेज़ी में, हर दृश्य के अलग पन्ने के साथ।', lang: 'en' },
          ]}
          loc={(href) => (href === PATHS.hiDiwali ? 'links_diwali' : 'links_english')}
        />
      </Band>

      <Faq heading="लोग पूछते हैं" qas={HUB_FAQ.hi} />
      <MethodHi />
    </Shell>
  )
}
