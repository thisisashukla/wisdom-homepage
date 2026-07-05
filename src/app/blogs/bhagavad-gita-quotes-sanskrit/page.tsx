import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import ShlokaCard from '@/components/gita/ShlokaCard'

export const metadata: Metadata = {
  title: "Bhagavad Gita Quotes in Sanskrit — 30 Famous Verses with Hindi & English Meaning | Wisdom",
  description: "The most famous Bhagavad Gita quotes in original Sanskrit (Devanagari), with IAST transliteration, Hindi meaning, and English translation. Karma, atman, bhakti, and the verses every seeker returns to.",
  keywords: "bhagavad gita quotes in sanskrit, bhagwat geeta shlok in sanskrit, gita shlok sanskrit, bhagavad gita verses in sanskrit, gita quotes sanskrit with meaning, geeta shloka in sanskrit with hindi meaning, one line gita quotes sanskrit, bhagavad gita famous verses, karmanye vadhikaraste, sarva dharman parityajya",
  openGraph: {
    title: "Bhagavad Gita Quotes in Sanskrit — 30 Famous Verses | Wisdom",
    description: "The most famous Gita verses in Devanagari, with IAST, Hindi, and English meaning. Karma, atman, bhakti, and the verses every seeker returns to.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagavad-gita-quotes-sanskrit",
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/bhagavad-gita-quotes-sanskrit" },
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
            content: "श्लोक";
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

        .chapter-essence-grid { display: grid; grid-template-columns: 1fr; gap: 14px; margin: 2rem 0 2.5rem; }
        .chapter-essence-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 10px; padding: 18px 22px; display: grid; grid-template-columns: 68px 1fr; gap: 18px; align-items: baseline; }
        .chapter-essence-num { font-family: "Playfair Display", serif; font-size: 28px; color: var(--gold); font-weight: 700; line-height: 1; }
        .chapter-essence-num small { display: block; font-size: 9.5px; letter-spacing: 0.14em; color: var(--text-dimmer); font-family: 'Inter', sans-serif; font-weight: 600; margin-top: 4px; text-transform: uppercase; }
        .chapter-essence-title { font-family: "Playfair Display", serif; font-size: 15px; color: var(--gold-light); font-weight: 600; margin-bottom: 6px; }
        .chapter-essence-title em { font-style: italic; color: var(--text); font-weight: 500; }
        .chapter-essence-body { font-size: 14px; color: var(--text-dim); line-height: 1.65; }

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
            .chapter-essence-card { grid-template-columns: 1fr; gap: 8px; padding: 16px 18px; }
            .chapter-essence-num { font-size: 22px; }
        }
`

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Bhagavad Gita Quotes in Sanskrit — 30 Famous Verses with Hindi and English Meaning",
    "description": "The most famous Bhagavad Gita quotes in original Sanskrit (Devanagari), with IAST transliteration, Hindi meaning, and English translation. Karma, atman, bhakti — the verses every seeker returns to.",
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
        "name": "Which is the most famous verse of the Bhagavad Gita in Sanskrit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The most famous Sanskrit verse is BG 2.47: karmaṇyevādhikāraste mā phaleṣu kadācana. In Devanagari: कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। It means, 'You have the right to act, but never to the fruits of action.' It is the seed verse of karma yoga and probably the single most-cited line from any Indian scripture. BG 18.66 (sarva-dharmān parityajya) is a close second because it is Krishna's final instruction — the parting sentence of the entire dialogue."
        }
      },
      {
        "@type": "Question",
        "name": "Should I read Gita quotes in Sanskrit or Hindi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Both, in that order. The Sanskrit is the source — the meter, the sound, and the exact word-choices Krishna is portrayed as speaking. Reading only the Hindi or English translation is like reading only the sheet music of a raga without hearing it. Chant the Sanskrit first, then read the Hindi meaning to understand, then the English translation to bridge cultures. The Sanskrit carries something the translations cannot: the anuṣṭubh meter itself is part of the teaching."
        }
      },
      {
        "@type": "Question",
        "name": "How do I pronounce Sanskrit Gita verses correctly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Three quick rules. First, 'a' at the end of a word is short (nearly swallowed) — so कर्म is 'kar-ma,' not 'kar-maa.' Second, aspirated consonants (kh, gh, ch, jh, ṭh, ḍh, ph, bh) genuinely have a breathy release — bhakti has real air after the 'bh.' Third, long vowels (ā, ī, ū) are held twice as long as short vowels. If you can, listen to a Gita Press or Krishnamacharya recording alongside reading. Even a week of listening changes how the shlokas sit in your mouth."
        }
      },
      {
        "@type": "Question",
        "name": "What does 'karmaṇyevādhikāraste' mean word by word?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Karmaṇi means 'in action.' Eva means 'only.' Adhikāraḥ means 'right' or 'authority.' Te means 'yours.' The whole line — karmaṇyevādhikāraste — literally reads: 'Only in action is your right.' The second half completes the thought: mā phaleṣu kadācana — 'never in the fruits.' Krishna is drawing a clean line: you have jurisdiction over what you do, none over what your action yields. The rest of the shloka closes the escape hatches."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between a shloka and a mantra?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A shloka (श्लोक) is a Sanskrit verse form — typically two lines of sixteen syllables each, in the anuṣṭubh meter. The Bhagavad Gita is composed almost entirely of shlokas. A mantra (मन्त्र) is a syllable, word, or phrase used as an instrument of consciousness — designed to be repeated, often ritually. All mantras are Sanskrit; not all shlokas are mantras. But many Gita shlokas — 2.47, 15.7, 18.66 — are traditionally used as mantras because chanting them itself is considered transformative."
        }
      },
      {
        "@type": "Question",
        "name": "What is the oldest surviving translation of the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The oldest surviving commentary in Sanskrit is Adi Shankaracharya's Bhāṣya, from roughly the 8th century CE. The oldest translation into a European language is Charles Wilkins' English rendering, published in London in 1785 — this is the version Emerson, Thoreau, and Warren Hastings read. Wilhelm von Humboldt called the Gita 'the most beautiful, perhaps the only true philosophical song in any known tongue.' Persian translations by Dara Shukoh's circle predate Wilkins but the Sanskrit-into-English lineage begins in 1785."
        }
      }
    ]
  }
]

export default function BhagavadGitaQuotesSanskritPage() {
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
          Bhagavad Gita Quotes in Sanskrit
        </div>
      </div>

      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · 30 Verses in Sanskrit
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            Bhagavad Gita Quotes in Sanskrit &mdash;<br />
            <em>30 Famous Verses with Hindi &amp; English Meaning</em>
          </h1>
          <p className="article-subtitle">
            Most Gita quotes online strip away the Sanskrit. This piece restores it &mdash; thirty of the most-loved verses in Devanagari, with IAST transliteration, Hindi meaning, and English translation.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
            <span className="meta-sep">·</span>
            <span className="meta-item">30 Verses · 6 Themes</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~18 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item" style={{ fontStyle: 'italic' }}>Sanskrit text follows Gita Press &amp; ISKCON canon. English translations edited by Ankur Shukla. Hindi meaning drafted with AI, human-reviewed. Published July 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
          </div>
        </div>
      </div>

      <div className="content">
        <figure className="chapter-image">
          <img
            src="/assets/chapter2.webp"
            alt="Krishna instructing Arjuna in the original Sanskrit verses of the Bhagavad Gita"
            width="1200"
            height="675"
            loading="eager"
            fetchPriority="high"
          />
          <figcaption>The verses in the tongue Krishna is portrayed as speaking &mdash; Sanskrit, first</figcaption>
        </figure>

        <p className="lead">
          Almost every Bhagavad Gita quote you have read online has been stripped of its Sanskrit. Someone extracted the English meaning, wrote it on a sunset background, and let the original disappear. What was lost is not decoration. It is the meter, the sound, the exact word Krishna is portrayed as choosing. This piece restores it. Thirty of the most-loved verses in the original Devanagari, with IAST transliteration for pronunciation, a careful Hindi meaning, and an English translation that stays close to the text.
        </p>
        <p>
          The Sanskrit matters for three reasons. First, sound. The Gita is composed almost entirely in the <em>anuṣṭubh</em> meter &mdash; two lines of sixteen syllables each. Chanted, it moves like breath. Second, precision. Words like <em>dharma</em>, <em>karma</em>, <em>ātman</em>, and <em>yoga</em> carry ranges of meaning no single English word can hold. Reading them in Sanskrit is reading them at full resolution. Third, roots. Sanskrit is transparent in a way modern languages rarely are &mdash; <em>karmaṇi</em> lets you feel the root <em>kṛ</em> (to do) inside the noun. That transparency is part of the teaching.
        </p>

        <div className="highlight-box">
          <h3>What you will find in this piece</h3>
          <p>
            Thirty famous verses, arranged in six themes of five verses each: duty and action, the eternal Self, devotion, the divine, peace and the mind, and fear and grief. Every verse in Devanagari, IAST, Hindi meaning, and English translation. A short argument at the end for which single verse could stand for the whole Gita. And a practical guide to memorizing them without turning it into a chore.
          </p>
        </div>

        <h2>How These Verses Are Presented</h2>
        <p>
          Each verse below is given in four forms. First, <strong>Devanagari</strong> &mdash; the original script, with the two <em>pādas</em> (half-verses) separated by a single daṇḍa (।) and closed by a double daṇḍa (॥). Second, <strong>IAST transliteration</strong> &mdash; the International Alphabet of Sanskrit Transliteration, which lets a reader without Devanagari fluency pronounce the verse accurately. IAST uses diacritics: ā is a long &lsquo;a,&rsquo; ṇ is a retroflex &lsquo;n,&rsquo; ś is a palatal &lsquo;sh.&rsquo;
        </p>
        <p>
          Third, an <strong>English translation</strong> that stays close to the Sanskrit rather than paraphrasing for style. Fourth, a <strong>Hindi meaning</strong> (हिन्दी अर्थ) in Devanagari &mdash; because for many Indian readers, Hindi is the bridge language that carries the emotional weight the English translation cannot. Where I have leaned on a particular commentator &mdash; usually Shankaracharya, Ramanuja, or the Gita Press edition &mdash; the choice is noted in the &ldquo;why it matters&rdquo; commentary. The verses themselves follow the canonical text used by Gita Press and ISKCON, which agrees with almost every printed edition available in India.
        </p>

        <h2>The Verses</h2>
        <p>
          Six themes, five verses each. The order inside each theme is roughly the order in which the verses appear in the Gita, so the argument develops as you read. If you have twenty minutes today, read one theme carefully. If you have five, chant the Devanagari of one verse and let it sit.
        </p>

        <h3>On Duty and Action (कर्म)</h3>
        <p>
          The five most-quoted verses of karma yoga. Together they form Krishna&apos;s complete answer to the question Arjuna is really asking: how do I act, when action itself has become unbearable?
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 2.47"
          sanskrit="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥"
          iast="karmaṇyevādhikāraste mā phaleṣu kadācana | mā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi ||"
          meaningLabel="English"
          meaning="You have the right to action alone, never to its fruits. Do not let the fruit be your motive, nor cling to inaction."
          insightLabel="Why It Matters"
          insight="Thirty-two syllables that contain the whole of karma yoga. Four instructions in one verse: act, do not claim the outcome, do not make the outcome your motive, do not use any of that as an excuse to give up action. The fourth line closes the escape hatch every reader tries to slip through."
          essence="Perform the action. Release the fruit. Do not disengage."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            तुम्हारा अधिकार केवल कर्म करने में है, उसके फलों में कभी नहीं। इसलिए फल की इच्छा को अपने कर्म का कारण मत बनाओ, और कर्म न करने में भी आसक्ति मत रखो।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 3.5"
          sanskrit="न हि कश्चित्क्षणमपि जातु तिष्ठत्यकर्मकृत् । कार्यते ह्यवशः कर्म सर्वः प्रकृतिजैर्गुणैः ॥"
          iast="na hi kaścitkṣaṇamapi jātu tiṣṭhatyakarmakṛt | kāryate hyavaśaḥ karma sarvaḥ prakṛtijairguṇaiḥ ||"
          meaningLabel="English"
          meaning="No one, not even for a moment, ever stands without acting. Everyone is helplessly driven to act by the forces born of nature."
          insightLabel="Why It Matters"
          insight="Krishna closes the door on renunciation-as-escape. The idea that you could simply stop acting is a fantasy. Being embodied means moving, choosing, reacting. The three guṇas keep the body in motion whether you consent or not. The only real question is whether that motion is offering or bondage."
          essence="You cannot not act. Choose the quality of your action."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            निश्चय ही कोई भी मनुष्य क्षण भर के लिए भी बिना कर्म किए नहीं रह सकता। सभी प्राणी प्रकृति से उत्पन्न गुणों के द्वारा विवश होकर कर्म करने के लिए बाध्य हैं।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 3.35"
          sanskrit="श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् । स्वधर्मे निधनं श्रेयः परधर्मो भयावहः ॥"
          iast="śreyānsvadharmo viguṇaḥ paradharmātsvanuṣṭhitāt | svadharme nidhanaṃ śreyaḥ paradharmo bhayāvahaḥ ||"
          meaningLabel="English"
          meaning="Better one&apos;s own dharma imperfectly done than another&apos;s dharma done perfectly. Better even to die in one&apos;s own dharma; another&apos;s dharma brings danger."
          insightLabel="Why It Matters"
          insight="The Gita&apos;s cure for envy. There is no borrowed life you can live better than your own. Doing your own duty badly is still closer to the truth of you than performing someone else&apos;s brilliantly. This is the verse to remember when you catch yourself measuring your life against someone whose life was never yours to live."
          essence="Your own duty, imperfectly done, is your only real path."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            अपने धर्म का पालन गुणरहित होने पर भी दूसरे के धर्म से श्रेष्ठ है, जिसका बड़ी अच्छी तरह पालन किया गया हो। अपने धर्म में मरना भी कल्याणकारक है, परधर्म भय देने वाला है।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 4.20"
          sanskrit="त्यक्त्वा कर्मफलासङ्गं नित्यतृप्तो निराश्रयः । कर्मण्यभिप्रवृत्तोऽपि नैव किञ्चित्करोति सः ॥"
          iast="tyaktvā karmaphalāsaṅgaṃ nityatṛpto nirāśrayaḥ | karmaṇyabhipravṛtto'pi naiva kiñcitkaroti saḥ ||"
          meaningLabel="English"
          meaning="Having relinquished attachment to the fruits of action, ever content, dependent on nothing &mdash; though fully engaged in action, such a one does nothing at all."
          insightLabel="Why It Matters"
          insight="A paradox that unlocks 2.47. Once the craving for outcome is released, action loses its karmic weight. The person is still visibly doing things &mdash; farming, teaching, fighting &mdash; but inwardly nothing is being &lsquo;done&rsquo; because there is no doer clinging to the result. This is what karma yoga looks like from the inside."
          essence="Release the fruit and even the fullest action leaves no residue."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            जो पुरुष कर्मों में फल की आसक्ति को त्यागकर सदा तृप्त और किसी के आश्रित नहीं है, वह कर्म में भली-भाँति संलग्न रहते हुए भी वास्तव में कुछ नहीं करता।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 18.47"
          sanskrit="श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् । स्वभावनियतं कर्म कुर्वन्नाप्नोति किल्बिषम् ॥"
          iast="śreyānsvadharmo viguṇaḥ paradharmātsvanuṣṭhitāt | svabhāvaniyataṃ karma kurvannāpnoti kilbiṣam ||"
          meaningLabel="English"
          meaning="Better one&apos;s own dharma imperfectly done than another&apos;s dharma performed well. Performing the work ordained by one&apos;s own nature, one incurs no sin."
          insightLabel="Why It Matters"
          insight="Krishna returns to sva-dharma near the very end of the Gita, and adds a second half that 3.35 did not have: work rooted in your svabhāva &mdash; your nature &mdash; does not stain you. This is the pastoral version of karma yoga. Do the work that fits your grain. The universe will hold you blameless."
          essence="The work born of your nature never leaves a stain."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            दूसरे के अच्छी तरह से पालन किए गए धर्म से गुणरहित अपना धर्म श्रेष्ठ है। अपने स्वभाव के अनुसार निश्चित किए गए कर्म को करते हुए मनुष्य पाप को प्राप्त नहीं होता।
          </div>
        </div>

        <div className="pull-quote">
          Five verses on action &mdash; and Krishna keeps circling one instruction: your work is yours, do it, and let go of what comes after.
        </div>

        <h3>On the Eternal Self (आत्मन्)</h3>
        <p>
          The metaphysical spine of the Gita. Arjuna&apos;s grief in chapter 1 is grief for people he loves. Krishna&apos;s first move is to reset what &ldquo;person&rdquo; even means. Death, in the Gita, is a wardrobe change.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 2.20"
          sanskrit="न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः । अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे ॥"
          iast="na jāyate mriyate vā kadācin nāyaṃ bhūtvā bhavitā vā na bhūyaḥ | ajo nityaḥ śāśvato'yaṃ purāṇo na hanyate hanyamāne śarīre ||"
          meaningLabel="English"
          meaning="The Self is never born and never dies. It did not come into being, and it will not come into being again. Unborn, eternal, ever-present, ancient &mdash; it is not slain when the body is slain."
          insightLabel="Why It Matters"
          insight="Perhaps the most direct statement of the ātman&apos;s nature anywhere in Indian philosophy. Every negation matters: not born, not dying, not becoming, not ceasing. The verse dismantles fear at its root. What you truly are was not made, and cannot be unmade. Everything the body undergoes is undergone by a garment, not by you."
          essence="You were not born. You will not die. Only the garment changes."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            यह आत्मा किसी काल में भी न जन्मता है और न मरता है। न यह उत्पन्न होकर फिर होने वाला है। यह अजन्मा, नित्य, सनातन और पुरातन है, शरीर के मारे जाने पर भी यह नहीं मारा जाता।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 2.22"
          sanskrit="वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि । तथा शरीराणि विहाय जीर्णान्यन्यानि संयाति नवानि देही ॥"
          iast="vāsāṃsi jīrṇāni yathā vihāya navāni gṛhṇāti naro'parāṇi | tathā śarīrāṇi vihāya jīrṇānyanyāni saṃyāti navāni dehī ||"
          meaningLabel="English"
          meaning="As a person casts off worn-out clothes and puts on new ones, so the embodied Self casts off worn-out bodies and enters others that are new."
          insightLabel="Why It Matters"
          insight="The most tender image in the entire Gita. Krishna is not asking Arjuna to be brave. He is offering him a picture: what he calls &lsquo;death&rsquo; is a change of clothes. The verse is quoted at almost every Hindu funeral. It does not deny loss; it repositions it. The clothes were never who they were."
          essence="Bodies are garments. The wearer walks on."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            जैसे मनुष्य पुराने वस्त्रों को त्यागकर नए वस्त्र धारण कर लेता है, वैसे ही देही (आत्मा) पुराने शरीरों को त्यागकर दूसरे नए शरीरों को प्राप्त हो जाती है।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 2.23"
          sanskrit="नैनं छिन्दन्ति शस्त्राणि नैनं दहति पावकः । न चैनं क्लेदयन्त्यापो न शोषयति मारुतः ॥"
          iast="nainaṃ chindanti śastrāṇi nainaṃ dahati pāvakaḥ | na cainaṃ kledayantyāpo na śoṣayati mārutaḥ ||"
          meaningLabel="English"
          meaning="Weapons cannot cut it, fire cannot burn it, water cannot wet it, wind cannot dry it."
          insightLabel="Why It Matters"
          insight="Four elements, four verbs, one message. Whatever tools the world uses to break things &mdash; blade, flame, flood, storm &mdash; touch only what is touchable. The Self is not that. This shloka is chanted at cremations for a reason: it names the one thing the fire cannot claim."
          essence="No element in the universe can reach what you truly are."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            इस आत्मा को शस्त्र नहीं काट सकते, अग्नि इसे जला नहीं सकती, जल इसे गीला नहीं कर सकता और वायु इसे सुखा नहीं सकती।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 2.27"
          sanskrit="जातस्य हि ध्रुवो मृत्युर्ध्रुवं जन्म मृतस्य च । तस्मादपरिहार्येऽर्थे न त्वं शोचितुमर्हसि ॥"
          iast="jātasya hi dhruvo mṛtyurdhruvaṃ janma mṛtasya ca | tasmādaparihārye'rthe na tvaṃ śocitumarhasi ||"
          meaningLabel="English"
          meaning="For the born, death is certain; for the dead, birth is certain. Therefore, over what is unavoidable, you should not grieve."
          insightLabel="Why It Matters"
          insight="A clean piece of logic Krishna hands Arjuna. The wheel of birth and death turns whether we consent or not. Grieving what cannot be otherwise adds suffering without changing anything. This is not coldness. It is Krishna clearing away wasted anguish so real feeling &mdash; and real action &mdash; can begin."
          essence="What must happen will happen. Do not grieve the inevitable."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            जन्मे हुए की मृत्यु निश्चित है और मरे हुए का जन्म निश्चित है। इसलिए जो अनिवार्य है, उसके विषय में तुम्हें शोक करना उचित नहीं है।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 15.7"
          sanskrit="ममैवांशो जीवलोके जीवभूतः सनातनः । मनःषष्ठानीन्द्रियाणि प्रकृतिस्थानि कर्षति ॥"
          iast="mamaivāṃśo jīvaloke jīvabhūtaḥ sanātanaḥ | manaḥṣaṣṭhānīndriyāṇi prakṛtisthāni karṣati ||"
          meaningLabel="English"
          meaning="An eternal fragment of my own being becomes the individual living self in the world of the living, drawing to itself the mind and the five senses that abide in nature."
          insightLabel="Why It Matters"
          insight="Vaishnava commentators call this the bīja-shloka &mdash; the seed verse of the Gita. It answers the deepest question the atman verses raise: what am I, ultimately? Krishna says: a sanātana aṃśa, an eternal fragment, of the divine. Not identical with God, not separate either. Every teaching about detachment and devotion flows from this claim."
          essence="You are an eternal fragment of the divine, temporarily embodied."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            इस जीवलोक में जीवरूप बना हुआ यह सनातन आत्मा मेरा ही अंश है। यह प्रकृति में स्थित मन और पाँच इन्द्रियों को अपनी ओर आकर्षित करता है।
          </div>
        </div>

        <h3>On Devotion (भक्ति)</h3>
        <p>
          The Gita is often taught as a book of karma yoga. But Krishna calls bhakti the shortest and most complete of the three paths. These five verses are the emotional core of the whole scripture &mdash; the reason millions of readers return to it not for philosophy but for company.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 9.22"
          sanskrit="अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते । तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् ॥"
          iast="ananyāścintayanto māṃ ye janāḥ paryupāsate | teṣāṃ nityābhiyuktānāṃ yogakṣemaṃ vahāmyaham ||"
          meaningLabel="English"
          meaning="For those who worship me with undivided mind, thinking of nothing else, ever united with me &mdash; I carry what they need and preserve what they have."
          insightLabel="Why It Matters"
          insight="Yoga-kṣema literally means &lsquo;acquisition and protection.&rsquo; Krishna is saying: for the devotee who has genuinely turned toward me, I take responsibility for the maintenance of their life. This is the closest the Gita comes to a covenant. It is the verse that makes the whole book feel personal rather than philosophical."
          essence="Turn fully toward the divine, and it carries the weight of your becoming."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            जो अनन्य भाव से मेरा चिन्तन करते हुए मुझ परमेश्वर की उपासना करते हैं, उन नित्य-निरन्तर मुझमें लगे हुए भक्तों का योगक्षेम मैं स्वयं वहन करता हूँ।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 9.26"
          sanskrit="पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति । तदहं भक्त्युपहृतमश्नामि प्रयतात्मनः ॥"
          iast="patraṃ puṣpaṃ phalaṃ toyaṃ yo me bhaktyā prayacchati | tadahaṃ bhaktyupahṛtamaśnāmi prayatātmanaḥ ||"
          meaningLabel="English"
          meaning="Whoever offers me with love a leaf, a flower, a fruit, or a little water &mdash; that offering of love, given by a pure heart, I accept."
          insightLabel="Why It Matters"
          insight="The royal secret of chapter 9. The temple is not the point. The elaborate ritual is not the point. Devotion needs almost nothing to become real. A leaf, a flower, a fruit, water &mdash; the four things anyone can find at their feet. What Krishna receives is not the object; it is the bhāva &mdash; the loving intention &mdash; behind it."
          essence="A leaf offered with love is more than a temple offered without it."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            जो कोई भक्त प्रेमपूर्वक मुझे पत्र, पुष्प, फल या जल अर्पण करता है, उस शुद्ध-बुद्धि निष्काम प्रेमी भक्त द्वारा प्रेमपूर्वक अर्पण की गई उस वस्तु को मैं ग्रहण करता हूँ।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 9.31"
          sanskrit="क्षिप्रं भवति धर्मात्मा शश्वच्छान्तिं निगच्छति । कौन्तेय प्रतिजानीहि न मे भक्तः प्रणश्यति ॥"
          iast="kṣipraṃ bhavati dharmātmā śaśvacchāntiṃ nigacchati | kaunteya pratijānīhi na me bhaktaḥ praṇaśyati ||"
          meaningLabel="English"
          meaning="Quickly such a one becomes righteous and attains lasting peace. Son of Kunti, declare it boldly: my devotee never perishes."
          insightLabel="Why It Matters"
          insight="One of the most quoted promises Krishna makes. The line pratijānīhi &mdash; &lsquo;declare it, take the vow&rsquo; &mdash; is striking: Krishna asks Arjuna to make the promise himself, on his authority. The devotee&apos;s safety is not a hope; it is a guarantee Krishna is willing to have publicly announced."
          essence="Declare it openly: the one who loves the divine cannot be lost."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            वह शीघ्र ही धर्मात्मा हो जाता है और सदा रहने वाली परम शान्ति को प्राप्त होता है। हे कुन्तीपुत्र! तू निश्चयपूर्वक सत्य जान कि मेरा भक्त कभी नष्ट नहीं होता।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 12.13"
          sanskrit="अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च । निर्ममो निरहङ्कारः समदुःखसुखः क्षमी ॥"
          iast="adveṣṭā sarvabhūtānāṃ maitraḥ karuṇa eva ca | nirmamo nirahaṅkāraḥ samaduḥkhasukhaḥ kṣamī ||"
          meaningLabel="English"
          meaning="Without hatred toward any being, friendly and compassionate, free from possessiveness and ego, equal in sorrow and joy, forgiving &mdash;"
          insightLabel="Why It Matters"
          insight="The opening line of Krishna&apos;s portrait of the devotee he holds dear. The list is not about belief. It is about how the person treats other beings, how they carry gain and loss, whether they hold friendliness or enmity in their heart. Bhakti here is measured behaviourally &mdash; you can tell a devotee by how they are with the world."
          essence="Bhakti is measured by how you treat every being."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            जो सब प्राणियों से द्वेष नहीं रखता, सबका मित्र और करुणावान है, ममता और अहंकार से रहित है, सुख-दुःख में समान और क्षमाशील है &mdash; ऐसा भक्त मुझे प्रिय है।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 18.66"
          sanskrit="सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज । अहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥"
          iast="sarvadharmānparityajya māmekaṃ śaraṇaṃ vraja | ahaṃ tvā sarvapāpebhyo mokṣayiṣyāmi mā śucaḥ ||"
          meaningLabel="English"
          meaning="Abandon every dharma and take refuge in me alone. I will free you from all sins. Do not grieve."
          insightLabel="Why It Matters"
          insight="Traditional commentators call this the charama shloka &mdash; the ultimate verse. It is Krishna&apos;s parting sentence after 700 verses of instruction. Sarva-dharman means every framework: every rule you have used to know what to do. Release them, take refuge, and rest. This is not lawlessness; it is the mature devotee&apos;s move &mdash; the rules brought you to the door, and the door only opens through trust."
          essence="Let go of every framework. Take refuge. Do not grieve."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            सब धर्मों को त्यागकर तुम केवल मेरी शरण में आ जाओ। मैं तुम्हें सम्पूर्ण पापों से मुक्त कर दूँगा, तुम शोक मत करो।
          </div>
        </div>

        <div className="pull-quote">
          Bhakti in the Gita is not a feeling to be manufactured. It is a direction &mdash; the whole self turned toward one point &mdash; and Krishna promises to meet the one who turns.
        </div>

        <h3>On the Divine (परमात्मन्)</h3>
        <p>
          Who is speaking, in the Gita? Not just Krishna the cousin, the charioteer, the friend. These five verses are the moments where the mask lifts and the divine names itself &mdash; without whom &ldquo;take refuge&rdquo; would be a small instruction.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 4.7"
          sanskrit="यदा यदा हि धर्मस्य ग्लानिर्भवति भारत । अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥"
          iast="yadā yadā hi dharmasya glānirbhavati bhārata | abhyutthānamadharmasya tadātmānaṃ sṛjāmyaham ||"
          meaningLabel="English"
          meaning="Whenever there is a decline of dharma, O Bhārata, and a rise of adharma &mdash; then I send forth myself."
          insightLabel="Why It Matters"
          insight="One of the two verses that state the doctrine of avatāra &mdash; the descent of the divine into embodied form. The word sṛjāmi (I emit, I create) is Krishna in the first person: it is not that a god is sent, it is that the divine itself takes form. Whenever the balance tips, this is the promise: the correction is on the way."
          essence="Whenever dharma weakens, the divine takes form again."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            हे भारत! जब-जब धर्म की हानि और अधर्म की वृद्धि होती है, तब-तब मैं अपने रूप को रचता हूँ अर्थात् साकार रूप में प्रकट होता हूँ।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 4.8"
          sanskrit="परित्राणाय साधूनां विनाशाय च दुष्कृताम् । धर्मसंस्थापनार्थाय सम्भवामि युगे युगे ॥"
          iast="paritrāṇāya sādhūnāṃ vināśāya ca duṣkṛtām | dharmasaṃsthāpanārthāya sambhavāmi yuge yuge ||"
          meaningLabel="English"
          meaning="For the protection of the good, for the destruction of the evil-doers, and for the re-establishment of dharma &mdash; I come into being, age after age."
          insightLabel="Why It Matters"
          insight="The three purposes of the avatāra, given as a triple infinitive: paritrāṇāya, vināśāya, saṃsthāpanārthāya. Not one, but three. Notice the second purpose is naked &mdash; not the reform of evil-doers, but their destruction. The Gita is delivered on a battlefield; the divine does not always come to reconcile."
          essence="Age after age, the divine returns to rebalance dharma."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            साधुजनों की रक्षा के लिए, दुष्कर्म करने वालों के विनाश के लिए और धर्म की भली-भाँति स्थापना के लिए मैं युग-युग में प्रकट होता रहता हूँ।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 7.7"
          sanskrit="मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय । मयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव ॥"
          iast="mattaḥ parataraṃ nānyatkiñcidasti dhanañjaya | mayi sarvamidaṃ protaṃ sūtre maṇigaṇā iva ||"
          meaningLabel="English"
          meaning="There is nothing whatever higher than me, Dhanañjaya. All this is strung upon me like pearls on a thread."
          insightLabel="Why It Matters"
          insight="One of the great images in the Gita. The world is not chaos and it is not many; it is a garland. Every jewel is distinct, but they are held on a single unseen thread. Take the thread away and the pearls scatter. Krishna is saying: I am that thread. The unity of the world is not an idea; it is Him."
          essence="The world is strung on the divine like pearls on a single thread."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            हे धनञ्जय! मुझसे परे दूसरा कुछ भी नहीं है। यह सब जगत् मुझमें इस प्रकार पिरोया हुआ है, जैसे सूत्र में मणियाँ पिरोई गई हों।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 10.20"
          sanskrit="अहमात्मा गुडाकेश सर्वभूताशयस्थितः । अहमादिश्च मध्यं च भूतानामन्त एव च ॥"
          iast="ahamātmā guḍākeśa sarvabhūtāśayasthitaḥ | ahamādiśca madhyaṃ ca bhūtānāmanta eva ca ||"
          meaningLabel="English"
          meaning="I am the Self, Guḍākeśa, seated in the heart of every being. I am the beginning, the middle, and also the end of all beings."
          insightLabel="Why It Matters"
          insight="Guḍākeśa &mdash; &lsquo;conqueror of sleep&rsquo; &mdash; is an epithet for Arjuna, chosen precisely because Krishna is about to wake him further. The verse dissolves distance. The divine is not somewhere else. It is the ātman itself, seated inside every creature that breathes. And it is the timeline: beginning, middle, end. Nothing anywhere is outside it."
          essence="The divine is the Self within every being, and the shape of all time."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            हे गुडाकेश (अर्जुन)! मैं सब प्राणियों के हृदय में स्थित आत्मा हूँ। मैं ही समस्त प्राणियों का आदि, मध्य और अन्त भी हूँ।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 15.15"
          sanskrit="सर्वस्य चाहं हृदि सन्निविष्टो मत्तः स्मृतिर्ज्ञानमपोहनं च । वेदैश्च सर्वैरहमेव वेद्यो वेदान्तकृद्वेदविदेव चाहम् ॥"
          iast="sarvasya cāhaṃ hṛdi sanniviṣṭo mattaḥ smṛtirjñānamapohanaṃ ca | vedaiśca sarvairahameva vedyo vedāntakṛdvedavideva cāham ||"
          meaningLabel="English"
          meaning="I am seated in the heart of all. From me come memory, knowledge, and their withdrawal. I alone am to be known by all the Vedas. I am the author of Vedānta, and the knower of the Vedas."
          insightLabel="Why It Matters"
          insight="The most complete self-declaration in the Gita. Krishna claims all four: the seat inside each being, the source of every cognitive movement, the goal of all scripture, and its author. If any single verse could be called Krishna&apos;s answer to &lsquo;who are you?&rsquo; &mdash; this is it."
          essence="Seated in every heart, and the meaning of every scripture &mdash; that is who is speaking."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            मैं सब प्राणियों के हृदय में स्थित हूँ। मुझसे ही स्मृति, ज्ञान और इनका अभाव होता है। सम्पूर्ण वेदों द्वारा जानने योग्य भी मैं ही हूँ। वेदान्त का कर्ता और वेदों का ज्ञाता भी मैं ही हूँ।
          </div>
        </div>

        <h3>On Peace and the Mind (शान्ति)</h3>
        <p>
          The Gita&apos;s applied psychology. Krishna is remarkably practical about what happens when the mind drifts from its object. These five verses trace the chain and give the way out.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 2.62"
          sanskrit="ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते । सङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते ॥"
          iast="dhyāyato viṣayānpuṃsaḥ saṅgasteṣūpajāyate | saṅgātsañjāyate kāmaḥ kāmātkrodho'bhijāyate ||"
          meaningLabel="English"
          meaning="Brooding on sense objects, a person develops attachment to them. From attachment arises desire; from desire arises anger."
          insightLabel="Why It Matters"
          insight="The Gita&apos;s clearest description of the mechanism of downfall. The chain begins innocuously &mdash; just thinking about something pleasant. But dhyāyataḥ (dwelling on, brooding) creates saṅga (attachment), which creates kāma (craving), which creates krodha (anger) when the craving is thwarted. The place to intervene is at the first link: the dwelling."
          essence="The fall starts not in action but in what the mind is willing to dwell on."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            विषयों का चिन्तन करते रहने वाले पुरुष की उन विषयों में आसक्ति उत्पन्न हो जाती है। आसक्ति से कामना उत्पन्न होती है और कामना से क्रोध उत्पन्न होता है।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 2.63"
          sanskrit="क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः । स्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति ॥"
          iast="krodhādbhavati sammohaḥ sammohātsmṛtivibhramaḥ | smṛtibhraṃśād buddhināśo buddhināśātpraṇaśyati ||"
          meaningLabel="English"
          meaning="From anger comes delusion, from delusion the confusion of memory, from confusion of memory the destruction of discernment, and from the destruction of discernment one is lost."
          insightLabel="Why It Matters"
          insight="The second half of the chain. Anger is not the ending; it is the middle. Anger clouds cognition &mdash; sammoha means the mind stops seeing clearly. Then memory scatters &mdash; you forget what you actually value. Then buddhi (discernment) breaks. Then, Krishna says, praṇaśyati &mdash; one perishes. Not physically. As a moral being."
          essence="Anger is not the fall. It is the middle of the fall."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            क्रोध से सम्मोह (अत्यन्त मूढ़भाव) उत्पन्न होता है, सम्मोह से स्मृति में भ्रम हो जाता है, स्मृति के भ्रम से बुद्धि का नाश हो जाता है और बुद्धि के नाश से मनुष्य अपनी स्थिति से गिर जाता है।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 2.66"
          sanskrit="नास्ति बुद्धिरयुक्तस्य न चायुक्तस्य भावना । न चाभावयतः शान्तिरशान्तस्य कुतः सुखम् ॥"
          iast="nāsti buddhirayuktasya na cāyuktasya bhāvanā | na cābhāvayataḥ śāntiraśāntasya kutaḥ sukham ||"
          meaningLabel="English"
          meaning="For the ungoverned there is no discernment. For the ungoverned there is no steady contemplation. For the uncontemplative there is no peace. And for the peaceless, where is happiness?"
          insightLabel="Why It Matters"
          insight="A ladder built out of four negations. Ayukta &mdash; not yoked, not disciplined &mdash; is the root. Without discipline, no clear buddhi. Without clear buddhi, no bhāvanā, no capacity for steady inner contemplation. Without contemplation, no peace. Without peace, no possibility of sukha, of happiness. The ladder runs both ways: build the first rung and the others follow."
          essence="No discipline, no discernment. No peace, no happiness. It is one chain."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            जो मन-इन्द्रियों को वश में नहीं रखता, उसमें निश्चयात्मक बुद्धि नहीं होती और उसमें भावना भी नहीं होती। भावनाहीन मनुष्य को शान्ति नहीं मिलती और अशान्त मनुष्य को सुख कहाँ?
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 6.5"
          sanskrit="उद्धरेदात्मनात्मानं नात्मानमवसादयेत् । आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ॥"
          iast="uddharedātmanātmānaṃ nātmānamavasādayet | ātmaiva hyātmano bandhurātmaiva ripurātmanaḥ ||"
          meaningLabel="English"
          meaning="Lift the self by the self. Do not let the self sink. For the self alone is the friend of the self, and the self alone is its enemy."
          insightLabel="Why It Matters"
          insight="The Gita&apos;s self-help verse, and easily its most quoted. Six occurrences of ātman in two lines. The trap of self-pity is closed the same way the trap of arrogance is closed: no one is coming to rescue you or ruin you. The instrument that saves you is the same one that undid you. Turn it around, and it lifts."
          essence="Lift yourself by yourself. The saviour and the saboteur are the same instrument."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            अपने आप से अपना उद्धार करो, अपने को अधोगति में न डालो। क्योंकि यह आत्मा ही अपना मित्र है और यह आत्मा ही अपना शत्रु है।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 6.35"
          sanskrit="असंशयं महाबाहो मनो दुर्निग्रहं चलम् । अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते ॥"
          iast="asaṃśayaṃ mahābāho mano durnigrahaṃ calam | abhyāsena tu kaunteya vairāgyeṇa ca gṛhyate ||"
          meaningLabel="English"
          meaning="Without doubt, mighty-armed one, the mind is hard to restrain and restless. But by practice and by dispassion it can be held."
          insightLabel="Why It Matters"
          insight="Arjuna had just said the mind is more difficult to control than the wind. Krishna does not disagree. The Gita&apos;s honesty here is remarkable: yes, the mind is hard. But there is a way. Two instruments: abhyāsa (steady, patient practice) and vairāgya (dispassion, non-attachment). Not one; both. This is the operating instruction of every meditation tradition that followed."
          essence="Practice and dispassion &mdash; two hands are enough to hold the mind."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            हे महाबाहो! निःसन्देह मन बड़ा चंचल और कठिनता से वश में होने वाला है, परन्तु हे कुन्तीपुत्र! अभ्यास और वैराग्य से इसे वश में किया जा सकता है।
          </div>
        </div>

        <h3>On Fear and Grief (शोक)</h3>
        <p>
          The Gita opens with a grieving warrior. It closes with him standing again. These five verses are the tools Krishna uses to move a person from paralysis to action &mdash; without pretending the sorrow was not real.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 2.14"
          sanskrit="मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः । आगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत ॥"
          iast="mātrāsparśāstu kaunteya śītoṣṇasukhaduḥkhadāḥ | āgamāpāyino'nityāstāṃstitikṣasva bhārata ||"
          meaningLabel="English"
          meaning="The touches of the senses, O son of Kunti, give cold and heat, pleasure and pain. They come and go, they do not last. Bear them, Bhārata."
          insightLabel="Why It Matters"
          insight="Krishna does not deny that Arjuna is suffering. He says: yes, and it is also weather. The word titikṣasva &mdash; &lsquo;endure them&rsquo; &mdash; is gentle, not dismissive. Experiences arrive and depart. What is asked of the seeker is not to prevent the weather; it is to remember that the weather is weather. The one experiencing it stays."
          essence="Pain is real. Pain is also weather. Learn to let it pass through."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            हे कुन्तीपुत्र! इन्द्रियों और विषयों का संयोग शीत-उष्ण और सुख-दुःख देने वाला है। ये आने-जाने वाले और अनित्य हैं, इसलिए हे भारत! तुम इनको सहन करो।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 2.38"
          sanskrit="सुखदुःखे समे कृत्वा लाभालाभौ जयाजयौ । ततो युद्धाय युज्यस्व नैवं पापमवाप्स्यसि ॥"
          iast="sukhaduḥkhe same kṛtvā lābhālābhau jayājayau | tato yuddhāya yujyasva naivaṃ pāpamavāpsyasi ||"
          meaningLabel="English"
          meaning="Treating pleasure and pain, gain and loss, victory and defeat as equal &mdash; then engage in battle. Thus you will incur no sin."
          insightLabel="Why It Matters"
          insight="A working definition of samatva, equipoise. Not indifference. Not numbness. Same-hearted-ness. Krishna is not asking Arjuna to stop feeling pleasure and pain; he is asking him to stop letting either one decide who he becomes. Fight from that place, and the fight leaves no karmic residue."
          essence="Fight, but from a heart that treats gain and loss the same."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            सुख-दुःख, लाभ-हानि और जय-पराजय को समान समझकर, फिर युद्ध के लिए तैयार हो जा। इस प्रकार युद्ध करने से तुझे पाप नहीं लगेगा।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 11.55"
          sanskrit="मत्कर्मकृन्मत्परमो मद्भक्तः सङ्गवर्जितः । निर्वैरः सर्वभूतेषु यः स मामेति पाण्डव ॥"
          iast="matkarmakṛnmatparamo madbhaktaḥ saṅgavarjitaḥ | nirvairaḥ sarvabhūteṣu yaḥ sa māmeti pāṇḍava ||"
          meaningLabel="English"
          meaning="One who acts for me, holds me as the highest, is devoted to me, free from attachment, and without enmity toward any being &mdash; that one comes to me, Pāṇḍava."
          insightLabel="Why It Matters"
          insight="Ramanuja called this the caramaśloka of the Gita &mdash; not 18.66, but this one. It is the concentrated definition of the devotee: five characteristics, one destination. Notice the emotional register: it closes not with knowledge or discipline but with nirvairaḥ &mdash; without enmity. The path ends where hostility ends."
          essence="Act for the divine, love the divine, hold no enmity &mdash; and you arrive."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            हे पाण्डव! जो पुरुष केवल मेरे लिए ही कर्म करता है, मुझी को परम आश्रय मानता है, मेरा भक्त है, आसक्ति से रहित है और सम्पूर्ण प्राणियों में वैररहित है, वह मुझे प्राप्त होता है।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 18.58"
          sanskrit="मच्चित्तः सर्वदुर्गाणि मत्प्रसादात्तरिष्यसि । अथ चेत्त्वमहङ्कारान्न श्रोष्यसि विनङ्क्ष्यसि ॥"
          iast="maccittaḥ sarvadurgāṇi matprasādāttariṣyasi | atha cettvamahaṅkārānna śroṣyasi vinaṅkṣyasi ||"
          meaningLabel="English"
          meaning="With your mind fixed on me, you will cross over all obstacles by my grace. But if from ego you do not listen, you will perish."
          insightLabel="Why It Matters"
          insight="A tender warning near the end of the book. The word sarva-durgāṇi &mdash; &lsquo;every difficult passage&rsquo; &mdash; is comforting: not one obstacle, all of them. The condition is maccittaḥ, mind fixed on Krishna. The alternative is stated plainly: refuse from ego, and the crossing does not happen. The Gita is honest about both sides of the door."
          essence="With the mind fixed on the divine, every difficult passage is passable."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            मुझमें चित्त लगाने से तू मेरी कृपा से सब कठिनाइयों को पार कर जाएगा। परन्तु यदि तू अहंकारवश मेरी बात नहीं सुनेगा, तो नष्ट हो जाएगा।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 18.78"
          sanskrit="यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः । तत्र श्रीर्विजयो भूतिर्ध्रुवा नीतिर्मतिर्मम ॥"
          iast="yatra yogeśvaraḥ kṛṣṇo yatra pārtho dhanurdharaḥ | tatra śrīrvijayo bhūtirdhruvā nītirmatirmama ||"
          meaningLabel="English"
          meaning="Wherever Krishna, the Lord of Yoga, is, and wherever Pārtha, the bearer of the bow, is &mdash; there prosperity, victory, wealth, and firm morality will be. That is my conviction."
          insightLabel="Why It Matters"
          insight="The closing verse of the entire Bhagavad Gita, spoken not by Krishna or Arjuna but by Sañjaya. The Gita ends not with a doctrinal statement but with an image: the divine and the human, side by side. Wherever devotion (Krishna) and dharmic effort (Arjuna) meet, the four blessings follow. It is the Gita&apos;s promise to the reader who has stayed till the end."
          essence="Where devotion and dharmic effort meet, victory is certain."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            जहाँ योगेश्वर श्रीकृष्ण हैं और जहाँ धनुर्धर अर्जुन हैं, वहीं पर श्री, विजय, विभूति और अटल नीति है &mdash; ऐसा मेरा मत है।
          </div>
        </div>

        <h2>The One Verse That Contains All the Others</h2>
        <p>
          If you had to defend a single verse as the essence of the entire Gita, two candidates stand above the rest. Each has a real claim, and choosing between them tells you what kind of reader you are.
        </p>
        <p>
          The first is <strong>BG 2.47</strong>: <em>karmaṇyevādhikāraste mā phaleṣu kadācana.</em> This is the verse for the reader who comes to the Gita for guidance about how to live. It is the instruction verse. It fits in a single breath. It contains four commands and no theology. You do not have to accept a metaphysics to use it. You do not have to believe in an avatāra. All you have to do is admit that you have been trying to control outcomes and that this is what has been costing you your peace. If the Gita is a book about action, 2.47 is its answer.
        </p>
        <p>
          The second is <strong>BG 18.66</strong>: <em>sarva-dharmān parityajya mām ekaṃ śaraṇaṃ vraja.</em> Traditional commentators call this the caramaśloka &mdash; the ultimate verse &mdash; because it is what Krishna says last, and last is not accidental in a text as carefully arranged as the Gita. 18.66 is the verse for the reader who has already tried 2.47 for years and discovered that even karma yoga becomes a subtle claim, another dharma to master. At some point the frameworks themselves need to be released. Then 18.66 opens.
        </p>
        <p>
          Perhaps the deepest answer is that both are needed, in that order. 2.47 is what the Gita asks of you at the beginning: act, and let go of the fruit. 18.66 is what it asks of you at the end: let go even of the framework of asking. One verse is for the seeker still climbing. The other is for the seeker at the door.
        </p>

        <div className="highlight-box">
          <h3>If someone asks you for a Gita quote in one line</h3>
          <p>
            <em>karmaṇyevādhikāraste mā phaleṣu kadācana</em> &mdash; you have the right to action, never to its fruits. If they want the ending, not the instruction: <em>sarva-dharmān parityajya mām ekaṃ śaraṇaṃ vraja</em> &mdash; release every framework and take refuge. Between those two verses, the Gita has said everything it needs to say.
          </p>
        </div>

        <h2>How to Memorize These</h2>
        <p>
          Reading a shloka once and moving on is not memorization; it is exposure. The verses become yours only when the meter enters the body. Here is a practical way to actually carry a Sanskrit verse in your head, not just recognize it on a page.
        </p>

        <ul className="practice-list">
          <li>
            <span><strong>Chant, do not silently read.</strong> The anuṣṭubh meter has a natural rise and fall. Reading in your head loses that; chanting keeps it. Even at low volume, the mouth doing the work is what fixes the verse. Ten repetitions aloud beat a hundred silent readings.</span>
          </li>
          <li>
            <span><strong>Learn the meter before the meaning.</strong> Each half-verse is sixteen syllables. Get the beat first &mdash; da-DA-da-DA-da-DA-da-DA &mdash; and the words start to sit inside a scaffold. This is why traditional students learned by ear, from a teacher who chanted a line and had them repeat it three times.</span>
          </li>
          <li>
            <span><strong>Use IAST as a scaffold, then discard it.</strong> Transliteration is a training wheel, not a destination. Learn the verse from IAST until you know the syllables, then start reading directly from Devanagari. The script itself carries phonetic information the Roman letters lose.</span>
          </li>
          <li>
            <span><strong>Understand before you finalize.</strong> Memorizing a verse whose meaning you have not thought about turns Sanskrit into decoration. Read the English translation slowly. Read the Hindi. Look at one word you do not know &mdash; a single root you can carry. Then chant. Meaning-first memorization sticks; sound-only does not.</span>
          </li>
          <li>
            <span><strong>Repeat over weeks, not hours.</strong> The mind consolidates through sleep. Chant a verse three times before bed for a week, and by day seven it will be more securely yours than a verse you drilled for two hours in one sitting. The Gita is a marathon; treat memorization the same way.</span>
          </li>
        </ul>

        <p>
          If you are starting today, start with BG 2.47. Give yourself seven days. Chant it in the morning while your tea is steeping. That is enough. In a week, a verse that lived in a book will live in your mouth. That is what having a shloka actually means.
        </p>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>Which is the most famous verse of the Bhagavad Gita in Sanskrit?</strong>
          <p>
            The most famous Sanskrit verse is BG 2.47: <em>karmaṇyevādhikāraste mā phaleṣu kadācana</em>. In Devanagari: कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। It means, &ldquo;You have the right to act, but never to the fruits of action.&rdquo; It is the seed verse of karma yoga and probably the single most-cited line from any Indian scripture. BG 18.66 (<em>sarva-dharmān parityajya</em>) is a close second because it is Krishna&apos;s final instruction &mdash; the parting sentence of the entire dialogue.
          </p>
        </div>

        <div className="faq-item">
          <strong>Should I read Gita quotes in Sanskrit or Hindi?</strong>
          <p>
            Both, in that order. The Sanskrit is the source &mdash; the meter, the sound, and the exact word-choices Krishna is portrayed as speaking. Reading only the Hindi or English translation is like reading only the sheet music of a raga without hearing it. Chant the Sanskrit first, then read the Hindi meaning to understand, then the English translation to bridge cultures. The Sanskrit carries something the translations cannot: the <em>anuṣṭubh</em> meter itself is part of the teaching.
          </p>
        </div>

        <div className="faq-item">
          <strong>How do I pronounce Sanskrit Gita verses correctly?</strong>
          <p>
            Three quick rules. First, &lsquo;a&rsquo; at the end of a word is short (nearly swallowed) &mdash; so कर्म is &ldquo;kar-ma,&rdquo; not &ldquo;kar-maa.&rdquo; Second, aspirated consonants (kh, gh, ch, jh, ṭh, ḍh, ph, bh) genuinely have a breathy release &mdash; <em>bhakti</em> has real air after the &ldquo;bh.&rdquo; Third, long vowels (ā, ī, ū) are held twice as long as short vowels. If you can, listen to a Gita Press or Krishnamacharya recording alongside reading. Even a week of listening changes how the shlokas sit in your mouth.
          </p>
        </div>

        <div className="faq-item">
          <strong>What does &ldquo;karmaṇyevādhikāraste&rdquo; mean word by word?</strong>
          <p>
            <em>Karmaṇi</em> means &ldquo;in action.&rdquo; <em>Eva</em> means &ldquo;only.&rdquo; <em>Adhikāraḥ</em> means &ldquo;right&rdquo; or &ldquo;authority.&rdquo; <em>Te</em> means &ldquo;yours.&rdquo; The whole line &mdash; <em>karmaṇyevādhikāraste</em> &mdash; literally reads: &ldquo;Only in action is your right.&rdquo; The second half completes the thought: <em>mā phaleṣu kadācana</em> &mdash; &ldquo;never in the fruits.&rdquo; Krishna is drawing a clean line: you have jurisdiction over what you do, none over what your action yields. The rest of the shloka closes the escape hatches.
          </p>
        </div>

        <div className="faq-item">
          <strong>What is the difference between a shloka and a mantra?</strong>
          <p>
            A shloka (श्लोक) is a Sanskrit verse form &mdash; typically two lines of sixteen syllables each, in the <em>anuṣṭubh</em> meter. The Bhagavad Gita is composed almost entirely of shlokas. A mantra (मन्त्र) is a syllable, word, or phrase used as an instrument of consciousness &mdash; designed to be repeated, often ritually. All mantras are Sanskrit; not all shlokas are mantras. But many Gita shlokas &mdash; 2.47, 15.7, 18.66 &mdash; are traditionally used as mantras because chanting them itself is considered transformative.
          </p>
        </div>

        <div className="faq-item">
          <strong>What is the oldest surviving translation of the Bhagavad Gita?</strong>
          <p>
            The oldest surviving commentary in Sanskrit is Adi Shankaracharya&apos;s <em>Bhāṣya</em>, from roughly the 8th century CE. The oldest translation into a European language is Charles Wilkins&apos; English rendering, published in London in 1785 &mdash; this is the version Emerson, Thoreau, and Warren Hastings read. Wilhelm von Humboldt called the Gita &ldquo;the most beautiful, perhaps the only true philosophical song in any known tongue.&rdquo; Persian translations by Dara Shukoh&apos;s circle predate Wilkins, but the Sanskrit-into-English lineage begins in 1785.
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

      <BlogTracker pageName="Bhagavad Gita Quotes in Sanskrit" />
    </>
  )
}
