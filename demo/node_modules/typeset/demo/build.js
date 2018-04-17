var fs = require('fs');
var cheerio = require('cheerio');

var TESTDIR = __dirname;
var SRCDIR = __dirname + '/../src';

var minify = require('html-minifier').minify;
var minifyOpts = {
  removeComments: true,
  removeAttributeQuotes: true
};

var INPUT = TESTDIR + '/index-src.html';
var OUTPUT = __dirname + '/../index.html';

function build () {

  var typeset = require('../src');
  var html = fs.readFileSync(INPUT, 'utf-8');

  // Duplicate the 'before' section on the demo
  var $ = cheerio.load(html, {decodeEntities: false});
      $('#panel-2').html($('#panel-1').html());
      html = $.html();

  // TYPESET!
  var options = {ignore: '.ts-ignore'}; // the before section
      html = typeset(html, options);

  fs.writeFileSync(OUTPUT, minify(html, minifyOpts));
  console.log('Built!');
}

fs.watch(TESTDIR, build);
fs.watch(SRCDIR, build);
console.log('Watching demo directory for changes...');

build();