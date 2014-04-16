'use strict';

angular.module('angularSimpleApp')
  .filter('geneLengthFilter', function () {
    return function (input) {
      return 'geneLengthFilter filter: ' + input;
    };
  });
