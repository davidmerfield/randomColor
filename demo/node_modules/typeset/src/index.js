var modules = {
  quotes: require('./quotes'),
  hyphenate: require('./hyphenate'),
  ligatures: require('./ligatures'),
  smallCaps: require('./smallCaps'),
  punctuation: require('./punctuation'),
  hangingPunctuation: require('./hangingPunctuation'),
  spaces: require('./spaces')
};

var eachTextNode = require('./eachTextNode');

module.exports = function(html, options){

  options = options || {};

  for (var i in modules) {

    // Check against enable list
    if (options.enable && options.enable.indexOf(i) === -1)
      continue;

    // Check against disable list
    if (options.disable && options.disable.indexOf(i) !== -1)
      continue;

    // Pass the HTML to each module
    html = eachTextNode(html, modules[i], options);
  }

  return html;
};