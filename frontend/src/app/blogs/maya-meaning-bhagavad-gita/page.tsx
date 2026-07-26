import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import ShlokaCard from '@/components/gita/ShlokaCard'

export const metadata: Metadata = {
  title: "Maya Meaning — Illusion in the Bhagavad Gita | Wisdom",
  description:
    "Maya doesn't mean the world is fake. In the Gita, it is the power that makes the real appear as something other than it is. BG 7.14 calls it divine and 'hard to cross.' Here's what that actually means.",
  keywords:
    'maya meaning, maya illusion bhagavad gita, what is maya in hinduism, maya meaning in hindi, maya definition sanskrit, maya vedanta, maya vs brahman, bhagavad gita 7.14 maya, daivi maya meaning',
  openGraph: {
    title: "Maya Meaning — Illusion in the Bhagavad Gita | Wisdom",
    description:
      "Maya is not that the world is a dream. It is the power that makes the real appear as something other than it is. The Gita says it is divine, woven of the three gunas, and almost impossible to cross except by surrender.",
    type: 'article',
    url: 'https://wisdomquotes.in/blogs/maya-meaning-bhagavad-gita',
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://wisdomquotes.in/blogs/maya-meaning-bhagavad-gita' },
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
    font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
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
    font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase;
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
    '@type': 'Article',
    headline: 'Maya Meaning — Illusion in the Bhagavad Gita',
    description:
      "Maya doesn't mean the world is fake. In the Gita, it is the power that makes the real appear as something other than it is — divine, woven of the gunas, and hard to cross.",
    datePublished: '2026-07-17',
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
      name: 'Wisdom App',
      url: 'https://wisdomquotes.in',
    },
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
          text: "Maya (Sanskrit: माया) in the Bhagavad Gita refers to the divine power by which the real appears as something other than it is. The Gita's main statement is in BG 7.14: 'daivī hyeṣā guṇamayī mama māyā duratyayā' — 'This divine maya of mine, composed of the three gunas, is extremely difficult to cross. Only those who take refuge in me cross beyond it.' Maya is not a claim that the world doesn't exist. It is the power that causes the infinite, undivided reality (Brahman/Krishna) to appear as a multiplicity of separate things.",
        },
      },
      {
        '@type': 'Question',
        name: 'Does maya mean the world is an illusion?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Not in the sense of 'not real.' The Gita does not teach nihilism or that sensory experience is fabricated. Maya is better understood as misperception of what is real — seeing the world as independent and self-sustaining when it is, in the Gita's view, grounded in and sustained by the divine. The confusion is not 'the world does not exist' but 'the world as it appears conceals what it ultimately is.' An analogy: a rope mistaken for a snake in dim light is real as a rope; it is not real as a snake. The error is not in the perception of something, but in what that something is taken to be.",
        },
      },
      {
        '@type': 'Question',
        name: 'What are the three gunas and how do they relate to maya?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The three gunas — sattva (clarity, lightness), rajas (activity, passion), and tamas (inertia, darkness) — are the forces that constitute all of manifest nature (prakriti). BG 7.14 describes maya as guṇamayī: made of the gunas. This means that maya operates through the three modes of nature. When rajas is dominant, the mind is restless and fixated on acquiring. When tamas is dominant, the mind is dull and unaware. Even sattva — clear, luminous — can reinforce the sense of being a separate, pure self rather than dissolving that sense. All three gunas, even the clearest, are part of the maya-structure. Transcending maya means transcending the gunas — becoming guṇātīta, as described in BG 14.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you cross maya according to the Gita?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "BG 7.14 ends with the answer: 'māmeva ye prapadyante māyāmetāṃ taranti te' — 'Those who take refuge in me alone cross this maya.' The Gita does not present maya as something you intellectually argue your way through. The prescribed crossing is surrender (prapatti) and devotion (bhakti) — specifically, orienting consciousness toward what is beyond the gunas. BG 14.26 says those who serve with unwavering bhakti yoga transcend the gunas and become Brahman. The movement is not conceptual analysis but a shift in where consciousness is rooted.",
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between maya and avidya?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Maya and avidya (ignorance) are related but not identical. Maya is the cosmic power that projects the apparent diversity — it operates at the level of Ishvara (the cosmic divine). Avidya is the individual-level ignorance that misidentifies the self with the body-mind complex — it operates at the level of the jiva (individual soul). Avidya is, you could say, maya seen from the inside of the individual experience. When the Upanishads and Vedanta speak of removing maya, they usually mean removing avidya: not cancelling the appearance of the world, but correcting the misidentification of what you are within it.",
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
            <em>(And What It Actually Means)</em>
          </h1>
          <p className="article-subtitle">
            The most common explanation of māyā is that the world is an illusion. The Gita says something more precise: the world is real, but seen through maya it appears as something other than what it is. The difference matters.
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
            alt="Krishna revealing knowledge and the nature of reality — the chapter where maya is named most precisely"
            width="1200"
            height="675"
            loading="eager"
            fetchPriority="high"
          />
          <figcaption>Chapter 7 — where Krishna names maya and tells Arjuna how to cross it</figcaption>
        </figure>

        <div className="definition-box">
          <div className="def-label">Sanskrit Definition</div>
          <div className="def-word">माया</div>
          <div className="def-iast">māyā · noun · feminine</div>
          <div className="def-meaning">
            Derived from the root <em>mā</em> (to measure, to create, or &ldquo;not&rdquo; depending on interpretation).
            The power that creates appearances; the force by which the infinite presents itself as finite multiplicity.
            In the Gita: the divine creative power (daivī māyā) composed of the three guṇas, through which the world
            appears distinct from its ground. Not illusion in the sense of non-existence, but appearance in the sense
            of not-what-it-seems.
          </div>
        </div>

        <p className="lead">
          When people say the world is maya, they usually mean something like: the world is fake, a dream, not real. That is not what the Bhagavad Gita says. The Gita&apos;s treatment of maya is more precise — and more interesting — than that popular summary. It names maya as divine. It says maya is composed of the three gunas. And it says crossing maya requires not argument, but surrender.
        </p>

        <h2>What Maya Actually Means</h2>
        <p>
          The Sanskrit etymology is contested. One reading derives maya from the root <em>mā</em> meaning &ldquo;to measure&rdquo; or &ldquo;to create&rdquo; — maya as the measuring-out of the world into its apparent forms and distinctions. Another takes <em>ma</em> as negation and <em>ya</em> as &ldquo;this,&rdquo; giving &ldquo;not this&rdquo; — that which is not ultimately what it appears. Both point to the same underlying idea: maya is the power that creates the appearance of distinction where the underlying reality is undivided.
        </p>
        <p>
          The Gita uses maya in several registers. Sometimes it means Krishna&apos;s own creative power — the yogamaya by which he conceals his true nature (BG 7.25: &ldquo;veiled by my yogamaya, I am not known to all&rdquo;). Sometimes it means the force that binds — the divine maya composed of the three gunas that makes crossing to the truth &ldquo;extremely difficult&rdquo; (BG 7.14). And in BG 18.61, it appears as the location of all beings: they wander on the machine of the body, mounted as if on a device, by the maya of the divine.
        </p>

        <h2>The Classic Misunderstanding: Maya ≠ Nothing</h2>
        <p>
          The &ldquo;world is an illusion&rdquo; reading comes partly from a popular misreading of Advaita Vedanta (particularly Shankara&apos;s formulation) and partly from a looseness in translation. It implies that your body, the table in front of you, the people you love, the events of your life — none of these are real.
        </p>

        <div className="comparison-grid">
          <div className="comparison-cell">
            <div className="cell-label">What Maya Does NOT Mean</div>
            <p>The world does not exist. Your experience is fabricated. Nothing is real. The material world is worthless or evil. What you see is a hallucination.</p>
          </div>
          <div className="comparison-cell">
            <div className="cell-label">What Maya Actually Means (Gita)</div>
            <p>The world appears as independently self-sustaining, when it is not. The many appear as separate from each other and from the divine ground, when they are not. The relative is mistaken for the ultimate.</p>
          </div>
        </div>

        <p>
          The classic Vedantic analogy: in dim light, you mistake a rope for a snake. The snake causes real fear — your reaction is genuine. But the snake is not there. When light reveals the rope, the snake-appearance vanishes without the rope vanishing. The rope was always there. What changed is not the object but the perception. Maya is the dim light. Jnana (knowledge) or bhakti (devotion) is the lamp.
        </p>
        <p>
          The world in this analogy is the rope, not the snake. It is real. What is unreal is the snake — the interpretation of the world as independent, self-sustaining, fully described by its appearances, disconnected from its divine ground.
        </p>

        <h2>BG 7.14 — The Central Statement</h2>
        <p>
          Chapter 7 is where Krishna makes the Gita&apos;s clearest statement about maya. The context matters: Krishna has been describing how rare it is for someone to truly know him. Most people are in various stages of seeking, turned toward him for different reasons. Now he explains why:
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 7.14"
          sanskrit="दैवी ह्येषा गुणमयी मम माया दुरत्यया । मामेव ये प्रपद्यन्ते मायामेतां तरन्ति ते ॥"
          iast="daivī hyeṣā guṇamayī mama māyā duratyayā | māmeva ye prapadyante māyāmetāṃ taranti te ||"
          meaningLabel="Translation"
          meaning="Indeed, this divine maya of mine, composed of the three gunas, is extremely difficult to cross. Those who take refuge in me alone cross beyond this maya."
          insightLabel="What This Teaches"
          insight="Three things in this verse deserve attention. First: daivī — divine. Maya is not opposed to the divine or external to it. It is the divine's own creative power. This is why maya cannot be defeated by arguing against the world. Second: guṇamayī — made of the gunas. Maya operates through the three modes: sattva, rajas, and tamas. These are not external forces attacking from outside. They are the very fabric of how experience presents itself. Even the clearest mental state (sattvic) is part of the maya-structure. Third: māmeva ye prapadyante — those who take refuge in me alone. The crossing is not intellectual. It is prapatti — complete surrender, orientation of consciousness toward what is beyond the gunas. This is the Gita's answer to maya: not philosophy, but bhakti."
          essence="Maya is divine, pervasive, and woven of the gunas. The way through is not argument but surrender."
        />

        <div className="pull-quote">
          Maya is not the prison. It is the light through which the prison appears, produced by the same source that is the liberation.
        </div>

        <h2>Maya, Prakriti, and the Three Gunas</h2>
        <p>
          Understanding maya requires understanding its relationship to two other key Gita terms: prakriti and the gunas.
        </p>
        <p>
          Prakriti is the totality of manifest nature — everything that arises, changes, and passes. The gunas are the three forces that constitute prakriti: sattva (clarity, lightness, illumination), rajas (activity, passion, restlessness), and tamas (inertia, heaviness, obscuration). Everything in manifest existence is some combination of these three.
        </p>
        <p>
          Maya is the power through which this prakriti-show appears as real, complete, and self-sufficient. It is what makes the gunas&apos; play feel like the whole story. When rajas is dominant, the experience of desire and acquisition feels like the only meaningful thing in the world. When tamas is dominant, the fog of unconsciousness feels like ground. Even sattva, which produces clarity and goodness, can reinforce the sense of being a separate, pure self — rather than dissolving that sense into recognition of the ground.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 14.19"
          sanskrit="नान्यं गुणेभ्यः कर्तारं यदा द्रष्टानुपश्यति । गुणेभ्यश्च परं वेत्ति मद्भावं सोऽधिगच्छति ॥"
          iast="nānyaṃ guṇebhyaḥ kartāraṃ yadā draṣṭānupaśyati | guṇebhyaśca paraṃ vetti madbhāvaṃ so'dhigacchati ||"
          meaningLabel="Translation"
          meaning="When the seer perceives no doer other than the gunas, and knows what is beyond the gunas — they attain my state of being."
          insightLabel="What This Teaches"
          insight="This verse from Chapter 14 describes what crossing maya actually looks like from the inside. The seer (drashtri) — the witnessing awareness — stops finding any doer other than the gunas. The actions arise, but there is no I-as-ultimate-author of them. And simultaneously, that seer knows 'what is beyond the gunas' — the witness itself, which is not guna-born. This recognition — I am not the gunas, I am what watches them — is the moment of seeing through maya. Not the disappearance of the world, but the correction of what the world is seen as."
          essence="Seeing the gunas clearly — and what is beyond them — is what crossing maya looks like from inside experience."
        />

        <h2>The Devotional Path Through Maya</h2>
        <p>
          The Gita offers multiple paths through maya — knowledge (jnana), meditation (dhyana), action (karma yoga). But its own stated preference is bhakti: devotion. And the mechanism is not complicated.
        </p>
        <p>
          When consciousness is oriented entirely toward the self — its preservation, enhancement, and validation — the maya-structure is reinforced with every thought. When consciousness is oriented toward something beyond the self, that self-referential loop begins to lose its grip. The gunas still operate. The world still appears. But the identification with the guna-play as the ultimate truth weakens.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 7.15"
          sanskrit="न मां दुष्कृतिनो मूढाः प्रपद्यन्ते नराधमाः । माययापहृतज्ञाना आसुरं भावमाश्रिताः ॥"
          iast="na māṃ duṣkṛtino mūḍhāḥ prapadyante narādhamāḥ | māyayāpahṛtajñānā āsuraṃ bhāvamāśritāḥ ||"
          meaningLabel="Translation"
          meaning="The wrongdoers, the deluded, the lowest of men — those whose knowledge has been stolen by maya, those who rest in a demoniac orientation — do not take refuge in me."
          insightLabel="What This Teaches"
          insight="This verse, paired immediately with BG 7.14, completes the picture. BG 7.14 says: take refuge in me and cross maya. BG 7.15 says: those who don't take refuge are those whose knowledge has been stolen (apahrita-jnana) by maya. The theft of knowledge is not academic ignorance. It is the operation of maya at the level of how someone organizes their life: around the self and its extensions, rather than toward the divine. The 'demoniac orientation' here is not supernatural evil — it is the ordinary human condition of complete self-enclosure."
          essence="Maya steals knowledge not by making people stupid, but by making the self-referential loop feel complete."
        />

        <h2>How to Cross It (BG 18.61–62)</h2>
        <p>
          Near the Gita&apos;s end, Krishna returns to maya one last time — and the language is perhaps the most striking in the entire text.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 18.61"
          sanskrit="ईश्वरः सर्वभूतानां हृद्देशेऽर्जुन तिष्ठति । भ्रामयन्सर्वभूतानि यन्त्रारूढानि मायया ॥"
          iast="īśvaraḥ sarvabhūtānāṃ hṛddeśe'rjuna tiṣṭhati | bhrāmayansarvabhūtāni yantrārūḍhāni māyayā ||"
          meaningLabel="Translation"
          meaning="The Lord dwells in the heart of all beings, O Arjuna, causing all beings to wander, mounted as if on a machine, by maya."
          insightLabel="What This Teaches"
          insight="'Yantrā-rūdhāni māyayā' — mounted on a device by maya. The image is of beings placed on a mechanism that moves them, while they experience themselves as self-directed. This is not the Gita being cruel or fatalistic. It is a description of what life looks like from the perspective of what is seeing clearly: the divine at the heart, and beings moving through their lives driven by the gunas they take to be themselves. The very next verse (18.62) gives the resolution: take refuge in the one who dwells in the heart. The machine is still running. What changes is where you stand in relation to it."
          essence="All beings are moved by maya's device. The one who knows this is already beginning to be free of it."
        />

        <div className="highlight-box">
          <h3>The Three Levels at Which Maya Operates</h3>
          <p>
            <strong>Cosmic maya</strong> (daivī māyā): The divine creative power that projects the world of multiplicity from undivided Brahman. At this level, maya is not a problem but a function — the universe needs it to exist as a universe.
          </p>
          <p>
            <strong>Collective maya</strong> (the gunas as shared reality): The three modes constitute the world most people share and agree upon — their values, their sense of what matters, their orientation toward pleasure and pain. This is harder to pierce because it is confirmed by every interaction.
          </p>
          <p>
            <strong>Individual avidya</strong> (personal ignorance): The specific misidentification — I am this body, this name, this history of gains and losses. This is where the path of practice engages most directly. Clear this layer, and the other two, while still present, are seen through.
          </p>
        </div>

        <h2>Maya and the Gita&apos;s Final Teaching</h2>
        <p>
          The Gita does not end with a theory of maya. It ends with an instruction: &ldquo;Take refuge in me alone. I will free you from all sins. Do not grieve&rdquo; (BG 18.66). The word for refuge is <em>śaraṇam</em> — complete shelter, the giving over of self-management.
        </p>
        <p>
          This is the Gita&apos;s answer to maya: not the accumulation of correct ideas about it, but the reorientation of consciousness from the bounded self (which is maya&apos;s construction) to what is beyond it. The world doesn&apos;t disappear. The gunas don&apos;t stop operating. But the center of gravity shifts. And from that shifted center, the world is seen differently — not as a trap, not as a dream, but as the play of the divine, which is always pointing toward its source.
        </p>
        <p>
          That is what piercing maya means in the Gita&apos;s framework. Not seeing through the world, but seeing the world through what it actually is.
        </p>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>What does maya mean in the Bhagavad Gita?</strong>
          <p>
            Maya (माया) in the Gita is the divine creative power by which the real appears as something other than it is. The Gita&apos;s key statement is BG 7.14: &ldquo;This divine maya of mine, composed of the three gunas, is extremely difficult to cross. Those who take refuge in me alone cross beyond it.&rdquo; Maya is not the claim that the world doesn&apos;t exist — it is the force that makes the world appear as independently self-sustaining and separate from its divine ground, when it is not.
          </p>
        </div>

        <div className="faq-item">
          <strong>Does maya mean the world is an illusion?</strong>
          <p>
            Not in the sense of non-existent. The Gita doesn&apos;t teach that the material world is fabricated or that your experience is a hallucination. The rope-snake analogy from Vedanta captures it better: in dim light, you mistake a rope for a snake. The fear is real, the rope is real, but the snake is not. Maya is the dim light — it doesn&apos;t make the world disappear, but it makes the world appear as something other than what it ultimately is (the divine appearing as separate multiplicity).
          </p>
        </div>

        <div className="faq-item">
          <strong>What are the three gunas and how do they relate to maya?</strong>
          <p>
            The three gunas — sattva (clarity), rajas (activity), and tamas (inertia) — are the forces constituting all manifest nature. BG 7.14 calls maya &ldquo;guṇamayī&rdquo;: made of the gunas. Maya operates through these three modes. When rajas dominates, desire and acquisition feel like the whole story. When tamas dominates, dullness and ignorance obscure. Even sattva, the clearest mode, can reinforce the sense of being a separate, pure self rather than dissolving into the recognition of the ground. Transcending maya means transcending all three gunas — becoming guṇātīta, as Chapter 14 describes.
          </p>
        </div>

        <div className="faq-item">
          <strong>How do you cross maya according to the Gita?</strong>
          <p>
            BG 7.14 gives the direct answer: &ldquo;Those who take refuge in me alone cross beyond this maya.&rdquo; The Gita presents several supporting paths — knowledge (jnana), meditation, selfless action — but its own preferred answer is bhakti (devotion) as prapatti (complete surrender). The mechanism: when consciousness is oriented entirely around the bounded self, the maya-structure is reinforced. When it orients toward what is beyond the gunas and the self-construction, the identification loosens. The world doesn&apos;t disappear; the center of gravity shifts.
          </p>
        </div>

        <div className="faq-item">
          <strong>What is the difference between maya and avidya?</strong>
          <p>
            Maya is the cosmic power that projects apparent diversity from undivided reality — operating at the level of the universal divine (Ishvara). Avidya is the individual-level ignorance that misidentifies the self with the body-mind complex — operating at the level of the individual soul (jiva). Avidya is, you could say, maya experienced from inside an individual life. The Vedantic and Gita path aims at dissolving avidya — not by cancelling the world&apos;s appearance, but by correcting the misidentification of what you are within it.
          </p>
        </div>
      </div>

      <div className="app-cta">
        <div className="app-cta-eyebrow">Free iOS App</div>
        <div className="app-cta-headline">
          One shloka a morning.<br />Let it stay with you all day.
        </div>
        <p className="app-cta-desc">
          The Wisdom app delivers one Bhagavad Gita verse each day: Devanagari script, transliteration,
          meaning, and how it applies right now. 700 verses. Home screen widget. Free.
        </p>
        <div className="app-cta-features">
          <span>✦ Daily shloka in Sanskrit</span>
          <span>✦ Meaning &amp; modern context</span>
          <span>✦ Home screen widget</span>
        </div>
        <a
          href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125"
          target="_blank"
          rel="noopener"
          className="app-cta-btn"
          data-mp-location="cta"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
          Download on the App Store
        </a>
        <div className="app-cta-sub">Free · iPhone · No account needed</div>
      </div>

      <footer>
        <p>© 2026 Wisdom App. A daily verse to quiet the mind.</p>
        <p>
          <a href="https://wisdomquotes.in">Home</a> —{' '}
          <a href="https://wisdomquotes.in/blogs">Blog</a> —{' '}
          <a href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125" target="_blank" rel="noopener" data-mp-location="footer">
            Download
          </a>
        </p>
      </footer>

      <BlogTracker pageName="Maya Meaning Bhagavad Gita" />
    </>
  )
}
