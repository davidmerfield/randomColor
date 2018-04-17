var typeset = require('../src');

function punc (html) {
  return typeset(html, {enable: ['punctuation']})
};



var expect = require('chai').expect;

describe('Punctuation', function() {

  it('text without punctuation symbols should be the same after call the function', function() {
    var html = '<p>En un lugar de la mancha</p>';
    expect(punc(html)).to.equal( '<p>En un lugar de la mancha</p>');
  });

  it('should replace three dots by elipses symbol', function() {
    var html = '<p>En un lugar de la mancha...</p>';
    expect(punc(html)).to.equal('<p>En un lugar de la mancha…</p>');
  });

  it('should replace three dots by elipses symbol on texts with multiple matches', function() {
    var html = '<p>En un lugar de la mancha... De cuyo nombre no quiero acordarme... no ha mucho tiempo que vivía...</p>';
    expect(punc(html)).to.equal('<p>En un lugar de la mancha… De cuyo nombre no quiero acordarme… no ha mucho tiempo que vivía…</p>');
  });

  it('should replace two dashes (--) by a dash (–)', function() {
    var html = '<p>Pues aquí hay algo que no te va a gustar Laura, --dijo Carlos-- yo también voy al equipo de Juan.</p>';
    expect(punc(html)).to.equal('<p>Pues aquí hay algo que no te va a gustar Laura, –dijo Carlos– yo también voy al equipo de Juan.</p>');
  });

  it('should replace a dash between spaces ( – ) by (&thinsp;&mdash;&thinsp;)', function() {
    var html = '<p>Use an "en" dash to con­nect num­bers in a range. It means "up to and includ­ing" when used like this: "During the years 1998 – 1999," and "peo­ple aged 55 – 63."</p>';
    expect(punc(html)).to.equal('<p>Use an "en" dash to con­nect num­bers in a range. It means "up to and includ­ing" when used like this: "During the years 1998&thinsp;&mdash;&thinsp;1999," and "peo­ple aged 55&thinsp;&mdash;&thinsp;63."</p>');
  });

});
