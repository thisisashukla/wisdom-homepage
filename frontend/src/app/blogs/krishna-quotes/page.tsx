import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'
import { appStoreUrl } from '@/lib/app'

export const metadata: Metadata = {
  title: "50 Krishna Quotes from the Bhagavad Gita, with Verse Numbers",
  description: "50 one-line Krishna quotes in English from the Bhagavad Gita, like \"You have a right to action, never to its fruits\" (2.47). Each with verse number and context.",
  keywords: "krishna quotes, krishna quotes bhagavad gita, krishna sayings, lord krishna quotes, krishna quotes in sanskrit, krishna quotes on life, krishna quotes on love, krishna quotes on karma, krishna motivational quotes, krishna powerful quotes, bhagavad gita quotes, krishna teachings",
  openGraph: {
    title: "50 Krishna Quotes from the Bhagavad Gita, with Verse Numbers",
    description: "50 one-line Krishna quotes in English from the Bhagavad Gita, like \"You have a right to action, never to its fruits\" (2.47). Each with verse number and context.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/krishna-quotes",
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sansearchapp',
    creator: '@thisisashukla',
    title: "50 Krishna Quotes from the Bhagavad Gita, with Verse Numbers",
    description: "50 one-line Krishna quotes in English from the Bhagavad Gita, like \"You have a right to action, never to its fruits\" (2.47). Each with verse number and context.",
    images: ['https://wisdomquotes.in/og-image.webp'],
  },
  alternates: {
    canonical: "https://wisdomquotes.in/blogs/krishna-quotes",
    languages: {
      'en': "https://wisdomquotes.in/blogs/krishna-quotes",
      'en-IN': "https://wisdomquotes.in/blogs/krishna-quotes",
      'x-default': "https://wisdomquotes.in/blogs/krishna-quotes",
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
    "description": "50 sayings of Lord Krishna from the Bhagavad Gita, each restored to its verse reference and the situation in which Krishna spoke it.",
    "datePublished": "2026-07-05",
    "dateModified": "2026-08-01",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://wisdomquotes.in/blogs/krishna-quotes" },
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
      { "@type": "ListItem", "position": 3, "name": "Krishna Quotes — 50 Teachings from the Bhagavad Gita", "item": "https://wisdomquotes.in/blogs/krishna-quotes" }
    ]
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
          "text": "The most famous Krishna quote is BG 2.47: karmaṇyevādhikāraste mā phaleṣu kadācana: 'You have the right to your action, but never to its fruits.' It is Krishna's core instruction on karma yoga: act fully, release the outcome, do not use non-attachment as an excuse for inaction. Two other verses are almost as widely quoted: BG 2.20 (the imperishable self) and BG 18.66 (surrender)."
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
          "text": "The Bhagavad Gita has little to say about romantic love. Krishna's word for love is bhakti, a devotion that joins the individual to the divine. BG 9.29 says Krishna is equal to all beings, but those who worship him with love, he is in them and they in him. BG 12.13-19 lists the qualities of the devotee who is 'dear' to Krishna: free from ill-will, compassionate, equal-minded, steady."
        }
      },
      {
        "@type": "Question",
        "name": "What is Krishna's quote about karma?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Krishna's foundational teaching on karma is BG 2.47: act without attachment to fruit. He extends this in BG 3.19 ('perform action without attachment; that way one attains the highest'), BG 4.20 ('having abandoned attachment to fruits, ever content, dependent on nothing, he does nothing at all even while acting'), and BG 18.11 ('one who has renounced the fruit of action is called a true renunciate'). Karma yoga is action performed without craving for its fruit."
        }
      },
      {
        "@type": "Question",
        "name": "Which Krishna quote is the most important?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BG 18.66 (sarva-dharmān parityajya mām ekaṃ śaraṇaṃ vraja) is called the charama shloka, the ultimate verse, in the Śrī Vaiṣṇava tradition. It is Krishna's last instruction: abandon all dharmas, take refuge in me alone, I will free you from all sins, do not grieve. Others give that place to 2.47; there is no single agreed answer."
        }
      },
      {
        "@type": "Question",
        "name": "How should I use Krishna quotes in daily life?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Read one verse in the morning with its Sanskrit, translation, and short commentary. Sit with it before starting your day. Apply one verse at a time. The Gita works slowly, on how you meet action, fear and loss. Return to the same verse for a week if it pulls at you. Memorize BG 2.47 and BG 18.66. Any other verse is a bonus."
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
            Most Krishna quotes online come without the moment they were spoken in. Here are fifty sayings of Lord Krishna from the Bhagavad Gita, each with its verse reference, a translation, and the situation Arjuna was in when Krishna said it.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
            <span className="meta-sep">·</span>
            <span className="meta-item">50 Verses · 10 Themes</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~18 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed October 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
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
          <figcaption>Krishna as Arjuna&apos;s charioteer. Every quote in this article was spoken between the two armies at Kurukshetra</figcaption>
        </figure>

        <p className="lead">
          A Krishna quote on Instagram usually comes without a chapter number. It floats in a nice serif over a sunset, and it may not be from Krishna at all. Many of them are paraphrases, some are from later devotional literature, and a few are simply invented. The Bhagavad Gita, where Krishna speaks, is a specific text: 700 Sanskrit verses delivered to a paralyzed warrior on a battlefield. Every real Krishna quote has a number attached to it, and every number sits inside a scene.
        </p>
        <p>
          This piece restores those numbers. Fifty sayings of Lord Krishna, organized into ten themes, each traceable to a chapter and verse. For the most weight-bearing verses, you will see the Sanskrit, the transliteration, an English meaning, and a short note on its context. For the rest, a shorter format: the reference, the line, and the situation in which Krishna said it. The aim is to hear Krishna clearly enough to carry a verse into a decision.
        </p>

        <div className="highlight-box">
          <h3>How this list is organized</h3>
          <p>
            Ten themes, five quotes each: action and duty, the eternal self, detachment and peace, devotion, meditation, wisdom, fear and grief, character, surrender, and the divine everywhere. At the end, a short note on 18.66, Krishna&apos;s last instruction.
          </p>
        </div>

        <h2>How to Read a Krishna Quote Properly</h2>
        <p>
          Before the list, a small orientation. The Bhagavad Gita is written as a dialogue. Krishna is not lecturing to a crowd; he is answering one man, Arjuna, who has just refused to fight the war he came for. Every verse Krishna speaks is either a correction, a promise, a metaphysical clarification, or a reassurance. Reading a Krishna quote out of context is like reading one line of a letter written to someone else. Sometimes the line holds for everyone, and sometimes it was said to one man&apos;s particular fear.
        </p>
        <p>
          The verse reference matters because it lets you check. &ldquo;BG 2.47&rdquo; means chapter 2, verse 47. If someone shares a Krishna quote and cannot produce that reference, you are almost certainly looking at a paraphrase or an invention. Every quote below carries its number. If any pull at you, open the Gita and read the ten verses around them. 
        </p>

        <h2>On Action and Duty</h2>
        <p>
          The Gita begins as a manual for someone who has stopped being able to act. Arjuna cannot lift his bow. Krishna&apos;s first teaching is about the atman (2.11–30). Then comes Arjuna&apos;s duty as a warrior (2.31–38), and from 2.39, how to act. What action is, why it cannot be avoided, and how to perform it without being destroyed by the outcome. This is karma yoga, and BG 2.47 is its best-known line.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 2.47"
          sanskrit="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥"
          iast="karmaṇyevādhikāraste mā phaleṣu kadācana | mā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi ||"
          meaningLabel="Translation"
          meaning="You have the right to your action, but never to its fruits. Do not let the fruit be your motive. And do not become attached to inaction either."
          insightLabel="Context"
          insight="Chapter 2. Arjuna has just argued at length that fighting the war is wrong because the outcome will be terrible. Krishna reframes the question: Arjuna controls the act and has no claim on the outcome. The fourth line answers the obvious objection, 'if I should not care about results, why work?', before Arjuna can raise it."
          essence="Your right is to the work, never to its results; do not turn to inaction."
        />

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 3.19</div>
          <div className="quote-text">&ldquo;Therefore, perform your work without attachment. That is how one attains the highest.&rdquo;</div>
          <div className="quote-context">Chapter 3, on karma yoga. Krishna asks for work done without attachment, and keeps Arjuna working.</div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 3.35"
          sanskrit="श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् । स्वधर्मे निधनं श्रेयः परधर्मो भयावहः ॥"
          iast="śreyānsvadharmo viguṇaḥ paradharmātsvanuṣṭhitāt | svadharme nidhanaṃ śreyaḥ paradharmo bhayāvahaḥ ||"
          meaningLabel="Translation"
          meaning="Your own duty, done imperfectly, is better than another&apos;s duty done well. Better to die in your own dharma; another&apos;s dharma is fraught with fear."
          insightLabel="Context"
          insight="Krishna is answering Arjuna's temptation to abandon his role and become a wandering ascetic instead of fighting. In 2.5 Arjuna said it would be better to live by begging than to kill his teachers. Krishna&apos;s reply here is that a warrior&apos;s own duty, done imperfectly, is better than another&apos;s done well."
          essence="Better your own dharma, imperfectly done, than another&apos;s done well."
        />

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 4.20</div>
          <div className="quote-text">&ldquo;Having abandoned attachment to the fruit of action, ever content, dependent on nothing, he does nothing at all, even while acting.&rdquo;</div>
          <div className="quote-context">Chapter 4, describing the karma yogi, who works fully and is not bound by the work.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 18.11</div>
          <div className="quote-text">&ldquo;It is not possible for an embodied being to give up action entirely. But one who gives up the fruit of action is truly called a renunciate.&rdquo;</div>
          <div className="quote-context">Chapter 18, Krishna&apos;s closing argument. The renunciate, on this definition, keeps working and gives up the fruit.</div>
        </div>

        <h2>On the Eternal Self</h2>
        <p>
          Arjuna&apos;s grief is grief for people who are about to die. Krishna&apos;s first correction is about the self: the atman cannot be killed. The five verses below are his plainest statements of it.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 2.20"
          sanskrit="न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः । अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे ॥"
          iast="na jāyate mriyate vā kadācin nāyaṃ bhūtvā bhavitā vā na bhūyaḥ | ajo nityaḥ śāśvato'yaṃ purāṇo na hanyate hanyamāne śarīre ||"
          meaningLabel="Translation"
          meaning="It is never born, and it never dies. It did not come into being, nor will it ever cease to be. Unborn, eternal, everlasting, ancient: it is not killed when the body is killed."
          insightLabel="Context"
          insight="Chapter 2, Krishna correcting Arjuna&apos;s fear of causing death. The body, the personality and the life story can end; the verse says the self was never born and cannot end."
          essence="The self is never born and never dies; it is not killed when the body is killed."
        />

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 2.23</div>
          <div className="quote-text">&ldquo;Weapons cannot cut it, fire cannot burn it, water cannot wet it, and wind cannot dry it.&rdquo;</div>
          <div className="quote-context">Chapter 2. Krishna names weapons, fire, water and wind, and denies each one power over the self.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 2.25</div>
          <div className="quote-text">&ldquo;The Self is said to be unmanifest, unthinkable, unchanging. Knowing it thus, you have no cause to grieve.&rdquo;</div>
          <div className="quote-context">Chapter 2, Krishna&apos;s direct instruction to Arjuna: the metaphysical truth removes the ground of your grief.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 2.27</div>
          <div className="quote-text">&ldquo;For one who is born, death is certain. For one who is dead, birth is certain. Therefore, do not grieve over what is unavoidable.&rdquo;</div>
          <div className="quote-context">Chapter 2, offered as a practical consolation that works even for someone who doubts the eternal self: death is certain for the born, so grieving it is misplaced.</div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 15.7"
          sanskrit="ममैवांशो जीवलोके जीवभूतः सनातनः । मनःषष्ठानीन्द्रियाणि प्रकृतिस्थानि कर्षति ॥"
          iast="mamaivāṃśo jīvaloke jīvabhūtaḥ sanātanaḥ | manaḥṣaṣṭhānīndriyāṇi prakṛtisthāni karṣati ||"
          meaningLabel="Translation"
          meaning="An eternal fragment of my own being becomes the individual self in the realm of the living, drawing to itself the mind and the five senses that abide in nature."
          insightLabel="Context"
          insight="Chapter 15. Krishna names the individual atman mamaivāṃśaḥ sanātanaḥ, an eternal part of himself. Commentators differ on how to read &apos;part&apos;: Advaita takes the separateness as only apparent, while Vaishnava schools take it as real."
          essence="An eternal part of Krishna becomes the living self and draws to itself the mind and senses."
        />

        <h2>On Detachment and Peace</h2>
        <p>
          The Gita&apos;s wise person is steady. Krishna calls this figure the <em>sthitaprajna</em>, the one of settled wisdom, and describes them at length in 2.55&ndash;72. Peace, in these verses, is compatible with activity; it comes from being undisturbed by outcomes.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 2.62"
          sanskrit="ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते । सङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते ॥"
          iast="dhyāyato viṣayānpuṃsaḥ saṅgasteṣūpajāyate | saṅgātsañjāyate kāmaḥ kāmātkrodho'bhijāyate ||"
          meaningLabel="Translation"
          meaning="Dwelling on objects of the senses breeds attachment. From attachment arises desire. From desire, anger is born."
          insightLabel="Context"
          insight="Chapter 2. Krishna&apos;s account of how a mind loses its peace begins with small, repeated dwelling. Attention breeds attachment, attachment breeds craving, and craving, thwarted, becomes anger. Verse 2.63 continues the chain down to ruin."
          essence="Dwelling on sense objects breeds attachment; attachment breeds desire, and desire, anger."
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
          <div className="quote-text">&ldquo;Content with whatever comes unsought, beyond the pairs of opposites, free from envy, equal in success and failure, even acting, he is not bound.&rdquo;</div>
          <div className="quote-context">Chapter 4. Krishna&apos;s working definition of freedom in action: content with what comes, and not tossed about by success or failure.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 6.7</div>
          <div className="quote-text">&ldquo;For the one who has mastered themselves and is at peace, the Supreme Self is directly present, in cold and heat, joy and sorrow, honor and dishonor.&rdquo;</div>
          <div className="quote-context">Chapter 6, on meditation. The steady person does not lose the divine when circumstances change.</div>
        </div>

        <h2>On Devotion</h2>
        <p>
          In chapters 7 through 12 Krishna speaks more of relationship than of metaphysics. Devotion, <em>bhakti</em>, asks for no complicated ritual or learning. It asks for the whole heart.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 9.22"
          sanskrit="अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते । तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् ॥"
          iast="ananyāścintayanto māṃ ye janāḥ paryupāsate | teṣāṃ nityābhiyuktānāṃ yogakṣemaṃ vahāmyaham ||"
          meaningLabel="Translation"
          meaning="For those who worship me with undivided mind, thinking of nothing else, ever united with me, I carry what they need and preserve what they have."
          insightLabel="Context"
          insight="Chapter 9. Yoga-kṣema means acquiring and keeping. For those who worship him with undivided minds, Krishna says, he brings what they lack and protects what they have (yoga-kṣemaṃ vahāmy aham)."
          essence="For those always devoted to me, I carry what they lack and preserve what they have."
        />

        <ShlokaCard
          verseRef="Bhagavad Gita 9.26"
          sanskrit="पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति । तदहं भक्त्युपहृतमश्नामि प्रयतात्मनः ॥"
          iast="patraṃ puṣpaṃ phalaṃ toyaṃ yo me bhaktyā prayacchati | tadahaṃ bhaktyupahṛtamaśnāmi prayatātmanaḥ ||"
          meaningLabel="Translation"
          meaning="A leaf, a flower, a fruit, water: whoever offers me these with devotion, offered from a pure heart, I accept."
          insightLabel="Context"
          insight="Chapter 9, on the accessibility of bhakti. Krishna answers the idea that only elaborate ritual reaches him. He says he accepts a leaf, a flower, a fruit or water, when it is offered with devotion."
          essence="A leaf, a flower, a fruit or water offered with devotion, Krishna accepts."
        />

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 9.31</div>
          <div className="quote-text">&ldquo;My devotee never perishes. Know this for certain, Arjuna: proclaim it aloud.&rdquo;</div>
          <div className="quote-context">Chapter 9. Krishna tells Arjuna to declare it boldly (pratijānīhi).</div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 12.13"
          sanskrit="अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च । निर्ममो निरहङ्कारः समदुःखसुखः क्षमी ॥"
          iast="adveṣṭā sarvabhūtānāṃ maitraḥ karuṇa eva ca | nirmamo nirahaṅkāraḥ samaduḥkhasukhaḥ kṣamī ||"
          meaningLabel="Translation"
          meaning="One who bears no ill-will to any being, who is friendly and compassionate, free from &lsquo;mine&rsquo; and &lsquo;I,&rsquo; equal in pain and pleasure, forgiving."
          insightLabel="Context"
          insight="Chapter 12, the first verse of Krishna's portrait of the devotee he calls dear. The list is about how the person treats others, how they hold gain and loss, and whether they carry enmity. In this chapter, devotion shows in character."
          essence="The devotee dear to Krishna bears no ill-will, is kind, and is free of &lsquo;mine&rsquo; and &lsquo;I&rsquo;."
        />

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 12.15</div>
          <div className="quote-text">&ldquo;One who does not disturb the world and is not disturbed by it, free from elation, envy, fear, and anxiety, that one is dear to me.&rdquo;</div>
          <div className="quote-context">Chapter 12, continuing the portrait of the devotee Krishna calls dear.</div>
        </div>

        <h2>On Meditation and the Mind</h2>
        <p>
          Chapter 6 is the Gita&apos;s meditation manual. Krishna teaches the seat, the posture and the technique, and then Arjuna raises the objection anyone who has tried to meditate raises (6.34). &ldquo;The mind is restless. Restraining it is like trying to hold the wind.&rdquo; Krishna&apos;s answer is 6.35.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 6.5"
          sanskrit="उद्धरेदात्मनात्मानं नात्मानमवसादयेत् । आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ॥"
          iast="uddhared ātmanātmānaṃ nātmānam avasādayet | ātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ ||"
          meaningLabel="Translation"
          meaning="Lift yourself by your own Self. Do not sink into despair. You alone are your friend, and you alone are your enemy."
          insightLabel="Context"
          insight="Chapter 6. The same self that pulls you down can lift you, and the next verse (6.6) says it is a friend to the one who has mastered it and an enemy to the one who has not."
          essence="Lift yourself by yourself; you are your own friend and your own enemy."
        />

        <ShlokaCard
          verseRef="Bhagavad Gita 6.35"
          sanskrit="असंशयं महाबाहो मनो दुर्निग्रहं चलम् । अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते ॥"
          iast="asaṃśayaṃ mahābāho mano durnigrahaṃ calam | abhyāsena tu kaunteya vairāgyeṇa ca gṛhyate ||"
          meaningLabel="Translation"
          meaning="Undoubtedly, the mind is restless and hard to control. But by consistent practice and by dispassion, it can be held."
          insightLabel="Context"
          insight="Chapter 6, Krishna's response to Arjuna's honest complaint that meditation is impossible. Krishna agrees it is difficult, and offers two tools: abhyāsa (steady practice) and vairāgya (dispassion)."
          essence="The mind is restless and hard to hold, but practice and dispassion can hold it."
        />

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 6.19</div>
          <div className="quote-text">&ldquo;As a lamp in a windless place does not flicker, that is the image of the yogi whose mind is controlled and rests in the Self.&rdquo;</div>
          <div className="quote-context">Chapter 6, an image of the meditating mind held still.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 6.26</div>
          <div className="quote-text">&ldquo;Wherever the restless, unsteady mind wanders, from there let one bring it back and place it in the Self.&rdquo;</div>
          <div className="quote-context">Chapter 6. The meditation instruction in one sentence: each time the mind wanders, bring it back.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 6.30</div>
          <div className="quote-text">&ldquo;One who sees me everywhere and sees everything in me, I am never lost to them, and they are never lost to me.&rdquo;</div>
          <div className="quote-context">Chapter 6. The fruit of meditation here is seeing Krishna in everything.</div>
        </div>

        <h2>On Wisdom and Knowledge</h2>
        <p>
          Krishna presents himself as the source of an old teaching that he is now restoring. Chapter 4 traces it back through a line of kings to Vivasvān, the sun (4.1&ndash;2). The verses below trace how Krishna talks about knowledge itself.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 4.7"
          sanskrit="यदा यदा हि धर्मस्य ग्लानिर्भवति भारत । अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥"
          iast="yadā yadā hi dharmasya glānir bhavati bhārata | abhyutthānam adharmasya tadātmānaṃ sṛjāmyaham ||"
          meaningLabel="Translation"
          meaning="Whenever dharma declines and adharma rises, Arjuna, I bring myself forth."
          insightLabel="Context"
          insight="Chapter 4. Krishna&apos;s best-known statement of the avatar doctrine: when dharma declines badly enough, he takes birth to restore it."
          essence="Whenever dharma declines and adharma rises, Krishna brings himself forth."
        />

        <ShlokaCard
          verseRef="Bhagavad Gita 4.8"
          sanskrit="परित्राणाय साधूनां विनाशाय च दुष्कृताम् । धर्मसंस्थापनार्थाय सम्भवामि युगे युगे ॥"
          iast="paritrāṇāya sādhūnāṃ vināśāya ca duṣkṛtām | dharmasaṃsthāpanārthāya sambhavāmi yuge yuge ||"
          meaningLabel="Translation"
          meaning="To protect the good, to destroy the wicked, to re-establish dharma, I come into being, age after age."
          insightLabel="Context"
          insight="Chapter 4, immediately following BG 4.7. Krishna gives three purposes: protect the good, destroy the wicked, and re-establish dharma. Yuge yuge, age after age, makes his coming recurrent."
          essence="To protect the good, destroy the wicked and restore dharma, Krishna comes age after age."
        />

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 4.37</div>
          <div className="quote-text">&ldquo;As a blazing fire reduces wood to ash, the fire of knowledge reduces all karmas to ash.&rdquo;</div>
          <div className="quote-context">Chapter 4. Self-knowledge, once it comes, burns up the karma of past actions.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 4.38</div>
          <div className="quote-text">&ldquo;Nothing in this world purifies like knowledge. One who is perfected in yoga finds it within, in due course, by their own effort.&rdquo;</div>
          <div className="quote-context">Chapter 4. The verse says the one perfected in yoga finds this knowledge in themselves, in time.</div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 7.7"
          sanskrit="मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय । मयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव ॥"
          iast="mattaḥ parataraṃ nānyat kiñcid asti dhanañjaya | mayi sarvam idaṃ protaṃ sūtre maṇigaṇā iva ||"
          meaningLabel="Translation"
          meaning="There is nothing higher than me, Arjuna. All this is strung on me like pearls on a thread."
          insightLabel="Context"
          insight="Chapter 7. The image is of a thread holding pearls: things are strung on Krishna and held together by him. The thread is unseen, and without it the pearls fall apart."
          essence="Nothing is higher than Krishna; all this is strung on him like pearls on a thread."
        />

        <h2>On Fear and Grief</h2>
        <p>
          Arjuna&apos;s original problem is fear disguised as compassion. Much of the first two chapters is Krishna dismantling the disguise. The verses below are Krishna&apos;s plainest lines about fear and grief. Some argue Arjuna out of them; others offer him refuge instead.
        </p>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 2.14</div>
          <div className="quote-text">&ldquo;The contact of the senses with objects gives cold and heat, pleasure and pain. They come and go; they are impermanent. Learn to bear them, Arjuna.&rdquo;</div>
          <div className="quote-context">Chapter 2. Krishna says sensations of heat and cold, pleasure and pain, come and go, and asks Arjuna to bear them.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 2.38</div>
          <div className="quote-text">&ldquo;Treating pleasure and pain, gain and loss, victory and defeat as equal, engage in battle. This way you will not incur sin.&rdquo;</div>
          <div className="quote-context">Chapter 2, a direct instruction on equanimity. The battle is the specific one on Kurukshetra; the principle is universal.</div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 11.55"
          sanskrit="मत्कर्मकृन्मत्परमो मद्भक्तः सङ्गवर्जितः । निर्वैरः सर्वभूतेषु यः स मामेति पाण्डव ॥"
          iast="matkarmakṛn matparamo madbhaktaḥ saṅgavarjitaḥ | nirvairaḥ sarvabhūteṣu yaḥ sa mām eti pāṇḍava ||"
          meaningLabel="Translation"
          meaning="One who works for me, holds me as the highest, is devoted to me, free of attachment and without enmity toward any being, that one comes to me, Arjuna."
          insightLabel="Context"
          insight="Chapter 11, the last verse after the cosmic vision. Arjuna has just seen Krishna's terrible universal form. Here Krishna gives the way back to him after the vision of himself as time. Śaṅkara&apos;s commentary treats this verse as the essence of the whole Gita."
          essence="Whoever works for me, devoted, unattached and without enmity toward any being, comes to me."
        />

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 18.58</div>
          <div className="quote-text">&ldquo;Fix your mind on me, and by my grace you will cross every difficulty. If, through egoism, you refuse to listen, you will be lost.&rdquo;</div>
          <div className="quote-context">Chapter 18. Near the end, Krishna warns Arjuna that the offer has to be taken up.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 18.66</div>
          <div className="quote-text">&ldquo;Abandon every duty, take refuge in me alone. I will free you from all sins. Do not grieve.&rdquo;</div>
          <div className="quote-context">Chapter 18, Krishna&apos;s last instruction. The closing section of this article looks at it more closely.</div>
        </div>

        <h2>On Character</h2>
        <p>
          Chapter 16 divides human tendencies into two: the divine and the demonic. It lists, quality by quality, what a good person looks like. Chapter 12 does the same in the devotional key. The five below are Krishna&apos;s specifications for character.
        </p>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 16.1</div>
          <div className="quote-text">&ldquo;Fearlessness, purity of heart, steadiness in knowledge and yoga, generosity, self-control, sacrifice, study, austerity, straightforwardness&hellip;&rdquo;</div>
          <div className="quote-context">Chapter 16, the opening of Krishna&apos;s list of divine qualities, which begins with fearlessness.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 16.2</div>
          <div className="quote-text">&ldquo;Non-violence, truthfulness, freedom from anger, renunciation, tranquility, absence of slander, compassion for all beings, freedom from greed, gentleness, modesty, steadiness&hellip;&rdquo;</div>
          <div className="quote-context">Chapter 16, continuing the list. Compassion and gentleness sit next to steadiness on the same list.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 16.3</div>
          <div className="quote-text">&ldquo;Vigor, forgiveness, fortitude, cleanliness, freedom from malice, freedom from pride, these are the qualities of one born to the divine state.&rdquo;</div>
          <div className="quote-context">Chapter 16, closing the divine qualities list. Forgiveness and vigour appear side by side.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 12.14</div>
          <div className="quote-text">&ldquo;Ever content, steady in meditation, self-controlled, firm in conviction, with mind and intellect surrendered to me, my devotee is dear to me.&rdquo;</div>
          <div className="quote-context">Chapter 12. Contentment comes first in this verse.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 12.17</div>
          <div className="quote-text">&ldquo;One who neither rejoices nor hates, neither mourns nor desires, who has given up both good and bad, filled with devotion, that one is dear to me.&rdquo;</div>
          <div className="quote-context">Chapter 12. A demanding line in the devotee portrait: no rejoicing, hating, mourning or desiring.</div>
        </div>

        <h2>On Surrender</h2>
        <p>
          Surrender in the Gita is a specific act, later called <em>sharanagati</em> in the Vaishnava traditions, in which the devotee stops trying to secure themselves through their own efforts and takes refuge in the divine. Each of the five verses below asks for refuge in Krishna.
        </p>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 18.66</div>
          <div className="quote-text">&ldquo;Abandon every duty, take refuge in me alone. I will free you from all sins. Do not grieve.&rdquo;</div>
          <div className="quote-context">Chapter 18. The Śrī Vaiṣṇava tradition calls it the <em>charama shloka</em>, the ultimate verse. It is Krishna&apos;s last instruction, though not the last verse of the Gita, which is 18.78.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 18.62</div>
          <div className="quote-text">&ldquo;Take refuge in him alone with your whole being. By his grace, you will attain the supreme peace and the eternal abode.&rdquo;</div>
          <div className="quote-context">Chapter 18, four verses before the final teaching. Krishna is building up to 18.66 by asking for whole-being refuge.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 9.34</div>
          <div className="quote-text">&ldquo;Fix your mind on me, be devoted to me, sacrifice to me, bow to me. Uniting yourself thus, you will come to me.&rdquo;</div>
          <div className="quote-context">Chapter 9, the closing verse of the &ldquo;royal knowledge&rdquo; chapter. Krishna repeats its first line almost exactly in 18.65.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 7.14</div>
          <div className="quote-text">&ldquo;My divine maya, made of the three gunas, is difficult to cross. But those who take refuge in me alone cross beyond it.&rdquo;</div>
          <div className="quote-context">Chapter 7. Māyā, the illusion that binds, is crossed by taking refuge in Krishna.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 8.7</div>
          <div className="quote-text">&ldquo;Therefore at all times remember me and fight. With mind and intellect fixed on me, you will surely come to me.&rdquo;</div>
          <div className="quote-context">Chapter 8. Krishna asks Arjuna to remember him and fight at the same time.</div>
        </div>

        <h2>On the Divine Everywhere</h2>
        <p>
          In chapters 7 and 10 Krishna describes himself as woven into the world: the taste of water, the light of the sun, the intelligence of the intelligent. These verses are the Gita&apos;s answer to the question, &ldquo;Where is Bhagavan?&rdquo; The answer is: look at what you are already looking at, but see it correctly.
        </p>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 7.8</div>
          <div className="quote-text">&ldquo;I am the taste in water, Arjuna. I am the light in the sun and the moon. I am the sacred syllable Om in every Veda, the sound in ether, the courage in men.&rdquo;</div>
          <div className="quote-context">Chapter 7, a much-loved passage. Krishna points to the taste in your glass of water.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 7.9</div>
          <div className="quote-text">&ldquo;I am the pure fragrance of the earth and the brilliance in fire. I am the life of every being and the austerity in ascetics.&rdquo;</div>
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
          <div className="quote-context">Chapter 10. Krishna places himself in the heart of every being.</div>
        </div>

        <div className="quote-inline">
          <div className="quote-ref">Bhagavad Gita 10.41</div>
          <div className="quote-text">&ldquo;Whatever is glorious, whatever is beautiful, whatever is mighty, know that as arising from a spark of my splendor.&rdquo;</div>
          <div className="quote-context">Chapter 10, closing the vibhuti list. Krishna says everything rests in him (7.7); every excellence is a spark of him (10.41).</div>
        </div>

        <div className="pull-quote">
          One verse appears twice in this list, under fear and grief and again under surrender: 18.66.
        </div>

        <h2>The Last Instruction</h2>
        <p>
          BG 2.47 and BG 2.20 turn up on quote cards everywhere. BG 18.66, Krishna&apos;s last instruction, is just as widely quoted in devotional settings, but it rarely appears as a motivational graphic, because it asks for something the other verses do not.
        </p>

        <p>
          BG 18.66: <em>sarva-dharmān parityajya mām ekaṃ śaraṇaṃ vraja | ahaṃ tvā sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ</em>. &ldquo;Abandon every duty and take refuge in me alone. I will free you from all sins. Do not grieve.&rdquo; After chapters on what to do (act, meditate, worship, cultivate character, know the self), Krishna asks Arjuna to give up every dharma and rely on him alone. Commentators have long argued over what &ldquo;all dharmas&rdquo; covers.
        </p>

        <p>
          The verse asks the devotee for trust in place of more effort, which makes a poor productivity tip. It ends with <em>mā śucaḥ</em>, do not grieve, which answers the grief Arjuna showed in Chapter 1.
        </p>

        <div className="hindi-block">
          <div className="hindi-label">The Charama Shloka in Hindi</div>
          <div className="hindi-text">
            सब धर्मों को त्यागकर तू केवल मेरी शरण में आ। मैं तुझे सब पापों से मुक्त कर दूँगा &mdash; तू शोक मत कर।
          </div>
        </div>

        <h2>How to Use These</h2>
        <p>
          Fifty quotes is more than anyone can carry at once. A practical way to let a few of them stay with you:
        </p>

        <ul className="practice-list">
          <li>
            <span><strong>Memorize BG 2.47 and BG 18.66.</strong> One verse on how to act, one on refuge.</span>
          </li>
          <li>
            <span><strong>One verse a morning, for ten days.</strong> Choose one theme from the ten in this article. Sit with one verse each morning for ten days. Do not race.</span>
          </li>
          <li>
            <span><strong>Match the verse to the moment.</strong> If you are anxious about outcomes, return to BG 2.47; if you are grieving a loss, BG 2.20 or 2.27; if you are worn down by too many obligations, BG 18.66; if you feel far from the divine, BG 7.8, and notice the taste of the water in your glass.</span>
          </li>
          <li>
            <span><strong>Do not stop at the quote.</strong> Every verse here has ten verses around it that give it context. If a line pulls at you, read the twenty verses on either side of it. </span>
          </li>
          <li>
            <span><strong>Keep one verse where you will see it.</strong> Let it be the one you return to when your mind slips, and replace it when it stops helping.</span>
          </li>
        </ul>
      </div>


      <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected the order of Krishna&apos;s first teaching (the atman comes first, in 2.11&ndash;30), the 9.22 tagline, the description of 18.66 (Krishna&apos;s last instruction; the last verse is 18.78) and the 10.41 note; removed the unsourced &ldquo;seed verse&rdquo; label for 15.7 and the claim that 18.66 is rarely quoted; copy edited.</p>
      <FeedbackWidget pageType="blog" />
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>What is the most famous Krishna quote from the Bhagavad Gita?</strong>
          <p>
            The most famous Krishna quote is BG 2.47: <em>karmaṇyevādhikāraste mā phaleṣu kadācana</em>: &ldquo;You have the right to your action, but never to its fruits.&rdquo; It is Krishna&apos;s core instruction on karma yoga: act fully, release the outcome, do not use non-attachment as an excuse for inaction. Two other verses are almost as widely quoted: BG 2.20 (the imperishable self) and BG 18.66 (surrender).
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
            The Bhagavad Gita has little to say about romantic love. Krishna&apos;s word for love is <em>bhakti</em>, a devotion that joins the individual to the divine. BG 9.29 says Krishna is equal to all beings, but those who worship him with love, he is in them and they in him. BG 12.13&ndash;19 lists the qualities of the devotee who is &ldquo;dear&rdquo; to Krishna: free from ill-will, compassionate, equal-minded, steady.
          </p>
        </div>

        <div className="faq-item">
          <strong>What is Krishna&apos;s quote about karma?</strong>
          <p>
            Krishna&apos;s foundational teaching on karma is BG 2.47: act without attachment to fruit. He extends this in BG 3.19 (&ldquo;perform action without attachment; that way one attains the highest&rdquo;), BG 4.20 (&ldquo;having abandoned attachment to fruits, ever content, dependent on nothing, he does nothing at all even while acting&rdquo;), and BG 18.11 (&ldquo;one who has renounced the fruit of action is called a true renunciate&rdquo;). Karma yoga is action performed without craving for its fruit.
          </p>
        </div>

        <div className="faq-item">
          <strong>Which Krishna quote is the most important?</strong>
          <p>
            BG 18.66 (<em>sarva-dharmān parityajya mām ekaṃ śaraṇaṃ vraja</em>) is called the <em>charama shloka</em>, the ultimate verse, in the Śrī Vaiṣṇava tradition. It is Krishna&apos;s last instruction: abandon all dharmas, take refuge in me alone, I will free you from all sins, do not grieve. Others give that place to 2.47; there is no single agreed answer.
          </p>
        </div>

        <div className="faq-item">
          <strong>How should I use Krishna quotes in daily life?</strong>
          <p>
            Read one verse in the morning with its Sanskrit, translation, and short commentary. Sit with it before starting your day. Apply one verse at a time. The Gita works slowly, on how you meet action, fear and loss. Return to the same verse for a week if it pulls at you. Memorize BG 2.47 and BG 18.66. Any other verse is a bonus.
          </p>
        </div>
      </div>

      <div className="content" style={{ paddingTop: 0 }}>
        <VerseFunnelCTA variant="chapter" locale="en" pageName={"Krishna Quotes 50 Teachings"} />
      </div>

      <footer>
        <p>© 2026 Wisdom App. Bhagavad Gita, tuned to your life.</p>
        <p><a href="https://wisdomquotes.in">Home</a> — <a href="https://wisdomquotes.in/blogs">Blog</a> — <a href={appStoreUrl('web_blog_footer')} target="_blank" rel="noopener" data-mp-location="footer">Download</a></p>
      </footer>

      <BlogTracker pageName="Krishna Quotes 50 Teachings" />
    </>
  )
}
