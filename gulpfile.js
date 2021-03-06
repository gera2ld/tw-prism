const gulp = require('gulp');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
// const terser = require('gulp-terser-js');
const del = require('del');
const components = require('prismjs/components');
const pkg = require('./package.json');

const DIST = 'dist';
const DIST_PRISM = `${DIST}/gera2ld/prism`;
const THEME_CSS = 'prism-tomorrow.css';
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
  'powershell',
  'pug',
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

function addLanguage(key) {
  if (keys.includes(key)) return;
  let req = components.languages[key].require;
  if (typeof req === 'string') req = [req];
  if (req) req.forEach(addLanguage);
  keys.push(key);
}

function clean() {
  return del([DIST]);
}

function build() {
  return gulp.src([
    'node_modules/prismjs/components/prism-core.min.js',
    ...keys.map(key => `node_modules/prismjs/components/prism-${key}.min.js`),
  ])
    .pipe(concat('prism.js', { newLine: ';' }))
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
