# retext-diacritics [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Check for proper use of diacritics with [**retext**][retext].

## Installation

[npm][]:

```bash
npm install retext-diacritics
```

## Usage

Say we have the following file, `example.txt`:

```text
Beyonce is the creme fresh on his resume.
```

And our script, `example.js`, looks like this:

```javascript
var vfile = require('to-vfile');
var report = require('vfile-reporter');
var unified = require('unified');
var english = require('retext-english');
var stringify = require('retext-stringify');
var diacritics = require('retext-diacritics');

unified()
  .use(english)
  .use(diacritics)
  .use(stringify)
  .process(vfile.readSync('example.txt'), function (err, file) {
    console.error(report(err || file));
  });
```

Now, running `node example` yields:

```text
example.txt
    1:1-1:8  warning  Replace `Beyonce` with `Beyoncé`            beyonce      retext-diacritics
  1:16-1:27  warning  Replace `creme fresh` with `crème fraîche`  creme-fresh  retext-diacritics
  1:31-1:41  warning  Replace `his resume` with `his résumé`      his-resume   retext-diacritics

⚠ 3 warnings
```

## API

### `retext().use(diacritics)`

Check for proper use of diacritics.

##### `options`

###### `options.ignore`

`Array.<string>` — phrases _not_ to warn about.

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

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/retextjs/retext-diacritics.svg

[travis]: https://travis-ci.org/retextjs/retext-diacritics

[codecov-badge]: https://img.shields.io/codecov/c/github/retextjs/retext-diacritics.svg

[codecov]: https://codecov.io/github/retextjs/retext-diacritics

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[retext]: https://github.com/retextjs/retext
