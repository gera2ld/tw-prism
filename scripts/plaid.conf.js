const path = require('path');

exports.pages = {
  diy: {
    html: {
      title: 'PrismJS for TiddlyWiki',
      js: [
        {
          content: `var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?76a3135860c647b9dbd880a1ce22427a";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();`,
        },
      ],
    },
  },
};

exports.distDir = path.resolve('dist/data/output');
exports.hashedFilename = true;
