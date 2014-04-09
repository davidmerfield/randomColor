var randomColor = function randomColor(options){

  var h,s,v;

  // I'm using the HSV color space to pick our random color since
  // I find it more intuitive than RGB for modiying colors and determining areas of attractive colors

  h = pickHue();
  sv = pickLuminosity(h); // will return an array with s and v values
  s = sv[0]; // awkward
  v = sv[1];

  function pickHue () = {
    
    if (argumentsHas('monochrome')) {
      return 0; // The H value has no bearing on the appearance of a grey
    }

    if (options.hue) {
      
      // Check if user wants a color with specific h value (e.g. 0 for red)
      if (typeof options.hue === "number") {
        if (options.hue <= 360 &&
            options.hue >= 0) {
          return options.hue 
        }
        console.log('Warning: pick H value between 0 and 360')
      }

      // Check if user wants a color with a particular hue (e.g. orange)
      if (util.colorDictionary[options.hue]) {
        var hueRange = util.colorDictionary[options.hue].h;
        return util.randomBetween(hueRange,true)
      } else {
        console.log('Warning: could not find your hue.')
      };
      
    };

    // No hue preference detected
    return util.randomBetween(0,360,true)
  }

  function pickLuminosity (hue) = {

    // luminosity is tough to represent as a pair of values but
    // s and v will do for our purposes
    var s,v;

    attractiveTriangle = {
      [45,100],
      [100,100],
      [100,65]
    };

    // this picks a pair of points in rectangle in the upper right of the hsv color space...
    s = util.randomBetween(45,100,true);
    v = util.randomBetween(65,100,true);

    // but we want points within the attractive triangle...
    // so we'll reflect the points which are generated below the bottom edge of the triangle


    if (argumentsHas('monochrome')) {
      
      // s value needs to be zero to produce a grey
      s = 0;

      // this should be weighted to higher numbers
      if (argumentsHas('light')) {
        v = util.randomBetween(50,100);
      };

      // this should be weighted to lower numbers
      if (argumentsHas('dark')) {
        v = util.randomBetween(0,50);
      };
    }

    if (argumentsHas('unweighted')) {
      s = util.randomBetween(0, 360,true);
      v = util.randomBetween(0, 360,true);
    }

    return [s,v]

  }

  function formatColor (h,s,v) = {

    // Takes H,S and V values and formats it to the user's preferences
    // This defaults to a hex string (e.g '#F6F7F8') since it's more widely supported than rgb

    var rgb = util.hsvRGB(h,s,v),
        hex = util.rgbHex(rgb); // looks a bit weird how h,s,v are values and rgb is array

    // More broadly I need to work out how to better pass preferences to RandomColor()
    // Currently you could pass multiple formatting preferences

    if (argumentsHas('rgb')){
      return 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2]+')'
    };

    if (argumentsHas('rgbArray')){
      return rgb // e.g [124,76,200]
    };

    if (argumentsHas('hsv')){
      return 'hsv(' + h + ', ' + s + ', ' + v +')'
    };

    if (argumentsHas('hsvArray')){
      return [h,s,v] // e.g [124,70,30]
    };

    return hex
  }

  var hue = Math.random(),
      saturation = 0.8,
      value = 0.9,
    
  function argumentsHas  (key) = {
    for (var i in randomColor.arguments){
      if (key === randomColor.arguments[i]) {return true}
    }
    return false
  };


  var util = {
    goldenRatio: 0.61803398874989,
    randomBetween: function(min, max, isInteger) {

        // this needs to accept multiple arrays too

        var number = min + Math.random() * (max - min);
        if (isInteger) {return Math.floor(number)};
        return number
    },
    randomPick: function(choices) {
      return choices[Math.floor(Math.random() * choices.length)]
    },
    rgbHex: function(rgb){
      return '#' + ("000000" +
         rgb[0].toString(16) +
         rgb[1].toString(16) + 
         rgb[2].toString(16)
         ).slice(-6);
    },
    hsvRGB: function(h,s,v) {
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
  };

  var colorDictionary = {
    red: {
      h: [0, 18,
          334, 360]
      },
    orange: {
      h: [18, 46]
    },
    yellow: {
      h: [46, 66]
    },
    green:  {
      h: [66, 168]
    },
    blue: {
      h: [168, 258]
      },
    purple: {
      h: [258, 282]
      },
    pink: {
      h: [282, 334]
      },
  };

  if (argumentsHas('light')){
    value = 1,
    saturation = 0.4
  };

  if (argumentsHas('dark')){
    value = 0.5,
    saturation = 1
  };
  // if (argumentsHas('dark')){value -= 0.5};
  // if (argumentsHas('bright')){saturation += 0.5};
  // if (argumentsHas('dull')){saturation -= 0.5};

  return util.hsvRGB(hue,saturation,value);

};
