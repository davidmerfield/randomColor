# Generating attractive colors

Your display can render 16,777,216 possible colors. A simple color generator would pick one of these randomly. Here's the output of a simple random color generator run 50 times.

-- CODE -------------------------------------------------

function randomColor() {
	var r = Math.floor(Math.random()*255),
			g = Math.floor(Math.random()*255),
			b = Math.floor(Math.random()*255);
	return [r,g,b];
}

-- OUTPUT -------------------------------------------------

As you can see, the generator has a few bright and vibrant colors along with plenty of muddy browns and greens and dull yellows, as well as washed out pinks and dirty browns. This because the RGB color space which our screens use needs to provide something to render the colors our eyes can see as accurately as possible. Unfortuneately, the world has lots of muddy browns.

So, how can we generate 
Attractive is a difficult feature to encode in an algorithm since it's subjective. However, we could expand attractive to a

The solution therefore is to restrict the set of possible colors from which our function picks.

The colors on your display are formed using pixels, each of which has a red, green and blue component.  When we encode a color digitally we tell the pixel how much of each constituent color to show. For example, for the color:

rgb(255,0,0)

This tells your display to maximize the intensity of the red channel, and to ignore the green and blue. Naturally it produces a bright red.

Hex codes are a simpler representation of these three values. For example the hex code for rgba(255,0,0) is '#FF0000'. The first two digits represent the red channel in base sixteen, the next two digits the blue channel and the final two the green.

The eye can distinguish around 10 million colors. Our screens can only render 1/10 of this so there's plenty we're missing out on. Would recommend seeing the work of Yves Klein in person. An example of how powerful a color that you're unused to seeing can be.

## How the generator works

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


