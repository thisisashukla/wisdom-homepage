/**
 * Sayings lines as kit VerseCards (server). Kabir's dohe and Chanakya's verses are Devanagari with a
 * Roman reading; Vivekananda's lines are English, so the line sits in the meaning slot (KIT_REQUEST:
 * VerseCard lang 'en' for a Latin original). The share bar is SayingsShare (kit ShareActions);
 * Kabir's word taps (WordGloss) and Vivekananda's source drawer (SourceChip) are the funnel's own.
 */

import type { ReactNode } from 'react'
import { VerseCard, type VerseCardProps } from '@/components/site'
import type { DrawerData, Hub, Locale } from '@/lib/funnels/sayings/shared'
import SayingsShare from './SayingsShare'
import SourceChip from './SourceChip'
import WordGloss, { type Gloss } from './WordGloss'
import './sayings.css'

type Common = {
  locale: Locale
  pageKey: string
  position?: number
  section?: string
  shareText: string
  cardId?: string
  domId?: string
  /** 'li' inside a VerseList. */
  as?: 'li' | 'article'
}

export type DevaVerseProps = Common & {
  id: string
  hub: Hub
  lines: string[]
  roman: string[]
  lang: 'hi' | 'sa'
  meaning: string
  /** Second meaning shown smaller (English under Hindi on doha pages). */
  meaning2?: { text: string; lang: Locale }
  /** Chanakya: chapter.verse in Devanagari digits, as the card label. */
  seal?: string
  sealLabel?: string
  gloss?: Gloss[]
  source?: ReactNode
  href?: string
  hrefLabel?: string
  fileStem: string
  /** Site scroll entrance (.rv). Off inside the situation picker, which has its own reveal. */
  reveal?: boolean
}

/** VerseCard props for a doha or a Chanakya verse (also used as a PageHero verse). */
export function devaVerseProps(p: DevaVerseProps): Omit<VerseCardProps, 'size' | 'reveal' | 'locale'> {
  const dom = p.domId ?? p.id
  const extra =
    p.meaning2 || p.gloss?.length || p.href ? (
      <>
        {p.meaning2 && (
          <p className="fx-meaning2" lang={p.meaning2.lang}>
            {p.meaning2.text}
          </p>
        )}
        {p.gloss && p.gloss.length > 0 && <WordGloss id={dom} gloss={p.gloss} locale={p.locale} />}
        {p.href && (
          <p className="fx-card-link">
            <a className="sx-link" href={p.href} data-mp-location="card_detail">
              {p.hrefLabel}
            </a>
          </p>
        )}
      </>
    ) : undefined
  return {
    id: dom,
    as: p.as ?? 'article',
    align: 'left',
    lang: p.lang,
    original: p.lines,
    iast: p.roman,
    meaning: p.meaning,
    source: p.source,
    label: p.seal ? (
      <span className="fx-seal" aria-label={p.sealLabel}>
        <span aria-hidden="true">{p.seal}</span>
      </span>
    ) : undefined,
    rv: p.reveal !== false,
    className: 'fx-card',
    children: extra,
    actions: (
      <SayingsShare
        id={p.id}
        type={p.hub === 'kabir' ? 'doha' : 'verse'}
        hub={p.hub}
        locale={p.locale}
        text={p.shareText}
        cardId={p.cardId}
        fileStem={p.fileStem}
        pageKey={p.pageKey}
        position={p.position}
        section={p.section}
      />
    ),
  }
}

export function DevaVerse(p: DevaVerseProps) {
  return <VerseCard {...devaVerseProps(p)} locale={p.locale} />
}

export type VivVerseProps = Common & {
  drawer: DrawerData
  /** Hindi meaning on Hindi pages. */
  meaning?: string
  meaningLang?: Locale
  /** Fact-check page for this line, when there is one. */
  checkHref?: string
}

/** One verified Vivekananda line: the line, our Hindi meaning on Hindi pages, the source chip, the share bar. */
export function VivVerse({ drawer, meaning, meaningLang, cardId, locale, pageKey, position, section, shareText, checkHref, domId, as = 'article' }: VivVerseProps) {
  return (
    <VerseCard
      as={as}
      id={domId ?? drawer.quoteId}
      align="left"
      className="fx-card fx-viv-card"
      rv
      locale={locale}
      original=""
      meaning={<span lang="en">&ldquo;{drawer.line}&rdquo;</span>}
      actions={
        <SayingsShare
          id={drawer.quoteId}
          type="quote"
          hub="vivekananda"
          locale={locale}
          text={shareText}
          cardId={cardId}
          fileStem={`vivekananda-quote-${drawer.quoteId.replace(/^viv-/, '')}`}
          pageKey={pageKey}
          position={position}
          section={section}
        />
      }
    >
      {meaning && (
        <p className="fx-viv-meaning" lang={meaningLang ?? locale}>
          {meaning}
        </p>
      )}
      <SourceChip drawer={drawer} locale={locale} checkHref={checkHref} />
    </VerseCard>
  )
}
