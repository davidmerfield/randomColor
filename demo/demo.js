

var normalRandom = function () {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
};

var createSwatches = function() {
  
  var outputs = document.querySelectorAll(".output");

  for (var i in outputs) {

    var output = outputs[i],
        ugly = getAttribute(output, 'ugly'),
        count = parseInt(getAttribute(output, 'count')),
        contrasts = false,
        hue = getAttribute(output, 'hue');

    if (getAttribute(output, 'contrasts') === 'true') {
      var contrasts = true
    };

    for (var i = 0; i < count;i++){

      var swatch = document.createElement('span');
          swatch.className = "swatch randomColor";
          swatch.setAttribute('hue', hue);
          swatch.setAttribute('ugly', ugly);

      if (contrasts) {
          swatch.setAttribute('contrasts', 'true')
      }
      
      // this should be chunked into a 
      // document  fragment
      output.appendChild(swatch);

    }

  };

};

var renderDemo = function() {

  var demos = document.querySelectorAll(".randomColor");

  for (var i in demos) {
    var options = {},
        demo = demos[i];


    if (getAttribute(demo, 'contrasts') === 'true') {
      options['hue'] = {contrasts: getAttribute(demo, 'hue')}
    } else {
      options['hue'] = getAttribute(demo, 'hue');
    };

    options['luminosity'] = getAttribute(demo, 'luminosity');
    options['format'] = getAttribute(demo, 'format');
    
    var isUgly = getAttribute(demo, "ugly");

    var color = randomColor(options);

    if (demo.className === 'swatch randomColor') {
      demo.style.background = color;
    };

    if (isUgly === 'true') {
      demo.style.background = normalRandom();
    }

    // Append a small color swatch to text demo
    // else {
    //   demo.style.color = color;
    // }

    demo.innerHTML = color.toString();
  }
};

function getAttribute(node, attribute) {
  for (var i in node.attributes){
    if (attribute === node.attributes[i].name){
      return node.attributes[i].value
    }
  };
}
