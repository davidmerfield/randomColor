// Generate all the color swatch elements
var createSwatches = function() {

  var outputs = document.querySelectorAll(".output");

  for (var i = 0; i < outputs.length; i++){

    var output = outputs[i],
        numberOfSwatches = getAttribute(output, 'count'),
        attributes = output.attributes;

    for (var j = 0; j < numberOfSwatches; j++){

      var swatch = document.createElement('span');

      for (var k = 0; k < attributes.length; k++) {
        swatch.setAttribute(attributes[k].name, attributes[k].value);
      };

      swatch.className = "swatch";
      output.appendChild(swatch);

    };

  };

};

function renderLogo (seed) {

  var logo = document.getElementById('logo');

  var logoNodes = logo.childNodes,
      shapes = [];

  for (var i in logoNodes) {
    var n = logoNodes[i];
    if(n.attributes) {
      shapes.push(n);
    };
  };

  var backgrounds = randomColor({count: shapes.length, seed: seed});

  for (var i in shapes) {var shape = shapes[i];shape.setAttribute('fill', backgrounds[i])};
};


var renderDemo = function(seed) {

  renderLogo(seed);

  var demos = document.querySelectorAll(".swatch");

  for (var i in demos) {

    var options = {},
        demo = demos[i],
        demoProperties = demo.attributes;

    if (demoProperties) {
      for (var j = 0; j < demoProperties.length; j++) {
        options[demoProperties[j].name] = demoProperties[j].value
      };
    };

    if (options.count) {delete options.count};

    var color = randomColor(options);

    // console.log(color);

    if(demo.style) {
      demo.style.background = color;
    }

    demo.innerHTML = color.toString();

  };
};

function getAttribute(node, attribute) {
  for (var i in node.attributes){
    if (attribute === node.attributes[i].name){
      return node.attributes[i].value
    }
  };
};

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-8666188-9', 'llllll.li');
ga('send', 'pageview');