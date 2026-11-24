"""
Builds backend/v2/data/verse_context.json: what the verse research says about each verse, compact, for the writer's
prompts (plans.describe) and for building plans (build_plans.py).

    python v2/tools/build_context.py

Reads data/research/out/*.json (schema in data/research/RESEARCH_BRIEF.md). Re-run it whenever a research group lands
(corpus_viv_1 is still being researched): verses with no research are simply absent, and every prompt works without them.
All text in the research is already paraphrased; nothing here adds quotes.
"""
import glob
import json
import os
import re

V2 = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RESEARCH = os.path.join(V2, "data", "research")
OUT = os.path.join(V2, "data", "verse_context.json")

# verified_ref says our reference is wrong (not just that editions number it differently)
WRONG_REF = re.compile(r"DATA ERROR|NOT \d|matches neither|is actually|off by|one verse (early|late)|points to a different|"
                       r"not \d+(\.\d+)*[,;:]|ours? (id|ref|number)\S* (is|are) (wrong|not)", re.I)
# the verse (or the speech around it) tells a mourner not to grieve
NO_GRIEF = re.compile(r"(don.t|do not|not to|stop|never|shouldn.t|should not|why) (grieve|griev|mourn|weep|lament|cry|shed tears)|"
                      r"no (room|cause|reason|need) (for|to) grie|grounds for grief|(rebuk|dismiss)\w* (of )?(grief|mourn|tears)|grief is (pointless|futile|useless)|"
                      r"futil\w+ of (grief|mourning)", re.I)
NOT_NAMES = {"Swami", "Context", "Commentary", "Surrounding", "Edition", "Hindi", "Translation", "Notes", "Introduction"}


def words(s: str, n: int) -> str:
    w = (s or "").split()
    return " ".join(w[:n]) + ("..." if len(w) > n else "")


def gists(r: dict) -> list:
    """Commentary gists, labelled. A commentator the cautions warn about (e.g. Ramanuja on 12.13 for someone abused) is
    left out, so the writer can never pass that view on."""
    warned = " ".join(r["cautions"] + r["not_for"])
    out = []
    for c in r["commentaries"]:
        who = c["who"]
        if "itihasa" in f"{who} {c.get('source', '')}".lower() and "AI" not in who:
            who += " (AI synthesis on itihasa.io, not peer-reviewed)"
        names = set(re.findall(r"\b[A-Z][a-z]{3,}", re.split(r"[(,]", who)[0])) - NOT_NAMES
        if any(re.search(rf"\b{n}", warned) for n in names):
            continue
        out.append({"who": who, "gist": c["gist"]})
    return out[:4]


def entry(r: dict) -> dict:
    flags = {"attribution_ok": r["attribution_ok"], "translation_ok": r["translation_ok"],
             "corrected_ref": r["verified_ref"] if WRONG_REF.search(r["verified_ref"]) else None}
    if not r["attribution_ok"]:
        flags["attribution_note"] = words(r["attribution_note"], 45)
    if not r["translation_ok"]:
        flags["translation_note"] = words(r["translation_note"], 45)
    if NO_GRIEF.search(" ".join(r["cautions"] + r["misreadings"] + r["not_for"] + [r["core_teaching"], r["context"]])):
        flags["tells_not_to_grieve"] = True
    return {"context": r["context"], "core_teaching": r["core_teaching"], "commentaries": gists(r),
            "practical_reading": r["practical_reading"], "misreadings": r["misreadings"], "cautions": r["cautions"],
            "not_for": r["not_for"], "speaks_to": r["speaks_to"], "data_flags": flags}


def main():
    research = {x["id"]: x for f in sorted(glob.glob(os.path.join(RESEARCH, "out", "*.json"))) for x in json.load(open(f))}
    ctx = {vid: entry(r) for vid, r in sorted(research.items())}
    json.dump({"version": 1, "verses": ctx}, open(OUT, "w"), ensure_ascii=False, indent=1)

    batches = json.load(open(os.path.join(RESEARCH, "corpus_batches.json")))
    corpus = {x["id"] for b in batches.values() for x in b} | {x["id"] for x in json.load(open(os.path.join(RESEARCH, "verses_to_research.json")))}
    plans = json.load(open(os.path.join(V2, "data", "plans.json")))["plans"]
    in_plans = {d["verse"] for p in plans for d in p["days"] if d.get("verse")} | {v for p in plans for v in p.get("day1_alts", [])}
    waiting = sorted(g for g, b in batches.items() if any(x["id"] not in ctx for x in b))
    print(f"{len(ctx)} verses -> {OUT}")
    print(f"corpus: {len(corpus & set(ctx))}/{len(corpus)}; plan verses: {len(in_plans & set(ctx))}/{len(in_plans)}"
          f" (missing: {sorted(in_plans - set(ctx)) or 'none'}); groups not researched yet: {waiting or 'none'}")
    print(f"flags: {sum(not c['data_flags']['attribution_ok'] for c in ctx.values())} attribution, "
          f"{sum(not c['data_flags']['translation_ok'] for c in ctx.values())} translation, "
          f"{sum(bool(c['data_flags']['corrected_ref']) for c in ctx.values())} wrong ref, "
          f"{sum('tells_not_to_grieve' in c['data_flags'] for c in ctx.values())} tell a mourner not to grieve, "
          f"{sum(not c['commentaries'] for c in ctx.values())} without a usable commentary")


if __name__ == "__main__":
    main()
