"""
harness_v2: a chosen verse + what the person told us -> the day page's words and its Listen script.

NOT WIRED IN. Nothing in server/ imports this package yet (plan_engine_v3, 13 Nov 2026).

    briefs.py        PersonBrief (who they are, in the contract's vocabulary, with their own words and consent)
                     VerseBrief  (what the verse claims, how the tradition reads it, its scene, what it must not be
                     used for, and why the planner put it on this day)
    static_layer.py  written ONCE per verse, offline, by Sarvam, gated by checker.py, cached with reviewed=false:
                     meaning, the scene, the base audio script with the Sanskrit woven in, a per-stance fallback line
    prompts.py       the two request-time prompts: the first line (small, streamed) and the rest of the personal layer
    checker.py       fidelity and safety in code: trace to the VerseBrief, banned patterns, stance guard, risk
    harness.py       request time: the first line is the only thing that waits on a model; everything else is cached
    build_static.py  the offline pipeline (python -m ai.harness_v2.build_static ...)

Layering, in the order the screen can paint:
    0 ms     verse, Sanskrit, static meaning, static scene, base audio            (cache)
    0 ms     a chip line for their feeling word                                    (cache; the no-consent experience)
    ~1 s     the first line, written for them from their own words                 (one small streamed Sarvam call)
    later    for_you, practice, the scene's closing line, the spoken open/close    (one JSON call, off the first paint)
"""
from .briefs import (PersonBrief, VerseBrief, attach_edge, build_person_brief, build_verse_brief, choose_edge, clean_note, fit_guard,
                     load_graph_edges, load_labels)
from .checker import check_text, check_personal, check_static, Issue
from .harness import audio_script, day_page, first_line, line_so_far, personal_layer

__all__ = ["PersonBrief", "VerseBrief", "attach_edge", "build_person_brief", "build_verse_brief", "choose_edge", "clean_note", "fit_guard",
           "load_graph_edges", "load_labels", "check_text", "check_personal", "check_static", "Issue", "audio_script", "day_page",
           "first_line", "line_so_far", "personal_layer"]
