import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import ShlokaCard from '@/components/gita/ShlokaCard'

export const metadata: Metadata = {
  title: "20 Famous Sanskrit Shlokas with Meaning in Hindi and English | Wisdom",
  description: "The 20 most famous Sanskrit shlokas every educated person should know. From Vakratunda Mahakaya to Om Purnamadah, with accurate Devanagari, IAST, English and Hindi meaning, and context.",
  keywords: "sanskrit shlokas, famous sanskrit shlokas, sanskrit shlokas with meaning, sanskrit shloka, shloka in sanskrit, famous shlokas, sanskrit shlokas with hindi meaning, easy sanskrit shlokas, sanskrit shlokas for students, popular sanskrit shlokas",
  openGraph: {
    title: "20 Famous Sanskrit Shlokas — with Meaning in Hindi and English | Wisdom",
    description: "The twenty Sanskrit shlokas every educated Indian should know by heart. Devanagari, IAST, English, and Hindi meaning for each.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/20-famous-sanskrit-shlokas",
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/20-famous-sanskrit-shlokas" },
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
    "headline": "20 Famous Sanskrit Shlokas — with Meaning in Hindi and English",
    "description": "The twenty Sanskrit shlokas every educated Indian should know by heart — from Vakratunda Mahakaya to Om Purnamadah — with accurate Devanagari, IAST, English, and Hindi meaning.",
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
        "name": "What is a shloka in Sanskrit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A shloka (श्लोक) is the standard verse form of classical Sanskrit poetry. Its most common meter is the anushtubh: 32 syllables arranged in four quarters (padas) of eight syllables each. The Bhagavad Gita, the Ramayana, and much of the Mahabharata are composed in this meter. The shloka is designed for oral memorization — the rhythm makes it possible to carry the text in the body across a lifetime."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between a shloka and a mantra?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A shloka is a verse; a mantra is a formula. Every mantra can be recited, but not every shloka is a mantra. Mantras (like the Gayatri or Om Namah Shivaya) are considered to carry power in their sound itself, often revealed to a rishi and used for meditation or ritual. Shlokas are compositions — they carry meaning, story, philosophy. The Gayatri is both: a verse from the Rig Veda used as a mantra."
        }
      },
      {
        "@type": "Question",
        "name": "What is the easiest Sanskrit shloka to learn first?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For most learners, Vakratunda Mahakaya — the Ganesha invocation — is the natural first shloka. It is short, rhythmically clear, culturally familiar, and it is the traditional opening prayer before any new endeavour. Guru Brahma, Guru Vishnu is also very common as a second shloka. Both fit in four short lines and are easy to chant aloud once a day."
        }
      },
      {
        "@type": "Question",
        "name": "How do I pronounce Sanskrit shlokas correctly?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sanskrit pronunciation follows precise rules: long and short vowels differ, aspirated and unaspirated consonants differ, and each syllable is enunciated fully. The IAST transliteration (with diacritics) tells you exactly where the long vowels and retroflex consonants are. Start by listening to a trained reciter for each shloka on the Wisdom app or a reliable recording, then chant along slowly for a week before speeding up. Do not learn Sanskrit pronunciation from an ordinary romanised spelling — it will teach you the wrong sounds."
        }
      },
      {
        "@type": "Question",
        "name": "Which is the most powerful Sanskrit shloka?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "'Powerful' is tradition-dependent. The Gayatri Mantra is the most universally revered — it is the mantra given at the sacred thread ceremony and considered the mother of the Vedas. The Mrityunjaya mantra (Om Tryambakam Yajamahe) is invoked for healing and long life. From the Gita, BG 18.66 (sarva-dharman parityajya) is called the charama shloka — the ultimate verse. Ultimately, the shloka you actually recite daily becomes the powerful one for you."
        }
      },
      {
        "@type": "Question",
        "name": "Why do English translations of the same shloka differ so much?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sanskrit is dense. A single word can carry multiple technical meanings — dharma, karma, yoga, atman have no clean English equivalents. Translators must choose between literal, philosophical, or devotional readings. Older translations (Max Muller, Radhakrishnan) tend toward the philosophical; devotional lineages (Iskcon, Chinmaya) tend toward the theological; modern academic ones aim for the literal. Reading two or three translations side by side is the fastest way to see the actual range of the verse."
        }
      }
    ]
  }
]

export default function TwentyFamousSanskritShlokasPage() {
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
          20 Famous Sanskrit Shlokas
        </div>
      </div>

      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Sanskrit &middot; The Twenty Every Person Should Know
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            20 Famous Sanskrit Shlokas &mdash;<br />
            <em>with Meaning in Hindi and English</em>
          </h1>
          <p className="article-subtitle">
            Twenty short verses that carry the compressed wisdom of a civilisation. From the Ganesha invocation to the peace mantra of the Isha Upanishad &mdash; in accurate Devanagari, IAST, English, and Hindi.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
            <span className="meta-sep">&middot;</span>
            <span className="meta-item">20 Shlokas &middot; 5 Themes</span>
            <span className="meta-sep">&middot;</span>
            <span className="meta-item">~18 min read</span>
            <span className="meta-sep">&middot;</span>
            <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Published July 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology &rarr;</a></span>
          </div>
        </div>
      </div>

      <div className="content">
        <figure className="chapter-image">
          <img
            src="/assets/chapter7.webp"
            alt="A collection of famous Sanskrit shlokas from the Vedas, Upanishads, and Bhagavad Gita"
            width="1200"
            height="675"
            loading="eager"
            fetchPriority="high"
          />
          <figcaption>Twenty shlokas, five themes: what an educated Indian should carry by heart</figcaption>
        </figure>

        <p className="lead">
          A Sanskrit shloka is a small, precise thing. Thirty-two syllables. Four quarter-lines. And often, inside that compression, an idea large enough to organise a life. The verses in this article have travelled across three thousand years because they say more per syllable than almost any language has ever managed. Memorising a handful of them is one of the most durable gifts you can give yourself.
        </p>
        <p>
          What follows is not a random collection. These twenty shlokas are the ones an educated Indian, or anyone drawn to the Sanskrit tradition, ought to know by heart. Four opening prayers. Five verses from the Bhagavad Gita. Four Upanishadic statements on wisdom and truth. Three on devotion and the guru. Four on peace and blessing. For each verse you will get the Devanagari, the IAST transliteration, an English translation, the Hindi meaning, and one or two lines on where the verse comes from and how it is used.
        </p>

        <div className="highlight-box">
          <h3>How to read this article</h3>
          <p>
            You do not have to memorise all twenty at once. Pick one shloka per week, chant it aloud twice a day, and by the end of five months you will carry all twenty in your body. The verse you recite becomes the verse that arrives when you actually need it &mdash; before a difficult meeting, at the bedside of a sick parent, on the morning of an exam, or in the small hours when the mind will not settle.
          </p>
        </div>

        <h2>What Makes a Shloka a Shloka</h2>
        <p>
          The word <em>shloka</em> (श्लोक) originally meant &ldquo;fame&rdquo; or &ldquo;praise&rdquo; in Vedic Sanskrit. In classical usage it came to mean the standard verse form of Sanskrit epic and philosophical poetry. Its most common metre is the <em>anushtubh</em>: thirty-two syllables arranged in four quarters (called <em>padas</em>) of eight syllables each. The Ramayana, the Mahabharata, and the Bhagavad Gita are almost entirely composed in this metre.
        </p>
        <p>
          The anushtubh has rules about where long and short syllables can fall, but the rules are flexible enough that ordinary speech can be shaped into it. That flexibility is why the metre became the workhorse of Sanskrit literature. It carries philosophy, story, prayer, satire, and law with equal grace. Not every famous Sanskrit verse is a shloka in the strict metrical sense &mdash; some of the Vedic verses in this article are in the older Gayatri metre or the Trishtubh, and the Upanishadic <em>Om Purnamadah</em> is prose &mdash; but in ordinary speech people call any short Sanskrit verse a shloka, and that is the sense used here.
        </p>
        <p>
          What matters practically is that these verses were designed for oral transmission. The rhythm makes them easy to memorise, and the memorisation is not incidental to their power. A shloka you have carried in the body for years arrives on its own when the situation calls for it. This is why the tradition insists on chanting, not just reading.
        </p>

        <h2>The 20 Shlokas Every Educated Person Should Know</h2>
        <p>
          The verses are grouped in five thematic sections. Within each group the arrangement moves roughly from the most universally known to the more specialised. Read one, chant it out loud, sit with its meaning, then move to the next.
        </p>

        <h3>Part I: Opening Prayers (Mangalacharan)</h3>
        <p>
          Every new beginning in the Sanskrit tradition &mdash; a book, a class, a ritual, a journey &mdash; opens with a <em>mangalacharan</em>, an auspicious invocation. These four are the ones you will hear most often in ordinary Hindu life.
        </p>

        <ShlokaCard
          verseRef="Traditional Ganesha Invocation"
          sanskrit="वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥"
          iast="vakratuṇḍa mahākāya sūryakoṭi samaprabha | nirvighnaṃ kuru me deva sarvakāryeṣu sarvadā ||"
          meaningLabel="Translation"
          meaning="O Lord with the curved trunk and the great body, whose radiance equals a thousand million suns, remove all obstacles from my path in every undertaking, always."
          insightLabel="Context & Use"
          insight="The single most recited shloka in Hindu life. Chanted at the start of any new venture — a book, a wedding, a business, a school year. Ganesha is the Vighnaharta, the remover of obstacles, and this verse is the shortest, most complete request for his blessing."
          essence="Before you begin anything, ask for the obstacles to fall away."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            हे टेढ़ी सूँड़ और विशाल शरीर वाले, करोड़ों सूर्यों के समान तेज वाले भगवान गणेश! कृपया मेरे सभी कार्यों में सदा विघ्न-बाधाओं को दूर कीजिए।
          </div>
        </div>

        <ShlokaCard
          verseRef="Taittiriya Upanishad 2.2.2 (Peace Mantra)"
          sanskrit="ॐ सह नाववतु । सह नौ भुनक्तु । सह वीर्यं करवावहै । तेजस्वि नावधीतमस्तु मा विद्विषावहै ॥ ॐ शान्तिः शान्तिः शान्तिः ॥"
          iast="oṃ saha nāvavatu | saha nau bhunaktu | saha vīryaṃ karavāvahai | tejasvi nāvadhītamastu mā vidviṣāvahai || oṃ śāntiḥ śāntiḥ śāntiḥ ||"
          meaningLabel="Translation"
          meaning="Om. May we be protected together. May we be nourished together. May we work together with great vigour. May our study be radiant and effective. May we never quarrel. Om, peace, peace, peace."
          insightLabel="Context & Use"
          insight="The classical prayer chanted by teacher and student together before a lesson. It asks not for individual excellence but for shared protection, shared nourishment, and the absence of enmity between the two who study. It is a definition, in prayer form, of what teaching actually is."
          essence="Let us study together, without rivalry, and prosper together."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            ॐ, हम दोनों (गुरु और शिष्य) की एक साथ रक्षा हो, हमारा एक साथ पालन-पोषण हो। हम एक साथ मिलकर पूरे उत्साह से कार्य करें। हमारा अध्ययन तेजस्वी बने। हममें कभी परस्पर द्वेष न हो। ॐ शान्ति, शान्ति, शान्ति।
          </div>
        </div>

        <ShlokaCard
          verseRef="Brihadaranyaka Upanishad 1.3.28"
          sanskrit="ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय ॥ ॐ शान्तिः शान्तिः शान्तिः ॥"
          iast="oṃ asato mā sadgamaya | tamaso mā jyotirgamaya | mṛtyor mā amṛtaṃ gamaya || oṃ śāntiḥ śāntiḥ śāntiḥ ||"
          meaningLabel="Translation"
          meaning="Om. Lead me from the unreal to the real. Lead me from darkness to light. Lead me from death to immortality. Om, peace, peace, peace."
          insightLabel="Context & Use"
          insight="One of the oldest and most famous Upanishadic prayers, known as the Pavamana mantra. It is the shortest complete summary of the spiritual life — a movement from illusion to truth, from ignorance to wisdom, from mortality to what does not die. Chanted daily by many Vedantins as their first prayer of the morning."
          essence="From the false to the real. From darkness to light. From death to what does not die."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            ॐ, मुझे असत्य से सत्य की ओर ले चलो। अंधकार से प्रकाश की ओर ले चलो। मृत्यु से अमरत्व की ओर ले चलो। ॐ शान्ति, शान्ति, शान्ति।
          </div>
        </div>

        <ShlokaCard
          verseRef="Rig Veda 3.62.10 (Gayatri Mantra)"
          sanskrit="ॐ भूर्भुवः स्वः । तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि । धियो यो नः प्रचोदयात् ॥"
          iast="oṃ bhūrbhuvaḥ svaḥ | tat savitur vareṇyaṃ bhargo devasya dhīmahi | dhiyo yo naḥ pracodayāt ||"
          meaningLabel="Translation"
          meaning="Om, across earth, atmosphere, and heaven. Let us meditate on that most excellent radiance of the divine Sun, who may inspire our understanding."
          insightLabel="Context & Use"
          insight="The mother of the Vedas, given at the sacred thread ceremony (upanayana) and traditionally recited at dawn, noon, and dusk. Twenty-four syllables in the Gayatri metre, addressed to Savitr — the vivifying aspect of the Sun. Its subject is not asking for anything material; it is asking that our very intelligence be illumined."
          essence="Let the light of the divine Sun awaken our understanding."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            ॐ, भूः (पृथ्वी), भुवः (अन्तरिक्ष) और स्वः (स्वर्ग) &mdash; इन तीनों लोकों में व्याप्त उस सविता देव (सूर्य) के श्रेष्ठ तेज का हम ध्यान करते हैं, जो हमारी बुद्धि को प्रेरित करे।
          </div>
        </div>

        <h3>Part II: From the Bhagavad Gita</h3>
        <p>
          The Bhagavad Gita contributes more famous shlokas to daily Indian speech than any other text. These five are the ones most often quoted, chanted, and printed on the back of trucks.
        </p>

        <ShlokaCard
          verseRef="Bhagavad Gita 2.47"
          sanskrit="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥"
          iast="karmaṇyevādhikāraste mā phaleṣu kadācana | mā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi ||"
          meaningLabel="Translation"
          meaning="You have the right to action alone, never to its fruits. Do not let the fruit of action be your motive. And do not become attached to inaction."
          insightLabel="Context & Use"
          insight="The signature verse of the Bhagavad Gita and, arguably, the most quoted line in all Indian philosophy. It compresses the entire teaching of karma yoga into a single shloka. Note the fourth line: Krishna anticipates the misreading that says 'if I should not want results, why act?' and blocks it in advance."
          essence="Perform your action. Release the fruit. Do not disengage."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            तुम्हारा अधिकार केवल कर्म करने में है, उसके फल में कभी नहीं। इसलिए फल की इच्छा को अपने कर्म का कारण मत बनाओ, और न ही कर्म न करने में आसक्ति रखो।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 4.7"
          sanskrit="यदा यदा हि धर्मस्य ग्लानिर्भवति भारत । अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥"
          iast="yadā yadā hi dharmasya glānir bhavati bhārata | abhyutthānam adharmasya tadātmānaṃ sṛjāmyaham ||"
          meaningLabel="Translation"
          meaning="Whenever there is a decline of dharma, O Bharata, and a rise of adharma, then I manifest myself."
          insightLabel="Context & Use"
          insight="Krishna's declaration of the divine promise. This verse and the next (4.8) are the classical scriptural basis for the doctrine of avatara — the divine descent into the world when righteousness is threatened. Chanted at the beginning of Ramayana and Krishna festivals across India."
          essence="Whenever dharma weakens, the divine returns."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            हे भारत! जब-जब धर्म की हानि और अधर्म की वृद्धि होती है, तब-तब मैं स्वयं को प्रकट करता हूँ।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 4.8"
          sanskrit="परित्राणाय साधूनां विनाशाय च दुष्कृताम् । धर्मसंस्थापनार्थाय सम्भवामि युगे युगे ॥"
          iast="paritrāṇāya sādhūnāṃ vināśāya ca duṣkṛtām | dharmasaṃsthāpanārthāya sambhavāmi yuge yuge ||"
          meaningLabel="Translation"
          meaning="For the protection of the good, for the destruction of evildoers, for the firm establishment of dharma, I take birth age after age."
          insightLabel="Context & Use"
          insight="The immediate continuation of 4.7 and often chanted together with it. Note the three infinitives: protection, destruction, establishment. The avatara is not only a saviour of the good but an active restorer of the order that has been broken. This is the verse that gave Indian devotional life its endlessly renewable hope."
          essence="I return, age after age, to protect the good and restore dharma."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            साधु पुरुषों की रक्षा के लिए, दुष्कर्म करने वालों के विनाश के लिए और धर्म की भली-भाँति स्थापना के लिए मैं युग-युग में प्रकट होता हूँ।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 15.15"
          sanskrit="सर्वस्य चाहं हृदि सन्निविष्टो मत्तः स्मृतिर्ज्ञानमपोहनं च । वेदैश्च सर्वैरहमेव वेद्यो वेदान्तकृद्वेदविदेव चाहम् ॥"
          iast="sarvasya cāhaṃ hṛdi sanniviṣṭo mattaḥ smṛtir jñānam apohanaṃ ca | vedaiśca sarvair aham eva vedyo vedāntakṛd vedavid eva cāham ||"
          meaningLabel="Translation"
          meaning="I am seated in the hearts of all beings. From me come memory, knowledge, and their loss. I alone am to be known through all the Vedas. I am the author of Vedanta, and I am also the knower of the Vedas."
          insightLabel="Context & Use"
          insight="One of Krishna's most explicit statements of his indwelling nature. It is chanted before meals in many households as part of the Vaishnava tradition — a reminder that the giver, the food, and the eater are all held within the same divine presence. Also central to the Upanishadic teaching that God is not distant but seated in the heart."
          essence="The divine is seated in every heart, and every scripture points there."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            मैं सब प्राणियों के हृदय में स्थित हूँ। मुझसे ही स्मृति, ज्ञान और उनका लोप होता है। सब वेदों के द्वारा जानने योग्य मैं ही हूँ। वेदान्त का रचयिता और वेदों को जानने वाला भी मैं ही हूँ।
          </div>
        </div>

        <ShlokaCard
          verseRef="Bhagavad Gita 18.66"
          sanskrit="सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज । अहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥"
          iast="sarvadharmān parityajya mām ekaṃ śaraṇaṃ vraja | ahaṃ tvā sarvapāpebhyo mokṣayiṣyāmi mā śucaḥ ||"
          meaningLabel="Translation"
          meaning="Abandon every dharma and take refuge in me alone. I will free you from all sins. Do not grieve."
          insightLabel="Context & Use"
          insight="Traditional commentators call this the charama shloka — the ultimate verse of the Bhagavad Gita. After seventeen chapters of instruction about action, knowledge, meditation, and devotion, Krishna's final word is a release: let go of every framework you have been holding, take refuge, and do not grieve."
          essence="Let go of every framework. Take refuge. Do not grieve."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            सभी धर्मों (कर्तव्यों) का परित्याग करके तुम केवल मेरी शरण में आओ। मैं तुम्हें सब पापों से मुक्त कर दूँगा। शोक मत करो।
          </div>
        </div>

        <h3>Part III: On Wisdom and Truth</h3>
        <p>
          These four are the great Upanishadic and Vedic statements &mdash; the sentences that Indian philosophy has been unpacking for three thousand years. Some are quoted daily by politicians and journalists without any awareness of their source; all four repay a lifetime of contemplation.
        </p>

        <ShlokaCard
          verseRef="Mundaka Upanishad 3.1.6"
          sanskrit="सत्यमेव जयते नानृतं सत्येन पन्था विततो देवयानः । येनाक्रमन्त्यृषयो ह्याप्तकामा यत्र तत् सत्यस्य परमं निधानम् ॥"
          iast="satyam eva jayate nānṛtaṃ satyena panthā vitato devayānaḥ | yenākramanty ṛṣayo hyāptakāmā yatra tat satyasya paramaṃ nidhānam ||"
          meaningLabel="Translation"
          meaning="Truth alone triumphs, not untruth. By truth is laid out the path of the gods, along which the sages, their desires fulfilled, ascend to where the supreme treasure of truth is placed."
          insightLabel="Context & Use"
          insight="The first three words, satyameva jayate, are the national motto of the Republic of India, inscribed at the base of the Ashoka emblem. Note that the full verse makes truth not only a moral principle but a road — the path along which the rishis themselves have travelled to the highest reality."
          essence="Truth alone triumphs. It is also the road."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            सत्य की ही जय होती है, असत्य की नहीं। सत्य से ही देवयान मार्ग विस्तृत है, जिस पर आप्तकाम ऋषिजन चलकर वहाँ पहुँचते हैं जहाँ सत्य का परम निधान है।
          </div>
        </div>

        <ShlokaCard
          verseRef="Maha Upanishad 6.72"
          sanskrit="अयं निजः परो वेति गणना लघुचेतसाम् । उदारचरितानां तु वसुधैव कुटुम्बकम् ॥"
          iast="ayaṃ nijaḥ paro veti gaṇanā laghucetasām | udāracaritānāṃ tu vasudhaiva kuṭumbakam ||"
          meaningLabel="Translation"
          meaning="&lsquo;This one is mine, that one is a stranger&rsquo; &mdash; such calculation belongs to the small-minded. For those of noble character, the whole earth is one family."
          insightLabel="Context & Use"
          insight="Inscribed in the Parliament House of India and quoted by every Prime Minister at some point. Notice the moral architecture: it is not simply a sentimental claim about universal brotherhood. It is a distinction between two kinds of character — the small mind that classifies, and the udara (noble, expansive) mind that includes."
          essence="The whole earth is one family — for those large enough to feel it."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            &lsquo;यह अपना है, यह पराया है&rsquo; &mdash; ऐसा भेदभाव संकीर्ण बुद्धि वालों के मन में होता है। उदार चरित्र वाले लोगों के लिए तो सम्पूर्ण पृथ्वी ही एक परिवार है।
          </div>
        </div>

        <ShlokaCard
          verseRef="Rig Veda 1.164.46"
          sanskrit="एकं सद्विप्रा बहुधा वदन्ति अग्निं यमं मातरिश्वानमाहुः ॥"
          iast="ekaṃ sad viprā bahudhā vadanti agniṃ yamaṃ mātariśvānam āhuḥ ||"
          meaningLabel="Translation"
          meaning="Truth is one; the wise speak of it by many names. They call it Agni, Yama, Matarishvan."
          insightLabel="Context & Use"
          insight="The oldest statement of religious pluralism in world literature, sitting inside the Rig Veda itself. Vivekananda quoted this line at the 1893 Parliament of Religions in Chicago, and it has been the intellectual foundation of Hindu tolerance of many paths ever since. The reality is one — the vocabularies are many."
          essence="Truth is one. The wise call it by many names."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            सत् (परम सत्य) एक ही है, विद्वान् उसे अनेक नामों से पुकारते हैं &mdash; अग्नि, यम, मातरिश्वा।
          </div>
        </div>

        <ShlokaCard
          verseRef="Brihadaranyaka Upanishad 1.4.10"
          sanskrit="अहं ब्रह्मास्मि ॥"
          iast="ahaṃ brahmāsmi ||"
          meaningLabel="Translation"
          meaning="I am Brahman."
          insightLabel="Context & Use"
          insight="One of the four mahavakyas — the great utterances — of the Upanishads. It is the recognition by the seer Vamadeva that his own essential nature is not different from the ultimate reality. It is not a boast; it is the culmination of jnana yoga. Adi Shankaracharya built his entire philosophy on this single sentence."
          essence="What I fundamentally am is not different from what everything fundamentally is."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            मैं ब्रह्म हूँ। (मेरा वास्तविक स्वरूप उस परम सत्ता से अलग नहीं है जो सम्पूर्ण सृष्टि का आधार है।)
          </div>
        </div>

        <h3>Part IV: On Devotion and the Guru</h3>
        <p>
          Three of the most tender verses in the tradition, addressed to the teacher, the divine as parent, and the daily blessing on the working hands.
        </p>

        <ShlokaCard
          verseRef="Guru Stotram (Skanda Purana)"
          sanskrit="गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः । गुरुः साक्षात् परं ब्रह्म तस्मै श्री गुरवे नमः ॥"
          iast="gurur brahmā gurur viṣṇuḥ gurur devo maheśvaraḥ | guruḥ sākṣāt paraṃ brahma tasmai śrī gurave namaḥ ||"
          meaningLabel="Translation"
          meaning="The guru is Brahma. The guru is Vishnu. The guru is the Lord Maheshwara. The guru is verily the supreme Brahman. To that revered guru, I bow."
          insightLabel="Context & Use"
          insight="Chanted daily at the start of any traditional class in music, dance, Sanskrit, or philosophy. Its logic is bold: the teacher is not merely a representative of the divine but, in the moment of teaching, the divine itself. Also chanted on Guru Purnima, the summer full moon dedicated to the teacher."
          essence="The one who removes your ignorance is, at that moment, the divine itself."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            गुरु ही ब्रह्मा हैं, गुरु ही विष्णु हैं, गुरु ही महेश्वर हैं। गुरु ही साक्षात् परब्रह्म हैं। उन श्री गुरुदेव को मेरा नमस्कार है।
          </div>
        </div>

        <ShlokaCard
          verseRef="Traditional Devotional Verse"
          sanskrit="त्वमेव माता च पिता त्वमेव त्वमेव बन्धुश्च सखा त्वमेव । त्वमेव विद्या द्रविणं त्वमेव त्वमेव सर्वं मम देव देव ॥"
          iast="tvameva mātā ca pitā tvameva tvameva bandhuśca sakhā tvameva | tvameva vidyā draviṇaṃ tvameva tvameva sarvaṃ mama deva deva ||"
          meaningLabel="Translation"
          meaning="You alone are mother and father. You alone are relative and friend. You alone are knowledge and wealth. You alone are everything to me, O God of gods."
          insightLabel="Context & Use"
          insight="One of the most emotionally direct devotional verses in the Sanskrit tradition. Its rhetorical device is the repetition of tvameva &mdash; 'you alone' &mdash; through every human role of intimacy and support. Chanted at the close of aartis and in bhajans across sects."
          essence="Every relationship of shelter — parent, friend, teacher — is finally the one Divine."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            तुम ही माता हो, तुम ही पिता हो। तुम ही बन्धु हो, तुम ही सखा हो। तुम ही विद्या हो, तुम ही धन हो। हे देवों के देव! तुम ही मेरे सर्वस्व हो।
          </div>
        </div>

        <ShlokaCard
          verseRef="Traditional Morning Verse"
          sanskrit="कराग्रे वसते लक्ष्मीः करमध्ये सरस्वती । करमूले तु गोविन्दः प्रभाते करदर्शनम् ॥"
          iast="karāgre vasate lakṣmīḥ karamadhye sarasvatī | karamūle tu govindaḥ prabhāte karadarśanam ||"
          meaningLabel="Translation"
          meaning="At the tip of the hand dwells Lakshmi. In the middle of the hand dwells Saraswati. At the base of the hand dwells Govinda. Therefore, in the morning, look upon your hands."
          insightLabel="Context & Use"
          insight="The verse most Hindu children learn first, taught by grandmothers to fold into the morning. Look at your palms before your feet touch the floor. The tip earns; the middle knows; the base blesses. It is a whole philosophy of work compressed into eight syllables per line."
          essence="Before the day begins, look at the hands that will do it."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            हाथ के अग्रभाग में लक्ष्मी का वास है, मध्य भाग में सरस्वती का, और मूल भाग में गोविन्द (विष्णु) का। इसलिए प्रातःकाल उठकर अपने हाथों के दर्शन करने चाहिए।
          </div>
        </div>

        <h3>Part V: On Peace and Blessing</h3>
        <p>
          The final four are prayers for the world &mdash; the shanti mantras with which Sanskrit tradition closes any reading, any lesson, any book.
        </p>

        <ShlokaCard
          verseRef="Traditional Universal Prayer"
          sanskrit="सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः । सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ॥"
          iast="sarve bhavantu sukhinaḥ sarve santu nirāmayāḥ | sarve bhadrāṇi paśyantu mā kaścid duḥkhabhāg bhavet ||"
          meaningLabel="Translation"
          meaning="May all beings be happy. May all be free from illness. May all see what is auspicious. May no one suffer."
          insightLabel="Context & Use"
          insight="Perhaps the most beloved shanti mantra in modern Hindu practice. Chanted at the close of every yoga class in the world and at the end of most Sanskrit gatherings. Notice its structure: four universal wishes, ending with the negative form — that no one, anywhere, be assigned a share of suffering."
          essence="Let everyone, everywhere, be well."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            सभी सुखी हों। सभी रोगमुक्त हों। सभी का कल्याण हो। किसी को भी दुःख न मिले।
          </div>
        </div>

        <ShlokaCard
          verseRef="Traditional Blessing Mantra"
          sanskrit="ॐ लोकाः समस्ताः सुखिनो भवन्तु ॥"
          iast="oṃ lokāḥ samastāḥ sukhino bhavantu ||"
          meaningLabel="Translation"
          meaning="Om. May all the worlds be happy."
          insightLabel="Context & Use"
          insight="Shorter and broader than the previous verse — a single line that reaches beyond humans to all beings, all realms, all worlds. Popularised globally through Ashtanga yoga, where it is chanted at the close of practice. In traditional Sanskrit usage it is the shortest complete benediction available."
          essence="May every world, and every being in it, be happy."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            ॐ, समस्त लोकों में रहने वाले सभी प्राणी सुखी हों।
          </div>
        </div>

        <ShlokaCard
          verseRef="Isha Upanishad (Shanti Mantra)"
          sanskrit="ॐ पूर्णमदः पूर्णमिदं पूर्णात् पूर्णमुदच्यते । पूर्णस्य पूर्णमादाय पूर्णमेवावशिष्यते ॥ ॐ शान्तिः शान्तिः शान्तिः ॥"
          iast="oṃ pūrṇam adaḥ pūrṇam idaṃ pūrṇāt pūrṇam udacyate | pūrṇasya pūrṇam ādāya pūrṇam evāvaśiṣyate || oṃ śāntiḥ śāntiḥ śāntiḥ ||"
          meaningLabel="Translation"
          meaning="Om. That is whole. This is whole. From the whole, the whole emerges. When the whole is taken from the whole, the whole alone remains. Om, peace, peace, peace."
          insightLabel="Context & Use"
          insight="The shanti mantra of the Isha, Brihadaranyaka, and several other Upanishads. It is a mathematical impossibility rendered as a philosophical statement: an infinity from which an infinity is subtracted still equals infinity. The Upanishad is defining what wholeness (purnam) actually means &mdash; that which is not diminished by anything given or removed."
          essence="The whole gives rise to the whole. When the whole is subtracted from the whole, wholeness remains."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            ॐ, वह (परब्रह्म) पूर्ण है, यह (जगत्) भी पूर्ण है। पूर्ण से ही पूर्ण की उत्पत्ति होती है। पूर्ण में से पूर्ण को निकाल लेने पर भी पूर्ण ही शेष रहता है। ॐ शान्ति, शान्ति, शान्ति।
          </div>
        </div>

        <ShlokaCard
          verseRef="Traditional Closing Mantra"
          sanskrit="ॐ शान्तिः शान्तिः शान्तिः ॥"
          iast="oṃ śāntiḥ śāntiḥ śāntiḥ ||"
          meaningLabel="Translation"
          meaning="Om. Peace, peace, peace."
          insightLabel="Context & Use"
          insight="The invariant closing of every Vedic recitation and every Upanishadic peace mantra. Traditional commentators explain the threefold repetition as a prayer for peace on three planes: adhidaivika (from divine or cosmic forces beyond our control), adhibhautika (from other beings and the material world), and adhyatmika (from within our own body and mind)."
          essence="Peace from the cosmos. Peace from other beings. Peace within."
        />

        <div className="hindi-block">
          <div className="hindi-label">हिन्दी अर्थ</div>
          <div className="hindi-text">
            ॐ, शान्ति हो, शान्ति हो, शान्ति हो। (तीनों प्रकार के दुःखों &mdash; दैविक, भौतिक और आध्यात्मिक &mdash; से शान्ति की प्रार्थना।)
          </div>
        </div>

        <div className="pull-quote">
          Twenty verses. Four invocations, five from the Gita, four on truth, three on the guru, four for peace. If you carried only these into a lifetime of Sanskrit, you would be carrying most of what the tradition considers indispensable.
        </div>

        <h2>How to Memorize Sanskrit Shlokas</h2>
        <p>
          Sanskrit shlokas were designed to be carried in the body, not stored on a page. The traditional method of memorisation has almost nothing in common with the way most modern students try to learn them. Here is what actually works.
        </p>

        <ul className="practice-list">
          <li>
            <span><strong>Chant aloud, do not read silently.</strong> Sanskrit is a phonetic language. The shloka is not fully in you until your mouth knows it. Chant each new shloka out loud, at half your normal speaking pace, twice in the morning and twice at night for a week.</span>
          </li>
          <li>
            <span><strong>Learn the meter, not just the words.</strong> Notice where the eight-syllable padas break. Feel the rhythm before you worry about the meaning. Almost every anushtubh has the same underlying pulse, and once your body feels it, new shlokas take far less effort to acquire.</span>
          </li>
          <li>
            <span><strong>Read the IAST alongside the Devanagari.</strong> The romanised transliteration with diacritics tells you exactly where the long vowels and retroflex consonants fall. If you only learn from an ordinary English spelling, you will chant the shloka wrong for the rest of your life.</span>
          </li>
          <li>
            <span><strong>Meaning first, then the verse.</strong> Understand what the verse is saying in your own language before you try to memorise the Sanskrit. Memory holds meaning much more easily than sound. This is the opposite of how most rote learning is taught in schools.</span>
          </li>
          <li>
            <span><strong>Recite one shloka a day.</strong> Consistency beats intensity. One verse a day for twenty days, then those same twenty verses cycled once a week for a month, and you will have them for the rest of your life. Every commute, every walk, every waiting room becomes practice.</span>
          </li>
        </ul>

        <h2>One Shloka a Day</h2>
        <p>
          If you want a simple, phone-based way to do the practice above, the Wisdom app was built for exactly this. Each morning it delivers one Sanskrit shloka &mdash; from the Gita, the Upanishads, or the great stotras &mdash; with the Devanagari, the IAST transliteration, the English meaning, a short commentary on how the verse applies to modern life, and a home screen widget so the verse waits for you every time you unlock your phone.
        </p>
        <p>
          Start with the twenty in this article. Then let the app deliver the next one tomorrow, and the one after that, and by the end of a year you will have carried several hundred shlokas across the year with you.
        </p>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>What is a shloka in Sanskrit?</strong>
          <p>
            A shloka (श्लोक) is the standard verse form of classical Sanskrit poetry. Its most common metre is the <em>anushtubh</em>: 32 syllables arranged in four quarters (padas) of eight syllables each. The Bhagavad Gita, the Ramayana, and much of the Mahabharata are composed in this metre. The shloka is designed for oral memorisation &mdash; the rhythm makes it possible to carry the text in the body across a lifetime.
          </p>
        </div>

        <div className="faq-item">
          <strong>What is the difference between a shloka and a mantra?</strong>
          <p>
            A shloka is a verse; a mantra is a formula. Every mantra can be recited, but not every shloka is a mantra. Mantras (like the Gayatri or Om Namah Shivaya) are considered to carry power in their sound itself, often revealed to a rishi and used for meditation or ritual. Shlokas are compositions &mdash; they carry meaning, story, philosophy. The Gayatri is both: a verse from the Rig Veda used as a mantra.
          </p>
        </div>

        <div className="faq-item">
          <strong>What is the easiest Sanskrit shloka to learn first?</strong>
          <p>
            For most learners, <em>Vakratunda Mahakaya</em> &mdash; the Ganesha invocation &mdash; is the natural first shloka. It is short, rhythmically clear, culturally familiar, and it is the traditional opening prayer before any new endeavour. <em>Guru Brahma, Guru Vishnu</em> is also very common as a second shloka. Both fit in four short lines and are easy to chant aloud once a day.
          </p>
        </div>

        <div className="faq-item">
          <strong>How do I pronounce Sanskrit shlokas correctly?</strong>
          <p>
            Sanskrit pronunciation follows precise rules: long and short vowels differ, aspirated and unaspirated consonants differ, and each syllable is enunciated fully. The IAST transliteration (with diacritics) tells you exactly where the long vowels and retroflex consonants are. Start by listening to a trained reciter for each shloka on the Wisdom app or a reliable recording, then chant along slowly for a week before speeding up. Do not learn Sanskrit pronunciation from an ordinary romanised spelling &mdash; it will teach you the wrong sounds.
          </p>
        </div>

        <div className="faq-item">
          <strong>Which is the most powerful Sanskrit shloka?</strong>
          <p>
            &ldquo;Powerful&rdquo; is tradition-dependent. The Gayatri Mantra is the most universally revered &mdash; it is the mantra given at the sacred thread ceremony and considered the mother of the Vedas. The Mrityunjaya mantra (<em>Om Tryambakam Yajamahe</em>) is invoked for healing and long life. From the Gita, BG 18.66 (<em>sarva-dharman parityajya</em>) is called the charama shloka &mdash; the ultimate verse. Ultimately, the shloka you actually recite daily becomes the powerful one for you.
          </p>
        </div>

        <div className="faq-item">
          <strong>Why do English translations of the same shloka differ so much?</strong>
          <p>
            Sanskrit is dense. A single word can carry multiple technical meanings &mdash; dharma, karma, yoga, atman have no clean English equivalents. Translators must choose between literal, philosophical, or devotional readings. Older translations (Max Muller, Radhakrishnan) tend toward the philosophical; devotional lineages (Iskcon, Chinmaya) tend toward the theological; modern academic ones aim for the literal. Reading two or three translations side by side is the fastest way to see the actual range of the verse.
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
            <span>&#10022; Daily shloka in Sanskrit</span>
            <span>&#10022; Meaning &amp; modern context</span>
            <span>&#10022; Home screen widget</span>
          </div>
          <a href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125"
             target="_blank" rel="noopener"
             className="app-cta-btn"
             data-mp-location="cta">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            Download on the App Store
          </a>
          <div className="app-cta-sub">Free &middot; iPhone &middot; No account needed</div>
        </div>
      </div>

      <footer>
        <p>&copy; 2026 Wisdom App. A daily verse to quiet the mind.</p>
        <p><a href="https://wisdomquotes.in">Home</a> &mdash; <a href="https://wisdomquotes.in/blogs">Blog</a> &mdash; <a href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125" target="_blank" rel="noopener" data-mp-location="footer">Download</a></p>
      </footer>

      <BlogTracker pageName="20 Famous Sanskrit Shlokas" />
    </>
  )
}
