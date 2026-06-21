import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import ShlokaCard from '@/components/gita/ShlokaCard'

export const metadata: Metadata = {
  title: "Sthitaprajna: The Bhagavad Gita's 18-Verse Portrait of an Unshakeable Mind | Wisdom",
  description: "Sthitaprajna is the Gita's word for a person whose wisdom is steady. BG 2.55-2.72 lists the exact qualities. Not calm at all costs. Steady at the root. Here's what that actually looks like.",
  keywords: "sthitaprajna meaning, sthitaprajna bhagavad gita, sthitaprajna lakshana, sthita prajna definition, steady minded person bhagavad gita, bhagavad gita 2.55 meaning, bhagavad gita equanimity, wise person gita qualities, sthita dhi",
  openGraph: {
    title: "Sthitaprajna: The Bhagavad Gita's 18-Verse Portrait of an Unshakeable Mind | Wisdom",
    description: "Sthitaprajna is the Gita's word for a person whose wisdom is steady. BG 2.55-2.72 lists the exact qualities. Not calm at all costs. Steady at the root.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/sthitaprajna-bhagavad-gita",
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/sthitaprajna-bhagavad-gita" },
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
            content: "स्थित";
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

        /* Quick reference list */
        .verse-reference-list {
            margin: 2rem 0;
            display: grid;
            gap: 0.6rem;
        }
        .verse-ref-item {
            display: grid;
            grid-template-columns: 90px 1fr;
            gap: 1rem;
            align-items: start;
            padding: 0.85rem 1rem;
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 6px;
            font-size: 0.92rem;
        }
        .verse-ref-item:hover {
            background: var(--bg-card-hover);
        }
        .verse-ref-num {
            color: var(--gold);
            font-weight: 700;
            font-size: 0.82rem;
            letter-spacing: 0.05em;
            padding-top: 1px;
        }
        .verse-ref-essence {
            color: var(--text-dim);
            line-height: 1.5;
        }

        /* Cascade diagram */
        .cascade-chain {
            margin: 2rem 0;
            display: flex;
            flex-direction: column;
            gap: 0;
        }
        .cascade-step {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.75rem 1rem;
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 6px;
            margin-bottom: 2px;
            font-size: 0.95rem;
            color: var(--text-dim);
        }
        .cascade-step .step-num {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: var(--gold-dim);
            border: 1px solid var(--gold-border);
            color: var(--gold-light);
            font-size: 0.75rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        .cascade-arrow {
            text-align: center;
            color: var(--gold);
            opacity: 0.5;
            font-size: 1.2rem;
            margin: 2px 0;
            line-height: 1;
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

        /* App CTA */
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
            h2 { font-size: 1.5rem; }
            .app-cta { padding: 32px 24px 28px; }
            .verse-ref-item { grid-template-columns: 70px 1fr; }
        }

`

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Sthitaprajna: The Bhagavad Gita's 18-Verse Portrait of an Unshakeable Mind | Wisdom",
    "description": "Sthitaprajna is the Gita's word for a person whose wisdom is steady. BG 2.55-2.72 lists the exact qualities. Not calm at all costs. Steady at the root.",
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
        "name": "What does sthitaprajna mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sthitaprajna is a Sanskrit compound: sthita means steady or established, prajna means wisdom or discernment. Together it means one whose wisdom is steady, or a person of steady intellect. The Bhagavad Gita uses this word for someone whose inner stability does not depend on external conditions."
        }
      },
      {
        "@type": "Question",
        "name": "Which verses describe sthitaprajna in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The sthitaprajna description spans BG 2.55 to 2.72, eighteen consecutive verses in Chapter 2. It begins after Arjuna's question in verse 2.54, where he asks Krishna to describe the marks of a person of steady wisdom. Krishna's answer is the most sustained character description in the chapter."
        }
      },
      {
        "@type": "Question",
        "name": "What are the sthitaprajna lakshana, the marks of steady wisdom?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The key marks include: abandoning all desires from the mind and being content within oneself (2.55), not being disturbed by sorrow or excited by pleasure (2.56), remaining unattached in all situations (2.57), withdrawing the senses from objects when needed like a turtle withdrawing its limbs (2.58), staying steady even when sense objects are present (2.59-2.61), and being like an ocean that receives all rivers without overflowing (2.70)."
        }
      },
      {
        "@type": "Question",
        "name": "Is sthitaprajna the same as being emotionless?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. The Gita's description is not of someone who feels nothing. BG 2.56 says the sthitaprajna is not disturbed by sorrow and does not crave pleasure, which means they encounter both. The quality being described is steadiness at the root, not the absence of experience. BG 2.65 describes the outcome as prasada, a quality of serenity and clarity, which is an inner positive state, not blankness."
        }
      },
      {
        "@type": "Question",
        "name": "What is the significance of the tortoise image in BG 2.58?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BG 2.58 compares the withdrawal of senses to a turtle pulling in its limbs. The image captures something specific: the turtle does not permanently retract its limbs, it can extend them again when the environment is safe. The sthitaprajna similarly has the capacity to withdraw from sense objects when necessary, not a permanent shutting-down but a voluntary, on-demand retraction. This is pratyahara, the ability to disengage attention at will."
        }
      }
    ]
  }
]

export default function SthitaprajnaPage() {
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
          Sthitaprajna Bhagavad Gita
        </div>
      </div>

      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · Chapter 2, Verses 55 to 72
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            Sthitaprajna: What the Gita Calls<br />
            <em>an Unshakeable Mind</em>
          </h1>
          <p className="article-subtitle">
            In Chapter 2 verse 54, Arjuna asks a question that changes the direction of the entire Gita. &ldquo;What are the marks of a person of steady wisdom?&rdquo; Krishna answers across 18 consecutive verses, more than any other single topic in the chapter. Here is what those verses actually say.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Concept Guide · Chapter 2</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~8 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Published June 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
          </div>
        </div>
      </div>

      <div className="content">
        <figure className="chapter-image">
          <img
            src="/assets/chapter2.webp"
            alt="Chapter 2 of the Bhagavad Gita, where Krishna describes the sthitaprajna across 18 verses"
            width="1200"
            height="675"
            loading="eager"
            fetchPriority="high"
          />
          <figcaption>BG 2.55 to 2.72: the Gita&apos;s most detailed portrait of an unshakeable mind</figcaption>
        </figure>

        <p className="lead">
          The word <em>sthitaprajna</em> appears for the first time in BG 2.54, when Arjuna pauses and asks what might be the most practically useful question in the whole conversation: how do you recognize a person of steady wisdom? How do they speak, how do they sit, how do they move? Krishna&apos;s response is eighteen consecutive verses, verse 2.55 through verse 2.72. That is more verses devoted to a single question than almost anywhere else in Chapter 2. He is not being brief. He wants Arjuna to understand exactly what this looks like in practice.
        </p>

        <h2>Arjuna&apos;s Question</h2>
        <p>
          The question in verse 2.54 is worth quoting before anything else: sthitaprajnasya ka bhasha samadhisthasya kesava. &ldquo;O Krishna, what is the description of one who has steady wisdom, who is established in samadhi? How does such a person speak? How do they sit? How do they walk?&rdquo;
        </p>
        <p>
          The question is concrete and behavioral. Arjuna is not asking for a philosophical definition. He is asking: if I stood next to this person, what would I see? If they spoke, what would I hear? It is a question about recognizable external signs of an internal state.
        </p>
        <p>
          Krishna&apos;s answer works on two levels at once. It describes what the sthitaprajna is like from the outside, and it also serves as a guide for the person who wants to cultivate that state. Each quality is both a description and an instruction.
        </p>
        <p>
          The compound word itself: sthita means established, rooted, steady. Prajna means wisdom, discernment, the faculty that sees clearly. Sthitaprajna is the person whose discernment is rooted, whose clarity does not come and go with circumstances. Not somebody who is calm when things are calm. Somebody who is steady at the root, so that what happens on the surface does not upend the ground beneath.
        </p>

        <h2>The First Mark: Abandoned Desires</h2>
        <p>
          Krishna begins at the starting point, which is internal. The first characteristic is not behavioral at all. It is about what is absent.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.55"
          sanskrit="प्रजहाति यदा कामान् सर्वान् पार्थ मनोगतान् । आत्मन्येवात्मना तुष्टः स्थितप्रज्ञस्तदोच्यते ॥"
          iast="prajahāti yadā kāmān sarvān pārtha manogatān | ātmanyevātmanā tuṣṭaḥ sthitaprajñastadocyate ||"
          meaningLabel="Translation"
          insightLabel="What This Means"
          essence="True contentment is found by letting go of endless desires and resting in the fullness of your own atman."
        />

        <p>
          The phrase manogatan is worth noting. These are desires that live in the mind, not just desires for external things. The sthitaprajna has not abandoned wanting because the world stopped offering things to want. They have abandoned the pattern of the mind that generates wanting as a default state. The distinction matters because it explains why this is not a state that depends on circumstances. External conditions can change, but the pattern of the mind is something the person controls.
        </p>
        <p>
          The second half of the verse, atmanye va atmana tushtah, means satisfied within the self by the self. This is not a description of someone who is isolated or who has given up on life. It is a description of someone whose sense of completeness does not require an external input to remain intact. They are not waiting for something to feel okay. They already feel okay. That makes them genuinely free to engage with the world without desperation.
        </p>

        <h2>The Kachhua Principle</h2>
        <p>
          Several verses after the opening, Krishna gives the section&apos;s most vivid image. It describes a specific capacity, not a permanent state.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.58"
          sanskrit="यदा संहरते चायं कूर्मोऽङ्गानीव सर्वशः । इन्द्रियाणीन्द्रियार्थेभ्यस्तस्य प्रज्ञा प्रतिष्ठिता ॥"
          iast="yadā saṃharate cāyaṃ kūrmo'ṅgānīva sarvaśaḥ | indriyāṇīndriyārthebhyastasya prajñā pratiṣṭhitā ||"
          meaningLabel="Translation"
          insightLabel="What This Means"
          essence="Steadiness comes from withdrawing your senses from distractions, just as the kachhua does."
        />

        <p>
          The turtle image is specific in a way that is easy to miss. A turtle does not permanently retract its limbs. It has the capacity to retract them when the environment is threatening, and to extend them again when it is safe. This is pratyahara, the ability to disengage attention from sense objects at will. It is a skill, not a permanent condition.
        </p>
        <p>
          In practical terms, this is the capacity to stop being hooked by stimuli. Someone says something provocative and you feel the pull to react immediately. The kachhua capacity is being able to not follow that pull: to observe it, let it pass, and choose your response. It does not mean you never respond. It means the response is chosen, not reflexive.
        </p>

        <div className="pull-quote">
          The turtle&apos;s limbs are not gone. They are under its control. That is the difference between the sthitaprajna and someone who is simply numbed or disconnected.
        </div>

        <h2>The Cascade</h2>
        <p>
          After describing the positive qualities of steady wisdom, verses 2.62 and 2.63 describe the opposite: what happens when you do not exercise this withdrawal. Krishna lays out a sequence with unusual precision. Each step follows from the previous one, and the speed of the sequence is the point.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.62"
          sanskrit="ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते । सङ्गात् संजायते कामः कामात्क्रोधोऽभिजायते ॥"
          iast="dhyāyato viṣayānpuṃsaḥ saṅgasteṣūpajāyate | saṅgāt saṃjāyate kāmaḥ kāmātkrodho'bhijāyate ||"
          meaningLabel="Translation"
          insightLabel="What This Teaches"
          essence="Guard your mind's focus, for your thoughts shape your destiny."
        />

                <ShlokaCard
          verseRef="Bhagavad Gita 2.63"
          sanskrit="क्रोधाद्भवति संमोहः संमोहात्स्मृतिविभ्रमः । स्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति ॥"
          iast="krodhādbhavati saṃmohaḥ saṃmohātsmṛtivibhramaḥ | smṛtibhraṃśād buddhināśo buddhināśātpraṇaśyati ||"
          meaningLabel="Translation"
          insightLabel="What This Teaches"
          essence="Uncontrolled desires and anger scatter the mind and bring confusion; self-mastery preserves wisdom."
        />

        <p>
          Written out in sequence, the cascade across 2.62 and 2.63 is:
        </p>

        <div className="cascade-chain">
          <div className="cascade-step"><span className="step-num">1</span>Dwelling on sense objects (dhyayato vishayan)</div>
          <div className="cascade-arrow">↓</div>
          <div className="cascade-step"><span className="step-num">2</span>Attachment forms (sanga)</div>
          <div className="cascade-arrow">↓</div>
          <div className="cascade-step"><span className="step-num">3</span>Desire arises from attachment (kama)</div>
          <div className="cascade-arrow">↓</div>
          <div className="cascade-step"><span className="step-num">4</span>Anger when desire is blocked (krodha)</div>
          <div className="cascade-arrow">↓</div>
          <div className="cascade-step"><span className="step-num">5</span>Confusion, delusion (sammoha)</div>
          <div className="cascade-arrow">↓</div>
          <div className="cascade-step"><span className="step-num">6</span>Loss of memory and discernment (smriti-bhramsha)</div>
          <div className="cascade-arrow">↓</div>
          <div className="cascade-step"><span className="step-num">7</span>Destruction of intellect (buddhi-nasha)</div>
          <div className="cascade-arrow">↓</div>
          <div className="cascade-step"><span className="step-num">8</span>Ruin (pranashyati)</div>
        </div>

        <p>
          The sequence starts at step one, with something that seems harmless: thinking about things. Not doing anything. Just turning something over in your mind. The Gita is saying that this is where it begins. The cascade does not start with desire or anger. It starts with where you place your attention.
        </p>
        <p>
          This is why the kachhua verse immediately precedes this one. The capacity to withdraw attention from certain objects is not a trivial skill. It is the intervention point at step one that prevents steps two through eight. By the time you are at anger, much of the cascade has already happened. The time to act is much earlier, at the level of where you are placing your mind.
        </p>

        <h2>What Sthitaprajna Is Not</h2>
        <p>
          The qualities described across 2.55 to 2.72 are easy to misread as a portrait of someone emotionally flat, someone who has achieved stability by cutting off their emotional range. This is not what the verses describe.
        </p>
        <p>
          BG 2.56 says the sthitaprajna is not disturbed by sorrow and does not crave pleasure. This implies they encounter both. The teaching is not that sorrow does not reach them. It is that sorrow does not destabilize them at the root. There is a difference between feeling pain and being destroyed by it.
        </p>
        <p>
          BG 2.65 gives the clearest counter to the numbness interpretation:
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.65"
          sanskrit="प्रसादे सर्वदुःखानां हानिरस्योपजायते । प्रसन्नचेतसो ह्याशु बुद्धिः पर्यवतिष्ठते ॥"
          iast="prasāde sarvaduḥkhānāṃ hānirasyopajāyate | prasannacetaso hyāśu buddhiḥ paryavatiṣṭhate ||"
          meaningLabel="Translation"
          insightLabel="What This Means"
          essence="Clarity within dissolves sorrow and brings lasting wisdom."
        />

        <p>
          Prasada is the word in this verse. It is often translated as serenity or grace. But prasada has a quality of brightness, warmth, clarity. It is not the absence of feeling. It is a particular kind of radiant stillness. The verse says that when this prasada is established, all sorrow falls away, and the intellect naturally settles. This is the outcome of sthitaprajna, and it is the opposite of numbness.
        </p>

        <h2>The Tortoise and the Ocean</h2>
        <p>
          Near the end of the sthitaprajna section, Krishna gives a second extended image. If the turtle verse describes a capacity (voluntary withdrawal of attention), the ocean verse describes a quality (what that capacity makes possible over time).
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.70"
          sanskrit="आपूर्यमाणमचलप्रतिष्ठं समुद्रमापः प्रविशन्ति यद्वत् । तद्वत्कामा यं प्रविशन्ति सर्वे स शान्तिमाप्नोति न कामकामी ॥"
          iast="āpūryamāṇamacalapratiṣṭhaṃ samudramāpaḥ praviśanti yadvat | tadvatkāmā yaṃ praviśanti sarve sa śāntimāpnoti na kāmakāmī ||"
          meaningLabel="Translation"
          insightLabel="What This Means"
          essence="Stay steady like the ocean. Let desires come and go, but hold on to inner shanti."
        />

        <p>
          The ocean does not block the rivers. It does not refuse them. They come in, they are received, the ocean does not change. This is a very different image from the turtle, which withdraws. Here the sthitaprajna is fully open to experience. Sense objects arrive. Desires arise. The world comes in. And nothing moves the ground.
        </p>
        <p>
          Together, the two images give a more complete picture. The turtle is about active management of where attention goes: a skill you practice, a choice you make. The ocean is about what that practice builds over time: a settled quality of being that is not disturbed even when you are fully open and engaged.
        </p>

        <h2>Why This Still Matters</h2>
        <p>
          The word sthitaprajna does not come up in most modern conversations. But the problem the concept addresses is everywhere. People are generally not short of things they want to do or experiences they want to have. They are short of the inner stability that would let them pursue those things without being constantly thrown off by outcomes, by other people&apos;s reactions, by uncertainty about whether it will work out.
        </p>
        <p>
          When something does not go as expected, there is a habitual question: what does this mean about me? If the result is bad, maybe I am not good enough. If I am not recognized, maybe my effort was worthless. These questions drag you into the cascade that 2.62 and 2.63 describe. The result is not just disappointment. It is a loss of clarity, a loss of the ability to think straight about what to do next.
        </p>
        <p>
          Sthitaprajna is, in practical terms, the quality of being able to receive that information without collapsing under it. The ocean receives the river. You receive the feedback, the setback, the failure. Your stability does not depend on whether the news is good. That stability is what makes you useful to yourself and to other people. It is what makes it possible to act well when the situation is hard, which is precisely when it matters most.
        </p>

        <h2>All 18 Qualities: Quick Reference</h2>
        <p>
          BG 2.55 through 2.72 covers more ground than any single summary can hold. Here is the essence of each verse in the sthitaprajna sequence:
        </p>

        <div className="verse-reference-list">
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.55</span>
            <span className="verse-ref-essence">True contentment is found by letting go of endless desires and resting in the fullness of your own atman.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.56</span>
            <span className="verse-ref-essence">True steadiness comes when the mind is not attached to pleasure or shaken by pain.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.57</span>
            <span className="verse-ref-essence">Steadiness of mind arises from being unattached amidst all outcomes.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.58</span>
            <span className="verse-ref-essence">Steadiness comes from withdrawing your senses from distractions, just as the kachhua does.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.59</span>
            <span className="verse-ref-essence">Inner freedom comes from real self-experience, not just from resisting desire.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.60</span>
            <span className="verse-ref-essence">The pull of the senses is powerful, and constant watchfulness is the path of the sadhaka.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.61</span>
            <span className="verse-ref-essence">Self-mastery over the senses leads to a steady and wise mind.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.62</span>
            <span className="verse-ref-essence">Guard your mind&apos;s focus, for your thoughts shape your destiny.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.63</span>
            <span className="verse-ref-essence">Uncontrolled desires and anger scatter the mind and bring confusion; self-mastery preserves wisdom.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.64</span>
            <span className="verse-ref-essence">Clear your inner state by freeing yourself from likes and dislikes; prasada will follow.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.65</span>
            <span className="verse-ref-essence">Clarity within dissolves sorrow and brings lasting wisdom.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.66</span>
            <span className="verse-ref-essence">Sukha (true happiness) is born from a peaceful and disciplined inner world.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.67</span>
            <span className="verse-ref-essence">When the mind follows restless senses, wisdom gets lost; handle your senses with attention.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.68</span>
            <span className="verse-ref-essence">Mastery over your senses brings steadiness to your mind.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.69</span>
            <span className="verse-ref-essence">Walk your path of awareness, even if the world sleeps.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.70</span>
            <span className="verse-ref-essence">Stay steady like the ocean. Let desires come and go, but hold on to inner shanti.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.71</span>
            <span className="verse-ref-essence">Shanti arises when we release desires, attachment, and ahamkara.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.72</span>
            <span className="verse-ref-essence">Root yourself in steadiness of chitta, and confusion will never sway you.</span>
          </div>
        </div>

        <p>
          The sequence has a shape. It begins with the internal condition (let go of desire, be content within), moves to the specific skills of sense management (the turtle, the cascade, the watchfulness), describes the outcome of those skills (prasada, serenity, clarity), and closes with the final image: the ocean, and the irreversible brahmi sthiti of verse 2.72. The eighteen verses are not a list. They are an argument, from inner condition to daily practice to the quality of life that practice makes possible.
        </p>

        <div className="highlight-box">
          <h3>A Note on the Word &ldquo;Steady&rdquo;</h3>
          <p>
            Prajna is sometimes translated as wisdom, sometimes as intellect, sometimes as discernment. The Sanskrit carries all three: it is the faculty that sees clearly, that distinguishes real from apparent, lasting from temporary. When the Gita calls the sthitaprajna someone whose prajna is established (sthita), it means this faculty of clear seeing is no longer a temporary visitor. It is the stable ground of the person&apos;s functioning. That is what makes it remarkable. Most people have clear moments. The sthitaprajna has clarity as a baseline.
          </p>
        </div>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>What does sthitaprajna mean?</strong>
          <p>
            Sthitaprajna is a Sanskrit compound: sthita means steady or established, prajna means wisdom or discernment. Together it describes a person whose wisdom is steady, whose inner clarity does not come and go with circumstances. The Bhagavad Gita uses this term for someone whose stability does not depend on what is happening externally.
          </p>
        </div>

        <div className="faq-item">
          <strong>Which verses describe sthitaprajna in the Bhagavad Gita?</strong>
          <p>
            The full sthitaprajna description spans BG 2.55 to 2.72, eighteen consecutive verses in Chapter 2. It begins after Arjuna&apos;s question in verse 2.54, where he asks Krishna to describe the marks of a person of steady wisdom. Krishna&apos;s answer is the most sustained character description in the chapter.
          </p>
        </div>

        <div className="faq-item">
          <strong>What are the sthitaprajna lakshana, the marks of steady wisdom?</strong>
          <p>
            The key marks described across BG 2.55 to 2.72 include: abandoning desires from the mind and being content within oneself (2.55), not being disturbed by sorrow or excited by pleasure (2.56), remaining unattached across all situations (2.57), being able to withdraw senses from objects like a turtle withdraws its limbs (2.58), the positive quality of prasada, serenity (2.65), and being like an ocean that receives all rivers without overflowing (2.70).
          </p>
        </div>

        <div className="faq-item">
          <strong>Is sthitaprajna the same as being emotionless?</strong>
          <p>
            No. The Gita&apos;s description is of someone who encounters both sorrow and pleasure but is not destabilized by either. BG 2.65 describes the outcome as prasada, a quality of serenity and radiant clarity, which is a positive inner state. Numbness would be a different thing. The sthitaprajna is fully present to experience. What is steady is the ground, not the absence of feeling.
          </p>
        </div>

        <div className="faq-item">
          <strong>What is the significance of the tortoise image in BG 2.58?</strong>
          <p>
            BG 2.58 compares withdrawing the senses to a turtle pulling in its limbs. The image captures something specific: the turtle does not permanently retract its limbs. It has the capacity to retract them when the environment is threatening, and to extend them again when safe. The sthitaprajna similarly has the capacity to withdraw attention from sense objects when necessary. This is pratyahara, the ability to disengage attention at will. It is a skill, not a permanent shutdown.
          </p>
        </div>
      </div>

      <div className="content">
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
      </div>

      <footer>
        <p>© 2026 Wisdom App. A daily verse to quiet the mind.</p>
        <p><a href="https://wisdomquotes.in">Home</a> — <a href="https://wisdomquotes.in/blogs">Blog</a> — <a href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125" target="_blank" rel="noopener" data-mp-location="footer">Download</a></p>
      </footer>

      <BlogTracker pageName="Sthitaprajna Bhagavad Gita" />
    </>
  )
}
