function randomColor (options) {
  
  var h,s,v,l,
      rgb,hex,
      options,

      util = loadUtilities();

  // Create empty options object if none is passed
  // This stops statements like 'if (options.hue)' throwing errors
  if (!options) {options = {}};

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
        var hueRange = util.colorDictionary[options.hue].h;

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

    attractiveTriangle = [
      [45,100],
      [100,100],
      [100,65]
    ];

    do {

      // this picks a pair of points in rectangle in the upper right of the hsv color space...
      s = util.randomBetween(45,100,'integer');
      v = util.randomBetween(65,100,'integer');

    } while (v < ((1415-7*s)/11));
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
  
  console.log('hue preference is: '+ options.hue);
  console.log('h is: '+ h);
  console.log('s is: '+ s);
  console.log('v is: '+ v);


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

  console.log(hex)
  return hex

};

function loadUtilities () {
  return {
    goldenRatio: 0.61803398874989,
    colorDictionary: {
      red: {
        h: [1, 18] // oh dear there's also red between 334, 360
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
      }
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