"""
Candidate verses and stories for building a prebuilt plan, one list per day's job. A person picks; nothing here is final.

    python v2/tools/plan_candidates.py --states krodha kama --sits anger_outburst craving --stages working [--allow mortality]

Jobs: see (Day 1, names what they feel), why (Day 2, where it comes from), steady (Days 3-4), act (Days 5-6), story (Day 7).
"""
import argparse
import os
import sys
from collections import defaultdict

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
from ai import plan_graph as pg, plan_v3 as V  # noqa: E402

NEVER = {"self_harm_adjacent", "reproach", "blames_self"}
SOFT = {"mortality", "invalidates_fear", "renunciation_push", "fatalism_risk", "violence", "counsels_endurance"}
JOBS = {
    "see": ({"names_pain": 0.5, "normalizes": 0.4, "depicts": 0.3, "enacts": 0.2}, "hook", {"prescribes", "warns", "rebukes", "promises", "explains_cause"}),
    "why": ({"explains_cause": 0.6, "warns": 0.3, "normalizes": 0.2}, "diagnose", {"rebukes"}),
    "steady": ({"gives_ground": 0.5, "reframes": 0.4, "consoles": 0.4, "normalizes": 0.3, "affirms": 0.3}, "steady", {"rebukes", "warns"}),
    "act": ({"prescribes": 0.6, "affirms": 0.1}, "act", {"rebukes"}),
}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--states", nargs="+", required=True)
    ap.add_argument("--sits", nargs="*", default=[])
    ap.add_argument("--stages", nargs="*", default=[])
    ap.add_argument("--allow", nargs="*", default=[], help="soft flags to allow, e.g. mortality for grief")
    ap.add_argument("--exclude", nargs="*", default=[])
    ap.add_argument("-k", type=int, default=9)
    a = ap.parse_args()
    E = V.engine(); G = E.G
    S, X = set(a.states), set(a.sits)
    A = {e["s"][6:] for s in S for e in G.inn.get(f"state:{s}", []) if e["rel"] == "antidote_to" and e["s"].startswith("state:")}
    chained = {e["s"] for s in S for c in G.N if c.startswith("chain:") and s in (G.N[c].get("steps") or []) for e in G.inn.get(c, []) if e["rel"] == "states_chain"}
    aud = set().union(*(pg.STAGE_SPEAKS.get(s, set()) for s in a.stages))
    print(f"seeds {sorted(S)} | antidotes {sorted(A)} | situations {sorted(X)} | audience {sorted(aud)}\n")
    rows = defaultdict(list)
    for vid, n in G.N.items():
        if n.get("type") != "verse" or vid not in E.verses or vid in a.exclude:
            continue
        fl = {k for k, v in (n.get("flags") or {}).items() if v}
        if fl & NEVER or fl & (SOFT - set(a.allow)) - {"counsels_endurance", "violence"} or set(n.get("not_for") or ()) & aud:
            continue
        rel = {(e["rel"], e["t"][6:]) for e in G.out.get(vid, []) if e["t"].startswith("state:")}
        on_seed = {r for r, s in rel if s in S}
        on_anti = {r for r, s in rel if s in A}
        sit = len(set(E.verses[vid].get("situations") or ()) & X)
        b, mv = n.get("beats") or {}, n.get("move")
        for job, (moves, beat, bad) in JOBS.items():
            if mv in bad or (job == "see" and fl & {"needs_scene"}):
                continue
            link = 1.0 if on_seed & {"depicts", "locus_of"} else 0.6 if "heals" in on_seed else 0.0
            if job == "why" and vid in chained:
                link += 0.8
            if job in ("steady", "act") and "cultivates" in on_anti:
                link = max(link, 0.6)
            if not link and not sit:
                continue
            score = link + 0.5 * min(sit, 2) + moves.get(mv, 0) + b.get(beat, 0)
            rows[job].append((score, vid, mv, b, fl, n.get("line") or E.verses[vid].get("line") or ""))
    for job in JOBS:
        print(f"== {job}")
        seen = set()
        for score, vid, mv, b, fl, line in sorted(rows[job], key=lambda r: -r[0]):
            p = E.verses[vid].get("prasang_id") or vid
            if p in seen:
                continue
            seen.add(p)
            tag = ",".join(sorted(fl & (SOFT | {"needs_scene", "devotional"})))
            print(f"  {score:.2f} {vid:24s} {mv or '-':14s} h{b.get('hook',0):.1f} d{b.get('diagnose',0):.1f} s{b.get('steady',0):.1f} a{b.get('act',0):.1f} | {line[:110]}" + (f"  [{tag}]" if tag else ""))
            if len(seen) == a.k:
                break
    print("== story")
    st = []
    for sid, n in G.N.items():
        if n.get("type") != "story" or set(n.get("stance_fit") or ["struggle"]) == {"wronged"} and "manyu" not in S:
            continue
        sc = 2 * len(set(n.get("situations") or ()) & X) + len(set(n.get("states_in") or ()) & S) + (n.get("strength") or 0) / 3 + (0.5 if n.get("ref_confidence") == "verified_in_corpus" else 0)
        if sc >= 1.5 and not set(n.get("not_for") or ()) & (aud | ({"wronged"} if "manyu" in S else set())):
            st.append((sc, sid, n))
    for sc, sid, n in sorted(st, key=lambda r: -r[0])[: a.k]:
        print(f"  {sc:.1f} {sid:44s} {n.get('ref_confidence','?')[:8]:8s} | {n.get('title','')[:70]} | {(n.get('teaching') or '')[:90]}")


if __name__ == "__main__":
    main()
