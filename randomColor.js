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

  // First we pick a hue (H)
  H = pickHue(options);

  function pickHue (options) {
    
    var hueRange = [0, 360];

    if (options.hue !== 'undefined') {

      console.log('YES, options.hue is ' + options.hue);

      // If there's a preference for the color's hue
      // update the hue range to reflect this
      hueRange = getHueRange(options.hue);

      console.log('hue range is ' + hueRange);

    };

    hue = randomWithin(hueRange);

    // Handle the red outlier
    if (hue < 0) {hue = 360 + hue};

    return hue
    
  };

  // Then use H to determine saturation (S)
  S = pickSaturation(H, options);

  function pickSaturation (hue, options) {

    var saturationRange = getColorInfo(hue).saturationRange;

    var sMin = saturationRange[0],
        sMax = saturationRange[1];
    
    switch (options.luminosity) {
      case 'dark':
        sMin = 55;
      case 'light':
        sMax = 55;
    };

    return randomWithin([sMin, sMax]);

  };

  // Then use S and H to determine brightness (B).
  B = pickBrightness(H, S, options);

  function pickBrightness (H, S, options) {
    
    var brightness,
        bMin = getMinimumBrightness(H, S),
        bMax = 100;

    switch (options.luminosity) {
      case 'dark':
        bMax = (bMax + bMin)/2
      case 'light':
        bMin = (bMax + bMin)/2
    };

    console.log(bMin);

    return randomWithin([bMin, bMax]);

  };

  function setFormat (hsv, options) {

    switch (options.format) {
      
      case 'hsvArray':
        return hsv;
      
      case 'hsv':
        return colorString('hsv', hsv);
      
      case 'rgbArray':
        return HSVtoRGB(hsv);

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