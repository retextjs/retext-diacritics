import assert from 'node:assert/strict'
import test from 'node:test'
import {retext} from 'retext'
import retextDiacritics from './index.js'

test('retext-diacritics', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('./index.js')).sort(), [
      'default'
    ])
  })

  const file = await retext()
    .use(retextDiacritics)
    .process('Beyonce is the creme fresh on his resume.')

  await t.test('should emit messages', async function () {
    assert.deepEqual(file.messages.map(String), [
      '1:1-1:8: Unexpected undiacritical `Beyonce`, did you mean `Beyoncé`',
      '1:16-1:27: Unexpected undiacritical `creme fresh`, did you mean `crème fraîche`',
      '1:31-1:41: Unexpected undiacritical `his resume`, did you mean `his résumé`'
    ])
  })

  await t.test('should emit a message w/ metadata', async function () {
    assert.deepEqual(
      JSON.parse(JSON.stringify({...file.messages[0], ancestors: []})),
      {
        ancestors: [],
        column: 1,
        fatal: false,
        message: 'Unexpected undiacritical `Beyonce`, did you mean `Beyoncé`',
        line: 1,
        name: '1:1-1:8',
        place: {
          start: {line: 1, column: 1, offset: 0},
          end: {line: 1, column: 8, offset: 7}
        },
        reason: 'Unexpected undiacritical `Beyonce`, did you mean `Beyoncé`',
        ruleId: 'beyonce',
        source: 'retext-diacritics',
        actual: 'Beyonce',
        expected: ['Beyoncé'],
        url: 'https://github.com/retext/retext-diacritics#readme'
      }
    )
  })
})
