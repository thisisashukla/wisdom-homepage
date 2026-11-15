'use client'

/**
 * The share bar on a Gita verse page: the kit's ShareActions with the WhatsApp Status image first
 * (featured="status"), then Copy, WhatsApp, Save image (Post 4:5 / Status 9:16) and Share.
 * A client adapter only because the image URL builders are functions; everything else is the kit.
 * Events: the kit's (Quote Copied / Shared / Image Saved ...) with item_id "bg-2-47", item_type 'verse'.
 */

import ShareActions from '@/components/site/ShareActions'
import { cardImageUrl } from '@/lib/quotes-shared'
import { verseItemId, verseUrl } from '@/lib/gitaUrls'
import type { Locale } from '@/lib/locale'

export type VerseShareBarProps = {
  chapter: number
  verse: number
  lang: Locale
  /** The line people pass on: the translation in the page language (or its one-line essence). */
  line: string
  /** Analytics location of the bar. Default "verse_page". */
  location?: string
  /** 'compact' for the verse page, where sharing sits below the explanation. */
  size?: 'default' | 'compact'
}

export default function VerseShareBar({ chapter, verse, lang, line, location = 'verse_page', size }: VerseShareBarProps) {
  const id = verseItemId(chapter, verse)
  const title = lang === 'hi' ? `भगवद् गीता ${chapter}.${verse}` : `Bhagavad Gita ${chapter}.${verse}`
  const link = `https://wisdomquotes.in${verseUrl(chapter, verse, lang)}`
  const text = line.replace(/\s+/g, ' ').trim()
  const copy = `${text ? `"${text}"\n` : ''}${title}\n${link}`
  return (
    <ShareActions
      item={{ id, type: 'verse' }}
      locale={lang}
      featured="status"
      size={size}
      copyText={copy}
      shareText={copy.replace(link, `${link}?utm_source=whatsapp`)}
      image={{
        url: (format) => cardImageUrl(id, { format, lang, download: true }),
        fileName: (format) => `bhagavad-gita-${chapter}-${verse}-${format}.png`,
      }}
      audioSrc={null}
      pageKey={`gita-verse-${lang}`}
      props={{ location }}
    />
  )
}
