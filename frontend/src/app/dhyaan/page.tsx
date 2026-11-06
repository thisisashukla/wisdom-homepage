/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { BlogTracker } from '@/components/BlogTracker'
import Flame from './_components/Flame'
import WaitlistForm from './_components/WaitlistForm'
import FaqList from './_components/Faq'
import JsonLd from './_components/JsonLd'
import { words } from './_components/Words'
import Ribbon from './_components/home/Ribbon'
import Thoughts from './_components/home/Thoughts'
import SitLanes from './_components/home/SitLanes'
import Board from './_components/home/Board'
import { BudGlyph, Phone, Watch, WatchGlyph } from './_components/home/Devices'
import { FAQS, faqLd } from './_lib/faqs'
import { APP_LD, DHYAAN_URL, ORG_LD, pageMeta } from './_lib/site'

// Copy lives in dhyaan/lp/05-copy.md; every line there must appear here verbatim.
export const metadata = pageMeta({
  title: 'Dhyaan: sit in silence, then read what your body noticed',
  description:
    'Close your eyes with AirPods in and Apple Watch on. When the bell rings, Dhyaan reads your sit back to you. iPhone and Apple Watch, beta early 2027.',
  path: '/',
})

const homeFaqs = FAQS.filter((f) => f.home)
const S = '/dhyaan-assets/screens'


export default function DhyaanHome() {
  return (
    <>
      <BlogTracker pageName="Dhyaan Home" />
      <JsonLd
        data={[
          ORG_LD,
          APP_LD,
          { '@type': 'WebSite', '@id': `${DHYAAN_URL}/#website`, url: DHYAAN_URL, name: 'Dhyaan', publisher: { '@id': `${DHYAAN_URL}/#organization` } },
          faqLd(homeFaqs),
        ]}
      />

      {/* hero */}
      <section className="dh-h" id="join">
        <div className="dh-wrap dh-h__grid">
          <div className="dh-h__copy">
            <p className="dh-kicker dh-h__kicker">
              <BudGlyph size={16} />
              <WatchGlyph size={16} />
              For iPhone, Apple Watch and AirPods
            </p>
            <h1 className="dh-h__title">
              <span className="dh-h__soft">{words('The quiet you felt')}</span>
              <span className="dh-h__ink">{words('was real.', 4)}</span>
            </h1>
            <p className="dh-h__sub">
              Close your eyes with your AirPods in and your Watch on. When the bell rings, Dhyaan reads the sit back to you: the moment you arrived, how still
              you stayed, how far your heart came down.
            </p>
            <div className="dh-h__form">
              <WaitlistForm source="hero" cta="Save my place" />
            </div>
            <p className="dh-h__under">Every sit is free. No account. Invites go out in waitlist order.</p>
          </div>

          <div className="dh-h__stage" aria-label="Dhyaan on iPhone and Apple Watch">
            <div className="dh-h__glow" aria-hidden="true" />
            <Phone src={`${S}/today.webp`} alt="Dhyaan on iPhone after an evening sit: your hands arrived at 0:00, your heart settled from 74 to 68" className="dh-h__phone" eager />
            <Watch src={`${S}/watch-session.webp`} alt="A silent sit running on Apple Watch, 8:57 remaining" className="dh-h__watch" eager />
            <div className="dh-float dh-float--head">
              <p className="dh-float__k">
                <i /> Head · AirPods
              </p>
              <p className="dh-float__v">Two small nods, then still.</p>
              <span className="dh-float__bars" aria-hidden="true">
                {[9, 14, 7, 3, 2, 11, 2, 2, 2, 3, 2, 2].map((h, i) => (
                  <b key={i} style={{ height: h * 1.6, ['--i' as string]: i }} />
                ))}
              </span>
            </div>
            <div className="dh-float dh-float--heart">
              <p className="dh-float__k">
                <i /> Heart · Apple Watch
              </p>
              <p className="dh-float__v">Settled from 74 to 68.</p>
              <svg viewBox="0 0 120 28" width="120" height="28" aria-hidden="true">
                <path d="M2 4 C 22 5, 34 14, 52 20 S 90 24, 118 23" />
              </svg>
            </div>
          </div>
        </div>
        <Ribbon />
      </section>

      {/* doubt */}
      <section className="dh-doubt" id="doubt">
        <div className="dh-wrap dh-narrow" data-reveal>
          <p className="dh-kicker">The question after every sit</p>
          <h2>You open your eyes and wonder if anything happened.</h2>
          <Thoughts lines={['Was that even meditation?', 'I think I drifted the whole time.', 'Ten minutes. It felt like two.', 'Am I getting anywhere with this?']} />
          <p className="dh-doubt__body">You did the work. You sat in the dark and nothing answered back. So one week you just stop.</p>
        </div>
      </section>

      {/* witnesses */}
      <section className="dh-wit" id="witnesses">
        <div className="dh-wrap">
          <div className="dh-sec__head" data-reveal>
            <p className="dh-kicker">While your eyes are closed</p>
            <h2>Close your eyes. Something else will keep watch.</h2>
          </div>
          <SitLanes
            lanes={[
              {
                id: 'head',
                label: 'Head · AirPods',
                title: 'Your AirPods feel your head settle.',
                body: 'The small searching movements fade, then stop. If stillness slides into sleep, they notice the nod, so you never have to wonder.',
              },
              {
                id: 'hands',
                label: 'Hands · Apple Watch',
                title: 'Your Watch feels your hands go quiet.',
                body: 'Restless fingers, then nothing. The bell arrives as a tap on your wrist, so the room stays silent.',
              },
              {
                id: 'heart',
                label: 'Heart · Apple Watch',
                title: 'And it hears your heart come down.',
                body: 'From 74 to 68 over twelve minutes. Proof you can feel and finally see.',
              },
            ]}
            markers={['Arrived 0:17', 'Came back 7 times', 'Longest still 1:34']}
            note="Nothing beeps, glows or talks while you sit."
          />
        </div>
      </section>

      {/* reading */}
      <section className="dh-read" id="reading">
        <div className="dh-wrap">
          <div className="dh-sec__head" data-reveal>
            <p className="dh-kicker">After the bell</p>
            <h2>First you say how it felt. Then your body has its say.</h2>
          </div>
          <div className="dh-read__grid" data-reveal>
            <div className="dh-read__one">
              <Phone src={`${S}/reflection.webp`} alt="Dhyaan asks how was that sit: scattered, settled or absorbed" className="dh-read__phone" />
              <p className="dh-read__n">1</p>
              <p className="dh-read__t">Scattered, settled or absorbed. Your words go down before you see a single number, so nothing tells you how you should feel.</p>
            </div>
            <svg className="dh-read__link" viewBox="0 0 120 60" aria-hidden="true">
              <path d="M4 40 C 40 4, 80 4, 112 30" pathLength={1} />
              <path d="M104 22 L 113 31 L 101 34" pathLength={1} />
            </svg>
            <div className="dh-read__two">
              <img className="dh-cut dh-cut--ring" src={`${S}/reading-ring.webp`} alt="The reading: you felt settled and at ease, Sthir steadiness 74" width={1096} height={826} loading="lazy" />
              <img className="dh-cut dh-cut--moments" src={`${S}/reading-moments.webp`} alt="Your sit moment by moment: arrived 0:00, came back 7 times, longest still 1:34" width={1096} height={660} loading="lazy" />
              <p className="dh-read__n">2</p>
              <p className="dh-read__t">Then the reading. When you arrived. How often you wandered and came back. The longest you held still. How your heart settled.</p>
            </div>
          </div>
          <p className="dh-read__line" data-reveal>A reading, never a grade. Compared only with your own past sits.</p>
        </div>
      </section>

      {/* wrist */}
      <section className="dh-wrist" id="wrist">
        <div className="dh-wrap dh-wrist__grid">
          <div data-reveal>
            <p className="dh-kicker">Leave the phone in another room</p>
            <h2>Sit with empty hands.</h2>
            <p className="dh-wrist__body">
              Hold to begin on your wrist. Feel the bell instead of hearing it. Open your eyes to a reading already waiting on your phone.
            </p>
          </div>
          <div className="dh-wrist__stage" data-reveal>
            <Phone src={`${S}/session.webp`} alt="A silent sit on iPhone with the flame and 9:00 remaining" className="dh-wrist__phone" />
            <Watch src={`${S}/watch-ready.webp`} alt="Apple Watch ready to begin a 12 minute silent sit" className="dh-wrist__w1" />
          </div>
        </div>
      </section>

      {/* circle: the different leaderboard */}
      <section className="dh-circle" id="circle">
        <div className="dh-circle__panel">
          <div className="dh-wrap dh-circle__grid">
            <div data-reveal>
              <p className="dh-kicker">Sit together, from anywhere</p>
              <h2>A leaderboard where nobody loses.</h2>
              <p className="dh-circle__body">
                Your circle is ranked by the days you showed up, never by how still you were. Every lamp counts the same, and your readings never leave your
                phone.
              </p>
              <p className="dh-circle__line">Miss a day and nothing breaks. On Sunday every lamp starts fresh.</p>
            </div>
            <Board
              title="This week · Family"
              reset="Fresh on Sunday"
              rows={[
                { name: 'Maa', place: 'Pune', lamps: 5 },
                { name: 'You', place: 'Seattle', lamps: 4, you: true },
                { name: 'Rohan', place: 'London', lamps: 4, now: true },
                { name: 'Meera', place: 'Toronto', lamps: 2 },
              ]}
            />
          </div>
        </div>
      </section>

      {/* verse */}
      <section className="dh-verseblock">
        <div className="dh-wrap" data-reveal>
          <Flame size={84} />
          <p className="dh-verse" lang="sa">यथा दीपो निवातस्थो नेङ्गते सोपमा स्मृता</p>
          <p className="dh-en">“As a lamp in a windless place does not flicker, so is the steady mind of one who meditates.”</p>
          <p className="dh-muted" style={{ marginTop: 14 }}>
            Bhagavad Gita 6.19 · <Link href="/gita">Read the Gita on meditation</Link>
          </p>
          <div style={{ marginTop: 30 }}>
            <Link className="dh-btn dh-btn--ghost" href="/nivata" data-mp-location="verse_cta">
              Can you be the lamp for 60 seconds?
            </Link>
          </div>
        </div>
      </section>

      {/* faq */}
      <section className="dh-sec">
        <div className="dh-wrap dh-narrow">
          <div className="dh-sec__head">
            <p className="dh-kicker">Questions</p>
            <h2>Before you sit</h2>
          </div>
          <FaqList items={homeFaqs} />
          <p className="dh-small" style={{ marginTop: 18 }}>
            <Link href="/faq">All questions →</Link> &nbsp;·&nbsp; <Link href="/methods">How Dhyaan reads a sit, and what it can’t →</Link>
          </p>
        </div>
      </section>

      {/* join */}
      <section className="dh-join">
        <div className="dh-wrap dh-narrow" data-reveal>
          <Flame size={72} />
          <h2>Your first reading is waiting.</h2>
          <p className="dh-join__body">Beta invites go out in waitlist order. Every friend who joins with your link moves you up ten places.</p>
          <div className="dh-join__form">
            <WaitlistForm source="footer_cta" compact cta="Save my place" />
          </div>
        </div>
      </section>
    </>
  )
}
