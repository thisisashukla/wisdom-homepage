import { EVENTS } from '@/lib/analytics/events'
import { LEARNING_PATH, PATH_HUB, PATH_LENGTH, pathPosition, stepUrl, type LearningStep, type PathLang } from '@/lib/learningPath'
import './learn.css'

const COPY = {
  en: {
    count: (n: number, total: number) => `Key idea ${n} / ${total}`,
    label: 'Gita learning path',
    hub: (total: number) => `All ${total} key ideas`,
    prev: 'Before this',
    next: 'Next idea',
    start: 'Start of the path',
    startBody: 'This is where the path begins. The whole list is on one page.',
    end: 'The last idea',
    endBody: 'You have reached the end of the path. Read the whole list again from the start.',
    plan: 'Seven verses on this, one a day:',
  },
  hi: {
    count: (n: number, total: number) => `मूल शब्द ${n} / ${total}`,
    label: 'गीता के मूल शब्द',
    hub: (total: number) => `गीता के सभी ${total} मूल शब्द`,
    prev: 'पिछला',
    next: 'अगला मूल शब्द',
    start: 'मार्ग की शुरुआत',
    startBody: 'मार्ग यहीं से शुरू होता है। पूरी सूची एक पेज पर है।',
    end: 'अंतिम मूल शब्द',
    endBody: 'आप मार्ग के अंत तक पहुँच गए हैं। पूरी सूची फिर से शुरू से पढ़ें।',
    plan: 'इस पर सात श्लोक, रोज़ एक (अंग्रेज़ी में):',
  },
} as const

/**
 * The learning-path footer for a Gita topic hub: where this idea sits on the path of twelve,
 * the previous and next idea with their one-liners, and the matching seven-verse plan.
 * Renders nothing for topics that are not on the path.
 * Clicks send Learning Path Step Clicked {from, to, position} via BlogTracker (data-mp-event);
 * `position` is the 1-based position of the step clicked to.
 */
export default function PathNav({ slug, lang = 'en' }: { slug: string; lang?: PathLang }) {
  const at = pathPosition(slug)
  if (!at) return null
  const t = COPY[lang]
  const { step, position, prev, next } = at
  const loc = lang === 'hi' ? `topic_hi_${slug}_path` : `topic_${slug}_path`
  const props = (step: LearningStep) =>
    JSON.stringify({ item_id: step.slug, item_type: 'key_idea', position: LEARNING_PATH.indexOf(step) + 1, from: slug })
  const title = (s: LearningStep) => (
    <>
      <span className="lp-title">
        {s.title[lang]}
        {lang === 'en' && (
          <span className="lp-term" lang="sa">
            {s.term}
          </span>
        )}
      </span>
      <span className="lp-why">{s.why[lang]}</span>
    </>
  )

  return (
    <nav className="lp-nav" aria-label={t.label} lang={lang} data-mp-section="learning_path">
      <div className="lp-head">
        <p className="lp-count">{t.count(position, PATH_LENGTH)}</p>
        <a className="lp-hub" href={PATH_HUB[lang]} data-mp-location={`${loc}_hub`}>
          {t.hub(PATH_LENGTH)}
        </a>
      </div>
      <ol className="lp-dots" aria-hidden="true">
        {LEARNING_PATH.map((s, i) => (
          <li key={s.slug} className={i + 1 < position ? 'is-done' : i + 1 === position ? 'is-here' : undefined} />
        ))}
      </ol>
      <p className="lp-here">{step.why[lang]}</p>
      <ul className="lp-pair">
        <li>
          {prev ? (
            <a
              className="lp-card"
              href={stepUrl(prev, lang)}
              data-mp-location={`${loc}_prev`}
              data-mp-event={EVENTS.LearningPathStepClicked}
              data-mp-props={props(prev)}
            >
              <span className="lp-kicker">{t.prev}</span>
              {title(prev)}
            </a>
          ) : (
            <a className="lp-card" href={PATH_HUB[lang]} data-mp-location={`${loc}_start`}>
              <span className="lp-kicker">{t.start}</span>
              <span className="lp-why">{t.startBody}</span>
            </a>
          )}
        </li>
        <li>
          {next ? (
            <a
              className="lp-card lp-card--next"
              href={stepUrl(next, lang)}
              data-mp-location={`${loc}_next`}
              data-mp-event={EVENTS.LearningPathStepClicked}
              data-mp-props={props(next)}
            >
              <span className="lp-kicker">{t.next}</span>
              {title(next)}
            </a>
          ) : (
            <a
              className="lp-card lp-card--next"
              href={stepUrl(LEARNING_PATH[0], lang)}
              data-mp-location={`${loc}_restart`}
              data-mp-event={EVENTS.LearningPathStepClicked}
              data-mp-props={props(LEARNING_PATH[0])}
            >
              <span className="lp-kicker">{t.end}</span>
              <span className="lp-why">{t.endBody}</span>
            </a>
          )}
        </li>
      </ul>
      {step.plan && (
        <p className="lp-plan">
          {t.plan}{' '}
          <a href={step.plan.href} hrefLang={lang === 'hi' ? 'en' : undefined} data-mp-location={`${loc}_plan`}>
            {step.plan.label[lang]}
          </a>
        </p>
      )}
    </nav>
  )
}
