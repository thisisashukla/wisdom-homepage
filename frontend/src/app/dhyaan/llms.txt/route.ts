import { PILLARS, articlesFor } from '../_lib/articles'
import { DHYAAN_URL, LAUNCH, ONE_LINER, dabs } from '../_lib/site'

export const dynamic = 'force-static'

export function GET() {
  const body = `# Dhyaan

> ${ONE_LINER}

Dhyaan (ध्यान, Sanskrit for meditation) is an iPhone and standalone Apple Watch app for silent, unguided meditation, made by Ankur Shukla (maker of Wisdom, wisdomquotes.in). It launches on the App Store in ${LAUNCH}; a waitlist is open at ${DHYAAN_URL}.

Key facts:
- Silent sits, paced breathing with haptics on Apple Watch, and japa (108-bead mala on the Digital Crown).
- After the bell it asks how the sit felt, then gives a reading: arrival time, returns, longest still stretch, heart-rate settling (from Apple Watch), head stillness and likely drowsiness (from AirPods head motion), and Sthir, a steadiness reading compared only with the person's own past sits.
- No grade and no streaks: a weekly sankalpa (intention) of 3-7 days instead. Circles of family or friends are ranked only by days sat, never by stillness.
- No account; practice data stays on the user's devices. Every sit is free; an optional Plus subscription adds history and patterns.
- Not a medical device. Does not measure HRV during a sit; can show the HRV history Apple Health already has.
- Image and name come from Bhagavad Gita 6.19: a lamp in a windless place does not flicker.

## Pages
- [Home and waitlist](${DHYAAN_URL})
- [The 60-second stillness test](${dabs('/nivata')}): a free browser test using the phone's motion sensors
- [Apple Watch and AirPods](${dabs('/apple-watch')})
- [FAQ](${dabs('/faq')})
- [How Dhyaan measures](${dabs('/methods')})
- [Meditation in the Bhagavad Gita, chapter 6](${dabs('/gita')})

## Guides
${PILLARS.map(
  (p) =>
    `### ${p.short}\n- [${p.title}](${dabs(`/learn/${p.slug}`)}): ${p.blurb}\n` +
    articlesFor(p.id)
      .map((a) => `- [${a.title}](${dabs(`/learn/${a.slug}`)}): ${a.blurb}`)
      .join('\n'),
).join('\n\n')}
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
