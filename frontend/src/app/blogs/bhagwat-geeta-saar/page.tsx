import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import ShlokaCard from '@/components/gita/ShlokaCard'

export const metadata: Metadata = {
  title: "Bhagwat Geeta Saar — The Essence of the Bhagavad Gita in 18 Verses | Wisdom",
  description: "Geeta Saar (गीता सार) is the essence of the Bhagavad Gita. The famous viral quote isn't in the Gita. Here's what Krishna actually taught — one core verse per chapter, in Sanskrit, Hindi, and English.",
  keywords: "geeta saar, bhagwat geeta saar, bhagavad gita saar, gita saar in hindi, geeta saar in english, bhagwat geeta ka saar, gita saar shloka, complete essence of bhagavad gita, geeta saar 18 chapters, krishna geeta saar, bhagavad gita summary, geeta ka saar",
  openGraph: {
    title: "Bhagwat Geeta Saar — The Essence of the Bhagavad Gita | Wisdom",
    description: "The famous 'Geeta Saar' quote isn't in the Gita. Here's what Krishna actually taught — one core verse per chapter.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagwat-geeta-saar",
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/bhagwat-geeta-saar" },
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
            content: "गीता सार";
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
    "headline": "Bhagwat Geeta Saar — The Essence of the Bhagavad Gita in 18 Verses",
    "description": "The famous 'Geeta Saar' viral quote isn't in the Gita. Here's the real essence — one key verse for each of the 18 chapters, in Sanskrit, Hindi, and English.",
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
        "name": "What is Geeta Saar (गीता सार)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Geeta Saar means 'the essence of the Gita.' It is a distilled summary of what Krishna teaches Arjuna across the 700 verses of the Bhagavad Gita. The most viral version circulating in Hindi ('What did you bring, what will you take?') is a folk paraphrase and is not a direct verse from the Gita. The actual essence, drawn from the text, centers on four ideas: the imperishable Self, action without craving for results, devotion as the direct path, and surrender to the divine."
        }
      },
      {
        "@type": "Question",
        "name": "Is the famous 'क्या लेकर आए थे' Geeta Saar quote actually from the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. The Hindi passage that begins 'क्या लेकर आए थे, क्या लेकर जाओगे' ('What did you bring, what will you take?') is a modern devotional paraphrase, likely popularized by Doordarshan's Mahabharat serial. It captures a general Hindu sentiment about impermanence, but it is not a direct translation of any single Gita verse. The closest actual Gita teaching on non-possession is BG 2.22 (the soul discards old bodies like worn clothes) and BG 2.14 (impermanence is the nature of experience)."
        }
      },
      {
        "@type": "Question",
        "name": "What is the single most important verse in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The most-cited verse is BG 2.47: karmaṇyevādhikāraste mā phaleṣu kadācana. 'You have the right to your action, never to its fruit.' Traditional commentators consider BG 18.66 (sarva-dharmān parityajya) the ultimate teaching, because it is Krishna's final instruction. BG 15.7 is called the 'seed verse' because it declares the individual soul as an eternal fragment of the divine. Any of these three could reasonably be called the 'essence verse' of the Gita."
        }
      },
      {
        "@type": "Question",
        "name": "Can I read the Gita Saar instead of the full Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The saar (essence) is a useful map, not a replacement. A summary can point you to what to look for. It cannot substitute for the experience of reading Krishna's actual dialogue with Arjuna. The Gita's power comes partly from watching the argument develop across 18 chapters, from Arjuna's collapse in Chapter 1 to his transformation in Chapter 18. Use the saar as an orientation, then read at least chapters 2, 3, 12, and 18 in full."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between Geeta Saar and Geeta Updesh?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Geeta Updesh (गीता उपदेश) refers to the teachings Krishna delivered — the full 700-verse discourse. Geeta Saar (गीता सार) refers to the distilled essence of those teachings. Updesh is the primary text; saar is the summary. In colloquial Hindi, both terms are sometimes used interchangeably, but the technical distinction is that updesh is the instruction itself while saar is what remains when the instruction is compressed to its core."
        }
      },
      {
        "@type": "Question",
        "name": "Who is the Geeta Saar addressed to?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Krishna delivered the Bhagavad Gita to Arjuna on the battlefield of Kurukshetra. But Arjuna is a stand-in. His paralysis before a difficult, unavoidable duty is the universal human condition. The saar is addressed to anyone who has ever frozen before a hard choice, doubted whether their effort matters, feared the loss of what they love, or wondered whether it is possible to act well in a broken world."
        }
      }
    ]
  }
]

export default function BhagwatGeetaSaarPage() {
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
          Bhagwat Geeta Saar
        </div>
      </div>

      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · The Complete Essence
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            Bhagwat Geeta Saar —<br />
            <em>The Essence in 18 Verses</em>
          </h1>
          <p className="article-subtitle">
            The famous Hindi &ldquo;Geeta Saar&rdquo; you have read on WhatsApp isn&apos;t actually in the Gita. Here is what Krishna really taught &mdash; one core verse for each of the eighteen chapters, in Sanskrit, Hindi, and English.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
            <span className="meta-sep">·</span>
            <span className="meta-item">All 18 Chapters · 22 Verses</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~15 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Published July 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
          </div>
        </div>
      </div>

      <div className="content">
        <figure className="chapter-image">
          <img
            src="/assets/chapter18.webp"
            alt="Krishna delivering the essence of the Bhagavad Gita to Arjuna on the battlefield of Kurukshetra"
            width="1200"
            height="675"
            loading="eager"
            fetchPriority="high"
          />
          <figcaption>The essence: what remains when the 700 verses are pressed into a single teaching</figcaption>
        </figure>

        <p className="lead">
          If you have grown up in India, you have almost certainly encountered the &ldquo;Geeta Saar&rdquo; that circulates on WhatsApp and printed on posters in every railway station. It begins something like: <em>क्या लेकर आए थे, क्या लेकर जाओगे?</em> &mdash; what did you bring, what will you take? It is beautiful. It is deeply Hindu. It is also not, in any direct sense, from the Bhagavad Gita.
        </p>
        <p>
          That viral text is a folk paraphrase, likely popularized by B. R. Chopra&apos;s Mahabharat television serial in the late 1980s. It captures a general sentiment about impermanence, but if you look for a Sanskrit source, you will not find one. What Krishna actually said to Arjuna on the battlefield of Kurukshetra is longer, harder, and considerably more precise. This article is an attempt to give you the real Geeta Saar &mdash; the essence pulled from the actual text, one chapter at a time.
        </p>

        <div className="highlight-box">
          <h3>What you will find in this piece</h3>
          <p>
            First, why the famous WhatsApp version is a paraphrase and not a quote. Then the four Sanskrit verses most traditional commentators consider the true essence of the Gita. Then one representative verse for each of the 18 chapters &mdash; the line that carries the chapter&apos;s core teaching. And finally the seven ideas that hold the whole book together.
          </p>
        </div>

        <h2>The Famous Geeta Saar That Is Not in the Gita</h2>
        <p>
          Let us start by looking honestly at the text most people call &ldquo;Geeta Saar.&rdquo; The Hindi passage in wide circulation reads something like this:
        </p>

        <div className="hindi-block">
          <div className="hindi-label">The popular WhatsApp Geeta Saar (paraphrase, not scripture)</div>
          <div className="hindi-text">
            क्यों व्यर्थ की चिंता करते हो? किससे व्यर्थ डरते हो? कौन तुम्हें मार सकता है? आत्मा न पैदा होती है, न मरती है।<br /><br />
            जो हुआ, वह अच्छा हुआ। जो हो रहा है, वह अच्छा हो रहा है। जो होगा, वह भी अच्छा ही होगा।<br /><br />
            तुम क्या लेकर आए थे, जो तुमने खो दिया? तुम क्या लेकर आए थे जो नष्ट हो गया?<br /><br />
            जो लिया, यहीं से लिया। जो दिया, यहीं पर दिया। जो लिया, इसी (भगवान) से लिया।
          </div>
        </div>

        <p>
          It is a beautiful piece of devotional Hindi prose. It is also a compression that puts thoughts in Krishna&apos;s mouth that Krishna does not literally say. The Gita is not a text about &ldquo;whatever happens is for the good.&rdquo; It is a text in which Krishna repeatedly tells Arjuna that his current understanding is wrong and needs to be corrected. That is a very different kind of teaching.
        </p>
        <p>
          The line closest to a real Gita source is the middle passage about the soul not being born and not dying. That echoes BG 2.20 quite directly. The rest &mdash; &ldquo;whatever happened was good,&rdquo; &ldquo;what did you bring&rdquo; &mdash; is affectionate Hindu commentary, not translation. Knowing this matters. The Gita&apos;s actual teaching is more surgical.
        </p>

        <h2>The Four Verses Most Commentators Call the Real Essence</h2>
        <p>
          Traditional commentators &mdash; Shankaracharya, Ramanuja, Madhusudana Saraswati, Sridhara Swami &mdash; identify a small number of verses as the &ldquo;seed&rdquo; or &ldquo;essence&rdquo; of the whole Gita. The four below are the most consistently named. If you memorize nothing else from this article, memorize these.
        </p>

        <h3>1. BG 2.47 — The Instruction Verse</h3>
        <p>
          This is the most-quoted line in the Gita, and it deserves the recognition. In one sloka Krishna delivers the entire practical teaching of karma yoga.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 2.47"
          sanskrit="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥"
          iast="karmaṇyevādhikāraste mā phaleṣu kadācana | mā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi ||"
          meaningLabel="Translation"
          meaning="You have the right to act, but not to the fruits of action. Do not let the fruit be your motive. And do not use this as an excuse to give up action."
          insightLabel="Why this is the essence"
          insight="Four instructions in thirty-two syllables. Act. Do not claim the outcome. Do not make the outcome your motive. Do not use any of the above to justify inaction. The fourth line is Krishna anticipating the misreading that says 'if I should not want results, why work?' He blocks that exit before it can be taken."
          essence="Perform your action. Release the fruit. Do not disengage."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अनुवाद</div>
          <div className="hindi-text">
            तुम्हारा अधिकार केवल कर्म करने में है, उसके फल में कभी नहीं। इसलिए फल की इच्छा को अपने कर्म का कारण मत बनाओ, और न ही कर्म न करने में आसक्ति रखो।
          </div>
        </div>

        <h3>2. BG 15.7 — The Seed Verse</h3>
        <p>
          If BG 2.47 is the instruction verse, BG 15.7 is the metaphysical foundation. Krishna states outright what the individual soul actually is. Everything else in the Gita rests on this.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 15.7"
          sanskrit="ममैवांशो जीवलोके जीवभूतः सनातनः । मनःषष्ठानीन्द्रियाणि प्रकृतिस्थानि कर्षति ॥"
          iast="mamaivāṃśo jīvaloke jīvabhūtaḥ sanātanaḥ | manaḥṣaṣṭhānīndriyāṇi prakṛtisthāni karṣati ||"
          meaningLabel="Translation"
          meaning="An eternal fragment of my own being becomes the individual living self in the world of the living, drawing to itself the mind and the five senses that abide in nature."
          insightLabel="Why this is the essence"
          insight="Vaishnava commentators call this the beeja shloka (seed verse) of the entire Gita. It answers the deepest question: what am I, really? Krishna says: a sanatana amsha — an eternal fragment — of the divine. Not identical with God, but not separate either. Every teaching about detachment, dharma, and devotion follows from this claim about identity."
          essence="You are an eternal fragment of the divine, temporarily embodied."
        />

        <h3>3. BG 18.66 — The Final Instruction</h3>
        <p>
          This is Krishna&apos;s parting sentence, and traditional commentators call it the <em>charama shloka</em> &mdash; the ultimate verse. It is what he leaves Arjuna with after 700 verses of preparation.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 18.66"
          sanskrit="सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज । अहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥"
          iast="sarvadharmānparityajya māmekaṃ śaraṇaṃ vraja | ahaṃ tvā sarvapāpebhyo mokṣayiṣyāmi mā śucaḥ ||"
          meaningLabel="Translation"
          meaning="Abandon every duty and take refuge in me alone. I will free you from all sins. Do not grieve."
          insightLabel="Why this is the essence"
          insight="After eighteen chapters of instruction about action, knowledge, meditation, and devotion, Krishna's last word is a release. The word 'sarva-dharman' means every dharma — every rule you have been holding, every framework you have used to know what to do. Release them, and rest in surrender. This is not lawlessness. It is the mature devotee's move: the rules brought you to the door, and the door only opens through trust."
          essence="Let go of every framework. Take refuge. Do not grieve."
        />

        <h3>4. BG 9.22 — The Promise Verse</h3>
        <p>
          The fourth verse most often cited as the &ldquo;essence&rdquo; is a promise. It is the closest the Gita comes to a covenant.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 9.22"
          sanskrit="अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते । तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् ॥"
          iast="ananyāścintayanto māṃ ye janāḥ paryupāsate | teṣāṃ nityābhiyuktānāṃ yogakṣemaṃ vahāmyaham ||"
          meaningLabel="Translation"
          meaning="For those who worship me with undivided mind, thinking of nothing else, ever united with me, I carry what they need and preserve what they have."
          insightLabel="Why this is the essence"
          insight="Yoga-kshema literally means 'acquisition and protection.' Krishna is saying: for the devotee who has genuinely turned toward me, I take responsibility for the maintenance of their life. This is the emotional heart of the Gita for millions of readers. It is the verse that makes the whole book feel personal rather than philosophical."
          essence="Turn fully toward me, and I carry the weight of your becoming."
        />

        <div className="pull-quote">
          Four verses. 2.47 tells you what to do. 15.7 tells you what you are. 18.66 tells you where to rest. 9.22 tells you what happens when you do. Any real Geeta Saar has to contain these four.
        </div>

        <h2>The 18 Chapters, One Essence at a Time</h2>
        <p>
          Below is the essence of each of the eighteen chapters, in the order Krishna delivers them. Each chapter&apos;s core teaching is drawn from one representative verse, not a summary. This is what the argument actually looks like when you follow it in sequence.
        </p>

        <div className="chapter-essence-grid">
          <div className="chapter-essence-card">
            <div className="chapter-essence-num">1<small>Vishada</small></div>
            <div>
              <div className="chapter-essence-title">Arjuna&apos;s Collapse <em>— &ldquo;My limbs give way, my mouth is dry.&rdquo; (1.29)</em></div>
              <div className="chapter-essence-body">The Gita begins not with wisdom, but with breakdown. The greatest archer in history freezes. The essence: the teaching only becomes possible after the seeker has genuinely admitted they do not know what to do. Denial is the obstacle. Honest despair is the doorway.</div>
            </div>
          </div>

          <div className="chapter-essence-card">
            <div className="chapter-essence-num">2<small>Sankhya</small></div>
            <div>
              <div className="chapter-essence-title">The Eternal Self <em>— &ldquo;Weapons cannot cut it.&rdquo; (2.23)</em></div>
              <div className="chapter-essence-body">Krishna&apos;s first correction is metaphysical. What you truly are cannot be destroyed. Fear of death is fear of losing something you never actually were. This chapter also contains the karma yoga verse (2.47) and the portrait of the sthitaprajna (2.55&ndash;72).</div>
            </div>
          </div>

          <div className="chapter-essence-card">
            <div className="chapter-essence-num">3<small>Karma</small></div>
            <div>
              <div className="chapter-essence-title">You Cannot Not Act <em>— &ldquo;No one can stay actionless even for a moment.&rdquo; (3.5)</em></div>
              <div className="chapter-essence-body">The escape hatch of renunciation is closed. Being embodied means acting. The only real question is whether your action is bondage or offering. Action as yajna (sacrifice) is the transformation Krishna proposes.</div>
            </div>
          </div>

          <div className="chapter-essence-card">
            <div className="chapter-essence-num">4<small>Jnana</small></div>
            <div>
              <div className="chapter-essence-title">Knowledge Burns Karma <em>— &ldquo;The fire of knowledge reduces all karmas to ash.&rdquo; (4.37)</em></div>
              <div className="chapter-essence-body">Krishna reveals that this teaching is not new. It descended through a lineage, was lost, and he is now restoring it. Wisdom, once genuinely arrived at, dissolves the karmic residue of countless past actions.</div>
            </div>
          </div>

          <div className="chapter-essence-card">
            <div className="chapter-essence-num">5<small>Sanyasa</small></div>
            <div>
              <div className="chapter-essence-title">The Lotus Leaf <em>— &ldquo;Untouched, like a lotus leaf by water.&rdquo; (5.10)</em></div>
              <div className="chapter-essence-body">The renunciation Krishna asks for is internal, not external. Act in the world without being wetted by it. The lotus leaf grows in the pond and stays dry. This is the image of the karma yogi.</div>
            </div>
          </div>

          <div className="chapter-essence-card">
            <div className="chapter-essence-num">6<small>Dhyana</small></div>
            <div>
              <div className="chapter-essence-title">Lift Yourself <em>— &ldquo;You are your own friend, or your own enemy.&rdquo; (6.5)</em></div>
              <div className="chapter-essence-body">The meditation chapter. Krishna teaches the practical technique, and Arjuna raises the honest objection that the mind is like the wind. The answer: abhyasa and vairagya &mdash; practice and detachment. Consistency, not talent.</div>
            </div>
          </div>

          <div className="chapter-essence-card">
            <div className="chapter-essence-num">7<small>Jnana Vijnana</small></div>
            <div>
              <div className="chapter-essence-title">Pearls on a String <em>— &ldquo;All this is strung on me like pearls on a thread.&rdquo; (7.7)</em></div>
              <div className="chapter-essence-body">Krishna begins to reveal his cosmic identity. The world is not separate from him. He is the taste in water, the light in the sun, the fragrance in earth. Devotion becomes possible because the divine is everywhere available.</div>
            </div>
          </div>

          <div className="chapter-essence-card">
            <div className="chapter-essence-num">8<small>Akshara</small></div>
            <div>
              <div className="chapter-essence-title">The Final Thought <em>— &ldquo;Whatever state one remembers at the end, that is what one becomes.&rdquo; (8.6)</em></div>
              <div className="chapter-essence-body">Death is not the topic; preparation is. Whatever the mind has practiced becomes the last thought. Therefore practice now. The whole life is preparation for one final moment of remembrance.</div>
            </div>
          </div>

          <div className="chapter-essence-card">
            <div className="chapter-essence-num">9<small>Raja Vidya</small></div>
            <div>
              <div className="chapter-essence-title">Leaf, Flower, Fruit, Water <em>— &ldquo;Whoever offers me with devotion&hellip; I accept.&rdquo; (9.26)</em></div>
              <div className="chapter-essence-body">The royal secret: devotion needs nothing elaborate. A leaf, a flower, a fruit, water &mdash; offered with love, that is enough. And the promise: &ldquo;my devotee never perishes&rdquo; (9.31).</div>
            </div>
          </div>

          <div className="chapter-essence-card">
            <div className="chapter-essence-num">10<small>Vibhuti</small></div>
            <div>
              <div className="chapter-essence-title">Wherever There Is Glory <em>— &ldquo;Whatever is glorious, powerful, or beautiful &mdash; know it as a spark of mine.&rdquo; (10.41)</em></div>
              <div className="chapter-essence-body">Krishna teaches the practice of vibhuti-darshan &mdash; seeing the divine in what excels. Not everything is God, but every excellence points toward God. The mountain among mountains, the poet among poets, the river among rivers.</div>
            </div>
          </div>

          <div className="chapter-essence-card">
            <div className="chapter-essence-num">11<small>Vishwarupa</small></div>
            <div>
              <div className="chapter-essence-title">The Cosmic Form <em>— &ldquo;I am Time, the great destroyer.&rdquo; (11.32)</em></div>
              <div className="chapter-essence-body">Arjuna asked to see. Krishna showed him: a thousand suns, mouths like fire, the universe entering and being consumed. The essence: the divine is not only the kind friend on the chariot. It is also the terrible force that dissolves worlds. Only devotion can bear the whole vision.</div>
            </div>
          </div>

          <div className="chapter-essence-card">
            <div className="chapter-essence-num">12<small>Bhakti</small></div>
            <div>
              <div className="chapter-essence-title">The Dear Devotee <em>— &ldquo;Who has no ill will toward any being&hellip; is dear to me.&rdquo; (12.13)</em></div>
              <div className="chapter-essence-body">The shortest chapter, and one of the most practical. Krishna sketches the portrait of the devotee he considers dear. The list is not about belief. It is about how the person treats other beings, how they carry gain and loss, whether they hold friendly-ness or enmity.</div>
            </div>
          </div>

          <div className="chapter-essence-card">
            <div className="chapter-essence-num">13<small>Kshetra</small></div>
            <div>
              <div className="chapter-essence-title">The Field and the Knower <em>— &ldquo;This body is called the field; the one who knows it is the knower.&rdquo; (13.2)</em></div>
              <div className="chapter-essence-body">The Gita&apos;s core metaphysical move. Your body, moods, sensations, reactions are the field. Something in you knows all of this. That knower is not the field. The whole spiritual practice is learning to abide as the knower.</div>
            </div>
          </div>

          <div className="chapter-essence-card">
            <div className="chapter-essence-num">14<small>Guna Traya</small></div>
            <div>
              <div className="chapter-essence-title">Three Forces of Weather <em>— &ldquo;Sattva binds through happiness, rajas through action, tamas through inertia.&rdquo; (14.9)</em></div>
              <div className="chapter-essence-body">The Gita&apos;s psychology of mood. Why some mornings are clear, some restless, some you cannot rise. Sattva, rajas, tamas are the three modes of nature. Understanding their pull is the beginning of the freedom that lies beyond them.</div>
            </div>
          </div>

          <div className="chapter-essence-card">
            <div className="chapter-essence-num">15<small>Purushottama</small></div>
            <div>
              <div className="chapter-essence-title">The Eternal Fragment <em>— &ldquo;An eternal fragment of me becomes the individual self.&rdquo; (15.7)</em></div>
              <div className="chapter-essence-body">The seed verse of the whole book, sitting inside chapter 15. Also: the image of the upside-down tree, roots above, branches below, to be cut with the sword of detachment. And Krishna finally names himself: Purushottama, the highest Self beyond every other self.</div>
            </div>
          </div>

          <div className="chapter-essence-card">
            <div className="chapter-essence-num">16<small>Daivasura</small></div>
            <div>
              <div className="chapter-essence-title">Three Gates of Ruin <em>— &ldquo;Kama, krodha, lobha &mdash; these three gates open into hell.&rdquo; (16.21)</em></div>
              <div className="chapter-essence-body">Two kinds of inner wealth: divine and demonic. Krishna lists both. The three gates of ruin &mdash; desire, anger, greed &mdash; must be renounced. Doing so is the ladder up. Not renouncing is the ladder down.</div>
            </div>
          </div>

          <div className="chapter-essence-card">
            <div className="chapter-essence-num">17<small>Shraddha</small></div>
            <div>
              <div className="chapter-essence-title">You Become Your Trust <em>— &ldquo;A person is made of their shraddha. As they trust, so they are.&rdquo; (17.3)</em></div>
              <div className="chapter-essence-body">Faith (shraddha) is not belief in doctrine. It is what your whole being trusts. The three gunas produce three kinds of shraddha, and therefore three kinds of food, austerity, and giving. What you trust becomes what you become.</div>
            </div>
          </div>

          <div className="chapter-essence-card">
            <div className="chapter-essence-num">18<small>Moksha</small></div>
            <div>
              <div className="chapter-essence-title">Take Refuge <em>— &ldquo;Abandon every duty; take refuge in me alone.&rdquo; (18.66)</em></div>
              <div className="chapter-essence-body">Seventy-eight verses to close the argument. Five causes of any action. Sva-dharma &mdash; your own duty done imperfectly is better than another&apos;s done well. And the final verse: sarva-dharman parityajya &mdash; release every framework, take refuge, do not grieve.</div>
            </div>
          </div>
        </div>

        <h2>The Seven Ideas That Hold the Whole Book Together</h2>
        <p>
          If you step back from the 18 chapters, the Gita repeats seven themes so consistently that any real saar has to name them. Everything else is elaboration on these.
        </p>

        <ul className="practice-list">
          <li>
            <span><strong>1. The imperishable Self.</strong> Whatever you fundamentally are is not born and does not die. Fear of ending is fear of losing something you never actually were. This is the metaphysical foundation of everything that follows.</span>
          </li>
          <li>
            <span><strong>2. Action without craving for the fruit.</strong> The signature teaching of the book. Do your work fully; release the outcome. The Gita is not asking you to be indifferent. It is asking you to stop being owned by the result.</span>
          </li>
          <li>
            <span><strong>3. Your own dharma, imperfectly.</strong> Sva-dharma over para-dharma. Your own duty, even done badly, is better than someone else&apos;s done well. This is the Gita&apos;s answer to the fantasy that a different life would have been the right one.</span>
          </li>
          <li>
            <span><strong>4. Equanimity as the mark of wisdom.</strong> The sthitaprajna in chapter 2, the karma yogi in chapter 5, the devotee in chapter 12, the tri-gunatita in chapter 14 &mdash; the same portrait keeps returning. Steady in pleasure and pain. Equal to friend and foe. The Gita measures wisdom by this steadiness.</span>
          </li>
          <li>
            <span><strong>5. Devotion as the direct path.</strong> Bhakti is not one option among many; the Gita treats it as the shortest and most complete route. Chapters 7 through 12 are essentially an argument that whole-hearted devotion contains everything the other paths deliver, and more.</span>
          </li>
          <li>
            <span><strong>6. The world is a manifestation of the divine.</strong> Krishna is not far away. He is the taste of water, the light of the sun, the intelligence of the intelligent. The world is not something to escape; it is something to see through.</span>
          </li>
          <li>
            <span><strong>7. Surrender is the final teaching.</strong> After all the paths &mdash; action, knowledge, meditation, devotion &mdash; the final verse is release. Abandon every dharma, take refuge, do not grieve. Everything the book has taught comes to rest here.</span>
          </li>
        </ul>

        <h2>Three Common Misreadings, and What the Text Actually Says</h2>
        <h3>Misreading 1: &ldquo;The Gita teaches passivity&rdquo;</h3>
        <p>
          BG 2.47 is often quoted as though it teaches indifference to results. It does not. The verse contains four instructions, and the fourth &mdash; &ldquo;do not fall into inaction&rdquo; &mdash; is Krishna directly blocking the passivity reading. The Gita is a book delivered on a battlefield to a soldier who wanted to leave. Its message is: act, act fully, but release the craving.
        </p>

        <h3>Misreading 2: &ldquo;Whatever happens is for the good&rdquo;</h3>
        <p>
          This is the WhatsApp Geeta Saar reading. It is a consolation, and it is not what Krishna says. The Gita is not fatalistic. It insists on right action. What Krishna teaches is not that outcomes do not matter, but that outcomes do not define you. Those are very different claims.
        </p>

        <h3>Misreading 3: &ldquo;The Gita is a Hindu book&rdquo;</h3>
        <p>
          The Gita is embedded in the Mahabharata and forms part of the Hindu canon, yes. But its problem &mdash; a person paralyzed before a hard, unavoidable duty &mdash; is a human problem. Gandhi, Emerson, Thoreau, Vivekananda, Aldous Huxley all read the Gita as a universal document. The essence does not require you to be Hindu. It requires you to have faced a genuinely difficult choice.
        </p>

        <div className="highlight-box">
          <h3>If someone asks you for the Geeta Saar in one sentence</h3>
          <p>
            You are an eternal fragment of the divine, temporarily embodied. Do your own duty fully. Release the craving for its fruit. Face what is in front of you with equanimity. When it becomes too much, take refuge. Do not grieve.
          </p>
        </div>

        <h2>How to Actually Use This Saar</h2>
        <p>
          A summary is a map, not the territory. The Gita is written as a dialogue for a reason: watching Arjuna change over 700 verses does something a bullet list cannot do. Here is a practical way to use the essence without abandoning the source.
        </p>

        <ul className="practice-list">
          <li>
            <span><strong>Start with chapters 2, 12, and 18.</strong> If you only ever read three chapters, read these. Chapter 2 gives you the metaphysical foundation and the karma yoga instruction. Chapter 12 gives you the practical portrait of a devotee. Chapter 18 closes the whole argument.</span>
          </li>
          <li>
            <span><strong>Memorize the four essence verses.</strong> 2.47, 15.7, 18.66, 9.22. Keep them in a note on your phone. Return to them when you are anxious about outcomes, uncertain about who you are, exhausted by too many dharmas, or wondering if effort is worth it.</span>
          </li>
          <li>
            <span><strong>Read one chapter&apos;s essence a day for eighteen days.</strong> Use the chapter grid above as a daily reflection. Not more than one at a time. Sit with the essence, look up the chapter, then move on. In three weeks you will have carried the whole book in your body.</span>
          </li>
          <li>
            <span><strong>Do not stop at the saar.</strong> The essence is compressed. The verses expand it. If a chapter&apos;s essence pulls at you, read the full chapter that week. The Gita rewards slow reading in a way summaries cannot reproduce.</span>
          </li>
        </ul>

        <h2>The Real Geeta Saar</h2>
        <p>
          If you take away one thing, take away this. The Gita is not a WhatsApp forward about how everything is for the good. It is a book delivered to a warrior who wanted to run, and its instruction is more difficult than a poster on a wall. Do your work. Release the fruit. Take refuge when the dharma frameworks fail. Trust that whatever you fundamentally are cannot be destroyed. That is the essence. Everything else in the book is Krishna helping Arjuna understand why this instruction is possible.
        </p>
        <p>
          Arjuna, at the end of chapter 18, says: <em>naṣṭo mohaḥ smṛtir labdhā</em> &mdash; my delusion is gone and I have recovered my memory. That line is the human report on the whole teaching. The saar worked. He remembers who he is. He is ready to act.
        </p>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>What is Geeta Saar (गीता सार)?</strong>
          <p>
            Geeta Saar means &ldquo;the essence of the Gita.&rdquo; It is a distilled summary of what Krishna teaches Arjuna across the 700 verses of the Bhagavad Gita. The most viral version circulating in Hindi (&ldquo;What did you bring, what will you take?&rdquo;) is a folk paraphrase and is not a direct verse from the Gita. The actual essence, drawn from the text, centers on four ideas: the imperishable Self, action without craving for results, devotion as the direct path, and surrender to the divine.
          </p>
        </div>

        <div className="faq-item">
          <strong>Is the famous &ldquo;क्या लेकर आए थे&rdquo; Geeta Saar quote actually from the Bhagavad Gita?</strong>
          <p>
            No. The Hindi passage that begins &ldquo;क्या लेकर आए थे, क्या लेकर जाओगे&rdquo; (&ldquo;What did you bring, what will you take?&rdquo;) is a modern devotional paraphrase, likely popularized by Doordarshan&apos;s Mahabharat serial. It captures a general Hindu sentiment about impermanence, but it is not a direct translation of any single Gita verse. The closest actual Gita teaching on non-possession is BG 2.22 (the soul discards old bodies like worn clothes) and BG 2.14 (impermanence is the nature of experience).
          </p>
        </div>

        <div className="faq-item">
          <strong>What is the single most important verse in the Bhagavad Gita?</strong>
          <p>
            The most-cited verse is BG 2.47: <em>karmaṇyevādhikāraste mā phaleṣu kadācana</em>. &ldquo;You have the right to your action, never to its fruit.&rdquo; Traditional commentators consider BG 18.66 (<em>sarva-dharmān parityajya</em>) the ultimate teaching, because it is Krishna&apos;s final instruction. BG 15.7 is called the &ldquo;seed verse&rdquo; because it declares the individual soul as an eternal fragment of the divine. Any of these three could reasonably be called the &ldquo;essence verse&rdquo; of the Gita.
          </p>
        </div>

        <div className="faq-item">
          <strong>Can I read the Gita Saar instead of the full Bhagavad Gita?</strong>
          <p>
            The saar (essence) is a useful map, not a replacement. A summary can point you to what to look for. It cannot substitute for the experience of reading Krishna&apos;s actual dialogue with Arjuna. The Gita&apos;s power comes partly from watching the argument develop across 18 chapters, from Arjuna&apos;s collapse in Chapter 1 to his transformation in Chapter 18. Use the saar as an orientation, then read at least chapters 2, 3, 12, and 18 in full.
          </p>
        </div>

        <div className="faq-item">
          <strong>What is the difference between Geeta Saar and Geeta Updesh?</strong>
          <p>
            Geeta Updesh (गीता उपदेश) refers to the teachings Krishna delivered &mdash; the full 700-verse discourse. Geeta Saar (गीता सार) refers to the distilled essence of those teachings. Updesh is the primary text; saar is the summary. In colloquial Hindi, both terms are sometimes used interchangeably, but the technical distinction is that updesh is the instruction itself while saar is what remains when the instruction is compressed to its core.
          </p>
        </div>

        <div className="faq-item">
          <strong>Who is the Geeta Saar addressed to?</strong>
          <p>
            Krishna delivered the Bhagavad Gita to Arjuna on the battlefield of Kurukshetra. But Arjuna is a stand-in. His paralysis before a difficult, unavoidable duty is the universal human condition. The saar is addressed to anyone who has ever frozen before a hard choice, doubted whether their effort matters, feared the loss of what they love, or wondered whether it is possible to act well in a broken world.
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

      <BlogTracker pageName="Bhagwat Geeta Saar" />
    </>
  )
}
