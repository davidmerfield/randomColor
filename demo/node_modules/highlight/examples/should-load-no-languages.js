(function () {
  "use strict";

  var Highlight = require("../lib/highlight.js")
    , assert = require('assert')
    , fs = require('fs')
    , reHasMarkup = /<.*class=["']?[\w-]+["'?]/
    , reHasAnnotations = /\sclass="[\w-]+"/
    ;

  function runTest(err) {

    //console.log(Highlight.loadedLanguages);
    assert.ok(!err, err && err.message);
    assert.strictEqual(0, Highlight.loadedLanguages.length
      , 'some languages were loaded: '
      + Highlight.languages.length 
      + " "
      + Highlight.loadedLanguages.length
      );

    // It's okay that these run out-of-order / in-parallel
    fs.readFile('./example.js', 'utf8', function (err, text) {
      var annotated
        ;
        
      assert.ok(!err, 'threw error reading example.js');
      annotated = Highlight.highlight(text, '  ');
      assert.ok(!annotated.match(reHasAnnotations));
      //console.log(annotated);
      console.info('[PASS] source is not annotated');
    });
  }

  Highlight.init(runTest, []);
}());
