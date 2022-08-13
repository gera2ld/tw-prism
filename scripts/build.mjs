import { readFile, readdir, mkdir, writeFile, stat, copyFile } from 'fs/promises';
import path from 'path';
import { deleteAsync } from 'del';
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
  return deleteAsync([DIST]);
}

function loadPrismFile(file) {
  return readFile(`node_modules/prismjs/${file}`, 'utf8');
}

async function loadJSON(file) {
  return JSON.parse(await readFile(file, 'utf8'));
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
  const files = await readdir('node_modules/prismjs/themes');
  const themes = files.map(file => file.match(/^prism(?:-(\w+))?\.css|$/)[1]).filter(Boolean);
  return ['', ...themes];
});

const getAllPlugins = memoize(async () => {
  const pluginDir = 'node_modules/prismjs/plugins';
  const items = await readdir(pluginDir);
  return Promise.all(items.map(async item => {
    const [js, css] = await Promise.all([
      stat(`${pluginDir}/${item}/prism-${item}.js`).catch(() => {}),
      stat(`${pluginDir}/${item}/prism-${item}.css`).catch(() => {}),
    ]);
    return js && {
      name: item,
      css: !!css,
    };
  }));
});

const defaultPlugins = [
  'line-numbers',
  'line-highlight',
];

async function loadPluginFile(filename) {
  if (!filename.includes('.')) filename += '.tid';
  let text = await readFile(`src/plugin/${filename}`, 'utf8');
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
  const allPlugins = await getAllPlugins();
  const prismTiddlers = await buildPrism({
    prefix: PREFIX,
    languages,
    plugins: defaultPlugins.map(name => allPlugins.find(item => item.name === name)),
    theme: process.env.TW_PRISM_THEME || '',
    userAliases,
    loadPrismFile,
  });
  const files = getFiles({ pluginInfo, tiddlers: [...tiddlers, ...prismTiddlers] });
  for (const file of files) {
    const fullpath = path.join(DIST_PRISM, file.path);
    await mkdir(path.dirname(fullpath), { recursive: true });
    await writeFile(fullpath, file.text, 'utf8');
  }
}

async function createMeta() {
  const { pluginInfo, tiddlers } = await loadData();
  const themes = await getThemes();
  const prismPkg = await getPrismPkg();
  const allPlugins = await getAllPlugins();
  const meta = {
    pluginInfo,
    tiddlers,
    prismVersion: prismPkg.version,
    prefix: PREFIX,
    allLanguages,
    allPlugins,
    defaultLanguages,
    defaultPlugins,
    dependencies,
    themes,
    aliases,
    userAliases,
  };
  await writeFile('src/pages/meta.json', JSON.stringify(meta, null, 2));
}

function copyFixtures() {
  return copyDir('src/fixtures', DIST_DATA);
}

async function copyDir(src, dest) {
  const statRes = await stat(dest).catch(() => {});
  if (!statRes?.isDirectory()) {
    await mkdir(dest);
  }
  for (const item of await readdir(src)) {
    const fullsrc = path.join(src, item);
    const fulldest = path.join(dest, item);
    const statRes = await stat(fullsrc);
    if (statRes.isDirectory()) {
      await copyDir(fullsrc, fulldest);
    } else {
      await copyFile(fullsrc, fulldest);
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
  await createMeta();
  await build();
  await copyFixtures();
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
