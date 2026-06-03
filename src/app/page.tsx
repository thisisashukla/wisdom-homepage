import type { Metadata } from 'next'
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
            src="/assets/new-light-logo.webp"
            alt="Wisdom sage"
            fetchPriority="high"/>
        </div>

        <div className="hero-eyebrow">
          Anxious. Overthinking. Restless. Lost.
        </div>

        <h1>
          Your mind won&apos;t stop.<br/><em>The Gita knows why.</em>
        </h1>

        <p className="hero-sub">
          For 5,000 years, three paths have been quieting minds like yours:
          Action, Wisdom, Devotion. Wisdom places you on yours and gives you a
          2-minute practice from the Bhagavad Gita each morning.
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
              <div className="iphone-screen">
                <img
                  src="/assets/app-path-wisdom.webp"
                  alt="Wisdom app Path of Wisdom — Stillness, Witness and Gyan Mastery nodes from the Bhagavad Gita"
                  loading="lazy"/>
              </div>
            </div>
          </div>
          <div className="fan-phone fan-center">
            <div className="iphone-mock">
              <div className="iphone-screen">
                <img
                  src="/assets/app-you-are-your-greatest-ally.webp"
                  alt="Wisdom app today's verse home screen — Bhagavad Gita 6.5: 'You are your own greatest ally and your own greatest challenge'"
                  fetchPriority="high"/>
              </div>
            </div>
          </div>
          <div className="fan-phone fan-right">
            <div className="iphone-mock">
              <div className="iphone-screen">
                <img
                  src="/assets/app-offering.webp"
                  alt="Wisdom app Bhakti offering practice — a journal-style reflection prompt after a Bhagavad Gita verse"
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
          <strong>3 ancient paths</strong>: Action, Wisdom, Devotion
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
          Anxiety, overthinking, disconnection, loss of direction. These aren't new problems.
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
              Work, expectations, roles, pulling you in five directions
              at once. None of them tell you who you actually are.
            </p>
          </div>
          <div className="prob-card">
            <div className="prob-icon">🧭</div>
            <h3>No map for the inner life</h3>
            <p>
              Modern tools track your sleep and your steps. Nothing
              guides what&apos;s happening inside, or where to go from here.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* ── THE 3 PATHS ── */}
    <section className="section section-alt paths-section" id="paths">
      <div className="wrap t-center">
        <div className="eyebrow">The three paths</div>
        <h2 className="heading" style={{"maxWidth": "640px", "margin": "0 auto 14px"}}>
          Which path is your calling?<br/><em>Wisdom places you there.</em>
        </h2>
        <p
          style={{
            maxWidth: "620px",
            margin: "0 auto",
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(18px, 2.1vw, 23px)",
            fontStyle: "italic",
            lineHeight: "1.5",
            color: "#ffffff",
            fontWeight: 600,
          }}
        >
          The paths Krishna laid out for a restless mind are still open.
        </p>

        <div
          aria-label="The three paths: Wisdom, Action, Devotion"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "clamp(32px, 6vw, 80px)",
            flexWrap: "wrap",
            margin: "48px auto 0",
          }}
        >
          {/* WISDOM */}
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "18px", minWidth: "160px"}}>
            <div
              aria-hidden="true"
              style={{
                width: "clamp(120px, 14vw, 160px)",
                height: "clamp(120px, 14vw, 160px)",
                borderRadius: "50%",
                background: "radial-gradient(circle at 32% 28%, #f9d176 0%, #f4b740 55%, #9c7000 100%)",
                boxShadow: "0 0 0 6px rgba(244, 183, 64, 0.10), 0 0 56px rgba(244, 183, 64, 0.38), inset 0 -8px 22px rgba(0, 0, 0, 0.18), inset 0 8px 20px rgba(255, 255, 255, 0.22)",
              }}
            ></div>
            <div style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(22px, 2.4vw, 28px)", fontWeight: 700, color: "#f9d176", lineHeight: 1.1, letterSpacing: "-0.4px"}}>
              Wisdom
            </div>
            <div style={{fontSize: "11.5px", color: "var(--text-dim)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600}}>
              Jnana · The seeker
            </div>
          </div>

          {/* ACTION */}
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "18px", minWidth: "160px"}}>
            <div
              aria-hidden="true"
              style={{
                width: "clamp(120px, 14vw, 160px)",
                height: "clamp(120px, 14vw, 160px)",
                borderRadius: "50%",
                background: "radial-gradient(circle at 32% 28%, #c2cce9 0%, #8a98cc 55%, #4c5990 100%)",
                boxShadow: "0 0 0 6px rgba(138, 152, 204, 0.10), 0 0 56px rgba(138, 152, 204, 0.38), inset 0 -8px 22px rgba(0, 0, 0, 0.18), inset 0 8px 20px rgba(255, 255, 255, 0.22)",
              }}
            ></div>
            <div style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(22px, 2.4vw, 28px)", fontWeight: 700, color: "#b8c3e6", lineHeight: 1.1, letterSpacing: "-0.4px"}}>
              Action
            </div>
            <div style={{fontSize: "11.5px", color: "var(--text-dim)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600}}>
              Karma · The doer
            </div>
          </div>

          {/* DEVOTION */}
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "18px", minWidth: "160px"}}>
            <div
              aria-hidden="true"
              style={{
                width: "clamp(120px, 14vw, 160px)",
                height: "clamp(120px, 14vw, 160px)",
                borderRadius: "50%",
                background: "radial-gradient(circle at 32% 28%, #f0c4d3 0%, #d9789a 55%, #7b3553 100%)",
                boxShadow: "0 0 0 6px rgba(217, 120, 154, 0.10), 0 0 56px rgba(217, 120, 154, 0.38), inset 0 -8px 22px rgba(0, 0, 0, 0.18), inset 0 8px 20px rgba(255, 255, 255, 0.22)",
              }}
            ></div>
            <div style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(22px, 2.4vw, 28px)", fontWeight: 700, color: "#ecaac3", lineHeight: 1.1, letterSpacing: "-0.4px"}}>
              Devotion
            </div>
            <div style={{fontSize: "11.5px", color: "var(--text-dim)", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600}}>
              Bhakti · The heart
            </div>
          </div>
        </div>

        <div className="paths-grid">

          {/* PATH OF WISDOM */}
          <div className="path-card wisdom">
            <div className="path-badge">💡 Path of Wisdom</div>
            <h3>Jnana Yoga</h3>
            <div className="path-yoga">THE WAY OF THE SEEKER</div>
            <p className="path-desc" style={{minHeight: "112px"}}>
              For those who need to understand, who can&apos;t find peace
              without clarity, who feel lost in the gap between what they know
              and what they feel.
            </p>
            <p className="path-tagline" style={{minHeight: "26px"}}>&ldquo;See through the noise. See what&apos;s real.&rdquo;</p>
            <div className="path-nodes">
              <div className="path-node">
                <div className="node-dot filled">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3l2 2 4-4" stroke="#120505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="node-label">
                  <strong>Stillness <span style={{opacity: 0.55, fontWeight: 500, fontSize: "10.5px", letterSpacing: "0.06em"}}>· ENTRY</span></strong>
                  <span>Sthitaprajna: the observer that does not move</span>
                </div>
              </div>
              <div className="path-node">
                <div className="node-dot filled">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3l2 2 4-4" stroke="#120505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="node-label">
                  <strong>Clarity <span style={{opacity: 0.55, fontWeight: 500, fontSize: "10.5px", letterSpacing: "0.06em"}}>· ENTRY</span></strong>
                  <span>Viveka: seeing what is real vs. what fear adds</span>
                </div>
              </div>
              <div className="path-node">
                <div className="node-dot filled"></div>
                <div className="node-label">
                  <strong>Witness</strong>
                  <span>Sakshi: the self that watches without becoming</span>
                </div>
              </div>
              <div className="path-node">
                <div className="node-dot filled"></div>
                <div className="node-label">
                  <strong>Inquiry</strong>
                  <span>Vichara: asking who is asking</span>
                </div>
              </div>
              <div className="path-node">
                <div className="node-dot filled"></div>
                <div className="node-label">
                  <strong>Equanimity</strong>
                  <span>Samatvam: stillness that survives contact with life</span>
                </div>
              </div>
              <div className="path-node">
                <div className="node-dot filled"></div>
                <div className="node-label">
                  <strong>Vairagya <span style={{opacity: 0.55, fontWeight: 500, fontSize: "10.5px", letterSpacing: "0.06em"}}>· SHARED WITH ACTION</span></strong>
                  <span>Release of grip. Engagement without enslavement.</span>
                </div>
              </div>
              <div className="path-node">
                <div className="node-dot filled" style={{boxShadow: "0 0 0 4px rgba(245, 201, 106, 0.18), 0 0 18px rgba(245, 201, 106, 0.45)"}}></div>
                <div className="node-label">
                  <strong style={{color: "#f5c96a"}}>Gyan Mastery <span style={{fontSize: "10.5px", letterSpacing: "0.08em", opacity: 0.75}}>★</span></strong>
                  <span>Jnanayogi: the knower who is beyond knowing</span>
                </div>
              </div>
            </div>
          </div>

          {/* PATH OF ACTION */}
          <div className="path-card action">
            <div className="path-badge">⚔️ Path of Action</div>
            <h3>Karma Yoga</h3>
            <div className="path-yoga">THE WAY OF THE DOER</div>
            <p className="path-desc" style={{minHeight: "112px"}}>
              For those who need to move, act, and accomplish, but feel
              consumed by outcomes, restless when idle, or trapped in cycles
              of doing more.
            </p>
            <p className="path-tagline" style={{minHeight: "26px"}}>&ldquo;Your work becomes your practice.&rdquo;</p>
            <div className="path-nodes">
              <div className="path-node">
                <div className="node-dot filled">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3l2 2 4-4" stroke="#120505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="node-label">
                  <strong>Pause <span style={{opacity: 0.55, fontWeight: 500, fontSize: "10.5px", letterSpacing: "0.06em"}}>· ENTRY</span></strong>
                  <span>Antara Viraam: the gap before reaction</span>
                </div>
              </div>
              <div className="path-node">
                <div className="node-dot filled">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3l2 2 4-4" stroke="#120505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="node-label">
                  <strong>Purpose <span style={{opacity: 0.55, fontWeight: 500, fontSize: "10.5px", letterSpacing: "0.06em"}}>· ENTRY</span></strong>
                  <span>Nishkama Karma: why you act</span>
                </div>
              </div>
              <div className="path-node">
                <div className="node-dot filled"></div>
                <div className="node-label">
                  <strong>Discipline</strong>
                  <span>Sadhana: the architecture of consistent action</span>
                </div>
              </div>
              <div className="path-node">
                <div className="node-dot filled"></div>
                <div className="node-label">
                  <strong>Duty</strong>
                  <span>Svadharma: the work that is specifically yours</span>
                </div>
              </div>
              <div className="path-node">
                <div className="node-dot filled"></div>
                <div className="node-label">
                  <strong>Effort</strong>
                  <span>Purushartha: right striving without depletion</span>
                </div>
              </div>
              <div className="path-node">
                <div className="node-dot filled"></div>
                <div className="node-label">
                  <strong>Patience</strong>
                  <span>Titiksha: endurance without collapse</span>
                </div>
              </div>
              <div className="path-node">
                <div className="node-dot filled"></div>
                <div className="node-label">
                  <strong>Vairagya <span style={{opacity: 0.55, fontWeight: 500, fontSize: "10.5px", letterSpacing: "0.06em"}}>· SHARED WITH WISDOM</span></strong>
                  <span>Release of grip. Engagement without enslavement.</span>
                </div>
              </div>
              <div className="path-node">
                <div className="node-dot filled" style={{boxShadow: "0 0 0 4px rgba(245, 201, 106, 0.18), 0 0 18px rgba(245, 201, 106, 0.45)"}}></div>
                <div className="node-label">
                  <strong style={{color: "#f5c96a"}}>Karma Mastery <span style={{fontSize: "10.5px", letterSpacing: "0.08em", opacity: 0.75}}>★</span></strong>
                  <span>Karmayogi: the actor who is free</span>
                </div>
              </div>
            </div>
          </div>

          {/* PATH OF DEVOTION */}
          <div className="path-card devotion">
            <div className="path-badge">🙏 Path of Devotion</div>
            <h3>Bhakti Yoga</h3>
            <div className="path-yoga">THE WAY OF THE HEART</div>
            <p className="path-desc" style={{minHeight: "112px"}}>
              For those who feel deeply, who need to trust again, to
              reconnect, to find steadiness through surrender rather than
              control.
            </p>
            <p className="path-tagline" style={{minHeight: "26px"}}>&ldquo;Let the heart be your guide home.&rdquo;</p>
            <div className="path-nodes">
              <div className="path-node">
                <div className="node-dot filled">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3l2 2 4-4" stroke="#120505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="node-label">
                  <strong>Trust <span style={{opacity: 0.55, fontWeight: 500, fontSize: "10.5px", letterSpacing: "0.06em"}}>· ENTRY</span></strong>
                  <span>Shraddha: the willingness to lean</span>
                </div>
              </div>
              <div className="path-node">
                <div className="node-dot filled">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3l2 2 4-4" stroke="#120505" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="node-label">
                  <strong>Connection <span style={{opacity: 0.55, fontWeight: 500, fontSize: "10.5px", letterSpacing: "0.06em"}}>· ENTRY</span></strong>
                  <span>Kritajna: recognizing what was always there</span>
                </div>
              </div>
              <div className="path-node">
                <div className="node-dot filled"></div>
                <div className="node-label">
                  <strong>Devotion</strong>
                  <span>Bhakti: sustained gratitude as a way of being</span>
                </div>
              </div>
              <div className="path-node">
                <div className="node-dot filled"></div>
                <div className="node-label">
                  <strong>Compassion</strong>
                  <span>Karuna: feeling others&apos; pain without being consumed</span>
                </div>
              </div>
              <div className="path-node">
                <div className="node-dot filled"></div>
                <div className="node-label">
                  <strong>Acceptance</strong>
                  <span>Prasada: receiving what life gives without resentment</span>
                </div>
              </div>
              <div className="path-node">
                <div className="node-dot filled"></div>
                <div className="node-label">
                  <strong>Surrender</strong>
                  <span>Sharanagati: putting down the performance of being fine</span>
                </div>
              </div>
              <div className="path-node">
                <div className="node-dot filled" style={{boxShadow: "0 0 0 4px rgba(245, 201, 106, 0.18), 0 0 18px rgba(245, 201, 106, 0.45)"}}></div>
                <div className="node-label">
                  <strong style={{color: "#f5c96a"}}>Bhakti Mastery <span style={{fontSize: "10.5px", letterSpacing: "0.08em", opacity: 0.75}}>★</span></strong>
                  <span>Bhaktayogi: love as your natural state</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MOKSHA convergence panel — Ring 7, shared by all three paths */}
        <div
          style={{
            maxWidth: "780px",
            margin: "44px auto 0",
            padding: "26px 32px",
            borderRadius: "22px",
            background: "linear-gradient(135deg, rgba(245, 201, 106, 0.10) 0%, rgba(200, 136, 30, 0.05) 100%)",
            border: "1px solid rgba(245, 201, 106, 0.28)",
            boxShadow: "0 0 60px rgba(216, 162, 63, 0.10), inset 0 0 30px rgba(245, 201, 106, 0.04)",
            display: "flex",
            alignItems: "center",
            gap: "24px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div aria-hidden="true" style={{display: "flex", alignItems: "center", gap: "6px"}}>
            <span style={{width: "14px", height: "14px", borderRadius: "50%", background: "var(--path-wisdom, #f4b740)"}}></span>
            <span style={{width: "14px", height: "14px", borderRadius: "50%", background: "var(--path-action, #8a98cc)"}}></span>
            <span style={{width: "14px", height: "14px", borderRadius: "50%", background: "var(--path-devotion, #d9789a)"}}></span>
            <span style={{fontSize: "16px", color: "var(--text-dim)", margin: "0 6px"}}>→</span>
            <span
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "radial-gradient(circle at 32% 28%, #fbe7a3 0%, #d8a23f 55%, #8e6720 100%)",
                boxShadow: "0 0 0 4px rgba(245, 201, 106, 0.20), 0 0 28px rgba(245, 201, 106, 0.55)",
                display: "inline-block",
              }}
            ></span>
          </div>
          <div style={{textAlign: "left", minWidth: "240px"}}>
            <div style={{fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#f5c96a", marginBottom: "4px"}}>
              Ring 7 · Moksha
            </div>
            <div style={{fontFamily: "'Playfair Display', Georgia, serif", fontSize: "22px", fontWeight: 700, color: "var(--gold-light)", lineHeight: 1.15, marginBottom: "4px"}}>
              Liberation
            </div>
            <div style={{fontSize: "13.5px", color: "var(--text-dim)", lineHeight: 1.5}}>
              Where all three paths arrive.
            </div>
          </div>
        </div>

        <p className="paths-note">
          Wisdom reads your struggles and places you on the right path.
          <strong> You don't choose. You discover.</strong>
        </p>
      </div>
    </section>

    {/* ── HOW IT WORKS ── */}
    <section className="section section-alt" id="how-it-works">
      <div className="wrap t-center">
        <div className="eyebrow">How it works</div>
        <h2 className="heading" style={{"maxWidth": "580px", "margin": "0 auto 14px"}}>
          Tell us what's heavy.<br/>Receive your path.<br/>Practice two minutes a day.
        </h2>
        <p className="subtext" style={{"maxWidth": "520px", "margin": "0 auto 60px"}}>
          Wisdom isn't a content feed. It's a guided practice system, built around
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
            <h3>Receive your path. Your first teaching follows.</h3>
            <p>
              Based on how you struggle and what you need, Wisdom places you on
              one of three ancient paths. Your first teaching is chosen for where
              you are right now. Not a random quote.
            </p>
          </div>
          <div className="step">
            <div className="step-num">3</div>
            <h3>Two minutes. One quote. One practice.</h3>
            <p>
              A quote arrives. Read what it means today.
              Then your path&apos;s practice asks you to respond. One honest line,
              written privately. That&apos;s the loop.
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
            <h2>One quote. What it means today.<br/>Two minutes.</h2>
            <p>
              Every day, Wisdom delivers one teaching chosen for your current path
              and node. Not a random pull. The quote arrives with what it means
              for your actual life right now, and a clear invitation to practice.
            </p>
            <ul className="check-list">
              <li>
                <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                Teaching chosen for your path and node
              </li>
              <li>
                <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                Sanskrit quote with clear modern meaning
              </li>
              <li>
                <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                &ldquo;What this means today&rdquo;: how it applies to your life right now
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
                src="/assets/app-you-are-your-greatest-ally.webp"
                alt="Wisdom app daily teaching home screen showing Bhagavad Gita 6.5 and what it means today"
                loading="lazy"/>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── FEATURE SPLIT 2: Three Practices (one per path) ── */}
    <section className="section section-alt">
      <div className="wrap t-center">
        <div className="eyebrow">A practice for every path</div>
        <h2 className="heading" style={{maxWidth: "680px", margin: "0 auto 14px"}}>
          Every quote opens into a practice<br/><em>tuned to the path you walk.</em>
        </h2>
        <p className="subtext" style={{maxWidth: "580px", margin: "0 auto"}}>
          The seeker is asked to clarify. The doer is asked to commit. The
          devoted is asked to offer. Same quote, three different invitations,
          so the teaching actually lands the way <em>you</em> need it to.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "32px",
            marginTop: "60px",
            maxWidth: "1040px",
            marginLeft: "auto",
            marginRight: "auto",
            alignItems: "start",
          }}
        >
          {/* WISDOM — Clarity Practice */}
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"}}>
            <div style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--path-wisdom-light, #f9d176)",
              marginBottom: "10px",
            }}>
              Wisdom · The Clarity Practice
            </div>
            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(15px, 1.45vw, 17px)",
              fontWeight: 700,
              color: "var(--gold-light)",
              lineHeight: 1.3,
              marginBottom: "18px",
              minHeight: "26px",
              whiteSpace: "nowrap",
            }}>
              &ldquo;What did it help you see more clearly?&rdquo;
            </h3>
            <div className="phone-frame" style={{maxWidth: "240px"}}>
              <img
                src="/assets/app-wisdom-practice.webp"
                alt="Wisdom app Clarity Practice — a Jnana-path reflection prompt asking 'What did it help you see more clearly?' with a Reveal my insight button"
                loading="lazy"/>
            </div>
            <p style={{
              fontSize: "14px",
              color: "var(--text-dim)",
              lineHeight: 1.65,
              marginTop: "22px",
              maxWidth: "280px",
            }}>
              The quote clarified something. Name it. One honest line, and the
              insight lands. Just for you.
            </p>
          </div>

          {/* ACTION — Living Practice */}
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"}}>
            <div style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--path-action-light, #b8c3e6)",
              marginBottom: "10px",
            }}>
              Action · The Living Practice
            </div>
            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(15px, 1.45vw, 17px)",
              fontWeight: 700,
              color: "var(--gold-light)",
              lineHeight: 1.3,
              marginBottom: "18px",
              minHeight: "26px",
              whiteSpace: "nowrap",
            }}>
              &ldquo;What will you do differently?&rdquo;
            </h3>
            <div className="phone-frame" style={{maxWidth: "240px"}}>
              <img
                src="/assets/app-action-practice.webp"
                alt="Wisdom app Living Practice — a Karma-path commitment prompt asking what you'll do differently today, with an I commit to this button"
                loading="lazy"/>
            </div>
            <p style={{
              fontSize: "14px",
              color: "var(--text-dim)",
              lineHeight: 1.65,
              marginTop: "22px",
              maxWidth: "280px",
            }}>
              The quote is asking to be lived. Pick one thing you&apos;ll do
              differently today. Commit to it in writing. Privately.
            </p>
          </div>

          {/* DEVOTION — Offering Practice */}
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center"}}>
            <div style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--path-devotion-light, #ecaac3)",
              marginBottom: "10px",
            }}>
              Devotion · The Offering Practice
            </div>
            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(15px, 1.45vw, 17px)",
              fontWeight: 700,
              color: "var(--gold-light)",
              lineHeight: 1.3,
              marginBottom: "18px",
              minHeight: "26px",
              whiteSpace: "nowrap",
            }}>
              &ldquo;Who or what came to mind?&rdquo;
            </h3>
            <div className="phone-frame" style={{maxWidth: "240px"}}>
              <img
                src="/assets/app-devotion-practice.webp"
                alt="Wisdom app Offering Practice — a Bhakti-path heart-response prompt asking what small offering you can make today, with an I offer this button"
                loading="lazy"/>
            </div>
            <p style={{
              fontSize: "14px",
              color: "var(--text-dim)",
              lineHeight: 1.65,
              marginTop: "22px",
              maxWidth: "280px",
            }}>
              The quote is asking your heart to answer. Name who came to mind.
              Offer one small thing: a word, a thought, an act.
            </p>
          </div>
        </div>

        <p style={{
          marginTop: "48px",
          fontSize: "14px",
          color: "var(--text-dimmer)",
          fontStyle: "italic",
          maxWidth: "560px",
          marginLeft: "auto",
          marginRight: "auto",
        }}>
          Your practice changes shape with your path. The quote stays the same.
          The invitation to respond is built for how <em>you</em> grow.
        </p>
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
              Wisdom isn't a daily quote app. It's a progression. Every practice
              advances you through nodes on your path. Watch yourself move from
              Connection to Devotion to Mastery, day by day. The sages built
              this as a journey. So did we.
            </p>
            <ul className="check-list">
              <li>
                <span className="ck"><svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l3 3 5-6" stroke="#1a0606" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                Nodes unlock as you practice: Connection, Devotion, Mastery
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
                Wisdom grows when you return. Every day counts.
              </li>
            </ul>
          </div>
          <div className="split-phone">
            <div className="phone-frame">
              <img
                src="/assets/app-path-devotion.webp"
                alt="Wisdom app path progress showing Trust, Devotion and Bhakti Mastery nodes on the Path of Devotion"
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
            <span className="pill">The Scripture</span>
            <h2>Every quote traces back to<br/>a Bhagavad Gita verse.</h2>
            <p>
              Wisdom draws every quote from the Bhagavad Gita and core Hindu
              scriptures. When a quote resonates, you can go deeper into the
              actual Sanskrit verse and detailed meaning to deepen your
              practice.
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
                Chapter and verse reference. Every teaching is traceable.
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
                src="/assets/app-verse-sanskrit.webp"
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
            The Bhagavad Gita.<br/><em>Read every verse, free.</em>
          </h2>
          <p className="subtext" style={{"marginBottom": "26px"}}>
            Wisdom has put the entire Bhagavad Gita on this site:
            all 18 chapters, all 700 verses, in Sanskrit, Hindi, and English. Each verse on its own
            page, with a one-line essence, the speaker named, and cross-links by theme.
            No login. No paywall. Just the scripture.
          </p>
          <ul style={{"listStyle": "none", "padding": "0", "margin": "0 0 30px", "display": "grid", "gap": "12px"}}>
            <li style={{"display": "flex", "gap": "12px", "alignItems": "flex-start"}}>
              <span style={{"color": "var(--gold-light)", "flexShrink": 0}}>◆</span>
              <span style={{"color": "var(--text-dim)", "fontSize": "15.5px", "lineHeight": "1.65"}}>
                <strong style={{"color": "var(--text)"}}>18 chapters</strong>: Sankhya Yoga, Karma Yoga, Bhakti Yoga, Moksha Sanyasa Yoga, and all the rest.
              </span>
            </li>
            <li style={{"display": "flex", "gap": "12px", "alignItems": "flex-start"}}>
              <span style={{"color": "var(--gold-light)", "flexShrink": 0}}>◆</span>
              <span style={{"color": "var(--text-dim)", "fontSize": "15.5px", "lineHeight": "1.65"}}>
                <strong style={{"color": "var(--text)"}}>One page per verse</strong>: Sanskrit Devanagari, Hindi anuvad, English translation.
              </span>
            </li>
            <li style={{"display": "flex", "gap": "12px", "alignItems": "flex-start"}}>
              <span style={{"color": "var(--gold-light)", "flexShrink": 0}}>◆</span>
              <span style={{"color": "var(--text-dim)", "fontSize": "15.5px", "lineHeight": "1.65"}}>
                <strong style={{"color": "var(--text)"}}>Browse by theme</strong>: karma, dharma, bhakti, vairagya, the steady mind. The Gita organized around the questions you bring.
              </span>
            </li>
            <li style={{"display": "flex", "gap": "12px", "alignItems": "flex-start"}}>
              <span style={{"color": "var(--gold-light)", "flexShrink": 0}}>◆</span>
              <span style={{"color": "var(--text-dim)", "fontSize": "15.5px", "lineHeight": "1.65"}}>
                <strong style={{"color": "var(--text)"}}>Hindi mirror</strong> at <a href="/hi/gita" hrefLang="hi" style={{"color": "var(--gold-light)"}}>/hi/gita</a>: every verse in Hindi-first layout.
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
          Not mindfulness. Not motivation. Ancient teachings, brought into
          a daily practice for the life you're actually living.
        </p>
        <div className="about-grid">
          <div className="about-card">
            <div className="about-card-icon">🪔</div>
            <h3>What is Wisdom?</h3>
            <p>
              Wisdom is an iPhone app for daily practice rooted in the Bhagavad Gita.
              You choose your path (Action, Wisdom, or Devotion) and receive one
              2-minute guided teaching each day, drawn from Hindu scriptures. Each
              practice has a verse, a modern meaning, and an offering prompt for your reflection.
            </p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">🧘</div>
            <h3>Who is Wisdom for?</h3>
            <p>
              Wisdom is for anyone feeling restless, overwhelmed, disconnected, or directionless, and open to a different lens. Whether you&apos;ve read the Gita before or never heard of it,
              Wisdom meets you where you are and places you on the path that fits how you actually think and feel.
            </p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">📖</div>
            <h3>Why ancient wisdom?</h3>
            <p>
              Modern approaches to mental wellness treat symptoms. The Bhagavad Gita goes to the source:
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
              When you first open Wisdom, it asks you a few honest questions: what&apos;s been weighing on you,
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
              find it deeply calming and clarifying, especially for the kind of anxiety that comes from
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
              No. Wisdom is built for complete beginners. You don&apos;t need any prior knowledge. Every
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
              reflection in the offering practice. That&apos;s the complete loop. You can go deeper: read
              the full Sanskrit verse and commentary. The core practice is always two minutes.
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
              system: your path, all nodes, the reflection journal, and access to all three paths as you
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
            src="/assets/new-light-logo.webp"
            alt="Wisdom"
            loading="lazy"
            style={{"width": "30px", "height": "30px", "borderRadius": "50%", "objectFit": "cover", "border": "1px solid rgba(200, 136, 30, 0.35)"}}/>
          Wisdom
        </div>
        <p className="footer-copy">© 2026 Wisdom · Ankur Shukla</p>
        <p style={{"fontSize": "11px", "color": "var(--text-dimmer)", "marginTop": "4px"}}>
          Wisdom editorial translations. Commentary AI-drafted, human-reviewed. <a href="/methodology" style={{"color": "var(--text-dimmer)"}}>Methodology →</a>
        </p>
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
            <li><a href="/methodology">Methodology</a></li>
            <li><a href="mailto:work.ankurshukla@gmail.com">Support</a></li>
          </ul>
        </div>
      </div>
    </footer>

    <BlogTracker pageName="Home" />
    </>
  )
}
