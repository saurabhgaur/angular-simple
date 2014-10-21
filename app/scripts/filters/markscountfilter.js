'use strict';

angular.module('angularSimpleApp')
  .filter('marksCountFilter', function () {
     return function(items, filter) {
      if (!filter || !filter.MarksCount || !filter.selectedOperator){
          return items;
      }  
      var result = {};
          angular.forEach(items, function(item, key) {
              switch(filter.selectedOperator.value){
                case "=": if (item.length==filter.MarksCount) { result[key] = item; }; break;
                case "<": if (item.length<filter.MarksCount) { result[key] = item; }; break;
                case "<=":if (item.length<=filter.MarksCount) { result[key] = item; }; break;
                case ">": if (item.length>filter.MarksCount) { result[key] = item; }; break;
                case ">=":if (item.length>=filter.MarksCount) { result[key] = item; }; break;
              };


              // if (item.length<=filter.MarksCount){
              //     result[key] = item;
              // }
          });

        return result;
    };
  });