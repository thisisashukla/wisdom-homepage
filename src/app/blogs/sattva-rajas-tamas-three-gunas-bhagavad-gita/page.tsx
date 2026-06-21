import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import ShlokaCard from '@/components/gita/ShlokaCard'

export const metadata: Metadata = {
  title: "Sattva, Rajas, Tamas: The Three Gunas of the Bhagavad Gita Explained | Wisdom",
  description: "The Gita says three qualities (gunas) make up all of nature, including your personality and moods. Sattva is clarity, rajas is drive, tamas is inertia. Understanding them changes how you read your own inner states.",
  keywords: "sattva rajas tamas meaning, three gunas bhagavad gita, sattva rajas tamas explained, what are the three gunas, gunatraya bhagavad gita, sattva guna meaning, rajas guna meaning, tamas guna meaning, gunatita state, bhagavad gita chapter 14, three gunas in daily life",
  openGraph: {
    title: "Sattva, Rajas, Tamas: The Three Gunas of the Bhagavad Gita Explained | Wisdom",
    description: "The Gita says three qualities (gunas) make up all of nature, including your personality and moods. Sattva is clarity, rajas is drive, tamas is inertia.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/sattva-rajas-tamas-three-gunas-bhagavad-gita",
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/sattva-rajas-tamas-three-gunas-bhagavad-gita" },
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
            content: "गुण";
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
    "headline": "Sattva, Rajas, Tamas: The Three Gunas of the Bhagavad Gita Explained | Wisdom",
    "description": "The Gita says three qualities (gunas) make up all of nature, including your personality and moods. Sattva is clarity, rajas is drive, tamas is inertia.",
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
        "name": "What are sattva rajas and tamas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sattva, rajas, and tamas are the three gunas, qualities or forces that the Bhagavad Gita says make up all of prakriti (nature). Sattva is the quality of clarity, lightness, and knowledge. Rajas is the quality of activity, desire, and restlessness. Tamas is the quality of inertia, heaviness, and delusion. They are present in all things and in all people in varying combinations."
        }
      },
      {
        "@type": "Question",
        "name": "How do the three gunas affect daily life?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The gunas shape your mental and physical states from moment to moment. When sattva is strong, you feel clear, focused, and interested in learning. When rajas dominates, you feel driven, restless, or anxious. When tamas is high, you feel heavy, unmotivated, or confused. These states fluctuate based on diet, sleep, what you consume mentally, and your activities."
        }
      },
      {
        "@type": "Question",
        "name": "Can you change your guna?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The Gita says the gunas are not fixed personality types. They shift based on conditions. Food, sleep, what you read, how you spend your time, your company, and your practices all affect which guna predominates at any given time. The Gita describes specific foods, worship styles, and types of action associated with each guna in Chapters 17 and 18."
        }
      },
      {
        "@type": "Question",
        "name": "What is the gunatita state?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gunatita means beyond the gunas. In BG 14.20, Krishna describes someone who has transcended all three gunas as free from the pains of birth, aging, and death. This is the Gita's actual goal: not to achieve perfect sattva, but to go beyond the entire guna framework. BG 14.26 says undivided devotion (avyabhicharina bhakti) is the path to this state."
        }
      },
      {
        "@type": "Question",
        "name": "What guna should I aim for according to the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Gita recommends cultivating sattva as a working condition, because it supports clarity and the capacity for knowledge. But it explicitly warns against becoming attached even to sattva (BG 14.6). The trap of sattva is pride in one's own goodness or addiction to peace. The Gita's final direction is not 'achieve sattva' but 'go beyond all three,' to the gunatita state."
        }
      }
    ]
  }
]

export default function ThreeGunasPage() {
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
        Three Gunas: Sattva, Rajas, Tamas
      </div>
    </div>

    <div className="article-hero">
      <div className="article-hero-inner">
        <div className="chapter-badge">
          <div className="chapter-badge-dot"></div>
          Bhagavad Gita · Chapter 14
          <div className="chapter-badge-dot"></div>
        </div>
        <h1 className="article-title">
          Sattva, Rajas, Tamas:<br />
          <em>The Three Qualities of Everything</em>
        </h1>
        <p className="article-subtitle">
          The Gita says these three gunas make up all of prakriti, including your personality, your food, your worship, and your current mood. They are not metaphors. They are a working map.
        </p>
        <div className="article-meta">
          <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">Chapter 14 · Gunatraya Vibhaga Yoga</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">~6 min read</span>
          <span className="meta-sep">·</span>
          <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed June 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
        </div>
      </div>
    </div>

    <div className="content">
      <figure className="chapter-image">
        <img
          src="/assets/chapter14.webp"
          alt="The three gunas of prakriti in the Bhagavad Gita: sattva, rajas, tamas"
          width="1200"
          height="675"
          loading="eager"
          fetchPriority="high"
        />
        <figcaption>Chapter 14: The three strands woven through all of nature</figcaption>
      </figure>

      <p className="lead">
        Some mornings you wake up clear, focused, ready to think. Other mornings you wake up irritable, scattered, and find yourself doing things you didn&apos;t plan to do. The Bhagavad Gita has a precise account of why this happens. It&apos;s not a character flaw. It&apos;s not random. It&apos;s the gunas.
      </p>

      <h2>Why the Gunas Matter</h2>
      <p>
        Chapter 14 of the Gita opens a section that many readers skip because it sounds theoretical: the classification of everything in nature into three qualities. But the payoff is practical. Once you understand the guna framework, you start reading your own inner states more accurately. You stop blaming yourself for every low period and stop becoming overconfident in every high period. You see both as conditions, not as your permanent identity.
      </p>
      <p>
        The Gita begins Chapter 14 by identifying the gunas as the fundamental mechanism by which prakriti (nature) operates. They bind the atman (the unchanging inner self) to the body and mind.
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 14.5"
        sanskrit="सत्त्वं रजस्तम इति गुणाः प्रकृतिसंभवाः । निबध्नन्ति महाबाहो देहे देहिनमव्ययम् ॥"
        iast="sattvaṃ rajastama iti guṇāḥ prakṛtisaṃbhavāḥ | nibadhnanti mahābāho dehe dehinamavyayam ||"
        meaningLabel="Translation"
        insightLabel="What This Teaches"
        essence="You are not your moods or qualities; you are the unchanging atman."
      />

      <h2>What &quot;Guna&quot; Actually Means</h2>
      <p>
        The word guna literally means &quot;strand&quot; or &quot;quality.&quot; Think of a rope made of three twisted strands. The three gunas are not three separate personalities you cycle through. They are three strands present in everything at all times, in constantly shifting proportions. When one strand tightens, the others slacken. All three are always there.
      </p>
      <p>
        This is a different model from the Western personality type tradition. The Gita does not say you are a sattva person or a rajas person. It says right now, in this moment, one quality is predominating. That can change by tomorrow morning, sometimes by the next hour.
      </p>

      <h2>Sattva: Clarity, Knowledge, Balance</h2>
      <p>
        Sattva is the quality of light, purity, and knowing. When sattva is high, you think clearly, you feel interested in learning, you&apos;re not chasing or avoiding anything particular. There is a kind of lightness. You can sit with a problem without urgency. You read something and it goes in.
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 14.6"
        sanskrit="तत्र सत्त्वं निर्मलत्वात्प्रकाशकमनामयम् । सुखसङ्गेन बध्नाति ज्ञानसङ्गेन चानघ ॥"
        iast="tatra sattvaṃ nirmalatvātprakāśakamanāmayam | sukhasaṅgena badhnāti jñānasaṅgena cānagha ||"
        meaningLabel="Translation"
        insightLabel="What This Teaches"
        essence="Even purity can bind if we cling to it."
      />

      <p>
        In daily life, a sattvic day might look like this: waking before sunrise without an alarm, eating lightly, doing focused work without compulsive checking of the phone, feeling genuine interest in what you&apos;re doing. You don&apos;t manufacture this state. You create conditions that make it more likely: sleep, food, what you consume mentally, who you spend time with.
      </p>

      <h2>Rajas: Activity, Desire, Restlessness</h2>
      <p>
        Rajas is the quality of activity, drive, and craving. It is not evil. Without rajas nothing gets done. Every goal pursued, every project launched, every competition entered runs on rajas. The problem is the attachment it creates: the need for the outcome, the agitation when things don&apos;t move, the constant planning and wanting.
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 14.7"
        sanskrit="रजो रागात्मकं विद्धि तृष्णासङ्गसमुद्भवम् । तन्निबध्नाति कौन्तेय कर्मसङ्गेन देहिनम् ॥"
        iast="rajo rāgātmakaṃ viddhi tṛṣṇāsaṅgasamudbhavam | tannibadhnāti kaunteya karmasaṅgena dehinam ||"
        meaningLabel="Translation"
        insightLabel="What This Teaches"
        essence="Attachment to actions comes from desires; freedom begins with self-awareness."
      />

      <p>
        A heavily rajasic day has a particular texture: you feel busy, slightly agitated, productive in bursts, but with a background hum of anxiety. You get things done but the satisfaction doesn&apos;t quite arrive. You finish one thing and immediately move to the next. The doing is compulsive, not chosen.
      </p>

      <h2>Tamas: Inertia, Delusion, Heaviness</h2>
      <p>
        Tamas is the quality of heaviness, inertia, and delusion. It binds through negligence, laziness, and sleep. At its root is ajnana, ignorance, specifically the inability to see clearly what is happening or what needs to be done.
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 14.8"
        sanskrit="तमस्त्वज्ञानजं विद्धि मोहनं सर्वदेहिनाम् । प्रमादालस्यनिद्राभिस्तन्निबध्नाति भारत ॥"
        iast="tamastvajñānajaṃ viddhi mohanaṃ sarvadehinām | pramādālasyanidrābhistannibadhnāti bhārata ||"
        meaningLabel="Translation"
        insightLabel="What This Teaches"
        essence="Tamas keeps us bound through ignorance, laziness, and carelessness."
      />

      <p>
        It&apos;s worth noting that rest itself is not tamasic. Sleep after genuine exertion is sattvic. Rest taken as recovery is appropriate. Tamas is the heavy sleep that comes from avoidance, the couch that becomes a hiding place, the hour of video content consumed without choosing it. The quality is not in the activity but in what produces and what follows it.
      </p>

      <h2>How They Interact</h2>
      <p>
        The gunas don&apos;t sit in separate compartments. They compete. At any moment one predominates, but the other two are present and shifting. When sattva rises, it suppresses rajas and tamas. When rajas surges, it overtakes sattva&apos;s calm and tamas&apos;s inertia. This is why you can go from clarity to agitation within the same afternoon.
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 14.10"
        sanskrit="रजस्तमश्चाभिभूय सत्त्वं भवति भारत । रजः सत्त्वं तमश्चैव तमः सत्त्वं रजस्तथा ॥"
        iast="rajastamaścābhibhūya sattvaṃ bhavati bhārata | rajaḥ sattvaṃ tamaścaiva tamaḥ sattvaṃ rajastathā ||"
        meaningLabel="Translation"
        insightLabel="What This Teaches"
        essence="Your inner state is always changing; self-awareness lets you move towards balance."
      />

      <h2>How to Read Your Own Gunas Right Now</h2>
      <p>
        The point of this framework is not classification. It&apos;s diagnosis. Here is a simple self-check:
      </p>

      <div className="highlight-box">
        <h3>A Guna Self-Diagnostic</h3>
        <p>
          Sattva is present when: you feel clear without effort, you can sit quietly without reaching for your phone, you feel genuine interest in something, you feel neither heavy nor agitated.
        </p>
        <p>
          Rajas is present when: you feel driven but slightly anxious, you keep refreshing something, you feel productive but not at peace, satisfaction arrives briefly after completing something and then the craving for the next thing begins immediately.
        </p>
        <p>
          Tamas is present when: you feel heavy, unmotivated, slightly confused about what you actually want, drawn to more sleep or more passive distraction, unable to start things you know you need to do.
        </p>
        <p>
          What you&apos;re trying to do is not judge the state but see it accurately. Once seen, you can ask: what conditions produced this? What would shift it?
        </p>
      </div>

      <h2>Food, Worship, and Action</h2>
      <p>
        The Gita extends the guna framework far beyond personality. Chapter 17 classifies food by guna. Sattvic food is fresh, light, and nourishing. Rajasic food is spicy, hot, and stimulating. Tamasic food is stale, fermented, or overcooked. The claim is not just symbolic: the food you eat affects the quality of your mind.
      </p>
      <p>
        The same classification applies to worship: sattvic worship is offered without expectation of reward; rajasic worship is performed for status or results; tamasic worship is careless and done from superstition. Even charity is classified: sattvic charity is given at the right time, to the right person, without expecting anything back.
      </p>

      <p className="pull-quote">
        The Gita is saying that the guna of an action is not determined by what the action is, but by the quality of consciousness behind it.
      </p>

      <h2>Gunatita: Beyond All Three</h2>
      <p>
        Here is the part the wellness world tends to miss. The Gita&apos;s goal is not to maximize sattva. It is to go beyond all three gunas entirely. This state is called gunatita. Verse 14.20 describes it directly.
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 14.20"
        sanskrit="गुणानेतानतीत्य त्रीन्देही देहसमुद्भवान् । जन्ममृत्युजरादुःखैर्विमुक्तोऽमृतमश्नुते ॥"
        iast="guṇānetānatītya trīndehī dehasamudbhavān | janmamṛtyujarāduḥkhairvimukto'mṛtamaśnute ||"
        meaningLabel="Translation"
        insightLabel="What This Teaches"
        essence="Transcend the hold of nature's three qualities to discover true freedom and undying bliss."
      />
    </div>

    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-item">
        <strong>What are sattva, rajas, and tamas?</strong>
        <p>
          Sattva, rajas, and tamas are the three gunas, the three fundamental qualities that the Bhagavad Gita says make up all of prakriti (nature). Sattva is clarity, lightness, and knowledge. Rajas is activity, desire, and restlessness. Tamas is inertia, heaviness, and delusion. They are not personality types. They are forces present in everything and everyone in varying combinations.
        </p>
      </div>

      <div className="faq-item">
        <strong>How do the gunas affect daily life?</strong>
        <p>
          The gunas shape your mental states from moment to moment. When sattva is strong, you feel clear and focused. When rajas dominates, you feel driven but anxious. When tamas is high, you feel heavy, unmotivated, or confused. Diet, sleep, company, media consumption, and physical activity all influence which guna is currently predominating. The Gita treats this as practical information, not abstract philosophy.
        </p>
      </div>

      <div className="faq-item">
        <strong>Can you change your guna?</strong>
        <p>
          Yes. The gunas are not fixed. They shift based on conditions. The Gita describes specific foods, activities, and modes of worship associated with each guna in Chapters 17 and 18. Eating fresh, light food supports sattva. Working with excessive attachment feeds rajas. Excessive sleep and neglect increases tamas. The conditions you create shift the balance over time.
        </p>
      </div>

      <div className="faq-item">
        <strong>What is the gunatita state?</strong>
        <p>
          Gunatita means beyond the gunas. BG 14.20 describes this state as freedom from birth, aging, and death. It is not the perfection of sattva but the transcendence of the entire guna framework. BG 14.26 points to undivided devotion as the means. In practical terms, gunatita is described as equanimity: the ability to remain steady whether sattva, rajas, or tamas is arising, without being moved or controlled by any of them.
        </p>
      </div>

      <div className="faq-item">
        <strong>What guna should I aim for according to the Bhagavad Gita?</strong>
        <p>
          The Gita recommends cultivating sattva as a working condition. It supports clarity and makes spiritual practice possible. But the Gita explicitly warns against becoming attached even to sattva: BG 14.6 says sattva binds through attachment to happiness and knowledge. The final direction is not &quot;achieve sattva&quot; but &quot;go beyond all three.&quot; Sattva is the platform, not the destination.
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
          <span>✦ Meaning &amp; modern context</span>
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

    <BlogTracker pageName="Three Gunas Sattva Rajas Tamas" />
    </>
  )
}
