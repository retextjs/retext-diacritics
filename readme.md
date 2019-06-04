# retext-diacritics

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**retext**][retext] plugin to check for proper use of diacritics.

## Install

[npm][]:

```sh
npm install retext-diacritics
```

## Use

Say we have the following file, `example.txt`:

```txt
Beyonce is the creme fresh on his resume.
```

…and our script, `example.js`, looks like this:

```js
var vfile = require('to-vfile')
var report = require('vfile-reporter')
var unified = require('unified')
var english = require('retext-english')
var stringify = require('retext-stringify')
var diacritics = require('retext-diacritics')

unified()
  .use(english)
  .use(diacritics)
  .use(stringify)
  .process(vfile.readSync('example.txt'), function(err, file) {
    console.error(report(err || file))
  })
```

Now, running `node example` yields:

```txt
example.txt
    1:1-1:8  warning  Replace `Beyonce` with `Beyoncé`            beyonce      retext-diacritics
  1:16-1:27  warning  Replace `creme fresh` with `crème fraîche`  creme-fresh  retext-diacritics
  1:31-1:41  warning  Replace `his resume` with `his résumé`      his-resume   retext-diacritics

⚠ 3 warnings
```

## API

### `retext().use(diacritics[, options])`

Check for proper use of diacritics.

###### `options.ignore`

Phrases *not* to warn about (`Array.<string>`).

## Related

*   [`retext-contractions`](https://github.com/retextjs/retext-contractions)
    — Check apostrophe use in contractions
*   [`retext-indefinite-article`](https://github.com/retextjs/retext-indefinite-article)
    — Check if indefinite articles (`a`, `an`) are used correctly
*   [`retext-redundant-acronyms`](https://github.com/retextjs/retext-redundant-acronyms)
    — Check for redundant acronyms (`ATM machine`)
*   [`retext-repeated-words`](https://github.com/retextjs/retext-repeated-words)
    — Check `for for` repeated words
*   [`retext-sentence-spacing`](https://github.com/retextjs/retext-sentence-spacing)
    — Check spacing (one or two spaces) between sentences
*   [`retext-quotes`](https://github.com/retextjs/retext-quotes)
    — Check quote and apostrophe usage

## Contribute

See [`contributing.md`][contributing] in [`retextjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [Code of Conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/retextjs/retext-diacritics.svg

[build]: https://travis-ci.org/retextjs/retext-diacritics

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext-diacritics.svg

[coverage]: https://codecov.io/github/retextjs/retext-diacritics

[downloads-badge]: https://img.shields.io/npm/dm/retext-diacritics.svg

[downloads]: https://www.npmjs.com/package/retext-diacritics

[size-badge]: https://img.shields.io/bundlephobia/minzip/retext-diacritics.svg

[size]: https://bundlephobia.com/result?p=retext-diacritics

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/retext

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/retextjs/.github

[contributing]: https://github.com/retextjs/.github/blob/master/contributing.md

[support]: https://github.com/retextjs/.github/blob/master/support.md

[coc]: https://github.com/retextjs/.github/blob/master/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[retext]: https://github.com/retextjs/retext
