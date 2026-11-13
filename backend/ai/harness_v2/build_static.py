#!/usr/bin/env python3
"""
build_static.py: the offline pipeline. Sarvam writes; checker.py gates; everything is stored with reviewed=false.

Run from backend/ (.env with SARVAM_API_KEY):
    python -m ai.harness_v2.build_static scenes --day1 --out <dir>          # scenes for the likely Day 1 verses
    python -m ai.harness_v2.build_static scenes --ids bg.2.47 bg.6.34 --out <dir>
    python -m ai.harness_v2.build_static core   --day1 --out <dir>          # meaning, unpack, close, by_stance
    python -m ai.harness_v2.build_static chips  --out <dir>                 # one line per feeling word, then word x stage x stance
    python -m ai.harness_v2.build_static briefs --day1 --out <dir>          # only write scene_briefs.jsonl (no model)

Writes into --out (default: plan_engine_v3/05_harness):
    scene_briefs.jsonl        the grounded source each scene was written from (library + prasangs + label + raw text)
    scenes_draft.json         {version, scenes: {verse_id: {before, moment, reply, after, reading, source_range, reviewed}}}
                              exactly what ai/scene.py loads; copy to backend/data/scenes.json to serve it
    scenes_draft_meta.json    per verse: the spoken scene, the issues the checker raised, failures
    static_draft.json         StaticStore: verses {id: {meaning, audio, by_stance, reviewed}}, chip_lines
Resumable: a verse already in the output is skipped; progress is saved every 10 verses. --budget-s stops cleanly.
"""
from __future__ import annotations

import argparse
import json
import os
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

BACKEND = Path(__file__).resolve().parents[2]
V3 = Path(os.path.expanduser(os.getenv("PLAN_ENGINE_V3", "~/mnt/sanscripts/plan_engine_v3")))
RAW_GITA = Path(os.path.expanduser(os.getenv("RAW_GITA", "~/mnt/sanscripts/data/raw_json/bhagwad_gita_source.json")))
MUST = ["bg.6.34", "bg.2.47", "bg.2.7", "bg.1.47", "bg.6.35", "bg.18.63"]
# Served on Day 1 in production up to 13 Nov 2026 (Supabase hook_cache hooks + raw_notes hooks and alternates).
SERVED = ["bg.6.26", "bg.3.8", "bg.18.33", "bg.3.35", "bg.3.19", "bg.2.38", "bg.2.40", "bg.6.37", "bg.6.23", "bg.1.29", "bg.2.67",
          "bg.4.36", "bg.18.64", "bg.10.20", "bg.18.47", "bg.2.8", "bg.6.5", "bg.9.22", "bg.2.25", "bg.18.26", "bg.11.24", "bg.10.9"]


def day1_ids(lib: dict, roles: dict) -> list:
    have = {v["id"]: v for v in lib["verses"]}
    hi = [i for i, r in roles.items() if isinstance(r, dict) and (r.get("hook") or 0) >= 0.6 and i in have]
    gita_first = sorted(set(hi + MUST + SERVED), key=lambda i: (have[i]["family"] != "bg", i not in MUST + SERVED, have[i]["family"], i))
    return [i for i in gita_first if i in have]


_gita = None


def raw_neighbours(vid: str, span: int = 2) -> str:
    """For a Gita verse: the English of the verses just before and after it in the raw text, labelled."""
    global _gita
    if not vid.startswith("bg.") or not RAW_GITA.exists():
        return ""
    if _gita is None:
        _gita = {}
        for r in json.loads(RAW_GITA.read_text(encoding="utf-8")):
            idx = (r.get("meta") or {}).get("index", "")
            en = (((r.get("translations") or {}).get("English") or {}).get("source") or "").strip()
            if idx and en:
                _gita[tuple(int(x) for x in idx.split(","))] = en
    try:
        ch, n = (int(x) for x in vid.split(".")[1:3])
    except ValueError:
        return ""
    rows = []
    for k in range(n - span, n + span + 1):
        if (ch, k) in _gita:
            tag = "THIS VERSE" if k == n else ("before" if k < n else "after")
            rows.append(f"  {ch}.{k} ({tag}): {_gita[(ch, k)][:420]}")
    return "\n".join(rows)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("what", choices=["scenes", "core", "chips", "briefs"])
    ap.add_argument("--ids", nargs="*", default=[])
    ap.add_argument("--day1", action="store_true")
    ap.add_argument("--out", default=str(V3 / "05_harness"))
    ap.add_argument("--limit", type=int, default=10000)
    ap.add_argument("--workers", type=int, default=4)
    ap.add_argument("--budget-s", type=float, default=1e9)
    ap.add_argument("--additions", nargs="*", default=[], help="staged library additions (02_enrichment/library_additions/*.json); "
                    "their verses, prasangs and <name>.labels.jsonl join the library for this run only")
    a = ap.parse_args()
    sys.path.insert(0, str(BACKEND))
    os.chdir(BACKEND)
    from common.config import settings
    from ai.harness_v2.briefs import build_verse_brief, load_labels
    from ai.harness_v2 import static_layer as sl

    out = Path(a.out)
    out.mkdir(parents=True, exist_ok=True)
    lib = json.loads(Path(settings.wisdom_library_path).read_text(encoding="utf-8"))
    verses = {v["id"]: v for v in lib["verses"]}
    plist = lib["prasangs"]
    pidx = {p["id"]: k for k, p in enumerate(plist)}
    roles = json.loads(Path(settings.verse_roles_path).read_text(encoding="utf-8")).get("roles", {})
    labels = load_labels(V3 / "02_enrichment" / "shards") if (V3 / "02_enrichment" / "shards").exists() else {}
    for add in a.additions:                                   # staged verses (not merged into the library yet)
        extra = json.loads(Path(add).read_text(encoding="utf-8"))
        for v in extra.get("verses") or []:
            verses[v["id"]] = v
        have_p = {p["id"] for p in plist}
        plist += [p for p in extra.get("prasangs") or [] if p["id"] not in have_p]
        lp = Path(add).with_suffix("").with_suffix(".labels.jsonl") if add.endswith(".json") else None
        if lp and lp.exists():
            for line in lp.read_text(encoding="utf-8").splitlines():
                if line.strip():
                    r = json.loads(line)
                    labels[r["id"]] = r
    pidx = {p["id"]: k for k, p in enumerate(plist)}
    ids = [i for i in a.ids if i in verses] + (day1_ids(lib, roles) if a.day1 else [])          # chips: --ids are feeling words
    ids = list(dict.fromkeys(ids))[: a.limit]

    # The frame of the whole Gita, from the library's own first stories: a Gita scene may always draw on it.
    frame = " ".join(f"{p.get('title_en')}. {p.get('summary')}" for p in plist if p.get("text") == "bg" and p.get("chapter") == 1)[:1200]

    def ctx(vid):
        v = verses[vid]
        k = pidx.get(v.get("prasang_id") or "")
        p = plist[k] if k is not None else None
        prev = plist[k - 1] if p and k > 0 and plist[k - 1].get("text") == p.get("text") else None
        nxt = plist[k + 1] if p and k + 1 < len(plist) and plist[k + 1].get("text") == p.get("text") else None
        vb = build_verse_brief(v, p, labels.get(vid))
        src = sl.scene_source(v, p, prev, nxt, vb, raw_neighbours(vid))
        if v.get("family") == "bg" and frame:
            src += "\nhow the whole text begins (the frame every verse sits in): " + frame
        return v, p, vb, src

    if a.what in ("briefs", "scenes"):
        with (out / "scene_briefs.jsonl").open("w", encoding="utf-8") as f:
            for vid in ids:
                v, p, vb, src = ctx(vid)
                f.write(json.dumps({"id": vid, "labelled": vb.labelled, "has_story": bool(p), "has_raw": "THIS VERSE" in src,
                                    "source_range": sl.source_range(v, p), "source": src}, ensure_ascii=False) + "\n")
        print(f"briefs: {len(ids)} -> {out / 'scene_briefs.jsonl'}")
        if a.what == "briefs":
            return

    from ai.sarvam import init_sarvam
    llm = init_sarvam(api_key=settings.sarvam_api_key, model=settings.sarvam_model)
    t0 = time.perf_counter()

    if a.what == "chips":
        store = sl.StaticStore(out / "static_draft.json")
        lines, issues = sl.write_chip_lines(llm) if len(store.data["chip_lines"]) < 17 else ({}, [])
        store.data["chip_lines"].update(lines)
        store.data["chip_lines_meta"] = {"model": settings.sarvam_model, "reviewed": False, "issues": [str(i) for i in issues if i.severity == "block"]}
        store.save()
        print(f"chip lines: {len(store.data['chip_lines'])}/17 stored")
        matrix, missues = sl.write_chip_matrix(llm, a.ids or None, have=store.data.get("chip_matrix"))   # --ids: feeling words
        store.data.setdefault("chip_matrix", {}).update(matrix)
        store.data["chip_matrix_meta"] = {"model": settings.sarvam_model, "reviewed": False,
                                          "issues": [str(i) for i in missues if i.severity == "block"]}
        store.save()
        print(f"chip matrix: {len(matrix)} cells passed")
        return

    if a.what == "scenes":
        path, meta_path = out / "scenes_draft.json", out / "scenes_draft_meta.json"
        doc = json.loads(path.read_text(encoding="utf-8")) if path.exists() else {"version": 1, "scenes": {}}
        meta = json.loads(meta_path.read_text(encoding="utf-8")) if meta_path.exists() else {"model": settings.sarvam_model, "verses": {}, "failed": {}}
        todo = [i for i in ids if i not in doc["scenes"]]

        def one(vid):
            v, p, vb, src = ctx(vid)
            got, issues = sl.write_scene(llm, vb, src)
            return vid, v, p, got, issues

        def save():
            path.write_text(json.dumps(doc, ensure_ascii=False, indent=1), encoding="utf-8")
            meta_path.write_text(json.dumps(meta, ensure_ascii=False, indent=1), encoding="utf-8")

        done = 0
        with ThreadPoolExecutor(a.workers) as ex:
            for k in range(0, len(todo), 10):
                if time.perf_counter() - t0 > a.budget_s:
                    break
                for vid, v, p, got, issues in ex.map(one, todo[k:k + 10]):
                    notes = [str(i) for i in issues if i.severity == "block"]
                    if got:
                        doc["scenes"][vid] = {"before": got["before"], "moment": got["moment"], "reply": got.get("reply"), "after": got.get("after"),
                                              "reading": got.get("reading"), "source_range": sl.source_range(v, p), "reviewed": False}
                        meta["verses"][vid] = {"spoken": got.get("spoken"), "dropped_parts": notes}
                        meta["failed"].pop(vid, None)
                        done += 1
                    else:
                        meta["failed"][vid] = notes
                save()                                           # progress to disk every 10 verses
                print(f"scenes: {len(doc['scenes'])} stored, {len(meta['failed'])} failed, {int(time.perf_counter() - t0)}s", flush=True)
        return

    if a.what == "core":
        store = sl.StaticStore(out / "static_draft.json")
        todo = [i for i in ids if not (store.data["verses"].get(i) or {}).get("meaning")]

        def one_core(vid):
            v, p, vb, _ = ctx(vid)
            stances = vb.stance_fit or ["struggle", "aspiration", "seeking"]
            got, issues = sl.write_core(llm, vb, stances)
            return vid, got, issues

        with ThreadPoolExecutor(a.workers) as ex:
            for k in range(0, len(todo), 10):
                if time.perf_counter() - t0 > a.budget_s:
                    break
                for vid, got, issues in ex.map(one_core, todo[k:k + 10]):
                    if got:
                        store.data["verses"][vid] = {"meaning": got.get("meaning"), "audio": got.get("audio") or {}, "by_stance": got.get("by_stance") or {},
                                                     "reviewed": False, "model": settings.sarvam_model,
                                                     "issues": [str(i) for i in issues if i.severity == "block"]}
                store.save()
                print(f"core: {sum(1 for x in store.data['verses'].values() if x.get('meaning'))} with meaning, {int(time.perf_counter() - t0)}s", flush=True)


if __name__ == "__main__":
    main()
