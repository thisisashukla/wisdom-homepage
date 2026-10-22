import json,sys
P=["sarvam-105b","gpt-oss-120b","llama-3.3-70b"]
R={p:{r["case"]:r for r in json.load(open(f"out_{p}.json"))} for p in P}
cases=json.load(open("cases.json"))
for c in cases:
    if sys.argv[1:] and c["id"] not in sys.argv[1:]: continue
    print("\n#####",c["id"],c["feeling"],c["note"])
    for p in P:
        r=R[p].get(c["id"]); 
        if not r or "error" in r: print(p,"ERROR",r and r.get("error")); continue
        u=r["reading"]
        print(f"\n== {p}  total={r['total_ms']}ms hook={r['hook_ms']} prev={r['preview_ms']} plan={r['plan_ms']}")
        print(f" risk={u['risk']} mech={u['mechanism']}/{u.get('secondary_mechanism')} conf={u['confidence']} src={u['source']} q={u['note_quality']} flags={u['flags']}")
        print(" core:",u['core_struggle']); print(" mirror:",u['mirror']); print(" insight:",u.get('insight'))
        pass
        print(" weeks:",u['weeks']); print(" sits:",u['situations'])
        print(" HOOK:",r['hook']['ref'],"|",r['hook']['line'][:90]," alts:",[a['ref'] for a in r['alternates']])
        for d in r['days']:
            it=d['item'] or {}
            print(f"  D{d['day']} {d['beat']:<8} {it.get('ref') or it.get('title')} | FY: {(it.get('for_you') or '')[:110]}")
        print(" story why:",r['preview']['story'] and r['preview']['story'].get('why'))
        print(" plan_flags:",r['plan_flags'])
        print(" call_ms:",[x["ms"] for x in r["calls"]],"fails:",[x.get("error") for x in r["calls"] if not x.get("ok")])
