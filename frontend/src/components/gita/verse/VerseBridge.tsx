/**
 * The one step from a verse page into Wisdom. When the verse is a day in one of the 7-verse
 * reading plans (English), that plan is the step, because it continues the same theme;
 * otherwise the device-aware funnel block ("Create my free Gita reading plan", the app on iPhone).
 *
 *   <VerseBridge chapter={2} verse={47} lang="en" plan={{ slug, label, day: 3 }} />
 *
 * Server component. Links: <loc>_plan_<slug>, or VerseFunnelCTA's funnel_cta_verse_<c>_<v>.
 */
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'
import './verse.css'

type Plan = { slug: string; label: string; day: number }

export default function VerseBridge({ chapter, verse, lang, plan }: { chapter: number; verse: number; lang: 'en' | 'hi'; plan?: Plan | null }) {
  if (plan && lang === 'en') {
    return (
      <a
        className="vp-bridge"
        href={`/gita-for/${plan.slug}#verse-${plan.day}`}
        data-mp-location={`verse_${chapter}_${verse}_plan_${plan.slug}`}
      >
        <span className="vp-kicker">A 7-verse reading plan</span>
        <span className="vp-bridge-head">The Gita on {plan.label.toLowerCase()}</span>
        <span className="vp-bridge-sub">This verse is day {plan.day}. Read all seven in order, one a day or in one sitting.</span>
        <span className="vp-bridge-cta">Open the plan →</span>
      </a>
    )
  }
  return <VerseFunnelCTA variant="verse" locale={lang} verse={{ chapter, verse }} />
}
