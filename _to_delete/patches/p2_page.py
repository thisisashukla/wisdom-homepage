import sys, os
os.chdir(sys.argv[1])
p='components/funnel/YourVerse.tsx'; s=open(p).read()
s=s.replace("?? 'what you are carrying'}","?? 'what is keeping you up'}")
open(p,'w').write(s)

p='app/page.tsx'; s=open(p).read()
if 'The Bhagavad Gita, <em>tuned to your life.</em>' not in s:
    a=s.index('              <div className="hero-eyebrow">')
    b=s.index('              <YourVerse source="hero" pageName="Home" />')
    s=s[:a]+'''              <h1>
                The Bhagavad Gita, <em>tuned to your life.</em>
              </h1>
              <p className="hero-sub">
                Tell us what&apos;s keeping you up. Get the verse Krishna said about it, in Sanskrit and plain English.
              </p>

'''+s[b:]
if 'className="hero-secondary-nav"' in s:
    a=s.index('              <div className="hero-secondary-nav">')
    b=s.index('</div>', s.index('data-mp-location="hero_today_verse_link"'))+len('</div>')
    s=s[:a]+s[b:]
s=s.replace('<h2 className="heading">What Krishna said about <em>the thing on your mind.</em></h2>','<h2 className="heading">What Krishna said about overthinking, grief, failure <em>and anger.</em></h2>')
s=s.replace("<h2>Tonight, take <em>one verse with you.</em></h2>","<h2>What&apos;s keeping you <em>up tonight?</em></h2>")
s=s.replace("<p>Pick what&apos;s on your mind. It takes under a minute.</p>","<p>One question. One verse from the Gita for it, in Sanskrit and plain English.</p>")
s=s.replace('            <a href="/gita/chapter/1/verse/1" className="btn-hero-secondary" data-mp-location="final_cta_read_gita">Start reading at 1.1</a>\n','')
open(p,'w').write(s)

# Mobile nav: a visible "Read" link so readers (45% of hero clicks went to 1.1) keep a path without a second hero button.
p='components/Nav.tsx'; s=open(p).read()
if 'nav-read-mobile' not in s:
    s=s.replace("        <MobileNavToggle />","        <a href=\"/gita\" className=\"nav-read-mobile\">Read the Gita</a>\n        <MobileNavToggle />")
    open(p,'w').write(s)
p='components/nav.css'; s=open(p).read()
if 'nav-read-mobile' not in s:
    s+='''
/* Mobile: one plain link to the reader beside the menu (not a button). */
.nav-read-mobile { display: none; }
@media (max-width: 960px) {
  .nav-read-mobile { display: inline; margin-left: auto; margin-right: 18px; font-size: 13.5px; font-weight: 600; color: rgba(245, 232, 204, 0.75); }
  .nav-read-mobile + .mobile-nav-toggle { margin-left: 0; }
}
/* On the homepage the hero owns the CTA; the nav CTA appears once the hero is gone. */
.site-nav--overlay:not(.site-nav--scrolled) .nav-cta { opacity: 0; pointer-events: none; }
.site-nav--overlay .nav-cta { transition: opacity 300ms cubic-bezier(0.4, 0, 0.2, 1); }
'''
    open(p,'w').write(s)

p='app/home-v3.css'; s=open(p).read()
if '/* Hero v4' not in s:
    s+='''
/* Hero v4: headline, one line, one button. The question replaces the subtitle once opened. */
.hero.hero-immersive.hero-v3 h1 { font-size: clamp(36px, 5.2vw, 64px); line-height: 1.04; margin-bottom: 18px; }
.hero.hero-immersive.hero-v3 .hero-sub { font-size: clamp(16px, 1.6vw, 19px); max-width: 30em; margin-bottom: 28px; }
.hero-content:has(.yv:not([data-stage="intro"])) .hero-sub { display: none; }
.hero.hero-v3 .yv { max-width: 560px; }
@media (max-width: 720px) {
  .hero.hero-immersive.hero-v3 { padding-top: 30vh; }
  .hero.hero-immersive.hero-v3 h1 { font-size: clamp(34px, 10vw, 44px); }
}
'''
    open(p,'w').write(s)

p='components/funnel/funnel.css'; s=open(p).read()
if '/* Intro + question */' not in s:
    s=s.replace(".yv-step-2, .yv-chips-sm .yv-chip { animation: yv-rise 360ms var(--yv-ease) both; }\n.yv-chips-sm .yv-chip { animation-delay: calc(var(--i, 0) * 25ms); }",
                ".yv-pick .yv-q, .yv-pick .yv-chip { animation: yv-rise 360ms var(--yv-ease) both; }\n.yv-pick .yv-chip { animation-delay: calc(60ms + var(--i, 0) * 25ms); }")
    s+='''
/* Intro + question */
.yv-intro { display: flex; flex-direction: column; align-items: flex-start; gap: 4px; }
.yv-cta { margin-top: 0; padding: 16px 34px; font-size: 16px; min-width: 240px; }
.yv-intro-fine { margin-top: 10px; }
.yv-q { font-family: "Playfair Display", Georgia, serif; font-size: clamp(22px, 2.6vw, 28px); color: #fff; margin-bottom: 14px; }
.yv-pick .yv-chips { gap: 10px; }
.yv-chip-else { color: var(--yv-dim); border-style: dashed; }
.yv-status { font-size: 16px; color: var(--yv-gold-light); display: inline-flex; align-items: baseline; gap: 2px; padding: 14px 0; }
@media (max-width: 720px) {
  .yv-intro { align-items: stretch; }
  .yv-cta { width: 100%; }
  .yv-intro-fine { text-align: center; }
}
'''
    open(p,'w').write(s)
print('page patched')
