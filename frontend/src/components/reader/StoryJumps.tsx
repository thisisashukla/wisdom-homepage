/**
 * Chapter 1 of the Gita is the battlefield roll call, and it is where readers who start at 1.1
 * give up: on /hi/gita, 1.1 gets about four times the views of 1.2. This card lets them keep
 * reading in order or jump to the moments the story turns. Shown on 1.1 to 1.27; from 1.28 the
 * story carries them.
 *
 *   <StoryJumps chapter={1} verse={4} lang="hi" />
 *
 * Server-rendered. Impression: Section Viewed { section: 'story_jumps' }. Taps: Link Clicked
 * with location story_jump_<chapter>_<verse>.
 */

import { verseUrl, type GitaLang } from '@/lib/gitaUrls'
import './reader.css'

const LAST_VERSE_SHOWN = 27

const JUMPS: { ch: number; vs: number; en: [string, string]; hi: [string, string] }[] = [
  { ch: 1, vs: 28, en: ['Arjuna breaks down', 'The war turns personal'], hi: ['अर्जुन टूट जाते हैं', 'जब युद्ध अपनों से हो जाता है'] },
  { ch: 2, vs: 11, en: ['Krishna speaks for the first time', 'Where the teaching begins'], hi: ['कृष्ण के पहले शब्द', 'यहीं से गीता का उपदेश शुरू होता है'] },
  { ch: 2, vs: 47, en: ['Karmanye vadhikaraste', 'The verse most people come looking for'], hi: ['कर्मण्येवाधिकारस्ते', 'जिस श्लोक को सबसे ज़्यादा लोग खोजते हैं'] },
]

const COPY = {
  en: { eyebrow: 'The story turns soon', lead: 'Chapter 1 sets up the battlefield. Keep reading in order, or step straight into the moments that change everything.' },
  hi: { eyebrow: 'कहानी जल्द ही मुड़ती है', lead: 'पहला अध्याय युद्धभूमि सजाता है। क्रम से पढ़ते रहें, या सीधे उन पलों में उतरें जहाँ सब बदल जाता है।' },
} as const

export default function StoryJumps({ chapter, verse, lang }: { chapter: number; verse: number; lang: GitaLang }) {
  if (chapter !== 1 || verse > LAST_VERSE_SHOWN) return null
  const t = COPY[lang]
  return (
    <section className="rd-jumps" lang={lang} data-mp-section="story_jumps" aria-label={t.eyebrow}>
      <p className="sx-eyebrow">{t.eyebrow}</p>
      <p className="rd-jumps-lead">{t.lead}</p>
      <ul className="rd-jumps-list">
        {JUMPS.map((j) => {
          const [title, sub] = j[lang]
          return (
            <li key={`${j.ch}.${j.vs}`}>
              <a href={verseUrl(j.ch, j.vs, lang)} data-mp-location={`story_jump_${j.ch}_${j.vs}`}>
                <span className="rd-jumps-text">
                  <span className="rd-jumps-title">
                    <span className="rd-ref">{j.ch}.{j.vs}</span> · {title}
                  </span>
                  <span className="rd-jumps-sub">{sub}</span>
                </span>
                <span aria-hidden="true">→</span>
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
