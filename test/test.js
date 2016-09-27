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
    xmlParse.xmlToJs(xml, function(result){
      expect(result).to.be.a('object');
      expect(result.people.bob.job).to.equal('coder');
      expect(result.people.bob.skills.computer).to.equal('JavaScript');
      expect(result.people.bob.skills.personal).to.equal('communication');
      expect(result.people.dave).to.be.a('object')
      expect(result.people.dave.age).to.equal('23')
      done();
    })
  });

  // Add more assertions here
});
