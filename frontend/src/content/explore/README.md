# Map of the mind data (`/explore`, `/explore/<state>`)

Static JSON for the explore pages. Never edit these files by hand: fix the sources and regenerate.

## Regenerate

```
cd frontend
python3 scripts/build-explore-data.py
python3 scripts/explore_whys_sarvam.py
python3 scripts/build-explore-data.py
```

The first build lists every model-written line the pages would show (`whys_needed.json`). The Sarvam pass rewrites
the new ones and caches them in `whys_sarvam.json` (already-cached lines are skipped, so a re-run only sends what
changed). The second build puts the rewrites in place. A line with no accepted rewrite is hidden, never shown raw.
Output is deterministic: the same sources give byte-identical files.

Sources (read-only): `../sanscripts/plan_engine_v3/03_graph/` (wisdom_graph.json, states.json, chains.json,
antidotes.json, situation_state_map.json), `backend/data/taxonomy/wisdom_library.v3.json`, and
`src/content/gita/verses/*.json` for Gita Sanskrit (the same text as the verse pages). Override the paths with
`EXPLORE_GRAPH_DIR` and `EXPLORE_LIBRARY`. Needs python3 with numpy; the Sarvam pass needs `backend/.env`
(SARVAM_API_KEY) and the backend's `ai` package.

## Files

| File | Used by | What it holds |
|---|---|---|
| `map.json` | ExploreMap (client, loaded after the page as its own chunk) | 46 states and 1,963 verses and stories with precomputed 2D positions, node-to-state edges (flat triples) and state-to-state links. About 115 KB gzipped. |
| `nodes/<group>.json` | MapPanel (client, on first open of a point from that text family) | Verse details (original, meaning, roles, one caption, thread and dialogue links, scene) and story details (library title, summary, lesson). |
| `states/<id>.json` | `/explore/[state]` pages and the map's state panel | Everything one state page shows. |
| `index.json` | routes, sitemap, `/explore` state list | The 46 states: id, slug, names, valence. |
| `reflect.json` | Reflect box (client, loaded on focus) | The 17 feeling words, synonyms per state (matching keys only, never shown), phrases and one safe verse per state. |
| `meta.json` | `/explore` hero | Counts. |
| `whys_needed.json`, `whys_sarvam.json` | the scripts | The Sarvam work list and cache. Not imported by any page. |

## What the pages may show, and what never reaches them

- Shown as they are: verse originals, translations and `line`, `display_ref`, speaker, and prasang title, summary and
  lesson, all from the library. State names and the short `modern` gloss are the contract vocabulary.
- Shown only after the Sarvam rewrite: edge captions (`why`), antidote lines, state glosses, chain summaries and
  concept glosses. Each caption carries its provenance: "stated in the text" (graph provenance text or commentary)
  or "our reading" (curated). Captions come only from per-verse labels; a group line from antidotes.json is never
  put under a single verse.
- Stories: only those with a library prasang, shown with the library's own title, summary and lesson.
  `story_text.json` prose is never used.
- Never on a public page: verses flagged `self_harm_adjacent` or `gender_sensitive`, staged verses, stories flagged
  `self_harm_theme` or `gender_sensitive`, `RISK_NEVER`, the library's dropped verses, pair verses that must never
  travel alone, and non-Gita verses whose notes say to fix the Sanskrit before display.
- State pages and panels also leave out mortality, needs_scene, violence, invalidates_fear, fatalism and
  renunciation-push verses. The reflect box also leaves out reproach, self-blame, endurance, rebuke and warning
  verses, so it only ever offers a line that names the feeling from inside or blesses a good state.
- Graph rules applied: no rebuke or reproach as healing for guilt, unworthiness, grief or despair; for being wronged,
  no forgiveness, equanimity, letting go or contentment as the antidote and no endurance verses.
