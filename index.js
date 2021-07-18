import {matchCasing} from 'match-casing'
import {search} from 'nlcst-search'
import {toString} from 'nlcst-to-string'
import {pointStart, pointEnd} from 'unist-util-position'
import {quotation} from 'quotation'
import {schema} from './schema.js'

var source = 'retext-diacritics'

// List of all phrases.
var list = keys(schema)

export default function retextDiacritics() {
  return transform

  // Search `tree` for violations.
  function transform(tree, file) {
    search(tree, list, searcher)

    function searcher(match, index, parent, phrase) {
      var actual = toString(match)
      var expected = matchCasing(schema[phrase], actual)

      var message = file.message(
        'Replace ' +
          quotation(actual, '`') +
          ' with ' +
          quotation(expected, '`'),
        {
          start: pointStart(match[0]),
          end: pointEnd(match[match.length - 1])
        },
        [source, phrase.replace(/\s+/g, '-').toLowerCase()].join(':')
      )

      message.actual = actual
      message.expected = [expected]
    }
  }
}

function keys(object) {
  var result = []
  var key

  for (key in object) {
    result.push(key)
  }

  return result
}
