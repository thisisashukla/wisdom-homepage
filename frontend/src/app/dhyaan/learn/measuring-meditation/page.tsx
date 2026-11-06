import Link from 'next/link'
import Article from '../../_components/Article'
import { pageMeta } from '../../_lib/site'
import { doi, pmid, pubmed } from '../../_lib/refs'

const PATH = '/learn/measuring-meditation'
const TITLE = 'How to measure meditation (and what no sensor can tell you)'
const DESC =
  'What your heart, breath and stillness can really show about a sit, where they mislead you, and how to read your own numbers without turning practice into a test.'

export const metadata = pageMeta({ title: TITLE, description: DESC, path: PATH, type: 'article' })

export default function Page() {
  return (
    <Article
      path={PATH}
      title={TITLE}
      standfirst={DESC}
      published="2026-11-06"
      trackName="Dhyaan Pillar Measuring"
      pillarPage="measuring"
      answer={
        <p>
          You can measure what your body did during a sit. How well your mind meditated is out of reach. Motion sensors show when you went still
          and how often you moved, heart rate shows how far your body settled, and breathing rate shows how calm the sit was. None of these, and no
          headband or app score, has been validated as a measure of good meditation. Used well they work like a mirror: compare each sit only with
          your own past sits of the same kind, watch the trend over weeks, and write down how it felt before you look at any number.
        </p>
      }
      refs={[
        { text: 'Acabchuk RL et al. (2020). Measuring meditation progress with a consumer-grade EEG device: caution from a randomized controlled trial. Mindfulness.', href: pubmed('Measuring meditation progress with a consumer-grade EEG device caution from a randomized controlled trial') },
        { text: 'Hasenkamp W et al. (2012). Mind wandering and attention during focused meditation: a fine-grained temporal analysis of fluctuating cognitive states. NeuroImage.', href: doi('10.1016/j.neuroimage.2011.07.008') },
        { text: 'Seli P, Carriere JSA, Thomson DR, Cheyne JA, Smilek D (2014). Restless mind, restless body. Journal of Experimental Psychology: Learning, Memory, and Cognition.', href: pubmed('Restless mind, restless body Seli Carriere') },
        { text: 'Brown L et al. (2021). The effects of mindfulness and meditation on vagally mediated heart rate variability: a meta-analysis. Psychosomatic Medicine.', href: pmid('33395216') },
        { text: 'Pascoe MC, Thompson DR, Jenkins ZM, Ski CF (2017). Mindfulness mediates the physiological markers of stress: systematic review and meta-analysis. Journal of Psychiatric Research.', href: pubmed('Mindfulness mediates the physiological markers of stress: Systematic review and meta-analysis') },
        { text: 'Wielgosz J et al. (2016). Long-term mindfulness training is associated with reliable differences in resting respiration rate. Scientific Reports.', href: pubmed('Long-term mindfulness training is associated with reliable differences in resting respiration rate') },
        { text: 'Matiz A et al. (2019). Spontaneous eye movements during focused-attention mindfulness meditation. PLOS ONE.', href: doi('10.1371/journal.pone.0210862') },
      ]}
    >
      <p>
        Nobody keeps going to a gym that never lets them see whether they got stronger. So it makes sense that people who meditate want some proof it&apos;s
        doing something.
      </p>
      <p>
        The trouble is the tools. The obvious ones either measure the wrong thing, or measure the right thing badly. I spent a long time with the research
        while building Dhyaan, and this guide is what I took away: which signals deserve your attention, which ones will mislead you, and how to look at
        your own numbers without turning a quiet practice into an exam.
      </p>

      <h2>What can a device measure during a sit?</h2>
      <p>Ordinary devices can pick up four things. Each one is real, and each one has a blind spot.</p>
      <table>
        <thead>
          <tr>
            <th>Signal</th>
            <th>What it shows</th>
            <th>What it misses</th>
            <th>Measured by</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Stillness</td>
            <td>When you stopped adjusting, how often you moved, your longest still stretch</td>
            <td>Whether you were awake and attentive while still</td>
            <td>Apple Watch (wrist), AirPods (head), a phone in your lap</td>
          </tr>
          <tr>
            <td>Heart rate</td>
            <td>How far, and how fast, your body settled</td>
            <td>Whether a drop came from calm or from dozing off</td>
            <td>Apple Watch, chest strap</td>
          </tr>
          <tr>
            <td>Breathing rate</td>
            <td>How slow and even your breathing became</td>
            <td>Whether you slowed it on purpose or drifted into it</td>
            <td>Chest strap, sometimes head or wrist motion when you&apos;re very still</td>
          </tr>
          <tr>
            <td>HRV</td>
            <td>Mostly how slowly you breathed</td>
            <td>Meditation quality. The evidence doesn&apos;t support that use</td>
            <td>Chest strap. Watches give only occasional samples</td>
          </tr>
        </tbody>
      </table>

      <h3>Stillness is the most useful signal</h3>
      <p>
        Your attention and your body move together more than you&apos;d think. Lab studies keep finding that people whose minds wander more also fidget
        more. Eye movements get smaller as people settle into focused meditation, and experienced meditators move their eyes less than beginners.
      </p>
      <p>
        So the moment you stop adjusting is a decent outside marker for the moment you arrived. The times you moved and came back tell you something, and
        so does the longest stretch you stayed put.
      </p>
      <p>
        It has limits. You can sit like a statue while replaying an argument in your head. And very still sometimes means very sleepy, so drowsiness needs
        its own check, which I cover in <Link href="/learn/falling-asleep-during-meditation">falling asleep during meditation</Link>.
      </p>

      <h3>Heart rate shows how far your body settled</h3>
      <p>
        In a calm seated practice heart rate usually drifts down a few beats a minute, most of it in the first several minutes. Across controlled trials,
        meditation lowers resting heart rate too. It can also climb during hard concentration, loving-kindness practice or a wave of emotion, so a rise
        doesn&apos;t mean you failed. The full picture is in{' '}
        <Link href="/learn/heart-rate-during-meditation">what happens to your heart rate when you meditate</Link>.
      </p>

      <h3>Breathing is the quiet long-term signal</h3>
      <p>
        In one study, long-term meditators breathed noticeably slower at rest than non-meditators, and the gap widened with the hours they&apos;d spent on
        retreat. Breathing is hard to read without a chest strap. When you&apos;re very still, though, the tiny rise and fall of each breath can show up in
        head or wrist motion.
      </p>

      <h3>HRV is the most misunderstood</h3>
      <p>
        Heart-rate variability jumps whenever you breathe slowly, so a high reading during a sit mostly reports on your breathing. A 2021 meta-analysis of
        19 randomised trials also found no reliable rise in resting HRV from mindfulness training. I go through the evidence, and how to read the number on
        your watch, in <Link href="/learn/meditation-and-hrv">does meditation increase HRV?</Link>
      </p>

      <h2>What no sensor can measure</h2>
      <p>
        Nothing reads attention directly. Researchers who study the mind moment to moment during meditation still depend on people pressing a button when
        they notice they&apos;ve drifted. The most heavily marketed consumer attempt at a meditation score, an EEG headband, went through a randomised trial,
        and its scores didn&apos;t track people&apos;s progress.
      </p>
      <p>
        A single number for how well you meditated does two kinds of damage. It turns practice into performance, and you start sitting rigidly to win. Then,
        when the number stays flat while you&apos;re quietly changing, it tells you to quit.
      </p>

      <h2>How to read your own numbers</h2>
      <p>
        Words come first. Before you look at anything, say or write how the sit felt. Scattered, settled, absorbed, whatever fits. Your own report is data
        too, and if you see the numbers first they&apos;ll colour it.
      </p>
      <p>
        Then compare like with like. A silent sit, a paced-breathing session and a round of japa produce very different heart and motion patterns. Set a sit
        only beside your own past sits of the same kind and length.
      </p>
      <p>
        Single sits are noisy, so look at four to eight weeks at a time. You want to see if you&apos;re arriving sooner, coming back more easily and
        settling further. Check how much of the sit was actually seen, too. A watch that slipped or AirPods that died halfway give you half a reading, and a
        good tool should tell you that.
      </p>
      <p>
        Last, let the number be wrong. If you felt restless and the motion data says you were still, both can be true. Restlessness can live entirely on the
        inside.
      </p>

      <h2>The signs that show up off the cushion</h2>
      <p>
        What people most want from meditation happens in ordinary life. Getting over an argument faster. Noticing a tight jaw before it becomes a headache.
        Falling asleep less tangled in tomorrow. No device sees any of that, and one line a week in a notebook will. I list five signs worth checking in{' '}
        <Link href="/learn/is-my-meditation-working">how to know if your meditation is working</Link>.
      </p>

      <h2>How Dhyaan handles it</h2>
      <p>
        We built <Link href="/">Dhyaan</Link> around these limits. After the bell it asks how the sit felt, and only then reads the sit back to you: when you
        arrived, how often you came back, your longest still stretch, how your heart settled. AirPods supply head stillness and likely drowsiness. Apple
        Watch supplies hands and heart. The steadiness reading, Sthir, is only ever compared with your own past sits.
      </p>
      <p>
        The full method, blind spots included, is on <Link href="/methods">how Dhyaan measures</Link>. If you&apos;d like to feel it from the outside first, try
        the <Link href="/nivata">60-second stillness test</Link>.
      </p>

      <h2>Three questions I get asked</h2>
      <h3>Can a smartwatch tell if I&apos;m meditating?</h3>
      <p>
        It can tell you were still and what your heart did. It can&apos;t separate meditation from quiet rest or from dozing, so your own report needs to sit
        beside the numbers.
      </p>
      <h3>Is a meditation headband more accurate?</h3>
      <p>
        EEG headbands pick up the brain&apos;s electrical activity, which is closer to the mind than heart rate is. Their scores still haven&apos;t been shown to
        track meditation progress in a randomised trial, and more data hasn&apos;t produced a more trustworthy verdict.
      </p>
      <h3>What&apos;s the single best thing to track?</h3>
      <p>
        Whether you sat. In the research on doses and habits, turning up on most days predicts change better than any reading taken during a sit. If you only
        track one thing, track that, and read{' '}
        <Link href="/learn/how-long-should-you-meditate">how long should you meditate</Link> for how much is enough.
      </p>
    </Article>
  )
}
