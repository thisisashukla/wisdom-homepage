import { test } from 'node:test'
import assert from 'node:assert/strict'
import { POST as subscribe } from '../src/app/api/subscribe/route.ts'
import { POST as waitlist } from '../src/app/api/waitlist/route.ts'

const request = (body) => new Request('https://example.test/api/capture', {
  method: 'POST', body: JSON.stringify(body),
})

for (const [kind, post] of Object.entries({ subscribe, waitlist })) {
  test(`${kind}: capture never succeeds without a storage acknowledgement`, async (t) => {
    const oldBackend = process.env.BACKEND_URL
    const oldPublicBackend = process.env.NEXT_PUBLIC_BACKEND_URL
    const oldFetch = globalThis.fetch
    t.after(() => {
      globalThis.fetch = oldFetch
      if (oldBackend === undefined) delete process.env.BACKEND_URL
      else process.env.BACKEND_URL = oldBackend
      if (oldPublicBackend === undefined) delete process.env.NEXT_PUBLIC_BACKEND_URL
      else process.env.NEXT_PUBLIC_BACKEND_URL = oldPublicBackend
    })
    delete process.env.BACKEND_URL
    delete process.env.NEXT_PUBLIC_BACKEND_URL
    globalThis.fetch = () => { throw new Error('Unexpected network call') }
    await t.test('invalid JSON and invalid email are rejected', async () => {
      assert.equal((await post(new Request('https://example.test', { method: 'POST', body: '{' }))).status, 400)
      for (const value of [null, [], {}, { email: 'invalid' }, { email: 'a'.repeat(255) + '@example.test' }]) {
        assert.equal((await post(request(value))).status, 400)
      }
    })
    await t.test('missing backend returns an honest unavailable response', async () => {
      const response = await post(request({ email: 'reader@example.test' }))
      assert.equal(response.status, 503)
      assert.equal((await response.json()).ok, false)
    })
    process.env.BACKEND_URL = 'https://backend.example.test/'
    await t.test('404 and server errors cannot become success', async () => {
      for (const status of [404, 429, 500]) {
        globalThis.fetch = async () => Response.json({ ok: true, persisted: true }, { status })
        assert.equal((await post(request({ email: 'reader@example.test' }))).status, 502)
      }
    })
    await t.test('HTTP success without a committed-write receipt is rejected', async () => {
      for (const receipt of [{}, { ok: true }, { ok: true, persisted: false }, { ok: false, persisted: true }, { ok: true, persisted: 'true' }]) {
        globalThis.fetch = async () => Response.json(receipt)
        assert.equal((await post(request({ email: 'reader@example.test' }))).status, 502)
      }
      globalThis.fetch = async () => new Response('not json')
      assert.equal((await post(request({ email: 'reader@example.test' }))).status, 503)
    })
    await t.test('network failures are retriable and do not expose upstream contents', async () => {
      globalThis.fetch = async () => { throw new Error('private upstream contents') }
      const response = await post(request({ email: 'reader@example.test' }))
      assert.equal(response.status, 503)
      assert.deepEqual(await response.json(), { ok: false, error: 'capture_unavailable' })
    })
    await t.test('confirmed storage preserves purpose and sends a normalized address', async () => {
      globalThis.fetch = async (url, options) => {
        assert.equal(url, `https://backend.example.test/api/v1/${kind}`)
        assert.equal(options.redirect, 'error')
        const record = JSON.parse(options.body)
        assert.equal(record.email, 'reader@example.test')
        assert.equal(record.mode, 'waitlist')
        assert.equal(record.purpose, kind === 'subscribe' ? 'daily_verse_launch_notification' : 'scripture_ai_launch_notification')
        if (kind === 'subscribe') assert.equal(record.locale, 'hi')
        else assert.deepEqual(record.interests, ['verse'])
        return Response.json({ ok: true, persisted: true })
      }
      const response = await post(request({ email: ' Reader@Example.Test ', locale: 'hi', interests: ['verse', 'verse', 'invalid', 5] }))
      assert.equal(response.status, 200)
      assert.deepEqual(await response.json(), { ok: true })
    })
    await t.test('a stalled backend is aborted within the bounded timeout', async () => {
      globalThis.fetch = async (_url, { signal }) => new Promise((_resolve, reject) => {
        signal.addEventListener('abort', () => reject(signal.reason), { once: true })
      })
      const response = await post(request({ email: 'reader@example.test' }))
      assert.equal(response.status, 503)
    })
  })
}
