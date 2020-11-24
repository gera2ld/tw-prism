const gulp = require('gulp');
const concat = require('gulp-concat');
const order = require('gulp-order');
const replace = require('gulp-replace');
const terser = require('gulp-terser-js');
const del = require('del');
const components = require('prismjs/components');
const pkg = require('./package.json');

const DIST = 'dist';
const languages = Object.keys(components.languages)
  .filter(key => key !== 'meta');
const keys = ['core'];
languages.forEach(addLanguage);
const orderKeys = keys.map(key => `**/prism-${key}.js`);

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
    'node_modules/prismjs/components/prism-*.js',
    '!node_modules/prismjs/components/prism-*.min.js',
  ])
    .pipe(order(orderKeys))
    .pipe(concat('prism.js', { newLine: ';' }))
    .pipe(terser())
    .pipe(gulp.dest(`${DIST}/files`));
}

function copy() {
  return gulp.src('src/**')
    .pipe(replace('process.env.VERSION', pkg.version))
    .pipe(gulp.dest(DIST));
}

function copyFiles() {
  return gulp.src('node_modules/prismjs/themes/prism-tomorrow.css')
    .pipe(gulp.dest(`${DIST}/files`));
}

exports.clean = clean;
exports.build = gulp.parallel(build, copy, copyFiles);
