# Random Color

For generating attractive random colors. 

```javascript
randomColor() // returns a hex code e.g. '#F7A7D9'
```

See more examples on [the live demo](http://llllll.li/random-color/).

### Options

You can pass an options object to influence the type of color it produces. The options object accepts the following properties:

**Hue** – Controls the hue of the generated color. You can pass:
- A string representing a color name (e.g. 'orange'). Possible color names are *red, orange, yellow, green, blue, purple, pink and monochrome*. 
- An integer between 0 and 360. This corresponds to an H value in the HSV color space. 


**Count** – An integer which specifies the number of colors to generate.

**Format** – A string which specifies the format of the generated color. Possible values are *hsvArray, rgb, rgbArray, and hex*. The type of the generated color will vary based on the format chosen.
 
### Examples

Here's are a few examples showing what you can do with the options object. 

```javascript
randomColor({
   count: 10, // returns array of 10 colors...
   hue: 'green', // with green hues...
);

randomColor({
   hue: {contrasts: 'blue'}, // returns a color which contrasts with blue
);

randomColor({
   luminosity: 'bright', // returns a bright color
   format: 'rgb' // in rgb, e.g. 'rgb(225,200,20)'
);

```

