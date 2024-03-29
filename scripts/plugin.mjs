export function buildPluginUrl({ pluginInfo, tiddlers, prismTiddlers }) {
  const tiddlerMap = [...tiddlers, ...prismTiddlers].reduce((r, t) => ({
    ...r,
    [t.title]: t,
  }), {});
  const jsonData = {
    ...pluginInfo,
    type: 'application/json',
    text: JSON.stringify({ tiddlers: tiddlerMap }),
  };
  return 'data:text/vnd.tiddler,' + encodeURIComponent(JSON.stringify(jsonData));
}

function buildPrismJs(loadPrismFile, minified) {
  return async (languages, plugins) => {
    const files = [
      'components/prism-core',
      ...languages.map(lang => `components/prism-${lang}`),
      ...plugins.map(plugin => `plugins/${plugin}/prism-${plugin}`),
    ].map(file => `${file}${minified ? '.min' : ''}.js`);
    const chunks = await Promise.all(files.map(loadPrismFile));
    return [
      ...chunks,
      'Prism.manual = true',
    ];
  };
}

function buildPrismCss(loadPrismFile, minified) {
  return async (theme, plugins) => {
    const files = [
      `themes/prism${theme ? '-' + theme : ''}`,
      ...plugins.map(plugin => `plugins/${plugin}/prism-${plugin}`),
    ].map(file => `${file}${minified ? '.min' : ''}.css`);
    const chunks = await Promise.all(files.map(loadPrismFile));
    return chunks;
  };
}

export async function buildPrism({
  prefix,
  languages,
  plugins,
  theme,
  minified,
  userAliases,
  loadPrismFile,
}) {
  const unresolved = Object.keys(userAliases).find(key => !languages.includes(key));
  if (unresolved) {
    throw new Error(`Language not found: ${unresolved}`);
  }
  const footer = `(${aliases => Object.entries(aliases).forEach(([k, v]) => v.forEach(a => {
    Prism.languages[a] = Prism.languages[k];
  }))})(${JSON.stringify(userAliases)});module.exports=Prism`;
  const [chunks, cssList] = await Promise.all([
    buildPrismJs(loadPrismFile, minified)(languages, plugins.map(({ name }) => name)),
    buildPrismCss(loadPrismFile, minified)(theme, plugins.filter(({ css }) => css).map(({ name }) => name)),
  ]);
  const js = [...chunks, footer].join(';\n');
  const css = cssList.join('\n');
  return [
    {
      title: prefix + '/prism.js',
      type: 'application/javascript',
      'module-type': 'library',
      text: js,
    },
    {
      title: prefix + '/prism.css',
      tags: '[[$:/tags/Stylesheet]]',
      type: 'text/css',
      text: css,
    },
  ];
}

export function getFiles({ pluginInfo, tiddlers }) {
  const files = [
    {
      path: 'plugin.info',
      text: JSON.stringify(pluginInfo, null, 2),
    },
  ];
  const fileMeta = { tiddlers: [] };
  for (const tiddler of tiddlers) {
    let filename = tiddler.title.split('/').pop();
    if (!filename.includes('.')) filename += '.tid';
    if (!tiddler.type || tiddler['module-type'] === 'widget') {
      files.push({
        path: filename,
        text: tiddler.text,
      });
    } else {
      files.push({
        path: 'files/' + filename,
        text: tiddler.text,
      });
      fileMeta.tiddlers.push({
        file: filename,
        fields: omit(tiddler, ['text']),
      });
    }
  }
  files.push({
    path: 'files/tiddlywiki.files',
    text: JSON.stringify(fileMeta, null, 2),
  });
  return files;
}

function omit(obj, keys) {
  return Object.keys(obj).reduce((r, k) => {
    if (!keys.includes(k)) r[k] = obj[k];
    return r;
  }, {});
}

function resolveLanguage(lang, dependencies, resolved) {
  const result = [];
  if (!resolved.has(lang)) {
    dependencies[lang]?.forEach(dep => {
      result.push(...resolveLanguage(dep, dependencies, resolved));
    });
    resolved.add(lang);
    result.push(lang);
  }
  return result;
}

export function resolveLanguages(languages, dependencies) {
  const result = [];
  const resolved = new Set();
  for (const lang of languages) {
    result.push(...resolveLanguage(lang, dependencies, resolved));
  }
  return result;
}
