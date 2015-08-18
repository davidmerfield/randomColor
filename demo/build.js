var fs = require('fs');
var cheerio = require('cheerio');
var minify = require('html-minifier').minify;
var minifyOpts = {
  removeComments: true,
  removeAttributeQuotes: true
};

var DEMO_DIR = __dirname;
var INPUT = DEMO_DIR + '/index-src.html';
var OUTPUT = __dirname + '/../index.html';

var hljs = require('highlight.js');

build();

function build () {

  var typeset = require('typeset');

  var html = fs.readFileSync(INPUT, 'utf-8');

  var $ = cheerio.load(html, {decodeEntities: false});

      $('code').each(function(){

        var newHTML = hljs.highlight('js', $(this).html()).value;

        $(this).attr('class', 'hljs')
        $(this).html(newHTML);
      });

  html = typeset($.html());

  if (html) fs.writeFileSync(OUTPUT, minify(html, minifyOpts));
  console.log('DONE!');
}

fs.watch(DEMO_DIR, build);