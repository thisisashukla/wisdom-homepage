import Link from 'next/link'
import { BlogTracker } from '@/components/BlogTracker'
import JsonLd from '../_components/JsonLd'
import Cover from '../_components/Cover'
import PageHero from '../_components/PageHero'
import BlogBrowser from '../_components/BlogBrowser'
import { ARTICLES, PILLARS, pillarById } from '../_lib/articles'
import { DHYAAN_URL, dabs, pageMeta } from '../_lib/site'

export const metadata = pageMeta({
  title: 'Blog: meditation, measured honestly',
  description:
    'Guides on silent meditation, what your heart rate and stillness show during a sit, meditating with Apple Watch and AirPods, and dhyana in yoga and the Gita.',
  path: '/learn',
})

export default function LearnIndex() {
  const [lead, ...rest] = PILLARS
  const cards = ARTICLES.map((a) => ({
    slug: a.slug,
    pillar: a.pillar,
    pillarShort: pillarById(a.pillar).short,
    title: a.title,
    blurb: a.blurb,
    mins: a.mins,
    cover: <Cover slug={a.slug} pillar={a.pillar} alt="" variant="card" />,
  }))

  return (
    <>
      <BlogTracker pageName="Dhyaan Learn Index" />
      <JsonLd
        data={{
          '@type': 'CollectionPage',
          '@id': `${dabs('/learn')}#collection`,
          name: 'Dhyaan blog: meditation, measured honestly',
          url: dabs('/learn'),
          isPartOf: { '@id': `${DHYAAN_URL}/#website` },
          hasPart: [...PILLARS.map((p) => ({ '@type': 'Article', headline: p.title, url: dabs(`/learn/${p.slug}`) })), ...ARTICLES.map((a) => ({ '@type': 'Article', headline: a.title, url: dabs(`/learn/${a.slug}`) }))],
        }}
      />

      <PageHero
        kicker="The Dhyaan blog"
        soft="Meditation,"
        ink="measured honestly."
        sub="I’m Ankur, and I’m building Dhyaan. This is where I write up what I’ve learned about sitting still, from the research papers to the Gita, and what a watch can and can’t tell you about it."
      />

      <section className="dh-wrap">
        <div className="dh-blog-sec__h" data-reveal>
          <h2>Start with a guide</h2>
          <p className="dh-muted dh-small">Four long reads, each with deeper articles underneath</p>
        </div>
        <div className="dh-blog-feat">
          {[lead, ...rest].map((p, i) => (
            <Link key={p.id} href={`/learn/${p.slug}`} className="dh-pcard" data-reveal style={{ minHeight: i === 0 ? 520 : 210 }}>
              <Cover slug={p.slug} pillar={p.id} alt="" variant="card" eager={i === 0} />
              <div className="dh-pcard__body">
                <p className="dh-pcard__k">
                  Guide · {p.short} · {p.mins} min
                </p>
                <h3>{p.title}</h3>
                {i === 0 && <p className="dh-pcard__blurb">{p.blurb}</p>}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="dh-wrap dh-blog-sec">
        <div className="dh-blog-sec__h" data-reveal>
          <h2>All articles</h2>
          <p className="dh-muted dh-small">
            {ARTICLES.length} articles · <Link href="/gita">The Gita on meditation →</Link>
          </p>
        </div>
        <BlogBrowser cards={cards} pillars={PILLARS.map((p) => ({ id: p.id, short: p.short }))} />
      </section>
    </>
  )
}
