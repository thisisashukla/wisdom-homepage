'use client'

/**
 * The share bar on every sayings card: the kit ShareActions (Copy, WhatsApp, Save image, Share).
 * The first copy, share or save of the session opens the hub's own sheet (FxSheet, with the hub's
 * next step) instead of the kit's Gita sheet. ShareActions has no hook for that yet
 * (KIT_REQUEST: ShareActions `sheet` render prop), so this listens for the same taps.
 */

import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { ShareActions } from '@/components/site'
import { claimFirstAction, hideToast, type SheetAction } from '@/components/quotes/session'
import { cardImageUrl } from '@/lib/quotes-shared'
import type { Hub, Locale } from '@/lib/funnels/sayings/shared'

const FxSheet = dynamic(() => import('./FxSheet'), { ssr: false })

export type SayingsShareProps = {
  id: string
  type: 'quote' | 'doha' | 'verse'
  hub: Hub
  locale: Locale
  /** Full text for Copy and WhatsApp (line, meaning, source, link). */
  text: string
  /** Share card id in cards.json, when this line has one. */
  cardId?: string
  fileStem: string
  pageKey: string
  position?: number
  section?: string
}

export default function SayingsShare({ id, type, hub, locale, text, cardId, fileStem, pageKey, position, section }: SayingsShareProps) {
  const [sheet, setSheet] = useState<SheetAction | null>(null)
  const root = useRef<HTMLDivElement>(null)

  const open = (action: SheetAction) => {
    if (!claimFirstAction()) return
    hideToast()
    setSheet(action)
  }

  const onClickCapture = (e: React.MouseEvent) => {
    const el = (e.target as HTMLElement).closest('button, a')
    if (!el || !root.current?.contains(el)) return
    if (el.classList.contains('qc-copy')) {
      // Open only once the copy has gone through (the button shows its tick).
      window.setTimeout(() => {
        if (el.hasAttribute('data-done')) open('copied')
      }, 350)
    } else if (el.tagName === 'A' && (el.getAttribute('href') ?? '').startsWith('https://wa.me/')) open('shared')
    else if (el.closest('.qc-menu')) window.setTimeout(() => open('saved'), 600)
  }

  return (
    <div ref={root} onClickCapture={onClickCapture}>
      <ShareActions
        item={{ id, type }}
        locale={locale}
        copyText={text}
        shareText={text}
        nextStep={false}
        pageKey={pageKey}
        props={{ position: position ?? null, moment: section ?? null }}
        image={
          cardId
            ? {
                url: (format) => cardImageUrl(cardId, { format, lang: locale, download: true }),
                fileName: (format) => `${fileStem}-${format}.png`,
              }
            : undefined
        }
      />
      {sheet && <FxSheet action={sheet} hub={hub} locale={locale} pageKey={pageKey} onClose={() => setSheet(null)} />}
    </div>
  )
}
