import re,pathlib
def load(p):
    d={}
    for l in pathlib.Path(p).read_text().splitlines():
        m=re.match(r'\s*([A-Z_]+)\s*=\s*"?([^"\n]*)"?\s*$',l)
        if m: d[m.group(1)]=m.group(2).strip()
    return d
