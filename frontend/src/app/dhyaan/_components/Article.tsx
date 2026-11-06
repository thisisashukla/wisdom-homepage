import Link from 'next/link'
import { BlogTracker } from '@/components/BlogTracker'
import JsonLd from './JsonLd'
import WaitlistForm from './WaitlistForm'
import Cover from './Cover'
import Flame from './Flame'
import Toc, { ReadProgress } from './Toc'
import { words } from './Words'
import { DHYAAN_URL, WISDOM_URL, dabs } from '../_lib/site'
import { type PillarId, articleBySlug, articlesFor, pillarById, PILLARS } from '../_lib/articles'
import { COVERS } from '../_lib/covers'

export type Ref = { text: string; href?: string }

/**
 * Shell for /learn articles, pillar guides and long-form pages (/methods, /gita).
 * Header with rising title and meta, a cover image, then a two-column body: a
 * sticky "On this page" rail with scroll-spy beside the prose. The one-paragraph
 * direct answer sits on top (the part search and assistants quote), references fold
 * away, and related reading shows as cards. Emits Article + BreadcrumbList JSON-LD.
 *
 * `pillar` puts a cluster article under its pillar (breadcrumb, "part of", related).
 * `pillarPage` marks the pillar guide itself and lists its cluster articles.
 * `cover` picks the artwork family for pages outside /learn.
 */
export default function Article({
  path,
  title,
  standfirst,
  answer,
  published,
  updated,
  section = 'Learn',
  refs = [],
  related = [],
  trackName,
  pillar,
  pillarPage,
  cover,
  children,
}: {
  path: string
  title: string
  standfirst: string
  answer: React.ReactNode
  published: string
  updated?: string
  section?: string
  refs?: Ref[]
  related?: { href: string; label: string }[]
  trackName: string
  pillar?: PillarId
  pillarPage?: PillarId
  cover?: PillarId
  children: React.ReactNode
}) {
  const url = dabs(path)
  const nice = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const slug = path.split('/').pop() || ''
  const pid = pillar ?? pillarPage
  const p = pid ? pillarById(pid) : undefined
  const pillarHref = p ? `/learn/${p.slug}` : undefined
  const art = pid ?? cover
  const row = articleBySlug(slug)
  const mins = row?.mins ?? PILLARS.find((x) => x.slug === slug)?.mins
  const crumbs = [
    { name: 'Dhyaan', item: DHYAAN_URL },
    { name: 'Blog', item: dabs('/learn') },
    ...(pillar && p ? [{ name: p.short, item: dabs(pillarHref!) }] : []),
    { name: title, item: url },
  ]

  // Related reading: explicit links, or the pillar guide plus sibling articles.
  type Rel = { href: string; label: string; slug?: string; pillar?: PillarId; blurb?: string; mins?: number }
  const autoRelated: Rel[] =
    pillar && p
      ? [
          { href: pillarHref!, label: p.title, slug: p.slug, pillar, blurb: p.blurb, mins: p.mins },
          ...articlesFor(pillar)
            .filter((a) => a.slug !== slug)
            .map((a) => ({ href: `/learn/${a.slug}`, label: a.title, slug: a.slug, pillar: a.pillar, blurb: a.blurb, mins: a.mins })),
        ]
      : []
  const explicit: Rel[] = related.map((r) => {
    const s = r.href.startsWith('/learn/') ? r.href.split('/').pop()! : undefined
    const a = s ? articleBySlug(s) : undefined
    const pp = s ? PILLARS.find((x) => x.slug === s) : undefined
    return { ...r, slug: s, pillar: a?.pillar ?? pp?.id, blurb: a?.blurb ?? pp?.blurb, mins: a?.mins ?? pp?.mins }
  })
  const reading = (explicit.length ? explicit : autoRelated).slice(0, 3)
  const cluster = pillarPage ? articlesFor(pillarPage) : []

  // Split "Title: subtitle" or "Question? answer" into a big line and a lighter second line.
  const cut = title.search(/[:?]/)
  const ink = cut > 0 ? title.slice(0, cut + (title[cut] === '?' ? 1 : 0)).trim() : title
  const restRaw = cut > 0 ? title.slice(cut + 1).trim() : ''
  const rest = restRaw ? restRaw[0].toUpperCase() + restRaw.slice(1) : ''
  const inkWords = ink.split(' ').length

  return (
    <article className="dh-art">
      <ReadProgress />
      <BlogTracker pageName={trackName} />
      <JsonLd
        data={[
          {
            '@type': 'Article',
            '@id': `${url}#article`,
            headline: title,
            description: standfirst,
            url,
            datePublished: published,
            dateModified: updated ?? published,
            author: { '@type': 'Person', name: 'Ankur Shukla', url: `${WISDOM_URL}/about` },
            publisher: { '@id': `${DHYAAN_URL}/#organization` },
            image: COVERS[slug] ? dabs(COVERS[slug]) : `${DHYAAN_URL}/dhyaan-assets/og.png`,
            mainEntityOfPage: url,
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: (section === 'Learn' ? crumbs : [{ name: 'Dhyaan', item: DHYAAN_URL }, { name: section, item: url }]).map((c, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: c.name,
              item: c.item,
            })),
          },
        ]}
      />

      <header className="dh-art__head">
        <div className="dh-art__glow" aria-hidden="true" />
        <div className="dh-wrap dh-art__headin">
          <p className="dh-crumbs">
            <Link href="/">Dhyaan</Link>
            <span>/</span>
            {section === 'Learn' ? <Link href="/learn">Blog</Link> : <span>{section}</span>}
            {pillar && p && (
              <>
                <span>/</span>
                <Link href={pillarHref!}>{p.short}</Link>
              </>
            )}
          </p>
          {p && <p className="dh-pill">{pillarPage ? `Guide · ${p.short}` : p.short}</p>}
          <h1 className="dh-title dh-art__title">
            <span className="dh-title__ink">{words(ink)}</span>
            {rest && <span className="dh-art__sub">{words(rest, inkWords)}</span>}
          </h1>
          <p className="dh-art__stand">{standfirst}</p>
          <p className="dh-art__meta">
            <span className="dh-art__by">
              <Flame size={26} />
              Ankur Shukla, maker of Dhyaan
            </span>
            <span>{nice(updated ?? published)}</span>
            {mins && <span>{mins} min read</span>}
          </p>
        </div>
      </header>

      {art && (
        <div className="dh-wrap">
          <div className="dh-art__cover" data-reveal>
            <Cover slug={slug} pillar={art} alt={title} variant="hero" eager />
          </div>
        </div>
      )}

      <div className="dh-wrap dh-art__grid">
        <aside className="dh-art__rail">
          <Toc />
        </aside>
        <div className="dh-art__main">
          <div className="dh-answer">
            <p className="dh-answer__k">In short</p>
            {answer}
          </div>
          {cluster.length > 0 && (
            <nav className="dh-cluster" aria-label="In this guide">
              <p className="dh-cluster__k">Go deeper</p>
              <ul>
                {cluster.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/learn/${a.slug}`}>
                      <Cover slug={a.slug} pillar={a.pillar} alt="" variant="thumb" />
                      <span className="dh-cluster__t">
                        <b>{a.title}</b>
                        <span>{a.blurb}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <div className="dh-prose">{children}</div>
          {pillar && p && (
            <p className="dh-partof">
              Part of <Link href={pillarHref!}>{p.title}</Link>
            </p>
          )}

          {refs.length > 0 && (
            <details className="dh-refs-wrap">
              <summary>
                References <span>{refs.length}</span>
              </summary>
              <ol className="dh-refs">
                {refs.map((r, i) => (
                  <li key={i}>{r.href ? <a href={r.href} rel="noopener">{r.text}</a> : r.text}</li>
                ))}
              </ol>
            </details>
          )}
        </div>
      </div>

      <section className="dh-wrap">
        <div className="dh-cta dh-cta--join">
          <Flame size={64} />
          <h2>
            Sit in silence. <em>Then read what your body noticed.</em>
          </h2>
          <p>
            Dhyaan uses your AirPods and Apple Watch to read each sit back to you: when you arrived, how still you stayed, how your heart came down. No voice,
            no grade. Join the waitlist for the iPhone and Apple Watch beta.
          </p>
          <div className="dh-cta__form">
            <WaitlistForm source={`article_${slug}`} compact cta="Save my place" />
          </div>
        </div>
      </section>

      {reading.length > 0 && (
        <section className="dh-wrap dh-related">
          <h2 className="dh-related__h">Keep reading</h2>
          <div className="dh-agrid dh-agrid--3">
            {reading.map((r) => (
              <Link key={r.href} href={r.href} className="dh-acard">
                {r.slug && r.pillar ? (
                  <Cover slug={r.slug} pillar={r.pillar} alt="" variant="card" />
                ) : (
                  <div className="dh-cover dh-cover--card dh-cover--plain" aria-hidden="true">
                    <Flame size={72} />
                  </div>
                )}
                <div className="dh-acard__body">
                  {r.mins && (
                    <p className="dh-acard__meta">
                      <span>{r.pillar ? pillarById(r.pillar).short : 'Dhyaan'}</span>
                      <span>{r.mins} min read</span>
                    </p>
                  )}
                  <h3>{r.label}</h3>
                  {r.blurb && <p className="dh-acard__blurb">{r.blurb}</p>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
