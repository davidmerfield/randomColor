(function () {
  "use strict";

  var Highlight = require("../lib/highlight.js")
    , assert = require('assert')
    , fs = require('fs')
    , reHasAnnotations = /\sclass="[\w-]+"/
    ;

  function runTest(err) {

    assert.ok(!err, err && err.message);
    assert.strictEqual(1, Highlight.loadedLanguages.length, 'more than one language is loaded: ' + Highlight.loadedLanguages);
    assert.strictEqual('javascript', Highlight.loadedLanguages[0], 'javascript is the language');

    fs.readFile('./example.js.html', 'utf8', function (err, text) {
      var annotated
        ;
        
      assert.ok(!err, 'threw error reading example.js.html');
      annotated = Highlight.highlight(text, '  ', true);
      assert.ok(annotated.match(reHasAnnotations));
      //console.log(annotated);
      console.info('[PASS] source is annotated');
    });
  }

  Highlight.init(runTest, ['javascript']);
}());
