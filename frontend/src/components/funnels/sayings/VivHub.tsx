/** /vivekananda-quotes and /hi/vivekananda-quotes (server). */

import PageTracker from '@/components/BlogTracker'
import { Faq, GitaBridge, JsonLd, PageHero, Section, VerseCard, VerseList } from '@/components/site'
import { VIV_THEMES, VERDICT_LABEL, checkDrawer, chipText, vivBridge, vivChecks, vivDrawer, vivEdition, vivLine, vivLines, type Locale, type VivBridge, type VivLine, type VivTheme } from '@/lib/funnels/sayings/data'
import { VIV_HUB, VIV_PATH, VIV_PATH_HI, VIV_THEME_COPY, THEME_INTRO, vivCheckPath, vivThemePath } from '@/lib/funnels/sayings/copy-viv'
import { abs, cardOg, ldArticle, ldItemList, ldQuotation } from '@/lib/funnels/sayings/seo'
import { VivVerse } from './cards'
import { JumpChips, Method, NextBand, NextPanel, Related } from './parts'

export const vivShareText = (l: VivLine, locale: Locale, path: string): string =>
  [
    l.text,
    ...(locale === 'hi' && l.meaning.hi ? ['', l.meaning.hi] : []),
    '',
    `Swami Vivekananda, Complete Works vol ${l.source.volume}, ${l.source.work}`,
    `${abs(path)}?utm_source=copy&utm_medium=quote#${l.id}`,
  ].join('\n')

/** One Gita verse Swamiji quoted: the Sanskrit line, his English, why it mattered, and the link to the verse. */
export function VivGitaCard({ b, locale, readLabel }: { b: VivBridge; locale: Locale; readLabel: string }) {
  return (
    <VerseCard
      as="li"
      align="left"
      rv
      className="fx-card"
      locale={locale}
      original={b.sanskritLine}
      meaning={<span lang="en">&ldquo;{b.his}&rdquo;</span>}
      source={<span lang="en">{`Complete Works vol ${b.source.volume}, ${b.source.work}`}</span>}
    >
      <p className="fx-bridge-note">{b.note[locale]}</p>
      <GitaBridge variant="inline" href={`${locale === 'hi' ? '/hi' : ''}/gita/chapter/${b.chapter}/verse/${b.verse}`} label={readLabel} location="gita_bridge" locale={locale} />
    </VerseCard>
  )
}

/** The hero verse: Katha 1.3.14, which his best-known line adapts, with his line as the meaning. */
const ARISE = { sa: 'उत्तिष्ठत जाग्रत प्राप्य वरान्निबोधत ।', iast: 'uttiṣṭhata jāgrata prāpya varān nibodhata |', label: { en: 'Katha Upanishad 1.3.14', hi: 'कठोपनिषद 1.3.14' } }

const T = {
  en: {
    cta: 'Read the lines',
    crumbs: [{ label: 'Home', href: '/' }, { label: 'Vivekananda quotes' }],
    meta: '61 lines, each checked against the Complete Works. Updated 30 October 2026.',
    themes: 'Read by theme',
    jumpBridge: 'Gita lines he lived by',
    jumpChecks: 'Did he say it?',
    bridgeH: 'Lines Swamiji lived by',
    bridgeIntro: 'He quoted the Bhagavad Gita in lecture after lecture. These are the verses he comes back to, with the place in the Complete Works where he quotes each one.',
    readVerse: (c: number, v: number) => `Read Gita ${c}.${v}`,
    checksH: 'Did he say it?',
    checksIntro:
      'We matched 44 of the most shared Vivekananda lines against volumes 1 to 8. Most are his. These are the ones that are reworded, stitched together, or not in his works at all.',
    confirmed: (n: number) => `${n} more shared lines that are in his words`,
    nextH: 'Keep one line with you',
    faq: 'Questions people ask',
    method: 'Sources and method',
    related: 'Read next',
    seeCheck: 'Read the check',
  },
  hi: {
    cta: 'वचन पढ़ें',
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
  const lines = vivLines()
  const byPrimary = (th: VivTheme) => lines.filter((l) => l.themes[0] === th)
  const checks = vivChecks()
  const flagged = checks.filter((x) => x.verdict !== 'in-his-words')
  const confirmed = checks.filter((x) => x.verdict === 'in-his-words')
  const checkByLine = new Map(checks.filter((x) => x.hubLine).map((x) => [x.hubLine as string, x.slug]))
  const arise = vivLine('arise-awake')
  let pos = 0

  const ld = [
    ldArticle({
      headline: c.h1,
      description: c.description,
      path,
      locale,
      citation: vivEdition(),
      about: 'Swami Vivekananda',
      image: cardOg('viv-arise-awake', locale),
    }),
    ldItemList(
      c.h1,
      lines.map((l) =>
        ldQuotation({
          text: l.text,
          author: 'Swami Vivekananda',
          path,
          anchor: l.id,
          locale: 'en',
          citation: `Complete Works of Swami Vivekananda, vol ${l.source.volume}, ${l.source.work}`,
        }),
      ),
    ),
  ]

  return (
    <>
      <PageTracker pageName={locale === 'hi' ? 'Vivekananda Quotes Hub HI' : 'Vivekananda Quotes Hub'} />
      <JsonLd data={ld} />
      <PageHero
        locale={locale}
        crumbs={[{ label: t.crumbs[1].label, href: path }]}
        eyebrow={t.meta}
        title={c.h1}
        sub={c.promise}
        actions={[{ href: `#${VIV_THEMES[0]}`, label: t.cta, location: 'hub_hero_lines' }]}
        below={
          <>
            <p id="quick-answer" className="fx-quick">
              {c.quick}
            </p>
            <JumpChips
              locale={locale}
              items={[
                ...VIV_THEMES.map((th) => ({
                  href: `#${th}`,
                  label: locale === 'hi' ? THEME_HI[th] : VIV_THEME_COPY[th].label,
                })),
                { href: '#gita', label: t.jumpBridge },
                { href: '#did-he-say', label: t.jumpChecks },
              ]}
            />
          </>
        }
        verse={
          arise
            ? {
                label: ARISE.label[locale],
                original: ARISE.sa,
                iast: ARISE.iast,
                meaning: locale === 'hi' ? arise.meaning.hi : arise.text,
                source: chipText(arise.source, locale),
              }
            : undefined
        }
      />

      {VIV_THEMES.map((th, si) => (
        <Section
          key={th}
          id={th}
          tone={si % 2 ? 'band' : 'default'}
          width="narrow"
          title={locale === 'hi' ? THEME_HI[th] : VIV_THEME_COPY[th].label}
          intro={
            <>
              {THEME_INTRO[th][locale]}{' '}
              {locale === 'en' && (
                <a className="sx-link" href={vivThemePath(th)} data-mp-location={`theme_${th}`}>
                  {`All ${VIV_THEME_COPY[th].label.toLowerCase()} lines`}
                </a>
              )}
            </>
          }
        >
          <VerseList>
            {byPrimary(th).map((l) => {
              pos += 1
              const slug = checkByLine.get(l.slug)
              return (
                <VivVerse
                  key={l.id}
                  as="li"
                  drawer={vivDrawer(l, locale)}
                  meaning={locale === 'hi' ? l.meaning.hi : undefined}
                  meaningLang="hi"
                  cardId={l.card ? l.id : undefined}
                  locale={locale}
                  pageKey={pageKey}
                  position={pos}
                  section={th}
                  shareText={vivShareText(l, locale, path)}
                  checkHref={slug && locale === 'en' ? vivCheckPath(slug) : undefined}
                />
              )
            })}
          </VerseList>
          {si === 0 && <NextPanel heading={t.nextH} hub="vivekananda" locale={locale} pageKey={pageKey} />}
        </Section>
      ))}

      <Section id="gita" width="narrow" title={t.bridgeH} intro={t.bridgeIntro}>
        <VerseList>
          {vivBridge().map((b) => (
            <VivGitaCard key={`${b.chapter}-${b.verse}`} b={b} locale={locale} readLabel={t.readVerse(b.chapter, b.verse)} />
          ))}
        </VerseList>
      </Section>

      <Section id="did-he-say" tone="band" width="narrow" title={t.checksH} intro={t.checksIntro}>
        <div className="fx-fakes">
          {flagged.map((x) => {
            const real = checkDrawer(x, locale)
            return (
              <div key={x.slug} className="fx-fake rv">
                <p>
                  <span className="fx-stamp" data-verdict={x.verdict}>
                    {VERDICT_LABEL[x.verdict][locale]}
                  </span>
                </p>
                <p className="fx-fake-line" lang="en">
                  <s>&ldquo;{x.shared}&rdquo;</s>
                </p>
                {x.note && (
                  <p className="fx-fake-origin" lang={locale}>
                    {x.note[locale]}
                  </p>
                )}
                {real && (
                  <p className="fx-fake-real" lang="en">
                    {'Real line: '}
                    <q>{real.line}</q>
                    {` Complete Works vol ${real.volume}, ${real.work}`}
                  </p>
                )}
                {locale === 'en' && (
                  <p>
                    <a href={vivCheckPath(x.slug)} className="sx-link" data-mp-location="fact_check_list">
                      {t.seeCheck}
                    </a>
                  </p>
                )}
              </div>
            )
          })}
        </div>
        <details className="fx-more-box" data-mp-disclosure="viv_more">
          <summary>{t.confirmed(confirmed.length)}</summary>
          <ul>
            {confirmed.map((x) => (
              <li key={x.slug} lang="en">
                {locale === 'en' ? <a href={vivCheckPath(x.slug)}>{x.shared}</a> : x.shared}
              </li>
            ))}
          </ul>
        </details>
      </Section>

      <NextBand heading={t.nextH} hub="vivekananda" locale={locale} pageKey={pageKey} />

      <Section id="faq" width="narrow" title={t.faq}>
        <Faq items={c.faq} locale={locale} />
      </Section>

      <Method heading={t.method}>
        {locale === 'en' ? (
          <>
            <p>
              Text: The Complete Works of Swami Vivekananda, Mayavati Memorial Edition (Advaita Ashrama), vols 1 to 8, as published on ramakrishnavivekananda.info. Records
              translated from Bengali are left out of the hub; where a fact check depends on one, it says so.
            </p>
            <p>
              Each line was matched with a fuzzy text match against 9,239 paragraphs. Verdicts: In his words (a match of 90 or more out of 100), Paraphrase (70 to 90, with the real
              line shown), Not in his works (under 70, after a phrase search of Wikisource across all volumes, including vol 9). Dashes in the printed text are shown as commas. The
              Hindi meanings are Wisdom&apos;s own.
            </p>
          </>
        ) : (
          <>
            <p>
              पाठ: द कम्प्लीट वर्क्स ऑफ़ स्वामी विवेकानंद, मायावती मेमोरियल संस्करण (अद्वैत आश्रम), खंड 1 से 8। बांग्ला से अनूदित हिस्से इस सूची में नहीं लिए गए। मूल पंक्तियाँ
              अंग्रेज़ी में हैं, जैसी स्वामीजी ने कहीं। हिंदी अर्थ Wisdom ने लिखे हैं।
            </p>
            <p>हर पंक्ति को 9,239 अनुच्छेदों से मिलाया गया। 90 या ज़्यादा मिलान: उनके अपने शब्द। 70 से 90: बदला हुआ रूप। 70 से कम: उनकी रचनाओं में नहीं।</p>
          </>
        )}
      </Method>

      <Related
        heading={t.related}
        locale={locale}
        links={
          locale === 'en'
            ? [
                ...VIV_THEMES.map((th) => ({
                  href: vivThemePath(th),
                  label: VIV_THEME_COPY[th].h1,
                })),
                {
                  href: '/gita/chapter/2/verse/3',
                  label: 'Bhagavad Gita 2.3, the verse he said holds the whole Gita',
                  gita: true,
                },
                {
                  href: '/kabir-dohe-in-english',
                  label: 'Kabir dohe in English',
                },
                {
                  href: VIV_PATH_HI,
                  label: 'स्वामी विवेकानंद के विचार हिंदी में',
                },
              ]
            : [
                {
                  href: '/hi/gita/chapter/2/verse/3',
                  label: 'भगवद गीता 2.3, जिसमें स्वामीजी ने पूरी गीता देखी',
                  gita: true,
                },
                { href: '/hi/kabir-ke-dohe', label: 'कबीर के दोहे अर्थ सहित' },
                { href: '/hi/chanakya-niti', label: 'चाणक्य नीति के श्लोक' },
                { href: VIV_PATH, label: 'Vivekananda quotes in English' },
              ]
        }
      />
    </>
  )
}
