/** /hi/kabir-ke-dohe (Hindi) and /kabir-dohe-in-english (English). Server. */

import { BlogTracker } from '@/components/BlogTracker'
import { KABIR_THEMES, dohe, kabirNotes, kabirWomenReview, type Doha, type Locale } from '@/lib/funnels/sayings/data'
import { FOUND_SHORT, KAB_HUB, KAB_PATH, KAB_PATH_EN, KAB_THEME, dohaPath } from '@/lib/funnels/sayings/copy-kabir'
import { abs, cardOg, ldArticle, ldBreadcrumb, ldFaq, ldItemList, ldQuotation } from '@/lib/funnels/sayings/seo'
import DevaCard from './DevaCard'
import FxNextStep from './FxNextStep'
import ScriptToggle from './ScriptToggle'
import { DailyBand, Faq, Head, JsonLd, Method, NextPanel, Related, Sec, Shell } from './parts'
import { tiroHi, tiroSa } from './fonts'

const WORD_HINT: Record<Locale, string> = {
  en: 'Tap an underlined word for its meaning',
  hi: 'रेखांकित शब्द पर टैप करें, अर्थ दिखेगा',
}

const CARD_SLUGS = new Set([
  'guru-govind-dou-khade',
  'pothi-padh-padh-jag-mua',
  'kal-kare-so-aaj-kar',
  'dheere-dheere-re-mana',
  'bura-jo-dekhan-main-chala',
  'aisi-bani-boliye',
  'bada-hua-to-kya-hua',
  'sai-itna-dijiye',
  'mala-pherat-jug-bhaya',
  'jati-na-poochho-sadhu-ki',
  'dukh-mein-sumiran-sab-kare',
  'kasturi-kundal-base',
  'nindak-niyare-rakhiye',
  'chalti-chakki-dekh-ke',
  'mati-kahe-kumhar-se',
])
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
    ldBreadcrumb([
      { name: 'Wisdom', path: '/' },
      {
        name: locale === 'hi' ? 'कबीर के दोहे' : 'Kabir dohe in English',
        path,
      },
    ]),
    ldArticle({
      headline: c.h1,
      description: c.description,
      path,
      locale,
      citation: 'Kavita-Kaumudi vol 1, Ramnaresh Tripathi (1917); Kabir Granthavali, ed. Shyamsundar Das',
      about: 'Kabir',
      image: cardOg('kab-guru-govind-dou-khade', locale),
    }),
    ldFaq(c.faq),
    ldItemList(
      c.h1,
      all.map((d) =>
        ldQuotation({
          text: d.lines.join(' '),
          author: 'Kabir',
          path: dohaPath(d.slug),
          locale: 'hi',
          citation: d.foundIn.map((f) => FOUND_SHORT[f].en).join('; '),
        }),
      ),
    ),
  ]
  return (
    <Shell hub="kabir" locale={locale} fonts={`${tiroHi.variable} ${tiroSa.variable}`} script>
      <BlogTracker pageName={pageName} />
      {ld.map((d, i) => (
        <JsonLd key={i} data={d} />
      ))}
      <Head
        crumbs={locale === 'hi' ? [{ label: 'होम', href: '/' }, { label: 'कबीर के दोहे' }] : [{ label: 'Home', href: '/' }, { label: 'Kabir dohe in English' }]}
        locale={locale}
        h1={c.h1}
        promise={c.promise}
        quick={c.quick}
        chips={[
          ...KABIR_THEMES.map((th) => ({
            href: `#${th}`,
            label: KAB_THEME[th][locale],
          })),
          {
            href: '#where',
            label: locale === 'hi' ? 'ये दोहे कहाँ मिलते हैं' : 'Where these are found',
          },
        ]}
      >
        <div className="fx-head-tools rv">
          <ScriptToggle locale={locale} />
          <p className="fx-word-hint fx-script-deva">{WORD_HINT[locale]}</p>
        </div>
      </Head>

      <div className="qp-sections">
        {KABIR_THEMES.map((th, si) => (
          <Sec key={th} id={th} hid={`${th}-h`} heading={KAB_THEME[th][locale]} intro={locale === 'hi' ? KAB_THEME[th].introHi : KAB_THEME[th].introEn}>
            <div className="qp-cards">
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
              <NextPanel heading={locale === 'hi' ? 'रोज़ सुबह एक पंक्ति' : 'One line each morning'}>
                <FxNextStep hub="kabir" locale={locale} pageName={pageName} pageKey={pageKey} placement="mid" />
              </NextPanel>
            )}
          </Sec>
        ))}
      </div>

      <section id="where" className="qp-extra" aria-labelledby="where-h">
        <h2 id="where-h" className="qp-h2 rv">
          {locale === 'hi' ? 'ये दोहे कहाँ मिलते हैं' : 'Where these dohe are found'}
        </h2>
        {locale === 'hi' ? (
          <>
            <p>
              कबीर ने कुछ लिखा नहीं, गाया। उनके दोहे सदियों तक साधुओं और गायकों के ज़रिए फैले, और हर इलाके ने उन्हें अपनी बोली में ढाल लिया। इसलिए हम किसी दोहे को नकली नहीं कहते।
              हर दोहे पर लिखा है कि वह कहाँ मिलता है:
            </p>
            <dl className="fx-sources">
              <div>
                <dt>कबीर ग्रंथावली (श्यामसुंदर दास)</dt>
                <dd>कबीर की साखियों का सबसे पुराना छपा हुआ विद्वानों का संस्करण।</dd>
              </div>
              <div>
                <dt>कविता-कौमुदी भाग 1 (रामनरेश त्रिपाठी, 1917)</dt>
                <dd>सौ साल से ज़्यादा पुराना संग्रह।</dd>
              </div>
              <div>
                <dt>गायन परंपरा</dt>
                <dd>वे दोहे जो इन दोनों में नहीं, पर लोक और भजन गायकी में कबीर के नाम से गाए जाते हैं।</dd>
              </div>
            </dl>
          </>
        ) : (
          <>
            <p>
              Kabir did not write; he sang. His dohe travelled for centuries through wandering singers, and each region shaped them to its own speech. So we do not call any doha
              fake. Each card says where the doha is found:
            </p>
            <dl className="fx-sources">
              <div>
                <dt>Kabir Granthavali (ed. Shyamsundar Das)</dt>
                <dd>The standard scholarly edition of his sakhis.</dd>
              </div>
              <div>
                <dt>Kavita-Kaumudi vol 1 (Ramnaresh Tripathi, 1917)</dt>
                <dd>An anthology more than a century old.</dd>
              </div>
              <div>
                <dt>Sung tradition</dt>
                <dd>Dohe that are in neither, but are sung in Kabir&apos;s name in folk and bhajan singing.</dd>
              </div>
            </dl>
          </>
        )}
      </section>

      <DailyBand heading={locale === 'hi' ? 'एक पंक्ति रोज़ अपने साथ रखें' : 'Keep one line with you'} label={locale === 'hi' ? 'आगे' : 'Next'}>
        <FxNextStep hub="kabir" locale={locale} pageName={pageName} pageKey={pageKey} placement="end" />
      </DailyBand>

      <Faq items={c.faq} heading={locale === 'hi' ? 'लोग अक्सर पूछते हैं' : 'Questions people ask'} />

      <Method heading={locale === 'hi' ? 'स्रोत और तरीका' : 'Sources and method'}>
        {locale === 'hi' ? (
          <>
            <p>
              पाठ: कविता-कौमुदी भाग 1 (1917) और कबीर ग्रंथावली विकिसोर्स और कविताकोश से, और कविताकोश का कबीर दोहावली संग्रह। साफ़ दिखने वाली टाइपिंग की गलतियाँ ठीक की गई हैं। अर्थ
              और शब्दार्थ Wisdom के अपने हैं।
            </p>
            <p>{`कबीर के नाम ${women.length} दोहों में नारी या कामिनी शब्द आता है। हमने हर एक पढ़ा। ${excluded.length} दोहे जो स्त्रियों को नीचा दिखाते हैं, यहाँ नहीं हैं। "क्षमा बड़न को" वाला दोहा रहीम का है, इसलिए वह भी नहीं।`}</p>
          </>
        ) : (
          <>
            <p>
              Text: Kavita-Kaumudi vol 1 (1917) and the Kabir Granthavali via Wikisource and Kavitakosh, plus the Kavitakosh Kabir Dohavali. Evident typing errors are corrected.
              Meanings and word meanings are Wisdom&apos;s own.
            </p>
            <p>{`${women.length} lines in Kabir's name use the words nari or kamini. We read each one and left out the ${excluded.length} that demean women. The doha "Kshama badan ko" belongs to Rahim, so it is not here.`}</p>
          </>
        )}
        <p>
          {locale === 'hi'
            ? `कुल ${notes.nearDuplicates} दोहे संग्रह में दोहराए गए या थोड़े बदले रूप में थे; हर दोहा यहाँ एक बार है।`
            : `${notes.nearDuplicates} lines in the source set repeat with small changes; each doha appears here once.`}
        </p>
      </Method>

      <Related
        heading={locale === 'hi' ? 'आगे पढ़ें' : 'Read next'}
        links={
          locale === 'hi'
            ? [
                { href: KAB_PATH_EN, label: 'Kabir dohe in English' },
                {
                  href: '/hi/chanakya-niti',
                  label: 'चाणक्य नीति के श्लोक, अर्थ सहित',
                },
                {
                  href: '/hi/vivekananda-quotes',
                  label: 'स्वामी विवेकानंद के विचार',
                },
                { href: '/hi/gita', label: 'भगवद गीता हिंदी में', gita: true },
              ]
            : [
                { href: KAB_PATH, label: 'कबीर के दोहे हिंदी अर्थ सहित' },
                {
                  href: '/vivekananda-quotes',
                  label: 'Vivekananda quotes, checked against his works',
                },
                { href: '/gita', label: 'Read the Bhagavad Gita', gita: true },
              ]
        }
      />
    </Shell>
  )
}
