"""
build_scenes.py — write "The scene" once per verse, for a person to check, into data/scenes.json.

Each scene is written by the writer model from the library's own story data only (the verse's setting, its prasang,
the prasangs either side of it, its translation and point). No invented dialogue or scenes: every scene must pass
the fidelity check (ai/voice.py) and is stored with "reviewed": false. A scene already marked reviewed is never
rewritten. The app shows a library-assembled scene (ai/scene.py) for any verse without one.

Run from backend/ (.env with the writer model's key):
    python scripts/build_scenes.py --ids bg.2.47 bg.2.14            # these verses
    python scripts/build_scenes.py --ids-file top_verses.txt        # one id per line (e.g. the most-planned 150)
    python scripts/build_scenes.py --tier core --limit 20           # the core tier, first 20 without a scene
    python scripts/build_scenes.py --ids bg.2.47 --dry-run          # print, don't save
"""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from common.config import settings                        # noqa: E402
from ai.scene import SCENES_PATH, source_range             # noqa: E402
from ai.voice import FIDELITY, check_fidelity              # noqa: E402

SYSTEM = """\
You write "The scene" for one verse: the moment it was said, told plainly, for someone who has never read the text.

{fidelity}

Use ONLY the source below. Never invent dialogue, gestures, weather, feelings or events. If the source has no counter-view, "reply" is null. If it does not say what happened next, "after" is null.
Parts (plain modern English, short sentences, no dashes, no exclamation marks):
- "before" (25 to 60 words): why this moment exists, the story so far.
- "moment" (20 to 50 words): who says it, to whom, at what point, and what is at stake. Do not quote the verse; the app shows it.
- "reply" (15 to 45 words or null): the counter-view in the text, if the source gives one.
- "after" (15 to 45 words or null): what actually happened next, if the source gives it.
- "reading" (15 to 35 words): what the verse proposes, in today's words, exactly as its point says. The app labels this "A reading for today".
Return ONLY JSON: {{"before": "...", "moment": "...", "reply": null, "after": null, "reading": "..."}}"""

LIMITS = {"before": (20, 70), "moment": (15, 60), "reply": (10, 55), "after": (10, 55), "reading": (10, 45)}


def source(v: dict, p: dict, prev: dict | None, nxt: dict | None) -> str:
    rows = [f"reference: {v.get('display_ref') or v['id']}",
            f"said by: {v.get('speaker') or 'unknown'}" + (f" to {v['listener']}" if v.get("listener") else ""),
            f"setting: {v.get('setting') or ''}", f"card line: {v.get('line') or ''}",
            f"translation: {v.get('translation') or ''}", f"its point: {v.get('reflection') or p.get('lesson') or ''}",
            f"what it does NOT mean: {v.get('misuse') or ''}",
            f"the story around it: {p.get('title_en') or ''}. {p.get('summary') or ''}"]
    if prev:
        rows.append(f"the story just before: {prev.get('title_en') or ''}. {prev.get('summary') or ''}")
    if nxt:
        rows.append(f"the story just after: {nxt.get('title_en') or ''}. {nxt.get('summary') or ''}")
    return "\n".join(r for r in rows if not r.endswith(": ") and not r.endswith(": unknown"))


def check(scene: dict, item: dict) -> tuple[dict | None, str]:
    out = {}
    for k, (lo, hi) in LIMITS.items():
        t = scene.get(k)
        if t in (None, "", "null"):
            if k in ("reply", "after"):
                out[k] = None
                continue
            return None, f"missing:{k}"
        if not isinstance(t, str):
            return None, f"type:{k}"
        n = len(t.split())
        if not lo <= n <= hi:
            return None, f"length:{k}={n}"
        ok, why = check_fidelity(t, item)
        if not ok:
            return None, f"{why}:{k}"
        out[k] = " ".join(t.split())
    return out, ""


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--ids", nargs="*", default=[])
    ap.add_argument("--ids-file")
    ap.add_argument("--tier")
    ap.add_argument("--limit", type=int, default=20)
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    lib = json.loads(Path(settings.wisdom_library_path).read_text(encoding="utf-8"))
    verses = {v["id"]: v for v in lib["verses"]}
    plist = lib["prasangs"]
    pidx = {p["id"]: k for k, p in enumerate(plist)}
    have = json.loads(SCENES_PATH.read_text(encoding="utf-8")) if SCENES_PATH.exists() else {"version": 1, "scenes": {}}
    scenes = have.setdefault("scenes", {})

    ids = list(a.ids)
    if a.ids_file:
        ids += [x.strip() for x in Path(a.ids_file).read_text().splitlines() if x.strip()]
    if a.tier:
        ids += [v["id"] for v in lib["verses"] if v.get("tier") == a.tier and v["id"] not in scenes]
    ids = [i for i in dict.fromkeys(ids) if i in verses and not (scenes.get(i) or {}).get("reviewed")][:a.limit]
    if not ids:
        print("nothing to write")
        return

    from ai.llm_providers import make_client
    from ai.sarvam import get_sarvam, init_sarvam
    sarvam = None
    if settings.sarvam_api_key:
        init_sarvam(api_key=settings.sarvam_api_key, model=settings.sarvam_model)
        sarvam = get_sarvam()
    llm = make_client(settings.llm_writer, sarvam=sarvam, openai_key=settings.openai_api_key,
                      openai_base_url=settings.openai_base_url, reasoning=settings.llm_reasoning)
    if llm is None:
        sys.exit("no writer model configured (.env)")

    ok = bad = 0
    for vid in ids:
        v = verses[vid]
        k = pidx.get(v.get("prasang_id") or "")
        if k is None:
            print(f"skip {vid}: no story in the library")
            continue
        p = plist[k]
        prev = plist[k - 1] if k > 0 and plist[k - 1].get("text") == p.get("text") else None
        nxt = plist[k + 1] if k + 1 < len(plist) and plist[k + 1].get("text") == p.get("text") else None
        src = source(v, p, prev, nxt)
        item = {"id": vid, "kind": "verse", "source": src}
        msgs = [{"role": "system", "content": SYSTEM.format(fidelity=FIDELITY)}, {"role": "user", "content": "SOURCE\n" + src}]
        got, why = None, ""
        for _ in range(2):
            try:
                raw = llm.chat_json(msgs, temperature=0.3, max_tokens=900, timeout_s=40)
            except Exception as e:            # noqa: BLE001
                why = f"{type(e).__name__}"
                continue
            got, why = check(raw if isinstance(raw, dict) else {}, item)
            if got:
                break
        if not got:
            bad += 1
            print(f"FAIL {vid}: {why}")
            continue
        ok += 1
        scenes[vid] = {**got, "source_range": source_range(v, p), "reviewed": False}
        print(f"ok   {vid}: {scenes[vid]['source_range']}")
        if a.dry_run:
            print(json.dumps(scenes[vid], ensure_ascii=False, indent=2))
    if not a.dry_run and ok:
        SCENES_PATH.write_text(json.dumps(have, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{ok} written, {bad} failed{' (dry run)' if a.dry_run else ''} -> {SCENES_PATH}")


if __name__ == "__main__":
    main()
