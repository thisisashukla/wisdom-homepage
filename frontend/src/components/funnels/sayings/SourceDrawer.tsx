'use client'

/**
 * The Vivekananda hub's signature: tap a card's source chip and the surrounding
 * Complete Works paragraph slides up, with volume, work, a link to the text, and
 * a stamp (In his words / Paraphrase / Not in his works).
 */

import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '@/components/quotes/Icons'
import { VERDICT_LABEL, type DrawerData, type Locale } from '@/lib/funnels/sayings/shared'
import '@/components/quotes/card.css'
import './sayings.css'

const T = {
  en: {
    title: 'Where he said it',
    vol: (n: number) => `Complete Works, volume ${n}`,
    open: 'Read the full text',
    translated: 'Spoken or written in Bengali; this is the English translation printed in the Complete Works.',
    close: 'Close',
    dash: 'The highlighted line is the one on the card. Dashes in the printed text are shown as commas.',
  },
  hi: {
    title: 'उन्होंने यह कहाँ कहा',
    vol: (n: number) => `कम्प्लीट वर्क्स, खंड ${n}`,
    open: 'पूरा पाठ पढ़ें',
    translated: 'यह मूल रूप से बांग्ला में था; यहाँ कम्प्लीट वर्क्स में छपा अंग्रेज़ी अनुवाद है।',
    close: 'बंद करें',
    dash: 'हाइलाइट की गई पंक्ति वही है जो कार्ड पर है।',
  },
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function Highlight({ paragraph, line }: { paragraph: string; line: string }) {
  const i = paragraph.toLowerCase().indexOf(line.toLowerCase())
  if (i < 0) return <>{paragraph}</>
  return (
    <>
      {paragraph.slice(0, i)}
      <mark>{paragraph.slice(i, i + line.length)}</mark>
      {paragraph.slice(i + line.length)}
    </>
  )
}

export default function SourceDrawer({ data, locale, onClose }: { data: DrawerData; locale: Locale; onClose: () => void }) {
  const t = T[locale]
  const ref = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab' || !ref.current) return
      const items = Array.from(ref.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      try {
        prev?.focus({ preventScroll: true })
      } catch {
        // gone
      }
    }
  }, [])

  const titleId = `fxd-${data.quoteId}`
  return createPortal(
    <div className="qsheet-wrap fxd-wrap" data-hub="vivekananda" lang={locale}>
      <div className="qsheet-backdrop" onClick={onClose} aria-hidden="true" />
      <div ref={ref} className="qsheet fxd" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <button ref={closeRef} type="button" className="qsheet-x" aria-label={t.close} onClick={onClose}>
          <Icon name="close" />
        </button>
        <p className="fxd-top">
          <span className="fx-stamp" data-verdict={data.verdict}>
            {VERDICT_LABEL[data.verdict][locale]}
          </span>
        </p>
        <h2 id={titleId} className="fxd-title">
          {t.title}
        </h2>
        <p className="fxd-meta">
          {t.vol(data.volume)}
          <br />
          <span lang="en">{data.work}</span>, {data.kind}
        </p>
        <blockquote className="fxd-para" lang="en">
          <Highlight paragraph={data.paragraph} line={data.line.replace(/\.$/, '')} />
        </blockquote>
        {data.translated && <p className="fxd-note">{t.translated}</p>}
        <p className="fxd-note">{t.dash}</p>
        <a className="qns-btn" href={data.url} target="_blank" rel="noopener" data-mp-location="source_drawer">
          {t.open}
        </a>
      </div>
    </div>,
    document.body,
  )
}
