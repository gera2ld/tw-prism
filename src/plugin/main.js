/*\
title: process.env.PREFIX/main.js
type: application/javascript
module-type: widget

Wraps up the fenced code blocks parser for highlight and use in TiddlyWiki5

\*/
const Prism = require('$:/plugins/gera2ld/prism/prism.js');
const CodeBlockWidget = require('$:/core/modules/widgets/codeblock.js').codeblock;

CodeBlockWidget.prototype.postRender = function postRender() {
  const domNode = this.domNodes[0];
  const { language } = this;
  // Make sure a `language-` class name is added so that the codeblocks will have the same appearance
  // Enable line-numbers by default
  domNode.className = `language-${(language || '').toLowerCase()} line-numbers`;
  if (language && Prism.languages[language]) {
    if ($tw.browser && !domNode.isTiddlyWikiFakeDom) {
      const code = domNode.querySelector('code');
      let config;
      const text = code.textContent;
      const i = text.indexOf('\n');
      if (i > 0 && text[i + 1] === '\n') {
        const firstRow = text.slice(0, i);
        const matches = firstRow.match(/\bprism: (\{.*\})/);
        try {
          config = matches && JSON.parse(matches[1]);
        } catch {
          // noop
        }
        if (config) code.textContent = text.slice(i + 2);
      }
      if (config) {
        Object.entries(config).forEach(([key, value]) => {
          if (['class', 'className'].includes(key)) {
            value.split(' ').filter(Boolean).forEach(item => {
              if (item.startsWith('!')) {
                domNode.classList.remove(item.slice(1));
              } else {
                domNode.classList.add(item);
              }
              });
          } else {
            if (key === 'line') key = 'data-line';
            domNode.setAttribute(key, value);
          }
        });
      }
      Prism.highlightElement(code);
    } else {
      const text = domNode.textContent;
      domNode.children[0].innerHTML = Prism.highlight(text, Prism.languages[language], language);
      // If we're using the fakedom then specially save the original raw text
      if (domNode.isTiddlyWikiFakeDom) {
        domNode.children[0].textInnerHTML = text;
      }
    }
  }
};
