import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'

import SiteFooter from '@/components/SiteFooter'
export const metadata: Metadata = {
  title: "Maya Meaning: Illusion in the Bhagavad Gita",
  description:
    "In the Gita, maya is the power that makes the real appear as something other than it is. BG 7.14 calls it divine, made of the three gunas, and hard to cross. A verse-by-verse reading.",
  keywords:
    'maya meaning, maya illusion bhagavad gita, what is maya in hinduism, maya meaning in hindi, maya definition sanskrit, maya vedanta, maya vs brahman, bhagavad gita 7.14 maya, daivi maya meaning',
  openGraph: {
    title: "Maya Meaning: Illusion in the Bhagavad Gita | Wisdom",
    description:
      "Maya is the power that makes the real appear as something other than it is. The Gita says it is divine, woven of the three gunas, and crossed by taking refuge in Krishna (7.14).",
    type: 'article',
    url: 'https://wisdomquotes.in/blogs/maya-meaning-bhagavad-gita',
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sansearchapp',
    creator: '@thisisashukla',
    title: "Maya Meaning: Illusion in the Bhagavad Gita | Wisdom",
    description: "In the Gita, maya is the power that makes the real appear as something other than it is. BG 7.14 calls it divine and hard to cross.",
    images: ['https://wisdomquotes.in/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://wisdomquotes.in/blogs/maya-meaning-bhagavad-gita',
    languages: { 'x-default': 'https://wisdomquotes.in/blogs/maya-meaning-bhagavad-gita' },
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

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Inter', sans-serif;
    line-height: 1.7;
    font-size: 16px;
  }

  .breadcrumb { background: var(--bg-alt); border-bottom: 1px solid var(--border); }
  .breadcrumb-inner {
    max-width: 1100px; margin: 0 auto; padding: 10px 28px;
    font-size: 12px; color: var(--text-dimmer);
    display: flex; gap: 8px; align-items: center;
  }
  .breadcrumb-inner a { color: var(--text-dimmer); transition: color 0.15s; }
  .breadcrumb-inner a:hover { color: var(--gold-light); }
  .bc-sep { opacity: 0.4; }

  .article-hero {
    background: var(--bg-warm);
    padding: 64px 28px 56px;
    border-bottom: 1px solid var(--border);
    position: relative;
    overflow: hidden;
  }
  .article-hero::before {
    content: "माया";
    position: absolute; right: -10px; bottom: -30px;
    font-family: "Noto Sans Devanagari", serif;
    font-size: 200px; color: rgba(200,136,30,0.04);
    line-height: 1; pointer-events: none; user-select: none;
  }
  .article-hero-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 2; }

  .chapter-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(200,136,30,0.1); border: 1px solid rgba(200,136,30,0.28);
    color: var(--gold-light); font-size: 11px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 100px; margin-bottom: 20px;
  }
  .chapter-badge-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--gold); box-shadow: 0 0 6px var(--gold); flex-shrink: 0;
  }

  h1.article-title {
    font-family: "Playfair Display", Georgia, serif;
    font-size: clamp(28px, 4vw, 48px); font-weight: 700;
    color: var(--gold-light); line-height: 1.15;
    letter-spacing: -0.5px; margin-bottom: 14px;
  }
  h1.article-title em { font-style: italic; color: #fff; }

  .article-subtitle {
    font-size: 17px; color: var(--text-dim); font-weight: 300;
    margin-bottom: 32px; line-height: 1.65; max-width: 620px;
  }

  .article-meta { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
  .meta-item { font-size: 12px; color: var(--text-dimmer); letter-spacing: 0.04em; }
  .meta-sep { color: var(--border); }

  .content { max-width: var(--max); margin: 0 auto; padding: 0 2rem 4rem; }

  .lead { font-size: 1.1rem; color: var(--text-dim); margin-bottom: 2rem; line-height: 1.8; }

  .chapter-image {
    margin: 32px 0 36px; border-radius: 14px; overflow: hidden;
    border: 1px solid var(--border); box-shadow: 0 4px 32px rgba(0,0,0,0.4);
  }
  .chapter-image img { width: 100%; height: auto; display: block; object-fit: cover; }
  .chapter-image figcaption {
    padding: 10px 18px; background: var(--bg-card);
    font-size: 11.5px; color: var(--text-dimmer);
    letter-spacing: 0.04em; font-style: italic;
    border-top: 1px solid var(--border);
  }

  .definition-box {
    background: rgba(200,136,30,0.06);
    border: 1px solid rgba(200,136,30,0.3);
    border-left: 4px solid var(--gold);
    border-radius: 0 10px 10px 0;
    padding: 1.5rem 1.75rem; margin: 2rem 0;
  }
  .definition-box .def-label {
    font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--gold); font-weight: 700; margin-bottom: 10px;
  }
  .definition-box .def-word {
    font-family: "Noto Sans Devanagari", serif;
    font-size: 1.4rem; color: var(--gold-light); margin-bottom: 6px;
  }
  .definition-box .def-iast {
    font-size: 13px; color: var(--text-dimmer); font-style: italic; margin-bottom: 14px;
  }
  .definition-box .def-meaning {
    font-size: 15px; color: var(--text); line-height: 1.7;
  }

  h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem; font-weight: 700;
    margin: 2.5rem 0 1.5rem;
    color: var(--gold);
    border-bottom: 2px solid var(--gold-dim);
    padding-bottom: 0.75rem;
  }
  h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem; font-weight: 600;
    margin: 1.5rem 0 1rem; color: var(--text);
  }
  p { margin-bottom: 1.5rem; color: var(--text-dim); }

  .pull-quote {
    border-left: 4px solid var(--gold); padding-left: 2rem;
    margin: 2.5rem 0; font-size: 1.15rem;
    color: var(--gold-light); font-style: italic; line-height: 1.8;
  }

  .highlight-box {
    background: var(--gold-dim); border: 1px solid var(--gold-border);
    padding: 1.5rem; border-radius: 8px; margin: 2rem 0;
  }
  .highlight-box h3 { color: var(--gold); margin-top: 0; }
  .highlight-box p { color: var(--text); margin-bottom: 0.75rem; }
  .highlight-box p:last-child { margin-bottom: 0; }

  .comparison-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 2rem 0;
  }
  .comparison-cell {
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 10px; padding: 1.25rem;
  }
  .comparison-cell .cell-label {
    font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--gold); font-weight: 700; margin-bottom: 8px;
  }
  .comparison-cell p { font-size: 14px; color: var(--text-dim); margin-bottom: 0; line-height: 1.6; }
  @media (max-width: 600px) {
    .comparison-grid { grid-template-columns: 1fr; }
  }

  .faq-section { max-width: var(--max); margin: 3rem auto; padding: 0 2rem; }
  .faq-item { margin-bottom: 2rem; border-bottom: 1px solid var(--border); padding-bottom: 2rem; }
  .faq-item:last-child { border-bottom: none; }
  .faq-item strong { color: var(--gold-light); font-size: 1.05rem; }
  .faq-item p { margin-top: 0.75rem; }

  .app-cta {
    background: linear-gradient(160deg, #2d0a0a 0%, #1a0606 100%);
    border: 1px solid rgba(200,136,30,0.25);
    border-top: 3px solid var(--gold);
    border-radius: 20px; padding: 44px 48px 40px;
    margin: 48px 0 60px; text-align: center;
    position: relative; overflow: hidden;
  }
  .app-cta::before {
    content: "ज्ञान"; position: absolute; top: -14px; right: -8px;
    font-family: "Noto Sans Devanagari", sans-serif;
    font-size: 130px; color: rgba(200,136,30,0.05);
    line-height: 1; pointer-events: none; user-select: none;
  }
  .app-cta-eyebrow {
    display: inline-flex; align-items: center;
    background: rgba(200,136,30,0.12); border: 1px solid rgba(200,136,30,0.35);
    color: var(--gold-light); font-size: 11px; font-weight: 600;
    letter-spacing: 0.14em; text-transform: uppercase;
    padding: 5px 14px; border-radius: 20px; margin-bottom: 20px;
  }
  .app-cta-headline {
    font-family: "Playfair Display", serif;
    font-size: clamp(22px,3vw,30px); font-weight: 700;
    color: var(--text); line-height: 1.25; margin-bottom: 14px;
  }
  .app-cta-desc {
    font-size: 15px; color: var(--text-dim); line-height: 1.7;
    max-width: 480px; margin: 0 auto 22px;
  }
  .app-cta-features {
    display: flex; gap: 6px 18px; justify-content: center;
    flex-wrap: wrap; margin-bottom: 28px;
  }
  .app-cta-features span { font-size: 13px; color: var(--gold-light); opacity: 0.8; }
  .app-cta-btn {
    display: inline-flex; align-items: center; gap: 10px;
    background: var(--gold); color: #120505; text-decoration: none;
    padding: 15px 34px; border-radius: 12px; font-size: 16px;
    font-weight: 700; letter-spacing: -0.01em;
    transition: all 0.2s; box-shadow: 0 4px 22px rgba(200,136,30,0.3);
  }
  .app-cta-btn:hover { background: var(--gold-light); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(200,136,30,0.5); }
  .app-cta-sub { font-size: 12px; color: rgba(245,232,204,0.35); margin-top: 14px; letter-spacing: 0.04em; }

  footer {
    background: var(--bg-warm); border-top: 1px solid var(--border);
    padding: 3rem 2rem; text-align: center;
    color: var(--text-dimmer); margin-top: 4rem;
  }
  footer a { color: var(--gold); text-decoration: none; }
  footer a:hover { text-decoration: underline; }

  @media (max-width: 768px) {
    .article-hero { padding: 44px 20px 40px; }
    h2 { font-size: 1.5rem; }
    .app-cta { padding: 36px 24px 32px; }
  }
`

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': ['Article', 'LearningResource'],
    headline: 'Maya Meaning: Illusion in the Bhagavad Gita',
    description:
      "In the Gita, maya is the power that makes the real appear as something other than it is. It is divine, woven of the gunas, and hard to cross.",
    datePublished: '2026-07-17',
    dateModified: '2026-08-01',
    author: {
      '@type': 'Person',
      name: 'Ankur Shukla',
      url: 'https://wisdomquotes.in/about',
      sameAs: [
        'https://www.linkedin.com/in/thisisashukla/',
        'https://x.com/thisisashukla',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Wisdom',
      url: 'https://wisdomquotes.in',
      logo: { '@type': 'ImageObject', url: 'https://wisdomquotes.in/assets/new-light-logo.webp' },
    },
    image: { '@type': 'ImageObject', url: 'https://wisdomquotes.in/og-image.jpg', width: 1200, height: 630 },
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://wisdomquotes.in/blogs/maya-meaning-bhagavad-gita' },
    articleSection: 'Bhagavad Gita concepts',
    inLanguage: 'en',
    isAccessibleForFree: true,
    learningResourceType: 'Article',
    educationalLevel: 'General',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Wisdom', item: 'https://wisdomquotes.in/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://wisdomquotes.in/blogs/' },
      { '@type': 'ListItem', position: 3, name: 'Maya Meaning: Illusion in the Bhagavad Gita', item: 'https://wisdomquotes.in/blogs/maya-meaning-bhagavad-gita' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does maya mean in the Bhagavad Gita?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Maya (Sanskrit: माया) in the Bhagavad Gita refers to the divine power by which the real appears as something other than it is. The Gita's main statement is in BG 7.14: 'daivī hyeṣā guṇamayī mama māyā duratyayā' — 'This divine maya of mine, composed of the three gunas, is extremely difficult to cross. Only those who take refuge in me cross beyond it.' The word makes no claim that the world doesn't exist. Maya is the power that causes the undivided reality (Brahman, Krishna) to appear as many separate things.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does maya mean the world is an illusion?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Nowhere does the Gita teach that the world is unreal or that sensory experience is fabricated. Maya is better understood as misperception of what is real: seeing the world as independent and self-sustaining when, in the Gita's view, it rests on the divine. Vedanta's analogy is a rope mistaken for a snake in dim light. The rope is real; the error lies in what it is taken to be.",
        },
      },
      {
        '@type': 'Question',
        name: 'What are the three gunas and how do they relate to maya?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The three gunas, sattva (clarity, lightness), rajas (activity, passion) and tamas (inertia, darkness), make up all of manifest nature (prakriti). BG 7.14 describes maya as guṇamayī, made of the gunas, so maya works through them. When rajas dominates, the mind is restless and set on acquiring. When tamas dominates, the mind is dull. BG 14.6 says even sattva binds, through attachment to happiness and knowledge. Crossing maya means going beyond all three gunas, which Chapter 14 calls guṇātīta.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you cross maya according to the Gita?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "BG 7.14 ends with the answer: 'māmeva ye prapadyante māyāmetāṃ taranti te' — 'Those who take refuge in me alone cross this maya.' The Gita gives no argument for getting past maya. The crossing it names is surrender (prapatti) and devotion (bhakti). BG 14.26 says those who serve Krishna with unwavering bhakti yoga go beyond the gunas and become fit to become Brahman.",
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between maya and avidya?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "The two are related. In later Advaita Vedanta, maya is the cosmic power that projects apparent diversity and belongs to Ishvara (the Lord). Avidya is the individual's ignorance that identifies the self with body and mind, and belongs to the jiva. When Advaita teachers speak of removing maya, they usually mean removing avidya: the world keeps appearing, and the mistake about what you are within it is corrected. The Gita itself uses the word maya and draws no such distinction.",
        },
      },
    ],
  },
]

export default function MayaMeaningPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageCSS }} />
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <a href="/">Wisdom</a>
          <span className="bc-sep">/</span>
          <a href="/blogs">Blog</a>
          <span className="bc-sep">/</span>
          Maya Meaning
        </div>
      </div>

      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · Sanskrit Concepts
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            Maya: Illusion in the Bhagavad Gita<br />
            <em>What Maya Means in Chapters 7, 14 and 18</em>
          </h1>
          <p className="article-subtitle">
            The common explanation of māyā is that the world is an illusion. The Gita says the world is real, and that seen through maya it appears as something other than what it is.
          </p>
          <div className="article-meta">
            <span className="meta-item">
              By{' '}
              <a
                href="/about"
                rel="author"
                data-mp-location="byline_author"
                style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}
              >
                Ankur Shukla
              </a>
            </span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Sanskrit Concepts</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~9 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Chapters 7, 14 &amp; 18</span>
            <span className="meta-sep">·</span>
            <span className="meta-item" style={{ fontStyle: 'italic' }}>
              Wisdom translation. Commentary AI-drafted, human-reviewed.{' '}
              <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>
                Methodology →
              </a>
            </span>
          </div>
        </div>
      </div>

      <div className="content">
        <figure className="chapter-image">
          <img
            src="/assets/chapter7.webp"
            alt="Krishna revealing knowledge and the nature of reality, from Chapter 7 where maya is named"
            width="1200"
            height="675"
            loading="eager"
            fetchPriority="high"
          />
          <figcaption>Chapter 7, where Krishna names maya and tells Arjuna how to cross it</figcaption>
        </figure>

        <div className="definition-box">
          <div className="def-label">Sanskrit Definition</div>
          <div className="def-word">माया</div>
          <div className="def-iast">māyā · noun · feminine</div>
          <div className="def-meaning">
            Usually derived from the root <em>mā</em> (to measure, to form).
            The power that creates appearances, by which the one presents itself as many.
            In the Gita: the divine creative power (daivī māyā) composed of the three guṇas, through which the world
            appears distinct from its ground. The world it shows exists; it is not what it seems.
          </div>
        </div>

        <p className="lead">
          When people say the world is maya, they usually mean the world is fake, a dream. The Bhagavad Gita says three other things. It names maya as divine. It says maya is composed of the three gunas. And it says the way across maya is to take refuge in Krishna (7.14).
        </p>

        <h2>The Word and Its Uses</h2>
        <p>
          The etymology is debated. The usual derivation is from the root <em>mā</em>, &ldquo;to measure&rdquo; or &ldquo;to form&rdquo;: maya as the measuring-out of the world into separate forms. A traditional folk etymology reads <em>mā yā</em>, &ldquo;that which is not.&rdquo; Both readings point to a power that makes the undivided look divided.
        </p>
        <p>
          In the Gita, maya has several senses. Sometimes it means Krishna&apos;s own power, the yogamaya that veils him (BG 7.25: &ldquo;veiled by my yogamaya, I am not known to all&rdquo;). Sometimes it means the force that binds, the divine maya of the three gunas that is &ldquo;hard to cross&rdquo; (BG 7.14). In BG 18.61 it is the means by which the Lord in the heart makes all beings revolve, as if mounted on a machine.
        </p>

        <h2>The Classic Misunderstanding: Maya ≠ Nothing</h2>
        <p>
          The &ldquo;world is an illusion&rdquo; reading comes partly from a popular simplification of Shankara&apos;s Advaita Vedanta and partly from loose translation. It implies that your body, the table in front of you and the people you love are unreal.
        </p>

        <div className="comparison-grid">
          <div className="comparison-cell">
            <div className="cell-label">What Maya Does NOT Mean</div>
            <p>The world does not exist. Your experience is fabricated. Nothing is real. The material world is worthless or evil. What you see is a hallucination.</p>
          </div>
          <div className="comparison-cell">
            <div className="cell-label">What Maya Means in the Gita</div>
            <p>The world appears to sustain itself independently. The many appear separate from each other and from the divine ground. The relative is mistaken for the ultimate.</p>
          </div>
        </div>

        <p>
          The classic Vedantic analogy: in dim light, you mistake a rope for a snake. The fear is real, though no snake is there. When light falls on the rope, the snake vanishes and the rope stays. Only the perception changed. Maya is the dim light, and jnana (knowledge) or bhakti (devotion) is the lamp.
        </p>
        <p>
          In this analogy the world is the rope, and it is real. The snake is the reading of the world as independent, fully described by its appearances, and cut off from its divine ground.
        </p>

        <h2>BG 7.14: The Central Statement</h2>
        <p>
          Chapter 7 holds the Gita&apos;s main statement about maya. In 7.13 Krishna says the whole world is deluded by states made of the three gunas and fails to recognise him as beyond them. The next verse explains why:
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 7.14"
          sanskrit="दैवी ह्येषा गुणमयी मम माया दुरत्यया । मामेव ये प्रपद्यन्ते मायामेतां तरन्ति ते ॥"
          iast="daivī hyeṣā guṇamayī mama māyā duratyayā | māmeva ye prapadyante māyāmetāṃ taranti te ||"
          meaningLabel="Translation"
          meaning="Indeed, this divine maya of mine, composed of the three gunas, is extremely difficult to cross. Those who take refuge in me alone cross beyond this maya."
          insightLabel="What This Teaches"
          insight="Three words carry the verse. Daivī, divine: maya is Krishna's own power, so arguing against the world will not defeat it. Guṇamayī, made of the gunas: maya works through sattva, rajas and tamas, the stuff experience is made of, and even a sattvic state belongs to it. Māmeva ye prapadyante, those who take refuge in me alone: the crossing Krishna names is prapatti, surrender to him."
          essence="My divine maya of the gunas is hard to cross; those who take refuge in me cross it."
        />

        <div className="pull-quote">
          The maya that binds and the refuge that frees come from the same source, Krishna, in the same verse.
        </div>

        <h2>Maya, Prakriti, and the Three Gunas</h2>
        <p>
          Maya is tied to two other Gita terms: prakriti and the gunas.
        </p>
        <p>
          Prakriti is the whole of manifest nature, everything that arises, changes and passes. The gunas are the three forces that constitute prakriti: sattva (clarity, lightness, illumination), rajas (activity, passion, restlessness), and tamas (inertia, heaviness, obscuration). Everything in manifest existence is some combination of these three.
        </p>
        <p>
          Maya makes this play of prakriti look complete and self-sufficient, as if the gunas were the whole story. When rajas dominates, desire and acquisition feel like all that matters. When tamas dominates, dullness feels like solid ground. BG 14.6 says even sattva binds, through attachment to happiness and to knowledge.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 14.19"
          sanskrit="नान्यं गुणेभ्यः कर्तारं यदा द्रष्टानुपश्यति । गुणेभ्यश्च परं वेत्ति मद्भावं सोऽधिगच्छति ॥"
          iast="nānyaṃ guṇebhyaḥ kartāraṃ yadā draṣṭānupaśyati | guṇebhyaśca paraṃ vetti madbhāvaṃ so'dhigacchati ||"
          meaningLabel="Translation"
          meaning="When the seer perceives no doer other than the gunas, and knows what is beyond the gunas, they attain my state of being."
          insightLabel="What This Teaches"
          insight="This verse describes crossing maya from the inside. The seer (draṣṭā), the witnessing awareness, finds no doer other than the gunas. Actions still arise, and no I claims to be their author. The same seer knows what is beyond the gunas, the witness that the gunas did not produce. The world stays; what changes is how it is seen."
          essence="Who sees the gunas as the only doers, and knows what lies beyond them, reaches me."
        />

        <h2>The Devotional Path Through Maya</h2>
        <p>
          The Gita describes several paths through maya: knowledge (jnana), meditation (dhyana) and action (karma yoga). In 7.14, 18.62 and 18.66, the answer Krishna gives is refuge in him.
        </p>
        <p>
          A mind turned entirely toward its own preservation and standing strengthens maya with every thought. A mind turned toward something beyond itself loosens that loop. The gunas keep working and the world keeps appearing, while the belief that their play is the final truth weakens.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 7.15"
          sanskrit="न मां दुष्कृतिनो मूढाः प्रपद्यन्ते नराधमाः । माययापहृतज्ञाना आसुरं भावमाश्रिताः ॥"
          iast="na māṃ duṣkṛtino mūḍhāḥ prapadyante narādhamāḥ | māyayāpahṛtajñānā āsuraṃ bhāvamāśritāḥ ||"
          meaningLabel="Translation"
          meaning="The wrongdoers, the deluded, the lowest of men, those whose knowledge has been stolen by maya and who rest in a demoniac nature, do not take refuge in me."
          insightLabel="What This Teaches"
          insight="BG 7.14 says: take refuge in me and cross maya. BG 7.15 names those who refuse that refuge: people whose knowledge has been stolen (apahṛta-jñāna) by maya. The theft shows in how they order their lives, around the self and its extensions. Chapter 16 describes the demoniac nature in detail, as pride, greed and self-enclosure."
          essence="Those whose knowledge maya has stolen do not take refuge in me."
        />

        <h2>How to Cross It (BG 18.61–62)</h2>
        <p>
          Near the end of the Gita, Krishna returns to maya once more, with the image of a machine.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 18.61"
          sanskrit="ईश्वरः सर्वभूतानां हृद्देशेऽर्जुन तिष्ठति । भ्रामयन्सर्वभूतानि यन्त्रारूढानि मायया ॥"
          iast="īśvaraḥ sarvabhūtānāṃ hṛddeśe'rjuna tiṣṭhati | bhrāmayansarvabhūtāni yantrārūḍhāni māyayā ||"
          meaningLabel="Translation"
          meaning="The Lord dwells in the heart of all beings, O Arjuna, causing all beings to wander, mounted as if on a machine, by maya."
          insightLabel="What This Teaches"
          insight="Yantrārūḍhāni māyayā: mounted on a machine, by maya. Beings ride a mechanism that moves them while they feel self-directed. The Lord sits in the heart, and beings move through life driven by the gunas they take to be themselves. The next verse (18.62) gives the way out: take refuge in the one who dwells in the heart, and by his grace reach peace."
          essence="The Lord in every heart turns all beings by maya, as if mounted on a machine."
        />

        <div className="highlight-box">
          <h3>Where the Gita Uses the Word Maya</h3>
          <p>
            <strong>BG 4.6</strong> (ātmamāyayā): Krishna says he is unborn, yet takes birth by his own maya, resting on his own nature.
          </p>
          <p>
            <strong>BG 7.14–15 and 7.25</strong>: the divine maya of the gunas that is hard to cross, the people whose knowledge it has stolen, and the yogamaya that veils Krishna from those who do not know him.
          </p>
          <p>
            <strong>BG 18.61</strong>: the Lord in the heart turns all beings by maya, as if mounted on a machine.
          </p>
        </div>

        <h2>Maya and Krishna&apos;s Last Instruction</h2>
        <p>
          The Gita gives no theory of maya. Krishna&apos;s last instruction is: &ldquo;Abandon all dharmas and take refuge in me alone. I will free you from all sins. Do not grieve&rdquo; (BG 18.66). Its word for refuge is <em>śaraṇam</em>, shelter.
        </p>
        <p>
          So the Gita&apos;s answer to maya is to turn from the bounded self, which maya builds, toward Krishna. The world stays and the gunas keep working. From the new center, the world is seen as the play of the divine.
        </p>
        <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected the reading of 18.61, the context of 7.14, 18.66 as Krishna&apos;s last instruction (the Gita&apos;s last verse is 18.78), and replaced an invented three-level scheme with the Gita&apos;s own uses of maya; copy edited.</p>
      </div>


      <FeedbackWidget pageType="blog" />
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>What does maya mean in the Bhagavad Gita?</strong>
          <p>
            Maya (माया) in the Gita is the divine creative power by which the real appears as something other than it is. The key statement is BG 7.14: &ldquo;This divine maya of mine, composed of the three gunas, is extremely difficult to cross. Those who take refuge in me alone cross beyond it.&rdquo; Maya makes the world appear self-sustaining and separate from its divine ground.
          </p>
        </div>

        <div className="faq-item">
          <strong>Does maya mean the world is an illusion?</strong>
          <p>
            Nowhere does the Gita teach that the material world is fabricated or that your experience is a hallucination. The rope-snake analogy from Vedanta fits better: in dim light, you mistake a rope for a snake. The fear is real and the rope is real; the snake is absent. Maya is the dim light. The world stays, and appears as something other than what it is: the one divine appearing as many separate things.
          </p>
        </div>

        <div className="faq-item">
          <strong>What are the three gunas and how do they relate to maya?</strong>
          <p>
            The three gunas, sattva (clarity), rajas (activity) and tamas (inertia), make up all manifest nature. BG 7.14 calls maya &ldquo;guṇamayī&rdquo;, made of the gunas. When rajas dominates, desire and acquisition feel like the whole story. When tamas dominates, dullness hides things. BG 14.6 says even sattva binds, through attachment to happiness and knowledge. Crossing maya means going beyond all three gunas, which Chapter 14 calls guṇātīta.
          </p>
        </div>

        <div className="faq-item">
          <strong>How do you cross maya according to the Gita?</strong>
          <p>
            BG 7.14 gives the direct answer: &ldquo;Those who take refuge in me alone cross beyond this maya.&rdquo; The Gita also describes knowledge (jnana), meditation and selfless action, but in 7.14 and 18.66 Krishna&apos;s answer is surrender (prapatti) to him. A mind organised around the bounded self strengthens maya; a mind turned toward what is beyond the gunas loosens it. The world stays where it is.
          </p>
        </div>

        <div className="faq-item">
          <strong>What is the difference between maya and avidya?</strong>
          <p>
            In later Advaita Vedanta, maya is the cosmic power that projects apparent diversity and belongs to Ishvara (the Lord). Avidya is the individual&apos;s ignorance that identifies the self with body and mind, and belongs to the jiva. Advaita aims at removing avidya: the world keeps appearing, and the mistake about what you are within it is corrected. The Gita uses the word maya and draws no such distinction.
          </p>
        </div>
      </div>

      <VerseFunnelCTA variant="chapter" locale="en" pageName={"Maya Meaning Bhagavad Gita"} />

      <SiteFooter />

      <BlogTracker pageName="Maya Meaning Bhagavad Gita" />
    </>
  )
}
