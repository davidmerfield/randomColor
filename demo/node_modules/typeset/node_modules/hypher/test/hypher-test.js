var Hypher = require('../lib/hypher'),
    vows = require('vows'),
    assert = require('assert'),
    data = require('./data.js'),
    words = data.words,
    language = data.language,
    german = require('./de.js'),
    finnish = require('./fi.js'),
    dictionary = {};

function assertHyphenation(hyphenation) {
    return function (topic) {
        assert.deepEqual(topic, hyphenation);
    };
}

function hyphenate(word) {
    return function (h) {
        return h.hyphenate(word);
    };
}

function hyphenatesTextTo(hyphenation) {
    var context = {
        topic: function (h) {
            return h.hyphenateText(this.context.name).split('\u00AD');
        }
    };

    context['Should hyphenate to: ' + hyphenation.join('\u2022')] = assertHyphenation(hyphenation);

    return context;
}

function hyphenatesTo(hyphenation) {
    var context = {
        topic: function (h) {
            return h.hyphenate(this.context.name);
        }
    };

    context['Should hyphenate to: ' + hyphenation.join('\u2022')] = assertHyphenation(hyphenation);

    return context;
}

words.forEach(function (word) {
    var w = word.split('-');
    dictionary[w.join('')] = hyphenatesTo(w);
});

vows.describe('Hypher').addBatch({
    'hyphenate ': {
        topic: function () {
            return new Hypher(language);
        },
        'word: ': dictionary
    },
    'trie': {
        topic: function () {
            return new Hypher({
                patterns: {
                    "2": "a1b2",
                    "3": "a2bb3c"
                }
            });
        },
        'trie is correctly generated': function (h) {
            assert.deepEqual(h.trie, {
                97: {
                    _points: [0, 1],
                    98: {
                        _points: [0, 2, 0]
                    }
                },
                98: {
                    _points: [0, 2],
                    99: {
                        _points: [0, 3, 0]
                    }
                },
                _points: []
            });
        }
    },
    'hyphenate with soft hyphens': {
        topic: function () {
            return new Hypher(language);
        },
        'hyph\u00ADen': hyphenatesTo(['hyph\u00ADen'])
    },
    'hyphenate text with soft hyphens': {
        topic: function () {
            return new Hypher(language);
        },
        'hyph\u00ADen charact\u00ADer': hyphenatesTextTo(['hyph', 'en charact', 'er']),
    },
    'hyphenate with en-dash, hyphen-minus, hyphen, or ZWNJ': {
        topic: function () {
            return new Hypher(language);
        },
        // The resulting hyphenation might look odd, but a minus-hyphen, en-dash, or hyphen will
        // be broken by the browser, so we don't need to insert a soft hyphen in that position.
        'bootstrapping-brainstorm-victories': hyphenatesTextTo(['boot', 'strap', 'ping-brain', 'storm-vic', 'to', 'ries']),

        // hyphen-minus
        'bootstrapping\u002Dbrainstorm-victories': hyphenatesTextTo(['boot', 'strap', 'ping\u002Dbrain', 'storm-vic', 'to', 'ries']),

        // hyphen
        'bootstrapping\u2010brainstorm-victories': hyphenatesTextTo(['boot', 'strap', 'ping\u2010brain', 'storm-vic', 'to', 'ries']),

        // en-dash
        'bootstrapping\u2013brainstorm-victories': hyphenatesTextTo(['boot', 'strap', 'ping\u2013brain', 'storm-vic', 'to', 'ries']),

        // ZWNJ
        'bootstrapping\u200Cbrainstorm-victories': hyphenatesTextTo(['boot', 'strap', 'ping\u200Cbrain', 'storm-vic', 'to', 'ries'])
    },
    'hyphenate, preserve case and punctuation': {
        topic: function () {
            return new Hypher(language);
        },
        'Hyphenation': hyphenatesTo(['Hy', 'phen', 'ation']),
        '!!!!!!!!': hyphenatesTo(['!!!!!!!!']),
        'Hyphenation!': hyphenatesTo(['Hy', 'phen', 'ation!'])
    },
    'hyphenate with exceptions': {
        topic: function () {
            var l = Object.create(language);
            l.exceptions = 'bootstrapping, brainstorm';
            return new Hypher(l);
        },
        'bootstrapping': hyphenatesTo(['bootstrapping']),
        'brainstorm': hyphenatesTo(['brainstorm'])
    },
    'hyphenate with exceptions (mixed case)': {
      topic: function () {
          var l = Object.create(language);
          l.exceptions = 'bootstrapping, brainstorm';
          return new Hypher(l);
      },
      'BoOtstrApPing': hyphenatesTo(['BoOtstrApPing']),
      'BrainStorm': hyphenatesTo(['BrainStorm'])
    },
    'hyphenate with exceptions (without space)': {
        topic: function () {
            var l = Object.create(language);
            l.exceptions = 'bootstrapping,brainstorm';
            return new Hypher(l);
        },
        'bootstrapping': hyphenatesTo(['bootstrapping']),
        'brainstorm': hyphenatesTo(['brainstorm'])
    },
    'hyphenate with custom points': {
        topic: function () {
            var l = Object.create(language);
            l.exceptions = 'bo\u2027otstr\u2027apping, brai\u2027nstorm';
            return new Hypher(l);
        },
        'bootstrapping': hyphenatesTo(['bo', 'otstr', 'apping']),
        'brainstorm': hyphenatesTo(['brai', 'nstorm'])
    },
    'returns the correct exception': {
      topic: function () {
        var l = Object.create(language);
        l.exceptions = 'inspi\u2027re\u2027rend'
        return new Hypher(l);
      },
      'inspirerend': hyphenatesTo(['inspi', 're', 'rend'])
    },
    'hyphenate with custom points and mixed case': {
        topic: function () {
            var l = Object.create(language);
            l.exceptions = 'bo\u2027otstr\u2027apping, brai\u2027nstorm';
            return new Hypher(l);
        },
        'bOotsTrapPing': hyphenatesTo(['bO', 'otsTr', 'apPing']),
        'BrainStorm': hyphenatesTo(['Brai', 'nStorm'])
    },
    'hyphenates uppercase': {
      topic: function () {
        var l = Object.create(finnish);
        return new Hypher(l);
      },
      'LÄHETÄ SÄHKÖPOSTI': hyphenatesTextTo(['LÄ', 'HE', 'TÄ SÄH', 'KÖ', 'POS', 'TI'])
    },
    'hyphenate path like strings': {
        topic: function () {
            return new Hypher(language);
        },
        'http://www.ex.com/': hyphenatesTextTo(['http://\u200Bwww.ex.com/']),
        'http://www.ex.com/some/file.txt': hyphenatesTextTo(['http://\u200Bwww.ex.com/\u200Bsome/\u200Bfile.txt']),
        'some/path/to/some/where': hyphenatesTextTo(['some/\u200Bpath/\u200Bto/\u200Bsome/\u200Bwhere']),
        '1234567/7654321': hyphenatesTextTo(['1234567/\u200B7654321']),
        '/root/for/some/path': hyphenatesTextTo(['/root/\u200Bfor/\u200Bsome/\u200Bpath']),
        'a text with a /path/in/it/': hyphenatesTextTo(['a text with a /path/\u200Bin/\u200Bit/']),
        'a text with a /path/in/it/ and more text': hyphenatesTextTo(['a text with a /path/\u200Bin/\u200Bit/ and more text'])
    },
    'hyphenate with special characters': {
        topic: function () {
            return new Hypher(german);
        },
        'müsse': hyphenatesTo(['müs', 'se']),
        'sozioökonomisch': hyphenatesTo(['so', 'zio', 'öko', 'no', 'misch']),
        'kostenschätzungen': hyphenatesTo(['kos', 'ten', 'schät', 'zun', 'gen'])
    },
    'hyphenate text with special characters': {
        topic: function () {
            return new Hypher(german);
        },
        'müsse': hyphenatesTextTo(['müs', 'se']),
        'sozioökonomisch': hyphenatesTextTo(['so', 'zio', 'öko', 'no', 'misch']),
        'kostenschätzungen': hyphenatesTextTo(['kos', 'ten', 'schät', 'zun', 'gen'])
    }
}).export(module);
