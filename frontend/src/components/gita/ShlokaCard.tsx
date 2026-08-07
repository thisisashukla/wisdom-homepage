import React from 'react'
import SanskritText from './SanskritText'
import VerseAudioPlayer from './VerseAudioPlayer'
import { getVerseAudio, verseUrl } from '@/lib/gita'

export interface ShlokaCardProps {
  /** Verse reference, e.g. "Bhagavad Gita 7.3". When it contains "X.Y" and the
   *  verse has a full page, a "Read full verse + audio →" link is auto-appended
   *  unless `showReadMore={false}`. */
  verseRef: string
  /** Speaker of the verse, e.g. "Krishna" */
  speaker?: string
  /** Sanskrit text — automatically split into two lines at ।  */
  sanskrit: string
  /** IAST transliteration — automatically split at | */
  iast?: string
  /** Translation / meaning text */
  meaning?: string
  /** Label for the meaning column (default: "Meaning") */
  meaningLabel?: string
  /** Commentary / insight text */
  insight?: string
  /** Label for the insight column */
  insightLabel?: string
  /** One-line quoted essence of the verse */
  essence?: string
  /** Locale for the auto-generated "Read full verse" link. Default 'en'. */
  locale?: 'en' | 'hi'
  /** Override the "read full verse" href. If omitted, derived from verseRef. */
  readMoreHref?: string
  /** Set false to suppress the auto "Read full verse + audio →" link. */
  showReadMore?: boolean
  /** Optional Mixpanel location tag for the read-more link. */
  mpLocation?: string
}

/**
 * Split IAST transliteration at | (single pipe) followed by whitespace.
 */
function formatIast(text: string): React.ReactNode {
  const parts = text.split(/(?<=\|)\s+/)
  if (parts.length <= 1) return text
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {i > 0 && <br />}
      {part}
    </React.Fragment>
  ))
}

export default function ShlokaCard({
  verseRef,
  speaker,
  sanskrit,
  iast,
  meaning,
  meaningLabel = 'Meaning',
  insight,
  insightLabel = 'What this verse is doing',
  essence,
  locale = 'en',
  readMoreHref,
  showReadMore = true,
  mpLocation,
}: ShlokaCardProps) {
  // Parse "Bhagavad Gita X.Y" → chapter, verse for audio lookup and deep-link
  const refMatch = verseRef.match(/(\d+)\.(\d+)/)
  const ch = refMatch ? Number(refMatch[1]) : undefined
  const vs = refMatch ? Number(refMatch[2]) : undefined
  const audio = ch && vs ? getVerseAudio(ch, vs) : null

  // ── Auto-derived deep-link to the full verse page. Blogs use ShlokaCard as
  //    a quotation block; without a hand-off users end there. The "Read full
  //    verse + audio →" pattern below funnels blog readers into the Gita hub. ──
  const derivedHref = ch && vs ? verseUrl(ch, vs, locale) : undefined
  const linkHref = readMoreHref ?? derivedHref
  const linkLabel = locale === 'hi'
    ? (audio ? 'पूरा श्लोक + ऑडियो पढ़ें →' : 'पूरा श्लोक और अर्थ पढ़ें →')
    : (audio ? 'Read full verse + audio →' : 'Read full verse & commentary →')
  const linkMp = mpLocation ?? (ch && vs ? `shloka_card_read_more_${ch}_${vs}` : undefined)

  return (
    <div className="shloka-card">
      <div className="shloka-header">
        <span className="shloka-ref">{verseRef}</span>
        {speaker && <span className="shloka-speaker">Speaker: {speaker}</span>}
      </div>

      {audio ? (
        <VerseAudioPlayer audioSrc={audio.audio} timestamps={audio.timestamps} text={sanskrit} chapter={ch} verse={vs} />
      ) : (
        <SanskritText text={sanskrit} className="shloka-sanskrit" />
      )}

      {iast && (
        <div className="shloka-iast">
          {formatIast(iast)}
        </div>
      )}

      {(meaning || insight) && (
        <div className="shloka-body">
          {meaning && (
            <div>
              <div className="shloka-col-label">{meaningLabel}</div>
              <div className="shloka-meaning">{meaning}</div>
            </div>
          )}
          {insight && (
            <div>
              <div className="shloka-col-label">{insightLabel}</div>
              <div className="shloka-insight">{insight}</div>
            </div>
          )}
        </div>
      )}

      {essence && (
        <div className="shloka-essence">&ldquo;{essence}&rdquo;</div>
      )}

      {showReadMore && linkHref && (
        <a
          href={linkHref}
          className="shloka-read-more"
          data-mp-location={linkMp}
          data-mp-event="Shloka Card Read More Clicked"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '18px',
            padding: '10px 16px',
            background: 'rgba(200,136,30,0.10)',
            border: '1px solid rgba(200,136,30,0.35)',
            borderRadius: '8px',
            fontSize: '13.5px',
            fontWeight: 600,
            letterSpacing: '0.01em',
            color: 'var(--gold-light, #f5c96a)',
            textDecoration: 'none',
            transition: 'background 0.15s, transform 0.15s',
          }}
        >
          {linkLabel}
        </a>
      )}
    </div>
  )
}
