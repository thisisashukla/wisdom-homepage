/** /vivekananda-quotes/did-he-say/[slug] (server, English). The first sentence answers the question. */

import { BlogTracker } from '@/components/BlogTracker'
import { VERDICT_LABEL, checkDrawer, vivChecks, vivDrawer, vivEdition, vivLine, vivLines, type VivCheck, type VivLine } from '@/lib/funnels/sayings/data'
import { VIV_PATH, VIV_THEME_COPY, vivCheckPath, vivThemePath } from '@/lib/funnels/sayings/copy-viv'
import { abs, cardOg, ldArticle, ldBreadcrumb, ldClaimReview, ldFaq, ldQuotation } from '@/lib/funnels/sayings/seo'
import VivCard from './VivCard'
import FxNextStep from './FxNextStep'
import FactCheckTracker from './FactCheckTracker'
import { vivShareText } from './VivHub'
import { DailyBand, Faq, Head, JsonLd, Method, Related, Sec, Shell } from './parts'

/** Real lines to read instead, for shared lines that are not his. */
const INSTEAD: Record<string, string[]> = {
  'day-without-problems-wrong-path': ['never-mind-failures', 'great-gymnasium', 'great-results-patience'],
  'talk-to-yourself-once-a-day': ['thoughts-made-us', 'grow-from-inside-out', 'true-to-your-nature'],
  'take-risks-lead-guide': ['dare-to-be-free', 'stand-up-be-bold', 'never-mind-failures'],
  'mind-is-intensely-eager': ['take-up-one-idea', 'world-gives-up-secrets', 'all-power-within'],
  'all-love-is-expansion': ['live-for-others', 'secret-of-success'],
  'be-a-hero-i-have-no-fear': ['be-not-afraid', 'fearlessness-heaven'],
  'comfort-is-no-test-of-truth': ['truth-thousand-ways', 'dare-to-be-free'],
  'believe-in-yourself-and-the-world-will-be-at-your-feet': ['believe-god-yourself', 'hold-on-to-your-ideas'],
}

export function checkShort(shared: string, max = 34): string {
  const words = shared.replace(/[.,;:]+$/, '').split(/\s+/)
  let out = ''
  for (const w of words) {
    if ((out + ' ' + w).trim().length > max) return `${out.trim().replace(/[,;:]$/, '')}...`
    out = `${out} ${w}`
  }
  return out.trim().replace(/[.,;:]$/, '')
}

export function checkAnswer(x: VivCheck): string {
  const r = x.real?.source
  if (x.verdict === 'not-found') return `No. "${x.shared}" does not appear in Swami Vivekananda's Complete Works.`
  if (x.verdict === 'paraphrase' && r) return `Partly. The shared line is a reworded version of what he said in ${r.work} (Complete Works, vol ${r.volume}).`
  if (r) return `Yes. Swami Vivekananda said this in ${r.work} (Complete Works, vol ${r.volume}).`
  return ''
}

const RATING = { 'in-his-words': 3, paraphrase: 2, 'not-found': 1 } as const

export default function VivCheckPage({ check: x }: { check: VivCheck }) {
  const path = vivCheckPath(x.slug)
  const pageKey = `viv-check-${x.slug}`.slice(0, 40).replace(/-+$/, '')
  const pageName = `Vivekananda Fact Check ${x.slug}`
  const short = checkShort(x.shared)
  const h1 = `Did Vivekananda say "${short}"?`
  const answer = checkAnswer(x)
  const real = checkDrawer(x, 'en')
  const hub: VivLine | null = x.hubLine ? vivLine(x.hubLine) : null
  const instead = (INSTEAD[x.slug] ?? []).map((s) => vivLine(s)).filter((l): l is VivLine => Boolean(l))
  const theme = hub?.themes[0] ?? instead[0]?.themes[0] ?? 'fear-and-strength'
  const more = vivLines()
    .filter((l) => l.themes.includes(theme) && l.slug !== hub?.slug && !instead.some((i) => i.slug === l.slug))
    .slice(0, 2)
  const r = x.real?.source
  const kindLine = r
    ? r.recordType === 'notes_by_disciple'
      ? 'It survives in class notes taken by a disciple, which the Complete Works prints.'
      : r.recordType === 'compiled_sayings'
        ? 'It is in Sayings and Utterances, a list of his sayings compiled in vol 5.'
        : r.recordType === 'conversation_record'
          ? 'It is from a conversation recorded by a disciple.'
          : r.recordType === 'letter'
            ? 'It is from one of his letters.'
            : ''
    : ''
  const translated = r?.translatedFromBengali ? 'He said or wrote it in Bengali; the Complete Works prints an English translation.' : ''
  const faq = [
    {
      q: `Is "${short}" in the Complete Works of Swami Vivekananda?`,
      a:
        x.verdict === 'not-found'
          ? `No. We searched volumes 1 to 8 with a fuzzy match and Wikisource across all nine volumes by phrase. Nothing comes close.`
          : `${answer} ${kindLine}`.trim(),
    },
    {
      q: 'How do you check a Vivekananda quote?',
      a: 'Search a distinctive phrase in the Complete Works (Advaita Ashrama, nine volumes; the text is on ramakrishnavivekananda.info and Wikisource). If only quote sites carry it, with no volume or lecture named, treat it as unverified.',
    },
  ]
  const ld = [
    ldBreadcrumb([
      { name: 'Wisdom', path: '/' },
      { name: 'Vivekananda quotes', path: VIV_PATH },
      { name: 'Did he say it?', path: `${VIV_PATH}#did-he-say` },
      { name: short, path },
    ]),
    ldClaimReview({
      claim: `Swami Vivekananda said: "${x.shared}"`,
      verdict: VERDICT_LABEL[x.verdict].en,
      rating: RATING[x.verdict],
      path,
      author: 'Swami Vivekananda',
    }),
    ldArticle({
      headline: h1,
      description: answer,
      path,
      locale: 'en',
      citation: vivEdition(),
      about: 'Swami Vivekananda',
      ...(hub?.card ? { image: cardOg(hub.id) } : {}),
    }),
    ldFaq(faq),
    ...(real
      ? [
          {
            '@context': 'https://schema.org',
            ...ldQuotation({
              text: real.line,
              author: 'Swami Vivekananda',
              path,
              locale: 'en',
              citation: `Complete Works of Swami Vivekananda, vol ${real.volume}, ${real.work}`,
            }),
          },
        ]
      : []),
  ]
  return (
    <Shell hub="vivekananda" locale="en">
      <BlogTracker pageName={pageName} />
      <FactCheckTracker slug={x.slug} verdict={x.verdict} pageKey={pageKey} locale="en" />
      {ld.map((d, i) => (
        <JsonLd key={i} data={d} />
      ))}
      <Head
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Vivekananda quotes', href: VIV_PATH }, { label: 'Did he say it?', href: `${VIV_PATH}#did-he-say` }, { label: short }]}
        locale="en"
        h1={h1}
      >
        <p className="fx-verdict rv">
          <span className="fx-stamp" data-verdict={x.verdict}>
            {VERDICT_LABEL[x.verdict].en}
          </span>
        </p>
        <p id="quick-answer" className="fx-quick rv">
          {[answer, kindLine, translated, x.note?.en].filter(Boolean).join(' ')}
        </p>
      </Head>

      <div className="qp-sections">
        <Sec hid="shared-h" heading="The version people share">
          <p className="fx-shared rv">{x.verdict === 'not-found' ? <s>&ldquo;{x.shared}&rdquo;</s> : <>&ldquo;{x.shared}&rdquo;</>}</p>
          <p className="fx-seen">{`Seen on: ${x.seenOn}.`}</p>
        </Sec>

        {real && (
          <Sec hid="real-h" heading="What he said" intro="Tap the source to read the whole paragraph.">
            <div className="qp-cards">
              <VivCard
                drawer={real}
                cardId={hub?.card ? hub.id : undefined}
                locale="en"
                pageName={pageName}
                pageKey={pageKey}
                section="fact-check"
                shareText={[real.line, '', `Swami Vivekananda, Complete Works vol ${real.volume}, ${real.work}`, `${abs(path)}?utm_source=copy&utm_medium=quote`].join('\n')}
              />
            </div>
            {x.also?.map((a) => (
              <p key={a.text} className="fx-also">
                <span>Also in his words</span>
                &ldquo;{a.text}&rdquo; {`Complete Works vol ${a.source.volume}, ${a.source.work}.`}
              </p>
            ))}
          </Sec>
        )}

        {(instead.length > 0 || more.length > 0) && (
          <Sec hid="instead-h" heading={x.verdict === 'not-found' ? 'Lines he did say' : 'More in his words'}>
            <div className="qp-cards">
              {[...instead, ...more].slice(0, 3).map((l, i) => (
                <VivCard
                  key={l.id}
                  drawer={vivDrawer(l, 'en')}
                  cardId={l.card ? l.id : undefined}
                  locale="en"
                  pageName={pageName}
                  pageKey={pageKey}
                  position={i + 1}
                  section="instead"
                  shareText={vivShareText(l, 'en', VIV_PATH)}
                />
              ))}
            </div>
          </Sec>
        )}
      </div>

      <DailyBand heading="Keep one line with you">
        <FxNextStep hub="vivekananda" locale="en" pageName={pageName} pageKey={pageKey} placement="end" />
      </DailyBand>

      <Faq items={faq} heading="Questions people ask" />
      <Method heading="Sources and method">
        <p>
          Matched against The Complete Works of Swami Vivekananda, Mayavati Memorial Edition, vols 1 to 8 (9,239 paragraphs, Bengali translations checked separately), with Python
          difflib. In his words: 90 or more out of 100. Paraphrase: 70 to 90. Not in his works: under 70, and no hit in a phrase search of Wikisource across all volumes, including
          vol 9. This line scored {Math.round(x.score)}.
        </p>
      </Method>
      <Related
        heading="Read next"
        links={[
          { href: VIV_PATH, label: 'All 61 checked Vivekananda quotes' },
          { href: vivThemePath(theme), label: VIV_THEME_COPY[theme].h1 },
          ...vivChecks()
            .filter((c) => c.slug !== x.slug && c.verdict !== 'in-his-words')
            .slice(0, 3)
            .map((c) => ({
              href: vivCheckPath(c.slug),
              label: `Did he say "${checkShort(c.shared)}"?`,
            })),
        ]}
      />
    </Shell>
  )
}
