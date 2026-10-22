import json,re,statistics as st
P=["sarvam-105b","gpt-oss-120b","llama-3.3-70b"]
R={p:{r["case"]:r for r in json.load(open(f"out_{p}.json"))} for p in P}
def broken(t): return len(t.split())<=2 and (t.split()[-1].lower() in ("the","of","a") or len(t.split())==1)
for p in P:
    rs=list(R[p].values())
    fy=[sum(1 for d in r["days"] if (d["item"] or {}).get("for_you")) for r in rs]
    drops=sum(sum(int(x) for x in re.findall(r"=(\d+)",",".join(f for f in r["plan_flags"] if f.startswith("dropped")))) for r in rs)
    retried=sum(1 for r in rs for f in r["plan_flags"] if f.startswith("retried"))
    bt=sum(1 for r in rs for t in r["reading"]["weeks"] if broken(t))
    read=[r["calls"][0]["ms"] for r in rs]; rer=[r["calls"][1]["ms"] for r in rs]
    tin=sum((c.get("usage") or {}).get("in") or 0 for r in rs for c in r["calls"]); tout=sum((c.get("usage") or {}).get("out") or 0 for r in rs for c in r["calls"])
    print(p, "hook_ms med",st.median([r["hook_ms"] for r in rs]),"max",max(r["hook_ms"] for r in rs),"| total med",st.median([r["total_ms"] for r in rs]),
      "| reading med",st.median(read),"rerank med",st.median(rer),"| for_you",sum(fy),"/",7*len(rs),"| dropped",drops,"retried",retried,"| broken week titles",bt,"/",3*len(rs),
      "| hooks",[r["hook"]["ref"].replace("Bhagavad Gita ","") for r in rs],"| tokens in/out",tin,tout, "| n",len(rs))
print()
for c in R[P[0]]:
    s=set(d["item"]["id"] for d in R[P[0]][c]["days"] if d["item"])
    print(c, {p: len(s & set(d["item"]["id"] for d in R[p][c]["days"] if d["item"])) for p in P[1:]}, {p:R[p][c]["reading"]["mechanism"] for p in P})
