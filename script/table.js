'use strict'

var zone = require('mdast-zone')
var u = require('unist-builder')
var schema = require('../schema')

module.exports = table

function table() {
  return transformer
}

function transformer(tree) {
  zone(tree, 'messages', handler)
}

function handler(start, nodes, end) {
  var rows = [
    u('tableRow', [
      u('tableCell', [u('inlineCode', 'source')]),
      u('tableCell', [u('inlineCode', 'ruleId')]),
      u('tableCell', [u('text', 'Incorrect')]),
      u('tableCell', [u('text', 'Correct')])
    ])
  ]

  Object.keys(schema)
    .sort()
    .forEach(function (phrase) {
      rows.push(
        u('tableRow', [
          u('tableCell', [u('inlineCode', 'retext-diacritics')]),
          u('tableCell', [
            u('inlineCode', phrase.replace(/\s+/g, '-').toLowerCase())
          ]),
          u('tableCell', [u('inlineCode', phrase)]),
          u('tableCell', [u('inlineCode', schema[phrase])])
        ])
      )
    })

  return [start, u('table', rows), end]
}
