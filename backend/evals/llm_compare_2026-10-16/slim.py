import json,os,sys
here=os.path.dirname(os.path.abspath(__file__))
P=["sarvam-105b","gpt-oss-120b","llama-3.3-70b"]
cases=json.load(open(os.path.join(here,"cases.json")))
labels=["Reading","Hook rerank","Story pick","Day copy","Day copy","Day copy","Day copy","Day copy"]
out={"cases":cases,"runs":{}}
for p in P:
    for r in json.load(open(os.path.join(here,f"out_{p}.json"))):
        calls=[]
        for i,c in enumerate(r["calls"]):
            calls.append({"step":labels[min(i,7)] if i<3 else "Day copy","ms":c["ms"],"in":(c.get("usage") or {}).get("in"),"out":(c.get("usage") or {}).get("out"),"ok":c.get("ok"),
                          "raw":c.get("raw") if i<3 else None})
        days=[{"day":d["day"],"beat":d["beat"],"ref":(d["item"] or {}).get("ref") or (d["item"] or {}).get("title"),"line":(d["item"] or {}).get("line") or (d["item"] or {}).get("teaser"),
               "for_you":(d["item"] or {}).get("for_you"),"meaning":(d["item"] or {}).get("meaning")} for d in r["days"]]
        u=r["reading"]
        out["runs"][f'{r["case"]}|{p}']={"ms":{"total":r["total_ms"],"hook":r["hook_ms"],"preview":r["preview_ms"],"plan":r["plan_ms"]},
          "reading":{k:u.get(k) for k in ("risk","mechanism","secondary_mechanism","confidence","note_quality","core_struggle","mirror","insight","seat","life_context","weeks","flags","situations","queries")},
          "hook":r["hook"],"alts":[a["ref"] for a in r["alternates"]],"days":days,"plan_flags":r["plan_flags"],"calls":calls,"safety":bool(r.get("safety"))}
json.dump(out,open(os.path.join(here,"compare_slim.json"),"w"),ensure_ascii=False)
print(os.path.getsize(os.path.join(here,"compare_slim.json")))
