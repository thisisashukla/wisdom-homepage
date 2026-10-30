import type { Scene } from '@/lib/funnels/ramayana/types'
import { KAND_LABEL, lampViews } from '@/lib/funnels/ramayana/data'
import { PATHS } from '@/lib/funnels/ramayana/paths'
import ThreeLamps from './ThreeLamps'

/** The scene list in story order, each with its verdict and a small row of lamps that unfold in place. */
export default function SceneLedger({ scenes, locale, page, showQuick = false }: { scenes: Scene[]; locale: 'en' | 'hi'; page: string; showQuick?: boolean }) {
  const more = locale === 'hi' ? 'पूरा प्रसंग पढ़ें (अंग्रेज़ी में)' : 'Read the whole scene'
  return (
    <ol className="rl-ledger">
      {scenes.map((s) => (
        <li key={s.slug} className="rl-scene" id={s.slug}>
          <div className="rl-scene-head">
            <p className="rl-scene-kand">{KAND_LABEL[s.kand][locale]}</p>
            <h3 className="rl-h3 rl-scene-title">
              <a href={PATHS.scene(s.slug)} data-mp-location={`ledger_${s.slug}`} lang={locale === 'hi' ? 'hi' : undefined}>
                {s.title[locale]}
              </a>
            </h3>
          </div>
          <div className="rl-scene-body">
            <p className="rl-chip">{s.verdict[locale]}</p>
            <p className="rl-scene-answer">{s.question[locale]}</p>
            {showQuick && <p className="rl-p">{s.quick[locale]}</p>}
            <ThreeLamps scene={s.slug} lamps={lampViews(s, locale)} locale={locale} page={page} label={s.title[locale]} size="small" />
            <p className="rl-scene-more">
              <a href={PATHS.scene(s.slug)} data-mp-location={`ledger_more_${s.slug}`}>
                {more}
              </a>
            </p>
          </div>
        </li>
      ))}
    </ol>
  )
}
