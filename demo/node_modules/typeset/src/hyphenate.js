// User auto language detection if no option
// specified https://github.com/richtr/guessLanguage.js

var Hypher = require('hypher'),
  english = require('./hypher-patterns/en-us'),
  h = new Hypher(english);

module.exports = function(text){

  var words = text.split(' ');

  for (var i in words) {

    var word = words[i];

    if (word.slice(0, 1).toUpperCase() === word.slice(0, 1))
      continue;

    words[i] = h.hyphenateText(word);
  }

  return words.join(' ');
};
