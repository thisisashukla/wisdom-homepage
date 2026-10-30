import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import NextStep from '@/components/quotes/NextStep'
import Shell from '@/components/funnels/ramayana/Shell'
import SceneLedger from '@/components/funnels/ramayana/SceneLedger'
import LampLegend from '@/components/funnels/ramayana/LampLegend'
import KeepCards from '@/components/funnels/ramayana/KeepCards'
import { Crumbs, Faq, JsonLd, MethodHi } from '@/components/funnels/ramayana/Bits'
import { NEXT_COPY } from '@/components/funnels/ramayana/copy'
import { SCENES } from '@/lib/funnels/ramayana/data'
import { HUB_FAQ, HUB_QUICK } from '@/lib/funnels/ramayana/hubCopy'
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
      <Crumbs label="पथ" items={[{ name: 'Wisdom', href: '/' }, { name: 'रामायण', href: PATHS.hub }, { name: 'मूल ग्रंथ में' }]} />

      <header className="rl-hero">
        <h1 className="rl-h1">रामायण, मूल ग्रंथ में</h1>
        <p className="rl-promise">बड़े पर्दे पर देखा, अब वह पंक्ति पढ़िए जहाँ से वह दृश्य आया।</p>
        <div className="rl-shore" aria-hidden="true" />
        <p className="rl-quick" id="quick-answer">
          {HUB_QUICK.hi}
        </p>
      </header>

      <section className="rl-section" aria-labelledby="lamps">
        <h2 className="rl-h2" id="lamps">
          हर दृश्य के तीन दीये
        </h2>
        <p className="rl-lede">
          हर दृश्य के साथ तीन दीये हैं: फ़िल्म, वाल्मीकि और तुलसीदास। जलता दीया मतलब वह प्रसंग उस रूप में है। किसी दीये पर टैप करें और
          उस ग्रंथ की मूल पंक्ति सरल हिंदी अर्थ के साथ पढ़ें।
        </p>
        <LampLegend locale="hi" />
      </section>

      <section className="rl-section" aria-labelledby="scenes">
        <h2 className="rl-h2" id="scenes">
          दृश्य, कथा के क्रम में
        </h2>
        <SceneLedger scenes={SCENES} locale="hi" page={PAGE} showQuick />
      </section>

      <section className="rl-section" aria-labelledby="keep">
        <h2 className="rl-h2" id="keep">
          सहेजने लायक पंक्तियाँ
        </h2>
        <p className="rl-lede">कॉपी करें, WhatsApp पर भेजें, या इमेज सेव करें।</p>
        <KeepCards ids={['ram-anirveda', 'ram-trouble-passes', 'ram-good-sense', 'ram-hundred-years']} locale="hi" page={PAGE} pageKey="ramayana-original-hi" path={PATHS.hiOriginal} />
      </section>

      <div className="rl-next">
        <NextStep funnel="ramayana" locale="hi" pageName={PAGE} pageKey="ramayana-original-hi" placement="end" copy={NEXT_COPY.hi} />
      </div>

      <section className="rl-section" aria-labelledby="more">
        <h2 className="rl-h2" id="more">
          और पढ़ें
        </h2>
        <ul className="rl-links">
          <li>
            <a href={PATHS.hiDiwali} data-mp-location="links_diwali">
              <strong>राम की घर वापसी, वाल्मीकि और तुलसीदास के शब्दों में</strong>
              <span>दिवाली के पीछे की कथा, पंक्ति दर पंक्ति।</span>
            </a>
          </li>
          <li>
            <a href={PATHS.original} hrefLang="en" data-mp-location="links_english">
              <strong lang="en">Read in English</strong>
              <span>यही दृश्य, अंग्रेज़ी में, हर दृश्य के अलग पन्ने के साथ।</span>
            </a>
          </li>
        </ul>
      </section>

      <Faq heading="लोग पूछते हैं" qas={HUB_FAQ.hi} />
      <MethodHi />
    </Shell>
  )
}
