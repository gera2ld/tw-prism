const gulp = require('gulp');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
// const terser = require('gulp-terser-js');
const through = require('through2');
const del = require('del');
const components = require('prismjs/components');
const pkg = require('./package.json');

const DIST = 'dist';
const DIST_PRISM = `${DIST}/gera2ld/prism`;
const THEME_CSS = 'prism-tomorrow.css';
const isProd = true;
// const isProd = process.env.NODE_ENV === 'production';
// const languages = Object.keys(components.languages).filter(key => key !== 'meta');
const keys = [];
[
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
].forEach(addLanguage);

const aliases = {
  bash: ['sh'],
};

const aliasCode = `;(${aliases => Object.entries(aliases).forEach(([k, v]) => v.forEach(a => {
  Prism.languages[a] = Prism.languages[k];
}))})(${JSON.stringify(aliases)})`;

function addLanguage(key) {
  if (keys.includes(key)) return;
  let req = components.languages[key].require;
  if (typeof req === 'string') req = [req];
  if (req) req.forEach(addLanguage);
  keys.push(key);
}

function appendText(text) {
  return through.obj(function (file, _, cb) {
    if (file.isBuffer()) {
      const content = file.contents.toString() + text;
      file.contents = Buffer.from(content);
    }
    cb(null, file);
  });
}

function clean() {
  return del([DIST]);
}

function build() {
  return gulp.src([
    `node_modules/prismjs/components/prism-core${isProd ? '.min' : ''}.js`,
    ...keys.map(key => `node_modules/prismjs/components/prism-${key}${isProd ? '.min' : ''}.js`),
  ])
    .pipe(concat('prism.js', { newLine: ';' }))
    .pipe(appendText(aliasCode))
    // .pipe(terser())
    .pipe(gulp.dest(`${DIST_PRISM}/files`));
}

const values = {
  VERSION: pkg.version,
  THEME_CSS,
};

function copy() {
  return gulp.src('src/**')
    .pipe(replace(/process.env.(\w+)/g, (m, g) => values[g] || m))
    .pipe(gulp.dest(DIST_PRISM));
}

function copyFixtures() {
  return gulp.src('fixtures/**')
    .pipe(gulp.dest(`${DIST}/data`));
}

function copyFiles() {
  return gulp.src(`node_modules/prismjs/themes/${THEME_CSS}`)
    .pipe(gulp.dest(`${DIST_PRISM}/files`));
}

exports.clean = clean;
exports.build = gulp.parallel(build, copy, copyFixtures, copyFiles);
