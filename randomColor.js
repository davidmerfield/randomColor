function randomColor (options) {
  
  var h,s,v,l,
      rgb,hex,

      util = loadUtilities();

  // Create empty options object if none is passed
  // This stops statements like 'if (options.hue)' throwing errors
  if (!options) {var options = {}};

  // First we determine the
  // hue of our random color
  h = pickHue();

  function pickHue () {
    
    // Determine if there's a preference
    // for the random color's hue
    if (options.hue) {
      
      // Determine if the hue preference
      // is a color name (e.g. 'orange')
      if (util.colorDictionary[options.hue]) {
        
        // Look up the range of hues associated
        // with the color name (e.g. [18,46] for orange)
        var hueRange = util.colorDictionary[options.hue].hueRange;

        // need to handle the RED exeception with negative h values

        // Pick a random H value within this range
        return util.randomBetween(hueRange[0],hueRange[1],'integer')

      } else {

        // The color dictionary doesn't contain the color string
        console.log('Warning: could not find your hue.')
      };

      // Determine if the hue preference is a
      // specific H value (e.g. 0 for red)
      if (typeof options.hue === "number") {

        // Ensure H is between 0 and 360
        if (options.hue <= 360 && options.hue >= 0) {
          return options.hue 
        }

        // Invalid H value
        console.log('Warning: pick H value between 0 and 360')
      }

      if (options.hue === 'monochrome') {
        return 0; // The H value has no effect on the appearance of a grey
      };
      
    };

    // No valid hue preference detected, we can pick randomly!
    return util.randomBetween(0,360,'integer')
  }

  l = pickLuminosity(h); // Returns an array with S and V values
  
  function pickLuminosity (hue) {

    // luminosity is tough to represent as a pair of values but
    // s and v will do for our purposes
    var s,v;

    // We look up the color from the randomly generated hue value
    // to determine the s and v values which are attractive
    var colorName = util.lookupColorName(hue),
        color = util.colorDictionary[colorName];

    console.log(color)
    // Used to plot a line which represents the lower boundary
    // of the attractive triangle
    var m = (100 - color.sMin)/(color.vMin - 100);
        b = color.vMin - m*100;

    do {

      // this picks a pair of points in rectangle in the upper right of the hsv color space...
      s = util.randomBetween(color.sMin, 100,'integer');
      v = util.randomBetween(color.vMin, 100,'integer');

    } while (v < m*s + b);

    // this ensures the points lie in the attractive triangle...

    // this should be weighted to higher numbers
    if (options.luminosity === 'light') {
      v = util.randomBetween(50,100);
    };

    // this should be weighted to lower numbers
    if (options.luminosity === 'dark') {
      v = util.randomBetween(0,50);
    };

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

  return hex

};

function loadUtilities () {
  return {
    goldenRatio: 0.61803398874989,
    colorDictionary: {
      red: {
        hueRange: [-26, 18], // oh dear there's also red between 334, 360
        sMin: 47,
        vMin: 70
      },
      orange: {
        hueRange: [18, 46],
        sMin: 45,
        vMin: 88
      },
      yellow: {
        hueRange: [46, 66],
        sMin: 35,
        vMin: 90
      },
      green:  {
        hueRange: [66, 168],
        sMin: 55,
        vMin: 50
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
      }
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

        // this needs to accept multiple arrays too

        var number = min + Math.random() * (max - min);
        if (isInteger) {return Math.floor(number)};
        return number
    },
    randomPick: function(choices) {
      return choices[Math.floor(Math.random() * choices.length)]
    },
    // this doesn't work all the time
    rgbHex: function(rgb){
      return '#' + ("000000" +
         rgb[0].toString(16) +
         rgb[1].toString(16) + 
         rgb[2].toString(16)
         ).slice(-6);
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