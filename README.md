# [Random Color](http://llllll.li/randomColor)

A tiny script for generating attractive random colors. See the results on [the demo](http://llllll.li/randomColor/).

[![Demo](http://llllll.li/randomColor/repo_demo.gif)](http://llllll.li/randomColor)

randomColor is available [minified on cdnjs](http://cdnjs.com/libraries/randomcolor). It is also distributed on [npm](https://www.npmjs.org/package/randomcolor) and bower.

```javascript
npm install randomcolor
```
randomColor has been ported to [C#](https://github.com/nathanpjones/randomColorSharped), [Go](https://github.com/hansrodtang/randomcolor), [PHP](https://github.com/mistic100/RandomColor.php), [Python](https://github.com/kevinwuhoo/randomcolor-py), [Swift](https://github.com/onevcat/RandomColorSwift), [Objective-C](https://github.com/yageek/randomColor) and [Java](https://github.com/lzyzsd/AndroidRandomColor).
 
### Options

You can pass an options object to influence the type of color it produces. The options object accepts the following properties:

**Hue** – Controls the hue of the generated color. You can pass a string representing a color name: ```red```, ```orange```, ```yellow```, ```green```, ```blue```, ```purple```, ```pink``` and ```monochrome``` are currently supported.

**Luminosity** – Controls the luminosity of the generated color. You can specify a string containing ```bright```, ```light``` or ```dark```.

**Count** – An integer which specifies the number of colors to generate.

**Seed** - An integer which when passed will cause randomColor to return the same color each time.

**Format** – A string which specifies the format of the generated color. Possible values are ```rgb```, ```rgbArray```, ```hsl```, ```hslArray``` and ```hex``` (default).

### Examples

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

```

### License

This project is licensed under the terms of the MIT license.

### To do 

*More generally, it might be a good idea to consider using other color models.*

1. When returning an array of multiple colors, try to make each color as distinct as possible. Make sure each color is distinct to its neighbours.
2. Improve attractive dark color generation, currently they're a touch murky.
3. Improve the color dictionary
  - definition of hue values and attractive luminosity bounds
  - think about how to store hue aliases (e.g. fuschia) or subranges (e.g teal)
  - think about making a little point and click tool for defining your own luminosity bounds and customizing the color dictionary
4. Think about using and returning seeds.
5. Think about adding feature to return complementary & contrasting colors, as well as color triads, tetrads etc. Other libraries might already do this better though.
6. Think about adding a scheme options which would return a dominant color, as well as secondary, tertiary color and primary and secondary text colors. This might be a bad idea.

http://indiegamr.com/generate-repeatable-random-numbers-in-js/
