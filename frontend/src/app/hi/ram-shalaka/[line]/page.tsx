import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageTracker from '@/components/BlogTracker'
import { Actions, GitaBridge, JsonLd, LinkCards, PageHero, ScriptToggle, Section, VerseCard, VerseList } from '@/components/site'
import ShalakaNext from '@/components/funnels/ram-shalaka/ShalakaNext'
import ShalakaShare from '@/components/funnels/ram-shalaka/ShalakaShare'
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
  ritualLines,
  signName,
  signNote,
  sourceLabel,
} from '@/lib/funnels/ram-shalaka'
import { lineJsonLd, lineMetadata } from '@/lib/funnels/ram-shalaka/seo'
import { SITE } from '@/lib/seo'

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
  const rl = ritualLines('hi')[l.k]
  const url = `${SITE}${lineHref(l.slug)}`
  const directive = (l.signText.hi.split('·').pop() || '').trim()
  const plan = { planTitle: ui.planTitle, planSub: ui.planSub, planBtn: ui.planBtn, planFree: ui.planFree }
  const copyText = [l.deva.join('\n'), '', l.meaning.hi, '', `श्रीरामचरितमानस, ${sourceLabel(l, 'hi')}`, url].join('\n')
  const shareText = [l.deva.join('\n'), '', l.meaning.hi, '', `${ui.shareAsk}: ${SITE}/hi/ram-shalaka?utm_source=whatsapp&utm_medium=share&utm_campaign=rs-${l.n}`].join('\n')

  return (
    <main className="fx-ram-shalaka" lang="hi">
      <PageTracker pageName="Ram Shalaka Line HI" />
      <JsonLd data={lineJsonLd(l)} />

      <PageHero
        locale="hi"
        lang="hi"
        crumbs={[
          { label: t.crumbSelf, href: '/hi/ram-shalaka' },
          { label: firstHalf(l), href: lineHref(l.slug) },
        ]}
        eyebrow={l.signText.hi}
        title={
          <>
            <span className="rs-h1-line">{l.deva[0]}</span>
            <span className="rs-h1-line">{l.deva[1]}</span>
            <small className="rs-h1-sub">{t.sub}</small>
          </>
        }
        sub={<span id="quick-answer">{l.quick.hi}</span>}
        facts={[`श्रीरामचरितमानस, ${sourceLabel(l, 'hi')}`, l.who.hi]}
        actions={[{ href: '/hi/ram-shalaka', label: t.ask, location: 'rs_line_hero_ask' }]}
        visual={
          <div className={`rs-line-seal ${l.sign}`} aria-hidden="true">
            <span className="rs-line-seal-word">{signName(l.sign, 'hi')}</span>
          </div>
        }
      />

      <Section id="unit" title={t.unitHeading} width="narrow" tone="band">
        <div className="rs-tools">
          <ScriptToggle locale="hi" />
        </div>
        <VerseList>
          {l.unit.map((p, i) => (
            <VerseCard
              key={i}
              as="li"
              label={p.answer ? t.answerTag : undefined}
              original={p.deva}
              iast={[`${p.iast[0]},`, p.iast[1]]}
              lang="awa"
              meaning={p.meaning.hi}
              locale="hi"
              rv
              actions={
                p.answer ? (
                  <ShalakaShare
                    line={rl}
                    locale="hi"
                    card={{
                      kicker: ui.kicker,
                      lead: ui.verdictLead,
                      directive,
                      source: `${ui.srcPrefix} · ${rl.source}`,
                      invite: ui.shareAsk,
                      host: `${SITE.replace(/^https?:\/\//, '')}/hi/ram-shalaka`,
                    }}
                    copyText={copyText}
                    shareText={shareText}
                    pageKey={`rs-${l.n}`}
                    props={{ k: l.k, sign: l.sign }}
                  />
                ) : undefined
              }
            >
              <p className="rs-en" lang="en">
                {p.meaning.en}
              </p>
            </VerseCard>
          ))}
        </VerseList>
      </Section>

      <Section id="arth" title={t.meaningHeading} width="narrow">
        <div className="sx-prose">
          <p className="rs-lede">{l.meaning.hi}</p>
          <p className="rs-en" lang="en">
            {t.inEnglish}: {l.meaning.en}
          </p>
        </div>
      </Section>

      <Section id="prasang" title={t.sceneHeading} width="narrow" tone="band">
        <div className="sx-prose">
          <p className="rs-lede">{l.scene.hi}</p>
          <p className="rs-en" lang="en">
            {t.inEnglish}: {l.scene.en}
          </p>
        </div>
      </Section>

      <Section id="aapse" title={t.youHeading} width="narrow">
        <div className="sx-prose">
          <p className="rs-lede">{l.forYou.hi}</p>
        </div>
        <h3 className="sx-h3 rs-sign-h">{t.signHeading}</h3>
        <p className="rs-sign-row">
          <span className={`rs-tag ${l.sign}`}>{l.signText.hi}</span>
        </p>
        <p className="sx-prose">{signNote(l.sign, 'hi')}</p>
        <Actions className="rs-line-actions" items={[{ href: '/hi/ram-shalaka', label: t.ask, location: 'rs_line_ask' }]} />
      </Section>

      <Section id="gita" title={t.gitaHeading} width="narrow" tone="band">
        <GitaBridge href={gitaHref(l, 'hi')} label={t.gitaLink} why={l.gita.note.hi} location="rs_line_gita" from={`rs-${l.n}`} locale="hi" />
      </Section>

      <Section id="next" track="rs_next" width="narrow">
        <ShalakaNext locale="hi" placement="line" plan={plan} next={next} n={l.n} />
      </Section>

      <Section id="more" width="narrow" tone="band">
        <nav aria-label={t.allNine}>
          <LinkCards
            items={[
              { href: lineHref(prev.slug), kicker: t.prev, title: firstHalf(prev), location: 'rs_line_prev' },
              { href: lineHref(nextLine.slug), kicker: t.next, title: firstHalf(nextLine), location: 'rs_line_next' },
            ]}
          />
        </nav>
        <Actions
          className="rs-line-more"
          items={[
            { href: '/hi/ram-shalaka#nine', label: t.allNine, location: 'rs_line_all', variant: 'link' },
            { href: '/ramayana', label: t.ramayana, location: 'rs_line_ramayana', variant: 'link' },
          ]}
        />
      </Section>

      <Section id="sources" title={t.sourcesHeading} width="narrow">
        <p className="rs-sources">{t.sources}</p>
      </Section>
    </main>
  )
}
