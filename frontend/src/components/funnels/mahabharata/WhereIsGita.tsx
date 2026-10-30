import { getAllChapters } from '@/lib/gita'
import { line } from '@/lib/funnels/mahabharata/lines'
import { GITA_LINES, type WhereCopy } from '@/lib/funnels/mahabharata/whereGita'
import { toIast } from '@/lib/funnels/mahabharata/iast'
import LineCard from './LineCard'
import GitaLink from './GitaLink'
import Faq from './Faq'
import { Band, type HeroSpec } from './Shell'
import NextBlock from './NextBlock'

const gitaHrefFor = (hi: boolean) => (c: number, v?: number) => `${hi ? '/hi' : ''}/gita/chapter/${c}${v ? `/verse/${v}` : ''}`

/** Hero for both locales: chapter 11 art (Krishna above the chariot, the armies below) with the theme-plan scrim. */
export function whereHero(copy: WhereCopy, locale: 'en' | 'hi', page: string): HeroSpec {
  return {
    eyebrow: copy.kicker,
    h1: copy.h1,
    sub: copy.sub,
    facts: copy.facts,
    art: { src: '/assets/chapter11.webp', alt: copy.artAlt, position: '62% 28%' },
    cta: (
      <GitaLink href={gitaHrefFor(locale === 'hi')(1, 1)} from="where_hero" toRef="1.1" page={page} locale={locale} className="btn-read-gita btn-read-gita-primary">
        {copy.startGita}
      </GitaLink>
    ),
  }
}

/** Body of /mahabharata/where-is-the-gita (EN) and /hi/mahabharata/where-is-the-gita (HI). */
export default function WhereIsGita({ copy, locale, page, path }: { copy: WhereCopy; locale: 'en' | 'hi'; page: string; path: string }) {
  const hi = locale === 'hi'
  const gitaHref = gitaHrefFor(hi)
  const chapters = getAllChapters()
  return (
    <>
      <Band className="mb-intro">
        <p id="quick-answer" className="tp-intro rv">
          {copy.quick}
        </p>
      </Band>

      <Band alt mp="bhishma_parva_steps" h={copy.stepsH} hId="steps-h" lede={copy.stepsLede} id="steps">
        <ol className="mb-strip rv">
          {copy.steps.map((s) => (
            <li key={s.title} data-gita={s.gita ? '' : undefined}>
              <strong>{s.title}</strong>
              <p>{s.text}</p>
              {s.gita && (
                <p>
                  <GitaLink href={gitaHref(1, 1)} from="where_steps" toRef="1.1" page={page} locale={locale}>
                    {copy.startGita}
                  </GitaLink>
                </p>
              )}
            </li>
          ))}
        </ol>
      </Band>

      <Band h={copy.firstH} hId="first-h" lede={copy.firstLede}>
        {GITA_LINES.map((g) => (
          <article className="qc mb-qc mb-qc-bare rv" key={`${g.c}-${g.v}`} id={`bg-${g.c}-${g.v}`}>
            <p className="qc-sa mb-deva" lang="sa">
              {g.deva.split('\n').map((r, i) => (
                <span key={i} className="qc-pada">
                  {r}
                </span>
              ))}
            </p>
            <p className="qc-iast mb-iast" lang="sa-Latn">
              {toIast(g.deva)
                .split('\n')
                .map((r, i) => (
                  <span key={i} className="qc-pada">
                    {r}
                  </span>
                ))}
            </p>
            <p className="qc-meaning" lang={locale}>
              {hi ? g.hi : g.en}
            </p>
            <p className="qc-source">
              <span className="qc-chip">
                {g.speaker[locale]} · {hi ? `भगवद गीता ${g.c}.${g.v}` : `Bhagavad Gita ${g.c}.${g.v}`}
              </span>
            </p>
            <p className="mb-qc-go">
              <GitaLink href={gitaHref(g.c, g.v)} from="where_first_last" toRef={`${g.c}.${g.v}`} page={page} locale={locale}>
                {copy.readVerse(g.c, g.v)}
              </GitaLink>
            </p>
          </article>
        ))}
      </Band>

      <Band alt mp="gita_chapters" h={copy.chaptersH} hId="chapters-h" lede={copy.chaptersLede}>
        <ul className="mb-chapters rv">
          {chapters.map((c) => (
            <li key={c.number}>
              <GitaLink href={gitaHref(c.number)} from="where_chapters" toRef={`ch${c.number}`} page={page} locale={locale}>
                {copy.chapterLabel(c.number)}
                <span>{hi ? c.hiTitle : c.enTitle}</span>
              </GitaLink>
            </li>
          ))}
        </ul>
        <p className="mb-read18 rv">
          <GitaLink href="/read-gita-in-18-days" from="where_read18" toRef="read-18-days" page={page} locale={locale}>
            {copy.read18}
          </GitaLink>
        </p>
      </Band>

      <Band id="after-the-war" mp="anugita" h={copy.afterH} hId="after-h" lede={copy.afterLede}>
        <LineCard line={line('mbh.14.17.6')} locale={locale} page={page} path={path} />
        <LineCard line={line('mbh.14.17.12')} locale={locale} page={page} path={path} />
      </Band>

      <Band alt mp="gita_echoes" h={copy.echoesH} hId="echoes-h" lede={copy.echoesLede}>
        {copy.echoes.map((e) => (
          <div key={e.lineId} className="mb-echo">
            <LineCard line={line(e.lineId)} locale={locale} page={page} path={path} />
            <ul className="mb-bridge rv">
              <li>
                <GitaLink href={gitaHref(e.c, e.v)} from={`echo_${e.lineId}`} toRef={`${e.c}.${e.v}`} page={page} locale={locale}>
                  {hi ? `गीता ${e.c}.${e.v}` : `Gita ${e.c}.${e.v}`}
                </GitaLink>
                <p>{e.why}</p>
              </li>
            </ul>
          </div>
        ))}
      </Band>

      <Faq items={copy.faq} heading={copy.faqH} lang={locale} />
      <NextBlock locale={locale} page={page} alt />

      <Band className="mb-method" h={copy.methodH} hId="method-h">
        {copy.method.map((m) => (
          <p key={m}>{m}</p>
        ))}
      </Band>
    </>
  )
}
