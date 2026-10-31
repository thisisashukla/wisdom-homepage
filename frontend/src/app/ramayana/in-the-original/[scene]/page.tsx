import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageTracker from '@/components/BlogTracker'
import { GitaBridge, JsonLd, LinkCards, NextStep, PageHero, Section } from '@/components/site'
import ThreeLamps from '@/components/funnels/ramayana/ThreeLamps'
import { Speaker } from '@/components/funnels/ramayana/LineVerse'
import { MethodEn } from '@/components/funnels/ramayana/Method'
import { NEXT_COPY } from '@/components/funnels/ramayana/copy'
import { KAND_LABEL, SCENES, defaultLamp, getLine, getScene, lampViews, lineView, sceneCitations } from '@/lib/funnels/ramayana/data'
import { PATHS, gitaHref } from '@/lib/funnels/ramayana/paths'
import { articleLd, quotationLd, ramayanaMeta } from '@/lib/funnels/ramayana/seo'
import { lineOriginal } from '@/lib/funnels/ramayana/verse'
import { slugify } from '@/lib/quotes-shared'

type Params = { scene: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return SCENES.map((s) => ({ scene: s.slug }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const s = getScene(params.scene)
  if (!s) return {}
  return ramayanaMeta({ title: s.meta.title, description: s.meta.description, path: PATHS.scene(s.slug), locale: 'en' })
}

export default function ScenePage({ params }: { params: Params }) {
  const s = getScene(params.scene)
  if (!s) notFound()
  const pageKey = slugify(`ram-${s.slug}`, 30)
  const i = SCENES.findIndex((x) => x.slug === s.slug)
  const prev = SCENES[i - 1]
  const next = SCENES[i + 1]
  const lamps = lampViews(s, 'en')
  const firstLine = [...(s.lamps.valmiki.lines ?? []), ...(s.lamps.tulsidas.lines ?? [])][0]
  const quoted = firstLine ? getLine(firstLine) : null
  const hero = quoted ? lineView(quoted, 'en') : null

  return (
    <main>
      <PageTracker pageName="Ramayana Scene" />
      <JsonLd
        data={[
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
      <PageHero
        crumbs={[
          { label: 'Ramayana', href: PATHS.hub },
          { label: 'In the original', href: PATHS.original },
          { label: s.title.en, href: PATHS.scene(s.slug) },
        ]}
        eyebrow={`${s.title.en}, ${KAND_LABEL[s.kand].en}`}
        title={s.question.en}
        facts={[s.verdict.en]}
        actions={[{ href: '#three-lamps', label: 'See the three versions', location: 'hero_lamps' }]}
        verse={hero ? { ...lineOriginal(hero), label: <Speaker line={hero} locale="en" />, source: hero.ref } : undefined}
      />

      <Section spacing="tight" rv={false}>
        <p className="sx-prose rv" id="quick-answer">
          {s.quick.en}
        </p>
      </Section>

      <Section id="three-lamps" tone="band" title="The film and the two texts" intro="Tap a lamp to see what that version has.">
        <div className="rv">
          <ThreeLamps scene={s.slug} lamps={lamps} locale="en" initial={defaultLamp(s)} label={`${s.title.en}: three versions`} trackView />
        </div>
      </Section>

      <Section id="arc" title="The whole episode">
        <ol className="rl-arc rv">
          {s.arc.en.map((p, k) => (
            <li key={k}>{p}</li>
          ))}
        </ol>
      </Section>

      <Section id="asks" tone="band" title="What it asks of you this week">
        <div className="rl-asks rv">
          <p>{s.asks.en}</p>
        </div>
        {s.gita && (
          <GitaBridge
            href={gitaHref(s.gita.chapter, s.gita.verse)}
            label={`Read Bhagavad Gita ${s.gita.chapter}.${s.gita.verse}`}
            why={s.gita.note.en}
            location="gita_bridge"
            from={s.slug}
            className="rl-gap rv"
          />
        )}
      </Section>

      <Section>
        <NextStep locale="en" pageKey={pageKey} placement="end" copy={NEXT_COPY.en} />
        <p className="rl-start">
          Or start with seven mornings: <a href={PATHS.afterFilm} data-mp-location="after_film">four Ramayana lines, then three from the Gita</a>.
        </p>
      </Section>

      <Section tone="band">
        <nav aria-label="More scenes">
          <LinkCards
            items={[
              ...(prev ? [{ href: PATHS.scene(prev.slug), kicker: 'Before this', title: prev.title.en, location: 'prev_scene' }] : []),
              next
                ? { href: PATHS.scene(next.slug), kicker: 'Next', title: next.title.en, location: 'next_scene' }
                : { href: PATHS.original, kicker: 'Back to', title: 'All scenes', location: 'all_scenes' },
            ]}
          />
        </nav>
        <p className="rl-muted rv">
          See <a href={PATHS.original}>all {SCENES.length} scenes</a>, or read <a href={PATHS.compare}>Valmiki and Tulsidas, side by side</a>.
        </p>
      </Section>

      <MethodEn />
    </main>
  )
}
