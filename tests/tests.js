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

var renderDemo = function() {

  var demos = document.querySelectorAll(".swatch");

  for (var i in demos) {
    
    var options = {},
        demo = demos[i],
        demoProperties = demo.attributes;

    for (var j = 0; j < demoProperties.length; j++) {
      options[demoProperties[j].name] = demoProperties[j].value
    };

    var color = randomColor(options);

    demo.style.background = color;
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
