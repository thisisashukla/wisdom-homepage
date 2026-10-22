#!/usr/bin/env python3
"""metrics.py — mechanical quality metrics per run, from evals/out/<run>/*.json. No LLM."""
import json, re, sys, statistics
from pathlib import Path
from collections import Counter
P = {p["id"]: p for p in json.loads(Path("evals/personas.json").read_text())}
TEMPL = set()
try:
    sys.path.insert(0, "."); from ai.mechanisms import MECHANISMS, INSIGHTS
    for m in MECHANISMS.values(): TEMPL |= {m[k] for k in ("diagnose","act","steady","self","self_act")}
    TEMPL |= set(INSIGHTS.values())
except Exception: pass
def run(name):
    files = sorted(Path(f"evals/out/{name}").glob("*.json")); files = [f for f in files if not f.name.startswith("_")]
    n = len(files); fy_t = fy_w = mn_t = mn_w = 0; d1_t = 0; d1_tmpl = 0; stance_ok = stance_n = 0
    lat = []; day1 = []; nongita = 0; mirror_label = 0; insight_tmpl = 0; gender_ok = gender_n = 0; missing = 0; gendered = 0
    for f in files:
        d = json.loads(f.read_text()); p = d["persona"]; plan = d["plan"]; u = plan["understanding"]
        lat.append(plan["timings_ms"]["total"])
        days = plan["days"]; v0 = days[0].get("verse") or days[0].get("story"); day1.append(v0.get("ref") or v0.get("title"))
        if days[0].get("verse") and v0.get("family") != "bg": nongita += 1
        for k, dd in enumerate(days):
            c = dd.get("verse") or dd.get("story")
            if dd.get("verse"):
                fy_t += 1; mn_t += 1
                fy = c.get("for_you"); 
                if fy and fy not in TEMPL: fy_w += 1
                elif k == 0: d1_tmpl += 1
                if c.get("meaning"): mn_w += 1
        d1_t += 1
        if p.get("expect_stance"):
            stance_n += 1; stance_ok += (u.get("stance","struggle") == p["expect_stance"])
        if u.get("mirror") and (u["mirror"] in TEMPL or not re.search(r"\byou", u["mirror"], re.I)): mirror_label += 1
        if u.get("insight") in TEMPL or any(f.startswith("insight:template") for f in u.get("flags", [])): insight_tmpl += 1
        fl = ",".join(u.get("flags", []))
        missing += sum(int(x) for x in re.findall(r"missing=(\d+)", fl)); gendered += sum(int(x) for x in re.findall(r"gendered=(\d+)", fl))
        g = u.get("gender")
        if g is not None: gender_n += 1; gender_ok += (g == p["gender"])
    uniq = len(set(day1))
    return {"run": name, "n": n, "for_you_written": f"{fy_w}/{fy_t} ({100*fy_w/max(1,fy_t):.0f}%)", "day1_template": f"{d1_tmpl}/{d1_t}",
            "meaning_written": f"{mn_w}/{mn_t} ({100*mn_w/max(1,mn_t):.0f}%)", "stance_correct": f"{stance_ok}/{stance_n}",
            "mirror_fallback": f"{mirror_label}/{n}", "insight_template": f"{insight_tmpl}/{n}", "day1_unique": f"{uniq}/{n}",
            "day1_non_gita": f"{nongita}/{n}", "gender_set_correct": f"{gender_ok}/{gender_n}", "chunk_misses": missing, "gendered_drops": gendered,
            "latency_ms_median": int(statistics.median(lat)) if lat else 0}
rows = [run(r) for r in sys.argv[1:]]
keys = list(rows[0].keys())
w = max(len(k) for k in keys)
for k in keys:
    print(k.ljust(w), " | ".join(str(r[k]).rjust(16) for r in rows))
