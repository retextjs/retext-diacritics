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

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

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
import {readSync} from 'to-vfile'
import {reporter} from 'vfile-reporter'
import {unified} from 'unified'
import retextEnglish from 'retext-english'
import retextDiacritics from 'retext-diacritics'
import retextStringify from 'retext-stringify'

const file = readSync('example.txt')

unified()
  .use(retextEnglish)
  .use(retextDiacritics)
  .use(retextStringify)
  .process(file)
  .then((file) => {
    console.error(reporter(file))
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

This package exports no identifiers.
The default export is `retextDiacritics`.

### `unified().use(retextDiacritics[, options])`

Check for proper use of diacritics.

###### `options.ignore`

Phrases *not* to warn about (`Array.<string>`).

### Messages

The following [`VFileMessage`][message]s are used:

<!--messages start-->

| `source` | `ruleId` | Incorrect | Correct |
| - | - | - | - |
| `retext-diacritics` | `angstrom` | `Angstrom` | `Ångström` |
| `retext-diacritics` | `a-la-carte` | `a la carte` | `à la carte` |
| `retext-diacritics` | `a-la-mode` | `a la mode` | `à la mode` |
| `retext-diacritics` | `a-resume` | `a resume` | `a résumé` |
| `retext-diacritics` | `acai` | `acai` | `açaí` |
| `retext-diacritics` | `angstrom` | `angstrom` | `ångström` |
| `retext-diacritics` | `beau-ideal` | `beau ideal` | `beau idéal` |
| `retext-diacritics` | `beyonce` | `beyonce` | `beyoncé` |
| `retext-diacritics` | `boutonniere` | `boutonniere` | `boutonnière` |
| `retext-diacritics` | `bric-a-brac` | `bric-a-brac` | `bric-à-brac` |
| `retext-diacritics` | `bronte` | `bronte` | `brontë` |
| `retext-diacritics` | `cafe` | `cafe` | `café` |
| `retext-diacritics` | `cause-celebre` | `cause celebre` | `cause célèbre` |
| `retext-diacritics` | `champs-elysees` | `champs-elysees` | `champs-Élysées` |
| `retext-diacritics` | `chevre` | `chevre` | `chèvre` |
| `retext-diacritics` | `citroen` | `citroen` | `citroën` |
| `retext-diacritics` | `cliche` | `cliche` | `cliché` |
| `retext-diacritics` | `comme-ci-comme-ca` | `comme ci comme ca` | `comme ci comme ça` |
| `retext-diacritics` | `comsi-comsa` | `comsi comsa` | `comme ci comme ça` |
| `retext-diacritics` | `consomme` | `consomme` | `consommé` |
| `retext-diacritics` | `coup-d'etat` | `coup d'etat` | `coup d'état` |
| `retext-diacritics` | `coup-de-grace` | `coup de grace` | `coup de grâce` |
| `retext-diacritics` | `creme-brulee` | `creme brulee` | `crème brûlée` |
| `retext-diacritics` | `creme-de-menthe` | `creme de menthe` | `crème de menthe` |
| `retext-diacritics` | `creme-fraice` | `creme fraice` | `crème fraîche` |
| `retext-diacritics` | `creme-fresh` | `creme fresh` | `crème fraîche` |
| `retext-diacritics` | `crepe` | `crepe` | `crêpe` |
| `retext-diacritics` | `crudites` | `crudites` | `crudités` |
| `retext-diacritics` | `curacao` | `curacao` | `curaçao` |
| `retext-diacritics` | `debutante` | `debutante` | `débutante` |
| `retext-diacritics` | `decor` | `decor` | `décor` |
| `retext-diacritics` | `deja-vu` | `deja vu` | `déjà vu` |
| `retext-diacritics` | `denouement` | `denouement` | `dénouement` |
| `retext-diacritics` | `doppelganger` | `doppelganger` | `doppelgänger` |
| `retext-diacritics` | `el-nino` | `el nino` | `el niño` |
| `retext-diacritics` | `emigre` | `emigre` | `émigré` |
| `retext-diacritics` | `facade` | `facade` | `façade` |
| `retext-diacritics` | `fiance` | `fiance` | `fiancé` |
| `retext-diacritics` | `fiancee` | `fiancee` | `fiancée` |
| `retext-diacritics` | `filmjolk` | `filmjolk` | `filmjölk` |
| `retext-diacritics` | `flambe` | `flambe` | `flambé` |
| `retext-diacritics` | `fuhrer` | `fuhrer` | `führer` |
| `retext-diacritics` | `garcon` | `garcon` | `garçon` |
| `retext-diacritics` | `gewurztraminer` | `gewurztraminer` | `gewürztraminer` |
| `retext-diacritics` | `haagen-dazs` | `haagen dazs` | `häagen-dazs` |
| `retext-diacritics` | `haagen-dazs` | `haagen-dazs` | `häagen-dazs` |
| `retext-diacritics` | `her-resume` | `her resume` | `her résumé` |
| `retext-diacritics` | `his-resume` | `his resume` | `his résumé` |
| `retext-diacritics` | `jalapeno` | `jalapeno` | `jalapeño` |
| `retext-diacritics` | `la-nina` | `la nina` | `la niña` |
| `retext-diacritics` | `lowenbrau` | `lowenbrau` | `löwenbräu` |
| `retext-diacritics` | `lycee` | `lycee` | `lycée` |
| `retext-diacritics` | `maitre-d` | `maitre d` | `maître d` |
| `retext-diacritics` | `menage-a-trois` | `menage a trois` | `ménage à trois` |
| `retext-diacritics` | `monegasque` | `monegasque` | `monégasque` |
| `retext-diacritics` | `motley-crue` | `motley crue` | `mötley crüe` |
| `retext-diacritics` | `my-resume` | `my resume` | `my résumé` |
| `retext-diacritics` | `negligee` | `negligee` | `négligée` |
| `retext-diacritics` | `nescafe` | `nescafe` | `nescafé` |
| `retext-diacritics` | `paper-mache` | `paper mache` | `papier-mâché` |
| `retext-diacritics` | `paper-mache` | `paper-mache` | `papier-mâché` |
| `retext-diacritics` | `papier-mache` | `papier-mache` | `papier-mâché` |
| `retext-diacritics` | `pina-colada` | `pina colada` | `piña colada` |
| `retext-diacritics` | `protege` | `protege` | `protégé` |
| `retext-diacritics` | `protegee` | `protegee` | `protégée` |
| `retext-diacritics` | `puree` | `puree` | `purée` |
| `retext-diacritics` | `quebec` | `quebec` | `québec` |
| `retext-diacritics` | `quebecois` | `quebecois` | `québécois` |
| `retext-diacritics` | `queensryche` | `queensryche` | `Queensrÿche` |
| `retext-diacritics` | `raison-d'etre` | `raison d'etre` | `raison d'être` |
| `retext-diacritics` | `risque` | `risque` | `risqué` |
| `retext-diacritics` | `roue` | `roue` | `roué` |
| `retext-diacritics` | `senor` | `senor` | `señor` |
| `retext-diacritics` | `senora` | `senora` | `señora` |
| `retext-diacritics` | `senorita` | `senorita` | `señorita` |
| `retext-diacritics` | `skoda` | `skoda` | `Škoda` |
| `retext-diacritics` | `smorgasbord` | `smorgasbord` | `smörgåsbord` |
| `retext-diacritics` | `soiree` | `soiree` | `soirée` |
| `retext-diacritics` | `souffle` | `souffle` | `soufflé` |
| `retext-diacritics` | `soupcon` | `soupcon` | `soupçon` |
| `retext-diacritics` | `tete-a-tete` | `tete-a-tete` | `tête-à-tête` |
| `retext-diacritics` | `the-resume` | `the resume` | `the résumé` |
| `retext-diacritics` | `touche` | `touche` | `touché` |
| `retext-diacritics` | `ubermensch` | `ubermensch` | `Übermensch` |
| `retext-diacritics` | `vis-a-vis` | `vis-a-vis` | `vis-à-vis` |
| `retext-diacritics` | `voila` | `voila` | `voilà` |
| `retext-diacritics` | `your-resume` | `your resume` | `your résumé` |

<!--messages end-->

The offending value is stored at `message.actual`, and the suggested values are
stored at `message.expected`.

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

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/retextjs/retext-diacritics/workflows/main/badge.svg

[build]: https://github.com/retextjs/retext-diacritics/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext-diacritics.svg

[coverage]: https://codecov.io/github/retextjs/retext-diacritics

[downloads-badge]: https://img.shields.io/npm/dm/retext-diacritics.svg

[downloads]: https://www.npmjs.com/package/retext-diacritics

[size-badge]: https://img.shields.io/bundlephobia/minzip/retext-diacritics.svg

[size]: https://bundlephobia.com/result?p=retext-diacritics

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/retextjs/retext/discussions

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/retextjs/.github

[contributing]: https://github.com/retextjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/retextjs/.github/blob/HEAD/support.md

[coc]: https://github.com/retextjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[retext]: https://github.com/retextjs/retext

[message]: https://github.com/vfile/vfile-message
