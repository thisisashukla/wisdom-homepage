import type { Metadata } from 'next'
import { getAllChapters, getChapter } from '@/lib/gita'
import { abs } from '@/lib/seo'
import ChapterReader from '@/components/reader/ChapterReader'
import { readModeUrl } from '@/lib/gitaUrls'

// Chapter read mode: every verse of a chapter on one page, with play-all.
// noindex: the per-verse pages and the chapter page stay the search targets.

type Params = { chapter: string }

export const dynamicParams = false

export function generateStaticParams() {
  return getAllChapters().map((ch) => ({ chapter: String(ch.number) }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const ch = getChapter(Number(params.chapter))
  if (!ch) return { title: 'Chapter not found', robots: { index: false, follow: true } }
  const title = `Read Bhagavad Gita Chapter ${ch.number} in one sitting: ${ch.enName}`
  const description = `All ${ch.totalVerses} verses of Bhagavad Gita Chapter ${ch.number} (${ch.enName}) on one page, in Sanskrit with English meaning. Read straight through or listen as each verse is recited.`
  return {
    title,
    description,
    alternates: { canonical: abs(readModeUrl(ch.number, 'en')) },
    robots: { index: false, follow: true },
    openGraph: { title, description, url: abs(readModeUrl(ch.number, 'en')), siteName: 'Wisdom', locale: 'en_IN', type: 'article' },
  }
}

export default function ChapterReadPage({ params }: { params: Params }) {
  return <ChapterReader chapter={Number(params.chapter)} lang="en" />
}
