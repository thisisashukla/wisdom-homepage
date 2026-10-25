import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'
import { appStoreUrl } from '@/lib/app'

export const metadata: Metadata = {
  title: "What the Bhagavad Gita Says About Death — The Soul Is Never Born, Never Dies (BG 2.19-2.25)",
  description: "What does the Bhagavad Gita say about death? Krishna's answer to a grieving Arjuna: the soul (atman) is never born and never dies. Weapons cannot cut it, fire cannot burn it, water cannot wet it. BG 2.19-2.25 in Sanskrit, English, and plain modern words.",
  keywords: "bhagavad gita on death, bhagavad gita atman after death, atman bhagavad gita, nainam chindanti shastrani meaning, what does gita say about death, bhagavad gita death is not real, bhagavad gita 2.20 meaning, bhagavad gita atman eternal, bhagavad gita reincarnation, dehi meaning gita",
  openGraph: {
    title: "What the Bhagavad Gita Says About Death — The Soul Is Never Born, Never Dies (BG 2.19-2.25)",
    description: "Krishna's answer to a grieving Arjuna: the soul is never born and never dies. Weapons cannot cut it, fire cannot burn it. BG 2.19-2.25 in Sanskrit, English, and plain modern words.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagavad-gita-on-death-and-the-soul",
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sansearchapp',
    creator: '@thisisashukla',
    title: "What the Bhagavad Gita Says About Death — The Soul Is Never Born, Never Dies (BG 2.19-2.25)",
    description: "Krishna's answer to a grieving Arjuna: the soul is never born and never dies. Weapons cannot cut it, fire cannot burn it. BG 2.19-2.25 in Sanskrit and English.",
    images: ['https://wisdomquotes.in/og-image.webp'],
  },
  alternates: {
    canonical: "https://wisdomquotes.in/blogs/bhagavad-gita-on-death-and-the-soul",
    languages: {
      'en': "https://wisdomquotes.in/blogs/bhagavad-gita-on-death-and-the-soul",
      'en-IN': "https://wisdomquotes.in/blogs/bhagavad-gita-on-death-and-the-soul",
      'x-default': "https://wisdomquotes.in/blogs/bhagavad-gita-on-death-and-the-soul",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
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
            --muted-2: rgba(245,232,204,0.35);
            --border: rgba(200,136,30,0.2);
            --bg: #120505;
            --bg-warm: #190707;
            --bg-alt: #0f0404;
            --bg-card: rgba(255,255,255,0.04);
            --bg-card-hover: rgba(255,255,255,0.07);
            --max: 780px;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: var(--bg);
            color: var(--text);
            font-family: 'Inter', sans-serif;
            line-height: 1.7;
            font-size: 16px;
        }

        /* ── BREADCRUMB ── */
        .breadcrumb {
            background: var(--bg-alt);
            border-bottom: 1px solid var(--border);
        }
        .breadcrumb-inner {
            max-width: 1100px;
            margin: 0 auto;
            padding: 10px 28px;
            font-size: 12px;
            color: var(--text-dimmer);
            display: flex;
            gap: 8px;
            align-items: center;
        }
        .breadcrumb-inner a { color: var(--text-dimmer); transition: color 0.15s; }
        .breadcrumb-inner a:hover { color: var(--gold-light); }
        .bc-sep { opacity: 0.4; }

        /* ── ARTICLE HERO ── */
        .article-hero {
            background: var(--bg-warm);
            padding: 64px 28px 56px;
            border-bottom: 1px solid var(--border);
            position: relative;
            overflow: hidden;
        }
        .article-hero::before {
            content: "आत्मन्";
            position: absolute;
            right: -10px;
            bottom: -30px;
            font-family: "Noto Sans Devanagari", serif;
            font-size: 220px;
            color: rgba(200, 136, 30, 0.04);
            line-height: 1;
            pointer-events: none;
            user-select: none;
        }
        .article-hero-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 2; }
        .chapter-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(200, 136, 30, 0.1);
            border: 1px solid rgba(200, 136, 30, 0.28);
            color: var(--gold-light);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            padding: 5px 14px;
            border-radius: 100px;
            margin-bottom: 20px;
        }
        .chapter-badge-dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: var(--gold);
            box-shadow: 0 0 6px var(--gold);
            flex-shrink: 0;
        }
        h1.article-title {
            font-family: "Playfair Display", Georgia, serif;
            font-size: clamp(28px, 4vw, 48px);
            font-weight: 700;
            color: var(--gold-light);
            line-height: 1.15;
            letter-spacing: -0.5px;
            margin-bottom: 14px;
        }
        h1.article-title em { font-style: italic; color: #fff; }
        .article-subtitle {
            font-size: 17px;
            color: var(--text-dim);
            font-weight: 300;
            margin-bottom: 32px;
            line-height: 1.65;
            max-width: 620px;
        }
        .article-meta { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
        .meta-item { font-size: 12px; color: var(--text-dimmer); letter-spacing: 0.04em; }
        .meta-sep { color: var(--border); }

        .lead {
            font-size: 1.1rem;
            color: var(--text-dim);
            margin-bottom: 2rem;
            line-height: 1.8;
        }

        /* CHAPTER IMAGE */
        .chapter-image {
            margin: 32px 0 36px;
            border-radius: 14px;
            overflow: hidden;
            border: 1px solid var(--border);
            box-shadow: 0 4px 32px rgba(0,0,0,0.4);
        }
        .chapter-image img {
            width: 100%;
            height: auto;
            display: block;
            object-fit: cover;
        }
        .chapter-image figcaption {
            padding: 10px 18px;
            background: var(--bg-card);
            font-size: 11.5px;
            color: var(--text-dimmer);
            letter-spacing: 0.04em;
            font-style: italic;
            border-top: 1px solid var(--border);
        }

        /* Main Content */
        .content {
            max-width: var(--max);
            margin: 0 auto;
            padding: 0 2rem 4rem;
        }

        h2 {
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem;
            font-weight: 700;
            margin: 2.5rem 0 1.5rem 0;
            color: var(--gold);
            border-bottom: 2px solid var(--gold-dim);
            padding-bottom: 0.75rem;
        }

        h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.3rem;
            font-weight: 600;
            margin: 1.5rem 0 1rem 0;
            color: var(--text);
        }

        p {
            margin-bottom: 1.5rem;
            color: var(--text-dim);
        }

        /* Pull Quote */
        .pull-quote {
            border-left: 4px solid var(--gold);
            padding-left: 2rem;
            margin: 2.5rem 0;
            font-size: 1.15rem;
            color: var(--gold-light);
            font-style: italic;
            line-height: 1.8;
        }

        /* Highlight Box */
        .highlight-box {
            background: var(--gold-dim);
            border: 1px solid var(--gold-border);
            padding: 1.5rem;
            border-radius: 8px;
            margin: 2rem 0;
        }

        .highlight-box h3 {
            color: var(--gold);
            margin-top: 0;
        }

        .highlight-box p {
            color: var(--text);
            margin-bottom: 0.75rem;
        }

        /* FAQ Section */
        .faq-section {
            max-width: var(--max);
            margin: 3rem auto;
            padding: 0 2rem;
        }

        .faq-item {
            margin-bottom: 2rem;
            border-bottom: 1px solid var(--border);
            padding-bottom: 2rem;
        }

        .faq-item:last-child {
            border-bottom: none;
        }

        .faq-item strong {
            color: var(--gold-light);
            font-size: 1.05rem;
        }

        .faq-item p {
            margin-top: 0.75rem;
        }

        /* ── APP CTA ── */
        .app-cta {
          background: linear-gradient(160deg, #2d0a0a 0%, #1a0606 100%);
          border: 1px solid rgba(200, 136, 30, 0.25);
          border-top: 3px solid var(--gold);
          border-radius: 20px;
          padding: 44px 48px 40px;
          margin: 48px 0 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .app-cta::before {
          content: "ज्ञान";
          position: absolute;
          top: -14px;
          right: -8px;
          font-family: "Noto Sans Devanagari", sans-serif;
          font-size: 130px;
          color: rgba(200, 136, 30, 0.05);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }
        .app-cta-eyebrow {
          display: inline-flex;
          align-items: center;
          background: rgba(200, 136, 30, 0.12);
          border: 1px solid rgba(200, 136, 30, 0.35);
          color: var(--gold-light);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 20px;
          margin-bottom: 20px;
        }
        .app-cta-headline {
          font-family: "Playfair Display", serif;
          font-size: clamp(22px, 3vw, 30px);
          font-weight: 700;
          color: var(--text);
          line-height: 1.25;
          margin-bottom: 14px;
        }
        .app-cta-desc {
          font-size: 15px;
          color: var(--text-dim);
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto 22px;
        }
        .app-cta-features {
          display: flex;
          gap: 6px 18px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }
        .app-cta-features span {
          font-size: 13px;
          color: var(--gold-light);
          opacity: 0.8;
        }
        .app-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--gold);
          color: #120505;
          text-decoration: none;
          padding: 15px 34px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.01em;
          transition: all 0.2s;
          box-shadow: 0 4px 22px rgba(200, 136, 30, 0.3);
        }
        .app-cta-btn:hover {
          background: var(--gold-light);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(200, 136, 30, 0.5);
        }
        .app-cta-sub {
          font-size: 12px;
          color: rgba(245, 232, 204, 0.35);
          margin-top: 14px;
          letter-spacing: 0.04em;
        }

        /* Footer */
        footer {
            background: var(--bg-warm);
            border-top: 1px solid var(--border);
            padding: 3rem 2rem;
            text-align: center;
            color: var(--text-dimmer);
            margin-top: 4rem;
        }

        footer a {
            color: var(--gold);
            text-decoration: none;
        }

        footer a:hover {
            text-decoration: underline;
        }

        @media (max-width: 768px) {
            .article-hero { padding: 44px 20px 40px; }

            h2 {
                font-size: 1.5rem;
            }

        }

`

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "What the Bhagavad Gita Says About Death, the Atman, and What Comes After | Wisdom",
    "description": "Krishna tells a grieving Arjuna that the atman cannot be destroyed: weapons cannot cut it, fire cannot burn it, water cannot wet it (BG 2.23).",
    "datePublished": "2026-06-12",
    "dateModified": "2026-08-01",
    "image": { "@type": "ImageObject", "url": "https://wisdomquotes.in/og-image.webp", "width": 1200, "height": 630 },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://wisdomquotes.in/blogs/bhagavad-gita-on-death-and-the-soul" },
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
      "name": "Wisdom",
      "url": "https://wisdomquotes.in",
      "logo": { "@type": "ImageObject", "url": "https://wisdomquotes.in/assets/new-light-logo.webp" }
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Wisdom", "item": "https://wisdomquotes.in" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://wisdomquotes.in/blogs" },
      { "@type": "ListItem", "position": 3, "name": "Bhagavad Gita on Death: The Atman Cannot Be Cut, Burned or Wet (BG 2.19-2.25)", "item": "https://wisdomquotes.in/blogs/bhagavad-gita-on-death-and-the-soul" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does the Bhagavad Gita say happens after death?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Gita teaches that the atman survives the death of the body. The dehi, the embodied self, which is the atman in a body, moves on to another body the way a person changes worn-out clothes (2.22). BG 2.20 calls it aja (unborn) and nitya (eternal). BG 8.6 says the state of mind a person holds at death shapes where they go next."
        }
      },
      {
        "@type": "Question",
        "name": "What is the atman in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The atman is the self that cannot be destroyed. The Gita distinguishes it from the sharira (body); when it speaks of the dehi, the embodied one, it means the atman as it lives in a body. BG 2.25 calls it avyakta (unmanifest), achintya (beyond thought) and avikarya (unchanging). BG 2.20 calls it aja (unborn), nitya (eternal), shashvata (everlasting) and purana (ancient)."
        }
      },
      {
        "@type": "Question",
        "name": "Does the Bhagavad Gita believe in reincarnation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The Gita treats the passage of the dehi from body to body as a plain fact. BG 2.13 compares it to the body passing through childhood, youth, and old age in one lifetime. BG 15.7 says every living being is an eternal part of Krishna that draws the mind and senses to itself."
        }
      },
      {
        "@type": "Question",
        "name": "What is the full meaning of nainam chindanti shastrani?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nainam chindanti shastrani is BG 2.23: 'Weapons cannot cut the atman, fire cannot burn it, water cannot wet it, wind cannot dry it.' The verse names weapons, fire, water and wind, and says none of them can act on the atman, because it is of a different order from the things they act on."
        }
      },
      {
        "@type": "Question",
        "name": "Is the Gita's teaching about death the same as Buddhist teaching?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. The Gita and Buddhism reach opposite conclusions about the self after death. Buddhism teaches anatta (no-self): there is no permanent, unchanging entity that persists. The Gita teaches the opposite: the atman is the permanent, unchanging entity that persists across bodies. Both traditions use impermanence as a starting point but arrive at different conclusions about what is permanent."
        }
      }
    ]
  }
]

export default function DeathAndSoulPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageCSS }} />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <a href="/">Wisdom</a>
          <span className="bc-sep">/</span>
          <a href="/blogs">Blog</a>
          <span className="bc-sep">/</span>
          Death and the Atman in the Gita
        </div>
      </div>

      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · Chapter 2
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            The Bhagavad Gita on Death:<br />
            <em>What Cannot Be Destroyed</em>
          </h1>
          <p className="article-subtitle">
            In chapter 2 Krishna tells a grieving Arjuna that the atman is never born and never dies, and that weapons, fire, water and wind cannot touch it (2.20–24).
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Chapter 2 · Sankhya Yoga</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~6 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">BG 2.13 through 2.25</span>
            <span className="meta-sep">·</span>
            <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed October 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
          </div>
        </div>
      </div>

      <div className="content">
        <figure className="chapter-image">
          <img
            src="/assets/chapter2.webp"
            alt="Krishna speaking to Arjuna on the battlefield of Kurukshetra, Chapter 2 of the Bhagavad Gita"
            width="1200"
            height="675"
            loading="eager"
            fetchPriority="high"
          />
          <figcaption>Bhagavad Gita Chapter 2: The teaching on the eternal atman begins here</figcaption>
        </figure>

        <p className="lead">
          Krishna&apos;s first words to the weeping Arjuna are a rebuke: give up this weakness of heart and stand up (2.2–3). When Arjuna still refuses to fight, Krishna begins his teaching in 2.11 with a claim: the people Arjuna is grieving for cannot be killed. Much of what follows in the Gita builds on it.
        </p>

        <h2>What Is the Atman?</h2>
        <p>
          Chapter 2 uses three words close together. The sharira (also deha) is the body, which is born, ages and dies. The dehi is &ldquo;the embodied one&rdquo;, the one who lives in the body. The atman is the self. In these verses the dehi and the atman are the same thing seen from two sides: dehi names the self as it lives in a body, atman names it as it is.
        </p>
        <p>
          Krishna separates the self from everything that can be harmed. The body can be cut, burned and destroyed. The self passes from body to body (2.13, 2.22) and is itself unborn, unchanging and without end (2.20, 2.24).
        </p>
        <p>
          BG 2.13 starts with an everyday example: the body already passes through great change, and nobody says the person died along the way.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.13"
          sanskrit="देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा । तथा देहान्तरप्राप्तिर्धीरस्तत्र न मुह्यति ॥"
          iast="dehino'sminyathā dehe kaumāraṃ yauvanaṃ jarā | tathā dehāntaraprāptirdhīrastatra na muhyati ||"
          meaningLabel="Translation"
          meaning="Just as the embodied self passes through childhood, youth and old age in this body, so it passes into another body. The wise are not confused by this."
          insightLabel="What This Teaches"
          insight="The argument is an analogy. The child&apos;s body you once had is gone, yet no one says you died between childhood and adulthood. The dehi passed through those forms. Krishna treats death as the same kind of passage, only more complete, and says the wise are not thrown by it."
          essence="As the self passes through childhood, youth and age, so it passes to another body."
        />

        <p>
          The Gita&apos;s argument about death begins here, with no promise about heaven or reunion. You have already lived through great change, and what you are has persisted through it. Krishna puts the death of the body in the same class of change.
        </p>

        <h2>The Four Negatives: BG 2.23</h2>
        <p>
          Verse 2.23 is the one people quote on this subject. It is often quoted on its own, but it comes in the middle of an argument Krishna has been building since 2.16. Here he puts it as four negations.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.23: nainam chindanti shastrani"
          sanskrit="नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः । न चैनं क्लेदयन्त्यापो न शोषयति मारुतः ॥"
          iast="nainaṃ chindanti śastrāṇi nainaṃ dahati pāvakaḥ | na cainaṃ kledayantyāpo na śoṣayati mārutaḥ ||"
          meaningLabel="Translation"
          meaning="Weapons cannot cut it, fire cannot burn it, water cannot wet it, and wind cannot dry it."
          insightLabel="What This Teaches"
          insight="The verse runs through four agents: weapons cut, fire burns, water wets, wind dries. Krishna says none of them can act on the atman. His reason, given in 2.24–25, is that the atman is unmanifest and beyond thought, of a different order from anything a weapon or an element can reach."
          essence="Weapons cannot cut it, fire cannot burn it, water cannot wet it, wind cannot dry it."
        />

        <p>
          The verse that follows, 2.24, continues the description. The atman is acchedya (cannot be cut), adahya (cannot be burned), akledya (cannot be wet), and ashoshya (cannot be dried). It is nitya (perpetual), sarvagatah (all-pervading), sthanuh (stable), achala (unmoving) and sanatana (eternal). Each word adds something. Together they describe something that is everywhere, stays still, has no end, and lies beyond the reach of any physical force.
        </p>

        

        <h2>The Eternal, the Unchanging: BG 2.20</h2>
        <p>
          BG 2.20 states the point directly. It comes before 2.23 and sets out the terms that 2.23 then applies.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.20"
          sanskrit="न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः । अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे ॥"
          iast="na jāyate mriyate vā kadācinnāyaṃ bhūtvā bhavitā vā na bhūyaḥ | ajo nityaḥ śāśvato'yaṃ purāṇo na hanyate hanyamāne śarīre ||"
          meaningLabel="Translation"
          meaning="The atman never takes birth and never dies. It has not come into being and will not come to be again. It is unborn (aja), eternal (nitya), everlasting (shashvata) and ancient (purana). It is not slain when the body is slain."
          insightLabel="What This Teaches"
          insight="That last line, na hanyate hanyamane sharire, turns the verse. Krishna says this to a man on a battlefield who is about to kill and be killed, as a claim about what happens when a body dies."
          essence="The atman is birthless, eternal, and untouched by destruction."
        />

        <p>
          The four adjectives are worth taking one at a time. Aja means unborn. Nitya means eternal, always existing. Shashvata means everlasting. Purana means ancient, or primeval. Together they describe something that was never created and cannot be destroyed, since creation and destruction apply to things that come into existence and leave it.
        </p>

        <h2>The Old Clothes Analogy: BG 2.22</h2>
        <p>
          The plainest image the Gita gives for the dehi moving on is the clothes analogy in 2.22. People often quote it when talking about rebirth, and it needs no background in philosophy.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.22"
          sanskrit="वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि । तथा शरीराणि विहाय जीर्णान्यन्यानि संयाति नवानि देही ॥"
          iast="vāsāṃsi jīrṇāni yathā vihāya navāni gṛhṇāti naro'parāṇi | tathā śarīrāṇi vihāya jīrṇānyanyāni saṃyāti navāni dehī ||"
          meaningLabel="Translation"
          meaning="Just as a person discards worn-out clothes and puts on new ones, the dehi leaves behind old, worn-out bodies and moves into new ones."
          insightLabel="What This Teaches"
          insight="The analogy is ordinary on purpose. Changing clothes is no crisis, and the person changing is no smaller for it. The outer layer changes; the one wearing it continues. Krishna says the dehi and the body stand in the same relation: the body wears out, and the dehi takes another. The verse says nothing about memory or personality."
          essence="As a person puts on new clothes, the embodied self takes on new bodies."
        />

        <p>
          The analogy has a limit. &ldquo;The same person in different clothes&rdquo; usually means the same face, voice and memories. The Gita claims less: what continues is the dehi. In 15.8 the self carries the mind and senses to a new body as the wind carries scent, and the verse does not say whether personal memory goes along.
        </p>

        <h2>What Krishna Says About Grief</h2>
        <p>
          Krishna does tell Arjuna to stop grieving. He opens in 2.11 with &ldquo;you grieve for those who should not be grieved for&rdquo;, and he repeats &ldquo;you should not grieve&rdquo; in 2.25, 2.27 and 2.30. His method is argument: he gives Arjuna a different picture of what is happening, so that the grief has no false premise to rest on.
        </p>

        <div className="highlight-box">
          <h3>A Claim About the Self</h3>
          <p>
            The Gita&apos;s claim is that the atman is eternal. For someone grieving today, that claim does not make the loss of a particular face, a particular person you loved, easy to bear, and the Gita never promises that it will.
          </p>
          <p>
            A condolence card says &ldquo;they are at peace now.&rdquo; Krishna says that what they were was never in danger. The second statement is harder to hear when someone you love has died.
          </p>
        </div>

        <h2>Impermanence and What Changes: BG 2.14</h2>
        <p>
          BG 2.14 comes just before the main atman verses and gives the other side of the picture. The body and the world of experience are impermanent. Contact with the external world produces heat and cold, pleasure and pain. These come and go. The instruction is to bear them without being defined by them.
        </p>
        <p>
          The verse accepts that loss is real and that experience comes and goes. Two verses later, 2.16 says that what is unreal has no being and what is real never ceases to be. The changing layer of experience is one thing; the one who experiences it is another.
        </p>
        <p>
          The body belongs to the changing layer, and the atman to the other. The Gita draws that line without saying that nothing matters.
        </p>

        <h2>What Happens After Death: BG 15.7</h2>
        <p>
          The Gita returns to the question of what continues in Chapter 15. BG 15.7 says that every living being in this world is an eternal portion of Krishna, which draws to itself the mind and the five senses.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 15.7"
          sanskrit="ममैवांशो जीवलोके जीवभूतः सनातनः । मनःषष्ठानीन्द्रियाणि प्रकृतिस्थानि कर्षति ॥"
          iast="mamaivāṃśo jīvaloke jīvabhūtaḥ sanātanaḥ | manaḥṣaṣṭhānīndriyāṇi prakṛtisthāni karṣati ||"
          meaningLabel="Translation"
          meaning="An eternal part of me becomes the living being in the realm of the living, and draws to itself the mind and the five senses, which rest in prakriti."
          insightLabel="What This Teaches"
          insight="The jiva, the individual self, is called an eternal amsha, a portion of Krishna. It is sanātana, eternal. It pulls the mind and senses to itself, and the next verse, 15.8, says that when it leaves a body it carries them along to the next, as the wind carries scent from flowers."
          essence="An eternal part of me becomes the living being and draws in mind and senses."
        />

        <p>
          Chapter 8 says more about what shapes the next birth: whatever state a person remembers at the end, to that state they go (8.6). The Gita gives no detailed map of the afterlife. It gives a direction: the dehi continues, shaped by what it has been attached to, and the aim is to loosen that attachment.
        </p>

        <h2>How This Bears on How You Live</h2>
        <p>
          The Gita spends little time on whether there is life after death. Its question is how to live once you accept that the atman is eternal.
        </p>
        <p>
          If you are the atman, then comfort for the body is only part of what is worth working for, and you can ask what serves the self as well as what serves the body.
        </p>
        <p>
          The Gita still expects you to look after the body. Its question is where you place your sense of who you are. A sense of self built only on the body rests on something that will end. Holding the body as the dehi&apos;s present garment changes how a person meets loss and aging.
        </p>

        <div className="highlight-box">
          <h3>Why the Rest of the Gita Needs This</h3>
          <p>
            Much of the Gita&apos;s later teaching assumes this one. Karma yoga asks you to act without attachment to results, which is hard to justify if the body&apos;s comfort and survival are all that is at stake. Bhakti, in 15.7, rests on the self being a part of Krishna.
          </p>
          <p>
            Fear of death and grief stay with a person who accepts this teaching. Krishna adds that they are not the last word on what has happened.</p> </div> <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected the account of dehi and atman (in 2.13–2.22 the dehi is the atman, embodied), the glosses of sanātana (eternal), purāṇa (ancient) and śāśvata (everlasting), the translations of 2.13 and 15.7, the elements in 2.23, and the claim that Krishna does not tell Arjuna to stop grieving (see 2.11, 2.25); copy edited.</p>
      </div>


      <FeedbackWidget pageType="blog" />
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>What does the Bhagavad Gita say happens after death?</strong>
          <p>
            The Gita teaches that the atman survives the death of the body. The dehi, the embodied self, which is the atman in a body, moves on to another body the way a person changes worn-out clothes (2.22). BG 2.20 calls it aja (unborn) and nitya (eternal). BG 8.6 says the state of mind a person holds at death shapes where they go next.
          </p>
        </div>

        <div className="faq-item">
          <strong>What is the atman in the Bhagavad Gita?</strong>
          <p>
            The atman is the self that cannot be destroyed. The Gita distinguishes it from the sharira (body); when it speaks of the dehi, the embodied one, it means the atman as it lives in a body. BG 2.25 calls it avyakta (unmanifest), achintya (beyond thought) and avikarya (unchanging). BG 2.20 calls it aja (unborn), nitya (eternal), shashvata (everlasting) and purana (ancient). Readers often compare it to the soul, but in the Gita it is closer to pure consciousness, the witness present in every experience, and it moves on by rebirth.
          </p>
        </div>

        <div className="faq-item">
          <strong>Does the Bhagavad Gita believe in reincarnation?</strong>
          <p>
            Yes. The Gita treats the passage of the dehi from body to body as a plain fact. BG 2.13 compares it to the body passing through childhood, youth, and old age in one lifetime. BG 2.22 uses the clothes analogy. BG 15.7 says every living being is an eternal part of Paramātma, drawn into the world and attached to the senses. The Gita gives few details about how rebirth works and takes it as a starting premise.
          </p>
        </div>

        <div className="faq-item">
          <strong>What is the full meaning of nainam chindanti shastrani?</strong>
          <p>
            Nainam chindanti shastrani is BG 2.23: &ldquo;Weapons cannot cut the atman, fire cannot burn it, water cannot wet it, wind cannot dry it.&rdquo; The verse names weapons, fire, water and wind, and says none of them can act on the atman, because it is of a different order from the things they act on. The verse continues in 2.24 with more adjectives: acchedya (uncuttable), adahya (unburnable), nityah (eternal), sarvagatah (all-pervading), sthanuh (stable), achala (unmoving), sanātana (eternal).
          </p>
        </div>

        <div className="faq-item">
          <strong>Is the Gita&apos;s teaching about death the same as Buddhist teaching?</strong>
          <p>
            No. The Gita and Buddhism reach opposite conclusions about the self after death. Buddhism teaches anatta (no-self): there is no permanent, unchanging entity that persists. The continuity across lives, in Buddhist thought, is more like the continuity of a flame passed from candle to candle. The Gita teaches the opposite: the atman is the permanent, unchanging entity that persists across bodies. Both traditions use impermanence as a starting point but arrive at different conclusions about what, if anything, is permanent.
          </p>
        </div>
      </div>

      <VerseFunnelCTA variant="chapter" locale="en" pageName={"Bhagavad Gita On Death and Atman"} />

      <footer>
        <p>© 2026 Wisdom App. Bhagavad Gita, tuned to your life.</p>
        <p><a href="https://wisdomquotes.in">Home</a> — <a href="https://wisdomquotes.in/blogs">Blog</a> — <a href={appStoreUrl('web_blog_footer')} target="_blank" rel="noopener" data-mp-location="footer">Download</a></p>
      </footer>

      <BlogTracker pageName="Bhagavad Gita On Death and Atman" />
    </>
  )
}
