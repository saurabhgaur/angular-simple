'use strict';

describe('Filter: geneLengthFilter', function () {

  // load the filter's module
  beforeEach(module('angularSimpleApp'));

  // initialize a new instance of the filter before each test
  var geneLengthFilter;
  beforeEach(inject(function ($filter) {
    geneLengthFilter = $filter('geneLengthFilter');
  }));

  it('should return the input prefixed with "geneLengthFilter filter:"', function () {
    var text = 'angularjs';
    expect(geneLengthFilter(text)).toBe('geneLengthFilter filter: ' + text);
  });

});
