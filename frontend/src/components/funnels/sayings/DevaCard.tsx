'use client'

/**
 * A Devanagari card for Kabir's dohe and Chanakya's verses. Both scripts are in the
 * HTML; the page's script toggle shows one (Devanagari by default, also without JS).
 * Kabir's signature: glossed words are buttons; tap one for its meaning.
 * Chanakya's cards carry a chapter.verse seal.
 */

import { useState, type ReactNode } from 'react'
import { fxTrack, type Hub, type Locale } from '@/lib/funnels/sayings/shared'
import { Icon } from '@/components/quotes/Icons'
import CardActions from './CardActions'
import '@/components/quotes/card.css'
import './sayings.css'

export type Gloss = { w: string; hi: string; en: string }

export type DevaCardProps = {
  id: string
  /** DOM id when the same verse appears twice on a page. */
  domId?: string
  hub: Hub
  lines: string[]
  roman: string[]
  lang: 'hi' | 'sa'
  meaning: string
  /** Second meaning shown smaller (e.g. English under Hindi on doha pages). */
  meaning2?: { text: string; lang: Locale }
  seal?: string
  sealLabel?: string
  gloss?: Gloss[]
  chip?: ReactNode
  href?: string
  hrefLabel?: string
  cardId?: string
  locale: Locale
  pageName: string
  pageKey: string
  position?: number
  section?: string
  shareText: string
  fileStem: string
  variant?: 'list' | 'hero'
  /** House scroll entrance (.rv). Off inside the situation picker, which has its own reveal. */
  reveal?: boolean
}

const T = {
  en: {
    wordHint: 'Tap an underlined word for its meaning',
    close: 'Close meaning',
  },
  hi: {
    wordHint: 'रेखांकित शब्द पर टैप करें, अर्थ दिखेगा',
    close: 'अर्थ बंद करें',
  },
}

function GlossLine({ line, gloss, onTap, openWord, cardId }: { line: string; gloss: Gloss[]; onTap: (g: Gloss) => void; openWord: string | null; cardId: string }) {
  // Keep a danda with the word before it, so it never wraps alone.
  line = line.replace(/\s+([।॥])/gu, '\u00a0$1')
  if (!gloss.length) return <>{line}</>
  // Split on spaces, keep punctuation attached; a token is glossed when it starts with a glossed word.
  const tokens = line.split(/([ \t\n]+)/)
  return (
    <>
      {tokens.map((tok, i) => {
        if (/^\s+$/.test(tok) || !tok) return tok
        const core = tok.replace(/[\u00a0।॥,;:?!.]+$/u, '')
        const tail = tok.slice(core.length)
        const g = gloss.find((x) => x.w === core)
        if (!g) return <span key={i}>{tok}</span>
        const on = openWord === g.w
        return (
          <span key={i}>
            <button type="button" className="fx-word" aria-expanded={on} aria-controls={`${cardId}-gloss`} onClick={() => onTap(g)}>
              {core}
            </button>
            {tail}
          </span>
        )
      })}
    </>
  )
}

export default function DevaCard(p: DevaCardProps) {
  const t = T[p.locale]
  const [word, setWord] = useState<Gloss | null>(null)
  const gloss = p.gloss ?? []
  const onTap = (g: Gloss) => {
    if (word?.w === g.w) {
      setWord(null)
      return
    }
    setWord(g)
    fxTrack('Word Meaning Tapped', { page: p.pageKey, locale: p.locale, hub: p.hub }, { doha: p.id, word: g.w })
  }
  return (
    <article id={p.domId ?? p.id} className={`qc fx-card fx-deva-card fx-${p.variant ?? 'list'}${p.reveal === false ? '' : ' rv'}`} data-section={p.section}>
      {p.seal && (
        <p className="fx-seal" aria-label={p.sealLabel}>
          <span aria-hidden="true">{p.seal}</span>
        </p>
      )}
      <p className="fx-deva fx-script-deva" lang={p.lang}>
        {p.lines.map((l, i) => (
          <span key={i} className="fx-pada">
            <GlossLine line={l} gloss={gloss} onTap={onTap} openWord={word?.w ?? null} cardId={p.domId ?? p.id} />
          </span>
        ))}
      </p>
      <p className="fx-roman fx-script-roman" lang={p.lang === 'sa' ? 'sa-Latn' : 'hi-Latn'}>
        {p.roman.map((l, i) => (
          <span key={i} className="fx-pada">
            {l}
          </span>
        ))}
      </p>
      {gloss.length > 0 && p.variant === 'hero' && <p className="fx-word-hint fx-script-deva">{t.wordHint}</p>}
      <div id={`${p.domId ?? p.id}-gloss`} className="fx-gloss" aria-live="polite">
        {word && (
          <p className="fx-gloss-pop">
            <strong lang="hi">{word.w}</strong>
            <span lang={p.locale}>{p.locale === 'hi' ? word.hi : word.en}</span>
            {p.locale === 'hi' && (
              <span lang="en" className="fx-gloss-en">
                {word.en}
              </span>
            )}
            <button type="button" className="fx-gloss-x" aria-label={t.close} onClick={() => setWord(null)}>
              <Icon name="close" />
            </button>
          </p>
        )}
      </div>
      <p className="fx-meaning" lang={p.locale}>
        {p.meaning}
      </p>
      {p.meaning2 && (
        <p className="fx-meaning2" lang={p.meaning2.lang}>
          {p.meaning2.text}
        </p>
      )}
      {(p.chip || p.href) && (
        <p className="fx-deva-source">
          {p.chip}
          {p.href && (
            <a className="fx-link" href={p.href} data-mp-location="card_detail">
              {p.hrefLabel}
            </a>
          )}
        </p>
      )}
      <CardActions
        quoteId={p.id}
        domId={p.domId}
        cardId={p.cardId}
        fileStem={p.fileStem}
        text={p.shareText}
        hub={p.hub}
        locale={p.locale}
        pageName={p.pageName}
        pageKey={p.pageKey}
        position={p.position}
        section={p.section}
      />
    </article>
  )
}
