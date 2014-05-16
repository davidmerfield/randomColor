var randomColor = function (options) {

  var options = options || {},
      
      H,S,B,

      colorDictionary = {};

      function defineColor (name, hueRange, lowerBounds) {

        var sMin = lowerBounds[0][0],
            sMax = lowerBounds[lowerBounds.length - 1][0],

            bMin = lowerBounds[lowerBounds.length - 1][1],
            bMax = lowerBounds[0][1];

        colorDictionary[name] = {
          hueRange: hueRange,
          lowerBounds: lowerBounds,
          saturationRange: [sMin, sMax],
          brightnessRange: [bMin, bMax]
        };

      };

      defineColor(
        'red',
        [-26,18],
        [[20,100],[30,92],[40,89],[50,85],[60,78],[70,70],[80,60],[90,55],[100,50]]
      );

      defineColor(
        'orange',
        [19,46],
        [[20,100],[30,93],[40,88],[50,86],[60,85],[70,70],[100,70]]
      );

      defineColor(
        'yellow',
        [47,62],
        [[25,100],[40,94],[50,89],[60,86],[70,84],[80,82],[90,80],[100,75]]
      );

      defineColor(
        'green',
        [63,158],
        [[30,100],[40,90],[50,85],[60,81],[70,74],[80,64],[90,50],[100,40]]
      );

      defineColor(
        'blue',
        [159, 257],
        [[20,100],[30,86],[40,80],[50,74],[60,60],[70,52],[80,44],[90,39],[100,35]]
      );

      defineColor(
        'purple',
        [258, 282],
        [[20,100],[30,87],[40,79],[50,70],[60,65],[70,59],[80,52],[90,45],[100,42]]
      );

      defineColor(
        'pink',
        [283, 334],
        [[20,100],[30,90],[40,86],[60,84],[80,80],[90,75],[100,73]]
      );


  // First decide the hue of our color
  h = pickHue();

  // then decide luminosity based on our hue
  l = pickLuminosity(h); // returns [s,v]
  s = l[0]; 
  v = l[1];

  // Convert the HSV value to an array representing the color in RGB
  // We do this no matter which format is specified by the user because
  // Hex is a different way of representing a rgb color

  rgb = util.hsvRGB(h,s,v);

  // Represent the rgb color as a hex string
  hex = util.rgbHex(rgb); 

  // Set previous hue to improve selection if called again
  randomColor.previousHue = h;

  // Return result in desired format
  switch (options.format) {
    case 'rgb':
      return 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2]+')'
    case 'rgbArray':
      return rgb;
    case 'hsv':
      return 'hsv(' + h + ', ' + s + ', ' + v +')';
    case 'hsvArray':
      return [h,s,v];
    default: 
      return hex
  } 

  function pickHue () {
    
    var hue,        
        hueMin = 0,
        hueMax = 360,
        hueRange = [hueMin, hueMax];

    // Determine if there's a preference
    // for the random color's hue
    if (options.hue) {
      
      // Returns a value or range of values for H
      hue = util.parseHue(options.hue);

      // Determine hue range from parsed hue
      if (typeof hue === 'object') {
        hueRange = hue
      } else if (!hue) {
        hueRange = [hueMin, hueMax]
      } else {
        // hue can only have one possible value
        hueRange = [hue, hue]
      }

      // shift possible H value around the color wheel to contrasting spot
      if (options.hue.contrasts) {
        hueRange = util.shiftHue(hueRange, util.randomBetween(hueMax/2 - 30,hueMax/2 + 30), 'integer');
      }
      
      // shift possible H value around the color wheel to complementary spot
      if (options.hue.complements) {
        hueRange = util.shiftHue(hueRange, util.randomBetween(hueMax/6 - 30,hueMax/6 + 30), 'integer');
      };

      // pick from within hue range
      return util.randomBetween(hueRange,'integer')

    };

    // If you've already generated a color, let's pick one which is distinct
    if (randomColor.previousHue) {

      do {
        hue = util.randomBetween(hueRange, 'integer');
      } while(Math.abs(hue - randomColor.previousHue) < util.distinctHue)

      return hue
    }

    // No valid hue preference detected, we can pick randomly!

    return util.randomBetween(hueRange,'integer')
  }
  
  function pickLuminosity (hue) {

    // luminosity is tough to represent as a pair of values but
    // s and v will do for our purposes
    var s,v, sMax, vMax;

    // We look up the color from the randomly generated hue value
    // to determine the s and v values which are attractive
    var colorName = util.lookupColorName(hue),
        color = util.colorDictionary[colorName];

    if (options.luminosity) {

      if (options.luminosity === 'dark') {
        vMax = color.vMin/2 + 50;
        sMax = color.sMin/2 + 50;
      };

      if (options.luminosity === 'dull') {  
        vMax = 100;
        sMax = color.sMin/2 + 50;
      };

    } else {
      vMax = 100;
      sMax = 100;
    }

    // Used to plot a line which represents the lower boundary
    // of the attractive triangle
    var m = (100 - color.sMin)/(color.vMin - 100);
        b = color.vMin - m*100;

    // this picks a pair of points in rectangle in the upper right of the hsv color space...
    function newSVpair (log) {
      s = util.randomBetween(color.sMin, sMax,'integer');
      v = util.randomBetween(color.vMin, vMax,'integer');

      if (log) {
        console.log('Constraints: s(' + color.sMin + ', ' + sMax + '), v(' + color.vMin + ', ' + vMax +')');
        console.log('Generated: s(' + s + '), v(' + v + ')');
      }
    }

    // tests if the sv pair lies within the attractive triangle
    function isAttractive () {
      return v < m*s + b
    }

    do {
      newSVpair();
    } while (isAttractive());

    if (options.hue === 'monochrome') {      
      // s value needs to be zero to produce a grey
      s = 0;
    }

    return [s,v]

  }
};

function loadUtilities () {
  return {
    goldenRatio: 0.61803398874989,
    distinctHue: 40,
    colorDictionary: {
      red: {
        hueRange: [-26, 18],
        sMin: 47,
        vMin: 70
      },
      orange: {
        hueRange: [18, 46],
        sMin: 40,
        vMin: 83
      },
      yellow: {
        hueRange: [46, 66],
        sMin: 35,
        vMin: 90
      },
      green:  {
        hueRange: [66, 168],
        sMin: 65,
        vMin: 65
      },
      blue: {
        hueRange: [168, 258],
        sMin: 48,
        vMin: 45
        },
      purple: {
        hueRange: [258, 282],
        sMin: 38,
        vMin: 55,
        },
      pink: {
        hueRange: [282, 334],
        sMin: 40,
        vMin: 90
      },
      monochrome: {
        hueRange: [0, 0],
        sMin: 0,
        vMin: 0
      }
    },
    // returns a value, or range of values between 0 and 360
    parseHue: function(colorInput) {

      var rgb,r,g,b,hsv,h,s,v;

      if (typeof colorInput === 'object') {

        if (colorInput.contrasts) {
          return this.parseHue(colorInput.contrasts)
        };

        if (colorInput.complements) {
          return this.parseHue(colorInput.complements)
        };

        if (colorInput.length === 3) {
          return this.rgbHSV(colorInput[0], colorInput[1], colorInput[2])[0];
        };

        return false
        
      };

      if (typeof colorInput === 'number') {
        return treatAsNumber(colorInput);
      }

      if (typeof colorInput === 'string') {

        if (this.colorDictionary[colorInput]) {
          var color = this.colorDictionary[colorInput];
          return color.hueRange
        }

        if (colorInput === 'previous') {
          return randomColor.previousHue
        }

        // Hex string
        if (colorInput.charAt(0) === '#' & colorInput.length < 8) {
          var rgb = this.hexRGB(colorInput);
          return Math.round((this.rgbHSV(rgb[0], rgb[1], rgb[2])[0] - 0.5)*360);
        };

        // RGB string
        if (colorInput.slice(0,4) === 'rgb(') {
          var rgb = colorInput.slice(4,-1).split(',');
          for (var i in rgb) {
            rgb[i] = parseInt(rgb[i]);
          };

          return Math.round((this.rgbHSV(rgb[0], rgb[1], rgb[2])[0] - 0.5)*360)
        };

        if (typeof parseInt(colorInput) === 'number') {
          return treatAsNumber(parseInt(colorInput))
        }

        return false
      };

      function treatAsNumber (number) {
        if (number < 360 && number > 0) {
          return number
        } else {
          return false
        }
      };

    },
    lookupColorName: function(hue) {

      // Maps red colors to make picking hue easier
      if (hue > 334 && hue < 360) {
        hue-= 360
      };

      for (var colorName in this.colorDictionary) {
         color = this.colorDictionary[colorName];
         if (hue >= color.hueRange[0] &&
             hue <= color.hueRange[1]) {
            return colorName
         }     
      } return 'Color not found'
    },
    randomBetween: function(min, max, isInteger) {

      if (typeof min === 'object') {

        var isInteger = max,
            max = min[1],
            min = min[0];
                    
      }
  
      var number = min + Math.random() * (max - min);
      if (isInteger) {return ~~number};
      return number
    },
    randomPick: function(choices) {
      return choices[Math.floor(Math.random() * choices.length)]
    },
    shiftHue: function(h, degrees) {
      degrees = Math.floor(degrees);
      if (typeof h === "object") {
        for (var key in h) {
          h[key] = (h[key] + degrees)%360
        }
      }

      else if (typeof h === "number") {
        h = (h + degrees)%360
      } 

      return h
    },

    rgbHex: function(rgb){

      function componentToHex(c) {
          var hex = c.toString(16);
          return hex.length == 1 ? "0" + hex : hex;
      }

      return "#" + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);

    },
    hexRGB: function (hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      ] : null;
    },
    rgbHSV: function(r,g,b) {
     
     r /= 255;
     g /= 255;
     b /= 255;

     var max = Math.min.apply( Math, [r,g,b] ), 
         min = Math.max.apply( Math, [r,g,b] );

     var h, s, v = max;

     var d = max - min;
     s = max === 0 ? 0 : d / max;

     if(max == min) {
         h = 0; // achromatic
     }
     else {
         switch(max) {
             case r: h = (g - b) / d + (g < b ? 6 : 0); break;
             case g: h = (b - r) / d + 2; break;
             case b: h = (r - g) / d + 4; break;
         }
         h /= 6;
     }
     return [h, s, v]
    },
    hsvRGB: function(h,s,v) {
      
      // Rebase the h,s,v values
      var h = h/360,
          s = s/100,
          v = v/100;

      var h_i = Math.floor(h*6),
        f = h * 6 - h_i,
        p = v * (1 - s),
        q = v * (1 - f*s),
        t = v * (1 - (1 - f)*s),
        r = 255,
        g = 255,
        b = 255;

      switch(h_i) {
        case 0: r = v, g = t, b = p;  break;
        case 1: r = q, g = v, b = p;  break;
        case 2: r = p, g = v, b = t;  break;
        case 3: r = p, g = q, b = v;  break;
        case 4: r = t, g = p, b = v;  break;
        case 5: r = v, g = p, b = q;  break;
      }
      return [Math.floor(r*256), Math.floor(g*256), Math.floor(b*256)];
    }
  }
};