// TODO why is `this` in use at all?
var self = this;

(function () {
  "use strict";
  /* node-highlight is based on highlight.js (see vendor/highlight.js)       */
  /* usage: html = require("highlight").Highlight(code_string);              */
  /* NB! You also need to include a CSS file from vendor/highlight.js/styles */

  // load syntax highlighter
  // TODO create private instances of highlighter 
  // (with fewer langs) for greater accuracy
  var Highlight = module.exports
    , fs = require('fs')
    , hljs = require('./vendor/highlight.js/highlight').hljs
    , langRelPath = "vendor/highlight.js/languages/"
    , langPath = __dirname + "/" + langRelPath
    , reEndsWithJs = /\.js$/i
    , loadedMap = {}
    , availableMap = {}
    ;

  // TODO this should move to init in a newer api
  Highlight.loadedLanguages = [];

  function acceptJsFiles(lang) {
    if (lang.match(reEndsWithJs)) {
      return true;
    }
  }

  function preRequireModules(lang, i, arr) {
    arr[i] = lang = lang.replace(reEndsWithJs, '');

    try {
      availableMap[lang] = require('./' + langRelPath + lang);
    } catch(e) {
      console.error("[ERROR] could not preload language pack for '" + lang + "'");
      console.error(e.message);
      console.error(e.stack);
      return;
    }
  }

  // find languages from list of fsnodes
  function preloadLanguages(err, fsnodes) {

    if (err) {
      console.error("[ERROR] langPath '" + langPath + "'");
      console.error(err.message);
      console.error(err.stack);
      return;
    }

    Highlight.languages = fsnodes.filter(acceptJsFiles).sort(function (a, b) {
      // xml must be first (others depend on it)
      if ('xml' === a) {
        return -100000000;
      }
      // django should be after xml
      if ('django.js' === a) {
        return 1000000000;
      }
      
      if (a === b) {
        return 0;
      }

      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        // NaN vs string
        return 0;
      }
    });
    Highlight.languages.forEach(preRequireModules);
  }

  function loadLangs(cb, langs) {
    var err
      ;

    if ('string' === typeof langs) {
      langs = [langs];
    }

    if (!Array.isArray(langs)) {
      cb(new Error("no array of languages given"));
      return;
    }

    langs.some(function (lang) {
      var addLangToHighlightInstance
        ;

      if (loadedMap[lang]) {
        return;
      }

      addLangToHighlightInstance = availableMap[lang];

      if (!addLangToHighlightInstance) {
        err = new Error("No language pack available for '" + lang + "'");
        return true;
      }

      try {
        addLangToHighlightInstance(hljs);
      } catch(e) {
        // TODO fix django and html-xml
        console.warn('[WARN] failed to load', lang);
        console.warn(e.message);
        console.warn(e.stack);
        Highlight.languages = Highlight.languages.filter(function (l) {
          return l !== lang;
        });
        return;
      }

      loadedMap[lang] = true;
      Highlight.loadedLanguages.push(lang);
    });

    // future-proofing for async api
    cb(err);
  }

  function init(cb, langs, opts) {
    if (!Array.isArray(langs)) {
      langs = Highlight.languages.slice();
    }

    loadLangs(cb, langs);
  }

  /**
   * highlight(text, tabReplace, useCodeBlocks) -> HTML
   * - text (String): text to be highlighted
   * - tabReplace (String): defaults to 4 spaces if none, replaces \t chars
   * - useCodeBlocks (Boolean): If TRUE use only text between <code> and </code>
   *
   * Highlights program code inside a string by setting appropriate CSS class
   * elements.
   **/
  function highlight(text, tabReplace, useCodeBlocks){
    tabReplace = tabReplace || '    ';
    text = text.replace(/\r\n|\r|\n/g, '\n'); // remove \r
    if (!!useCodeBlocks) {
      // JS regexpes have some multiline issues, so we temporarily remove them
      return text
        .replace(/\n/g,'\uffff')
        .replace(/<code([^>]*)>(.*?)<\/code>/gm, function(original, attrs, source){
          return '<code'+attrs+'>'+hljs.highlightText(source.replace(/\uffff/g,"\n"), tabReplace)+'</code>';
        })
        .replace(/&amp;(\w+;)/g,'&$1').replace(/\uffff/g,"\n");
    } else {
      return hljs.highlightText(text, tabReplace);
    }
  }

  //fs.readdir(langPath, preloadLanguages);
  // using readdirSync To avoid API Change
  preloadLanguages(null, fs.readdirSync(langPath));

  Highlight.init = init;
  Highlight.highlight = highlight;

  // Maintain current api:
  // TODO why is `this` in use at all?
  function backwardsCompat() {
    // currently synchronous
    Highlight.init(function () {}, ['php']);
    return Highlight.highlight.apply(null, arguments);
  }
  Highlight.Highlight = self.Highlight = backwardsCompat;
}());
