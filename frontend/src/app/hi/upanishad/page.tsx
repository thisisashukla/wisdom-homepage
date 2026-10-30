import Shell, { Band, Faq, GitaBridge, Head, HeroLine, SourcesNote, Tiles, UpNext } from '@/components/funnels/upanishads/Shell'
import Sanskrit from '@/components/funnels/upanishads/Sanskrit'
import { articleLd, faqLd, SITE, upMeta } from '@/lib/funnels/upanishads'
import { LINES } from '@/content/funnels/upanishads/lines'
import { PRINCIPAL, SHVETASHVATARA, GITA_DHYANAM } from '@/content/funnels/upanishads/principal'

const PATH = '/hi/upanishad'
const PAGE = 'upanishads-hi-hub'
const TITLE = 'उपनिषद क्या है और कितने हैं: 10 मुख्य उपनिषद'
const DESC = 'उपनिषद क्या है, कितने उपनिषद हैं (108, जिनमें 10 मुख्य), कौन सा उपनिषद किस वेद का है, और पढ़ना कहाँ से शुरू करें। प्रसिद्ध श्लोक संस्कृत में।'

export const metadata = upMeta({ title: TITLE, description: DESC, path: PATH, locale: 'hi', twin: '/upanishads', ogCard: 'up-satyameva-jayate' })

const FAQ = [
  {
    q: 'उपनिषद कितने हैं?',
    a: 'परंपरा 108 उपनिषद मानती है, मुक्तिका उपनिषद की सूची के अनुसार। वैसे 200 से ज़्यादा ग्रंथों के नाम में उपनिषद आता है। इनमें 10 मुख्य उपनिषद हैं: ईश, केन, कठ, प्रश्न, मुण्डक, माण्डूक्य, तैत्तिरीय, ऐतरेय, छान्दोग्य और बृहदारण्यक।',
  },
  {
    q: 'उपनिषद किसने लिखे?',
    a: 'हिंदू परंपरा में उपनिषद श्रुति हैं, यानी ऋषियों ने इन्हें सुना और देखा, किसी ने रचा नहीं। इनमें कई गुरुओं के नाम आते हैं, जैसे याज्ञवल्क्य, उद्दालक आरुणि, अंगिरा, पिप्पलाद और यमराज।',
  },
  {
    q: 'सबसे पुराना उपनिषद कौन सा है?',
    a: 'ज़्यादातर विद्वान बृहदारण्यक और छान्दोग्य को सबसे पुराना मानते हैं। परंपरा के अनुसार वेद और उपनिषद अनादि हैं।',
  },
  {
    q: 'उपनिषद और वेद में क्या संबंध है?',
    a: 'हर उपनिषद किसी एक वेद का हिस्सा है और उसके अंत में आता है। इसीलिए उपनिषदों को वेदांत यानी "वेद का अंत" कहते हैं।',
  },
  {
    q: 'उपनिषद और गीता में क्या संबंध है?',
    a: 'गीता ध्यानम् कहता है कि सारे उपनिषद गायें हैं और गीता उनका दूध है। गीता के हर अध्याय के अंत में भी उसे उपनिषद कहा गया है।',
  },
]

export default function Page() {
  const hiLines = LINES.filter((l) => l.hi)
  const jsonLd = [
    articleLd({ headline: TITLE, description: DESC, path: PATH, citation: 'मुख्य उपनिषद, शंकराचार्य के भाष्य, मुक्तिका उपनिषद की सूची', locale: 'hi' }),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: '10 मुख्य उपनिषद',
      itemListElement: PRINCIPAL.map((u, i) => ({ '@type': 'ListItem', position: i + 1, name: `${u.hi} उपनिषद`, ...(u.href ? { url: `${SITE}${u.href}` } : {}) })),
    },
    faqLd(FAQ),
  ]
  return (
    <Shell
      pageName={PAGE}
      locale="hi"
      crumbs={[{ name: 'होम', path: '/' }, { name: 'उपनिषद', path: PATH }]}
      jsonLd={jsonLd}
      hero={{
        eyebrow: 'उपनिषद: गुरु के पास बैठकर',
        title: 'उपनिषद क्या है, और कितने उपनिषद हैं',
        facts: ['108 उपनिषद', '10 मुख्य उपनिषद', 'संस्कृत और हिंदी'],
        cta: { href: '#how-many', label: '10 मुख्य उपनिषद देखें', loc: 'hub_hero_ten' },
        second: { href: '#lines', label: 'प्रसिद्ध श्लोक', loc: 'hub_hero_lines' },
        visual: <HeroLine sa={'सत्यमेव जयते नानृतं'} iast={'satyam eva jayate nānṛtam'} meaning="जीत सत्य की ही होती है, झूठ की नहीं।" cite="मुण्डक उपनिषद 3.1.6" lang="hi" />,
      }}
    >
      <Band labelledBy="word">
        <p id="quick-answer" className="tp-intro rv">
          उपनिषद वेदों का आख़िरी हिस्सा हैं, इसलिए इन्हें वेदांत कहते हैं। इनमें आत्मा और ब्रह्म की शिक्षा है, ज़्यादातर गुरु और शिष्य की बातचीत के रूप में।
          परंपरा 108 उपनिषद गिनती है। इनमें से 10 मुख्य उपनिषद कहलाते हैं, क्योंकि आदि शंकराचार्य ने इन पर भाष्य लिखा।
        </p>
        <div className="fx-card fx-card-story rv">
          <h2 id="word" className="tp-label">
            उपनिषद शब्द का अर्थ
          </h2>
          <p className="fx-scene">
            उप (पास), नि (नीचे), षद् (बैठना): गुरु के पास नीचे बैठकर सुनी गई शिक्षा। शंकराचार्य इसी धातु का एक और अर्थ बताते हैं: वह ज्ञान जो अज्ञान की
            पकड़ को ढीला कर दे।
          </p>
        </div>
      </Band>

      <Band alt wide labelledBy="how-many">
        <Head id="how-many" sub="मुक्तिका उपनिषद में 108 उपनिषदों की सूची है। इनमें ये दस मुख्य हैं, जिन पर शंकराचार्य ने भाष्य लिखा:">
          कितने उपनिषद हैं, और 10 मुख्य उपनिषद
        </Head>
        <ul className="fx-ten" data-stagger="40">
          {PRINCIPAL.map((u) => (
            <li key={u.id} className="rv">
              <span className="fx-ten-name">{u.hi}</span>
              <span className="fx-ten-meta">
                {u.veda.hi}, {u.size.hi}
              </span>
              <span className="fx-ten-about">{u.about.hi}</span>
            </li>
          ))}
        </ul>
        <p className="fx-p rv" style={{ marginTop: 20 }}>
          {SHVETASHVATARA.hi}
        </p>
      </Band>

      <Band wide labelledBy="lines">
        <Head id="lines">उपनिषद के प्रसिद्ध श्लोक</Head>
        <Tiles
          cols={3}
          items={[
            ...hiLines.map((l) => ({ href: `/hi/upanishads/${l.slug}`, sa: l.writing.forms[0].sa, title: l.hi?.h1 ?? l.h1, sub: l.ref, loc: `hub_line_${l.slug}` })),
            { href: '/upanishads', lang: 'en', title: 'सभी 10 प्रसिद्ध श्लोक और पूरे उपनिषद (अंग्रेज़ी)', sub: 'ईश, कठ और माण्डूक्य उपनिषद पूरे, संस्कृत के साथ', loc: 'hub_english' },
          ]}
        />
      </Band>

      <Band alt labelledBy="first">
        <div className="fx-card fx-card-story rv">
          <h2 id="first" className="tp-label">
            पढ़ना कहाँ से शुरू करें
          </h2>
          <p className="fx-scene">
            ईश उपनिषद से। इसमें बस 18 मंत्र हैं, आज रात ख़त्म हो जाएगा। फिर कठ उपनिषद, जो एक कहानी है: बालक नचिकेता तीन रात यमराज के दरवाज़े पर बैठा रहता है
            और जवाब लिए बिना नहीं लौटता। उसके बाद माण्डूक्य, 12 मंत्रों में जाग्रत, स्वप्न और गहरी नींद की बात।
          </p>
        </div>
      </Band>

      <Band labelledBy="gita">
        <Head id="gita">उपनिषद और गीता</Head>
        <div className="fx-v rv">
          <p className="fx-v-ref-plain">गीता ध्यानम्, श्लोक 4</p>
          <Sanskrit sa={GITA_DHYANAM.sa} iast={GITA_DHYANAM.iast} size="small" />
          <p className="fx-v-en">{GITA_DHYANAM.hi}</p>
        </div>
        <p className="fx-p rv" style={{ marginTop: 28 }}>
          कठ उपनिषद में यमराज नचिकेता से जो कहते हैं, वही बात श्रीकृष्ण अर्जुन से लगभग उन्हीं शब्दों में कहते हैं:
        </p>
        <div className="fx-bridges" data-stagger="60">
          <GitaBridge c={2} v={20} note="आत्मा न जन्म लेता है, न मरता है (कठ 1.2.18 से मिलाएँ)" locale="hi" />
          <GitaBridge c={2} v={19} note="न मारने वाला समझता है, न मरने वाला (कठ 1.2.19 से मिलाएँ)" locale="hi" />
        </div>
      </Band>

      <UpNext locale="hi" pageName={PAGE} pageKey={PAGE} placement="hub-end" heading="हर सुबह एक श्लोक" />

      <Faq items={FAQ} heading="लोग अक्सर पूछते हैं" />

      <SourcesNote heading="स्रोत और तरीका">
        <p>
          संस्कृत पाठ Wisdom के संग्रह से है, जिसे sanskritdocuments.org के संस्करणों से मिलाया गया है। अर्थ Wisdom का अपना है, शंकराचार्य के भाष्य के आधार
          पर, और इसकी मानवीय समीक्षा चल रही है।
        </p>
        <p>
          <a href="/upanishads" hrefLang="en">
            Read this page in English
          </a>
        </p>
      </SourcesNote>
    </Shell>
  )
}
