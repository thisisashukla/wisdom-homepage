/**
 * Quote page template (server). Renders one QuotePageConfig on the site kit: PageHero (crumbs,
 * eyebrow, H1, promise, moment chips, the script switch), a Section per moment with QuoteCards and
 * the LineForYou hook after the 3rd card, "Lines Krishna never said", the daily line, extra text,
 * Faq, related LinkCards, LineBar, and JSON-LD. Nav and footer come from the route layouts.
 */

import type { Metadata } from 'next'
import {
  absUrl,
  audioMap,
  cardImageUrl,
  CARD_SIZE,
  getFakes,
  getHookFeelings,
  getQuote,
  getQuotes,
  speakerName,
  toView,
  workName,
  type MomentId,
  type Quote,
  type QuotePageConfig,
} from '@/lib/quotes'
import PageHero from '@/components/site/PageHero'
import Section from '@/components/site/Section'
import Faq from '@/components/site/Faq'
import LinkCards from '@/components/site/LinkCards'
import JsonLd from '@/components/site/JsonLd'
import type { Crumb } from '@/components/site/Breadcrumbs'
import QuoteCard from './QuoteCard'
import MomentChips from './MomentChips'
import LineForYou from './LineForYou'
import NextStep from './NextStep'
import LineBar from './LineBar'
import FakeQuotes from './FakeQuotes'
import { MoreBody, hasMore } from './QuoteMore'
import './card.css'
import './quotes.css'

const HOOK_AFTER = 3

const T = {
  en: {
    eyebrow: (n: number, when: string) => `${n} lines, each with its Sanskrit. Updated ${when}.`,
    fakes: 'Lines Krishna never said',
    faq: 'Questions people ask',
    related: 'Read next',
  },
  hi: {
    eyebrow: (n: number, when: string) => `${n} श्लोक, हर एक मूल संस्कृत के साथ। ${when} में अपडेट।`,
    fakes: 'जो बातें कृष्ण ने कभी नहीं कहीं',
    faq: 'लोग अक्सर पूछते हैं',
    related: 'आगे पढ़ें',
  },
}

function monthYear(iso: string, locale: 'en' | 'hi'): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  try {
    return d.toLocaleDateString(locale === 'hi' ? 'hi-IN' : 'en-IN', { month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' })
  } catch {
    return iso.slice(0, 7)
  }
}

type Placed = { quote: Quote; domId: string; position: number }
type SectionView = {
  key: string
  moment: MomentId
  heading: string
  intro?: string
  items: (Placed | 'hook')[]
  hasHook: boolean
  bio: boolean
}

export default function QuotePage({ config }: { config: QuotePageConfig }) {
  const { locale } = config
  const t = T[locale]
  const bioPage = /bio/.test(config.key)

  // ── Sections and positions ──
  const usedIds = new Set<string>()
  const uniqueQuotes: Quote[] = []
  const seenQuote = new Set<string>()
  let position = 0
  const sections: SectionView[] = []
  for (const [si, s] of config.sections.entries()) {
    const qs = getQuotes(s.quoteIds)
    if (!qs.length) continue
    const items: Placed[] = qs.map((q) => {
      position += 1
      let domId = q.id
      let n = 2
      while (usedIds.has(domId)) domId = `${q.id}-${n++}`
      usedIds.add(domId)
      if (!seenQuote.has(q.id)) {
        seenQuote.add(q.id)
        uniqueQuotes.push(q)
      }
      return { quote: q, domId, position }
    })
    sections.push({
      key: `${s.moment}-${si}`,
      moment: s.moment,
      heading: s.heading,
      intro: s.intro,
      items,
      hasHook: false,
      bio: bioPage || s.moment === 'bio',
    })
  }

  // ── Hook: after the 3rd card overall (or the last card when there are fewer) ──
  const feelings = config.hook ? getHookFeelings(config.hook.feelingIds) : []
  const hookQuotes = getQuotes(feelings.map((f) => f.quoteId))
  const showHook = feelings.length > 0 && hookQuotes.length > 0 && position > 0
  if (showHook) {
    const after = Math.min(HOOK_AFTER, position)
    let count = 0
    outer: for (const sec of sections) {
      for (let i = 0; i < sec.items.length; i++) {
        count += 1
        if (count === after) {
          sec.items.splice(i + 1, 0, 'hook')
          sec.hasHook = true
          break outer
        }
      }
    }
  }

  // ── Fakes ──
  const fakes = config.showFakes ? getFakes().filter((f) => getQuote(f.realQuoteId)) : []
  const fakeReal = getQuotes(fakes.map((f) => f.realQuoteId))

  const audio = audioMap([...uniqueQuotes, ...hookQuotes, ...fakeReal])
  const hookAudio = audioMap(hookQuotes)
  // Client props carry one language only (toView): no {en, hi} pairs, no full verse.
  const view = (q: Quote) => toView(q, locale, { path: config.path })
  const hookMap = Object.fromEntries(hookQuotes.map((q) => [q.id, view(q)]))
  const fakeMap = Object.fromEntries(fakeReal.map((q) => [q.id, view(q)]))
  const feelingViews = feelings.map((f) => ({
    id: f.id,
    label: f.label[locale],
    quoteId: f.quoteId,
    lines: f.lines[locale],
    ...(f.startSituation ? { startSituation: f.startSituation } : {}),
  }))

  // Filtering is by section moment. Filter chips only for moments that have a section; link chips always.
  const present = new Set(sections.map((s) => s.moment))
  const chips = config.chips.filter((c) => c.href || present.has(c.moment))

  // ── JSON-LD ── (BreadcrumbList comes from PageHero, FAQPage from Faq)
  const pageUrl = absUrl(config.path)
  // Breadcrumbs: Home is added by the kit (its JSON-LD name stays "Wisdom"). Items without href are
  // skipped, except the last one (this page).
  const crumbs: Crumb[] = config.breadcrumb
    .map((b, i) => ({ ...b, href: b.href ?? (i === config.breadcrumb.length - 1 ? config.path : undefined) }))
    .filter((b): b is { label: string; href: string } => Boolean(b.href))
    .filter((b, i) => !(i === 0 && b.href === '/'))
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: config.h1,
    url: pageUrl,
    numberOfItems: uniqueQuotes.length,
    // Kept lean on purpose: everything here ships twice (HTML and RSC payload).
    itemListElement: uniqueQuotes.map((q, i) => {
      const who = speakerName(q)
      return {
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Quotation',
          url: `${pageUrl}#${q.id}`,
          text: q.meaning[locale],
          inLanguage: locale,
          ...(who ? { spokenByCharacter: { '@type': 'Person', name: who } } : {}),
          isPartOf: { '@type': 'Book', name: workName(q) },
          image: absUrl(cardImageUrl(q.id, { format: 'post', lang: locale, v: q.cardV })),
        },
      }
    }),
  }

  const sectionIds = new Set<string>()
  const sectionId = (m: MomentId) => {
    let id = `m-${m}`
    let n = 2
    while (sectionIds.has(id)) id = `m-${m}-${n++}`
    sectionIds.add(id)
    return id
  }

  const renderCard = (p: Placed, sec: SectionView) => (
    <div key={p.domId} className="qp-item" data-moment={sec.moment}>
      <QuoteCard
        quote={view(p.quote)}
        locale={locale}
        pageKey={config.key}
        moment={sec.moment}
        position={p.position}
        audioSrc={audio[p.quote.id] ?? null}
        domId={p.domId === p.quote.id ? undefined : p.domId}
        bio={sec.bio}
      >
        {hasMore(p.quote, locale) ? <MoreBody quote={p.quote} locale={locale} /> : null}
      </QuoteCard>
    </div>
  )

  // Sections alternate grounds; the ones after the moment sections continue the rhythm.
  let band = false
  const tone = () => {
    band = !band
    return band ? ('band' as const) : ('default' as const)
  }

  return (
    <main className="qp-page" lang={locale} data-qp-root="" data-page={config.key}>
      <JsonLd data={itemList} />

      <PageHero
        locale={locale}
        crumbs={crumbs}
        eyebrow={t.eyebrow(uniqueQuotes.length, monthYear(config.updated, locale))}
        title={config.h1}
        sub={config.promise}
        scriptToggle
        lang={locale}
        below={<MomentChips chips={chips} locale={locale} />}
      />

      {sections.map((sec) => (
        <Section
          key={sec.key}
          id={sectionId(sec.moment)}
          title={sec.heading}
          intro={sec.intro}
          tone={tone()}
          width="narrow"
          spacing="tight"
          className={`qp-moment qp-m-${sec.moment}${sec.hasHook ? ' qp-has-hook' : ''}`}
        >
          <div className="qp-cards">
            {sec.items.map((it) =>
              it === 'hook' ? (
                <div key="hook" className="qp-hook-slot">
                  <LineForYou
                    feelings={feelingViews}
                    quotes={hookMap}
                    question={config.hook.question}
                    preset={config.hook.preset}
                    locale={locale}
                    pageKey={config.key}
                    audio={hookAudio}
                  />
                </div>
              ) : (
                renderCard(it, sec)
              ),
            )}
          </div>
        </Section>
      ))}

      {fakes.length > 0 && (
        <FakeQuotes
          fakes={fakes}
          quotes={fakeMap}
          locale={locale}
          heading={config.fakesHeading ?? t.fakes}
          pageKey={config.key}
          audio={audio}
          usedIds={usedIds}
          tone={tone()}
        />
      )}

      <Section id="daily" title={config.dailyLine.heading} intro={config.dailyLine.sub} tone={tone()} width="narrow">
        <NextStep locale={locale} pageKey={config.key} placement="daily" />
      </Section>

      {config.extraSections?.map((x, i) => (
        <Section key={i} id={`x-${i}`} title={x.heading} tone={tone()} width="narrow">
          <div className="sx-prose">
            {x.paragraphs.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          </div>
        </Section>
      ))}

      {config.faq.length > 0 && (
        <Section id="faq" title={t.faq} tone={tone()} width="narrow">
          <Faq items={config.faq} locale={locale} />
        </Section>
      )}

      {config.related.length > 0 && (
        <Section id="related" title={t.related} tone={tone()} width="narrow">
          <LinkCards items={config.related.map((r) => ({ href: r.href, title: r.label }))} />
        </Section>
      )}

      {showHook && <LineBar locale={locale} />}
    </main>
  )
}

/** PageTracker name for a quote page (the template, " HI" on Hindi twins). */
export const quotePageName = (config: Pick<QuotePageConfig, 'locale'>): string => (config.locale === 'hi' ? 'Quote Page HI' : 'Quote Page')

/** Next Metadata for a quote page: title, description, canonical, hreflang twins, card OG image. */
export function quotePageMetadata(config: QuotePageConfig): Metadata {
  const url = absUrl(config.path)
  const first = config.sections.flatMap((s) => s.quoteIds).map((id) => getQuote(id)).find(Boolean) ?? null
  const img = first
    ? { url: absUrl(cardImageUrl(first.id, { format: 'post', lang: config.locale, v: first.cardV })), ...CARD_SIZE.post, alt: first.meaning[config.locale] }
    : { url: absUrl('/og-image.webp'), width: 1200, height: 630, alt: config.h1 }

  let languages: Record<string, string> | undefined
  if (config.alternatePath) {
    const en = config.locale === 'en' ? config.path : config.alternatePath
    const hi = config.locale === 'hi' ? config.path : config.alternatePath
    languages = { 'en-IN': absUrl(en), 'hi-IN': absUrl(hi), 'x-default': absUrl(en) }
  }

  return {
    title: { absolute: config.title },
    description: config.description,
    alternates: { canonical: url, ...(languages ? { languages } : {}) },
    openGraph: {
      title: config.title,
      description: config.description,
      url,
      type: 'article',
      siteName: 'Wisdom',
      locale: config.locale === 'hi' ? 'hi_IN' : 'en_IN',
      modifiedTime: config.updated,
      images: [img],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@sansearchapp',
      title: config.title,
      description: config.description,
      images: [img.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  }
}
