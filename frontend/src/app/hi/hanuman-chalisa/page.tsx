import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { Faq, GitaBridge, JsonLd, LinkCards, NextStep, PageHero, ScriptToggle, Section } from '@/components/site'
import Mala from '@/components/funnels/hanuman-chalisa/Mala'
import { MeaningTracker, PrintButton } from '@/components/funnels/hanuman-chalisa/Trackers'
import { FullText, Sources } from '@/components/funnels/hanuman-chalisa/Blocks'
import { abs, AUTHOR_LD, pageMeta, PUBLISHER_LD } from '@/lib/seo'
import {
  beads,
  cardOg,
  chalisaWorkLd,
  COUNTER_PATH,
  editionCitation,
  getUnits,
  HUB_PATH,
  HUB_PATH_HI,
  HUB_TWIN,
  JAYANTI_PATH,
  LEARN_PATH,
  linePath,
  NEXT_COPY,
  START_SITUATION,
  unitVerse,
  UPDATED,
} from '@/lib/funnels/hanuman-chalisa'

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

  const d1 = units[0]

  return (
    <main>
      <PageTracker pageName="Hanuman Chalisa Hub HI" />
      <MeaningTracker />
      <JsonLd data={[workLd, listLd]} />

      <PageHero
        locale="hi"
        lang="hi"
        crumbs={[{ label: 'हनुमान चालीसा', href: HUB_PATH_HI }]}
        eyebrow="गोस्वामी तुलसीदास, अवधी में"
        title="हनुमान चालीसा अर्थ सहित"
        sub={
          <span id="quick-answer">
            हनुमान चालीसा गोस्वामी तुलसीदास की अवधी रचना है, जिसमें शुरू के दो दोहे, चालीस चौपाइयाँ और अंत का एक दोहा है। इसे धीरे-धीरे, एक-एक पंक्ति करके पढ़ें, और जिस पंक्ति पर मन रुके, दोबारा बोलने से पहले उसका अर्थ जान लें।
          </span>
        }
        facts={['मंगलवार और शनिवार का पाठ', 'एक पाठ में 6 से 10 मिनट']}
        actions={[
          { href: '#hc-text', label: 'पूरी चालीसा पढ़ें', location: 'hub_hi_hero_read' },
          { href: LEARN_PATH, label: 'रोज़ 4 पंक्तियाँ याद करें (अंग्रेज़ी में)', location: 'hub_hi_learn' },
          { href: COUNTER_PATH, label: '11, 21 या 108 पाठ गिनें', location: 'hub_hi_counter' },
          { href: HUB_PATH, label: <span lang="en">In English</span>, location: 'hub_hi_english', hrefLang: 'en' },
        ]}
        verse={{ ...unitVerse(d1), label: 'पहला दोहा' }}
      />

      <Section id="hc-text" tone="band" eyebrow="43 पंक्तियाँ" title="पूरी हनुमान चालीसा" lang="hi">
        <div className="hc-controls hc-noprint">
          <ScriptToggle locale="hi" />
          <PrintButton label="प्रिंट करें" />
        </div>

        <div className="hc-read hc-gap">
          <aside className="hc-read-aside" aria-label="माला: हर पंक्ति का एक मनका">
            <Mala beads={beads('hi', 'anchor')} locale="hi" mode="anchor" currentId="hc.d1" label="43 मनकों की माला, हर पंक्ति का एक" caption="हर पंक्ति का एक मनका। मनका छुएं, वही पंक्ति खुलेगी।">
              <span className="hc-mala-name" lang="hi">
                हनुमान चालीसा
              </span>
              <span className="hc-mala-sub" lang="hi">
                2 दोहे, 40 चौपाई, 1 दोहा
              </span>
            </Mala>
          </aside>
          <FullText units={units} locale="hi" />
        </div>
      </Section>

      <Section id="hc-gita" title="गीता में हनुमान" lang="hi" className="hc-noprint">
        <GitaBridge
          href="/hi/gita/chapter/1/verse/20"
          label="भगवद गीता 1.20 पढ़ें"
          why="कुरुक्षेत्र में हनुमान जी अर्जुन के रथ की ध्वजा पर हैं। गीता में अर्जुन को कपिध्वज कहा गया है, जब वे कृष्ण से संवाद से ठीक पहले धनुष उठाते हैं।"
          location="hub_hi_gita_1_20"
          locale="hi"
          className="rv"
        />
        <div className="hc-gap">
          <LinkCards
            items={[{ href: JAYANTI_PATH, title: 'हनुमान जयंती 2027: मंगलवार, 20 अप्रैल (अंग्रेज़ी में)', hrefLang: 'en', location: 'hub_hi_jayanti' }]}
          />
        </div>
      </Section>

      <Section id="hc-faq" tone="band" title="अक्सर पूछे जाने वाले सवाल" lang="hi">
        <Faq items={FAQ} locale="hi" />
      </Section>

      <Section className="hc-next">
        <NextStep locale="hi" pageKey="hc-hub-hi" placement="hub_end" startSituation={START_SITUATION} copy={NEXT_COPY.hi} />
        <Sources locale="hi" />
      </Section>
    </main>
  )
}
