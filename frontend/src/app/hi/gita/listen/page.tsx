import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import ListenHub from '@/components/listen/ListenHub'
import { abs } from '@/lib/seo'
import { listenHubUrl } from '@/lib/listen'

const TITLE = 'भगवद् गीता अर्थ सहित सुनें: हर श्लोक, 10 से 15 मिनट के सत्रों में'
const DESC = 'भगवद् गीता के सभी 700 श्लोक संस्कृत पाठ और सरल हिंदी अर्थ के साथ सुनिए। 10 से 15 मिनट का सत्र चुनिए या लगातार सुनते जाइए।'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: abs(listenHubUrl('hi')), languages: { en: abs(listenHubUrl('en')), hi: abs(listenHubUrl('hi')) } },
  openGraph: { title: TITLE, description: DESC, url: abs(listenHubUrl('hi')), siteName: 'Wisdom', type: 'website' },
}

export default function ListenHubPage() {
  return (
    <>
      <BlogTracker pageName="Listen Hub HI" />
      <ListenHub lang="hi" />
    </>
  )
}
