'use strict';

angular.module('angularSimpleApp')
  .filter('geneNameFilter', function () {
     return function(items, filter) {
      if (!filter || !filter.Gene[0]){
          return items;
      }

      var result = {};
        angular.forEach( filter, function(filterVal, filterKey) {
          angular.forEach(items, function(item, key) {
              var fieldVal = item[0][filterKey];
              angular.forEach(filterVal,function(val){
                            if (fieldVal && fieldVal.toLowerCase().indexOf(val.toLowerCase()) > -1){
                                result[key] = item;
                            }
                          });
          });
        });
        return result;
    };
});