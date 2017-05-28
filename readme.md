# retext-diacritics [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Check for proper use of diacritics with [**retext**][retext].

## Installation

[npm][]:

```bash
npm install retext-diacritics
```

## Usage

```js
var retext = require('retext');
var diacritics = require('retext-diacritics');
var report = require('vfile-reporter');

retext()
  .use(diacritics)
  .process('Beyonce is the creme fresh on his resume.', function (err, file) {
    console.error(report(err || file));
  });
```

Yields:

```txt
    1:1-1:8  warning  Replace `Beyonce` with `Beyoncé`            beyonce      retext-diacritics
  1:16-1:27  warning  Replace `creme fresh` with `crème fraîche`  creme-fresh  retext-diacritics
  1:31-1:41  warning  Replace `his resume` with `his résumé`      his-resume   retext-diacritics

⚠ 3 warnings
```

## API

### `retext().use(diacritics)`

Check for proper use of diacritics.

###### `options`

*   `ignore` (`Array.<string>`) — phrases _not_ to warn about.

## Related

*   [`retext-contractions`](https://github.com/wooorm/retext-contractions)
    — Check apostrophe use in contractions
*   [`retext-indefinite-article`](https://github.com/wooorm/retext-indefinite-article)
    — Check if indefinite articles (`a`, `an`) are used correctly
*   [`retext-redundant-acronyms`](https://github.com/wooorm/retext-redundant-acronyms)
    — Check for redundant acronyms (`ATM machine`)
*   [`retext-repeated-words`](https://github.com/wooorm/retext-repeated-words)
    — Check `for for` repeated words
*   [`retext-sentence-spacing`](https://github.com/wooorm/retext-sentence-spacing)
    — Check spacing (one or two spaces) between sentences
*   [`retext-quotes`](https://github.com/wooorm/retext-quotes)
    — Check quote and apostrophe usage

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/retext-diacritics.svg

[travis]: https://travis-ci.org/wooorm/retext-diacritics

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/retext-diacritics.svg

[codecov]: https://codecov.io/github/wooorm/retext-diacritics

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[retext]: https://github.com/wooorm/retext
