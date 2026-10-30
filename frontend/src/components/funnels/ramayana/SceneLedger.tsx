import type { Scene } from '@/lib/funnels/ramayana/types'
import { KAND_LABEL, lampViews } from '@/lib/funnels/ramayana/data'
import { PATHS } from '@/lib/funnels/ramayana/paths'
import ThreeLamps from './ThreeLamps'

/** The scene list in story order: one card per scene, its verdict, and a small row of lamps that unfold in place. */
export default function SceneLedger({ scenes, locale, page, showQuick = false }: { scenes: Scene[]; locale: 'en' | 'hi'; page: string; showQuick?: boolean }) {
  const more = locale === 'hi' ? 'पूरा प्रसंग पढ़ें (अंग्रेज़ी में)' : 'Read the whole scene'
  return (
    <div>
      <ol className="rl-ledger">
      {scenes.map((s, i) => (
        <li key={s.slug} className="rl-scene rv" id={s.slug}>
          <div className="rl-scene-info">
            <p className="rl-scene-kand">
              <span className="rl-scene-n">{i + 1}</span>
              {KAND_LABEL[s.kand][locale]}
            </p>
            <h3 className="rl-h3 rl-scene-title">
              <a href={PATHS.scene(s.slug)} data-mp-location={`ledger_${s.slug}`} lang={locale === 'hi' ? 'hi' : undefined}>
                {s.title[locale]}
              </a>
            </h3>
            <p className="rl-scene-verdict">{s.verdict[locale]}</p>
            <p className="rl-scene-answer">{s.question[locale]}</p>
            {showQuick && <p className="rl-scene-quick">{s.quick[locale]}</p>}
          </div>
          <ThreeLamps scene={s.slug} lamps={lampViews(s, locale)} locale={locale} page={page} label={s.title[locale]} size="small" />
          <p className="rl-scene-more">
            <a href={PATHS.scene(s.slug)} data-mp-location={`ledger_more_${s.slug}`}>
              {more}
            </a>
          </p>
        </li>
      ))}
      </ol>
    </div>
  )
}
