import json, sys, pathlib
here = pathlib.Path(__file__).parent
data = json.loads((here / "data.json").read_text())
blob = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
html = (here / "template.html").read_text().replace("/*__DATA__*/", blob)
out = here / "index.html"
out.write_text(html)
print(f"built {out} ({len(html)} bytes) as of {data['asOf']}")
