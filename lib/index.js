/**
 * @typedef {import('nlcst').Root} Root
 * @typedef {import('vfile').VFile} VFile
 */

import {matchCasing} from 'match-casing'
import {search} from 'nlcst-search'
import {toString} from 'nlcst-to-string'
import {quotation} from 'quotation'
import {pointEnd, pointStart} from 'unist-util-position'
import {schema} from './schema.js'

const list = Object.keys(schema)

/**
 * Check for proper use of diacritics.
 *
 * @returns
 *   Transform.
 */
export default function retextDiacritics() {
  /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @param {VFile} file
   *   File.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree, file) {
    search(tree, list, function (match, _, _1, phrase) {
      const actual = toString(match)
      const expected = matchCasing(schema[phrase], actual)
      const start = pointStart(match[0])
      const end = pointEnd(match[match.length - 1])

      const message = file.message(
        'Replace ' +
          quotation(actual, '`') +
          ' with ' +
          quotation(expected, '`'),
        {
          /* c8 ignore next -- hard to test */
          place: start && end ? {start, end} : undefined,
          ruleId: phrase.replace(/\s+/g, '-').toLowerCase(),
          source: 'retext-diacritics'
        }
      )

      message.actual = actual
      message.expected = [expected]
      message.url = 'https://github.com/retext/retext-diacritics#readme'
    })
  }
}
