/**
 * @typedef {import('nlcst').Root} Root
 */

import {matchCasing} from 'match-casing'
import {search} from 'nlcst-search'
import {toString} from 'nlcst-to-string'
import {pointStart, pointEnd} from 'unist-util-position'
import {quotation} from 'quotation'
import {schema} from './schema.js'

const source = 'retext-diacritics'
const url = 'https://github.com/retext/retext-diacritics#readme'

const list = Object.keys(schema)

/**
 * Plugin to check for proper use of diacritics.
 *
 * @type {import('unified').Plugin<[], Root>}
 */
export default function retextDiacritics() {
  return (tree, file) => {
    search(tree, list, (match, _, _1, phrase) => {
      const actual = toString(match)
      const expected = matchCasing(schema[phrase], actual)

      Object.assign(
        file.message(
          'Replace ' +
            quotation(actual, '`') +
            ' with ' +
            quotation(expected, '`'),
          {start: pointStart(match[0]), end: pointEnd(match[match.length - 1])},
          [source, phrase.replace(/\s+/g, '-').toLowerCase()].join(':')
        ),
        {actual, expected: [expected], url}
      )
    })
  }
}
