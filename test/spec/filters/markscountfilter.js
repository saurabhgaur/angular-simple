'use strict';

describe('Filter: marksCountFilter', function () {

  // load the filter's module
  beforeEach(module('angularSimpleApp'));

  // initialize a new instance of the filter before each test
  var marksCountFilter;
  beforeEach(inject(function ($filter) {
    marksCountFilter = $filter('marksCountFilter');
  }));

  it('should return the input prefixed with "marksCountFilter filter:"', function () {
    var text = 'angularjs';
    expect(marksCountFilter(text)).toBe('marksCountFilter filter: ' + text);
  });

});
