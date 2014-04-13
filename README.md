# Random Color

For generating attractive random colors. [See the demo](https://rawgithub.com/davidmerfield/Random-Color/master/demo/index.html).

```javascript
randomColor() // returns a hex code e.g. '#F7A7D9'
```

### Options

You can pass an options object to influence the type of color it produces. The options object accepts the following properties:

**Hue** – Possible values are *red, orange, yellow, green, blue, purple, pink*. Also accept a hue value between 0 and 360

**Luminosity** – Possible values are *light, dark, bright, dull*.

**Format** – Possible values are *hsv, rgb, rgbArray, and hex*.
 
### Examples

Here's are a few examples showing what you can do with the options object. [See more examples on the demo](https://rawgithub.com/davidmerfield/Random-Color/master/demo/index.html)

```javascript
randomColor({
   count: 10, // returns array of 10 colors...
   hue: 'green', // with green hues...
);

randomColor({
   count: 10, // returns array of 10 distinct colors...
   luminosity: 'bright' // with bright luminosities.
);

randomColor({
   count: 10, // returns array of 10 distinct colors...
   hue: {complements: 'blue'}, // with hues which complement blue
);

randomColor({hue: 'orange'}) // returns '#F7A7D9'
```

