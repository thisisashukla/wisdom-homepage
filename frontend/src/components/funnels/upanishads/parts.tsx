/**
 * The Upanishads funnel's own pieces, built from the site kit: the next step with Upanishad copy,
 * the sources note, Gita bridges by chapter and verse, and one verse of a complete text.
 * Everything else on these pages is the kit used directly (PageHero, Section, VerseCard, Faq, LinkCards).
 */
import type { ReactNode } from 'react'
import { GitaBridge, NextStep, Section, VerseCard } from '@/components/site'
import type { Locale } from '@/lib/locale'
import { gitaHref, padas } from '@/lib/funnels/upanishads'
import './house.css'

const NEXT_COPY = {
  en: {
    app: { line: 'A new line on your Lock Screen each morning, to read before the day starts.', cta: 'Get one line each morning' },
    whatsapp: { line: 'One Upanishad or Gita line each morning, on WhatsApp.', cta: 'Join' },
    email: { line: 'A week of lines for what you are going through, one each morning by email. The first week is free.', cta: 'Send my week' },
  },
  hi: {
    app: { line: 'लॉक स्क्रीन पर रोज़ सुबह एक नया श्लोक।', cta: 'हर सुबह एक श्लोक पाएं' },
    whatsapp: { line: 'हर सुबह उपनिषद या गीता का एक श्लोक, WhatsApp पर।', cta: 'जुड़ें' },
    email: { line: 'हर सुबह एक श्लोक, ईमेल पर। पहला हफ़्ता मुफ़्त।', cta: 'शुरू करें' },
  },
} as const

/** The device-aware next step with Upanishad copy (never promises content the app lacks). */
export function UpNext({ locale, pageKey, placement, heading }: { locale: Locale; pageKey: string; placement: string; heading: string }) {
  return (
    <Section id={`next-${placement}`} tone="band" title={heading} width="narrow" track={`next_${placement}`}>
      <NextStep locale={locale} pageKey={pageKey} placement={placement} copy={NEXT_COPY[locale]} />
    </Section>
  )
}

/** Sources and method: a quiet closing section. */
export function SourcesNote({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <Section id="sources" title={heading} headingLevel={3} spacing="tight" width="narrow" className="up-sources">
      <div className="up-small">{children}</div>
    </Section>
  )
}

/** A link back to a Gita verse by chapter and verse. */
export function Bridge({ c, v, note, locale = 'en', from }: { c: number; v: number; note?: string; locale?: Locale; from?: string }) {
  const label = locale === 'hi' ? `भगवद गीता ${c}.${v}` : `Bhagavad Gita ${c}.${v}`
  return <GitaBridge href={gitaHref(c, v, locale)} label={label} why={note || undefined} location={`gita_bridge_${c}_${v}`} from={from} locale={locale} />
}

/** Several bridges in a column. */
export function Bridges({ children }: { children: ReactNode }) {
  return (
    <div className="up-bridges" data-stagger="60">
      {children}
    </div>
  )
}

export type VerseView = { ref: string; anchor: string; sa: string; iast: string; en: string; who: string | null }

/** One verse of a complete text: its ref (an anchor link) and speaker as the label, then the kit verse order. */
export function TextVerse({ v, label, note, as = 'div' }: { v: VerseView; label: string; note?: ReactNode; as?: 'div' | 'li' }) {
  return (
    <VerseCard
      as={as}
      id={v.anchor}
      align="left"
      size="compact"
      original={padas(v.sa)}
      iast={padas(v.iast)}
      meaning={v.en}
      label={
        <>
          <a href={`#${v.anchor}`} aria-label={`${label} ${v.ref}`}>
            {v.ref}
          </a>
          {v.who && <span className="up-who">{v.who}</span>}
        </>
      }
    >
      {note && <div className="up-note">{note}</div>}
    </VerseCard>
  )
}
