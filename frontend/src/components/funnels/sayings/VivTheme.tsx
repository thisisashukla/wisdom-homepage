/** /vivekananda-quotes/[theme] (server, English). */

import PageTracker from '@/components/BlogTracker'
import { Faq, JsonLd, PageHero, Section, VerseList } from '@/components/site'
import { VIV_THEMES, vivBridge, vivByTheme, vivChecks, vivDrawer, vivEdition, type VivTheme } from '@/lib/funnels/sayings/data'
import { VIV_PATH, VIV_THEME_COPY, THEME_INTRO, vivCheckPath, vivThemePath } from '@/lib/funnels/sayings/copy-viv'
import { cardOg, ldArticle, ldItemList, ldQuotation } from '@/lib/funnels/sayings/seo'
import { VivVerse } from './cards'
import { VivGitaCard, vivShareText } from './VivHub'
import { Method, NextBand, Related } from './parts'

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
  const lines = vivByTheme(theme)
  const checkByLine = new Map(
    vivChecks()
      .filter((x) => x.hubLine)
      .map((x) => [x.hubLine as string, x.slug]),
  )
  const bridge = vivBridge().filter((b) => BRIDGE_FOR[theme].some(([ch, v]) => b.chapter === ch && b.verse === v))
  const firstCard = lines.find((l) => l.card)
  const ld = [
    ldArticle({
      headline: c.h1,
      description: c.description,
      path,
      locale: 'en',
      citation: vivEdition(),
      about: 'Swami Vivekananda',
      ...(firstCard ? { image: cardOg(firstCard.id) } : {}),
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
      <PageTracker pageName="Vivekananda Quotes Theme" />
      <JsonLd data={ld} />
      <PageHero
        crumbs={[
          { label: 'Vivekananda quotes', href: VIV_PATH },
          { label: c.label, href: path },
        ]}
        eyebrow={`${lines.length} lines. ${THEME_INTRO[theme].en} Updated 30 October 2026.`}
        title={c.h1}
        sub={c.promise}
        actions={[{ href: '#lines', label: 'Read the lines', location: 'theme_hero_lines' }]}
        below={
          <p id="quick-answer" className="fx-quick">
            {c.quick}
          </p>
        }
      />

      <Section id="lines" width="narrow" spacing="tight">
        <VerseList>
          {lines.map((l, i) => {
            const slug = checkByLine.get(l.slug)
            return (
              <VivVerse
                key={l.id}
                as="li"
                drawer={vivDrawer(l, 'en')}
                cardId={l.card ? l.id : undefined}
                locale="en"
                pageKey={pageKey}
                position={i + 1}
                section={theme}
                shareText={vivShareText(l, 'en', path)}
                checkHref={slug ? vivCheckPath(slug) : undefined}
              />
            )
          })}
        </VerseList>
      </Section>

      {bridge.length > 0 && (
        <Section id="gita" tone="band" width="narrow" title="The Gita behind these lines">
          <VerseList>
            {bridge.map((b) => (
              <VivGitaCard key={`${b.chapter}-${b.verse}`} b={b} locale="en" readLabel={`Read Gita ${b.chapter}.${b.verse}`} />
            ))}
          </VerseList>
        </Section>
      )}

      <NextBand heading="Keep one line with you" hub="vivekananda" locale="en" pageKey={pageKey} />

      <Section id="faq" width="narrow" title="Questions people ask">
        <Faq items={c.faq} />
      </Section>
      <Method heading="Sources and method">
        <p>
          Every line is matched against The Complete Works of Swami Vivekananda, Mayavati Memorial Edition (Advaita Ashrama), vols 1 to 8. Dashes in the printed text are shown as commas.
        </p>
      </Method>
      <Related
        heading="Read next"
        locale="en"
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
    </>
  )
}
