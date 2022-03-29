"use strict";(self.webpackChunktw_prism=self.webpackChunktw_prism||[]).push([[951],{535:(e,t,s)=>{var i=s(546);function a(e,t,s){const i=[];return s.has(e)||(t[e]?.forEach((e=>{i.push(...a(e,t,s))})),s.add(e),i.push(e)),i}function r(e,t){const s=[],i=new Set;for(const r of e)s.push(...a(r,t,i));return s}const l=JSON.parse('{"pluginInfo":{"title":"$:/plugins/gera2ld/prism","name":"Prism","description":"Syntax highlight with PrismJS","author":"Gerald <gera2ld@live.com>","version":"0.1.0","core-version":">=5.0.8","source":"https://github.com/gera2ld/tw-prism","plugin-type":"plugin","list":"readme"},"tiddlers":[{"title":"$:/plugins/gera2ld/prism/main.js","text":"/*\\\\\\ntitle: $:/plugins/gera2ld/prism/main.js\\ntype: application/javascript\\nmodule-type: widget\\n\\nWraps up the fenced code blocks parser for highlight and use in TiddlyWiki5\\n\\n\\\\*/\\nconst Prism = require(\'$:/plugins/gera2ld/prism/prism.js\');\\nconst CodeBlockWidget = require(\'$:/core/modules/widgets/codeblock.js\').codeblock;\\n\\nCodeBlockWidget.prototype.postRender = function postRender() {\\n  const domNode = this.domNodes[0];\\n  const { language } = this;\\n  // Make sure a `language-` class name is added so that the codeblocks will have the same appearance\\n  domNode.className = `language-${(language || \'\').toLowerCase()}`;\\n  if (language && Prism.languages[language]) {\\n    if ($tw.browser && !domNode.isTiddlyWikiFakeDom) {\\n      Prism.highlightElement(domNode);\\n    } else {\\n      const text = domNode.textContent;\\n      domNode.children[0].innerHTML = Prism.highlight(text, Prism.languages[language], language);\\n      // If we\'re using the fakedom then specially save the original raw text\\n      if (domNode.isTiddlyWikiFakeDom) {\\n        domNode.children[0].textInnerHTML = text;\\n      }\\n    }\\n  }\\n};\\n","type":"application/javascript","module-type":"widget"},{"title":"$:/plugins/gera2ld/prism/readme","text":"title: $:/plugins/gera2ld/prism/readme\\n\\nThis is a TiddlyWiki plugin for syntax highlight with PrismJS.\\n\\nMake sure [[$:/plugins/tiddlywiki/highlight]] is disabled, otherwise this plugin may not work.\\n\\n[[Source code|https://github.com/gera2ld/tw-prism]]\\n"}],"prismVersion":"1.27.0","prefix":"$:/plugins/gera2ld/prism","allLanguages":["abap","abnf","actionscript","ada","agda","al","antlr4","apacheconf","apex","apl","applescript","aql","arduino","arff","asciidoc","asm6502","asmatmel","aspnet","autohotkey","autoit","avisynth","avro-idl","bash","basic","batch","bbcode","bicep","birb","bison","bnf","brainfuck","brightscript","bro","bsl","c","cfscript","chaiscript","cil","clike","clojure","cmake","cobol","coffeescript","concurnas","coq","cpp","crystal","csharp","cshtml","csp","css","css-extras","csv","cypher","d","dart","dataweave","dax","dhall","diff","django","dns-zone-file","docker","dot","ebnf","editorconfig","eiffel","ejs","elixir","elm","erb","erlang","etlua","excel-formula","factor","false","firestore-security-rules","flow","fortran","fsharp","ftl","gap","gcode","gdscript","gedcom","gherkin","git","glsl","gml","gn","go","go-module","graphql","groovy","haml","handlebars","haskell","haxe","hcl","hlsl","hoon","hpkp","hsts","http","ichigojam","icon","icu-message-format","idris","iecst","ignore","inform7","ini","io","j","java","javadoc","javadoclike","javascript","javastacktrace","jexl","jolie","jq","js-extras","js-templates","jsdoc","json","json5","jsonp","jsstacktrace","jsx","julia","keepalived","keyman","kotlin","kumir","kusto","latex","latte","less","lilypond","liquid","lisp","livescript","llvm","log","lolcode","lua","magma","makefile","markdown","markup","markup-templating","matlab","maxscript","mel","mermaid","mizar","mongodb","monkey","moonscript","n1ql","n4js","nand2tetris-hdl","naniscript","nasm","neon","nevod","nginx","nim","nix","nsis","objectivec","ocaml","opencl","openqasm","oz","parigp","parser","pascal","pascaligo","pcaxis","peoplecode","perl","php","php-extras","phpdoc","plsql","powerquery","powershell","processing","prolog","promql","properties","protobuf","psl","pug","puppet","pure","purebasic","purescript","python","q","qml","qore","qsharp","r","racket","reason","regex","rego","renpy","rest","rip","roboconf","robotframework","ruby","rust","sas","sass","scala","scheme","scss","shell-session","smali","smalltalk","smarty","sml","solidity","solution-file","soy","sparql","splunk-spl","sqf","sql","squirrel","stan","stylus","swift","systemd","t4-cs","t4-templating","t4-vb","tap","tcl","textile","toml","tremor","tsx","tt2","turtle","twig","typescript","typoscript","unrealscript","uorazor","uri","v","vala","vbnet","velocity","verilog","vhdl","vim","visual-basic","warpscript","wasm","web-idl","wiki","wolfram","wren","xeora","xml-doc","xojo","xquery","yaml","yang","zig"],"defaultLanguages":["markup","css","clike","javascript","apacheconf","bash","batch","brainfuck","c","csharp","cpp","cmake","coffeescript","css-extras","diff","dns-zone-file","docker","editorconfig","ejs","git","glsl","go","graphql","handlebars","haxe","http","icon","ignore","ini","jq","jsdoc","js-extras","json","json5","jsonp","jsstacktrace","js-templates","kotlin","latex","less","lua","makefile","markdown","markup-templating","matlab","mongodb","nginx","ocaml","php","powershell","python","jsx","tsx","regex","rust","sql","toml","typescript","vim","wasm","yaml"],"dependencies":{"javascript":["clike"],"actionscript":["javascript"],"apex":["clike","sql"],"arduino":["cpp"],"aspnet":["markup","csharp"],"birb":["clike"],"bison":["c"],"c":["clike"],"csharp":["clike"],"cpp":["c"],"cfscript":["clike"],"chaiscript":["clike","cpp"],"coffeescript":["javascript"],"crystal":["ruby"],"css-extras":["css"],"d":["clike"],"dart":["clike"],"django":["markup-templating"],"ejs":["javascript","markup-templating"],"etlua":["lua","markup-templating"],"erb":["ruby","markup-templating"],"fsharp":["clike"],"firestore-security-rules":["clike"],"flow":["javascript"],"ftl":["markup-templating"],"gml":["clike"],"glsl":["c"],"go":["clike"],"groovy":["clike"],"haml":["ruby"],"handlebars":["markup-templating"],"haxe":["clike"],"hlsl":["c"],"idris":["haskell"],"java":["clike"],"javadoc":["markup","java","javadoclike"],"jolie":["clike"],"jsdoc":["javascript","javadoclike","typescript"],"js-extras":["javascript"],"json5":["json"],"jsonp":["json"],"js-templates":["javascript"],"kotlin":["clike"],"latte":["clike","markup-templating","php"],"less":["css"],"lilypond":["scheme"],"liquid":["markup-templating"],"markdown":["markup"],"markup-templating":["markup"],"mongodb":["javascript"],"n4js":["javascript"],"objectivec":["c"],"opencl":["c"],"parser":["markup"],"php":["markup-templating"],"phpdoc":["php","javadoclike"],"php-extras":["php"],"plsql":["sql"],"processing":["clike"],"protobuf":["clike"],"pug":["markup","javascript"],"purebasic":["clike"],"purescript":["haskell"],"qsharp":["clike"],"qml":["javascript"],"qore":["clike"],"racket":["scheme"],"cshtml":["markup","csharp"],"jsx":["markup","javascript"],"tsx":["jsx","typescript"],"reason":["clike"],"ruby":["clike"],"sass":["css"],"scss":["css"],"scala":["java"],"shell-session":["bash"],"smarty":["markup-templating"],"solidity":["clike"],"soy":["markup-templating"],"sparql":["turtle"],"sqf":["clike"],"squirrel":["clike"],"t4-cs":["t4-templating","csharp"],"t4-vb":["t4-templating","vbnet"],"tap":["yaml"],"tt2":["clike","markup-templating"],"textile":["markup"],"twig":["markup-templating"],"typescript":["javascript"],"v":["clike"],"vala":["clike"],"vbnet":["basic"],"velocity":["markup"],"wiki":["markup"],"xeora":["markup"],"xml-doc":["markup"],"xquery":["markup"]},"themes":["coy","prism-coy.min.css","dark","prism-dark.min.css","funky","prism-funky.min.css","okaidia","prism-okaidia.min.css","solarizedlight","prism-solarizedlight.min.css","tomorrow","prism-tomorrow.min.css","twilight","prism-twilight.min.css","","prism.min.css"],"aliases":{"markup":["html","xml","svg","mathml","ssml","atom","rss"],"javascript":["js"],"antlr4":["g4"],"arduino":["ino"],"asciidoc":["adoc"],"avisynth":["avs"],"avro-idl":["avdl"],"bash":["shell"],"bbcode":["shortcode"],"bnf":["rbnf"],"bsl":["oscript"],"csharp":["cs","dotnet"],"cfscript":["cfc"],"coffeescript":["coffee"],"concurnas":["conc"],"django":["jinja2"],"dns-zone-file":["dns-zone"],"docker":["dockerfile"],"dot":["gv"],"ejs":["eta"],"excel-formula":["xlsx","xls"],"gml":["gamemakerlanguage"],"gn":["gni"],"go-module":["go-mod"],"handlebars":["hbs"],"haskell":["hs"],"idris":["idr"],"ignore":["gitignore","hgignore","npmignore"],"json":["webmanifest"],"kotlin":["kt","kts"],"kumir":["kum"],"latex":["tex","context"],"lilypond":["ly"],"lisp":["emacs","elisp","emacs-lisp"],"markdown":["md"],"moonscript":["moon"],"n4js":["n4jsd"],"naniscript":["nani"],"objectivec":["objc"],"openqasm":["qasm"],"pascal":["objectpascal"],"pcaxis":["px"],"peoplecode":["pcode"],"powerquery":["pq","mscript"],"purebasic":["pbfasm"],"purescript":["purs"],"python":["py"],"qsharp":["qs"],"racket":["rkt"],"cshtml":["razor"],"renpy":["rpy"],"robotframework":["robot"],"ruby":["rb"],"shell-session":["sh-session","shellsession"],"sml":["smlnj"],"solidity":["sol"],"solution-file":["sln"],"sparql":["rq"],"t4-cs":["t4"],"tremor":["trickle","troy"],"turtle":["trig"],"typescript":["ts"],"typoscript":["tsconfig"],"unrealscript":["uscript","uc"],"uri":["url"],"visual-basic":["vb","vba"],"web-idl":["webidl"],"wolfram":["mathematica","nb","wl"],"xeora":["xeoracube"],"yaml":["yml"]},"userAliases":{"bash":["sh"]}}');function n(e,t,s){const i=e.slice();return i[22]=t[s],i[23]=t,i[24]=s,i}function o(e,t,s){const i=e.slice();return i[25]=t[s],i}function c(e){let t,s,a,r=(e[25]||"default")+"";return{c(){t=(0,i.bGB)("option"),s=(0,i.fLW)(r),t.__value=a=e[25],t.value=t.__value},m(e,a){(0,i.$Tr)(e,t,a),(0,i.R3I)(t,s)},p:i.ZTd,d(e){e&&(0,i.ogt)(t)}}}function p(e){let t;return{c(){t=(0,i.fLW)("\u2705")},m(e,s){(0,i.$Tr)(e,t,s)},d(e){e&&(0,i.ogt)(t)}}}function m(e){let t,s,a,r,l,n,o=e[8].length+"";return{c(){t=(0,i.fLW)(", "),s=(0,i.bGB)("a"),a=(0,i.fLW)(o),r=(0,i.fLW)(" more"),n=(0,i.fLW)(" will be included as dependencies"),(0,i.Ljt)(s,"href","#"),(0,i.Ljt)(s,"title",l=e[8].join(", "))},m(e,l){(0,i.$Tr)(e,t,l),(0,i.$Tr)(e,s,l),(0,i.R3I)(s,a),(0,i.R3I)(s,r),(0,i.$Tr)(e,n,l)},p(e,t){256&t&&o!==(o=e[8].length+"")&&(0,i.rTO)(a,o),256&t&&l!==(l=e[8].join(", "))&&(0,i.Ljt)(s,"title",l)},d(e){e&&(0,i.ogt)(t),e&&(0,i.ogt)(s),e&&(0,i.ogt)(n)}}}function d(e){let t;return{c(){t=(0,i.fLW)("\u2705")},m(e,s){(0,i.$Tr)(e,t,s)},d(e){e&&(0,i.ogt)(t)}}}function u(e){let t,s,a,r,n,o,c,p,m,u,g=e[22]+"";function h(...t){return e[15](e[22],...t)}function f(){e[16].call(s,e[22])}let k=l.aliases[e[22]]&&function(e){let t,s,a,r,n=l.aliases[e[22]].join(", ")+"";return{c(){t=(0,i.bGB)("span"),s=(0,i.fLW)("("),a=(0,i.fLW)(n),r=(0,i.fLW)(")"),(0,i.Ljt)(t,"class","text-gray-400 text-sm")},m(e,l){(0,i.$Tr)(e,t,l),(0,i.R3I)(t,s),(0,i.R3I)(t,a),(0,i.R3I)(t,r)},p:i.ZTd,d(e){e&&(0,i.ogt)(t)}}}(e),b=e[4][`c:${e[22]}`]&&d();return{c(){t=(0,i.bGB)("label"),s=(0,i.bGB)("input"),r=(0,i.DhX)(),n=(0,i.fLW)(g),o=(0,i.DhX)(),k&&k.c(),c=(0,i.DhX)(),b&&b.c(),p=(0,i.DhX)(),(0,i.Ljt)(s,"type","checkbox"),(0,i.Ljt)(s,"onchange",a=h)},m(a,l){(0,i.$Tr)(a,t,l),(0,i.R3I)(t,s),s.checked=e[0][e[22]],(0,i.R3I)(t,r),(0,i.R3I)(t,n),(0,i.R3I)(t,o),k&&k.m(t,null),(0,i.R3I)(t,c),b&&b.m(t,null),(0,i.R3I)(t,p),m||(u=(0,i.oLt)(s,"change",f),m=!0)},p(i,a){e=i,1&a&&(s.checked=e[0][e[22]]),l.aliases[e[22]]&&k.p(e,a),e[4][`c:${e[22]}`]?b||(b=d(),b.c(),b.m(t,p)):b&&(b.d(1),b=null)},d(e){e&&(0,i.ogt)(t),k&&k.d(),b&&b.d(),m=!1,u()}}}function g(e){let t;return{c(){t=(0,i.bGB)("p"),t.textContent="Your plugin will be generated here."},m(e,s){(0,i.$Tr)(e,t,s)},p:i.ZTd,d(e){e&&(0,i.ogt)(t)}}}function h(e){let t,s,a,r,n,o=l.prefix+"";return{c(){t=(0,i.bGB)("p"),t.textContent="Success! Drag the plugin to your TiddlyWiki page and install it.",s=(0,i.DhX)(),a=(0,i.bGB)("p"),r=(0,i.bGB)("a"),n=(0,i.fLW)(o),(0,i.Ljt)(r,"href",e[6])},m(e,l){(0,i.$Tr)(e,t,l),(0,i.$Tr)(e,s,l),(0,i.$Tr)(e,a,l),(0,i.R3I)(a,r),(0,i.R3I)(r,n)},p(e,t){64&t&&(0,i.Ljt)(r,"href",e[6])},d(e){e&&(0,i.ogt)(t),e&&(0,i.ogt)(s),e&&(0,i.ogt)(a)}}}function f(e){let t,s;return{c(){t=(0,i.bGB)("p"),s=(0,i.fLW)(e[7]),(0,i.Ljt)(t,"class","text-red-500")},m(e,a){(0,i.$Tr)(e,t,a),(0,i.R3I)(t,s)},p(e,t){128&t&&(0,i.rTO)(s,e[7])},d(e){e&&(0,i.ogt)(t)}}}function k(e){let t,s,a,r,d,k,b,j,y,x,v,w,I,R,L,$,q,B,G,T,D,W,C,X,P,N,S,O,z,J,M,_,A,E,V,Z,F,H,U,Y,K,Q,ee,te,se,ie,ae,re,le,ne,oe,ce,pe,me,de=e[1].length+"",ue=l.themes,ge=[];for(let t=0;t<ue.length;t+=1)ge[t]=c(o(e,ue,t));let he=e[4][`t:${e[2]}`]&&p(),fe=e[8].length&&m(e),ke=l.allLanguages,be=[];for(let t=0;t<ke.length;t+=1)be[t]=u(n(e,ke,t));function je(e,t){return e[7]?f:e[6]?h:g}let ye=je(e),xe=ye(e);return{c(){t=(0,i.bGB)("div"),s=(0,i.bGB)("header"),a=(0,i.bGB)("h1"),a.textContent="Customize PrismJS for TiddlyWiki",r=(0,i.DhX)(),d=(0,i.bGB)("p"),d.textContent="Pick what you like and build your own plugin",k=(0,i.DhX)(),b=(0,i.bGB)("p"),j=(0,i.bGB)("img"),x=(0,i.DhX)(),v=(0,i.bGB)("img"),I=(0,i.DhX)(),R=(0,i.bGB)("a"),R.innerHTML='<img src="https://img.shields.io/github/stars/gera2ld/tw-prism?style=social" alt="tw-prism"/>',L=(0,i.DhX)(),$=(0,i.bGB)("a"),$.textContent="See Demo",q=(0,i.DhX)(),B=(0,i.bGB)("section"),G=(0,i.bGB)("h2"),G.textContent="Theme",T=(0,i.DhX)(),D=(0,i.bGB)("select");for(let e=0;e<ge.length;e+=1)ge[e].c();W=(0,i.DhX)(),he&&he.c(),C=(0,i.DhX)(),X=(0,i.bGB)("section"),P=(0,i.bGB)("h2"),P.textContent="Languages",N=(0,i.DhX)(),S=(0,i.bGB)("div"),O=(0,i.bGB)("button"),O.textContent="Reset",z=(0,i.DhX)(),J=(0,i.bGB)("button"),J.textContent="All",M=(0,i.DhX)(),_=(0,i.bGB)("button"),_.textContent="Default",A=(0,i.DhX)(),E=(0,i.bGB)("span"),V=(0,i.fLW)(de),Z=(0,i.fLW)(" languages selected"),fe&&fe.c(),F=(0,i.DhX)(),H=(0,i.bGB)("div");for(let e=0;e<be.length;e+=1)be[e].c();U=(0,i.DhX)(),Y=(0,i.bGB)("section"),K=(0,i.bGB)("h2"),K.textContent="Aliases",Q=(0,i.DhX)(),ee=(0,i.bGB)("p"),ee.textContent="You can add additional aliases here in JSON format where the key is the target language and value is a list of desired aliases.",te=(0,i.DhX)(),se=(0,i.bGB)("textarea"),ie=(0,i.DhX)(),ae=(0,i.bGB)("section"),re=(0,i.bGB)("button"),le=(0,i.fLW)("Generate plugin"),oe=(0,i.DhX)(),ce=(0,i.bGB)("div"),xe.c(),(0,i.Ljt)(d,"class","text-gray-400"),(0,i.Ljt)(j,"class","ml-1"),(0,i.Jn4)(j.src,y="https://img.shields.io/github/package-json/v/gera2ld/tw-prism")||(0,i.Ljt)(j,"src","https://img.shields.io/github/package-json/v/gera2ld/tw-prism"),(0,i.Ljt)(j,"alt","version"),(0,i.Ljt)(v,"class","ml-1"),(0,i.Jn4)(v.src,w=`https://img.shields.io/badge/PrismJS-${l.prismVersion}-brightgreen`)||(0,i.Ljt)(v,"src",w),(0,i.Ljt)(v,"alt","prismVersion"),(0,i.Ljt)(R,"class","ml-1"),(0,i.Ljt)(R,"href","https://github.com/gera2ld/tw-prism"),(0,i.Ljt)($,"class","ml-1"),(0,i.Ljt)($,"href","https://gera2ld.github.io/tw-prism/"),(0,i.Ljt)(s,"class","text-center"),void 0===e[2]&&(0,i.P$F)((()=>e[14].call(D))),(0,i.Ljt)(E,"class","ml-2 text-gray-400"),(0,i.Ljt)(S,"class","mb-2"),(0,i.Ljt)(H,"class","flex flex-wrap overflow-auto p-2 border border-gray-300"),(0,i.czc)(H,"max-height","50vh"),(0,i.Ljt)(ee,"class","text-gray-400"),(0,i.Ljt)(re,"class",ne="bg-green-300 text-xl "+(e[5]?"cursor-not-allowed opacity-60":"")),(0,i.Ljt)(ce,"class","flex-1 h-24 ml-4 bg-gray-100 flex flex-col justify-center text-gray-400"),(0,i.Ljt)(ae,"class","text-center my-4 flex items-center"),(0,i.Ljt)(t,"class","max-w-screen-lg mx-auto")},m(l,n){(0,i.$Tr)(l,t,n),(0,i.R3I)(t,s),(0,i.R3I)(s,a),(0,i.R3I)(s,r),(0,i.R3I)(s,d),(0,i.R3I)(s,k),(0,i.R3I)(s,b),(0,i.R3I)(b,j),(0,i.R3I)(b,x),(0,i.R3I)(b,v),(0,i.R3I)(b,I),(0,i.R3I)(b,R),(0,i.R3I)(b,L),(0,i.R3I)(b,$),(0,i.R3I)(t,q),(0,i.R3I)(t,B),(0,i.R3I)(B,G),(0,i.R3I)(B,T),(0,i.R3I)(B,D);for(let e=0;e<ge.length;e+=1)ge[e].m(D,null);(0,i.oWn)(D,e[2]),(0,i.R3I)(B,W),he&&he.m(B,null),(0,i.R3I)(t,C),(0,i.R3I)(t,X),(0,i.R3I)(X,P),(0,i.R3I)(X,N),(0,i.R3I)(X,S),(0,i.R3I)(S,O),(0,i.R3I)(S,z),(0,i.R3I)(S,J),(0,i.R3I)(S,M),(0,i.R3I)(S,_),(0,i.R3I)(S,A),(0,i.R3I)(S,E),(0,i.R3I)(E,V),(0,i.R3I)(E,Z),fe&&fe.m(E,null),(0,i.R3I)(X,F),(0,i.R3I)(X,H);for(let e=0;e<be.length;e+=1)be[e].m(H,null);(0,i.R3I)(t,U),(0,i.R3I)(t,Y),(0,i.R3I)(Y,K),(0,i.R3I)(Y,Q),(0,i.R3I)(Y,ee),(0,i.R3I)(Y,te),(0,i.R3I)(Y,se),(0,i.BmG)(se,e[3]),(0,i.R3I)(t,ie),(0,i.R3I)(t,ae),(0,i.R3I)(ae,re),(0,i.R3I)(re,le),(0,i.R3I)(ae,oe),(0,i.R3I)(ae,ce),xe.m(ce,null),pe||(me=[(0,i.oLt)(D,"change",e[14]),(0,i.oLt)(O,"click",e[11]),(0,i.oLt)(J,"click",e[12]),(0,i.oLt)(_,"click",e[10]),(0,i.oLt)(se,"input",e[17]),(0,i.oLt)(re,"click",e[13])],pe=!0)},p(e,[t]){if(0&t){let s;for(ue=l.themes,s=0;s<ue.length;s+=1){const i=o(e,ue,s);ge[s]?ge[s].p(i,t):(ge[s]=c(i),ge[s].c(),ge[s].m(D,null))}for(;s<ge.length;s+=1)ge[s].d(1);ge.length=ue.length}if(4&t&&(0,i.oWn)(D,e[2]),e[4][`t:${e[2]}`]?he||(he=p(),he.c(),he.m(B,null)):he&&(he.d(1),he=null),2&t&&de!==(de=e[1].length+"")&&(0,i.rTO)(V,de),e[8].length?fe?fe.p(e,t):(fe=m(e),fe.c(),fe.m(E,null)):fe&&(fe.d(1),fe=null),529&t){let s;for(ke=l.allLanguages,s=0;s<ke.length;s+=1){const i=n(e,ke,s);be[s]?be[s].p(i,t):(be[s]=u(i),be[s].c(),be[s].m(H,null))}for(;s<be.length;s+=1)be[s].d(1);be.length=ke.length}8&t&&(0,i.BmG)(se,e[3]),32&t&&ne!==(ne="bg-green-300 text-xl "+(e[5]?"cursor-not-allowed opacity-60":""))&&(0,i.Ljt)(re,"class",ne),ye===(ye=je(e))&&xe?xe.p(e,t):(xe.d(1),xe=ye(e),xe&&(xe.c(),xe.m(ce,null)))},i:i.ZTd,o:i.ZTd,d(e){e&&(0,i.ogt)(t),(0,i.RMB)(ge,e),he&&he.d(),fe&&fe.d(),(0,i.RMB)(be,e),xe.d(),pe=!1,(0,i.j7q)(me)}}}async function b(e){for(let t=0;t<3;t+=1)try{const t=await fetch(e);return await t.text()}catch{}throw new Error("Download failed: "+e)}function j(e,t,s){let a,n,o="",c={};k();let p=JSON.stringify(l.userAliases);const m={},d={};let u,g,h=!1;function f(e,t){s(0,c[e]=t,c)}function k(){s(0,c=l.defaultLanguages.reduce(((e,t)=>(e[t]=!0,e)),{}))}function j(e,t){return i=>{const a=e+i;let r=m[a];return r||(r=t(i).then((e=>(s(4,d[a]=!0,d),e)),(e=>{throw delete m[a],e}))),r}}const y=j("c:",(e=>b(`https://cdn.jsdelivr.net/npm/prismjs@${l.prismVersion}/components/prism-${e}.min.js`))),x=j("t:",(e=>{const t=e?`prism-${e}.css`:"prism.css";return b(`https://cdn.jsdelivr.net/npm/prismjs@${l.prismVersion}/themes/${t}`)}));return e.$$.update=()=>{1&e.$$.dirty&&s(1,a=Object.keys(c).filter((e=>c[e]))),3&e.$$.dirty&&s(8,n=r(a,l.dependencies).filter((e=>!c[e])))},[c,a,o,p,d,h,u,g,n,f,k,function(){s(0,c={})},function(){s(0,c=l.allLanguages.reduce(((e,t)=>(e[t]=!0,e)),{}))},async function(){if(!h){s(5,h=!0);try{const e=r(a,l.dependencies),t={prefix:l.prefix,languages:e,theme:o,userAliases:JSON.parse(p),loadPrismComponent:y,loadPrismCss:x},i=await async function({prefix:e,languages:t,theme:s,userAliases:i,loadPrismComponent:a,loadPrismCss:r}){const l=Object.keys(i).find((e=>!t.includes(e)));if(l)throw new Error(`Language not found: ${l}`);const n=`(${e=>Object.entries(e).forEach((([e,t])=>t.forEach((t=>{Prism.languages[t]=Prism.languages[e]}))))})(${JSON.stringify(i)});module.exports=Prism`,[o,c]=await Promise.all([Promise.all(["core",...t].map(a)),r(s)]);return[{title:e+"/prism.js",type:"application/javascript","module-type":"library",text:[...o,n].join(";\n")},{title:e+"/prism.css",tags:"[[$:/tags/Stylesheet]]",type:"text/css",text:c}]}(t),{pluginInfo:n,tiddlers:c}=l;s(6,u=function({pluginInfo:e,tiddlers:t,prismTiddlers:s}){const i=[...t,...s].reduce(((e,t)=>({...e,[t.title]:t})),{}),a={...e,type:"application/json",text:JSON.stringify({tiddlers:i})};return"data:text/vnd.tiddler,"+encodeURIComponent(JSON.stringify(a))}({pluginInfo:n,tiddlers:c,prismTiddlers:i})),s(7,g=null)}catch(e){s(7,g=`Failed generating plugin: ${e}`)}s(5,h=!1)}},function(){o=(0,i.RMU)(this),s(2,o)},(e,t)=>f(e,t.target.checked),function(e){c[e]=this.checked,s(0,c)},function(){p=this.value,s(3,p)}]}class y extends i.f_C{constructor(e){super(),(0,i.S1n)(this,e,j,k,i.N8,{})}}new y({target:document.body})}},e=>{e.O(0,[736],(()=>{return t=535,e(e.s=t);var t}));e.O()}]);