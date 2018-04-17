var typeset = require('../src/index');

var expect = require('chai').expect;

describe('Typeset', function() {

  it('should process encoded quotes', function(){

    var html =
    '<p>Foo&#39;s &quot;<em>bar</em>&quot; ABC&#39;s.</p><blockquote>' +
    '<p>It’s not a PC replacement.</p>' +
    '<p>-Lukas Mathis, &quot;<a href="/">iPad: A Consumption Device, After All?</a>&quot;, <em>ignore</em> the code.</p>' +
    '</blockquote>' +
    '<p>Foo&#39;s <em>&quot;bar&#39;s&quot;</em> ABC.</p>';

    expect(typeset(html)).to.equal('<p>Foo’s<span class="push-double"></span> <span class="pull-double">“</span><em>bar</em><span class="push-double"></span><span class="pull-double">”</span> <span class="small-caps">ABC</span><span class="push-single"></span><span class="pull-single">’</span>s.</p><blockquote><p>It’s not a <span class="small-caps">PC</span> re­place­ment.</p><p>-Lukas Mathis,<span class="push-double"></span> <span class="pull-double">“</span><a href="/">iPad: A Consumption Device, After All?</a><span class="push-double"></span><span class="pull-double">”</span>, <em>ig­nore</em> the code.</p></blockquote><p>Foo’s <em><span class="push-double"></span><span class="pull-double">“</span>bar’s”</em> <span class="small-caps">ABC</span>.</p>');
  });

  it('should process a complex text', function() {
    var html = '<p>Yjarni Sigurðardóttir spoke to NATO from Iceland yesterday: "Light of my  life, fire of my florins -- my sin, my soul. The tip of the tongue taking a trip to 118° 19\' 43.5"."</p>' +
            '<p>"She\'s faster than a 120\' 4" whale." <em>Piña co­ladas</em> were widely consumed in Götterdämmerung from 1880–1912. For the low price of $20 / year from Ex­hi­bits A–E... Then the <em>duplex</em> came forward. "Thrice the tower, he mounted the round gunrest, \'awaking\' HTML. He can print a fixed num­ber of dots in a square inch (for in­stance, 600 × 600)."</p>';

    expect(typeset(html)).to.equal('<p>Yjarni Sigurðardóttir spoke to <span class="small-caps">NATO</span> from Iceland yes­ter­day:<span class="push-double"></span> <span class="pull-double">“</span>Light of my  life, ﬁre of my ﬂorins&thinsp;&mdash;&thinsp;my sin, my soul. The tip of the tongue tak­ing a trip to 118° 19′ 43.5″.”</p><p><span class="pull-double">“</span>She’s faster than a 120′ 4″ whale.” <em>Piña co­ladas</em> were widely con­sumed in Götterdämmerung from 1880–1912. For the low price of $20 / year from Ex­hi­bits A–E… Then the <em>du­plex</em> came for­ward.<span class="push-double"></span> <span class="pull-double">“</span>Thrice the tower, he mounted the round gun­rest,<span class="push-single"></span> <span class="pull-single">‘</span>awaking’ <span class="small-caps">HTML</span>. He can print a ﬁxed num­ber of dots in a square inch (for in­stance, 600 × 600).”</p>');
  });
});
