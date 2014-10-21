'use strict';

angular.module('angularSimpleApp')
  .filter('tssFilter', function () {
    return function(items, filter) {
      if (!filter || !filter.tssMarksDist || !filter.tssMarksCount){
          return items;
      }  
      var result = {};
          angular.forEach(items, function(marks, key) {
              var count = 0;
              angular.forEach(marks, function(mark){
               	if(Math.abs(mark.RegionStart)<filter.tssMarksDist*1000)
              		count = count + 1;
              })
              if (count>=filter.tssMarksCount){
                  result[key] = marks;
              }
          });

        return result;
    };
  });
