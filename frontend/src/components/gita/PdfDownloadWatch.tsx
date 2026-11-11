'use client'

/**
 * Wraps a block of links and, once the reader clicks one that downloads the PDF, shows the
 * WhatsApp daily-shlok card under it (trigger "after-download").
 */

import { useState, type MouseEvent, type ReactNode } from 'react'
import WhatsAppDaily from '@/components/daily/WhatsAppDailyLazy'
import type { Locale } from '@/lib/locale'

type Props = {
  /** Path of the PDF, e.g. "/downloads/bhagavad-gita-700-shlok-hindi.pdf". */
  href: string
  lang: Locale
  /** Analytics location of the card. Default "pdf". */
  location?: string
  children: ReactNode
}

export default function PdfDownloadWatch({ href, lang, location = 'pdf', children }: Props) {
  const [downloaded, setDownloaded] = useState(false)

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    if (downloaded) return
    const a = (e.target as HTMLElement).closest('a')
    if (a && a.getAttribute('href') === href) setDownloaded(true)
  }

  return (
    <div onClickCapture={onClick}>
      {children}
      {downloaded && <WhatsAppDaily lang={lang} location={location} trigger="after-download" />}
    </div>
  )
}
