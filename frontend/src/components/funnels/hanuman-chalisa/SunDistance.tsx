/**
 * Chaupai 18 (jug sahasra jojan par bhānū) and the sun-distance sum that travels with it.
 * Server block for the line page: what the sum is, what each number rests on, and what the
 * line says. Sources at the end. FAQ JSON-LD comes from <Faq>.
 */

import { Faq } from '@/components/site'

/** Mean Earth to sun distance: 1 astronomical unit (IAU 2012). */
const AU_KM = 149_597_870.7
const AU_MILES = 92_955_807

const sum = (mi: number) => 12_000 * 1_000 * mi
const fmtM = (n: number) => `${Math.round(n / 1_000_000)} million`

export const SUN_FAQ = [
  {
    q: 'Does the Hanuman Chalisa give the distance from the Earth to the sun?',
    a: `Not in so many words. A popular sum reads jug as 12,000, sahasra as 1,000 and a yojana as 8 miles, and gets 96 million miles, close to the real ${fmtM(
      AU_MILES,
    )} miles. The match depends on choosing those values: old texts give the yojana lengths from about 4 to 15 km, and many readers take "jug sahasra" to mean "thousands upon thousands". The line itself tells of the child Hanuman leaping for the rising sun, taking it for a fruit.`,
  },
  {
    q: 'What does "jug sahasra jojan par bhanu" mean?',
    a: 'The sun stood thousands upon thousands of yojanas away, and you swallowed it, taking it for a sweet fruit. It is chaupai 18 of the Hanuman Chalisa, and it recalls a story Jambavan tells in the Valmiki Ramayana.',
  },
]

export default function SunDistance() {
  return (
    <div className="hc-sun sx-prose rv">
      <p>
        A sum about this line travels on WhatsApp and across the web. Take one <em>jug</em> (yuga) as 12,000 years, <em>sahasra</em> as
        1,000 and one <em>jojan</em> (yojana) as 8 miles, multiply, and you get <strong>{fmtM(sum(8))} miles</strong>. The mean distance
        from the Earth to the sun is about {fmtM(AU_MILES)} miles ({(AU_KM / 1_000_000).toFixed(1)} million km).
      </p>
      <p>The arithmetic is right. Each number in it is a choice, though, and the result moves a long way when the choice changes.</p>

      <dl className="hc-sun-list">
        <div>
          <dt>Jug</dt>
          <dd>
            As a number, a yuga can be 12,000 divine years (a full cycle of four ages) or the length of any one of those ages, which differ
            hugely. Many readers do not count it at all: they take <em>jug sahasra</em> together, &ldquo;thousands upon thousands&rdquo;,
            the way a poet says very far.
          </dd>
        </div>
        <div>
          <dt>Jojan</dt>
          <dd>
            Old Indian texts give the yojana very different lengths. The Surya Siddhanta and Aryabhata used about 8 km (5 miles); the
            14th-century astronomer Parameshvara about 13 km; historians&apos; estimates run from about 4 to 15 km. With 5 miles the same
            sum gives {fmtM(sum(5))} miles. With 9 miles it gives {fmtM(sum(9))}.
          </dd>
        </div>
        <div>
          <dt>The line</dt>
          <dd>
            Tulsidas writes no multiplication. He is telling a story Jambavan recalls in the Valmiki Ramayana: a child sees the rising sun,
            takes it for a fruit and leaps into the sky to seize it.
          </dd>
        </div>
      </dl>

      <p>
        So the match holds only with the two values that make it hold. Read as Tulsidas wrote it, the line is about a child so sure of his
        strength that the sun looked like fruit within reach, and that is the Hanuman the Chalisa asks you to call on.
      </p>

      <Faq items={SUN_FAQ} className="hc-gap" />

      <p className="hc-small hc-gap">
        Sources: yojana lengths from the Surya Siddhanta, Aryabhata, Parameshvara and Alexander Cunningham, as collected in Wikipedia&apos;s
        &ldquo;Yojana&rdquo;; the Earth to sun distance is one astronomical unit, {AU_KM.toLocaleString('en-US')} km (International
        Astronomical Union, 2012); the story is Valmiki Ramayana, Kishkindha Kanda 4.66.
      </p>
    </div>
  )
}
