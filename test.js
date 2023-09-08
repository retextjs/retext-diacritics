import assert from 'node:assert/strict'
import test from 'node:test'
import {retext} from 'retext'
import retextDiacritics from './index.js'

test('retext-diacritics', async function (t) {
  const file = await retext()
    .use(retextDiacritics)
    .process('Beyonce is the creme fresh on his resume.')

  await t.test('should emit messages', async function () {
    assert.deepEqual(file.messages.map(String), [
      '1:1-1:8: Replace `Beyonce` with `Beyoncé`',
      '1:16-1:27: Replace `creme fresh` with `crème fraîche`',
      '1:31-1:41: Replace `his resume` with `his résumé`'
    ])
  })

  await t.test('should emit a message w/ metadata', async function () {
    assert.deepEqual(JSON.parse(JSON.stringify(file.messages[0])), {
      column: 1,
      fatal: false,
      message: 'Replace `Beyonce` with `Beyoncé`',
      line: 1,
      name: '1:1-1:8',
      place: {
        start: {line: 1, column: 1, offset: 0},
        end: {line: 1, column: 8, offset: 7}
      },
      reason: 'Replace `Beyonce` with `Beyoncé`',
      ruleId: 'beyonce',
      source: 'retext-diacritics',
      actual: 'Beyonce',
      expected: ['Beyoncé'],
      url: 'https://github.com/retext/retext-diacritics#readme'
    })
  })
})
