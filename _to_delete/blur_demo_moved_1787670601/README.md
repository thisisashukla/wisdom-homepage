# blur-demo endpoint

Public "try before you buy" demo for the BlurAnything marketing site.
Hosted inside the Wisdom scripture-search FastAPI service so a single
deployment covers both products.

## Route

- `POST /api/v1/blur-demo` — multipart upload; sync response with the
  signed URL of the blurred output.
- `GET  /api/v1/blur-demo/health` — cheap probe used by the /demo page
  to grey out its CTA when the backend is down.

Full contract lives in [router.py](./router.py).

## What's vendored, what's shared

The video pipeline in [pipeline.py](./pipeline.py) is a **slim clone**
of `blur-app/app/core/pipeline.py`. No scene detection, no tracking,
no verification loop — the desktop app's full pipeline stays the
source of truth for paying users; this endpoint exists purely so the
marketing site can show, on real footage, that the product works.

The detectors in [detectors.py](./detectors.py) use the same weights
as the desktop app (YuNet + RT-DETR-v2-LP) and are inlined rather
than imported from the blur-app tree — the two projects live in
separate repos and deploy independently.

## Setup

1. Add the storage bucket + policies to Supabase:

   ```bash
   supabase db push       # from wisdom-homepage/
   # or apply supabase/migrations/004_blur_demo_bucket.sql by hand
   ```

2. Set the environment variables — see `backend/.env.example`. The
   required ones are `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`;
   everything else has a sensible default.

3. Install the new Python deps:

   ```bash
   pip install -r requirements.txt
   ```

   The blur-demo pull is `opencv-python-headless`, `av`, and
   `python-multipart`. `transformers` and `torch` come along for the
   ride from Wisdom's existing sentence-transformers dep.

4. Start the API as usual:

   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

   The `blur-demo endpoint READY` log line at startup means Supabase
   is configured. `DISABLED` means the endpoint mounts but returns
   503 on POST until the two Supabase vars are set — the rest of the
   API keeps working either way.

5. Point the homepage at this host by setting
   `NEXT_PUBLIC_DEMO_API_URL` in `homepage/.env.local`.

## Ops

- **Cold start.** First `POST /api/v1/blur-demo` request downloads
  YuNet (350 KB) into `~/.cache/blur-demo-models` and RT-DETR-v2-LP
  (~500 MB) into the HuggingFace cache. Bake these into the Docker
  image if you want a hot start.
- **Concurrency.** One request per uvicorn worker at a time is the
  safe default — RT-DETR is CPU-bound and multi-tenanting it inside a
  single process just fights the GIL. Scale by adding workers.
- **Uploaded files** land in `tempfile.mkdtemp()` on the pod and are
  deleted in the `finally` block. Blurred outputs go to Supabase and
  are subject to whatever cleanup you schedule against
  `storage.objects` in the `blur-demo` bucket — the migration adds a
  `created_at` index for exactly that.

## Migrating to async jobs

The router is currently sync-response. When request lengths start to
hit the host's timeout, flip to async without touching the pipeline
or storage code:

- POST enqueues a job (uuid) and returns 202 with a `job_id`;
- a worker process consumes the queue and calls the same
  `process_video()` + `BlurDemoStorage.upload_and_sign()`;
- GET `/api/v1/blur-demo/{job_id}` returns status + eventual URL.

All the pieces already return the right shapes to be used out of a
worker context.
