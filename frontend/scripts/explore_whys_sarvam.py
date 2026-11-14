#!/usr/bin/env python3
"""
Sarvam pass for the /explore pages (Ankur: Sarvam writes all user-facing text a model writes).

Takes src/content/explore/whys_needed.json (written by build-explore-data.py: only the lines the pages show,
deduped) and rewrites each one with Sarvam into short plain English that keeps the meaning and adds nothing:
  why       a graph edge's `why` (verse -> state): one sentence
  antidote  why a healing state or practice answers an afflictive one: one sentence
  gloss     what a state is: one or two sentences
  chain     a causal sequence a text states: one or two sentences, steps in order
  concept   a Sanskrit term in a chain: a gloss of one to five words
Results are cached in src/content/explore/whys_sarvam.json ({key: {kind, in, out, ok, at}}); cached keys are
skipped, so re-runs only send what is new. Outputs with dashes, exclamation marks or contrast patterns
("not X but Y", "isn't X. It's Y") are regenerated once on their own, then marked ok=false (the page hides them).
At most 4 calls in parallel; a 429 waits and retries once.

usage: python3 scripts/explore_whys_sarvam.py [--limit N] [--batch 8]
"""
import argparse
import json
import os
import re
import sys
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

HERE = os.path.dirname(os.path.abspath(__file__))
FRONT = os.path.dirname(HERE)
REPO = os.path.dirname(FRONT)
BACKEND = os.path.join(REPO, "backend")
OUT = os.path.join(FRONT, "src", "content", "explore")
NEEDED = os.path.join(OUT, "whys_needed.json")
CACHE = os.path.join(OUT, "whys_sarvam.json")

sys.path.insert(0, BACKEND)
for l in open(os.path.join(BACKEND, ".env"), encoding="utf-8"):
    if l.startswith("SARVAM_API_KEY="):
        os.environ["SARVAM_API_KEY"] = l.split("=", 1)[1].strip().strip('"')
from ai import consent  # noqa: E402
from ai.sarvam import init_sarvam  # noqa: E402

consent.set_allowed(True)  # offline content generation, not a user's data
sv = init_sarvam(os.environ["SARVAM_API_KEY"])

RULES = (
    "Write calm, plain modern English for a scripture reading site. Keep the meaning of the input exactly; add no fact, "
    "name, verse number or claim that is not in the input; do not soften or strengthen it. No em dashes, no en dashes, "
    "no hyphens used as dashes, no exclamation marks, no quotation marks around the whole text, no slang. Never use "
    "contrast patterns such as 'not X but Y', 'not just X', 'instead of', 'isn't X. It's Y' or 'rather than'. Do not "
    "address the reader as 'you' unless the input does. Keep Sanskrit words only if the input has them. Use only what the "
    "input says: the context fields are there to help you read it, never to add to it."
)
TASK = {
    "why": "Each item is an editor's note on how one verse relates to an inner state. Rewrite each note as ONE short "
           "caption of at most 20 words that sits under the verse. The verse is the implied subject, so start with a verb "
           "('Shows ...', 'Names ...', 'Gives ...') or with the person in the scene. Example: 'grief is shown "
           "sitting with the elder' becomes 'Shows grief sitting with the elder.' Rewrite each item from its own input "
           "only. Do not name the role or the state "
           "unless the note does, and do not add a purpose ('to cultivate ...').",
    "antidote": "Each item is a short note (often a paraphrase of a scripture's own words) on what the texts set against "
                "an afflictive state. Rewrite each as ONE short sentence of at most 24 words that stays as close to the input "
                "as plain English allows. Do not name the afflictive state or the antidote unless the input does, and do not "
                "add what it counters or why.",
    "gloss": "Each item defines an inner state named in the Hindu scriptures. Rewrite it as one or two short sentences, "
             "at most 40 words in all. Keep any verse reference it gives.",
    "chain": "Each item is a causal sequence a scripture states outright. Rewrite it as one or two plain sentences, at "
             "most 70 words, keeping every step in the same order.",
    "concept": "Each item is a Sanskrit term used as one step in a causal sequence (the context gives the sequence). Give a "
               "plain English gloss of one to five words, lowercase, no full stop, no explanation.",
}
MAXW = {"why": 26, "antidote": 28, "gloss": 60, "chain": 80, "concept": 6}
BAD = re.compile(
    r"[–—!]| - | -- |\bnot (just|only|merely)\b|\bnot\b[^.;]{0,60}\bbut\b|\bisn['’]t\b[^.]{0,80}[.;,]\s*(it|this)['’]s\b|\brather than\b|\binstead of\b|\bto cultivate\b",
    re.I,
)

lock = threading.Lock()


def load(p, default):
    return json.load(open(p, encoding="utf-8")) if os.path.exists(p) else default


def save(cache):
    tmp = CACHE + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(cache, f, ensure_ascii=False, indent=1, sort_keys=True)
        f.write("\n")
    os.replace(tmp, CACHE)


STOP = set("""a an the and or of to in on at for from with by as is are was were be been being it its this that these those
who whom which what when where how his her their them they he she one ones own not no nor so than then there here into
onto upon over under about after before through his him us our we you your i me my shows names gives lets takes makes
keeps tells says asks puts sets holds brings sees finds shown named given verse line text""".split())


def words(t):
    return [w for w in re.findall(r"[a-zāīūṛṃḥśṣṭḍṇñṅ']+", t.lower()) if len(w) > 2 and w not in STOP]


def grounded(src, out, need):
    """Share of the output's content words that come from the input (4-letter stems), so nothing is added."""
    o = words(out)
    if not o:
        return True
    stems = {w[:4] for w in words(src)}
    hit = sum(1 for w in o if w[:4] in stems)
    return hit / len(o) >= need


GROUND = {"why": 0.6, "antidote": 0.5, "gloss": 0.45, "chain": 0.5, "concept": 0.0}


def tidy(kind, text):
    if not text:
        return text
    text = re.sub(r"\s+", " ", text).strip()
    if kind != "concept" and text[-1] not in ".?'\u2019\"":
        text += "."
    return text[0].upper() + text[1:] if kind != "concept" else text


def valid(kind, text, src="", ctx=None):
    if not text or BAD.search(text):
        return False
    st = ((ctx or {}).get("state") or "").lower()
    if kind in ("why", "antidote") and st and st in text.lower() and st not in src.lower():
        return False
    if src and not grounded(src, text, GROUND[kind]):
        return False
    if len(text.split()) > MAXW[kind]:
        return False
    if kind == "concept" and text.endswith("."):
        return False
    return True


def call(kind, items):
    system = f"{TASK[kind]}\n{RULES}\nReturn JSON: {{\"items\": [{{\"id\": \"...\", \"text\": \"...\"}}]}} with one entry per input id."
    user = json.dumps({"items": [{"id": k, "input": it["text"], "context": it["ctx"]} for k, it in items]}, ensure_ascii=False)
    for attempt in range(2):
        try:
            out = sv._call(system, user, temperature=0.3, max_tokens=300 + 140 * len(items), expect_json=True, json_mode=True, retries=0)
            got = {}
            for x in (out or {}).get("items", []):
                if isinstance(x, dict) and x.get("id") and isinstance(x.get("text"), str):
                    got[x["id"]] = x["text"].strip().strip('"').strip()
            return got
        except Exception as e:  # noqa: BLE001
            msg = str(e)
            if "429" in msg and attempt == 0:
                time.sleep(6)
                continue
            print(f"  {kind} batch error: {type(e).__name__} {msg[:100]}", flush=True)
            return {}
    return {}


def run(kind, items, cache, stats):
    got = call(kind, items)
    redo = []
    with lock:
        for k, it in items:
            t = tidy(kind, got.get(k))
            if valid(kind, t, it["text"], it["ctx"]):
                cache[k] = {"kind": kind, "in": it["text"], "out": t, "ok": True, "at": time.strftime("%Y-%m-%d")}
                stats["ok"] += 1
            else:
                redo.append((k, it))
    for k, it in redo:  # regenerate once, alone
        t = tidy(kind, call(kind, [(k, it)]).get(k))
        with lock:
            ok = valid(kind, t, it["text"], it["ctx"])
            cache[k] = {"kind": kind, "in": it["text"], "out": t if ok else None, "ok": ok, "at": time.strftime("%Y-%m-%d")}
            if not ok:
                cache[k]["rejected"] = t
            stats["ok" if ok else "bad"] += 1
    with lock:
        save(cache)
        stats["done"] += len(items)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int, default=0)
    ap.add_argument("--batch", type=int, default=8)
    ap.add_argument("--workers", type=int, default=4)
    a = ap.parse_args()
    needed = load(NEEDED, {})
    cache = load(CACHE, {})
    todo = [(k, v) for k, v in sorted(needed.items()) if k not in cache]
    cached = len(needed) - len(todo)
    if a.limit:
        todo = todo[: a.limit]
    by_kind = {}
    for k, v in todo:
        by_kind.setdefault(v["kind"], []).append((k, v))
    batches = []
    for kind, items in sorted(by_kind.items()):
        size = 1 if kind in ("gloss", "chain") else a.batch
        for i in range(0, len(items), size):
            batches.append((kind, items[i: i + size]))
    stats = {"ok": 0, "bad": 0, "done": 0}
    total = len(todo)
    print(f"needed {len(needed)}  cached {cached}  to do {total} in {len(batches)} calls", flush=True)
    t0 = time.time()
    with ThreadPoolExecutor(max_workers=min(4, a.workers)) as ex:
        futs = [ex.submit(run, kind, items, cache, stats) for kind, items in batches]
        for i, f in enumerate(as_completed(futs), 1):
            f.result()
            if i % 10 == 0 or i == len(futs):
                print(f"  {i}/{len(futs)} calls  ok {stats['ok']}  rejected {stats['bad']}  {time.time() - t0:.0f}s", flush=True)
    print(f"done: ok {stats['ok']}  rejected {stats['bad']}  ({time.time() - t0:.0f}s)")


if __name__ == "__main__":
    main()
