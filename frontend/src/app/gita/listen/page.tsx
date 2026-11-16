import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import ListenHub from '@/components/listen/ListenHub'
import { abs } from '@/lib/seo'
import { listenHubUrl } from '@/lib/listen'

const TITLE = 'Bhagavad Gita audio with meaning: every verse, in 10 to 15 minute sessions'
const DESC = 'Listen to all 700 verses of the Bhagavad Gita, recited in Sanskrit with a short narration of what each verse says. Pick a 10 to 15 minute session or listen straight through.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: abs(listenHubUrl('en')), languages: { en: abs(listenHubUrl('en')), hi: abs(listenHubUrl('hi')) } },
  openGraph: { title: TITLE, description: DESC, url: abs(listenHubUrl('en')), siteName: 'Wisdom', type: 'website' },
}

export default function ListenHubPage() {
  return (
    <>
      <BlogTracker pageName="Listen Hub EN" />
      <ListenHub lang="en" />
    </>
  )
}
