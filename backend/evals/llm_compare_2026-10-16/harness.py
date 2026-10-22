import sys, os, json, time, asyncio, inspect, re, logging
BACK = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
sys.path.insert(0, BACK); sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.chdir(BACK)
os.environ.setdefault("EMBED_BACKEND", "cloudflare")
import httpx
from keys import load
logging.basicConfig(level=logging.WARNING)
from common.config import settings
SLACK = float(os.environ.get("SLACK", "3"))
settings.understand_timeout_s *= SLACK; settings.rerank_timeout_s *= SLACK
settings.for_you_timeout_s *= SLACK; settings.request_budget_s *= SLACK
from ai.embedder import init_embedder
from ai.recommender import init_recommender
from ai.planner import init_planner
from ai.understanding import init_understander, get_understander
from ai.sarvam import SarvamClient, _parse_json
from common.models import HookRequest, PreviewRequest, PlanRequest
from server import plan as P

benv = load(BACK + '/.env')
CF = f"https://api.cloudflare.com/client/v4/accounts/{benv['CF_ACCOUNT_ID']}/ai/v1/chat/completions"

def caller():
    for f in inspect.stack()[2:12]:
        m = os.path.basename(f.filename).replace('.py', '')
        if m in ("understanding", "llm_rerank", "personalize", "depth"):
            return m + "." + f.function
    return "?"

class Traced:
    """Same chat_json() contract as SarvamClient; records every call."""
    def __init__(self, name, fn):
        self.name, self.fn, self.calls = name, fn, []
    def chat_json(self, messages, *, temperature=0.2, max_tokens=1400, timeout_s=10):
        rec = {"caller": caller(), "t": time.time(), "temperature": temperature, "max_tokens": max_tokens,
               "user": next((m["content"] for m in reversed(messages) if m["role"] == "user"), "")}
        t0 = time.perf_counter()
        try:
            text, usage = self.fn(messages, temperature, max_tokens, timeout_s)
            rec.update(ms=int((time.perf_counter() - t0) * 1000), raw=text, usage=usage)
            out = _parse_json(text)
            rec["ok"] = True
            return out
        except Exception as e:
            rec.update(ms=int((time.perf_counter() - t0) * 1000), ok=False, error=f"{type(e).__name__}: {str(e)[:300]}")
            raise
        finally:
            self.calls.append(rec)

def sarvam_fn():
    c = SarvamClient(api_key=benv["SARVAM_API_KEY"], model=benv.get("SARVAM_MODEL") or settings.sarvam_model)
    def f(msgs, temp, mt, to):
        resp = c._client.chat.completions(model=c.model, messages=msgs, temperature=temp, max_tokens=mt,
            request_options={"timeout_in_seconds": int(to), "max_retries": 0,
                             "additional_body_parameters": {"reasoning_effort": None, "response_format": {"type": "json_object"}}})
        u = resp.usage
        return (resp.choices[0].message.content or "").strip(), {"in": getattr(u, "prompt_tokens", None), "out": getattr(u, "completion_tokens", None)}
    return f

def cf_fn(model, extra=None):
    def f(msgs, temp, mt, to):
        body = {"model": model, "messages": msgs, "temperature": temp, "max_tokens": max(mt, 1200) if "gpt-oss" in model else mt,
                "response_format": {"type": "json_object"}, **(extra or {})}
        r = httpx.post(CF, headers={"Authorization": "Bearer " + benv["CF_API_TOKEN"]}, json=body, timeout=max(to, 30))
        r.raise_for_status()
        j = r.json(); ch = j["choices"][0]["message"]
        u = j.get("usage") or {}
        return (ch.get("content") or "").strip(), {"in": u.get("prompt_tokens"), "out": u.get("completion_tokens")}
    return f

PROVIDERS = {
    "sarvam-105b": sarvam_fn,
    "gpt-oss-120b": lambda: cf_fn("@cf/openai/gpt-oss-120b", {"reasoning_effort": "low"}),
    "llama-3.3-70b": lambda: cf_fn("@cf/meta/llama-3.3-70b-instruct-fp8-fast"),
}

def slim_verse(v):
    if not v: return None
    return {k: v.get(k) for k in ("id", "ref", "line", "translation", "why", "meaning", "for_you", "score", "role_fit") if v.get(k) is not None}

def slim_story(s):
    if not s: return None
    return {k: s.get(k) for k in ("id", "title", "teaser", "why", "for_you", "lesson", "score") if s.get(k) is not None}

async def run_case(case, prov, llm):
    und = get_understander(); und.llm = llm
    base = {k: case[k] for k in ("feeling", "age", "stages", "phone_hours", "note", "note_source") if case.get(k) is not None}
    out = {"case": case["id"], "provider": prov}
    t = time.perf_counter()
    try:
        h = (await P.hook(HookRequest(**base, alternates=2))).model_dump()
    except Exception as e:
        out["error"] = f"hook: {e}"; return out
    out["hook_ms"] = int((time.perf_counter() - t) * 1000)
    u = h["understanding"]
    out["reading"] = {k: u.get(k) for k in ("source", "note_quality", "risk", "confidence", "mechanism", "mechanism_label", "secondary_mechanism",
                                            "core_struggle", "mirror", "insight", "seat", "life_context", "details", "weeks", "flags", "queries", "query_sources")}
    out["reading"]["situations"] = [(s["label"], s["weight"]) for s in u.get("situations", [])[:5]]
    out["hook"] = slim_verse(h["hook"]); out["alternates"] = [slim_verse(a) for a in h["alternates"]]
    out["safety"] = h.get("safety")
    hook_id = h["hook"]["id"] if h["hook"] else None
    t = time.perf_counter()
    pv = (await P.preview(PreviewRequest(**{k: v for k, v in base.items() if k != "note"}, understanding=u, hook_id=hook_id))).model_dump()
    out["preview_ms"] = int((time.perf_counter() - t) * 1000)
    out["preview"] = {b: (slim_story(pv["beats"].get(b)) if b == "story" else slim_verse(pv["beats"].get(b))) for b in ("hook", "diagnose", "steady", "act", "story")}
    out["week_titles"] = [w["title"] for w in pv["weeks"]]
    story_id = pv["beats"]["story"]["id"] if pv["beats"].get("story") else None
    t = time.perf_counter()
    pl = (await P.plan(PlanRequest(**{k: v for k, v in base.items() if k != "note"}, understanding=u, hook_id=hook_id,
                                   story_id=story_id, week=1))).model_dump()
    out["plan_ms"] = int((time.perf_counter() - t) * 1000)
    out["plan_flags"] = (pl.get("understanding") or {}).get("flags")
    out["days"] = []
    for d in pl["days"]:
        c = d.get("verse") or d.get("story")
        out["days"].append({"day": d["day"], "beat": d["beat"], "phase": d.get("phase"),
                            "item": slim_story(c) if d.get("story") else slim_verse(c)})
    return out

async def main(case_file, out_file, provs):
    cases = json.load(open(case_file))
    emb = init_embedder(model_dir="", model_name=settings.embed_model, backend="cloudflare",
                        cf_account_id=benv["CF_ACCOUNT_ID"], cf_api_token=benv["CF_API_TOKEN"], cf_model=settings.cf_embed_model)
    rec = init_recommender(library_path=settings.wisdom_library_path, cache_dir=settings.data_dir, embed=emb.embed_batch)
    init_understander(rec, llm=None, timeout_s=settings.understand_timeout_s)
    pl = init_planner(rec, roles_path=settings.verse_roles_path, background=False)
    results = json.load(open(out_file)) if os.path.exists(out_file) else []
    done = {(r["case"], r["provider"]) for r in results if "error" not in r}
    for prov in provs:
        for case in cases:
            if (case["id"], prov) in done: continue
            llm = Traced(prov, PROVIDERS[prov]())
            t = time.perf_counter()
            try:
                r = await run_case(case, prov, llm)
            except Exception as e:
                r = {"case": case["id"], "provider": prov, "error": f"{type(e).__name__}: {e}"}
            r["total_ms"] = int((time.perf_counter() - t) * 1000)
            r["calls"] = llm.calls
            results = [x for x in results if not (x["case"] == case["id"] and x["provider"] == prov)] + [r]
            json.dump(results, open(out_file, "w"), ensure_ascii=False, indent=1)
            print(prov, case["id"], "ERR " + r["error"] if "error" in r else f"hook={r['hook']['ref'] if r.get('hook') else None} mech={r['reading']['mechanism']} calls={len(llm.calls)} fails={sum(1 for c in llm.calls if not c.get('ok'))} {r['total_ms']}ms", flush=True)

if __name__ == "__main__":
    asyncio.run(main(sys.argv[1], sys.argv[2], sys.argv[3].split(",")))
