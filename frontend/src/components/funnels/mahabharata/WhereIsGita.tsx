import { Actions, Faq, GitaBridge, NextStep, PageHero, Section, VerseCard, VerseList } from '@/components/site'
import type { Locale } from '@/lib/locale'
import { getAllChapters } from '@/lib/gita'
import { line } from '@/lib/funnels/mahabharata/lines'
import { GITA_LINES, type WhereCopy } from '@/lib/funnels/mahabharata/whereGita'
import { toIast } from '@/lib/funnels/mahabharata/iast'
import { NEXT } from '@/lib/funnels/mahabharata/next'
import { PATHS } from '@/lib/funnels/mahabharata/seo'
import Line from './Line'
import BridgeTrack from './BridgeTrack'

const gitaHrefFor = (hi: boolean) => (c: number, v?: number) => `${hi ? '/hi' : ''}/gita/chapter/${c}${v ? `/verse/${v}` : ''}`

/** Hero for both locales: chapter 11 art (Krishna above the chariot, the armies below). */
export function WhereHero({ copy, locale, path }: { copy: WhereCopy; locale: Locale; path: string }) {
  return (
    <PageHero
      locale={locale}
      lang={locale}
      crumbs={[
        { label: copy.crumbs.mbh, href: PATHS.hub },
        { label: copy.crumbs.here, href: path },
      ]}
      eyebrow={copy.kicker}
      title={copy.h1}
      sub={copy.sub}
      facts={copy.facts}
      art={{ src: '/assets/chapter11.webp', alt: copy.artAlt, position: '62% 28%' }}
      scriptToggle
      below={
        <BridgeTrack location="where_hero">
          <Actions items={[{ href: gitaHrefFor(locale === 'hi')(1, 1), label: copy.startGita, location: 'gita_bridge_where_hero' }]} />
        </BridgeTrack>
      }
    />
  )
}

/** Body of /mahabharata/where-is-the-gita (EN) and /hi/mahabharata/where-is-the-gita (HI). */
export default function WhereIsGita({ copy, locale, pageKey, path }: { copy: WhereCopy; locale: Locale; pageKey: string; path: string }) {
  const hi = locale === 'hi'
  const gitaHref = gitaHrefFor(hi)
  const chapters = getAllChapters()
  return (
    <>
      <Section spacing="tight">
        <div className="sx-prose rv">
          <p id="quick-answer">{copy.quick}</p>
        </div>
      </Section>

      <Section tone="band" id="steps" track="bhishma_parva_steps" title={copy.stepsH} intro={copy.stepsLede} width="narrow">
        <ol className="mb-strip rv">
          {copy.steps.map((s) => (
            <li key={s.title} data-gita={s.gita ? '' : undefined}>
              <strong>{s.title}</strong>
              <p>{s.text}</p>
              {s.gita && (
                <p>
                  <GitaBridge variant="inline" href={gitaHref(1, 1)} location="where_steps" label={copy.startGita} locale={locale} />
                </p>
              )}
            </li>
          ))}
        </ol>
      </Section>

      <Section title={copy.firstH} intro={copy.firstLede} width="narrow">
        <VerseList>
          {GITA_LINES.map((g) => (
            <VerseCard
              key={`${g.c}-${g.v}`}
              as="li"
              id={`bg-${g.c}-${g.v}`}
              rv
              original={g.deva}
              iast={toIast(g.deva)}
              meaning={hi ? g.hi : g.en}
              source={`${g.speaker[locale]} · ${hi ? `भगवद गीता ${g.c}.${g.v}` : `Bhagavad Gita ${g.c}.${g.v}`}`}
              locale={locale}
            >
              <p className="mb-go">
                <GitaBridge variant="inline" href={gitaHref(g.c, g.v)} location="where_first_last" label={copy.readVerse(g.c, g.v)} locale={locale} />
              </p>
            </VerseCard>
          ))}
        </VerseList>
      </Section>

      <Section tone="band" track="gita_chapters" title={copy.chaptersH} intro={copy.chaptersLede}>
        <ul className="mb-chapters" data-stagger="40">
          {chapters.map((c) => (
            <li key={c.number} className="rv">
              <GitaBridge
                variant="inline"
                href={gitaHref(c.number)}
                location="where_chapters"
                locale={locale}
                label={
                  <>
                    {copy.chapterLabel(c.number)}
                    <span>{hi ? c.hiTitle : c.enTitle}</span>
                  </>
                }
              />
            </li>
          ))}
        </ul>
        <p className="mb-read18 rv">
          <GitaBridge variant="inline" href="/read-gita-in-18-days" location="where_read18" label={copy.read18} locale={locale} />
        </p>
      </Section>

      <Section id="after-the-war" track="anugita" title={copy.afterH} intro={copy.afterLede} width="narrow">
        <VerseList>
          <Line as="li" line={line('mbh.14.17.6')} locale={locale} path={path} pageKey={pageKey} />
          <Line as="li" line={line('mbh.14.17.12')} locale={locale} path={path} pageKey={pageKey} />
        </VerseList>
      </Section>

      <Section tone="band" track="gita_echoes" title={copy.echoesH} intro={copy.echoesLede} width="narrow">
        <div className="mb-echoes">
          {copy.echoes.map((e) => (
            <div key={e.lineId} className="mb-echo">
              <Line line={line(e.lineId)} locale={locale} path={path} pageKey={pageKey} />
              <GitaBridge
                className="rv"
                href={gitaHref(e.c, e.v)}
                location={`echo_${e.lineId}`}
                from={e.lineId}
                label={hi ? `गीता ${e.c}.${e.v}` : `Gita ${e.c}.${e.v}`}
                why={e.why}
                locale={locale}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section track="faq" title={copy.faqH} lang={locale} width="narrow">
        <Faq items={copy.faq} locale={locale} />
      </Section>

      <Section tone="band" track="next_step" title={NEXT[locale].head} width="narrow">
        <div className="rv">
          <NextStep locale={locale} pageKey={pageKey} placement="end" copy={NEXT[locale].copy} />
        </div>
      </Section>

      <Section className="mb-method" title={copy.methodH} width="narrow">
        {copy.method.map((m) => (
          <p key={m}>{m}</p>
        ))}
      </Section>
    </>
  )
}
