import Link from 'next/link'
import Article from '../_components/Article'
import { pageMeta } from '../_lib/site'

const PATH = '/methods'
const TITLE = 'How Dhyaan measures a sit, and what it can’t'
const DESC =
  'The signals Dhyaan reads from iPhone, Apple Watch and AirPods, what each one can really tell you, where it falls short, and why you will never see a grade.'

export const metadata = pageMeta({ title: TITLE, description: DESC, path: PATH, type: 'article' })

export default function MethodsPage() {
  return (
    <Article
      path={PATH}
      title={TITLE}
      standfirst={DESC}
      published="2026-11-06"
      section="Methods"
      cover="measuring"
      trackName="Dhyaan Methods"
      answer={
        <p>
          Dhyaan measures stillness, how your heart rate settled, and signs of drowsiness, always against your own past sits. You describe the sit in your
          own words first. Each reading tells you how much of the sit its sensor actually saw, and the readings are never rolled into a score. We&apos;ll
          add validation results to this page before launch.
        </p>
      }
      refs={[
        { text: 'Brown L et al. (2021). Mindfulness, meditation and vagally mediated HRV: a meta-analysis. Psychosomatic Medicine.' },
        { text: 'Acabchuk RL et al. (2020). Measuring meditation progress with a consumer-grade EEG device: caution from a randomized controlled trial. Mindfulness.' },
        { text: 'Seli P et al. (2014). Restless mind, restless body. Journal of Experimental Psychology: Learning, Memory, and Cognition.' },
        { text: 'Wielgosz J et al. (2016). Long-term mindfulness training is associated with reliable differences in resting respiration rate. Scientific Reports.' },
        { text: 'Cearns M, Clark SR (2023). 280,000+ digital meditation sessions. JMIR.' },
      ]}
      related={[
        { href: '/learn/is-my-meditation-working', label: 'How to know if your meditation is working' },
        { href: '/learn/heart-rate-during-meditation', label: 'What happens to your heart rate when you meditate' },
        { href: '/privacy', label: 'Privacy' },
      ]}
    >
      <p>
        If an app is going to tell you something about your meditation, you deserve to know how it got there. This page is that, for Dhyaan: what it reads,
        what it shows you, where it&apos;s blind, and how we plan to check our own work.
      </p>

      <h2>What Dhyaan reads</h2>
      <p>
        Stillness comes from whichever device you&apos;re using. That might be the iPhone&apos;s motion sensors with the phone held in your palms, Apple Watch
        wrist motion, or AirPods head motion. On the device, raw motion is boiled down to a few per-second features and the raw stream is thrown away.
      </p>
      <p>
        Heart rate comes from Apple Watch during the sit: where it started, how it settled, and where it ended. AirPods add nods and slumps, which are the
        clearest signs of drowsiness. And before any number appears, Dhyaan asks you how the sit felt. Your words are part of the reading.
      </p>

      <h2>What Dhyaan shows</h2>
      <table>
        <thead>
          <tr>
            <th>Reading</th>
            <th>What it tells you</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Arrival</td>
            <td>How long it took until you were still for a full minute</td>
          </tr>
          <tr>
            <td>Steadiness (Sthir)</td>
            <td>How steady you stayed once you arrived, with a timeline of movements</td>
          </tr>
          <tr>
            <td>Returns</td>
            <td>How often you moved and settled again</td>
          </tr>
          <tr>
            <td>Heart settle</td>
            <td>Start and end heart rate, set against your usual for the same practice</td>
          </tr>
          <tr>
            <td>Leaning</td>
            <td>Restless, balanced or heavy, so a dozing sit isn&apos;t mistaken for a deep one</td>
          </tr>
          <tr>
            <td>Coverage</td>
            <td>How much of the sit each sensor saw. A reading with low coverage is labelled that way</td>
          </tr>
        </tbody>
      </table>

      <h2>Where it&apos;s blind</h2>
      <p>
        Dhyaan can&apos;t tell whether your mind was wandering. Stillness is a reasonable stand-in for attention, and it stops there. Very still can also mean
        sleepy, so drowsiness gets its own reading and is never rewarded as depth.
      </p>
      <p>
        It doesn&apos;t measure HRV during a sit. In that window HRV mostly reflects your breathing, and Apple Watch doesn&apos;t give apps live beat-to-beat
        intervals anyway. It can show you the HRV history Apple Health already keeps.
      </p>
      <p>
        Practices differ, too. An energising practice ought to raise your heart rate, so a sit is only ever compared with sits of the same type. And Dhyaan is
        not a medical device. It doesn&apos;t diagnose anything.
      </p>

      <h2>Why there&apos;s no grade</h2>
      <p>
        Combine everything into one number and the number becomes the goal. It rewards sitting rigidly, and it can sit flat for months while you quietly get
        better. The best-funded attempt at a meditation score so far, consumer EEG, failed to track progress in a randomised trial.
      </p>
      <p>
        So Dhyaan keeps each measure separate and descriptive, and compares Sthir only with your own past sits. At the centre it puts the one thing fully in
        your hands: turning up each week.
      </p>

      <h2>Validation</h2>
      <p>
        Before launch we&apos;ll publish two comparisons with the raw numbers: Apple Watch heart-rate settling against a Polar H10 chest strap, and phone and
        AirPods stillness against video-coded movement. If you&apos;re a researcher or a long-time sitter and would like to help, <Link href="/#join">join the
        waitlist</Link> and reply to the first email.
      </p>
    </Article>
  )
}
