import type { Metadata } from 'next'
import schemas from '@/lib/homeSchemas'
import BlogTracker from '@/components/BlogTracker'
import './home.css'

export const metadata: Metadata = {
  title: "Daily Shloka App — Bhagavad Gita, Upanishads & Hindu Scriptures | Wisdom",
  description: "Wisdom is a daily shloka app for iPhone. Read Sanskrit verses from the Bhagavad Gita and other Hindu scriptures — with English meaning, deeper explanation, modern relevance, journaling, and widgets.",
  keywords: "",
  openGraph: {
    title: "Daily Shloka App — Bhagavad Gita, Upanishads & Hindu Scriptures | Wisdom",
    description: "Wisdom is a daily shloka app for iPhone. Read Sanskrit verses from the Bhagavad Gita and other Hindu scriptures — with English meaning, deeper explanation, modern relevance, journaling, and widgets.",
    type: 'website',
    url: 'https://wisdomquotes.in',
    siteName: 'Wisdom',
  },
  alternates: { canonical: 'https://wisdomquotes.in' },
}


export default function HomePage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

    
    <nav>
      <div className="nav-inner">
        <div className="logo">
          <div className="logo-mark">
            <img src="/assets/male-logo-dark.webp" alt="Wisdom"/>
          </div>
          Wisdom
        </div>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#how-it-works">How it works</a></li>
          <li><a href="#topics">Topics</a></li>
          <li><a href="/blogs/">Blog</a></li>
          <li>
            <a
              href="https://apps.apple.com/us/app/wisdom-eternal-quotes/id6747684125"
              target="_blank"
              rel="noopener"
              className="btn-nav"
              data-mp-location="nav"
              >Download Free</a>
          </li>
        </ul>
      </div>
    </nav>

    
    <section className="hero">
      <div className="wrap">
        <div className="hero-logo">
          <img
            src="/assets/male-logo-dark.webp"
            alt="Wisdom sage"
            fetchpriority="high"/>
        </div>

        <div className="hero-eyebrow">
          Bhagavad Gita & ancient Hindu scriptures, one shloka a day
        </div>

        <h1>
          Daily shlokas from the Bhagavad Gita<br/><em
            >& ancient scriptures.</em>
        </h1>

        <p className="hero-sub">
          Wisdom delivers one shloka a day — drawing primarily from the Bhagavad
          Gita, alongside the Upanishads and other Hindu scriptures. Each verse
          comes with Sanskrit text, English meaning, deeper explanation, modern
          relevance, and a private space to reflect.
        </p>

        <div className="hero-actions">
          <a
            href="https://apps.apple.com/us/app/wisdom-eternal-quotes/id6747684125"
            target="_blank"
            rel="noopener"
            data-mp-location="hero_cta"
          >
            <img
              src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg"
              alt="Download on the App Store"
              style={{"height": "52px", "width": "auto", "display": "block"}}/>
          </a>
          <a href="#how-it-works" className="btn-ghost">How it works</a>
        </div>
        <p className="hero-note">
          Free to download · No account needed to start · Widgets, reminders
          & journaling included
        </p>
      </div>

      <div className="hero-phones">
        <div className="phones-fan">
          <div className="fan-phone fan-left">
            <div className="iphone-mock">
              <div className="iphone-island"></div>
              <div className="iphone-screen">
                <img
                  src="/assets/IMG_6938.webp"
                  alt="Wisdom app topic personalisation for karma, peace, detachment, and self-realization"
                  loading="lazy"/>
              </div>
            </div>
          </div>
          <div className="fan-phone fan-center">
            <div className="iphone-mock">
              <div className="iphone-island"></div>
              <div className="iphone-screen">
                <img
                  src="/assets/IMG_6942.webp"
                  alt="Wisdom iPhone app showing a Bhagavad Gita verse in Sanskrit and English"
                  fetchpriority="high"/>
              </div>
            </div>
          </div>
          <div className="fan-phone fan-right">
            <div className="iphone-mock">
              <div className="iphone-island"></div>
              <div className="iphone-screen">
                <img
                  src="/assets/IMG_6946.webp"
                  alt="Wisdom app deeper meaning screen explaining a Bhagavad Gita verse"
                  loading="lazy"/>
              </div>
            </div>
          </div>
        </div>
        <div className="phones-floor"></div>
      </div>
    </section>

    
    <div className="proof-bar">
      <div className="proof-inner">
        <div className="proof-item">
          Shlokas from <strong>Bhagavad Gita</strong> and other scriptures
        </div>
        <div className="proof-item">
          Personalised to <strong>your spiritual path</strong>
        </div>
        <div className="proof-item">
          Delivered <strong>morning, afternoon, evening, or night</strong>
        </div>
        <div className="proof-item">
          Reflect in a <strong>private journal</strong> after each shloka
        </div>
      </div>
    </div>

    
    <section className="section-warm">
      <div className="shloka-block">
        <div className="shloka-deva">
          कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।<br/>
          मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥
        </div>
        <div className="shloka-en">
          "You have the right to perform your duties —<br/>
          but never to the fruits of your actions."
        </div>
        <div className="shloka-src">— Bhagavad Gita 2.47</div>
        <p
          style={{"fontSize": "15.5px", "color": "var(--text-dim)", "lineHeight": "1.8", "marginTop": "24px", "fontWeight": "300"}}
        >
          Wisdom brings you one verse like this, every day — from the Bhagavad
          Gita and other Hindu scriptures. Not a quote card to swipe away. A
          shloka with its full meaning, its relevance to your life right now,
          and space to sit with it.
        </p>
      </div>
    </section>

    <div className="divider"></div>

    
    <section className="section">
      <div className="wrap t-center">
        <div className="eyebrow">The problem</div>
        <h2 className="heading" style={{"maxWidth": "600px", "margin": "0 auto 14px"}}>
          Why most Bhagavad Gita reading habits don't stick
        </h2>
        <p className="subtext" style={{"maxWidth": "560px", "margin": "0 auto"}}>
          Many people want to build a daily Bhagavad Gita or shloka practice,
          but traditional translations feel distant, quote pages feel shallow,
          and most spiritual apps don't create room for reflection.
        </p>
        <div className="problem-grid">
          <div className="prob-card">
            <div className="prob-icon">📜</div>
            <h3>The texts are hard to access</h3>
            <p>
              Sanskrit shlokas without context are beautiful but opaque. Most
              translations are stiff, academic, written for scholars — not for a
              Tuesday morning.
            </p>
          </div>
          <div className="prob-card">
            <div className="prob-icon">🌊</div>
            <h3>You get flooded, not fed</h3>
            <p>
              Trying to "study" spirituality leads to overload. You want one
              thing, not twenty chapters, three YouTube tabs, and a reading list
              you never start.
            </p>
          </div>
          <div className="prob-card">
            <div className="prob-icon">🤫</div>
            <h3>There's no space to reflect</h3>
            <p>
              Reading a verse is one thing. Sitting with it — writing what it
              means for your life — is where the real shift happens. Nothing
              makes this easy.
            </p>
          </div>
          <div className="prob-card">
            <div className="prob-icon">🎯</div>
            <h3>It isn't personalised to you</h3>
            <p>
              Your path is yours. Someone seeking detachment needs different
              shlokas than someone seeking discipline or clarity on karma.
              One-size fits none.
            </p>
          </div>
        </div>
      </div>
    </section>

    
    <section className="section section-alt" id="how-it-works">
      <div className="wrap t-center">
        <div className="eyebrow">How it works</div>
        <h2 className="heading" style={{"maxWidth": "520px", "margin": "0 auto 14px"}}>
          Tell us your path.<br/>Receive your shloka.<br/>Sit with it.
        </h2>
        <div className="steps">
          <div className="step">
            <div className="step-num">1</div>
            <h3>Choose the spiritual themes you want to explore</h3>
            <p>
              Select from Self-Realization, Karma & Action, Detachment,
              Discipline, Peace, and more. Your personalised Bhagavad Gita feed
              is built around them.
            </p>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <h3>
              Receive one daily Bhagavad Gita shloka or scripture-based verse
            </h3>
            <p>
              At your chosen time, Wisdom delivers one shloka in Sanskrit and
              English — with deeper meaning and modern relevance explained
              plainly.
            </p>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <h3>
              Read the Sanskrit, meaning, deeper insight, and journaling prompt
            </h3>
            <p>
              Write what it brings up for you. Build a private record of your
              spiritual journey, shloka by shloka — and revisit your reflections
              any time.
            </p>
          </div>
        </div>
      </div>
    </section>

    
    <section className="section" id="features">
      <div className="wrap t-center">
        <div className="eyebrow">Features</div>
        <h2 className="heading" style={{"maxWidth": "580px", "margin": "0 auto 14px"}}>
          Everything you need to make<br/>wisdom a real daily practice.
        </h2>
        <p className="subtext" style={{"maxWidth": "500px", "margin": "0 auto"}}>
          Not a content feed. A contemplative practice — built into the phone
          you already carry everywhere.
        </p>
        <div className="feat-grid">
          <div className="feat-card">
            <div className="feat-icon">🕉️</div>
            <h3>Sanskrit shlokas with translation</h3>
            <p>
              Toggle the original Sanskrit on or off. Read the language the
              Rishis composed in — paired with a clear, faithful English
              translation.
            </p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">🔍</div>
            <h3>Bhagavad Gita meaning explained simply</h3>
            <p>
              Every shloka comes with a full explanation of what Lord Krishna
              (or other teachers) intended — beyond the surface translation,
              written clearly.
            </p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">🌐</div>
            <h3>Apply each shloka to daily life</h3>
            <p>
              Understand how a 5,000-year-old verse applies to your attention,
              your ambition, your relationships, and your choices today.
            </p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">📔</div>
            <h3>Reflect on each verse in a private journal</h3>
            <p>
              Write your reflection after each shloka. Every entry is saved
              privately — revisit them as your understanding deepens over
              months.
            </p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">🖼️</div>
            <h3>Daily shloka widgets for iPhone</h3>
            <p>
              Place your current Bhagavad Gita verse on your lock screen or home
              screen. Let it stay with you through the day, not just the morning
              read.
            </p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">⏰</div>
            <h3>Daily spiritual reminders</h3>
            <p>
              Morning, afternoon, evening, or night — your daily shloka arrives
              when you're most ready to sit with it and reflect.
            </p>
          </div>
        </div>
      </div>
    </section>

    
    <section className="section section-alt">
      <div className="wrap">
        <div className="split">
          <div className="split-text">
            <span className="pill">Daily Shloka</span>
            <h2>One verse a day.<br/>Full-screen. Undistracted.</h2>
            <p>
              No scroll. No algorithm. Just one shloka, given space to breathe.
              Wisdom presents each verse front and centre — Sanskrit above,
              plain English below, nothing competing for your attention.
            </p>
            <ul className="check-list">
              <li>
                <span className="ck"
                  ><svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4l3 3 5-6"
                      stroke="#1a0606"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"/></svg></span>Swipe through your personalised shloka feed
              </li>
              <li>
                <span className="ck"
                  ><svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4l3 3 5-6"
                      stroke="#1a0606"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"/></svg></span>Toggle Sanskrit text on or off
              </li>
              <li>
                <span className="ck"
                  ><svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4l3 3 5-6"
                      stroke="#1a0606"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"/></svg></span>Share the verse with someone who needs it today
              </li>
              <li>
                <span className="ck"
                  ><svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4l3 3 5-6"
                      stroke="#1a0606"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"/></svg></span>Bookmark favourites to revisit whenever
              </li>
            </ul>
          </div>
          <div className="split-phone">
            <div className="phone-frame">
              <img
                src="/assets/IMG_6942.webp"
                alt="Wisdom iPhone app showing a Bhagavad Gita verse in Sanskrit and English"
                loading="lazy"/>
            </div>
          </div>
        </div>
      </div>
    </section>

    
    <section className="section">
      <div className="wrap">
        <div className="split flip">
          <div className="split-text">
            <span className="pill">Beyond the words</span>
            <h2>What it means.<br/>Why it matters now.</h2>
            <p>
              Every Wisdom shloka comes with two depths you can unlock: a
              careful explanation of what the teachers intended, and a plain
              account of how it applies to the life you're actually living right
              now.
            </p>
            <ul className="check-list">
              <li>
                <span className="ck"
                  ><svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4l3 3 5-6"
                      stroke="#1a0606"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"/></svg></span>Detailed meaning drawn from traditional commentary
              </li>
              <li>
                <span className="ck"
                  ><svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4l3 3 5-6"
                      stroke="#1a0606"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"/></svg></span>Modern relevance — how this verse changes how you act today
              </li>
              <li>
                <span className="ck"
                  ><svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4l3 3 5-6"
                      stroke="#1a0606"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"/></svg></span>Chapter and verse reference for every shloka
              </li>
              <li>
                <span className="ck"
                  ><svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4l3 3 5-6"
                      stroke="#1a0606"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"/></svg></span>Tap "Deeper Meaning" whenever you're ready to go further
              </li>
            </ul>
          </div>
          <div className="split-phone">
            <div className="phone-frame">
              <img
                src="/assets/IMG_6946.webp"
                alt="Wisdom app screen showing deeper meaning and modern relevance of a Bhagavad Gita shloka"
                loading="lazy"/>
            </div>
          </div>
        </div>
      </div>
    </section>

    
    <section className="section section-alt">
      <div className="wrap">
        <div className="split">
          <div className="split-text">
            <span className="pill">Inner Reflection</span>
            <h2>The shloka asks.<br/>You answer.</h2>
            <p>
              Reading is one thing. Writing what a verse awakens in you is where
              understanding becomes yours. Wisdom gives you a private journal
              entry after every shloka — and keeps your reflections across
              months so you can watch your own understanding deepen.
            </p>
            <ul className="check-list">
              <li>
                <span className="ck"
                  ><svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4l3 3 5-6"
                      stroke="#1a0606"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"/></svg></span>One journal prompt after every shloka
              </li>
              <li>
                <span className="ck"
                  ><svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4l3 3 5-6"
                      stroke="#1a0606"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"/></svg></span>All entries saved privately to your account
              </li>
              <li>
                <span className="ck"
                  ><svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4l3 3 5-6"
                      stroke="#1a0606"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"/></svg></span>Revisit your reflections on any shloka, any time
              </li>
              <li>
                <span className="ck"
                  ><svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4l3 3 5-6"
                      stroke="#1a0606"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"/></svg></span>Build a record of your inner journey, shloka by shloka
              </li>
            </ul>
          </div>
          <div className="split-phone">
            <div className="phone-frame">
              <img
                src="/assets/IMG_6947.webp"
                alt="Wisdom app private journal for reflecting on daily Bhagavad Gita shlokas"
                loading="lazy"/>
            </div>
          </div>
        </div>
      </div>
    </section>

    
    <section className="section">
      <div className="wrap">
        <div className="split flip">
          <div className="split-text">
            <span className="pill">Your Path</span>
            <h2>Not everyone is seeking<br/>the same thing.</h2>
            <p>
              The Gita speaks to warriors and seekers alike — to those needing
              stillness and those needing clarity on action. Choose the themes
              that match where you are right now, and your feed reflects them.
            </p>
            <ul className="check-list">
              <li>
                <span className="ck"
                  ><svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4l3 3 5-6"
                      stroke="#1a0606"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"/></svg></span>Self-Realization, Detachment, Karma & Action
              </li>
              <li>
                <span className="ck"
                  ><svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4l3 3 5-6"
                      stroke="#1a0606"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"/></svg></span>Discipline & Self-Control, Peace & Harmony
              </li>
              <li>
                <span className="ck"
                  ><svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4l3 3 5-6"
                      stroke="#1a0606"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"/></svg></span>Wisdom & Knowledge, Devotion & Faith
              </li>
              <li>
                <span className="ck"
                  ><svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4l3 3 5-6"
                      stroke="#1a0606"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"/></svg></span>Switch topics as your path evolves
              </li>
            </ul>
          </div>
          <div className="split-phone">
            <div className="phone-frame">
              <img
                src="/assets/IMG_6938.webp"
                alt="Wisdom app topic selection screen showing spiritual themes from the Bhagavad Gita"
                loading="lazy"/>
            </div>
          </div>
        </div>
      </div>
    </section>

    
    <section className="section section-alt" id="topics">
      <div className="wrap t-center">
        <div className="eyebrow">Spiritual themes</div>
        <h2 className="heading" style={{"maxWidth": "520px", "margin": "0 auto 14px"}}>
          Eight paths into the teachings.<br/>Choose yours.
        </h2>
        <p className="subtext" style={{"maxWidth": "460px", "margin": "0 auto"}}>
          Select one or several. Your daily shloka feed is drawn from the themes
          closest to where you are right now.
        </p>
        <div className="topics-row">
          <div className="topic-chip active">🔮 Self-Realization</div>
          <div className="topic-chip">🍃 Detachment</div>
          <div className="topic-chip">⚔️ Discipline & Self-Control</div>
          <div className="topic-chip">🔄 Karma & Action</div>
          <div className="topic-chip">☮️ Peace & Harmony</div>
          <div className="topic-chip">📿 Devotion & Faith</div>
          <div className="topic-chip">💡 Wisdom & Knowledge</div>
          <div className="topic-chip">🧘 Mindfulness & Awareness</div>
        </div>
      </div>
    </section>

    
    <section className="section">
      <div className="wrap t-center">
        <div className="eyebrow">What practitioners say</div>
        <h2 className="heading" style={{"maxWidth": "480px", "margin": "0 auto"}}>
          From those already on the path.
        </h2>
        <div className="testi-grid">
          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <blockquote>
              "I'd been meaning to 'read the Gita properly' for years. Wisdom
              got me to actually engage with it — one shloka a day, and it
              started sticking. I look forward to it every morning now."
            </blockquote>
            <div className="testi-author">
              <div className="testi-avatar">A</div>
              <div>
                <div className="testi-name">Arjun M.</div>
                <div className="testi-role">Studying Karma & Detachment</div>
              </div>
            </div>
          </div>
          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <blockquote>
              "The journal is what keeps me coming back. Writing one sentence
              about what the verse means for my week — that one habit has
              changed more than any book I've read this year."
            </blockquote>
            <div className="testi-author">
              <div className="testi-avatar">P</div>
              <div>
                <div className="testi-name">Priya S.</div>
                <div className="testi-role">
                  Studying Peace & Self-Realization
                </div>
              </div>
            </div>
          </div>
          <div className="testi-card">
            <div className="testi-stars">★★★★★</div>
            <blockquote>
              "I put the widget on my lock screen and it's the first thing I see
              every morning. Small thing — but you end up carrying the verse
              through the whole day without even trying."
            </blockquote>
            <div className="testi-author">
              <div className="testi-avatar">R</div>
              <div>
                <div className="testi-name">Rohan V.</div>
                <div className="testi-role">Studying Discipline & Wisdom</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    
    <section className="section section-alt">
      <div className="wrap t-center">
        <div className="eyebrow">About Wisdom</div>
        <h2 className="heading" style={{"maxWidth": "580px", "margin": "0 auto 14px"}}>
          Everything you want to know about<br/>the Wisdom app.
        </h2>
        <p className="subtext" style={{"maxWidth": "520px", "margin": "0 auto"}}>
          A daily Bhagavad Gita practice, built for the iPhone you already
          carry.
        </p>
        <div className="about-grid">
          <div className="about-card">
            <div className="about-card-icon">🪔</div>
            <h3>What is Wisdom?</h3>
            <p>
              Wisdom is an iPhone app for daily Sanskrit shlokas and spiritual
              reflection. It draws primarily from the Bhagavad Gita — the most
              searched and studied Hindu scripture — alongside the Upanishads
              and other texts. One verse a day, with Sanskrit, meaning, deeper
              explanation, modern relevance, and a private journal.
            </p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">🧘</div>
            <h3>Who is Wisdom for?</h3>
            <p>
              Wisdom is for anyone who wants to read Sanskrit shlokas daily —
              whether from the Bhagavad Gita, the Upanishads, or other Hindu
              scriptures. It's built for beginners and long-time practitioners
              alike who want a practical, reflective daily habit rather than an
              academic reading routine.
            </p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">📖</div>
            <h3>Why a daily shloka app?</h3>
            <p>
              One verse a day is easier to sustain than long reading sessions.
              Wisdom turns scripture into a living daily habit through
              personalised reminders, home screen widgets, thematic curation,
              and a private journal — so the practice actually sticks.
            </p>
          </div>
        </div>
      </div>
    </section>

    
    <section className="section" id="faq">
      <div className="wrap t-center">
        <div className="eyebrow">FAQ</div>
        <h2 className="heading" style={{"maxWidth": "520px", "margin": "0 auto 14px"}}>
          Common questions about<br/>Wisdom & daily shloka practice.
        </h2>
        <div className="faq-list" role="list">
          <div className="faq-item" role="listitem">
            <button className="faq-q" aria-expanded="false">
              What is the best Bhagavad Gita app for daily reading?
              <svg
                className="faq-chevron"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 7.5l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="faq-a">
              Wisdom is a daily shloka app built around the Bhagavad Gita as its
              primary scripture, drawing also from the Upanishads and other
              Hindu texts. It delivers one verse a day with Sanskrit text,
              English meaning, deeper explanation, modern relevance, and a
              private journal — making it easy to build a sustainable daily
              practice on iPhone.
            </div>
          </div>

          <div className="faq-item" role="listitem">
            <button className="faq-q" aria-expanded="false">
              Does Wisdom include Sanskrit shlokas with meaning?
              <svg
                className="faq-chevron"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 7.5l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="faq-a">
              Yes. Every shloka in Wisdom includes the original Sanskrit text, a
              clear English meaning, a deeper explanation drawn from traditional
              commentary, and a section on modern relevance showing how the
              verse applies to your life today.
            </div>
          </div>

          <div className="faq-item" role="listitem">
            <button className="faq-q" aria-expanded="false">
              Can I use Wisdom as a daily spiritual practice app?
              <svg
                className="faq-chevron"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 7.5l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="faq-a">
              Yes — it's the core idea. You choose your delivery time, select
              spiritual themes, read one shloka a day, and reflect in a private
              journal. Home screen widgets and reminders make the practice part
              of your existing routine, not an extra task.
            </div>
          </div>

          <div className="faq-item" role="listitem">
            <button className="faq-q" aria-expanded="false">
              Does the app include journaling and reminders?
              <svg
                className="faq-chevron"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 7.5l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="faq-a">
              Yes. Wisdom includes a private journal tied to each shloka, daily
              reminders at your chosen time, and home screen widgets for iPhone
              so the verse stays visible through the day — not just during the
              morning read.
            </div>
          </div>

          <div className="faq-item" role="listitem">
            <button className="faq-q" aria-expanded="false">
              Is Wisdom only for the Bhagavad Gita, or other scriptures too?
              <svg
                className="faq-chevron"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 7.5l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="faq-a">
              Wisdom draws primarily from the Bhagavad Gita but also includes
              shlokas and verses from other Hindu scriptures. The content is
              curated and personalised to the spiritual themes you choose — so
              what you receive is always relevant to your path.
            </div>
          </div>

          <div className="faq-item" role="listitem">
            <button className="faq-q" aria-expanded="false">
              Is Wisdom available on iPhone? Is it free?
              <svg
                className="faq-chevron"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 7.5l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="faq-a">
              Yes. Wisdom is available on the App Store for iPhone and is free
              to download. You can start reading daily Bhagavad Gita shlokas
              without creating an account.
            </div>
          </div>
        </div>
      </div>
    </section>

    
    <div className="divider"></div>
    <section className="final-cta">
      <div className="wrap">
        <h2>The journey inward begins<br/>with a single shloka.</h2>
        <p>
          Free to download. Start today. One verse. A minute to sit with it.
        </p>
        <a
          href="https://apps.apple.com/us/app/wisdom-eternal-quotes/id6747684125"
          target="_blank"
          rel="noopener"
          style={{"display": "inline-block"}}
          data-mp-location="bottom_cta"
        >
          <img
            src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg"
            alt="Download on the App Store"
            style={{"height": "56px", "width": "auto"}}
            loading="lazy"/>
        </a>
        <p style={{"fontSize": "13px", "color": "var(--text-dimmer)", "marginTop": "16px"}}>
          Free · Available on iOS
        </p>
      </div>
    </section>

    
    <footer>
      <div className="footer-inner">
        <div
          className="footer-logo"
          style={{"display": "flex", "alignItems": "center", "gap": "9px"}}
        >
          <img
            src="/assets/male-logo-dark.webp"
            alt="Wisdom"
            loading="lazy"
            style={{"width": "30px", "height": "30px", "borderRadius": "50%", "objectFit": "cover", "border": "1px solid rgba(200, 136, 30, 0.35)"}}/>
          Wisdom
        </div>
        <p className="footer-copy">© 2026 Wisdom</p>
        <ul className="footer-links">
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="support.html">Support</a></li>
        </ul>
      </div>
    </footer>

    

    
  
      <BlogTracker pageName="Home" />
    </>
  )
}