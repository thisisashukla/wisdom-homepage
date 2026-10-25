import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'

import SiteFooter from '@/components/SiteFooter'
export const metadata: Metadata = {
  title: "Bhagavad Gita for Students — Key Verses on Focus, Exam Stress & Effort (Exam-Ready Summary)",
  description: "The Gita was taught to a trained archer who froze before the battle he had prepared for. 9 verses for students on focus, exam stress, effort and the restless mind, with Sanskrit, meaning and application.",
  keywords: "bhagavad gita for students, bhagavad gita lessons for students, bhagavad gita on focus, bhagavad gita exam stress, bhagavad gita student life, bhagavad gita on effort and results, bhagavad gita study tips, bhagavad gita for youth, bhagavad gita on discipline",
  openGraph: {
    title: "Bhagavad Gita for Students — Key Verses on Focus, Exam Stress & Effort",
    description: "The Gita was taught to a trained archer who froze before the battle he had prepared for. 9 verses for students on focus, exam stress, effort, failure and the mind.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagavad-gita-for-students",
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sansearchapp',
    creator: '@thisisashukla',
    title: "Bhagavad Gita for Students — Key Verses on Focus, Exam Stress & Effort",
    description: "The Gita was taught to a trained archer who froze before the battle he had prepared for. 9 verses for students on focus, exam stress, effort, failure and the mind.",
    images: ['https://wisdomquotes.in/og-image.jpg'],
  },
  alternates: {
    canonical: "https://wisdomquotes.in/blogs/bhagavad-gita-for-students",
    languages: {
      'en': "https://wisdomquotes.in/blogs/bhagavad-gita-for-students",
      'en-IN': "https://wisdomquotes.in/blogs/bhagavad-gita-for-students",
      'x-default': "https://wisdomquotes.in/blogs/bhagavad-gita-for-students",
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
            content: "अभ्यास";
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

        /* Lesson Number */
        .lesson-label {
            display: inline-block;
            background: rgba(200,136,30,0.12);
            border: 1px solid rgba(200,136,30,0.3);
            color: var(--gold);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            padding: 3px 10px;
            border-radius: 4px;
            margin-bottom: 10px;
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
    "headline": "Bhagavad Gita for Students: 9 Lessons on Focus, Failure, and Effort | Wisdom",
    "description": "The Gita was taught to a trained archer who froze before the battle he had prepared for. Here are 9 lessons for students.",
    "datePublished": "2026-06-12",
    "dateModified": "2026-08-01",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://wisdomquotes.in/blogs/bhagavad-gita-for-students" },
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
      { "@type": "ListItem", "position": 3, "name": "Bhagavad Gita for Students", "item": "https://wisdomquotes.in/blogs/bhagavad-gita-for-students" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does the Bhagavad Gita help students?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Gita's core teaching, do your work fully without attachment to the result, is directly applicable to students facing exam pressure. Arjuna, capable but unable to act before a high-stakes moment, is in a position many students know. The Gita covers focus, self-mastery, failure, and the relationship between effort and outcome."
        }
      },
      {
        "@type": "Question",
        "name": "What does the Gita say about hard work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BG 3.8 says to do your prescribed work, because action is better than inaction. The Gita pairs this with the teaching of nishkama karma in BG 2.47: work fully, and let go of attachment to the outcome."
        }
      },
      {
        "@type": "Question",
        "name": "What does the Bhagavad Gita say about exam stress?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Start with BG 2.47: your right is to the action, never to its fruits. Worry before exams often comes from tying your effort to the outcome. The Gita separates them. Your job is to prepare and to act with full attention, and the result depends on many factors, some outside your control."
        }
      },
      {
        "@type": "Question",
        "name": "What does the Bhagavad Gita say about concentration and focus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BG 6.35 acknowledges that the mind is restless and hard to control, but says it can be restrained through abhyasa (consistent practice) and vairagya (dispassion toward distractions). The Gita also points to self-mastery in BG 6.5 and 6.6: you are your own friend when you train your mind, and your own enemy when you let it run unchecked. In the Gita, concentration is built through practice."
        }
      },
      {
        "@type": "Question",
        "name": "Should students read the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Bhagavad Gita addresses questions that are directly relevant to students: how to act under pressure, how to deal with fear of failure, how to stay focused, how to relate to authority and duty, and what to do after a bad outcome. It was taught to someone facing all of these at once, with lives at stake. Reading it with these questions in mind makes it practical."
        }
      }
    ]
  }
]

export default function GitaForStudentsPage() {
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
        Bhagavad Gita for Students
      </div>
    </div>

    <div className="article-hero">
      <div className="article-hero-inner">
        <div className="chapter-badge">
          <div className="chapter-badge-dot"></div>
          Bhagavad Gita · For Students
          <div className="chapter-badge-dot"></div>
        </div>
        <h1 className="article-title">
          The Gita Was Taught to Someone<br />
          <em>Who Froze Before the Battle</em>
        </h1>
        <p className="article-subtitle">
          Arjuna was trained and capable, and he still could not act when it mattered. Here are nine verses from what Krishna told him, read for students.
        </p>
        <div className="article-meta">
          <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">9 Lessons · Student Guide</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">~7 min read</span>
          <span className="meta-sep">·</span>
          <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed October 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
        </div>
      </div>
    </div>

    <div className="content">
      <figure className="chapter-image">
        <img
          src="/assets/chapter6.webp"
          alt="Bhagavad Gita lessons for students: focus, effort, and the disciplined mind"
          width="1200"
          height="675"
          loading="eager"
          fetchPriority="high"
        />
        <figcaption>Abhyasa: the practice of consistent effort, without attachment to the result</figcaption>
      </figure>

      <p className="lead">
        Arjuna had years of training, great skill and the best teachers of his time. When the moment came, his limbs shook, his bow slipped from his grip (1.29–30), and he sat down in his chariot and refused to fight (1.47). The Bhagavad Gita is the teaching he received then. A student who has blanked in an exam, or frozen during a presentation they had practised many times, knows some version of this.
      </p>
      <p>
        Krishna never tells Arjuna that everything will be fine. He tells him to understand what is happening and then act from that understanding, which works for anyone under pressure.
      </p>

      <h2>Lesson 1: Focus on Action, Not Results</h2>
      <div className="lesson-label">Lesson 1 · BG 2.47</div>

      <p>
        People quote this verse so often that it can start to sound like a slogan. It has four parts.
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 2.47"
        sanskrit="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥"
        iast="karmaṇyevādhikāraste mā phaleṣu kadācana | mā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi ||"
        meaningLabel="Translation"
        meaning="Your right is to the action alone, never to its fruits. Do not let the fruit be your motive, and do not be attached to inaction."
        insightLabel="For Students"
        insight="The four parts: your right is to the action; you have no claim on the result; the expected result should not be your motive; and none of this is an excuse to stop trying. Exam stress usually comes from the third part going wrong. When the marks become the reason you study, fear of the marks gets into the studying itself, and Krishna asks you to keep the two apart."
        essence="Your right is to the work, never to its results."
      />

      <p>
        You can still care about your marks. The instruction is to put your full attention into preparing and into the exam itself, which you control. The result depends on many factors, and worry about the ones you cannot control does nothing for the ones you can.
      </p>

      <h2>Lesson 2: Do the Work</h2>
      <div className="lesson-label">Lesson 2 · BG 3.8</div>

      <p>
        Some students use &quot;detachment from results&quot; as a reason not to try. The Gita closes that door in 3.8.
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 3.8"
        sanskrit="नियतं कुरु कर्म त्वं कर्म ज्यायो ह्यकर्मणः । शरीरयात्रापि च ते न प्रसिद्ध्येदकर्मणः ॥"
        iast="niyataṃ kuru karma tvaṃ karma jyāyo hyakarmaṇaḥ | śarīrayātrāpi ca te na prasiddhyedakarmaṇaḥ ||"
        meaningLabel="Translation"
        meaning="Do your duties as prescribed by dharma. Acting is better than not acting, because even keeping your body going is not possible without action."
        insightLabel="For Students"
        insight="Niyatam karma means &quot;prescribed work&quot;. For a student that means studying, attending class, doing the practice problems and writing the drafts. Krishna asks for action whether or not you feel inspired. You open the book first, and sometimes the motivation follows."
        essence="Do your prescribed work; action is better than inaction."
      />

      <h2>Lesson 3: You Are Your Own Friend and Enemy</h2>
      <div className="lesson-label">Lesson 3 · BG 6.5</div>

      <p>
        Chapter 6 deals with self-mastery and meditation. Verses 6.5 and 6.6 put responsibility for your inner state on you.
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 6.5"
        sanskrit="उद्धरेदात्मनाऽऽत्मानं नात्मानमवसादयेत् । आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ॥"
        iast="uddharedātmanā''tmānaṃ nātmānamavasādayet | ātmaiva hyātmano bandhurātmaiva ripurātmanaḥ ||"
        meaningLabel="Translation"
        meaning="Lift yourself by your own effort and keep yourself from sinking, for you alone are your own friend and your own enemy."
        insightLabel="For Students"
        insight="Krishna says you can lift yourself or let yourself sink. The way you talk to yourself, the story you tell about your own ability, and how you spend tonight all push one way or the other. Teachers and parents can help, but the verse puts the deciding choices with you."
        essence="Lift yourself by yourself; you are your own friend and your own enemy."
      />

      <h2>Lesson 4: Master the Mind or It Masters You</h2>
      <div className="lesson-label">Lesson 4 · BG 6.6</div>

            <ShlokaCard
        verseRef="Bhagavad Gita 6.6"
        sanskrit="बन्धुरात्माऽऽत्मनस्तस्य येनात्मैवात्मना जितः । अनात्मनस्तु शत्रुत्वे वर्तेतात्मैव शत्रुवत् ॥"
        iast="bandhurātmā''tmanastasya yenātmaivātmanā jitaḥ | anātmanastu śatrutve vartetātmaiva śatruvat ||"
        meaningLabel="Translation"
        meaning="If you have learned to guide your own mind, you become your own friend. If you have not, your own mind acts like your enemy."
        insightLabel="For Students"
        insight="This verse follows from 6.5. The mind that talks you out of studying, or tells you that you are not clever enough so why bother, is the unmastered mind acting as an enemy. A trained mind focuses when you ask it to and rests when you need it to, and in the Gita that training is learned."
        essence="The self is a friend to one who has mastered it, an enemy to one who has not."
      />

      <h2>Lesson 5: Fearlessness and Self-Study as the Starting Point</h2>
      <div className="lesson-label">Lesson 5 · BG 16.1</div>

      <p>
        Chapter 16 contrasts the divine nature with the demonic one. The divine qualities come first, and two of them matter to students.
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 16.1"
        sanskrit="अभयं सत्त्वसंशुद्धिः ज्ञानयोगव्यवस्थितिः । दानं दमश्च यज्ञश्च स्वाध्यायस्तप आर्जवम् ॥"
        iast="abhayaṃ sattvasaṃśuddhiḥ jñānayogavyavasthitiḥ | dānaṃ damaśca yajñaśca svādhyāyastapa ārjavam ||"
        meaningLabel="Translation"
        meaning="Fearlessness, purity of heart, steadiness in knowledge and yoga, generosity, self-control, sacrifice, study of scripture, austerity and straightforwardness."
        insightLabel="For Students"
        insight="Two words stand out: abhayam (fearlessness), which opens the list, and svadhyaya, usually explained as study and recitation of scripture. Fearlessness here means fear does not make your decisions for you. Svadhyaya is regular, self-directed study. A student with both studies steadily and acts in spite of fear."
        essence="Fearlessness, purity, generosity, self-control and study mark the divine nature."
      />

      <h2>Lesson 6: Mental Discipline Is Its Own Practice</h2>
      <div className="lesson-label">Lesson 6 · BG 17.16</div>

      <p>
        Chapter 17 sorts tapas, discipline, into three kinds: of the body, of speech and of the mind (17.14–16). The third is the one a student uses every day.
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 17.16"
        sanskrit="मनःप्रसादः सौम्यत्वं मौनमात्मविनिग्रहः । भावसंशुद्धिरित्येतत्तपो मानसमुच्यते ॥"
        iast="manaḥprasādaḥ saumyatvaṃ maunamātmavinigrahaḥ | bhāvasaṃśuddhirityetattapo mānasamucyate ||"
        meaningLabel="Translation"
        meaning="Serenity of mind, gentleness, silence, self-control and purity of feeling: this is called discipline of the mind."
        insightLabel="For Students"
        insight="Mauna, silence, is listed as a form of mental tapas. For a student it can mean long stretches of work without interruption or background chatter. Atma-vinigraha, self-restraint, means declining to follow every impulse the mind produces. Bhava-samshuddhi, purity of feeling, can mean studying to understand as well as to score."
        essence="Serenity, gentleness, silence, self-control and purity of feeling make up discipline of the mind."
      />

      <h2>Lesson 7: Practice and Dispassion Are the Path to a Focused Mind</h2>
      <div className="lesson-label">Lesson 7 · BG 6.35</div>

      <p>
        In 6.34 Arjuna complains that the mind is restless, turbulent and hard to control, as hard to hold as the wind. Krishna&apos;s answer is specific.
      </p>

      <div className="highlight-box">
        <h3>BG 6.35: Abhyasa and Vairagya</h3>
        <p>
          Krishna says: &quot;Undoubtedly, the mind is restless and difficult to control. But through practice (abhyasa) and dispassion (vairagya), it can be restrained.&quot;
        </p>
        <p>
          Abhyasa means consistent, repeated practice. Vairagya means dispassion: seeing a distraction for what it is and choosing not to follow it. Both are developed over time.
        </p>
        <p>
          For a student, the practice is sitting down to study at the same time each day, whether or not you feel like it. The dispassion is noticing the pull of a distraction or a worry and letting it go by. Concentration grows out of these two, practised over months.
        </p>
      </div>

      <h2>Lesson 8: Good Practice Is Never Destroyed</h2>
      <div className="lesson-label">Lesson 8 · BG 6.40</div>

      <p>
        Arjuna asks Krishna what happens to someone who starts practicing yoga (self-discipline, good conduct, effort) but fails before reaching the goal. What if you fall short? Does all the effort get wasted?
      </p>
      <p>
        Krishna answers in BG 6.40: such a person meets no destruction, in this world or the next, because no one who does good comes to a bad end.
      </p>

      <p className="pull-quote">
        In the Gita, effort in the right direction is never lost. You may not get the grade you wanted, or you may fail this time, and the discipline and understanding you built are still yours.
      </p>

      <p>
        That is the Gita&apos;s answer to failure. The result still matters, and a bad result does not erase what was real in the effort.
      </p>

      <h2>Lesson 9: Align With What Is Right, Then Act</h2>
      <div className="lesson-label">Lesson 9 · BG 18.78</div>

      <p>
        The Gita&apos;s last verse belongs to Sanjaya, the narrator who has been reporting the dialogue to the blind king Dhritarashtra:
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 18.78"
        sanskrit="यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः । तत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम ॥"
        iast="yatra yogeśvaraḥ kṛṣṇo yatra pārtho dhanurdharaḥ | tatra śrīrvijayo bhūtirdhruvā nītirmatirmama ||"
        meaningLabel="Translation"
        meaning="Where there is Krishna, the master of yoga, and Arjuna, who holds the bow, there you will find prosperity, victory, strength, and firm ethics. This is my belief."
        insightLabel="For Students"
        insight="Sanjaya pairs Krishna, the master of yoga, with Arjuna the archer. Many readers take Krishna as guidance and Arjuna as skill and effort. For a student, that means studying honestly, skipping the shortcuts that leave you without real understanding, and then working with full effort."
        essence="Where Krishna and Arjuna stand together, there is fortune, victory and sound conduct."
      />

      <h2>The One Verse to Keep Near an Exam</h2>
      <p>
        If you memorise one verse before an exam, make it BG 2.47, and read it as a practical instruction.
      </p>

      <div className="highlight-box">
        <h3>Before the Exam: A Practical Reading</h3>
        <p>
          Your preparation is done. You have a right to this action: to sit down and demonstrate what you know. You do not have control over every question that appears. You do not have control over how the evaluator grades it.
        </p>
        <p>
          Keep worry about the result out of the action. The action, right now, is to read the question carefully, think clearly, and write your best answer. That is the only thing in front of you.
        </p>
        <p>
          The result follows from the action, and worrying about it adds nothing.</p> </div> <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected the reading of 2.47 (exam stress comes from the result as motive, the third part), the translations of 16.1 and 17.16, the gloss of svadhyaya, and where Arjuna sits in 1.47; copy edited.</p>
    </div>


      <FeedbackWidget pageType="blog" />
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-item">
        <strong>Does the Bhagavad Gita help students?</strong>
        <p>
          The Gita&apos;s core teaching, do your work fully without attachment to the result, applies directly to exam pressure. Arjuna, capable but unable to act before a high-stakes moment, is in a position many students know. The Gita covers focus, self-mastery, failure, and the relationship between effort and outcome.
        </p>
      </div>

      <div className="faq-item">
        <strong>What does the Gita say about hard work?</strong>
        <p>
          BG 3.8 says to do your prescribed work, because action is better than inaction. The Gita pairs this with the teaching of nishkama karma in BG 2.47: work fully, and let go of attachment to the outcome.
        </p>
      </div>

      <div className="faq-item">
        <strong>What does the Bhagavad Gita say about exam stress?</strong>
        <p>
          Start with BG 2.47: your right is to the action, never to its fruits. Worry before exams often comes from tying your effort to the outcome. The Gita separates them. Your job is to prepare and to act with full attention, and the result depends on many factors, some outside your control.
        </p>
      </div>

      <div className="faq-item">
        <strong>What does the Bhagavad Gita say about concentration and focus?</strong>
        <p>
          BG 6.35 acknowledges directly that the mind is restless, and says it can be restrained through abhyasa (consistent practice) and vairagya (dispassion toward distractions). BG 17.16 identifies silence and self-restraint as forms of mental discipline. The Gita treats focus as something you develop.
        </p>
      </div>

      <div className="faq-item">
        <strong>Should students read the Bhagavad Gita?</strong>
        <p>
          The Gita addresses questions that are directly relevant to students: how to act under pressure, how to deal with fear of failure, how to stay focused, and what to do after a bad outcome. It was taught to someone facing all of these at once, with lives at stake. Reading it with these questions in mind makes it practical.
        </p>
      </div>
    </div>

    <div className="content">
      <VerseFunnelCTA variant="chapter" locale="en" pageName={"Bhagavad Gita For Students"} />
    </div>

    <SiteFooter />

    <BlogTracker pageName="Bhagavad Gita For Students" />
    </>
  )
}
