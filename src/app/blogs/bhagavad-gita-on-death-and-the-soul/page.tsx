import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import ShlokaCard from '@/components/gita/ShlokaCard'

export const metadata: Metadata = {
  title: "What the Bhagavad Gita Says About Death, the Soul, and What Comes After | Wisdom",
  description: "The Gita's teaching on death is not comfort. It's a structural claim: the atman cannot be destroyed. Weapons don't cut it, fire doesn't burn it, water doesn't wet it. Here's what BG 2.19-2.25 actually says.",
  keywords: "bhagavad gita on death, bhagavad gita soul after death, atman bhagavad gita, nainam chindanti shastrani meaning, what does gita say about death, bhagavad gita death is not real, bhagavad gita 2.20 meaning, bhagavad gita atman eternal, bhagavad gita reincarnation, dehi meaning gita",
  openGraph: {
    title: "What the Bhagavad Gita Says About Death, the Soul, and What Comes After | Wisdom",
    description: "The Gita's teaching on death is not comfort. It's a structural claim: the atman cannot be destroyed. Weapons don't cut it, fire doesn't burn it. Here's what BG 2.19-2.25 actually says.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagavad-gita-on-death-and-the-soul",
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/bhagavad-gita-on-death-and-the-soul" },
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
    "headline": "What the Bhagavad Gita Says About Death, the Soul, and What Comes After | Wisdom",
    "description": "The Gita's teaching on death is not comfort. It's a structural claim: the atman cannot be destroyed. Weapons don't cut it, fire doesn't burn it, water doesn't wet it.",
    "datePublished": "2026-06-12",
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
        "name": "What does the Bhagavad Gita say happens after death?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Gita teaches that the atman does not die when the body dies. The dehi (the one who inhabits the body) moves on to another body, the way a person changes worn-out clothes. The atman itself is described as aja (unborn) and nitya (eternal), having no beginning and no end. The specific circumstances of the next life are shaped by karma accumulated in this one."
        }
      },
      {
        "@type": "Question",
        "name": "What is the atman in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The atman is the self that cannot be destroyed. The Gita distinguishes it from the sharira (body) and even from the dehi (the embodied self). The atman is avyakta (unmanifest), achintya (beyond thought), and avikaryam (without modification). BG 2.20 calls it aja (unborn), nitya (eternal), shashvata (changeless), and purana (beginningless)."
        }
      },
      {
        "@type": "Question",
        "name": "Does the Bhagavad Gita believe in reincarnation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The Gita treats the continuity of the dehi across bodies as a basic fact, not a metaphor. BG 2.13 compares it to the body passing through childhood, youth, and old age in one lifetime. BG 15.7 says every living being is an eternal part of Paramātma, drawn into the world and attached to the senses."
        }
      },
      {
        "@type": "Question",
        "name": "What is the full meaning of nainam chindanti shastrani?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nainam chindanti shastrani is BG 2.23: 'Weapons cannot cut the atman, fire cannot burn it, water cannot wet it, wind cannot dry it.' The verse is making four specific negations about the four classical elements and their effects. The atman is beyond all physical harm, not because it is strong but because it is of a different order of reality than material things."
        }
      },
      {
        "@type": "Question",
        "name": "Is the Gita's teaching about death the same as Buddhist teaching?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. The Gita and Buddhism reach opposite conclusions about the self after death. Buddhism teaches anatta (no-self): there is no permanent, unchanging entity that persists. The Gita teaches the opposite: the atman is precisely the permanent, unchanging entity that persists across bodies. Both traditions use impermanence as a starting point but arrive at different conclusions about what is permanent."
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
          Death and the Soul in the Gita
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
            <em>What Actually Cannot Be Destroyed</em>
          </h1>
          <p className="article-subtitle">
            This is not reassurance. It is a philosophical claim about the structure of reality. The atman is not protected from death. It is outside the category of things that can die.
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
            <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed June 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
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
          Krishna&apos;s first move in the Gita is not a pep talk. He does not tell Arjuna to be brave, or that things will work out, or that the battle is worth it for the right reasons. He makes a claim: the people you think you are killing cannot actually be killed. This is not comfort. It is a philosophical position, and it is the foundation on which the rest of the text stands. If you miss it, you miss the Gita.
        </p>

        <h2>What Is the Atman?</h2>
        <p>
          The Gita uses three terms in close proximity in Chapter 2, and they are not interchangeable. The sharira is the body, the physical form that is born, ages, and dies. The dehi is the one who inhabits the body, sometimes translated as &ldquo;the embodied one.&rdquo; And the atman is the self itself, the real presence behind both.
        </p>
        <p>
          The critical move Krishna makes is to separate the atman from everything that can be harmed. The sharira can be cut, burned, and destroyed. The dehi moves from body to body. But the atman is in a different category entirely. It does not move. It does not change. It does not begin or end. It simply is.
        </p>
        <p>
          BG 2.13 introduces this logic with the gentlest possible example: the body itself already passes through radical change, and we don&apos;t say the person dies each time.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.13"
          sanskrit="देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा । तथा देहान्तरप्राप्तिर्धीरस्तत्र न मुह्यति ॥"
          iast="dehino'sminyathā dehe kaumāraṃ yauvanaṃ jarā | tathā dehāntaraprāptirdhīrastatra na muhyati ||"
          meaningLabel="Translation"
          insightLabel="What This Teaches"
          essence="You are the changeless ātman; let go of fear when facing change."
        />

        <p>
          This is where the Gita&apos;s argument about death begins. Not with a promise about heaven, not with a comfort about reunion. With a structural claim: you have already survived enormous change. What you are has persisted through all of it. The death of the body is a change in degree, not in kind.
        </p>

        <h2>The Four Negatives: BG 2.23</h2>
        <p>
          The most famous verse on this subject is 2.23. It is often quoted as a standalone comfort, but it only works as the conclusion of an argument already in progress. Krishna has been laying out the nature of the atman for six verses. Then he states it in the form of four absolute negations.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.23: nainam chindanti shastrani"
          sanskrit="नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः । न चैनं क्लेदयन्त्यापो न शोषयति मारुतः ॥"
          iast="nainaṃ chindanti śastrāṇi nainaṃ dahati pāvakaḥ | na cainaṃ kledayantyāpo na śoṣayati mārutaḥ ||"
          meaningLabel="Translation"
          insightLabel="What This Teaches"
          essence="Your ātman cannot be harmed by anything outside. You are forever whole within."
        />

        <p>
          The verse that follows, 2.24, continues the description. The atman is acchedya (cannot be cut), adahya (cannot be burned), akledya (cannot be wet), and ashoshya (cannot be dried). It is nitya (perpetual), sarvagatah (all-pervading), sthanuh (stable), achala (unmoving), and sanatana (beginningless). These are not poetic intensifiers. Each term is doing conceptual work. Together they describe something that is not located anywhere in particular, does not move, does not begin, does not end, and cannot be acted upon by any physical force.
        </p>

        <div className="pull-quote">
          The atman is not strong enough to survive death. It is not the kind of thing that death applies to.
        </div>

        <h2>The Eternal, the Unchanging: BG 2.20</h2>
        <p>
          BG 2.20 is the direct statement. It comes before 2.23 and establishes the terms that 2.23 then applies. The verse is dense. Every noun carries weight.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.20"
          sanskrit="न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः । अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे ॥"
          iast="na jāyate mriyate vā kadācinnāyaṃ bhūtvā bhavitā vā na bhūyaḥ | ajo nityaḥ śāśvato'yaṃ purāṇo na hanyate hanyamāne śarīre ||"
          meaningLabel="Translation"
          insightLabel="What This Teaches"
          essence="The atman is birthless, eternal, and untouched by destruction."
        />

        <p>
          The four Sanskrit adjectives here are worth sitting with separately. Aja means without birth, literally &ldquo;not born.&rdquo; Nitya means eternal, always existing. Shashvata means changeless, the same across all time. Purana means beginningless, without a starting point. Together they describe something that was never created and can never be destroyed, because creation and destruction are only possible for things that enter and exit existence. The atman never entered. It is not going anywhere.
        </p>

        <h2>The Old Clothes Analogy: BG 2.22</h2>
        <p>
          The most accessible image the Gita offers for the continuity of the dehi is the clothes analogy in 2.22. It is the verse that gets quoted most often in conversations about reincarnation, and for good reason. It does not require any metaphysical background to understand.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.22"
          sanskrit="वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि । तथा शरीराणि विहाय जीर्णान्यन्यानि संयाति नवानि देही ॥"
          iast="vāsāṃsi jīrṇāni yathā vihāya navāni gṛhṇāti naro'parāṇi | tathā śarīrāṇi vihāya jīrṇānyanyāni saṃyāti navāni dehī ||"
          meaningLabel="Translation"
          insightLabel="What This Teaches"
          essence="You are not the sharira; you are the ever-renewing dehi."
        />

        <p>
          The limit of the analogy is worth acknowledging. We know what we mean when we say &ldquo;the same person in different clothes.&rdquo; We mean the face, the voice, the memories, the relationships. The Gita&apos;s claim is more minimal. What continues is the dehi, the one who inhabits the body. The memories, the personality, the relational ties: these are built up in each life from the sharira and the senses, and they are left behind with the body. What continues is deeper than that, and harder to point at.
        </p>

        <h2>What This Is Not Saying</h2>
        <p>
          The Gita is not dismissing grief. Krishna does not tell Arjuna &ldquo;stop feeling sad, death is an illusion.&rdquo; The word he uses at the opening of this teaching is shoka, sorrow. He is not telling Arjuna to stop having it. He is trying to give Arjuna a more accurate picture of what is actually happening so that the sorrow is not based on a false premise.
        </p>

        <div className="highlight-box">
          <h3>The Teaching Is Metaphysical, Not Psychological</h3>
          <p>
            There is a real difference between the claim &ldquo;grief is valid&rdquo; and the claim &ldquo;the atman is eternal.&rdquo; The Gita is making the second claim. It is not making the first claim or its opposite. The fact that the atman is eternal does not make the loss of a specific body, a specific face, a specific person you loved, easy to bear. The Gita is not promising ease. It is promising structural truth.
          </p>
          <p>
            This is harder to receive than the greeting-card version. The greeting-card version says &ldquo;they are at peace now.&rdquo; The Gita says &ldquo;what they actually were was never in danger.&rdquo; These are very different claims, and the second one does not fit neatly into the space we are trying to fill when someone we love dies.
          </p>
        </div>

        <h2>Impermanence and What Changes: BG 2.14</h2>
        <p>
          BG 2.14 comes before the atman verses and establishes the other side of the picture. The body and the world of experience are impermanent. Contact with the external world produces heat and cold, pleasure and pain. These come and go. The instruction is to bear them without being defined by them.
        </p>
        <p>
          This matters for understanding the Gita&apos;s full position on death. It is not saying that loss is not real. The verse acknowledges that things come and go, that experience is transient. What it is doing is pointing to what does not come and go. There is the layer of experience that is constantly changing, and there is what is experiencing it. The second is not the first. They are in different categories.
        </p>
        <p>
          The body belongs to the impermanent layer. The atman does not. This is the distinction the Gita is drawing. Not &ldquo;nothing matters&rdquo; but &ldquo;not everything you think is you is actually you.&rdquo;
        </p>

        <h2>What Happens After Death: BG 15.7</h2>
        <p>
          The Gita returns to the question of what continues in Chapter 15. BG 15.7 says that every living being in this world is an eternal portion of the Paramātma, but becomes identified with the mind and the five senses, taking them to be its real self.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 15.7"
          sanskrit="ममैवांशो जीवलोके जीवभूतः सनातनः । मनःषष्ठानीन्द्रियाणि प्रकृतिस्थानि कर्षति ॥"
          iast="mamaivāṃśo jīvaloke jīvabhūtaḥ sanātanaḥ | manaḥṣaṣṭhānīndriyāṇi prakṛtisthāni karṣati ||"
          meaningLabel="Translation"
          insightLabel="What This Teaches"
          essence="You are always a part of Paramātma, greater than your mind or senses."
        />

        <p>
          The mechanics of what determines the next birth are addressed more fully in Chapter 8, where Krishna describes the state of consciousness at the moment of death as particularly significant. The Gita does not offer a detailed map of the afterlife. What it does offer is a direction of travel: the dehi continues, shaped by what it has been attached to. The goal is to weaken that attachment, so the continuity becomes less about the senses and more about the atman itself.
        </p>

        <h2>The Practical Teaching: How This Should Change How You Live</h2>
        <p>
          The question the Gita is actually asking is not &ldquo;is there life after death?&rdquo; The question is: once you understand that the atman is eternal, how do you live?
        </p>
        <p>
          If the body is not what you are, then clinging to its comfort and avoiding its discomfort becomes a less complete account of what is worth doing. If the atman is what you actually are, then the question becomes: what nourishes the atman, and what merely nourishes the sharira? What do you build your life around? What do you spend your attention on?
        </p>
        <p>
          The Gita is not telling you to ignore the body or treat it carelessly. It is saying that the level of reality you invest your deepest identification in matters. If you identify only with the sharira, you are building your entire sense of self on something that will end. If you can hold the sharira lightly, as the dehi&apos;s present garment, something shifts in how you relate to loss, to aging, to the dying of things around you.
        </p>

        <div className="highlight-box">
          <h3>What the Gita Actually Asks of You</h3>
          <p>
            The teaching on the atman is not a philosophical curiosity. It is the ground of every other teaching in the Gita. Karma yoga makes no sense if you think you are only the body: why would you act without attachment to results if your body&apos;s comfort and survival are the only things at stake? Bhakti makes no sense if the divine is just an external being you are trying to impress. The atman teaching is the foundation.
          </p>
          <p>
            Once you have sat with the claim that what you actually are cannot be destroyed, it changes the frame for everything. Fear of death is still there. Grief is still there. But they are not the final word. There is something in you that neither sword nor fire can reach.
          </p>
        </div>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>What does the Bhagavad Gita say happens after death?</strong>
          <p>
            The Gita teaches that the atman does not die when the body dies. The dehi (the one who inhabits the body) moves on to another body, the way a person changes worn-out clothes. The atman itself is described as aja (unborn) and nitya (eternal), having no beginning and no end. The specific circumstances of the next life are shaped by karma accumulated in this one.
          </p>
        </div>

        <div className="faq-item">
          <strong>What is the atman in the Bhagavad Gita?</strong>
          <p>
            The atman is the self that cannot be destroyed. The Gita distinguishes it from the sharira (body) and even from the dehi (the embodied self). The atman is avyakta (unmanifest), achintya (beyond thought), and avikaryam (without modification). BG 2.20 calls it aja (unborn), nitya (eternal), shashvata (changeless), and purana (beginningless). It is not a soul in the Christian sense, a discrete personal entity that either goes to heaven or hell. It is closer to pure consciousness, the witness that is present in every experience.
          </p>
        </div>

        <div className="faq-item">
          <strong>Does the Bhagavad Gita believe in reincarnation?</strong>
          <p>
            Yes. The Gita treats the continuity of the dehi across bodies as a basic fact, not a metaphor. BG 2.13 compares it to the body passing through childhood, youth, and old age in one lifetime. BG 2.22 uses the clothes analogy. BG 15.7 says every living being is an eternal part of Paramātma, drawn into the world and attached to the senses. The Gita does not go into extensive detail about how reincarnation works. It states it as the starting premise.
          </p>
        </div>

        <div className="faq-item">
          <strong>What is the full meaning of nainam chindanti shastrani?</strong>
          <p>
            Nainam chindanti shastrani is BG 2.23: &ldquo;Weapons cannot cut the atman, fire cannot burn it, water cannot wet it, wind cannot dry it.&rdquo; The verse is making four specific negations about the four classical elements and their effects. The atman is beyond all physical harm, not because it is strong but because it is of a different order of reality than material things. You cannot cut what has no material substance. The verse continues in 2.24 with more adjectives: acchedya (uncuttable), adahya (unburnable), nityah (eternal), sarvagatah (all-pervading), sthanuh (stable), achala (unmoving), sanātana (beginningless).
          </p>
        </div>

        <div className="faq-item">
          <strong>Is the Gita&apos;s teaching about death the same as Buddhist teaching?</strong>
          <p>
            No. The Gita and Buddhism reach opposite conclusions about the self after death. Buddhism teaches anatta (no-self): there is no permanent, unchanging entity that persists. The continuity across lives, in Buddhist thought, is more like the continuity of a flame passed from candle to candle. The Gita teaches the opposite: the atman is precisely the permanent, unchanging entity that persists across bodies. Both traditions use impermanence as a starting point but arrive at different conclusions about what, if anything, is permanent.
          </p>
        </div>
      </div>

      {/* ── APP CTA ── */}
      <div className="app-cta">
        <div className="app-cta-eyebrow">Free iOS App</div>
        <div className="app-cta-headline">One shloka a morning.<br />Let it stay with you all day.</div>
        <p className="app-cta-desc">
          The Wisdom app delivers one Bhagavad Gita verse each day: Devanagari script, transliteration, meaning, and how it applies right now. 700 verses. Home screen widget. Free.
        </p>
        <div className="app-cta-features">
          <span>✦ Daily shloka in Sanskrit</span>
          <span>✦ Meaning & modern context</span>
          <span>✦ Home screen widget</span>
        </div>
        <a href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125"
           target="_blank" rel="noopener"
           className="app-cta-btn"
           data-mp-location="cta">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
          Download on the App Store
        </a>
        <div className="app-cta-sub">Free · iPhone · No account needed</div>
      </div>

      <footer>
        <p>© 2026 Wisdom App. A daily verse to quiet the mind.</p>
        <p><a href="https://wisdomquotes.in">Home</a> — <a href="https://wisdomquotes.in/blogs">Blog</a> — <a href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125" target="_blank" rel="noopener" data-mp-location="footer">Download</a></p>
      </footer>

      <BlogTracker pageName="Bhagavad Gita On Death and Soul" />
    </>
  )
}
