var typeset = require('../src');

function lig (html) {
  return typeset(html, {enable: ['ligatures']})
};

var expect = require('chai').expect;

describe('Ligatures', function() {

  it('text without ligatures should be the same after call the function', function() {
    var html = '<p>En un lugar de la mancha</p>';
    expect(lig(html)).to.equal('<p>En un lugar de la mancha</p>');
  });

  it('should replace (fi) by (ﬁ)', function() {
    var html = '<p>A file folder (US usage) (or folder in British and Australian usage) is a kind of folder that holds loose papers</p>';
    expect(lig(html)).to.equal('<p>A ﬁle folder (US usage) (or folder in British and Australian usage) is a kind of folder that holds loose papers</p>');
  });

  it('should replace (fl) by (ﬂ)', function() {
    var html = '<p>fluency is a speech language pathology term that means the smoothness or flow with which sounds</p>';
    expect(lig(html)).to.equal('<p>ﬂuency is a speech language pathology term that means the smoothness or ﬂow with which sounds</p>');
  });

});
