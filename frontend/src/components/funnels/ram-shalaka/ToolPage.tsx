/** The tool page, shared by /hi/ram-shalaka (Hindi, default) and /ram-shalaka (English twin). */
import BlogTracker from '@/components/BlogTracker'
import {
  SITE,
  getCells,
  getGrid,
  getLines,
  gitaHref,
  lineHref,
  pageCopy,
  ritualCopy,
  ritualLines,
  signName,
  sourceLabel,
  toolHref,
  type RsLocale,
} from '@/lib/funnels/ram-shalaka'
import { toolJsonLd } from '@/lib/funnels/ram-shalaka/seo'
import GridTable from './GridTable'
import Ritual from './Ritual'
import RsNext from './RsNext'
import ScriptToggle from './ScriptToggle'
import { rsTiro, rsYatra } from './fonts'
import './shalaka.css'

export default function ToolPage({ locale }: { locale: RsLocale }) {
  const c = pageCopy(locale)
  const { ui, naam, next } = ritualCopy(locale)
  const lines = getLines()
  const pageKey = locale === 'hi' ? 'ram-shalaka' : 'ram-shalaka-en'
  const other: RsLocale = locale === 'hi' ? 'en' : 'hi'
  const lineNote = locale === 'en' ? { hrefLang: 'hi' } : {}

  return (
    <main className={`fx-ram-shalaka ${rsTiro.variable} ${rsYatra.variable}`} lang={locale}>
      <BlogTracker pageName={pageKey} />
      {toolJsonLd(locale).map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}

      <section className="rs-stage" aria-label={ui.kicker}>
        <Ritual
          locale={locale}
          pageKey={pageKey}
          h1={c.h1}
          cells={getCells()}
          lines={ritualLines(locale)}
          ui={ui}
          naam={naam}
          next={next}
          langHref={toolHref(other)}
          siteUrl={SITE}
        />
        <noscript>
          <p className="rs-noscript">{ui.noscript}</p>
        </noscript>
      </section>

      <div className="rs-after">
        <nav className="rs-crumbs" aria-label="Breadcrumb">
          <ol>
            <li>
              <a href="/">{c.crumbHome}</a>
            </li>
            <li aria-current="page">{c.crumbSelf}</li>
          </ol>
        </nav>

        <section className="rs-sec" id="what" data-mp-section="rs_what">
          <h2 className="rs-h2">{c.whatHeading}</h2>
          <p className="rs-lede" id="quick-answer">
            {c.quickAnswer}
          </p>
        </section>

        <section className="rs-sec wide" id="nine" data-mp-section="rs_nine" data-rs-script="deva">
          <div className="rs-nine-head">
            <h2 className="rs-h2">{c.nineHeading}</h2>
            <ScriptToggle target="nine" label={c.scriptLabel} />
          </div>
          <p className="rs-p">{c.nineIntro}</p>
          <ul className="rs-nine">
            {lines.map((l) => (
              <li key={l.k} className="rs-ans" id={`uttar-${l.n}`}>
                <span className={`rs-tag ${l.sign}`}>{signName(l.sign, locale)}</span>
                <p className="rs-ans-line rs-deva" lang="hi">
                  <span>{l.deva[0]}</span>
                  <span>{l.deva[1]}</span>
                </p>
                <p className="rs-ans-line rs-iast" lang="hi-Latn">
                  <span>{l.iast[0]},</span>
                  <span>{l.iast[1]}</span>
                </p>
                <p className="rs-ans-src">
                  {sourceLabel(l, locale)} · {l.who[locale]}
                </p>
                <dl>
                  <dt>{c.meaningLabel}</dt>
                  <dd>{l.meaning[locale]}</dd>
                  <dt>{c.youLabel}</dt>
                  <dd>{l.forYou[locale]}</dd>
                </dl>
                <p className="rs-ans-links">
                  <a href={lineHref(l.slug)} data-mp-location="rs_nine_line" {...lineNote}>
                    {c.readMore}
                  </a>
                  <a href={gitaHref(l, locale)} className="rs-gita-link" data-mp-location="rs_nine_gita">
                    {locale === 'hi' ? `गीता ${l.gita.chapter}.${l.gita.verse}` : `Gita ${l.gita.chapter}.${l.gita.verse}`}
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="rs-sec" id="next" data-mp-section="rs_next">
          <RsNext
            locale={locale}
            pageKey={pageKey}
            placement="page"
            copy={{ planTitle: ui.planTitle, planSub: ui.planSub, planBtn: ui.planBtn, planFree: ui.planFree, appLine: next.app.line, appBtn: next.app.cta }}
          />
        </section>

        <section className="rs-sec" id="faq" data-mp-section="rs_faq">
          <h2 className="rs-h2">{c.faqHeading}</h2>
          <div className="rs-faq">
            <details className="rs-more" id="how" data-mp-section="rs_how">
              <summary>{c.howHeading}</summary>
              <div>
                <ol className="rs-steps" lang={locale}>
                  {c.howSteps.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
                <p className="rs-rules">{c.howRules}</p>
              </div>
            </details>
            <details className="rs-more" id="grid" data-mp-section="rs_grid">
              <summary>{c.tableHeading}</summary>
              <div>
                <p className="rs-p">{c.tableNote}</p>
                <GridTable grid={getGrid()} caption={c.tableCaption} />
              </div>
            </details>
            {c.faq.map((f, i) => (
              <details key={i} className="rs-more">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="rs-sec" id="manas">
          <h2 className="rs-h2">{c.manasHeading}</h2>
          <p className="rs-p">
            {c.manasText}{' '}
            <a href="/ramayana" data-mp-location="rs_ramayana">
              {c.manasLink}
            </a>
            {locale === 'hi' ? '।' : '.'}
          </p>
        </section>

        <section className="rs-sec" id="sources">
          <h2 className="rs-h2">{c.sourcesHeading}</h2>
          <p className="rs-sources">{c.sources}</p>
        </section>
      </div>
    </main>
  )
}
