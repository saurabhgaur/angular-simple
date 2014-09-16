'use strict';

angular.module('angularSimpleApp')
  .filter('marksCountFilter', function () {
     return function(items, filter) {
      if (!filter || !filter.MarksCount){
          return items;
      }  
      var result = {};
          angular.forEach(items, function(item, key) {
              
              if (item.length<filter.MarksCount){
                  result[key] = item;
              }
          });

        return result;
    };
  });
