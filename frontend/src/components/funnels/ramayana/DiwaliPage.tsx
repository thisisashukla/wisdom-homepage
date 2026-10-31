import PageTracker from '@/components/BlogTracker'
import { Faq, GitaBridge, JsonLd, LinkCards, NextStep, PageHero, ScriptToggle, Section, VerseCard } from '@/components/site'
import type { Locale } from '@/lib/locale'
import { DIWALI, getLine, lineView } from '@/lib/funnels/ramayana/data'
import { PATHS, gitaHref } from '@/lib/funnels/ramayana/paths'
import { articleLd } from '@/lib/funnels/ramayana/seo'
import { lineOriginal } from '@/lib/funnels/ramayana/verse'
import Diya from './Diya'
import KeepCards from './KeepCards'
import LineVerse, { Speaker } from './LineVerse'
import { MethodEn, MethodHi } from './Method'
import { NEXT_COPY } from './copy'

const T = {
  en: {
    crumbs: ['Ramayana', 'Diwali'],
    eyebrow: 'Diwali, 8 November',
    facts: ['Valmiki, Yuddha Kanda', 'Tulsidas, Uttar Kand'],
    cta: 'Read the homecoming',
    h1: 'The homecoming, as Valmiki and Tulsidas tell it',
    promise: 'Read how Ram came home to Ayodhya, the return Diwali remembers, in the words of the two texts most families know.',
    linesNote: 'Switch the original lines between Devanagari and IAST.',
    asksH: 'What it asks of you this week',
    gitaLink: (c: number, v: number) => `Read Bhagavad Gita ${c}.${v}`,
    keepH: 'A line for your Diwali messages',
    keepLede: 'Send it with your Diwali wishes to someone who grew up on these stories.',
    moreH: 'More from the Ramayana',
    more: [
      { href: PATHS.original, t: 'Ramayana, in the original', s: 'Film scenes checked against Valmiki and Tulsidas.' },
      { href: PATHS.afterFilm, t: 'Seven mornings after the film', s: 'Four Ramayana lines, then three from the Gita.' },
      { href: PATHS.hiDiwali, t: 'हिंदी में पढ़ें', s: 'The homecoming, with Hindi meanings.', hi: true },
    ],
    faqH: 'Questions people ask',
    pageKey: 'ramayana-diwali',
    page: 'Ramayana Diwali',
    path: PATHS.diwali,
  },
  hi: {
    crumbs: ['रामायण', 'दिवाली'],
    eyebrow: 'दिवाली, 8 नवंबर',
    facts: ['वाल्मीकि, युद्धकाण्ड', 'तुलसीदास, उत्तरकाण्ड'],
    cta: 'घर वापसी पढ़ें',
    h1: 'राम की घर वापसी, वाल्मीकि और तुलसीदास के शब्दों में',
    promise: 'पढ़िए राम कैसे अयोध्या लौटे, वही वापसी जिसे दिवाली याद करती है, उन दो ग्रंथों के शब्दों में जिन्हें ज़्यादातर परिवार जानते हैं।',
    linesNote: 'मूल पंक्तियों को देवनागरी या IAST में पढ़ें।',
    asksH: 'इस हफ़्ते के लिए',
    gitaLink: (c: number, v: number) => `भगवद गीता ${c}.${v} पढ़ें`,
    keepH: 'दिवाली के संदेश के लिए एक पंक्ति',
    keepLede: 'अपनी दिवाली की शुभकामनाओं के साथ उन्हें भेजें जो ये कथाएँ सुनकर बड़े हुए।',
    moreH: 'रामायण से और',
    more: [
      { href: PATHS.hiOriginal, t: 'रामायण, मूल ग्रंथ में', s: 'फ़िल्म के दृश्य, वाल्मीकि और तुलसीदास से मिलाकर।' },
      { href: PATHS.diwali, t: 'Read in English', s: 'अंग्रेज़ी में यही पन्ना।', hi: false },
    ],
    faqH: 'लोग पूछते हैं',
    pageKey: 'ramayana-diwali-hi',
    page: 'Ramayana Diwali HI',
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

export default function DiwaliPage({ locale, description }: { locale: Locale; description: string }) {
  const t = T[locale]
  const hero = lineView(getLine('rcm-7-29-4'), locale)
  return (
    <main>
      <PageTracker pageName={t.page} />
      <JsonLd
        data={articleLd({
          headline: t.h1,
          description,
          path: t.path,
          locale,
          citations: DIWALI.sections.flatMap((s) => s.lines.map((k) => getLine(k).ref.en)),
          about: ['Diwali', 'Ramayana', 'Ramcharitmanas'],
        })}
      />
      <PageHero
        locale={locale}
        lang={locale}
        crumbs={[
          { label: t.crumbs[0], href: PATHS.hub },
          { label: t.crumbs[1], href: t.path },
        ]}
        eyebrow={t.eyebrow}
        title={t.h1}
        sub={t.promise}
        facts={t.facts}
        actions={[{ href: `#dw-${DIWALI.sections[0].id}`, label: t.cta, location: 'hero_homecoming' }]}
        visual={
          <div className="rl-hero-diwali">
            <VerseCard size="hero" reveal locale={locale} toggle {...lineOriginal(hero)} label={<Speaker line={hero} locale={locale} />} source={hero.ref} />
            <div className="rl-hero-row" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((k) => (
                <span key={k} style={{ ['--k' as string]: k }}>
                  <Diya lamp="plain" state="lit" size={k === 2 ? 44 : 34} />
                </span>
              ))}
            </div>
          </div>
        }
      />

      <Section spacing="tight" rv={false}>
        <p className="sx-prose rv" id="quick-answer">
          {DIWALI.quick[locale]}
        </p>
      </Section>

      <Section tone="band" lang={locale}>
        <div className="rl-scriptbar rv">
          <p>{t.linesNote}</p>
          <ScriptToggle locale={locale} size="compact" />
        </div>
        <ol className="rl-thread">
          {DIWALI.sections.map((sec) => (
            <li key={sec.id} className="rv">
              <span className="rl-node" aria-hidden="true">
                <Diya lamp="plain" state="lit" size={30} />
              </span>
              <section className="rl-dw-card" aria-labelledby={`dw-${sec.id}`}>
                <h2 className="sx-h3 rl-dw-h" id={`dw-${sec.id}`}>
                  {sec.heading[locale]}
                </h2>
                <p className="sx-prose rl-dw-p">{sec.body[locale]}</p>
                <div className="rl-dw-lines">
                  {sec.lines.map((k) => (
                    <LineVerse key={k} line={lineView(getLine(k), locale)} locale={locale} />
                  ))}
                </div>
              </section>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="dw-asks" title={t.asksH} lang={locale}>
        <div className="rl-asks rv">
          <p>{DIWALI.asks[locale]}</p>
        </div>
        <GitaBridge
          href={gitaHref(DIWALI.gita.chapter, DIWALI.gita.verse, locale)}
          label={t.gitaLink(DIWALI.gita.chapter, DIWALI.gita.verse)}
          why={DIWALI.gita.note[locale]}
          location="gita_bridge"
          locale={locale}
          className="rl-gap rv"
        />
      </Section>

      <Section id="dw-keep" tone="band" title={t.keepH} intro={t.keepLede} lang={locale}>
        <KeepCards ids={['ram-hundred-years', 'ram-all-things-part']} locale={locale} pageKey={t.pageKey} path={t.path} />
      </Section>

      <Section>
        <NextStep locale={locale} pageKey={t.pageKey} placement="end" copy={NEXT_COPY[locale]} />
      </Section>

      <Section id="dw-more" tone="band" title={t.moreH} lang={locale}>
        <LinkCards
          items={t.more.map((m) => {
            const lang = 'hi' in m ? (m.hi ? 'hi' : 'en') : undefined
            return {
              href: m.href,
              title: lang ? <span lang={lang}>{m.t}</span> : m.t,
              body: m.s,
              hrefLang: lang,
              location: `more_${m.href.replace(/\W+/g, '_')}`,
            }
          })}
        />
      </Section>

      <Section id="dw-faq" title={t.faqH} lang={locale}>
        <Faq items={DIWALI_FAQ[locale]} locale={locale} />
      </Section>
      {locale === 'hi' ? <MethodHi film={false} /> : <MethodEn film={false} />}
    </main>
  )
}
