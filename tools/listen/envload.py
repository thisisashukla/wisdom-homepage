"""Loads SARVAM_API_KEY (backend/.env) and SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY (backend/.env.supabase.local)."""
import os, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[2]
def load():
    for p in [ROOT / 'backend/.env', ROOT / 'backend/.env.supabase.local']:
        if not p.exists(): continue
        for line in p.read_text().splitlines():
            line = line.strip()
            if not line or line.startswith('#') or '=' not in line: continue
            k, v = line.split('=', 1)
            os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))
load()
