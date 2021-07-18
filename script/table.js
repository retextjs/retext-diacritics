import {zone} from 'mdast-zone'
import {u} from 'unist-builder'
import {schema} from '../schema.js'

/** @type {import('unified').Plugin<[]>} */
export default function table() {
  return (tree) => {
    zone(tree, 'messages', (start, _, end) => {
      const rows = [
        u('tableRow', [
          u('tableCell', [u('inlineCode', 'source')]),
          u('tableCell', [u('inlineCode', 'ruleId')]),
          u('tableCell', [u('text', 'Incorrect')]),
          u('tableCell', [u('text', 'Correct')])
        ])
      ]

      const keys = Object.keys(schema).sort()
      let index = -1

      while (++index < keys.length) {
        const phrase = keys[index]
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
      }

      return [start, u('table', rows), end]
    })
  }
}
