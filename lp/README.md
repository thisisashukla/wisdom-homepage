# lp/: landing page pipeline for wisdomquotes.in

Follows the eight-skill pipeline (research → write → design). Each file is the output of one step; later steps read earlier ones and never edit them.

| File | Step | Status |
|---|---|---|
| 00-brief.md | brief | done |
| 01-icp.md | customer-icp | done: 49 sourced quotes, 35 used |
| 02-brand-voice.md | brand-voice (SB7) | done |
| 03-seo.md | seo-research | done (autocomplete-based; GSC disconnected) |
| 03b-search-data.md | seo-research v2 | done 20 Oct: GSC + Mixpanel, 90 days; supersedes 03 where they differ |
| GATE-1.md | gate | run once on instruction; decisions listed for review |
| GATE-1-v2.md | gate | approved by Ankur 20 Oct |
| 04-structure.md | page-structure | done, with deletion test |
| 05-copy.md | textual-prototype | superseded by 05-copy-v2.md |
| 04-structure-v2.md | page-structure v2 | approved 20 Oct (Gate 2), implemented |
| 05-copy-v2.md | textual-prototype v2 | approved 20 Oct; source of truth for homepage words. copy_check: 54/56 (the 2 misses are the iPhone-only line, swapped in after load) |
| GATE-2.md | gate | run once on instruction; decisions listed for review |
| 06–08 | lo-fi / hi-fi / visuals | Lo-fi: layout fitted to the existing page. Hi-fi: skipped by brief (keep current design and colours). Visuals: real only (backend output, store screenshots). |

Checks: `scripts/banned_words.py` (copy and code) and `scripts/copy_check.py` (05-copy.md against the rendered HTML; last run 43/43 matched).
