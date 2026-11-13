"""
server/plan_v3.py: the /recommend/hook, /preview and /plan answers when PLAN_ENGINE=v3 (ai/plan_v3.py).

server/plan.py hands over here only when the flag is set; with it unset nothing in this module runs. The response
models are the app's own (common/models.py); v3 adds optional fields that are absent unless set:
understanding.plan_v3 (send it back), hook.first_line / first_line_source, and plan_v3 on each day (graph path,
whys, guard verse, writer note). No hook cache: the v3 Day 1 costs one small Sarvam call, and a cached reading from
the old engine must never be served as a v3 one.
"""
from __future__ import annotations

import time
from typing import Optional

from ai import plan_v3 as V
from ai.planner import parse_shape
from common.models import HookResponse, PlanResponse, PreviewResponse


def _p():
    from server import plan as P          # late: server.plan imports this module lazily too
    return P


def _understanding(req, und, rd: dict, flags) -> "object":
    """The app's Understanding fields from the existing deterministic reading, with the v3 reading's stance and risk."""
    from ai.understanding import SAFE_MIRROR, check_note
    P = _p()
    consent = bool(getattr(req, "ai", True))
    note = check_note(getattr(req, "note", None) if consent else None, getattr(req, "note_source", None))
    sits = {s: round(1.0 - 0.1 * i, 2) for i, s in enumerate(rd.get("situations") or []) if s in getattr(und, "valid", {s})}
    u = und._fallback(P._profile(req), note, sits)
    u.stance = rd.get("stance") or u.stance
    u.risk = V.higher_risk(u.risk, rd.get("risk", "none"))
    if u.risk in SAFE_MIRROR:
        u.mirror = SAFE_MIRROR[u.risk]
    if rd.get("source") == "fast_read":
        u.source = "llm"
    u.flags = [*u.flags, *flags]
    return u


def _client_u(req, und):
    d = getattr(req, "understanding", None)
    if not d:
        return None, None
    rd = V.reading_from_client(dict(d))
    u = und.from_client(dict(d)) if rd else None
    if u is None or rd is None:
        return None, None
    P = _p()
    u = P._with_profile(u, req)
    if getattr(req, "note", None):                        # a note sent alongside can only raise the risk
        rd["risk"] = V.higher_risk(rd["risk"], V.det_risk(req.note, getattr(req, "note_source", None)))
        u.risk = V.higher_risk(u.risk, rd["risk"])
    u.stance = rd["stance"]
    return u, rd


async def _reading(req, und, with_llm: bool):
    """(Understanding, v3 reading, Day 1 result or None) from what the app sent back, else read afresh."""
    u, rd = _client_u(req, und)
    if u is not None:
        return u, rd, None
    llm = V.sarvam_llm(getattr(und, "writer_llm", None)) if (with_llm and getattr(req, "ai", True)) else None
    d1 = await V.read_day1(req, und, llm=llm, note_matcher=getattr(und, "note_matcher", None))
    u = _understanding(req, und, d1["reading"], d1["flags"])
    return u, d1["reading"], d1


def _u_out(u, rec, rd) -> dict:
    out = _p()._understanding_out(u, rec)
    out["plan_v3"] = {k: v for k, v in rd.items() if k != "source"}
    return out


async def hook_v3(req, rec, planner, und, t0: float) -> HookResponse:
    P = _p()
    u, rd, d1 = await _reading(req, und, with_llm=True)
    E = V.engine()
    sits = [s["id"] for s in u.situations]
    if d1 is None:                                        # the app re-asked with a reading: Day 1 from the graph, no model
        llm = None
        d1 = await V.read_day1(req, und, llm=llm, note_matcher=None)
    card = V.verse_card(E, rec, d1["pick"], "hook", 1.0, sits) if d1["pick"] else None
    if card is not None:
        if d1.get("line"):
            card["first_line"] = d1["line"]
            card["for_you"] = d1["line"]
        card["first_line_source"] = d1.get("line_source") or "none"
    alts = [V.verse_card(E, rec, a, "hook", 0.5, sits) for a in d1["alts"][: getattr(req, "alternates", 2)]]
    out = {
        "understanding": _u_out(u, rec, rd), "hook": card, "alternates": [a for a in alts if a], "safety": P._safety(u),
        "matching": "semantic" if planner.semantic else "keywords", "library_version": rec.version, "library": rec.library_size,
        "timings_ms": {**{f"v3_{k}": int(v) for k, v in d1["timings"].items()}, "total": int((time.perf_counter() - t0) * 1000)},
    }
    resp = HookResponse(**out)
    await P._keep_note("hook", req, out["understanding"], [card, *out["alternates"]], rec.version, "v3")
    P._log("hook", req, u, t0, hook=bool(card), alts=len(out["alternates"]), engine="v3")
    return resp


def _shape_note(req, u) -> None:
    shape = getattr(req, "shape", None)
    if shape and shape != "2221":
        u.flags.append(f"v3:shape_ignored:{shape}")


async def preview_v3(req, rec, planner, und, t0: float) -> PreviewResponse:
    P = _p()
    u, rd, _ = await _reading(req, und, with_llm=True)
    _shape_note(req, u)
    E = V.engine()
    pin = req.hook_id if req.hook_id in E.verses else rd.get("pick")
    w = V.graph_week(E, rd, 1, list(req.exclude), pin)
    sits = [s["id"] for s in u.situations]
    by = {d["slot"]: d for d in w["days"] if d.get("id")}
    beats = {}
    for beat, slot in (("hook", "D1_see_name"), ("diagnose", "D2_see_why"), ("steady", "D3_steady_ground"), ("act", "D5_act_today")):
        d = by.get(slot)
        beats[beat] = V.verse_card(E, rec, d["id"], beat, float(d.get("score") or 0), sits) if d else None
    st = by.get("D7_story")
    beats["story"] = V.story_card(E, st["id"], float(st.get("score") or 0)) if st else None
    out = {"understanding": _u_out(u, rec, rd), "beats": beats, "weeks": P._weeks(u, 21, P._shape(req)), "safety": P._safety(u),
           "matching": "semantic" if planner.semantic else "keywords", "library_version": rec.version,
           "timings_ms": {"graph": int(w.get("ms") or 0), "total": int((time.perf_counter() - t0) * 1000)}}
    await P._keep_note("preview", req, out["understanding"], list(beats.values()), rec.version, "v3")
    P._log("preview", req, u, t0, beats=sum(1 for v in beats.values() if v), engine="v3")
    return PreviewResponse(**out)


async def plan_v3(req, rec, planner, und, t0: float) -> PlanResponse:
    P = _p()
    shape = P._shape(req)
    u, rd, _ = await _reading(req, und, with_llm=True)
    _shape_note(req, u)
    t1 = time.perf_counter()
    llm = V.sarvam_llm(getattr(und, "writer_llm", None)) if getattr(req, "ai", True) else None
    weeks = [req.week] if req.week else list(range(1, max(1, -(-req.days // 7)) + 1))[:3]
    exclude, days, timings = list(req.exclude), [], {}
    for w in weeks:
        pin = (req.hook_id or rd.get("pick")) if w == 1 else None
        res = await V.build_week(req, rd, w, exclude, pin, rec=rec, llm=llm, write=True, story_pin=req.story_id if w == 1 else None,
                                 write_days={1} if V.per_day() else None)          # r4n: Days 2-7 are written by /recommend/day
        u.flags.extend(res["flags"])
        days += res["days"]
        exclude += [x for x in (res["graph"].get("used") or [])] + [(d.get("verse") or d.get("story") or {}).get("id") for d in res["days"]]
        if V.per_day():
            u.flags.append(f"v3:per_day:w{w}:written_at_plan:day1_only")
        for k, v in res["timings"].items():
            timings[f"v3_w{w}_{k}"] = v
    if not req.week:
        days = days[: req.days]
    if u.risk == "harm_from_others" and (req.days > 7 or (req.week or 1) > 1):
        u.flags.append("plan_kept_gentle_for_safety")
    wk = [P._week(u, req.week, shape, req.level)] if req.week else P._weeks(u, len(days) or req.days, shape)
    out = {"understanding": _u_out(u, rec, rd), "days": days, "weeks": wk, "safety": P._safety(u),
           "matching": "semantic" if planner.semantic else "keywords", "library_version": rec.version,
           "timings_ms": {**timings, "select": int((time.perf_counter() - t1) * 1000), "total": int((time.perf_counter() - t0) * 1000)}}
    resp = PlanResponse(**out)
    await P._keep_note("plan", req, out["understanding"], days, rec.version, "v3")
    P._log("plan", req, u, t0, days=len(days), week=req.week or 0, engine="v3")
    return resp


async def day_v3(req, rec, planner, und, t0: float) -> PlanResponse:
    """r4n: one day of a stored plan (POST /recommend/day), written on request with a bridge from the day before; cached."""
    P = _p()
    u, rd, _ = await _reading(req, und, with_llm=False)
    llm = V.sarvam_llm(getattr(und, "writer_llm", None)) if getattr(req, "ai", True) else None
    w = req.week or 1
    res = await V.write_day(req, rd, w, list(req.week_ids), req.day_in_week, req.prev_for_you, list(req.exclude), rec=rec, llm=llm)
    u.flags.extend(res["flags"])
    days = [res["day"]] if res.get("day") else []
    out = {"understanding": _u_out(u, rec, rd), "days": days, "weeks": [P._week(u, w, P._shape(req), req.level)], "safety": P._safety(u),
           "matching": "semantic" if planner.semantic else "keywords", "library_version": rec.version,
           "timings_ms": {**{f"v3_day_{k}": int(v) for k, v in res["timings"].items()}, "v3_day_calls": int(res.get("calls", 0)),
                          "total": int((time.perf_counter() - t0) * 1000)}}
    resp = PlanResponse(**out)
    P._log("day", req, u, t0, day=req.day_in_week, week=w, engine="v3")
    return resp
