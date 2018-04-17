[![Demo](http://i.imgur.com/adsiz94.gif)](https://blot.im/typeset)

**[Typeset](https://blot.im/typeset)** is an html pre-proces­sor for web ty­pog­ra­phy. It uses no client-side JavaScript but gives you hang­ing punc­tu­a­tion, soft hy­phen in­ser­tion, op­ti­cal mar­gin out­dents, small-caps con­ver­sion and punctuation substitution. See the results on [the demo](https://blot.im/typeset). The library is idempotent and runs on the server using Node – I'll adapt it to work on the client soon. The processed HTML & CSS  [renders correctly in IE5](http://i.imgur.com/vVGtD3V.png) and [without any CSS](http://i.imgur.com/ITM0bcG.png)!

```javascript
npm install typeset
```

##### Usage

```javascript
var typeset = require('typeset');
var html = '<p>"Hello," said the fox.</p>';
var output = typeset(html);
```

Then tweak [typeset.css](https://blot.im/typeset/demo/typeset.css) to match the metrics of your font and include it on your page.

Typeset.js is available as a plugin for [grunt](https://github.com/mobinni/grunt-typeset) and [gulp](https://github.com/lucasconstantino/gulp-typeset).

##### Options

You can pass an options object to influence how your HTML is typeset:

```javascript
var options = {
  ignore: '.skip, #anything, .which-matches', // string of a CSS selector to skip
  only: '#only-typeset, .these-elements'    // string of a CSS selector to only apply typeset,
  disable: ['hyphenate'], // array of features to disable
};
```

##### Disableable features

The following features may be disabled:

- `quotes`
- `hyphenate`
- `ligatures`
- `smallCaps`
- `punctuation`
- `hangingPunctuation`
- `spaces`

##### CLI Usage

```
$ npm install -g typeset
```

```
Usage: typeset-js [options] [<infile> [<outfile>]]

Options:

  -h, --help      output usage information
  -V, --version   output the version number
  -i, --ignore    string of CSS selector(s) to ignore
  -O, --only      string of CSS selector(s) to exclusively apply typeset to
  --disable,      string of typeset feature(s) to disable, separated by commas
```

Examples:

Compile a file and print it to stdout:

```
$ typeset-js inputFile.html
```

To create an output file, just add a second argument:

```
$ typeset-js inputFile.html outputFile.html
```

Use the `--ignore` option to ignore specific CSS selectors:

```
$ typeset-js inputFile.html outputFile.html --ignore ".some-class, h3"
```

Use the `--disable` option to disable typeset features:

```
$ typeset-js inputFile.html outputFile.html --disable "hyphenate,ligatures"
```

CLI redirections:

```
$ cat index.html | typeset-js > outputFile.html
```

##### License

This software is dedicated to the public domain and licensed under [CC0](https://github.com/davidmerfield/Typeset/blob/master/LICENSE).

##### Building locally

Clone this repo then fetch its dependencies using ```npm install```. You can then edit the code in ```/src```.

##### To Do
* Add a build file
* Make this work on the client
* Incorporate features from [Normalize Opentype](http://kennethormandy.com/journal/normalize-opentype-css)?
* Remove recursion from eachTextNode.js
* Feature to [avoid widows](https://github.com/davidmerfield/Typeset/issues/34).

##### Who uses this library

* [**Blot**](https://blot.im/) - a blogging platform I made, uses this to typeset blog posts
* **You?** [Contact me](mailto:dmerfield@gmail.com) or submit a pull request to add it here!
