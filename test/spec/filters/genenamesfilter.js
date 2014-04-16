'use strict';

describe('Filter: geneNamesFilter', function () {

  // load the filter's module
  beforeEach(module('angularSimpleApp'));

  // initialize a new instance of the filter before each test
  var geneNamesFilter;
  beforeEach(inject(function ($filter) {
    geneNamesFilter = $filter('geneNamesFilter');
  }));

  it('should return the input prefixed with "geneNamesFilter filter:"', function () {
    var text = 'angularjs';
    expect(geneNamesFilter(text)).toBe('geneNamesFilter filter: ' + text);
  });

});
