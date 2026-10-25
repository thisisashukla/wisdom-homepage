import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'

import SiteFooter from '@/components/SiteFooter'
export const metadata: Metadata = {
  title: "Dharma in the Bhagavad Gita: Meaning, Svadharma and Key Verses",
  description: "Dharma comes from dhṛ, to hold. In the Gita it is closer to 'your own nature, acted on' than to duty. Svadharma is Krishna's answer to Arjuna's paralysis, in 3.35, 4.7, 18.47 and 18.66.",
  keywords: "dharma meaning bhagavad gita, what is dharma in gita, svadharma meaning, dharma in hinduism gita, types of dharma bhagavad gita, dharma vs adharma gita, bhagavad gita 3.35 svadharma, bhagavad gita 4.7 dharma, bhagavad gita 18.47 svadharma, dharma definition hindi",
  openGraph: {
    title: "Dharma in the Bhagavad Gita: Meaning, Svadharma and Key Verses | Wisdom",
    description: "Dharma comes from dhṛ, to hold. In the Gita it is closer to 'your own nature, acted on' than to duty. Svadharma is Krishna's answer to Arjuna's paralysis.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/dharma-meaning-bhagavad-gita",
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sansearchapp',
    creator: '@thisisashukla',
    title: "Dharma in the Bhagavad Gita: Meaning, Svadharma and Key Verses | Wisdom",
    description: "Dharma comes from dhṛ, to hold. In the Gita it is closer to 'your own nature, acted on' than to duty. Svadharma is Krishna's answer to Arjuna's paralysis.",
    images: ['https://wisdomquotes.in/og-image.webp'],
  },
  alternates: {
    canonical: "https://wisdomquotes.in/blogs/dharma-meaning-bhagavad-gita",
    languages: {
      'en': "https://wisdomquotes.in/blogs/dharma-meaning-bhagavad-gita",
      'en-IN': "https://wisdomquotes.in/blogs/dharma-meaning-bhagavad-gita",
      'x-default': "https://wisdomquotes.in/blogs/dharma-meaning-bhagavad-gita",
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
            content: "धर्म";
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
    "headline": "Dharma in the Bhagavad Gita: Meaning, Svadharma and Key Verses | Wisdom",
    "description": "Dharma comes from dhṛ, to hold. In the Gita it is closer to your own nature, acted on, than to duty. Svadharma is Krishna's answer to Arjuna's paralysis.",
    "datePublished": "2026-06-12",
    "dateModified": "2026-08-01",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://wisdomquotes.in/blogs/dharma-meaning-bhagavad-gita" },
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
      { "@type": "ListItem", "position": 3, "name": "Dharma in the Bhagavad Gita", "item": "https://wisdomquotes.in/blogs/dharma-meaning-bhagavad-gita" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is dharma in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dharma in the Gita comes from the Sanskrit root dhr, to hold or sustain. It is what holds a thing's essential nature in place. The Gita uses it in three main senses: the order Krishna restores in every age (4.7–8), the family and caste duties Arjuna invokes in Chapter 1 (kula-dharma, jāti-dharma), and individual duty that follows from your own nature (svadharma). Most of the Gita's practical teaching is about svadharma."
        }
      },
      {
        "@type": "Question",
        "name": "What is svadharma?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Svadharma means your own dharma, the action and way of life that accords with your own nature (svabhava). BG 3.35 and BG 18.47 both say: better your own dharma, imperfectly done, than another's done well. Svadharma is action that comes from your own nature, as opposed to imitation or fear."
        }
      },
      {
        "@type": "Question",
        "name": "What does the Bhagavad Gita say about dharma and adharma?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Gita opens on dharma-kshetra, the field of dharma. Adharma is what opposes or erodes dharma. BG 4.7 says that whenever dharma declines and adharma rises, Krishna takes form to restore balance. In the Gita, dharma has to be upheld, and when it weakens, correction comes. In BG 2.33 Krishna tells Arjuna that refusing this righteous war would mean abandoning his own dharma and incurring sin."
        }
      },
      {
        "@type": "Question",
        "name": "Is dharma the same as duty?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Duty is a common English translation, but it suggests an obligation imposed from outside regardless of your nature. Dharma is closer to what you must do because of what you are. A traditional illustration: fire's dharma is to burn and rise, water's to flow downward, each following its own nature."
        }
      },
      {
        "@type": "Question",
        "name": "What does dharma-kshetra mean in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dharma-kshetra is the first word of the Gita: the field of dharma. Kurukshetra, the battlefield, is called dharma-kshetra. The opening word frames the war as a contest over dharma as well as over a kingdom. The battlefield is where dharma gets tested and either upheld or abandoned."
        }
      }
    ]
  }
]

export default function DharmaMeaningPage() {
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
          Dharma in the Gita
        </div>
      </div>

      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · Core Teaching
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            Dharma: What the Gita Means by It<br />
            <em>Svadharma, Adharma and Surrender</em>
          </h1>
          <p className="article-subtitle">
            Dharma rarely means just &ldquo;duty&rdquo; in the Gita. It is closer to what holds and sustains the structure of things, and for each person, what their own nature requires of them.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Core Teaching · Dharma</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~6 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Chapters 1, 3, 4 & 18</span>
            <span className="meta-sep">·</span>
            <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed October 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
          </div>
        </div>
      </div>

      <div className="content">
        <figure className="chapter-image">
          <img
            src="/assets/chapter4.webp"
            alt="Krishna teaching Arjuna about dharma on the battlefield of Kurukshetra"
            width="1200"
            height="675"
            loading="eager"
            fetchPriority="high"
          />
          <figcaption>Dharma: the teaching that holds the Gita together</figcaption>
        </figure>

        <p className="lead">
          The word dharma comes from the Sanskrit root dhṛ, to hold or sustain. Dharma is what holds things in place and keeps their structure. Water flows downward and fire rises, each by its own nature, and later Indian writers used images like these to explain dharma. The Gita uses the word in several senses, and much of the confusion about it comes from collapsing them into one.
        </p>

        <h2>Why &ldquo;Duty&rdquo; Is the Wrong Translation</h2>
        <p>
          The standard English rendering of dharma is &ldquo;duty,&rdquo; and it causes real damage to the text. Duty implies an external obligation: something imposed from outside, a rule you must follow, a role assigned to you by someone else. If you perform your duty, you have done what you were told. If you shirk it, you have failed.
        </p>
        <p>
          Dharma works differently. In the fire illustration, rising is a description of fire&apos;s nature, and fire that sank would be a different kind of thing. The dharma of a thing is what it is, expressed in action.
        </p>
        <p>
          For a person, this gets more complex, because dharma shifts with role, stage of life and circumstance. The Gita keeps asking what your own nature requires of you.
        </p>

        <div className="highlight-box">
          <h3>Three Senses of Dharma in the Gita</h3>
          <p>
            First, the order that holds the world together, which Krishna says he restores in every age (4.7–8). Second, the inherited duties of family and caste, kula-dharma and jāti-dharma, which Arjuna calls eternal (sanātana, śāśvata) in 1.40–43 when he argues against the war. Third, svadharma, the dharma that follows from your own nature (3.35, 18.47).
          </p>
          <p>
            The Gita cares about all three, and most urgently about svadharma. Arjuna&apos;s crisis is about his own dharma, and Krishna answers it on those terms.
          </p>
        </div>

        <h2>Universal Dharma and Svadharma</h2>
        <p>
          Later Hindu writers use sanatana dharma for the moral order that applies regardless of time, place or person, and often translate it &ldquo;eternal law.&rdquo; Truthfulness and non-cruelty belong here; the Gita lists both among the divine qualities in 16.2.
        </p>
        <p>
          Svadharma is specific to you. The Gita&apos;s word for your own nature is svabhava, and in 18.41–47 svadharma flows from svabhava. If your svabhava tends toward precision, care, and structure, your svadharma probably looks different from someone whose svabhava tends toward boldness, confrontation, and leadership. The order is shared and the expression differs.
        </p>
        <p>
          The Gita keeps returning to the tension between what your own nature requires and what the wider order requires. When they appear to conflict, it tells Arjuna to stay with svadharma and refuse a borrowed version of virtue.
        </p>

        <h2>BG 3.35: Better Your Own Path, Imperfect</h2>
        <p>
          The plainest statement of svadharma comes in Chapter 3. It admits imperfection and makes no promise that your own path will produce better results.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 3.35"
          sanskrit="श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् । स्वधर्मे निधनं श्रेयः परधर्मो भयावहः ॥"
          iast="śreyānsvadharmo viguṇaḥ paradharmātsvanuṣṭhitāt | svadharme nidhanaṃ śreyaḥ paradharmo bhayāvahaḥ ||"
          meaningLabel="Translation"
          meaning="Better your own dharma, imperfectly done, than another's done well. Dying while following your own dharma is better, because living by another's dharma brings fear."
          insightLabel="What This Teaches"
          insight="The verse uses the word viguṇa: lacking in qualities, imperfect. Krishna asks you to follow your dharma even when you do it badly, and ranks a flawed walk on your own path above a flawless performance of someone else's. The reason he gives is fear: paradharma, living another's path, is bhayāvaha, fraught with danger and fear."
          essence="Better your own dharma, imperfectly done, than another's done well."
        />

        <p>
          In a culture that values visible success, this cuts the other way. The verse judges a life from the inside. If you spend years performing another&apos;s dharma well, you get skilled at something that was never yours and live with the fear of the gap between performance and nature.
        </p>

        <h2>Dharma as the Battleground: BG 1.1</h2>
        <p>
          The Gita&apos;s first word is dharmakṣetre: on the field of dharma. That is how Dhritarashtra names the battlefield at Kurukshetra, and it frames the war as a contest over dharma as well as a kingdom.
        </p>
        <p>
          Dhritarashtra asks Sanjaya what his sons and the sons of Pandu did on the field of dharma. Sanjaya&apos;s answer is the rest of the Bhagavad Gita.
        </p>
        <p>
          The setting puts the teaching inside a hard dharma crisis. Arjuna is a warrior, trained his whole life for this kind of battle, and at the moment of combat he puts down his bow (1.47). He can fight. He refuses because he cannot find a dharma that covers killing his own teachers and kin.
        </p>

        <div className="pull-quote">
          The teaching happens on a battlefield, where dharma gets tested under pressure.
        </div>

        <h2>When Dharma Declines: BG 4.7 and 4.8</h2>
        <p>
          Chapter 4 introduces the cosmic dimension of dharma. Krishna describes a pattern that operates across ages: dharma declines, adharma rises, and Krishna takes form to restore the balance.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 4.7"
          sanskrit="यदा यदा हि धर्मस्य ग्लानिर्भवति भारत । अभ्युत्थानमधर्मस्य तदाऽऽत्मानं सृजाम्यहम् ॥"
          iast="yadā yadā hi dharmasya glānirbhavati bhārata | abhyutthānamadharmasya tadā''tmānaṃ sṛjāmyaham ||"
          meaningLabel="Translation"
          meaning="Whenever dharma weakens and adharma increases, O Arjuna, I manifest myself in visible form."
          insightLabel="What This Teaches"
          insight="The word glāni means decline, weakness, fatigue. Dharma can be worn down by adharma until it stops holding. Krishna says he comes himself when that happens. This is the theology of the avatar: the divine takes on form to act within the conditions of the world."
          essence="Whenever dharma declines and adharma rises, I bring myself forth."
        />

                <ShlokaCard
          verseRef="Bhagavad Gita 4.8"
          sanskrit="परित्राणाय साधूनां विनाशाय च दुष्कृताम् । धर्मसंस्थापनार्थाय संभवामि युगे युगे ॥"
          iast="paritrāṇāya sādhūnāṃ vināśāya ca duṣkṛtām | dharmasaṃsthāpanārthāya saṃbhavāmi yuge yuge ||"
          meaningLabel="Translation"
          meaning="To protect those who uphold dharma, to destroy those who create harm, and to firmly re-establish dharma: I arise in every age."
          insightLabel="What This Teaches"
          insight="The phrase yuge yuge, in every age, makes this a recurring pattern rather than a single event. Restoring dharma has to happen again and again. It needs people who uphold it, and at times a larger correction when their effort falls short."
          essence="To protect the good, destroy wrongdoers and re-establish dharma, I come in every age."
        />

        <p>
          These two verses are often quoted as comfort in hard times: things are bad, and correction will come. They also make a claim about how the world works. Dharma needs upkeep, from human effort and from something beyond it.
        </p>

        <h2>BG 18.47: The Teaching on Svadharma, Restated</h2>
        <p>
          The first line of BG 3.35 is repeated word for word in 18.47. By Chapter 18, Arjuna and the reader have been through the whole arc of the Gita, and the teaching still stands.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 18.47"
          sanskrit="श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् । स्वभावनियतं कर्म कुर्वन्नाप्नोति किल्बिषम् ॥"
          iast="śreyānsvadharmo viguṇaḥ paradharmātsvanuṣṭhitāt | svabhāvaniyataṃ karma kurvannāpnoti kilbiṣam ||"
          meaningLabel="Translation"
          meaning="Better your own dharma, imperfectly done, than another's done well. Doing the work set by your own nature, you incur no sin."
          insightLabel="What This Teaches"
          insight="The key phrase is svabhāva-niyatam: set by one's own nature. You find this work by looking at your own nature, instead of picking what looks prestigious or virtuous from outside. The verse says that doing the work your nature sets does not incur kilbiṣa, sin."
          essence="Doing the work your own nature sets, you incur no sin."
        />

        <p>
          The difference between BG 3.35 and BG 18.47 is in the second line. In Chapter 3, it warns of the danger of paradharma. In Chapter 18, it says that work set by your own nature brings no sin. The teaching has moved from warning to reassurance.
        </p>

        <h2>The Surrender: BG 18.66</h2>
        <p>
          Krishna&apos;s last instruction seems to contradict everything before it. After 17 chapters on dharma, svadharma and right action, BG 18.66 says: abandon all dharmas and take refuge in me alone.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 18.66"
          sanskrit="सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज । अहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥"
          iast="sarvadharmānparityajya māmekaṃ śaraṇaṃ vraja | ahaṃ tvā sarvapāpebhyo mokṣayiṣyāmi mā śucaḥ ||"
          meaningLabel="Translation"
          meaning="Set aside all dharmas and take refuge in me alone. I will free you from all wrongdoing. Do not grieve."
          insightLabel="What This Teaches"
          insight="Sarva-dharmān means all dharmas. Commentators read it differently, but a common reading is that Krishna asks Arjuna to stop treating right action as a project he manages by his own effort. Arjuna still acts, and he acts from surrender. In 18.73 he says his delusion is gone and he will do as Krishna says."
          essence="Give up all dharmas, take refuge in me alone; I will free you from all sin. Do not grieve."
        />

        <p>
          This verse is sometimes used to argue that the Gita finally dismisses ethics as an obstacle to devotion. That reading has to ignore the seventeen chapters before it. The verse describes where the dharma teaching ends up. You reach surrender by doing the work of dharma until clinging to it as personal achievement falls away.
        </p>

        <h2>Dharma in Practice: What Arjuna&apos;s Dilemma Teaches</h2>
        <p>
          Arjuna&apos;s crisis is a collision between two dharmas. As a kshatriya, his dharma is to fight a righteous war (2.31). As a member of his clan, he argues in 1.40–43 that killing kin destroys family dharma. Both claims are real, and they point in opposite directions.
        </p>
        <p>
          Krishna starts by moving the question from role to the atman (2.11–30). Once Arjuna understands what he is, and what cannot be killed, the conflict between warrior-dharma and family-dharma looks different. Only then does Krishna turn to svadharma (2.31) and tell him what his position and nature require.
        </p>
        <p>
          That is the Gita&apos;s model for dharma conflicts. When two role-based duties collide, ask what your own nature requires.
        </p>

        <h2>What &ldquo;Follow Your Dharma&rdquo; Means in the Gita</h2>
        <p>
          The phrase has become a self-help slogan, meaning roughly &ldquo;follow your passion.&rdquo; The Gita&apos;s version is harder.
        </p>

        <div className="highlight-box">
          <h3>Svadharma and Career</h3>
          <p>
            Svadharma is what your nature requires of you, whether or not you enjoy it. Sometimes that means doing hard things you would rather avoid, in your own way, without borrowing someone else&apos;s method or measuring yourself by their standard.
          </p>
          <p>
            Arjuna did not want to fight, and his svadharma required it anyway. What feels right and what you are sometimes line up, and sometimes the second costs a lot.
          </p>
        </div>

        <p>
          Put together, the Gita&apos;s position on dharma runs like this. Understand what you are and act from it (3.35, 18.47). Let go of the fruits (2.47). Don&apos;t fake another&apos;s dharma to look more impressive. And in the end, take refuge in Krishna and hold even dharma lightly (18.66).
        </p>
        <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected 18.66 to end &ldquo;Do not grieve&rdquo; and described it as Krishna&apos;s last instruction; removed an unverified count of the word dharma and the invented category &ldquo;rita dharma&rdquo;; copy edited.</p>
      </div>


      <FeedbackWidget pageType="blog" />
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>What is dharma in the Bhagavad Gita?</strong>
          <p>
            Dharma in the Gita comes from the Sanskrit root dhr, to hold or sustain. It is what holds a thing&apos;s essential nature in place. The Gita uses it in three main senses: the order Krishna restores in every age (4.7–8), the family and caste duties Arjuna invokes in Chapter 1, and svadharma, the duty that follows from your own nature. Most of the Gita&apos;s practical teaching is about svadharma.
          </p>
        </div>

        <div className="faq-item">
          <strong>What is svadharma?</strong>
          <p>
            Svadharma means your own dharma, the action and way of life that accords with your own nature (svabhava). BG 3.35 and BG 18.47 both say: better your own dharma, imperfectly done, than another&apos;s done well. Svadharma is action that comes from your own nature, as opposed to imitation or fear. BG 18.47 says work set by your own nature incurs no sin, and 3.35 says paradharma (living another&apos;s path) is fraught with fear.
          </p>
        </div>

        <div className="faq-item">
          <strong>What does the Bhagavad Gita say about dharma and adharma?</strong>
          <p>
            The Gita opens on dharma-kshetra, the field of dharma. Adharma is what opposes or erodes dharma. BG 4.7 says that whenever dharma declines and adharma rises, Krishna takes form to restore balance. In the Gita, dharma has to be upheld, and when it weakens, correction comes. In BG 2.33 Krishna tells Arjuna that refusing this righteous war would mean abandoning his own dharma and incurring sin.
          </p>
        </div>

        <div className="faq-item">
          <strong>Is dharma the same as duty?</strong>
          <p>
            Duty is a common English translation, but it suggests an obligation imposed from outside regardless of your nature. Dharma is closer to what you must do because of what you are. In the traditional illustration, fire rises by its nature, with no rule imposed on it. For a person, dharma means what your own nature requires of you in action, which is more personal than an external rule.
          </p>
        </div>

        <div className="faq-item">
          <strong>What does dharma-kshetra mean in the Bhagavad Gita?</strong>
          <p>
            Dharma-kshetra is the first word of the Gita: the field of dharma. Dhritarashtra names the battlefield at Kurukshetra this way, framing the war as a contest over dharma as well as a kingdom. That is why the teaching that follows is about what to do when your dharma is hard to see, and says little about military strategy.
          </p>
        </div>
      </div>

      <VerseFunnelCTA variant="chapter" locale="en" pageName={"Dharma Meaning Bhagavad Gita"} />

      <SiteFooter />

      <BlogTracker pageName="Dharma Meaning Bhagavad Gita" />
    </>
  )
}
