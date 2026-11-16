import chaptersJson from '@/content/gita/chapters.json'
import { getListenSessions } from '@/lib/listenServer'
import { minutesLabel, sessionUrl, type ListenLang } from '@/lib/listen'
import ListenResumeCard from './ListenResumeCard'
import './listen.css'

/**
 * Listen hub (/gita/listen, /hi/gita/listen): every chapter as a list of 10 to 15 minute sessions,
 * plus "continue where you stopped" for returning listeners.
 */

const CH = new Map((chaptersJson as { number: number; enName: string; hiName: string; enTitle?: string }[]).map((c) => [c.number, c]))

const T = {
  en: {
    title: 'Listen to the Gita',
    lead: 'Every verse recited in Sanskrit, with a short narration before it and its meaning after. Sit for one session of ten to fifteen minutes, or let it carry you from one to the next.',
    ways: [['With meaning', 'a few lines on what to listen for, the verse, then what it says'], ['Recitation only', 'the Sanskrit, verse after verse, for paath']] as [string, string][],
    ch: 'Chapter',
    verses: (a: number, b: number) => `Verses ${a} to ${b}`,
  },
  hi: {
    title: 'गीता सुनिए',
    lead: 'हर श्लोक संस्कृत में, उससे पहले दो पंक्तियाँ कि क्या सुनना है, और बाद में उसका अर्थ। दस से पंद्रह मिनट का एक सत्र सुनिए, या एक के बाद एक सुनते जाइए।',
    ways: [['अर्थ सहित', 'पहले कुछ पंक्तियाँ, फिर श्लोक, फिर उसका अर्थ'], ['केवल पाठ', 'श्लोक के बाद श्लोक, पाठ के लिए']] as [string, string][],
    ch: 'अध्याय',
    verses: (a: number, b: number) => `श्लोक ${a} से ${b}`,
  },
} as const

export default function ListenHub({ lang }: { lang: ListenLang }) {
  const t = T[lang]
  const all = getListenSessions()
  const chapters = Array.from(new Set(all.map((s) => s.chapter))).sort((a, b) => a - b)
  return (
    <main className="lh" lang={lang}>
      <h1 className="lh-title">{t.title}</h1>
      <p className="lh-lead">{t.lead}</p>
      <ul className="lh-ways">
        {t.ways.map(([k, d]) => (
          <li key={k}><strong>{k}</strong>, {d}</li>
        ))}
      </ul>
      <ListenResumeCard lang={lang} />
      {chapters.map((c) => {
        const ch = CH.get(c)
        const list = all.filter((s) => s.chapter === c)
        return (
          <section key={c} className="lh-ch" aria-labelledby={`lh-ch-${c}`}>
            <h2 className="lh-ch-h" id={`lh-ch-${c}`}>
              <span className="lh-ch-n">{c}</span>
              <span>{ch ? (lang === 'hi' ? ch.hiName : ch.enName) : `${t.ch} ${c}`}</span>
            </h2>
            <ol className="lh-list">
              {list.map((s) => (
                <li key={s.id} className="lh-row">
                  <a href={sessionUrl(s.chapter, s.n, lang)} data-mp-location={`listen_hub_${s.id}`}>
                    <span className="lh-row-t">{s.title[lang]}</span>
                    <span className="lh-row-m">{minutesLabel(s.dur[lang], lang)}</span>
                    <span className="lh-row-s">{t.verses(s.from, s.to)}</span>
                  </a>
                </li>
              ))}
            </ol>
          </section>
        )
      })}
    </main>
  )
}
