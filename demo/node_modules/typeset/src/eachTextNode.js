var cheerio, jquery, escape;

if (typeof ENV !== 'undefined' && ENV.browser) {
  jquery = require('jquery');
  escape = function(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };
} else {
  cheerio = require('cheerio');
}

// An easy way to apply a function to each text node
// doThis accepts a text string of a text node's content
// and returns the modified string.

var IGNORE = 'head, code, pre, script, style, [class^="pull-"], [class^="push-"], .small-caps';

module.exports = function(html, doThis, options){

  var ignore = IGNORE;
  var only = (jquery && html) || (options && options.only) || ':root';

  if (options && options.ignore) ignore += ', ' + options.ignore;

  var $ = jquery || cheerio.load(html, {decodeEntities: false});

  var processedText = $(only).each(function(){findTextNodes(this);});

  function findTextNodes(node) {

    if ($(node).is(ignore)) return false;

    $(node).contents().each(function(){

      var childNode = this;

      if (childNode.nodeType === 3) {

        var text = escape ? escape(childNode.data) : childNode.data;

        text = text.replace(/&#39;/g, "'");
        text = text.replace(/&quot;/g, '"');

        childNode.data = text;

        $(childNode).replaceWith(doThis(text, childNode, $));

      } else {
        findTextNodes(childNode);
      }
    });
  }

  return (jquery && processedText[0]) || $.html();
};
