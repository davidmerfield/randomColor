function randomColor (options) {

  var h,s,v,l,
      rgb,hex,

      util = loadUtilities();

  // Create empty options object if none is passed
  // This stops statements like 'if (options.hue)' throwing errors
  if (!options) {var options = {}};

  // Multiple colors
  if (options.count) {
    var colors = [],
        totalColors = options.count;
        options.count = false;

    while (colors.length < totalColors) {
      colors.push(randomColor(options))
    }

    return colors
  }

  // First we determine the
  // hue of our random color
  h = pickHue();

  function pickHue () {
    
    var hue,        
        hueMin = 0,
        hueMax = 360,
        hueRange = [hueMin, hueMax];

    // Determine if there's a preference
    // for the random color's hue
    if (options.hue) {
      
      // Determine if the hue preference
      // is a color name (e.g. 'orange')
      if (util.colorDictionary[options.hue]) {
        
        // Look up the range of hues associated
        // with the color name (e.g. [18,46] for orange)
        hueRange = util.colorDictionary[options.hue].hueRange;

        // need to handle the RED exeception with negative h values

        // Pick a random H value within this range
        return util.randomBetween(hueRange,'integer')

      } 

      if (options.hue.contrasts || options.hue.complements) {

        var hueShift = util.randomBetween(hueMax/2 - 30,hueMax/2 + 30);

        if (options.hue.complements) {
          hueShift = util.randomBetween(hueMax/6 - 30,hueMax/6 + 30)
        }
        hue = util.parseHue(options.hue);
        hue = util.shiftHue(hueRange, hueShift, 'integer');

        if (typeof hue === 'object') {
          return util.randomBetween(hue,'integer')
        } else {
          return hue
        }
      }

      // Determine if the hue preference is a
      // specific H value (e.g. 0 for red)
      if (typeof options.hue === "number") {

        // Ensure H lies within possible values
        if (options.hue <= hueMax && options.hue >= hueMin) {
          return options.hue 
        }

        // Invalid H value
        console.log('Pick a hue between' + hueMin + ' and  ' + hueMax)
      }      
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

  l = pickLuminosity(h); // Returns an array with S and V values
  
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

      };

      if (options.luminosity === 'bright') {

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

  // Split the luminosity array into S and V values 
  s = l[0]; 
  v = l[1];

  // Convert the HSV value to an array representing the color in RGB
  // We do this no matter which format is specified by the user because
  // Hex is a different way of representing a rgb color

  rgb = util.hsvRGB(h,s,v);

  // Represent the rgb color as a hex string
  hex = util.rgbHex(rgb); 

  if (options.format === 'rgb'){
    return 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2]+')'
  };

  if (options.format === 'rgbArray'){
    return rgb // e.g [124,76,200]
  };

  if (options.format === 'hsv'){
    return 'hsv(' + h + ', ' + s + ', ' + v +')'
  };

  if (options.format === 'hsvArray'){
    return [h,s,v] // e.g [124,70,30]
  };

  if (options.debug) {
    console.log('Input options: ');
    console.log(options);
    console.log('Output: ');
    console.log('HSV: ' + h + ', ' + s + ', ' + v);
    console.log('RGB: ' + rgb);
    console.log('Hex: ' + hex);
  };

  randomColor.previousHue = h;

  return hex

};

function loadUtilities () {
  return {
    goldenRatio: 0.61803398874989,
    distinctHue: 40,
    colorDictionary: {
      red: {
        hueRange: [-26, 18], // oh dear there's also red between 334, 360
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

        if (colorInput.r && colorInput.g && colorInput.b) {
          return this.rgbHSV(colorInput.r, colorInput.g, colorInput.b)[0];
        };

        if (colorInput.h && colorInput.s && colorInput.v) {
          return colorInput.h;
        }

        if (colorInput.length === 3) {
          return this.rgbHSV(colorInput[0], colorInput[1], colorInput[2])[0];
        };
        
      };

      if (typeof colorInput === 'number') {
        return treatAsNumber(colorInput);
      }

      if (typeof colorInput === 'string') {

        if (this.colorDictionary[colorInput]) {
          var color = this.colorDictionary[colorInput];
          return color.hueRange
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


      };

      function treatAsNumber (number) {
        if (number < 360 && number > 0) {
          return number
        } else {
          return 'hue must be between 0 and 360'
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
      if (isInteger) {return Math.floor(number)};
      return number
    },
    randomPick: function(choices) {
      return choices[Math.floor(Math.random() * choices.length)]
    },
    shiftHue: function(h, degrees) {
      degrees = Math.floor(degrees);
      console.log('shifting b y '+ degrees)
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