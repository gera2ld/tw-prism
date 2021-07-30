export function buildPluginUrl({ pluginInfo, tiddlers, prismTiddlers }) {
  const tiddlerMap = [...tiddlers, ...prismTiddlers].reduce((r, t) => ({
    ...r,
    [t.title]: t,
  }), {});
  const jsonData = {
    ...pluginInfo,
    text: JSON.stringify({ tiddlers: tiddlerMap }),
  };
  return 'data:text/vnd.tiddler,' + encodeURIComponent(JSON.stringify(jsonData));
}

export async function buildPrism({
  prefix,
  languages,
  theme,
  aliases,
  loadPrismComponent,
  loadPrismCss,
}) {
  const unresolved = Object.keys(aliases).find(key => !languages.includes(key));
  if (unresolved) {
    throw new Error(`Language not found: ${unresolved}`);
  }
  const footer = `(${aliases => Object.entries(aliases).forEach(([k, v]) => v.forEach(a => {
    Prism.languages[a] = Prism.languages[k];
  }))})(${JSON.stringify(aliases)});module.exports=Prism`;
  const [chunks, css] = await Promise.all([
    Promise.all(['core', ...languages].map(loadPrismComponent)),
    loadPrismCss(theme),
  ]);
  const js = [...chunks, footer].join(';\n');
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
    const filename = tiddler.title.split('/').pop();
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
