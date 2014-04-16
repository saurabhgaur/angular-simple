'use strict';

angular.module('angularSimpleApp')
  .filter('geneNameFilter', function () {
     return function(items, filter) {
      if (!filter){
          return items;
      }  
      var result = {};
        angular.forEach( filter, function(filterVal, filterKey) {
          angular.forEach(items, function(item, key) {
              var fieldVal = item[0][filterKey];
              if (fieldVal && fieldVal.toLowerCase().indexOf(filterVal.toLowerCase()) > -1){
                  result[key] = item;
              }
          });
        });
        return result;
    };
});