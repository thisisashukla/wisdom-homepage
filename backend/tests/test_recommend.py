"""
Tests for POST /api/v1/recommend, run against the real library in keyword mode
(no model download). Run from backend/:  pytest tests/test_recommend.py -q
"""
from __future__ import annotations

from pathlib import Path

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from ai import recommender as rec_mod
from server import recommend as recommend_router

DATA = Path(__file__).resolve().parents[1] / "data"
LIBRARY = DATA / "taxonomy" / "wisdom_library.json"


@pytest.fixture(scope="module")
def client():
    rec_mod.init_recommender(library_path=str(LIBRARY), cache_dir=str(DATA), embed=None)
    app = FastAPI()
    app.include_router(recommend_router.router, prefix="/api/v1")
    return TestClient(app)


def post(client, **body):
    r = client.post("/api/v1/recommend", json=body)
    assert r.status_code == 200, r.text
    return r.json()


def test_profile_only_returns_five_distinct_verses(client):
    out = post(client, feeling="quiet", age="35_44", stages=["working"], phone_hours=3)
    ids = [v["id"] for v in out["verses"]]
    assert len(ids) == 5 and len(set(ids)) == 5
    assert out["matching"] == "profile" and out["used_note"] is False
    assert all(v["line"] for v in out["verses"])
    assert out["library"]["verses"] == 1743 and out["library"]["prasangs"] == 462


def test_first_three_come_from_different_texts(client):
    out = post(client, feeling="nerve", age="25_34", stages=["working"], phone_hours=2)
    fams = [v["family"] for v in out["verses"][:3]]
    assert len(set(fams)) == 3


def test_one_verse_per_prasang(client):
    out = post(client, feeling="replay", age="45_54", stages=["caring_parents"], phone_hours=2, count=8)
    ps = [v["prasang"]["id"] for v in out["verses"] if v["prasang"]]
    assert len(ps) == len(set(ps))


def test_curious_gets_only_gita_and_the_anchors(client):
    out = post(client, feeling="gita", age="u25", stages=["studying"], phone_hours=5)
    assert all(v["family"] == "bg" for v in out["verses"])
    assert {"bg.2.47", "bg.3.35"} & {v["id"] for v in out["verses"]}


def test_note_shapes_the_situations(client):
    out = post(client, feeling="quiet", age="35_44", stages=["working"], phone_hours=2,
               note="I lie awake worrying, my mind is racing at night")
    assert out["used_note"] is True
    assert out["situations"][0]["source"] == "note"
    assert out["situations"][0]["id"] == "sleep_mind"


def test_never_alone_and_held_verses_are_not_served(client):
    seen = set()
    for feeling in ["quiet", "nerve", "replay", "stick", "faith", "gita"]:
        out = post(client, feeling=feeling, age="35_44", stages=["working"], count=10)
        seen |= {v["id"] for v in out["verses"]}
    assert not seen & rec_mod.NEVER_ALONE
    assert all(not i.startswith(("kabir", "meera")) for i in seen)


def test_exclude_skips_seen_verses(client):
    first = post(client, feeling="stick", age="45_54", stages=["own_thing"])
    again = post(client, feeling="stick", age="45_54", stages=["own_thing"], exclude=[v["id"] for v in first["verses"]])
    assert not {v["id"] for v in first["verses"]} & {v["id"] for v in again["verses"]}


def test_crisis_note_returns_helplines_and_only_gentle_verses(client):
    out = post(client, feeling="replay", age="35_44", stages=["raising_kids"], note="I don't want to be alive anymore")
    assert out["safety"] and out["safety"]["crisis"] is True
    assert any("988" in l["contact"] for l in out["safety"]["lines"])
    assert all(v["tone"] in ("comforting", "steadying") for v in out["verses"])


def test_bad_input_is_rejected(client):
    assert client.post("/api/v1/recommend", json={"feeling": "angry"}).status_code == 422
    assert client.post("/api/v1/recommend", json={"feeling": "quiet", "note": "x" * 1001}).status_code == 422
    assert client.post("/api/v1/recommend", json={"feeling": "quiet", "phone_hours": 30}).status_code == 422


def test_semantic_path_caches_and_ranks(tmp_path):
    """Exercise the embedding path with a tiny stand-in model (bag of hashed words)."""
    import shutil
    import numpy as np

    def fake_embed(texts):
        out = np.zeros((len(texts), 256), dtype=np.float32)
        for i, t in enumerate(texts):
            for w in rec_mod._toks(t):
                out[i, hash(w) % 256] += 1.0
        return out / (np.linalg.norm(out, axis=1, keepdims=True) + 1e-9)

    r = rec_mod.init_recommender(library_path=str(LIBRARY), cache_dir=str(tmp_path), embed=fake_embed, background=False)
    assert r.semantic and list(tmp_path.glob("recommend_emb_*.npz"))
    out = r.recommend(feeling="quiet", age="35_44", stages=["working"], phone_hours=2,
                      note="lying awake worrying, anxious thoughts at night", count=5)
    assert out["matching"] == "semantic" and len(out["verses"]) == 5
    assert out["situations"][0]["id"] == "sleep_mind"
    # second start loads the cache instead of re-embedding
    r2 = rec_mod.Recommender(LIBRARY, tmp_path, fake_embed)
    r2.ensure_embeddings()
    assert r2.semantic
