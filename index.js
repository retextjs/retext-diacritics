'use strict'

var casing = require('match-casing')
var search = require('nlcst-search')
var toString = require('nlcst-to-string')
var position = require('unist-util-position')
var quotation = require('quotation')
var schema = require('./schema')

module.exports = diacritics

var source = 'retext-diacritics'

// List of all phrases.
var list = keys(schema)

function diacritics() {
  return transform

  // Search `tree` for violations.
  function transform(tree, file) {
    search(tree, list, searcher)

    function searcher(match, index, parent, phrase) {
      var actual = toString(match)
      var expected = casing(schema[phrase], actual)

      var message = file.message(
        'Replace ' +
          quotation(actual, '`') +
          ' with ' +
          quotation(expected, '`'),
        {
          start: position.start(match[0]),
          end: position.end(match[match.length - 1])
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
