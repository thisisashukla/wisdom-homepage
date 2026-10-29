from pathlib import Path
c = Path("common/config.py"); t = c.read_text()
t = t.replace("rag_sparse_w: float = 0.0 ", "rag_sparse_w: float = 0.3 ", 1)
c.write_text(t); print("rag_sparse_w = 0.3" if "rag_sparse_w: float = 0.3" in t else "NOT SET")
