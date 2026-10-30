/** /vivekananda-quotes/[theme] (server, English). */

import { BlogTracker } from '@/components/BlogTracker'
import { VIV_THEMES, vivBridge, vivByTheme, vivChecks, vivDrawer, vivEdition, type VivTheme } from '@/lib/funnels/sayings/data'
import { VIV_PATH, VIV_THEME_COPY, THEME_INTRO, vivCheckPath, vivThemePath } from '@/lib/funnels/sayings/copy-viv'
import { cardOg, ldArticle, ldBreadcrumb, ldFaq, ldItemList, ldQuotation } from '@/lib/funnels/sayings/seo'
import VivCard from './VivCard'
import FxNextStep from './FxNextStep'
import { vivShareText } from './VivHub'
import { DailyBand, Faq, Head, JsonLd, Method, Related, Sec, Shell } from './parts'
import { tiroSa } from './fonts'

const BRIDGE_FOR: Record<VivTheme, number[][]> = {
  students: [[2, 3]],
  education: [[13, 29]],
  'fear-and-strength': [
    [2, 3],
    [2, 23],
    [2, 40],
  ],
  'work-and-success': [[2, 47]],
}

export default function VivThemePage({ theme }: { theme: VivTheme }) {
  const c = VIV_THEME_COPY[theme]
  const path = vivThemePath(theme)
  const pageKey = `viv-theme-${theme}`
  const pageName = `Vivekananda Quotes ${c.label}`
  const lines = vivByTheme(theme)
  const checkByLine = new Map(
    vivChecks()
      .filter((x) => x.hubLine)
      .map((x) => [x.hubLine as string, x.slug]),
  )
  const bridge = vivBridge().filter((b) => BRIDGE_FOR[theme].some(([ch, v]) => b.chapter === ch && b.verse === v))
  const firstCard = lines.find((l) => l.card)
  const ld = [
    ldBreadcrumb([
      { name: 'Wisdom', path: '/' },
      { name: 'Vivekananda quotes', path: VIV_PATH },
      { name: c.label, path },
    ]),
    ldArticle({
      headline: c.h1,
      description: c.description,
      path,
      locale: 'en',
      citation: vivEdition(),
      about: 'Swami Vivekananda',
      ...(firstCard ? { image: cardOg(firstCard.id) } : {}),
    }),
    ldFaq(c.faq),
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
    <Shell hub="vivekananda" locale="en" fonts={tiroSa.variable}>
      <BlogTracker pageName={pageName} />
      {ld.map((d, i) => (
        <JsonLd key={i} data={d} />
      ))}
      <Head
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Vivekananda quotes', href: VIV_PATH }, { label: c.label }]}
        locale="en"
        eyebrow={`${lines.length} lines. ${THEME_INTRO[theme].en} Updated 30 October 2026.`}
        h1={c.h1}
        promise={c.promise}
        quick={c.quick}
      />

      <div className="qp-sections">
        <section className="qp-section" aria-label={c.h1}>
          <div className="qp-cards">
            {lines.map((l, i) => {
              const slug = checkByLine.get(l.slug)
              return (
                <VivCard
                  key={l.id}
                  drawer={vivDrawer(l, 'en')}
                  cardId={l.card ? l.id : undefined}
                  locale="en"
                  pageName={pageName}
                  pageKey={pageKey}
                  position={i + 1}
                  section={theme}
                  shareText={vivShareText(l, 'en', path)}
                  checkHref={slug ? vivCheckPath(slug) : undefined}
                />
              )
            })}
          </div>
        </section>

        {bridge.length > 0 && (
          <Sec hid="gita-h" heading="The Gita behind these lines">
            <div className="qp-cards">
              {bridge.map((b) => (
                <div key={`${b.chapter}-${b.verse}`} className="qc fx-card rv">
                  <p className="qc-sa" lang="sa">
                    {b.sanskritLine}
                  </p>
                  <p className="fx-bridge-his">&ldquo;{b.his}&rdquo;</p>
                  <p className="fx-bridge-note">{b.note.en}</p>
                  <p className="fx-bridge-foot">
                    <span>{`Complete Works vol ${b.source.volume}, ${b.source.work}`}</span>
                    <a className="fx-gita" href={`/gita/chapter/${b.chapter}/verse/${b.verse}`} data-mp-location="gita_bridge">
                      {`Read Gita ${b.chapter}.${b.verse}`}
                    </a>
                  </p>
                </div>
              ))}
            </div>
          </Sec>
        )}
      </div>

      <DailyBand heading="Keep one line with you">
        <FxNextStep hub="vivekananda" locale="en" pageName={pageName} pageKey={pageKey} placement="end" />
      </DailyBand>

      <Faq items={c.faq} heading="Questions people ask" />
      <Method heading="Sources and method">
        <p>
          Every line is matched against The Complete Works of Swami Vivekananda, Mayavati Memorial Edition (Advaita Ashrama), vols 1 to 8. Tap the source on a card to read the
          paragraph and open the full text. Dashes in the printed text are shown as commas.
        </p>
      </Method>
      <Related
        heading="Read next"
        links={[
          { href: VIV_PATH, label: 'All 61 checked Vivekananda quotes' },
          ...VIV_THEMES.filter((t) => t !== theme).map((t) => ({
            href: vivThemePath(t),
            label: VIV_THEME_COPY[t].h1,
          })),
          {
            href: `${VIV_PATH}#did-he-say`,
            label: 'Lines he never said as written',
          },
        ]}
      />
    </Shell>
  )
}
