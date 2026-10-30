import BlogTracker from '@/components/BlogTracker'
import NextStep from '@/components/quotes/NextStep'
import Shell from './Shell'
import LineBlock from './LineBlock'
import ScriptToggle from './ScriptToggle'
import KeepCards from './KeepCards'
import { Crumbs, JsonLd, MethodEn, MethodHi } from './Bits'
import { NEXT_COPY } from './copy'
import { DIWALI, getLine, lineView } from '@/lib/funnels/ramayana/data'
import { PATHS, gitaHref } from '@/lib/funnels/ramayana/paths'
import { articleLd, breadcrumbLd, faqLd } from '@/lib/funnels/ramayana/seo'

const T = {
  en: {
    crumbs: ['Wisdom', 'Ramayana', 'Diwali'],
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
      <Crumbs label={locale === 'hi' ? 'पथ' : 'Breadcrumb'} items={[{ name: t.crumbs[0], href: '/' }, { name: t.crumbs[1], href: PATHS.hub }, { name: t.crumbs[2] }]} />

      <header className="rl-hero">
        <h1 className="rl-h1">{t.h1}</h1>
        <p className="rl-promise">{t.promise}</p>
        <div className="rl-shore" aria-hidden="true" />
        <p className="rl-quick" id="quick-answer">
          {DIWALI.quick[locale]}
        </p>
        <p className="rl-muted">{t.linesNote}</p>
        <ScriptToggle locale={locale} page={t.page} />
      </header>

      {DIWALI.sections.map((sec) => (
        <section key={sec.id} className="rl-dw" aria-labelledby={`dw-${sec.id}`}>
          <h2 className="rl-h2" id={`dw-${sec.id}`}>
            {sec.heading[locale]}
          </h2>
          <p className="rl-p">{sec.body[locale]}</p>
          <div className="rl-dw-lines">
            {sec.lines.map((k) => (
              <LineBlock key={k} line={lineView(getLine(k), locale)} locale={locale} />
            ))}
          </div>
        </section>
      ))}

      <section className="rl-section" aria-labelledby="dw-asks">
        <h2 className="rl-h2" id="dw-asks">
          {t.asksH}
        </h2>
        <div className="rl-asks">
          <p>{DIWALI.asks[locale]}</p>
        </div>
        <div className="rl-bridge">
          <p>{DIWALI.gita.note[locale]}</p>
          <a href={gitaHref(DIWALI.gita.chapter, DIWALI.gita.verse, locale)} data-mp-location="gita_bridge">
            {t.gitaLink(DIWALI.gita.chapter, DIWALI.gita.verse)}
          </a>
        </div>
      </section>

      <section className="rl-section" aria-labelledby="dw-keep">
        <h2 className="rl-h2" id="dw-keep">
          {t.keepH}
        </h2>
        <p className="rl-lede">{t.keepLede}</p>
        <KeepCards ids={['ram-hundred-years', 'ram-all-things-part']} locale={locale} page={t.page} pageKey={t.pageKey} path={t.path} />
      </section>

      <div className="rl-next">
        <NextStep funnel="ramayana" locale={locale} pageName={t.page} pageKey={t.pageKey} placement="end" copy={NEXT_COPY[locale]} />
      </div>

      <section className="rl-section" aria-labelledby="dw-more">
        <h2 className="rl-h2" id="dw-more">
          {t.moreH}
        </h2>
        <ul className="rl-links">
          {t.more.map((m) => (
            <li key={m.href}>
              <a href={m.href} data-mp-location={`more_${m.href.replace(/\W+/g, '_')}`} hrefLang={'hi' in m ? (m.hi ? 'hi' : 'en') : undefined}>
                <strong lang={'hi' in m ? (m.hi ? 'hi' : 'en') : undefined}>{m.t}</strong>
                <span>{m.s}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="rl-section" aria-labelledby="dw-faq">
        <h2 className="rl-h2" id="dw-faq">
          {t.faqH}
        </h2>
        <dl className="rl-faq">
          {DIWALI_FAQ[locale].map((x) => (
            <div key={x.q}>
              <dt>{x.q}</dt>
              <dd>{x.a}</dd>
            </div>
          ))}
        </dl>
      </section>
      {locale === 'hi' ? <MethodHi film={false} /> : <MethodEn film={false} />}
    </Shell>
  )
}
