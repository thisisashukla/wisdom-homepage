/** The tool page, shared by /hi/ram-shalaka (Hindi, default) and /ram-shalaka (English twin). */
import PageTracker from '@/components/BlogTracker'
import { Faq, GitaBridge, JsonLd, PageHero, ScriptToggle, Section, VerseCard, VerseList } from '@/components/site'
import type { Locale } from '@/lib/locale'
import {
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
} from '@/lib/funnels/ram-shalaka'
import { toolJsonLd } from '@/lib/funnels/ram-shalaka/seo'
import GridTable from './GridTable'
import Ritual from './Ritual'
import ShalakaNext from './ShalakaNext'
import './shalaka.css'

export default function ToolPage({ locale }: { locale: Locale }) {
  const c = pageCopy(locale)
  const { ui, naam, next } = ritualCopy(locale)
  const lines = getLines()
  const other: Locale = locale === 'hi' ? 'en' : 'hi'
  const lineNote = locale === 'en' ? { hrefLang: 'hi' } : {}
  const plan = { planTitle: ui.planTitle, planSub: ui.planSub, planBtn: ui.planBtn, planFree: ui.planFree }

  return (
    <main className="fx-ram-shalaka" lang={locale}>
      <PageTracker pageName={locale === 'hi' ? 'Ram Shalaka Tool HI' : 'Ram Shalaka Tool'} />
      <JsonLd data={toolJsonLd(locale)} />

      <PageHero
        locale={locale}
        crumbs={[{ label: c.crumbSelf, href: toolHref(locale) }]}
        eyebrow={ui.srcPrefix}
        title={c.h1}
        sub={ui.rule}
        visual={
          <section className="rs-stage" aria-label={ui.kicker}>
            <Ritual locale={locale} cells={getCells()} lines={ritualLines(locale)} ui={ui} naam={naam} next={next} langHref={toolHref(other)} />
            <noscript>
              <p className="rs-noscript">{ui.noscript}</p>
            </noscript>
          </section>
        }
      />

      <Section id="what" title={c.whatHeading} track="rs_what" width="narrow" tone="band">
        <p className="sx-prose rs-lede" id="quick-answer">
          {c.quickAnswer}
        </p>
      </Section>

      <Section id="nine" title={c.nineHeading} intro={c.nineIntro} track="rs_nine">
        <div className="rs-tools">
          <ScriptToggle locale={locale} />
        </div>
        <VerseList columns={2}>
          {lines.map((l) => (
            <VerseCard
              key={l.k}
              as="li"
              id={`uttar-${l.n}`}
              label={<span className={`rs-tag ${l.sign}`}>{signName(l.sign, locale)}</span>}
              original={l.deva}
              iast={l.iast}
              lang="awa"
              meaning={l.meaning[locale]}
              source={`${sourceLabel(l, locale)} · ${l.who[locale]}`}
              size="compact"
              align="left"
              locale={locale}
              rv
              actions={
                <p className="rs-ans-links">
                  <a className="sx-btn sx-btn--link" href={lineHref(l.slug)} data-mp-location="rs_nine_line" {...lineNote}>
                    {c.readMore}
                  </a>
                  <GitaBridge
                    variant="inline"
                    href={gitaHref(l, locale)}
                    label={locale === 'hi' ? `गीता ${l.gita.chapter}.${l.gita.verse}` : `Gita ${l.gita.chapter}.${l.gita.verse}`}
                    location="rs_nine_gita"
                    from={`rs-${l.n}`}
                    locale={locale}
                  />
                </p>
              }
            >
              <dl className="rs-dl">
                <dt>{c.youLabel}</dt>
                <dd>{l.forYou[locale]}</dd>
              </dl>
            </VerseCard>
          ))}
        </VerseList>
      </Section>

      <Section id="next" track="rs_next" width="narrow" tone="band">
        <ShalakaNext locale={locale} placement="page" plan={plan} next={next} />
      </Section>

      <Section id="faq" title={c.faqHeading} track="rs_faq" width="narrow">
        <details className="rs-more" id="how" data-mp-section="rs_how" data-mp-disclosure="how_to_ask">
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
        <details className="rs-more" id="grid" data-mp-section="rs_grid" data-mp-disclosure="full_grid">
          <summary>{c.tableHeading}</summary>
          <div>
            <p>{c.tableNote}</p>
            <GridTable grid={getGrid()} caption={c.tableCaption} />
          </div>
        </details>
        <Faq items={c.faq} locale={locale} ld={false} />
      </Section>

      <Section id="manas" title={c.manasHeading} width="narrow" tone="band">
        <p className="sx-prose">
          {c.manasText}{' '}
          <a className="sx-link" href="/ramayana" data-mp-location="rs_ramayana">
            {c.manasLink}
          </a>
          {locale === 'hi' ? '।' : '.'}
        </p>
      </Section>

      <Section id="sources" title={c.sourcesHeading} width="narrow">
        <p className="rs-sources">{c.sources}</p>
      </Section>
    </main>
  )
}
