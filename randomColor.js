var util = {
  randomBetween: function(min, max, isInteger) {
    var number = min + Math.random() * (max - min);
    if (isInteger) {return Math.floor(number)};
    return number
  },
  randomPick: function(choices) {
    return choices[Math.floor(Math.random() * choices.length)]
  },
  rgbHex: function(r,g,b){
    return '#' + ("000000" +
       r.toString(16) +
       g.toString(16) + 
       b.toString(16)
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
    return 'rgb(' + Math.floor(r*256) + ', ' + Math.floor(g*256) + ', ' + Math.floor(b*256)+')';
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

var randomColor = function randomColor(options){

  // Define areas in the HSV color space for each color
  // This is obviously cultural

  var hue = Math.random(),
      saturation = 0.8,
      value = 0.9,
      goldenRatio = 0.61803398874989;

  var argumentsHas = function (key){
    for (var i in randomColor.arguments){
      if (key === randomColor.arguments[i]) {return true}
    }
    return false
  }

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
