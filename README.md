# tw-prism

![](https://img.shields.io/github/package-json/v/gera2ld/tw-prism)

This is a [TiddlyWiki](https://tiddlywiki.com/) plugin for syntax highlight with [PrismJS](https://prismjs.com/).

Demo: <https://gera2ld.github.io/tw-prism/>.

## Why this?

There is an official tiddlywiki [plugin](https://github.com/Jermolene/TiddlyWiki5/tree/master/plugins/tiddlywiki/highlight) for syntax highlight but it is based on an old version of [highlight.js](https://github.com/isagalaev/highlight.js). It is not easy to update to a newer version or customize styles.

This plugin was created with automation in mind.

Dependencies like PrismJS are defined in package.json and can be easily updated to the latest version with the help of [npm-check-updates](https://github.com/raineorshine/npm-check-updates). Supported languages and additional aliases are defined in `scripts/build.mjs`.

A dedicated tool for customization is coming soon. You will be able to pick the languages you like and your favorite theme there.

## Installation

See <https://gera2ld.github.io/tw-prism/>.

## Building from source

You can edit definitions and rebuild the plugin by:

```bash
$ yarn build
```

The generated plugin can be found at `dist/gera2ld/prism`.

To visit the demo, open `dist/data/output/index.html`.
