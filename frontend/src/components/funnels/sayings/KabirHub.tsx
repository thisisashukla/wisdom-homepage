/** /hi/kabir-ke-dohe (Hindi) and /kabir-dohe-in-english (English). Server. */

import { BlogTracker } from '@/components/BlogTracker'
import { KABIR_THEMES, dohe, kabirNotes, kabirWomenReview, type Doha, type Locale } from '@/lib/funnels/sayings/data'
import { FOUND_SHORT, KAB_HUB, KAB_PATH, KAB_PATH_EN, KAB_THEME, dohaPath } from '@/lib/funnels/sayings/copy-kabir'
import { abs, cardOg, ldArticle, ldBreadcrumb, ldFaq, ldItemList, ldQuotation } from '@/lib/funnels/sayings/seo'
import DevaCard from './DevaCard'
import FxNextStep from './FxNextStep'
import ScriptToggle from './ScriptToggle'
import { Crumbs, Faq, JsonLd, Method, Related } from './parts'
import { tiroHi, tiroSa } from './fonts'
import './sayings.css'

const CARD_SLUGS = new Set(['guru-govind-dou-khade', 'pothi-padh-padh-jag-mua', 'kal-kare-so-aaj-kar', 'dheere-dheere-re-mana', 'bura-jo-dekhan-main-chala', 'aisi-bani-boliye', 'bada-hua-to-kya-hua', 'sai-itna-dijiye', 'mala-pherat-jug-bhaya', 'jati-na-poochho-sadhu-ki', 'dukh-mein-sumiran-sab-kare', 'kasturi-kundal-base', 'nindak-niyare-rakhiye', 'chalti-chakki-dekh-ke', 'mati-kahe-kumhar-se'])
export const kabirCardId = (d: Doha): string | undefined => (CARD_SLUGS.has(d.slug) ? d.id : undefined)

export const dohaShareText = (d: Doha, locale: Locale): string =>
  [...d.lines, '', d.meaning[locale], '', locale === 'hi' ? 'कबीर' : 'Kabir', `${abs(dohaPath(d.slug))}?utm_source=copy&utm_medium=quote`].join('\n')

export const foundChip = (d: Doha, locale: Locale) => (
  <>
    {d.foundIn.map((f) => (
      <span key={f} className="fx-tag">
        {FOUND_SHORT[f][locale]}
      </span>
    ))}
  </>
)

export default function KabirHub({ locale }: { locale: Locale }) {
  const c = KAB_HUB[locale]
  const path = locale === 'hi' ? KAB_PATH : KAB_PATH_EN
  const pageKey = locale === 'hi' ? 'kabir-hub-hi' : 'kabir-hub-en'
  const pageName = locale === 'hi' ? 'Kabir Dohe Hub HI' : 'Kabir Dohe Hub EN'
  const all = dohe()
  const notes = kabirNotes()
  const women = kabirWomenReview()
  const excluded = women.filter((w) => w.decision === 'exclude')
  let pos = 0
  const ld = [
    ldBreadcrumb([{ name: 'Wisdom', path: '/' }, { name: locale === 'hi' ? 'कबीर के दोहे' : 'Kabir dohe in English', path }]),
    ldArticle({ headline: c.h1, description: c.description, path, locale, citation: 'Kavita-Kaumudi vol 1, Ramnaresh Tripathi (1917); Kabir Granthavali, ed. Shyamsundar Das', about: 'Kabir', image: cardOg('kab-guru-govind-dou-khade', locale) }),
    ldFaq(c.faq),
    ldItemList(c.h1, all.map((d) => ldQuotation({ text: d.lines.join(' '), author: 'Kabir', path: dohaPath(d.slug), locale: 'hi', citation: d.foundIn.map((f) => FOUND_SHORT[f].en).join('; ') }))),
  ]
  return (
    <div className={`fx-sayings ${tiroHi.variable} ${tiroSa.variable}`} data-hub="kabir" data-script="deva" lang={locale}>
      <BlogTracker pageName={pageName} />
      {ld.map((d, i) => (
        <JsonLd key={i} data={d} />
      ))}
      <div className="fx-page">
        <Crumbs items={locale === 'hi' ? [{ label: 'होम', href: '/' }, { label: 'कबीर के दोहे' }] : [{ label: 'Home', href: '/' }, { label: 'Kabir dohe in English' }]} locale={locale} />
        <header className="fx-hero">
          <h1 className="fx-h1">{c.h1}</h1>
          <p className="fx-promise">{c.promise}</p>
          <p id="quick-answer" className="fx-quick">
            {c.quick}
          </p>
          <ul className="fx-jump">
            {KABIR_THEMES.map((th) => (
              <li key={th}>
                <a href={`#${th}`}>{KAB_THEME[th][locale]}</a>
              </li>
            ))}
            <li>
              <a href="#where">{locale === 'hi' ? 'ये दोहे कहाँ मिलते हैं' : 'Where these are found'}</a>
            </li>
          </ul>
          <ScriptToggle locale={locale} />
        </header>

        {KABIR_THEMES.map((th, si) => (
          <section key={th} id={th} className="fx-sec" aria-labelledby={`${th}-h`}>
            <h2 id={`${th}-h`} className="fx-h2">
              {KAB_THEME[th][locale]}
            </h2>
            <p className="fx-intro">{locale === 'hi' ? KAB_THEME[th].introHi : KAB_THEME[th].introEn}</p>
            <div className="fx-list">
              {all
                .filter((d) => d.theme === th)
                .map((d) => {
                  pos += 1
                  return (
                    <DevaCard
                      key={d.id}
                      id={d.id}
                      hub="kabir"
                      lines={d.lines}
                      roman={d.roman}
                      lang="hi"
                      meaning={d.meaning[locale]}
                      gloss={d.gloss}
                      chip={foundChip(d, locale)}
                      href={locale === 'hi' ? dohaPath(d.slug) : undefined}
                      hrefLabel="पूरा अर्थ और शब्दार्थ"
                      cardId={kabirCardId(d)}
                      locale={locale}
                      pageName={pageName}
                      pageKey={pageKey}
                      position={pos}
                      section={th}
                      shareText={dohaShareText(d, locale)}
                      fileStem={`kabir-doha-${d.slug}`}
                    />
                  )
                })}
            </div>
            {si === 1 && (
              <div className="fx-next">
                <h2 className="fx-h2">{locale === 'hi' ? 'रोज़ सुबह एक पंक्ति' : 'One line each morning'}</h2>
                <FxNextStep hub="kabir" locale={locale} pageName={pageName} pageKey={pageKey} placement="mid" />
              </div>
            )}
          </section>
        ))}

        <section id="where" className="fx-sec fx-prose" aria-labelledby="where-h">
          <h2 id="where-h" className="fx-h2">
            {locale === 'hi' ? 'ये दोहे कहाँ मिलते हैं' : 'Where these dohe are found'}
          </h2>
          {locale === 'hi' ? (
            <>
              <p>कबीर ने कुछ लिखा नहीं, गाया। उनके दोहे सदियों तक साधुओं और गायकों के ज़रिए फैले, और हर इलाके ने उन्हें अपनी बोली में ढाल लिया। इसलिए हम किसी दोहे को नकली नहीं कहते। हर दोहे पर लिखा है कि वह कहाँ मिलता है:</p>
              <p>कबीर ग्रंथावली (श्यामसुंदर दास): कबीर की साखियों का सबसे पुराना छपा हुआ विद्वानों का संस्करण। कविता-कौमुदी भाग 1 (रामनरेश त्रिपाठी, 1917): सौ साल से ज़्यादा पुराना संग्रह। गायन परंपरा: वे दोहे जो इन दोनों में नहीं, पर लोक और भजन गायकी में कबीर के नाम से गाए जाते हैं।</p>
            </>
          ) : (
            <>
              <p>Kabir did not write; he sang. His dohe travelled for centuries through wandering singers, and each region shaped them to its own speech. So we do not call any doha fake. Each card says where the doha is found:</p>
              <p>Kabir Granthavali (ed. Shyamsundar Das): the standard scholarly edition of his sakhis. Kavita-Kaumudi vol 1 (Ramnaresh Tripathi, 1917): an anthology more than a century old. Sung tradition: dohe that are in neither, but are sung in Kabir&apos;s name in folk and bhajan singing.</p>
            </>
          )}
        </section>

        <section className="fx-next" aria-label={locale === 'hi' ? 'आगे' : 'Next'}>
          <h2 className="fx-h2">{locale === 'hi' ? 'एक पंक्ति रोज़ अपने साथ रखें' : 'Keep one line with you'}</h2>
          <FxNextStep hub="kabir" locale={locale} pageName={pageName} pageKey={pageKey} placement="end" />
        </section>

        <Faq items={c.faq} heading={locale === 'hi' ? 'लोग अक्सर पूछते हैं' : 'Questions people ask'} />

        <Method heading={locale === 'hi' ? 'स्रोत और तरीका' : 'Sources and method'}>
          {locale === 'hi' ? (
            <>
              <p>पाठ: कविता-कौमुदी भाग 1 (1917) और कबीर ग्रंथावली विकिसोर्स और कविताकोश से, और कविताकोश का कबीर दोहावली संग्रह। साफ़ दिखने वाली टाइपिंग की गलतियाँ ठीक की गई हैं। अर्थ और शब्दार्थ Wisdom के अपने हैं।</p>
              <p>{`कबीर के नाम ${women.length} दोहों में नारी या कामिनी शब्द आता है। हमने हर एक पढ़ा। ${excluded.length} दोहे जो स्त्रियों को नीचा दिखाते हैं, यहाँ नहीं हैं। "क्षमा बड़न को" वाला दोहा रहीम का है, इसलिए वह भी नहीं।`}</p>
            </>
          ) : (
            <>
              <p>Text: Kavita-Kaumudi vol 1 (1917) and the Kabir Granthavali via Wikisource and Kavitakosh, plus the Kavitakosh Kabir Dohavali. Evident typing errors are corrected. Meanings and word meanings are Wisdom&apos;s own.</p>
              <p>{`${women.length} lines in Kabir's name use the words nari or kamini. We read each one and left out the ${excluded.length} that demean women. The doha "Kshama badan ko" belongs to Rahim, so it is not here.`}</p>
            </>
          )}
          <p>{locale === 'hi' ? `कुल ${notes.nearDuplicates} दोहे संग्रह में दोहराए गए या थोड़े बदले रूप में थे; हर दोहा यहाँ एक बार है।` : `${notes.nearDuplicates} lines in the source set repeat with small changes; each doha appears here once.`}</p>
        </Method>

        <Related
          heading={locale === 'hi' ? 'आगे पढ़ें' : 'Read next'}
          links={
            locale === 'hi'
              ? [
                  { href: KAB_PATH_EN, label: 'Kabir dohe in English' },
                  { href: '/hi/chanakya-niti', label: 'चाणक्य नीति के श्लोक, अर्थ सहित' },
                  { href: '/hi/vivekananda-quotes', label: 'स्वामी विवेकानंद के विचार' },
                  { href: '/hi/gita', label: 'भगवद गीता हिंदी में', gita: true },
                ]
              : [
                  { href: KAB_PATH, label: 'कबीर के दोहे हिंदी अर्थ सहित' },
                  { href: '/vivekananda-quotes', label: 'Vivekananda quotes, checked against his works' },
                  { href: '/gita', label: 'Read the Bhagavad Gita', gita: true },
                ]
          }
        />
      </div>
    </div>
  )
}
