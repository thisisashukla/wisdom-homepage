/** /vivekananda-quotes and /hi/vivekananda-quotes (server). */

import { BlogTracker } from '@/components/BlogTracker'
import {
  VIV_THEMES,
  VERDICT_LABEL,
  checkDrawer,
  vivBridge,
  vivChecks,
  vivDrawer,
  vivEdition,
  vivLines,
  type Locale,
  type VivLine,
  type VivTheme,
} from '@/lib/funnels/sayings/data'
import { VIV_HUB, VIV_PATH, VIV_PATH_HI, VIV_THEME_COPY, THEME_INTRO, vivCheckPath, vivThemePath } from '@/lib/funnels/sayings/copy-viv'
import { abs, cardOg, ldArticle, ldBreadcrumb, ldFaq, ldItemList, ldQuotation } from '@/lib/funnels/sayings/seo'
import VivCard from './VivCard'
import FxNextStep from './FxNextStep'
import { Crumbs, Faq, JsonLd, Method, Related } from './parts'
import { archivo, tiroSa } from './fonts'
import './sayings.css'

export const vivShareText = (l: VivLine, locale: Locale, path: string): string =>
  [
    l.text,
    ...(locale === 'hi' && l.meaning.hi ? ['', l.meaning.hi] : []),
    '',
    `Swami Vivekananda, Complete Works vol ${l.source.volume}, ${l.source.work}`,
    `${abs(path)}?utm_source=copy&utm_medium=quote#${l.id}`,
  ].join('\n')

const T = {
  en: {
    crumbs: [{ label: 'Home', href: '/' }, { label: 'Vivekananda quotes' }],
    meta: '61 lines, each checked against the Complete Works. Updated 30 October 2026.',
    themes: 'Read by theme',
    jumpBridge: 'Gita lines he lived by',
    jumpChecks: 'Did he say it?',
    bridgeH: 'Lines Swamiji lived by',
    bridgeIntro: 'He quoted the Bhagavad Gita in lecture after lecture. These are the verses he comes back to, with the place in the Complete Works where he quotes each one.',
    readVerse: (c: number, v: number) => `Read Gita ${c}.${v}`,
    checksH: 'Did he say it?',
    checksIntro: 'We matched 44 of the most shared Vivekananda lines against volumes 1 to 8. Most are his. These are the ones that are reworded, stitched together, or not in his works at all.',
    confirmed: (n: number) => `${n} more shared lines that are in his words`,
    nextH: 'Keep one line with you',
    faq: 'Questions people ask',
    method: 'Sources and method',
    related: 'Read next',
    seeCheck: 'Read the check',
  },
  hi: {
    crumbs: [{ label: 'होम', href: '/' }, { label: 'स्वामी विवेकानंद के विचार' }],
    meta: '61 वचन, हर एक कम्प्लीट वर्क्स से मिलाया हुआ। 30 अक्टूबर 2026 को अपडेट।',
    themes: 'विषय के हिसाब से',
    jumpBridge: 'गीता के श्लोक',
    jumpChecks: 'क्या उन्होंने यह कहा?',
    bridgeH: 'गीता के वे श्लोक जिन पर स्वामीजी जिए',
    bridgeIntro: 'स्वामीजी अपने व्याख्यानों में बार-बार भगवद गीता उद्धृत करते थे। ये वे श्लोक हैं, और कम्प्लीट वर्क्स में वह जगह जहाँ उन्होंने इन्हें दोहराया।',
    readVerse: (c: number, v: number) => `गीता ${c}.${v} पढ़ें`,
    checksH: 'क्या उन्होंने सच में यह कहा?',
    checksIntro: 'हमने सबसे ज़्यादा शेयर होने वाली 44 पंक्तियों को खंड 1 से 8 से मिलाया। ज़्यादातर उनकी हैं। ये वे हैं जो बदली गईं, जोड़ी गईं, या उनकी रचनाओं में हैं ही नहीं।',
    confirmed: (n: number) => `${n} और पंक्तियाँ जो उनके अपने शब्द हैं`,
    nextH: 'एक पंक्ति रोज़ अपने साथ रखें',
    faq: 'लोग अक्सर पूछते हैं',
    method: 'स्रोत और तरीका',
    related: 'आगे पढ़ें',
    seeCheck: 'जाँच पढ़ें',
  },
}

const THEME_HI: Record<VivTheme, string> = {
  students: 'विद्यार्थियों के लिए',
  education: 'शिक्षा पर',
  'fear-and-strength': 'डर और ताकत',
  'work-and-success': 'काम और सफलता',
}

export default function VivHub({ locale }: { locale: Locale }) {
  const t = T[locale]
  const c = VIV_HUB[locale]
  const path = locale === 'hi' ? VIV_PATH_HI : VIV_PATH
  const pageKey = locale === 'hi' ? 'viv-hub-hi' : 'viv-hub-en'
  const pageName = locale === 'hi' ? 'Vivekananda Quotes Hub HI' : 'Vivekananda Quotes Hub EN'
  const lines = vivLines()
  const byPrimary = (th: VivTheme) => lines.filter((l) => l.themes[0] === th)
  const checks = vivChecks()
  const flagged = checks.filter((x) => x.verdict !== 'in-his-words')
  const confirmed = checks.filter((x) => x.verdict === 'in-his-words')
  const checkByLine = new Map(checks.filter((x) => x.hubLine).map((x) => [x.hubLine as string, x.slug]))
  let pos = 0

  const ld = [
    ldBreadcrumb([{ name: 'Wisdom', path: '/' }, { name: locale === 'hi' ? 'स्वामी विवेकानंद के विचार' : 'Vivekananda quotes', path }]),
    ldArticle({ headline: c.h1, description: c.description, path, locale, citation: vivEdition(), about: 'Swami Vivekananda', image: cardOg('viv-arise-awake', locale) }),
    ldFaq(c.faq),
    ldItemList(
      c.h1,
      lines.map((l) =>
        ldQuotation({ text: l.text, author: 'Swami Vivekananda', path, anchor: l.id, locale: 'en', citation: `Complete Works of Swami Vivekananda, vol ${l.source.volume}, ${l.source.work}` }),
      ),
    ),
  ]

  return (
    <div className={`fx-sayings ${archivo.variable} ${tiroSa.variable}`} data-hub="vivekananda" lang={locale}>
      <BlogTracker pageName={pageName} />
      {ld.map((d, i) => (
        <JsonLd key={i} data={d} />
      ))}
      <div className="fx-page">
        <Crumbs items={t.crumbs} locale={locale} />
        <header className="fx-hero">
          <h1 className="fx-h1">{c.h1}</h1>
          <p className="fx-promise">{c.promise}</p>
          <p id="quick-answer" className="fx-quick">
            {c.quick}
          </p>
          <p className="fx-meta">{t.meta}</p>
          <ul className="fx-jump">
            {VIV_THEMES.map((th) => (
              <li key={th}>
                <a href={`#${th}`}>{locale === 'hi' ? THEME_HI[th] : VIV_THEME_COPY[th].label}</a>
              </li>
            ))}
            <li>
              <a href="#gita">{t.jumpBridge}</a>
            </li>
            <li>
              <a href="#did-he-say">{t.jumpChecks}</a>
            </li>
          </ul>
        </header>

        {VIV_THEMES.map((th, si) => (
          <section key={th} id={th} className="fx-sec" aria-labelledby={`${th}-h`}>
            <h2 id={`${th}-h`} className="fx-h2">
              {locale === 'hi' ? THEME_HI[th] : VIV_THEME_COPY[th].label}
            </h2>
            <p className="fx-intro">
              {THEME_INTRO[th][locale]}{' '}
              {locale === 'en' && (
                <a href={vivThemePath(th)} data-mp-location={`theme_${th}`}>
                  {`All ${VIV_THEME_COPY[th].label.toLowerCase()} lines`}
                </a>
              )}
            </p>
            <div className="fx-list">
              {byPrimary(th).map((l) => {
                pos += 1
                const slug = checkByLine.get(l.slug)
                return (
                  <VivCard
                    key={l.id}
                    drawer={vivDrawer(l, locale)}
                    meaning={locale === 'hi' ? l.meaning.hi : undefined}
                    meaningLang="hi"
                    cardId={l.card ? l.id : undefined}
                    locale={locale}
                    pageName={pageName}
                    pageKey={pageKey}
                    position={pos}
                    section={th}
                    shareText={vivShareText(l, locale, path)}
                    checkHref={slug && locale === 'en' ? vivCheckPath(slug) : undefined}
                  />
                )
              })}
            </div>
            {si === 0 && (
              <div className="fx-next">
                <h2 className="fx-h2">{t.nextH}</h2>
                <FxNextStep hub="vivekananda" locale={locale} pageName={pageName} pageKey={pageKey} placement="mid" />
              </div>
            )}
          </section>
        ))}

        <section id="gita" className="fx-sec" aria-labelledby="gita-h">
          <h2 id="gita-h" className="fx-h2">
            {t.bridgeH}
          </h2>
          <p className="fx-intro">{t.bridgeIntro}</p>
          <div className="fx-bridge">
            {vivBridge().map((b) => (
              <div key={`${b.chapter}-${b.verse}`} className="fx-bridge-item">
                <p className="fx-bridge-sa" lang="sa">
                  {b.sanskritLine}
                </p>
                <p className="fx-bridge-his" lang="en">
                  &ldquo;{b.his}&rdquo;
                </p>
                <p className="fx-bridge-note">{b.note[locale]}</p>
                <p className="fx-bridge-foot">
                  <span lang="en">{`Complete Works vol ${b.source.volume}, ${b.source.work}`}</span>
                  <a className="fx-gita" href={`${locale === 'hi' ? '/hi' : ''}/gita/chapter/${b.chapter}/verse/${b.verse}`} data-mp-location="gita_bridge">
                    {t.readVerse(b.chapter, b.verse)}
                  </a>
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="did-he-say" className="fx-sec" aria-labelledby="checks-h">
          <h2 id="checks-h" className="fx-h2">
            {t.checksH}
          </h2>
          <p className="fx-intro">{t.checksIntro}</p>
          <div className="fx-checks">
            {flagged.map((x) => {
              const real = checkDrawer(x, locale)
              return (
                <div key={x.slug} className="fx-check">
                  <p>
                    <span className="fx-stamp" data-verdict={x.verdict}>
                      {VERDICT_LABEL[x.verdict][locale]}
                    </span>
                  </p>
                  <p className="fx-check-q" lang="en">
                    <s>&ldquo;{x.shared}&rdquo;</s>
                  </p>
                  {x.note && <p className="fx-intro" lang={locale}>{x.note[locale]}</p>}
                  {real && (
                    <p className="fx-meta" lang="en">
                      {`Real line: "${real.line}" Complete Works vol ${real.volume}, ${real.work}`}
                    </p>
                  )}
                  {locale === 'en' && (
                    <p>
                      <a href={vivCheckPath(x.slug)} className="fx-check-link" data-mp-location="fact_check_list">
                        {t.seeCheck}
                      </a>
                    </p>
                  )}
                </div>
              )
            })}
          </div>
          <details className="fx-note-box">
            <summary>{t.confirmed(confirmed.length)}</summary>
            <ul>
              {confirmed.map((x) => (
                <li key={x.slug} lang="en">
                  {locale === 'en' ? <a href={vivCheckPath(x.slug)}>{x.shared}</a> : x.shared}
                </li>
              ))}
            </ul>
          </details>
        </section>

        <section className="fx-next" aria-label={t.nextH}>
          <h2 className="fx-h2">{t.nextH}</h2>
          <FxNextStep hub="vivekananda" locale={locale} pageName={pageName} pageKey={pageKey} placement="end" />
        </section>

        <Faq items={c.faq} heading={t.faq} />

        <Method heading={t.method}>
          {locale === 'en' ? (
            <>
              <p>
                Text: The Complete Works of Swami Vivekananda, Mayavati Memorial Edition (Advaita Ashrama), vols 1 to 8, as published on ramakrishnavivekananda.info. Records translated from Bengali are left out of the hub; where a fact check depends on one, it says so.
              </p>
              <p>
                Each line was matched with a fuzzy text match against 9,239 paragraphs. Verdicts: In his words (a match of 90 or more out of 100), Paraphrase (70 to 90, with the real line shown), Not in his works (under 70, after a phrase search of Wikisource across all volumes, including vol 9). Dashes in the printed text are shown as commas. The Hindi meanings are Wisdom&apos;s own.
              </p>
            </>
          ) : (
            <>
              <p>
                पाठ: द कम्प्लीट वर्क्स ऑफ़ स्वामी विवेकानंद, मायावती मेमोरियल संस्करण (अद्वैत आश्रम), खंड 1 से 8। बांग्ला से अनूदित हिस्से इस सूची में नहीं लिए गए। मूल पंक्तियाँ अंग्रेज़ी में हैं, जैसी स्वामीजी ने कहीं। हिंदी अर्थ Wisdom ने लिखे हैं।
              </p>
              <p>हर पंक्ति को 9,239 अनुच्छेदों से मिलाया गया। 90 या ज़्यादा मिलान: उनके अपने शब्द। 70 से 90: बदला हुआ रूप। 70 से कम: उनकी रचनाओं में नहीं।</p>
            </>
          )}
        </Method>

        <Related
          heading={t.related}
          links={
            locale === 'en'
              ? [
                  ...VIV_THEMES.map((th) => ({ href: vivThemePath(th), label: VIV_THEME_COPY[th].h1 })),
                  { href: '/gita/chapter/2/verse/3', label: 'Bhagavad Gita 2.3, the verse he said holds the whole Gita', gita: true },
                  { href: '/kabir-dohe-in-english', label: 'Kabir dohe in English' },
                  { href: VIV_PATH_HI, label: 'स्वामी विवेकानंद के विचार हिंदी में' },
                ]
              : [
                  { href: '/hi/gita/chapter/2/verse/3', label: 'भगवद गीता 2.3, जिसमें स्वामीजी ने पूरी गीता देखी', gita: true },
                  { href: '/hi/kabir-ke-dohe', label: 'कबीर के दोहे अर्थ सहित' },
                  { href: '/hi/chanakya-niti', label: 'चाणक्य नीति के श्लोक' },
                  { href: VIV_PATH, label: 'Vivekananda quotes in English' },
                ]
          }
        />
      </div>
    </div>
  )
}
