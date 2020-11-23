/*\
title: $:/plugins/gera2ld/prism/main.js
type: application/javascript
module-type: widget

Wraps up the fenced code blocks parser for highlight and use in TiddlyWiki5

\*/
const Prism = require('$:/plugins/gera2ld/prism/prism.js');
const CodeBlockWidget = require('$:/core/modules/widgets/codeblock.js').codeblock;

CodeBlockWidget.prototype.postRender = function postRender() {
  const domNode = this.domNodes[0];
  const { language } = this;
  if (language && Prism.languages[language]) {
    domNode.className = `language-${language.toLowerCase()}`;
    if ($tw.browser && !domNode.isTiddlyWikiFakeDom) {
      Prism.highlightElement(domNode);
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
