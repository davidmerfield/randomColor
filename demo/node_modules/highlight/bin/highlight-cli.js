#!/usr/bin/env node
(function () {
  "use strict";

  var fs = require('fs')
    , Highlight = require('highlight')
    //, Highlight = require('../lib/highlight')
    , filename = process.argv[2]
    , langArgIndex = 4
    , langArg
    , langs
    ;

  if (filename.match(/--languages(=)?/)) {
    langArg = filename;
    langArgIndex = 3;
    filename = null;
  }

  langArg = process.argv[langArgIndex - 1] || '';

  if (langArg = langArg.match(/--languages(=(.*))?/)) {
    langs = (process.argv[langArgIndex]||'').split(/\s*,\s*/g);

    if (langArg[2]) {
      langs = langArg[2].split(/,/);
    }
  }

  function printUsage() {
    console.warn("Usages:");
    console.warn("highlight site/docs/index.html > highlighted.html");
    console.warn("cat site/docs/index.html | highlight > highlighted.html");
  }

  function handleInput(err, text) {
    var hlBlock
      , wrappedInHtml
      ;

    if (err) {
      printUsage();
      return;
    }

    wrappedInHtml = !!text.match(/<.*?code.*?>/i);

    // TODO test if filename extension reveals code type
    Highlight.init(function (err) {
      if (err) {
        console.error('[highlight-cli]', err.message);
        //console.error(err.stack);
        return;
      }

      hlBlock = Highlight.highlight(text, '  ', wrappedInHtml);
      console.info(hlBlock);
    }, langs);
  }

  readInput(handleInput, filename);

  //
  // this could (and probably should) be its own module
  //
  function readInput(cb, filename) {

    function readFile() {
      fs.readFile(filename, 'utf8', function (err, text) {
        if (err) {
          console.error("[ERROR] couldn't read from '" + filename + "':");
          console.error(err.message);
          return;
        }

        cb(err, text);
      });
    }

    function readStdin() {
      var text = ''
        , timeoutToken
        , stdin = process.stdin
        ;
      
      stdin.resume();

      // how to tell piping vs waiting for user input?
      timeoutToken = setTimeout(function () {
        cb(new Error('no stdin data'));
        stdin.pause();
      }, 1000);

      stdin.on('data', function (chunk) {
        clearTimeout(timeoutToken);
        text += chunk;
      });
      
      stdin.on('end', function () {
        cb(null, text);
      });
    }

    if (filename) {
      readFile();
    }
    else {
      readStdin();
    }

  }

}());
