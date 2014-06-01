![Logo](http://s28.postimg.org/va3ipp2h9/repo_Logo.png)
# Random Color

For generating attractive random colors.

```javascript
randomColor() // returns a hex code e.g. '#F7A7D9'
```

See more examples on [the demo](http://llllll.li/randomColor/).

### Options

You can pass an options object to influence the type of color it produces. The options object accepts the following properties:

**Hue** – Controls the hue of the generated color. You can pass a string representing a color name (e.g. 'orange'). Possible color names are *red, orange, yellow, green, blue, purple, pink and monochrome*.

**Luminosity** – Controls the luminosity of the generated color. You can pass a string containing *bright, light* or *dark*.

**Count** – An integer which specifies the number of colors to generate.

**Format** – A string which specifies the format of the generated color. Possible values are *hsvArray, rgb, rgbArray, and hex*. The type of the generated color will vary based on the format chosen.

### Examples

Here's are a few examples showing what you can do with the options object.

```javascript
// An array of ten green colors
randomColor({
   count: 10,
   hue: 'green'
});

// A light blue
randomColor({
   luminosity: 'light',
   hue: 'blue'
});

// A 'truly random' color
randomColor({
   luminosity: 'random',
   hue: 'random'
});

// A bright color in RGB
randomColor({
   luminosity: 'bright', // returns a bright color
   format: 'rgb' // in rgb, e.g. 'rgb(225,200,20)'
});

```

### License

This project is licensed under the terms of the MIT license.
