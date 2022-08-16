const path = require('path');

exports.pages = {
  diy: {
    html: {
      title: 'PrismJS for TiddlyWiki',
      js: [
        {
          defer: true,
          src: 'https://pl.gerald.win/js/script.js',
          'data-domain': 'gera2ld.github.io',
        },
      ],
    },
  },
};

exports.distDir = path.resolve('dist/data/output');
exports.hashedFilename = true;
exports.devServer = {
  client: {
    overlay: {
      warnings: false,
      errors: true
    },
  },
};
