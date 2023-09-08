import test from 'tape'
import {retext} from 'retext'
import retextDiacritics from './index.js'

test('retext-diacritics', (t) => {
  t.plan(2)

  retext()
    .use(retextDiacritics)
    .process('Beyonce is the creme fresh on his resume.')
    .then((file) => {
      t.deepEqual(
        JSON.parse(JSON.stringify(file.messages[0])),
        {
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
        },
        'should emit a message'
      )

      t.deepEqual(
        file.messages.map(String),
        [
          '1:1-1:8: Replace `Beyonce` with `Beyoncé`',
          '1:16-1:27: Replace `creme fresh` with `crème fraîche`',
          '1:31-1:41: Replace `his resume` with `his résumé`'
        ],
        'should warn about missing diacritics'
      )
    }, t.ifErr)
})
