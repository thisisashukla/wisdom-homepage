import { test } from 'node:test'
import assert from 'node:assert/strict'
import { canonicalRedirect } from '../src/lib/canonical-redirect.ts'

test('default host policy never opposes the hosting redirect', () => {
  for (const host of ['wisdomquotes.in','www.wisdomquotes.in']) {
    assert.equal(canonicalRedirect(`https://${host}/`,host), null)
    assert.equal(canonicalRedirect(`https://${host}/gita/`,host), `https://${host}/gita`)
  }
})
test('explicit canonical host normalises host and slash together and preserves queries', () => {
  assert.equal(canonicalRedirect('https://www.wisdomquotes.in/gita/chapter/2/?web=1','www.wisdomquotes.in','wisdomquotes.in'), 'https://wisdomquotes.in/gita/chapter/2?web=1')
  assert.equal(canonicalRedirect('https://wisdomquotes.in/','wisdomquotes.in','wisdomquotes.in'), null)
})
test('preview hosts and invalid configuration cannot redirect to an unrelated domain', () => {
  assert.equal(canonicalRedirect('http://127.0.0.1:3101/gita/','127.0.0.1:3101','wisdomquotes.in'), 'http://127.0.0.1:3101/gita')
  assert.equal(canonicalRedirect('https://www.wisdomquotes.in/gita','www.wisdomquotes.in','example.com'), null)
})
