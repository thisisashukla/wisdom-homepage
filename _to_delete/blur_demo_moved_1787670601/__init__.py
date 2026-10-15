"""blur_demo — public demo of the BlurAnything pipeline.

Exposes ONE synchronous endpoint (POST /api/v1/blur-demo) that accepts a
short video (≤ 60 s), runs a slim version of the desktop app's blur
pipeline over it, uploads the result to a private Supabase bucket, and
returns a short-lived signed URL to the blurred file.

The pipeline vendored in this package is intentionally a subset of the
one at blur-app/app/core/pipeline.py — no scene detection, no tracking,
no verification loop. The desktop app's full pipeline stays the source
of truth for paying users; this endpoint exists purely so the marketing
site can show, on real footage, that the product works.
"""

from server.blur_demo.router import router as router  # re-export for main.py
