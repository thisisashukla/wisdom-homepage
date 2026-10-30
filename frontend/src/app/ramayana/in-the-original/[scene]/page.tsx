import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogTracker from '@/components/BlogTracker'
import NextStep from '@/components/quotes/NextStep'
import Shell from '@/components/funnels/ramayana/Shell'
import ThreeLamps from '@/components/funnels/ramayana/ThreeLamps'
import TrackOnView from '@/components/funnels/ramayana/TrackOnView'
import Hero from '@/components/funnels/ramayana/Hero'
import { Band, JsonLd, MethodEn } from '@/components/funnels/ramayana/Bits'
import { NEXT_COPY } from '@/components/funnels/ramayana/copy'
import { KAND_LABEL, SCENES, defaultLamp, getLine, getScene, lampViews, lineView, sceneCitations } from '@/lib/funnels/ramayana/data'
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
      <Hero
        locale="en"
        crumbLabel="Breadcrumb"
        crumbs={[{ name: 'Wisdom', href: '/' }, { name: 'Ramayana', href: PATHS.hub }, { name: 'In the original', href: PATHS.original }, { name: s.title.en }]}
        eyebrow={`${s.title.en}, ${KAND_LABEL[s.kand].en}`}
        h1={s.question.en}
        h1Class="rl-question"
        chip={s.verdict.en}
        cta={{ href: '#three-lamps', label: 'See the three versions', loc: 'hero_lamps' }}
        lines={quoted ? [lineView(quoted, 'en')] : []}
      />

      <Band className="rl-introsec">
        <p className="rl-intro rv" id="quick-answer">
          {s.quick.en}
        </p>
      </Band>

      <Band id="three-lamps" title="Film, Valmiki, Tulsidas" lede="Tap a lamp to see what that version has." tone="alt">
        <div className="rv">
          <ThreeLamps scene={s.slug} lamps={lamps} locale="en" page={page} initial={defaultLamp(s)} label={`${s.title.en}: three versions`} />
        </div>
      </Band>

      <Band id="arc" title="The whole episode">
        <ol className="rl-arc rv">
          {s.arc.en.map((p, k) => (
            <li key={k}>{p}</li>
          ))}
        </ol>
      </Band>

      <Band id="asks" title="What it asks of you this week" tone="warm">
        <div className="rl-asks rv">
          <p>{s.asks.en}</p>
        </div>
        {s.gita && (
          <div className="rl-bridge rv">
            <p>{s.gita.note.en}</p>
            <a href={gitaHref(s.gita.chapter, s.gita.verse)} data-mp-location="gita_bridge">
              Read Bhagavad Gita {s.gita.chapter}.{s.gita.verse}
            </a>
          </div>
        )}
      </Band>

      <Band>
        <div className="rl-final rv">
          <NextStep funnel="ramayana" locale="en" pageName={page} pageKey={pageKey} placement="end" copy={NEXT_COPY.en} />
          <p className="rl-start">
            Or start with seven mornings: <a href={PATHS.afterFilm} data-mp-location="after_film">four Ramayana lines, then three from the Gita</a>.
          </p>
        </div>
      </Band>

      <Band tone="alt">
        <nav className="rl-nav rv" aria-label="More scenes">
          {prev ? (
            <a href={PATHS.scene(prev.slug)} data-mp-location="prev_scene">
              <span className="rl-nav-k">Before this</span>
              <span className="rl-nav-t">{prev.title.en}</span>
            </a>
          ) : (
            <span />
          )}
          {next ? (
            <a href={PATHS.scene(next.slug)} data-mp-location="next_scene">
              <span className="rl-nav-k">Next</span>
              <span className="rl-nav-t">{next.title.en}</span>
            </a>
          ) : (
            <a href={PATHS.original} data-mp-location="all_scenes">
              <span className="rl-nav-k">Back to</span>
              <span className="rl-nav-t">All scenes</span>
            </a>
          )}
        </nav>
        <p className="rl-muted rv">
          See <a href={PATHS.original}>all {SCENES.length} scenes</a>, or read <a href={PATHS.compare}>Valmiki and Tulsidas, side by side</a>.
        </p>
      </Band>

      <MethodEn />
    </Shell>
  )
}
