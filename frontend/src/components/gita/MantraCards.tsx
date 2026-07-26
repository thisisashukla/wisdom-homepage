'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/mixpanel'

interface Variant {
  format: string
  text: string
}

interface Props {
  variants: Variant[]
  chapter: number
  verse: number
  locale?: 'en' | 'hi'
}

const STRINGS = {
  en: { title: 'Carry it with you', copy: '⧉ Copy', copied: '✓ Copied' },
  hi: { title: 'इसे साथ रखें', copy: '⧉ कॉपी करें', copied: '✓ कॉपी हो गया' },
}

/**
 * "Carry it with you" — the verse distilled into pocket mantras, shown right
 * after the takeaway. The "card" variant is featured as a mini quote-card;
 * alternates are copyable pills. Tapping copies with a gold pulse.
 */
export default function MantraCards({ variants, chapter, verse, locale = 'en' }: Props) {
  const [copied, setCopied] = useState<number | null>(null)
  const t = STRINGS[locale]

  const featured = variants.find((v) => v.format === 'card') ?? variants[0]
  const rest = variants.filter((v) => v !== featured)

  const copy = async (text: string, i: number, format: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(i)
      setTimeout(() => setCopied((c) => (c === i ? null : c)), 1800)
      trackEvent('Mantra Copied', {
        chapter,
        verse,
        shloka: `${chapter}.${verse}`,
        format,
        page: window.location.pathname,
      })
    } catch {
      /* clipboard unavailable — ignore */
    }
  }

  return (
    <div className="gv-mantra-strip">
      <div className="gv-mantra-strip-head">
        <span className="gv-mantra-strip-label">{t.title}</span>
      </div>

      <button
        type="button"
        className={`gv-mantra-hero${copied === -1 ? ' copied' : ''}`}
        onClick={() => copy(featured.text, -1, featured.format)}
        aria-label={`Copy: ${featured.text}`}
      >
        <span className="gv-mantra-hero-text">{featured.text}</span>
        <span className="gv-mantra-hero-cta">{copied === -1 ? t.copied : t.copy}</span>
      </button>

      {rest.length > 0 && (
        <div className="gv-mantra-pills">
          {rest.map((v, i) => (
            <button
              key={v.format + i}
              type="button"
              className={`gv-mantra-pill${copied === i ? ' copied' : ''}`}
              onClick={() => copy(v.text, i, v.format)}
              aria-label={`Copy: ${v.text}`}
            >
              {v.text}
              <span className="cp" aria-hidden="true">{copied === i ? '✓' : '⧉'}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
