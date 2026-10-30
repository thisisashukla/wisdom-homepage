# Quote pages: writing, UI and motion rules (binding for every agent)

## Writing (all user-facing text: copy, meanings, forYou lines, FAQ, alt text, metadata, image text)
Source of truth: lp/02-brand-voice.md (read it) and tools/copy-audit/RUBRIC.md.
- No em dash (—) or en dash (–) anywhere. Not as punctuation, not in ranges ("12 to 15", "6.5 to 6.6"), not in titles. Use commas, periods, colons, "to".
- Banned words: unlock, journey, elevate, holistic, transform/transformative, seeker, purport, manifest, divine guidance, ancient wisdom, timeless, 5,000 years, profound, delve, embark, empower, curated/curate, seamless, AI-powered, wellness, mindful, navigate, embrace, tapestry, testament, beacon, realm, resonate, "whatever you're carrying", "not just X", "more than just", "in today's fast-paced world", "at its core", "the power of". No exclamation marks. No emoji.
- Banned patterns: reveal constructions ("X is not A. It is B.", "not A but B", "isn't X, it's Y", "doesn't X. He Y."); fragment drama ("Not slowly. Completely."); rule-of-three lists by reflex; superlatives about scripture ("the most X verse", "no other scripture", "changes everything"); pseudo-clinical words (panic attack, clinical, nervous system, rumination, therapeutic, hold space); filler intensifiers (actually, quietly, deeply, truly, precisely, remarkable, devastating); greeting-card taglines ("True peace comes from..."); the Gita's age in years; rhetorical questions as openers; "Here's why", "Let's", "Imagine"; colon-reveal headlines ("Karma: What It Really Means").
- Vignettes: at most one modern example per section and vary the setting. No phone/inbox/2 a.m. scenes by default.
- Voice: plain, calm, specific, warm. Short sentences. Say the thing directly. Copy is about what the reader feels or does, never product features.
- Hindi: natural spoken Hindustani in Devanagari, the words people search (अनमोल वचन, सुविचार, श्लोक, स्टेटस). Not translated-English Hindi, not stiff शुद्ध हिंदी.
- House facts: 18.66 ends "mā śucaḥ" = "Do not grieve"; the Gita's last verse is 18.78. Radha is not in the Gita.
- Before finishing, run: `python3 tools/copy-audit/audit.py --page <your path substring>` (from repo root) on your pages/files where applicable, plus a grep for — and – in every file you wrote. Fix every hit.

## UI design (components, routes, card images)
- Load the frontend-design skill (Skill tool: anthropic-skills:frontend-design) before designing. Also read lp/07-design-pass.md: palette (maroon night, diya gold, cream), type (Playfair Display for display, Inter for UI, Noto Sans Devanagari / Tiro Devanagari Sanskrit for Sanskrit), left-aligned section heads.
- Mobile first at 360 to 412 px. First screen: H1, promise, chips, first card visible. No horizontal scroll at 412px. Tap targets at least 44px. One primary action per view.
- The Devanagari line is the hero of every card: large, generous line-height (1.6+), never cramped, never truncated. IAST smaller and quieter. Meaning in readable body size. Source chip small, letter-spaced.
- Restraint: one accent colour (gold) used for emphasis only; quiet borders; no gradients-on-everything, no glassmorphism, no drop-shadow stacks, no stock icons soup. Calm editorial feel, like a well-set book page at night.
- Accessible contrast (WCAG AA), visible focus states, semantic HTML, buttons are buttons, aria-labels on icon buttons, lang attributes on Devanagari spans.

## Motion (house motion identity from lp/07-design-pass.md)
- Personality: premium, calm, no overshoot, no bounce.
- Easing: cubic-bezier(0.4, 0, 0.2, 1) for entrances; cubic-bezier(0.2, 0, 0, 1) for feedback.
- Durations: 160ms feedback (copy tick, chip press), 500ms entrances, 900ms slow (gold rule draw, ambient).
- Entrance: fade + rise 14px + scale 0.985 to 1; group stagger capped at 420ms.
- Key moment, the line reveal in LineForYou: card lands in 600ms, its lines follow at 140 to 440ms, a thin gold rule draws across the top in 900ms, next step arrives at 520ms.
- Sheet: slides up 260ms with the entrance curve; backdrop fades. Copy feedback: icon swaps to a tick with 160ms, toast fades in and out.
- Only animate transform and opacity. No scroll-jacking, no parallax, no cursor effects, nothing that would annoy on the 100th visit.
- prefers-reduced-motion: opacity-only, no loops. Content visible without JS (hide-for-animation only under a JS-set class like html.motion).
