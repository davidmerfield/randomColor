# To do


- Add feature to generate an array of X random colors with option to make them distinct
- Add feature to generate a contrasting color
- Add feature to generate a complementary color
- Add feature to generate transparent colors
- Add feature to generate color which can have readable text on it
- Add feature to handle multiple hue values passed as a preference
- Add feature to harmonize array of randomly generated colors by mixing in an overlay
- Add theme options (e.g. neon, pastel, bold)

- Modify the color library to accept multiple hue ranges for a color (e.g red)
- Modify the color library to store a hue range against multiple strings (e.g. pink and fuschia map to same range)

- Expand the random number picker to across a range with a weight


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


