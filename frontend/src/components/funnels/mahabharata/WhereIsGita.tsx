import { getAllChapters } from '@/lib/gita'
import { line } from '@/lib/funnels/mahabharata/lines'
import { GITA_LINES, type WhereCopy } from '@/lib/funnels/mahabharata/whereGita'
import { toIast } from '@/lib/funnels/mahabharata/iast'
import LineCard from './LineCard'
import GitaLink from './GitaLink'
import Faq from './Faq'
import NextBlock from './NextBlock'

/** Body of /mahabharata/where-is-the-gita (EN) and /hi/mahabharata/where-is-the-gita (HI). */
export default function WhereIsGita({ copy, locale, page, path }: { copy: WhereCopy; locale: 'en' | 'hi'; page: string; path: string }) {
  const hi = locale === 'hi'
  const gitaHref = (c: number, v?: number) => `${hi ? '/hi' : ''}/gita/chapter/${c}${v ? `/verse/${v}` : ''}`
  const chapters = getAllChapters()
  return (
    <>
      <header className="mb-head">
        <p className="mb-kicker">{copy.kicker}</p>
        <h1>{copy.h1}</h1>
        <p id="quick-answer">{copy.quick}</p>
        <p className="mb-sub">{copy.sub}</p>
      </header>

      <section className="mb-sec" aria-labelledby="steps-h" data-mp-section="bhishma_parva_steps">
        <h2 id="steps-h">{copy.stepsH}</h2>
        <p className="mb-lede">{copy.stepsLede}</p>
        <ol className="mb-strip">
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
      </section>

      <section className="mb-sec" aria-labelledby="first-h">
        <h2 id="first-h">{copy.firstH}</h2>
        <p className="mb-lede">{copy.firstLede}</p>
        {GITA_LINES.map((g) => (
          <article className="mb-line" key={`${g.c}-${g.v}`} id={`bg-${g.c}-${g.v}`}>
            <p className="mb-deva" lang="sa">
              {g.deva.split('\n').map((r, i) => (
                <span key={i}>{r}</span>
              ))}
            </p>
            <p className="mb-iast" lang="sa-Latn">
              {toIast(g.deva)
                .split('\n')
                .map((r, i) => (
                  <span key={i}>{r}</span>
                ))}
            </p>
            <p className="mb-meaning">{hi ? g.hi : g.en}</p>
            <p className="mb-src">
              <span className="mb-ref">{hi ? `भगवद गीता ${g.c}.${g.v}` : `Bhagavad Gita ${g.c}.${g.v}`}</span>
              <span className="mb-speaker">{g.speaker[locale]}</span>
            </p>
            <p>
              <GitaLink href={gitaHref(g.c, g.v)} from="where_first_last" toRef={`${g.c}.${g.v}`} page={page} locale={locale}>
                {copy.readVerse(g.c, g.v)}
              </GitaLink>
            </p>
          </article>
        ))}
      </section>

      <section className="mb-sec" aria-labelledby="chapters-h" data-mp-section="gita_chapters">
        <h2 id="chapters-h">{copy.chaptersH}</h2>
        <p className="mb-lede">{copy.chaptersLede}</p>
        <ul className="mb-chapters">
          {chapters.map((c) => (
            <li key={c.number}>
              <GitaLink href={gitaHref(c.number)} from="where_chapters" toRef={`ch${c.number}`} page={page} locale={locale}>
                {copy.chapterLabel(c.number)}
                <span>{hi ? c.hiTitle : c.enTitle}</span>
              </GitaLink>
            </li>
          ))}
        </ul>
        <p>
          <GitaLink href="/read-gita-in-18-days" from="where_read18" toRef="read-18-days" page={page} locale={locale}>
            {copy.read18}
          </GitaLink>
        </p>
      </section>

      <section className="mb-sec" id="after-the-war" aria-labelledby="after-h" data-mp-section="anugita">
        <h2 id="after-h">{copy.afterH}</h2>
        <p className="mb-lede">{copy.afterLede}</p>
        <LineCard line={line('mbh.14.17.6')} locale={locale} page={page} path={path} />
        <LineCard line={line('mbh.14.17.12')} locale={locale} page={page} path={path} />
      </section>

      <section className="mb-sec" aria-labelledby="echoes-h" data-mp-section="gita_echoes">
        <h2 id="echoes-h">{copy.echoesH}</h2>
        <p className="mb-lede">{copy.echoesLede}</p>
        {copy.echoes.map((e) => (
          <div key={e.lineId}>
            <LineCard line={line(e.lineId)} locale={locale} page={page} path={path} />
            <ul className="mb-bridge">
              <li>
                <GitaLink href={gitaHref(e.c, e.v)} from={`echo_${e.lineId}`} toRef={`${e.c}.${e.v}`} page={page} locale={locale}>
                  {hi ? `गीता ${e.c}.${e.v}` : `Gita ${e.c}.${e.v}`}
                </GitaLink>
                <p>{e.why}</p>
              </li>
            </ul>
          </div>
        ))}
      </section>

      <Faq items={copy.faq} heading={copy.faqH} lang={locale} />
      <NextBlock locale={locale} page={page} />

      <section className="mb-sec mb-method" aria-labelledby="method-h">
        <h2 id="method-h">{copy.methodH}</h2>
        {copy.method.map((m) => (
          <p key={m}>{m}</p>
        ))}
      </section>
    </>
  )
}
