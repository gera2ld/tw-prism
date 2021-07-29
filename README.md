# tw-prism

This is a [TiddlyWiki](https://tiddlywiki.com/) plugin for syntax highlight with [PrismJS](https://prismjs.com/).

## Why this?

There is an official tiddlywiki [plugin](https://github.com/Jermolene/TiddlyWiki5/tree/master/plugins/tiddlywiki/highlight) for syntax highlight but it is based on an old version of [highlight.js](https://github.com/isagalaev/highlight.js). It is not easy to update to a newer version or customize styles.

This plugin was created with automation in mind.

Dependencies like PrismJS are defined in package.json and can be easily updated to the latest version with the help of [npm-check-updates](https://github.com/raineorshine/npm-check-updates). Supported languages and additional aliases are defined in gulpfile.js.

## Installation

See <https://gera2ld.github.io/tw-prism/>.

## Build from source

You can edit definitions and rebuild the plugin by:

```bash
$ yarn build
```

The generated plugin can be found at `dist/gera2ld/prism`.

To visit the demo, open `dist/data/output/index.html`.
