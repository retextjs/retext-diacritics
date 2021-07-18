import test from 'tape'
import retext from 'retext'
import retextDiacritics from './index.js'

test('retext-diacritics', function (t) {
  t.plan(2)

  retext()
    .use(retextDiacritics)
    .process(
      'Beyonce is the creme fresh on his resume.',
      function (error, file) {
        t.deepEqual(
          JSON.parse(JSON.stringify(file.messages[0])),
          {
            message: 'Replace `Beyonce` with `Beyoncé`',
            name: '1:1-1:8',
            reason: 'Replace `Beyonce` with `Beyoncé`',
            line: 1,
            column: 1,
            location: {
              start: {line: 1, column: 1, offset: 0},
              end: {line: 1, column: 8, offset: 7}
            },
            source: 'retext-diacritics',
            ruleId: 'beyonce',
            fatal: false,
            actual: 'Beyonce',
            expected: ['Beyoncé']
          },
          'should emit a message'
        )

        t.deepEqual(
          [error].concat(file.messages.map(String)),
          [
            null,
            '1:1-1:8: Replace `Beyonce` with `Beyoncé`',
            '1:16-1:27: Replace `creme fresh` with `crème fraîche`',
            '1:31-1:41: Replace `his resume` with `his résumé`'
          ],
          'should warn about missing diacritics'
        )
      }
    )
})
