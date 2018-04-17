(function () {
  "use strict";

  var Highlight = require("../lib/highlight.js")
    , assert = require('assert')
    , fs = require('fs')
    , reHasAnnotations = /\sclass="tag"/
    ;

  function runTest(err) {

    assert.ok(!err, err && err.message);
    assert.strictEqual(1, Highlight.loadedLanguages.length, 'more than one language is loaded: ' + Highlight.loadedLanguages);
    assert.strictEqual('xml', Highlight.loadedLanguages[0], 'xml isn\'t the language');

    fs.readFile('./example.html', 'utf8', function (err, text) {
      var annotated
        ;
        
      assert.ok(!err, 'threw error reading example.html');
      annotated = Highlight.highlight(text, '  ');
      assert.ok(annotated.match(reHasAnnotations));
      //console.log(annotated);
      console.info('[PASS] source is annotated');
    });
  }

  Highlight.init(runTest, ['xml']);
}());
