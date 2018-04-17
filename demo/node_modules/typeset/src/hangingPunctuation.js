function pull (className, content) {
  return '<span class="pull-' + className +'">' + (content || '') + '</span>';
}

function push (className, content) {
  return '<span class="push-' + className +'">' + (content || '') + '</span>';
}

var doubleWidth = ['&quot;', '"', "“", "„", "”", "&ldquo;", "&OpenCurlyDoubleQuote;", "&#8220;", "&#x0201C;", "&rdquor;", "&rdquo;", '&CloseCurlyDoubleQuote;', '&#8221;', '&ldquor;', '&bdquo;', '&#8222;'];
var singleWidth = ["'", '&prime;', '&apos;', '&lsquo;', '&rsquo;', '‘', '’'];

var diacriticMap = {
  'A' : /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g,
  'C' : /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g,
  'O' : /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g,
  'T' : /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g,
  'V' : /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g,
  'W' : /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g,
  'Y' : /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g,
  'c' : /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g,
  'o' : /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g,
  'v' : /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g,
  'w' : /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g
}

var alignMe = "CcOoYTAVvWw".split('');

module.exports = function(text, node, $){

  if (text.length < 2) return text;

  // Remove consecutive double spaces then create
  // array of distinct words.
  var words = text.split(' ').join(' ').split(' ');

  for (var i in words) {

    // This is the code to do
    // optical margin alignment.

    // It's disabled for now due to accessibility issues.

    // for (var a in alignMe) {

    //   var align = alignMe[a];
    //   var letter = words[i].slice(0,align.length);

    //   if (letter === align || diacriticMap[align] && diacriticMap[align].test(letter)) {

    //     var insert = pull(align, letter);

    //     if (words[(i-1)]) {
    //       words[(i-1)] = words[(i-1)] + push(align);
    //     } else if (hasAdjacentText($, node)) {
    //       insert = push(align) + insert;
    //     }

    //     words[i] = insert + words[i].slice(align.length);

    //   }
    // }

    for (var b in singleWidth) {

      var punctuation = singleWidth[b];

      if (words[i].slice(0,punctuation.length) === punctuation) {

        var insert = pull('single', punctuation);

        if (words[(i-1)]) {
          words[(i-1)] = words[(i-1)] + push('single');
        } else if (hasAdjacentText($, node)) {
          insert = push('single') + insert;
        }

        words[i] = insert + words[i].slice(punctuation.length);

      }
    }

    for (var c in doubleWidth) {

      var punctuation = doubleWidth[c];

      if (words[i].slice(0,punctuation.length) === punctuation) {

        var insert = pull('double', punctuation);

        if (words[(i-1)]) {
          words[(i-1)] = words[(i-1)] + push('double');
        } else if (hasAdjacentText($, node)) {
          insert = push('double') + insert;
        }

        words[i] = insert + words[i].slice(punctuation.length);
      }
    }
  }

  text = words.join(' ');

  return text;
};


function hasAdjacentText ($, node) {

  // the nearest sibling to this text node
  // you can have two adjacent text nodes
  // since they'd jsut be one node.

  // however, the previous sibling could end with a text node
  // if so, we need to add the spacer to prevent overlap
  if (node.prev && node.prev.children && node.prev.children.length) {

    var lastChild = node.prev.children.slice(-1)[0];

    if (lastChild && lastChild.type === 'text') {
      return true;
    }
  }

  if (!$(node).parent() || !$(node).parent().length)
    return false;

  var parentPrev = $(node).parent()[0].prev;

  // Ensure the parent has text content
  // and is not simply a newline seperating tags
  if (parentPrev && parentPrev.type === 'text' && parentPrev.data.trim()) {
    return true;
  }

  return false;

}