var path = require('path');
var expect = require('chai').expect;

var xmlParse = require(path.join(__dirname, '..', './xml-parse.js'));
var xml = "<people><bob><age>23</age><job>coder</job><skills><computer>JavaScript</computer><personal>communication</personal></skills></bob><dave><age>23</age></dave></people>";

describe('xml-parse', function () {
  'use strict';

  it('exists', function () {
    expect(xmlParse).to.be.a('object');

  });

  it('has a function called xmlToJs', function () {
    expect(xmlParse.xmlToJs).to.be.a('function');
  });

  it('parses XML', function (done) {
    var result;
    xmlParse.xmlToJs(xml, function(data){
      result = data;
      done();
    })
    expect(result).to.be.a('object');
    expect(result.people.bob.skills.computer).to.equal('JavaScript');
  });

  // Add more assertions here
});
