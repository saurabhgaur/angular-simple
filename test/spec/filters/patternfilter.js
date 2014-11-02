'use strict';

describe('Filter: patternFilter', function () {

  // load the filter's module
  beforeEach(module('angularSimpleApp'));

  // initialize a new instance of the filter before each test
  var patternFilter;
  beforeEach(inject(function ($filter) {
    patternFilter = $filter('patternFilter');
  }));

  it('should return the input prefixed with "patternFilter filter:"', function () {
    var text = 'angularjs';
    expect(patternFilter(text)).toBe('patternFilter filter: ' + text);
  });

});
