"""
reconcile_mixpanel.py — check that Mixpanel and Supabase tell the same story about onboarding.

The app and the web make two ids and send them to both sides (wisdom/app/services/OnboardingTrace.ts,
frontend/src/lib/onboarding/trace.ts):
    onboarding_id   Mixpanel super property on every event  ↔  plan_runs.onboarding_id, raw_notes.onboarding_id
    request_id      on Verses Generated / Plan Built        ↔  plan_runs.request_id, raw_notes.request_id

Mixpanel event → plan_runs endpoint:
    Verses Generated.request_id          → hook
    Plan Built.request_id                → plan      (app and web)
    Plan Built.preview_request_id        → preview   (app only)

For each pair it reports: matched, in Supabase only (the backend answered but the client never reported it: the person
left, the app was killed, or an older build), in Mixpanel only (the backend's write failed, or the call never reached
it), and field disagreements (hook verse, reading source, ok vs status, feeling, age). Then per onboarding: onboardings
that reached the note step in Mixpanel with no backend call, and backend onboardings Mixpanel never saw.

    python scripts/reconcile_mixpanel.py --from 2026-11-14 --to 2026-11-20 [--dev] [--csv out.csv]

Env (backend/.env is read): SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, MIXPANEL_SA_USERNAME, MIXPANEL_SA_SECRET,
MIXPANEL_APP_PROJECT_ID (default 3767752), MIXPANEL_WEB_PROJECT_ID (default 4010994), MIXPANEL_RESIDENCY (us|eu).
Rows from before 13 Nov 2026 carry no ids and are skipped.
"""
from __future__ import annotations

import argparse
import csv
import json
import os
import sys
from collections import Counter, defaultdict
from pathlib import Path
from typing import Iterable, Optional

EVENT_ENDPOINTS = {"Verses Generated": [("request_id", "hook")], "Plan Built": [("request_id", "plan"), ("preview_request_id", "preview")]}
STEP_EVENT = "Onboarding Step Completed"


def _load_env() -> None:
    p = Path(__file__).resolve().parent.parent / ".env"
    if not p.exists():
        return
    for line in p.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, _, v = line.partition("=")
            os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


# ── fetch ─────────────────────────────────────────────────────────────────────
def mixpanel_events(project_id: str, platform: str, from_date: str, to_date: str, dev: bool) -> list[dict]:
    import requests
    names = [*EVENT_ENDPOINTS, STEP_EVENT]
    if dev:
        names = [f"dev_{n}" for n in names]
    base = "https://data-eu.mixpanel.com" if os.environ.get("MIXPANEL_RESIDENCY", "us").lower() == "eu" else "https://data.mixpanel.com"
    r = requests.get(f"{base}/api/2.0/export", auth=(os.environ["MIXPANEL_SA_USERNAME"], os.environ["MIXPANEL_SA_SECRET"]),
                     params={"project_id": project_id, "from_date": from_date, "to_date": to_date, "event": json.dumps(names)},
                     timeout=300)
    r.raise_for_status()
    out = []
    for line in r.text.splitlines():
        if not line.strip():
            continue
        e = json.loads(line)
        e["event"] = e["event"].removeprefix("dev_")
        e["properties"]["_platform"] = platform
        out.append(e)
    return out


def supabase_runs(from_date: str, to_date: str, dev: bool) -> list[dict]:
    import httpx
    url = os.environ["SUPABASE_URL"].rstrip("/") + "/rest/v1/plan_runs"
    k = os.environ["SUPABASE_SERVICE_ROLE_KEY"]
    rows, offset = [], 0
    cols = ("created_at,request_id,onboarding_id,distinct_id,platform,endpoint,status,http_status,feeling,emotion,age,"
            "stages,ai_consent,has_note,reading_source,hook_id,days_count,dev")
    while True:
        r = httpx.get(url, headers={"apikey": k, "Authorization": f"Bearer {k}", "Range": f"{offset}-{offset + 999}"},
                      params=[("select", cols), ("created_at", f"gte.{from_date}T00:00:00Z"),
                              ("created_at", f"lte.{to_date}T23:59:59Z"), ("dev", f"eq.{str(dev).lower()}"),
                              ("order", "created_at.asc")], timeout=60)
        r.raise_for_status()
        batch = r.json()
        rows += batch
        if len(batch) < 1000:
            return rows
        offset += 1000


# ── reconcile (pure, tested in tests/test_reconcile.py) ───────────────────────
def _norm_platform(p: Optional[str]) -> str:
    return "web" if p == "web" else "app"


def reconcile(events: Iterable[dict], runs: Iterable[dict]) -> dict:
    runs = [r for r in runs if r.get("request_id")]
    by_rid = {(r["request_id"], r["endpoint"]): r for r in runs}
    seen: set = set()
    matched, mp_only, mismatches = Counter(), [], []
    mp_onboardings: dict[str, dict] = {}
    for e in events:
        p = e.get("properties") or {}
        ob = p.get("onboarding_id")
        plat = p.get("_platform") or "app"
        if e["event"] == STEP_EVENT and ob:
            o = mp_onboardings.setdefault(ob, {"platform": plat, "steps": set(), "age": None, "feeling": None})
            o["steps"].add(p.get("step"))
            if p.get("step") == "age" or p.get("age_range"):
                o["age"] = p.get("age_range") or o["age"]
            if p.get("step") == "feeling" or (p.get("feeling") and p.get("emotion")):
                o["feeling"] = p.get("feeling") or o["feeling"]
            continue
        for prop, endpoint in EVENT_ENDPOINTS.get(e["event"], []):
            rid = p.get(prop)
            if not rid:
                continue
            key = (rid, endpoint)
            r = by_rid.get(key)
            if r is None:
                mp_only.append({"request_id": rid, "endpoint": endpoint, "platform": plat, "onboarding_id": ob,
                                "mp_ok": p.get("ok"), "issue": "in_mixpanel_only"})
                continue
            seen.add(key)
            matched[(endpoint, plat)] += 1
            diffs = []
            if endpoint == "hook":
                if p.get("hook_id") and r.get("hook_id") and p["hook_id"] != r["hook_id"]:
                    diffs.append(f"hook_id mp={p['hook_id']} sb={r['hook_id']}")
                rs = p.get("reading")
                if rs and r.get("reading_source") and rs != r["reading_source"] and not (rs == "plan" and r["reading_source"]):
                    diffs.append(f"reading mp={rs} sb={r['reading_source']}")
            if endpoint in ("hook", "plan") and p.get("ok") is not None:
                sb_ok = r.get("status") == "ok" and (r.get("hook_id") if endpoint == "hook" else (r.get("days_count") or 0) > 0)
                if bool(p["ok"]) != bool(sb_ok):
                    diffs.append(f"ok mp={p['ok']} sb={r.get('status')}")
            if ob and r.get("onboarding_id") and ob != r["onboarding_id"]:
                diffs.append(f"onboarding_id mp={ob} sb={r['onboarding_id']}")
            if diffs:
                mismatches.append({"request_id": rid, "endpoint": endpoint, "platform": plat, "onboarding_id": ob,
                                   "issue": "; ".join(diffs)})
    sb_only = [{"request_id": r["request_id"], "endpoint": r["endpoint"], "platform": _norm_platform(r.get("platform")),
                "onboarding_id": r.get("onboarding_id"), "sb_status": r.get("status"), "issue": "in_supabase_only"}
               for r in runs if r["endpoint"] in ("hook", "plan", "preview") and (r["request_id"], r["endpoint"]) not in seen]

    # Per onboarding: answers agree, and both sides know it.
    sb_onboardings: dict[str, dict] = defaultdict(dict)
    for r in sorted(runs, key=lambda x: x.get("created_at") or ""):
        if r.get("onboarding_id") and r["endpoint"] == "hook" and not sb_onboardings.get(r["onboarding_id"]):
            sb_onboardings[r["onboarding_id"]] = r
    ob_issues = []
    for ob, o in mp_onboardings.items():
        r = sb_onboardings.get(ob)
        if r is None:
            if "note" in o["steps"]:
                ob_issues.append({"onboarding_id": ob, "platform": o["platform"], "issue": "note_step_but_no_backend_call"})
            continue
        if o["age"] and r.get("age") and o["age"] != r["age"]:
            ob_issues.append({"onboarding_id": ob, "platform": o["platform"], "issue": f"age mp={o['age']} sb={r['age']}"})
        if o["feeling"] and r.get("feeling") and o["feeling"] != r["feeling"]:
            ob_issues.append({"onboarding_id": ob, "platform": o["platform"], "issue": f"feeling mp={o['feeling']} sb={r['feeling']}"})
    for ob, r in sb_onboardings.items():
        if ob not in mp_onboardings:
            ob_issues.append({"onboarding_id": ob, "platform": _norm_platform(r.get("platform")), "issue": "backend_onboarding_not_in_mixpanel"})

    return {"matched": matched, "mixpanel_only": mp_only, "supabase_only": sb_only, "mismatches": mismatches,
            "onboarding_issues": ob_issues, "onboardings": {"mixpanel": len(mp_onboardings), "supabase": len(sb_onboardings)}}


def summary(rep: dict) -> str:
    lines = ["Matched calls (endpoint, platform):"]
    for (ep, plat), n in sorted(rep["matched"].items()):
        lines.append(f"  {ep:8s} {plat:4s} {n}")
    for k in ("mixpanel_only", "supabase_only", "mismatches", "onboarding_issues"):
        c = Counter((x.get("endpoint") or "-", x.get("platform"), x["issue"].split(" ")[0]) for x in rep[k])
        lines.append(f"{k}: {len(rep[k])}")
        for (ep, plat, issue), n in c.most_common(12):
            lines.append(f"  {ep:8s} {plat:4s} {issue:40s} {n}")
    lines.append(f"Onboardings seen: mixpanel={rep['onboardings']['mixpanel']} supabase={rep['onboardings']['supabase']}")
    return "\n".join(lines)


def main(argv=None) -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--from", dest="from_date", required=True)
    ap.add_argument("--to", dest="to_date", required=True)
    ap.add_argument("--dev", action="store_true", help="compare dev_ events with dev rows instead of production")
    ap.add_argument("--csv", help="write every unmatched or disagreeing row here")
    a = ap.parse_args(argv)
    _load_env()
    events = []
    for plat, env, default in (("app", "MIXPANEL_APP_PROJECT_ID", "3767752"), ("web", "MIXPANEL_WEB_PROJECT_ID", "4010994")):
        events += mixpanel_events(os.environ.get(env, default), plat, a.from_date, a.to_date, a.dev)
    rep = reconcile(events, supabase_runs(a.from_date, a.to_date, a.dev))
    print(summary(rep))
    if a.csv:
        rows = rep["mixpanel_only"] + rep["supabase_only"] + rep["mismatches"] + rep["onboarding_issues"]
        keys = sorted({k for r in rows for k in r})
        with open(a.csv, "w", newline="") as f:
            w = csv.DictWriter(f, fieldnames=keys)
            w.writeheader()
            w.writerows(rows)
        print(f"wrote {len(rows)} rows to {a.csv}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
