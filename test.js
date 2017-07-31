'use strict';

var test = require('tape');
var retext = require('retext');
var diacritics = require('./');

test('diacritics', function (t) {
  t.plan(2);

  retext()
    .use(diacritics)
    .process([
      'Beyonce is the creme fresh on his resume.'
    ].join('\n'), function (err, file) {
      t.ifError(err, 'should not fail');

      t.deepEqual(
        file.messages.map(String),
        [
          '1:1-1:8: Replace `Beyonce` with `Beyoncé`',
          '1:16-1:27: Replace `creme fresh` with `crème fraîche`',
          '1:31-1:41: Replace `his resume` with `his résumé`'
        ],
        'should warn about missing diacritics'
      );
    });
});
