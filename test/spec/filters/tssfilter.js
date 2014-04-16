'use strict';

describe('Filter: tssFilter', function () {

  // load the filter's module
  beforeEach(module('angularSimpleApp'));

  // initialize a new instance of the filter before each test
  var tssFilter;
  beforeEach(inject(function ($filter) {
    tssFilter = $filter('tssFilter');
  }));

  it('should return the input prefixed with "tssFilter filter:"', function () {
    var text = 'angularjs';
    expect(tssFilter(text)).toBe('tssFilter filter: ' + text);
  });

});
