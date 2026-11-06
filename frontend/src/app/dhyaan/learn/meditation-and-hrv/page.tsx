import Link from 'next/link'
import Article from '../../_components/Article'
import { pageMeta } from '../../_lib/site'
import { doi, pmid, pubmed } from '../../_lib/refs'

const PATH = '/learn/meditation-and-hrv'
const TITLE = 'Does meditation increase HRV? What the research actually shows'
const DESC =
  'Your HRV jumps during a sit. Most of that jump comes from slow breathing, and 19 trials found little lasting change. Here is how to read the number on your watch.'

export const metadata = pageMeta({ title: TITLE, description: DESC, path: PATH, type: 'article' })

export default function Page() {
  return (
    <Article
      path={PATH}
      title={TITLE}
      standfirst={DESC}
      published="2026-11-06"
      trackName="Dhyaan Learn HRV"
      pillar="measuring"
      answer={
        <p>
          During a sit, usually yes. Slow breathing makes your heart speed up and slow down with every breath, and HRV measures exactly that swing.
          Over months the evidence is much weaker. A 2021 meta-analysis of 19 randomised trials found no reliable rise in resting HRV from mindfulness
          training. A high reading after a sit mostly tells you how slowly you breathed.
        </p>
      }
      refs={[
        { text: 'Brown L, Rando AA, Eichel K, Van Dam NT, Celano CM, Huffman JC, Morris ME (2021). The effects of mindfulness and meditation on vagally mediated heart rate variability: a meta-analysis. Psychosomatic Medicine 83(6):631-640.', href: pmid('33395216') },
        { text: 'Lehrer PM, Gevirtz R (2014). Heart rate variability biofeedback: how and why does it work? Frontiers in Psychology 5:756.', href: doi('10.3389/fpsyg.2014.00756') },
        { text: 'Shaffer F, Ginsberg JP (2017). An overview of heart rate variability metrics and norms. Frontiers in Public Health 5:258.', href: doi('10.3389/fpubh.2017.00258') },
        { text: 'Heart rate variability during mindful breathing meditation (2023). Frontiers in Physiology 13:1017350.', href: doi('10.3389/fphys.2022.1017350') },
        { text: 'Léonard A, Clément S, Kuo CD, Manto M (2019). Changes in heart rate variability during heartfulness meditation: a power spectral analysis including the residual spectrum. Frontiers in Cardiovascular Medicine 6:62.', href: doi('10.3389/fcvm.2019.00062') },
        { text: 'Zaccaro A et al. (2018). How breath-control can change your life: a systematic review on psycho-physiological correlates of slow breathing. Frontiers in Human Neuroscience.', href: pubmed('How breath-control can change your life: a systematic review on psycho-physiological correlates of slow breathing') },
        { text: 'Apple Support: Start a Reflect or Breathe session on Apple Watch.', href: 'https://support.apple.com/guide/watch/apd371dfe3d7/watchos' },
      ]}
    >
      <p>
        You finish twenty minutes on the cushion, open the Health app, and there it is: an HRV reading far above your usual morning number. It feels like a
        grade. The sit went well, the body agrees, and you have a number to prove it.
      </p>
      <p>
        I wanted that to be true when I started building Dhyaan. It mostly isn&apos;t, and the reason is worth five minutes of your time, since it changes how
        you read every number your watch gives you.
      </p>

      <h2>What HRV is measuring</h2>
      <p>
        Your heart doesn&apos;t keep time like a metronome. Breathe in and it speeds up a little. Breathe out and it eases off. HRV, heart-rate variability,
        measures how much the gap between beats wanders. People with a higher resting HRV tend to be healthier, with a nervous system that can drop into
        rest more easily, so the number has earned some respect.
      </p>
      <p>
        One catch before we go further. Devices disagree on how to calculate it. Chest straps and recovery apps often use a measure called RMSSD. Apple Watch
        reports SDNN. They run on different scales, so a 60 from one app and a 60 from another are two different 60s.
      </p>

      <h2>Why it jumps while you sit</h2>
      <p>
        Slow your breathing to somewhere between five and seven breaths a minute and something neat happens. The reflexes that keep your blood pressure
        steady fall into step with your breath, and the rise and fall of your heart rate gets much bigger. Clinicians use this on purpose. They call it HRV
        biofeedback, and it works whatever is going on in your head. You could breathe slowly while planning dinner and your HRV would still climb.
      </p>
      <p>
        Plenty of meditation styles slow the breath without trying to. So HRV goes up during the sit, and it&apos;s tempting to credit the meditation. Studies
        that keep breathing constant tell a different story. The meditation effect shrinks, or wobbles from study to study. One group of researchers
        recorded experienced heartfulness meditators and found less vagal activity during deep meditation than when the same people simply breathed at
        a matched pace.
      </p>
      <p>
        There&apos;s a measurement quirk on top. RMSSD tends to undercount variability when breathing gets very slow, so two apps can read the same sit and
        disagree.
      </p>

      <h2>Does it rise over months?</h2>
      <p>
        Here&apos;s where the marketing outruns the science. In 2021 a team pooled 19 randomised controlled trials of seated mindfulness and meditation
        programmes that tracked resting vagal HRV. Against control groups, the programmes produced no statistically reliable increase, and results swung a
        lot between studies.
      </p>
      <p>
        Meditation still does things to the heart. The same research finds lower resting heart rate and lower stress markers, and regular slow breathing
        practice does seem to help. What you shouldn&apos;t do is expect your morning HRV to climb because you started sitting, or decide your practice is
        failing because it stayed flat.
      </p>

      <h2>Reading the HRV number on Apple Watch</h2>
      <p>
        Apple Watch takes HRV readings every so often, including during Mindfulness sessions, and saves them to Apple Health as SDNN. Those are
        snapshots, a few per sit at most, and third-party apps can&apos;t get live beat-to-beat data while you meditate.
      </p>
      <p>
        Readings taken during a Breathe session run high for all the reasons above, so leave them out when you compare against your overnight number.
        Recovery apps warn about this too. If you want to watch HRV over months, use the readings from while you sleep, and look at the weekly average
        instead of any single morning.
      </p>

      <h2>What I&apos;d watch during a sit instead</h2>
      <p>
        Heart rate is far easier to read in a single session. Did it settle, how far did it fall, and how long did it take? Stillness is easier again: when
        you arrived, how often you drifted and came back, the longest stretch you held. I go through both in{' '}
        <Link href="/learn/heart-rate-during-meditation">heart rate during meditation</Link> and{' '}
        <Link href="/learn/measuring-meditation">how to measure meditation</Link>.
      </p>
      <p>
        <Link href="/">Dhyaan</Link> doesn&apos;t score HRV during a sit for the reasons in this piece. If you give it Apple Health access, it can place the HRV
        history your Watch already keeps beside your practice, so you can look at the long trend yourself and draw your own line.
      </p>

      <h2>Three things readers ask about HRV</h2>
      <h3>What is the best meditation for HRV?</h3>
      <p>
        If you want HRV up right now, slow paced breathing at about six breaths a minute does it most directly. That&apos;s closer to biofeedback than to
        meditation, and a pacer or your watch&apos;s haptic taps will get you there.
      </p>
      <h3>Can meditation lower HRV?</h3>
      <p>
        During some practices, yes. Hard concentration, energising breathwork or a wave of strong emotion can push heart rate up and HRV down while you sit.
        It&apos;s normal and does no harm.
      </p>
      <h3>Should I meditate to improve my HRV score?</h3>
      <p>
        You can. I&apos;d pick a better reason. Sit for what it does to your attention and your days, and if HRV drifts up along the way, take it as a small
        bonus and move on.
      </p>
    </Article>
  )
}
