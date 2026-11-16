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
  const s = getListenSession(Number(params.chapter), Number(params.n), 'hi')
  if (!s) return { robots: { index: false, follow: true } }
  const title = `${s.title}: भगवद् गीता ${s.chapter}.${s.from} से ${s.chapter}.${s.to}, अर्थ सहित`
  const description = `भगवद् गीता अध्याय ${s.chapter}, श्लोक ${s.from} से ${s.to} सुनिए: हर श्लोक का संस्कृत पाठ और सरल अर्थ।`
  return {
    title,
    description,
    alternates: { canonical: abs(sessionUrl(s.chapter, s.n, 'hi')) },
    robots: { index: false, follow: true },
    openGraph: { title, description, url: abs(sessionUrl(s.chapter, s.n, 'hi')), siteName: 'Wisdom', type: 'article' },
  }
}

export default function ListenSessionPage({ params }: { params: Params }) {
  const s = getListenSession(Number(params.chapter), Number(params.n), 'hi')
  if (!s) notFound()
  return (
    <>
      <BlogTracker pageName={`listen_hi_${s.id}`} />
      <ListenSession initial={s} lang="hi" />
    </>
  )
}
