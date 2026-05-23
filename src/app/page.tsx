import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import schemas from '@/lib/homeSchemas'
import BlogTracker from '@/components/BlogTracker'
import Nav from '@/components/Nav'
import './home.css'

export const metadata: Metadata = {
  title: "Wisdom — Ancient Paths for the Modern Mind | Bhagavad Gita App",
  description: "Wisdom is a daily practice app rooted in the Bhagavad Gita. Choose your path — Action, Wisdom, or Devotion — and receive 2-minute guided teachings drawn from ancient Hindu scriptures. Free on iPhone.",
  keywords: "",
  openGraph: {
    title: "Wisdom — Ancient Paths for the Modern Mind",
    description: "The Bhagavad Gita saw the restless mind 5,000 years ago. Wisdom gives you a daily 2-minute practice on one of three ancient paths — Action, Wisdom, or Devotion — to find clarity, calm, and direction.",
    type: 'website',
    url: 'https://wisdomquotes.in',
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630, alt: 'Wisdom — Ancient Paths for the Modern Mind' }],
  },
  alternates: { canonical: 'https://wisdomquotes.in' },
}


export default function HomePage() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

    {/* ── NAV ── */}
    <Nav showSectionLinks />

    {/* ── HERO ── */}
    <section className="hero">
      <div className="wrap">
        <div className="hero-logo">
          <img
            src="/assets/male-logo-dark.webp"
            alt="Wisdom sage"
            fetchPriority="high"/>
        </div>

        <div className="hero-eyebrow">
          Ancient wisdom for the modern mind
        </div>

        <h1>
          The restlessness you feel —<br/><em>they had a name for it.</em>
        </h1>

        <p className="hero-sub">
          Five thousand years ago, a civilization mapped the restless mind — and left behind
          three paths to steady it. Wisdom gives you a daily 2-minute practice from the Bhagavad Gita,
          placed on the path that fits how you think, feel, and act.
        </p>

        <div className="hero-actions">
          <a
            href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125"
            target="_blank"
            rel="noopener"
            data-mp-location="hero_cta"
          >
            <img
              src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg"
              alt="Download on the App Store"
              style={{"height": "52px", "width": "auto", "display": "block"}}/>
          </a>
          <a href="#how-it-works" className="btn-ghost">See how it works</a>
        </div>
        <p className="hero-note">
          ★ 4.9 on the App Store · Free · No account needed · 2 minutes a day
        </p>
      </div>

      <div className="hero-phones">
        <div className="phones-fan">
          <div className="fan-phone fan-left">
            <div className="iphone-mock">
              <div className="iphone-island"></div>
              <div className="iphone-screen">
                <img
                  src="/assets/app-breathe.png"
                  alt="Wisdom app opening breathing practice — Take three breaths with us"
                  loading="lazy"/>
              </div>
            </div>
          </div>
          <div className="fan-phone fan-center">
            <div className="iphone-mock">
              <div className="iphone-island"></div>
              <div className="iphone-screen">
                <img
                  src="/assets/path-devotion-reveal.png"
                  alt="Wisdom app revealing your path — You were made to feel deeply, Path of Devotion"
                  fetchPriority="high"/>
              </div>
            </div>
          </div>
          <div className="fan-phone fan-right">
            <div className="iphone-mock">
              <div className="iphone-island"></div>
              <div className="iphone-screen">
                <img
                  src="/assets/app-teaching.png"
                  alt="Wisdom app daily teaching — Your Teaching Today with Bhagavad Gita verse and modern meaning"
                  loading="lazy"/>
              </div>
            </div>
          </div>
        </div>
        <div className="phones-floor"></div>
      </div>
    </section>

    {/* ── PROOF BAR ── */}
    <div className="proof-bar">
      <div className="proof-inner">
        <div className="proof-item">
          <strong>3 ancient paths</strong> — Action, Wisdom, Devotion
        </div>
        <div className="proof-item">
          <strong>2 minutes a day</strong>, one teaching at a time
        </div>
        <div className="proof-item">
          Rooted in the <strong>Bhagavad Gita</strong> & Hindu scriptures
        </div>
        <div className="proof-item">
          Progress through <strong>nodes</strong> as your practice deepens
        </div>
      </div>
    </div>

    {/* ── PROBLEM ── */}
    <section className="section">
      <div className="wrap t-center">
        <div className="eyebrow">The problem</div>
        <h2 className="heading" style={{"maxWidth": "620px", "margin": "0 auto 14px"}}>
          The mind hasn't changed.<br/>Only the world got louder.
        </h2>
        <p className="subtext" style={{"maxWidth": "560px", "margin": "0 auto"}}>
          Anxiety, overthinking, disconnection, loss of direction — these aren't new problems.
          Ancient cultures gave them names, mapped their roots, and built practices to move through them.
          We lost the map.
        </p>
        <div className="problem-grid">
          <div className="prob-card">
            <div className="prob-icon">🌀</div>
            <h3>Overthinking that never resolves</h3>
            <p>
              You think in circles. The thought grows louder.
              The clarity you needed never arrives. The loop keeps running.
            </p>
          </div>
          <div className="prob-card">
            <div className="prob-icon">📱</div>
            <h3>Distraction instead of depth</h3>
            <p>
              Scrolling offers momentary relief but leaves you emptier.
              Every day ends with the feeling that nothing quite landed.
            </p>
          </div>
          <div className="prob-card">
            <div className="prob-icon">🧩</div>
            <h3>Disconnected from what's real</h3>
            <p>
              Work, expectations, roles — pulling you in five directions
              at once. None of them tell you who you actually are.
            </p>
          </div>
          <div className="prob-card">
            <div className="prob-icon">🧭</div>
            <h3>No map for the inner life</h3>
            <p>
              Modern tools track your sleep and your steps. Nothing
              guides what's happening inside — or where to go from here.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* ── ANCIENT LENS ── */}
    <section className="section-alt ancient-lens">
      <div className="ancient-lens-inner">
        <div className="eyebrow">A different lens</div>
        <blockquote>
          "Five thousand years ago, on the battlefield of Kurukshetra,
          a warrior sat down in despair — overwhelmed, lost, unable to act.
          What he received changed everything."
        </blockquote>
        <p>
          The Bhagavad Gita is not mythology. It is one of the most sophisticated
          maps of the inner life ever written — composed by a civilization that
          studied the mind more deeply than modern psychology, and left behind
          practical paths for every kind of person.
        </p>
        <p>
          They understood something we've forgotten: not everyone finds clarity
          the same way. A person driven by action needs a different path than
          someone who seeks understanding — or someone who finds steadiness
          through love and surrender.
        </p>
        <p style={{"fontFamily": "'Playfair Display', Georgia, serif", "fontStyle": "italic", "fontSize": "17px", "color": "var(--gold-light)", "fontWeight": "600"}}>
          So they mapped three distinct paths. And every one leads to the same place.
        </p>
        <div className="lens-pills">
          <span className="lens-pill"><strong>Karma Yoga</strong> — the path of action</span>
          <span className="lens-pill"><strong>Jnana Yoga</strong> — the path of wisdom</span>
          <span className="lens-pill"><strong>Bhakti Yoga</strong> — the path of devotion</span>
        </div>
      </div>
    </section>

    {/* ── THE 3 PATHS ── */}
    <section className="section paths-section" id="paths">
      <div className="wrap t-center">
        <div className="eyebrow">The three paths</div>
        <h2 className="heading" style={{"maxWidth": "600px", "margin": "0 auto 14px"}}>
          Which path are you on?<br/><em>Wisdom places you there.</em>
        </h2>
        <p className="subtext" style={{"maxWidth": "520px", "margin": "0 auto"}}>
          Tell us what's been heavy. Tell us how you usually respond.
          Wisdom reads how you struggle — and places you on the path you need.
          Each path has nodes you grow through, one practice at a time.
        </p>

        <div className="paths-grid">

          {/* PATH OF ACTION */}
          <div className="path-card action reveal" style={{"--d": "0ms"} as CSSProperties}>
            <div className="path-badge">⚔️ Path of Action</div>
            <h3>Karma Yoga</h3>
            <div className="path-yoga">THE WAY OF THE DOER</div>
            <p className="path-desc">
              For those who need to move, act, and accomplish — but feel consumed
              by outcomes, restless when idle, or trapped in cycles of doing more.
            </p>
            <p className="path-tagline">"Your work becomes your practice."</p>
            <div className="path-nodes">
              <div className="path-node">
                <div className="node-dot filled">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3l2 2 4-4" stroke="#120505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="node-label">
                  <strong>Right Action</strong>
                  <span>Svakarma — act from your nature, not your fear</span>
                </div>
              </div>
              <div className="path-node">
                <div className="node-dot filled"></div>
                <div className="node-label">
                  <strong>Detachment</strong>
                  <span>Vairagya — do the work, release the outcome</span>
                </div>
              </div>
              <div className="path-node node-locked">
                <div className="node-dot"></div>
                <div className="node-label">
                  <strong>Karma Mastery</strong>
                  <span>Karmayogi — action as a form of worship</span>
                </div>
              </div>
            </div>
          </div>

          {/* PATH OF WISDOM */}
          <div className="path-card wisdom reveal" style={{"--d": "80ms"} as CSSProperties}>
            <div className="path-badge">💡 Path of Wisdom</div>
            <h3>Jnana Yoga</h3>
            <div className="path-yoga">THE WAY OF THE SEEKER</div>
            <p className="path-desc">
              For those who need to understand — who can't find peace without clarity,
              who question everything, who feel lost in the gap between what they know
              and what they feel.
            </p>
            <p className="path-tagline">"See through the noise. See what's real."</p>
            <div className="path-nodes">
              <div className="path-node">
                <div className="node-dot filled">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3l2 2 4-4" stroke="#120505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="node-label">
                  <strong>Witness</strong>
                  <span>Sakshi — observe without becoming the thought</span>
                </div>
              </div>
              <div className="path-node">
                <div className="node-dot filled"></div>
                <div className="node-label">
                  <strong>Inquiry</strong>
                  <span>Viveka — discern the real from the passing</span>
                </div>
              </div>
              <div className="path-node node-locked">
                <div className="node-dot"></div>
                <div className="node-label">
                  <strong>Equanimity</strong>
                  <span>Sthitaprajna — the steady-minded sage</span>
                </div>
              </div>
            </div>
          </div>

          {/* PATH OF DEVOTION */}
          <div className="path-card devotion reveal" style={{"--d": "160ms"} as CSSProperties}>
            <div className="path-badge">🙏 Path of Devotion</div>
            <h3>Bhakti Yoga</h3>
            <div className="path-yoga">THE WAY OF THE HEART</div>
            <p className="path-desc">
              For those who feel deeply — who need to trust again, to reconnect,
              to find steadiness through surrender rather than control.
            </p>
            <p className="path-tagline">"Let the heart be your guide home."</p>
            <div className="path-nodes">
              <div className="path-node">
                <div className="node-dot filled">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3l2 2 4-4" stroke="#120505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="node-label">
                  <strong>Connection</strong>
                  <span>Kritajna — recognize what still holds you</span>
                </div>
              </div>
              <div className="path-node">
                <div className="node-dot filled"></div>
                <div className="node-label">
                  <strong>Devotion</strong>
                  <span>Bhakti — bringing your whole self to what is</span>
                </div>
              </div>
              <div className="path-node node-locked">
                <div className="node-dot"></div>
                <div className="node-label">
                  <strong>Bhakti Mastery</strong>
                  <span>Bhaktayogi — love as your natural state</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="paths-note">
          Wisdom reads your struggles and places you on the right path.
          <strong> You don't choose — you discover.</strong>
        </p>
      </div>
    </section>

    {/* ── SHLOKA QUOTE BLOCK ── */}
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
        <p style={{"fontSize": "15.5px", "color": "var(--text-dim)", "lineHeight": "1.8", "marginTop": "24px", "fontWeight": "300"}}>
          This is the heart of Karma Yoga — action without attachment.
          Each path in Wisdom leads you back to a teaching like this: one verse, placed
          where you are right now, with a 2-minute practice to carry it inward.
        </p>
        <div style={{"display": "flex", "gap": "12px", "justifyContent": "center", "alignItems": "center", "flexWrap": "wrap", "marginTop": "32px"}}>
          <a
            href="/gita"
            data-mp-location="shloka_block_read_gita"
            style={{"display": "inline-flex", "alignItems": "center", "justifyContent": "center", "gap": "8px", "background": "var(--gold)", "color": "#1a0606", "padding": "13px 26px", "borderRadius": "10px", "fontSize": "15px", "fontWeight": "700", "textDecoration": "none"}}
          >
            Read the full Gita →
          </a>
          <a
            href="/hi/gita"
            hrefLang="hi"
            data-mp-location="shloka_block_read_hindi"
            style={{"display": "inline-flex", "alignItems": "center", "justifyContent": "center", "gap": "8px", "background": "transparent", "color": "var(--text-dim)", "padding": "13px 24px", "borderRadius": "10px", "fontSize": "15px", "fontWeight": "500", "border": "1.5px solid var(--border)", "textDecoration": "none"}}
          >
            हिन्दी में पढ़ें
          </a>
        </div>
      </div>
    </section>

    <div className="divider"></div>

    {/* ── HOW IT WORKS ── */}
    <section className="section section-alt" id="how-it-works">
      <div className="wrap t-center">
        <div className="eyebrow">How it works</div>
        <h2 className="heading" style={{"maxWidth": "580px", "margin": "0 auto 14px"}}>
          Tell us what's heavy.<br/>Receive your path.<br/>Practice two minutes a day.
        </h2>
        <p className="subtext" style={{"maxWidth": "520px", "margin": "0 auto 60px"}}>
          Wisdom isn't a content feed. It's a guided practice system — built around
          the way ancient teachers actually taught.
        </p>
        <div className="steps">
          <div className="step">
            <div className="step-num">1</div>
            <h3>Breathe. Then tell us what's weighing on you.</h3>
            <p>
              Wisdom opens with three breaths, then asks what's been heavy.
              Overthinking? Losing direction? Relationship stress? Your answers
              shape everything that follows.
            </p>
          </div>
          <div className="step">
            <div className="step-num">2</div>
            <h3>Receive your path — and your first teaching.</h3>
            <p>
              Based on how you struggle and what you need, Wisdom places you on
              one of three ancient paths. Your first teaching is chosen for where
              you are right now — not a random verse.
            </p>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <h3>Two minutes. One teaching. One offering.</h3>
            <p>
              A verse arrives. Read what it means today.
              Then the practice asks your heart to respond — one small offering,
              written privately. That's it. That's the loop.
            </p>
          </div>
        </div>

        {/* Milestone strip */}
        <div className="milestone-strip">
          <div className="milestone">
            <div className="milestone-dot">1</div>
            <h4>Day 1</h4>
            <p>Your first node unlocked. The path begins.</p>
          </div>
          <div className="milestone">
            <div className="milestone-dot">3</div>
            <h4>Day 3</h4>
            <p>Your path deepens. The next node opens.</p>
          </div>
          <div className="milestone">
            <div className="milestone-dot">7</div>
            <h4>Day 7</h4>
            <p>First reflection cycle. Your pattern becomes visible.</p>
          </div>
          <div className="milestone">
            <div className="milestone-dot">21</div>
            <h4>Day 21</h4>
            <p>Your rhythm is real. Wisdom grows when you return.</p>
          </div>
        </div>
      </div>
    </section>

    {/* ── FEATURE SPLIT 1: Daily Teaching ── */}
    <section className="section" id="features">
      <div className="wrap">
        <div className="split">
          <div className="split-text">
            <span className="pill">Daily Teaching</span>
            <h2>One verse. What it means today.<br/>Two minutes.</h2>
            <p>
              Every day, Wisdom delivers one teaching chosen for your current path
              and node — not a random quote. The verse arrives with what it means
              for your actual life right now, and a clear invitation to practice.
            </p>
            <ul className="check-list">
              <li>
                <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                Teaching chosen for your path and node
              </li>
              <li>
                <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                Sanskrit verse with clear modern meaning
              </li>
              <li>
                <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                "What this means today" — how it applies to your life right now
              </li>
              <li>
                <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                Full Sanskrit text with detailed meaning when you go deeper
              </li>
            </ul>
          </div>
          <div className="split-phone">
            <div className="phone-frame">
              <img
                src="/assets/app-teaching.png"
                alt="Wisdom app daily teaching screen showing Bhagavad Gita verse and what it means today"
                loading="lazy"/>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── FEATURE SPLIT 2: The Offering Practice ── */}
    <section className="section section-alt">
      <div className="wrap">
        <div className="split flip">
          <div className="split-text">
            <span className="pill">The Offering Practice</span>
            <h2>The verse asks.<br/>Your heart responds.</h2>
            <p>
              Reading a verse is one thing. Wisdom goes further: each teaching
              opens into a practice — an invitation to write one honest response.
              Who came to mind? What small offering can you make today?
              This is where the teaching becomes yours.
            </p>
            <ul className="check-list">
              <li>
                <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                A guided practice prompt after every teaching
              </li>
              <li>
                <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                Write what your heart found — private, no judgement
              </li>
              <li>
                <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                All reflections saved privately to your account
              </li>
              <li>
                <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                Go deeper — read the full verse and traditional commentary
              </li>
            </ul>
          </div>
          <div className="split-phone">
            <div className="phone-frame">
              <img
                src="/assets/app-offering.png"
                alt="Wisdom app offering practice — the verse asks your heart to respond"
                loading="lazy"/>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── FEATURE SPLIT 3: Path Progress ── */}
    <section className="section">
      <div className="wrap">
        <div className="split">
          <div className="split-text">
            <span className="pill">Your Path Progress</span>
            <h2>Each practice moves you<br/>through your path.</h2>
            <p>
              Wisdom isn't a daily quote app — it's a progression. Every practice
              advances you through nodes on your path. Watch yourself move from
              Connection to Devotion to Mastery, day by day. The sages built
              this as a journey. So did we.
            </p>
            <ul className="check-list">
              <li>
                <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                Nodes unlock as you practice — Connection, Devotion, Mastery
              </li>
              <li>
                <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                Switch between all three paths as you deepen
              </li>
              <li>
                <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                Day streak, bookmarks, and practices tracked
              </li>
              <li>
                <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                Wisdom grows when you return — every day counts
              </li>
            </ul>
          </div>
          <div className="split-phone">
            <div className="phone-frame">
              <img
                src="/assets/path-nodes.png"
                alt="Wisdom app path progress showing Connection, Devotion and Bhakti Mastery nodes"
                loading="lazy"/>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── FEATURE SPLIT 4: The Sacred Verse ── */}
    <section className="section section-alt">
      <div className="wrap">
        <div className="split flip">
          <div className="split-text">
            <span className="pill">The Sacred Verse</span>
            <h2>Every teaching is a<br/>Bhagavad Gita verse.</h2>
            <p>
              Wisdom draws every practice from the Bhagavad Gita and core
              Hindu scriptures. Not a curated quote. A sacred verse — with its
              original Sanskrit, chapter and verse reference, and traditional
              commentary alongside the modern meaning.
            </p>
            <ul className="check-list">
              <li>
                <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                Original Sanskrit Devanagari with transliteration
              </li>
              <li>
                <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                Detailed meaning from traditional commentary
              </li>
              <li>
                <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                Chapter and verse reference — every teaching is traceable
              </li>
              <li>
                <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                Bookmark and share the verses that speak to you
              </li>
            </ul>
          </div>
          <div className="split-phone">
            <div className="phone-frame">
              <img
                src="/assets/app-verse-deep.png"
                alt="Wisdom app sacred verse screen showing Sanskrit Bhagavad Gita shloka with detailed meaning"
                loading="lazy"/>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── BHAGAVAD GITA FULL SCRIPTURE ── */}
    <style dangerouslySetInnerHTML={{__html: `
      .read-gita-grid { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); gap: 56px; align-items: stretch; }
      .read-gita-art-col { display: flex; flex-direction: column; gap: 14px; height: 100%; }
      .read-gita-art-col > div:first-child { flex: 1 1 auto; min-height: 380px; }
      @media (max-width: 820px) {
        .read-gita-grid { grid-template-columns: 1fr; gap: 36px; align-items: start; }
        .read-gita-art-col > div:first-child { min-height: unset; aspect-ratio: 1 / 1; }
      }
    `}} />
    <section className="section" id="read-gita" style={{"borderTop": "1px solid var(--border)"}}>
      <div className="wrap read-gita-grid">
        <div>
          <div className="eyebrow">The full scripture, online</div>
          <h2 className="heading" style={{"marginBottom": "18px"}}>
            The Bhagavad Gita —<br/><em>read every verse, free.</em>
          </h2>
          <p className="subtext" style={{"marginBottom": "26px"}}>
            Wisdom has put the entire Bhagavad Gita on this site —
            all 18 chapters, all 700 verses, in Sanskrit, Hindi, and English. Each verse on its own
            page, with a one-line essence, the speaker named, and cross-links by theme.
            No login. No paywall. Just the scripture.
          </p>
          <ul style={{"listStyle": "none", "padding": "0", "margin": "0 0 30px", "display": "grid", "gap": "12px"}}>
            <li style={{"display": "flex", "gap": "12px", "alignItems": "flex-start"}}>
              <span style={{"color": "var(--gold-light)", "flexShrink": 0}}>◆</span>
              <span style={{"color": "var(--text-dim)", "fontSize": "15.5px", "lineHeight": "1.65"}}>
                <strong style={{"color": "var(--text)"}}>18 chapters</strong> — Sankhya Yoga, Karma Yoga, Bhakti Yoga, Moksha Sanyasa Yoga, and all the rest.
              </span>
            </li>
            <li style={{"display": "flex", "gap": "12px", "alignItems": "flex-start"}}>
              <span style={{"color": "var(--gold-light)", "flexShrink": 0}}>◆</span>
              <span style={{"color": "var(--text-dim)", "fontSize": "15.5px", "lineHeight": "1.65"}}>
                <strong style={{"color": "var(--text)"}}>One page per verse</strong> — Sanskrit Devanagari, Hindi anuvad, English translation.
              </span>
            </li>
            <li style={{"display": "flex", "gap": "12px", "alignItems": "flex-start"}}>
              <span style={{"color": "var(--gold-light)", "flexShrink": 0}}>◆</span>
              <span style={{"color": "var(--text-dim)", "fontSize": "15.5px", "lineHeight": "1.65"}}>
                <strong style={{"color": "var(--text)"}}>Browse by theme</strong> — karma, dharma, bhakti, vairagya, the steady mind. The Gita organized around the questions you bring.
              </span>
            </li>
            <li style={{"display": "flex", "gap": "12px", "alignItems": "flex-start"}}>
              <span style={{"color": "var(--gold-light)", "flexShrink": 0}}>◆</span>
              <span style={{"color": "var(--text-dim)", "fontSize": "15.5px", "lineHeight": "1.65"}}>
                <strong style={{"color": "var(--text)"}}>Hindi mirror</strong> at <a href="/hi/gita" hrefLang="hi" style={{"color": "var(--gold-light)"}}>/hi/gita</a> — every verse in Hindi-first layout.
              </span>
            </li>
          </ul>
          <div style={{"display": "flex", "gap": "14px", "flexWrap": "wrap"}}>
            <a href="/gita" className="btn-nav" data-mp-location="home_gita_section_cta">Open the Gita →</a>
            <a href="/gita/chapter/2/verse/47" className="btn-ghost" data-mp-location="home_gita_section_247">
              Start with 2.47
            </a>
          </div>
        </div>
        <div className="read-gita-art-col">
          <div style={{"position": "relative", "borderRadius": "14px", "overflow": "hidden", "border": "1px solid var(--border)", "background": "var(--bg-warm)"}}>
            <img
              src="/assets/gita.webp"
              alt="Krishna speaking the Bhagavad Gita to Arjuna"
              style={{"width": "100%", "height": "100%", "objectFit": "cover", "display": "block"}}
              loading="lazy"
            />
            <div style={{"position": "absolute", "inset": "0", "background": "linear-gradient(180deg, transparent 55%, rgba(18, 5, 5, 0.7))", "pointerEvents": "none"}}></div>
            <div style={{"position": "absolute", "bottom": "20px", "left": "22px", "right": "22px", "fontFamily": "'Playfair Display', Georgia, serif", "fontStyle": "italic", "fontSize": "15.5px", "color": "var(--gold-light, #f5c96a)", "lineHeight": "1.5"}}>
              &ldquo;Whenever dharma declines, I manifest myself.&rdquo;<br/>
              <span style={{"fontSize": "12.5px", "fontStyle": "normal", "letterSpacing": "0.08em", "textTransform": "uppercase", "opacity": "0.75"}}>Bhagavad Gita 4.7</span>
            </div>
          </div>
          <div style={{"display": "grid", "gridTemplateColumns": "repeat(3, 1fr)", "gap": "10px", "marginTop": "14px"}}>
            <a href="/gita/chapter/1" style={{"display": "block", "padding": "12px 14px", "background": "var(--bg-card, rgba(255,255,255,0.04))", "border": "1px solid var(--border)", "borderRadius": "8px", "textDecoration": "none", "fontSize": "12.5px", "color": "var(--text-dim)"}}>
              <div style={{"color": "var(--gold-light)", "fontFamily": "'Playfair Display', Georgia, serif", "fontSize": "16px", "marginBottom": "2px"}}>Ch. 1</div>
              Arjuna&apos;s Despair
            </a>
            <a href="/gita/chapter/2" style={{"display": "block", "padding": "12px 14px", "background": "var(--bg-card, rgba(255,255,255,0.04))", "border": "1px solid var(--border)", "borderRadius": "8px", "textDecoration": "none", "fontSize": "12.5px", "color": "var(--text-dim)"}}>
              <div style={{"color": "var(--gold-light)", "fontFamily": "'Playfair Display', Georgia, serif", "fontSize": "16px", "marginBottom": "2px"}}>Ch. 2</div>
              Sankhya Yoga
            </a>
            <a href="/gita/chapter/12" style={{"display": "block", "padding": "12px 14px", "background": "var(--bg-card, rgba(255,255,255,0.04))", "border": "1px solid var(--border)", "borderRadius": "8px", "textDecoration": "none", "fontSize": "12.5px", "color": "var(--text-dim)"}}>
              <div style={{"color": "var(--gold-light)", "fontFamily": "'Playfair Display', Georgia, serif", "fontSize": "16px", "marginBottom": "2px"}}>Ch. 12</div>
              Bhakti Yoga
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* ── TESTIMONIALS ── */}
    <section className="section section-alt">
      <div className="wrap t-center">
        <div className="eyebrow">App Store Reviews</div>
        <h2 className="heading" style={{"maxWidth": "540px", "margin": "0 auto 10px"}}>
          From those already on the path.
        </h2>
        <div style={{"display": "flex", "alignItems": "center", "justifyContent": "center", "gap": "10px", "marginBottom": "52px"}}>
          <span style={{"fontFamily": "'Playfair Display', Georgia, serif", "fontSize": "36px", "fontWeight": "700", "color": "var(--gold-light)", "lineHeight": "1"}}>4.9</span>
          <div style={{"textAlign": "left"}}>
            <div style={{"color": "var(--gold)", "fontSize": "16px", "letterSpacing": "2px"}}>★★★★★</div>
            <div style={{"fontSize": "12px", "color": "var(--text-dimmer)", "marginTop": "2px"}}>App Store reviews</div>
          </div>
        </div>
        <div className="testi-grid">
          <div className="testi-card">
            <div style={{"display": "flex", "alignItems": "center", "justifyContent": "space-between", "marginBottom": "10px"}}>
              <div className="testi-stars">★★★★★</div>
              <div style={{"fontSize": "11px", "color": "var(--text-dimmer)"}}>2 Apr</div>
            </div>
            <div style={{"fontSize": "13px", "fontWeight": "700", "color": "var(--gold-light)", "marginBottom": "10px"}}>Exceptional</div>
            <blockquote>
              "This is a gem of a find — I&apos;m not a very religious or spiritual person myself, but the impact of the Shlokas at various points during a stressful day has had a very positive influence... would highly recommend it"
            </blockquote>
            <div className="testi-author">
              <div className="testi-avatar">A</div>
              <div>
                <div className="testi-name">AbhimanyuDasgupta</div>
                <div className="testi-role">App Store · India</div>
              </div>
            </div>
          </div>
          <div className="testi-card">
            <div style={{"display": "flex", "alignItems": "center", "justifyContent": "space-between", "marginBottom": "10px"}}>
              <div className="testi-stars">★★★★★</div>
              <div style={{"fontSize": "11px", "color": "var(--text-dimmer)"}}>4 Apr</div>
            </div>
            <div style={{"fontSize": "13px", "fontWeight": "700", "color": "var(--gold-light)", "marginBottom": "10px"}}>A Powerful Daily Mindset Companion</div>
            <blockquote>
              "This app feels like a daily companion for mental clarity and inner growth. Highly recommended for anyone looking to bring a bit more peace and perspective into their life."
            </blockquote>
            <div className="testi-author">
              <div className="testi-avatar">R</div>
              <div>
                <div className="testi-name">rahuliitb16</div>
                <div className="testi-role">App Store · India</div>
              </div>
            </div>
          </div>
          <div className="testi-card">
            <div style={{"display": "flex", "alignItems": "center", "justifyContent": "space-between", "marginBottom": "10px"}}>
              <div className="testi-stars">★★★★★</div>
              <div style={{"fontSize": "11px", "color": "var(--text-dimmer)"}}>5 Apr</div>
            </div>
            <div style={{"fontSize": "13px", "fontWeight": "700", "color": "var(--gold-light)", "marginBottom": "10px"}}>Helps me Stay Calm</div>
            <blockquote>
              "Beautiful app with meaningful spiritual quotes. It really helps me stay calm and positive every day."
            </blockquote>
            <div className="testi-author">
              <div className="testi-avatar">D</div>
              <div>
                <div className="testi-name">Dibbbuuu</div>
                <div className="testi-role">App Store · India</div>
              </div>
            </div>
          </div>
        </div>
        <p style={{"marginTop": "32px", "fontSize": "13px", "color": "var(--text-dimmer)"}}>
          <a
            href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125"
            target="_blank"
            rel="noopener noreferrer"
            style={{"color": "var(--gold-light)"}}
            data-mp-location="reviews_app_store_link"
          >See all reviews on the App Store →</a>
        </p>
      </div>
    </section>

    {/* ── ABOUT ── */}
    <section className="section">
      <div className="wrap t-center">
        <div className="eyebrow">About Wisdom</div>
        <h2 className="heading" style={{"maxWidth": "580px", "margin": "0 auto 14px"}}>
          A different kind of<br/>mental wellness app.
        </h2>
        <p className="subtext" style={{"maxWidth": "520px", "margin": "0 auto"}}>
          Not mindfulness. Not motivation. Ancient teachings — made into
          a daily practice for the life you're actually living.
        </p>
        <div className="about-grid">
          <div className="about-card">
            <div className="about-card-icon">🪔</div>
            <h3>What is Wisdom?</h3>
            <p>
              Wisdom is an iPhone app for daily practice rooted in the Bhagavad Gita.
              You choose your path — Action, Wisdom, or Devotion — and receive one
              2-minute guided teaching each day, drawn from Hindu scriptures. Each
              practice has a verse, a modern meaning, and an offering prompt for your reflection.
            </p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">🧘</div>
            <h3>Who is Wisdom for?</h3>
            <p>
              Wisdom is for anyone feeling restless, overwhelmed, disconnected, or directionless —
              and open to a different lens. Whether you&apos;ve read the Gita before or never heard of it,
              Wisdom meets you where you are and places you on the path that fits how you actually think and feel.
            </p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">📖</div>
            <h3>Why ancient wisdom?</h3>
            <p>
              Modern approaches to mental wellness treat symptoms. The Bhagavad Gita goes to the source —
              the nature of the mind, the ego, the self. A civilization that saw clearly 5,000 years ago
              left behind precise instructions. Wisdom makes those instructions available in two minutes a day.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* ── FAQ ── */}
    <section className="section section-alt" id="faq">
      <div className="wrap t-center">
        <div className="eyebrow">FAQ</div>
        <h2 className="heading" style={{"maxWidth": "520px", "margin": "0 auto 14px"}}>
          Common questions about<br/>Wisdom and the 3 paths.
        </h2>
        <div className="faq-list" role="list">
          <div className="faq-item" role="listitem">
            <button className="faq-q" aria-expanded="false">
              What are the three paths in Wisdom?
              <svg className="faq-chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="faq-a">
              Wisdom offers three paths drawn from the Bhagavad Gita: the Path of Action (Karma Yoga) for
              those driven to do and achieve; the Path of Wisdom (Jnana Yoga) for those who need to understand
              and see clearly; and the Path of Devotion (Bhakti Yoga) for those who feel deeply and find
              strength through surrender and connection. Each path has its own nodes you progress through,
              one practice at a time.
            </div>
          </div>

          <div className="faq-item" role="listitem">
            <button className="faq-q" aria-expanded="false">
              How does Wisdom know which path to put me on?
              <svg className="faq-chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="faq-a">
              When you first open Wisdom, it asks you a few honest questions — what&apos;s been weighing on you,
              how you usually respond when life gets heavy, and what you want to achieve. Based on your answers,
              Wisdom places you on the path that fits how you actually think, feel, and act. You can also
              switch between paths or explore all three as your practice deepens.
            </div>
          </div>

          <div className="faq-item" role="listitem">
            <button className="faq-q" aria-expanded="false">
              Is this a mental health app? Can it help with anxiety?
              <svg className="faq-chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="faq-a">
              Wisdom is a spiritual practice app, not a clinical mental health tool. That said, many users
              find it deeply calming and clarifying — especially for the kind of anxiety that comes from
              overthinking, loss of direction, or feeling disconnected from meaning. The Bhagavad Gita
              addresses the root causes of mental restlessness directly. If you&apos;re experiencing serious
              mental health challenges, we encourage you to also seek professional support.
            </div>
          </div>

          <div className="faq-item" role="listitem">
            <button className="faq-q" aria-expanded="false">
              Do I need to know anything about Hinduism or the Bhagavad Gita to use Wisdom?
              <svg className="faq-chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="faq-a">
              No. Wisdom is built for complete beginners. You don&apos;t need any prior knowledge — every
              teaching comes with a clear, plain-English explanation of what the verse means and how it
              applies to your life right now. The Sanskrit text is there if you want it, but never required.
            </div>
          </div>

          <div className="faq-item" role="listitem">
            <button className="faq-q" aria-expanded="false">
              How long does a daily practice take?
              <svg className="faq-chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="faq-a">
              Two minutes. One teaching arrives, you read what it means today, and write one honest
              reflection in the offering practice. That&apos;s the complete loop. You can go deeper — read
              the full Sanskrit verse and commentary — but the core practice is always two minutes.
            </div>
          </div>

          <div className="faq-item" role="listitem">
            <button className="faq-q" aria-expanded="false">
              Is Wisdom free? What&apos;s included in the subscription?
              <svg className="faq-chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="faq-a">
              Wisdom is free to download. The free version lets you try your first practice and see today&apos;s
              teaching. The subscription (3 days free, then monthly or yearly) unlocks the full daily practice
              system — your path, all nodes, the reflection journal, and access to all three paths as you
              grow. It&apos;s available on the App Store for iPhone.
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── FINAL CTA ── */}
    <div className="divider"></div>
    <section className="final-cta">
      <div className="wrap">
        <h2>The path was already drawn.<br/><em>You just have to walk it.</em></h2>
        <p>
          Free to download. Two minutes a day. One teaching, one path, one step at a time.
        </p>
        <a
          href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125"
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
          Free · 3-day trial · Available on iOS
        </p>
      </div>
    </section>

    {/* ── FOOTER ── */}
    <footer>
      <div className="footer-inner">
        <div className="footer-logo" style={{"display": "flex", "alignItems": "center", "gap": "9px"}}>
          <img
            src="/assets/male-logo-dark.webp"
            alt="Wisdom"
            loading="lazy"
            style={{"width": "30px", "height": "30px", "borderRadius": "50%", "objectFit": "cover", "border": "1px solid rgba(200, 136, 30, 0.35)"}}/>
          Wisdom
        </div>
        <p className="footer-copy">© 2026 Wisdom · Ankur Shukla</p>
        <div style={{"display": "flex", "alignItems": "center", "gap": "20px", "flexWrap": "wrap"}}>
          <a
            href="https://x.com/sansearchapp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Wisdom on X (Twitter)"
            style={{"color": "var(--text-dimmer)", "fontSize": "13px"}}
            data-mp-location="footer_twitter"
          >𝕏</a>
          <a
            href="https://www.instagram.com/wisdomquoteapp/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Wisdom on Instagram"
            style={{"color": "var(--text-dimmer)", "fontSize": "13px"}}
            data-mp-location="footer_instagram"
          >Instagram</a>
          <ul className="footer-links">
            <li><a href="/privacy">Privacy</a></li>
            <li><a href="/terms">Terms</a></li>
            <li><a href="mailto:work.ankurshukla@gmail.com">Support</a></li>
          </ul>
        </div>
      </div>
    </footer>

    <BlogTracker pageName="Home" />
    </>
  )
}
