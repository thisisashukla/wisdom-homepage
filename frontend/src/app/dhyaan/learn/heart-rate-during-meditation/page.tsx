import Link from 'next/link'
import Article from '../../_components/Article'
import { pageMeta } from '../../_lib/site'

const PATH = '/learn/heart-rate-during-meditation'
const TITLE = 'What happens to your heart rate when you meditate'
const DESC = 'Your heart rate usually eases down a few beats while you sit. Sometimes it climbs. Here is what drives both, and how to read your own numbers.'

export const metadata = pageMeta({ title: TITLE, description: DESC, path: PATH, type: 'article' })

export default function Page() {
  return (
    <Article
      path={PATH}
      title={TITLE}
      standfirst={DESC}
      published="2026-11-06"
      pillar="measuring"
      trackName="Dhyaan Learn Heart Rate"
      answer={
        <p>
          In a calm seated practice your heart rate usually drifts down by a few beats a minute, mostly in the first several minutes as your body
          settles and your breath slows. It can also climb during energising practices, loving-kindness, strong emotion or hard concentration. No
          single number counts as a good meditation heart rate. Compare each sit with your own usual pattern for the same practice.
        </p>
      }
      refs={[
        { text: 'Zaccaro A et al. (2018). How breath-control can change your life: a systematic review on psycho-physiological correlates of slow breathing. Frontiers in Human Neuroscience.' },
        { text: 'Lehrer PM, Gevirtz R (2014). Heart rate variability biofeedback: how and why does it work? Frontiers in Psychology.' },
        { text: 'Brown L et al. (2021). The effects of mindfulness and meditation on vagally mediated heart rate variability: a meta-analysis. Psychosomatic Medicine.' },
        { text: 'Wielgosz J et al. (2016). Long-term mindfulness training is associated with reliable differences in resting respiration rate. Scientific Reports.' },
        { text: 'Lumma AL, Kok BE, Singer T (2015). Is meditation always relaxing? Investigating heart rate, heart rate variability, experienced effort and likeability during training of three types of meditation. International Journal of Psychophysiology.' },
        { text: 'Amihai I, Kozhevnikov M (2014). Arousal vs. relaxation: a comparison of the neurophysiological and cognitive correlates of Vajrayana and Theravada meditative practices. PLOS ONE.' },
        { text: 'Shaffer F, Ginsberg JP (2017). An overview of heart rate variability metrics and norms. Frontiers in Public Health.' },
      ]}
    >
      <p>
        Glance at your watch two minutes into a sit and you might see 74. Glance again at the bell and it says 66. Somewhere in between, without asking it
        to, your heart let go of eight beats a minute.
      </p>
      <p>
        That small slide is the most common thing a heart does during meditation. It isn&apos;t the only thing, and the exceptions are where people get
        confused, so let&apos;s take both.
      </p>

      <h2>Why heart rate usually drops</h2>
      <p>
        Sitting still means your muscles stop asking for blood, and your heart can ease off. Most practices also slow the breath. Each in-breath nudges
        the heart a little faster and each out-breath lets it slow, and as breathing lengthens, the slowing side starts to win. Over the first few
        minutes the average comes down.
      </p>
      <p>
        How far it falls depends on a pile of ordinary things: how active you were before you sat, what you ate, your morning coffee, a warm room, a
        cold coming on, and the practice itself. A walk up the stairs right before you sit can make the drop look dramatic. A slow morning in bed
        can make it look like nothing happened.
      </p>

      <h2>Why it sometimes goes up</h2>
      <p>
        Some practices are built to wake you up. Kapalabhati and bhastrika raise arousal on purpose, and so do certain Vajrayana visualisations. Even
        among quiet practices there are differences. In one study, people&apos;s heart rates ran higher during loving-kindness and thought-observation
        than during simple breath meditation.
      </p>
      <p>
        Effort pushes it up too. If you&apos;re gripping your attention, or holding your body rigid so you won&apos;t move, your heart notices. So does
        feeling. Sit quietly for long enough and old memories surface, and the body answers them. And the first minute is often noisy anyway: you
        rushed to the cushion, you checked your watch, you&apos;re still arriving.
      </p>
      <p>
        If your heart regularly races or pounds while you meditate and it worries you, or it comes with dizziness or chest discomfort, stop and see
        a doctor. A meditation app can&apos;t tell you what&apos;s going on there.
      </p>

      <h2>Is there a good meditation heart rate?</h2>
      <p>
        No. Adult resting heart rates cover a wide range, and fit people often sit in the 50s. Asking whether 62 is good gets you nowhere. Ask how
        today compares with your usual sits of the same kind.
      </p>
      <p>
        A bigger drop than usual might mean you arrived calmer, breathed slower, or were nodding off. A smaller one might mean a stressful morning
        or a second coffee. Your own baseline is the only comparison that&apos;s fair to you.
      </p>

      <h2>And HRV?</h2>
      <p>
        Heart-rate variability is the beat-to-beat wobble in the timing of your heartbeats. It&apos;s a real signal, and during meditation it&apos;s
        very easy to misread.
      </p>
      <p>
        Breathe slowly, near six breaths a minute, and the rise and fall of your heart with each breath gets much bigger. HRV jumps. That jump comes
        from your breathing, and it would happen if you were breathing slowly while doing your taxes. Over the longer run, a 2021 meta-analysis of 19
        randomised trials found no significant rise in vagal HRV from mindfulness training compared with control groups.
      </p>
      <p>
        Your watch adds its own limits. Apple Watch logs occasional HRV samples (SDNN) in Apple Health that aren&apos;t tied to your sit, and it
        doesn&apos;t give apps live beat-to-beat data during a session. If you want proper HRV, a chest strap such as a Polar H10 is the tool.
      </p>
      <p>
        Breathing may be the more telling long-term signal anyway. Long-term meditators in one study breathed about 1.6 breaths a minute slower at rest
        than non-meditators, and the gap grew with the hours they had spent on retreat. I cover the rest in{' '}
        <Link href="/learn/meditation-and-hrv">Does meditation increase HRV?</Link>
      </p>

      <h2>A fair way to watch your own heart rate</h2>
      <p>
        Keep the conditions boring. Sit for the same length at roughly the same time of day, and compare silent sits with silent sits, japa with
        japa. Then look at the shape instead of one number: where it started, how quickly it settled, where it ended up.
      </p>
      <p>
        Last, write one line about how the sit felt before you look. A number beside your own words tells you far more than a number alone, and it
        keeps the number from telling you how you felt.
      </p>
      <p>
        That&apos;s how <Link href="/">Dhyaan</Link> shows heart rate. You say how the sit felt first. Then you see the settle from start to finish,
        set against your own past sits, with no score attached.
      </p>
    </Article>
  )
}
