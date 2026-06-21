import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import ShlokaCard from '@/components/gita/ShlokaCard'

export const metadata: Metadata = {
  title: "Bhagavad Gita for Students: 9 Lessons on Focus, Failure, and Effort | Wisdom",
  description: "The Gita was taught to someone who froze under pressure right before the biggest test of his life. Here are 9 lessons specifically relevant to students: focus, results anxiety, effort, failure, and the mind.",
  keywords: "bhagavad gita for students, bhagavad gita lessons for students, bhagavad gita on focus, bhagavad gita exam stress, bhagavad gita student life, bhagavad gita on effort and results, bhagavad gita study tips, bhagavad gita for youth, bhagavad gita on discipline",
  openGraph: {
    title: "Bhagavad Gita for Students: 9 Lessons on Focus, Failure, and Effort | Wisdom",
    description: "The Gita was taught to someone who froze under pressure right before the biggest test of his life. 9 lessons on focus, results anxiety, effort, and the mind.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagavad-gita-for-students",
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/bhagavad-gita-for-students" },
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
    "description": "The Gita was taught to someone who froze under pressure right before the biggest test of his life. Here are 9 lessons specifically relevant to students.",
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
        "name": "Does the Bhagavad Gita help students?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Gita's core teaching, do your work fully without attachment to the result, is directly applicable to students facing exam pressure. Arjuna's situation, capable but paralyzed before a high-stakes moment, mirrors the experience of many students. The Gita addresses focus, self-mastery, dealing with failure, and the relationship between effort and outcome."
        }
      },
      {
        "@type": "Question",
        "name": "What does the Gita say about hard work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BG 3.8 says perform your prescribed duty, because action is better than inaction. The Gita is clear: doing nothing is not a solution. It pairs this with the teaching of nishkama karma from BG 2.47: work fully, but release attachment to the outcome. This combination, full effort without results-anxiety, is the Gita's practical answer to the work question."
        }
      },
      {
        "@type": "Question",
        "name": "What does the Bhagavad Gita say about exam stress?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Gita's most relevant teaching for exam stress is BG 2.47: you have the right to perform your duty, but not to the fruits. Anxiety before exams comes from conflating your effort with the outcome. The Gita separates them: your job is to prepare and act with full attention. The result follows from many factors, not all under your control. Focusing on what you control, the preparation, the work, reduces the anxiety connected to what you cannot control."
        }
      },
      {
        "@type": "Question",
        "name": "What does the Bhagavad Gita say about concentration and focus?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BG 6.35 acknowledges that the mind is restless and hard to control, but says it can be restrained through abhyasa (consistent practice) and vairagya (dispassion toward distractions). The Gita also points to self-mastery in BG 6.5 and 6.6: you are your own friend when you train your mind, and your own enemy when you let it run unchecked. Concentration is not a talent. It is a skill built through practice."
        }
      },
      {
        "@type": "Question",
        "name": "Should students read the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Bhagavad Gita addresses questions that are directly relevant to students: how to act under pressure, how to deal with fear of failure, how to stay focused, how to relate to authority and duty, and what to do after a bad outcome. It was taught to someone experiencing the most high-stakes version of all of these at once. Reading it with these specific questions in mind, rather than as a religious text, gives it immediate practical value."
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
          <em>Who Froze Before His Biggest Test</em>
        </h1>
        <p className="article-subtitle">
          Arjuna was prepared, trained, capable. He still could not perform when it mattered. Here is what helped him, and what can help any student facing the same wall.
        </p>
        <div className="article-meta">
          <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">9 Lessons · Student Guide</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">~7 min read</span>
          <span className="meta-sep">·</span>
          <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed June 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
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
        Arjuna is a student&apos;s worst-case scenario. Years of preparation. Perfect skill. The right teacher. And then, when the moment arrived, his hands shook, his bow slipped from his grip, and he sat down on the floor of his chariot and said he could not do this. The Bhagavad Gita is the teaching he received in that moment. Every student who has blanked on an exam, or choked during a presentation they had practiced thirty times, knows some version of this.
      </p>
      <p>
        The Gita does not tell Arjuna that everything will be fine. It tells him to understand what is actually happening, and then to act from that understanding. That instruction holds for anyone in a moment of pressure.
      </p>

      <h2>Lesson 1: Focus on Action, Not Results</h2>
      <div className="lesson-label">Lesson 1 · BG 2.47</div>

      <p>
        This is the verse most quoted when someone asks what the Gita says about anxiety. It is quoted so often that it can start to feel like a platitude. Read it carefully.
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 2.47"
        sanskrit="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥"
        iast="karmaṇyevādhikāraste mā phaleṣu kadācana | mā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi ||"
        meaningLabel="Translation"
        insightLabel="For Students"
        essence="Focus on right action, let go of attachment to results."
      />

      <p>
        This is not fatalism. It is not &quot;don&apos;t care about your marks.&quot; It is a much sharper instruction: put your full attention into the preparation and the execution. That is what you control. The result follows from many factors, some under your control and some not. Your anxiety about the factors you cannot control is not helping the factors you can.
      </p>

      <h2>Lesson 2: Do the Work</h2>
      <div className="lesson-label">Lesson 2 · BG 3.8</div>

      <p>
        There is a version of &quot;detachment from results&quot; that some students use to justify not trying. The Gita anticipates this and addresses it directly.
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 3.8"
        sanskrit="नियतं कुरु कर्म त्वं कर्म ज्यायो ह्यकर्मणः । शरीरयात्रापि च ते न प्रसिद्ध्येदकर्मणः ॥"
        iast="niyataṃ kuru karma tvaṃ karma jyāyo hyakarmaṇaḥ | śarīrayātrāpi ca te na prasiddhyedakarmaṇaḥ ||"
        meaningLabel="Translation"
        insightLabel="For Students"
        essence="Choose karma over inaction; your path requires your effort."
      />

      <h2>Lesson 3: You Are Your Own Friend and Enemy</h2>
      <div className="lesson-label">Lesson 3 · BG 6.5</div>

      <p>
        Chapter 6 deals with self-mastery and the practice of yoga. It contains two verses that are among the most direct in the entire Gita about personal responsibility for your own inner state.
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 6.5"
        sanskrit="उद्धरेदात्मनाऽऽत्मानं नात्मानमवसादयेत् । आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ॥"
        iast="uddharedātmanā''tmānaṃ nātmānamavasādayet | ātmaiva hyātmano bandhurātmaiva ripurātmanaḥ ||"
        meaningLabel="Translation"
        insightLabel="For Students"
        essence="You are your greatest ally and your own worst obstacle. Choose upliftment."
      />

      <h2>Lesson 4: Master the Mind or It Masters You</h2>
      <div className="lesson-label">Lesson 4 · BG 6.6</div>

            <ShlokaCard
        verseRef="Bhagavad Gita 6.6"
        sanskrit="बन्धुरात्माऽऽत्मनस्तस्य येनात्मैवात्मना जितः । अनात्मनस्तु शत्रुत्वे वर्तेतात्मैव शत्रुवत् ॥"
        iast="bandhurātmā''tmanastasya yenātmaivātmanā jitaḥ | anātmanastu śatrutve vartetātmaiva śatruvat ||"
        meaningLabel="Translation"
        insightLabel="For Students"
        essence="Mastery of self turns your inner nature into your greatest ally."
      />

      <h2>Lesson 5: Fearlessness and Self-Study as the Starting Point</h2>
      <div className="lesson-label">Lesson 5 · BG 16.1</div>

      <p>
        Chapter 16 describes the qualities of those oriented toward the divine versus those oriented toward the demonic. The divine qualities are listed first, and two of them are especially relevant to students.
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 16.1"
        sanskrit="अभयं सत्त्वसंशुद्धिः ज्ञानयोगव्यवस्थितिः । दानं दमश्च यज्ञश्च स्वाध्यायस्तप आर्जवम् ॥"
        iast="abhayaṃ sattvasaṃśuddhiḥ jñānayogavyavasthitiḥ | dānaṃ damaśca yajñaśca svādhyāyastapa ārjavam ||"
        meaningLabel="Translation"
        insightLabel="For Students"
        essence="Fearlessness, purity, discipline, and self-study lead to clarity and inner harmony."
      />

      <h2>Lesson 6: Mental Discipline Is Its Own Practice</h2>
      <div className="lesson-label">Lesson 6 · BG 17.16</div>

      <p>
        Chapter 17 classifies tapas, discipline, into three kinds: physical, verbal, and mental. The mental form is the most relevant to any student.
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 17.16"
        sanskrit="मनःप्रसादः सौम्यत्वं मौनमात्मविनिग्रहः । भावसंशुद्धिरित्येतत्तपो मानसमुच्यते ॥"
        iast="manaḥprasādaḥ saumyatvaṃ maunamātmavinigrahaḥ | bhāvasaṃśuddhirityetattapo mānasamucyate ||"
        meaningLabel="Translation"
        insightLabel="For Students"
        essence="True discipline starts by mastering and purifying your mind."
      />

      <h2>Lesson 7: Practice and Dispassion Are the Path to a Focused Mind</h2>
      <div className="lesson-label">Lesson 7 · BG 6.35</div>

      <p>
        Arjuna complains to Krishna in Chapter 6 that the mind is restless, turbulent, and hard to control. He says trying to discipline the mind feels as difficult as trying to control the wind. Krishna&apos;s answer is specific.
      </p>

      <div className="highlight-box">
        <h3>BG 6.35: Abhyasa and Vairagya</h3>
        <p>
          Krishna says: &quot;Undoubtedly, the mind is restless and difficult to control. But through practice (abhyasa) and dispassion (vairagya), it can be restrained.&quot;
        </p>
        <p>
          Abhyasa means consistent, repeated practice. Vairagya means indifference to distractions, specifically the quality of seeing a distraction clearly as a distraction and choosing not to follow it. Neither of these are innate. Both are developed.
        </p>
        <p>
          For a student: the practice is showing up to study at the same time each day, whether or not you feel like it. The dispassion is recognizing the pull of your phone or your anxiety and not acting on it immediately. Concentration is not a gift. It is the residue of these two things practiced over time.
        </p>
      </div>

      <h2>Lesson 8: Good Practice Is Never Destroyed</h2>
      <div className="lesson-label">Lesson 8 · BG 6.40</div>

      <p>
        Arjuna asks Krishna what happens to someone who starts practicing yoga (self-discipline, good conduct, effort) but fails before reaching the goal. What if you fall short? Does all the effort get wasted?
      </p>
      <p>
        Krishna&apos;s answer in BG 6.40 is one of the most reassuring passages in the Gita: a person who has done good, who has made genuine effort, is never destroyed. Such a person does not come to misfortune.
      </p>

      <p className="pull-quote">
        The Gita&apos;s position is that effort in the right direction is never lost. You may not get the grade you wanted. You may fail the exam this time. But the capacity you built, the discipline you developed, the understanding you gained, none of that disappears. It stays. It compounds.
      </p>

      <p>
        This is the Gita&apos;s answer to failure. Not &quot;it doesn&apos;t matter&quot; but &quot;what was genuine in your effort is not erased by the result.&quot; The bad result is the result. The practice is something else.
      </p>

      <h2>Lesson 9: Align With What Is Right, Then Act</h2>
      <div className="lesson-label">Lesson 9 · BG 18.78</div>

      <p>
        The Gita closes not with Arjuna, but with Sanjaya, the narrator who has been watching everything. His final statement is this:
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 18.78"
        sanskrit="यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः । तत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम ॥"
        iast="yatra yogeśvaraḥ kṛṣṇo yatra pārtho dhanurdharaḥ | tatra śrīrvijayo bhūtirdhruvā nītirmatirmama ||"
        meaningLabel="Translation"
        insightLabel="For Students"
        essence="Fortune, victory, and lasting achievement come when you unite clarity with skillful action."
      />

      <h2>The One Verse to Keep Near an Exam</h2>
      <p>
        If you only memorize one verse before an exam, make it BG 2.47. Not as a mantra. As a practical instruction.
      </p>

      <div className="highlight-box">
        <h3>Before the Exam: A Practical Reading</h3>
        <p>
          Your preparation is done. You have a right to this action: to sit down and demonstrate what you know. You do not have control over every question that appears. You do not have control over how the evaluator grades it.
        </p>
        <p>
          Do not let anxiety about the result take over the action. The action, right now, is to read the question carefully, think clearly, and write your best answer. That is the only thing in front of you.
        </p>
        <p>
          The result follows from the action, not from your worry about the result. Focus on the action.
        </p>
      </div>
    </div>

    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-item">
        <strong>Does the Bhagavad Gita help students?</strong>
        <p>
          The Gita&apos;s core teaching, do your work fully without attachment to the result, is directly applicable to students facing exam pressure. Arjuna&apos;s situation, capable but paralyzed before a high-stakes moment, mirrors the experience of many students. The Gita addresses focus, self-mastery, dealing with failure, and the relationship between effort and outcome. It is more practical than it appears.
        </p>
      </div>

      <div className="faq-item">
        <strong>What does the Gita say about hard work?</strong>
        <p>
          BG 3.8 says perform your prescribed duty, because action is better than inaction. The Gita is clear: not doing the work is not a solution. It pairs this with the teaching of nishkama karma from BG 2.47: work fully, but release attachment to the outcome. Full effort without results-anxiety is the Gita&apos;s practical instruction on work.
        </p>
      </div>

      <div className="faq-item">
        <strong>What does the Bhagavad Gita say about exam stress?</strong>
        <p>
          BG 2.47 is the most relevant verse: you have the right to perform your duty, but not to the fruits. Anxiety before exams usually comes from conflating effort with outcome. The Gita separates them. Your job is to prepare and act with full attention. The result depends on many factors, not all under your control. Focusing on what you can control reduces the anxiety produced by what you cannot.
        </p>
      </div>

      <div className="faq-item">
        <strong>What does the Bhagavad Gita say about concentration and focus?</strong>
        <p>
          BG 6.35 acknowledges directly that the mind is restless, and says it can be restrained through abhyasa (consistent practice) and vairagya (dispassion toward distractions). BG 17.16 identifies silence and self-restraint as forms of mental discipline. The Gita treats focus as a developed skill, not a natural gift.
        </p>
      </div>

      <div className="faq-item">
        <strong>Should students read the Bhagavad Gita?</strong>
        <p>
          The Gita addresses questions that are directly relevant to students: how to act under pressure, how to deal with fear of failure, how to stay focused, and what to do after a bad outcome. It was taught to someone experiencing the most high-stakes version of all of these at once. Reading it with these specific questions in mind, rather than as a religious text, gives it immediate practical value.
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

    <BlogTracker pageName="Bhagavad Gita For Students" />
    </>
  )
}
