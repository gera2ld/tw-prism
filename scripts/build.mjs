import fsPromises from 'fs/promises';
import path from 'path';
import del from 'del';
import components from 'prismjs/components.js';
import { buildPrism, getFiles, resolveLanguages } from './plugin.mjs';

const PREFIX = '$:/plugins/gera2ld/prism';
const DIST = 'dist';
const DIST_PRISM = `${DIST}/gera2ld/prism`;
const DIST_DATA = `${DIST}/data`;
const allLanguages = Object.keys(components.languages).filter(key => key !== 'meta').sort();
const dependencies = {};
const aliases = {};
Object.entries(components.languages).forEach(([key, value]) => {
  const r = ensureArray(value.require);
  if (r.length) dependencies[key] = r;
  const a = ensureArray(value.alias);
  if (a.length) aliases[key] = a;
});
const isProd = false;
// const isProd = process.env.NODE_ENV === 'production';
const defaultLanguages = [
  'markup',
  'css',
  'clike',
  'javascript',
  'apacheconf',
  'bash',
  'batch',
  'brainfuck',
  'c',
  'csharp',
  'cpp',
  'cmake',
  'coffeescript',
  'css-extras',
  'diff',
  'dns-zone-file',
  'docker',
  'editorconfig',
  'ejs',
  'git',
  'glsl',
  'go',
  'graphql',
  'handlebars',
  'haxe',
  'http',
  'icon',
  'ignore',
  'ini',
  'jq',
  'jsdoc',
  'js-extras',
  'json',
  'json5',
  'jsonp',
  'jsstacktrace',
  'js-templates',
  'kotlin',
  'latex',
  'less',
  'lua',
  'makefile',
  'markdown',
  'markup-templating',
  'matlab',
  'mongodb',
  'nginx',
  'ocaml',
  'php',
  'powershell',
  'python',
  'jsx',
  'tsx',
  'regex',
  'rust',
  'sql',
  'toml',
  'typescript',
  'vim',
  'wasm',
  'yaml',
];
const languages = resolveLanguages(defaultLanguages, dependencies);

const userAliases = {
  bash: ['sh'],
};

function clean() {
  return del([DIST]);
}

async function loadPrismComponent(name) {
  return fsPromises.readFile(`node_modules/prismjs/components/prism-${name}${isProd ? '.min' : ''}.js`, 'utf8');
}

async function loadPrismCss(name) {
  const filename = name ? `prism-${name}.css` : 'prism.css';
  return fsPromises.readFile(`node_modules/prismjs/themes/${filename}`, 'utf8');
}

async function loadJSON(file) {
  return JSON.parse(await fsPromises.readFile(file, 'utf8'));
}

const getPkg = memoize(async () => loadJSON('package.json'));
const getPrismPkg = memoize(async () => loadJSON('node_modules/prismjs/package.json'));
const getValues = memoize(async () => {
  const pkg = await getPkg();
  return {
    VERSION: pkg.version,
    PREFIX,
  };
});
const getThemes = memoize(async () => {
  const files = await fsPromises.readdir('node_modules/prismjs/themes');
  const themes = files.map(file => file.replace(/^prism(?:-(\w+))?\.css$/, (m, g) => m && (g || ''))).filter(v => v != null);
  return themes;
});

async function loadPluginFile(filename) {
  if (!filename.includes('.')) filename += '.tid';
  let text = await fsPromises.readFile(`src/plugin/${filename}`, 'utf8');
  const values = await getValues();
  text = text.replace(/process\.env\.(\w+)/g, (m, g) => values[g] || m);
  return text;
}

async function loadTiddler(filename) {
  const text = await loadPluginFile(filename);
  const tiddler = {
    title: `${PREFIX}/${filename}`,
    text,
  };
  if (filename.endsWith('.js')) {
    tiddler.type = 'application/javascript';
    tiddler['module-type'] = 'widget';
  }
  return tiddler;
}

async function loadData() {
  const pluginInfo = JSON.parse(await loadPluginFile('plugin.info'));
  const tiddlers = await Promise.all(['main.js', 'readme'].map(loadTiddler));
  return { pluginInfo, tiddlers };
}

async function build() {
  const { pluginInfo, tiddlers } = await loadData();
  const prismTiddlers = await buildPrism({
    prefix: PREFIX,
    languages,
    theme: process.env.TW_PRISM_THEME || '',
    userAliases,
    loadPrismComponent,
    loadPrismCss,
  });
  const files = getFiles({ pluginInfo, tiddlers: [...tiddlers, ...prismTiddlers] });
  for (const file of files) {
    const fullpath = path.join(DIST_PRISM, file.path);
    await fsPromises.mkdir(path.dirname(fullpath), { recursive: true });
    await fsPromises.writeFile(fullpath, file.text, 'utf8');
  }
}

async function createMeta() {
  const { pluginInfo, tiddlers } = await loadData();
  const themes = await getThemes();
  const prismPkg = await getPrismPkg();
  const meta = {
    pluginInfo,
    tiddlers,
    prismVersion: prismPkg.version,
    prefix: PREFIX,
    allLanguages,
    defaultLanguages,
    dependencies,
    themes,
    aliases,
    userAliases,
  };
  await fsPromises.writeFile('src/pages/meta.json', JSON.stringify(meta, null, 2));
}

function copyFixtures() {
  return copyDir('src/fixtures', DIST_DATA);
}

async function copyDir(src, dest) {
  const stat = await fsPromises.stat(dest).catch(() => {});
  if (!stat?.isDirectory()) {
    await fsPromises.mkdir(dest);
  }
  for (const item of await fsPromises.readdir(src)) {
    const fullsrc = path.join(src, item);
    const fulldest = path.join(dest, item);
    const stat = await fsPromises.stat(fullsrc);
    if (stat.isDirectory()) {
      await copyDir(fullsrc, fulldest);
    } else {
      await fsPromises.copyFile(fullsrc, fulldest);
    }
  }
}

function memoize(fn) {
  let cache;
  return function memoized(...args) {
    if (!cache) {
      cache = { result: fn(...args) };
    }
    return cache.result;
  };
}

function ensureArray(data) {
  return typeof data === 'string' ? [data] : data || [];
}

async function main() {
  await clean();
  await build();
  await copyFixtures();
  await createMeta();
}

main();
