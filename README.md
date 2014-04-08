# Random Color Generator

For generating attractive colors with an element of randomness. Returns a hex string by default.

[Live demo](https://rawgithub.com/davidmerfield/Random-Color/master/demo.html)

Disclaimer: Perceived luminance is hard to represent digitally. Colors are quite complicated cultural constructs Nevertheless it's useful to generate attractive colors.

## How it works

If you look at a representation of the HSV color space, there's broadly speaking a triangle of attractive colors to the top right for each H value between 0 and 360. 

[Attractive triangle](http://i.imgur.com/EyRGxDM.png)

Try to pick an S and V value which lies within this triangle. Pick lighter colors from the top left of this region. Pick darker colors from the lower right of this triangle.

If 'dull' pick outside the attractive triangle

## Code outline

If H, S or V value is passed
   set the values which are passed
   
If a hue range is specified (e.g. orange which lies between 18 and 46)
   set H to random integer within that range, or if 

Set H value
   Pick random value between 0 and 360
   Weight picker to  there's a lot of green and red on the spectrum, which might be suboptimal.

If 'unweighted' random color
   set H as random between 0 and 360
   set S as random between 0 and 1
   set V as random between 0 and 1

If 'monochrome'
   set H to random between 0 and 360
   set S to 0
   set V to 0

2. Decide saturation (S) and brightness (V)

