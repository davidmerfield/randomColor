# Random Color

For generating attractive colors with an element of randomness. [See the demo](https://rawgithub.com/davidmerfield/Random-Color/master/demo/index.html).

```javascript
randomColor() // returns '#F7A7D9'
```



### Options

You can pass an options object to influence the type of color it produces. The options object accepts the following properties:

**Hue** – Possible values are *red, orange, yellow, green, blue, purple, pink*. Also accept a hue value between 0 and 360

**Luminosity** – Possible values are *light, dark, bright, dull*.

**Format** – Possible values are *hsv, rgb, rgbArray, and hex*.
      
Here's an example with an options object. This will produce a random orange color:

```javascript
randomColor({hue: 'orange'}) // returns '#F7A7D9'
```

[See more examples on the demo](https://rawgithub.com/davidmerfield/Random-Color/master/demo/index.html)

## How it works

The goal of the function is to return colors of a random hue with high luminosity. We'll use the [HSV color space](http://en.wikipedia.org/wiki/HSL_and_HSV) to determine a color since I find HSV more intuitive than RGB for working with luminosity.

1. Pick a hue

First we pick a hue value (**H**) at random. **H** corresponds to the angle on the surface of the HSV cylinder. 

By default, **H** is picked randomly between 0 and 360. If a hue preference is specified then the range of possible **H* values is restricted. For example, we'd classify orange hues as lying between an **H** value of 18 and 46.

2. Pick a luminosity

If you look at a representation of the HSV color space, there's roughly a region of attractive colors to the top right for each H value between 0 and 360. 

![Attractive triangle](/demo/attractive_triangle.png "Attractive triangle")
. Pick lighter colors from the top left of this region. Pick darker colors from the lower right of this triangle.

If 'dull' pick outside the attractive triangle

The attractive triangle will vary in area, but since hue is picked randomly the distribution of colors should be even, though the distribution of luminosities will vary at different hues.

I could pick a random color from the dictionary first, then a random hue within that hue range.
This would normalize for different colors, since there are more red hues on the HSV spectrum than yellow hues. This is super cultural.

## Disclaimers

Perceived luminance is hard to represent digitally. Colors are quite complicated cultural constructs Nevertheless it's useful to generate attractive colors.

## Code outline

If H, S or V value is passed
   set the values which are passed

1. Determine H value

If a color preference is passed (e.g. orange )
   determine hue range for color (orange hues lie roughly between 18 and 46)
   set H to random integer within that range

If 'monochrome' is passed
   set H to random between 0 and 360
   set S to 0
   set V to 0

If 'contrasts color' is passed
   determine H range for passed color
   pad this range on either side
   Set H to random outside the range of the passed color

If 'complements color' is passed
   determine H range for passed color
   pick random H value within this range
   Increase H by 180

If no hue preference is passed
   set H to random between 0 and 360

2. Decide saturation (S) and brightness (V) values

If 'unweighted' random color is passed
   set H as random between 0 and 360
   set S as random between 0 and 1
   set V as random between 0 and 1

Determine set of points which lie within attractive triangle at the passed H value

If 'bright' is passed
   pick random S,V pair within the upper section of the attractive triangle

If 'dark' is passed
   pick random S,V pair within the lower section of the attractive triangle

If 'vibrant' is passed
   pick random S,V pair within the upper right of the attrative triangle

If 'pastel' is passed
   pick random S,V pair within the upper left of the attractive triangle

If 'dull' is passed
   pick random S,V pair outside the attractive triangle

3. Other options


