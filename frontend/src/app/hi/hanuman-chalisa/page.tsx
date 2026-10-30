import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import Mala from '@/components/funnels/hanuman-chalisa/Mala'
import ScriptToggle from '@/components/funnels/hanuman-chalisa/ScriptToggle'
import { MeaningTracker, PrintButton } from '@/components/funnels/hanuman-chalisa/Trackers'
import { Faq, FullText, HcNextStep, Sources } from '@/components/funnels/hanuman-chalisa/Blocks'
import {
  abs,
  AUTHOR_LD,
  beads,
  breadcrumbLd,
  cardOg,
  chalisaWorkLd,
  COUNTER_PATH,
  editionCitation,
  faqLd,
  getUnits,
  HUB_PATH,
  HUB_PATH_HI,
  HUB_TWIN,
  JAYANTI_PATH,
  LEARN_PATH,
  ldJson,
  linePath,
  pageMeta,
  PUBLISHER_LD,
  UPDATED,
} from '@/lib/funnels/hanuman-chalisa'

const PAGE = 'hanuman-chalisa-hub-hi'

export const metadata: Metadata = pageMeta({
  title: 'हनुमान चालीसा अर्थ सहित, हर चौपाई का अर्थ | Wisdom',
  description:
    'पूरी हनुमान चालीसा, गीता प्रेस पाठ, हर दोहे और चौपाई का सरल हिंदी अर्थ। देवनागरी या रोमन में पढ़ें, प्रिंट करें, और 11, 21 या 108 पाठ गिनें।',
  path: HUB_PATH_HI,
  locale: 'hi',
  twin: HUB_TWIN,
  ogImage: cardOg('hc-1', 'hi'),
})

const FAQ = [
  {
    q: 'हनुमान चालीसा किसने लिखी?',
    a: 'गोस्वामी तुलसीदास ने, जिन्होंने रामचरितमानस भी लिखा। आखिरी चौपाई में वे अपना नाम लेते हैं: तुलसीदास सदा हरि चेरा।',
  },
  {
    q: 'हनुमान चालीसा में कितनी चौपाइयाँ हैं?',
    a: 'चालीस चौपाइयाँ, शुरू में दो दोहे और अंत में एक दोहा। कुल 43 पंक्तियाँ। चालीसा का अर्थ ही है चालीस।',
  },
  {
    q: 'हनुमान चालीसा किस भाषा में है?',
    a: 'अवधी में, जो अयोध्या क्षेत्र की भाषा है और रामचरितमानस की भी। इसलिए हिंदी बोलने वाले ज़्यादातर शब्द समझ लेते हैं, पर जसु, चेरा जैसे शब्द अवधी के हैं।',
  },
  {
    q: 'हनुमान चालीसा का पाठ कितनी बार करें?',
    a: 'चौपाई 38 में सौ बार पाठ की बात है: जो सत बार पाठ कर कोई। परिवारों में रोज़ एक बार, मंगलवार और शनिवार को 7, 11 या 21 बार, खास दिनों पर 108 बार, या 40 दिन रोज़ एक पाठ की परंपरा है।',
  },
  {
    q: 'हनुमान जयंती 2027 कब है?',
    a: 'मंगलवार, 20 अप्रैल 2027, चैत्र पूर्णिमा को, द्रिक पंचांग के अनुसार। तमिलनाडु में हनुमथ जयंती 7 जनवरी 2027 को है, और काली चौदस, 7 नवंबर 2026 को भी कई घरों में हनुमान पूजा होती है।',
  },
]

export default function HanumanChalisaHubHi() {
  const units = getUnits()

  const workLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${abs(HUB_PATH_HI)}#text`,
    name: 'हनुमान चालीसा अर्थ सहित',
    url: abs(HUB_PATH_HI),
    inLanguage: ['awa', 'hi'],
    isBasedOn: chalisaWorkLd,
    citation: editionCitation,
    author: AUTHOR_LD,
    publisher: PUBLISHER_LD,
    dateModified: UPDATED,
  }
  const listLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'हनुमान चालीसा, सभी 43 पंक्तियाँ',
    numberOfItems: units.length,
    itemListElement: units.map((u) => ({ '@type': 'ListItem', position: u.pos, name: `${u.label.hi}: ${u.awadhi[0]}`, url: abs(linePath(u.slug)) })),
  }
  const crumbs = breadcrumbLd([
    { name: 'Wisdom', path: '/' },
    { name: 'हनुमान चालीसा', path: HUB_PATH_HI },
  ])

  return (
    <main className="hc-main">
      <BlogTracker pageName={PAGE} />
      <MeaningTracker page={PAGE} locale="hi" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson([workLd, listLd, crumbs, faqLd(FAQ)]) }} />

      <nav className="hc-crumbs hc-noprint" aria-label="ब्रेडक्रम्ब">
        <a href="/">Wisdom</a> / <span>हनुमान चालीसा</span> /{' '}
        <a href={HUB_PATH} hrefLang="en" lang="en">
          In English
        </a>
      </nav>

      <div className="hc-intro">
        <h1 className="hc-h1" lang="hi">
          हनुमान चालीसा अर्थ सहित
        </h1>
        <p className="hc-quick" id="quick-answer" lang="hi">
          हनुमान चालीसा गोस्वामी तुलसीदास की अवधी रचना है, जिसमें शुरू के दो दोहे, चालीस चौपाइयाँ और अंत का एक दोहा है। नीचे गीता प्रेस
          के पाठ के अनुसार पूरी चालीसा है। हर पंक्ति के नीचे &ldquo;अर्थ&rdquo; छूने पर उसका सरल हिंदी अर्थ खुल जाता है, जिसे आप प्रिंट भी
          कर सकते हैं।
        </p>

        <div className="hc-controls hc-noprint">
          <ScriptToggle locale="hi" page={PAGE} />
          <PrintButton label="प्रिंट करें" page={PAGE} locale="hi" />
        </div>
        <ul className="hc-links hc-noprint">
          <li>
            <a className="hc-btn" href={LEARN_PATH} data-mp-location="hub_hi_learn" lang="hi">
              रोज़ 4 पंक्तियाँ याद करें (अंग्रेज़ी में)
            </a>
          </li>
          <li>
            <a className="hc-btn" href={COUNTER_PATH} data-mp-location="hub_hi_counter" lang="hi">
              11, 21 या 108 पाठ गिनें
            </a>
          </li>
        </ul>
      </div>

      <div className="hc-hub">
        <aside className="hc-hub-aside" aria-label="माला: हर पंक्ति का एक मनका">
          <Mala beads={beads('hi', 'anchor')} locale="hi" page={PAGE} mode="anchor" currentId="hc.d1" label="43 मनकों की माला, हर पंक्ति का एक" caption="हर पंक्ति का एक मनका। मनका छुएं, वही पंक्ति खुलेगी।">
            <span className="hc-mala-name" lang="hi">
              हनुमान चालीसा
            </span>
            <span className="hc-mala-sub" lang="hi">
              2 दोहे, 40 चौपाई, 1 दोहा
            </span>
          </Mala>
        </aside>

        <div>
          <section className="hc-section" aria-labelledby="hc-text-h">
            <h2 className="hc-h2" id="hc-text-h" lang="hi">
              पूरी हनुमान चालीसा
            </h2>
            <FullText units={units} locale="hi" />
          </section>

          <section className="hc-section hc-noprint" aria-labelledby="hc-gita-h">
            <h2 className="hc-h2" id="hc-gita-h" lang="hi">
              गीता में हनुमान
            </h2>
            <div className="hc-prose" lang="hi">
              <p>
                कुरुक्षेत्र में हनुमान जी अर्जुन के रथ की ध्वजा पर हैं। गीता में अर्जुन को कपिध्वज कहा गया है, जब वे कृष्ण से संवाद से ठीक
                पहले धनुष उठाते हैं।{' '}
                <a className="hc-gita" href="/hi/gita/chapter/1/verse/20" hrefLang="hi" data-mp-location="hub_hi_gita_1_20">
                  भगवद गीता 1.20 पढ़ें
                </a>
              </p>
            </div>
          </section>

          <p className="hc-note hc-noprint" lang="hi">
            <a href={JAYANTI_PATH} hrefLang="en">
              हनुमान जयंती 2027: मंगलवार, 20 अप्रैल (अंग्रेज़ी में)
            </a>
          </p>

          <Faq items={FAQ} locale="hi" heading="अक्सर पूछे जाने वाले सवाल" />
          <HcNextStep locale="hi" pageName={PAGE} pageKey="hc-hub-hi" placement="hub_end" />
          <Sources locale="hi" />
        </div>
      </div>
    </main>
  )
}
