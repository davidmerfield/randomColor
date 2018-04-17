module.exports = function(text, node, $){

  // This helps resolve substitution issues
  // when a next node is adjacent to another text node,
  // e.g. a link tag or emphasis tag.

  // this only works if replace does not modify the length
  // of the string it is passed. therefore the
  if ($(node).parent().is('p, blockquote') && $(node).parent().text() !== text) {

    var parentText = replace($(node).parent().text());
    var start = 0;

    $(node).parent().contents().each(function(){

      if (this === node) return false;

      start += $(this).text().length;
    });

    return parentText.slice(start, start + text.length);
  }

  return replace(text);
};

function replace (text) {

  // Revert encoded chars so the regex mystery
  // below works properly

  text = text
    .replace(/(\W|^)"([^\s\!\?:;\.,‽»])/g, '$1\u201c$2') // beginning "
    .replace(/(\u201c[^"]*)"([^"]*$|[^\u201c"]*\u201c)/g, '$1\u201d$2') // ending "
    .replace(/([^0-9])"/g,'$1\u201d') // remaining " at end of word
    .replace(/(\W|^)'(\S)/g, '$1\u2018$2') // beginning '
    .replace(/([a-z])'([a-z])/ig, '$1\u2019$2') // conjunction's possession
    .replace(/((\u2018[^']*)|[a-z])'([^0-9]|$)/ig, '$1\u2019$3') // ending '
    .replace(/(\u2018)([0-9]{2}[^\u2019]*)(\u2018([^0-9]|$)|$|\u2019[a-z])/ig, '\u2019$2$3') // abbrev. years like '93
    .replace(/(\B|^)\u2018(?=([^\u2019]*\u2019\b)*([^\u2019\u2018]*\W[\u2019\u2018]\b|[^\u2019\u2018]*$))/ig, '$1\u2019') // backwards apostrophe
    .replace(/'''/g, '\u2034') // triple prime
    .replace(/("|'')/g, '\u2033') // double prime
    .replace(/'/g, '\u2032');

  // Allow escaped quotes
  text = text.replace(/\\“/, '\"');
  text = text.replace(/\\”/, '\"');
  text = text.replace(/\\’/, '\'');
  text = text.replace(/\\‘/, '\'');

  return text;
}