!function (doc, $) {
    var Hypher = require('hypher'),
        cache = {};

    $.ender({
        registerHyphenationLanguage: function (pattern, options) {
            var h = new Hypher(pattern, options);

            if (typeof pattern.id === 'string') {
                pattern.id = [pattern.id];
            }

            for (var i = 0; i < pattern.id.length; i += 1) {
                cache[pattern.id[i]] = h;
            }
        }
    });

    $.ender({
        hyphenate: function (language) {
            if (cache[language]) {
                var i = 0,
                    j = 0,
                    len = this.length,
                    nodeLen = 0;

                for (; i < len; i += 1) {
                    j = 0;
                    nodeLen = this[i].childNodes.length;
                    
                    for (; j < nodeLen; j += 1) {
                        if (this[i].childNodes[j].nodeType === 3) {
                            this[i].childNodes[j].nodeValue = cache[language].hyphenateText(this[i].childNodes[j].nodeValue);
                        }
                    }
                }
            }
        }
    }, true);
}(document, ender);
