import BlogTracker from '@/components/BlogTracker'
import NextStep from '@/components/quotes/NextStep'
import Shell from './Shell'
import LineBlock from './LineBlock'
import ScriptToggle from './ScriptToggle'
import KeepCards from './KeepCards'
import Hero from './Hero'
import Diya from './Diya'
import { Band, Faq, JsonLd, MethodEn, MethodHi, Tiles } from './Bits'
import { NEXT_COPY } from './copy'
import { DIWALI, getLine, lineView } from '@/lib/funnels/ramayana/data'
import { PATHS, gitaHref } from '@/lib/funnels/ramayana/paths'
import { articleLd, breadcrumbLd, faqLd } from '@/lib/funnels/ramayana/seo'

const T = {
  en: {
    crumbs: ['Wisdom', 'Ramayana', 'Diwali'],
    eyebrow: 'Diwali, 8 November',
    facts: ['Valmiki, Yuddha Kanda', 'Tulsidas, Uttar Kand', 'Six moments, line by line'],
    cta: 'Read the homecoming',
    h1: 'The homecoming, as Valmiki and Tulsidas tell it',
    promise: 'Diwali is a return. Here is the return, in the words of the two texts most families know.',
    linesNote: 'Switch the original lines between Devanagari and IAST.',
    asksH: 'What it asks of you this week',
    gitaLink: (c: number, v: number) => `Read Bhagavad Gita ${c}.${v}`,
    keepH: 'A line for your Diwali messages',
    keepLede: 'Copy it, send it on WhatsApp, or save it as an image.',
    moreH: 'More from the Ramayana',
    more: [
      { href: PATHS.original, t: 'Ramayana, in the original', s: 'Film scenes checked against Valmiki and Tulsidas.' },
      { href: PATHS.afterFilm, t: 'Seven mornings after the film', s: 'Four Ramayana lines, then three from the Gita.' },
      { href: PATHS.hiDiwali, t: 'हिंदी में पढ़ें', s: 'The homecoming, with Hindi meanings.', hi: true },
    ],
    faqH: 'Questions people ask',
    pageKey: 'ramayana-diwali',
    page: 'ramayana-diwali',
    path: PATHS.diwali,
  },
  hi: {
    crumbs: ['Wisdom', 'रामायण', 'दिवाली'],
    eyebrow: 'दिवाली, 8 नवंबर',
    facts: ['वाल्मीकि, युद्धकाण्ड', 'तुलसीदास, उत्तरकाण्ड', 'छह प्रसंग, पंक्ति दर पंक्ति'],
    cta: 'घर वापसी पढ़ें',
    h1: 'राम की घर वापसी, वाल्मीकि और तुलसीदास के शब्दों में',
    promise: 'दिवाली घर लौटने का त्योहार है। यह रही वह वापसी, उन दो ग्रंथों के शब्दों में जिन्हें ज़्यादातर परिवार जानते हैं।',
    linesNote: 'मूल पंक्तियों को देवनागरी या IAST में पढ़ें।',
    asksH: 'इस हफ़्ते के लिए',
    gitaLink: (c: number, v: number) => `भगवद गीता ${c}.${v} पढ़ें`,
    keepH: 'दिवाली के संदेश के लिए एक पंक्ति',
    keepLede: 'कॉपी करें, WhatsApp पर भेजें, या इमेज सेव करें।',
    moreH: 'रामायण से और',
    more: [
      { href: PATHS.hiOriginal, t: 'रामायण, मूल ग्रंथ में', s: 'फ़िल्म के दृश्य, वाल्मीकि और तुलसीदास से मिलाकर।' },
      { href: PATHS.diwali, t: 'Read in English', s: 'अंग्रेज़ी में यही पन्ना।', hi: false },
    ],
    faqH: 'लोग पूछते हैं',
    pageKey: 'ramayana-diwali-hi',
    page: 'ramayana-diwali-hi',
    path: PATHS.hiDiwali,
  },
}

export const DIWALI_FAQ = {
  en: [
    {
      q: 'Why is Diwali linked to the Ramayana?',
      a: "Diwali remembers Ram's return to Ayodhya after fourteen years of exile and the war in Lanka. Valmiki tells the return in Yuddha Kanda, sargas 125 to 128; Tulsidas opens his Uttar Kand with it.",
    },
    {
      q: 'Does the Ramayana say people lit diyas when Ram returned?',
      a: "Neither text describes rows of clay lamps lit for the return. Valmiki has flowers, puffed rice and flags (Yuddha Kanda, sarga 127). Tulsidas has golden aarti plates at every door and, describing Ayodhya in Ram's reign, lamps of gems in every house.",
    },
    {
      q: 'What did Bharata do when Ram came back?',
      a: "In Valmiki he put Ram's sandals back on his feet and handed back the kingdom he had held in trust (Yuddha Kanda, sarga 127). In Tulsidas he lay at Ram's feet until Ram lifted him and held him close (Uttar Kand, doha 5).",
    },
  ],
  hi: [
    {
      q: 'दिवाली का रामायण से क्या रिश्ता है?',
      a: 'दिवाली चौदह बरस के वनवास और लंका के युद्ध के बाद राम के अयोध्या लौटने की याद है। वाल्मीकि यह वापसी युद्धकाण्ड, सर्ग 125 से 128 में कहते हैं, और तुलसीदास अपना उत्तरकाण्ड इसी से शुरू करते हैं।',
    },
    {
      q: 'क्या रामायण में लिखा है कि राम के लौटने पर दीये जलाए गए?',
      a: 'किसी भी ग्रंथ में लौटने की रात मिट्टी के दीयों की कतारों का वर्णन नहीं है। वाल्मीकि में फूल, लावा और पताकाएँ हैं (युद्धकाण्ड, सर्ग 127)। तुलसीदास में हर द्वार पर सोने की थालियों में आरती है, और राम के राज में अयोध्या के वर्णन में घर-घर मणियों के दीप।',
    },
    {
      q: 'राम के लौटने पर भरत ने क्या किया?',
      a: 'वाल्मीकि में भरत ने राम की खड़ाऊँ उनके पाँवों में पहनाईं और धरोहर में रखा राज्य लौटा दिया (युद्धकाण्ड, सर्ग 127)। तुलसीदास में वे राम के पाँवों में पड़े रहे, जब तक राम ने उन्हें उठाकर गले नहीं लगाया (उत्तरकाण्ड, दोहा 5)।',
    },
  ],
}

export default function DiwaliPage({ locale, description }: { locale: 'en' | 'hi'; description: string }) {
  const t = T[locale]
  const crumbPaths = ['/', PATHS.hub, t.path]
  return (
    <Shell locale={locale}>
      <BlogTracker pageName={t.page} />
      <JsonLd
        data={[
          breadcrumbLd(t.crumbs.map((name, i) => ({ name, path: crumbPaths[i] }))),
          articleLd({
            headline: t.h1,
            description,
            path: t.path,
            locale,
            citations: DIWALI.sections.flatMap((s) => s.lines.map((k) => getLine(k).ref.en)),
            about: ['Diwali', 'Ramayana', 'Ramcharitmanas'],
          }),
          faqLd(DIWALI_FAQ[locale]),
        ]}
      />
      <Hero
        locale={locale}
        warm
        crumbLabel={locale === 'hi' ? 'पथ' : 'Breadcrumb'}
        crumbs={[{ name: t.crumbs[0], href: '/' }, { name: t.crumbs[1], href: PATHS.hub }, { name: t.crumbs[2] }]}
        eyebrow={t.eyebrow}
        h1={t.h1}
        sub={t.promise}
        facts={t.facts}
        cta={{ href: `#dw-${DIWALI.sections[0].id}`, label: t.cta, loc: 'hero_homecoming' }}
        lines={[lineView(getLine('rcm-7-29-4'), locale)]}
      />

      <Band className="rl-introsec">
        <p className="rl-intro rv" id="quick-answer">
          {DIWALI.quick[locale]}
        </p>
      </Band>

      <Band tone="warm">
        <div className="rl-scriptbar rv">
          <p>{t.linesNote}</p>
          <ScriptToggle locale={locale} page={t.page} />
        </div>
        <div>
          <ol className="rl-thread">
            {DIWALI.sections.map((sec) => (
              <li key={sec.id} className="rv">
                <span className="rl-node" aria-hidden="true">
                  <Diya lamp="plain" state="lit" size={30} />
                </span>
                <section className="rl-dw-card" aria-labelledby={`dw-${sec.id}`}>
                  <h2 className="rl-h3" id={`dw-${sec.id}`}>
                    {sec.heading[locale]}
                  </h2>
                  <p className="rl-p">{sec.body[locale]}</p>
                  {sec.lines.map((k) => (
                    <div key={k} className="rl-verse">
                      <LineBlock line={lineView(getLine(k), locale)} locale={locale} />
                    </div>
                  ))}
                </section>
              </li>
            ))}
          </ol>
        </div>
      </Band>

      <Band id="dw-asks" title={t.asksH}>
        <div className="rl-asks rv">
          <p>{DIWALI.asks[locale]}</p>
        </div>
        <div className="rl-bridge rv">
          <p>{DIWALI.gita.note[locale]}</p>
          <a href={gitaHref(DIWALI.gita.chapter, DIWALI.gita.verse, locale)} data-mp-location="gita_bridge">
            {t.gitaLink(DIWALI.gita.chapter, DIWALI.gita.verse)}
          </a>
        </div>
      </Band>

      <Band id="dw-keep" title={t.keepH} lede={t.keepLede} tone="warm" wide>
        <div className="rv">
          <KeepCards ids={['ram-hundred-years', 'ram-all-things-part']} locale={locale} page={t.page} pageKey={t.pageKey} path={t.path} />
        </div>
      </Band>

      <Band>
        <div className="rl-final rv">
          <NextStep funnel="ramayana" locale={locale} pageName={t.page} pageKey={t.pageKey} placement="end" copy={NEXT_COPY[locale]} />
        </div>
      </Band>

      <Band id="dw-more" title={t.moreH} tone="alt" wide>
        <Tiles
          items={t.more.map((m) => ({ href: m.href, t: m.t, s: m.s, lang: 'hi' in m ? (m.hi ? ('hi' as const) : ('en' as const)) : undefined }))}
          loc={(href) => `more_${href.replace(/\W+/g, '_')}`}
        />
      </Band>

      <Faq heading={t.faqH} qas={DIWALI_FAQ[locale]} id="dw-faq" />
      {locale === 'hi' ? <MethodHi film={false} /> : <MethodEn film={false} />}
    </Shell>
  )
}
