import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogTracker from '@/components/BlogTracker'
import RsNext from '@/components/funnels/ram-shalaka/RsNext'
import ScriptToggle from '@/components/funnels/ram-shalaka/ScriptToggle'
import { rsTiro, rsYatra } from '@/components/funnels/ram-shalaka/fonts'
import '@/components/funnels/ram-shalaka/shalaka.css'
import {
  firstHalf,
  getLineBySlug,
  getLines,
  gitaHref,
  lineCopy,
  lineHref,
  neighbours,
  ritualCopy,
  signName,
  signNote,
  sourceLabel,
} from '@/lib/funnels/ram-shalaka'
import { lineJsonLd, lineMetadata } from '@/lib/funnels/ram-shalaka/seo'

type Params = { line: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return getLines().map((l) => ({ line: l.slug }))
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const l = getLineBySlug(params.line)
  return l ? lineMetadata(l) : { title: 'Not found', robots: { index: false } }
}

export default function LinePage({ params }: { params: Params }) {
  const l = getLineBySlug(params.line)
  if (!l) notFound()
  const t = lineCopy()
  const { ui, next } = ritualCopy('hi')
  const { prev, next: nextLine } = neighbours(l)
  const pageKey = `ram-shalaka-line-${l.n}`

  return (
    <main className={`fx-ram-shalaka ${rsTiro.variable} ${rsYatra.variable}`} lang="hi">
      <BlogTracker pageName={pageKey} />
      {lineJsonLd(l).map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}

      <div className="rs-line-hero">
        <div className="rs-cloth" aria-hidden="true">
          {Array.from({ length: 22 }, (_, r) => (
            <span key={r}>{'राम '.repeat(34)}</span>
          ))}
        </div>
        <header className="rs-line-head">
          <nav className="rs-crumbs" aria-label="Breadcrumb">
            <ol>
              <li>
                <a href="/">Wisdom</a>
              </li>
              <li>
                <a href="/hi/ram-shalaka" data-mp-location="rs_line_crumb">
                  {t.crumbSelf}
                </a>
              </li>
              <li aria-current="page">{firstHalf(l)}</li>
            </ol>
          </nav>
          <div className="rs-line-top">
            <span className={`rs-mini-seal ${l.sign}`} aria-hidden="true">
              {signName(l.sign, 'hi')}
            </span>
            <h1 className="rs-line-h1">
              <span>{l.deva[0]}</span>
              <span>{l.deva[1]}</span>
              <small>{t.sub}</small>
            </h1>
          </div>
          <p className="rs-line-meta">
            {l.signText.hi} · श्रीरामचरितमानस, {sourceLabel(l, 'hi')} · {l.who.hi}
          </p>
          <a className="rs-cta" href="/hi/ram-shalaka" data-mp-location="rs_line_hero_ask">
            {t.ask}
          </a>
        </header>
      </div>

      <section className="rs-sec" style={{ paddingTop: 20 }}>
        <p className="rs-lede" id="quick-answer">
          {l.quick.hi}
        </p>

        <div className="rs-unit" id="unit" data-rs-script="deva">
          <div className="rs-unit-top">
            <h2 className="rs-h3">{t.unitHeading}</h2>
            <ScriptToggle target="unit" label="लिपि" />
          </div>
          {l.unit.map((p, i) => (
            <div key={i} className={`rs-pair${p.answer ? ' ans' : ''}`}>
              {p.answer && <span className="rs-pair-tag">{t.answerTag}</span>}
              <p className="rs-pair-text rs-deva">
                <span>{p.deva[0]}</span>
                <span>{p.deva[1]}</span>
              </p>
              <p className="rs-pair-text rs-iast" lang="hi-Latn">
                <span>{p.iast[0]},</span>
                <span>{p.iast[1]}</span>
              </p>
              <p className="rs-pair-mean">{p.meaning.hi}</p>
              <p className="rs-pair-mean-en" lang="en">
                {p.meaning.en}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rs-sec" id="arth">
        <h2 className="rs-h2">{t.meaningHeading}</h2>
        <p className="rs-lede">{l.meaning.hi}</p>
        <p className="rs-p" lang="en" style={{ marginTop: 8 }}>
          {t.inEnglish}: {l.meaning.en}
        </p>
      </section>

      <section className="rs-sec" id="prasang">
        <h2 className="rs-h2">{t.sceneHeading}</h2>
        <p className="rs-lede">{l.scene.hi}</p>
        <p className="rs-p" lang="en" style={{ marginTop: 8 }}>
          {t.inEnglish}: {l.scene.en}
        </p>
      </section>

      <section className="rs-sec" id="aapse">
        <h2 className="rs-h2">{t.youHeading}</h2>
        <p className="rs-lede">{l.forYou.hi}</p>
        <h3 className="rs-h3" style={{ marginTop: 22 }}>
          {t.signHeading}
        </h3>
        <p className="rs-p">
          <span className={`rs-tag ${l.sign}`}>{l.signText.hi}</span>
        </p>
        <p className="rs-p">{signNote(l.sign, 'hi')}</p>
        <div className="rs-cta-row">
          <a className="rs-cta" href="/hi/ram-shalaka" data-mp-location="rs_line_ask">
            {t.ask}
          </a>
        </div>
      </section>

      <section className="rs-sec" id="gita">
        <h2 className="rs-h2">{t.gitaHeading}</h2>
        <p className="rs-p">
          {l.gita.note.hi}{' '}
          <a href={gitaHref(l, 'hi')} className="rs-gita-link" data-mp-location="rs_line_gita">
            {t.gitaLink}
          </a>
        </p>
      </section>

      <section className="rs-sec">
        <RsNext
          locale="hi"
          pageKey={pageKey}
          placement="line"
          n={l.n}
          k={l.k}
          copy={{ planTitle: ui.planTitle, planSub: ui.planSub, planBtn: ui.planBtn, planFree: ui.planFree, appLine: next.app.line, appBtn: next.app.cta }}
        />
      </section>

      <section className="rs-sec">
        <nav className="rs-pn" aria-label={t.allNine}>
          <a href={lineHref(prev.slug)} data-mp-location="rs_line_prev">
            <small>{t.prev}</small>
            <span>{firstHalf(prev)}</span>
          </a>
          <a href={lineHref(nextLine.slug)} data-mp-location="rs_line_next">
            <small>{t.next}</small>
            <span>{firstHalf(nextLine)}</span>
          </a>
        </nav>
        <p className="rs-p" style={{ marginTop: 16 }}>
          <a href="/hi/ram-shalaka#nine" data-mp-location="rs_line_all">
            {t.allNine}
          </a>
          {' · '}
          <a href="/ramayana" data-mp-location="rs_line_ramayana">
            {t.ramayana}
          </a>
        </p>
      </section>

      <section className="rs-sec">
        <h2 className="rs-h2">{t.sourcesHeading}</h2>
        <p className="rs-sources">{t.sources}</p>
      </section>
    </main>
  )
}
