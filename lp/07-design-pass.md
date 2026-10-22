# 07 · Design pass (Landingfolio references + motion skill)

The palette and type are unchanged: maroon night, diya gold, Playfair and Inter, the Krishna hero art. The references were used only to fix places where the page broke layout principles.

## References (Landingfolio)
Pulled: hero dark, feature dark, steps, single-quote testimonial, dark CTA, FAQ.
| Pattern seen | Applied as |
|---|---|
| Numbered steps in a row joined by a line (Teamflow, the grants page) | "One verse a day for a week": a 4-step row. Vertical on phones. |
| Grid-line panels with shared borders (NEAR, compliance sections) | The three-notes section is one bordered panel with dividers, not three floating cards. |
| Single editorial quote, generous space (Rulebase, Orshot) | The review is a centred serif quote with a gold mark. |
| Closing band: serif line over art in a rounded frame (Wispr Flow) | The final CTA sits on chapter-2 art with a radial scrim. |
| Consistent head alignment; FAQ as heading + list (most SaaS references) | Section heads are left-aligned throughout. FAQ is two columns on desktop. |

## Motion identity (LottieFiles motion-design skill)
- **Personality:** Premium / calm (sacred text, read at night). No overshoot.
- **Signature easing:** cubic-bezier(0.4, 0, 0.2, 1). Feedback uses (0.2, 0, 0, 1).
- **Durations:** quick 160ms (feedback), standard 500ms (entrances), slow 900ms (line draws, ambient).
- **Entrance:** fade, rise 14px, scale 98.5% → 100%. Group stagger is capped at 420ms.
- **Layers:**
  - Primary: content entrances.
  - Secondary: follow-through inside the verse card; the steps line draws after the numbers land.
  - Ambient: hero art drift over 28s and glow breathing over 9s; loading dots.
- **Verse reveal (the key moment):** the card lands in 600ms, its lines follow at 140–440ms, a gold rule draws across the top in 900ms, and the next-step panel arrives at 520ms.
- **Corrections to the existing code:**
  - Hero overshoot curves (0.22, 0.68, 0, 1.2) replaced with the signature curve.
  - Generic `ease` replaced.
  - Cursor-following glow removed (it fails the skill's "appropriate on the 100th viewing" test).
- **Accessibility:** reduced motion gets opacity-only motion with no loops. Content is visible without JS, because hiding applies only under `html.motion`.

## Checks (19 Oct)
- copy_check: 75 of 75 pieces match.
- Banned words: 0.
- No horizontal scroll at 412px.
- After a full scroll, 0 elements are still hidden.
- Build and type-check pass.
