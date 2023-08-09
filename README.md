# [Random Color](https://randomcolor.lllllllllllllllll.com)

A tiny script for generating attractive random colors. See the demo for [an explanation](https://randomcolor.lllllllllllllllll.com) and [some samples](https://randomcolor.lllllllllllllllll.com). randomColor has been ported to [C#](https://github.com/nathanpjones/randomColorSharped), [C++](https://github.com/xuboying/randomcolor-cpp), [Go](https://github.com/hansrodtang/randomcolor), [Haskell](http://hackage.haskell.org/package/palette-0.3/docs/Data-Colour-Palette-RandomColor.html), [Kotlin](https://github.com/brian-norman/RandomKolor), [Mathematica](https://github.com/yuluyan/PrettyRandomColor), [PHP](https://github.com/mistic100/RandomColor.php), [Python](https://github.com/kevinwuhoo/randomcolor-py), [Raku](https://github.com/Xliff/p6-RandomColor), [Objective-C](https://github.com/yageek/randomColor), [Java](https://github.com/lzyzsd/AndroidRandomColor), [R](https://github.com/ronammar/randomcoloR), [Reason](https://github.com/ktrzos/bs-randomColor), [Dart](https://github.com/DAMMAK/RandomColorDart), [Ruby](https://github.com/khash/random_color), [Rust](https://github.com/elementh/random_color), [Swift](https://github.com/onevcat/RandomColorSwift) and [Typescript](https://www.npmjs.com/package/@types/randomcolor).

[![Demo](http://i.imgur.com/lOLCqvu.gif)](https://randomcolor.lllllllllllllllll.com)

To use randomColor **in the browser**, download the [latest minified version of randomColor](http://cdnjs.com/libraries/randomcolor) and include it on your page. Then call the script:

```javascript
var color = randomColor(); // a hex code for an attractive color
```

To use randomColor **on the server with node.js**, install [randomColor from npm](https://www.npmjs.org/package/randomcolor) then call the script:

```bash
npm install randomcolor
```
```javascript
var randomColor = require('randomcolor'); // import the script
var color = randomColor(); // a hex code for an attractive color
```

## Options

You can pass an options object to influence the type of color it produces. The options object accepts the following properties:

```hue``` – Controls the hue of the generated color. You can pass a string representing a color name: ```red```, ```orange```, ```yellow```, ```green```, ```blue```, ```purple```, ```pink``` and ```monochrome``` are currently supported. If you pass a  hexidecimal color string such as ```#00FFFF```, randomColor will extract its hue value and use that to generate colors.

```luminosity``` – Controls the luminosity of the generated color. You can specify a string containing ```bright```, ```light``` or ```dark```.

```count``` – An integer which specifies the number of colors to generate.

```seed``` - An integer or string which when passed will cause randomColor to return the same color each time.

```format``` – A string which specifies the format of the generated color. Possible values are ```rgb```, ```rgba```, ```rgbArray```, ```hsl```, ```hsla```, ```hslArray``` and ```hex``` (default).

```alpha``` – A decimal between 0 and 1. Only relevant when using a format with an alpha channel (```rgba``` and ```hsla```). Defaults to a random value.

## Examples

```javascript

// Returns a hex code for an attractive color
randomColor(); 

// Returns an array of ten green colors
randomColor({
   count: 10,
   hue: 'green'
});

// Returns a hex code for a light blue
randomColor({
   luminosity: 'light',
   hue: 'blue'
});

// Returns a hex code for a 'truly random' color
randomColor({
   luminosity: 'random',
   hue: 'random'
});

// Returns a bright color in RGB
randomColor({
   luminosity: 'bright',
   format: 'rgb' // e.g. 'rgb(225,200,20)'
});

// Returns a dark RGB color with random alpha
randomColor({
   luminosity: 'dark',
   format: 'rgba' // e.g. 'rgba(9, 1, 107, 0.6482447960879654)'
});

// Returns a dark RGB color with specified alpha
randomColor({
   luminosity: 'dark',
   format: 'rgba',
   alpha: 0.5 // e.g. 'rgba(9, 1, 107, 0.5)',
});

// Returns a light HSL color with random alpha
randomColor({
   luminosity: 'light',
   format: 'hsla' // e.g. 'hsla(27, 88.99%, 81.83%, 0.6450211517512798)'
});

```

