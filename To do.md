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


