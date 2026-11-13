import { sanskritPadas } from '@/lib/devanagari'
import { verseUrl } from '@/lib/gitaUrls'
import { LENGTH_PLANS, TIME_PICKS, type LengthPlanKey } from '@/lib/readingPlans'
import type { LinkCard } from '@/components/site'
import './length-plans.css'

type VerseLike = { chapter: number; verse: number; sanskrit: string; englishTranslation: string; speaker?: string }

/** The verse to stop on in a day: label, the Sanskrit (speaker line dropped), the meaning; links to the verse page. */
export function StopVerse({ v, label, location }: { v: VerseLike; label?: string; location: string }) {
  const rows = sanskritPadas(v.sanskrit)
  const padas = rows.length > 2 && !/[।॥]/.test(rows[0]) ? rows.slice(1) : rows
  return (
    <a className="rpl-stop" href={verseUrl(v.chapter, v.verse)} data-mp-location={location}>
      <span className="rpl-stop-k">{label ?? `Stop on ${v.chapter}.${v.verse}`}</span>
      <span className="rpl-stop-sa" lang="sa">
        {padas.map((p, i) => (
          <span key={i}>{p}</span>
        ))}
      </span>
      <span className="rpl-stop-en">“{v.englishTranslation}”</span>
    </a>
  )
}

/** "How much time do you have each day?" Rows that read as a sentence and open a plan. */
export function TimePicker({ location, exclude }: { location: string; exclude?: LengthPlanKey }) {
  return (
    <ul className="rpl-pick">
      {TIME_PICKS.filter((t) => t.plan !== exclude).map((t) => {
        const p = LENGTH_PLANS.find((x) => x.key === t.plan)!
        return (
          <li key={t.plan}>
            <a href={p.href} data-mp-location={`${location}_${t.plan}`}>
              <span className="rpl-pick-time">{t.time}</span>
              <span className="rpl-pick-what">{t.detail}</span>
              <span className="rpl-pick-go">{p.title}</span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}

/** The length plans as kit LinkCards with their map pictures, minus the current page. */
export function lengthPlanCards(location: string, exclude?: LengthPlanKey): LinkCard[] {
  return LENGTH_PLANS.filter((p) => p.key !== exclude).map((p) => ({
    href: p.href,
    title: p.title,
    kicker: `${p.span}, ${p.daily}`,
    body: p.sub,
    location: `${location}_${p.key}`,
    img: { src: p.img, alt: `${p.title}: Bhagavad Gita reading plan, ${p.span}, drawn on a map of all 700 verses`, width: 1200, height: 675, position: 'center' },
  }))
}
