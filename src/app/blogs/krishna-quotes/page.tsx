import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import ShlokaCard from '@/components/gita/ShlokaCard'

export const metadata: Metadata = {
  title: "Krishna Quotes — 50 Teachings from the Bhagavad Gita with Verse References | Wisdom",
  description: "Krishna quotes stripped of context lose their meaning. Here are 50 sayings of Lord Krishna from the Bhagavad Gita — with Sanskrit verse references, honest translations, and the situation each was spoken in.",
  keywords: "krishna quotes, krishna quotes bhagavad gita, krishna sayings, lord krishna quotes, krishna quotes in sanskrit, krishna quotes on life, krishna quotes on love, krishna quotes on karma, krishna motivational quotes, krishna powerful quotes, bhagavad gita quotes, krishna teachings",
  openGraph: {
    title: "Krishna Quotes — 50 Teachings from the Bhagavad Gita | Wisdom",
    description: "50 Krishna quotes from the Bhagavad Gita, restored to their verse references and the context in which Krishna actually said them.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/krishna-quotes",
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/krishna-quotes" },
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
        body { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; line-height: 1.7; font-size: 16px; }
        .breadcrumb { background: var(--bg-alt); border-bottom: 1px solid var(--border); }
        .breadcrumb-inner { max-width: 1100px; margin: 0 auto; padding: 10px 28px; font-size: 12px; color: var(--text-dimmer); display: flex; gap: 8px; align-items: center; }
        .breadcrumb-inner a { color: var(--text-dimmer); transition: color 0.15s; }
        .breadcrumb-inner a:hover { color: var(--gold-light); }
        .bc-sep { opacity: 0.4; }

        .article-hero { background: var(--bg-warm); padding: 64px 28px 56px; border-bottom: 1px solid var(--border); position: relative; overflow: hidden; }
        .article-hero::before {
            content: "कृष्ण";
            position: absolute;
            right: -10px;
            bottom: -30px;
            font-family: "Noto Sans Devanagari", serif;
            font-size: 180px;
            color: rgba(200, 136, 30, 0.04);
            line-height: 1;
            pointer-events: none;
            user-select: none;
        }
        .article-hero-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 2; }
        .chapter-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(200, 136, 30, 0.1); border: 1px solid rgba(200, 136, 30, 0.28); color: var(--gold-light); font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; padding: 5px 14px; border-radius: 100px; margin-bottom: 20px; }
        .chapter-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold); box-shadow: 0 0 6px var(--gold); flex-shrink: 0; }
        h1.article-title { font-family: "Playfair Display", Georgia, serif; font-size: clamp(28px, 4vw, 48px); font-weight: 700; color: var(--gold-light); line-height: 1.15; letter-spacing: -0.5px; margin-bottom: 14px; }
        h1.article-title em { font-style: italic; color: #fff; }
        .article-subtitle { font-size: 17px; color: var(--text-dim); font-weight: 300; margin-bottom: 32px; line-height: 1.65; max-width: 620px; }
        .article-meta { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
        .meta-item { font-size: 12px; color: var(--text-dimmer); letter-spacing: 0.04em; }
        .meta-sep { color: var(--border); }

        .lead { font-size: 1.1rem; color: var(--text-dim); margin-bottom: 2rem; line-height: 1.8; }

        .chapter-image { margin: 32px 0 36px; border-radius: 14px; overflow: hidden; border: 1px solid var(--border); box-shadow: 0 4px 32px rgba(0,0,0,0.4); }
        .chapter-image img { width: 100%; height: auto; display: block; object-fit: cover; }
        .chapter-image figcaption { padding: 10px 18px; background: var(--bg-card); font-size: 11.5px; color: var(--text-dimmer); letter-spacing: 0.04em; font-style: italic; border-top: 1px solid var(--border); }

        .content { max-width: var(--max); margin: 0 auto; padding: 0 2rem 4rem; }

        h2 { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; margin: 2.5rem 0 1.5rem 0; color: var(--gold); border-bottom: 2px solid var(--gold-dim); padding-bottom: 0.75rem; }
        h3 { font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 600; margin: 1.5rem 0 1rem 0; color: var(--text); }
        p { margin-bottom: 1.5rem; color: var(--text-dim); }

        .pull-quote { border-left: 4px solid var(--gold); padding-left: 2rem; margin: 2.5rem 0; font-size: 1.15rem; color: var(--gold-light); font-style: italic; line-height: 1.8; }

        .highlight-box { background: var(--gold-dim); border: 1px solid var(--gold-border); padding: 1.5rem; border-radius: 8px; margin: 2rem 0; }
        .highlight-box h3 { color: var(--gold); margin-top: 0; }
        .highlight-box p { color: var(--text); margin-bottom: 0.75rem; }

        .hindi-block { background: var(--bg-card); border: 1px solid var(--border); border-left: 3px solid var(--gold); padding: 1.25rem 1.5rem; margin: 1.5rem 0 2rem; border-radius: 6px; }
        .hindi-block .hindi-label { font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold-light); font-weight: 600; margin-bottom: 8px; }
        .hindi-block .hindi-text { font-family: "Noto Sans Devanagari", serif; font-size: 1.05rem; color: var(--text); line-height: 1.8; }

        .quote-inline { background: var(--bg-card); border: 1px solid var(--border); border-left: 3px solid var(--gold); padding: 16px 20px; margin: 14px 0; border-radius: 6px; }
        .quote-ref { font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold-light); font-weight: 700; margin-bottom: 8px; }
        .quote-text { font-family: "Playfair Display", Georgia, serif; font-size: 1.05rem; color: var(--text); line-height: 1.65; font-style: italic; margin-bottom: 8px; }
        .quote-context { font-size: 13px; color: var(--text-dimmer); line-height: 1.55; }

        .practice-list { list-style: none; padding: 0; margin: 1.5rem 0; }
        .practice-list li { display: flex; gap: 14px; margin-bottom: 1.25rem; align-items: flex-start; }
        .practice-list li::before { content: "✦"; color: var(--gold); font-size: 0.75rem; margin-top: 4px; flex-shrink: 0; }
        .practice-list li span { color: var(--text-dim); line-height: 1.7; }
        .practice-list li strong { color: var(--text); }

        .faq-section { max-width: var(--max); margin: 3rem auto; padding: 0 2rem; }
        .faq-item { margin-bottom: 2rem; border-bottom: 1px solid var(--border); padding-bottom: 2rem; }
        .faq-item:last-child { border-bottom: none; }
        .faq-item strong { color: var(--gold-light); font-size: 1.05rem; }
        .faq-item p { margin-top: 0.75rem; }

        .app-cta { background: linear-gradient(160deg, #2d0a0a 0%, #1a0606 100%); border: 1px solid rgba(200, 136, 30, 0.25); border-top: 3px solid var(--gold); border-radius: 20px; padding: 44px 48px 40px; margin: 48px 0 60px; text-align: center; position: relative; overflow: hidden; }
        .app-cta::before { content: "ज्ञान"; position: absolute; top: -14px; right: -8px; font-family: "Noto Sans Devanagari", sans-serif; font-size: 130px; color: rgba(200, 136, 30, 0.05); line-height: 1; pointer-events: none; user-select: none; }
        .app-cta-eyebrow { display: inline-flex; align-items: center; background: rgba(200, 136, 30, 0.12); border: 1px solid rgba(200, 136, 30, 0.35); color: var(--gold-light); font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; padding: 5px 14px; border-radius: 20px; margin-bottom: 20px; }
        .app-cta-headline { font-family: "Playfair Display", serif; font-size: clamp(22px, 3vw, 30px); font-weight: 700; color: var(--text); line-height: 1.25; margin-bottom: 14px; }
        .app-cta-desc { font-size: 15px; color: var(--text-dim); line-height: 1.7; max-width: 480px; margin: 0 auto 22px; }
        .app-cta-features { display: flex; gap: 6px 18px; justify-content: center; flex-wrap: wrap; margin-bottom: 28px; }
        .app-cta-features span { font-size: 13px; color: var(--gold-light); opacity: 0.8; }
        .app-cta-btn { display: inline-flex; align-items: center; gap: 10px; background: var(--gold); color: #120505; text-decoration: none; padding: 15px 34px; border-radius: 12px; font-size: 16px; font-weight: 700; letter-spacing: -0.01em; transition: all 0.2s; box-shadow: 0 4px 22px rgba(200, 136, 30, 0.3); }
        .app-cta-btn:hover { background: var(--gold-light); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(200, 136, 30, 0.5); }
        .app-cta-sub { font-size: 12px; color: rgba(245, 232, 204, 0.35); margin-top: 14px; letter-spacing: 0.04em; }

        footer { background: var(--bg-warm); border-top: 1px solid var(--border); padding: 3rem 2rem; text-align: center; color: var(--text-dimmer); margin-top: 4rem; }
        footer a { color: var(--gold); text-decoration: none; }
        footer a:hover { text-decoration: underline; }

        @media (max-width: 768px) {
            .article-hero { padding: 44px 20px 40px; }
            h2 { font-size: 1.5rem; }
            .app-cta { padding: 32px 24px 28px; }
            .quote-inline { padding: 14px 16px; }
        }
`

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Krishna Quotes — 50 Teachings from the Bhagavad Gita with Verse References",
    "description": "50 sayings of Lord Krishna from the Bhagavad Gita, each restored to its verse reference and the situation in which Krishna actually spoke it.",
    "datePublished": "2026-07-05",
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
        "name": "What is the most famous Krishna quote from the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The most famous Krishna quote is BG 2.47: karmaṇyevādhikāraste mā phaleṣu kadācana — 'You have the right to your action, but never to its fruits.' It is Krishna's core instruction on karma yoga: act fully, release the outcome, do not use non-attachment as an excuse for inaction. Two other verses are almost as widely quoted: BG 2.20 (the imperishable Self) and BG 18.66 (surrender)."
        }
      },
      {
        "@type": "Question",
        "name": "Are Krishna quotes on Instagram accurate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most social-media Krishna quotes are paraphrases, mistranslations, or invented sayings. Krishna spoke in Sanskrit shlokas in the Bhagavad Gita; any accurate quote can be traced to a chapter and verse number (like BG 2.47 or BG 9.22). If a quote has no verse reference, treat it as unverified. Popular examples like 'Whatever happened, happened for the good' are folk paraphrases, not direct verses."
        }
      },
      {
        "@type": "Question",
        "name": "What did Krishna say about love?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Bhagavad Gita does not use the modern romantic sense of love. Krishna's teaching on love is prema and bhakti — a devotional love that unites the individual with the divine. BG 9.29 says Krishna is equal to all beings, but those who worship him with love, he is in them and they in him. BG 12.13-19 lists the qualities of the devotee who is 'dear' to Krishna: free from ill-will, compassionate, equal-minded, steady."
        }
      },
      {
        "@type": "Question",
        "name": "What is Krishna's quote about karma?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Krishna's foundational teaching on karma is BG 2.47: act without attachment to fruit. He extends this in BG 3.19 ('perform action without attachment; that way one attains the highest'), BG 4.20 ('having abandoned attachment to fruits, ever content, dependent on nothing, he does nothing at all even while acting'), and BG 18.11 ('one who has renounced the fruit of action is called a true renunciate'). Karma yoga is not the absence of action. It is action performed without craving."
        }
      },
      {
        "@type": "Question",
        "name": "Which Krishna quote is the most powerful?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BG 18.66 — sarva-dharmān parityajya mām ekaṃ śaraṇaṃ vraja — is traditionally called the charama shloka, the ultimate verse. It is Krishna's final instruction: abandon every framework, take refuge in me alone, I will free you from all sins, do not grieve. Vaishnava traditions consider this the most powerful line in the Gita, because it comes at the end of 700 verses of preparation and offers the complete release."
        }
      },
      {
        "@type": "Question",
        "name": "How should I use Krishna quotes in daily life?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Read one verse in the morning with its Sanskrit, translation, and short commentary. Sit with it before starting your day. Do not try to apply many verses at once. The Gita is not a productivity system; it is a slow reshaping of how you meet action, fear, and loss. Return to the same verse for a week if it pulls at you. Memorize BG 2.47 and BG 18.66. Any other verse is a bonus."
        }
      }
    ]
  }
]

export default function KrishnaQuotesPage() {
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
          Krishna Quotes
        </div>
      </div>

      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · 50 Teachings
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            Krishna Quotes &mdash;<br />
            <em>50 Teachings from the Gita</em>
          </h1>
          <p className="article-subtitle">
            Most Krishna quotes online are stripped of the moment they were spoken. Here are fifty sayings of Lord Krishna from the Bhagavad Gita &mdash; each with its verse reference, an honest translation, and the situation Arjuna was in when Krishna said it.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
            <span className="meta-sep">·</span>
            <span className="meta-item">50 Verses · 10 Themes</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~18 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Published July 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
          </div>
        </div>
      </div>

      <div className="content">
        <figure className="chapter-image">
          <img
            src="/assets/chapter11.webp"
            alt="Krishna teaching Arjuna on the battlefield of Kurukshetra, delivering the verses of the Bhagavad Gita"
            width="1200"
            height="675"
            loading="eager"
            fetchPriority="high"
          />
          <figcaption>Krishna as Arjuna&apos;s charioteer &mdash; every quote in this article was spoken between the two armies at Kurukshetra</figcaption>
        </figure>

        <p className="lead">
          A Krishna quote on Instagram usually comes without a chapter number. It floats in a nice serif over a sunset, and it may not be from Krishna at all. Many of them are paraphrases, some are from later devotional literature, and a few are simply invented. The Bhagavad Gita, where Krishna actually speaks, is a very specific text: 700 Sanskrit verses delivered to a paralyzed warrior on a battlefield. Every real Krishna quote has a number attached to it, and every number sits inside a scene.
        </p>
        <p>
          This piece restores those numbers. Fifty sayings of Lord Krishna, organized into ten themes, each traceable to a chapter and verse. For the most weight-bearing verses, you will see the Sanskrit, the transliteration, an English meaning, and a short note on why it matters. For the rest, a shorter format: the reference, the line, and the situation in which Krishna said it. The point is not to worship the verses. The point is to hear Krishna clearly enough that you can carry him into a decision.
        </p>

        <div className="highlight-box">
          <h3>How this list is organized</h3>
          <p>
            Ten themes, five quotes each. Action and duty. The eternal Self. Detachment and peace. Devotion. Meditation. Wisdom. Fear and grief. Character. Surrender. The divine everywhere. At the end, a short note on the one Krishna quote that is arguably his most important, and yet almost never appears on Instagram.
          </p>
        </div>

        <h2>How to Read a Krishna Quote Properly</h2>
        <p>
          Before the list, a small orientation. The Bhagavad Gita is written as a dialogue. Krishna is not lecturing to a crowd; he is answering one specific man &mdash; Arjuna &mdash; who has just refused to fight the war he came for. Every verse Krishna speaks is either a correction, a promise, a metaphysical clarification, or a reassurance. Reading a Krishna quote out of context is a bit like reading one line from a therapy session and treating it as universal wisdom. Sometimes it is. Sometimes it is a very particular thing said to a very particular fear.
        </p>
        <p>
          The verse reference matters because it lets you check. &ldquo;BG 2.47&rdquo; means chapter 2, verse 47. If someone shares a Krishna quote and cannot produce that reference, you are almost certainly looking at a paraphrase or an invention. Every quote below carries its number. If any pull at you, open the Gita and read the ten verses around them. The context adds a layer no quote card can capture.
        </p>

        <h2>On Action and Duty</h2>
        <p>
          The Gita begins as a manual for someone who has stopped being able to act. Arjuna cannot lift his bow. Krishna&apos;s first extended teaching is not about God or the soul &mdash; it is about work. What action is, why it cannot be avoided, and how to perform it without being destroyed by the outcome. This is karma yoga, and BG 2.47 is its most concentrated line.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 2.47"
          sanskrit="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥"
          iast="karmaṇyevādhikāraste mā phaleṣu kadācana | mā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi ||"
          meaningLabel="Translation"
          meaning="You have the right to your action, but never to its fruits. Do not let the fruit be your motive. And do not become attached to inaction either."
          insightLabel="Context"
          insight="Krishna to Arjuna, chapter 2. Arjuna has just argued at length that fighting the war is wrong because the outcome will be terrible. Krishna's answer is to reframe the whole question. You do not control outcomes. You only control the act. Do the act well; release the fruit. And the fourth line is Krishna anticipating the misreading — 'if I should not care about results, why work?' He closes that door before Arjuna can open it."
          essence="Act fully. Release the outcome. Do not disengage."
        />

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 3.19</div>
          <div className="quote-text">&ldquo;Therefore, perform your work without attachment. That is how one attains the highest.&rdquo;</div>
          <div className="quote-context">Chapter 3, on why karma yoga is not renunciation. Detachment is not withdrawal &mdash; it is the shape of correct action.</div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 3.35"
          sanskrit="श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् । स्वधर्मे निधनं श्रेयः परधर्मो भयावहः ॥"
          iast="śreyānsvadharmo viguṇaḥ paradharmātsvanuṣṭhitāt | svadharme nidhanaṃ śreyaḥ paradharmo bhayāvahaḥ ||"
          meaningLabel="Translation"
          meaning="Your own duty, done imperfectly, is better than another&apos;s duty done well. Better to die in your own dharma; another&apos;s dharma is fraught with fear."
          insightLabel="Context"
          insight="Krishna is answering Arjuna's temptation to abandon his role and become a wandering ascetic instead of fighting. The verse cuts against the fantasy that a different life would have been the right one. Your assigned work, even done badly, is the door. Someone else's work, even done brilliantly, is not."
          essence="Your own imperfect life is your path. Do not envy another&apos;s."
        />

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 4.20</div>
          <div className="quote-text">&ldquo;Having abandoned attachment to the fruit of action, ever content, dependent on nothing &mdash; he does nothing at all, even while acting.&rdquo;</div>
          <div className="quote-context">Chapter 4, describing the karma yogi. The paradox: full engagement with work, zero karmic bondage.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 18.11</div>
          <div className="quote-text">&ldquo;It is not possible for an embodied being to give up action entirely. But one who gives up the fruit of action is truly called a renunciate.&rdquo;</div>
          <div className="quote-context">Chapter 18, Krishna&apos;s closing argument. True renunciation is not leaving the world; it is releasing the grip on outcomes while remaining in it.</div>
        </div>

        <h2>On the Eternal Self</h2>
        <p>
          Arjuna&apos;s grief is grief for people who are about to die. Krishna&apos;s first correction is metaphysical: what you fundamentally are cannot be killed. This is the Gita&apos;s deepest claim, and it is repeated more times than any other. The five verses below are the clearest statements of the imperishable Self.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 2.20"
          sanskrit="न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः । अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे ॥"
          iast="na jāyate mriyate vā kadācin nāyaṃ bhūtvā bhavitā vā na bhūyaḥ | ajo nityaḥ śāśvato'yaṃ purāṇo na hanyate hanyamāne śarīre ||"
          meaningLabel="Translation"
          meaning="It is never born, and it never dies. It did not come into being, nor will it ever cease to be. Unborn, eternal, everlasting, ancient &mdash; it is not killed when the body is killed."
          insightLabel="Context"
          insight="Chapter 2, Krishna directly correcting Arjuna's fear of causing death. The verse is a repudiation of every version of grief that is grief for lost being. Something in you was not born and cannot end. What can end &mdash; the body, the personality, the story — is not what you fundamentally are."
          essence="The Self is unborn, undying, imperishable."
        />

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 2.23</div>
          <div className="quote-text">&ldquo;Weapons cannot cut it. Fire cannot burn it. Water cannot wet it. Wind cannot dry it.&rdquo;</div>
          <div className="quote-context">Chapter 2. Krishna listing the four elements and denying each one power over the Self. A verse memorized by children in traditional Vedanta households.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 2.25</div>
          <div className="quote-text">&ldquo;The Self is said to be unmanifest, unthinkable, unchanging. Knowing it thus, you have no cause to grieve.&rdquo;</div>
          <div className="quote-context">Chapter 2, Krishna&apos;s direct instruction to Arjuna: the metaphysical truth removes the ground of your grief.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 2.27</div>
          <div className="quote-text">&ldquo;For one who is born, death is certain. For one who is dead, birth is certain. Therefore, do not grieve over what is unavoidable.&rdquo;</div>
          <div className="quote-context">Chapter 2, offered as a practical consolation. Even without metaphysics, the cycle itself makes grief a category error.</div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 15.7"
          sanskrit="ममैवांशो जीवलोके जीवभूतः सनातनः । मनःषष्ठानीन्द्रियाणि प्रकृतिस्थानि कर्षति ॥"
          iast="mamaivāṃśo jīvaloke jīvabhūtaḥ sanātanaḥ | manaḥṣaṣṭhānīndriyāṇi prakṛtisthāni karṣati ||"
          meaningLabel="Translation"
          meaning="An eternal fragment of my own being becomes the individual self in the world of the living, drawing to itself the mind and the five senses that abide in nature."
          insightLabel="Context"
          insight="Chapter 15, called the beeja shloka — the seed verse. Krishna finally names what the individual soul is. Not identical with God. Not separate from God. An eternal fragment. Every other teaching in the Gita rests on this claim about identity."
          essence="You are an eternal fragment of the divine, temporarily embodied."
        />

        <h2>On Detachment and Peace</h2>
        <p>
          The Gita&apos;s portrait of the wise person is not stoic and joyless. It is deeply steady. Krishna calls this figure the <em>sthitaprajna</em> &mdash; the one of settled wisdom &mdash; and describes them at length in chapter 2. Peace, in the Gita, is not the absence of activity. It is the absence of turbulence about outcomes.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 2.62"
          sanskrit="ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते । सङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते ॥"
          iast="dhyāyato viṣayānpuṃsaḥ saṅgasteṣūpajāyate | saṅgātsañjāyate kāmaḥ kāmātkrodho'bhijāyate ||"
          meaningLabel="Translation"
          meaning="Dwelling on objects of the senses breeds attachment. From attachment arises desire. From desire, anger is born."
          insightLabel="Context"
          insight="Chapter 2. Krishna's diagnosis of how a mind loses its peace: not by big events, but by small repeated dwellings. Attention shapes attachment; attachment shapes craving; craving, thwarted, becomes anger. The chain begins in what you keep looking at."
          essence="Watch your attention. It becomes attachment, which becomes suffering."
        />

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 2.55</div>
          <div className="quote-text">&ldquo;When a person releases all the desires of the mind and is content in the Self alone, they are said to be of settled wisdom.&rdquo;</div>
          <div className="quote-context">Chapter 2. The first verse of the sthitaprajna portrait, given in answer to Arjuna&apos;s direct question: &ldquo;What are the marks of the wise?&rdquo;</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 2.66</div>
          <div className="quote-text">&ldquo;For the uncontrolled, there is no wisdom. For the uncontrolled, there is no meditation. Without meditation, no peace. And without peace, how can there be happiness?&rdquo;</div>
          <div className="quote-context">Chapter 2. Krishna traces the chain in reverse: happiness rests on peace, peace on meditation, meditation on self-mastery.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 4.22</div>
          <div className="quote-text">&ldquo;Content with whatever comes unsought, beyond the pairs of opposites, free from envy, equal in success and failure &mdash; even acting, he is not bound.&rdquo;</div>
          <div className="quote-context">Chapter 4. Krishna&apos;s working definition of freedom in action. Not detachment from the world, but freedom from being tossed by the world.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 6.7</div>
          <div className="quote-text">&ldquo;For the one who has mastered themselves and is at peace, the Supreme Self is directly present &mdash; in cold and heat, joy and sorrow, honor and dishonor.&rdquo;</div>
          <div className="quote-context">Chapter 6, on meditation. The steady person does not lose the divine when circumstances change.</div>
        </div>

        <h2>On Devotion</h2>
        <p>
          Chapters 7 through 12 are the emotional heart of the Gita. Krishna moves from metaphysics into relationship. Devotion &mdash; <em>bhakti</em> &mdash; is the direct path, and it does not require complicated ritual or philosophical sophistication. What it requires is a whole turning of the heart.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 9.22"
          sanskrit="अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते । तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् ॥"
          iast="ananyāścintayanto māṃ ye janāḥ paryupāsate | teṣāṃ nityābhiyuktānāṃ yogakṣemaṃ vahāmyaham ||"
          meaningLabel="Translation"
          meaning="For those who worship me with undivided mind, thinking of nothing else, ever united with me, I carry what they need and preserve what they have."
          insightLabel="Context"
          insight="Chapter 9. Krishna's most personal promise. Yoga-kshema means both acquisition and preservation. For the devotee who has truly turned toward him, Krishna assumes responsibility for the maintenance of their life. This is the verse that makes the Gita feel like a covenant, not a philosophy."
          essence="Turn fully toward me. I carry the weight of your becoming."
        />

        <ShlokaCard
          verseRef="Bhagavad Gita 9.26"
          sanskrit="पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति । तदहं भक्त्युपहृतमश्नामि प्रयतात्मनः ॥"
          iast="patraṃ puṣpaṃ phalaṃ toyaṃ yo me bhaktyā prayacchati | tadahaṃ bhaktyupahṛtamaśnāmi prayatātmanaḥ ||"
          meaningLabel="Translation"
          meaning="A leaf, a flower, a fruit, water &mdash; whoever offers me these with devotion, offered from a pure heart, I accept."
          insightLabel="Context"
          insight="Chapter 9, on the accessibility of bhakti. Krishna is dismantling the idea that only elaborate ritual reaches him. What he receives is not the offering — it is the love in the offering. A leaf given with devotion is fully enough."
          essence="Devotion does not need scale. It needs sincerity."
        />

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 9.31</div>
          <div className="quote-text">&ldquo;My devotee never perishes. Know this for certain, Arjuna: proclaim it aloud.&rdquo;</div>
          <div className="quote-context">Chapter 9, spoken as an oath. One of the strongest promises Krishna makes in the entire Gita.</div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 12.13"
          sanskrit="अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च । निर्ममो निरहङ्कारः समदुःखसुखः क्षमी ॥"
          iast="adveṣṭā sarvabhūtānāṃ maitraḥ karuṇa eva ca | nirmamo nirahaṅkāraḥ samaduḥkhasukhaḥ kṣamī ||"
          meaningLabel="Translation"
          meaning="One who bears no ill-will to any being, who is friendly and compassionate, free from &lsquo;mine&rsquo; and &lsquo;I,&rsquo; equal in pain and pleasure, forgiving."
          insightLabel="Context"
          insight="Chapter 12, the first verse of Krishna's portrait of the devotee he calls dear. The list is startlingly ethical rather than mystical. It is about how the person treats others, how they hold gain and loss, whether they carry enmity. Devotion, in the Gita, is measured by character."
          essence="The devotee&apos;s mark is not intensity of belief. It is character."
        />

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 12.15</div>
          <div className="quote-text">&ldquo;One who does not disturb the world and is not disturbed by it, free from elation, envy, fear, and anxiety &mdash; that one is dear to me.&rdquo;</div>
          <div className="quote-context">Chapter 12, continuing the portrait. The devotee is a person the world can rest against and who does not need to disturb others.</div>
        </div>

        <h2>On Meditation and the Mind</h2>
        <p>
          Chapter 6 is the Gita&apos;s meditation manual. Krishna teaches posture, breath, and the practical technique &mdash; and then Arjuna raises the objection anyone who has tried to meditate raises. &ldquo;The mind is restless. Restraining it is like trying to hold the wind.&rdquo; Krishna&apos;s answer is one of the most quoted lines in the whole book.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 6.5"
          sanskrit="उद्धरेदात्मनात्मानं नात्मानमवसादयेत् । आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ॥"
          iast="uddhared ātmanātmānaṃ nātmānam avasādayet | ātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ ||"
          meaningLabel="Translation"
          meaning="Lift yourself by your own Self. Do not sink into despair. You alone are your friend, and you alone are your enemy."
          insightLabel="Context"
          insight="Chapter 6. One of the clearest personal-responsibility verses in the Gita. Krishna is saying: no one else is coming to raise you out of this. The same mind that pulls you down is the mind that can lift you. Which one it becomes depends on whether you befriend or abandon yourself."
          essence="Nobody else can lift you. Be your own friend."
        />

        <ShlokaCard
          verseRef="Bhagavad Gita 6.35"
          sanskrit="असंशयं महाबाहो मनो दुर्निग्रहं चलम् । अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते ॥"
          iast="asaṃśayaṃ mahābāho mano durnigrahaṃ calam | abhyāsena tu kaunteya vairāgyeṇa ca gṛhyate ||"
          meaningLabel="Translation"
          meaning="Undoubtedly, the mind is restless and hard to control. But by consistent practice and by dispassion, it can be held."
          insightLabel="Context"
          insight="Chapter 6, Krishna's response to Arjuna's honest complaint that meditation is impossible. Krishna does not deny the difficulty. He offers two tools: abhyasa (steady practice) and vairagya (letting go of what agitates the mind). Not talent, not intensity. Consistency plus release."
          essence="Practice, and letting go. Every day. The mind eventually settles."
        />

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 6.19</div>
          <div className="quote-text">&ldquo;As a lamp in a windless place does not flicker &mdash; that is the image of the yogi whose mind is controlled and rests in the Self.&rdquo;</div>
          <div className="quote-context">Chapter 6, one of the Gita&apos;s most beautiful images of meditative stillness.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 6.26</div>
          <div className="quote-text">&ldquo;Wherever the restless, unsteady mind wanders, from there let one bring it back and place it in the Self.&rdquo;</div>
          <div className="quote-context">Chapter 6. The whole meditation instruction in one sentence. Notice the wandering. Bring the mind back. Again.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 6.30</div>
          <div className="quote-text">&ldquo;One who sees me everywhere and sees everything in me &mdash; I am never lost to them, and they are never lost to me.&rdquo;</div>
          <div className="quote-context">Chapter 6. Meditation, in the Gita, is not withdrawal. Its fruit is seeing the divine woven through the world.</div>
        </div>

        <h2>On Wisdom and Knowledge</h2>
        <p>
          Krishna calls himself a teacher of an ancient lineage. The wisdom he offers is not new; it is being restored. Chapter 4 places the whole teaching in a genealogy that runs back to the beginning of time. The verses below trace how Krishna talks about knowledge itself.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 4.7"
          sanskrit="यदा यदा हि धर्मस्य ग्लानिर्भवति भारत । अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥"
          iast="yadā yadā hi dharmasya glānir bhavati bhārata | abhyutthānam adharmasya tadātmānaṃ sṛjāmyaham ||"
          meaningLabel="Translation"
          meaning="Whenever dharma declines and adharma rises, Arjuna, I bring myself forth."
          insightLabel="Context"
          insight="Chapter 4. Krishna's most famous statement of the avatar doctrine. It is not a claim that God intervenes casually. It is a claim that dharma is not left to collapse. When the balance is broken badly enough, something shows up to restore it."
          essence="Dharma is not abandoned. When it falls, the divine returns to raise it."
        />

        <ShlokaCard
          verseRef="Bhagavad Gita 4.8"
          sanskrit="परित्राणाय साधूनां विनाशाय च दुष्कृताम् । धर्मसंस्थापनार्थाय सम्भवामि युगे युगे ॥"
          iast="paritrāṇāya sādhūnāṃ vināśāya ca duṣkṛtām | dharmasaṃsthāpanārthāya sambhavāmi yuge yuge ||"
          meaningLabel="Translation"
          meaning="To protect the good, to destroy the wicked, to re-establish dharma &mdash; I come into being, age after age."
          insightLabel="Context"
          insight="Chapter 4, immediately following BG 4.7. This is Krishna's stated purpose across every avatar. Not to save souls in a Christian sense, but to hold the world's dharma steady. Yuge yuge — age after age — makes the intervention cyclical, not one-time."
          essence="The divine returns, age after age, to hold dharma steady."
        />

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 4.37</div>
          <div className="quote-text">&ldquo;As a blazing fire reduces wood to ash, the fire of knowledge reduces all karmas to ash.&rdquo;</div>
          <div className="quote-context">Chapter 4. Genuine self-knowledge, when it arrives, dissolves the karmic residue of countless past actions. Not because they never happened &mdash; because the actor is now differently understood.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 4.38</div>
          <div className="quote-text">&ldquo;Nothing in this world purifies like knowledge. One who is perfected in yoga finds it within, in due course, by their own effort.&rdquo;</div>
          <div className="quote-context">Chapter 4. Wisdom is not deposited from outside. It ripens inside a life that has been arranged for its arrival.</div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 7.7"
          sanskrit="मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय । मयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव ॥"
          iast="mattaḥ parataraṃ nānyat kiñcid asti dhanañjaya | mayi sarvam idaṃ protaṃ sūtre maṇigaṇā iva ||"
          meaningLabel="Translation"
          meaning="There is nothing higher than me, Arjuna. All this is strung on me like pearls on a thread."
          insightLabel="Context"
          insight="Chapter 7. Krishna moves from teaching about knowledge to being it. The image is precise: not that things are him, but that they are held together by him. The thread is invisible, but without it there is no necklace."
          essence="The world is not separate from the divine. It is strung on it."
        />

        <h2>On Fear and Grief</h2>
        <p>
          Arjuna&apos;s original problem is fear disguised as compassion. Much of the first two chapters is Krishna dismantling the disguise. The verses below are Krishna&apos;s clearest lines about fear and grief &mdash; and the strange fact that his own solution is not always to argue you out of them, but to invite you into something larger.
        </p>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 2.14</div>
          <div className="quote-text">&ldquo;The contact of the senses with objects gives cold and heat, pleasure and pain. They come and go; they are impermanent. Learn to bear them, Arjuna.&rdquo;</div>
          <div className="quote-context">Chapter 2. Not a promise that pain will end &mdash; a teaching that pain is weather, and that endurance is possible when you know it is weather.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 2.38</div>
          <div className="quote-text">&ldquo;Treating pleasure and pain, gain and loss, victory and defeat as equal, engage in battle. This way you will not incur sin.&rdquo;</div>
          <div className="quote-context">Chapter 2, one of Krishna&apos;s most direct instructions on equanimity. The battle is the specific one on Kurukshetra; the principle is universal.</div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 11.55"
          sanskrit="मत्कर्मकृन्मत्परमो मद्भक्तः सङ्गवर्जितः । निर्वैरः सर्वभूतेषु यः स मामेति पाण्डव ॥"
          iast="matkarmakṛn matparamo madbhaktaḥ saṅgavarjitaḥ | nirvairaḥ sarvabhūteṣu yaḥ sa mām eti pāṇḍava ||"
          meaningLabel="Translation"
          meaning="One who works for me, holds me as the highest, is devoted to me, free of attachment and without enmity toward any being &mdash; that one comes to me, Arjuna."
          insightLabel="Context"
          insight="Chapter 11, the last verse after the cosmic vision. Arjuna has just seen Krishna's terrible universal form. This verse is Krishna offering the way back: after seeing the divine as time itself, this is how you keep walking toward it. Traditional commentators call it the summary of the whole Gita in one line."
          essence="Work for me. Hold me as highest. No attachment. No enmity. Come."
        />

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 18.58</div>
          <div className="quote-text">&ldquo;Fix your mind on me, and by my grace you will cross every difficulty. If, through egoism, you refuse to listen &mdash; you will be lost.&rdquo;</div>
          <div className="quote-context">Chapter 18. Krishna is nearly finished. He is warning Arjuna that the offer has a shape: it requires taking it.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 18.66</div>
          <div className="quote-text">&ldquo;Abandon every duty, take refuge in me alone. I will free you from all sins. Do not grieve.&rdquo;</div>
          <div className="quote-context">Chapter 18, Krishna&apos;s final instruction. See the closing section of this article for why this is the quote Krishna nobody actually quotes.</div>
        </div>

        <h2>On Character</h2>
        <p>
          Chapter 16 divides human tendencies into two: the divine and the demonic. It is one of the Gita&apos;s most direct portraits of what a good person looks like. Chapter 12 does the same in the devotional key. The five below are Krishna&apos;s specifications for character.
        </p>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 16.1</div>
          <div className="quote-text">&ldquo;Fearlessness, purity of heart, steadiness in knowledge and yoga, generosity, self-control, sacrifice, study, austerity, straightforwardness&hellip;&rdquo;</div>
          <div className="quote-context">Chapter 16, the opening of Krishna&apos;s divine qualities list. Notice fearlessness is first. Everything else rests on it.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 16.2</div>
          <div className="quote-text">&ldquo;Non-violence, truthfulness, freedom from anger, renunciation, tranquility, absence of slander, compassion for all beings, freedom from greed, gentleness, modesty, steadiness&hellip;&rdquo;</div>
          <div className="quote-context">Chapter 16, continuing the list. Compassion and gentleness sit next to steadiness &mdash; character is not fierce or soft alone. It is both.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 16.3</div>
          <div className="quote-text">&ldquo;Vigor, forgiveness, fortitude, cleanliness, freedom from malice, freedom from pride &mdash; these are the qualities of one born to the divine state.&rdquo;</div>
          <div className="quote-context">Chapter 16, closing the divine qualities list. Notice that both forgiveness and vigor appear. Character in the Gita is not one-sided.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 12.14</div>
          <div className="quote-text">&ldquo;Ever content, steady in meditation, self-controlled, firm in conviction, with mind and intellect surrendered to me &mdash; my devotee is dear to me.&rdquo;</div>
          <div className="quote-context">Chapter 12. Contentment is placed first. Krishna is saying: it starts there.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 12.17</div>
          <div className="quote-text">&ldquo;One who neither rejoices nor hates, neither mourns nor desires, who has given up both good and bad, filled with devotion &mdash; that one is dear to me.&rdquo;</div>
          <div className="quote-context">Chapter 12. The most demanding line in the devotee portrait. Krishna is asking for a whole releasing of the emotional grip, not just moderation.</div>
        </div>

        <h2>On Surrender</h2>
        <p>
          Surrender in the Gita is not defeat. It is a specific act, called <em>sharanagati</em>, in which the devotee stops trying to secure themselves through their own efforts and takes refuge in the divine. Every one of the five verses below asks for the same movement: give up the grip, trust the ground.
        </p>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 18.66</div>
          <div className="quote-text">&ldquo;Abandon every duty, take refuge in me alone. I will free you from all sins. Do not grieve.&rdquo;</div>
          <div className="quote-context">Chapter 18. The <em>charama shloka</em>, the ultimate verse of the Gita. Krishna&apos;s last word. See the closing section for why this quote deserves to be central and rarely is.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 18.62</div>
          <div className="quote-text">&ldquo;Take refuge in him alone with your whole being. By his grace, you will attain the supreme peace and the eternal abode.&rdquo;</div>
          <div className="quote-context">Chapter 18, four verses before the final teaching. Krishna is building up to 18.66 by asking for whole-being refuge.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 9.34</div>
          <div className="quote-text">&ldquo;Fix your mind on me, be devoted to me, sacrifice to me, bow to me. Uniting yourself thus, you will come to me.&rdquo;</div>
          <div className="quote-context">Chapter 9, the closing verse of the &ldquo;royal knowledge&rdquo; chapter. Four verbs, one direction. Simple, complete, hard.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 7.14</div>
          <div className="quote-text">&ldquo;My divine maya, made of the three gunas, is difficult to cross. But those who take refuge in me alone cross beyond it.&rdquo;</div>
          <div className="quote-context">Chapter 7. Maya &mdash; the illusion that binds &mdash; is not overcome by effort against it. It is dissolved by refuge in what is beyond it.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 8.7</div>
          <div className="quote-text">&ldquo;Therefore at all times remember me and fight. With mind and intellect fixed on me, you will surely come to me.&rdquo;</div>
          <div className="quote-context">Chapter 8. Krishna&apos;s remarkable synthesis: surrender is not incompatible with battle. Remember me, and act. Both, at once.</div>
        </div>

        <h2>On the Divine Everywhere</h2>
        <p>
          Krishna&apos;s theology is not distant. In chapters 7 and 10 he describes himself as woven into the world &mdash; the taste of water, the light of the sun, the intelligence of the intelligent. These verses are the Gita&apos;s answer to the question, &ldquo;Where is God?&rdquo; The answer is: look at what you are already looking at, but see it correctly.
        </p>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 7.8</div>
          <div className="quote-text">&ldquo;I am the taste in water, Arjuna. I am the light in the sun and the moon. I am the sacred syllable Om in all the Vedas, the sound in ether, the courage in men.&rdquo;</div>
          <div className="quote-context">Chapter 7, one of the most beloved passages in the Gita. Krishna does not point to a distant heaven. He points to the taste in your glass of water.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 7.9</div>
          <div className="quote-text">&ldquo;I am the pure fragrance of the earth and the brilliance in fire. I am the life in all beings and the austerity in ascetics.&rdquo;</div>
          <div className="quote-context">Chapter 7, continuing the vibhuti sequence. The divine as the specific excellence of each thing.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 7.10</div>
          <div className="quote-text">&ldquo;Know me, Arjuna, as the eternal seed of all beings. I am the intelligence of the intelligent and the splendor of the splendid.&rdquo;</div>
          <div className="quote-context">Chapter 7. Krishna as the underlying capacity that makes any excellence possible.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 10.20</div>
          <div className="quote-text">&ldquo;I am the Self, Arjuna, seated in the heart of every being. I am the beginning, the middle, and also the end of all beings.&rdquo;</div>
          <div className="quote-context">Chapter 10. The most intimate location Krishna gives himself &mdash; not everywhere in the abstract, but seated in the heart.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 10.41</div>
          <div className="quote-text">&ldquo;Whatever is glorious, whatever is beautiful, whatever is mighty &mdash; know that as arising from a spark of my splendor.&rdquo;</div>
          <div className="quote-context">Chapter 10, closing the vibhuti list. Not that every excellent thing is God, but that every excellent thing points toward the source of excellence.</div>
        </div>

        <div className="pull-quote">
          Fifty quotes, and Krishna keeps circling four things: what you fundamentally are, how to act inside a life you did not fully choose, how to hold fear and loss, and how to rest in something larger than yourself. Everything else is elaboration.
        </div>

        <h2>The Quote Nobody Quotes</h2>
        <p>
          Something odd about Krishna&apos;s quotes on the internet: BG 2.47 is everywhere, BG 2.20 is everywhere, and BG 18.66 &mdash; his actual final teaching, the one traditional commentators call the ultimate verse &mdash; is almost nowhere. It is not Instagram-friendly. It does not fit on a graphic. And it asks something the other verses do not.
        </p>

        <p>
          BG 18.66: <em>sarva-dharmān parityajya mām ekaṃ śaraṇaṃ vraja | ahaṃ tvā sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ</em>. &ldquo;Abandon every duty and take refuge in me alone. I will free you from all sins. Do not grieve.&rdquo; After seventeen chapters of specifying what you should do &mdash; act, meditate, worship, cultivate character, hold steady, know the Self &mdash; Krishna&apos;s parting sentence is: release all of that. Take refuge. That is the whole thing.
        </p>

        <p>
          This is why it is not shared. It does not translate into a productivity tip. It does not fit the &ldquo;Krishna motivational quotes&rdquo; genre. It is not empowering in the modern sense. It is quieter and stranger. It asks the devotee to trust rather than to try harder. Karma yoga can be borrowed by anyone; sharanagati has to be lived. If you only ever memorize one Krishna quote, memorize this one, and let the others do their work in its light.
        </p>

        <div className="hindi-block">
          <div className="hindi-label">The Charama Shloka in Hindi</div>
          <div className="hindi-text">
            सब धर्मों को त्यागकर तू केवल मेरी शरण में आ। मैं तुझे सब पापों से मुक्त कर दूँगा &mdash; तू शोक मत कर।
          </div>
        </div>

        <h2>How to Actually Use These</h2>
        <p>
          Fifty quotes is more than any person can carry at once. The Gita is not a productivity playbook. Here is a practical way to let these verses actually shape you, rather than scroll past you.
        </p>

        <ul className="practice-list">
          <li>
            <span><strong>Memorize BG 2.47 and BG 18.66.</strong> The instruction verse and the surrender verse. Every other quote in this list is an elaboration of one of these two. If you know them cold, you have the shape of the Gita in your body.</span>
          </li>
          <li>
            <span><strong>One verse a morning, for ten days.</strong> Choose one theme from the ten in this article. Sit with one verse each morning for ten days. Do not race. The Gita is designed for slow return, not rapid consumption.</span>
          </li>
          <li>
            <span><strong>Match the verse to the moment.</strong> Anxious about outcomes? Return to BG 2.47. Grieving a loss? BG 2.20 or 2.27. Overwhelmed by too many frameworks? BG 18.66. Feeling far from the divine? BG 7.8 &mdash; look at the taste of the water in your hand.</span>
          </li>
          <li>
            <span><strong>Do not stop at the quote.</strong> Every verse here has ten verses around it that give it context. If a line pulls at you, read the twenty verses on either side of it. The quote is a doorway, not the room.</span>
          </li>
          <li>
            <span><strong>Keep one verse on your phone.</strong> Not fifty. One. Let it be the one you return to when your mind slips. If it stops being useful, replace it. The Gita is meant to accompany you, not compete for attention.</span>
          </li>
        </ul>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>What is the most famous Krishna quote from the Bhagavad Gita?</strong>
          <p>
            The most famous Krishna quote is BG 2.47: <em>karmaṇyevādhikāraste mā phaleṣu kadācana</em> &mdash; &ldquo;You have the right to your action, but never to its fruits.&rdquo; It is Krishna&apos;s core instruction on karma yoga: act fully, release the outcome, do not use non-attachment as an excuse for inaction. Two other verses are almost as widely quoted: BG 2.20 (the imperishable Self) and BG 18.66 (surrender).
          </p>
        </div>

        <div className="faq-item">
          <strong>Are Krishna quotes on Instagram accurate?</strong>
          <p>
            Most social-media Krishna quotes are paraphrases, mistranslations, or invented sayings. Krishna spoke in Sanskrit shlokas in the Bhagavad Gita; any accurate quote can be traced to a chapter and verse number (like BG 2.47 or BG 9.22). If a quote has no verse reference, treat it as unverified. Popular examples like &ldquo;Whatever happened, happened for the good&rdquo; are folk paraphrases, not direct verses.
          </p>
        </div>

        <div className="faq-item">
          <strong>What did Krishna say about love?</strong>
          <p>
            The Bhagavad Gita does not use the modern romantic sense of love. Krishna&apos;s teaching on love is <em>prema</em> and <em>bhakti</em> &mdash; a devotional love that unites the individual with the divine. BG 9.29 says Krishna is equal to all beings, but those who worship him with love, he is in them and they in him. BG 12.13&ndash;19 lists the qualities of the devotee who is &ldquo;dear&rdquo; to Krishna: free from ill-will, compassionate, equal-minded, steady.
          </p>
        </div>

        <div className="faq-item">
          <strong>What is Krishna&apos;s quote about karma?</strong>
          <p>
            Krishna&apos;s foundational teaching on karma is BG 2.47: act without attachment to fruit. He extends this in BG 3.19 (&ldquo;perform action without attachment; that way one attains the highest&rdquo;), BG 4.20 (&ldquo;having abandoned attachment to fruits, ever content, dependent on nothing, he does nothing at all even while acting&rdquo;), and BG 18.11 (&ldquo;one who has renounced the fruit of action is called a true renunciate&rdquo;). Karma yoga is not the absence of action. It is action performed without craving.
          </p>
        </div>

        <div className="faq-item">
          <strong>Which Krishna quote is the most powerful?</strong>
          <p>
            BG 18.66 &mdash; <em>sarva-dharmān parityajya mām ekaṃ śaraṇaṃ vraja</em> &mdash; is traditionally called the <em>charama shloka</em>, the ultimate verse. It is Krishna&apos;s final instruction: abandon every framework, take refuge in me alone, I will free you from all sins, do not grieve. Vaishnava traditions consider this the most powerful line in the Gita, because it comes at the end of 700 verses of preparation and offers the complete release.
          </p>
        </div>

        <div className="faq-item">
          <strong>How should I use Krishna quotes in daily life?</strong>
          <p>
            Read one verse in the morning with its Sanskrit, translation, and short commentary. Sit with it before starting your day. Do not try to apply many verses at once. The Gita is not a productivity system; it is a slow reshaping of how you meet action, fear, and loss. Return to the same verse for a week if it pulls at you. Memorize BG 2.47 and BG 18.66. Any other verse is a bonus.
          </p>
        </div>
      </div>

      <div className="content" style={{ paddingTop: 0 }}>
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

      <BlogTracker pageName="Krishna Quotes 50 Teachings" />
    </>
  )
}
