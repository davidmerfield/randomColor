var typeset = require('../src');

function spaces (html) {
  return typeset(html, {enable: ['spaces']});
};

var expect = require('chai').expect;

describe('Spaces', function() {

  it('text without wide spaces symbols should be the same after call the function', function() {
    var html = '<p>En un lugar de la mancha</p>';
    expect(spaces(html)).to.equal('<p>En un lugar de la mancha</p>');
  });

  it('should replace wide spaces with hair spaces', function() {
    var html = '<p> 4 × 4 = 16 </p>'
    expect(spaces(html)).to.equal('<p> 4 × 4 = 16 </p>');
  });

  it('should replace multiple wide spaces with hair spaces', function() {
    var html = '<p> 4 × 4 = 16; 10 / 2 = 5;</p>'
    expect(spaces(html)).to.equal('<p> 4 × 4 = 16; 10 / 2 = 5;</p>');
  });

});
