import PageTracker from '@/components/BlogTracker'
import { Faq, JsonLd, LinkCards, PageHero, Section, VerseCard } from '@/components/site'
import { Bridge, Bridges, SourcesNote, UpNext } from '@/components/funnels/upanishads/parts'
import { articleLd, padas, SITE, upMeta } from '@/lib/funnels/upanishads'
import { LINES } from '@/content/funnels/upanishads/lines'
import { PRINCIPAL, SHVETASHVATARA, GITA_DHYANAM } from '@/content/funnels/upanishads/principal'
import { MUKTIKA } from '@/content/funnels/upanishads/muktika'

const PATH = '/hi/upanishad'
const PAGE = 'upanishads-hi-hub'
const TITLE = 'उपनिषद कितने हैं? 108 उपनिषदों के नाम, 10 मुख्य उपनिषद'
const DESC = 'उपनिषद 108 हैं, मुक्तिका उपनिषद की सूची के अनुसार, और इनमें 10 मुख्य हैं। सभी 108 उपनिषदों के नाम वेद के अनुसार, और पढ़ना कहाँ से शुरू करें।'
const PRINCIPAL_HREF = new Map(PRINCIPAL.map((u) => [u.en, u.href]))

export const metadata = upMeta({ title: TITLE, description: DESC, path: PATH, locale: 'hi', twin: '/upanishads', ogCard: 'up-satyameva-jayate' })

const FAQ = [
  {
    q: 'उपनिषद कितने हैं और उनके नाम क्या हैं?',
    a: 'परंपरा 108 उपनिषद मानती है, मुक्तिका उपनिषद की सूची के अनुसार। वैसे 200 से ज़्यादा ग्रंथों के नाम में उपनिषद आता है। इनमें 10 मुख्य उपनिषद हैं: ईश, केन, कठ, प्रश्न, मुण्डक, माण्डूक्य, तैत्तिरीय, ऐतरेय, छान्दोग्य और बृहदारण्यक। सभी 108 के नाम ऊपर वेद के अनुसार दिए हैं।',
  },
  {
    q: 'कौन सा उपनिषद किस वेद का है?',
    a: 'मुक्तिका की सूची में ऋग्वेद के 10, शुक्ल यजुर्वेद के 19, कृष्ण यजुर्वेद के 32, सामवेद के 16 और अथर्ववेद के 31 उपनिषद हैं। मुख्य उपनिषदों में ऐतरेय ऋग्वेद का है; ईश और बृहदारण्यक शुक्ल यजुर्वेद के; कठ और तैत्तिरीय कृष्ण यजुर्वेद के; केन और छान्दोग्य सामवेद के; प्रश्न, मुण्डक और माण्डूक्य अथर्ववेद के।',
  },
  {
    q: 'Upanishad kitne hai?',
    a: 'Upanishad 108 hain, मुक्तिका उपनिषद की सूची के अनुसार। इनमें 10 मुख्य उपनिषद हैं, जिन पर आदि शंकराचार्य ने भाष्य लिखा।',
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
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: '108 उपनिषद (मुक्तिका उपनिषद की सूची)',
      numberOfItems: 108,
      itemListElement: MUKTIKA.flatMap((g) => g.names).map((u, i) => ({ '@type': 'ListItem', position: i + 1, name: `${u.hi} उपनिषद` })),
    },
  ]
  const starts = MUKTIKA.map((_, gi) => 1 + MUKTIKA.slice(0, gi).reduce((a, g) => a + g.names.length, 0))
  return (
    <>
      <PageTracker pageName="Upanishads Hub HI" />
      <JsonLd data={jsonLd} />
      <PageHero
        locale="hi"
        crumbs={[{ label: 'उपनिषद', href: PATH }]}
        eyebrow="उपनिषद: गुरु के पास बैठकर"
        title="उपनिषद क्या है, कितने हैं, और उनके नाम"
        facts={['108 उपनिषद', '10 मुख्य उपनिषद']}
        actions={[
          { href: '#how-many', label: '10 मुख्य उपनिषद देखें', location: 'hub_hero_ten' },
          { href: '#all-108', label: '108 उपनिषदों के नाम', location: 'hub_hero_108' },
          { href: '#lines', label: 'प्रसिद्ध श्लोक', location: 'hub_hero_lines' },
        ]}
        verse={{ original: ['सत्यमेव जयते नानृतं'], iast: ['satyam eva jayate nānṛtam'], meaning: 'जीत सत्य की ही होती है, झूठ की नहीं।', source: 'मुण्डक उपनिषद 3.1.6' }}
      />

      <Section id="word" width="narrow">
        <p id="quick-answer" className="sx-intro rv">
          उपनिषद 108 हैं। यह गिनती मुक्तिका उपनिषद की सूची से आती है: ऋग्वेद के 10, शुक्ल यजुर्वेद के 19, कृष्ण यजुर्वेद के 32, सामवेद के 16 और अथर्ववेद के 31।
          इनमें 10 मुख्य उपनिषद हैं, जिन पर आदि शंकराचार्य ने भाष्य लिखा: ईश, केन, कठ, प्रश्न, मुण्डक, माण्डूक्य, तैत्तिरीय, ऐतरेय, छान्दोग्य और बृहदारण्यक।
          उपनिषद वेदों का आख़िरी हिस्सा हैं, इसलिए इन्हें वेदांत कहते हैं। इनमें आत्मा और ब्रह्म की शिक्षा है, ज़्यादातर गुरु और शिष्य की बातचीत के रूप में।
        </p>
        <div className="up-card up-card--story rv">
          <h2 id="word-h" className="sx-eyebrow">
            उपनिषद शब्द का अर्थ
          </h2>
          <p className="up-scene">
            उप (पास), नि (नीचे), षद् (बैठना): गुरु के पास नीचे बैठकर सुनी गई शिक्षा। शंकराचार्य इसी धातु का एक और अर्थ बताते हैं: वह ज्ञान जो अज्ञान की
            पकड़ को ढीला कर दे।
          </p>
        </div>
      </Section>

      <Section id="how-many" tone="band" title="कितने उपनिषद हैं, और 10 मुख्य उपनिषद" intro="मुक्तिका उपनिषद में 108 उपनिषदों की सूची है। इनमें ये दस मुख्य हैं, जिन पर शंकराचार्य ने भाष्य लिखा:">
        <ul className="up-ten" data-stagger="40">
          {PRINCIPAL.map((u) => (
            <li key={u.id} className="rv">
              <span className="up-ten-name">{u.hi}</span>
              <span className="up-ten-meta">
                {u.veda.hi}, {u.size.hi}
              </span>
              <span className="up-ten-about">{u.about.hi}</span>
            </li>
          ))}
        </ul>
        <p className="sx-prose up-after rv">{SHVETASHVATARA.hi}</p>
      </Section>

      <Section
        id="all-108"
        width="narrow"
        title="सभी 108 उपनिषदों के नाम, वेद के अनुसार"
        intro="मुक्तिका उपनिषद में श्रीराम हनुमान जी को 108 उपनिषदों के नाम बताते हैं। यहाँ वही सूची वेद के अनुसार है। मोटे अक्षरों वाले 10 मुख्य उपनिषद हैं।"
        track="all_108"
      >
        <div className="up-108-groups">
          {MUKTIKA.map((g, gi) => (
            <details key={g.id} className="up-more rv">
              <summary>
                {g.veda.hi} <span className="up-more-ref">{g.names.length} उपनिषद</span>
              </summary>
              <ol className="up-108" start={starts[gi]}>
                {g.names.map((u) => {
                  const href = PRINCIPAL_HREF.get(u.en)
                  const main = PRINCIPAL_HREF.has(u.en)
                  return (
                    <li key={u.en} className={main ? 'is-main' : undefined}>
                      {href ? (
                        <a href={href} hrefLang="en" data-mp-location={`hub_108_${u.en.toLowerCase()}`}>
                          {u.hi}
                        </a>
                      ) : (
                        u.hi
                      )}
                    </li>
                  )
                })}
              </ol>
            </details>
          ))}
        </div>
      </Section>

      <Section id="lines" title="उपनिषद के प्रसिद्ध श्लोक">
        <LinkCards
          columns={3}
          items={[
            ...hiLines.map((l) => ({ href: `/hi/upanishads/${l.slug}`, orig: l.writing.forms[0].sa, title: l.hi?.h1 ?? l.h1, body: l.ref, location: `hub_line_${l.slug}` })),
            { href: '/upanishads', hrefLang: 'en', title: 'सभी 10 प्रसिद्ध श्लोक और पूरे उपनिषद (अंग्रेज़ी)', body: 'ईश, कठ और माण्डूक्य उपनिषद पूरे, संस्कृत के साथ', location: 'hub_english' },
          ]}
        />
      </Section>

      <Section id="first" tone="band" width="narrow">
        <div className="up-card up-card--story rv">
          <h2 id="first-h" className="sx-eyebrow">
            पढ़ना कहाँ से शुरू करें
          </h2>
          <p className="up-scene">
            ईश उपनिषद से। इसमें बस 18 मंत्र हैं, आज रात ख़त्म हो जाएगा। फिर कठ उपनिषद, जो एक कहानी है: बालक नचिकेता तीन रात यमराज के दरवाज़े पर बैठा रहता है
            और जवाब लिए बिना नहीं लौटता। उसके बाद माण्डूक्य, 12 मंत्रों में जाग्रत, स्वप्न और गहरी नींद की बात।
          </p>
        </div>
      </Section>

      <Section id="gita" width="narrow" title="उपनिषद और गीता">
        <VerseCard align="left" label="गीता ध्यानम्, श्लोक 4" original={padas(GITA_DHYANAM.sa)} iast={padas(GITA_DHYANAM.iast)} meaning={GITA_DHYANAM.hi} locale="hi" rv />
        <p className="sx-prose up-after rv">कठ उपनिषद में यमराज नचिकेता से जो कहते हैं, वही बात श्रीकृष्ण अर्जुन से लगभग उन्हीं शब्दों में कहते हैं:</p>
        <Bridges>
          <Bridge c={2} v={20} note="आत्मा न जन्म लेता है, न मरता है (कठ 1.2.18 से मिलाएँ)" locale="hi" />
          <Bridge c={2} v={19} note="न मारने वाला समझता है, न मरने वाला (कठ 1.2.19 से मिलाएँ)" locale="hi" />
        </Bridges>
      </Section>

      <UpNext locale="hi" pageKey={PAGE} placement="hub-end" heading="हर सुबह एक श्लोक" />

      <Section id="faq" width="narrow" title="लोग अक्सर पूछते हैं">
        <Faq items={FAQ} locale="hi" />
      </Section>

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
    </>
  )
}
