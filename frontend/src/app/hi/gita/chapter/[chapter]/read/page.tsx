import type { Metadata } from 'next'
import { getAllChapters, getChapter } from '@/lib/gita'
import { abs } from '@/lib/seo'
import ChapterReader from '@/components/reader/ChapterReader'
import { readModeUrl } from '@/lib/gitaUrls'

// अध्याय पाठ मोड: एक अध्याय के सभी श्लोक एक पृष्ठ पर, पूरा पाठ सुनने के साथ।
// noindex: खोज के लिए हर श्लोक का पृष्ठ और अध्याय पृष्ठ ही लक्ष्य रहते हैं।

type Params = { chapter: string }

export const dynamicParams = false

export function generateStaticParams() {
  return getAllChapters().map((ch) => ({ chapter: String(ch.number) }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const ch = getChapter(Number(params.chapter))
  if (!ch) return { title: 'अध्याय नहीं मिला', robots: { index: false, follow: true } }
  const title = `भगवद् गीता अध्याय ${ch.number} एक साथ पढ़ें: ${ch.hiName}`
  const description = `भगवद् गीता अध्याय ${ch.number} (${ch.hiName}) के सभी ${ch.totalVerses} श्लोक एक ही पृष्ठ पर, संस्कृत और हिंदी अर्थ के साथ। शुरू से अंत तक पढ़ें या हर श्लोक का पाठ सुनें।`
  return {
    title,
    description,
    alternates: { canonical: abs(readModeUrl(ch.number, 'hi')) },
    robots: { index: false, follow: true },
    openGraph: { title, description, url: abs(readModeUrl(ch.number, 'hi')), siteName: 'Wisdom', locale: 'hi_IN', type: 'article' },
  }
}

export default function HindiChapterReadPage({ params }: { params: Params }) {
  return <ChapterReader chapter={Number(params.chapter)} lang="hi" />
}
