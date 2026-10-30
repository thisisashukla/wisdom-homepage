import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogTracker from '@/components/BlogTracker'
import NextStep from '@/components/quotes/NextStep'
import Shell from '@/components/funnels/ramayana/Shell'
import ThreeLamps from '@/components/funnels/ramayana/ThreeLamps'
import TrackOnView from '@/components/funnels/ramayana/TrackOnView'
import { Crumbs, JsonLd, MethodEn } from '@/components/funnels/ramayana/Bits'
import { NEXT_COPY } from '@/components/funnels/ramayana/copy'
import { KAND_LABEL, SCENES, defaultLamp, getLine, getScene, lampViews, sceneCitations } from '@/lib/funnels/ramayana/data'
import { PATHS, gitaHref } from '@/lib/funnels/ramayana/paths'
import { articleLd, breadcrumbLd, pageMeta, quotationLd } from '@/lib/funnels/ramayana/seo'
import { slugify } from '@/lib/quotes-shared'

type Params = { scene: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return SCENES.map((s) => ({ scene: s.slug }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const s = getScene(params.scene)
  if (!s) return {}
  return pageMeta({ title: s.meta.title, description: s.meta.description, path: PATHS.scene(s.slug), locale: 'en' })
}

export default function ScenePage({ params }: { params: Params }) {
  const s = getScene(params.scene)
  if (!s) notFound()
  const page = `ramayana-scene-${s.slug}`
  const pageKey = slugify(`ram-${s.slug}`, 30)
  const i = SCENES.findIndex((x) => x.slug === s.slug)
  const prev = SCENES[i - 1]
  const next = SCENES[i + 1]
  const lamps = lampViews(s, 'en')
  const firstLine = [...(s.lamps.valmiki.lines ?? []), ...(s.lamps.tulsidas.lines ?? [])][0]
  const quoted = firstLine ? getLine(firstLine) : null

  return (
    <Shell locale="en">
      <BlogTracker pageName={page} />
      <TrackOnView event="Scene Viewed" page={page} locale="en" props={{ scene: s.slug }} />
      <JsonLd
        data={[
          breadcrumbLd([
            { name: 'Wisdom', path: '/' },
            { name: 'Ramayana', path: PATHS.hub },
            { name: 'In the original', path: PATHS.original },
            { name: s.title.en, path: PATHS.scene(s.slug) },
          ]),
          articleLd({
            headline: s.question.en,
            description: s.meta.description,
            path: PATHS.scene(s.slug),
            locale: 'en',
            citations: sceneCitations(s),
            about: ['Ramayana', 'Ramcharitmanas', s.title.en],
          }),
          ...(quoted
            ? [quotationLd({ text: quoted.sa, meaning: quoted.meaning.en, speaker: quoted.speaker.en.split(/\s+to\s+|,/)[0], work: quoted.text === 'vr' ? 'vr' : 'rcm', ref: quoted.ref.en })]
            : []),
        ]}
      />
      <Crumbs
        label="Breadcrumb"
        items={[{ name: 'Wisdom', href: '/' }, { name: 'Ramayana', href: PATHS.hub }, { name: 'In the original', href: PATHS.original }, { name: s.title.en }]}
      />

      <header className="rl-hero">
        <p className="rl-kicker">
          {s.title.en}, {KAND_LABEL[s.kand].en}
        </p>
        <h1 className="rl-h1 rl-question">{s.question.en}</h1>
        <p className="rl-chip">{s.verdict.en}</p>
        <p className="rl-quick" id="quick-answer">
          {s.quick.en}
        </p>
      </header>

      <section className="rl-section" aria-labelledby="three-lamps">
        <h2 className="rl-h2" id="three-lamps">
          Film, Valmiki, Tulsidas
        </h2>
        <p className="rl-lede">Tap a lamp to see what that version has.</p>
        <ThreeLamps scene={s.slug} lamps={lamps} locale="en" page={page} initial={defaultLamp(s)} label={`${s.title.en}: three versions`} />
      </section>

      <section className="rl-section" aria-labelledby="arc">
        <h2 className="rl-h2" id="arc">
          The whole episode
        </h2>
        <ol className="rl-arc">
          {s.arc.en.map((p, k) => (
            <li key={k}>{p}</li>
          ))}
        </ol>
      </section>

      <section className="rl-section" aria-labelledby="asks">
        <h2 className="rl-h2" id="asks">
          What it asks of you this week
        </h2>
        <div className="rl-asks">
          <p>{s.asks.en}</p>
        </div>
        {s.gita && (
          <div className="rl-bridge">
            <p>{s.gita.note.en}</p>
            <a href={gitaHref(s.gita.chapter, s.gita.verse)} data-mp-location="gita_bridge">
              Read Bhagavad Gita {s.gita.chapter}.{s.gita.verse}
            </a>
          </div>
        )}
      </section>

      <div className="rl-next">
        <NextStep funnel="ramayana" locale="en" pageName={page} pageKey={pageKey} placement="end" copy={NEXT_COPY.en} />
        <p className="rl-start">
          Or start with seven mornings: <a href={PATHS.afterFilm} data-mp-location="after_film">four Ramayana lines, then three from the Gita</a>.
        </p>
      </div>

      <nav className="rl-nav" aria-label="More scenes">
        {prev ? (
          <a href={PATHS.scene(prev.slug)} data-mp-location="prev_scene">
            Before this: {prev.title.en}
          </a>
        ) : (
          <span />
        )}
        {next ? (
          <a href={PATHS.scene(next.slug)} data-mp-location="next_scene">
            Next: {next.title.en}
          </a>
        ) : (
          <a href={PATHS.original} data-mp-location="all_scenes">
            All scenes
          </a>
        )}
      </nav>
      <p className="rl-muted">
        See <a href={PATHS.original}>all {SCENES.length} scenes</a>, or read <a href={PATHS.compare}>Valmiki and Tulsidas, side by side</a>.
      </p>

      <MethodEn />
    </Shell>
  )
}
