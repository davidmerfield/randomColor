var Benchmark = require('benchmark'),
    Hypher = require('../lib/hypher'),
    suite = new Benchmark.Suite('warm cache'),
    data = require('./data'),
    words = data.words,
    language = data.language,
    assert = require('assert'),
    dictionary = {},
    Hyphenator = require('./Hyphenator.js');

var result = {};

// Create the dictionary of words we're using to test
words.forEach(function (word) {
    var w = word.split('=');
    dictionary[w.join('')] = w;
});

Hyphenator.config({
    // disable Hyphenator.js cache so we're measuring Hyphenator.js capability to hyphenate, not V8's key lookup
    enablecache: false,
    // Hypher uses a minimum word length of 4, so we'll use that as well.
    minwordlength: 4
});

Hyphenator.languages['en'] = language;

function hypherDictionary() {
    var word;
    
    for (word in dictionary) {
        h.hyphenate(word);
    }
}

function hypherSetup() {
    h = new Hypher(language);
}

function hyphenatorDictionary() {
    var word;

    for (word in dictionary) {
        Hyphenator.hyphenate(word, 'en');
    }
}

function hyphenatorSetup() {
    // Hyphenator uses an lazy cache, so to make a fair comparison we run through
    // the dictionary in the setup code. This should ensure the cache is warm.
    hyphenatorDictionary();
}

suite.add('Hypher', hypherDictionary, {
    setup: hypherSetup
});

suite.add('Hyphenator', hyphenatorDictionary, {
    setup: hyphenatorSetup
});

suite.on('cycle', function(bench) {
    console.log(String(bench));
}).on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').pluck('name'));
}).run(true);

