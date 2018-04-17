(function () {
  "use strict";

  var Highlight = require("../lib/highlight.js")
    , assert = require('assert')
    , fs = require('fs')
    , reHasAnnotations = /\sclass="[\w-]+"/
    ;

  function runTest(err) {

    //console.log(Highlight.loadedLanguages);
    assert.ok(!err, err && err.message);
    assert.strictEqual(Highlight.languages.length, Highlight.loadedLanguages.length
      , 'not all languages were loaded: '
      + Highlight.languages.length 
      + " "
      + Highlight.loadedLanguages.length
      );
    assert.deepEqual(Highlight.languages, Highlight.loadedLanguages
      , 'not all languages were loaded: '
      + JSON.stringify(Highlight.languages, null, '  ')
      + "\n"
      + JSON.stringify(Highlight.loadedLanguages, null, '  ')
      );

    // It's okay that these run out-of-order / in-parallel
    fs.readFile('./example.js', 'utf8', function (err, text) {
      var annotated
        ;
        
      assert.ok(!err, 'threw error reading example.js');
      annotated = Highlight.highlight(text, '  ');
      assert.ok(annotated.match(reHasAnnotations));
      //console.log(annotated);
      console.info('[PASS] annotated source (perhaps incorrectly) with all modules loaded');
    });
  }

  Highlight.init(runTest);
}());
