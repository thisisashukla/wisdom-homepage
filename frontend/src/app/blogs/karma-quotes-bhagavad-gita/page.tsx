import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import ShlokaCard from '@/components/gita/ShlokaCard'

export const metadata: Metadata = {
  title: "Karma Quotes from the Bhagavad Gita — 10 Shlokas on Karma with Sanskrit & English Meaning | Wisdom",
  description:
    "The Bhagavad Gita's most important shlokas on karma, in one page. Sanskrit original, IAST transliteration, English meaning and the one-line essence for each verse. From 2.47 (karmanye vadhikaraste) to 4.37 (knowledge burns karma).",
  keywords:
    "karma quotes bhagavad gita, gita shlok on karma, gita sloka on karma, quotes on karma from bhagavad gita, karma quotes in bhagavad gita, bhagwad geeta shlok on karma, karma quotes hindi, geeta quotes on karma, karma verses gita, shlokas on karma",
  openGraph: {
    title: "Karma Quotes from the Bhagavad Gita — 10 Shlokas with Sanskrit & English",
    description:
      "10 karma quotes from the Bhagavad Gita — Sanskrit, IAST, English meaning and the one-line essence for each verse.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/karma-quotes-bhagavad-gita",
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/karma-quotes-bhagavad-gita" },
}

const pageCSS = `
  :root {
    --maroon: #3d0c0c;
    --maroon-mid: #5c1a1a;
    --gold: #c8881e;
    --gold-light: #f5c96a;
    --gold-pale: #fdf3dc;
    --gold-border: #e8c97a;
    --gold-dim: rgba(200,136,30,0.15);
    --text: #f5e8cc;
    --text-dim: rgba(245,232,204,0.65);
    --text-dimmer: rgba(245,232,204,0.35);
    --border: rgba(200,136,30,0.2);
    --bg: #120505;
    --bg-warm: #190707;
    --bg-alt: #0f0404;
    --bg-card: rgba(255,255,255,0.04);
    --bg-card-hover: rgba(255,255,255,0.07);
    --max: 780px;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; line-height: 1.7; font-size: 16px; }

  .breadcrumb { background: var(--bg-alt); border-bottom: 1px solid var(--border); }
  .breadcrumb-inner { max-width: 1100px; margin: 0 auto; padding: 10px 28px; font-size: 12px; color: var(--text-dimmer); display: flex; gap: 8px; align-items: center; }
  .breadcrumb-inner a { color: var(--text-dimmer); transition: color 0.15s; }
  .breadcrumb-inner a:hover { color: var(--gold-light); }
  .bc-sep { opacity: 0.4; }

  .article-hero { background: var(--bg-warm); padding: 64px 28px 56px; border-bottom: 1px solid var(--border); position: relative; overflow: hidden; }
  .article-hero::before {
    content: "कर्म"; position: absolute; right: -10px; bottom: -30px;
    font-family: "Noto Sans Devanagari", serif; font-size: 220px;
    color: rgba(200,136,30,0.04); line-height: 1; pointer-events: none; user-select: none;
  }
  .article-hero-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 2; }
  .chapter-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(200,136,30,0.1); border: 1px solid rgba(200,136,30,0.28);
    color: var(--gold-light); font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
    text-transform: uppercase; padding: 5px 14px; border-radius: 100px; margin-bottom: 20px;
  }
  .chapter-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold); box-shadow: 0 0 6px var(--gold); flex-shrink: 0; }
  h1.article-title {
    font-family: "Playfair Display", Georgia, serif; font-size: clamp(28px, 4vw, 48px);
    font-weight: 700; color: var(--gold-light); line-height: 1.15; letter-spacing: -0.5px; margin-bottom: 14px;
  }
  h1.article-title em { font-style: italic; color: #fff; }
  .article-subtitle { font-size: 17px; color: var(--text-dim); font-weight: 300; margin-bottom: 32px; line-height: 1.65; max-width: 620px; }
  .article-meta { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
  .meta-item { font-size: 12px; color: var(--text-dimmer); letter-spacing: 0.04em; }
  .meta-sep { color: var(--border); }

  .lead { font-size: 1.1rem; color: var(--text-dim); margin-bottom: 2rem; line-height: 1.8; }

  .content { max-width: var(--max); margin: 0 auto; padding: 32px 2rem 4rem; }

  h2 {
    font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700;
    margin: 2.5rem 0 1.5rem 0; color: var(--gold);
    border-bottom: 2px solid var(--gold-dim); padding-bottom: 0.75rem;
  }
  h3 { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 600; margin: 1.5rem 0 1rem 0; color: var(--text); }
  p { margin-bottom: 1.5rem; color: var(--text-dim); }

  .verse-toc {
    background: var(--bg-card); border: 1px solid var(--border); border-radius: 10px;
    padding: 20px 24px; margin: 20px 0 32px;
  }
  .verse-toc-title { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold-light); margin-bottom: 12px; }
  .verse-toc ol { padding-left: 20px; margin: 0; }
  .verse-toc li { margin-bottom: 6px; color: var(--text-dim); font-size: 14.5px; }
  .verse-toc a { color: var(--text); border-bottom: 1px dotted var(--gold-dim); }
  .verse-toc a:hover { color: var(--gold-light); }

  .faq-section { max-width: var(--max); margin: 2rem auto 0; padding: 0 2rem; }
  .faq-item { margin: 1.5rem 0; padding: 1.25rem 1.4rem; background: var(--bg-card); border: 1px solid var(--border); border-radius: 10px; }
  .faq-item strong { color: var(--gold-light); display: block; margin-bottom: 8px; font-size: 15.5px; }
  .faq-item p { margin-bottom: 0; color: var(--text-dim); font-size: 14.5px; }

  .related {
    max-width: var(--max); margin: 3rem auto 4rem; padding: 24px 2rem;
    border-top: 1px solid var(--border);
  }
  .related-title { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-dimmer); margin-bottom: 16px; }
  .related a { display: block; padding: 12px 0; color: var(--text); border-bottom: 1px solid var(--border); }
  .related a:last-child { border-bottom: none; }
  .related a:hover { color: var(--gold-light); }
`

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Karma Quotes from the Bhagavad Gita — 10 Shlokas with Sanskrit & English Meaning",
    "description": "The Bhagavad Gita's most important shlokas on karma, in one page. Sanskrit, IAST, English meaning and the one-line essence for each.",
    "datePublished": "2026-08-02",
    "author": {
      "@type": "Person",
      "name": "Ankur Shukla",
      "url": "https://wisdomquotes.in/about",
      "sameAs": [
        "https://www.linkedin.com/in/thisisashukla/",
        "https://x.com/thisisashukla"
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Wisdom App",
      "url": "https://wisdomquotes.in"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the most famous karma quotes in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The single most famous karma quote is Bhagavad Gita 2.47 — karmaṇyevādhikāraste mā phaleṣu kadācana — 'You have a right to action, never to its fruits.' Other essential karma shlokas include 2.48 (evenness of mind is called yoga), 3.9 (action as yajna), 3.19 (always act unattached), 4.18 (see inaction in action), 4.37 (knowledge burns all karma) and 18.47 (do your own duty)."
        }
      },
      {
        "@type": "Question",
        "name": "Which verse of the Bhagavad Gita talks about karma?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Karma is discussed across the entire Bhagavad Gita, but Chapter 3 (Karma Yoga) is dedicated to it. The foundational verse is 2.47. Chapter 2 verses 47-51, Chapter 3 verses 1-35, Chapter 4 verses 14-24 and 37-42, and Chapter 5 verses 8-12 are the densest passages on karma."
        }
      },
      {
        "@type": "Question",
        "name": "What is the meaning of karmanye vadhikaraste?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Karmaṇyevādhikāraste (कर्मण्येवाधिकारस्ते) is the opening of BG 2.47 and means 'you have a right to action alone.' The full shloka continues: mā phaleṣu kadācana ('never to its fruits'), mā karmaphalaheturbhūḥ ('do not let the fruit be your motive') and mā te saṅgo'stvakarmaṇi ('nor let attachment be to inaction'). Four instructions in one verse."
        }
      },
      {
        "@type": "Question",
        "name": "Does the Bhagavad Gita say karma is fate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. BG 4.37 explicitly says knowledge (jñāna) burns all karma to ashes — the past is not permanent, understanding transforms it. Karma in the Gita describes the chain between intention, action and consequence; it is not a cosmic sentencing system."
        }
      }
    ]
  }
]

export default function KarmaQuotesPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageCSS }} />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <BlogTracker pageName="Karma Quotes Bhagavad Gita" />

      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <a href="/" data-mp-location="crumb_home">Wisdom</a>
          <span className="bc-sep">/</span>
          <a href="/blogs" data-mp-location="crumb_blogs">Blog</a>
          <span className="bc-sep">/</span>
          Karma Quotes
        </div>
      </div>

      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · Karma
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            10 Karma Quotes from the Bhagavad Gita<br />
            <em>Sanskrit, Meaning, and the One-Line Essence</em>
          </h1>
          <p className="article-subtitle">
            The Gita&apos;s teaching on karma is not a moral scoreboard. It&apos;s a set of instructions on how to act. These ten shlokas are the core.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Chapters 2, 3, 4 &amp; 5</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~6 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item" style={{ fontStyle: 'italic' }}>
              Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed August 2026.{' '}
              <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a>
            </span>
          </div>
        </div>
      </div>

      <div className="content">
        <p className="lead">
          Karma quotes from the Bhagavad Gita usually get pulled out of context. This page keeps them in context — each shloka below has the Sanskrit original, IAST transliteration, English meaning and a one-line essence. If you want the deeper interpretation of what karma actually means in the Gita, read{' '}
          <a href="/blogs/bhagavad-gita-karma-meaning" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }} data-mp-location="internal_link_karma_meaning">
            Karma in the Bhagavad Gita: The Real Meaning
          </a>{' '}
          or the topic page for{' '}
          <a href="/gita/topic/karma-phala" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }} data-mp-location="internal_link_karma_phala_topic">
            karma phala (fruit of action)
          </a>.
        </p>

        <div className="verse-toc" data-mp-section="verse_toc">
          <div className="verse-toc-title">The 10 verses</div>
          <ol>
            <li><a href="#bg-2-47" data-mp-location="toc_2_47">BG 2.47 — karmaṇyevādhikāraste (right to action, not fruits)</a></li>
            <li><a href="#bg-2-48" data-mp-location="toc_2_48">BG 2.48 — yogasthaḥ kuru karmāṇi (evenness of mind)</a></li>
            <li><a href="#bg-2-50" data-mp-location="toc_2_50">BG 2.50 — yogaḥ karmasu kauśalam (skill in action)</a></li>
            <li><a href="#bg-3-9" data-mp-location="toc_3_9">BG 3.9 — yajñārthātkarmaṇo (action as offering)</a></li>
            <li><a href="#bg-3-19" data-mp-location="toc_3_19">BG 3.19 — tasmādasaktaḥ satataṃ (always unattached)</a></li>
            <li><a href="#bg-3-35" data-mp-location="toc_3_35">BG 3.35 — śreyānsvadharmo (do your own duty)</a></li>
            <li><a href="#bg-4-18" data-mp-location="toc_4_18">BG 4.18 — karmaṇyakarma yaḥ paśyet (inaction in action)</a></li>
            <li><a href="#bg-4-20" data-mp-location="toc_4_20">BG 4.20 — tyaktvā karmaphalāsaṅgaṃ (free from result-clinging)</a></li>
            <li><a href="#bg-4-37" data-mp-location="toc_4_37">BG 4.37 — jñānāgniḥ sarvakarmāṇi (knowledge burns karma)</a></li>
            <li><a href="#bg-5-10" data-mp-location="toc_5_10">BG 5.10 — brahmaṇyādhāya karmāṇi (offering actions to Brahman)</a></li>
          </ol>
        </div>

        <h2 id="bg-2-47">1. Bhagavad Gita 2.47 — Right to Action, Never to Fruits</h2>
        <ShlokaCard
          verseRef="Bhagavad Gita 2.47"
          sanskrit="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥"
          iast="karmaṇyevādhikāraste mā phaleṣu kadācana | mā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi ||"
          meaningLabel="Translation"
          meaning="You have a right to perform your prescribed duties, but never to their fruits. Never consider yourself the cause of the results, and never be attached to not doing your duty."
          insightLabel="Essence"
          insight="Four instructions in one verse: act; do not claim the fruit; do not let the anticipated fruit be your motive; do not use this teaching to justify inaction. The last instruction is specifically there to prevent the misreading of the first three."
          essence="Do your duty. Let go of the outcome. Both halves matter."
        />
        <p>
          <a href="/gita/chapter/2/verse/47" data-mp-location="quote_full_2_47" style={{ color: 'var(--gold-light)' }}>Read the full verse page for 2.47 →</a>
        </p>

        <h2 id="bg-2-48">2. Bhagavad Gita 2.48 — Evenness of Mind is Yoga</h2>
        <ShlokaCard
          verseRef="Bhagavad Gita 2.48"
          sanskrit="योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय । सिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते ॥"
          iast="yogasthaḥ kuru karmāṇi saṅgaṃ tyaktvā dhanañjaya | siddhyasiddhyoḥ samo bhūtvā samatvaṃ yoga ucyate ||"
          meaningLabel="Translation"
          meaning="Established in yoga, O Arjuna, do your work — abandoning attachment, remaining even in success and failure. This evenness of mind is what is called yoga."
          insightLabel="Essence"
          insight="This is the Gita's working definition of yoga: samatvam — evenness of mind. Not indifference. Not detachment from the work. Detachment from the swing between elation and despair that outcomes usually trigger."
          essence="Yoga is doing the work without letting outcomes swing you."
        />
        <p>
          <a href="/gita/chapter/2/verse/48" data-mp-location="quote_full_2_48" style={{ color: 'var(--gold-light)' }}>Read the full verse page for 2.48 →</a>
        </p>

        <h2 id="bg-2-50">3. Bhagavad Gita 2.50 — Yoga is Skill in Action</h2>
        <ShlokaCard
          verseRef="Bhagavad Gita 2.50"
          sanskrit="बुद्धियुक्तो जहातीह उभे सुकृतदुष्कृते । तस्माद्योगाय युज्यस्व योगः कर्मसु कौशलम् ॥"
          iast="buddhiyukto jahātīha ubhe sukṛtaduṣkṛte | tasmādyogāya yujyasva yogaḥ karmasu kauśalam ||"
          meaningLabel="Translation"
          meaning="One with the yoga of wisdom rises above both good and bad actions here in this life. Therefore, strive for yoga — yoga is skill in action."
          insightLabel="Essence"
          insight="Yogaḥ karmasu kauśalam — one of the most quoted phrases in the Gita. Skill here does not mean technical competence. It means the internal skill of acting without being bound by the action's karmic residue."
          essence="Yoga is not withdrawing from action — it is skill in how you act."
        />
        <p>
          <a href="/gita/chapter/2/verse/50" data-mp-location="quote_full_2_50" style={{ color: 'var(--gold-light)' }}>Read the full verse page for 2.50 →</a>
        </p>

        <h2 id="bg-3-9">4. Bhagavad Gita 3.9 — Action as Sacred Offering</h2>
        <ShlokaCard
          verseRef="Bhagavad Gita 3.9"
          sanskrit="यज्ञार्थात्कर्मणोऽन्यत्र लोकोऽयं कर्मबन्धनः । तदर्थं कर्म कौन्तेय मुक्तसंगः समाचर ॥"
          iast="yajñārthātkarmaṇo'nyatra loko'yaṃ karmabandhanaḥ | tadarthaṃ karma kaunteya muktasaṃgaḥ samācara ||"
          meaningLabel="Translation"
          meaning="Action done for any reason other than as a sacred offering (yajna) creates bondage in this world. Therefore, O Arjuna, perform your duties as an offering, free from attachment."
          insightLabel="Essence"
          insight="The exact same action binds you if done with ego-craving and frees you if done as an offering. Yajna reframes the question from 'what will I get?' to 'what does this serve?' — and the quality of effort usually rises, not falls."
          essence="Action done as offering frees you; action done for personal gain binds you."
        />
        <p>
          <a href="/gita/chapter/3/verse/9" data-mp-location="quote_full_3_9" style={{ color: 'var(--gold-light)' }}>Read the full verse page for 3.9 →</a>
        </p>

        <h2 id="bg-3-19">5. Bhagavad Gita 3.19 — Always Act Unattached</h2>
        <ShlokaCard
          verseRef="Bhagavad Gita 3.19"
          sanskrit="तस्मादसक्तः सततं कार्यं कर्म समाचर । असक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः ॥"
          iast="tasmādasaktaḥ satataṃ kāryaṃ karma samācara | asakto hyācarankarma paramāpnoti pūruṣaḥ ||"
          meaningLabel="Translation"
          meaning="Therefore, always perform your duty efficiently, without attachment. Acting unattached, a person reaches the highest."
          insightLabel="Essence"
          insight="Note the word satataṃ — always. Not sometimes, when it is convenient, when the stakes are low. Always. The Gita is describing a continuous internal posture, not a technique reserved for hard decisions."
          essence="The person who acts without attachment reaches the highest."
        />
        <p>
          <a href="/gita/chapter/3/verse/19" data-mp-location="quote_full_3_19" style={{ color: 'var(--gold-light)' }}>Read the full verse page for 3.19 →</a>
        </p>

        <h2 id="bg-3-35">6. Bhagavad Gita 3.35 — Your Own Duty, Imperfectly Done</h2>
        <ShlokaCard
          verseRef="Bhagavad Gita 3.35"
          sanskrit="श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् । स्वधर्मे निधनं श्रेयः परधर्मो भयावहः ॥"
          iast="śreyānsvadharmo viguṇaḥ paradharmātsvanuṣṭhitāt | svadharme nidhanaṃ śreyaḥ paradharmo bhayāvahaḥ ||"
          meaningLabel="Translation"
          meaning="Better one's own dharma imperfectly performed than another's dharma perfectly executed. Even death in one's own dharma is preferable; another's dharma is fraught with danger."
          insightLabel="Essence"
          insight="Svadharma — one's own duty — is not a moralistic command. It is a psychological point: acting from what is genuinely yours is sustainable; acting from what looks impressive but is not yours produces internal collapse over time."
          essence="Your own duty, even if flawed, is safer than someone else's perfectly done."
        />
        <p>
          <a href="/gita/chapter/3/verse/35" data-mp-location="quote_full_3_35" style={{ color: 'var(--gold-light)' }}>Read the full verse page for 3.35 →</a>
        </p>

        <h2 id="bg-4-18">7. Bhagavad Gita 4.18 — Seeing Action in Inaction</h2>
        <ShlokaCard
          verseRef="Bhagavad Gita 4.18"
          sanskrit="कर्मण्यकर्म यः पश्येदकर्मणि च कर्म यः । स बुद्धिमान्मनुष्येषु स युक्तः कृत्स्नकर्मकृत् ॥"
          iast="karmaṇyakarma yaḥ paśyedakarmaṇi ca karma yaḥ | sa buddhimānmanuṣyeṣu sa yuktaḥ kṛtsnakarmakṛt ||"
          meaningLabel="Translation"
          meaning="One who sees inaction in action, and action in inaction — that one is wise among people, established in yoga, and has done all that needed to be done."
          insightLabel="Essence"
          insight="This paradox points at a real distinction. External busyness can be internal inaction (if the doer is absent). External stillness can be intense internal action. Karma is not measured by motion but by the state of the actor."
          essence="Wisdom is seeing that action and inaction are inner states, not outer motions."
        />
        <p>
          <a href="/gita/chapter/4/verse/18" data-mp-location="quote_full_4_18" style={{ color: 'var(--gold-light)' }}>Read the full verse page for 4.18 →</a>
        </p>

        <h2 id="bg-4-20">8. Bhagavad Gita 4.20 — Free from Clinging to Fruits</h2>
        <ShlokaCard
          verseRef="Bhagavad Gita 4.20"
          sanskrit="त्यक्त्वा कर्मफलासङ्गं नित्यतृप्तो निराश्रयः । कर्मण्यभिप्रवृत्तोऽपि नैव किञ्चित्करोति सः ॥"
          iast="tyaktvā karmaphalāsaṅgaṃ nityatṛpto nirāśrayaḥ | karmaṇyabhipravṛtto'pi naiva kiñcitkaroti saḥ ||"
          meaningLabel="Translation"
          meaning="Having given up attachment to the fruits of action, always content and independent, even while performing action he does nothing at all."
          insightLabel="Essence"
          insight="Nityatripta means always content — not content once the good outcome arrives. The contentment precedes the result because it is not conditional on the result. That is the internal signature of nishkama karma when it is working."
          essence="Contentment without conditions. Action without doer-ship."
        />
        <p>
          <a href="/gita/chapter/4/verse/20" data-mp-location="quote_full_4_20" style={{ color: 'var(--gold-light)' }}>Read the full verse page for 4.20 →</a>
        </p>

        <h2 id="bg-4-37">9. Bhagavad Gita 4.37 — Knowledge Burns All Karma</h2>
        <ShlokaCard
          verseRef="Bhagavad Gita 4.37"
          sanskrit="यथैधांसि समिद्धोऽग्निर्भस्मसात्कुरुतेऽर्जुन । ज्ञानाग्निः सर्वकर्माणि भस्मसात्कुरुते तथा ॥"
          iast="yathaidhāṃsi samiddho'gnirbhasmasātkurute'rjuna | jñānāgniḥ sarvakarmāṇi bhasmasātkurute tathā ||"
          meaningLabel="Translation"
          meaning="As a blazing fire reduces wood to ashes, O Arjuna, the fire of knowledge reduces all karma to ashes."
          insightLabel="Essence"
          insight="The Gita's most hopeful line about past karma. Not gradual dissolution — fire consuming wood completely. Genuine understanding of the nature of action and consciousness dissolves accumulated karmic residue. The past is not permanent."
          essence="Knowledge is the fire that burns all karma."
        />
        <p>
          <a href="/gita/chapter/4/verse/37" data-mp-location="quote_full_4_37" style={{ color: 'var(--gold-light)' }}>Read the full verse page for 4.37 →</a>
        </p>

        <h2 id="bg-5-10">10. Bhagavad Gita 5.10 — Offering Actions to Brahman</h2>
        <ShlokaCard
          verseRef="Bhagavad Gita 5.10"
          sanskrit="ब्रह्मण्याधाय कर्माणि सङ्गं त्यक्त्वा करोति यः । लिप्यते न स पापेन पद्मपत्रमिवाम्भसा ॥"
          iast="brahmaṇyādhāya karmāṇi saṅgaṃ tyaktvā karoti yaḥ | lipyate na sa pāpena padmapatramivāmbhasā ||"
          meaningLabel="Translation"
          meaning="One who performs actions, offering them to Brahman and abandoning attachment, is not touched by karmic residue — as a lotus leaf is not wet by water."
          insightLabel="Essence"
          insight="The image is precise: the lotus leaf sits in water but is never wet. Not because it avoids water but because of the structure of the leaf. Similarly the karma-yogi sits in action but is not covered by its residue — because of the internal orientation toward offering, not because they avoid action."
          essence="Act like a lotus leaf — in the water, but never wet by it."
        />
        <p>
          <a href="/gita/chapter/5/verse/10" data-mp-location="quote_full_5_10" style={{ color: 'var(--gold-light)' }}>Read the full verse page for 5.10 →</a>
        </p>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>What are the most famous karma quotes in the Bhagavad Gita?</strong>
          <p>
            The single most famous karma quote is Bhagavad Gita 2.47 — <em>karmaṇyevādhikāraste mā phaleṣu kadācana</em> — &ldquo;You have a right to action, never to its fruits.&rdquo; Other essential karma shlokas include 2.48 (evenness of mind is called yoga), 3.9 (action as yajna), 3.19 (always act unattached), 4.18 (see inaction in action), 4.37 (knowledge burns all karma) and 18.47 (do your own duty).
          </p>
        </div>

        <div className="faq-item">
          <strong>Which verse of the Bhagavad Gita talks about karma?</strong>
          <p>
            Karma is discussed across the entire Bhagavad Gita, but Chapter 3 (Karma Yoga) is dedicated to it. The foundational verse is 2.47. Chapter 2 verses 47-51, Chapter 3 verses 1-35, Chapter 4 verses 14-24 and 37-42, and Chapter 5 verses 8-12 are the densest passages on karma.
          </p>
        </div>

        <div className="faq-item">
          <strong>What is the meaning of karmanye vadhikaraste?</strong>
          <p>
            <em>Karmaṇyevādhikāraste</em> (कर्मण्येवाधिकारस्ते) is the opening of BG 2.47 and means &ldquo;you have a right to action alone.&rdquo; The full shloka continues: <em>mā phaleṣu kadācana</em> (&ldquo;never to its fruits&rdquo;), <em>mā karmaphalaheturbhūḥ</em> (&ldquo;do not let the fruit be your motive&rdquo;) and <em>mā te saṅgo&apos;stvakarmaṇi</em> (&ldquo;nor let attachment be to inaction&rdquo;). Four instructions in one verse.
          </p>
        </div>

        <div className="faq-item">
          <strong>Does the Bhagavad Gita say karma is fate?</strong>
          <p>
            No. BG 4.37 explicitly says knowledge (<em>jñāna</em>) burns all karma to ashes — the past is not permanent, understanding transforms it. Karma in the Gita describes the chain between intention, action and consequence; it is not a cosmic sentencing system.
          </p>
        </div>
      </div>

      <div className="related">
        <div className="related-title">Read next</div>
        <a href="/blogs/bhagavad-gita-karma-meaning" data-mp-location="read_next_karma_meaning">Karma in the Bhagavad Gita — The Real Meaning →</a>
        <a href="/blogs/nishkama-karma-bhagavad-gita" data-mp-location="read_next_nishkama">Nishkama Karma — Acting Without Attachment →</a>
        <a href="/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste" data-mp-location="read_next_2_47_blog">Bhagavad Gita 2.47 — Karmanye Vadhikaraste, Explained →</a>
        <a href="/gita/topic/karma-phala" data-mp-location="read_next_karma_phala_topic">Topic: Karma Phala (Fruit of Action) →</a>
      </div>
    </>
  )
}
