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
      const start = pointStart(match[0])
      const end = pointEnd(match[match.length - 1])
      /* c8 ignore next -- hard to test */
      const place = start && end ? {start, end} : undefined
      const ruleId = phrase.replace(/\s+/g, '-').toLowerCase()

      const message = file.message(
        'Replace ' +
          quotation(actual, '`') +
          ' with ' +
          quotation(expected, '`'),
        {place, ruleId, source}
      )

      message.actual = actual
      message.expected = [expected]
      message.url = url
    })
  }
}
