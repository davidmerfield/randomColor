# Random Color

For generating attractive colors with an element of randomness. Here's an example:

>  randomColor()
   \> '#F7A7D9'

[See more examples on the demo](https://rawgithub.com/davidmerfield/Random-Color/master/demo/index.html)

## Options

randomColor lets you set preferences for the color it returns. Just pass an options object when you call randomColor:

Here's an example with preferences:

>  randomColor({
      hue: 'orange',
      luminosity: 'dark'
   })
   \> '#F7A7D9'

The full list of options is as follows:

- Hue
      Accepts a color name (e.g. 'orange') or a hue value (e.g. 124).
- Luminosity
      Accepts 'light', 'dark', 'bright', 'dull'
- Complements
      Accepts a color name (e.g. 'orange') or a hue value (e.g. 124).
      This will return a color which complements the hue you passed.
- Contrasts
      Accepts a color name (e.g. 'orange') or a hue value (e.g. 124).
      This will return a color which contrasts with the hue you passed.
- Format
      Accepts 'hsv', 'hsvArray', 'rgb', 'rgbArray', and 'hex'
      This modifys the format of the color returned.

## How it works

If you look at a representation of the HSV color space, there's broadly speaking a triangle of attractive colors to the top right for each H value between 0 and 360. 

![Attractive triangle](/demo/attractive_triangle.png "Attractive triangle")

Try to pick an S and V value which lies within this triangle. Pick lighter colors from the top left of this region. Pick darker colors from the lower right of this triangle.

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


