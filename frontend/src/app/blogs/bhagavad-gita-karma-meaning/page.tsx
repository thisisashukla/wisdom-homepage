import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'

import SiteFooter from '@/components/SiteFooter'
export const metadata: Metadata = {
  title: "Karma in the Bhagavad Gita: Meaning and 7 Key Verses (Chapters 2 to 4)",
  description: "Karma means action. Chapters 2 to 4 of the Bhagavad Gita teach acting without attachment to results. The meaning of karma, plus 7 shlokas on karma with Sanskrit and English meaning.",
  keywords: "karma meaning in bhagavad gita, what is karma, karma definition, bhagavad gita karma yoga, what does karma mean in hinduism, karma in gita, karma meaning hindi, karma actual meaning, nishkama karma, karma yoga chapter 3, karma phala meaning, bhagavad gita 2.47 meaning",
  openGraph: {
    title: "Karma in the Bhagavad Gita: Meaning and 7 Key Verses (Chapters 2 to 4)",
    description: "Karma means action. Chapters 2 to 4 of the Bhagavad Gita teach acting without attachment to results. The meaning plus 7 karma shlokas with Sanskrit and English.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagavad-gita-karma-meaning",
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sansearchapp',
    creator: '@thisisashukla',
    title: "Karma in the Bhagavad Gita: Meaning and 7 Key Verses (Chapters 2 to 4)",
    description: "Karma means action. Chapters 2 to 4 of the Bhagavad Gita teach acting without attachment to results. The meaning plus 7 karma shlokas with Sanskrit and English.",
    images: ['https://wisdomquotes.in/og-image.webp'],
  },
  alternates: {
    canonical: "https://wisdomquotes.in/blogs/bhagavad-gita-karma-meaning",
    languages: {
      'en': "https://wisdomquotes.in/blogs/bhagavad-gita-karma-meaning",
      'en-IN': "https://wisdomquotes.in/blogs/bhagavad-gita-karma-meaning",
      'x-default': "https://wisdomquotes.in/blogs/bhagavad-gita-karma-meaning",
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
            content: "कर्म";
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

        /* App CTA */
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
  "headline": "Karma in the Bhagavad Gita: Meaning and Key Verses | Wisdom",
  "description": "Karma means action. What the Bhagavad Gita teaches about karma in 2.47, 3.9 and 4.37.",
  "datePublished": "2026-05-05",
  "dateModified": "2026-08-01",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://wisdomquotes.in/blogs/bhagavad-gita-karma-meaning" },
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
    { "@type": "ListItem", "position": 3, "name": "Karma in the Bhagavad Gita: Meaning", "item": "https://wisdomquotes.in/blogs/bhagavad-gita-karma-meaning" }
  ]
},
  {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does karma mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Karma literally means action in Sanskrit. In the Bhagavad Gita, it refers to any action you perform and the consequences that flow from those actions. The Gita's teaching is mostly about the attitude you bring to action, and says little about cosmic justice."
      }
    },
    {
      "@type": "Question",
      "name": "What does the Bhagavad Gita say about karma?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The best-known karma teaching is verse 2.47: You have a right to perform your duties, but not to the fruits of your actions. This is the basis of karma yoga: performing action without attachment to outcomes."
      }
    },
    {
      "@type": "Question",
      "name": "Does karma mean what goes around comes around?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Only loosely. The Gita's karma teaching centres on the state of mind behind your actions. Actions do have consequences, but BG 4.37 says the fire of knowledge burns up all karma, so you are not locked into your past."
      }
    }
  ]
}
]

export default function KarmaMeaningPage() {
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
        Karma in the Gita
      </div>
    </div>

    <div className="article-hero">
      <div className="article-hero-inner">
        <div className="chapter-badge">
          <div className="chapter-badge-dot"></div>
          Topic Guide · Core Teaching
          <div className="chapter-badge-dot"></div>
        </div>
        <h1 className="article-title">
          Karma in the Bhagavad Gita<br />
          <em>Action, Its Fruits, and Knowledge</em>
        </h1>
        <p className="article-subtitle">
          In popular use, karma means &ldquo;what goes around comes around.&rdquo; The Bhagavad Gita uses the word for action, and teaches how to act without being bound by it.
        </p>
        <div className="article-meta">
          <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">Topic Guide · Karma Yoga</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">~5 min read</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">Chapters 2, 3 & 4</span>
          <span className="meta-sep">·</span>
          <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed October 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
        </div>
      </div>
    </div>

    <div className="content">
                <figure className="chapter-image">
          <img
            src="/assets/chapter3.webp"
            alt="Krishna guiding Arjuna toward selfless action, the karma yoga of Chapter 3"
            width="1200"
            height="675"
            loading="eager"
            fetchPriority="high"
          />
          <figcaption>Karma Yoga: act fully, want nothing</figcaption>
        </figure>

        <p className="lead">
            &ldquo;Karma will get them.&rdquo; &ldquo;Good vibes only, the universe is watching.&rdquo; &ldquo;What goes around comes around.&rdquo; These have become the modern meaning of karma. They describe a cosmic justice system: you put in goodness, the universe deposits goodness back. You do wrong, cosmic punishment arrives. The Bhagavad Gita uses karma differently. In the Gita, karma means action: what you do, and the attitude you do it with.
        </p>
        <h2>The Literal Meaning: Karma Is Action</h2>
        <p>
            The word karma comes from the Sanskrit root kri, which means "to do." Karma is any action you perform with your body, your speech or your mind. Walking, breathing and thinking all count, and none of them is moral or immoral in itself.
        </p>
        <p>
            The Gita spends little time on actions coming back to haunt you. Its interest is in how the state of your mind shapes your action, and how both shape your inner life over time.
        </p>
        <p>
            That puts the responsibility on you. You look at what you have done, the attitude you did it with, and what came of it.
        </p>

        <h2>The Central Teaching: You Have a Right to Action, Not to Its Fruits</h2>
        <p>
            The Gita's best-known statement about karma is Chapter 2, verse 47. The karma yoga teaching of Chapter 3 builds on it.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.47"
          sanskrit="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥"
          iast="karmaṇyevādhikāraste mā phaleṣu kadācana | mā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi ||"
          meaningLabel="Translation"
          meaning="You have a right to perform your prescribed duties, but you are not entitled to the fruits. Never consider yourself the cause of the results, and never be attached to not doing your duty."
          insightLabel="What This Teaches"
          insight="The verse has four instructions. First: act; the work is your right and your duty. Second: don't claim the fruits. Third: don't let the expected fruit be your motive, because then you depend on an outcome you don't control. Fourth: don't use this teaching to justify inaction. Together they describe the practice."
          essence="Your right is to the work, never to its results."
        />

        <p>
            This inverts how most people think about action: "I will do X in order to get Y." The motive is the fruit. If the fruit arrives, they feel successful. If it doesn't, they feel cheated, angry or empty, and their self-worth rides on the outcome.
        </p>
        <p>
            Krishna&apos;s advice is to do the work fully, with care and integrity, and don't make "getting the fruit" the reason. Measure yourself by the quality of the action rather than by whether things worked out.
        </p>

        <div className="highlight-box">
            <h3>Why Attachment to Results is the Problem</h3>
            <p>
                When the fruit becomes the motive, several things follow. First, you act differently depending on who is watching, and your integrity shifts with reward and punishment. Second, people can manipulate you through the things you want. Third, your inner peace depends on outcomes you cannot fully control. Fourth, when the outcome doesn't arrive, disappointment turns into a sense of personal failure.
            </p>
            <p>
                Krishna interrupts this by moving the measure of success from "did I get what I wanted" to "did I act with integrity."
            </p>
        </div>

        <h2>Karma Yoga: Action as Offering</h2>
        <p>
            Chapter 3 of the Gita is titled Karma Yoga, the yoga of action. It asks why we act.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 3.9"
          sanskrit="यज्ञार्थात्कर्मणोऽन्यत्र लोकोऽयं कर्मबन्धनः । तदर्थं कर्म कौन्तेय मुक्तसंगः समाचर ॥"
          iast="yajñārthātkarmaṇo'nyatra loko'yaṃ karmabandhanaḥ | tadarthaṃ karma kaunteya muktasaṃgaḥ samācara ||"
          meaningLabel="Translation"
          meaning="Action done for any reason other than as a sacred offering (yajna) creates bondage in this world. Therefore, perform your duties as an offering, free from attachment, O Arjuna."
          insightLabel="What This Teaches"
          insight="Here the Gita shifts attention from what you do to why you do it. The same action, cooking a meal or teaching a class, binds you if done from craving and frees you if done as an offering. Yajña, usually translated as sacrifice or sacred offering, is the key word. You do the work as service to something larger than personal gain."
          essence="Work not done as yajña binds; do your work as an offering, free of attachment."
        />

        <p>
            That is karma yoga in practice. You keep your work and your family and give up the demand to own the fruits. You do the action because it is your duty and because you see it as service. Your circumstances may stay the same while your reason for acting changes.
        </p>

        <p className="pull-quote">
            The same action binds when done with attachment to results and frees when done as an offering. The difference lies inside the person acting.
        </p>

        <h2>Past Karma and the Fire of Knowledge</h2>
        <p>
            The Gita does say actions have consequences. Past actions shape present circumstances, and in 18.12 Krishna says the fruits of action follow those who have not renounced them, even after death.
        </p>
        <p>
            Chapter 4 adds that knowledge burns all karma.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 4.37"
          sanskrit="यथैधांसि समिद्धोऽग्निर्भस्मसात्कुरुतेऽर्जुन । ज्ञानाग्निः सर्वकर्माणि भस्मसात्कुरुते तथा ॥"
          iast="yathaidhāṃsi samiddho'gnirbhasmasātkurute'rjuna | jñānāgniḥ sarvakarmāṇi bhasmasātkurute tathā ||"
          meaningLabel="Translation"
          meaning="As a blazing fire reduces wood to ashes, the fire of knowledge reduces all karma to ashes, O Arjuna."
          insightLabel="What This Teaches"
          insight="Krishna compares knowledge to a blazing fire and past karma to firewood. Understanding the nature of action and the self burns that karma to ash. So past karma is not fixed fate, and you are not locked into your past."
          essence="As fire turns wood to ash, the fire of knowledge turns all karma to ash."
        />

        <p>
            That is why the Gita, spoken to a warrior frozen on a battlefield, is hopeful. Arjuna cannot undo the past or the fact that he faces his own kin in battle. He can change how he understands what he is doing, and that changes what happens next.
        </p>

        <h2>Is Karma About Punishment?</h2>
        <p>
            The Gita uses karma mainly to describe the chain between intention, action and consequence. It does not dwell on cosmic punishment.
        </p>
        <p>
            When you act with attachment to a specific result, you create internal patterns that shape how you perceive the world. When you act with ego-craving, you become dependent on things you cannot control. When you act with integrity, you build a character you can trust. These consequences follow from how the mind works.
        </p>
        <p>
            The chain can be interrupted, and the place to interrupt it is your own state of mind: the attitude you bring to action and the meaning you give it.
        </p>

        <div className="highlight-box">
            <h3>The Practical Meaning</h3>
            <p>
                If you carry regret about past actions, the Gita&apos;s teaching is that the understanding you have now can change your relationship to them. You learn something and act differently, and that also changes how you relate to the past.
            </p>
            <p>
                If you worry about whether your efforts will pay off, the teaching is: act fully and let go of the demand to own the outcome. Your job is the quality of the action.</p>
        </div>

        {/* ── Quick reference: karma quotes / shlokas — targets "karma quotes" query cluster ── */}
        <h2 id="karma-quotes">7 Karma Quotes from the Bhagavad Gita</h2>
        <p>
            The seven verses below cover the Gita&apos;s main teaching on karma. Read them as a quick reference; for full context, follow the link on each. If you want a longer, quote-only companion piece, see our{' '}
            <a href="/blogs/karma-quotes-bhagavad-gita" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }} data-mp-location="internal_link_karma_quotes">
                Karma Quotes from the Bhagavad Gita
            </a>{' '}
            page, a list of 10 shlokas on karma with Sanskrit, transliteration and English meaning.
        </p>

        <ol className="karma-quotes-list" style={{ paddingLeft: 20, margin: '18px 0 32px' }}>
            <li style={{ marginBottom: 18 }}>
                <strong>Bhagavad Gita 2.47</strong> · <em>karmaṇyevādhikāraste mā phaleṣu kadācana</em>
                <br />
                &ldquo;You have a right to action, never to its fruits.&rdquo;{' '}
                <a href="/gita/chapter/2/verse/47" data-mp-location="karma_quote_2_47" style={{ color: 'var(--gold-light)' }}>Read →</a>
            </li>
            <li style={{ marginBottom: 18 }}>
                <strong>Bhagavad Gita 2.48</strong> · <em>yogasthaḥ kuru karmāṇi saṅgaṃ tyaktvā dhanañjaya</em>
                <br />
                &ldquo;Established in yoga, do your work, abandoning attachment, even in success and failure. Evenness of mind is called yoga.&rdquo;{' '}
                <a href="/gita/chapter/2/verse/48" data-mp-location="karma_quote_2_48" style={{ color: 'var(--gold-light)' }}>Read →</a>
            </li>
            <li style={{ marginBottom: 18 }}>
                <strong>Bhagavad Gita 3.9</strong> · <em>yajñārthātkarmaṇo&apos;nyatra loko&apos;yaṃ karmabandhanaḥ</em>
                <br />
                &ldquo;Action done as a sacred offering (yajna) does not bind. Any other action creates bondage.&rdquo;{' '}
                <a href="/gita/chapter/3/verse/9" data-mp-location="karma_quote_3_9" style={{ color: 'var(--gold-light)' }}>Read →</a>
            </li>
            <li style={{ marginBottom: 18 }}>
                <strong>Bhagavad Gita 3.19</strong> · <em>tasmādasaktaḥ satataṃ kāryaṃ karma samācara</em>
                <br />
                &ldquo;Therefore, always perform your duty without attachment. Acting unattached, a person reaches the highest.&rdquo;{' '}
                <a href="/gita/chapter/3/verse/19" data-mp-location="karma_quote_3_19" style={{ color: 'var(--gold-light)' }}>Read →</a>
            </li>
            <li style={{ marginBottom: 18 }}>
                <strong>Bhagavad Gita 3.35</strong> · <em>śreyānsvadharmo viguṇaḥ paradharmātsvanuṣṭhitāt</em>
                <br />
                &ldquo;Better your own dharma, imperfectly done, than another&apos;s done well. Another&apos;s dharma is fraught with fear.&rdquo;{' '}
                <a href="/gita/chapter/3/verse/35" data-mp-location="karma_quote_3_35" style={{ color: 'var(--gold-light)' }}>Read →</a>
            </li>
            <li style={{ marginBottom: 18 }}>
                <strong>Bhagavad Gita 4.18</strong> · <em>karmaṇyakarma yaḥ paśyedakarmaṇi ca karma yaḥ</em>
                <br />
                &ldquo;The one who sees inaction in action, and action in inaction, is wise among people.&rdquo;{' '}
                <a href="/gita/chapter/4/verse/18" data-mp-location="karma_quote_4_18" style={{ color: 'var(--gold-light)' }}>Read →</a>
            </li>
            <li style={{ marginBottom: 18 }}>
                <strong>Bhagavad Gita 4.37</strong> · <em>jñānāgniḥ sarvakarmāṇi bhasmasātkurute tathā</em>
                <br />
                &ldquo;As fire reduces wood to ashes, the fire of knowledge reduces all karma to ashes.&rdquo;{' '}
                <a href="/gita/chapter/4/verse/37" data-mp-location="karma_quote_4_37" style={{ color: 'var(--gold-light)' }}>Read →</a>
            </li>
        </ol>
        <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: removed an unverified count of the word karma; aligned 3.35 with the site&apos;s translation; corrected the meta description, which credited Chapter 3 with 2.47; copy edited.
            </p>
    </div>


      <FeedbackWidget pageType="blog" />
    <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
            <strong>What does karma mean?</strong>
            <p>
                Karma literally means "action" in Sanskrit. In the Bhagavad Gita, it refers to any action you perform (physical, verbal, or mental) and the consequences that flow from those actions. The Gita&apos;s teaching centres on the attitude you bring to action and how that shapes your inner state over time.
            </p>
        </div>

        <div className="faq-item">
            <strong>What does the Bhagavad Gita say about karma?</strong>
            <p>
                The best-known karma teaching is verse 2.47: "You have a right to perform your prescribed duties, but not to the fruits of your actions." This is the basis of karma yoga, the practice of acting without attachment to outcomes. Act fully, and don't let the expected fruit be your motive.
            </p>
        </div>

        <div className="faq-item">
            <strong>Does karma mean what goes around comes around?</strong>
            <p>
                Only loosely. That phrase describes rough cosmic justice: you get back what you give. The Gita&apos;s karma teaching is more inward and centres on the state of mind behind your actions. It does say actions have consequences, and it also says knowledge (jnana) burns up accumulated karma (4.37), so you are not locked into your past.
            </p>
        </div>

        <div className="faq-item">
            <strong>What is karma yoga?</strong>
            <p>
                Karma yoga is the yoga of action: performing action as service or sacred offering, without attachment to the results. You keep working and give up the demand to own the fruits of your labor. You act fully, with integrity and care, and release the need for a specific outcome. In 3.3 Krishna names it as the path of the yogis, people who live by action.
            </p>
        </div>

        <div className="faq-item">
            <strong>Can karma be changed or burned?</strong>
            <p>
                Yes. The Gita teaches in verse 4.37 that knowledge (jnana) burns all karma. Your past actions have consequences, and understanding the nature of action and the self is said to burn up even accumulated karma. The past stays; your relationship to it, and your direction from here, can change.
            </p>
        </div>
    </div>

    <VerseFunnelCTA variant="chapter" locale="en" pageName={"Gita Karma Meaning"} />


    <SiteFooter />

    {/* Schema Markup */}
    

    

        {/* Mixpanel */}
    

      <BlogTracker pageName="Gita Karma Meaning" />
    </>
  )
}