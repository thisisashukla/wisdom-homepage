import { EVENTS } from '@/lib/analytics/events'
import { LEARNING_PATH, stepUrl, type PathLang } from '@/lib/learningPath'
import './learn.css'

const COPY = {
  en: {
    verses: (title: string) => `Read the verses on ${title.toLowerCase()}`,
    plan: (label: string) => `Seven verses for ${label.toLowerCase()}`,
  },
  hi: {
    verses: (title: string) => `${title} पर गीता के श्लोक पढ़ें`,
    plan: (label: string) => `${label}: सात श्लोक (अंग्रेज़ी में)`,
  },
} as const

/**
 * The 12 key ideas in reading order, as a numbered list: title, Sanskrit term, intro, why it sits
 * there, and links to its verses (and a seven-verse plan when there is one). One list for
 * /gita/key-ideas (lang "en") and /hi/gita/mool-shabd (lang "hi").
 * Links send Link Clicked (data-mp-location "<from>_<slug>_...") and Learning Path Step Clicked
 * { item_id: slug, item_type: 'key_idea', position, from }.
 */
export default function KeyIdeasList({ lang, from }: { lang: PathLang; from: string }) {
  const c = COPY[lang]
  return (
    <ol className="lp-list" data-stagger="60">
      {LEARNING_PATH.map((s, i) => {
        const href = stepUrl(s, lang)
        const ev = {
          'data-mp-event': EVENTS.LearningPathStepClicked,
          'data-mp-props': JSON.stringify({ item_id: s.slug, item_type: 'key_idea', position: i + 1, from }),
        }
        return (
          <li key={s.slug} className="lp-item rv">
            <span className="lp-num" aria-hidden="true">
              {i + 1}
            </span>
            <h3 className="lp-item-title">
              <a href={href} data-mp-location={`${from}_${s.slug}_title`} {...ev}>
                {s.title[lang]}
              </a>
            </h3>
            {(lang === 'en' || s.term !== s.title.hi) && (
              <span className="lp-item-term" lang="sa">
                {s.term}
              </span>
            )}
            <p className="lp-item-intro">{s.intro[lang]}</p>
            <p className="lp-item-why">{s.why[lang]}</p>
            <p className="lp-item-links">
              <a href={href} data-mp-location={`${from}_${s.slug}_verses`} {...ev}>
                {c.verses(s.title[lang])}
              </a>
              {s.plan && (
                <a href={s.plan.href} hrefLang={lang === 'hi' ? 'en' : undefined} data-mp-location={`${from}_${s.slug}_plan`}>
                  {c.plan(s.plan.label[lang])}
                </a>
              )}
            </p>
          </li>
        )
      })}
    </ol>
  )
}
