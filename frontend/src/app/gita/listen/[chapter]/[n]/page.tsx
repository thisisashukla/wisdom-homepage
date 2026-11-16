import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogTracker from '@/components/BlogTracker'
import ListenSession from '@/components/listen/ListenSession'
import { abs } from '@/lib/seo'
import { getListenSession, getListenSessions } from '@/lib/listenServer'
import { sessionUrl } from '@/lib/listen'

// One Listen mode session. noindex, follow: the verse pages stay the search targets.

type Params = { chapter: string; n: string }

export const dynamicParams = false

export function generateStaticParams() {
  return getListenSessions().map((s) => ({ chapter: String(s.chapter), n: String(s.n) }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const s = getListenSession(Number(params.chapter), Number(params.n), 'en')
  if (!s) return { robots: { index: false, follow: true } }
  const title = `${s.title}: Bhagavad Gita ${s.chapter}.${s.from} to ${s.chapter}.${s.to}, audio with meaning`
  const description = `Listen to Bhagavad Gita chapter ${s.chapter}, verses ${s.from} to ${s.to}: each verse recited in Sanskrit with a short narration of what it says.`
  return {
    title,
    description,
    alternates: { canonical: abs(sessionUrl(s.chapter, s.n, 'en')) },
    robots: { index: false, follow: true },
    openGraph: { title, description, url: abs(sessionUrl(s.chapter, s.n, 'en')), siteName: 'Wisdom', type: 'article' },
  }
}

export default function ListenSessionPage({ params }: { params: Params }) {
  const s = getListenSession(Number(params.chapter), Number(params.n), 'en')
  if (!s) notFound()
  return (
    <>
      <BlogTracker pageName={`listen_en_${s.id}`} />
      <ListenSession initial={s} lang="en" />
    </>
  )
}
